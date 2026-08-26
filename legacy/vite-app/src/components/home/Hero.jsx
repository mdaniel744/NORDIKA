import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image src={IMAGES.hero} alt="Baltes Container Depot mit Containerreihen bei Sonnenuntergang" fittingType="fill" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="relative max-w-terminal mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-primary mb-6 animate-fade-up">
            Containerlösungen seit 1983
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            Neue und gebrauchte Container kaufen – zuverlässig geliefert
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl text-balance animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            Seit 1983 unterstützt Baltes Container Unternehmen und Privatkunden mit passenden Lösungen für Lagerung, Transport und individuelle Umbauten. Transparent beraten, sorgfältig ausgewählt und deutschlandweit geliefert.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <Link to="/container-kaufen" className="group flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-colors">
              Container entdecken
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/angebot-anfordern" className="flex items-center justify-center gap-2 px-7 py-4 border-2 border-foreground/30 text-foreground font-bold text-base hover:border-primary hover:text-primary transition-colors">
              Angebot anfordern
            </Link>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
            <Link to="/kontakt" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> Persönliche Beratung
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom data strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-sm hidden md:block">
        <div className="max-w-terminal mx-auto px-6 grid grid-cols-4 divide-x divide-border">
          {[
            { value: "40+", label: "Jahre Erfahrung" },
            { value: "6", label: "Sprachen" },
            { value: "DE / NL / PL", label: "Depots" },
            { value: "10–40 ft", label: "Größen" },
          ].map((s) => (
            <div key={s.label} className="px-6 py-4">
              <div className="font-heading text-xl font-extrabold text-primary">{s.value}</div>
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}