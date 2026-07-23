import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const LOCATIONS = [
  { name: "Wadgassen (Hauptsitz)", address: "Im Wiesengrund 43, 66787 Wadgassen", role: "Hauptsitz & Depot" },
  { name: "Karlshagen", address: "Peenestraße 37, 17449 Karlshagen", role: "Depot & Abholstelle" },
  { name: "Warschau", address: "Dowcip 4, 00-051 Warszawa, Polen", role: "Depot" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Allgemeine Anfrage", message: "" });
  const set = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-terminal mx-auto px-6 py-12">
          <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-primary mb-3">Kontakt</div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">Kontaktieren Sie uns</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Wir beraten Sie persönlich – telefonisch, per E-Mail oder über unser Kontaktformular.
          </p>
        </div>
      </div>

      <div className="max-w-terminal mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <SectionHeading eyebrow="Direkter Kontakt" title="So erreichen Sie uns" />
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold mb-1">Telefon</h3>
                  <a href="tel:+491635393159" className="text-muted-foreground hover:text-primary transition-colors">+49 163 5393159</a><br />
                  <a href="tel:+48500667974" className="text-muted-foreground hover:text-primary transition-colors">+48 500 667 974</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold mb-1">E-Mail</h3>
                  <a href="mailto:contact@baltescontainer.com" className="text-muted-foreground hover:text-primary transition-colors">contact@baltescontainer.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold mb-1">Öffnungszeiten</h3>
                  <p className="text-muted-foreground">Montag–Freitag, 09:00–19:00 Uhr [VERIFY]</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-heading font-bold mb-4">Standorte</h3>
              <div className="space-y-4">
                {LOCATIONS.map((loc) => (
                  <div key={loc.name} className="flex items-start gap-3 p-4 border border-border bg-card">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{loc.name}</div>
                      <div className="text-sm text-muted-foreground">{loc.address}</div>
                      <div className="font-mono-tech text-xs text-primary mt-1">{loc.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {sent ? (
              <div className="border border-border bg-card p-10 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-success text-success-foreground mb-5">
                  <Check className="w-7 h-7" />
                </div>
                <h2 className="font-heading text-2xl font-extrabold mb-2">Nachricht gesendet</h2>
                <p className="text-muted-foreground">Vielen Dank. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="border border-border bg-card p-8 space-y-5">
                <h2 className="font-heading text-xl font-extrabold">Nachricht senden</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Name" value={form.name} onChange={(v) => set("name", v)} required />
                  <Input label="E-Mail" value={form.email} onChange={(v) => set("email", v)} type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Telefon" value={form.phone} onChange={(v) => set("phone", v)} />
                  <div>
                    <label className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">Betreff</label>
                    <select value={form.subject} onChange={(e) => set("subject", e.target.value)} className="w-full px-4 py-3 bg-input border border-border text-sm text-foreground">
                      <option>Allgemeine Anfrage</option>
                      <option>Container kaufen</option>
                      <option>Umbau / Angebot</option>
                      <option>Lieferung</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">Nachricht</label>
                  <textarea value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} required className="w-full px-4 py-3 bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground" placeholder="Wie können wir Ihnen helfen?" />
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" required className="mt-1 w-4 h-4 accent-[hsl(var(--primary))]" />
                  <span>Ich habe die Datenschutzerklärung gelesen und stimme zu.</span>
                </label>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
                  <Send className="w-5 h-5" /> Nachricht senden
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full px-4 py-3 bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary" />
    </div>
  );
}