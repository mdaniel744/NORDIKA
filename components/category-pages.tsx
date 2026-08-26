import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { categories, type CategoryDefinition } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { IMAGES } from "@/lib/assets";
import type { Product } from "@/types/catalog";

const categoryImages = [
  IMAGES.typeShipping,
  IMAGES.typeHighCube,
  IMAGES.typeOpenSide,
  IMAGES.typeRefrigerated,
  IMAGES.typeOffice,
];

const buyingCopy: Record<Locale, { eyebrow: string; title: string; intro: string; checks: string[]; condition: string; sizes: string; delivery: string; quote: string }> = {
  de: { eyebrow: "Kaufentscheidung", title: "Welcher Container passt?", intro: "Neben dem Typ entscheiden tatsächlicher Platzbedarf, Türzugang, Zustandsklasse und die Bedingungen am Aufstellort.", checks: ["Innen-, Außen- und Türmaße am konkreten Produkt prüfen", "One Trip, Cargo Worthy oder WWT nach Nutzung und Optik wählen", "Zufahrt, tragfähigen Untergrund und Entladeposition dokumentieren", "Umbauten, Elektrik oder zusätzliche Zugänge vor Bestellung abstimmen"], condition: "Zustandsklassen", sizes: "Größenratgeber", delivery: "Lieferung planen", quote: "Projekt anfragen" },
  en: { eyebrow: "Buying decision", title: "Which container fits?", intro: "Beyond the type, consider actual space, door access, condition grade and the installation site.", checks: ["Check internal, external and door dimensions on the product", "Choose one-trip, cargo-worthy or WWT for the use and appearance", "Document access, load-bearing ground and unloading position", "Agree conversions, electrics or extra access before ordering"], condition: "Condition grades", sizes: "Size guide", delivery: "Plan delivery", quote: "Discuss a project" },
  nl: { eyebrow: "Aankoopkeuze", title: "Welke container past?", intro: "Naast het type tellen werkelijke ruimte, deurtoegang, conditie en de omstandigheden op locatie.", checks: ["Controleer binnen-, buiten- en deurmaten bij het product", "Kies one trip, cargo worthy of WWT op basis van gebruik en uitstraling", "Leg toegang, draagkrachtige ondergrond en lospositie vast", "Stem ombouw, elektra of extra toegang vóór bestelling af"], condition: "Conditieklassen", sizes: "Matengids", delivery: "Levering plannen", quote: "Project bespreken" },
  it: { eyebrow: "Scelta d'acquisto", title: "Quale container è adatto?", intro: "Oltre al tipo contano spazio reale, accesso alle porte, condizione e caratteristiche del sito.", checks: ["Controlla misure interne, esterne e delle porte sul prodotto", "Scegli one trip, cargo worthy o WWT in base a uso ed estetica", "Documenta accesso, terreno portante e posizione di scarico", "Concorda trasformazioni, impianto elettrico o accessi prima dell'ordine"], condition: "Classi di condizione", sizes: "Guida alle misure", delivery: "Pianificare la consegna", quote: "Parlare del progetto" },
  cs: { eyebrow: "Rozhodnutí o nákupu", title: "Který kontejner se hodí?", intro: "Vedle typu zvažte skutečný prostor, přístup dveřmi, třídu stavu a podmínky místa.", checks: ["Ověřte vnitřní, vnější a dveřní rozměry produktu", "Zvolte one trip, cargo worthy nebo WWT podle využití a vzhledu", "Zdokumentujte příjezd, únosný podklad a místo vykládky", "Úpravy, elektroinstalaci a další vstupy dohodněte před objednávkou"], condition: "Třídy stavu", sizes: "Průvodce velikostmi", delivery: "Naplánovat dopravu", quote: "Projednat projekt" },
  es: { eyebrow: "Decisión de compra", title: "¿Qué contenedor encaja?", intro: "Además del tipo, valora espacio real, acceso por puertas, grado de estado y condiciones del lugar.", checks: ["Comprueba medidas interiores, exteriores y de puertas en el producto", "Elige one trip, cargo worthy o WWT según uso y aspecto", "Documenta acceso, suelo portante y posición de descarga", "Acuerda transformaciones, electricidad o accesos antes de pedir"], condition: "Grados de estado", sizes: "Guía de tamaños", delivery: "Planificar entrega", quote: "Consultar proyecto" },
};

const sizeGuideSlugs: Record<Locale, string> = { de: "container-groessen-abmessungen", en: "container-sizes-dimensions", nl: "container-maten-afmetingen", it: "dimensioni-container", cs: "velikosti-rozmery-kontejneru", es: "tamanos-dimensiones-contenedores" };

export function CategoriesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return <main><Breadcrumbs locale={locale} items={[{ label: dict.nav.types }]} /><PageHero eyebrow={dict.home.categoriesEyebrow} title={dict.home.categoriesTitle} intro={dict.home.finderText} /><section className="section-space bg-white"><div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">{categories.map((category, index) => <Link key={category.key} href={href(locale, "types", category.slugs[locale])} className="group surface-card overflow-hidden"><div className="relative aspect-[16/10] overflow-hidden bg-zinc-100"><Image src={categoryImages[index]} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-6"><h2 className="text-2xl font-extrabold">{category.titles[locale]}</h2><p className="mt-3 text-zinc-600">{category.descriptions[locale]}</p><span className="mt-5 inline-flex items-center gap-2 font-extrabold text-primary">{dict.common.viewAll}<ArrowRight className="h-4 w-4" /></span></div></Link>)}</div></section></main>;
}

export function CategoryPage({ locale, category, products }: { locale: Locale; category: CategoryDefinition; products: Product[] }) {
  const dict = getDictionary(locale);
  const help = buyingCopy[locale];
  const matching = products.filter((product) => category.match(product.product_type || "", product.sku || ""));
  return <main><Breadcrumbs locale={locale} items={[{ label: dict.nav.types, href: href(locale, "types") }, { label: category.titles[locale] }]} /><PageHero eyebrow={dict.home.categoriesEyebrow} title={category.titles[locale]} intro={category.descriptions[locale]} /><section className="section-space bg-zinc-100"><div className="container-shell">{matching.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{matching.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div> : <div className="surface-card p-10 text-center"><p>{dict.common.noResults}</p><Link href={href(locale, "quote")} className="button-primary mt-6">{dict.nav.quote}</Link></div>}</div></section><section className="section-space bg-white"><div className="container-shell grid gap-10 lg:grid-cols-[1fr_.9fr]"><div><p className="eyebrow">{help.eyebrow}</p><h2 className="section-title">{help.title}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">{help.intro}</p><ul className="mt-8 grid gap-4">{help.checks.map((item) => <li key={item} className="flex items-start gap-3"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ffb33e]"><Check className="h-4 w-4 text-[#092b4e]" /></span><span>{item}</span></li>)}</ul></div><nav className="grid content-start gap-3 bg-secondary p-7" aria-label={help.title}><CategoryHelpLink label={help.condition} path={href(locale, "conditions")} /><CategoryHelpLink label={help.sizes} path={href(locale, "guides", sizeGuideSlugs[locale])} /><CategoryHelpLink label={help.delivery} path={href(locale, "delivery")} /><CategoryHelpLink label={help.quote} path={href(locale, "quote")} /></nav></div></section></main>;
}

function CategoryHelpLink({ label, path }: { label: string; path: string }) { return <Link href={path} className="group flex items-center justify-between gap-4 bg-white p-5 font-extrabold text-[#092b4e] hover:text-primary">{label}<ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></Link>; }
