import React from "react";
import LegalPage from "@/components/LegalPage";
import { Link } from "react-router-dom";

export default function AGB() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen (AGB)" updatedAt="Juli 2026"
      intro="Die nachstehenden Bedingungen gelten für alle Lieferungen und Leistungen der Baltes Container GmbH. Abweichende, entgegenstehende oder ergänzende AGB werden nicht Vertragsbestandteil, es sei denn, wir stimmen ihnen ausdrücklich schriftlich zu."
    >
      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über den Verkauf und die
          Lieferung von Containern sowie über Containerumbauten zwischen der Baltes Container GmbH
          (nachfolgend „Verkäufer") und dem Kunden (nachfolgend „Käufer"). Sie gelten ausschließlich;
          entgegenstehende Bedingungen des Käufers werden nicht anerkannt.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 2 Vertragsschluss</h2>
        <p>
          Unsere Angebote im Online-Shop sind freibleibend. Ein Kaufvertrag kommt zustande, sobald der
          Käufer eine Bestellung absendet und wir diese durch Auftragsbestätigung annehmen. Bei
          individuellen Anfragen über den Angebots-Konfigurator handelt es sich um eine Anfrage zur
          Abgabe eines Angebots. Der Vertragsschluss erfolgt erst mit Zugang unserer schriftlichen
          Auftragsbestätigung.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 3 Preise und Zahlungsbedingungen</h2>
        <p>
          Alle Preise verstehen sich inklusive der gesetzlichen Umsatzsteuer (sofern ausgewiesen) bzw.
          als Nettopreise für gewerbliche Abnehmer mit gültiger USt-IdNr. Versand- und
          Lieferkosten werden gesondert ausgewiesen und sind im angegebenen Liefergebiet (Deutschland)
          enthalten.
        </p>
        <p className="mt-2">
          Die Zahlung erfolgt nach Vereinbarung. Nähere Informationen zu den akzeptierten Zahlungsarten
          finden Sie auf der Seite <Link to="/zahlungsarten" className="text-primary hover:underline">Zahlungsarten</Link>.
          Für Geschäftskunden gilt ein Zahlungsziel von 14 Tagen nach Rechnungsstellung ohne Abzug,
          sofern nichts anderes vereinbart wurde.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 4 Lieferung, Versand und Aufstellung</h2>
        <p>
          Die Lieferung erfolgt im Rahmen unserer Liefergebiete. Die Aufstellung des Containers setzt
          einen befestigten, ebenen und für Schwerlastverkehr befahrbaren Untergrund voraus. Der Käufer
          hat sicherzustellen, dass der Anlieferungsort zugänglich ist. Die Details zu Lieferung und
          Aufstellung sind auf der Seite <Link to="/lieferung-aufstellung" className="text-primary hover:underline">Lieferung &amp; Aufstellung</Link> beschrieben.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 5 Gefahrübergang</h2>
        <p>
          Bei Verbrauchern geht die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung
          der Ware mit der Übergabe über. Bei Unternehmern geht die Gefahr bereits mit der Übergabe an
          den Spediteur oder Frachtführer über.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 6 Zustand und Eigenschaften der Container</h2>
        <p>
          Container werden in verschiedenen Zustandsklassen angeboten (Neu, One-Trip, Gebraucht mit den
          Güteklassen WWT, CW, IICL). Die vereinbarte Zustandsklasse ergibt sich aus der Artikelbeschreibung.
          Gebrauchte Container weisen gebrauchsbedingte Gebrauchsspuren auf, die den vereinbarten
          Verwendungszweck nicht einschränken. Technische Maße können branchenübliche Toleranzen aufweisen.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 7 Gewährleistung</h2>
        <p>
          Es gelten die gesetzlichen Gewährleistungsbestimmungen. Bei gebrauchten Waren ist die
          Verjährungsfrist für Mängelansprüche auf ein Jahr ab Ablieferung begrenzt, soweit es sich um
          einen Unternehmer als Käufer handelt. Weitergehende Schadensersatzansprüche bleiben unberührt.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 8 Eigentumsvorbehalt</h2>
        <p>
          Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum (Vorbehaltsware). Bei
          vertragswidrigem Verhalten des Käufers sind wir berechtigt, die Vorbehaltsware
          herauszuverlangen.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 9 Haftung</h2>
        <p>
          Für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer
          fahrlässigen Pflichtverletzung des Verkäufers oder einer vorsätzlichen oder fahrlässigen
          Pflichtverletzung eines gesetzlichen Vertreters oder Erfüllungsgehilfen beruhen, haftet der
          Verkäufer uneingeschränkt. Im Übrigen haftet der Verkäufer nur bei Vorsatz und grober
          Fahrlässigkeit sowie bei der Verletzung wesentlicher Vertragspflichten.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">§ 10 Schlussbestimmungen</h2>
        <p>
          Es gilt deutsches Recht. Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
          ein öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand der Sitz des
          Verkäufers. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen
          Bestimmungen hiervon unberührt.
        </p>
      </section>

      <p className="text-sm text-muted-foreground pt-4">
        Informationen zum Widerrufsrecht finden Sie in der{" "}
        <Link to="/widerruf" className="text-primary hover:underline">Widerrufsbelehrung</Link>.
      </p>
    </LegalPage>
  );
}