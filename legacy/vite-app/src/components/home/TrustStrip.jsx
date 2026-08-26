import React from "react";
import { Award, Package, Truck, Headphones, ShieldCheck } from "lucide-react";

const TRUST = [
  { icon: Award, label: "Seit 1983 am Markt" },
  { icon: Package, label: "Neue und gebrauchte Container" },
  { icon: Truck, label: "Deutschlandweite Lieferung" },
  { icon: Headphones, label: "Persönliche Beratung" },
  { icon: ShieldCheck, label: "Transparente Zustandsangaben" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-card/50">
      <div className="max-w-terminal mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-2.5">
              <t.icon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium text-foreground/90">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}