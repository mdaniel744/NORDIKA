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
        <span className="absolute left-3 top-3 bg-[#ffb33e] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#092b4e]">{dict.common[conditionKey(product)]}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wide text-zinc-500"><span>{product.size_ft ? `${product.size_ft} ft` : product.product_type}</span><span className={available ? "text-green-700" : "text-zinc-500"}>{available ? dict.common.available : dict.common.outOfStock}</span></div>
        <h3 className="text-xl font-extrabold leading-snug"><Link href={href(locale, "product", productSlug(product, locale))} className="hover:text-primary">{title}</Link></h3>
        <p className="mt-2 text-sm text-zinc-500">{dict.product.sku}: {product.sku}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div><p className="text-xl font-extrabold">{price || dict.common.priceOnRequest}</p>{price && <p className="text-xs text-zinc-500">{dict.common.inclVat}</p>}</div>
          <Link aria-label={`${dict.common.viewProduct}: ${title}`} href={href(locale, "product", productSlug(product, locale))} className="grid h-11 w-11 place-items-center bg-primary text-white transition group-hover:bg-[#084584]"><ArrowUpRight className="h-5 w-5" aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
