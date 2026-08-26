"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/site";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const clean = [...new Set(images.filter(Boolean))];
  const [selected, setSelected] = useState(clean[0]);
  if (!selected) return <div className="grid aspect-[4/3] place-items-center bg-zinc-100 text-zinc-500">{SITE.name}</div>;
  return <div><div className="relative aspect-[4/3] overflow-hidden bg-zinc-100"><Image src={selected} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" /></div>{clean.length > 1 && <div className="mt-3 grid grid-cols-5 gap-2">{clean.map((image, index) => <button type="button" key={image} onClick={() => setSelected(image)} className={`relative aspect-square overflow-hidden border-2 bg-zinc-100 ${selected === image ? "border-primary" : "border-transparent"}`} aria-label={`${title} image ${index + 1}`}><Image src={image} alt="" fill sizes="120px" className="object-cover" /></button>)}</div>}</div>;
}
