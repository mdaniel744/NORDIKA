import type { Locale } from "@/lib/i18n";

export type RouteKey =
  | "home"
  | "shop"
  | "product"
  | "types"
  | "guides"
  | "quote"
  | "conversions"
  | "about"
  | "contact"
  | "delivery"
  | "locations"
  | "faq"
  | "conditions"
  | "cart"
  | "checkout"
  | "imprint"
  | "privacy"
  | "terms"
  | "withdrawal"
  | "withdrawalForm"
  | "returns"
  | "payments"
  | "cookies"
  | "complaints"
  | "warranty"
  | "accessibility";

const segments: Record<Locale, Record<Exclude<RouteKey, "home">, string>> = {
  de: { shop: "container-kaufen", product: "container", types: "container-typen", guides: "ratgeber", quote: "angebot-anfordern", conversions: "containerumbau", about: "ueber-uns", contact: "kontakt", delivery: "lieferung-aufstellung", locations: "standorte", faq: "faq", conditions: "container-zustandsklassen", cart: "warenkorb", checkout: "kasse", imprint: "impressum", privacy: "datenschutz", terms: "agb", withdrawal: "widerrufsrecht", withdrawalForm: "muster-widerrufsformular", returns: "rueckgabe-erstattung", payments: "zahlungsarten", cookies: "cookie-richtlinie", complaints: "reklamation", warranty: "gewaehrleistung", accessibility: "barrierefreiheit" },
  en: { shop: "buy-containers", product: "container", types: "container-types", guides: "guides", quote: "request-quote", conversions: "container-conversions", about: "about", contact: "contact", delivery: "delivery-installation", locations: "locations", faq: "faq", conditions: "container-condition-grades", cart: "cart", checkout: "checkout", imprint: "legal-notice", privacy: "privacy", terms: "terms", withdrawal: "right-of-withdrawal", withdrawalForm: "model-withdrawal-form", returns: "returns-refunds", payments: "payment-methods", cookies: "cookie-policy", complaints: "complaints", warranty: "warranty", accessibility: "accessibility" },
  nl: { shop: "containers-kopen", product: "container", types: "containertypes", guides: "advies", quote: "offerte-aanvragen", conversions: "containerombouw", about: "over-ons", contact: "contact", delivery: "levering-plaatsing", locations: "locaties", faq: "veelgestelde-vragen", conditions: "container-conditieklassen", cart: "winkelwagen", checkout: "afrekenen", imprint: "colofon", privacy: "privacy", terms: "voorwaarden", withdrawal: "herroepingsrecht", withdrawalForm: "modelformulier-herroeping", returns: "retouren-terugbetaling", payments: "betaalmethoden", cookies: "cookiebeleid", complaints: "klachten", warranty: "garantie", accessibility: "toegankelijkheid" },
  it: { shop: "acquista-container", product: "container", types: "tipi-container", guides: "guide", quote: "richiedi-preventivo", conversions: "trasformazioni-container", about: "chi-siamo", contact: "contatti", delivery: "consegna-posa", locations: "sedi", faq: "domande-frequenti", conditions: "classi-condizione-container", cart: "carrello", checkout: "checkout", imprint: "note-legali", privacy: "privacy", terms: "condizioni", withdrawal: "diritto-recesso", withdrawalForm: "modulo-recesso", returns: "resi-rimborsi", payments: "metodi-pagamento", cookies: "cookie-policy", complaints: "reclami", warranty: "garanzia", accessibility: "accessibilita" },
  cs: { shop: "koupit-kontejnery", product: "kontejner", types: "typy-kontejneru", guides: "pruvodci", quote: "poptat-nabidku", conversions: "upravy-kontejneru", about: "o-nas", contact: "kontakt", delivery: "doprava-usazeni", locations: "pobocky", faq: "caste-dotazy", conditions: "tridy-stavu-kontejneru", cart: "kosik", checkout: "pokladna", imprint: "pravni-informace", privacy: "ochrana-soukromi", terms: "obchodni-podminky", withdrawal: "odstoupeni-od-smlouvy", withdrawalForm: "vzorovy-formular-odstoupeni", returns: "vraceni-refundace", payments: "platebni-metody", cookies: "zasady-cookies", complaints: "reklamace", warranty: "zaruka", accessibility: "pristupnost" },
  es: { shop: "comprar-contenedores", product: "contenedor", types: "tipos-contenedor", guides: "guias", quote: "solicitar-presupuesto", conversions: "transformaciones-contenedores", about: "quienes-somos", contact: "contacto", delivery: "entrega-instalacion", locations: "ubicaciones", faq: "preguntas-frecuentes", conditions: "grados-estado-contenedores", cart: "carrito", checkout: "pago", imprint: "aviso-legal", privacy: "privacidad", terms: "condiciones", withdrawal: "derecho-desistimiento", withdrawalForm: "formulario-desistimiento", returns: "devoluciones-reembolsos", payments: "metodos-pago", cookies: "politica-cookies", complaints: "reclamaciones", warranty: "garantia", accessibility: "accesibilidad" },
};

