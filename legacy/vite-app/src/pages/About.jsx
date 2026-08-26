import React from "react";
import { Link } from "react-router-dom";
import { Award, Users, Truck, MapPin, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMAGES.hero} alt="Baltes Container Depot" fittingType="fill" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative max-w-terminal mx-auto px-6 py-20">
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-primary mb-4">Über uns</div>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl text-balance">
            Containerlösungen mit Erfahrung seit 1983
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-6 text-muted-foreground leading-relaxed text-lg">
        <p>
          Baltes Container wurde im Februar 1983 gegründet und ist auf den Verkauf neuer und gebrauchter Container spezialisiert. Seitdem unterstützen wir Unternehmen, öffentliche Auftraggeber und Privatkunden bei der Auswahl geeigneter Lösungen für Lagerung, Transport und individuelle Projekte.
        </p>
        <p>
          Durch unsere langjährigen Beziehungen zu Reedereien und Containerleasinggesellschaften erhalten wir Zugang zu einem breiten Bestand unterschiedlicher Container. Unsere Einkaufserfahrung hilft uns, marktgerechte Preise, verlässliche Verfügbarkeit und passende Lösungen für unterschiedliche Anforderungen anzubieten.
        </p>
        <p>
          Unser Anspruch ist nicht, irgendeinen Container zu verkaufen. Wir möchten den Container liefern, der hinsichtlich Größe, Zustand, Ausstattung, Einsatzbereich und Budget tatsächlich zu Ihrem Vorhaben passt. Von der ersten Beratung bis zur Lieferung stehen wir Ihnen mit praktischer Branchenerfahrung zur Seite.
        </p>
      </div>

      {/* Stats */}
      <div className="border-y border-border bg-card/30">
        <div className="max-w-terminal mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {[
            { icon: Award, value: "40+", label: "Jahre am Markt" },
            { icon: Users, value: "B2B & B2C", label: "Kunden" },
            { icon: Truck, value: "DE-weit", label: "Lieferung" },
            { icon: MapPin, value: "3", label: "Standorte" },
          ].map((s) => (
            <div key={s.label} className="bg-card p-8 text-center">
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-heading text-2xl font-extrabold">{s.value}</div>
              <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-terminal mx-auto px-6 py-20">
        <SectionHeading eyebrow="Unsere Werte" title="Worauf Sie sich verlassen können" align="center" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {[
            { title: "Erfahrung", desc: "Über 40 Jahre Branchenerfahrung im Containerhandel." },
            { title: "Transparenz", desc: "Klare Zustandsangaben, faire Preise, keine versteckten Kosten." },
            { title: "Zuverlässigkeit", desc: "Verlässliche Lieferung und Aufstellung deutschlandweit." },
            { title: "Praktische Expertise", desc: "Beratung durch Praktiker, nicht durch Callcenter." },
            { title: "Produktqualität", desc: "Geprüfte Container mit nachvollziehbarem Zustand." },
            { title: "Faire Preise", desc: "Marktgerechte Preise durch direkte Einkaufsbeziehungen." },
          ].map((v) => (
            <div key={v.title} className="bg-card p-7">
              <h3 className="font-heading text-lg font-bold mb-2 text-primary">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border">
        <div className="max-w-terminal mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-3xl font-extrabold mb-4">Haben Sie Fragen zu unserem Unternehmen?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
              Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/standorte" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground/30 font-bold hover:border-primary hover:text-primary transition-colors">
              Standorte ansehen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}