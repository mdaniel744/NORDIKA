import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "lib", "i18n.ts"), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const module = { exports: {} };
new Function("exports", "module", compiled)(module.exports, module);
const { dictionaries, locales } = module.exports;

function keys(value, prefix = "") {
  if (Array.isArray(value)) return value.flatMap((item, index) => keys(item, `${prefix}[${index}]`));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, child]) => keys(child, prefix ? `${prefix}.${key}` : key));
  return [prefix];
}

const reference = keys(dictionaries.de).sort();
const errors = [];
for (const locale of locales) {
  const current = keys(dictionaries[locale]).sort();
  const missing = reference.filter((key) => !current.includes(key));
  const extra = current.filter((key) => !reference.includes(key));
  if (missing.length) errors.push(`${locale}: missing ${missing.join(", ")}`);
  if (extra.length) errors.push(`${locale}: extra ${extra.join(", ")}`);
  for (const key of current) {
    const value = key.split(/\.|\[|\]/).filter(Boolean).reduce((object, part) => object?.[Number.isNaN(Number(part)) ? part : Number(part)], dictionaries[locale]);
    if (typeof value === "string" && (!value.trim() || /\b(?:undefined|null|translation missing)\b/i.test(value))) errors.push(`${locale}: invalid value at ${key}`);
  }
}

const projectFiles = [];
for (const directory of ["src/app", "components", "lib"]) collect(path.join(root, directory));
function collect(directory) { for (const entry of fs.readdirSync(directory, { withFileTypes: true })) { const full = path.join(directory, entry.name); if (entry.isDirectory()) collect(full); else if (/\.(?:ts|tsx)$/.test(entry.name)) projectFiles.push(full); } }
for (const file of projectFiles) {
  const content = fs.readFileSync(file, "utf8");
  if (/(?:contesol|baltes container)/i.test(content)) errors.push(`${path.relative(root, file)}: forbidden former-brand reference`);
}

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Translation audit passed: ${locales.length} locales, ${reference.length} dictionary values, no forbidden brand references.`);
