import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { AuthPage } from "@/components/auth-page";
import { CartPage } from "@/components/cart-page";
import { CheckoutPage } from "@/components/checkout-page";
import { CategoriesPage, CategoryPage } from "@/components/category-pages";
import { CataloguePage } from "@/components/catalogue-page";
import { ContactPage } from "@/components/contact-page";
import { GuidePage, GuidesPage } from "@/components/guide-pages";
import { getLegalCopy, LegalPage } from "@/components/legal-page";
import { LocationPage, LocationsPage } from "@/components/locations-page";
import { ProductPage } from "@/components/product-page";
import { QuotePage } from "@/components/quote-page";
import { StaticPage } from "@/components/static-page";
import { getProducts } from "@/lib/catalog";
import { categories, getCategoryBySlug, getGuideBySlug, getSimplePage, guides } from "@/lib/content";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { isProductPurchasable, localizedProductDescription, localizedProductTitle, productSlug } from "@/lib/products";
import { href, routeFromSegment, type RouteKey } from "@/lib/routes";
import { DEPOTS, SITE } from "@/lib/site";
import type { Product } from "@/types/catalog";

export const revalidate = 900;

type PageProps = {
  params: Promise<{ locale: string; segments: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const indexableStatic: RouteKey[] = ["shop", "types", "guides", "conversions", "about", "contact", "delivery", "locations", "faq", "conditions", "imprint", "privacy", "terms", "withdrawal", "withdrawalForm", "returns", "payments", "cookies", "complaints", "warranty", "accessibility"];
const authKeys: RouteKey[] = ["login", "register", "forgotPassword", "resetPassword"];
const legalKeys: RouteKey[] = ["imprint", "privacy", "terms", "withdrawal", "withdrawalForm", "returns", "payments", "cookies", "complaints", "warranty", "accessibility"];

export async function generateStaticParams() {
  const products = await getProducts();
  const params: Array<{ locale: Locale; segments: string[] }> = [];
  for (const locale of locales) {
    for (const key of [...indexableStatic, "quote", "cart", "checkout", ...authKeys] as RouteKey[]) params.push({ locale, segments: href(locale, key).split("/").filter(Boolean).slice(1) });
    for (const category of categories) params.push({ locale, segments: [href(locale, "types").split("/").at(-1)!, category.slugs[locale]] });
    for (const guide of guides) params.push({ locale, segments: [href(locale, "guides").split("/").at(-1)!, guide.slugs[locale]] });
    for (const depot of DEPOTS) params.push({ locale, segments: [href(locale, "locations").split("/").at(-1)!, depot.name.toLowerCase()] });
    for (const product of products) params.push({ locale, segments: [href(locale, "product").split("/").at(-1)!, productSlug(product, locale)] });
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, segments } = await params;
  if (!isLocale(rawLocale) || !segments[0]) return {};
  const locale = rawLocale;
  const key = routeFromSegment(locale, segments[0]);
  if (!key) return {};
  const dict = getDictionary(locale);
  let title = routeTitle(locale, key);
  let description = routeDescription(locale, key);
  let tailByLocale: Partial<Record<Locale, string>> | undefined;
  let canonicalTail = segments[1];
  let image: string | undefined;

  if (key === "product" && segments[1]) {
    const products = await getProducts();
    const product = findProduct(products, locale, segments[1]);
    if (!product) return { title: dict.product.notFound, robots: { index: false, follow: true } };
    title = localizedProductTitle(product, locale);
    description = localizedProductDescription(product, locale);
    tailByLocale = Object.fromEntries(locales.map((item) => [item, productSlug(product, item)]));
    canonicalTail = productSlug(product, locale);
    image = product.main_image || undefined;
  } else if (key === "types" && segments[1]) {
    const category = getCategoryBySlug(locale, segments[1]);
    if (!category) return {};
    title = category.titles[locale]; description = category.descriptions[locale];
    tailByLocale = Object.fromEntries(locales.map((item) => [item, category.slugs[item]]));
    canonicalTail = category.slugs[locale];
  } else if (key === "guides" && segments[1]) {
    const guide = getGuideBySlug(locale, segments[1]);
    if (!guide) return {};
    title = guide.titles[locale]; description = guide.intros[locale];
    tailByLocale = Object.fromEntries(locales.map((item) => [item, guide.slugs[item]]));
    canonicalTail = guide.slugs[locale];
  } else if (key === "locations" && segments[1]) {
    const depot = DEPOTS.find((item) => item.name.toLowerCase() === segments[1].toLowerCase());
    if (!depot) return {};
    title = `${depot.name} – ${SITE.name}`;
    description = `${depot.address}. ${getSimplePage(locale, "locations")?.intro || dict.home.intro}`;
    tailByLocale = Object.fromEntries(locales.map((item) => [item, depot.name.toLowerCase()]));
    canonicalTail = depot.name.toLowerCase();
  }

  const canonicalPath = href(locale, key, canonicalTail);
  const languages = Object.fromEntries(locales.map((item) => [item, `${SITE.url}${href(item, key, tailByLocale?.[item])}`]));
  const noIndex = key === "cart" || key === "checkout" || key === "quote" || authKeys.includes(key);
  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    alternates: { canonical: `${SITE.url}${canonicalPath}`, languages: { ...languages, "x-default": `${SITE.url}${href("de", key, tailByLocale?.de)}` } },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title: `${title} | ${SITE.name}`, description, url: `${SITE.url}${canonicalPath}`, siteName: SITE.name, type: key === "guides" && segments[1] ? "article" : "website", images: image ? [{ url: image }] : [{ url: `${SITE.url}/og.png` }], locale },
  };
}

