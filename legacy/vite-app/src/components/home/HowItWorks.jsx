import React from "react";
import SectionHeading from "@/components/SectionHeading";

const PURCHASE_STEPS = [
  { num: "01", title: "Container auswählen", desc: "Wählen Sie aus unserem Lagerbestan nach Größe, Typ und Zustand." },
  { num: "02", title: "Lieferkosten prüfen", desc: "Berechnen Sie die Lieferkosten anhand Ihrer Postleitzahl." },
  { num: "03", title: "Sicher bestellen", desc: "Bestellen Sie direkt online mit abgesichertem Checkout." },
  { num: "04", title: "Lieferung abstimmen", desc: "Wir kontaktieren Sie zur Liefertermin- und Zugangsprüfung." },
  { num: "05", title: "Container aufstellen", desc: "Lieferung und Aufstellung durch erfahrenes Logistikteam." },
];

const CUSTOM_STEPS = [
  { num: "01", title: "Anforderungen mitteilen", desc: "Beschreiben Sie Ihr Projekt im Konfigurator." },
  { num: "02", title: "Beratung und Planung", desc: "Persönliche Beratung und technische Planung." },
  { num: "03", title: "Individuelles Angebot", desc: "Sie erhalten ein transparentes Festpreisangebot." },
  { num: "04", title: "Produktion oder Umbau", desc: "Umbau nach Spezifikation in unserer Werkstatt." },
  { num: "05", title: "Lieferung und Übergabe", desc: "Fertigstellung, Lieferung und Übergabe vor Ort." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 border-b border-border bg-card/30">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Standard purchase */}
          <div>
            <SectionHeading eyebrow="Standardkauf" title="So einfach kaufen Sie einen Container" />
            <ol className="mt-10 space-y-px bg-border border border-border">
              {PURCHASE_STEPS.map((s) => (
                <li key={s.num} className="bg-card p-6 flex gap-5">
                  <span className="font-mono-tech text-2xl font-bold text-primary shrink-0 w-12">{s.num}</span>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Custom project */}
          <div>
            <SectionHeading eyebrow="Individuelle Projekte" title="So läuft ein Umbauprojekt ab" />
            <ol className="mt-10 space-y-px bg-border border border-border">
              {CUSTOM_STEPS.map((s) => (
                <li key={s.num} className="bg-card p-6 flex gap-5">
                  <span className="font-mono-tech text-2xl font-bold text-primary shrink-0 w-12">{s.num}</span>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}