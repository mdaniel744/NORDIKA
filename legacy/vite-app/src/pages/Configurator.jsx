import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";

const PURPOSES = ["Lagerung", "Büro", "Sanitär", "Werkstatt", "Kühlung", "Veranstaltung", "Unterkunft", "Industrie", "Sonstige"];
const BASE_SIZES = ["10 ft", "20 ft", "40 ft", "Unsicher"];
const BASE_TYPES = ["Standard", "High Cube", "Neu", "Gebraucht"];
const MODS = [
  "Personaltür", "Rolltor", "Fenster", "Isolierung", "Elektrik",
  "Beleuchtung", "Heizung", "Klimaanlage", "Regale", "Trennwand",
  "Sanitär", "Kühlung", "RAL-Farbgebung", "Branding", "Sonstige",
];

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    customer_type: "Privatkunde",
    company: "", name: "", email: "", phone: "", vat_number: "",
    purpose: "Lagerung",
    base_size: "20 ft",
    base_type: "Standard",
    modifications: [],
    delivery_postcode: "", delivery_city: "", delivery_country: "Deutschland",
    preferred_date: "", crane_required: false, ground_prepared: false,
    message: "",
  });

  const set = (key, val) => setData({ ...data, [key]: val });

  const toggleMod = (mod) => {
    const mods = data.modifications.includes(mod)
      ? data.modifications.filter((m) => m !== mod)
      : [...data.modifications, mod];
    set("modifications", mods);
  };

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setSubmitting(true);
    try {
      await base44.entities.QuoteRequest.create(data);
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-success text-success-foreground mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-extrabold mb-4">Anfrage eingegangen</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Vielen Dank für Ihre Anfrage. Unser Team meldet sich innerhalb von 24 Stunden bei Ihnen mit einem individuellen Angebot.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-primary mb-3">Konfigurator</div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">Angebot anfordern</h1>
          <p className="mt-3 text-muted-foreground">
            Konfigurieren Sie Ihren Wunsch-Container in wenigen Schritten. Wir erstellen Ihnen ein individuelles Festpreisangebot.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="flex items-center mb-12">
          {[1, 2, 3, 4, 5].map((s, i) => (
            <React.Fragment key={s}>
              <button
                onClick={() => s < step && setStep(s)}
                className={`flex items-center justify-center w-10 h-10 shrink-0 border-2 font-mono-tech font-bold text-sm transition-colors ${
                  step >= s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
                } ${s < step ? "cursor-pointer" : "cursor-default"}`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </button>
              {i < 4 && <div className={`flex-1 h-0.5 mx-2 ${step > s ? "bg-primary" : "bg-border"}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1 — Purpose */}
        {step === 1 && (
          <StepShell title="Wofür wird der Container eingesetzt?" desc="Wählen Sie den Einsatzzweck. So können wir die passende Lösung empfehlen.">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PURPOSES.map((p) => (
                <ChoiceButton key={p} label={p} active={data.purpose === p} onClick={() => set("purpose", p)} />
              ))}
            </div>
          </StepShell>
        )}

        {/* Step 2 — Base container */}
        {step === 2 && (
          <StepShell title="Welcher Basiscontainer?" desc="Größe und Ausführung des Ausgangscontainers.">
            <div className="mb-6">
              <Label>Größe</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BASE_SIZES.map((s) => (
                  <ChoiceButton key={s} label={s} active={data.base_size === s} onClick={() => set("base_size", s)} />
                ))}
              </div>
            </div>
            <Label>Ausführung</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BASE_TYPES.map((t) => (
                <ChoiceButton key={t} label={t} active={data.base_type === t} onClick={() => set("base_type", t)} />
              ))}
            </div>
          </StepShell>
        )}

        {/* Step 3 — Modifications */}
        {step === 3 && (
          <StepShell title="Welche Umbauten sind gewünscht?" desc="Wählen Sie alle gewünschten Modifikationen. Mehrfachauswahl möglich.">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MODS.map((m) => (
                <button
                  key={m}
                  onClick={() => toggleMod(m)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border transition-colors text-left ${
                    data.modifications.includes(m)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  <div className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 ${data.modifications.includes(m) ? "border-primary bg-primary" : "border-border"}`}>
                    {data.modifications.includes(m) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  {m}
                </button>
              ))}
            </div>
          </StepShell>
        )}

        {/* Step 4 — Delivery */}
        {step === 4 && (
          <StepShell title="Lieferdetails" desc="Wo und wann soll der Container geliefert werden?">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Postleitzahl" value={data.delivery_postcode} onChange={(v) => set("delivery_postcode", v)} placeholder="z. B. 66787" />
              <Field label="Stadt" value={data.delivery_city} onChange={(v) => set("delivery_city", v)} placeholder="z. B. Wadgassen" />
              <Field label="Land" value={data.delivery_country} onChange={(v) => set("delivery_country", v)} />
              <Field label="Wunschtermin" value={data.preferred_date} onChange={(v) => set("preferred_date", v)} type="date" />
            </div>
            <div className="mt-4 space-y-3">
              <Toggle label="Kran für Aufstellung erforderlich" checked={data.crane_required} onChange={() => set("crane_required", !data.crane_required)} />
              <Toggle label="Untergrund ist vorbereitet (eben, tragfähig)" checked={data.ground_prepared} onChange={() => set("ground_prepared", !data.ground_prepared)} />
            </div>
            <div className="mt-4">
              <Label>Zusätzliche Informationen / Zugangssituation</Label>
              <textarea
                value={data.message}
                onChange={(e) => set("message", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="z. B. enge Zufahrt, abweichende Farbgebung, besondere Anforderungen..."
              />
            </div>
          </StepShell>
        )}

        {/* Step 5 — Contact */}
        {step === 5 && (
          <StepShell title="Ihre Kontaktdaten" desc="Wir melden uns mit einem individuellen Angebot.">
            <div className="mb-4">
              <Label>Kundentyp</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Privatkunde", "Geschäftskunde", "Behörde", "Sonstige"].map((c) => (
                  <ChoiceButton key={c} label={c} active={data.customer_type === c} onClick={() => set("customer_type", c)} />
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.customer_type === "Geschäftskunde" && (
                <Field label="Firma" value={data.company} onChange={(v) => set("company", v)} />
              )}
              {data.customer_type === "Geschäftskunde" && (
                <Field label="USt-IdNr." value={data.vat_number} onChange={(v) => set("vat_number", v)} />
              )}
              <Field label="Name" value={data.name} onChange={(v) => set("name", v)} placeholder="Vor- und Nachname" required />
              <Field label="E-Mail" value={data.email} onChange={(v) => set("email", v)} placeholder="ihre@email.de" required type="email" />
              <Field label="Telefon" value={data.phone} onChange={(v) => set("phone", v)} placeholder="+49..." />
            </div>
            <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-1 w-4 h-4 accent-[hsl(var(--primary))]" />
              <span>Ich habe die <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Daten zu.</span>
            </label>
          </StepShell>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {step > 1 ? (
            <button onClick={prev} className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
          ) : <span />}
          {step < 5 ? (
            <button onClick={next} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
              Weiter <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={submit} disabled={submitting} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
              {submitting ? "Wird gesendet..." : "Angebot anfordern"} <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepShell({ title, desc, children }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-extrabold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{desc}</p>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-3">{children}</div>;
}

function ChoiceButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-medium border transition-colors text-center ${
        active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <div>
      <label className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button onClick={onChange} className="flex items-center gap-3 text-sm text-foreground">
      <div className={`relative w-11 h-6 border-2 transition-colors ${checked ? "border-primary bg-primary/20" : "border-border"}`}>
        <div className={`absolute top-0.5 w-4 h-4 transition-transform ${checked ? "left-5 bg-primary" : "left-0.5 bg-muted-foreground"}`} />
      </div>
      {label}
    </button>
  );
}