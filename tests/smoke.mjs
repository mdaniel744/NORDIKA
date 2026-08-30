import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const origin = (process.env.SMOKE_ORIGIN || "http://127.0.0.1:3001").replace(/\/$/, "");
const locales = ["de", "en", "nl", "it", "cs", "es"];
const shops = { de: "container-kaufen", en: "buy-containers", nl: "containers-kopen", it: "acquista-container", cs: "koupit-kontejnery", es: "comprar-contenedores" };
const checkouts = { de: "kasse", en: "checkout", nl: "afrekenen", it: "checkout", cs: "pokladna", es: "pago" };
const extraPaths = ["/de/container-typen", "/en/guides/container-buying-guide", "/nl/contact", "/it/chi-siamo", "/cs/doprava-usazeni", "/es/aviso-legal"];
const recoveredPolicyPaths = {
  de: ["cookie-richtlinie", "reklamation", "gewaehrleistung", "barrierefreiheit", "muster-widerrufsformular"],
  en: ["cookie-policy", "complaints", "warranty", "accessibility", "model-withdrawal-form"],
  nl: ["cookiebeleid", "klachten", "garantie", "toegankelijkheid", "modelformulier-herroeping"],
  it: ["cookie-policy", "reclami", "garanzia", "accessibilita", "modulo-recesso"],
  cs: ["zasady-cookies", "reklamace", "zaruka", "pristupnost", "vzorovy-formular-odstoupeni"],
  es: ["politica-cookies", "reclamaciones", "garantia", "accesibilidad", "formulario-desistimiento"],
};

const root = await fetch(`${origin}/`, { redirect: "manual" });
assert.ok([301, 307, 308].includes(root.status), `root redirect returned ${root.status}`);
assert.equal(new URL(root.headers.get("location"), origin).pathname, "/de");

for (const locale of locales) {
  await checkPage(`/${locale}`, locale);
  const shopHtml = await checkPage(`/${locale}/${shops[locale]}`, locale);
  const productPath = shopHtml.match(new RegExp(`href="(/${locale}/(?:container|contenedor|kontejner)/[^"]+)"`))?.[1];
  assert.ok(productPath, `${locale} shop has no product link`);
  const productHtml = await checkPage(productPath, locale);
  assert.match(productHtml, /"@type":"Product"/, `${productPath} lacks Product JSON-LD`);
  assert.match(productHtml, /(?:In den Warenkorb|Add to cart|In winkelwagen|Aggiungi al carrello|Přidat do košíku|Añadir al carrito)/i, `${productPath} lacks add-to-cart control`);
  assert.doesNotMatch(productHtml, /(?:Direkt zur Kasse|Buy now|Nu kopen|Acquista ora|Koupit nyní|Comprar ahora)/i, `${productPath} still contains buy-now control`);
  const checkoutHtml = await checkPage(`/${locale}/${checkouts[locale]}`, locale);
  assert.match(checkoutHtml, /noindex/i, `${locale} checkout should not be indexed`);
}

for (const path of extraPaths) await checkPage(path, path.split("/")[1]);
for (const locale of locales) for (const segment of recoveredPolicyPaths[locale]) await checkPage(`/${locale}/${segment}`, locale);

for (const [legacyPath, expected] of [["/widerruf", "/de/widerrufsrecht"], ["/container-kaufen", "/de/container-kaufen"], ["/reklamation", "/de/reklamation"]]) {
  const response = await fetch(`${origin}${legacyPath}`, { redirect: "manual" });
  assert.ok([301, 307, 308].includes(response.status), `${legacyPath} redirect returned ${response.status}`);
  assert.equal(new URL(response.headers.get("location"), origin).pathname, expected, `${legacyPath} redirect target`);
}

for (const removedPath of ["/login", "/register", "/oauth-consent", "/en/login", "/de/anmelden", "/api/apps/unused-prototype-route"]) {
  const response = await fetch(`${origin}${removedPath}`, { redirect: "manual" });
  assert.equal(response.status, 404, `${removedPath} should be removed`);
}

const packageSource = await readFile(new URL("../package.json", import.meta.url), "utf8");
for (const retiredPackage of ["@base" + "44/sdk", "base" + "44"]) assert.ok(!Object.keys(JSON.parse(packageSource).dependencies || {}).includes(retiredPackage) && !Object.keys(JSON.parse(packageSource).devDependencies || {}).includes(retiredPackage), `retired package remains: ${retiredPackage}`);
const nextConfigSource = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
assert.doesNotMatch(nextConfigSource, /source:\s*["']\/api\/apps/i, "prototype API rewrite remains");

const filtered = await fetch(`${origin}/de/container-kaufen?q=20`);
assert.match(filtered.headers.get("x-robots-tag") || "", /noindex/i, "filtered catalogue lacks X-Robots-Tag noindex");

const robots = await fetch(`${origin}/robots.txt`);
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Sitemap: .*sitemap\.xml/);

const sitemap = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemap.status, 200);
const sitemapXml = await sitemap.text();
assert.match(sitemapXml, /nordikacontainer\.com\/de\/container-kaufen/);
assert.match(sitemapXml, /hreflang="es"/);

