"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Check, ChevronDown, Globe2, Menu, Phone, ShoppingCart, X } from "lucide-react";
import { BrandWordmark } from "@/components/brand-wordmark";
import { getDictionary, localeNames, locales, type Locale } from "@/lib/i18n";
import { href, localizedDynamicTail, routeFromSegment } from "@/lib/routes";
import { SITE } from "@/lib/site";

function localeHref(pathname: string, current: Locale, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const key = parts[1] ? routeFromSegment(current, parts[1]) : "home";
  if (!key) return href(target, "home");
  const tail = parts.slice(2).join("/") || undefined;
  return href(target, key, localizedDynamicTail(current, target, key, tail));
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const primary = [
    [dict.nav.shop, href(locale, "shop")],
    [dict.nav.types, href(locale, "types")],
    [dict.nav.conversions, href(locale, "conversions")],
    [dict.nav.delivery, href(locale, "delivery")],
    [dict.nav.guides, href(locale, "guides")],
    [dict.nav.about, href(locale, "about")],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-white/95 backdrop-blur-md">
      <div className="bg-[#0d57a5] text-white">
        <div className="container-shell flex min-h-9 items-center justify-between gap-4 text-xs font-semibold">
          <span className="hidden text-blue-100/85 sm:inline">{SITE.address.city} · {dict.home.trust[0]}</span>
          <a className="ml-auto inline-flex items-center gap-1.5 hover:text-[#ffb33e]" href={`tel:${SITE.phoneHref}`}><Phone aria-hidden="true" className="h-3.5 w-3.5" />{SITE.phone}</a>
        </div>
      </div>

      <div className="container-shell flex min-h-[92px] items-center gap-3 lg:gap-5">
        <Link href={href(locale, "home")} aria-label={`${SITE.name} – ${dict.nav.home}`} className="shrink-0">
          <BrandWordmark />
        </Link>

        <nav aria-label="Primary navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
          {primary.map(([label, url]) => <Link key={url} href={url} className={`whitespace-nowrap px-2 py-3 text-[13px] font-bold transition hover:text-primary ${pathname === url ? "text-primary" : "text-zinc-700"}`}>{label}</Link>)}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((value) => !value)}
              onKeyDown={(event) => { if (event.key === "Escape") setLanguageOpen(false); }}
              className="inline-flex h-11 items-center gap-2 border border-primary/30 bg-secondary px-3 font-extrabold text-[#0d57a5] transition hover:border-primary"
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
              <div role="menu" className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-52 border border-primary/15 bg-white p-1.5 text-sm text-zinc-800 shadow-[0_18px_50px_rgba(13,87,165,0.18)]">
                {locales.map((item) => (
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

          <Link href={href(locale, "cart")} className="inline-flex h-11 w-11 items-center justify-center border border-primary/20 text-primary hover:bg-secondary" aria-label={dict.nav.cart}><ShoppingCart className="h-5 w-5" aria-hidden="true" /></Link>
          <Link href={href(locale, "quote")} className="button-primary hidden lg:inline-flex">{dict.nav.quote}</Link>
          <button className="inline-flex h-11 w-11 items-center justify-center border border-primary/20 text-primary xl:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? dict.nav.close : dict.nav.menu}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-primary/10 bg-white px-4 py-4 xl:hidden">
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
