import React from "react";
import LegalPage from "@/components/LegalPage";
import { Link } from "react-router-dom";

export default function Widerruf() {
  return (
    <LegalPage title="Widerrufsbelehrung" updatedAt="Juli 2026">
      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Widerrufsrecht für Verbraucher</h2>
        <p>
          Sie haben das Recht, diesen Vertrag innerhalb von vierzehn Tagen ohne Angabe von Gründen zu
          widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen
          benannter Dritter, der nicht der Beförderer ist, die Ware in Besitz genommen hat.
        </p>
        <p className="mt-3">
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
        </p>
        <p className="mt-2">
          Baltes Container GmbH [VERIFY]<br />
          Im Wiesengrund 43<br />
          66787 Wadgassen, Deutschland<br />
          Telefon: +49 163 5393159<br />
          E-Mail: contact@baltescontainer.com
        </p>
        <p className="mt-3">
          mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief, Telefax oder
          E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das
          beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Folgen des Widerrufs</h2>
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
          haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus
          ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste
          Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
          zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen
          ist.
        </p>
        <p className="mt-3">
          Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
          Transaktion eingesetzt haben. Wir können die Rückzahlung verweigern, bis wir die Ware wieder
          zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Ware
          zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
        </p>
        <p className="mt-3">
          Sie haben die Ware unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag,
          an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu
          übergeben. Die Frist ist gewahrt, wenn Sie die Ware vor Ablauf der Frist von vierzehn Tagen
          absenden.
        </p>
        <p className="mt-3">
          Sie tragen die unmittelbaren Kosten der Rücksendung der Ware. Bei sperrigen Waren
          (Containern) können die Rücksendekosten erheblich sein; wir informieren Sie vorab über die
          voraussichtlichen Kosten.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Ausnahmen vom Widerrufsrecht</h2>
        <p>
          Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt
          sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher
          maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten
          sind. Dies betrifft insbesondere individuell angefertigte Containerumbauten und Sonderanfertigungen.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Muster-Widerrufsformular</h2>
        <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
        <div className="mt-3 p-4 bg-secondary text-sm space-y-3">
          <p>An: Baltes Container GmbH, Im Wiesengrund 43, 66787 Wadgassen, contact@baltescontainer.com</p>
          <p>— Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)</p>
          <p>— Bestellt am (*)/erhalten am (*)</p>
          <p>— Name des/der Verbraucher(s)</p>
          <p>— Anschrift des/der Verbraucher(s)</p>
          <p>— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
          <p>— Datum</p>
          <p className="text-xs text-muted-foreground">(*) Unzutreffendes streichen.</p>
        </div>
      </section>

      <p className="text-sm text-muted-foreground pt-4">
        Weitere rechtliche Hinweise: <Link to="/agb" className="text-primary hover:underline">AGB</Link>,{" "}
        <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>.
      </p>
    </LegalPage>
  );
}