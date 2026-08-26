import "../globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { metadataBase: new URL(SITE.url), title: `Authorization | ${SITE.name}`, robots: { index: false, follow: false } };

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
