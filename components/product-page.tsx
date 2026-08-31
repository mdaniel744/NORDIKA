import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { ArrowRight, CheckCircle2, Ruler, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { conditionKey, formatPrice, localizedProductDescription, localizedProductTitle, normalizeProductType, productSlug } from "@/lib/products";
import { SITE } from "@/lib/site";
import type { Product } from "@/types/catalog";

const variantCopy: Record<Locale, { heading: string }> = {
  de: { heading: "Verfügbare Zustände" },
  en: { heading: "Available conditions" },
  nl: { heading: "Beschikbare condities" },
  it: { heading: "Condizioni disponibili" },
  cs: { heading: "Dostupné stavy" },
  es: { heading: "Estados disponibles" },
};

function variantLabel(product: Product): string {
  return product.condition_grade && product.condition !== product.condition_grade ? `${product.condition} (${product.condition_grade})` : product.condition || "";
}

function sanitize(html: string): string {
  return DOMPurify.sanitize(html);
}

const recoveryCopy: Record<Locale, { type: string; size: string; grade: string; color: string; depot: string; maxGross: string; payload: string; floor: string; lockbox: string; vents: string; forklift: string; wwt: string; cargo: string; yes: string; no: string; helpTitle: string; helpText: string; condition: string; sizes: string; delivery: string; returns: string }> = {
  de: { type: "Containertyp", size: "Größe", grade: "Zustandsklasse", color: "Farbe", depot: "Depot", maxGross: "Max. Gesamtgewicht", payload: "Nutzlast", floor: "Boden", lockbox: "Lockbox", vents: "Lüftungen", forklift: "Staplertaschen", wwt: "Wind- und wasserdicht", cargo: "Cargo Worthy", yes: "Ja", no: "Nein", helpTitle: "Vor dem Kauf klären", helpText: "Vergleichen Sie Zustand und Maße und planen Sie Zufahrt, Entladung sowie mögliche Rückfragen vor der Bestellung.", condition: "Zustand verstehen", sizes: "Größen vergleichen", delivery: "Lieferung planen", returns: "Rückgabe & Gewährleistung" },
  en: { type: "Container type", size: "Size", grade: "Condition grade", color: "Colour", depot: "Depot", maxGross: "Maximum gross weight", payload: "Payload", floor: "Floor", lockbox: "Lockbox", vents: "Vents", forklift: "Forklift pockets", wwt: "Wind and watertight", cargo: "Cargo worthy", yes: "Yes", no: "No", helpTitle: "Clarify before buying", helpText: "Compare condition and dimensions, then plan access, unloading and any questions before ordering.", condition: "Understand condition", sizes: "Compare sizes", delivery: "Plan delivery", returns: "Returns & warranty" },
  nl: { type: "Containertype", size: "Maat", grade: "Conditieklasse", color: "Kleur", depot: "Depot", maxGross: "Maximaal totaalgewicht", payload: "Laadvermogen", floor: "Vloer", lockbox: "Lockbox", vents: "Ventilatie", forklift: "Heftruckkokers", wwt: "Wind- en waterdicht", cargo: "Cargo worthy", yes: "Ja", no: "Nee", helpTitle: "Voor aankoop afstemmen", helpText: "Vergelijk conditie en maten en plan toegang, lossing en vragen vóór de bestelling.", condition: "Conditie begrijpen", sizes: "Maten vergelijken", delivery: "Levering plannen", returns: "Retouren & garantie" },
  it: { type: "Tipo di container", size: "Dimensione", grade: "Classe di condizione", color: "Colore", depot: "Deposito", maxGross: "Peso lordo massimo", payload: "Portata", floor: "Pavimento", lockbox: "Lockbox", vents: "Aerazioni", forklift: "Tasche per muletto", wwt: "Resistente a vento e acqua", cargo: "Cargo worthy", yes: "Sì", no: "No", helpTitle: "Da chiarire prima dell'acquisto", helpText: "Confronta condizioni e misure, poi pianifica accesso, scarico e domande prima dell'ordine.", condition: "Capire le condizioni", sizes: "Confrontare le misure", delivery: "Pianificare la consegna", returns: "Resi e garanzia" },
  cs: { type: "Typ kontejneru", size: "Velikost", grade: "Třída stavu", color: "Barva", depot: "Depo", maxGross: "Maximální celková hmotnost", payload: "Užitečné zatížení", floor: "Podlaha", lockbox: "Lockbox", vents: "Větrání", forklift: "Kapsy pro VZV", wwt: "Odolný proti větru a vodě", cargo: "Cargo worthy", yes: "Ano", no: "Ne", helpTitle: "Co ověřit před koupí", helpText: "Porovnejte stav a rozměry a před objednávkou naplánujte příjezd, vykládku a dotazy.", condition: "Porozumět stavu", sizes: "Porovnat velikosti", delivery: "Naplánovat dopravu", returns: "Vrácení a záruka" },
  es: { type: "Tipo de contenedor", size: "Tamaño", grade: "Grado de estado", color: "Color", depot: "Depósito", maxGross: "Peso bruto máximo", payload: "Carga útil", floor: "Suelo", lockbox: "Lockbox", vents: "Ventilación", forklift: "Bolsillos para carretilla", wwt: "Resistente al viento y agua", cargo: "Cargo worthy", yes: "Sí", no: "No", helpTitle: "Aclara antes de comprar", helpText: "Compara estado y medidas y planifica acceso, descarga y preguntas antes de pedir.", condition: "Entender el estado", sizes: "Comparar tamaños", delivery: "Planificar la entrega", returns: "Devoluciones y garantía" },
};

export function ProductPage({ locale, product, allProducts }: { locale: Locale; product: Product; allProducts: Product[] }) {
  const dict = getDictionary(locale);
  const title = localizedProductTitle(product, locale);
  const slug = productSlug(product, locale);
  const price = formatPrice(product, locale);
  const recovered = recoveryCopy[locale];
  const colors = product.colors || [];
  const displayColor = colors.length > 0 ? colors.join(", ") : null;
  const images = [product.main_image || "", ...(product.additional_images || [])];
  const related = allProducts.filter((item) => item.id !== product.id && normalizeProductType(item) === normalizeProductType(product)).slice(0, 3);
  const variants = product.family_id ? allProducts.filter((item) => item.family_id === product.family_id).sort((a, b) => a.price_gross - b.price_gross) : [];
  const specs = [
    [recovered.type, product.product_type],
    [recovered.size, product.size_ft ? `${product.size_ft} ft` : null],
    [recovered.grade, product.condition_grade],
    [recovered.color, displayColor],
    [recovered.depot, SITE.address.city],
    [dict.product.exterior, formatDimensions(product.ext_length_mm, product.ext_width_mm, product.ext_height_mm)],
    [dict.product.interior, formatDimensions(product.int_length_mm, product.int_width_mm, product.int_height_mm)],
    [dict.product.doors, formatDimensions(product.door_width_mm, product.door_height_mm)],
    [dict.product.weight, product.tare_weight_kg ? `${product.tare_weight_kg.toLocaleString(locale)} kg` : null],
    [recovered.maxGross, product.max_gross_weight_kg ? `${product.max_gross_weight_kg.toLocaleString(locale)} kg` : null],
    [recovered.payload, product.payload_kg ? `${product.payload_kg.toLocaleString(locale)} kg` : null],
    [dict.product.volume, product.volume_m3 ? `${product.volume_m3.toLocaleString(locale)} m³` : null],
    ["CSC", product.csc_status],
    [recovered.wwt, formatBoolean(product.wwt_status, recovered.yes, recovered.no)],
    [recovered.cargo, formatBoolean(product.cargo_worthy, recovered.yes, recovered.no)],
    [recovered.floor, product.floor_type],
    [recovered.lockbox, formatBoolean(product.lockbox, recovered.yes, recovered.no)],
    [recovered.vents, formatBoolean(product.vents, recovered.yes, recovered.no)],
    [recovered.forklift, formatBoolean(product.forklift_pockets, recovered.yes, recovered.no)],
  ].filter((item): item is [string, string] => Boolean(item[1]));
  return <main><Breadcrumbs locale={locale} items={[{ label: dict.nav.shop, href: href(locale, "shop") }, { label: title }]} /><section className="bg-white pb-16 pt-6 lg:pb-24"><div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)]"><ProductGallery images={images} title={title} /><div><div className="flex flex-wrap gap-2"><span className="bg-[#ffb33e] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#092b4e]">{dict.common[conditionKey(product)]}</span>{(product.quantity || 0) > 0 && <span className="bg-green-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-green-800">{dict.common.available}: {product.quantity}</span>}</div><h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1><p className="mt-3 text-sm font-bold text-zinc-500">{dict.product.sku}: {product.sku}</p>{(locale !== "de" || product.short_description) && <p className="mt-6 text-lg leading-8 text-zinc-600">{locale === "de" ? product.short_description : localizedProductDescription(product, locale)}</p>}<div className="my-7 border-y border-zinc-200 py-6"><p className="text-3xl font-extrabold">{price || dict.common.priceOnRequest}</p>{price && <p className="text-sm text-zinc-500">{dict.common.inclVat}</p>}</div>{variants.length > 1 && <div className="mt-7"><p className="mb-3 text-sm font-bold text-zinc-500">{variantCopy[locale].heading}</p><div className="flex flex-wrap gap-2">{variants.map((variant) => <Link key={variant.id} href={href(locale, "product", productSlug(variant, locale))} className={`border px-4 py-2 text-sm font-bold ${variant.id === product.id ? "border-primary bg-blue-50 text-primary" : "border-zinc-300 text-zinc-600 hover:border-primary"}`}>{variantLabel(variant)}</Link>)}</div></div>}<ProductActions locale={locale} product={product} title={title} slug={slug} colors={colors} /><div className="mt-7 grid gap-3 border-t border-zinc-200 pt-6 text-sm"><p className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-primary" />{dict.home.trust[1]}</p><p className="flex items-center gap-3"><Truck className="h-5 w-5 text-primary" />{dict.home.trust[2]}</p><p className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" />{SITE.address.city}</p></div></div></div></section>
    <section className="section-space bg-zinc-100"><div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr]"><article className="surface-card min-w-0 p-7 sm:p-9"><h2 className="text-3xl font-extrabold">{dict.product.description}</h2>{locale === "de" && (product.description || product.short_description) ? <div className="prose prose-zinc mt-5 max-w-none leading-8 text-zinc-600" dangerouslySetInnerHTML={{ __html: sanitize(product.description || product.short_description || "") }} /> : <div className="mt-5 whitespace-pre-line leading-8 text-zinc-600">{locale === "de" ? title : localizedProductDescription(product, locale)}</div>}</article><article className="surface-card min-w-0 p-7 sm:p-9"><h2 className="flex items-center gap-3 text-3xl font-extrabold"><Ruler className="h-7 w-7 text-primary" />{dict.product.specifications}</h2><dl className="mt-6 divide-y divide-zinc-200">{specs.map(([label, value]) => <div key={label} className="flex justify-between gap-5 py-3"><dt className="text-zinc-500">{label}</dt><dd className="break-words text-right font-bold">{value}</dd></div>)}</dl></article></div></section>
    <section className="bg-white py-12"><div className="container-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center"><div><h2 className="text-2xl font-extrabold">{dict.product.deliveryTitle}</h2><p className="mt-2 max-w-3xl text-zinc-600">{dict.product.deliveryText}</p></div><Link href={href(locale, "delivery")} className="button-outline">{dict.nav.delivery}</Link></div></section>
    <section className="border-t border-zinc-200 bg-white py-14"><div className="container-shell"><h2 className="text-3xl font-extrabold">{recovered.helpTitle}</h2><p className="mt-3 max-w-3xl text-zinc-600">{recovered.helpText}</p><div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><HelpLink label={recovered.condition} path={href(locale, "conditions")} /><HelpLink label={recovered.sizes} path={href(locale, "guides", guidesByKey.sizes[locale])} /><HelpLink label={recovered.delivery} path={href(locale, "delivery")} /><HelpLink label={recovered.returns} path={href(locale, "returns")} /></div></div></section>
    {related.length > 0 && <section className="section-space bg-zinc-100"><div className="container-shell"><h2 className="section-title">{dict.product.related}</h2><div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} locale={locale} />)}</div></div></section>}
  </main>;
}

function formatDimensions(...values: Array<number | null | undefined>): string | null { return values.every((value) => typeof value === "number") ? `${values.join(" × ")} mm` : null; }
function formatBoolean(value: boolean | null | undefined, yes: string, no: string): string | null { return typeof value === "boolean" ? (value ? yes : no) : null; }
function HelpLink({ label, path }: { label: string; path: string }) { return <Link href={path} className="group flex items-center justify-between gap-4 bg-secondary p-5 font-extrabold text-[#092b4e] hover:bg-[#dcecff]"><span>{label}</span><ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" /></Link>; }

const guidesByKey = {
  sizes: { de: "container-groessen-abmessungen", en: "container-sizes-dimensions", nl: "container-maten-afmetingen", it: "dimensioni-container", cs: "velikosti-rozmery-kontejneru", es: "tamanos-dimensiones-contenedores" },
} as const;
