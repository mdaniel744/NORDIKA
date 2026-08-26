import type { CatalogMeta, Product } from "@/types/catalog";
import { SITE } from "@/lib/site";

const PRODUCT_ENDPOINT = `${SITE.base44Url}/api/apps/${SITE.appId}/entities/Product`;

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${PRODUCT_ENDPOINT}?sort=-created_date&limit=100`, {
      headers: { "X-App-Id": SITE.appId },
      next: { revalidate: 900, tags: ["catalogue"] },
    });
    if (!response.ok) throw new Error(`Catalogue returned ${response.status}`);
    const payload: unknown = await response.json();
    return Array.isArray(payload)
      ? (payload as Product[])
          .map((product) => ({ ...product, depot: SITE.address.city }))
          .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
      : [];
  } catch (error) {
    console.error("Unable to load the container catalogue", error);
    return [];
  }
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
