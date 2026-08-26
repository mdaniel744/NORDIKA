import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { QuoteWizard } from "@/components/quote-wizard";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import type { Product } from "@/types/catalog";

const intro: Record<Locale, string> = { de: "Beschreiben Sie Container, Lieferort und Projekt. Wir prüfen Bestand und Logistik und melden uns mit einer konkreten Lösung.", en: "Describe the container, delivery location and project. We will check stock and logistics and respond with a specific solution.", nl: "Beschrijf container, leverlocatie en project. We controleren voorraad en logistiek en reageren met een concrete oplossing.", it: "Descrivi container, luogo di consegna e progetto. Verificheremo stock e logistica e risponderemo con una soluzione concreta.", cs: "Popište kontejner, místo dodání a projekt. Prověříme sklad a logistiku a navrhneme konkrétní řešení.", es: "Describe el contenedor, la ubicación y el proyecto. Revisaremos stock y logística y responderemos con una solución concreta." };

export function QuotePage({ locale, products }: { locale: Locale; products: Product[] }) { const dict = getDictionary(locale); return <main><Breadcrumbs locale={locale} items={[{ label: dict.nav.quote }]} /><PageHero eyebrow={SITE.name} title={dict.nav.quote} intro={intro[locale]} /><section className="section-space bg-zinc-100"><div className="container-shell"><Suspense fallback={<div className="surface-card p-8">{dict.common.loading}</div>}><QuoteWizard locale={locale} products={products} /></Suspense></div></section></main>; }
