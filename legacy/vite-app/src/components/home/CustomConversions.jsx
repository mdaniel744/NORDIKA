import React from "react";
import { Link } from "react-router-dom";
import { DoorOpen, Lightbulb, Thermometer, PaintBucket, Wind, Wrench, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";

const OPTIONS = [
  { icon: DoorOpen, label: "Türen & Fenster" },
  { icon: Thermometer, label: "Isolierung" },
  { icon: Lightbulb, label: "Elektrik & Beleuchtung" },
  { icon: Wind, label: "Lüftung & Heizung" },
  { icon: PaintBucket, label: "RAL-Farben" },
  { icon: Wrench, label: "Innenausbau" },
];

export default function CustomConversions() {
  return (
    <section className="py-24 border-b border-border bg-card/30">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-secondary border border-border">
              <Image src={IMAGES.office} alt="Individueller Bürocontainer-Umbau mit Fenstern und Innenausbau" fittingType="fill" className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Containerumbau"
              title="Individuelle Container-Umbauten"
              description="Von der Lagereinheit bis zum fertigen Büro- oder Sanitärcontainer: Wir realisieren Umbauten nach Ihren Anforderungen."
            />

            <div className="mt-8 grid grid-cols-2 gap-3">
              {OPTIONS.map((o) => (
                <div key={o.label} className="flex items-center gap-3 p-4 bg-card border border-border">
                  <o.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{o.label}</span>
                </div>
              ))}
            </div>

            <Link to="/angebot-anfordern" className="mt-8 group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
              Umbauprojekt anfragen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}