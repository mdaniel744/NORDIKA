import { locales, type Locale } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";
import { guideSectionCopy } from "@/lib/guide-section-copy";
import { recoveredKeys, recoveredPageSections } from "@/lib/recovered-page-sections";

export type PageSection = { title: string; paragraphs: string[]; bullets?: string[] };
export type PageContent = { eyebrow: string; title: string; intro: string; sections: PageSection[] };

type LocalizedText = Record<Locale, string>;

export type CategoryDefinition = {
  key: string;
  slugs: Record<Locale, string>;
  titles: LocalizedText;
  descriptions: LocalizedText;
  match: (type: string, sku: string) => boolean;
};

export const categories: CategoryDefinition[] = [
  {
    key: "standard",
    slugs: { de: "seecontainer", en: "shipping-containers", nl: "zeecontainers", it: "container-marittimi", cs: "namorni-kontejnery", es: "contenedores-maritimos" },
    titles: { de: "Seecontainer", en: "Shipping containers", nl: "Zeecontainers", it: "Container marittimi", cs: "Námořní kontejnery", es: "Contenedores marítimos" },
    descriptions: { de: "Standardisierte, robuste Container für Transport, Lagerung und vielseitige Projekte.", en: "Standardised, robust containers for transport, storage and versatile projects.", nl: "Gestandaardiseerde, robuuste containers voor transport, opslag en uiteenlopende projecten.", it: "Container standardizzati e robusti per trasporto, deposito e progetti versatili.", cs: "Standardizované odolné kontejnery pro dopravu, skladování a různá využití.", es: "Contenedores estandarizados y robustos para transporte, almacenamiento y proyectos diversos." },
    match: (type, sku) => !/reefer|kühl|open|office|büro/i.test(type) && !/(RF|OS|OFFICE)/i.test(sku),
  },
  {
    key: "high-cube",
    slugs: { de: "high-cube-container", en: "high-cube-containers", nl: "high-cubecontainers", it: "container-high-cube", cs: "high-cube-kontejnery", es: "contenedores-high-cube" },
    titles: { de: "High-Cube-Container", en: "High-cube containers", nl: "High-cubecontainers", it: "Container high cube", cs: "High-cube kontejnery", es: "Contenedores high cube" },
    descriptions: { de: "Mehr Innenhöhe und Volumen für sperrige Güter, Lager und Umbauprojekte.", en: "Extra interior height and volume for bulky goods, storage and conversion projects.", nl: "Extra binnenhoogte en volume voor grote goederen, opslag en ombouwprojecten.", it: "Più altezza interna e volume per merci ingombranti, deposito e trasformazioni.", cs: "Větší vnitřní výška a objem pro rozměrné zboží, skladování a úpravy.", es: "Más altura interior y volumen para mercancías voluminosas, almacén y transformaciones." },
    match: (type, sku) => /high|cube/i.test(type) || /HC/i.test(sku),
  },
  {
    key: "open-side",
    slugs: { de: "open-side-container", en: "open-side-containers", nl: "open-sidecontainers", it: "container-open-side", cs: "open-side-kontejnery", es: "contenedores-open-side" },
    titles: { de: "Open-Side-Container", en: "Open-side containers", nl: "Open-sidecontainers", it: "Container open side", cs: "Open-side kontejnery", es: "Contenedores open side" },
    descriptions: { de: "Seitlich vollständig zu öffnen – ideal für schnellen, breiten Zugriff auf die Ladung.", en: "Full side opening for fast, wide access to stored or transported goods.", nl: "Volledig aan de zijkant te openen voor snelle, brede toegang tot de lading.", it: "Apertura laterale completa per un accesso ampio e rapido al carico.", cs: "Plně otevíratelná boční stěna pro rychlý a široký přístup k nákladu.", es: "Apertura lateral completa para un acceso rápido y amplio a la carga." },
    match: (type, sku) => /open/i.test(type) || /OS/i.test(sku),
  },
  {
    key: "reefer",
    slugs: { de: "kuehlcontainer", en: "refrigerated-containers", nl: "koelcontainers", it: "container-refrigerati", cs: "chladici-kontejnery", es: "contenedores-refrigerados" },
    titles: { de: "Kühlcontainer", en: "Refrigerated containers", nl: "Koelcontainers", it: "Container refrigerati", cs: "Chladicí kontejnery", es: "Contenedores refrigerados" },
    descriptions: { de: "Temperaturgeführte Lager- und Transportlösungen für sensible Produkte.", en: "Temperature-controlled storage and transport solutions for sensitive products.", nl: "Temperatuurgecontroleerde opslag- en transportoplossingen voor gevoelige producten.", it: "Soluzioni di deposito e trasporto a temperatura controllata per prodotti sensibili.", cs: "Teplotně řízená skladovací a přepravní řešení pro citlivé produkty.", es: "Soluciones de almacenamiento y transporte con temperatura controlada para productos sensibles." },
    match: (type, sku) => /reefer|kühl/i.test(type) || /RF/i.test(sku),
  },
  {
    key: "office",
    slugs: { de: "buerocontainer", en: "office-containers", nl: "kantoorcontainers", it: "container-ufficio", cs: "kancelarske-kontejnery", es: "contenedores-oficina" },
    titles: { de: "Büro- und Raumcontainer", en: "Office and room containers", nl: "Kantoor- en ruimtecontainers", it: "Container ufficio e modulari", cs: "Kancelářské a obytné kontejnery", es: "Contenedores de oficina y modulares" },
    descriptions: { de: "Flexible Räume für Baustelle, Betrieb, Veranstaltung oder individuelle Nutzung.", en: "Flexible spaces for construction sites, operations, events or individual use.", nl: "Flexibele ruimtes voor bouwplaatsen, bedrijven, evenementen of individueel gebruik.", it: "Spazi flessibili per cantieri, aziende, eventi o utilizzi personalizzati.", cs: "Flexibilní prostory pro stavby, provozy, akce nebo individuální využití.", es: "Espacios flexibles para obras, empresas, eventos o usos personalizados." },
    match: (type, sku) => /office|büro/i.test(type) || /OFFICE/i.test(sku),
  },
];

