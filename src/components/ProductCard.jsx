import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { CheckCircle2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }) {
  const purchasable = product.is_purchasable && product.availability !== "Ausverkauft";
  const inStock = product.availability === "Auf Lager";

  const formatPrice = (val) => {
    if (!val || val === 0) return "Auf Anfrage";
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="group relative flex flex-col bg-card border border-border overflow-hidden transition-colors hover:border-primary/50">
      <Link to={`/container/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.main_image}
          alt={product.title}
          fittingType="fill"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="font-mono-tech text-[11px] uppercase tracking-wider px-2.5 py-1 bg-background/90 text-foreground border border-border">
            {product.condition}
          </span>
        </div>
        {inStock ? (
          <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 bg-success text-success-foreground">
            <CheckCircle2 className="w-3 h-3" /> Auf Lager
          </span>
        ) : (
          <span className="absolute top-3 right-3 text-[11px] font-medium px-2.5 py-1 bg-secondary text-muted-foreground border border-border">
            Bestellbar
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="font-mono-tech text-xs text-muted-foreground mb-2">{product.sku}</div>
        <Link to={`/container/${product.slug}`}>
          <h3 className="font-heading text-lg font-bold leading-snug mb-3 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
          <span>{product.size_ft} Fuß</span>
          <span className="text-border">|</span>
          <span>{product.product_type}</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{product.depot}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">{purchasable ? "Bruttopreis inkl. MwSt." : "Preis"}</div>
              <div className="font-heading text-2xl font-extrabold text-primary">{formatPrice(product.price_gross)}</div>
            </div>
          </div>
          {purchasable ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                to={`/container/${product.slug}`}
                className="flex items-center justify-center px-3 py-2.5 text-sm font-semibold border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Zum Produkt
              </Link>
              <Link
                to={`/container/${product.slug}`}
                className="flex items-center justify-center px-3 py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                In den Warenkorb
              </Link>
            </div>
          ) : (
            <Link
              to={`/angebot-anfordern`}
              className="mt-4 flex items-center justify-center px-3 py-2.5 text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Angebot anfordern
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}