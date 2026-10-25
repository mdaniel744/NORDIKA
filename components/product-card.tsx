import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { conditionKey, formatPrice, isProductPurchasable, localizedProductTitle, productSlug } from "@/lib/products";
import { SITE } from "@/lib/site";
import type { Product } from "@/types/catalog";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const dict = getDictionary(locale);
  const title = localizedProductTitle(product, locale);
  const price = formatPrice(product, locale);
  const available = isProductPurchasable(product);
  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden">
      <Link href={href(locale, "product", productSlug(product, locale))} className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {product.main_image ? <Image src={product.main_image} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /> : <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">{SITE.name}</div>}
        <span className="absolute left-3 top-3 bg-white/90 px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase tracking-[0.12em] text-zinc-800 shadow-sm backdrop-blur">{dict.common[conditionKey(product)]}</span>
        <span className={`absolute right-3 top-3 px-2.5 py-1 text-[10px] font-bold shadow-sm ${available ? "bg-[#416f4b] text-white" : "bg-white/90 text-zinc-500"}`}>{available ? dict.common.available : dict.common.outOfStock}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-400">{product.size_ft ? `${product.size_ft} ft` : product.product_type} · {product.sku}</div>
        <h3 className="text-lg font-extrabold leading-snug"><Link href={href(locale, "product", productSlug(product, locale))} className="transition hover:text-primary">{title}</Link></h3>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div><p className="text-2xl font-extrabold tracking-[-0.035em] text-zinc-900">{price || dict.common.priceOnRequest}</p>{price && <p className="mt-0.5 text-xs text-zinc-500">{dict.common.inclVat}</p>}</div>
          <Link aria-label={`${dict.common.viewProduct}: ${title}`} href={href(locale, "product", productSlug(product, locale))} className="grid h-11 w-11 place-items-center bg-secondary text-zinc-800 transition group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-white"><ArrowUpRight className="h-5 w-5" aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