export type GuideDefinition = {
  key: string;
  slugs: Record<Locale, string>;
  titles: LocalizedText;
  intros: LocalizedText;
  sections: Record<Locale, PageSection[]>;
};

export const guides: GuideDefinition[] = [
  makeGuide(
    "buying",
    { de: "container-kaufen-ratgeber", en: "container-buying-guide", nl: "container-kopen-gids", it: "guida-acquisto-container", cs: "pruvodce-nakupem-kontejneru", es: "guia-compra-contenedores" },
    { de: "Container kaufen: der vollständige Ratgeber", en: "The complete container buying guide", nl: "De complete gids voor een container kopen", it: "Guida completa all'acquisto di un container", cs: "Kompletní průvodce nákupem kontejneru", es: "Guía completa para comprar un contenedor" },
    { de: "Größe, Zustand, Standort und Lieferung richtig bewerten, bevor Sie sich entscheiden.", en: "How to assess size, condition, location and delivery before you decide.", nl: "Beoordeel maat, staat, locatie en levering voordat u beslist.", it: "Come valutare dimensione, condizioni, località e consegna prima di decidere.", cs: "Jak před rozhodnutím posoudit velikost, stav, lokalitu a dopravu.", es: "Cómo valorar tamaño, estado, ubicación y entrega antes de decidir." },
    ["choose", "condition", "delivery"],
  ),
  makeGuide(
    "sizes",
    { de: "container-groessen-abmessungen", en: "container-sizes-dimensions", nl: "container-maten-afmetingen", it: "dimensioni-container", cs: "velikosti-rozmery-kontejneru", es: "tamanos-dimensiones-contenedores" },
    { de: "Containergrößen und Abmessungen", en: "Container sizes and dimensions", nl: "Containermaten en afmetingen", it: "Misure e dimensioni dei container", cs: "Velikosti a rozměry kontejnerů", es: "Tamaños y dimensiones de contenedores" },
    { de: "10, 20 oder 40 Fuß, Standard oder High Cube: die wichtigsten Unterschiede im Überblick.", en: "10, 20 or 40 feet, standard or high cube: the key differences at a glance.", nl: "10, 20 of 40 voet, standaard of high cube: de belangrijkste verschillen.", it: "10, 20 o 40 piedi, standard o high cube: le differenze principali.", cs: "10, 20 nebo 40 stop, standard či high cube: hlavní rozdíly.", es: "10, 20 o 40 pies, estándar o high cube: las principales diferencias." },
    ["sizes", "height", "measure"],
  ),
  makeGuide(
    "condition",
    { de: "container-zustand-one-trip-gebraucht", en: "container-condition-one-trip-used", nl: "container-conditie-one-trip-gebruikt", it: "condizione-container-one-trip-usato", cs: "stav-kontejneru-one-trip-pouzity", es: "estado-contenedor-one-trip-usado" },
    { de: "One Trip oder gebraucht? Zustände verstehen", en: "One-trip or used? Understanding condition", nl: "One trip of gebruikt? Condities begrijpen", it: "One trip o usato? Capire le condizioni", cs: "One trip nebo použitý? Přehled stavů", es: "¿One trip o usado? Entender el estado" },
    { de: "Welche Zustandsklasse für Optik, Dichtigkeit, Budget und geplanten Einsatz passt.", en: "Which condition grade fits appearance, weather-tightness, budget and intended use.", nl: "Welke conditie past bij uitstraling, wind- en waterdichtheid, budget en gebruik.", it: "Quale condizione si adatta a estetica, tenuta, budget e utilizzo previsto.", cs: "Jaký stav odpovídá vzhledu, těsnosti, rozpočtu a plánovanému použití.", es: "Qué grado se adapta a aspecto, estanqueidad, presupuesto y uso previsto." },
    ["oneTrip", "used", "inspect"],
  ),
  makeGuide(
    "site",
    { de: "container-aufstellort-vorbereiten", en: "prepare-container-site", nl: "containerlocatie-voorbereiden", it: "preparare-sito-container", cs: "priprava-mista-pro-kontejner", es: "preparar-ubicacion-contenedor" },
    { de: "Aufstellort für einen Container vorbereiten", en: "How to prepare a container site", nl: "Een containerlocatie voorbereiden", it: "Come preparare il sito del container", cs: "Jak připravit místo pro kontejner", es: "Cómo preparar la ubicación de un contenedor" },
    { de: "Zufahrt, tragfähiger Untergrund, Auflagepunkte und Kranentladung richtig planen.", en: "Plan access, load-bearing ground, support points and crane unloading correctly.", nl: "Plan toegang, draagkrachtige ondergrond, steunpunten en kraanlossing goed.", it: "Pianifica correttamente accesso, terreno portante, appoggi e scarico con gru.", cs: "Správně naplánujte příjezd, únosný podklad, opěrné body a vykládku jeřábem.", es: "Planifica bien el acceso, el suelo portante, los apoyos y la descarga con grúa." },
    ["access", "ground", "crane"],
  ),
];

