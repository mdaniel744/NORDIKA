export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <header className="border-y border-zinc-100 bg-gradient-to-br from-white via-white to-secondary/75 py-9 md:py-12">
      <div className="container-shell">
        <p className="eyebrow"><span className="h-1.5 w-1.5 bg-[#ffb33e]" />{eyebrow}</p>
        <h1 className="max-w-5xl text-3xl font-extrabold tracking-[-0.045em] text-zinc-900 md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-zinc-600 md:text-lg">{intro}</p>
      </div>
    </header>
  );
}
