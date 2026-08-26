import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const FAQS = [
  { q: "Was bedeutet „One Trip“ bei Containern?", a: "Ein One-Trip-Container wurde einmal für einen Seetransport eingesetzt und ist danach nahezu neuwertig. Er weist minimale Gebrauchsspuren auf, ist aber strukturell und optisch fast wie neu." },
  { q: "Was bedeuten WWT, CW und IICL?", a: "WWT (Wind and Watertight) bedeutet, dass der Container wind- und wasserdicht ist. CW (Cargo Worthy) bedeutet, dass er für den Seetransport geeignet ist. IICL ist der höchste gebrauchter Standard nach den Richtlinien des Institute of International Container Lessors." },
  { q: "Wie wird ein Container geliefert?", a: "Container werden mit einem Containersattelzug oder Tieflader angeliefert. Für die Aufstellung ist meist ein Lkw-Kran (HIAB) erforderlich. Bei schwierigem Zugang kann ein separat bestellter Kran nötig sein." },
  { q: "Wie viel Platz benötigt der Liefer-Lkw?", a: "Für die Anlieferung benötigen Sie eine befahrbare Zufahrt mit ausreichender Breite, Höhe und Tragfähigkeit. Wir prüfen die Zugangssituation vorab gemeinsam mit Ihnen." },
  { q: "Welcher Untergrund eignet sich für einen Container?", a: "Ein ebener, tragfähiger Untergrund ist erforderlich – idealerweise Beton, Asphalt oder verdichteter Schotter. Weiche Böden können zu Verwindungen führen." },
  { q: "Benötige ich eine Baugenehmigung?", a: "Dies hängt von Ihrer Gemeinde und der geplanten Nutzungsdauer ab. Container für vorübergehende Lagerung sind oft genehmigungsfrei. Für dauerhafte oder bewohnte Aufstellung informieren Sie sich bei Ihrer örtlichen Baubehörde." },
  { q: "Sind alle Container CSC-zertifiziert?", a: "Nein. Die CSC-Zulassung ist für den internationalen Seetransport relevant und wird produktbezogen angegeben. Gebrauchte Lagercontainer benötigen sie nicht. Prüfen Sie die Angabe auf der jeweiligen Produktseite." },
  { q: "Welche Zahlungsmethoden werden akzeptiert?", a: "Wir bieten [VERIFY] Überweisung, Kreditkarte und PayPal an. Bei individuellen Umbauten sind Anzahlung und Ratenzahlung möglich." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Häufig gestellte Fragen"
          description="Antworten auf die wichtigsten Fragen rund um Containerkauf, Lieferung und Zustand."
          align="center"
        />

        <div className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-heading font-bold text-lg">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <p className="pb-5 text-muted-foreground leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}