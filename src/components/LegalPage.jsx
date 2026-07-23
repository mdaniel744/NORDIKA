import React from "react";

export default function LegalPage({ title, updatedAt, intro, children }) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <header className="mb-10 pb-8 border-b border-border">
        <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-primary mb-3">Rechtliches</div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
        {updatedAt && (
          <p className="mt-3 text-sm text-muted-foreground">Stand: {updatedAt}</p>
        )}
      </header>

      {intro && (
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">{intro}</p>
      )}

      <div className="prose-legal space-y-6 text-foreground/90 leading-relaxed">
        {children}
      </div>

      <footer className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
        <p>
          Baltes Container GmbH · Im Wiesengrund 43, 66787 Wadgassen ·{" "}
          <a href="mailto:contact@baltescontainer.com" className="text-primary hover:underline">contact@baltescontainer.com</a>
        </p>
      </footer>
    </article>
  );
}