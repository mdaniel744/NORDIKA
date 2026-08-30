import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/de", permanent: true },
      { source: "/container-kaufen", destination: "/de/container-kaufen", permanent: true },
      { source: "/container/:slug", destination: "/de/container/:slug", permanent: true },
      { source: "/angebot-anfordern", destination: "/de/angebot-anfordern", permanent: true },
      { source: "/containerumbau", destination: "/de/containerumbau", permanent: true },
      { source: "/ueber-uns", destination: "/de/ueber-uns", permanent: true },
      { source: "/kontakt", destination: "/de/kontakt", permanent: true },
      { source: "/lieferung-aufstellung", destination: "/de/lieferung-aufstellung", permanent: true },
      { source: "/standorte", destination: "/de/standorte", permanent: true },
      { source: "/ratgeber", destination: "/de/ratgeber", permanent: true },
      { source: "/faq", destination: "/de/faq", permanent: true },
      { source: "/impressum", destination: "/de/impressum", permanent: true },
      { source: "/datenschutz", destination: "/de/datenschutz", permanent: true },
      { source: "/agb", destination: "/de/agb", permanent: true },
      { source: "/widerruf", destination: "/de/widerrufsrecht", permanent: true },
      { source: "/muster-widerrufsformular", destination: "/de/muster-widerrufsformular", permanent: true },
      { source: "/zahlungsarten", destination: "/de/zahlungsarten", permanent: true },
      { source: "/rueckgabe-erstattung", destination: "/de/rueckgabe-erstattung", permanent: true },
      { source: "/cookie-richtlinie", destination: "/de/cookie-richtlinie", permanent: true },
      { source: "/reklamation", destination: "/de/reklamation", permanent: true },
      { source: "/gewaehrleistung", destination: "/de/gewaehrleistung", permanent: true },
      { source: "/barrierefreiheit", destination: "/de/barrierefreiheit", permanent: true },
    ];
  },
};

export default nextConfig;
