import React from "react";
import LegalPage from "@/components/LegalPage";
import { Banknote, Building2, FileText, ShieldCheck } from "lucide-react";

const METHODS = [
  {
    icon: Banknote,
    title: "Vorkasse / Überweisung",
    description: "Nach Auftragsbestätigung erhalten Sie eine Rechnung mit unseren Bankverbindungen. Die Ware wird nach Zahlungseingang versendet.",
    detail: "Zahlungsziel: 7 Werktage nach Rechnungsstellung",
  },
  {
    icon: Building2,
    title: "Kauf auf Rechnung (Geschäftskunden)",
    description: "Für gewerbliche Kunden mit gültiger USt-IdNr. und erfolgter Bonitätsprüfung bieten wir den Kauf auf Rechnung an.",
    detail: "Zahlungsziel: 14 Tage nach Lieferung ohne Abzug",
  },
  {
    icon: FileText,
    title: "Anzahlung bei Sonderanfertigungen",
    description: "Bei individuellen Containerumbauten und Sonderanfertigungen wird eine Anzahlung in Höhe von 50 % des Auftragswerts vor Produktionsbeginn fällig.",
    detail: "Restbetrag: vor Lieferung fällig",
  },
];

export default function Zahlungsarten() {
  return (
    <LegalPage title="Zahlungsarten" updatedAt="Juli 2026"
      intro="Wir bieten Ihnen verschiedene bequeme und sichere Zahlungsmöglichkeiten. Welche Zahlungsart für Sie verfügbar ist, hängt von der Art der Bestellung und Ihrem Kundenstatus ab."
    >
      <div className="space-y-6">
        {METHODS.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.title} className="flex gap-4 p-5 border border-border bg-card">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                <p className="text-xs font-mono-tech text-primary mt-2">{m.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Sicherheit Ihrer Zahlungsdaten</h2>
        <p>
          Beim Bezahlvorgang werden Ihre Daten ausschließlich über verschlüsselte Verbindungen (SSL/TLS)
          übertragen. Wir speichern keine Bank- oder Kreditkartendaten auf unseren Servern. Die
          Verarbeitung erfolgt durch die jeweils beauftragten Zahlungsdienstleister, die den geltenden
          Sicherheitsstandards (PCI-DSS) entsprechen.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Bankverbindung</h2>
        <p>
          Baltes Container GmbH [VERIFY]<br />
          IBAN: DE__ ____ ____ ____ ____ __ [VERIFY]<br />
          BIC/SWIFT: ________ [VERIFY]<br />
          Geldinstitut: [VERIFY]
        </p>
      </section>

      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
        <ShieldCheck className="w-4 h-4 text-success" />
        Alle Transaktionen sind verschlüsselt und DSGVO-konform.
      </div>
    </LegalPage>
  );
}