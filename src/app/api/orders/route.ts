import { NextResponse } from "next/server";
import { z } from "zod";
import { getProducts } from "@/lib/catalog";
import { isProductPurchasable } from "@/lib/products";
import { saveInquiry } from "@/lib/inquiries";
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

  const products = await getProducts();
  const lines = parsed.items.map((requested) => {
    const product = products.find((item) => item.id === requested.id && item.sku === requested.sku);
    if (!product || !isProductPurchasable(product)) return null;
    return { product, quantity: requested.quantity, lineGross: roundCurrency(product.price_gross * requested.quantity) };
  });
  if (lines.some((line) => !line)) return NextResponse.json({ error: "One or more products are unavailable" }, { status: 409 });
  const verifiedLines = lines.filter((line): line is NonNullable<typeof line> => Boolean(line));
  const catalogGross = roundCurrency(verifiedLines.reduce((sum, line) => sum + line.lineGross, 0));
  const subtotalNet = roundCurrency(catalogGross / 1.19);
  const germanTax = parsed.countryCode === "DE";
  const intraEuBusiness = parsed.customerType === "business" && !germanTax;
  const vatAmount = germanTax ? roundCurrency(catalogGross - subtotalNet) : intraEuBusiness ? 0 : null;
  const goodsTotal = germanTax ? catalogGross : intraEuBusiness ? subtotalNet : catalogGross;
  const deliveryCountry = countryName(parsed.countryCode, "de");
  const reference = `NC-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const totalQuantity = verifiedLines.reduce((sum, line) => sum + line.quantity, 0);
  const message = `Bestellanfrage — ${totalQuantity} Artikel, ${money(goodsTotal)} inkl. MwSt., Referenz ${reference}`;

  const details = {
    request_type: "order",
    reference,
    locale: parsed.locale,
    customer_type: parsed.customerType === "business" ? "Geschäftskunde" : "Privatkunde",
    company: parsed.company || null,
    vat_number: parsed.vatNumber || null,
    line_items: verifiedLines.map(({ product, quantity, lineGross }) => ({ sku: product.sku, title: product.title, quantity, unit_price: product.price_gross, line_gross: lineGross })),
    pricing: { catalog_gross: catalogGross, subtotal_net: subtotalNet, vat_amount: vatAmount, goods_total: goodsTotal, currency: "EUR" },
    delivery: {
      street: parsed.street,
      house_number: parsed.houseNumber,
      address_line2: parsed.addressLine2,
      postcode: parsed.postcode,
      city: parsed.city,
      country: deliveryCountry,
      method: parsed.deliveryMethod,
      access_notes: parsed.accessNotes,
    },
    preferred_date: parsed.preferredDate,
    payment_method: parsed.paymentMethod,
  };

  try {
    await saveInquiry({ customerName: parsed.name, customerEmail: parsed.email, customerPhone: parsed.phone, productId: null, message, details });
  } catch (error) {
    console.error("Unable to save order to Supabase, falling back to local storage", error);
    try {
      await saveSubmission("order", { reference, message, details, customerName: parsed.name, customerEmail: parsed.email });
    } catch (fallbackError) {
      console.error("Local fallback also failed for order", fallbackError);
      return NextResponse.json({ error: "Submission failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, reference, goodsTotal, catalogGross, subtotalNet, vatAmount, vatRate: germanTax ? 0.19 : intraEuBusiness ? 0 : null, vatStatus: intraEuBusiness ? "pending_vies_and_transport_verification" : germanTax ? "included" : "pending_destination_review", shippingStatus: "pending_review", paymentMethod: parsed.paymentMethod }, { status: 201 });
}

function roundCurrency(value: number) { return Math.round((value + Number.EPSILON) * 100) / 100; }
function money(value: number) { return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value); }
