import { countryName, EU_COUNTRY_CODES } from "@/lib/shipping-countries";

/**
 * These customer-facing placeholders must be replaced with approved business
 * ranges before production or Merchant Center activation. No delivery timing
 * was present in the project when the policy pages were reviewed.
 */
export const DELIVERY_POLICY = {
  germany: {
    handling: "GERMANY_HANDLING_DAYS",
    transit: "GERMANY_TRANSIT_DAYS",
    total: "GERMANY_TOTAL_DELIVERY_DAYS",
  },
  eu: {
    handling: "EU_HANDLING_DAYS",
    transit: "EU_TRANSIT_DAYS",
    total: "EU_TOTAL_DELIVERY_DAYS",
  },
  supportedCountries: EU_COUNTRY_CODES.map((code) => countryName(code, "de")).join(", "),
} as const;
