import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/ProductCard";

const SIZES = ["10", "20", "40"];
const CONDITIONS = ["Neu", "One-Trip", "Gebraucht"];
const TYPES = ["Seecontainer", "Lagercontainer", "High-Cube-Container", "Open-Side-Container", "Kühlcontainer", "Bürocontainer"];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedSize = params.get("size") || "";
  const selectedCondition = params.get("condition") || "";
  const selectedType = params.get("type") || "";

  useEffect(() => {
    base44.entities.Product.list("-created_date", 50)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedSize && p.size_ft !== selectedSize) return false;
      if (selectedCondition && p.condition !== selectedCondition) return false;
      if (selectedType && p.product_type !== selectedType) return false;
      return true;
    });
  }, [products, selectedSize, selectedCondition, selectedType]);

  const toggleFilter = (key, value) => {
    const newParams = new URLSearchParams(params);
    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setParams(newParams);
  };

  const clearFilters = () => setParams(new URLSearchParams());

  const FilterGroup = ({ label, options, paramKey }) => (
    <div className="border-b border-border pb-5">
      <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-3">{label}</h3>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggleFilter(paramKey, opt)}
            className={`block w-full text-left px-3 py-2 text-sm border transition-colors ${
              params.get(paramKey) === opt
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-terminal mx-auto px-6 py-12">
          <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-primary mb-3">Container-Shop</div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">Container kaufen</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Direkt verfügbare Container mit festem Preis, definierter Lieferzeit und klarem Zustand. Wählen Sie nach Größe, Typ und Zustand.
          </p>
        </div>
      </div>

      <div className="max-w-terminal mx-auto px-6 py-8">
        {/* Breadcrumb + count */}
        <div className="flex items-center justify-between mb-6">
          <nav className="text-sm text-muted-foreground">
            <span>Startseite</span> <span className="mx-1">/</span> <span className="text-foreground">Container kaufen</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "Produkt" : "Produkte"}</span>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm border border-border"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`fixed lg:sticky inset-0 lg:inset-auto top-0 lg:top-24 z-50 lg:z-0 w-72 lg:w-60 shrink-0 bg-background lg:bg-transparent overflow-y-auto lg:overflow-visible transition-transform ${filtersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            <div className="flex items-center justify-between lg:hidden p-4 border-b border-border">
              <span className="font-heading font-bold">Filter</span>
              <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 lg:p-0 space-y-5">
              <FilterGroup label="Größe" options={SIZES} paramKey="size" />
              <FilterGroup label="Zustand" options={CONDITIONS} paramKey="condition" />
              <FilterGroup label="Typ" options={TYPES} paramKey="type" />
              {(selectedSize || selectedCondition || selectedType) && (
                <button onClick={clearFilters} className="text-sm text-primary font-medium hover:underline">
                  Filter zurücksetzen
                </button>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card border border-border aspect-[3/4] animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="border border-dashed border-border py-20 text-center">
                <p className="text-muted-foreground">Keine Container entsprechen Ihren Filtern.</p>
                <button onClick={clearFilters} className="mt-4 text-sm text-primary font-medium hover:underline">
                  Filter zurücksetzen
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}