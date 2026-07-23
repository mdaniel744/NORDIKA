import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { CATEGORIES } from "@/lib/images";

export default function FeaturedCategories() {
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-terminal mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="Kategorien"
            title="Container nach Typ und Größe"
            description="Von der kompakten 10-Fuß-Lösung bis zum 40-Fuß-High-Cube – finden Sie den passenden Container für Ihr Vorhaben."
          />
          <Link to="/container-kaufen" className="group flex items-center gap-2 text-sm font-bold text-primary shrink-0">
            Alle Container
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/container-kaufen`}
              className="group relative flex flex-col bg-card overflow-hidden hover:bg-card/80 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <Image src={cat.image} alt={cat.name} fittingType="fill" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-16">
                <h3 className="font-heading text-lg font-bold mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{cat.benefit}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}