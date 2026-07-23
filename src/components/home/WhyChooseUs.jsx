import React from "react";
import { Award, Handshake, ShieldCheck, Headphones, Truck, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const REASONS = [
  { icon: Award, title: "Erfahrung seit 1983", desc: "Über 40 Jahre Branchenerfahrung im An- und Verkauf von Containern." },
  { icon: Handshake, title: "Direkte Einkaufsbeziehungen", desc: "Langjährige Partnerschaften mit Reedereien und Leasinggesellschaften." },
  { icon: ShieldCheck, title: "Klare Zustandsklassen", desc: "Transparente Angabe: Neu, One-Trip, WWT, CW oder IICL." },
  { icon: Headphones, title: "Fachkundige Beratung", desc: "Persönliche Beratung durch Praktiker – telefonisch und vor Ort." },
  { icon: Truck, title: "Lieferung und Aufstellung", desc: "Deutschlandweite Lieferung mit Kran- und Aufstellungsservice." },
  { icon: Wrench, title: "Individuelle Umbauten", desc: "Maßgeschneiderte Konfigurationen nach Ihren Anforderungen." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 border-b border-border bg-card/30">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          eyebrow="Warum Baltes Container"
          title="Gründe, die für uns sprechen"
          description="Vertrauen entsteht durch Transparenz, Erfahrung und verlässliche Lieferung – nicht durch leere Versprechen."
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {REASONS.map((r) => (
            <div key={r.title} className="bg-card p-8 hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-5">
                <r.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}