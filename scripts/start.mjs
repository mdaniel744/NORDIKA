import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const portIndex = process.argv.findIndex((argument) => argument === "--port" || argument === "-p");
if (portIndex !== -1 && process.argv[portIndex + 1]) process.env.PORT = process.argv[portIndex + 1];

process.env.HOSTNAME ||= "0.0.0.0";
process.env.NODE_ENV ||= "production";

await import(pathToFileURL(resolve(".next/standalone/server.js")).href);