function makeGuide(key: string, slugs: Record<Locale, string>, titles: LocalizedText, intros: LocalizedText, sectionKeys: string[]): GuideDefinition {
  const generic: Record<Locale, Record<string, PageSection>> = {
    de: {
      choose: { title: "Bedarf und Größe festlegen", paragraphs: ["Ausgangspunkt sind Nutzung, benötigtes Innenvolumen, Türzugang und verfügbare Stellfläche. Standardcontainer eignen sich für viele Lageraufgaben; High-Cube-Modelle bieten zusätzliche Innenhöhe."] },
      condition: { title: "Zustand realistisch bewerten", paragraphs: ["One-Trip-Container bieten eine sehr gute Optik. Gebrauchte, wind- und wasserdichte Modelle sind wirtschaftlich, wenn Gebrauchsspuren akzeptabel sind."] },
      delivery: { title: "Gesamtkosten inklusive Lieferung", paragraphs: ["Der Produktpreis ist nur ein Teil. Entfernung, Zufahrt und Entladeart bestimmen die Logistikkosten. Lassen Sie den Aufstellort vorab prüfen."] },
      sizes: { title: "Gängige Längen", paragraphs: ["20-Fuß-Container sind kompakt und vielseitig. 40-Fuß-Container bieten ungefähr die doppelte Stellfläche. 10-Fuß-Modelle passen in beengte Bereiche."] },
      height: { title: "Standard oder High Cube", paragraphs: ["High Cube bietet rund 30 Zentimeter mehr Außen- und Innenhöhe. Das schafft Volumen, muss aber bei Durchfahrtshöhen berücksichtigt werden."] },
      measure: { title: "Daten am Produkt prüfen", paragraphs: ["Tatsächliche Innen-, Außen- und Türmaße können je nach Baureihe leicht variieren. Maßgeblich sind die Angaben auf der jeweiligen Produktseite."] },
      oneTrip: { title: "One Trip / neuwertig", paragraphs: ["Diese Container haben in der Regel nur eine Überführung hinter sich. Leichte Transportspuren sind möglich, insgesamt ist die Optik meist sehr gut."] },
      used: { title: "Gebrauchte Qualitäten", paragraphs: ["WWT steht für wind- und wasserdicht. Cargo Worthy kennzeichnet darüber hinaus eine transporttaugliche Einheit. Rost, Dellen und Lackspuren sind typische Gebrauchsspuren."] },
      inspect: { title: "Vor dem Kauf klären", paragraphs: ["Fragen Sie nach Dichtigkeit, Türfunktion, Boden, CSC-Status und aktuellen Bildern. Die passende Klasse hängt vom tatsächlichen Einsatz ab."] },
      access: { title: "Zufahrt prüfen", paragraphs: ["Lkw und Kran benötigen ausreichend Breite, Höhe und Rangierfläche. Tore, Äste, Leitungen und enge Kurven sollten vorab dokumentiert werden."] },
      ground: { title: "Untergrund und Auflagepunkte", paragraphs: ["Der Platz muss eben und tragfähig sein. Der Container wird typischerweise an den vier Eckbeschlägen auf geeigneten Punkten gelagert, damit Türen spannungsfrei schließen."] },
      crane: { title: "Entladung abstimmen", paragraphs: ["Reichweite, Hindernisse und Abstellrichtung entscheiden über die Kranlösung. Fotos, Maße und ein Lageplan helfen bei der Planung."] },
    },
    en: {}, nl: {}, it: {}, cs: {}, es: {},
  };
  const translatedTitles: Record<Locale, Record<string, string>> = {
    de: {},
    en: { choose: "Define use and size", condition: "Assess condition realistically", delivery: "Include delivery in the total cost", sizes: "Common lengths", height: "Standard or high cube", measure: "Check product-specific data", oneTrip: "One-trip / near-new", used: "Used grades", inspect: "Clarify before buying", access: "Check access", ground: "Ground and support points", crane: "Plan unloading" },
    nl: { choose: "Bepaal gebruik en maat", condition: "Beoordeel de staat realistisch", delivery: "Neem levering mee in de totaalprijs", sizes: "Gangbare lengtes", height: "Standaard of high cube", measure: "Controleer productgegevens", oneTrip: "One trip / bijna nieuw", used: "Gebruikte klassen", inspect: "Voor aankoop controleren", access: "Controleer de toegang", ground: "Ondergrond en steunpunten", crane: "Plan het lossen" },
    it: { choose: "Definisci uso e dimensione", condition: "Valuta realisticamente le condizioni", delivery: "Includi la consegna nel costo totale", sizes: "Lunghezze comuni", height: "Standard o high cube", measure: "Controlla i dati del prodotto", oneTrip: "One trip / seminuovo", used: "Classi dell'usato", inspect: "Verifica prima dell'acquisto", access: "Controlla l'accesso", ground: "Terreno e punti di appoggio", crane: "Pianifica lo scarico" },
    cs: { choose: "Určete využití a velikost", condition: "Reálně posuďte stav", delivery: "Zahrňte dopravu do celkové ceny", sizes: "Běžné délky", height: "Standard nebo high cube", measure: "Ověřte údaje produktu", oneTrip: "One trip / téměř nový", used: "Třídy použitých kontejnerů", inspect: "Co ověřit před koupí", access: "Ověřte příjezd", ground: "Podklad a opěrné body", crane: "Naplánujte vykládku" },
    es: { choose: "Define uso y tamaño", condition: "Valora el estado con realismo", delivery: "Incluye la entrega en el coste total", sizes: "Longitudes habituales", height: "Estándar o high cube", measure: "Comprueba los datos del producto", oneTrip: "One trip / casi nuevo", used: "Grados de usados", inspect: "Aclara antes de comprar", access: "Comprueba el acceso", ground: "Suelo y puntos de apoyo", crane: "Planifica la descarga" },
  };
  for (const locale of ["en", "nl", "it", "cs", "es"] as const) {
    for (const sectionKey of sectionKeys) generic[locale][sectionKey] = { title: translatedTitles[locale][sectionKey], paragraphs: [guideSectionCopy[locale][sectionKey]] };
  }
  return { key, slugs, titles, intros, sections: Object.fromEntries((Object.keys(generic) as Locale[]).map((locale) => [locale, sectionKeys.map((sectionKey) => generic[locale][sectionKey])])) as Record<Locale, PageSection[]> };
}