export default async function LocalizedRoute({ params }: PageProps) {
  const { locale: rawLocale, segments } = await params;
  if (!isLocale(rawLocale) || !segments[0]) notFound();
  const locale = rawLocale;
  const key = routeFromSegment(locale, segments[0]);
  if (!key) notFound();

  if (key === "shop" && segments.length === 1) return <CataloguePage locale={locale} products={await getProducts()} />;
  if (key === "product" && segments[1] && segments.length === 2) {
    const products = await getProducts();
    const product = findProduct(products, locale, segments[1]);
    if (!product) notFound();
    const canonicalSlug = productSlug(product, locale);
    if (decodeURIComponent(segments[1]).toLowerCase() !== canonicalSlug.toLowerCase()) permanentRedirect(href(locale, "product", canonicalSlug));
    const productJsonLd = makeProductJsonLd(product, locale);
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(productJsonLd) }} /><ProductPage locale={locale} product={product} allProducts={products} /></>;
  }
  if (key === "types" && segments.length === 1) return <CategoriesPage locale={locale} />;
  if (key === "types" && segments[1] && segments.length === 2) {
    const category = getCategoryBySlug(locale, segments[1]);
    if (!category) notFound();
    return <CategoryPage locale={locale} category={category} products={await getProducts()} />;
  }
  if (key === "guides" && segments.length === 1) return <GuidesPage locale={locale} />;
  if (key === "guides" && segments[1] && segments.length === 2) {
    const guide = getGuideBySlug(locale, segments[1]);
    if (!guide) notFound();
    return <GuidePage locale={locale} guide={guide} />;
  }
  if (key === "quote" && segments.length === 1) return <QuotePage locale={locale} products={await getProducts()} />;
  if (key === "cart" && segments.length === 1) return <CartPage locale={locale} />;
  if (key === "checkout" && segments.length === 1) return <CheckoutPage locale={locale} />;
  if (key === "contact" && segments.length === 1) {
    const content = getSimplePage(locale, key); if (!content) notFound(); return <ContactPage locale={locale} content={content} />;
  }
  if (key === "locations" && segments.length === 1) {
    const content = getSimplePage(locale, key); if (!content) notFound(); return <LocationsPage locale={locale} content={content} />;
  }
  if (key === "locations" && segments[1] && segments.length === 2) {
    const depot = DEPOTS.find((item) => item.name.toLowerCase() === segments[1].toLowerCase());
    if (!depot) notFound();
    const localBusiness = { "@context": "https://schema.org", "@type": "LocalBusiness", name: `${SITE.name} ${depot.name}`, address: depot.address, telephone: depot.phone, parentOrganization: { "@type": "Organization", name: SITE.name, url: SITE.url } };
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(localBusiness) }} /><LocationPage locale={locale} depot={depot} products={await getProducts()} /></>;
  }
  if (authKeys.includes(key) && segments.length === 1) return <Suspense fallback={<main className="grid min-h-[65vh] place-items-center">{SITE.name}</main>}><AuthPage locale={locale} mode={key as "login" | "register" | "forgotPassword" | "resetPassword"} /></Suspense>;
  if (legalKeys.includes(key) && segments.length === 1) { const copy = getLegalCopy(locale, key); if (!copy) notFound(); return <LegalPage locale={locale} copy={copy} />; }
  const content = getSimplePage(locale, key);
  if (content && segments.length === 1) {
    const faqJson = key === "faq" ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: content.sections.map((section) => ({ "@type": "Question", name: section.title, acceptedAnswer: { "@type": "Answer", text: section.paragraphs.join(" ") } })) } : null;
    return <>{faqJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqJson) }} />}<StaticPage locale={locale} routeKey={key} content={content} /></>;
  }
  notFound();
}

