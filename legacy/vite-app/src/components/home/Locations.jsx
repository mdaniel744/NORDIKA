import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const LOCATIONS = [
  {
    name: "Wadgassen",
    role: "Hauptsitz & Depot",
    address: "Im Wiesengrund 43, 66787 Wadgassen, Deutschland",
    phone: "+49 163 5393159",
    slug: "wadgassen",
  },
  {
    name: "Karlshagen",
    role: "Depot & Abholstelle",
    address: "Peenestraße 37, 17449 Karlshagen, Deutschland",
    phone: "+49 163 5393159",
    slug: "karlshagen",
  },
  {
    name: "Warschau",
    role: "Depot",
    address: "Dowcip 4, 00-051 Warszawa, Polen",
    phone: "+48 500 667 974",
    slug: "warschau",
  },
];

export default function Locations() {
  return (
    <section className="py-24 border-b border-border bg-card/30">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          eyebrow="Standorte"
          title="Unsere Depots und Standorte"
          description="Jeder Standort hat eine klare Funktion. Besichtigungen und Abholungen nach Terminvereinbarung [VERIFY]."
          align="center"
        />

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-border border border-border">
          {LOCATIONS.map((loc) => (
            <Link key={loc.slug} to={`/standorte/${loc.slug}`} className="group bg-card p-8 hover:bg-card/80 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-mono-tech text-xs uppercase tracking-wider text-primary">{loc.role}</span>
              </div>
              <h3 className="font-heading text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors">{loc.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{loc.address}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" /> {loc.phone}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                Mehr Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}