const simplePages: Record<Locale, Partial<Record<RouteKey, PageContent>>> = {
  de: {
    conversions: { eyebrow: "Individuelle Lösungen", title: "Containerumbau nach Maß", intro: "Vom zusätzlichen Zugang bis zum schlüsselfertigen Raum: Wir planen Umbauten passend zu Nutzung, Standort und Budget.", sections: [{ title: "Typische Ausstattungen", paragraphs: ["Fenster, Personen- und Rolltore, Elektrik, Beleuchtung, Dämmung, Heizung, Klimatisierung, Bodenaufbau und Innenverkleidung lassen sich projektspezifisch kombinieren."], bullets: ["Büro- und Aufenthaltsräume", "Werkstatt- und Technikcontainer", "Verkaufs- und Eventlösungen", "Lager mit individuellem Zugang"] }, { title: "Planung und Freigabe", paragraphs: ["Wir klären Maße, Öffnungen, technische Ausstattung, Transportfähigkeit und Aufstellort. Baurechtliche oder genehmigungsbezogene Fragen sind durch den Auftraggeber am Standort zu prüfen."] } ] },
    about: { eyebrow: "Seit 1983", title: "Über Baltes Container", intro: "Persönliche Beratung, sorgfältig ausgewählte Container und verlässliche Logistik bilden die Grundlage unserer Arbeit.", sections: [{ title: "Erfahrung aus vier Jahrzehnten", paragraphs: ["Baltes Container wurde im Februar 1983 gegründet und ist auf den Verkauf neuer und gebrauchter Container spezialisiert. Wir begleiten Unternehmen, öffentliche Auftraggeber und Privatkunden von der Auswahl bis zur Aufstellung."] }, { title: "Unser Anspruch", paragraphs: ["Wir erklären Zustände und technische Daten verständlich, kalkulieren transparent und empfehlen nur Lösungen, die zum tatsächlichen Bedarf passen."], bullets: ["Direkte Ansprechpartner", "Nachvollziehbare Produktdaten", "Projektbezogene Lieferplanung"] }] },
    delivery: { eyebrow: "Schwerlastlogistik transparent erklärt", title: "Versand- und Lieferbedingungen", intro: "Informationen zu Liefergebieten, individuellen Transportkosten, Bearbeitungs- und Transportzeiten, Standortanforderungen sowie der Prüfung bei Anlieferung.", sections: [{ title: "Vor der Lieferung", paragraphs: ["Bitte prüfen Sie Durchfahrtsbreiten und -höhen, Kurven, Leitungen, Äste, Untergrund und Platz für Lkw und Kran. Fotos und ein Lageplan helfen bei der Einschätzung."], bullets: ["Ebener, tragfähiger Untergrund", "Freie Zufahrt und Rangierfläche", "Geeignete Auflagepunkte an den Container-Ecken", "Ansprechpartner vor Ort"] }, { title: "Kosten und Termin", paragraphs: ["Lieferkosten werden individuell nach Entfernung, Containergröße und Entladeart kalkuliert. Ein Termin gilt erst nach schriftlicher Bestätigung als verbindlich."] }] },
    conditions: { eyebrow: "Qualität richtig einordnen", title: "Container-Zustandsklassen", intro: "Gebrauchsspuren sind normal. Entscheidend ist, welche technische und optische Qualität Ihr Einsatz erfordert.", sections: [{ title: "One Trip / neuwertig", paragraphs: ["In der Regel nur einmal beladen und überführt. Sehr gute Optik, jedoch sind leichte Transportspuren möglich."] }, { title: "Cargo Worthy", paragraphs: ["Transporttauglicher Gebrauchszustand mit gültigem beziehungsweise erneuerbarem CSC-Status, vorbehaltlich konkreter Prüfung."] }, { title: "WWT – wind- und wasserdicht", paragraphs: ["Geeignet für trockene Lagerung. Dellen, Rost- und Lackspuren sind möglich; Türen und Dichtigkeit werden für den vorgesehenen Lagerzweck bewertet."] }] },
    contact: { eyebrow: "Direkter Kontakt", title: "Wie können wir helfen?", intro: "Fragen zu Bestand, Lieferung oder einem Umbauprojekt? Schreiben Sie uns oder rufen Sie direkt an.", sections: [] },
    locations: { eyebrow: "Regional erreichbar", title: "Unsere Standorte", intro: "Verfügbarkeit und mögliche Lieferwege hängen vom jeweiligen Depot ab. Wir wählen die wirtschaftlich passende Option für Ihr Projekt.", sections: [] },
    faq: { eyebrow: "Kurz erklärt", title: "Häufige Fragen", intro: "Antworten zu Auswahl, Zustand, Preisen, Lieferung und Aufstellung.", sections: [{ title: "Sind die Preise inklusive Mehrwertsteuer?", paragraphs: ["Als Bruttopreis gekennzeichnete Katalogpreise enthalten die deutsche Mehrwertsteuer. Liefer- und Aufstellkosten werden separat bestätigt."] }, { title: "Kann ich einen Container besichtigen?", paragraphs: ["Besichtigungen sind nach Terminvereinbarung und abhängig vom Depot möglich. Kontaktieren Sie uns mit der gewünschten Artikelnummer."] }, { title: "Wie schnell kann geliefert werden?", paragraphs: ["Das hängt von Bestand, Depot, Strecke, Kranbedarf und Terminplanung ab. Wir nennen Ihnen nach Prüfung einen realistischen Lieferzeitraum."] }, { title: "Brauche ich eine Genehmigung?", paragraphs: ["Das kann vom Standort, der Nutzungsdauer und dem geplanten Einsatz abhängen. Bitte klären Sie öffentlich-rechtliche Anforderungen mit der zuständigen Behörde."] }] },
  },
  en: {}, nl: {}, it: {}, cs: {}, es: {},
};

