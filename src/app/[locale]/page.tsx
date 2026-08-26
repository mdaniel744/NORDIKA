import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { getProducts } from "@/lib/catalog";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const languages = Object.fromEntries(locales.map((item) => [item, `${SITE.url}${href(item, "home")}`]));
  return {
    metadataBase: new URL(SITE.url),
    title: dict.home.eyebrow,
    description: dict.home.intro,
    alternates: { canonical: `${SITE.url}${href(locale, "home")}`, languages: { ...languages, "x-default": `${SITE.url}${href("de", "home")}` } },
    openGraph: { title: `${dict.home.eyebrow} | ${SITE.name}`, description: dict.home.intro, url: `${SITE.url}${href(locale, "home")}`, images: [{ url: `${SITE.url}/og.png` }], locale },
  };
}

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const products = await getProducts();
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, legalName: SITE.legalName, url: SITE.url, email: SITE.email, telephone: SITE.phone, identifier: [...SITE.commercialRegisters.map((entry) => ({ "@type": "PropertyValue", propertyID: entry.court, value: entry.number })), { "@type": "PropertyValue", propertyID: "EUID", value: SITE.euid }, { "@type": "PropertyValue", propertyID: "USt-IdNr.", value: SITE.vatId }], address: { "@type": "PostalAddress", streetAddress: SITE.address.street, postalCode: SITE.address.postalCode, addressLocality: SITE.address.city, addressCountry: SITE.address.country } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} /><HomePage locale={locale} products={products} /></>;
}
