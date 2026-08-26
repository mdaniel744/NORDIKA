import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";

export function Breadcrumbs({ locale, items }: { locale: Locale; items: Array<{ label: string; href?: string }> }) {
  const dict = getDictionary(locale);
  return (
    <nav aria-label="Breadcrumb" className="container-shell py-4 text-xs font-semibold text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link className="hover:text-primary" href={href(locale, "home")}>{dict.common.breadcrumbHome}</Link></li>
        {items.map((item) => <li key={`${item.label}-${item.href || "current"}`} className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3" aria-hidden="true" />{item.href ? <Link className="hover:text-primary" href={item.href}>{item.label}</Link> : <span aria-current="page" className="text-zinc-800">{item.label}</span>}</li>)}
      </ol>
    </nav>
  );
}
