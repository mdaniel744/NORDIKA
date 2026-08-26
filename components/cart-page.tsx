"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CART_EVENT, CART_KEY, type CartItem, readCart, writeCart } from "@/lib/cart";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";

const cartCopy: Record<Locale, { empty: string; summary: string; net: string; vat: string; total: string; delivery: string; checkout: string; quote: string; continue: string; remove: string; note: string }> = {
  de: { empty: "Ihr Warenkorb ist leer.", summary: "Zusammenfassung", net: "Nettowarenwert", vat: "MwSt. (19 %)", total: "Warenwert inkl. MwSt.", delivery: "Lieferkosten werden nach Eingabe der Lieferadresse und Entladeart geprüft.", checkout: "Zur Kasse", quote: "Angebot für Großauftrag", continue: "Weiter einkaufen", remove: "Entfernen", note: "Produktpreise enthalten die deutsche MwSt. Der endgültige Steuerbetrag, die Verfügbarkeit und die Lieferkosten werden vor Zahlung bestätigt." },
  en: { empty: "Your cart is empty.", summary: "Summary", net: "Net goods", vat: "VAT (19%)", total: "Goods incl. VAT", delivery: "Delivery cost is reviewed after the exact address and unloading method are provided.", checkout: "Proceed to checkout", quote: "Bulk order quote", continue: "Continue shopping", remove: "Remove", note: "Product prices include German VAT. The final tax treatment, availability and delivery cost are confirmed before payment." },
  nl: { empty: "Uw winkelwagen is leeg.", summary: "Overzicht", net: "Netto goederen", vat: "Btw (19%)", total: "Goederen incl. btw", delivery: "De bezorgkosten worden gecontroleerd na invoer van het exacte adres en de losmethode.", checkout: "Naar afrekenen", quote: "Offerte voor bulkbestelling", continue: "Verder winkelen", remove: "Verwijderen", note: "Productprijzen zijn inclusief Duitse btw. Belastingen, beschikbaarheid en levering worden vóór betaling bevestigd." },
  it: { empty: "Il carrello è vuoto.", summary: "Riepilogo", net: "Merce netta", vat: "IVA (19%)", total: "Merce IVA inclusa", delivery: "Il costo di consegna viene verificato dopo l'indirizzo esatto e il metodo di scarico.", checkout: "Vai al checkout", quote: "Preventivo ordine multiplo", continue: "Continua gli acquisti", remove: "Rimuovi", note: "I prezzi includono l'IVA tedesca. Trattamento fiscale, disponibilità e consegna sono confermati prima del pagamento." },
  cs: { empty: "Košík je prázdný.", summary: "Souhrn", net: "Zboží bez DPH", vat: "DPH (19 %)", total: "Zboží vč. DPH", delivery: "Cena dopravy bude posouzena po zadání přesné adresy a způsobu vykládky.", checkout: "Pokračovat k pokladně", quote: "Nabídka pro větší objednávku", continue: "Pokračovat v nákupu", remove: "Odebrat", note: "Ceny produktů obsahují německou DPH. Daň, dostupnost a doprava budou potvrzeny před platbou." },
  es: { empty: "El carrito está vacío.", summary: "Resumen", net: "Mercancía neta", vat: "IVA (19%)", total: "Mercancía IVA incluido", delivery: "El coste de entrega se revisa tras indicar la dirección exacta y el método de descarga.", checkout: "Ir al pago", quote: "Presupuesto para volumen", continue: "Seguir comprando", remove: "Eliminar", note: "Los precios incluyen el IVA alemán. El impuesto final, la disponibilidad y la entrega se confirman antes del pago." },
};

export function CartPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = cartCopy[locale];
  const cartRaw = useSyncExternalStore(subscribeToCart, () => localStorage.getItem(CART_KEY) || "[]", () => "[]");
  const items = useMemo(() => parseItems(cartRaw), [cartRaw]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const net = total / 1.19;
  const vat = total - net;
  const money = (value: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(value);
  function update(id: string, quantity: number) { writeCart(items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)); }
  function remove(id: string) { writeCart(items.filter((item) => item.id !== id)); }

  return <main className="section-space min-h-[65vh] bg-zinc-100"><div className="container-shell">
    <h1 className="section-title flex items-center gap-4"><ShoppingCart className="h-9 w-9 text-primary" />{dict.nav.cart}</h1>
    {items.length === 0 ? <div className="surface-card mt-9 p-10 text-center"><p className="text-lg font-bold">{copy.empty}</p><Link className="button-primary mt-6" href={href(locale, "shop")}>{copy.continue}</Link></div> :
      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">{items.map((item) => <article key={item.id} className="surface-card grid grid-cols-[100px_1fr] gap-5 p-4 sm:grid-cols-[150px_1fr]">
          <div className="relative aspect-square overflow-hidden bg-zinc-100">{item.image && <Image src={item.image} alt="" fill sizes="150px" className="object-cover" />}</div>
          <div className="flex flex-col justify-between gap-4"><div><h2 className="text-lg font-extrabold">{item.title}</h2><p className="mt-1 text-xs text-zinc-500">{item.sku}</p></div><div className="flex flex-wrap items-center justify-between gap-4">
            <input aria-label={dict.product.quantity} type="number" min="1" value={item.quantity} onChange={(event) => update(item.id, Number(event.target.value))} className="h-11 w-20 border border-zinc-300 px-3" />
            <div className="font-extrabold">{money(item.price * item.quantity)}</div>
            <button className="inline-flex items-center gap-2 text-sm font-bold text-red-700" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" />{copy.remove}</button>
          </div></div>
        </article>)}</div>
        <aside className="surface-card h-fit p-7 lg:sticky lg:top-32"><h2 className="text-2xl font-extrabold">{copy.summary}</h2>
          <dl className="mt-6 grid gap-3 text-sm"><div className="flex justify-between"><dt>{copy.net}</dt><dd>{money(net)}</dd></div><div className="flex justify-between"><dt>{copy.vat}</dt><dd>{money(vat)}</dd></div><div className="flex justify-between border-y border-zinc-200 py-4 text-base"><dt>{copy.total}</dt><dd className="font-extrabold">{money(total)}</dd></div></dl>
          <p className="mt-4 text-sm leading-6 text-zinc-600">{copy.delivery}</p>
          <Link className="button-primary mt-6 w-full" href={href(locale, "checkout")}>{copy.checkout}</Link>
          <Link className="button-dark mt-3 w-full" href={`${href(locale, "quote")}?product=${encodeURIComponent(items.map((item) => `${item.sku} × ${item.quantity}`).join(", "))}`}>{copy.quote}</Link>
          <p className="mt-5 text-xs leading-5 text-zinc-500">{copy.note}</p>
        </aside>
      </div>}
  </div></main>;
}

function subscribeToCart(callback: () => void) { window.addEventListener(CART_EVENT, callback); window.addEventListener("storage", callback); return () => { window.removeEventListener(CART_EVENT, callback); window.removeEventListener("storage", callback); }; }
function parseItems(raw: string): CartItem[] { try { const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) ? parsed as CartItem[] : readCart(); } catch { return []; } }
