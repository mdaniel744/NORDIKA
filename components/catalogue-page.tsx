import { Breadcrumbs } from "@/components/breadcrumbs";
import { CatalogueClient } from "@/components/catalogue-client";
import { PageHero } from "@/components/page-hero";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import type { Product } from "@/types/catalog";

const catalogueHelp: Record<Locale, { title: string; text: string; condition: string; sizes: string; delivery: string; quote: string }> = {
  de: { title: "Vor der Auswahl vergleichen", text: "Zustand, tatsächliche Maße, Depot und Lieferbedingungen gehören zur Kaufentscheidung. Die Produktseite zeigt nur vorhandene technische Daten; offene Punkte klären wir im Angebot.", condition: "Zustandsklassen", sizes: "Größen & Abmessungen", delivery: "Lieferung vorbereiten", quote: "Angebot anfragen" },
  en: { title: "Compare before choosing", text: "Condition, actual dimensions, depot and delivery are part of the buying decision. Product pages show available technical data; the offer clarifies open points.", condition: "Condition grades", sizes: "Sizes & dimensions", delivery: "Prepare delivery", quote: "Request a quote" },
  nl: { title: "Vergelijk vóór de keuze", text: "Conditie, werkelijke maten, depot en levering horen bij de aankoop. Productpagina's tonen beschikbare technische gegevens; de offerte verduidelijkt open punten.", condition: "Conditieklassen", sizes: "Maten & afmetingen", delivery: "Levering voorbereiden", quote: "Offerte aanvragen" },
  it: { title: "Confronta prima di scegliere", text: "Condizione, misure reali, deposito e consegna fanno parte della scelta. La pagina mostra i dati disponibili; l'offerta chiarisce i punti aperti.", condition: "Classi di condizione", sizes: "Misure e dimensioni", delivery: "Preparare la consegna", quote: "Richiedi preventivo" },
  cs: { title: "Před výběrem porovnejte", text: "Stav, skutečné rozměry, depo a doprava patří k rozhodnutí. Produkt uvádí dostupná technická data; otevřené body upřesní nabídka.", condition: "Třídy stavu", sizes: "Velikosti a rozměry", delivery: "Připravit dopravu", quote: "Poptat nabídku" },
  es: { title: "Compara antes de elegir", text: "Estado, medidas reales, depósito y entrega forman parte de la compra. La página muestra los datos disponibles; la oferta aclara lo pendiente.", condition: "Grados de estado", sizes: "Tamaños y medidas", delivery: "Preparar entrega", quote: "Solicitar presupuesto" },
};

const sizeGuides: Record<Locale, string> = { de: "container-groessen-abmessungen", en: "container-sizes-dimensions", nl: "container-maten-afmetingen", it: "dimensioni-container", cs: "velikosti-rozmery-kontejneru", es: "tamanos-dimensiones-contenedores" };

export function CataloguePage({ locale, products }: { locale: Locale; products: Product[] }) {
  const dict = getDictionary(locale);
  const help = catalogueHelp[locale];
  const links = [{ label: help.condition, path: href(locale, "conditions") }, { label: help.sizes, path: href(locale, "guides", sizeGuides[locale]) }, { label: help.delivery, path: href(locale, "delivery") }, { label: help.quote, path: href(locale, "quote") }];
  return <main><Breadcrumbs locale={locale} items={[{ label: dict.catalogue.title }]} /><PageHero eyebrow={dict.catalogue.eyebrow} title={dict.catalogue.title} intro={dict.catalogue.intro} /><CatalogueClient locale={locale} products={products} /><section className="section-space border-t border-zinc-200 bg-white"><div className="container-shell"><h2 className="section-title">{help.title}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">{help.text}</p><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{links.map((link) => <Link key={link.path} href={link.path} className="group flex items-center justify-between gap-4 bg-secondary p-5 font-extrabold text-[#092b4e] hover:text-primary">{link.label}<ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></Link>)}</div></div></section></main>;
}
import Link from "next/link";
import { ArrowRight } from "lucide-react";
