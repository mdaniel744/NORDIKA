import type { Product } from "@/types/catalog";

type ProductSeed = Omit<Product, "id" | "currency" | "availability" | "quantity" | "main_image" | "additional_images"> &
  Partial<Pick<Product, "currency" | "availability" | "quantity" | "main_image" | "additional_images">>;

const standard20Foot = {
  ext_length_mm: 6058,
  ext_width_mm: 2438,
  ext_height_mm: 2591,
  int_length_mm: 5898,
  int_width_mm: 2352,
  int_height_mm: 2393,
  door_width_mm: 2340,
  door_height_mm: 2280,
  tare_weight_kg: 2200,
  max_gross_weight_kg: 30480,
  payload_kg: 28280,
  volume_m3: 33.2,
  wwt_status: true,
  cargo_worthy: true,
  vents: true,
  forklift_pockets: true,
} satisfies Partial<Product>;

const highCube40Foot = {
  ext_length_mm: 12192,
  ext_width_mm: 2438,
  ext_height_mm: 2896,
  int_length_mm: 12032,
  int_width_mm: 2352,
  int_height_mm: 2698,
  door_width_mm: 2340,
  door_height_mm: 2585,
  tare_weight_kg: 3800,
  max_gross_weight_kg: 30480,
  payload_kg: 26680,
  volume_m3: 76.4,
  wwt_status: true,
  cargo_worthy: true,
  vents: true,
  forklift_pockets: false,
} satisfies Partial<Product>;

function product(seed: ProductSeed): Product {
  return {
    id: `nordika-${seed.sku.toLowerCase()}`,
    currency: "EUR",
    availability: "Bestellbar",
    quantity: 0,
    main_image: imageFor(seed.product_type, seed.sku),
    additional_images: [],
    ...seed,
  };
}

function imageFor(productType: string, sku: string): string {
  const value = `${productType} ${sku}`.toLowerCase();
  if (value.includes("open") || value.includes("-os")) return "/images/container-types/open-side-container.jpg";
  if (value.includes("kühl") || value.includes("reefer") || value.includes("-rf")) return "/images/container-types/refrigerated-container.jpg";
  if (value.includes("büro") || value.includes("office")) return "/images/container-types/office-container.webp";
  if (value.includes("high") || value.includes("-hc")) return "/images/container-types/high-cube-container.jpg";
  return "/images/container-types/shipping-containers.jpg";
}

function metadata(colors: string[], catalogLine: string, heightVariant: string, openingType: string, usedColorAvailability: boolean): string {
  return JSON.stringify({ colors, visible: true, catalogLine, heightVariant, openingType, usedColorAvailability });
}

