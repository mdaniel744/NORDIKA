import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { categories, guides } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n";
import { productSlug } from "@/lib/products";
import { href, type RouteKey } from "@/lib/routes";
import { DEPOTS, SITE } from "@/lib/site";

const staticKeys: RouteKey[] = ["home", "shop", "types", "guides", "conversions", "about", "contact", "delivery", "locations", "faq", "conditions", "imprint", "privacy", "terms", "withdrawal", "withdrawalForm", "returns", "payments", "cookies", "complaints", "warranty", "accessibility"];
const contentModified = new Date("2026-08-23T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  for (const key of staticKeys) {
    const alternate = languageMap((locale) => href(locale, key));
    for (const locale of locales) entries.push({ url: absolute(href(locale, key)), lastModified: contentModified, changeFrequency: key === "shop" || key === "home" ? "daily" : "monthly", priority: key === "home" ? 1 : key === "shop" ? 0.9 : 0.65, alternates: { languages: alternate } });
  }
  for (const category of categories) {
    const alternate = languageMap((locale) => href(locale, "types", category.slugs[locale]));
    for (const locale of locales) entries.push({ url: absolute(href(locale, "types", category.slugs[locale])), lastModified: contentModified, changeFrequency: "weekly", priority: 0.8, alternates: { languages: alternate } });
  }
  for (const guide of guides) {
    const alternate = languageMap((locale) => href(locale, "guides", guide.slugs[locale]));
    for (const locale of locales) entries.push({ url: absolute(href(locale, "guides", guide.slugs[locale])), lastModified: contentModified, changeFrequency: "monthly", priority: 0.7, alternates: { languages: alternate } });
  }
  for (const depot of DEPOTS) {
    const alternate = languageMap((locale) => href(locale, "locations", depot.name.toLowerCase()));
    for (const locale of locales) entries.push({ url: absolute(href(locale, "locations", depot.name.toLowerCase())), lastModified: contentModified, changeFrequency: "monthly", priority: 0.65, alternates: { languages: alternate } });
  }
  for (const product of await getProducts()) {
    const alternate = languageMap((locale) => href(locale, "product", productSlug(product, locale)));
    for (const locale of locales) entries.push({ url: absolute(href(locale, "product", productSlug(product, locale))), lastModified: product.updated_date ? new Date(product.updated_date) : contentModified, changeFrequency: "daily", priority: 0.85, alternates: { languages: alternate }, images: product.main_image ? [product.main_image] : undefined });
  }
  return entries;
}

function absolute(path: string) { return `${SITE.url}${path}`; }
function languageMap(path: (locale: Locale) => string): Record<string, string> { return { ...Object.fromEntries(locales.map((locale) => [locale, absolute(path(locale))])), "x-default": absolute(path("de")) }; }
