import type { CatalogMeta, Product } from "@/types/catalog";
import { LOCAL_PRODUCTS } from "@/lib/catalog-data";
import { SITE } from "@/lib/site";

export async function getProducts(): Promise<Product[]> {
  return LOCAL_PRODUCTS
    .map((product) => ({ ...product, additional_images: [...(product.additional_images || [])], depot: SITE.address.city }))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export async function getProductByIdentifier(identifier: string): Promise<Product | undefined> {
  const products = await getProducts();
  const decoded = decodeURIComponent(identifier).toLowerCase();
  return products.find((product) => product.id === identifier || product.slug?.toLowerCase() === decoded || product.sku?.toLowerCase() === decoded);
}

export function parseCatalogMeta(product: Product): CatalogMeta {
  if (!product.color) return { colors: [] };
  try {
    const parsed: unknown = JSON.parse(product.color);
    if (typeof parsed === "object" && parsed && "colors" in parsed) {
      const meta = parsed as Partial<CatalogMeta>;
      return { ...meta, colors: Array.isArray(meta.colors) ? meta.colors.filter((value): value is string => typeof value === "string") : [] };
    }
  } catch {
    return { colors: [product.color] };
  }
  return { colors: [product.color] };
}
