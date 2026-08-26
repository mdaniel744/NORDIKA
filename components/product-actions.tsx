"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { readCart, writeCart } from "@/lib/cart";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { isProductPurchasable, purchaseQuantityLimit } from "@/lib/products";
import type { Product } from "@/types/catalog";

export function ProductActions({ locale, product, title, slug, colors }: { locale: Locale; product: Product; title: string; slug: string; colors: string[] }) {
  const dict = getDictionary(locale);
  const purchasable = isProductPurchasable(product);
  const quantityLimit = purchaseQuantityLimit(product);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(colors[0] || "");
  const [added, setAdded] = useState(false);
  function add() {
    const items = readCart();
    const existing = items.find((item) => item.id === product.id);
    if (existing) existing.quantity += quantity; else items.push({ id: product.id, sku: product.sku, slug, title: color ? `${title} · ${color}` : title, image: product.main_image, price: product.price_gross || 0, currency: product.currency || "EUR", quantity });
    writeCart(items);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }
  return <div className="grid gap-5">{colors.length > 0 && <label className="grid gap-2 text-sm font-bold">{dict.product.color}<select value={color} onChange={(event) => setColor(event.target.value)} className="h-12 border border-zinc-300 bg-white px-3 font-normal">{colors.map((item) => <option key={item}>{item}</option>)}</select></label>}<label className="grid gap-2 text-sm font-bold">{dict.product.quantity}<input aria-label={dict.product.quantity} value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(quantityLimit, Number(event.target.value))))} type="number" min="1" max={quantityLimit} className="h-12 w-28 border border-zinc-300 px-3 font-normal" /></label>{purchasable && <button onClick={add} className="button-primary w-full">{added ? <><Check className="h-5 w-5" />{dict.product.addedToCart}</> : <><ShoppingCart className="h-5 w-5" />{dict.product.addToCart}</>}</button>}<Link href={`${href(locale, "quote")}?product=${encodeURIComponent(product.sku)}`} className="button-dark w-full">{dict.product.requestQuote}</Link></div>;
}
