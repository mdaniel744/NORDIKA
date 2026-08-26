import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const USES = ["Lagerung", "Transport", "Büro", "Werkstatt", "Kühlung", "Unterkunft"];
const SIZES = ["10 ft", "20 ft", "40 ft"];
const CONDITIONS = ["Neu", "One-Trip", "Gebraucht"];

export default function ContainerFinder() {
  const [use, setUse] = useState("Lagerung");
  const [size, setSize] = useState("20 ft");
  const [cond, setCond] = useState("Gebraucht");

  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          eyebrow="Container-Finder"
          title="Finden Sie den passenden Container"
          description="Beantworten Sie drei kurze Fragen. Wir empfehlen Ihnen die passende Kategorie aus unserem Lagerbestand."
          align="center"
        />

        <div className="mt-12 bg-card border border-border p-8 md:p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <FinderGroup label="Einsatzbereich" options={USES} value={use} onChange={setUse} />
            <FinderGroup label="Größe" options={SIZES} value={size} onChange={setSize} />
            <FinderGroup label="Zustand" options={CONDITIONS} value={cond} onChange={setCond} />
          </div>

          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Empfehlung: <span className="text-foreground font-medium">{cond} {size} Container für {use}</span>
            </div>
            <Link
              to={`/container-kaufen?size=${size}&condition=${cond}`}
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              Passende Container ansehen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinderGroup({ label, options, value, onChange }) {
  return (
    <div>
      <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2.5 text-sm font-medium border transition-colors ${
              value === opt
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}