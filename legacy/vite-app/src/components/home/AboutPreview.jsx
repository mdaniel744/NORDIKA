import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";

export default function AboutPreview() {
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-secondary border border-border">
              <Image src={IMAGES.delivery} alt="Containerlieferung mit Lkw und Kran" fittingType="fill" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-primary-foreground p-6 max-w-[200px]">
              <div className="font-heading text-4xl font-extrabold">1983</div>
              <div className="text-sm font-medium mt-1">Gegründet im Februar 1983</div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Über Baltes Container"
              title="Containerlösungen mit Erfahrung seit 1983"
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Baltes Container wurde im Februar 1983 gegründet und ist auf den Verkauf neuer und gebrauchter Container spezialisiert. Seitdem unterstützen wir Unternehmen, öffentliche Auftraggeber und Privatkunden bei der Auswahl geeigneter Lösungen für Lagerung, Transport und individuelle Projekte.
              </p>
              <p>
                Durch unsere langjährigen Beziehungen zu Reedereien und Containerleasinggesellschaften erhalten wir Zugang zu einem breiten Bestand unterschiedlicher Container. Unsere Einkaufserfahrung hilft uns, marktgerechte Preise, verlässliche Verfügbarkeit und passende Lösungen für unterschiedliche Anforderungen anzubieten.
              </p>
              <p>
                Unser Anspruch ist nicht, irgendeinen Container zu verkaufen. Wir möchten den Container liefern, der hinsichtlich Größe, Zustand, Ausstattung, Einsatzbereich und Budget tatsächlich zu Ihrem Vorhaben passt.
              </p>
            </div>
            <Link to="/ueber-uns" className="mt-8 group inline-flex items-center gap-2 text-sm font-bold text-primary">
              Mehr über Baltes Container
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}