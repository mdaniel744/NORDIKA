import type { Locale } from "@/lib/i18n";

export const EU_COUNTRY_CODES = [
  "DE", "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
] as const;

export type EuCountryCode = (typeof EU_COUNTRY_CODES)[number];

export function countryOptions(locale: Locale) {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const collator = new Intl.Collator(locale);
  return EU_COUNTRY_CODES.map((code) => ({ code, label: names.of(code) || code }))
    .sort((a, b) => a.code === "DE" ? -1 : b.code === "DE" ? 1 : collator.compare(a.label, b.label));
}

export function countryName(code: EuCountryCode, locale: Locale = "de") {
  return new Intl.DisplayNames([locale], { type: "region" }).of(code) || code;
}
