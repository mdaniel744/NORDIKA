"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Check, ChevronDown, Globe2, Menu, Phone, ShoppingCart, X } from "lucide-react";
import { BrandWordmark } from "@/components/brand-wordmark";
import { getDictionary, localeNames, type Locale } from "@/lib/i18n";
import { href, localizedDynamicTail, routeFromSegment } from "@/lib/routes";
import { SITE } from "@/lib/site";

function localeHref(pathname: string, current: Locale, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const key = parts[1] ? routeFromSegment(current, parts[1]) : "home";
  if (!key) return href(target, "home");
  const tail = parts.slice(2).join("/") || undefined;
  return href(target, key, localizedDynamicTail(current, target, key, tail));
}

export function SiteHeader({ locale, enabledLocales }: { locale: Locale; enabledLocales: Locale[] }) {
  const dict = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const primary = [
    [dict.nav.shop, href(locale, "shop")],
    [dict.nav.types, href(locale, "types")],
    [dict.nav.conversions, href(locale, "conversions")],
    [dict.nav.delivery, href(locale, "delivery")],
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-md">
      <div className="hidden bg-zinc-50/90 md:block">
        <div className="container-shell flex h-8 items-center justify-between gap-5 text-xs font-medium text-zinc-500">
          <div className="flex items-center gap-5">
            <a className="inline-flex items-center gap-1.5 transition hover:text-primary" href={`tel:${SITE.phoneHref}`}><Phone aria-hidden="true" className="h-3.5 w-3.5 text-zinc-800" />{SITE.phone}</a>
            <span>{SITE.address.city}</span>
            <span>{dict.home.trust[1]}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href={href(locale, "contact")} className="transition hover:text-primary">{dict.nav.contact}</Link>
            <Link href={href(locale, "locations")} className="transition hover:text-primary">{dict.nav.locations}</Link>
            <Link href={href(locale, "about")} className="transition hover:text-primary">{dict.nav.about}</Link>
          </div>
        </div>
      </div>

      <div className="container-shell flex h-16 items-center gap-3 lg:gap-5">
        <Link href={href(locale, "home")} aria-label={`${SITE.name} – ${dict.nav.home}`} className="shrink-0">
          <BrandWordmark />
        </Link>

        <nav aria-label="Primary navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
          {primary.map(([label, url]) => <Link key={url} href={url} className={`relative whitespace-nowrap px-3 py-2 text-[13px] font-semibold transition hover:text-primary ${pathname === url ? "text-primary after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:bg-[#ffb33e]" : "text-zinc-700"}`}>{label}</Link>)}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((value) => !value)}
              onKeyDown={(event) => { if (event.key === "Escape") setLanguageOpen(false); }}
              className="inline-flex h-10 items-center gap-1.5 px-2 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
              aria-label={dict.localeLabel}
              aria-expanded={languageOpen}
              aria-haspopup="menu"
            >
              <Globe2 aria-hidden="true" className="h-4 w-4" />
              <span>{locale.toUpperCase()}</span>
              <span className="hidden text-sm sm:inline">{localeNames[locale]}</span>
              <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition ${languageOpen ? "rotate-180" : ""}`} />
            </button>
            {languageOpen && (
              <div role="menu" className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-52 bg-white p-1.5 text-sm text-zinc-800 shadow-[0_18px_45px_rgba(0,0,0,0.14)]">
                {enabledLocales.map((item) => (
                  <Link
                    key={item}
                    href={localeHref(pathname, locale, item)}
                    hrefLang={item}
                    role="menuitem"
                    onClick={() => setLanguageOpen(false)}
                    className={`flex items-center justify-between gap-4 px-3 py-2.5 font-bold hover:bg-secondary hover:text-[#0d57a5] ${item === locale ? "bg-secondary text-[#0d57a5]" : ""}`}
                  >
                    <span>{localeNames[item]}</span>
                    <span className="flex items-center gap-2 text-xs uppercase">{item}{item === locale && <Check aria-hidden="true" className="h-3.5 w-3.5" />}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={href(locale, "cart")} className="inline-flex h-11 w-11 items-center justify-center bg-secondary text-zinc-800 transition hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary" aria-label={dict.nav.cart}><ShoppingCart className="h-5 w-5" aria-hidden="true" /></Link>
          <Link href={href(locale, "quote")} className="hidden min-h-11 items-center bg-primary/10 px-4 text-sm font-extrabold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-white lg:inline-flex">{dict.nav.quote}</Link>
          <button className="inline-flex h-11 w-11 items-center justify-center text-zinc-800 xl:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? dict.nav.close : dict.nav.menu}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-zinc-100 bg-white px-4 py-4 shadow-[0_14px_30px_rgba(0,0,0,0.08)] xl:hidden">
          <div className="container-shell grid gap-1 px-0">
            {primary.map(([label, url]) => <Link onClick={() => setOpen(false)} key={url} href={url} className="border-b border-primary/10 px-2 py-3 text-base font-bold">{label}</Link>)}
            <Link onClick={() => setOpen(false)} href={href(locale, "contact")} className="border-b border-primary/10 px-2 py-3 text-base font-bold">{dict.nav.contact}</Link>
            <Link onClick={() => setOpen(false)} href={href(locale, "quote")} className="button-primary mt-3">{dict.nav.quote}</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
