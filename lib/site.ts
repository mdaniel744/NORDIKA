export const SITE = {
  name: "NORDIKA Container",
  legalName: "NORDIKA Container GmbH",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nordikacontainer.com").replace(/\/$/, ""),
  appId: process.env.BASE44_APP_ID || process.env.NEXT_PUBLIC_BASE44_APP_ID || "6a617cd5481a171d302809dc",
  base44Url: process.env.BASE44_API_URL || "https://base44.app",
  email: "info@nordikacontainer.com",
  phone: "+49 01512 4371427",
  phoneHref: "+4915124371427",
  address: {
    street: "Nikolaus-Otto-Str. 9",
    postalCode: "55129",
    city: "Mainz",
    country: "DE",
  },
  commercialRegisters: [
    { court: "Amtsgericht Hamburg", number: "HRB 147066" },
    { court: "Amtsgericht Pinneberg", number: "HRB 12002 PI" },
  ],
  euid: "DEK1101R.HRB147066",
  vatId: "DE 300860969",
  currency: "EUR",
  defaultLocale: "de",
} as const;

export const DEPOTS = [
  { name: "Mainz", address: "Nikolaus-Otto-Str. 9, D-55129 Mainz, Deutschland", phone: "+49 01512 4371427" },
] as const;
