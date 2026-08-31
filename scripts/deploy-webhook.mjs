import { createServer } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { spawn } from "node:child_process";
import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";

const PORT = Number(process.env.WEBHOOK_PORT || 9013);
const SECRET = process.env.WEBHOOK_SECRET || "";
const REPO_DIR = process.env.WEBHOOK_REPO_DIR || resolve(".");
const PM2_APP_NAME = process.env.WEBHOOK_PM2_APP || "nordika";
const LOG_FILE = process.env.WEBHOOK_LOG_FILE || resolve(REPO_DIR, "deploy-webhook.log");

if (!SECRET) {
  console.error("WEBHOOK_SECRET is not set; refusing to start.");
  process.exit(1);
}

async function log(line) {
  const entry = `[${new Date().toISOString()}] ${line}\n`;
  console.log(entry.trim());
  await appendFile(LOG_FILE, entry).catch(() => {});
}

function verifySignature(rawBody, signatureHeader) {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", SECRET).update(rawBody).digest("hex");
  const provided = signatureHeader.slice("sha256=".length);
  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(provided, "hex");
  if (expectedBuffer.length !== providedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, providedBuffer);
}

function runDeploy() {
  const commands = [
    ["git", ["pull", "origin", "main"]],
    ["npm", ["ci"]],
    ["npm", ["run", "build"]],
    ["pm2", ["restart", PM2_APP_NAME]],
  ];

  // npm ci / npm run build must not inherit NODE_ENV=production from this
  // process's own environment: production mode makes npm skip devDependencies
  // (tailwindcss, typescript, postcss) that the build itself needs.
  const buildEnv = { ...process.env, NODE_ENV: "development" };

  (async () => {
    for (const [command, args] of commands) {
      await log(`Running: ${command} ${args.join(" ")}`);
      const exitCode = await new Promise((resolvePromise) => {
        const child = spawn(command, args, { cwd: REPO_DIR, shell: true, env: command === "pm2" ? process.env : buildEnv });
        child.stdout.on("data", (chunk) => log(chunk.toString().trim()));
        child.stderr.on("data", (chunk) => log(chunk.toString().trim()));
        child.on("close", resolvePromise);
      });
      if (exitCode !== 0) {
        await log(`Command failed with exit code ${exitCode}, aborting deploy.`);
        return;
      }
    }
    await log("Deploy complete.");
  })().catch((error) => log(`Deploy error: ${error instanceof Error ? error.message : String(error)}`));
}

const server = createServer((request, response) => {
  if (request.method !== "POST" || request.url !== "/deploy-hook") {
    response.writeHead(404).end();
    return;
  }
  const chunks = [];
  request.on("data", (chunk) => chunks.push(chunk));
  request.on("end", () => {
    const rawBody = Buffer.concat(chunks);
    const signature = request.headers["x-hub-signature-256"];
    if (!verifySignature(rawBody, Array.isArray(signature) ? signature[0] : signature)) {
      log("Rejected webhook delivery: invalid or missing signature.");
      response.writeHead(401).end("invalid signature");
      return;
    }
    let payload;
    try {
      payload = JSON.parse(rawBody.toString("utf8"));
    } catch {
      response.writeHead(400).end("invalid json");
      return;
    }
    const isMainPush = request.headers["x-github-event"] === "push" && payload?.ref === "refs/heads/main";
    if (!isMainPush) {
      log(`Ignoring event: ${request.headers["x-github-event"]} ref=${payload?.ref}`);
      response.writeHead(200).end("ignored");
      return;
    }
    response.writeHead(202).end("deploy started");
    log(`Verified push to main by ${payload?.pusher?.name || "unknown"} (${payload?.after || "?"}); starting deploy.`);
    runDeploy();
  });
});

server.listen(PORT, "127.0.0.1", () => {
  log(`Deploy webhook listening on 127.0.0.1:${PORT}`);
});
