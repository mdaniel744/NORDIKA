import "server-only";

import { STORE_ID, supabase } from "@/lib/supabase";

export async function saveInquiry(row: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  productId?: string | null;
  message: string;
  details: Record<string, unknown>;
}): Promise<void> {
  if (!STORE_ID || !supabase) throw new Error("Supabase inquiry storage is not configured");
  // Insert-only: the anon key has no SELECT grant on this table, so chaining
  // .select() after insert would fail under RLS even though the write itself succeeds.
  const { error } = await supabase.from("inquiries").insert({
    store_id: STORE_ID,
    customer_name: row.customerName,
    customer_email: row.customerEmail,
    customer_phone: row.customerPhone || null,
    product_id: row.productId || null,
    message: row.message,
    details: row.details,
  });
  if (error) throw error;
}
