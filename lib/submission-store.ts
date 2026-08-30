import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type SubmissionKind = "enquiry" | "order";

export async function saveSubmission(kind: SubmissionKind, data: Record<string, unknown>): Promise<{ id: string; receivedAt: string }> {
  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const configuredDirectory = process.env.NORDIKA_SUBMISSIONS_DIR || resolve(process.cwd(), ".data", "submissions");
  const directory = resolve(/* turbopackIgnore: true */ configuredDirectory);
  const safeTimestamp = receivedAt.replace(/[:.]/g, "-");

  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, `${kind}-${safeTimestamp}-${id}.json`), `${JSON.stringify({ id, kind, receivedAt, ...data }, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  });

  return { id, receivedAt };
}
