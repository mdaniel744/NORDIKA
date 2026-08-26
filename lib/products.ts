import type { Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import type { Product } from "@/types/catalog";

const terms: Record<Locale, Record<string, string>> = {
  de: { new: "Neu", used: "Gebraucht", standard: "Standardcontainer", high_cube: "High-Cube-Container", open_side: "Open-Side-Container", reefer: "Kühlcontainer", office: "Bürocontainer", storage: "Lagercontainer", sea: "Seecontainer", special: "Spezialcontainer" },
  en: { new: "New", used: "Used", standard: "standard container", high_cube: "high-cube container", open_side: "open-side container", reefer: "refrigerated container", office: "office container", storage: "storage container", sea: "shipping container", special: "special container" },
  nl: { new: "Nieuwe", used: "Gebruikte", standard: "standaardcontainer", high_cube: "high-cubecontainer", open_side: "open-sidecontainer", reefer: "koelcontainer", office: "kantoorcontainer", storage: "opslagcontainer", sea: "zeecontainer", special: "speciale container" },
  it: { new: "Nuovo", used: "Usato", standard: "container standard", high_cube: "container high cube", open_side: "container open side", reefer: "container refrigerato", office: "container ufficio", storage: "container deposito", sea: "container marittimo", special: "container speciale" },
  cs: { new: "Nový", used: "Použitý", standard: "standardní kontejner", high_cube: "high-cube kontejner", open_side: "open-side kontejner", reefer: "chladicí kontejner", office: "kancelářský kontejner", storage: "skladový kontejner", sea: "námořní kontejner", special: "speciální kontejner" },
  es: { new: "Contenedor nuevo", used: "Contenedor usado", standard: "estándar", high_cube: "high cube", open_side: "open side", reefer: "refrigerado", office: "de oficina", storage: "de almacenamiento", sea: "marítimo", special: "especial" },
};

export function normalizeProductType(product: Product): string {
  const value = product.product_type?.toLowerCase().replace(/[\s-]+/g, "_") || "standard";
  if (value.includes("high") || product.sku?.includes("HC")) return "high_cube";
  if (value.includes("open") || product.sku?.includes("OS")) return "open_side";
  if (value.includes("reefer") || value.includes("kühl") || product.sku?.includes("RF")) return "reefer";
  if (value.includes("office") || value.includes("büro")) return "office";
  if (value.includes("storage") || value.includes("lager")) return "storage";
  if (value.includes("special") || value.includes("spezial")) return "special";
  return "standard";
}

export function localizedProductTitle(product: Product, locale: Locale): string {
  if (locale === "de" && product.title) return product.title;
  const condition = /used|gebraucht/i.test(product.condition || "") ? "used" : "new";
  const type = normalizeProductType(product);
  const size = product.size_ft ? `${product.size_ft} ft` : "";
  return [terms[locale][condition], size, terms[locale][type]].filter(Boolean).join(" ");
}

export function productSlug(product: Product, locale: Locale): string {
  if (locale === "de" && product.slug) return product.slug;
  return `${slugify(localizedProductTitle(product, locale))}-${product.sku.toLowerCase()}`;
}

export function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function formatPrice(product: Product, locale: Locale): string | null {
  if (!product.price_gross || product.price_gross <= 0) return null;
  return new Intl.NumberFormat(locale, { style: "currency", currency: product.currency || "EUR", maximumFractionDigits: 0 }).format(product.price_gross);
}

export function conditionKey(product: Product): "new" | "used" {
  return /used|gebraucht/i.test(product.condition || "") ? "used" : "new";
}

export function isProductPurchasable(product: Product): boolean {
  const availability = product.availability?.trim().toLowerCase() || "";
  const explicitlyUnavailable = /ausverkauft|out of stock|unavailable|uitverkocht|esaurito|vyprod|agotado/.test(availability);
  return product.is_purchasable !== false && product.price_gross > 0 && !explicitlyUnavailable;
}

export function purchaseQuantityLimit(product: Product): number {
  return typeof product.quantity === "number" && product.quantity > 0 ? product.quantity : 99;
}

export function localizedProductDescription(product: Product, locale: Locale): string {
  if (locale === "de" && (product.short_description || product.description)) return product.short_description || product.description || product.title;
  const title = localizedProductTitle(product, locale);
  const text: Record<Exclude<Locale, "de">, string> = {
    en: `${title} from the current ${SITE.name} range. Review price, availability and verified technical specifications.`,
    nl: `${title} uit het actuele assortiment van ${SITE.name}. Bekijk prijs, beschikbaarheid en gecontroleerde technische gegevens.`,
    it: `${title} dalla gamma attuale di ${SITE.name}. Consulta prezzo, disponibilità e dati tecnici verificati.`,
    cs: `${title} z aktuální nabídky ${SITE.name}. Zkontrolujte cenu, dostupnost a ověřené technické parametry.`,
    es: `${title} de la gama actual de ${SITE.name}. Consulta precio, disponibilidad y datos técnicos verificados.`,
  };
  return text[locale as Exclude<Locale, "de">];
}