export function href(locale: Locale, key: RouteKey, tail?: string): string {
  if (key === "home") return `/${locale}`;
  const base = `/${locale}/${segments[locale][key]}`;
  return tail ? `${base}/${tail}` : base;
}

export function routeFromSegment(locale: Locale, segment: string): RouteKey | undefined {
  return (Object.entries(segments[locale]).find(([, value]) => value === segment)?.[0] as RouteKey | undefined);
}

export function localizedAlternates(key: RouteKey, tailForLocale?: Partial<Record<Locale, string>>): Record<string, string> {
  return Object.fromEntries(
    (Object.keys(segments) as Locale[]).map((locale) => [locale, href(locale, key, tailForLocale?.[locale])]),
  );
}

const dynamicTailGroups: Array<{ key: "types" | "guides"; values: Record<Locale, string> }> = [
  { key: "types", values: { de: "seecontainer", en: "shipping-containers", nl: "zeecontainers", it: "container-marittimi", cs: "namorni-kontejnery", es: "contenedores-maritimos" } },
  { key: "types", values: { de: "high-cube-container", en: "high-cube-containers", nl: "high-cubecontainers", it: "container-high-cube", cs: "high-cube-kontejnery", es: "contenedores-high-cube" } },
  { key: "types", values: { de: "open-side-container", en: "open-side-containers", nl: "open-sidecontainers", it: "container-open-side", cs: "open-side-kontejnery", es: "contenedores-open-side" } },
  { key: "types", values: { de: "kuehlcontainer", en: "refrigerated-containers", nl: "koelcontainers", it: "container-refrigerati", cs: "chladici-kontejnery", es: "contenedores-refrigerados" } },
  { key: "types", values: { de: "buerocontainer", en: "office-containers", nl: "kantoorcontainers", it: "container-ufficio", cs: "kancelarske-kontejnery", es: "contenedores-oficina" } },
  { key: "guides", values: { de: "container-kaufen-ratgeber", en: "container-buying-guide", nl: "container-kopen-gids", it: "guida-acquisto-container", cs: "pruvodce-nakupem-kontejneru", es: "guia-compra-contenedores" } },
  { key: "guides", values: { de: "container-groessen-abmessungen", en: "container-sizes-dimensions", nl: "container-maten-afmetingen", it: "dimensioni-container", cs: "velikosti-rozmery-kontejneru", es: "tamanos-dimensiones-contenedores" } },
  { key: "guides", values: { de: "container-zustand-one-trip-gebraucht", en: "container-condition-one-trip-used", nl: "container-conditie-one-trip-gebruikt", it: "condizione-container-one-trip-usato", cs: "stav-kontejneru-one-trip-pouzity", es: "estado-contenedor-one-trip-usado" } },
  { key: "guides", values: { de: "container-aufstellort-vorbereiten", en: "prepare-container-site", nl: "containerlocatie-voorbereiden", it: "preparare-sito-container", cs: "priprava-mista-pro-kontejner", es: "preparar-ubicacion-contenedor" } },
];

export function localizedDynamicTail(current: Locale, target: Locale, key: RouteKey, tail?: string): string | undefined {
  if (!tail || (key !== "types" && key !== "guides")) return tail;
  return dynamicTailGroups.find((group) => group.key === key && group.values[current] === tail)?.values[target] || tail;
}
