import { NextResponse } from "next/server";
import { z } from "zod";
import { SITE } from "@/lib/site";
import { countryName, EU_COUNTRY_CODES } from "@/lib/shipping-countries";

const enquirySchema = z.object({
  formType: z.enum(["quote", "contact"]),
  locale: z.enum(["de", "en", "nl", "it", "cs", "es"]),
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
  const deliveryAddress = [parsed.street && `${parsed.street} ${parsed.houseNumber}`, parsed.addressLine2, parsed.postcode && `${parsed.postcode} ${parsed.city}`, deliveryCountry].filter(Boolean).join(", ");

  const payload = {
    customer_type: parsed.company ? "Geschäftskunde" : "Privatkunde",
    company: parsed.company,
    name: parsed.name,
    email: parsed.email,
    phone: parsed.phone,
    purpose: parsed.formType === "contact" ? "Sonstige" : normalizePurpose(parsed.purpose),
    base_size: normalizeSize(parsed.baseSize),
    base_type: normalizeType(parsed.baseType),
    modifications: parsed.modifications,
    delivery_postcode: parsed.postcode,
    delivery_city: parsed.city,
    delivery_country: deliveryCountry,
    preferred_date: parsed.deliveryDate,
    crane_required: parsed.crane,
    ground_prepared: false,
    message: `[${parsed.formType.toUpperCase()} · ${parsed.locale}] Gewünschter Typ/Artikel: ${parsed.baseType || "–"}${parsed.formType === "quote" ? `\nLieferadresse: ${deliveryAddress}` : ""}\n${parsed.message}`,
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
      console.error("Base44 enquiry failed", response.status, await response.text());
      return NextResponse.json({ error: "Submission failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Enquiry transport failed", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 502 });
  }
}

function normalizePurpose(value: string): "Lagerung" | "Büro" | "Kühlung" | "Sonstige" {
  if (/lager|storage|opslag|deposito|sklad|almacen/i.test(value)) return "Lagerung";
  if (/büro|office|kantoor|ufficio|kancel|oficina|raum|ruimte|prostor|espacio/i.test(value)) return "Büro";
  if (/kühl|refrig|koel|chlaz|chlad|frío|cool/i.test(value)) return "Kühlung";
  return "Sonstige";
}

function normalizeSize(value: string): "10 ft" | "20 ft" | "40 ft" | "Unsicher" {
  if (/^10\b/.test(value)) return "10 ft";
  if (/^20\b/.test(value)) return "20 ft";
  if (/^40\b/.test(value)) return "40 ft";
  return "Unsicher";
}

function normalizeType(value: string): "Standard" | "High Cube" | "Neu" | "Gebraucht" {
  if (/high.?cube|\bhc\b/i.test(value)) return "High Cube";
  if (/gebraucht|used|usato|použit|usado|gebruikt/i.test(value)) return "Gebraucht";
  if (/\bneu\b|\bnew\b|nuovo|nový|nuevo|nieuw/i.test(value)) return "Neu";
  return "Standard";
}