export const LOCAL_PRODUCTS: Product[] = [
  product({ title: "40-Fuß-High-Cube-Open-Side-Container", slug: "40-fuss-open-side-high-cube-neu", sku: "BC-40HC-OS-NEW", product_type: "Open-Side-Container", size_ft: "40", condition: "One-Trip", condition_grade: "One-Trip", color: metadata(["RAL 9010", "RAL 7024", "RAL 5010", "RAL 7042", "RAL 7035", "RAL 1015"], "open-side", "high-cube", "Voll öffnende Längsseite und Stirntüren", false), price_gross: 8470, is_purchasable: true, featured: false, updated_date: "2026-07-24T02:05:00.618" }),
  product({ title: "20-Fuß-High-Cube-Open-Side-Container", slug: "20-fuss-open-side-high-cube-gebraucht", sku: "BC-20HC-OS-USED", product_type: "Open-Side-Container", size_ft: "20", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "open-side", "high-cube", "Voll öffnende Längsseite und Stirntüren", true), price_gross: 3980, is_purchasable: true, featured: false, updated_date: "2026-07-24T02:04:57.838" }),
  product({ title: "20-Fuß-High-Cube-Open-Side-Container", slug: "20-fuss-open-side-high-cube-neu", sku: "BC-20HC-OS-NEW", product_type: "Open-Side-Container", size_ft: "20", condition: "One-Trip", condition_grade: "One-Trip", color: metadata(["RAL 5010", "RAL 7042", "RAL 7016", "RAL 5013", "RAL 7024", "RAL 9005", "RAL 9010"], "open-side", "high-cube", "Voll öffnende Längsseite und Stirntüren", false), price_gross: 5290, is_purchasable: true, featured: false, updated_date: "2026-07-24T02:04:57.383" }),
  product({ title: "40-Fuß-Open-Side-Container", slug: "40-fuss-open-side-standard-neu", sku: "BC-40ST-OS-NEW", product_type: "Open-Side-Container", size_ft: "40", condition: "One-Trip", condition_grade: "One-Trip", color: metadata([], "open-side", "standard", "Voll öffnende Längsseite und Stirntüren", false), price_gross: 6280, is_purchasable: true, featured: false, updated_date: "2026-07-24T02:05:00.182" }),
  product({ title: "40-Fuß-High-Cube-Container", slug: "40-fuss-high-cube-container-gebraucht", sku: "BC-40HC-USED", product_type: "High-Cube-Container", size_ft: "40", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "standard", "high-cube", "Doppelflügeltür an der Stirnseite", true), price_gross: 2240, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:59.735" }),
  product({ title: "40-Fuß-Standardcontainer", slug: "40-fuss-standardcontainer-gebraucht", sku: "BC-40ST-USED", product_type: "Seecontainer", size_ft: "40", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "standard", "standard", "Doppelflügeltür an der Stirnseite", true), price_gross: 1740, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:58.854" }),
  product({ title: "40-Fuß-Standardcontainer", slug: "40-fuss-standardcontainer-neu", sku: "BC-40ST-NEW", product_type: "Seecontainer", size_ft: "40", condition: "Neu", condition_grade: "Neu", color: metadata(["RAL 3009", "RAL 5010", "RAL 5013", "RAL 7016", "RAL 7035"], "standard", "standard", "Doppelflügeltür an der Stirnseite", false), price_gross: 2800, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:58.352" }),
  product({ title: "20-Fuß-Open-Side-Container", slug: "20-fuss-open-side-standard-gebraucht", sku: "BC-20ST-OS-USED", product_type: "Open-Side-Container", size_ft: "20", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "open-side", "standard", "Voll öffnende Längsseite und Stirntüren", true), price_gross: 3260, is_purchasable: true, featured: false, updated_date: "2026-07-24T02:04:56.927" }),
  product({ title: "20-Fuß-High-Cube-Container", slug: "20-fuss-high-cube-container-gebraucht", sku: "BC-20HC-USED", product_type: "High-Cube-Container", size_ft: "20", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "standard", "high-cube", "Doppelflügeltür an der Stirnseite", true), price_gross: 1480, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:55.930" }),
  product({ title: "20-Fuß-High-Cube-Container", slug: "20-fuss-high-cube-container-neu", sku: "BC-20HC-NEW", product_type: "High-Cube-Container", size_ft: "20", condition: "Neu", condition_grade: "Neu", color: metadata(["RAL 5010", "RAL 5013", "RAL 6007", "RAL 7015", "RAL 7016", "RAL 7035", "RAL 7042"], "standard", "high-cube", "Doppelflügeltür an der Stirnseite", false), price_gross: 2200, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:55.459" }),
  product({ title: "10-Fuß-High-Cube-Container", slug: "10-fuss-high-cube-container-gebraucht", sku: "BC-10HC-USED", product_type: "High-Cube-Container", size_ft: "10", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "standard", "high-cube", "Doppelflügeltür an der Stirnseite", true), price_gross: 1240, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:54.047" }),
  product({ title: "10-Fuß-High-Cube-Container", slug: "10-fuss-high-cube-container-neu", sku: "BC-10HC-NEW", product_type: "High-Cube-Container", size_ft: "10", condition: "Neu", condition_grade: "Neu", color: metadata(["RAL 5013", "RAL 7016", "RAL 3020", "RAL 9010"], "standard", "high-cube", "Doppelflügeltür an der Stirnseite", false), price_gross: 1680, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:53.560" }),
  product({ title: "10-Fuß-Standardcontainer", slug: "10-fuss-standardcontainer-gebraucht", sku: "BC-10ST-USED", product_type: "Seecontainer", size_ft: "10", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "standard", "standard", "Doppelflügeltür an der Stirnseite", true), price_gross: 980, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:53.088" }),
  product({ title: "10-Fuß-Standardcontainer", slug: "10-fuss-standardcontainer-neu", sku: "BC-10ST-NEW", product_type: "Seecontainer", size_ft: "10", condition: "Neu", condition_grade: "Neu", color: metadata(["RAL 7016", "RAL 5010", "RAL 5013", "RAL 7042"], "standard", "standard", "Doppelflügeltür an der Stirnseite", false), price_gross: 1420, is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:52.658" }),
  product({ ...standard20Foot, title: "20-Fuß-Open-Side-Container", slug: "one-trip-20-fuss-open-side", sku: "BC-20OS-ONETRIP", product_type: "Open-Side-Container", size_ft: "20", condition: "One-Trip", condition_grade: "One-Trip", color: metadata(["RAL 5010", "RAL 5013", "RAL 7016", "RAL 7035"], "open-side", "standard", "Voll öffnende Längsseite und Stirntüren", false), price_gross: 4780, availability: "Auf Lager", quantity: 3, tare_weight_kg: 2450, payload_kg: 28030, csc_status: "Gültig", floor_type: "Plywood 28 mm", lockbox: true, short_description: "One-Trip 20-Fuß-Container mit voll öffnender Längsseite – ideal für bequeme Be- und Entladung.", description: "Dieser One-Trip-Open-Side-Container verfügt über eine voll öffnende Längsseite als Bi-Falt-Türen. Nur einmal im Seetransport eingesetzt – nahezu neuwertig. Perfekt, wenn Be- und Entladung mit Gabelstapler oder breiteren Gütern von der Seite erfolgen soll.", is_purchasable: true, featured: false, updated_date: "2026-07-24T02:04:56.419" }),
  product({ ...highCube40Foot, title: "40-Fuß-High-Cube-Container", slug: "neuer-40-fuss-high-cube-marineblau", sku: "BC-40HC-NEW-MBL", product_type: "High-Cube-Container", size_ft: "40", condition: "Neu", condition_grade: "Neu", color: metadata(["RAL 5013", "RAL 6007", "RAL 5010", "RAL 7016", "RAL 1015", "RAL 3009"], "standard", "high-cube", "Doppelflügeltür an der Stirnseite", false), price_gross: 3400, availability: "Auf Lager", quantity: 5, csc_status: "Gültig", floor_type: "Plywood 28 mm", lockbox: true, short_description: "Neuer 40-Fuß-High-Cube-Container mit 30 cm mehr Innenhöhe – ideal für großvolumige Lagerung und Umbauten.", description: "Der neue 40-Fuß-High-Cube-Container bietet mit 2,70 m Innenhöhe deutlich mehr Stauraum als ein Standardcontainer. Aus CORTEN-Stahl mit CSC-Zulassung, wind- und wasserdicht. Perfekt für großvolumige Lagergüter, Werkstatt- und Büroumbauten.", is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:59.275" }),
  product({ ...standard20Foot, title: "20-Fuß-Standardcontainer", slug: "neuer-20-fuss-seecontainer-marineblau", sku: "BC-20ST-NEW-MBL", product_type: "Seecontainer", size_ft: "20", condition: "Neu", condition_grade: "Neu", color: metadata(["RAL 7016", "RAL 3009", "RAL 3020", "RAL 5010", "RAL 5013", "RAL 6005", "RAL 6007", "RAL 7015", "RAL 7035", "RAL 7042", "RAL 9010"], "standard", "standard", "Doppelflügeltür an der Stirnseite", false), price_gross: 1880, availability: "Auf Lager", quantity: 8, csc_status: "Gültig", floor_type: "Plywood 28 mm", lockbox: true, short_description: "Neuer 20-Fuß-Standardcontainer in Marineblau mit CSC-Zulassung, wind- und wasserdicht, direkt ab Depot verfügbar.", description: "Dieser neue 20-Fuß-Seecontainer entspricht den ISO-Standards und ist für Lagerung, Transport und individuelle Umbauten geeignet. CORTEN-Stahlkonstruktion mit verzinktem Plywood-Boden. CSC-Zulassung gültig für den Seetransport. Wind- und wasserdicht geprüft.", is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:54.505" }),
  product({ ...standard20Foot, title: "20-Fuß-Fertigbürocontainer", slug: "buerocontainer-umbau-angebot", sku: "BC-CUSTOM-OFFICE", product_type: "Bürocontainer", size_ft: "20", condition: "Neu", condition_grade: "Neu", color: metadata(["RAL 9010", "RAL 7035", "RAL 7016"], "office", "standard", "Bürotür mit Fensterelementen", false), price_gross: 0, csc_status: "Nicht erforderlich", floor_type: "Individuell", lockbox: false, short_description: "Individueller Bürocontainer-Umbau nach Ihren Anforderungen – mit Fenstern, Isolierung, Elektrik und Innenausbau.", description: "Wir bauen Ihren Wunsch-Bürocontainer nach individuellen Anforderungen. Optionen: Isolierung, Fenster, Personaltür, Elektrik, Beleuchtung, Heizung, Bodenaufbau, Wandverkleidung und RAL-Farbgebung. Preis nach Beratung und Angebot.", is_purchasable: false, featured: false, updated_date: "2026-07-24T02:05:01.152" }),
  product({ ...highCube40Foot, title: "Neuer 40-Fuß-Kühlcontainer (Reefer)", slug: "neuer-40-fuss-kuehlcontainer-reefer", sku: "BC-40RF-NEW", product_type: "Kühlcontainer", size_ft: "40", condition: "Neu", condition_grade: "Neu", color: "Weiß", price_gross: 12900, int_length_mm: 11562, int_width_mm: 2286, door_width_mm: 2286, door_height_mm: 2535, tare_weight_kg: 4400, max_gross_weight_kg: 34000, payload_kg: 29600, volume_m3: 67.5, csc_status: "Gültig", floor_type: "T-Bar-Aluminiumboden", lockbox: false, short_description: "Neuer 40-Fuß-Kühlcontainer mit integrierter Kältemaschine – temperaturgeregelt von -25 °C bis +25 °C.", description: "Der neue 40-Fuß-Kühlcontainer (Reefer) verfügt über eine leistungsstarke Kältemaschine und hält Temperaturen von -25 °C bis +25 °C konstant. PTI-getestet, CSC-gültig. Ideal für die Lagerung temperaturkritischer Güter wie Lebensmittel, Pharma oder Chemikalien.", is_purchasable: true, featured: true, updated_date: "2026-07-23T02:32:07.311" }),
  product({ ...standard20Foot, title: "20-Fuß-Standardcontainer", slug: "gebrauchter-20-fuss-seecontainer-wwt", sku: "BC-20ST-USED-WWT", product_type: "Seecontainer", size_ft: "20", condition: "Gebraucht", condition_grade: "WWT", color: metadata([], "standard", "standard", "Doppelflügeltür an der Stirnseite", true), price_gross: 1240, availability: "Auf Lager", quantity: 12, csc_status: "Nicht erforderlich", floor_type: "Plywood 28 mm", lockbox: true, short_description: "Wind- und wasserdichter gebrauchter 20-Fuß-Container – eine kostengünstige, geprüfte Lagerlösung.", description: "Dieser gebrauchte 20-Fuß-Seecontainer wurde auf Wind- und Wasserdichtigkeit (WWT) geprüft. Mit typischen Gebrauchsspuren, aber voll funktionsfähig. Ideal für die sichere Lagerung auf dem Betriebsgelände, Baustelle oder Privatgrundstück. Kostengünstige Alternative zum Neugerät.", is_purchasable: true, featured: true, updated_date: "2026-07-24T02:04:54.979" }),
];
