import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Camera, Check, CircleDollarSign, MapPin, PackageCheck, Ruler, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getSimplePage, guides, type PageContent } from "@/lib/content";
import { IMAGES } from "@/lib/assets";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";

type DeliveryCopy = {
  jumpLabel: string;
  jumpLinks: string[];
  heroLabel: string;
  heroTitle: string;
  heroText: string;
  heroFacts: string[];
  methodsLabel: string;
  methodsTitle: string;
  methodsText: string;
  methods: Array<{ title: string; text: string; note: string }>;
  examplesLabel: string;
  examplesTitle: string;
  examplesText: string;
  examples: Array<{ tag: string; title: string; text: string; facts: string[] }>;
  preparationLabel: string;
  preparationTitle: string;
  preparationText: string;
  checklist: string[];
  processLabel: string;
  processTitle: string;
  process: Array<{ title: string; text: string }>;
  costsLabel: string;
  costsTitle: string;
  costsText: string;
  costFactors: string[];
  linksLabel: string;
  linksTitle: string;
  linksText: string;
  sizeGuide: string;
  siteGuide: string;
  catalogue: string;
  containerTypes: string;
  faq: string;
  conversions: string;
  ctaTitle: string;
  ctaText: string;
};

const deliveryCopy: Record<Locale, DeliveryCopy> = {
  de: {
    jumpLabel: "Auf dieser Seite", jumpLinks: ["Entladearten", "Praxisbeispiele", "Standort vorbereiten", "Kostenfaktoren"],
    heroLabel: "Schwerlastlogistik, verständlich geplant", heroTitle: "Containerlieferung beginnt lange vor der Anfahrt.", heroText: "Containergröße, Strecke, Zufahrt, Kranreichweite und die gewünschte Endposition müssen zusammenpassen. Wir prüfen diese Punkte vor der Bestätigung, damit Fahrzeug und Entladeart zum Standort passen.", heroFacts: ["Deutschlandweite Lieferung", "Kran- oder Selbstentladung", "Standortprüfung vor Bestätigung"],
    methodsLabel: "Entladearten", methodsTitle: "Das passende Fahrzeug für den Standort", methodsText: "Nicht jeder Container und nicht jeder Aufstellort benötigt dieselbe Logistik. Die Entladeart wird im Angebot eindeutig festgehalten.", methods: [
      { title: "Kranentladung", text: "Ein Lkw mit Ladekran hebt den Container vom Fahrzeug auf den vorbereiteten Stellplatz.", note: "Entscheidend: Reichweite, Hindernisse, Untergrund und gewünschte Ausrichtung." },
      { title: "Bordsteinkante / Selbstentladung", text: "Der Container wird bis zur vereinbarten, befahrbaren Übergabestelle gebracht; geeignete Entladung organisiert der Kunde.", note: "Entladegerät und sichere Koordination müssen vor Ankunft bereitstehen." },
      { title: "Projektbezogene Sonderplanung", text: "Bei engen Zufahrten, großer Reichweite, mehreren Containern oder Sondermaßen prüfen wir zusätzliche Geräte und Abläufe.", note: "Fotos, Maße und ein Lageplan ermöglichen eine belastbare Vorprüfung." },
    ],
    examplesLabel: "Praxisbeispiele", examplesTitle: "Wie typische Lieferungen konkret aussehen", examplesText: "Die folgenden Szenarien zeigen, welche Angaben die Planung in der Praxis bestimmen. Das gezeigte Foto stammt aus einer realen Containeranlieferung.", examples: [
      { tag: "20-Fuß-Lagercontainer", title: "Gewerbehof mit direkter Zufahrt", text: "Der Lkw kann bis neben den vorbereiteten Platz fahren. Ein Ladekran setzt den Container auf vier tragfähige Auflagepunkte.", facts: ["Kurze Kranreichweite", "Ebener, befestigter Hof", "Türen zeigen zur gewünschten Arbeitsseite"] },
      { tag: "40-Fuß-High-Cube", title: "Industriefläche mit Rangierbedarf", text: "Das lange Fahrzeug benötigt eine ausreichend breite Einfahrt, freie Kurven und deutlich mehr Rangier- und Entladeraum.", facts: ["Gesamte Zufahrt fotografieren", "Höhenbegrenzungen prüfen", "Aufstellrichtung vorab markieren"] },
      { tag: "Büro- oder Kühlcontainer", title: "Aufstellung mit Anschlussplanung", text: "Neben der sicheren Position werden Auflagepunkte, Türseite und die spätere Strom- oder Medienführung berücksichtigt.", facts: ["Anschlüsse erst nach Übergabe herstellen", "Container waagerecht ausrichten", "Wartungszugang freihalten"] },
    ],
    preparationLabel: "Standort vorbereiten", preparationTitle: "Diese Informationen brauchen wir vor der Disposition", preparationText: "Gute Fotos und genaue Maße verhindern Rückfragen und helfen, unnötige Anfahrten oder ungeeignete Fahrzeuge zu vermeiden.", checklist: ["Vollständige Lieferadresse und erreichbare Kontaktperson", "Fotos vom Straßenanschluss bis zum Stellplatz", "Breite und Höhe von Toren, Engstellen und Durchfahrten", "Kurven, Gefälle, Äste, Leitungen und parkende Fahrzeuge", "Untergrund und vorgesehene Auflagepunkte", "Gewünschte Türseite und Längsausrichtung", "Verfügbare Rangier- und Kranfläche", "Erforderliche Genehmigungen oder Zufahrtsfreigaben"],
    processLabel: "Ablauf", processTitle: "Von der Anfrage bis zur Übergabe", process: [
      { title: "Container und Zielort", text: "Sie senden Artikel oder Containerart, Postleitzahl, vollständige Adresse und gewünschte Position." },
      { title: "Standortprüfung", text: "Wir bewerten Strecke, Zufahrt, Untergrund, Entladeart und mögliche Hindernisse." },
      { title: "Schriftliche Bestätigung", text: "Angebot oder Auftrag nennt Fahrzeug, Leistungsumfang, Lieferkosten und voraussichtlichen Zeitraum." },
      { title: "Anlieferung und Sichtprüfung", text: "Der Container wird übergeben oder aufgestellt. Sichtbare Abweichungen werden direkt dokumentiert." },
    ],
    costsLabel: "Lieferkosten", costsTitle: "Warum jede Lieferung individuell kalkuliert wird", costsText: "Der Produktpreis enthält die Lieferung nur, wenn sie ausdrücklich ausgewiesen ist. Den bestätigten Transportpreis erhalten Sie vor Vertragsschluss.", costFactors: ["Entfernung und Route", "10-, 20- oder 40-Fuß-Container", "Anzahl und Bündelungsmöglichkeit", "Kran- oder Selbstentladung", "Kranreichweite und Sondergerät", "Zufahrt, Wartezeit und Standortbedingungen"],
    linksLabel: "Weiter planen", linksTitle: "Von hier direkt zum nächsten Schritt", linksText: "Vergleichen Sie Maße und Typen, bereiten Sie den Stellplatz vor oder senden Sie die Angaben direkt mit Ihrer Anfrage.", sizeGuide: "Größen & Abmessungen", siteGuide: "Aufstellort vorbereiten", catalogue: "Verfügbare Container", containerTypes: "Containertypen", faq: "Häufige Fragen", conversions: "Containerumbau", ctaTitle: "Lieferung konkret prüfen lassen", ctaText: "Senden Sie Postleitzahl, Containergröße, Entladeart und Fotos der Zufahrt. Wir prüfen die passende Logistik zusammen mit Ihrem Containerangebot.",
  },
  en: {
    jumpLabel: "On this page", jumpLinks: ["Unloading methods", "Real-world examples", "Prepare the site", "Cost factors"],
    heroLabel: "Heavy-haul logistics, clearly planned", heroTitle: "Container delivery starts long before the truck arrives.", heroText: "Container size, route, access, crane reach and the final position must work together. We review them before confirmation so that the vehicle and unloading method suit the site.", heroFacts: ["Delivery throughout Germany", "Crane or self-unloading", "Site review before confirmation"],
    methodsLabel: "Unloading methods", methodsTitle: "The right vehicle for the site", methodsText: "Not every container or placement site needs the same logistics. The agreed unloading method is stated clearly in the quotation.", methods: [
      { title: "Crane unloading", text: "A truck-mounted crane lifts the container from the vehicle onto the prepared position.", note: "Key factors: reach, obstacles, ground conditions and final orientation." },
      { title: "Curbside / self-unloading", text: "The container is transported to the agreed accessible handover point; the customer provides suitable unloading equipment.", note: "Equipment and safe coordination must be ready before the vehicle arrives." },
      { title: "Project-specific planning", text: "Restricted access, long reach, multiple containers or unusual dimensions may require additional equipment and sequencing.", note: "Photos, measurements and a site plan enable a reliable initial assessment." },
    ],
    examplesLabel: "Real-world examples", examplesTitle: "What typical deliveries look like in practice", examplesText: "These scenarios show which details shape an actual delivery plan. The featured image comes from a real container delivery.", examples: [
      { tag: "20 ft storage container", title: "Commercial yard with direct access", text: "The truck can drive alongside the prepared position. Its crane places the container on four load-bearing support points.", facts: ["Short crane reach", "Level, paved yard", "Doors face the required working side"] },
      { tag: "40 ft high cube", title: "Industrial site requiring manoeuvring space", text: "The long vehicle needs a wide entrance, clear bends and substantially more space for manoeuvring and unloading.", facts: ["Photograph the complete access route", "Check overhead restrictions", "Mark the final orientation in advance"] },
      { tag: "Office or refrigerated unit", title: "Placement coordinated with services", text: "Alongside safe positioning, support points, door orientation and the later route of power or other services are considered.", facts: ["Connect services only after handover", "Level the container correctly", "Keep maintenance access clear"] },
    ],
    preparationLabel: "Prepare the site", preparationTitle: "What we need before scheduling", preparationText: "Clear photographs and accurate measurements reduce follow-up questions and help avoid unsuccessful journeys or unsuitable vehicles.", checklist: ["Complete delivery address and reachable site contact", "Photos from the public road through to the final position", "Width and height of gates, restrictions and passages", "Bends, slopes, branches, cables and parked vehicles", "Ground conditions and intended support points", "Required door side and length orientation", "Available manoeuvring and crane area", "Any permits or access authorisations"],
    processLabel: "Process", processTitle: "From enquiry to handover", process: [
      { title: "Container and destination", text: "Send the item or container type, postcode, full address and required final position." },
      { title: "Site review", text: "We assess route, access, ground, unloading method and possible obstacles." },
      { title: "Written confirmation", text: "The quotation or order confirms the vehicle, scope, delivery cost and expected timeframe." },
      { title: "Delivery and inspection", text: "The container is handed over or positioned. Any visible discrepancy is documented immediately." },
    ],
    costsLabel: "Delivery costs", costsTitle: "Why every delivery is calculated individually", costsText: "The product price includes delivery only when this is stated expressly. You receive the confirmed transport price before entering into the contract.", costFactors: ["Distance and route", "10, 20 or 40 ft container", "Quantity and consolidation", "Crane or self-unloading", "Crane reach and specialist equipment", "Access, waiting time and site conditions"],
    linksLabel: "Continue planning", linksTitle: "Go directly to the next useful step", linksText: "Compare sizes and types, prepare the placement site or send the information with your enquiry.", sizeGuide: "Sizes & dimensions", siteGuide: "Prepare the container site", catalogue: "Available containers", containerTypes: "Container types", faq: "Frequently asked questions", conversions: "Container conversions", ctaTitle: "Have your delivery reviewed", ctaText: "Send the postcode, container size, unloading method and access photos. We will review suitable logistics together with your container quotation.",
  },
  nl: {
    jumpLabel: "Op deze pagina", jumpLinks: ["Losmethoden", "Praktijkvoorbeelden", "Locatie voorbereiden", "Kostenfactoren"],
    heroLabel: "Zwaar transport duidelijk gepland", heroTitle: "Containerlevering begint ruim vóór de aankomst.", heroText: "Containermaat, route, toegang, kraanbereik en eindpositie moeten op elkaar aansluiten. Wij controleren dit vóór bevestiging.", heroFacts: ["Levering in heel Duitsland", "Kraan of zelf lossen", "Locatiecontrole vóór bevestiging"],
    methodsLabel: "Losmethoden", methodsTitle: "Het juiste voertuig voor de locatie", methodsText: "Niet elke container en locatie vraagt dezelfde logistiek. De afgesproken losmethode staat duidelijk in de offerte.", methods: [{ title: "Lossen met kraan", text: "Een autolaadkraan plaatst de container op de voorbereide plek.", note: "Bereik, obstakels, ondergrond en richting zijn bepalend." }, { title: "Stoeprand / zelf lossen", text: "Wij leveren tot het afgesproken bereikbare punt; de klant regelt geschikt losmaterieel.", note: "Materieel en veilige coördinatie moeten vooraf gereed zijn." }, { title: "Projectplanning", text: "Smalle toegang, groot bereik of meerdere containers kunnen extra materieel vragen.", note: "Foto's, maten en een situatietekening helpen bij de beoordeling." }],
    examplesLabel: "Praktijkvoorbeelden", examplesTitle: "Hoe typische leveringen eruitzien", examplesText: "Deze scenario's tonen welke details de planning bepalen. De foto is afkomstig van een echte containerlevering.", examples: [{ tag: "20 ft opslagcontainer", title: "Bedrijfsterrein met directe toegang", text: "De vrachtwagen rijdt naast de plek en de kraan zet de container op vier draagpunten.", facts: ["Kort kraanbereik", "Vlak verhard terrein", "Deuren aan de gewenste zijde"] }, { tag: "40 ft high cube", title: "Industrieterrein met manoeuvreerruimte", text: "Het lange voertuig vereist een brede ingang, vrije bochten en voldoende losruimte.", facts: ["Volledige route fotograferen", "Hoogte controleren", "Richting vooraf markeren"] }, { tag: "Kantoor- of koelcontainer", title: "Plaatsing met aansluitplanning", text: "Steunpunten, deurzijde en latere kabel- of leidingroutes worden meegenomen.", facts: ["Aansluiten na overdracht", "Container waterpas", "Onderhoudstoegang vrij"] }],
    preparationLabel: "Locatie voorbereiden", preparationTitle: "Wat wij nodig hebben vóór planning", preparationText: "Duidelijke foto's en exacte maten voorkomen vertraging en een ongeschikt voertuig.", checklist: ["Volledig adres en contactpersoon", "Foto's van openbare weg tot plaats", "Breedte en hoogte van poorten", "Bochten, hellingen, takken en kabels", "Ondergrond en steunpunten", "Gewenste deur- en lengterichting", "Manoeuvreer- en kraanruimte", "Vergunningen en toegangsrechten"],
    processLabel: "Proces", processTitle: "Van aanvraag tot overdracht", process: [{ title: "Container en bestemming", text: "Stuur type, postcode, adres en eindpositie." }, { title: "Locatiecontrole", text: "Wij beoordelen route, toegang, bodem en losmethode." }, { title: "Schriftelijke bevestiging", text: "Offerte of order noemt voertuig, kosten en termijn." }, { title: "Levering en controle", text: "De container wordt overgedragen of geplaatst en zichtbaar gecontroleerd." }],
    costsLabel: "Leveringskosten", costsTitle: "Waarom elke levering apart wordt berekend", costsText: "Levering is alleen inbegrepen als dit uitdrukkelijk vermeld staat. De transportprijs wordt vooraf bevestigd.", costFactors: ["Afstand en route", "10, 20 of 40 ft", "Aantal containers", "Kraan of zelf lossen", "Kraanbereik", "Toegang en locatie"],
    linksLabel: "Verder plannen", linksTitle: "Direct naar de volgende stap", linksText: "Vergelijk maten en typen, bereid de locatie voor of stuur een aanvraag.", sizeGuide: "Maten & afmetingen", siteGuide: "Containerlocatie voorbereiden", catalogue: "Beschikbare containers", containerTypes: "Containertypen", faq: "Veelgestelde vragen", conversions: "Containerombouw", ctaTitle: "Laat uw levering controleren", ctaText: "Stuur postcode, containermaat, losmethode en foto's van de toegang.",
  },
  it: {
    jumpLabel: "In questa pagina", jumpLinks: ["Metodi di scarico", "Esempi pratici", "Preparare il sito", "Fattori di costo"],
    heroLabel: "Logistica pesante pianificata con chiarezza", heroTitle: "La consegna inizia molto prima dell'arrivo del camion.", heroText: "Dimensione, percorso, accesso, sbraccio della gru e posizione finale devono essere compatibili. Li verifichiamo prima della conferma.", heroFacts: ["Consegna in tutta la Germania", "Gru o scarico autonomo", "Verifica del sito prima della conferma"],
    methodsLabel: "Metodi di scarico", methodsTitle: "Il veicolo adatto al sito", methodsText: "Ogni container e sito richiede una logistica adeguata. Il metodo concordato è indicato nell'offerta.", methods: [{ title: "Scarico con gru", text: "Una gru sul camion posa il container sulla posizione preparata.", note: "Contano sbraccio, ostacoli, terreno e orientamento." }, { title: "Bordo strada / scarico autonomo", text: "Consegniamo al punto accessibile concordato; il cliente organizza lo scarico.", note: "Attrezzatura e coordinamento devono essere pronti." }, { title: "Pianificazione speciale", text: "Accessi stretti, lungo sbraccio o più container possono richiedere mezzi aggiuntivi.", note: "Foto, misure e planimetria aiutano la verifica." }],
    examplesLabel: "Esempi pratici", examplesTitle: "Come avvengono consegne tipiche", examplesText: "Gli scenari mostrano i dati che definiscono il piano. La foto proviene da una consegna reale.", examples: [{ tag: "Container deposito 20 ft", title: "Piazzale con accesso diretto", text: "Il camion affianca la posizione e la gru posa il container su quattro appoggi.", facts: ["Sbraccio corto", "Piazzale piano", "Porte sul lato richiesto"] }, { tag: "High cube 40 ft", title: "Sito industriale con spazio di manovra", text: "Il veicolo lungo richiede ingresso ampio, curve libere e spazio di scarico.", facts: ["Fotografare il percorso", "Controllare le altezze", "Segnare l'orientamento"] }, { tag: "Unità ufficio o refrigerata", title: "Posa coordinata con gli impianti", text: "Si considerano appoggi, porte e futuri collegamenti.", facts: ["Collegare dopo la consegna", "Livellare il container", "Lasciare accesso manutenzione"] }],
    preparationLabel: "Preparare il sito", preparationTitle: "Cosa serve prima della programmazione", preparationText: "Foto chiare e misure precise evitano ritardi e mezzi non adatti.", checklist: ["Indirizzo e referente", "Foto dalla strada alla posizione", "Larghezza e altezza dei passaggi", "Curve, pendenze, rami e cavi", "Terreno e punti di appoggio", "Orientamento di porte e lunghezza", "Spazio di manovra e gru", "Permessi e autorizzazioni"],
    processLabel: "Procedura", processTitle: "Dalla richiesta alla consegna", process: [{ title: "Container e destinazione", text: "Invia tipo, CAP, indirizzo e posizione." }, { title: "Verifica del sito", text: "Valutiamo percorso, accesso, terreno e scarico." }, { title: "Conferma scritta", text: "L'offerta indica mezzo, costo e tempi." }, { title: "Consegna e controllo", text: "Il container viene consegnato o posato e controllato visivamente." }],
    costsLabel: "Costi di consegna", costsTitle: "Perché ogni consegna è calcolata singolarmente", costsText: "La consegna è inclusa solo se indicato espressamente. Il prezzo di trasporto è confermato prima del contratto.", costFactors: ["Distanza e percorso", "10, 20 o 40 ft", "Quantità", "Gru o scarico autonomo", "Sbraccio e attrezzature", "Accesso e sito"],
    linksLabel: "Continua a pianificare", linksTitle: "Vai al prossimo passo utile", linksText: "Confronta misure e tipi, prepara il sito o invia una richiesta.", sizeGuide: "Misure e dimensioni", siteGuide: "Preparare il sito", catalogue: "Container disponibili", containerTypes: "Tipi di container", faq: "Domande frequenti", conversions: "Trasformazioni", ctaTitle: "Fai verificare la consegna", ctaText: "Invia CAP, misura, metodo di scarico e foto dell'accesso.",
  },
  cs: {
    jumpLabel: "Na této stránce", jumpLinks: ["Způsoby vykládky", "Příklady", "Příprava místa", "Náklady"],
    heroLabel: "Srozumitelně plánovaná těžká logistika", heroTitle: "Doprava kontejneru začíná před příjezdem vozidla.", heroText: "Velikost, trasa, přístup, dosah jeřábu a konečná poloha musí být sladěny. Vše ověříme před potvrzením.", heroFacts: ["Doprava po celém Německu", "Jeřáb nebo vlastní vykládka", "Kontrola místa před potvrzením"],
    methodsLabel: "Způsoby vykládky", methodsTitle: "Správné vozidlo pro dané místo", methodsText: "Každý kontejner a místo vyžaduje odpovídající logistiku. Způsob vykládky je uveden v nabídce.", methods: [{ title: "Vykládka jeřábem", text: "Jeřáb na vozidle usadí kontejner na připravené místo.", note: "Rozhoduje dosah, překážky, podklad a orientace." }, { title: "Předání / vlastní vykládka", text: "Dopravíme kontejner na dohodnuté přístupné místo; zákazník zajistí vykládku.", note: "Technika a bezpečná koordinace musí být připraveny." }, { title: "Individuální plán", text: "Úzký přístup, velký dosah nebo více kontejnerů mohou vyžadovat další techniku.", note: "Fotografie, rozměry a plán místa pomohou posouzení." }],
    examplesLabel: "Příklady", examplesTitle: "Jak vypadá typická dodávka", examplesText: "Tyto scénáře ukazují údaje důležité pro plán. Fotografie pochází ze skutečné dodávky.", examples: [{ tag: "20ft skladový kontejner", title: "Areál s přímým přístupem", text: "Vozidlo přijede vedle místa a jeřáb uloží kontejner na čtyři podpěry.", facts: ["Krátký dosah", "Rovný zpevněný povrch", "Dveře správným směrem"] }, { tag: "40ft high cube", title: "Průmyslový areál s manévrováním", text: "Dlouhé vozidlo potřebuje široký vjezd, volné zatáčky a prostor k vykládce.", facts: ["Fotografie celé trasy", "Kontrola výšky", "Vyznačení orientace"] }, { tag: "Kancelářský či chladicí", title: "Usazení s plánem přípojek", text: "Zohlední se podpěry, strana dveří a budoucí vedení přípojek.", facts: ["Připojit až po předání", "Správně vyrovnat", "Volný servisní přístup"] }],
    preparationLabel: "Příprava místa", preparationTitle: "Co potřebujeme před plánováním", preparationText: "Jasné fotografie a přesné rozměry omezí zdržení a nevhodná vozidla.", checklist: ["Úplná adresa a kontakt", "Fotografie od silnice k místu", "Šířka a výška průjezdů", "Zatáčky, svahy, větve a kabely", "Podklad a podpěrné body", "Orientace dveří a délky", "Prostor pro manévrování a jeřáb", "Povolení a přístupová oprávnění"],
    processLabel: "Postup", processTitle: "Od poptávky po předání", process: [{ title: "Kontejner a cíl", text: "Pošlete typ, PSČ, adresu a polohu." }, { title: "Kontrola místa", text: "Posoudíme trasu, přístup, podklad a vykládku." }, { title: "Písemné potvrzení", text: "Nabídka uvádí vozidlo, cenu a termín." }, { title: "Dodání a kontrola", text: "Kontejner se předá nebo usadí a vizuálně zkontroluje." }],
    costsLabel: "Náklady na dopravu", costsTitle: "Proč se každá doprava počítá individuálně", costsText: "Doprava je zahrnuta jen tehdy, je-li výslovně uvedena. Cena je potvrzena před smlouvou.", costFactors: ["Vzdálenost a trasa", "10, 20 nebo 40 ft", "Počet", "Jeřáb nebo vlastní vykládka", "Dosah a technika", "Přístup a místo"],
    linksLabel: "Pokračovat v plánování", linksTitle: "Přejděte k dalšímu kroku", linksText: "Porovnejte rozměry a typy, připravte místo nebo odešlete poptávku.", sizeGuide: "Velikosti a rozměry", siteGuide: "Příprava místa", catalogue: "Dostupné kontejnery", containerTypes: "Typy kontejnerů", faq: "Časté dotazy", conversions: "Úpravy kontejnerů", ctaTitle: "Nechte dopravu prověřit", ctaText: "Pošlete PSČ, velikost, způsob vykládky a fotografie přístupu.",
  },
  es: {
    jumpLabel: "En esta página", jumpLinks: ["Métodos de descarga", "Ejemplos prácticos", "Preparar el lugar", "Factores de coste"],
    heroLabel: "Logística pesada bien planificada", heroTitle: "La entrega empieza mucho antes de que llegue el camión.", heroText: "Tamaño, ruta, acceso, alcance de grúa y posición final deben encajar. Los revisamos antes de confirmar.", heroFacts: ["Entrega en toda Alemania", "Grúa o autodescarga", "Revisión previa del lugar"],
    methodsLabel: "Métodos de descarga", methodsTitle: "El vehículo adecuado para el lugar", methodsText: "Cada contenedor y emplazamiento requiere su propia logística. El método acordado figura en la oferta.", methods: [{ title: "Descarga con grúa", text: "Una grúa sobre camión coloca el contenedor en la posición preparada.", note: "Importan alcance, obstáculos, terreno y orientación." }, { title: "Acera / autodescarga", text: "Entregamos hasta el punto accesible acordado; el cliente organiza la descarga.", note: "El equipo y la coordinación deben estar preparados." }, { title: "Planificación especial", text: "Accesos estrechos, gran alcance o varios contenedores pueden requerir más equipos.", note: "Fotos, medidas y un plano facilitan la evaluación." }],
    examplesLabel: "Ejemplos prácticos", examplesTitle: "Cómo son las entregas habituales", examplesText: "Estos casos muestran los datos que determinan el plan. La foto procede de una entrega real.", examples: [{ tag: "Contenedor almacén 20 ft", title: "Patio con acceso directo", text: "El camión se sitúa junto al punto y la grúa coloca el contenedor sobre cuatro apoyos.", facts: ["Alcance corto", "Superficie plana", "Puertas al lado requerido"] }, { tag: "High cube 40 ft", title: "Zona industrial con maniobra", text: "El vehículo largo necesita entrada ancha, curvas libres y espacio de descarga.", facts: ["Fotografiar toda la ruta", "Revisar alturas", "Marcar orientación"] }, { tag: "Oficina o refrigerado", title: "Colocación con instalaciones", text: "Se consideran apoyos, lado de puertas y futuras conexiones.", facts: ["Conectar después de entrega", "Nivelar correctamente", "Mantener acceso técnico"] }],
    preparationLabel: "Preparar el lugar", preparationTitle: "Qué necesitamos antes de programar", preparationText: "Fotos claras y medidas precisas evitan retrasos y vehículos inadecuados.", checklist: ["Dirección y contacto", "Fotos desde la vía pública", "Ancho y alto de pasos", "Curvas, pendientes, ramas y cables", "Terreno y apoyos", "Orientación de puertas y longitud", "Espacio de maniobra y grúa", "Permisos y accesos"],
    processLabel: "Proceso", processTitle: "De la consulta a la entrega", process: [{ title: "Contenedor y destino", text: "Envía tipo, código postal, dirección y posición." }, { title: "Revisión del lugar", text: "Evaluamos ruta, acceso, terreno y descarga." }, { title: "Confirmación escrita", text: "La oferta indica vehículo, coste y plazo." }, { title: "Entrega e inspección", text: "El contenedor se entrega o coloca y se revisa visualmente." }],
    costsLabel: "Costes de entrega", costsTitle: "Por qué cada entrega se calcula individualmente", costsText: "La entrega solo está incluida si se indica expresamente. El transporte se confirma antes del contrato.", costFactors: ["Distancia y ruta", "10, 20 o 40 ft", "Cantidad", "Grúa o autodescarga", "Alcance y equipos", "Acceso y condiciones"],
    linksLabel: "Seguir planificando", linksTitle: "Ve al siguiente paso útil", linksText: "Compara medidas y tipos, prepara el lugar o envía una consulta.", sizeGuide: "Tamaños y dimensiones", siteGuide: "Preparar el emplazamiento", catalogue: "Contenedores disponibles", containerTypes: "Tipos de contenedor", faq: "Preguntas frecuentes", conversions: "Transformaciones", ctaTitle: "Solicita una revisión de entrega", ctaText: "Envía código postal, tamaño, método de descarga y fotos del acceso.",
  },
};

