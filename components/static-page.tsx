import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import type { PageContent } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";
import { SITE } from "@/lib/site";

export function StaticPage({ locale, routeKey, content }: { locale: Locale; routeKey: RouteKey; content: PageContent }) {
  const dict = getDictionary(locale);
  return (
    <main>
      <Breadcrumbs locale={locale} items={[{ label: content.title }]} />
      <PageHero eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <section className="section-space bg-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid max-w-4xl gap-12">
            {content.sections.map((section, index) => <section key={`${section.title}-${index}`} className="border-b border-zinc-200 pb-10 last:border-0"><h2 className="text-2xl font-extrabold sm:text-3xl">{section.title}</h2><div className="mt-4 grid gap-4 text-zinc-600">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.bullets && <ul className="mt-6 grid gap-3 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ffb33e]"><Check className="h-3 w-3 text-[#092b4e]" /></span><span>{bullet}</span></li>)}</ul>}</section>)}
          </div>
          <aside className="h-fit bg-zinc-100 p-7 lg:sticky lg:top-32"><p className="eyebrow">{SITE.name}</p><h2 className="text-2xl font-extrabold">{dict.home.ctaTitle}</h2><p className="mt-3 text-sm text-zinc-600">{dict.home.ctaText}</p><Link href={href(locale, "quote")} className="button-primary mt-6 w-full">{dict.nav.quote}<ArrowRight className="h-4 w-4" /></Link>{routeKey !== "contact" && <Link href={href(locale, "contact")} className="button-outline mt-3 w-full">{dict.nav.contact}</Link>}</aside>
        </div>
      </section>
    </main>
  );
}
