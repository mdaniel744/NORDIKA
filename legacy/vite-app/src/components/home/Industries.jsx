import React from "react";
import { Link } from "react-router-dom";
import { HardHat, Wheat, Factory, Truck, Store, Building2, Calendar, Home } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const INDUSTRIES = [
  { icon: HardHat, name: "Bau", desc: "Baustellencontainer & Werkstatt" },
  { icon: Wheat, name: "Landwirtschaft", desc: "Lager & Geräteraum" },
  { icon: Factory, name: "Industrie", desc: "Produktions- & Lagererweiterung" },
  { icon: Truck, name: "Logistik", desc: "Umschlag & Zwischenlager" },
  { icon: Store, name: "Handel", desc: "Filial- & Lagerlösungen" },
  { icon: Building2, name: "Kommunen", desc: "Öffentliche Auftraggeber" },
  { icon: Calendar, name: "Veranstaltungen", desc: "Temporäre Infrastruktur" },
  { icon: Home, name: "Privatkunden", desc: "Sichere Lagerung & Werkstatt" },
];

export default function Industries() {
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          eyebrow="Branchen"
          title="Lösungen für jede Branche"
          description="Unterschiedliche Branchen haben unterschiedliche Anforderungen. Wir beraten Sie branchenspezifisch."
          align="center"
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.name}
              to="/container-kaufen"
              className="group bg-card p-7 text-center hover:bg-card/80 transition-colors"
            >
              <div className="flex justify-center mb-4">
                <ind.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-heading font-bold mb-1 group-hover:text-primary transition-colors">{ind.name}</h3>
              <p className="text-xs text-muted-foreground">{ind.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}