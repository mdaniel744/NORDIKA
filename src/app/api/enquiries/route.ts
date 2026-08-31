import { NextResponse } from "next/server";
import { z } from "zod";
import { getProducts } from "@/lib/catalog";
import { saveInquiry } from "@/lib/inquiries";
import { saveSubmission } from "@/lib/submission-store";
import { countryName, EU_COUNTRY_CODES } from "@/lib/shipping-countries";

const enquirySchema = z.object({
  formType: z.enum(["quote", "contact"]),
  locale: z.enum(["de", "en", "nl", "it", "cs", "es"]),
  productId: z.string().trim().max(200).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(80).optional().default(""),
  purpose: z.string().trim().max(120).optional().default("Sonstige"),
  baseSize: z.string().trim().max(80).optional().default(""),
  baseType: z.string().trim().max(120).optional().default(""),
  modifications: z.array(z.string().trim().max(120)).max(20).optional().default([]),
  street: z.string().trim().max(160).optional().default(""),
  houseNumber: z.string().trim().max(30).optional().default(""),
  addressLine2: z.string().trim().max(160).optional().default(""),
  postcode: z.string().trim().max(24).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  countryCode: z.enum(EU_COUNTRY_CODES).optional().default("DE"),
  deliveryDate: z.string().trim().max(40).optional().default(""),
  crane: z.boolean().optional().default(false),
  message: z.string().trim().min(5).max(5000),
  website: z.string().max(0).optional().default(""),
  consent: z.literal(true),
});

const recent = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const attempts = (recent.get(ip) || []).filter((timestamp) => now - timestamp < 60_000);
  if (attempts.length >= 5) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  recent.set(ip, [...attempts, now]);

  let parsed: z.infer<typeof enquirySchema>;
  try {
    parsed = enquirySchema.parse(await request.json());
  } catch (error) {
    return NextResponse.json({ error: "Invalid enquiry", details: error instanceof z.ZodError ? error.flatten() : undefined }, { status: 400 });
  }

  if (parsed.website) return NextResponse.json({ ok: true });
  if (parsed.formType === "quote" && (!parsed.street || !parsed.houseNumber || !parsed.postcode || !parsed.city)) return NextResponse.json({ error: "A complete delivery address is required" }, { status: 400 });
  const deliveryCountry = countryName(parsed.countryCode, "de");

  let productId: string | null = null;
  let productLabel = parsed.baseType || "";
  if (parsed.productId) {
    const products = await getProducts();
    const product = products.find((item) => item.id === parsed.productId);
    if (product) {
      productId = product.id;
      productLabel = product.title;
    }
  }

  const messageParts = [
    parsed.formType === "quote" ? "Angebotsanfrage" : "Kontaktanfrage",
    parsed.company ? "Geschäftskunde" : "Privatkunde",
  ];
  if (productLabel) messageParts.push(productLabel);
  else if (parsed.baseSize) messageParts.push(parsed.baseSize);
  if (parsed.formType === "quote" && parsed.city) messageParts.push(`Lieferung nach ${parsed.city}`);
  if (parsed.deliveryDate) messageParts.push(`Wunschtermin ${parsed.deliveryDate}`);
  if (parsed.crane) messageParts.push("Kranentladung erforderlich");
  const message = messageParts.join(" — ");

  const details = {
    request_type: "enquiry",
    form_type: parsed.formType,
    locale: parsed.locale,
    customer_type: parsed.company ? "Geschäftskunde" : "Privatkunde",
    company: parsed.company || null,
    purpose: parsed.purpose,
    base_size: parsed.baseSize,
    base_type: parsed.baseType,
    modifications: parsed.modifications,
    delivery: {
      street: parsed.street,
      house_number: parsed.houseNumber,
      address_line2: parsed.addressLine2,
      postcode: parsed.postcode,
      city: parsed.city,
      country: deliveryCountry,
    },
    preferred_date: parsed.deliveryDate,
    crane_required: parsed.crane,
    notes: parsed.message,
  };

  try {
    await saveInquiry({ customerName: parsed.name, customerEmail: parsed.email, customerPhone: parsed.phone, productId, message, details });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save enquiry to Supabase, falling back to local storage", error);
    try {
      await saveSubmission("enquiry", { message, details, customerName: parsed.name, customerEmail: parsed.email });
      return NextResponse.json({ ok: true }, { status: 201 });
    } catch (fallbackError) {
      console.error("Local fallback also failed for enquiry", fallbackError);
      return NextResponse.json({ error: "Submission failed" }, { status: 500 });
    }
  }
}
