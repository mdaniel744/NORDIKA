import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return <html lang="de" data-scroll-behavior="smooth"><body><main className="grid min-h-screen place-items-center bg-secondary p-6"><div className="max-w-lg border border-primary/10 bg-white p-10 text-center shadow-[0_18px_50px_rgba(13,87,165,0.10)]"><p className="text-sm font-extrabold uppercase tracking-widest text-primary">404</p><h1 className="mt-3 text-4xl font-extrabold">Seite nicht gefunden</h1><p className="mt-4 text-zinc-600">Die angeforderte Seite ist nicht verfügbar.</p><Link href="/de" className="button-primary mt-7">Zu {SITE.name}</Link></div></main></body></html>;
}
