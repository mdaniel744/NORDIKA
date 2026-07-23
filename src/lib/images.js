// Centralized image assets for Baltes Container
export const IMAGES = {
  logo: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/6b6393aa3_generated_image.png",
  hero: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/98aac06ee_generated_f18605d4.png",
  container20: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/5882607a0_generated_5d05e565.png",
  container40hc: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/f4b6c90fc_generated_9d76972a.png",
  kuehl: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/df64351ff_generated_155eb9dc.png",
  used: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/4c61625e3_generated_3003be73.png",
  openSide: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/05f5bdc65_generated_578f5b48.png",
  office: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/728ea5863_generated_e4b9e0b3.png",
  delivery: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/be0b94dc3_generated_9535c2c0.png",
};

// Transparent cut-out container images for category tiles
export const CUTOUTS = {
  standard: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/d46aa2ef0_generated_image.png",
  highcube: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/b25b2b77c_generated_image.png",
  reefer: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/75901927a_generated_image.png",
  openside: "https://media.base44.com/images/public/6a617cd5481a171d302809dc/043ac5c5e_generated_image.png",
};

export const CATEGORIES = [
  { name: "10-Fuß-Container", slug: "10-fuss", image: CUTOUTS.standard, benefit: "Kompakte Lagerlösung für beengte Flächen." },
  { name: "20-Fuß-Container", slug: "20-fuss", image: CUTOUTS.standard, benefit: "Der Standard für Lagerung und Transport." },
  { name: "40-Fuß-Container", slug: "40-fuss", image: CUTOUTS.highcube, benefit: "Maximale Kapazität für großvolumige Güter." },
  { name: "Lagercontainer", slug: "lagercontainer", image: CUTOUTS.standard, benefit: "Sichere Lagerung direkt am Einsatzort." },
  { name: "High-Cube-Container", slug: "high-cube", image: CUTOUTS.highcube, benefit: "30 cm mehr Innenhöhe, mehr Stauraum." },
  { name: "Kühlcontainer", slug: "kuehlcontainer", image: CUTOUTS.reefer, benefit: "Temperaturgeregelt von -25 °C bis +25 °C." },
  { name: "Open-Side-Container", slug: "open-side", image: CUTOUTS.openside, benefit: "Voll öffnende Längsseite für bequeme Beladung." },
  { name: "Gebrauchte Container", slug: "gebrauchte", image: CUTOUTS.standard, benefit: "Geprüfte Qualität zu fairen Preisen." },
];