const pageTranslations: Record<Exclude<Locale, "de">, Record<"conversions" | "about" | "delivery" | "conditions" | "contact" | "locations" | "faq", { eyebrow: string; title: string; intro: string }>> = {
  en: { conversions: { eyebrow: "Custom solutions", title: "Custom container conversions", intro: "From extra access to a finished room, we plan conversions around use, site and budget." }, about: { eyebrow: "Since 1983", title: "About Baltes Container", intro: "Personal advice, carefully selected containers and reliable logistics are the basis of our work." }, delivery: { eyebrow: "Delivered safely", title: "Delivery and installation", intro: "We coordinate delivery around the container, route, access and final position." }, conditions: { eyebrow: "Understand quality", title: "Container condition grades", intro: "Signs of use are normal. What matters is the technical and visual quality your application requires." }, contact: { eyebrow: "Talk to us", title: "How can we help?", intro: "Questions about stock, delivery or a conversion project? Send us a message or call us directly." }, locations: { eyebrow: "Regional service", title: "Our locations", intro: "Availability and delivery routes depend on the depot. We identify the most economical option for your project." }, faq: { eyebrow: "Clear answers", title: "Frequently asked questions", intro: "Answers about selection, condition, pricing, delivery and installation." } },
  nl: { conversions: { eyebrow: "Maatwerk", title: "Containerombouw op maat", intro: "Van extra toegang tot een complete ruimte: we plannen de ombouw op basis van gebruik, locatie en budget." }, about: { eyebrow: "Sinds 1983", title: "Over Baltes Container", intro: "Persoonlijk advies, zorgvuldig geselecteerde containers en betrouwbare logistiek vormen de basis van ons werk." }, delivery: { eyebrow: "Veilig op locatie", title: "Levering en plaatsing", intro: "We stemmen de levering af op container, route, toegang en gewenste positie." }, conditions: { eyebrow: "Kwaliteit begrijpen", title: "Conditieklassen van containers", intro: "Gebruikssporen zijn normaal. Belangrijk is welke technische en optische kwaliteit uw toepassing vraagt." }, contact: { eyebrow: "Direct contact", title: "Hoe kunnen we helpen?", intro: "Vragen over voorraad, levering of ombouw? Stuur ons een bericht of bel direct." }, locations: { eyebrow: "Regionaal bereikbaar", title: "Onze locaties", intro: "Beschikbaarheid en leverroutes hangen af van het depot. We kiezen de meest economische optie voor uw project." }, faq: { eyebrow: "Kort uitgelegd", title: "Veelgestelde vragen", intro: "Antwoorden over keuze, staat, prijzen, levering en plaatsing." } },
  it: { conversions: { eyebrow: "Soluzioni su misura", title: "Trasformazioni container personalizzate", intro: "Da un accesso aggiuntivo a uno spazio completo: progettiamo in base a uso, sito e budget." }, about: { eyebrow: "Dal 1983", title: "Chi è Baltes Container", intro: "Consulenza personale, container selezionati e logistica affidabile sono alla base del nostro lavoro." }, delivery: { eyebrow: "A destinazione in sicurezza", title: "Consegna e posa", intro: "Coordiniamo la consegna in base a container, percorso, accesso e posizione finale." }, conditions: { eyebrow: "Valutare la qualità", title: "Classi di condizione dei container", intro: "I segni d'uso sono normali. Conta la qualità tecnica ed estetica richiesta dall'utilizzo." }, contact: { eyebrow: "Contatto diretto", title: "Come possiamo aiutarti?", intro: "Domande su stock, consegna o trasformazioni? Scrivici o chiamaci." }, locations: { eyebrow: "Servizio regionale", title: "Le nostre sedi", intro: "Disponibilità e percorsi dipendono dal deposito. Scegliamo l'opzione più conveniente per il progetto." }, faq: { eyebrow: "Risposte chiare", title: "Domande frequenti", intro: "Risposte su scelta, condizioni, prezzi, consegna e posa." } },
  cs: { conversions: { eyebrow: "Řešení na míru", title: "Úpravy kontejnerů na míru", intro: "Od dodatečného vstupu po hotový prostor: úpravy plánujeme podle využití, místa a rozpočtu." }, about: { eyebrow: "Od roku 1983", title: "O Baltes Container", intro: "Osobní poradenství, pečlivě vybrané kontejnery a spolehlivá logistika jsou základem naší práce." }, delivery: { eyebrow: "Bezpečně na místo", title: "Doprava a usazení", intro: "Dopravu koordinujeme podle kontejneru, trasy, přístupu a cílové polohy." }, conditions: { eyebrow: "Jak hodnotit kvalitu", title: "Třídy stavu kontejnerů", intro: "Stopy používání jsou běžné. Rozhoduje technická a vzhledová kvalita potřebná pro váš účel." }, contact: { eyebrow: "Přímý kontakt", title: "Jak vám můžeme pomoci?", intro: "Dotazy ke skladu, dopravě nebo úpravám? Napište nám nebo zavolejte." }, locations: { eyebrow: "Regionální dostupnost", title: "Naše pobočky", intro: "Dostupnost a dopravní trasy závisí na depu. Vybereme ekonomicky nejvhodnější variantu." }, faq: { eyebrow: "Stručné odpovědi", title: "Časté dotazy", intro: "Odpovědi k výběru, stavu, cenám, dopravě a usazení." } },
  es: { conversions: { eyebrow: "Soluciones a medida", title: "Transformaciones de contenedores", intro: "Desde un acceso adicional hasta un espacio terminado: planificamos según uso, ubicación y presupuesto." }, about: { eyebrow: "Desde 1983", title: "Sobre Baltes Container", intro: "El asesoramiento personal, los contenedores seleccionados y la logística fiable son la base de nuestro trabajo." }, delivery: { eyebrow: "A destino con seguridad", title: "Entrega e instalación", intro: "Coordinamos la entrega según el contenedor, la ruta, el acceso y la posición final." }, conditions: { eyebrow: "Entender la calidad", title: "Grados de estado de contenedores", intro: "Las marcas de uso son normales. Importa la calidad técnica y estética que requiere la aplicación." }, contact: { eyebrow: "Contacto directo", title: "¿Cómo podemos ayudarte?", intro: "¿Preguntas sobre stock, entrega o una transformación? Escríbenos o llámanos." }, locations: { eyebrow: "Servicio regional", title: "Nuestras ubicaciones", intro: "La disponibilidad y las rutas dependen del depósito. Elegimos la opción más económica para el proyecto." }, faq: { eyebrow: "Respuestas claras", title: "Preguntas frecuentes", intro: "Respuestas sobre elección, estado, precios, entrega e instalación." } },
};

