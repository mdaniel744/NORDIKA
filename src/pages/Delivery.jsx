import React from "react";
import { Link } from "react-router-dom";
import { Truck, Construction, MapPin, Ruler, AlertTriangle, PackageCheck, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";

const VEHICLES = [
  { icon: Truck, title: "Containersattelzug", desc: "Für 20- und 40-Fuß-Container auf befestigten Zufahrten." },
  { icon: Truck, title: "Tieflader", desc: "Für schwer erreichbare Orte oder besondere Container." },
  { icon: Construction, title: "Lkw-Kran (HIAB)", desc: "Aufstellung direkt vom Lkw aus. Häufigste Option." },
  { icon: Construction, title: "Autokran", desc: "Bei schwierigem Zugang oder großem Absetzradius." },
];

export default function Delivery() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMAGES.delivery} alt="Containerlieferung mit Kran" fittingType="fill" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative max-w-terminal mx-auto px-6 py-20">
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-primary mb-4">Lieferung & Aufstellung</div>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl text-balance">
            Deutschlandweite Lieferung mit Aufstellung
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Container sind oversized. Wir kümmern uns um Fahrzeug, Kran, Zugangsprüfung und Aufstellung – damit Ihre Lieferung reibungslos verläuft.
          </p>
        </div>
      </div>

      {/* Vehicles */}
      <div className="max-w-terminal mx-auto px-6 py-20">
        <SectionHeading eyebrow="Fahrzeuge & Kran" title="Das richtige Fahrzeug für jeden Container" />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {VEHICLES.map((v) => (
            <div key={v.title} className="bg-card p-7">
              <v.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="border-y border-border bg-card/30">
        <div className="max-w-terminal mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading eyebrow="Zugang & Voraussetzungen" title="Was wir für die Lieferung benötigen" />
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Ruler, text: "Befahrbare Zufahrt mit ausreichender Breite (min. 3,5 m) und Höhe (min. 4 m)" },
                  { icon: MapPin, text: "Tragfähiger Untergrund: Beton, Asphalt oder verdichteter Schotter" },
                  { icon: AlertTriangle, text: "Freie Fläche zum Absetzen (min. Containergröße + 2 m Rangierbereich)" },
                  { icon: Construction, text: "Bei Kranbedarf: ausreichender Kranarbeitsradius und Kabelfreiheit" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 border border-border bg-card">
                    <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Ablauf" title="So läuft die Lieferung ab" />
              <ol className="mt-8 space-y-px bg-border border border-border">
                {[
                  "Bestellung und Lieferterminabstimmung",
                  "Zugangsprüfung (Breite, Höhe, Untergrund)",
                  "Anlieferung mit geeignetem Fahrzeug",
                  "Aufstellung mit Kran oder HIAB",
                  "Übergabe und Schadenprüfung vor Ort",
                ].map((step, i) => (
                  <li key={i} className="bg-card p-5 flex gap-4">
                    <span className="font-mono-tech text-xl font-bold text-primary shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Important notes */}
      <div className="max-w-terminal mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="p-8 border border-border bg-card">
            <PackageCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-heading text-xl font-extrabold mb-3">In der Lieferung enthalten</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Anlieferung zum vereinbarten Termin</li>
              <li>• Abladen mit Lkw-Kran (HIAB), sofern Zugang geeignet</li>
              <li>• Absetzung auf vorbereiteten Untergrund</li>
              <li>• Übergabeprotokoll</li>
            </ul>
          </div>
          <div className="p-8 border border-border bg-card">
            <AlertTriangle className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-heading text-xl font-extrabold mb-3">Nicht enthalten / Zusätzliche Kosten</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Separat bestellter Autokran bei schwierigem Zugang</li>
              <li>• Mehraufwand bei nicht befahrbarer Zufahrt</li>
              <li>• Insel- oder Remote-Aufschläge</li>
              <li>• Kosten bei erfolgter Anfahrt ohne Abstellmöglichkeit</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-heading text-3xl font-extrabold mb-4">Lieferung für Ihren Container planen?</h2>
          <Link to="/angebot-anfordern" className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
            Angebot anfordern <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}