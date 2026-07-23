import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Package, Truck, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const CONDITIONS = [
  { name: "Neu", desc: "Fabrikneue Container direkt vom Hersteller. Mit CSC-Zulassung und voller Garantie.", color: "text-primary" },
  { name: "One Trip", desc: "Einmal im Seetransport eingesetzt. Nahezu neuwertig mit minimalen Gebrauchsspuren.", color: "text-primary" },
  { name: "Gebraucht – WWT", desc: "Wind- und wasserdicht geprüft. Typische Gebrauchsspuren, voll funktionsfähig.", color: "text-success" },
  { name: "Cargo Worthy (CW)", desc: "Für den Seetransport geeignet und strukturell intakt. CSC-konform.", color: "text-success" },
  { name: "IICL", desc: "Höchster gebrauchter Standard nach Institute of International Container Lessors.", color: "text-success" },
  { name: "CSC", desc: "Zulassung für den internationalen Seetransport. Gültigkeit wird produktbezogen angegeben.", color: "text-foreground" },
];

export default function ConditionGuide() {
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          eyebrow="Zustandsklassen"
          title="Verstehen Sie den Container-Zustand"
          description="Wir geben bei jedem Container transparent den Zustand an. So wissen Sie genau, was Sie erhalten."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {CONDITIONS.map((c) => (
            <div key={c.name} className="bg-card p-7 hover:bg-card/80 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className={`w-5 h-5 ${c.color}`} />
                <h3 className="font-heading text-lg font-bold">{c.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/container-zustandsklassen" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            Alle Zustandsklassen im Detail
          </Link>
        </div>
      </div>
    </section>
  );
}