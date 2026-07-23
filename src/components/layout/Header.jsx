import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, Phone, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Startseite", to: "/" },
  { label: "Container kaufen", to: "/container-kaufen" },
  { label: "Nach Größe", to: "/container-kaufen", submenu: ["10-Fuß", "20-Fuß", "40-Fuß", "High-Cube", "Kühlcontainer"] },
  { label: "Lösungen & Umbauten", to: "/containerumbau" },
  { label: "Lieferung & Service", to: "/lieferung-aufstellung" },
  { label: "Ratgeber", to: "/ratgeber" },
  { label: "Über uns", to: "/ueber-uns" },
];

const LANGS = ["DE", "EN", "NL", "IT", "CS", "ES"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Utility bar */}
      <div className="hidden md:block border-b border-border/60 bg-card/50">
        <div className="max-w-terminal mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground h-9">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-primary" />+49 163 5393159</span>
            <span>Mo–Fr, 09:00–19:00 Uhr</span>
            <span>Lieferung deutschlandweit</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/kontakt" className="hover:text-foreground transition-colors">Kundenservice</Link>
            <Link to="/standorte" className="hover:text-foreground transition-colors">Standorte</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-terminal mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Baltes Container Startseite">
          <div className="flex flex-col">
            <span className="font-heading text-xl md:text-2xl font-extrabold tracking-tight leading-none">
              BALTES<span className="text-primary">CONTAINER</span>
            </span>
            <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-1">Seit 1983</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive && "text-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden md:flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors" aria-label="Suche">
            <Search className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="hidden md:flex items-center gap-1 px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Sprache wählen"
            >
              <Globe className="w-5 h-5" />
              <span>DE</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-28 bg-popover border border-border py-1 shadow-xl">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLangOpen(false)}
                    className={cn("w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors", l === "DE" && "text-primary font-medium")}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors relative" aria-label="Warenkorb">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center">0</span>
          </button>

          <Link
            to="/angebot-anfordern"
            className="hidden md:flex items-center px-4 py-2.5 text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Angebot anfordern
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-foreground"
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="max-w-terminal mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn("py-3 text-base font-medium border-b border-border/50", isActive ? "text-primary" : "text-foreground")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/angebot-anfordern"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center px-4 py-3 text-base font-bold bg-primary text-primary-foreground"
            >
              Angebot anfordern
            </Link>
            <div className="flex gap-2 mt-4">
              <a href="tel:+491635393159" className="flex-1 flex items-center justify-center gap-2 py-3 text-sm border border-border">
                <Phone className="w-4 h-4" /> Anrufen
              </a>
              <Link to="/kontakt" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-3 text-sm border border-border">
                Kontakt
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}