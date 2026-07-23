import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div className="relative max-w-terminal mx-auto px-6 text-center">
        <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-primary mb-6">
          Beratung & Angebot
        </div>
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance max-w-3xl mx-auto">
          Welcher Container passt zu Ihrem Vorhaben?
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          Teilen Sie uns Größe, Einsatzbereich und Lieferort mit. Unser Team unterstützt Sie bei der Auswahl einer passenden Lösung.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/container-kaufen" className="group flex items-center justify-center gap-2 px-7 py-4 border-2 border-foreground/30 text-foreground font-bold hover:border-primary hover:text-primary transition-colors">
            Container ansehen
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/angebot-anfordern" className="flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
            Angebot anfordern
          </Link>
          <a href="tel:+491635393159" className="flex items-center justify-center gap-2 px-7 py-4 text-foreground font-bold hover:text-primary transition-colors">
            <Phone className="w-5 h-5" /> Anrufen
          </a>
        </div>
      </div>
    </section>
  );
}