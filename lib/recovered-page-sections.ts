import type { Locale } from "@/lib/i18n";
import { DELIVERY_POLICY } from "@/lib/policy-config";
import type { RouteKey } from "@/lib/routes";

type Section = { title: string; paragraphs: string[]; bullets?: string[] };
type RecoveredKey = "about" | "delivery" | "conditions" | "conversions" | "faq";

export const recoveredPageSections: Record<Locale, Partial<Record<RouteKey, Section[]>>> = {
  de: {
    about: [
      { title: "NORDIKA Container GmbH", paragraphs: ["Wir unterstützen Unternehmen, öffentliche Auftraggeber und Privatkunden bei der Auswahl neuer und gebrauchter Container – von der Anfrage bis zur abgestimmten Lieferung."] },
      { title: "Passend statt pauschal", paragraphs: ["Größe, Zustandsklasse, Ausstattung, geplanter Einsatz und Budget werden gemeinsam betrachtet. Produktdaten und erkennbare Gebrauchsspuren sollen vor der Entscheidung nachvollziehbar sein."], bullets: ["Neue, One-Trip- und gebrauchte Container", "Standard-, High-Cube- und Spezialtypen", "Umbauten nach technischer Prüfung", "Projektbezogene Lieferplanung"] },
      { title: "Zentral aus Mainz", paragraphs: ["Beratung, Angebote und Projektabwicklung werden von unserer Unternehmensadresse in der Nikolaus-Otto-Str. 9, D-55129 Mainz koordiniert. Maßgeblich sind das konkrete Produkt und die schriftliche Bestätigung."] },
    ],
    delivery: [
      { title: "Vor Veröffentlichung zu bestätigen", paragraphs: ["Im bestehenden Projekt sind noch keine freigegebenen Lieferzeitspannen hinterlegt. Die folgenden deutlich gekennzeichneten Werte müssen von NORDIKA Container bestätigt und vor dem produktiven Einsatz sowie in Google Merchant Center identisch eingetragen werden."], bullets: [`Deutschland – Bearbeitungszeit: ${DELIVERY_POLICY.germany.handling} Werktage`, `Deutschland – Transportzeit: ${DELIVERY_POLICY.germany.transit} Werktage`, `Deutschland – geschätzte Gesamtdauer: ${DELIVERY_POLICY.germany.total} Werktage`, `Andere EU-Länder – Bearbeitungszeit: ${DELIVERY_POLICY.eu.handling} Werktage`, `Andere EU-Länder – Transportzeit: ${DELIVERY_POLICY.eu.transit} Werktage`, `Andere EU-Länder – geschätzte Gesamtdauer: ${DELIVERY_POLICY.eu.total} Werktage`] },
      { title: "Liefergebiete", paragraphs: [`Wir liefern Container innerhalb Deutschlands und nach vorheriger Routen- und Frachtprüfung in alle Mitgliedstaaten der Europäischen Union: ${DELIVERY_POLICY.supportedCountries}. Die konkrete Transportmöglichkeit wird anhand des Ziellandes, der Route, des Containers und der verfügbaren Transportmöglichkeiten vor Vertragsschluss bestätigt.`] },
      { title: "So läuft die Lieferung ab", paragraphs: ["Sie bestellen den Container oder nehmen unser Angebot an. Nach Bestätigung der vereinbarten Zahlungsvoraussetzungen bereiten wir den Container vor, planen den Spezialtransport und teilen Ihnen die abgestimmten Lieferinformationen mit. Die Lieferung erfolgt an die bestätigte Adresse. Bitte prüfen Sie den Container während Anlieferung und Entladung."], bullets: ["Auftrag oder Angebot wird schriftlich bestätigt", "Container wird entsprechend der vereinbarten Ausführung vorbereitet", "Transport und Entladeart werden terminiert", "Lieferinformationen werden vor der Anfahrt abgestimmt", "Übergabe und Sichtprüfung erfolgen am Lieferort"] },
      { title: "Transport, Entladung und Kran", paragraphs: ["Container sind große und mehrere Tonnen schwere Industriegüter. Die Anlieferung erfolgt deshalb in der Regel mit einem geeigneten Lkw oder Containertransport. Eine Kranentladung ist nur enthalten, wenn sie im Angebot oder in der Auftragsbestätigung ausdrücklich aufgeführt ist. Reichweite, Hindernisse, Abstellrichtung und weitere Geräte werden vorab abgestimmt."] },
      { title: "Zufahrt und Aufstellort", paragraphs: ["Der Kunde stellt eine geeignete und rechtmäßig nutzbare Lieferstelle bereit. Tore, Durchfahrten, Kurven, Äste, Leitungen, parkende Fahrzeuge und Rangierflächen müssen frühzeitig mitgeteilt werden. Der Aufstellplatz muss eben, tragfähig und für die vorgesehenen Auflagepunkte geeignet sein."], bullets: ["Freie und ausreichend belastbare Zufahrt", "Genügend Rangier- und Entladeraum", "Geeigneter, stabiler Untergrund", "Erforderliche Zufahrts- und Standortgenehmigungen", "Aktuelle Fotos, Maße von Engstellen und gewünschte Ausrichtung", "Erreichbare Ansprechperson am Liefertag"] },
      { title: "Lieferkosten", paragraphs: ["Die Lieferung ist nicht automatisch im Produktpreis enthalten. Die Transportkosten werden anhand von Postleitzahl und Zielort, Strecke, Containergröße, Fahrzeug, Entladeart, Kranbedarf und besonderen Standortbedingungen individuell berechnet. Der konkrete Transportpreis und enthaltene Leistungsumfang werden im Angebot beziehungsweise in der Auftragsbestätigung vor Vertragsschluss ausgewiesen.", "Zusätzliche, tatsächlich entstehende Kosten wegen unzutreffender Lieferangaben, einer vom Kunden zu vertretenden unzugänglichen Lieferstelle, eines erfolglosen Zustellversuchs oder nachträglich verlangter Geräte können berechnet werden, soweit dies vertraglich vereinbart und gesetzlich zulässig ist."] },
      { title: "Lieferzeiten innerhalb Deutschlands", paragraphs: [`Bearbeitungszeit: ${DELIVERY_POLICY.germany.handling} Werktage. Transportzeit innerhalb Deutschlands: ${DELIVERY_POLICY.germany.transit} Werktage. Geschätzte Gesamtdauer ab Vorliegen der vereinbarten Voraussetzungen: ${DELIVERY_POLICY.germany.total} Werktage. Diese Werte sind Konfigurationsplatzhalter und müssen vor Veröffentlichung durch freigegebene Zeitspannen ersetzt werden.`] },
      { title: "Lieferzeiten in andere angebotene EU-Länder", paragraphs: [`Bearbeitungszeit: ${DELIVERY_POLICY.eu.handling} Werktage. Internationale Transportzeit: ${DELIVERY_POLICY.eu.transit} Werktage. Geschätzte Gesamtdauer ab Vorliegen der vereinbarten Voraussetzungen: ${DELIVERY_POLICY.eu.total} Werktage. Diese Werte sind Konfigurationsplatzhalter und müssen vor Veröffentlichung durch freigegebene Zeitspannen ersetzt werden.`, "Bei internationalen Lieferungen können Zielland, Route, Genehmigungen, grenzüberschreitende Transportbedingungen, Fähr- oder Bahnverbindungen und verfügbare Frachtführer die konkrete Planung beeinflussen. Der für Ihren Auftrag geltende Zeitraum wird vor Vertragsschluss bestätigt."] },
      { title: "Verzögerungen", paragraphs: ["Verkehrsbeschränkungen, Fahrzeug- oder Frachtführerverfügbarkeit, Wetter, Feiertage, grenzüberschreitende Anforderungen, Fähr- oder Bahnfahrpläne, behördliche Maßnahmen und höhere Gewalt können bestätigte Schätzungen beeinflussen. Sobald eine erhebliche Verzögerung bekannt wird, informieren wir den Kunden. Gesetzliche Rechte wegen Lieferverzugs bleiben unberührt."] },
      { title: "Prüfung bei Lieferung und Entladung", paragraphs: ["Unsere Container werden vor dem Versand entsprechend der beworbenen und vereinbarten Zustandsklasse geprüft. Kontrollieren Sie bei der Übergabe Containerart, Größe, vereinbarten Zustand, sichtbare strukturelle oder transportbedingte Schäden, Türen, Verriegelungen sowie vereinbartes Zubehör und Umbauten."], bullets: ["Sichtbare Schäden sofort dem Fahrer mitteilen", "Übersichts- und Detailfotos anfertigen", "Schaden nach Möglichkeit auf den Lieferunterlagen vermerken", "NORDIKA Container unverzüglich mit Auftragsnummer kontaktieren"] },
      { title: "Verbraucher, Unternehmer und internationale Lieferungen", paragraphs: ["Die Sichtprüfung nimmt Verbrauchern keine gesetzlichen Rechte wegen später erkennbarer oder verdeckter Mängel. Ist der Kauf für beide Parteien ein Handelsgeschäft, gelten für Unternehmer die Untersuchungs- und Rügepflichten des § 377 HGB, soweit anwendbar.", "Bei Lieferungen außerhalb Deutschlands gelten dieselben Grundsätze für Prüfung und Schadensmeldung. Veranlassen Sie bei einem berechtigten Problem keinen eigenständigen grenzüberschreitenden Rücktransport; NORDIKA Container stimmt die erforderliche Schwerlastlogistik mit Ihnen ab."] },
    ],
    conditions: [
      { title: "One Trip / neuwertig", paragraphs: ["Diese Container haben in der Regel nur eine Überführung hinter sich. Leichte Transport- oder Handlingspuren sind möglich; die Gesamtoptik ist meist sehr gut."] },
      { title: "WWT – wind- und wasserdicht", paragraphs: ["WWT beschreibt einen für trockene Lagerung bewerteten gebrauchten Zustand. Dellen, Rost- und Lackspuren können vorhanden sein; Türen, Dach, Wände und Boden müssen zum geplanten Einsatz passen."] },
      { title: "Cargo Worthy, CSC und IICL", paragraphs: ["Cargo Worthy bezeichnet einen für den Frachtverkehr prüfbaren Zustand. Der CSC-Status ist separat am Produkt zu betrachten. IICL ist eine technische Reparatur- und Inspektionsreferenz und ersetzt keine projektspezifische Prüfung."] },
      { title: "Vor dem Kauf dokumentieren", paragraphs: ["Fragen Sie nach aktuellen Bildern, Türfunktion, Boden, Dichtigkeit, Farbe, Standort und vorhandenen Zertifikaten. Die konkrete Produktbeschreibung und Vereinbarung sind entscheidend."] },
    ],
    conversions: [
      { title: "Mögliche Ausstattungen", paragraphs: ["Fenster, Personen- oder Rolltore, Elektrik, Beleuchtung, Dämmung, Heizung, Kühlung, Bodenaufbau und Innenverkleidung können projektspezifisch kombiniert werden."], bullets: ["Büro- und Aufenthaltsräume", "Werkstatt- und Technikcontainer", "Verkaufs- und Eventlösungen", "Lager mit zusätzlichem Zugang"] },
      { title: "Planung und technische Freigabe", paragraphs: ["Wir klären Maße, Öffnungen, Lasten, technische Ausstattung, Transportfähigkeit und Aufstellort. Erst nach Prüfung werden Umfang, Preis und Ausführung verbindlich bestätigt."] },
      { title: "Pflichten am Standort", paragraphs: ["Baurecht, Genehmigungen, Fundamente, Anschlüsse und die Eignung für den vorgesehenen Zweck sind vom Auftraggeber mit den zuständigen Stellen zu klären."] },
    ],
    faq: [
      { title: "Sind Katalogpreise inklusive Mehrwertsteuer?", paragraphs: ["Als Bruttopreis gekennzeichnete Katalogpreise enthalten die deutsche Mehrwertsteuer. Lieferung, Entladung, Umbauten und Zubehör werden separat bestätigt."] },
      { title: "Kann ich einen Container besichtigen?", paragraphs: ["Besichtigungen sind nach Terminvereinbarung und abhängig vom Depot möglich. Nennen Sie uns die gewünschte Artikelnummer, damit der Bestand geprüft werden kann."] },
      { title: "Wie wird der Lieferzeitraum bestimmt?", paragraphs: ["Bestand, Depot, Strecke, Fahrzeug, Kranbedarf und Terminplanung bestimmen den Zeitraum. Maßgeblich ist die schriftliche Bestätigung."] },
      { title: "Brauche ich eine Genehmigung?", paragraphs: ["Das kann von Standort, Nutzungsdauer und Einsatz abhängen. Öffentlich-rechtliche Anforderungen sind mit der zuständigen Behörde zu klären."] },
      { title: "Was bedeutet WWT oder Cargo Worthy?", paragraphs: ["WWT wird für wind- und wasserdichte Lagerzwecke verwendet. Cargo Worthy betrifft die Beurteilung für den Frachtverkehr; der konkrete CSC-Status muss separat geprüft werden."] },
      { title: "Welche Angaben helfen bei einer Lieferanfrage?", paragraphs: ["Postleitzahl, Containergröße, gewünschte Position, Zufahrtsfotos, Engstellen, Untergrund und ein Lageplan ermöglichen eine bessere Prüfung."] },
      { title: "Sind individuelle Umbauten möglich?", paragraphs: ["Viele Öffnungen und Ausstattungen sind möglich, müssen aber für Container, Transport, Nutzung und Standort technisch geprüft werden."] },
      { title: "Was ist bei Schäden oder Rückgaben zu tun?", paragraphs: ["Dokumentieren Sie den Zustand sofort, nennen Sie Auftrag und Artikel und stimmen Sie Prüfung sowie Schwerlast-Rücktransport vorab mit uns ab."] },
    ],
  },
  en: {
    about: [
      { title: "NORDIKA Container GmbH", paragraphs: ["We support companies, public-sector customers and private buyers in selecting new and used containers, from the first enquiry to coordinated delivery."] },
      { title: "A fit for the requirement", paragraphs: ["Size, condition grade, equipment, intended use and budget are considered together. Product data and visible signs of use should be clear before a decision."], bullets: ["New, one-trip and used containers", "Standard, high-cube and specialist types", "Conversions after technical review", "Project-specific delivery planning"] },
      { title: "Centrally managed from Mainz", paragraphs: ["Advice, quotations and project coordination are managed from our company address at Nikolaus-Otto-Str. 9, D-55129 Mainz, Germany. The specific product and written confirmation remain decisive."] },
    ],
    delivery: [
      { title: "The right delivery solution", paragraphs: ["Depending on size, route and site, a container can be delivered with a suitable vehicle and, where required, unloaded by crane. Unloading method, reach and final orientation are agreed before confirmation."] },
      { title: "Prepare access and the site", paragraphs: ["Gates, passages, bends, branches, cables, parked vehicles and manoeuvring space should be documented. The position must be level, load-bearing and suitable for the intended support points."], bullets: ["Current photos of the complete access route", "Measurements of restrictions and obstacles", "Required door and length orientation", "A contact person on delivery day"] },
      { title: "From enquiry to handover", paragraphs: ["After reviewing the delivery site and container, the logistics item appears in the offer. A date is binding only after written confirmation. Undisclosed obstacles may require the plan to be reassessed."] },
    ],
    conditions: [
      { title: "One-trip / near-new", paragraphs: ["These containers have generally completed only one loaded journey. Light transport or handling marks are possible, while the overall appearance is usually very good."] },
      { title: "WWT – wind and watertight", paragraphs: ["WWT describes a used unit assessed for dry storage. Dents, rust and paint marks may be present; doors, roof, walls and floor must suit the intended use."] },
      { title: "Cargo worthy, CSC and IICL", paragraphs: ["Cargo worthy describes a condition that can be assessed for freight use. CSC status must be checked separately on the product. IICL is a technical repair and inspection reference, not a substitute for project review."] },
      { title: "Document before buying", paragraphs: ["Ask for current images, door operation, floor, weather-tightness, colour, depot and available certificates. The specific description and agreement are decisive."] },
    ],
    conversions: [
      { title: "Possible equipment", paragraphs: ["Windows, personnel or roller doors, electrics, lighting, insulation, heating, cooling, flooring and interior lining can be combined for the project."], bullets: ["Office and welfare rooms", "Workshop and technical units", "Retail and event solutions", "Storage with additional access"] },
      { title: "Planning and technical approval", paragraphs: ["We clarify dimensions, openings, loads, technical equipment, transportability and the site. Scope, price and execution become binding only after review."] },
      { title: "Site responsibilities", paragraphs: ["Planning law, permits, foundations, connections and suitability for the intended purpose must be clarified by the customer with the responsible parties."] },
    ],
    faq: [
      { title: "Do catalogue prices include VAT?", paragraphs: ["Catalogue prices marked as gross include German VAT. Delivery, unloading, conversions and accessories are confirmed separately."] },
      { title: "Can I inspect a container?", paragraphs: ["Viewings are possible by appointment and depend on the depot. Give us the product number so stock can be checked."] },
      { title: "How is the delivery timeframe determined?", paragraphs: ["Stock, depot, route, vehicle, crane requirements and scheduling determine timing. The written confirmation is decisive."] },
      { title: "Do I need a permit?", paragraphs: ["This can depend on the site, duration and use. Clarify public-law requirements with the responsible authority."] },
      { title: "What do WWT and cargo worthy mean?", paragraphs: ["WWT is used for wind- and watertight storage condition. Cargo worthy relates to freight assessment; the specific CSC status must be checked separately."] },
      { title: "What helps with a delivery enquiry?", paragraphs: ["Postcode, container size, required position, access photos, restrictions, ground and a site plan support a better review."] },
      { title: "Are custom conversions possible?", paragraphs: ["Many openings and equipment options are possible but must be technically reviewed for container, transport, use and site."] },
      { title: "What should I do about damage or a return?", paragraphs: ["Record the condition immediately, provide the order and product details, and agree assessment and heavy-haul return transport with us first."] },
    ],
  },
  nl: {
    about: [
      { title: "NORDIKA Container GmbH", paragraphs: ["We begeleiden bedrijven, publieke opdrachtgevers en particulieren bij de keuze van nieuwe en gebruikte containers, van aanvraag tot afgestemde levering."] },
      { title: "Passend bij de behoefte", paragraphs: ["Maat, conditieklasse, uitrusting, gebruik en budget worden samen bekeken. Productgegevens en zichtbare gebruikssporen moeten vóór de keuze duidelijk zijn."], bullets: ["Nieuwe, one-trip- en gebruikte containers", "Standaard-, high-cube- en speciale types", "Ombouw na technische controle", "Projectgerichte leverplanning"] },
      { title: "Centraal vanuit Mainz", paragraphs: ["Advies, offertes en projecten worden gecoördineerd vanuit ons bedrijfsadres aan de Nikolaus-Otto-Str. 9, D-55129 Mainz, Duitsland. Het concrete product en de schriftelijke bevestiging zijn bepalend."] },
    ],
    delivery: [
      { title: "De juiste leveroplossing", paragraphs: ["Afhankelijk van maat, route en locatie kan een container met een geschikt voertuig en zo nodig een kraan worden gelost. Losmethode, reikwijdte en uiteindelijke richting worden vooraf afgestemd."] },
      { title: "Toegang en locatie voorbereiden", paragraphs: ["Poorten, doorgangen, bochten, takken, kabels, geparkeerde auto's en manoeuvreerruimte moeten worden vastgelegd. De plaats moet vlak, draagkrachtig en geschikt voor de steunpunten zijn."], bullets: ["Actuele foto's van de volledige toegangsroute", "Maten van beperkingen en obstakels", "Gewenste deur- en lengterichting", "Contactpersoon op de leverdag"] },
      { title: "Van aanvraag tot overdracht", paragraphs: ["Na controle van locatie en container komt de logistieke post in de offerte. Een datum is pas bindend na schriftelijke bevestiging. Niet gemelde hindernissen kunnen een nieuwe beoordeling vereisen."] },
    ],
    conditions: [
      { title: "One trip / bijna nieuw", paragraphs: ["Deze containers hebben doorgaans één beladen reis gemaakt. Lichte transport- of handlingsporen zijn mogelijk; de algemene uitstraling is meestal zeer goed."] },
      { title: "WWT – wind- en waterdicht", paragraphs: ["WWT beschrijft een gebruikte container die voor droge opslag is beoordeeld. Deuken, roest en verfsporen kunnen voorkomen; deuren, dak, wanden en vloer moeten bij het gebruik passen."] },
      { title: "Cargo worthy, CSC en IICL", paragraphs: ["Cargo worthy betreft een voor vrachtgebruik te beoordelen staat. CSC wordt apart per product gecontroleerd. IICL is een technische reparatie- en inspectiereferentie en vervangt geen projectcontrole."] },
      { title: "Vóór aankoop vastleggen", paragraphs: ["Vraag naar actuele foto's, deurwerking, vloer, dichtheid, kleur, depot en beschikbare certificaten. De concrete beschrijving en afspraak zijn bepalend."] },
    ],
    conversions: [
      { title: "Mogelijke uitrusting", paragraphs: ["Ramen, loop- of roldeuren, elektra, verlichting, isolatie, verwarming, koeling, vloer en binnenbekleding kunnen per project worden gecombineerd."], bullets: ["Kantoor- en verblijfsruimtes", "Werkplaats- en techniekunits", "Verkoop- en eventoplossingen", "Opslag met extra toegang"] },
      { title: "Planning en technische goedkeuring", paragraphs: ["We bespreken maten, openingen, belastingen, techniek, transporteerbaarheid en locatie. Omvang, prijs en uitvoering worden pas na controle bindend."] },
      { title: "Verantwoordelijkheden op locatie", paragraphs: ["Bouwrecht, vergunningen, fundering, aansluitingen en geschiktheid voor het doel worden door de opdrachtgever met bevoegde partijen afgestemd."] },
    ],
    faq: [
      { title: "Zijn catalogusprijzen inclusief btw?", paragraphs: ["Als bruto vermelde prijzen bevatten Duitse btw. Levering, lossing, ombouw en accessoires worden apart bevestigd."] },
      { title: "Kan ik een container bezichtigen?", paragraphs: ["Bezichtiging is op afspraak en afhankelijk van het depot mogelijk. Vermeld het productnummer zodat de voorraad kan worden gecontroleerd."] },
      { title: "Hoe wordt de levertijd bepaald?", paragraphs: ["Voorraad, depot, route, voertuig, kraan en planning bepalen de termijn. De schriftelijke bevestiging is bepalend."] },
      { title: "Heb ik een vergunning nodig?", paragraphs: ["Dit kan afhangen van locatie, duur en gebruik. Bespreek publiekrechtelijke eisen met de bevoegde instantie."] },
      { title: "Wat betekenen WWT en cargo worthy?", paragraphs: ["WWT wordt gebruikt voor wind- en waterdichte opslagstaat. Cargo worthy betreft vrachtbeoordeling; CSC moet apart worden gecontroleerd."] },
      { title: "Welke gegevens helpen bij levering?", paragraphs: ["Postcode, maat, gewenste positie, toegangsfoto's, beperkingen, ondergrond en plattegrond helpen bij de beoordeling."] },
      { title: "Is ombouw op maat mogelijk?", paragraphs: ["Veel openingen en uitrustingen zijn mogelijk maar moeten voor container, transport, gebruik en locatie technisch worden gecontroleerd."] },
      { title: "Wat doe ik bij schade of retour?", paragraphs: ["Leg de staat direct vast, vermeld order en product en stem controle en zwaar retourtransport eerst met ons af."] },
    ],
  },
  it: {
    about: [
      { title: "NORDIKA Container GmbH", paragraphs: ["Seguiamo aziende, enti pubblici e privati nella scelta di container nuovi e usati, dalla prima richiesta alla consegna concordata."] },
      { title: "Adatto all'esigenza", paragraphs: ["Dimensione, classe di condizione, dotazione, utilizzo e budget vengono valutati insieme. Dati del prodotto e segni d'uso visibili devono essere chiari prima della scelta."], bullets: ["Container nuovi, one trip e usati", "Tipi standard, high cube e speciali", "Trasformazioni dopo verifica tecnica", "Consegna pianificata per il progetto"] },
      { title: "Gestione centrale da Mainz", paragraphs: ["Consulenza, offerte e progetti sono coordinati dal nostro indirizzo in Nikolaus-Otto-Str. 9, D-55129 Mainz, Germania. Contano il prodotto concreto e la conferma scritta."] },
    ],
    delivery: [
      { title: "La soluzione di consegna", paragraphs: ["In base a dimensione, percorso e sito, il container viene consegnato con mezzo idoneo e, se necessario, scaricato con gru. Metodo, portata e orientamento si concordano prima della conferma."] },
      { title: "Preparare accesso e sito", paragraphs: ["Cancelli, passaggi, curve, rami, cavi, veicoli e spazio di manovra vanno documentati. Il posto deve essere piano, portante e adatto ai punti di appoggio."], bullets: ["Foto attuali dell'intero accesso", "Misure di strettoie e ostacoli", "Direzione desiderata di porte e lunghezza", "Referente il giorno della consegna"] },
      { title: "Dalla richiesta alla consegna", paragraphs: ["Dopo la verifica di luogo e container, la logistica compare nell'offerta. La data è vincolante solo dopo conferma scritta. Ostacoli non comunicati possono richiedere una nuova valutazione."] },
    ],
    conditions: [
      { title: "One trip / seminuovo", paragraphs: ["In genere questi container hanno effettuato un solo viaggio carico. Sono possibili lievi segni di trasporto; l'aspetto complessivo è normalmente molto buono."] },
      { title: "WWT – resistente a vento e acqua", paragraphs: ["WWT descrive un usato valutato per deposito asciutto. Possono esserci ammaccature, ruggine e segni di vernice; porte, tetto, pareti e pavimento devono essere adatti all'uso."] },
      { title: "Cargo worthy, CSC e IICL", paragraphs: ["Cargo worthy indica una condizione valutabile per il trasporto merci. Il CSC va verificato per il singolo prodotto. IICL è un riferimento tecnico e non sostituisce la verifica del progetto."] },
      { title: "Documentare prima dell'acquisto", paragraphs: ["Richiedi foto attuali, funzionamento porte, pavimento, tenuta, colore, deposito e certificati disponibili. Sono decisivi descrizione e accordo specifici."] },
    ],
    conversions: [
      { title: "Dotazioni possibili", paragraphs: ["Finestre, porte pedonali o avvolgibili, elettricità, illuminazione, isolamento, riscaldamento, raffrescamento, pavimento e rivestimento si combinano per il progetto."], bullets: ["Uffici e locali di servizio", "Officine e unità tecniche", "Soluzioni vendita ed eventi", "Deposito con accesso aggiuntivo"] },
      { title: "Pianificazione e approvazione tecnica", paragraphs: ["Verifichiamo misure, aperture, carichi, impianti, trasportabilità e sito. Ambito, prezzo ed esecuzione diventano vincolanti solo dopo la verifica."] },
      { title: "Responsabilità sul sito", paragraphs: ["Norme edilizie, permessi, fondazioni, allacci e idoneità all'uso vanno verificati dal cliente con i soggetti competenti."] },
    ],
    faq: [
      { title: "I prezzi includono l'IVA?", paragraphs: ["I prezzi lordi includono l'IVA tedesca. Consegna, scarico, trasformazioni e accessori vengono confermati separatamente."] },
      { title: "Posso vedere un container?", paragraphs: ["Le visite sono possibili su appuntamento e dipendono dal deposito. Indica il codice prodotto per controllare lo stock."] },
      { title: "Come si determina la consegna?", paragraphs: ["Stock, deposito, percorso, mezzo, gru e programmazione determinano il periodo. Conta la conferma scritta."] },
      { title: "Serve un'autorizzazione?", paragraphs: ["Può dipendere da luogo, durata e uso. Verifica i requisiti pubblici con l'autorità competente."] },
      { title: "Cosa significano WWT e cargo worthy?", paragraphs: ["WWT si usa per deposito resistente a vento e acqua. Cargo worthy riguarda la valutazione per il trasporto; il CSC va verificato a parte."] },
      { title: "Quali dati servono per la consegna?", paragraphs: ["CAP, dimensione, posizione, foto accesso, ostacoli, terreno e planimetria aiutano la verifica."] },
      { title: "Sono possibili trasformazioni su misura?", paragraphs: ["Molte aperture e dotazioni sono possibili ma vanno verificate per container, trasporto, uso e sito."] },
      { title: "Cosa fare per danni o reso?", paragraphs: ["Documenta subito, indica ordine e prodotto e concorda prima verifica e trasporto pesante di ritorno."] },
    ],
  },
  cs: {
    about: [
      { title: "NORDIKA Container GmbH", paragraphs: ["Firmám, veřejným zákazníkům i soukromým kupujícím pomáháme s výběrem nových a použitých kontejnerů od poptávky po dohodnutou dopravu."] },
      { title: "Řešení podle potřeby", paragraphs: ["Velikost, třída stavu, výbava, využití a rozpočet posuzujeme společně. Údaje produktu a viditelné stopy používání mají být před rozhodnutím jasné."], bullets: ["Nové, one-trip a použité kontejnery", "Standardní, high-cube a speciální typy", "Úpravy po technickém prověření", "Doprava plánovaná pro projekt"] },
      { title: "Centrálně z Mohuče", paragraphs: ["Poradenství, nabídky a projekty koordinujeme z adresy Nikolaus-Otto-Str. 9, D-55129 Mainz, Německo. Rozhodující je konkrétní produkt a písemné potvrzení."] },
    ],
    delivery: [
      { title: "Vhodné řešení dopravy", paragraphs: ["Podle velikosti, trasy a místa lze kontejner dodat vhodným vozidlem a případně vyložit jeřábem. Způsob vykládky, dosah a orientace se dohodnou před potvrzením."] },
      { title: "Připravte příjezd a místo", paragraphs: ["Brány, průjezdy, zatáčky, větve, vedení, vozidla a manipulační prostor zdokumentujte. Místo musí být rovné, únosné a vhodné pro opěrné body."], bullets: ["Aktuální fotografie celé příjezdové trasy", "Rozměry omezení a překážek", "Požadovaný směr dveří a délky", "Kontaktní osoba v den dodání"] },
      { title: "Od poptávky k předání", paragraphs: ["Po prověření místa a kontejneru je logistika uvedena v nabídce. Termín je závazný až po písemném potvrzení. Neoznámené překážky mohou vyžadovat nové posouzení."] },
    ],
    conditions: [
      { title: "One trip / téměř nový", paragraphs: ["Tyto kontejnery obvykle absolvovaly jednu naloženou cestu. Lehké stopy dopravy či manipulace jsou možné; celkový vzhled bývá velmi dobrý."] },
      { title: "WWT – odolný proti větru a vodě", paragraphs: ["WWT označuje použitý kus posouzený pro suché skladování. Mohou být důlky, koroze a stopy laku; dveře, střecha, stěny a podlaha musí odpovídat využití."] },
      { title: "Cargo worthy, CSC a IICL", paragraphs: ["Cargo worthy označuje stav posuzovatelný pro nákladní dopravu. CSC se ověřuje u produktu samostatně. IICL je technická reference, nikoli náhrada kontroly projektu."] },
      { title: "Dokumentace před koupí", paragraphs: ["Vyžádejte aktuální fotografie, funkci dveří, podlahu, těsnost, barvu, depo a dostupné doklady. Rozhoduje konkrétní popis a dohoda."] },
    ],
    conversions: [
      { title: "Možná výbava", paragraphs: ["Okna, personální či rolovací dveře, elektroinstalaci, osvětlení, izolaci, vytápění, chlazení, podlahu a obložení lze kombinovat podle projektu."], bullets: ["Kanceláře a zázemí", "Dílny a technické jednotky", "Prodejní a eventová řešení", "Sklad s dalším vstupem"] },
      { title: "Plánování a technické schválení", paragraphs: ["Prověříme rozměry, otvory, zatížení, techniku, přepravitelnost a místo. Rozsah, cena a provedení jsou závazné až po kontrole."] },
      { title: "Povinnosti v místě", paragraphs: ["Stavební právo, povolení, základy, přípojky a vhodnost pro účel ověřuje zákazník s příslušnými subjekty."] },
    ],
    faq: [
      { title: "Jsou katalogové ceny včetně DPH?", paragraphs: ["Ceny označené jako brutto obsahují německou DPH. Doprava, vykládka, úpravy a příslušenství se potvrzují samostatně."] },
      { title: "Mohu si kontejner prohlédnout?", paragraphs: ["Prohlídka je možná po dohodě a podle depa. Uveďte číslo produktu, abychom ověřili sklad."] },
      { title: "Jak se určuje termín dodání?", paragraphs: ["Sklad, depo, trasa, vozidlo, jeřáb a plánování určují termín. Rozhoduje písemné potvrzení."] },
      { title: "Potřebuji povolení?", paragraphs: ["Může záležet na místě, době a využití. Veřejnoprávní požadavky ověřte u příslušného úřadu."] },
      { title: "Co znamená WWT a cargo worthy?", paragraphs: ["WWT se používá pro skladovací stav odolný proti větru a vodě. Cargo worthy se týká přepravy; CSC je nutné ověřit zvlášť."] },
      { title: "Jaké údaje pomohou s dopravou?", paragraphs: ["PSČ, velikost, požadovaná poloha, fotografie příjezdu, omezení, podklad a plánek pomohou posouzení."] },
      { title: "Jsou možné úpravy na míru?", paragraphs: ["Mnoho otvorů a výbav je možných, ale vyžaduje technické prověření kontejneru, dopravy, využití a místa."] },
      { title: "Co dělat při škodě nebo vrácení?", paragraphs: ["Stav ihned zdokumentujte, uveďte objednávku a produkt a předem dohodněte kontrolu i těžkou zpětnou dopravu."] },
    ],
  },
  es: {
    about: [
      { title: "NORDIKA Container GmbH", paragraphs: ["Acompañamos a empresas, clientes públicos y particulares en la elección de contenedores nuevos y usados, desde la consulta hasta la entrega coordinada."] },
      { title: "Una solución adecuada", paragraphs: ["Tamaño, grado de estado, equipamiento, uso y presupuesto se valoran conjuntamente. Los datos del producto y las marcas visibles deben estar claros antes de decidir."], bullets: ["Contenedores nuevos, one trip y usados", "Tipos estándar, high cube y especiales", "Transformaciones tras revisión técnica", "Entrega planificada para el proyecto"] },
      { title: "Gestión central desde Maguncia", paragraphs: ["El asesoramiento, los presupuestos y los proyectos se coordinan desde Nikolaus-Otto-Str. 9, D-55129 Mainz, Alemania. Son determinantes el producto concreto y la confirmación escrita."] },
    ],
    delivery: [
      { title: "La solución de entrega", paragraphs: ["Según tamaño, ruta y lugar, el contenedor puede entregarse con vehículo adecuado y, si hace falta, descargarse con grúa. Método, alcance y orientación se acuerdan antes de confirmar."] },
      { title: "Prepara acceso y ubicación", paragraphs: ["Portones, pasos, curvas, ramas, cables, vehículos y espacio de maniobra deben documentarse. El lugar debe ser nivelado, portante y adecuado para los puntos de apoyo."], bullets: ["Fotos actuales de toda la ruta de acceso", "Medidas de restricciones y obstáculos", "Orientación deseada de puertas y longitud", "Persona de contacto el día de entrega"] },
      { title: "De la consulta a la entrega", paragraphs: ["Tras revisar lugar y contenedor, la logística figura en la oferta. La fecha solo es vinculante tras confirmación escrita. Obstáculos no comunicados pueden exigir una nueva evaluación."] },
    ],
    conditions: [
      { title: "One trip / casi nuevo", paragraphs: ["Estos contenedores suelen haber realizado un solo viaje con carga. Puede haber marcas leves de transporte o manejo; el aspecto general suele ser muy bueno."] },
      { title: "WWT – resistente al viento y agua", paragraphs: ["WWT describe una unidad usada valorada para almacenamiento seco. Puede tener abolladuras, óxido y marcas; puertas, techo, paredes y suelo deben servir para el uso."] },
      { title: "Cargo worthy, CSC e IICL", paragraphs: ["Cargo worthy describe un estado evaluable para carga. El CSC se revisa por producto. IICL es una referencia técnica de reparación e inspección, no sustituye la revisión del proyecto."] },
      { title: "Documentar antes de comprar", paragraphs: ["Pide fotos actuales, funcionamiento de puertas, suelo, estanqueidad, color, depósito y certificados disponibles. La descripción y el acuerdo concretos son decisivos."] },
    ],
    conversions: [
      { title: "Equipamiento posible", paragraphs: ["Ventanas, puertas peatonales o enrollables, electricidad, iluminación, aislamiento, calefacción, refrigeración, suelo y revestimiento pueden combinarse para el proyecto."], bullets: ["Oficinas y espacios de servicio", "Talleres y unidades técnicas", "Soluciones de venta y eventos", "Almacén con acceso adicional"] },
      { title: "Planificación y aprobación técnica", paragraphs: ["Revisamos medidas, aperturas, cargas, técnica, transporte y lugar. Alcance, precio y ejecución solo son vinculantes después de la revisión."] },
      { title: "Responsabilidades del lugar", paragraphs: ["Normativa urbanística, permisos, cimentación, conexiones e idoneidad para el uso deben ser revisados por el cliente con los organismos competentes."] },
    ],
    faq: [
      { title: "¿Los precios incluyen IVA?", paragraphs: ["Los precios brutos incluyen el IVA alemán. Entrega, descarga, transformaciones y accesorios se confirman por separado."] },
      { title: "¿Puedo visitar un contenedor?", paragraphs: ["Las visitas son posibles con cita y dependen del depósito. Indica el número de producto para revisar el stock."] },
      { title: "¿Cómo se determina la entrega?", paragraphs: ["Stock, depósito, ruta, vehículo, grúa y planificación determinan el plazo. Prevalece la confirmación escrita."] },
      { title: "¿Necesito un permiso?", paragraphs: ["Puede depender de lugar, duración y uso. Consulta los requisitos públicos con la autoridad competente."] },
      { title: "¿Qué significan WWT y cargo worthy?", paragraphs: ["WWT se usa para estado resistente a viento y agua. Cargo worthy se refiere a carga; el CSC concreto se revisa aparte."] },
      { title: "¿Qué datos ayudan con la entrega?", paragraphs: ["Código postal, tamaño, posición, fotos de acceso, restricciones, suelo y plano ayudan a evaluar."] },
      { title: "¿Son posibles transformaciones a medida?", paragraphs: ["Muchas aperturas y equipos son posibles, pero deben revisarse para contenedor, transporte, uso y lugar."] },
      { title: "¿Qué hago ante daños o devolución?", paragraphs: ["Documenta el estado de inmediato, indica pedido y producto y acuerda antes la revisión y el transporte pesado de retorno."] },
    ],
  },
};

export const recoveredKeys: RecoveredKey[] = ["about", "delivery", "conditions", "conversions", "faq"];
