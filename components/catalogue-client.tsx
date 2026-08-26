"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getDictionary, type Locale } from "@/lib/i18n";
import { conditionKey, normalizeProductType } from "@/lib/products";
import type { Product } from "@/types/catalog";

type FilterKey = "q" | "type" | "size" | "condition" | "sort";

export function CatalogueClient({ products, locale }: { products: Product[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const locationSearch = useSyncExternalStore(subscribeToLocation, () => window.location.search, () => "");
  const paramsSnapshot = locationSearch.replace(/^\?/, "");
  const value = (key: FilterKey) => new URLSearchParams(paramsSnapshot).get(key) || "";
  const setValue = (key: FilterKey, next: string) => {
    const params = new URLSearchParams(paramsSnapshot);
    if (next) params.set(key, next); else params.delete(key);
    window.history.replaceState({}, "", `${pathname}${params.size ? `?${params}` : ""}`);
    window.dispatchEvent(new CustomEvent("nordika-filter-change"));
  };
  const types = [...new Set(products.map((product) => normalizeProductType(product)))].sort();
  const sizes = [...new Set(products.map((product) => product.size_ft).filter(Boolean))].sort((a, b) => Number(a) - Number(b));
  const filtered = useMemo(() => {
    const q = value("q").trim().toLowerCase();
    const result = products.filter((product) => (!q || `${product.title} ${product.sku} ${product.product_type}`.toLowerCase().includes(q)) && (!value("type") || normalizeProductType(product) === value("type")) && (!value("size") || product.size_ft === value("size")) && (!value("condition") || conditionKey(product) === value("condition")));
    if (value("sort") === "price-asc") return [...result].sort((a, b) => (a.price_gross || Number.MAX_SAFE_INTEGER) - (b.price_gross || Number.MAX_SAFE_INTEGER));
    if (value("sort") === "price-desc") return [...result].sort((a, b) => (b.price_gross || 0) - (a.price_gross || 0));
    return result;
  // searchParams.toString() is the stable snapshot used by the memo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, paramsSnapshot]);
  const reset = () => { window.history.replaceState({}, "", pathname); window.dispatchEvent(new CustomEvent("nordika-filter-change")); };

  const labels: Record<string, string> = { standard: "Standard", high_cube: "High Cube", open_side: "Open Side", reefer: "Reefer", office: "Office", storage: "Storage", special: "Special" };
  const renderFilters = () => <div className="grid gap-5">
    <label className="grid gap-2 text-sm font-bold">{dict.common.search}<span className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" /><input type="search" value={value("q")} onChange={(event) => setValue("q", event.target.value)} placeholder={dict.catalogue.searchPlaceholder} className="h-12 w-full border border-zinc-300 bg-white pl-10 pr-3 font-normal" /></span></label>
    <Select label={dict.common.type} value={value("type")} onChange={(next) => setValue("type", next)} empty={dict.catalogue.allTypes} options={types.map((item) => [item, labels[item] || item])} />
    <Select label={dict.common.size} value={value("size")} onChange={(next) => setValue("size", next)} empty={dict.catalogue.allSizes} options={sizes.map((item) => [item, `${item} ft`])} />
    <Select label={dict.common.condition} value={value("condition")} onChange={(next) => setValue("condition", next)} empty={dict.catalogue.allConditions} options={[["new", dict.common.new], ["used", dict.common.used]]} />
    <button onClick={reset} className="button-outline w-full" type="button"><X className="h-4 w-4" />{dict.common.reset}</button>
  </div>;

  return (
    <div className="container-shell grid gap-8 py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-16">
      <aside className="hidden h-fit border border-zinc-200 bg-white p-6 lg:block"><h2 className="mb-6 flex items-center gap-2 text-lg font-extrabold"><Filter className="h-5 w-5" />{dict.catalogue.filters}</h2>{renderFilters()}</aside>
      <div>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3"><button onClick={() => setMobileOpen(true)} className="button-outline lg:hidden"><Filter className="h-4 w-4" />{dict.catalogue.mobileFilters}</button><p aria-live="polite" className="text-sm font-bold text-zinc-600">{filtered.length} {dict.catalogue.results}</p><Select label={dict.catalogue.sort} hideLabel value={value("sort")} onChange={(next) => setValue("sort", next)} empty={dict.catalogue.recommended} options={[["price-asc", dict.catalogue.priceAsc], ["price-desc", dict.catalogue.priceDesc]]} /></div>
        {filtered.length > 0 ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div> : <div className="surface-card p-10 text-center"><p className="font-bold">{dict.common.noResults}</p><button onClick={reset} className="button-outline mt-5">{dict.common.reset}</button></div>}
      </div>
      {mobileOpen && <div className="fixed inset-0 z-[80] bg-[#052a4e]/75 lg:hidden" role="dialog" aria-modal="true" aria-label={dict.catalogue.filters}><div className="ml-auto h-full w-[min(90vw,380px)] overflow-y-auto bg-white p-6"><div className="mb-7 flex items-center justify-between"><h2 className="text-xl font-extrabold">{dict.catalogue.filters}</h2><button onClick={() => setMobileOpen(false)} className="grid h-11 w-11 place-items-center border border-primary/15 text-primary" aria-label={dict.nav.close}><X /></button></div>{renderFilters()}<button className="button-primary mt-6 w-full" onClick={() => setMobileOpen(false)}>{filtered.length} {dict.catalogue.results}</button></div></div>}
    </div>
  );
}

function subscribeToLocation(callback: () => void) { window.addEventListener("popstate", callback); window.addEventListener("nordika-filter-change", callback); return () => { window.removeEventListener("popstate", callback); window.removeEventListener("nordika-filter-change", callback); }; }

function Select({ label, value, onChange, empty, options, hideLabel = false }: { label: string; value: string; onChange: (value: string) => void; empty: string; options: string[][]; hideLabel?: boolean }) {
  return <label className={`grid gap-2 text-sm font-bold ${hideLabel ? "grid-cols-[auto_180px] items-center" : ""}`}><span className={hideLabel ? "sr-only" : ""}>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full border border-zinc-300 bg-white px-3 font-normal"><option value="">{empty}</option>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label>;
}
