import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, MapPin, Truck, ShieldCheck, ArrowLeft, ShoppingCart, Phone } from "lucide-react";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";
import { IMAGES } from "@/lib/images";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [postcode, setPostcode] = useState("");
  const [shipping, setShipping] = useState(null);

  useEffect(() => {
    base44.entities.Product.filter({ slug })
      .then((res) => {
        if (res && res.length > 0) setProduct(res[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const calcShipping = () => {
    if (!postcode || postcode.length < 4) return;
    const base = 180;
    const zone = parseInt(postcode.charAt(0)) || 0;
    const surcharge = zone >= 8 ? 60 : zone >= 6 ? 30 : 0;
    setShipping(base + surcharge);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-heading text-3xl font-extrabold mb-4">Container nicht gefunden</h1>
        <Link to="/container-kaufen" className="text-primary font-bold hover:underline">Zurück zum Shop</Link>
      </div>
    );
  }

  const purchasable = product.is_purchasable && product.availability !== "Ausverkauft";
  const gallery = [product.main_image, ...(product.additional_images || [])].filter(Boolean);
  const formatPrice = (val) => val ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(val) : "Auf Anfrage";

  const specs = [
    { label: "Produkttyp", value: product.product_type },
    { label: "Größe", value: `${product.size_ft} Fuß` },
    { label: "Zustand", value: product.condition },
    { label: "Zustandsklasse", value: product.condition_grade },
    { label: "Farbe", value: product.color },
    { label: "Depot", value: product.depot },
    { label: "Länge außen", value: product.ext_length_mm ? `${product.ext_length_mm} mm` : "—" },
    { label: "Breite außen", value: product.ext_width_mm ? `${product.ext_width_mm} mm` : "—" },
    { label: "Höhe außen", value: product.ext_height_mm ? `${product.ext_height_mm} mm` : "—" },
    { label: "Länge innen", value: product.int_length_mm ? `${product.int_length_mm} mm` : "—" },
    { label: "Breite innen", value: product.int_width_mm ? `${product.int_width_mm} mm` : "—" },
    { label: "Höhe innen", value: product.int_height_mm ? `${product.int_height_mm} mm` : "—" },
    { label: "Türbreite", value: product.door_width_mm ? `${product.door_width_mm} mm` : "—" },
    { label: "Türhöhe", value: product.door_height_mm ? `${product.door_height_mm} mm` : "—" },
    { label: "Leergewicht", value: product.tare_weight_kg ? `${product.tare_weight_kg} kg` : "—" },
    { label: "Max. Gesamtgewicht", value: product.max_gross_weight_kg ? `${product.max_gross_weight_kg} kg` : "—" },
    { label: "Nutzlast", value: product.payload_kg ? `${product.payload_kg} kg` : "—" },
    { label: "Volumen", value: product.volume_m3 ? `${product.volume_m3} m³` : "—" },
    { label: "CSC-Status", value: product.csc_status },
    { label: "Wind- und wasserdicht", value: product.wwt_status ? "Ja" : "Nein" },
    { label: "Cargo Worthy", value: product.cargo_worthy ? "Ja" : "Nein" },
    { label: "Boden", value: product.floor_type || "—" },
    { label: "Lockbox", value: product.lockbox ? "Ja" : "Nein" },
    { label: "Ventilation", value: product.vents ? "Ja" : "Nein" },
    { label: "Gabelstapeltaschen", value: product.forklift_pockets ? "Ja" : "Nein" },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-terminal mx-auto px-6 py-4">
          <nav className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-foreground">Startseite</Link>
            <span>/</span>
            <Link to="/container-kaufen" className="hover:text-foreground">Container kaufen</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-terminal mx-auto px-6 py-10">
        <Link to="/container-kaufen" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" /> Zurück zum Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/3] overflow-hidden bg-secondary border border-border mb-4">
              <Image src={gallery[activeImage]} alt={product.title} fittingType="fill" className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-[4/3] overflow-hidden border-2 transition-colors ${activeImage === i ? "border-primary" : "border-border"}`}
                  >
                    <Image src={img} alt={`Ansicht ${i + 1}`} fittingType="fill" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="font-mono-tech text-xs text-muted-foreground mb-2">SKU: {product.sku}</div>
            <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">{product.title}</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.short_description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-secondary text-foreground">
                {product.condition} · {product.condition_grade}
              </span>
              <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-secondary text-foreground">
                <MapPin className="w-4 h-4" /> {product.depot}
              </span>
              {product.availability === "Auf Lager" ? (
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-success text-success-foreground">
                  <CheckCircle2 className="w-4 h-4" /> Auf Lager ({product.quantity} Stk.)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-secondary text-muted-foreground">
                  Bestellbar
                </span>
              )}
            </div>

            {/* Price box */}
            <div className="mt-8 p-6 border border-border bg-card">
              <div className="flex items-end justify-between mb-1">
                <span className="text-sm text-muted-foreground">{purchasable ? "Bruttopreis inkl. 19% MwSt." : "Preis"}</span>
                <span className="font-mono-tech text-xs text-muted-foreground">{product.currency}</span>
              </div>
              <div className="font-heading text-4xl font-extrabold text-primary">
                {purchasable ? formatPrice(product.price_gross) : "Auf Anfrage"}
              </div>

              {/* Shipping calculator */}
              {purchasable && (
                <div className="mt-6 pt-6 border-t border-border">
                  <label htmlFor="postcode" className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Truck className="w-4 h-4 text-primary" /> Lieferkosten berechnen
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="postcode"
                      type="text"
                      placeholder="PLZ"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="flex-1 px-3 py-2.5 bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    <button onClick={calcShipping} className="px-4 py-2.5 bg-secondary text-sm font-medium hover:bg-accent transition-colors">
                      Berechnen
                    </button>
                  </div>
                  {shipping !== null && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Geschätzte Lieferkosten: <span className="text-foreground font-bold">{formatPrice(shipping)}</span>
                      <span className="block text-xs mt-1">Geschätzte Lieferzeit: 5–10 Werktage [VERIFY]</span>
                    </p>
                  )}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-6 space-y-3">
                {purchasable ? (
                  <>
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
                      <ShoppingCart className="w-5 h-5" /> In den Warenkorb
                    </button>
                    <button className="w-full px-6 py-4 border-2 border-foreground/30 font-bold hover:border-primary hover:text-primary transition-colors">
                      Jetzt kaufen
                    </button>
                  </>
                ) : (
                  <Link to="/angebot-anfordern" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
                    Angebot anfordern
                  </Link>
                )}
                <a href="tel:+491635393159" className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" /> Beratung anfragen
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specs table */}
        <div className="mt-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-extrabold mb-6">Technische Daten</h2>
            <div className="border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map((s, i) => (
                    <tr key={s.label} className={i % 2 === 0 ? "bg-card/50" : ""}>
                      <td className="px-5 py-3 text-muted-foreground font-medium w-1/2 border-r border-border">{s.label}</td>
                      <td className="px-5 py-3 font-mono-tech text-foreground">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-border bg-card">
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold mb-2">Zustand & Zertifikate</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Zustand: {product.condition} ({product.condition_grade}). CSC-Status: {product.csc_status}. Wind- und wasserdicht: {product.wwt_status ? "Ja" : "Nein"}.
              </p>
            </div>
            <div className="p-6 border border-border bg-card">
              <Truck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold mb-2">Lieferung</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lieferung deutschlandweit. Aufstellung mit Lkw-Kran (HIAB) möglich. Zugangsprüfung vorab erforderlich.
              </p>
              <Link to="/lieferung-aufstellung" className="mt-3 inline-block text-sm text-primary font-medium hover:underline">
                Lieferdetails ansehen
              </Link>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-extrabold mb-4">Produktbeschreibung</h2>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}