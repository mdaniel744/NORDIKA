import React from "react";
import { Link } from "react-router-dom";
import { Truck, Construction, MapPin, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";

const ITEMS = [
  { icon: Truck, title: "Lieferfahrzeug", desc: "Containersattelzug oder Tieflader je nach Größe und Zugang." },
  { icon: Construction, title: "Kran & HIAB", desc: "Aufstellung mit Lkw-Kran (HIAB) oder separat bestellter Kran." },
  { icon: MapPin, title: "Zugang & Untergrund", desc: "Prüfung von Zufahrt, Breite, Höhe und Untergrund vorab." },
];

export default function DeliverySection() {
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Lieferung & Aufstellung"
              title="Deutschlandweite Lieferung mit Aufstellung"
            />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Container sind oversized. Wir kümmern uns um das komplette Logistiksetup: das richtige Fahrzeug, Kranbedarf, Zugangsprüfung und Aufstellung vor Ort. So entsteht kein Risiko bei der Lieferung.
            </p>

            <div className="mt-8 space-y-px bg-border border border-border">
              {ITEMS.map((item) => (
                <div key={item.title} className="bg-card p-5 flex gap-4">
                  <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-bold mb-0.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/lieferung-aufstellung" className="mt-8 group inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              Lieferdetails ansehen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] overflow-hidden bg-secondary border border-border">
              <Image src={IMAGES.delivery} alt="Containerlieferung mit Kran auf einer Baustelle" fittingType="fill" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}