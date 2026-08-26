"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";

const copy: Record<Locale, { name: string; company: string; email: string; phone: string; message: string; consent: string }> = {
  de: { name: "Name", company: "Unternehmen (optional)", email: "E-Mail", phone: "Telefon (optional)", message: "Wie können wir helfen?", consent: "Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu." },
  en: { name: "Name", company: "Company (optional)", email: "Email", phone: "Phone (optional)", message: "How can we help?", consent: "I consent to my details being processed to respond to this enquiry." },
  nl: { name: "Naam", company: "Bedrijf (optioneel)", email: "E-mail", phone: "Telefoon (optioneel)", message: "Hoe kunnen we helpen?", consent: "Ik stem in met de verwerking van mijn gegevens om deze aanvraag te beantwoorden." },
  it: { name: "Nome", company: "Azienda (opzionale)", email: "Email", phone: "Telefono (opzionale)", message: "Come possiamo aiutarti?", consent: "Acconsento al trattamento dei miei dati per rispondere alla richiesta." },
  cs: { name: "Jméno", company: "Společnost (volitelné)", email: "E-mail", phone: "Telefon (volitelné)", message: "Jak vám můžeme pomoci?", consent: "Souhlasím se zpracováním údajů za účelem vyřízení této poptávky." },
  es: { name: "Nombre", company: "Empresa (opcional)", email: "Correo electrónico", phone: "Teléfono (opcional)", message: "¿Cómo podemos ayudarte?", consent: "Consiento el tratamiento de mis datos para responder a esta consulta." },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const labels = copy[locale];
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formType: "contact", locale, name: form.get("name"), company: form.get("company"), email: form.get("email"), phone: form.get("phone"), message: form.get("message"), website: form.get("website"), consent: form.get("consent") === "on" }) }).catch(() => null);
    if (response?.ok) { setState("success"); event.currentTarget.reset(); } else setState("error");
  }
  if (state === "success") return <div className="surface-card flex items-start gap-4 p-7" role="status"><CheckCircle2 className="h-7 w-7 shrink-0 text-green-700" /><p className="font-bold">{dict.common.success}</p></div>;
  return <form onSubmit={submit} className="surface-card grid gap-5 p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><Field name="name" label={labels.name} required /><Field name="company" label={labels.company} /><Field name="email" label={labels.email} type="email" required /><Field name="phone" label={labels.phone} type="tel" /></div><label className="grid gap-2 text-sm font-bold">{labels.message}<textarea name="message" required minLength={5} rows={6} className="border border-zinc-300 p-3 font-normal" /></label><label className="flex items-start gap-3 text-sm text-zinc-600"><input name="consent" required type="checkbox" className="mt-1 h-4 w-4 accent-primary" /><span>{labels.consent}</span></label><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />{state === "error" && <p className="text-sm font-bold text-red-700" role="alert">{dict.common.error}</p>}<button disabled={state === "sending"} className="button-primary justify-self-start">{state === "sending" ? <><LoaderCircle className="h-4 w-4 animate-spin" />{dict.common.sending}</> : dict.common.submit}</button></form>;
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) { return <label className="grid gap-2 text-sm font-bold">{label}<input name={name} type={type} required={required} className="h-12 border border-zinc-300 px-3 font-normal" /></label>; }
