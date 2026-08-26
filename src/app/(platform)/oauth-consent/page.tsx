"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";

type ConsentInfo = { authenticated?: boolean; login_path?: string; client_name?: string; app_name?: string; tools?: Array<{ name: string; title?: string; description?: string }> };

export default function OAuthConsentPage() {
  return <Suspense fallback={<main className="grid min-h-screen place-items-center">Loading authorization request…</main>}><OAuthConsentContent /></Suspense>;
}

function OAuthConsentContent() {
  const [info, setInfo] = useState<ConsentInfo | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "submitting" | "done" | "error">("loading");
  const [message, setMessage] = useState("");
  const ctx = useSearchParams()?.get("ctx") || "";

  useEffect(() => {
    if (!ctx) return;
    const token = localStorage.getItem("base44_access_token") || localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    fetch(`/api/apps/${SITE.appId}/mcp/consent-info?handle=${encodeURIComponent(ctx)}`, { credentials: "include", headers })
      .then(async (response) => { if (!response.ok) throw new Error("This authorization link is invalid or has expired."); const data = await response.json() as ConsentInfo; if (!data.authenticated) { const returnTo = `/oauth-consent?ctx=${encodeURIComponent(ctx)}`; window.location.href = `${data.login_path || "/de/anmelden"}?returnTo=${encodeURIComponent(returnTo)}&from_url=${encodeURIComponent(returnTo)}`; return; } setInfo(data); setState("ready"); })
      .catch((error: Error) => { setMessage(error.message); setState("error"); });
  }, [ctx]);

  async function respond(action: "approve" | "deny") {
    setState("submitting"); setMessage("");
    const token = localStorage.getItem("base44_access_token") || localStorage.getItem("token");
    const headers: Record<string, string> = { "Content-Type": "application/json" }; if (token) headers.Authorization = `Bearer ${token}`;
    try {
      const response = await fetch(`/api/apps/${SITE.appId}/mcp/authorize-grant`, { method: "POST", credentials: "include", headers, body: JSON.stringify({ ctx, action }) });
      if (!response.ok) throw new Error("This authorization can no longer be completed. Reconnect from your AI client and try again.");
      const data = await response.json() as { redirect_url: string };
      window.location.href = data.redirect_url;
      if (!/^https?:/i.test(data.redirect_url)) setState("done");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Authorization failed."); setState("error"); }
  }

  return <main className="grid min-h-screen place-items-center bg-zinc-100 p-5"><div className="surface-card w-full max-w-lg p-8"><ShieldCheck className="h-10 w-10 text-primary" /><h1 className="mt-5 text-3xl font-extrabold">Authorize access</h1>{!ctx ? <p role="alert" className="mt-6 bg-red-50 p-4 text-sm font-bold text-red-700">This authorization link is invalid or has expired.</p> : state === "loading" && <p className="mt-6 flex items-center gap-3 text-zinc-600"><LoaderCircle className="h-5 w-5 animate-spin" />Loading authorization request…</p>}{message && <p role="alert" className="mt-6 bg-red-50 p-4 text-sm font-bold text-red-700">{message}</p>}{state === "done" && <p className="mt-6 text-zinc-600">Authorization completed. You can return to your AI client.</p>}{info && (state === "ready" || state === "submitting") && <><p className="mt-4 text-zinc-600">{info.client_name || "An AI client"} wants to access {info.app_name || SITE.name} on your behalf.</p><ul className="mt-6 grid gap-3">{(info.tools || []).map((tool) => <li key={tool.name} className="border border-zinc-200 p-3"><strong>{tool.title || tool.name}</strong>{tool.description && <p className="mt-1 text-sm text-zinc-500">{tool.description}</p>}</li>)}</ul><div className="mt-7 grid grid-cols-2 gap-3"><button disabled={state === "submitting"} onClick={() => respond("deny")} className="button-outline">Deny</button><button disabled={state === "submitting"} onClick={() => respond("approve")} className="button-primary">{state === "submitting" && <LoaderCircle className="h-4 w-4 animate-spin" />}Approve</button></div></>}</div></main>;
}
