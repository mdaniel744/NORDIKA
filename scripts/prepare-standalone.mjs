import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const standaloneRoot = resolve(".next/standalone");
const staticSource = resolve(".next/static");

if (!existsSync(standaloneRoot)) {
  throw new Error("The standalone Next.js output is missing. Run this script after next build.");
}

mkdirSync(resolve(standaloneRoot, ".next"), { recursive: true });
cpSync(staticSource, resolve(standaloneRoot, ".next/static"), { recursive: true, force: true });

if (existsSync(resolve("public"))) {
  cpSync(resolve("public"), resolve(standaloneRoot, "public"), { recursive: true, force: true });
}
