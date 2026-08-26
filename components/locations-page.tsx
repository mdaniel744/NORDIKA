import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import type { PageContent } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { DEPOTS, SITE } from "@/lib/site";
import type { Product } from "@/types/catalog";

const addressCopy: Record<Locale, { label: string; appointment: string }> = {
  de: { label: "Unternehmensadresse", appointment: "Bitte vereinbaren Sie vor einem Besuch einen Termin." },
  en: { label: "Company address", appointment: "Please arrange an appointment before visiting." },
  nl: { label: "Bedrijfsadres", appointment: "Maak vóór uw bezoek een afspraak." },
  it: { label: "Indirizzo aziendale", appointment: "Concorda un appuntamento prima della visita." },
  cs: { label: "Adresa společnosti", appointment: "Před návštěvou si prosím domluvte termín." },
  es: { label: "Dirección de la empresa", appointment: "Concierta una cita antes de visitarnos." },
};

export function LocationsPage({ locale, content }: { locale: Locale; content: PageContent }) {
  const copy = addressCopy[locale];
  return (
    <main>
      <Breadcrumbs locale={locale} items={[{ label: content.title }]} />
      <PageHero eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <section className="section-space bg-zinc-100">
        <div className="container-shell">
          <article className="surface-card max-w-3xl p-7 sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">{copy.label}</p>
            <h2 className="mt-3 text-3xl font-extrabold">{SITE.legalName}</h2>
            <div className="mt-7 grid gap-4 text-zinc-600">
              <p className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />{SITE.address.street}, D-{SITE.address.postalCode} {SITE.address.city}</p>
              <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3 font-bold text-zinc-900 hover:text-primary"><Phone className="h-5 w-5 text-primary" />{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 font-bold text-zinc-900 hover:text-primary"><Mail className="h-5 w-5 text-primary" />{SITE.email}</a>
            </div>
            <p className="mt-7 border-t border-zinc-200 pt-6 text-sm text-zinc-600">{copy.appointment}</p>
          </article>
        </div>
      </section>
    </main>
  );
}

const locationIntro: Record<Locale, string> = {
  de: "Unsere zentrale Unternehmensadresse für Beratung, Angebote und Projektabwicklung.",
  en: "Our central company address for advice, quotations and project coordination.",
  nl: "Ons centrale bedrijfsadres voor advies, offertes en projectbegeleiding.",
  it: "Il nostro indirizzo centrale per consulenza, offerte e gestione dei progetti.",
  cs: "Naše centrální adresa pro poradenství, nabídky a koordinaci projektů.",
  es: "Nuestra dirección central para asesoramiento, presupuestos y coordinación de proyectos.",
};

export function LocationPage({ locale, depot, products }: { locale: Locale; depot: (typeof DEPOTS)[number]; products: Product[] }) {
  const dict = getDictionary(locale);
  const featured = products.slice(0, 6);
  return (
    <main>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.locations, href: href(locale, "locations") }, { label: depot.name }]} />
      <PageHero eyebrow={SITE.name} title={depot.name} intro={locationIntro[locale]} />
      <section className="bg-white py-12">
        <div className="container-shell grid gap-6 sm:grid-cols-2">
          <p className="flex items-start gap-3 text-zinc-600"><MapPin className="mt-1 h-5 w-5 text-primary" />{depot.address}</p>
          <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3 font-bold hover:text-primary"><Phone className="h-5 w-5 text-primary" />{SITE.phone}</a>
        </div>
      </section>
      {featured.length > 0 && <section className="section-space bg-zinc-100"><div className="container-shell"><h2 className="section-title">{dict.home.featuredTitle}</h2><div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{featured.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div></div></section>}
      <section className="bg-white pb-16"><div className="container-shell"><Link href={href(locale, "quote")} className="button-primary">{dict.nav.quote}</Link></div></section>
    </main>
  );
}
