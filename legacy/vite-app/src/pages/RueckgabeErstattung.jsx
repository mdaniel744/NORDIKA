import React from "react";
import LegalPage from "@/components/LegalPage";
import { ShieldCheck, Truck, RefreshCw, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function RueckgabeErstattung() {
  return (
    <LegalPage title="Rückgabe- und Rückerstattungsrichtlinie" updatedAt="Juli 2026"
      intro="Bei Baltes Container stehen wir für die Qualität unserer Versandbehälter ein. Unsere Rückgabe- und Rückerstattungsrichtlinien bieten Ihnen Klarheit und Sicherheit im unwahrscheinlichen Fall, dass Sie mit Ihrem Kauf Probleme haben."
    >
      <div className="flex items-center gap-3 p-4 bg-secondary border-l-4 border-primary">
        <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm font-medium">Sicherstellung Ihrer Zufriedenstellung</p>
      </div>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Rückgabe- und Erstattungsbedingungen</h2>
        <p>
          Wir akzeptieren keine Rücksendungen oder Umtausch, es sei denn, der von Ihnen gekaufte Artikel
          ist defekt oder entspricht nicht der Beschreibung beim Kauf. Sollten Sie einen defekten Artikel
          erhalten, kontaktieren Sie uns bitte unter der unten stehenden Telefonnummer oder E-Mail-Adresse
          und geben Sie Einzelheiten zum Produkt und dem Defekt an.
        </p>
        <p className="mt-3">
          Sollten Sie ein Produkt erhalten, das nicht der beim Kauf angegebenen Beschreibung entspricht,
          kontaktieren Sie uns bitte so schnell wie möglich. Wir informieren Sie dann über die
          Rückgabebedingungen.
        </p>
        <p className="mt-3">
          Sie tragen die Versandkosten für die Rücksendung Ihres Artikels. Wir haften nicht für Verluste
          oder Schäden, die während des Transports entstehen. Sie müssen außerdem die Versand- und
          Versicherungskosten (falls zutreffend) für alle Rücksendungen tragen. Wenn für Ihre Rücksendung
          eine Rückerstattung in Frage kommt, erhalten Sie nur den Nettopreis des Artikels. Ihre
          Rückerstattung umfasst keine Versand- und Bearbeitungsgebühren, die möglicherweise auf dem
          Lieferschein oder der Rechnung aufgeführt sind.
        </p>
        <p className="mt-3">
          Nach Erhalt des zurückgesendeten Produkts prüfen wir es und benachrichtigen Sie innerhalb einer
          angemessenen Frist per E-Mail, ob Sie aufgrund des Defekts Anspruch auf eine Rückerstattung oder
          einen Umtausch haben. Wenn Sie Anspruch auf Umtausch oder Rückerstattung haben, ersetzen wir das
          Produkt oder erstatten Ihnen den Kaufpreis (je nach ursprünglicher Zahlungsmethode). Bereits
          gezahlte Versand- und Bearbeitungsgebühren werden nicht erstattet. Die Versandkosten sind nicht
          in den erstatteten Beträgen enthalten. Es kann bis zu 14 Werktage nach Erhalt unserer E-Mail
          dauern, bis die Rückerstattung auf Ihrer Rechnung erscheint.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Defekte und nicht defekte Produkte</h2>
        <p>
          Kunden können sowohl defekte als auch nicht defekte Produkte zurückgeben. Nicht defekte Produkte
          werden nur dann zurückerstattet, wenn der Artikel nicht der Beschreibung entspricht (z. B.
          falsche Größe, Typ oder Spezifikation).
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Rückgabe nicht defekter Artikel</h2>
        <p>
          Wir akzeptieren Rücksendungen von Artikeln im Lieferzustand. Sie können nicht defekte Artikel
          im Originalzustand innerhalb von 30 Tagen nach dem Kauf mit einem Kassenbon oder Kaufbeleg
          zurückgeben. Bitte beachten Sie: Nach Ablauf von 30 Tagen seit Ihrem Kauf können wir Ihnen
          keine Rückerstattung oder Umtausch anbieten.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Umtausch</h2>
        <p>
          Wir ersetzen defekte oder beschädigte Waren sowie mangelfreie Waren, die nicht der Beschreibung
          entsprechen. Sollten Sie der Meinung sein, dass ein Produkt defekt ist oder von Ihrer Bestellung
          abweicht, kontaktieren Sie uns bitte innerhalb von 30 Tagen nach Ihrem Kauf unter der unten
          angegebenen Telefonnummer oder E-Mail-Adresse und geben Sie Einzelheiten zum Produkt und dem
          Defekt an. Wir informieren Sie dann über die Rückgabebedingungen.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Ausnahmen – Versand</h2>
        <div className="flex gap-3 mb-3">
          <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p>
            Sie tragen die Versandkosten für die Rücksendung Ihres Artikels. Wir haften nicht für
            Verluste oder Schäden, die während des Transports entstehen. Sie tragen außerdem die
            Versand- und Versicherungskosten (falls zutreffend) für alle Rücksendungen. Wenn Ihre
            Rücksendung erstattungsfähig ist, enthält Ihre Rückerstattung keine Versand- und
            Bearbeitungsgebühren, die möglicherweise auf dem Lieferschein oder der Rechnung aufgeführt
            sind.
          </p>
        </div>
        <p>
          Um den gekauften Artikel zurückzugeben oder umzutauschen, senden Sie ihn bitte zusammen mit
          einer Kopie Ihres Kassenbons und weiteren Informationen zu Ihrem Kauf an die unten stehende
          Adresse:
        </p>
        <div className="mt-4 p-5 bg-secondary border border-border text-sm">
          <p className="font-bold mb-2">Baltes Container GmbH</p>
          <p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />Im Wiesengrund 43, 66787 Wadgassen, Deutschland</p>
          <p className="flex items-center gap-2 mt-1.5"><Phone className="w-4 h-4 text-primary shrink-0" /><a href="tel:+491635393159" className="hover:text-primary hover:underline">+49 163 5393159</a></p>
          <p className="flex items-center gap-2 mt-1.5"><Mail className="w-4 h-4 text-primary shrink-0" /><a href="mailto:contact@baltescontainer.com" className="hover:text-primary hover:underline">contact@baltescontainer.com</a></p>
        </div>
      </section>

      <section>
        <div className="flex gap-3 mb-3">
          <RefreshCw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <h2 className="font-heading text-xl font-bold">Verfahren</h2>
        </div>
        <p>
          Nach Erhalt Ihres Artikels prüfen wir ihn und teilen Ihnen innerhalb einer angemessenen Frist
          per E-Mail mit, ob Sie Anspruch auf eine Rückerstattung oder einen Umtausch haben.
        </p>
        <p className="mt-3">
          Wenn Sie Anspruch auf eine Rückerstattung haben, erstatten wir Ihnen den Kaufpreis und
          schreiben den Betrag Ihrer ursprünglichen Zahlungsmethode gut. Bereits gezahlte Versand- und
          Bearbeitungsgebühren werden nicht erstattet. Versandkosten sind nicht in den erstatteten
          Beträgen enthalten. Es kann bis zu 14 Werktage ab Erhalt unserer E-Mail dauern, bis die
          Rückerstattung auf Ihrer Abrechnung erscheint.
        </p>
        <p className="mt-3">
          Wenn Sie Anspruch auf einen Umtausch haben, senden wir Ihnen einen neuen Artikel an die
          ursprüngliche Lieferadresse.
        </p>
      </section>

      <p className="text-sm text-muted-foreground pt-4">
        Siehe auch unsere <Link to="/widerruf" className="text-primary hover:underline">Widerrufsbelehrung</Link>,{" "}
        <Link to="/agb" className="text-primary hover:underline">AGB</Link> und{" "}
        <Link to="/lieferung-aufstellung" className="text-primary hover:underline">Lieferung &amp; Aufstellung</Link>.
      </p>
    </LegalPage>
  );
}