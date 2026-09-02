import { NextResponse } from "next/server";
import { z } from "zod";
import { STORE_ID } from "@/lib/supabase";
import { saveSubmission } from "@/lib/submission-store";
import { countryName, EU_COUNTRY_CODES } from "@/lib/shipping-countries";

const orderSchema = z.object({
  locale: z.enum(["de", "en", "nl", "it", "cs", "es"]),
  customerType: z.enum(["private", "business"]),
  company: z.string().trim().max(160).optional().default(""),
  vatNumber: z.string().trim().max(80).optional().default(""),
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(4).max(80),
  street: z.string().trim().min(2).max(160),
  houseNumber: z.string().trim().min(1).max(30),
  addressLine2: z.string().trim().max(160).optional().default(""),
  postcode: z.string().trim().min(2).max(24),
  city: z.string().trim().min(2).max(120),
  countryCode: z.enum(EU_COUNTRY_CODES),
  deliveryMethod: z.enum(["curbside", "crane"]),
  accessNotes: z.string().trim().min(3).max(3000),
  preferredDate: z.string().trim().max(40).optional().default(""),
  paymentMethod: z.enum(["invoice", "sepa"]),
  items: z.array(z.object({ id: z.string().min(1).max(200), sku: z.string().min(1).max(120), quantity: z.number().int().min(1).max(100) })).min(1).max(50),
  website: z.string().max(0).optional().default(""),
  termsAccepted: z.literal(true),
  privacyAccepted: z.literal(true),
});

const recent = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const attempts = (recent.get(ip) || []).filter((timestamp) => now - timestamp < 60_000);
  if (attempts.length >= 5) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  recent.set(ip, [...attempts, now]);

  let parsed: z.infer<typeof orderSchema>;
  try {
    parsed = orderSchema.parse(await request.json());
  } catch (error) {
    return NextResponse.json({ error: "Invalid order", details: error instanceof z.ZodError ? error.flatten() : undefined }, { status: 400 });
  }
  if (parsed.website) return NextResponse.json({ ok: true });
  if (parsed.customerType === "business" && !parsed.company) return NextResponse.json({ error: "Company is required" }, { status: 400 });
  if (parsed.customerType === "business" && parsed.countryCode !== "DE" && !parsed.vatNumber) return NextResponse.json({ error: "A valid EU VAT ID is required for a zero-rated intra-EU supply" }, { status: 400 });

  const deliveryCountry = countryName(parsed.countryCode, "de");
  const address = {
    street: parsed.street,
    houseNumber: parsed.houseNumber,
    addressLine2: parsed.addressLine2 || undefined,
    postcode: parsed.postcode,
    city: parsed.city,
    country: deliveryCountry,
  };

  // Fields the platform's checkout_orders schema has no place for yet (delivery
  // method, preferred date, payment preference, business VAT/company) are
  // folded into customerNote as readable text rather than dropped or invented
  // as undocumented request fields.
  const customerNote = [
    parsed.customerType === "business" ? `Geschäftskunde${parsed.company ? ` – ${parsed.company}` : ""}${parsed.vatNumber ? ` (USt-IdNr. ${parsed.vatNumber})` : ""}` : "Privatkunde",
    `Entladung: ${parsed.deliveryMethod === "crane" ? "Kranentladung erforderlich" : "Bordsteinkante / Selbstentladung"}`,
    parsed.preferredDate ? `Wunschtermin: ${parsed.preferredDate}` : null,
    `Zahlungswunsch: ${parsed.paymentMethod === "sepa" ? "SEPA-Zahlungsanforderung" : "Rechnung zur Bestätigung"}`,
    `Zufahrt/Aufstellort: ${parsed.accessNotes}`,
  ].filter(Boolean).join(" | ");

  const checkoutPayload = {
    locale: parsed.locale,
    customerName: parsed.name,
    customerEmail: parsed.email,
    customerPhone: parsed.phone,
    billingAddress: address,
    deliveryAddress: address,
    customerNote,
    lineItems: parsed.items.map((item) => ({ productId: item.id, quantity: item.quantity })),
  };

  const platformUrl = process.env.ECOM_PLATFORM_API_URL;
  if (!platformUrl) {
    console.error("ECOM_PLATFORM_API_URL is not configured");
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }

  try {
    const response = await fetch(`${platformUrl}/api/storefront/checkout/${STORE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkoutPayload),
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Platform checkout submission failed", response.status, data);
      // Log locally so nothing is silently lost, but do not tell the customer
      // it succeeded -- this is a real commercial order, not a contact form.
      await saveSubmission("order", { checkoutPayload, platformStatus: response.status, platformError: data }).catch((fallbackError) => console.error("Local fallback logging also failed for order", fallbackError));
      return NextResponse.json({ error: data?.message || data?.error || "Submission failed" }, { status: response.status >= 400 && response.status < 500 ? response.status : 502 });
    }
    return NextResponse.json({ ok: true, reference: data?.order?.orderNumber || data?.order?.id }, { status: 201 });
  } catch (error) {
    console.error("Platform checkout transport failed", error);
    await saveSubmission("order", { checkoutPayload, transportError: error instanceof Error ? error.message : String(error) }).catch((fallbackError) => console.error("Local fallback logging also failed for order", fallbackError));
    return NextResponse.json({ error: "Submission failed" }, { status: 502 });
  }
}
