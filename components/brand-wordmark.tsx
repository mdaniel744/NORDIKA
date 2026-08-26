import { SITE } from "@/lib/site";

export function BrandWordmark({ inverse = false }: { inverse?: boolean }) {
  return <span className={`inline-flex flex-col leading-none ${inverse ? "text-white" : "text-[#073a70]"}`} aria-label={SITE.legalName}><span className="text-2xl font-black tracking-[0.08em] sm:text-3xl">NORDIKA</span><span className={`mt-1 text-[9px] font-extrabold uppercase tracking-[0.24em] ${inverse ? "text-blue-100" : "text-[#0d57a5]"}`}>Container GmbH</span></span>;
}
