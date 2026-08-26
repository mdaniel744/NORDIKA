import React from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-primary mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}