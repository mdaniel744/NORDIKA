import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { getEnabledLocales } from "@/lib/store-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: "Neue und gebrauchte Container, individuelle Umbauten und deutschlandweite Lieferung.",
  applicationName: SITE.name,
  icons: { icon: "/icon.svg" },
  openGraph: { siteName: SITE.name, type: "website", images: [{ url: "/og.png", width: 1729, height: 910, alt: `${SITE.name} – Containerlösungen` }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const enabledLocales = await getEnabledLocales();
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="sr-only z-[100] bg-white p-3 focus:not-sr-only focus:fixed focus:left-3 focus:top-3">{dict.common.skipContent}</a>
        <SiteHeader locale={locale} enabledLocales={enabledLocales} />
        <div id="main-content">{children}</div>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
