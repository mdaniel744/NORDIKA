import type { Product } from "@/types/catalog";
import { STORE_ID, supabase } from "@/lib/supabase";
import { SITE } from "@/lib/site";

type SupabaseProductRow = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  short_description: string | null;
  price: string | number | null;
  currency: string | null;
  stock_quantity: number | null;
  status: string;
  images: string[] | null;
  attributes: { Zustand?: string; Zustandsklasse?: string; Farbe?: string[] } | null;
  family_id: string | null;
  is_featured: boolean | null;
};

function mapProduct(row: SupabaseProductRow): Product {
  const sizeMatch = row.name.match(/^(\d+)\s*ft/i);
  const attributes = row.attributes || {};
  const quantity = row.stock_quantity ?? 0;
  const price = row.price == null ? 0 : Number(row.price);
  return {
    id: row.id,
    title: row.name,
    slug: row.slug,
    sku: row.sku || "",
    product_type: "",
    size_ft: sizeMatch ? sizeMatch[1] : "",
    condition: attributes.Zustand || "",
    condition_grade: attributes.Zustandsklasse || null,
    colors: attributes.Farbe || null,
    depot: SITE.address.city,
    price_gross: price,
    currency: row.currency || "EUR",
    availability: quantity > 0 ? "Auf Lager" : row.status === "active" ? "Bestellbar" : "Ausverkauft",
    quantity,
    main_image: row.images && row.images.length > 0 ? row.images[0] : null,
    additional_images: row.images && row.images.length > 1 ? row.images.slice(1) : [],
    short_description: row.short_description,
    description: row.description,
    is_purchasable: row.status === "active" && price > 0,
    featured: row.is_featured,
    family_id: row.family_id,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!STORE_ID) return [];
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id,name,slug,sku,description,short_description,price,currency,stock_quantity,status,images,attributes,family_id,is_featured")
      .eq("store_id", STORE_ID);
    if (error) throw error;
    return (data || [])
      .map((row) => mapProduct(row as SupabaseProductRow))
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  } catch (error) {
    console.error("Unable to load the container catalogue from Supabase", error);
    return [];
  }
}

export async function getProductByIdentifier(identifier: string): Promise<Product | undefined> {
  const products = await getProducts();
  const decoded = decodeURIComponent(identifier).toLowerCase();
  return products.find((product) => product.id === identifier || product.slug?.toLowerCase() === decoded || product.sku?.toLowerCase() === decoded);
}