const imprintHtml = await checkPage("/de/impressum", "de");
for (const value of ["NORDIKA Container GmbH", "Amtsgericht Hamburg", "HRB 147066", "Amtsgericht Pinneberg", "HRB 12002 PI", "DEK1101R.HRB147066", "DE 300860969", "Nikolaus-Otto-Str. 9", "info@nordikacontainer.com"]) assert.match(imprintHtml, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `imprint lacks ${value}`);
const addressHtml = await checkPage("/de/standorte", "de");
assert.match(addressHtml, /Nikolaus-Otto-Str\. 9/, "address page lacks the Mainz address");

const shippingHtml = await checkPage("/de/lieferung-aufstellung", "de");
for (const value of ["GERMANY_HANDLING_DAYS", "GERMANY_TRANSIT_DAYS", "EU_HANDLING_DAYS", "EU_TRANSIT_DAYS", "Versand- und Lieferbedingungen", "individuell berechnet", "Portugal"]) assert.match(shippingHtml, new RegExp(value, "i"), `shipping policy lacks ${value}`);
const returnsHtml = await checkPage("/de/rueckgabe-erstattung", "de");
for (const value of ["kein allgemeines freiwilliges Rückgaberecht", "14 Tagen", "eigenen Rücktransport", "Gebrauchte Container"]) assert.match(returnsHtml, new RegExp(value, "i"), `return policy lacks ${value}`);
const withdrawalHtml = await checkPage("/de/widerrufsrecht", "de");
assert.match(withdrawalHtml, /binnen 14 Tagen/i, "withdrawal policy lacks the statutory period");
assert.match(withdrawalHtml, /kundenspezifisch/i, "withdrawal policy lacks the custom-goods qualification");
const termsHtml = await checkPage("/de/agb", "de");
assert.match(termsHtml, /§ 377 HGB/i, "terms lack the commercial inspection rule");
assert.match(termsHtml, /kein allgemeines freiwilliges Rückgaberecht/i, "terms conflict with return policy");
const paymentHtml = await checkPage("/de/zahlungsarten", "de");
assert.match(paymentHtml, /SEPA-Zahlungsanforderung/i, "payment page does not describe the checkout workflow");
assert.match(paymentHtml, /innergemeinschaftlichen Lieferung/i, "payment page lacks intra-EU business VAT treatment");

await checkPage("/en/request-quote", "en");
const quoteSource = await readFile(new URL("../components/quote-wizard.tsx", import.meta.url), "utf8");
for (const value of ['name="baseType"', 'name="street"', 'name="houseNumber"', 'name="postcode"', 'name="city"', 'name="countryCode"']) assert.match(quoteSource, new RegExp(value, "i"), `quote flow lacks ${value}`);
assert.match(quoteSource, /categories\.map/, "quote item dropdown is not populated from product categories");
assert.doesNotMatch(quoteSource, /label: `\$\{localizedProductTitle/, "quote item dropdown still renders individual products");
assert.match(quoteSource, /countryOptions/, "quote country dropdown is not populated from the EU delivery list");

const invalidEnquiry = await fetch(`${origin}/api/enquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
assert.equal(invalidEnquiry.status, 400, "invalid enquiry should be rejected without writing data");
const invalidOrder = await fetch(`${origin}/api/orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
assert.equal(invalidOrder.status, 400, "invalid order should be rejected without writing data");

console.log(`Smoke test passed for ${locales.length} locales, dynamic products, content, SEO files, filtered noindex, and API validation.`);

async function checkPage(path, locale) {
  const response = await fetch(`${origin}${path}`, { redirect: "follow" });
  assert.equal(response.status, 200, `${path} returned ${response.status}`);
  const html = await response.text();
  assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), `${path} has wrong lang`);
  assert.match(html, /NORDIKA Container/i, `${path} lacks NORDIKA brand`);
  assert.doesNotMatch(html, /Baltes Container|Wadgassen|Karlshagen|Warszawa/i, `${path} exposes former company information`);
  assert.doesNotMatch(html, /Contesol/i, `${path} contains Contesol`);
  assert.doesNotMatch(html, /\[VERIFY\]/i, `${path} exposes a verification placeholder`);
  assert.doesNotMatch(html, /(?:€\s*180|PayPal|24[- ]hour response|30[- ]day return)/i, `${path} exposes an unsupported legacy promise`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path} must contain one h1`);
  assert.match(html, /<title>[^<]+<\/title>/, `${path} lacks title`);
  assert.match(html, /rel="canonical"/, `${path} lacks canonical`);
  for (const language of locales) assert.match(html, new RegExp(`hrefLang="${language}"`, "i"), `${path} lacks hreflang ${language}`);
  assert.match(html, /hrefLang="x-default"/i, `${path} lacks x-default hreflang`);
  return html;
}