function findProduct(products: Product[], locale: Locale, identifier: string): Product | undefined {
  const decoded = decodeURIComponent(identifier).toLowerCase();
  return products.find((product) => [product.id, product.sku, product.slug, productSlug(product, locale)].filter(Boolean).some((value) => value!.toLowerCase() === decoded) || decoded.endsWith(`-${product.sku.toLowerCase()}`));
}

function routeTitle(locale: Locale, key: RouteKey): string {
  const dict = getDictionary(locale);
  const simple = getSimplePage(locale, key);
  if (simple) return simple.title;
  const legal = getLegalCopy(locale, key);
  if (legal) return legal.title;
  const checkout: Record<Locale, string> = { de: "Kasse", en: "Checkout", nl: "Afrekenen", it: "Checkout", cs: "Pokladna", es: "Pago" };
  const map: Partial<Record<RouteKey, string>> = { shop: dict.catalogue.title, product: dict.nav.shop, types: dict.nav.types, guides: dict.nav.guides, quote: dict.nav.quote, cart: dict.nav.cart, checkout: checkout[locale], login: dict.nav.home, register: dict.nav.home, forgotPassword: dict.nav.home, resetPassword: dict.nav.home };
  return map[key] || SITE.name;
}

function routeDescription(locale: Locale, key: RouteKey): string {
  const dict = getDictionary(locale);
  return getSimplePage(locale, key)?.intro || getLegalCopy(locale, key)?.intro || (key === "shop" ? dict.catalogue.intro : dict.home.intro);
}

function makeProductJsonLd(product: Product, locale: Locale) {
  const url = `${SITE.url}${href(locale, "product", productSlug(product, locale))}`;
  const offer = product.price_gross > 0 ? { "@type": "Offer", url, priceCurrency: product.currency || "EUR", price: product.price_gross, availability: isProductPurchasable(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", itemCondition: /used|gebraucht/i.test(product.condition) ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition", seller: { "@type": "Organization", name: SITE.name } } : undefined;
  return { "@context": "https://schema.org", "@type": "Product", name: localizedProductTitle(product, locale), description: localizedProductDescription(product, locale), sku: product.sku, image: [product.main_image, ...(product.additional_images || [])].filter(Boolean), brand: { "@type": "Brand", name: SITE.name }, ...(offer ? { offers: offer } : {}) };
}

function safeJson(value: unknown): string { return JSON.stringify(value).replace(/</g, "\\u003c"); }
