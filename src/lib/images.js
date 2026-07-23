// Centralized image assets for Baltes Container
export const IMAGES = {
  logo: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/d4d325cdf_Baltes-container-Small-logo.svg",
  hero: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/98aac06ee_generated_f18605d4.png",
  container20: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/5882607a0_generated_5d05e565.png",
  container40hc: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/f4b6c90fc_generated_9d76972a.png",
  kuehl: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/df64351ff_generated_155eb9dc.png",
  used: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/4c61625e3_generated_3003be73.png",
  openSide: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/05f5bdc65_generated_578f5b48.png",
  office: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/728ea5863_generated_e4b9e0b3.png",
  delivery: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/be0b94dc3_generated_9535c2c0.png",
};

export const CATEGORIES = [
  { name: "10-Fuß-Container", slug: "10-fuss", image: IMAGES.container20, benefit: "Kompakte Lagerlösung für beengte Flächen." },
  { name: "20-Fuß-Container", slug: "20-fuss", image: IMAGES.container20, benefit: "Der Standard für Lagerung und Transport." },
  { name: "40-Fuß-Container", slug: "40-fuss", image: IMAGES.container40hc, benefit: "Maximale Kapazität für großvolumige Güter." },
  { name: "Lagercontainer", slug: "lagercontainer", image: IMAGES.used, benefit: "Sichere Lagerung direkt am Einsatzort." },
  { name: "High-Cube-Container", slug: "high-cube", image: IMAGES.container40hc, benefit: "30 cm mehr Innenhöhe, mehr Stauraum." },
  { name: "Kühlcontainer", slug: "kuehlcontainer", image: IMAGES.kuehl, benefit: "Temperaturgeregelt von -25 °C bis +25 °C." },
  { name: "Open-Side-Container", slug: "open-side", image: IMAGES.openSide, benefit: "Voll öffnende Längsseite für bequeme Beladung." },
  { name: "Gebrauchte Container", slug: "gebrauchte", image: IMAGES.used, benefit: "Geprüfte Qualität zu fairen Preisen." },
];