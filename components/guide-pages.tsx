import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { guides, type GuideDefinition } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { SITE } from "@/lib/site";

export function GuidesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const title = dict.nav.guides;
  return <main><Breadcrumbs locale={locale} items={[{ label: title }]} /><PageHero eyebrow={SITE.name} title={title} intro={dict.home.finderText} /><section className="section-space bg-white"><div className="container-shell grid gap-6 md:grid-cols-2">{guides.map((guide) => <Link key={guide.key} href={href(locale, "guides", guide.slugs[locale])} className="group surface-card p-7 sm:p-9"><BookOpen className="h-8 w-8 text-primary" /><h2 className="mt-8 text-2xl font-extrabold sm:text-3xl">{guide.titles[locale]}</h2><p className="mt-4 text-zinc-600">{guide.intros[locale]}</p><span className="mt-7 inline-flex items-center gap-2 font-extrabold text-primary">{dict.common.viewProduct}<ArrowRight className="h-4 w-4" /></span></Link>)}</div></section></main>;
}

export function GuidePage({ locale, guide }: { locale: Locale; guide: GuideDefinition }) {
  const dict = getDictionary(locale);
  const related = guides.filter((item) => item.key !== guide.key);
  return <main><Breadcrumbs locale={locale} items={[{ label: dict.nav.guides, href: href(locale, "guides") }, { label: guide.titles[locale] }]} /><PageHero eyebrow={dict.nav.guides} title={guide.titles[locale]} intro={guide.intros[locale]} /><article className="section-space bg-white"><div className="container-shell max-w-4xl">{guide.sections[locale].map((section) => <section key={section.title} className="border-b border-zinc-200 py-9 first:pt-0 last:border-0"><h2 className="text-2xl font-extrabold sm:text-3xl">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-lg leading-8 text-zinc-600">{paragraph}</p>)}</section>)}<nav className="mt-10" aria-label={dict.nav.guides}><h2 className="text-2xl font-extrabold">{dict.nav.guides}</h2><div className="mt-5 grid gap-3 md:grid-cols-2">{related.map((item) => <Link key={item.key} href={href(locale, "guides", item.slugs[locale])} className="group flex items-center justify-between gap-4 bg-secondary p-5 font-bold text-[#092b4e] hover:text-primary">{item.titles[locale]}<ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" /></Link>)}<Link href={href(locale, "conditions")} className="group flex items-center justify-between gap-4 bg-secondary p-5 font-bold text-[#092b4e] hover:text-primary">{dict.common.condition}<ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" /></Link></div></nav><div className="mt-10 bg-zinc-100 p-8"><h2 className="text-2xl font-extrabold">{dict.home.ctaTitle}</h2><p className="mt-3 text-zinc-600">{dict.home.ctaText}</p><Link href={href(locale, "quote")} className="button-primary mt-6">{dict.nav.quote}<ArrowRight className="h-4 w-4" /></Link></div></div></article></main>;
}
