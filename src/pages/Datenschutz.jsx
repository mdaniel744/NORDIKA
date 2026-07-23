import React from "react";
import LegalPage from "@/components/LegalPage";
import { Link } from "react-router-dom";

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung" updatedAt="Juli 2026"
      intro="Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre personenbezogenen Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG, DDG)."
    >
      <section>
        <h2 className="font-heading text-xl font-bold mb-3">1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:
        </p>
        <p className="mt-2">
          Baltes Container GmbH [VERIFY]<br />
          Im Wiesengrund 43<br />
          66787 Wadgassen, Deutschland<br />
          Telefon: +49 163 5393159<br />
          E-Mail: contact@baltescontainer.com
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">2. Datenschutzbeauftragter</h2>
        <p>
          [Sofern bestellt: Name und Kontaktdaten des Datenschutzbeauftragten eintragen — VERIFY.]
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">3. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>
          Beim Besuch unserer Website werden automatisch Informationen an unseren Server gesandt
          (Logfiles). Dies sind insb.:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Browsertyp und verwendete Version</li>
          <li>Betriebssystem des Nutzers</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>IP-Adresse (gekürzt / anonymisiert)</li>
          <li>Webseite, von der aus der Zugriff erfolgt (Referrer-URL)</li>
        </ul>
        <p className="mt-3">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Speicherdauer: 7 Tage
          zur Gewährleistung der IT-Sicherheit, danach automatische Löschung.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">4. Kontaktaufnahme</h2>
        <p>
          Wenn Sie uns per Kontaktformular, E-Mail, Telefon oder über unseren Anfrage-Konfigurator
          kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage und für den Fall von
          Anschlussfragen gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Vorvertrag)
          bzw. Art. 6 Abs. 1 lit. f DSGVO. Diese Daten löschen wir nach Erledigung der Anfrage, sofern
          keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">5. Bestands- und Kundendaten</h2>
        <p>
          Bei Vertragsabschluss erheben wir Ihre Name, Adresse, ggf. Firmen- und USt-IdNr.,
          Kontaktdaten sowie Zahlungsangaben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und c DSGVO.
          Die Daten werden zur Vertragsabwicklung (Lieferung und Aufstellung von Containern) verwendet
          und nach Ablauf gesetzlicher Aufbewahrungsfristen (i. d. R. 10 Jahre) gelöscht.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">6. Cookies</h2>
        <p>
          Unsere Website verwendet technisch notwendige Cookies, die für den Betrieb der Seite
          erforderlich sind. Diese werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt und
          erfordern keine Einwilligung. Analyse- oder Marketing-Cookies setzen wir nur nach
          entsprechender Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) ein.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">7. Ihre Rechte als betroffene Person</h2>
        <p>Sie haben das Recht auf:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p className="mt-3">
          Zudem haben Sie das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">8. Weitergabe von Daten</h2>
        <p>
          Eine Übermittlung Ihrer persönlichen Daten an Dritte erfolgt nur, wenn dies für die
          Vertragsabwicklung erforderlich ist (z. B. an Spediteure und Logistikpartner zur Lieferung und
          Aufstellung der Container) oder wenn Sie eingewilligt haben. Unsere Spediteure verwenden die
          übermittelten Daten ausschließlich zur Abwicklung der Lieferung.
        </p>
      </section>

      <p className="text-sm text-muted-foreground pt-4">
        Siehe auch unser <Link to="/impressum" className="text-primary hover:underline">Impressum</Link> und unsere{" "}
        <Link to="/agb" className="text-primary hover:underline">AGB</Link>.
      </p>
    </LegalPage>
  );
}