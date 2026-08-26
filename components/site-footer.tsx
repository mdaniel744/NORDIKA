import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandWordmark } from "@/components/brand-wordmark";
import { categories, guides } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";
import { SITE } from "@/lib/site";

const labels: Record<Locale, { containers: string; company: string; service: string; guides: string; legal: string; delivery: string; returns: string; payments: string; complaints: string; warranty: string; imprint: string; privacy: string; cookies: string; terms: string; withdrawal: string; accessibility: string }> = {
  de: { containers: "Container", company: "Unternehmen", service: "Kundenservice", guides: "Ratgeber", legal: "Rechtliches", delivery: "Versand & Lieferung", returns: "Rückgabe & Erstattung", payments: "Zahlungsarten", complaints: "Reklamation", warranty: "Gewährleistung", imprint: "Impressum", privacy: "Datenschutz", cookies: "Cookie-Richtlinie", terms: "AGB", withdrawal: "Widerrufsrecht", accessibility: "Barrierefreiheit" },
  en: { containers: "Containers", company: "Company", service: "Customer service", guides: "Guides", legal: "Legal", delivery: "Shipping & delivery", returns: "Returns & refunds", payments: "Payment methods", complaints: "Complaints", warranty: "Warranty", imprint: "Legal notice", privacy: "Privacy", cookies: "Cookie policy", terms: "Terms", withdrawal: "Right of withdrawal", accessibility: "Accessibility" },
  nl: { containers: "Containers", company: "Bedrijf", service: "Klantenservice", guides: "Advies", legal: "Juridisch", delivery: "Verzending & levering", returns: "Retouren", payments: "Betaalmethoden", complaints: "Klachten", warranty: "Garantie", imprint: "Colofon", privacy: "Privacy", cookies: "Cookiebeleid", terms: "Voorwaarden", withdrawal: "Herroepingsrecht", accessibility: "Toegankelijkheid" },
  it: { containers: "Container", company: "Azienda", service: "Servizio clienti", guides: "Guide", legal: "Informazioni legali", delivery: "Spedizione e consegna", returns: "Resi e rimborsi", payments: "Metodi di pagamento", complaints: "Reclami", warranty: "Garanzia", imprint: "Note legali", privacy: "Privacy", cookies: "Cookie policy", terms: "Condizioni", withdrawal: "Diritto di recesso", accessibility: "Accessibilità" },
  cs: { containers: "Kontejnery", company: "Společnost", service: "Zákaznický servis", guides: "Průvodci", legal: "Právní informace", delivery: "Přeprava a doručení", returns: "Vrácení a refundace", payments: "Platební metody", complaints: "Reklamace", warranty: "Záruka", imprint: "Právní informace", privacy: "Ochrana soukromí", cookies: "Zásady cookies", terms: "Obchodní podmínky", withdrawal: "Odstoupení", accessibility: "Přístupnost" },
  es: { containers: "Contenedores", company: "Empresa", service: "Atención al cliente", guides: "Guías", legal: "Información legal", delivery: "Envío y entrega", returns: "Devoluciones", payments: "Métodos de pago", complaints: "Reclamaciones", warranty: "Garantía", imprint: "Aviso legal", privacy: "Privacidad", cookies: "Política de cookies", terms: "Condiciones", withdrawal: "Desistimiento", accessibility: "Accesibilidad" },
};

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = labels[locale];
  const route = (label: string, key: RouteKey, tail?: string) => ({ label, path: href(locale, key, tail) });
  const columns = [
    { title: copy.containers, links: [route(dict.nav.shop, "shop"), ...categories.map((category) => route(category.titles[locale], "types", category.slugs[locale]))] },
    { title: copy.company, links: [route(dict.nav.about, "about"), route(dict.nav.contact, "contact"), route(dict.nav.locations, "locations"), route(dict.nav.faq, "faq"), route(dict.nav.conversions, "conversions")] },
    { title: copy.service, links: [route(dict.nav.quote, "quote"), route(copy.delivery, "delivery"), route(copy.returns, "returns"), route(copy.payments, "payments"), route(copy.complaints, "complaints"), route(copy.warranty, "warranty")] },
    { title: copy.guides, links: [route(dict.nav.guides, "guides"), ...guides.map((guide) => route(guide.titles[locale], "guides", guide.slugs[locale]))] },
    { title: copy.legal, links: [route(copy.imprint, "imprint"), route(copy.privacy, "privacy"), route(copy.cookies, "cookies"), route(copy.terms, "terms"), route(copy.withdrawal, "withdrawal"), route(copy.accessibility, "accessibility")] },
  ];

  return (
    <footer className="bg-[#031f3b] text-blue-50/75">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1fr_2.4fr] lg:py-20">
        <div>
          <div className="mb-6"><BrandWordmark inverse /></div>
          <p className="max-w-md text-sm leading-7 text-blue-50/65">{dict.footer.summary}</p>
          <div className="mt-7 grid gap-3 text-sm">
            <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-[#ffb33e]" />{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-[#ffb33e]" />{SITE.email}</a>
            <span className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ffb33e]" />{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">{column.title}</h2>
              <ul className="grid gap-2.5 text-sm">
                {column.links.map((link) => <li key={link.path}><Link className="hover:text-white" href={link.path}>{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-blue-50/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}. {dict.footer.rights}</p>
          <p>{dict.footer.notice}</p>
        </div>
      </div>
    </footer>
  );
}