const detailsCopy: Record<Locale, { label: string; title: string; text: string }> = {
  de: { label: "Lieferbedingungen im Detail", title: "Zeitraum, Kosten und Verantwortlichkeiten", text: "Hier finden Sie die verbindungsrelevanten Einzelheiten zur Lieferplanung, zu Transportkosten, Standortpflichten und zur Prüfung bei Übergabe." },
  en: { label: "Detailed delivery conditions", title: "Timing, costs and responsibilities", text: "Review the practical details covering delivery planning, transport costs, site responsibilities and inspection at handover." },
  nl: { label: "Leveringsvoorwaarden", title: "Termijn, kosten en verantwoordelijkheden", text: "Lees de details over planning, transportkosten, verplichtingen op locatie en controle bij overdracht." },
  it: { label: "Condizioni di consegna", title: "Tempi, costi e responsabilità", text: "Consulta i dettagli su pianificazione, trasporto, responsabilità del sito e verifica alla consegna." },
  cs: { label: "Podmínky dopravy", title: "Termíny, náklady a odpovědnosti", text: "Podrobnosti k plánování, nákladům, povinnostem na místě a kontrole při předání." },
  es: { label: "Condiciones de entrega", title: "Plazos, costes y responsabilidades", text: "Consulta los detalles sobre planificación, transporte, responsabilidades del lugar e inspección en la entrega." },
};

