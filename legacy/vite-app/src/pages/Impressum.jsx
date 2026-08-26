import React from "react";
import LegalPage from "@/components/LegalPage";
import { Link } from "react-router-dom";

export default function Impressum() {
  return (
    <LegalPage title="Impressum" updatedAt="Juli 2026">
      <p>
        Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV (Medienstaatsvertrag).
      </p>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Diensteanbieter</h2>
        <p>
          Baltes Container GmbH [VERIFY]<br />
          Im Wiesengrund 43<br />
          66787 Wadgassen<br />
          Deutschland
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Vertretungsberechtigte Personen</h2>
        <p>Geschäftsführer: [Name eintragen — VERIFY]</p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Kontakt</h2>
        <p>
          Telefon: <a href="tel:+491635393159" className="text-primary hover:underline">+49 163 5393159</a><br />
          E-Mail: <a href="mailto:contact@baltescontainer.com" className="text-primary hover:underline">contact@baltescontainer.com</a><br />
          Web: www.baltescontainer.com
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Registereintrag</h2>
        <p>
          Eintragung im Handelsregister [VERIFY]<br />
          Registergericht: Amtsgericht [VERIFY]<br />
          Registernummer: HRB [VERIFY]
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
          DE137858974 [VERIFY]
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
          oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
          Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Haftung für Links</h2>
        <p>
          Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-3">Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung,
          Verarbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </section>

      <p className="text-sm text-muted-foreground pt-4">
        Weitere rechtliche Hinweise finden Sie in unserer{" "}
        <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>, in unseren{" "}
        <Link to="/agb" className="text-primary hover:underline">AGB</Link> und in der{" "}
        <Link to="/widerruf" className="text-primary hover:underline">Widerrufsbelehrung</Link>.
      </p>
    </LegalPage>
  );
}