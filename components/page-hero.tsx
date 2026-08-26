export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <header className="border-y border-[#ffb33e]/25 bg-[#073a70] py-16 text-white sm:py-20 lg:py-24">
      <div className="container-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-title max-w-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">{intro}</p>
      </div>
    </header>
  );
}