export function DeliveryPage({ locale, content }: { locale: Locale; content: PageContent }) {
  const dict = getDictionary(locale);
  const copy = deliveryCopy[locale];
  const sizeGuide = guides.find((guide) => guide.key === "sizes")!;
  const siteGuide = guides.find((guide) => guide.key === "site")!;
  const details = detailsCopy[locale];
  const conversions = getSimplePage(locale, "conversions");
  const faq = getSimplePage(locale, "faq");
  const jumpTargets = ["delivery-methods", "delivery-examples", "site-preparation", "delivery-costs"];
  const related = [
    { label: copy.catalogue, text: dict.catalogue.intro, path: href(locale, "shop") },
    { label: copy.containerTypes, text: dict.home.categoriesTitle, path: href(locale, "types") },
    { label: copy.sizeGuide, text: sizeGuide.intros[locale], path: href(locale, "guides", sizeGuide.slugs[locale]) },
    { label: copy.siteGuide, text: siteGuide.intros[locale], path: href(locale, "guides", siteGuide.slugs[locale]) },
    { label: copy.faq, text: faq?.intro || dict.home.featuredText, path: href(locale, "faq") },
    { label: copy.conversions, text: conversions?.intro || dict.home.ctaText, path: href(locale, "conversions") },
  ];

  return (
    <main>
      <Breadcrumbs locale={locale} items={[{ label: content.title }]} />

      <header id="overview" className="border-y border-zinc-100 bg-white py-10 md:py-14">
        <div className="container-shell grid items-center gap-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)]">
          <div>
            <p className="eyebrow"><span className="h-1.5 w-1.5 bg-[#ffb33e]" />{copy.heroLabel}</p>
            <h1 className="display-title max-w-3xl">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">{copy.heroTitle} {copy.heroText}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={href(locale, "quote")} className="button-primary">{dict.nav.quote}<ArrowRight className="h-4 w-4" /></Link>
              <Link href={href(locale, "shop")} className="button-outline">{dict.nav.shop}</Link>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden bg-zinc-200 shadow-[0_18px_45px_rgba(0,0,0,0.12)] md:min-h-[500px]">
            <Image src={IMAGES.homeDelivery} alt={`${content.title} – ${dict.nav.delivery}`} fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 grid gap-px bg-white/30 sm:grid-cols-3">
              {copy.heroFacts.map((fact) => <div key={fact} className="bg-[#092b4e]/95 px-5 py-4 text-xs font-extrabold uppercase tracking-[0.08em] text-white">{fact}</div>)}
            </div>
          </div>
        </div>
      </header>

      <nav aria-label={copy.jumpLabel} className="sticky top-16 z-30 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur lg:top-24">
        <div className="container-shell flex items-center gap-2 overflow-x-auto py-3">
          <span className="hidden shrink-0 pr-2 text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-500 md:block">{copy.jumpLabel}</span>
          {copy.jumpLinks.map((label, index) => <Link key={label} href={`#${jumpTargets[index]}`} className="shrink-0 bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-700 transition hover:bg-primary hover:text-white">{label}</Link>)}
        </div>
      </nav>

      <section id="delivery-methods" className="scroll-mt-32 section-space bg-zinc-50">
        <div className="container-shell">
          <p className="eyebrow">{copy.methodsLabel}</p>
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><h2 className="section-title max-w-xl">{copy.methodsTitle}</h2><p className="max-w-2xl text-lg leading-8 text-zinc-600">{copy.methodsText}</p></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {copy.methods.map((method, index) => <article key={method.title} className="surface-card p-7"><div className="flex h-11 w-11 items-center justify-center bg-primary text-white">{index === 0 ? <Truck className="h-5 w-5" /> : index === 1 ? <PackageCheck className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}</div><h3 className="mt-7 text-xl font-extrabold">{method.title}</h3><p className="mt-3 text-zinc-600">{method.text}</p><p className="mt-5 border-l-2 border-[#ffb33e] pl-4 text-sm font-bold text-zinc-700">{method.note}</p></article>)}
          </div>
        </div>
      </section>

      <section id="delivery-examples" className="scroll-mt-32 section-space bg-white">
        <div className="container-shell">
          <div className="grid items-end gap-5 lg:grid-cols-2"><div><p className="eyebrow">{copy.examplesLabel}</p><h2 className="section-title max-w-2xl">{copy.examplesTitle}</h2></div><p className="max-w-2xl text-zinc-600">{copy.examplesText}</p></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {copy.examples.map((example, index) => <article key={example.title} className="border-t-4 border-primary bg-zinc-50 p-7"><span className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">0{index + 1} · {example.tag}</span><h3 className="mt-4 text-2xl font-extrabold">{example.title}</h3><p className="mt-3 text-zinc-600">{example.text}</p><ul className="mt-6 grid gap-2">{example.facts.map((fact) => <li key={fact} className="flex gap-3 text-sm font-semibold text-zinc-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{fact}</li>)}</ul></article>)}
          </div>
        </div>
      </section>

      <section id="site-preparation" className="scroll-mt-32 section-space bg-[#092b4e] text-white">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div><p className="eyebrow !text-[#ffb33e]">{copy.preparationLabel}</p><h2 className="section-title max-w-xl">{copy.preparationTitle}</h2><p className="mt-5 max-w-xl text-blue-100/80">{copy.preparationText}</p><Link href={href(locale, "guides", siteGuide.slugs[locale])} className="mt-7 inline-flex items-center gap-2 font-extrabold text-[#ffb33e]">{copy.siteGuide}<ArrowRight className="h-4 w-4" /></Link></div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2">{copy.checklist.map((item, index) => <div key={item} className="flex gap-4 bg-[#0c3763] p-5"><span className="grid h-7 w-7 shrink-0 place-items-center bg-[#ffb33e] text-xs font-black text-[#092b4e]">{index + 1}</span><span className="text-sm font-semibold leading-6 text-blue-50">{item}</span></div>)}</div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[430px] overflow-hidden bg-zinc-200 shadow-[0_18px_45px_rgba(0,0,0,0.10)]"><Image src={IMAGES.homeProcess} alt={copy.processTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><div className="absolute left-0 top-0 bg-[#ffb33e] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.15em] text-[#092b4e]">{copy.processLabel}</div></div>
          <div><p className="eyebrow">{copy.processLabel}</p><h2 className="section-title">{copy.processTitle}</h2><ol className="mt-7 grid gap-2">{copy.process.map((step, index) => <li key={step.title} className="grid grid-cols-[48px_1fr] gap-4 border-t border-zinc-200 py-5 first:border-t-0"><span className="font-mono text-sm font-bold text-primary">0{index + 1}</span><div><h3 className="font-extrabold">{step.title}</h3><p className="mt-1 text-sm leading-6 text-zinc-600">{step.text}</p></div></li>)}</ol></div>
        </div>
      </section>

      <section id="delivery-costs" className="scroll-mt-32 section-space bg-zinc-50">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow">{copy.costsLabel}</p><h2 className="section-title max-w-xl">{copy.costsTitle}</h2><p className="mt-5 max-w-xl text-zinc-600">{copy.costsText}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{copy.costFactors.map((factor, index) => <div key={factor} className="flex items-center gap-4 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">{index === 0 ? <MapPin className="h-5 w-5 text-primary" /> : index === 1 ? <Ruler className="h-5 w-5 text-primary" /> : index === 2 ? <Building2 className="h-5 w-5 text-primary" /> : index === 3 ? <Truck className="h-5 w-5 text-primary" /> : index === 4 ? <Camera className="h-5 w-5 text-primary" /> : <CircleDollarSign className="h-5 w-5 text-primary" />}<span className="font-bold">{factor}</span></div>)}</div>
        </div>
      </section>

      <section className="section-space border-t border-zinc-200 bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
          <div><p className="eyebrow">{details.label}</p><h2 className="section-title">{details.title}</h2><p className="mt-4 max-w-xl text-zinc-600">{details.text}</p></div>
          <div className="border-t border-zinc-200">
            {content.sections.map((section, index) => <details key={section.title} className="group border-b border-zinc-200" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-extrabold text-zinc-900 marker:content-none"><span>{section.title}</span><span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center bg-zinc-100 text-primary transition group-open:rotate-45">+</span></summary><div className="pb-6 text-zinc-600">{section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 last:mb-0">{paragraph}</p>)}{section.bullets && <ul className="mt-5 grid gap-2 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{bullet}</li>)}</ul>}</div></details>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <p className="eyebrow">{copy.linksLabel}</p><h2 className="section-title">{copy.linksTitle}</h2><p className="mt-4 max-w-2xl text-zinc-600">{copy.linksText}</p>
          <nav aria-label={copy.linksTitle} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <Link key={item.path} href={item.path} className="group flex min-h-40 flex-col justify-between bg-zinc-50 p-6 transition hover:bg-primary hover:text-white"><div><h3 className="text-xl font-extrabold">{item.label}</h3><p className="mt-2 line-clamp-2 text-sm text-zinc-600 group-hover:text-blue-50/80">{item.text}</p></div><ArrowRight className="mt-5 h-5 w-5 text-primary transition group-hover:translate-x-1 group-hover:text-[#ffb33e]" /></Link>)}</nav>
        </div>
      </section>

      <section className="bg-[#ffb33e] py-10 text-[#092b4e]">
        <div className="container-shell flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><h2 className="text-2xl font-extrabold sm:text-3xl">{copy.ctaTitle}</h2><p className="mt-2 max-w-3xl font-medium text-[#092b4e]/75">{copy.ctaText}</p></div><div className="flex shrink-0 flex-wrap gap-3"><Link href={href(locale, "quote")} className="button-dark">{dict.nav.quote}<ArrowRight className="h-4 w-4" /></Link><Link href={href(locale, "contact")} className="inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 text-sm font-extrabold">{dict.nav.contact}</Link></div></div>
      </section>
    </main>
  );
}
