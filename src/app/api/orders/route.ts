import { NextResponse } from "next/server";
import { z } from "zod";
import { getProducts } from "@/lib/catalog";
import { isProductPurchasable } from "@/lib/products";
import { SITE } from "@/lib/site";
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
  const itemLines = verifiedLines.map(({ product, quantity, lineGross }) => `- ${product.title} | SKU ${product.sku} | ${product.size_ft || "–"} ft | Menge ${quantity} | Katalog brutto ${money(product.price_gross)} | Zeile brutto ${money(lineGross)}`);
  const message = [
    `[CHECKOUT · ${parsed.locale} · ${reference}]`,
    "Kaufbestellung zur Verfügbarkeits-, Steuer- und Frachtprüfung",
    "",
    "Artikel:", ...itemLines,
    "",
    `Katalog-Warenwert brutto: ${money(catalogGross)}`,
    germanTax ? `Warenwert netto: ${money(subtotalNet)} | MwSt. 19 %: ${money(vatAmount!)}` : intraEuBusiness ? `Innergemeinschaftliche Lieferung: Warenwert netto ${money(subtotalNet)} | MwSt. 0 % nach erfolgreicher VIES- und Transportprüfung | EU-USt-IdNr. ${parsed.vatNumber}` : `MwSt.: ausstehend (Ziellandregelung für Privatkunden prüfen)`,
    "Lieferkosten: ausstehend (PLZ/Region, Entladung, Anzahl, Größen und Zufahrt prüfen)",
    `Zahlungswunsch: ${parsed.paymentMethod === "sepa" ? "SEPA-Zahlungsanforderung" : "Rechnung zur Bestätigung"}`,
    "",
    `Lieferadresse: ${parsed.street} ${parsed.houseNumber}${parsed.addressLine2 ? `, ${parsed.addressLine2}` : ""}, ${parsed.postcode} ${parsed.city}, ${deliveryCountry}`,
    `Entladung: ${parsed.deliveryMethod === "crane" ? "Kranentladung erforderlich" : "Bordsteinkante / kundenseitige Entladung"}`,
    `Wunschtermin: ${parsed.preferredDate || "–"}`,
    `Zufahrt/Aufstellort: ${parsed.accessNotes}`,
    verifiedLines.reduce((sum, line) => sum + line.quantity, 0) > 1 ? "Mehrmengenauftrag: Frachtoptimierung und mögliche Preisabstimmung bei Schlussrechnung prüfen." : "",
    "",
    "Hinweis: Zahlung erst nach bestätigtem Endbetrag und Versand der Rechnung bzw. SEPA-Zahlungsanforderung.",
  ].filter(Boolean).join("\n");

  const payload = {
    customer_type: parsed.customerType === "business" ? "Geschäftskunde" : "Privatkunde",
    company: parsed.company,
    name: parsed.name,
    email: parsed.email,
    phone: parsed.phone,
    vat_number: parsed.vatNumber,
    purpose: "Sonstige",
    base_size: normalizeSize(verifiedLines[0]?.product.size_ft || ""),
    base_type: normalizeType(verifiedLines[0]?.product.product_type || ""),
    modifications: [],
    delivery_postcode: parsed.postcode,
    delivery_city: parsed.city,
    delivery_country: deliveryCountry,
    preferred_date: parsed.preferredDate,
    crane_required: parsed.deliveryMethod === "crane",
    ground_prepared: false,
    message,
    status: "Neu",
  };

  try {
    const response = await fetch(`${SITE.base44Url}/api/apps/${SITE.appId}/entities/QuoteRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-App-Id": SITE.appId },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Base44 order failed", response.status, await response.text());
      return NextResponse.json({ error: "Submission failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, reference, goodsTotal, catalogGross, subtotalNet, vatAmount, vatRate: germanTax ? 0.19 : intraEuBusiness ? 0 : null, vatStatus: intraEuBusiness ? "pending_vies_and_transport_verification" : germanTax ? "included" : "pending_destination_review", shippingStatus: "pending_review", paymentMethod: parsed.paymentMethod }, { status: 201 });
  } catch (error) {
    console.error("Order transport failed", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 502 });
  }
}

function roundCurrency(value: number) { return Math.round((value + Number.EPSILON) * 100) / 100; }
function money(value: number) { return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value); }
function normalizeSize(value: string): "10 ft" | "20 ft" | "40 ft" | "Unsicher" { return /^10\b/.test(value) ? "10 ft" : /^20\b/.test(value) ? "20 ft" : /^40\b/.test(value) ? "40 ft" : "Unsicher"; }
function normalizeType(value: string): "Standard" | "High Cube" | "Neu" | "Gebraucht" { return /high.?cube|\bhc\b/i.test(value) ? "High Cube" : /gebraucht|used|usato|použit|usado|gebruikt/i.test(value) ? "Gebraucht" : /\bneu\b|\bnew\b|nuovo|nový|nuevo|nieuw/i.test(value) ? "Neu" : "Standard"; }