const commonSections: Record<Exclude<Locale, "de">, PageSection[]> = {
  en: [{ title: "What we clarify with you", paragraphs: ["We review the intended use, required specification, site conditions, availability and logistics before confirming the solution."], bullets: ["Clear product and condition information", "Site-specific delivery planning", "A direct contact for questions"] }, { title: "Get project-specific advice", paragraphs: ["Every location and requirement is different. Send us the key details and, where useful, photos or a site plan."] }],
  nl: [{ title: "Wat we met u afstemmen", paragraphs: ["We controleren gebruik, specificatie, locatie, beschikbaarheid en logistiek voordat we de oplossing bevestigen."], bullets: ["Duidelijke product- en conditiegegevens", "Leverplanning voor uw locatie", "Een direct aanspreekpunt"] }, { title: "Projectgericht advies", paragraphs: ["Elke locatie en toepassing is anders. Stuur de belangrijkste gegevens en indien nuttig foto's of een plattegrond."] }],
  it: [{ title: "Cosa verifichiamo con te", paragraphs: ["Controlliamo utilizzo, specifiche, condizioni del sito, disponibilità e logistica prima di confermare la soluzione."], bullets: ["Informazioni chiare su prodotto e condizione", "Consegna pianificata per il sito", "Un referente diretto"] }, { title: "Consulenza per il progetto", paragraphs: ["Ogni luogo e necessità è diverso. Inviaci i dettagli principali e, se utili, foto o una planimetria."] }],
  cs: [{ title: "Co s vámi ověříme", paragraphs: ["Před potvrzením řešení prověříme využití, parametry, podmínky místa, dostupnost a logistiku."], bullets: ["Jasné údaje o produktu a stavu", "Doprava plánovaná pro konkrétní místo", "Přímá kontaktní osoba"] }, { title: "Poradenství pro váš projekt", paragraphs: ["Každé místo i požadavek jsou jiné. Zašlete hlavní údaje a případně fotografie či plánek."] }],
  es: [{ title: "Qué revisamos contigo", paragraphs: ["Antes de confirmar la solución revisamos uso, especificaciones, condiciones del lugar, disponibilidad y logística."], bullets: ["Información clara de producto y estado", "Entrega planificada para la ubicación", "Un contacto directo"] }, { title: "Asesoramiento para tu proyecto", paragraphs: ["Cada lugar y necesidad es diferente. Envíanos los datos principales y, si ayuda, fotos o un plano."] }],
};

for (const locale of ["en", "nl", "it", "cs", "es"] as const) {
  for (const key of Object.keys(pageTranslations[locale]) as Array<keyof typeof pageTranslations.en>) {
    simplePages[locale][key] = { ...pageTranslations[locale][key], sections: key === "contact" || key === "locations" ? [] : commonSections[locale] };
  }
}

for (const locale of ["de", "en", "nl", "it", "cs", "es"] as const) {
  for (const key of recoveredKeys) {
    const page = simplePages[locale][key];
    const sections = recoveredPageSections[locale][key];
    if (page && sections) simplePages[locale][key] = { ...page, sections };
  }
}

