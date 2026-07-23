import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { IMAGES } from "@/lib/images";

const FOOTER_NAV = {
  container: {
    title: "Container",
    links: [
      { label: "Alle Container", to: "/container-kaufen" },
      { label: "Neue Container", to: "/container-kaufen?condition=Neu" },
      { label: "Gebrauchte Container", to: "/container-kaufen?condition=Gebraucht" },
      { label: "Nach Größe", to: "/container-kaufen" },
      { label: "Kühlcontainer", to: "/container-kaufen?type=Kühlcontainer" },
    ],
  },
  service: {
    title: "Service",
    links: [
      { label: "Lieferung & Aufstellung", to: "/lieferung-aufstellung" },
      { label: "Containerumbauten", to: "/containerumbau" },
      { label: "Zustandsklassen", to: "/container-zustandsklassen" },
      { label: "FAQ", to: "/faq" },
      { label: "Kontakt", to: "/kontakt" },
    ],
  },
  legal: {
    title: "Rechtliches",
    links: [
      { label: "Impressum", to: "/impressum" },
      { label: "Datenschutz", to: "/datenschutz" },
      { label: "AGB", to: "/agb" },
      { label: "Widerrufsbelehrung", to: "/widerruf" },
      { label: "Rückgabe & Erstattung", to: "/rueckgabe-erstattung" },
      { label: "Versand & Lieferung", to: "/lieferung-aufstellung" },
      { label: "Zahlungsarten", to: "/zahlungsarten" },
    ],
  },
};

const LANGS = ["DE", "EN", "NL", "IT", "CS", "ES"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-terminal mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="mb-4">
              <img src={IMAGES.logo} alt="Baltes Container" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Seit 1983 Ihr Experte für neue und gebrauchte Container. Transparent beraten, sorgfältig ausgewählt und deutschlandweit geliefert.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:+491635393159" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary shrink-0" /> +49 163 5393159
              </a>
              <a href="mailto:contact@baltescontainer.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary shrink-0" /> contact@baltescontainer.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Im Wiesengrund 43, 66787 Wadgassen, Deutschland</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" /> Mo–Fr, 09:00–19:00 Uhr
              </div>
            </div>
          </div>

          {Object.values(FOOTER_NAV).map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground text-center md:text-left">
            <p>© {year} Baltes Container GmbH [VERIFY]. Alle Rechte vorbehalten.</p>
            <p className="mt-1">USt-IdNr.: DE137858974 [VERIFY]</p>
          </div>
          <div className="flex items-center gap-1.5">
            {LANGS.map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && <span className="text-muted-foreground/40 text-xs">·</span>}
                <button className={`text-xs font-medium px-1 ${l === "DE" ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors"}`}>
                  {l}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}