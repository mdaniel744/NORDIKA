import { locales, type Locale } from "@/lib/i18n";
import { STORE_ID, supabase } from "@/lib/supabase";
import { SITE } from "@/lib/site";

export async function getEnabledLocales(): Promise<Locale[]> {
  if (!STORE_ID) return [...locales];
  try {
    const { data, error } = await supabase.from("stores").select("enabled_locales").eq("id", STORE_ID).single();
    if (error) throw error;
    const enabled = ((data?.enabled_locales as string[] | null) || []).filter((item): item is Locale => (locales as readonly string[]).includes(item));
    const withSource = [SITE.defaultLocale, ...enabled.filter((item) => item !== SITE.defaultLocale)] as Locale[];
    return withSource.length > 0 ? withSource : [...locales];
  } catch (error) {
    console.error("Unable to load enabled_locales from Supabase, falling back to the full locale list", error);
    return [...locales];
  }
}