const companyPages: Record<Locale, { about: PageContent; locations: PageContent; faqSections: PageSection[] }> = {
  de: {
    about: { eyebrow: "NORDIKA Container GmbH", title: "Über NORDIKA Container", intro: "Persönliche Beratung, sorgfältig ausgewählte Container und verlässliche Logistik bilden die Grundlage unserer Arbeit.", sections: [{ title: "Containerlösungen mit klarem Fokus", paragraphs: ["NORDIKA Container GmbH begleitet Unternehmen, öffentliche Auftraggeber und Privatkunden bei der Auswahl neuer und gebrauchter Container – von der ersten Anfrage bis zur abgestimmten Lieferung."] }, { title: "Unser Anspruch", paragraphs: ["Wir erklären Zustände und technische Daten verständlich, kalkulieren transparent und empfehlen Lösungen, die zum tatsächlichen Bedarf passen."], bullets: ["Direkte Ansprechpartner", "Nachvollziehbare Produktdaten", "Projektbezogene Lieferplanung", "Zentrale Betreuung aus Mainz"] }, { title: "Unternehmenssitz", paragraphs: ["Nikolaus-Otto-Str. 9, D-55129 Mainz. Von hier aus koordinieren wir Beratung, Angebote und Projektabwicklung."] }] },
    locations: { eyebrow: "NORDIKA Container GmbH", title: "Unsere Adresse", intro: "Sie erreichen uns in der Nikolaus-Otto-Str. 9, D-55129 Mainz. Bitte vereinbaren Sie einen Termin, bevor Sie uns besuchen.", sections: [] },
    faqSections: [{ title: "Sind die Preise inklusive Mehrwertsteuer?", paragraphs: ["Als Bruttopreis gekennzeichnete Katalogpreise enthalten die deutsche Mehrwertsteuer. Für innergemeinschaftliche Lieferungen an Unternehmen mit gültiger EU-USt-IdNr. kann nach erfolgreicher Prüfung eine steuerfreie Lieferung gelten. Liefer- und Aufstellkosten werden individuell berechnet und vor Vertragsschluss separat bestätigt."] }, { title: "Kann ich einen Container besichtigen?", paragraphs: ["Besichtigungen sind nur nach vorheriger Terminbestätigung möglich. Nennen Sie uns die gewünschte Artikelnummer, damit wir die Verfügbarkeit prüfen können."] }, { title: "Wie schnell kann geliefert werden?", paragraphs: ["Bearbeitungszeit, Transportzeit und geschätzte Gesamtdauer werden nach dem Liefergebiet ausgewiesen und im konkreten Angebot bestätigt. Die allgemeinen Zeitspannen stehen in den Versand- und Lieferbedingungen; die dort markierten Konfigurationswerte müssen vor Veröffentlichung noch geschäftlich freigegeben werden."] }, { title: "Wohin liefert NORDIKA Container?", paragraphs: ["Wir liefern deutschlandweit und nach vorheriger Routen- und Frachtprüfung in alle EU-Mitgliedstaaten. Die konkrete Transportmöglichkeit und Lieferzeit werden vor Auftragserteilung bestätigt."] }, { title: "Was ist bei einer beschädigten oder falschen Lieferung zu tun?", paragraphs: ["Informieren Sie den Fahrer, dokumentieren Sie die Abweichung mit Fotos und vermerken Sie sichtbare Schäden nach Möglichkeit auf den Lieferunterlagen. Kontaktieren Sie uns sofort mit der Auftragsnummer und veranlassen Sie keinen eigenen Schwerlast-Rücktransport."] }, { title: "Brauche ich eine Genehmigung?", paragraphs: ["Das kann vom Aufstellort, der Nutzungsdauer und dem geplanten Einsatz abhängen. Bitte klären Sie öffentlich-rechtliche Anforderungen mit der zuständigen Behörde."] }],
  },
  en: {
    about: { eyebrow: "NORDIKA Container GmbH", title: "About NORDIKA Container", intro: "Personal advice, carefully selected containers and reliable logistics are the basis of our work.", sections: [{ title: "Container solutions with a clear focus", paragraphs: ["NORDIKA Container GmbH supports businesses, public-sector customers and private buyers in selecting new and used containers, from the first enquiry to coordinated delivery."] }, { title: "Our standard", paragraphs: ["We explain conditions and technical data clearly, calculate transparently and recommend solutions that fit the actual requirement."], bullets: ["Direct contacts", "Traceable product information", "Project-specific delivery planning", "Central support from Mainz"] }, { title: "Registered address", paragraphs: ["Nikolaus-Otto-Str. 9, D-55129 Mainz, Germany. We coordinate advice, quotations and project delivery from this address."] }] },
    locations: { eyebrow: "NORDIKA Container GmbH", title: "Our address", intro: "You can find us at Nikolaus-Otto-Str. 9, D-55129 Mainz, Germany. Please arrange an appointment before visiting.", sections: [] },
    faqSections: [{ title: "Do prices include VAT?", paragraphs: ["Catalogue prices marked as gross include German VAT. Delivery and installation costs are confirmed separately."] }, { title: "Can I inspect a container?", paragraphs: ["Viewings are available only after prior appointment confirmation. Tell us the product number so that we can check availability."] }, { title: "How quickly can delivery be arranged?", paragraphs: ["Timing depends on availability, the delivery route, crane requirements and scheduling. We confirm a realistic window after review."] }, { title: "Do I need permission?", paragraphs: ["This can depend on the installation site, duration and intended use. Please check public-law requirements with the relevant authority."] }],
  },
  nl: {
    about: { eyebrow: "NORDIKA Container GmbH", title: "Over NORDIKA Container", intro: "Persoonlijk advies, zorgvuldig geselecteerde containers en betrouwbare logistiek vormen de basis van ons werk.", sections: [{ title: "Containeroplossingen met duidelijke focus", paragraphs: ["NORDIKA Container GmbH begeleidt bedrijven, publieke opdrachtgevers en particulieren bij de keuze van nieuwe en gebruikte containers, van aanvraag tot afgestemde levering."] }, { title: "Onze standaard", paragraphs: ["We leggen conditie en technische gegevens duidelijk uit, calculeren transparant en adviseren oplossingen die bij de behoefte passen."], bullets: ["Directe contactpersonen", "Controleerbare productinformatie", "Projectgerichte leverplanning", "Centrale begeleiding vanuit Mainz"] }, { title: "Vestigingsadres", paragraphs: ["Nikolaus-Otto-Str. 9, D-55129 Mainz, Duitsland. Vanuit dit adres coördineren wij advies, offertes en projectafhandeling."] }] },
    locations: { eyebrow: "NORDIKA Container GmbH", title: "Ons adres", intro: "U vindt ons aan de Nikolaus-Otto-Str. 9, D-55129 Mainz, Duitsland. Maak vóór uw bezoek een afspraak.", sections: [] },
    faqSections: [{ title: "Zijn de prijzen inclusief btw?", paragraphs: ["Als brutoprijs vermelde catalogusprijzen bevatten Duitse btw. Levering en plaatsing worden apart bevestigd."] }, { title: "Kan ik een container bezichtigen?", paragraphs: ["Bezichtiging is alleen mogelijk na bevestiging van een afspraak. Vermeld het productnummer zodat we de beschikbaarheid kunnen controleren."] }, { title: "Hoe snel kan worden geleverd?", paragraphs: ["De termijn hangt af van beschikbaarheid, leverroute, kraanbehoefte en planning. Na controle bevestigen we een realistische periode."] }, { title: "Heb ik een vergunning nodig?", paragraphs: ["Dit kan afhangen van plaats, gebruiksduur en toepassing. Controleer publiekrechtelijke eisen bij de bevoegde instantie."] }],
  },
  it: {
    about: { eyebrow: "NORDIKA Container GmbH", title: "Chi è NORDIKA Container", intro: "Consulenza personale, container selezionati e logistica affidabile sono alla base del nostro lavoro.", sections: [{ title: "Soluzioni container con un obiettivo chiaro", paragraphs: ["NORDIKA Container GmbH segue aziende, enti pubblici e privati nella scelta di container nuovi e usati, dalla prima richiesta alla consegna concordata."] }, { title: "Il nostro standard", paragraphs: ["Spieghiamo condizioni e dati tecnici in modo chiaro, calcoliamo con trasparenza e proponiamo soluzioni adatte all'esigenza reale."], bullets: ["Referenti diretti", "Informazioni prodotto verificabili", "Consegna pianificata per il progetto", "Gestione centrale da Mainz"] }, { title: "Sede legale", paragraphs: ["Nikolaus-Otto-Str. 9, D-55129 Mainz, Germania. Da questo indirizzo coordiniamo consulenza, offerte e progetti."] }] },
    locations: { eyebrow: "NORDIKA Container GmbH", title: "Il nostro indirizzo", intro: "Siamo in Nikolaus-Otto-Str. 9, D-55129 Mainz, Germania. Concorda un appuntamento prima della visita.", sections: [] },
    faqSections: [{ title: "I prezzi includono l'IVA?", paragraphs: ["I prezzi lordi del catalogo includono l'IVA tedesca. Consegna e posa vengono confermate separatamente."] }, { title: "Posso vedere un container?", paragraphs: ["Le visite sono possibili solo dopo conferma dell'appuntamento. Indica il codice prodotto per consentirci di verificarne la disponibilità."] }, { title: "Quanto tempo richiede la consegna?", paragraphs: ["Dipende da disponibilità, percorso, gru necessaria e programmazione. Dopo la verifica confermiamo un periodo realistico."] }, { title: "Serve un'autorizzazione?", paragraphs: ["Può dipendere dal luogo, dalla durata e dall'uso. Verifica i requisiti di diritto pubblico con l'autorità competente."] }],
  },
  cs: {
    about: { eyebrow: "NORDIKA Container GmbH", title: "O NORDIKA Container", intro: "Osobní poradenství, pečlivě vybrané kontejnery a spolehlivá logistika jsou základem naší práce.", sections: [{ title: "Kontejnerová řešení s jasným zaměřením", paragraphs: ["NORDIKA Container GmbH podporuje firmy, veřejné zákazníky i soukromé kupující při výběru nových a použitých kontejnerů od první poptávky po dohodnutou dopravu."] }, { title: "Náš standard", paragraphs: ["Srozumitelně vysvětlujeme stav a technické údaje, transparentně kalkulujeme a doporučujeme řešení podle skutečné potřeby."], bullets: ["Přímé kontakty", "Dohledatelné informace o produktech", "Doprava plánovaná pro projekt", "Centrální podpora z Mohuče"] }, { title: "Sídlo společnosti", paragraphs: ["Nikolaus-Otto-Str. 9, D-55129 Mainz, Německo. Z této adresy koordinujeme poradenství, nabídky a realizaci projektů."] }] },
    locations: { eyebrow: "NORDIKA Container GmbH", title: "Naše adresa", intro: "Najdete nás na adrese Nikolaus-Otto-Str. 9, D-55129 Mainz, Německo. Před návštěvou si prosím domluvte termín.", sections: [] },
    faqSections: [{ title: "Zahrnují ceny DPH?", paragraphs: ["Katalogové ceny označené jako brutto zahrnují německou DPH. Doprava a usazení se potvrzují samostatně."] }, { title: "Mohu si kontejner prohlédnout?", paragraphs: ["Prohlídka je možná pouze po předchozím potvrzení termínu. Uveďte číslo produktu, abychom ověřili dostupnost."] }, { title: "Jak rychle lze zajistit dopravu?", paragraphs: ["Termín závisí na dostupnosti, trase, potřebném jeřábu a plánování. Po ověření potvrdíme realistické období."] }, { title: "Potřebuji povolení?", paragraphs: ["Záleží na místě, délce využití a účelu. Požadavky veřejného práva ověřte u příslušného úřadu."] }],
  },
  es: {
    about: { eyebrow: "NORDIKA Container GmbH", title: "Sobre NORDIKA Container", intro: "El asesoramiento personal, los contenedores seleccionados y la logística fiable son la base de nuestro trabajo.", sections: [{ title: "Soluciones de contenedores con un enfoque claro", paragraphs: ["NORDIKA Container GmbH acompaña a empresas, clientes públicos y particulares en la elección de contenedores nuevos y usados, desde la primera consulta hasta la entrega coordinada."] }, { title: "Nuestro estándar", paragraphs: ["Explicamos el estado y los datos técnicos con claridad, calculamos de forma transparente y recomendamos soluciones ajustadas a la necesidad real."], bullets: ["Contactos directos", "Información de producto verificable", "Entrega planificada para el proyecto", "Gestión central desde Maguncia"] }, { title: "Domicilio social", paragraphs: ["Nikolaus-Otto-Str. 9, D-55129 Mainz, Alemania. Desde esta dirección coordinamos asesoramiento, presupuestos y proyectos."] }] },
    locations: { eyebrow: "NORDIKA Container GmbH", title: "Nuestra dirección", intro: "Estamos en Nikolaus-Otto-Str. 9, D-55129 Mainz, Alemania. Concierta una cita antes de visitarnos.", sections: [] },
    faqSections: [{ title: "¿Los precios incluyen IVA?", paragraphs: ["Los precios brutos del catálogo incluyen el IVA alemán. La entrega y la instalación se confirman por separado."] }, { title: "¿Puedo visitar un contenedor?", paragraphs: ["Las visitas solo son posibles tras confirmar una cita. Indica la referencia para que podamos comprobar la disponibilidad."] }, { title: "¿Cuánto tarda la entrega?", paragraphs: ["Depende de la disponibilidad, la ruta, la grúa necesaria y la planificación. Tras revisarlo confirmamos un plazo realista."] }, { title: "¿Necesito permiso?", paragraphs: ["Puede depender del lugar, la duración y el uso. Consulta los requisitos de derecho público con la autoridad competente."] }],
  },
};

for (const locale of locales) {
  simplePages[locale].about = companyPages[locale].about;
  simplePages[locale].locations = companyPages[locale].locations;
  const faq = simplePages[locale].faq;
  if (faq) simplePages[locale].faq = { ...faq, sections: companyPages[locale].faqSections };
}

export function getSimplePage(locale: Locale, key: RouteKey): PageContent | undefined {
  return simplePages[locale][key];
}

export function getCategoryBySlug(locale: Locale, slug: string): CategoryDefinition | undefined {
  return categories.find((category) => category.slugs[locale] === slug);
}

export function getGuideBySlug(locale: Locale, slug: string): GuideDefinition | undefined {
  return guides.find((guide) => guide.slugs[locale] === slug);
}
