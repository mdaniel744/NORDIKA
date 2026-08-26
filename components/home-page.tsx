import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Container,
  DoorOpen,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  ShieldCheck,
  Snowflake,
  Truck,
  Warehouse,
  Wrench,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { IMAGES } from "@/lib/assets";
import { guides } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { SITE } from "@/lib/site";
import type { Product } from "@/types/catalog";

type ContentCard = { title: string; text: string };

const categoryCopy: Record<Locale, ContentCard[]> = {
  de: [
    { title: "Seecontainer", text: "Robuste Standard- und High-Cube-Modelle für Transport und Lagerung." },
    { title: "Lagercontainer", text: "Sichere, flexible Lagerfläche direkt an Ihrem Standort." },
    { title: "Kühlcontainer", text: "Temperaturgeführte Lösungen für sensible Waren." },
    { title: "Open-Side-Container", text: "Breiter seitlicher Zugang für sperrige Güter und schnellen Umschlag." },
    { title: "Containerumbauten", text: "Fenster, Türen, Elektrik, Dämmung und Innenausbau nach Bedarf." },
    { title: "Lieferung & Aufstellung", text: "Zufahrt, Entladung und sichere Positionierung passend geplant." },
  ],
  en: [
    { title: "Shipping containers", text: "Robust standard and high-cube models for transport and storage." },
    { title: "Storage containers", text: "Secure, flexible storage space at your location." },
    { title: "Refrigerated containers", text: "Temperature-controlled solutions for sensitive goods." },
    { title: "Open-side containers", text: "Wide side access for bulky goods and fast handling." },
    { title: "Container conversions", text: "Custom windows, doors, electrics, insulation and interiors." },
    { title: "Delivery & installation", text: "Access, unloading and safe positioning planned for your site." },
  ],
  nl: [
    { title: "Zeecontainers", text: "Robuuste standaard- en high-cubemodellen voor transport en opslag." },
    { title: "Opslagcontainers", text: "Veilige, flexibele opslagruimte op uw locatie." },
    { title: "Koelcontainers", text: "Temperatuurgecontroleerde oplossingen voor gevoelige goederen." },
    { title: "Open-sidecontainers", text: "Brede zijtoegang voor grote goederen en snelle handling." },
    { title: "Containerombouw", text: "Ramen, deuren, elektra, isolatie en interieur op maat." },
    { title: "Levering & plaatsing", text: "Toegang, lossen en veilige plaatsing voor uw locatie gepland." },
  ],
  it: [
    { title: "Container marittimi", text: "Modelli standard e high cube robusti per trasporto e deposito." },
    { title: "Container deposito", text: "Spazio sicuro e flessibile direttamente nella tua sede." },
    { title: "Container refrigerati", text: "Soluzioni a temperatura controllata per merci sensibili." },
    { title: "Container open side", text: "Ampio accesso laterale per merci ingombranti e movimentazione rapida." },
    { title: "Trasformazioni", text: "Finestre, porte, impianti, isolamento e interni su misura." },
    { title: "Consegna & posa", text: "Accesso, scarico e posizionamento sicuro pianificati per il sito." },
  ],
  cs: [
    { title: "Námořní kontejnery", text: "Odolné standardní a high-cube modely pro dopravu a skladování." },
    { title: "Skladové kontejnery", text: "Bezpečný a flexibilní skladovací prostor přímo u vás." },
    { title: "Chladicí kontejnery", text: "Teplotně řízená řešení pro citlivé zboží." },
    { title: "Open-side kontejnery", text: "Široký boční přístup pro rozměrné zboží a rychlou manipulaci." },
    { title: "Úpravy kontejnerů", text: "Okna, dveře, elektroinstalace, izolace a interiér na míru." },
    { title: "Doprava & usazení", text: "Příjezd, vykládku a bezpečné umístění naplánujeme pro váš pozemek." },
  ],
  es: [
    { title: "Contenedores marítimos", text: "Modelos estándar y high cube robustos para transporte y almacenaje." },
    { title: "Contenedores de almacenamiento", text: "Espacio seguro y flexible directamente en tu ubicación." },
    { title: "Contenedores refrigerados", text: "Soluciones con temperatura controlada para mercancías sensibles." },
    { title: "Contenedores open side", text: "Acceso lateral amplio para cargas voluminosas y manipulación rápida." },
    { title: "Transformaciones", text: "Ventanas, puertas, electricidad, aislamiento e interiores a medida." },
    { title: "Entrega & instalación", text: "Acceso, descarga y colocación segura planificados para tu ubicación." },
  ],
};

const enquiryCopy: Record<Locale, { eyebrow: string; title: string; text: string }> = {
  de: { eyebrow: "Persönlich beraten", title: "Welche Containerlösung passt zu Ihrem Vorhaben?", text: "Wir prüfen Einsatz, Ausstattung und Lieferort und empfehlen den passenden nächsten Schritt." },
  en: { eyebrow: "Personal advice", title: "Which container solution fits your project?", text: "We assess use, equipment and delivery location, then recommend the right next step." },
  nl: { eyebrow: "Persoonlijk advies", title: "Welke containeroplossing past bij uw project?", text: "We bekijken toepassing, uitrusting en afleverlocatie en adviseren de juiste volgende stap." },
  it: { eyebrow: "Consulenza personale", title: "Quale soluzione container si adatta al tuo progetto?", text: "Valutiamo utilizzo, dotazione e luogo di consegna e consigliamo il passo successivo." },
  cs: { eyebrow: "Osobní poradenství", title: "Které kontejnerové řešení se hodí pro váš projekt?", text: "Prověříme využití, vybavení i místo dodání a doporučíme správný další krok." },
  es: { eyebrow: "Asesoramiento personal", title: "¿Qué solución de contenedor encaja con tu proyecto?", text: "Revisamos el uso, el equipamiento y el lugar de entrega para recomendar el siguiente paso." },
};

const statsCopy: Record<Locale, [string, string, string]> = {
  de: ["Unternehmenssitz", "aktuelle Angebote", "Sprachen"],
  en: ["company address", "current listings", "languages"],
  nl: ["bedrijfsadres", "actuele aanbiedingen", "talen"],
  it: ["sede aziendale", "offerte attuali", "lingue"],
  cs: ["sídlo společnosti", "aktuální nabídky", "jazyky"],
  es: ["sede de la empresa", "ofertas actuales", "idiomas"],
};

const benefitsCopy: Record<Locale, { eyebrow: string; title: string; intro: string; items: ContentCard[] }> = {
  de: { eyebrow: "Warum NORDIKA", title: "Klarheit in jeder Projektphase", intro: "Von der ersten Frage bis zur Positionierung vor Ort wissen Sie, was als Nächstes passiert.", items: [
    { title: "Direkte Beratung", text: "Sie sprechen mit Ansprechpartnern, die Produktauswahl und Logistik zusammen denken." },
    { title: "Geprüfter Bestand", text: "Zustand, Ausstattung und Produktdaten werden nachvollziehbar dargestellt." },
    { title: "Geplante Lieferung", text: "Zufahrt, Untergrund, Kranbedarf und gewünschte Position werden vorab geklärt." },
    { title: "Flexible Umbauten", text: "Zugänge, Elektrik, Dämmung und Innenausbau lassen sich projektbezogen kombinieren." },
    { title: "Zentrale in Mainz", text: "Unternehmensinformationen und Kontakt laufen über unsere einzige Adresse in Mainz." },
    { title: "Transparentes Angebot", text: "Produkt, Ausstattung und Logistik werden verständlich und projektspezifisch kalkuliert." },
  ] },
  en: { eyebrow: "Why NORDIKA", title: "Clarity at every project stage", intro: "From the first question to on-site positioning, you know what happens next.", items: [
    { title: "Direct advice", text: "Talk to people who consider product selection and logistics together." },
    { title: "Inspected stock", text: "Condition, equipment and product data are presented clearly." },
    { title: "Planned delivery", text: "Access, ground, crane requirements and final position are clarified in advance." },
    { title: "Flexible conversions", text: "Access, electrics, insulation and interiors can be combined for your project." },
    { title: "Mainz headquarters", text: "Company information and contact are handled through our single address in Mainz." },
    { title: "Transparent quote", text: "Product, equipment and logistics are calculated clearly for your project." },
  ] },
  nl: { eyebrow: "Waarom NORDIKA", title: "Duidelijkheid in elke projectfase", intro: "Van de eerste vraag tot de plaatsing weet u wat de volgende stap is.", items: [
    { title: "Direct advies", text: "U spreekt met mensen die productkeuze en logistiek samen bekijken." },
    { title: "Gecontroleerde voorraad", text: "Staat, uitrusting en productgegevens worden helder weergegeven." },
    { title: "Geplande levering", text: "Toegang, ondergrond, kraanbehoefte en positie worden vooraf afgestemd." },
    { title: "Flexibele ombouw", text: "Toegang, elektra, isolatie en interieur worden per project gecombineerd." },
    { title: "Hoofdkantoor in Mainz", text: "Bedrijfsinformatie en contact verlopen via ons enige adres in Mainz." },
    { title: "Transparante offerte", text: "Product, uitrusting en logistiek worden begrijpelijk voor uw project berekend." },
  ] },
  it: { eyebrow: "Perché NORDIKA", title: "Chiarezza in ogni fase del progetto", intro: "Dalla prima domanda al posizionamento in sede, sai sempre quale sarà il passo successivo.", items: [
    { title: "Consulenza diretta", text: "Parli con referenti che valutano insieme prodotto e logistica." },
    { title: "Stock controllato", text: "Condizione, dotazione e dati del prodotto sono presentati chiaramente." },
    { title: "Consegna pianificata", text: "Accesso, terreno, gru e posizione finale vengono verificati prima." },
    { title: "Trasformazioni flessibili", text: "Accessi, impianti, isolamento e interni si combinano per il progetto." },
    { title: "Sede a Mainz", text: "Le informazioni aziendali e i contatti fanno riferimento al nostro unico indirizzo a Mainz." },
    { title: "Preventivo trasparente", text: "Prodotto, dotazione e logistica sono calcolati in modo chiaro." },
  ] },
  cs: { eyebrow: "Proč NORDIKA", title: "Jasno v každé fázi projektu", intro: "Od prvního dotazu po umístění na místě vždy víte, co bude následovat.", items: [
    { title: "Přímé poradenství", text: "Jednáte s lidmi, kteří řeší výběr produktu i logistiku společně." },
    { title: "Kontrolovaný sklad", text: "Stav, vybavení a údaje o produktu uvádíme srozumitelně." },
    { title: "Plánovaná doprava", text: "Příjezd, podklad, jeřáb i cílovou polohu vyjasníme předem." },
    { title: "Flexibilní úpravy", text: "Vstupy, elektroinstalaci, izolaci a interiér kombinujeme podle projektu." },
    { title: "Sídlo v Mohuči", text: "Firemní údaje a kontakt vedeme přes naši jedinou adresu v Mohuči." },
    { title: "Transparentní nabídka", text: "Produkt, vybavení a logistiku kalkulujeme srozumitelně pro váš projekt." },
  ] },
  es: { eyebrow: "Por qué NORDIKA", title: "Claridad en cada fase del proyecto", intro: "Desde la primera consulta hasta la colocación, siempre sabes cuál es el siguiente paso.", items: [
    { title: "Asesoramiento directo", text: "Hablas con personas que valoran juntas la selección y la logística." },
    { title: "Stock revisado", text: "El estado, el equipamiento y los datos se presentan con claridad." },
    { title: "Entrega planificada", text: "Acceso, suelo, grúa y posición final se aclaran con antelación." },
    { title: "Transformaciones flexibles", text: "Accesos, electricidad, aislamiento e interior se combinan para el proyecto." },
    { title: "Sede en Mainz", text: "La información de empresa y el contacto se gestionan desde nuestra única dirección en Mainz." },
    { title: "Oferta transparente", text: "Producto, equipamiento y logística se calculan claramente para tu proyecto." },
  ] },
};

const faqCopy: Record<Locale, { eyebrow: string; title: string; intro: string; items: ContentCard[] }> = {
  de: { eyebrow: "Kurz erklärt", title: "Häufige Fragen vor dem Containerkauf", intro: "Die wichtigsten Antworten zu Preis, Besichtigung, Lieferung und Aufstellort.", items: [
    { title: "Sind die Preise inklusive Mehrwertsteuer?", text: "Als Bruttopreis gekennzeichnete Katalogpreise enthalten die deutsche Mehrwertsteuer. Liefer- und Aufstellkosten werden separat bestätigt." },
    { title: "Kann ich einen Container besichtigen?", text: "Besichtigungen sind nach Terminvereinbarung und abhängig vom Depot möglich. Nennen Sie uns dafür die gewünschte Artikelnummer." },
    { title: "Wie schnell kann geliefert werden?", text: "Das hängt von Bestand, Depot, Strecke, Kranbedarf und Terminplanung ab. Nach Prüfung nennen wir einen realistischen Lieferzeitraum." },
    { title: "Brauche ich eine Genehmigung?", text: "Das kann von Standort, Nutzungsdauer und Einsatz abhängen. Öffentlich-rechtliche Anforderungen sind mit der zuständigen Behörde zu klären." },
  ] },
  en: { eyebrow: "Clearly answered", title: "Common questions before buying a container", intro: "Key answers about pricing, viewing, delivery and site requirements.", items: [
    { title: "Do prices include VAT?", text: "Catalogue prices marked as gross include German VAT. Delivery and installation costs are confirmed separately." },
    { title: "Can I inspect a container?", text: "Viewings are possible by appointment and depend on the depot. Please include the relevant product number." },
    { title: "How quickly can delivery take place?", text: "Timing depends on stock, depot, route, crane requirements and scheduling. We confirm a realistic timeframe after review." },
    { title: "Do I need a permit?", text: "This can depend on location, duration and intended use. Please clarify public-law requirements with the responsible authority." },
  ] },
  nl: { eyebrow: "Kort uitgelegd", title: "Veelgestelde vragen vóór de aankoop", intro: "Belangrijke antwoorden over prijs, bezichtiging, levering en locatie.", items: [
    { title: "Zijn de prijzen inclusief btw?", text: "Catalogusprijzen die als bruto zijn vermeld, bevatten Duitse btw. Levering en plaatsing worden apart bevestigd." },
    { title: "Kan ik een container bezichtigen?", text: "Bezichtiging is op afspraak en afhankelijk van het depot mogelijk. Vermeld het gewenste artikelnummer." },
    { title: "Hoe snel kan er geleverd worden?", text: "Dat hangt af van voorraad, depot, route, kraan en planning. Na controle geven we een realistische termijn." },
    { title: "Heb ik een vergunning nodig?", text: "Dit kan afhangen van locatie, gebruiksduur en toepassing. Stem publiekrechtelijke eisen af met de bevoegde instantie." },
  ] },
  it: { eyebrow: "Risposte chiare", title: "Domande frequenti prima dell'acquisto", intro: "Le risposte principali su prezzi, visite, consegna e luogo di posa.", items: [
    { title: "I prezzi includono l'IVA?", text: "I prezzi lordi del catalogo includono l'IVA tedesca. Consegna e posa vengono confermate separatamente." },
    { title: "Posso vedere un container?", text: "Le visite sono possibili su appuntamento e dipendono dal deposito. Indica il codice del prodotto desiderato." },
    { title: "Quanto è rapida la consegna?", text: "Dipende da stock, deposito, percorso, gru e programmazione. Dopo la verifica indichiamo una tempistica realistica." },
    { title: "Serve un'autorizzazione?", text: "Può dipendere da luogo, durata e utilizzo. I requisiti pubblici vanno verificati con l'autorità competente." },
  ] },
  cs: { eyebrow: "Stručné odpovědi", title: "Časté dotazy před koupí kontejneru", intro: "Hlavní odpovědi k cenám, prohlídce, dopravě a místu usazení.", items: [
    { title: "Jsou ceny včetně DPH?", text: "Katalogové ceny označené jako brutto obsahují německou DPH. Doprava a usazení se potvrzují samostatně." },
    { title: "Mohu si kontejner prohlédnout?", text: "Prohlídka je možná po dohodě a podle depa. Uveďte prosím požadované číslo produktu." },
    { title: "Jak rychle lze dodat?", text: "Záleží na skladu, depu, trase, jeřábu a plánování. Po prověření sdělíme realistický termín." },
    { title: "Potřebuji povolení?", text: "Může záležet na místě, době využití a účelu. Veřejnoprávní požadavky ověřte u příslušného úřadu." },
  ] },
  es: { eyebrow: "Respuestas claras", title: "Preguntas frecuentes antes de comprar", intro: "Respuestas clave sobre precio, visita, entrega y lugar de instalación.", items: [
    { title: "¿Los precios incluyen IVA?", text: "Los precios brutos del catálogo incluyen el IVA alemán. La entrega y la instalación se confirman por separado." },
    { title: "¿Puedo visitar un contenedor?", text: "Las visitas son posibles con cita y dependen del depósito. Indica el número del producto que te interesa." },
    { title: "¿Cuánto tarda la entrega?", text: "Depende del stock, depósito, ruta, grúa y planificación. Tras revisarlo indicamos un plazo realista." },
    { title: "¿Necesito un permiso?", text: "Puede depender de la ubicación, duración y uso. Consulta los requisitos públicos con la autoridad competente." },
  ] },
};

const decisionCopy: Record<Locale, { eyebrow: string; title: string; intro: string; oneTrip: string; oneTripText: string; used: string; usedText: string; conditionLink: string; guidesEyebrow: string; guidesTitle: string; guidesIntro: string }> = {
  de: { eyebrow: "Neu oder gebraucht", title: "Zustand passend zu Einsatz und Budget wählen", intro: "Die richtige Wahl hängt nicht nur von der Optik ab. Dichtigkeit, Transportstatus, Türfunktion, Boden und geplanter Einsatz sind genauso wichtig.", oneTrip: "One Trip / neuwertig", oneTripText: "Sehr gute Gesamtoptik mit möglichen leichten Transportspuren – häufig gewählt für sichtbare Standorte und Umbauprojekte.", used: "Gebraucht", usedText: "Wirtschaftliche Lösung mit typischen Dellen, Rost- und Lackspuren. WWT oder Cargo Worthy werden passend zum Zweck beurteilt.", conditionLink: "Alle Zustandsklassen", guidesEyebrow: "Kaufhilfe", guidesTitle: "Planen, vergleichen, vorbereitet bestellen", guidesIntro: "Unsere Ratgeber erklären Auswahl, Maße, Zustand und Aufstellort ohne pauschale Versprechen." },
  en: { eyebrow: "New or used", title: "Choose condition for the use and budget", intro: "The right choice is not just about appearance. Weather-tightness, transport status, doors, floor and intended use matter too.", oneTrip: "One-trip / near-new", oneTripText: "Very good overall appearance with possible light transport marks, often chosen for visible sites and conversion projects.", used: "Used", usedText: "An economical option with typical dents, rust and paint marks. WWT or cargo-worthy status is assessed for the intended use.", conditionLink: "All condition grades", guidesEyebrow: "Buying help", guidesTitle: "Plan, compare and order prepared", guidesIntro: "Our guides explain selection, dimensions, condition and site preparation without blanket promises." },
  nl: { eyebrow: "Nieuw of gebruikt", title: "Kies conditie bij gebruik en budget", intro: "De juiste keuze gaat niet alleen om uitstraling. Dichtheid, transportstatus, deuren, vloer en gebruik zijn ook belangrijk.", oneTrip: "One trip / bijna nieuw", oneTripText: "Zeer goede algemene uitstraling met mogelijke lichte transportsporen, vaak gekozen voor zichtlocaties en ombouw.", used: "Gebruikt", usedText: "Economische keuze met normale deuken, roest- en verfsporen. WWT of cargo worthy wordt op het gebruik beoordeeld.", conditionLink: "Alle conditieklassen", guidesEyebrow: "Aankoophulp", guidesTitle: "Plan, vergelijk en bestel voorbereid", guidesIntro: "Onze gidsen leggen keuze, maten, conditie en locatievoorbereiding uit zonder algemene beloften." },
  it: { eyebrow: "Nuovo o usato", title: "Scegli la condizione per uso e budget", intro: "La scelta non dipende solo dall'estetica. Tenuta, stato per il trasporto, porte, pavimento e utilizzo sono altrettanto importanti.", oneTrip: "One trip / seminuovo", oneTripText: "Ottimo aspetto generale con possibili lievi segni di trasporto, scelto spesso per siti visibili e trasformazioni.", used: "Usato", usedText: "Soluzione economica con normali ammaccature, ruggine e segni di vernice. WWT o cargo worthy si valuta in base all'uso.", conditionLink: "Tutte le classi di condizione", guidesEyebrow: "Aiuto all'acquisto", guidesTitle: "Pianifica, confronta e ordina preparato", guidesIntro: "Le guide spiegano scelta, misure, condizioni e preparazione del sito senza promesse generiche." },
  cs: { eyebrow: "Nový nebo použitý", title: "Zvolte stav podle využití a rozpočtu", intro: "Nejde jen o vzhled. Stejně důležitá je těsnost, přepravní stav, dveře, podlaha a plánované použití.", oneTrip: "One trip / téměř nový", oneTripText: "Velmi dobrý celkový vzhled s možnými lehkými stopami dopravy, často pro viditelná místa a úpravy.", used: "Použitý", usedText: "Ekonomická volba s běžnými důlky, korozí a stopami laku. WWT či cargo worthy se hodnotí podle využití.", conditionLink: "Všechny třídy stavu", guidesEyebrow: "Pomoc s nákupem", guidesTitle: "Plánujte, porovnejte a objednejte připraveni", guidesIntro: "Průvodci vysvětlují výběr, rozměry, stav a přípravu místa bez paušálních slibů." },
  es: { eyebrow: "Nuevo o usado", title: "Elige el estado según uso y presupuesto", intro: "La elección no depende solo del aspecto. Estanqueidad, estado de transporte, puertas, suelo y uso previsto también importan.", oneTrip: "One trip / casi nuevo", oneTripText: "Muy buen aspecto general con posibles marcas leves de transporte, habitual en ubicaciones visibles y transformaciones.", used: "Usado", usedText: "Opción económica con abolladuras, óxido y marcas de pintura normales. WWT o cargo worthy se valora según el uso.", conditionLink: "Todos los grados de estado", guidesEyebrow: "Ayuda de compra", guidesTitle: "Planifica, compara y pide preparado", guidesIntro: "Nuestras guías explican selección, medidas, estado y preparación del lugar sin promesas generales." },
};

export function HomePage({ locale, products }: { locale: Locale; products: Product[] }) {
  const dict = getDictionary(locale);
  const decision = decisionCopy[locale];
  const categoryIcons = [Container, Warehouse, Snowflake, DoorOpen, Wrench, Truck];
  const categoryImages = [
    IMAGES.categorySea,
    IMAGES.categoryStorage,
    IMAGES.categoryRefrigerated,
    IMAGES.categoryOpenSide,
    IMAGES.categoryConversions,
    IMAGES.homeDelivery,
  ];
  const categoryLinks = ["types", "types", "types", "types", "conversions", "delivery"] as const;
  const benefitIcons = [MessageSquare, ShieldCheck, Truck, Wrench, MapPin, Clock3];
  const stats = [
    { value: SITE.address.city, label: statsCopy[locale][0] },
    { value: `${products.length}`, label: statsCopy[locale][1] },
    { value: "6", label: statsCopy[locale][2] },
  ];

  return (
    <main>
      <section className="relative isolate min-h-[650px] overflow-hidden bg-[#090d12] text-white lg:min-h-[720px]">
        <Image src={IMAGES.hero} alt={`${SITE.name} container stock`} fill priority sizes="100vw" className="object-cover opacity-85" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,14,.94)_0%,rgba(7,10,14,.78)_48%,rgba(7,10,14,.24)_100%)]" />
        <div className="container-shell relative flex min-h-[650px] items-center py-20 lg:min-h-[720px]">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#ffb33e]">{dict.home.eyebrow}</p>
            <h1 className="display-title max-w-3xl">{dict.home.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-100 sm:text-xl">{dict.home.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href={href(locale, "shop")}>{dict.home.browse}<ArrowRight className="h-4 w-4" /></Link>
              <Link className="button-outline border-white/40 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white hover:text-primary" href={href(locale, "quote")}>{dict.home.request}</Link>
            </div>
            <ul className="mt-10 flex flex-col gap-3 text-sm font-bold text-zinc-100 sm:flex-row sm:flex-wrap sm:gap-6">
              {dict.home.trust.map((item) => <li key={item} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#ffb33e]"><Check className="h-3 w-3 text-[#092b4e]" /></span>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1360px] gap-6 border-b-4 border-[#0d57a5] bg-white p-6 shadow-[0_22px_60px_rgba(5,42,78,0.18)] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0d57a5]">{enquiryCopy[locale].eyebrow}</p>
            <h2 className="text-2xl font-extrabold leading-tight text-[#092b4e] sm:text-3xl">{enquiryCopy[locale].title}</h2>
            <p className="mt-2 text-zinc-600">{enquiryCopy[locale].text}</p>
          </div>
          <Link href={href(locale, "quote")} className="button-primary shrink-0">{dict.nav.quote}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="section-space bg-white pt-20 sm:pt-24 lg:pt-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(460px,.9fr)] lg:items-center">
          <div>
            <p className="eyebrow">{dict.home.aboutEyebrow}</p>
            <h2 className="section-title max-w-3xl">{dict.home.aboutTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{dict.home.aboutText}</p>
            <Link href={href(locale, "about")} className="button-outline mt-8">{dict.home.learnMore}<ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid border border-primary/15 bg-secondary sm:grid-cols-3">
            {stats.map((stat) => <div key={stat.label} className="border-b border-primary/15 p-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><p className="text-4xl font-extrabold text-primary">{stat.value}</p><p className="mt-2 text-sm font-bold text-zinc-600">{stat.label}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#073a70] text-white">
        <div className="container-shell">
          <p className="eyebrow text-[#ffb33e]">{dict.home.categoriesEyebrow}</p>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="section-title max-w-3xl">{dict.home.categoriesTitle}</h2>
            <Link href={href(locale, "types")} className="inline-flex items-center gap-2 font-extrabold text-white hover:text-[#ffb33e]">{dict.common.viewAll}<ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryCopy[locale].map((item, index) => {
              const Icon = categoryIcons[index];
              return <Link key={item.title} href={href(locale, categoryLinks[index])} className="group relative min-h-[330px] overflow-hidden border border-white/10 bg-[#090d12] p-7 text-white">
                <Image src={categoryImages[index]} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover opacity-85 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,14,.16)_0%,rgba(7,10,14,.52)_52%,rgba(7,10,14,.95)_100%)]" />
                <div className="relative flex h-full flex-col justify-end"><Icon className="mb-auto h-9 w-9 text-[#ffb33e] drop-shadow-[0_2px_8px_rgba(0,0,0,.75)]" /><h3 className="text-2xl font-extrabold">{item.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-zinc-100/90">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#ffb33e]">{dict.common.viewProduct}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <p className="eyebrow">{dict.home.featuredEyebrow}</p>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><h2 className="section-title">{dict.home.featuredTitle}</h2><p className="mt-4 max-w-2xl text-zinc-600">{dict.home.featuredText}</p></div>
            <Link href={href(locale, "shop")} className="button-dark">{dict.common.viewAll}<ArrowRight className="h-4 w-4" /></Link>
          </div>
          {products.length > 0 ? <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div> : <p className="mt-10 surface-card p-8 text-zinc-600">{dict.common.noResults}</p>}
        </div>
      </section>

      <section className="section-space bg-[#073a70] text-white">
        <div className="container-shell">
          <div className="max-w-3xl"><p className="eyebrow text-[#ffb33e]">{benefitsCopy[locale].eyebrow}</p><h2 className="section-title">{benefitsCopy[locale].title}</h2><p className="mt-5 text-lg leading-8 text-blue-50/80">{benefitsCopy[locale].intro}</p></div>
          <div className="mt-12 grid border-l border-t border-white/15 md:grid-cols-2 xl:grid-cols-3">
            {benefitsCopy[locale].items.map((item, index) => { const Icon = benefitIcons[index]; return <article key={item.title} className="border-b border-r border-white/15 p-7 lg:p-9"><span className="grid h-12 w-12 place-items-center bg-[#ffb33e] text-[#092b4e]"><Icon className="h-6 w-6" /></span><h3 className="mt-6 text-xl font-extrabold">{item.title}</h3><p className="mt-3 leading-7 text-blue-50/75">{item.text}</p></article>; })}
          </div>
        </div>
      </section>

      <section className="section-space bg-secondary">
        <div className="container-shell grid gap-8 xl:grid-cols-[1.05fr_.95fr]">
          <article className="bg-white p-7 sm:p-10">
            <p className="eyebrow">{decision.eyebrow}</p><h2 className="section-title max-w-3xl">{decision.title}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">{decision.intro}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2"><div className="border-l-4 border-[#ffb33e] bg-zinc-50 p-6"><h3 className="text-xl font-extrabold">{decision.oneTrip}</h3><p className="mt-3 leading-7 text-zinc-600">{decision.oneTripText}</p></div><div className="border-l-4 border-primary bg-zinc-50 p-6"><h3 className="text-xl font-extrabold">{decision.used}</h3><p className="mt-3 leading-7 text-zinc-600">{decision.usedText}</p></div></div>
            <Link href={href(locale, "conditions")} className="button-outline mt-7">{decision.conditionLink}<ArrowRight className="h-4 w-4" /></Link>
          </article>
          <article className="bg-[#073a70] p-7 text-white sm:p-10"><p className="eyebrow text-[#ffb33e]">{decision.guidesEyebrow}</p><h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{decision.guidesTitle}</h2><p className="mt-5 leading-7 text-blue-50/80">{decision.guidesIntro}</p><nav className="mt-8 grid gap-3" aria-label={decision.guidesTitle}>{guides.map((guide) => <Link key={guide.key} href={href(locale, "guides", guide.slugs[locale])} className="group flex items-center justify-between gap-4 border border-white/20 px-5 py-4 font-bold hover:border-[#ffb33e] hover:text-[#ffb33e]">{guide.titles[locale]}<ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" /></Link>)}</nav></article>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden bg-zinc-200"><Image src={IMAGES.homeProcess} alt={`${SITE.name} container yard`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
          <div>
            <p className="eyebrow">{dict.home.processEyebrow}</p><h2 className="section-title">{dict.home.processTitle}</h2>
            <ol className="mt-9 grid gap-7">{dict.home.process.map((step, index) => <li key={step.title} className="grid grid-cols-[48px_1fr] gap-5"><span className="grid h-12 w-12 place-items-center bg-[#ffb33e] font-extrabold text-[#092b4e]">0{index + 1}</span><div><h3 className="text-xl font-extrabold">{step.title}</h3><p className="mt-1 text-zinc-600">{step.text}</p></div></li>)}</ol>
            <Link href={href(locale, "delivery")} className="button-outline mt-9">{dict.nav.delivery}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-secondary">
        <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,.8fr)] lg:items-center">
          <div>
            <p className="eyebrow">{faqCopy[locale].eyebrow}</p><h2 className="section-title max-w-3xl">{faqCopy[locale].title}</h2><p className="mt-5 max-w-2xl text-zinc-600">{faqCopy[locale].intro}</p>
            <div className="mt-8 border-t border-primary/20">{faqCopy[locale].items.map((item, index) => <details key={item.title} className="group border-b border-primary/20 bg-white open:bg-white" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-extrabold text-[#092b4e]"><span>{item.title}</span><Plus className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-45" /></summary><p className="px-5 pb-6 leading-7 text-zinc-600">{item.text}</p></details>)}</div>
            <Link href={href(locale, "faq")} className="button-outline mt-7">{dict.nav.faq}<ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative min-h-[480px] overflow-hidden bg-[#0d57a5] p-8"><Image src={IMAGES.homeMainz} alt={`${SITE.name} container depot in Mainz`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover opacity-80" /><div className="absolute inset-0 bg-gradient-to-t from-[#052a4e] via-[#0d57a5]/20 to-[#0d57a5]/10" /><p className="relative max-w-xs text-sm font-extrabold uppercase tracking-[0.16em] text-[#ffb33e]">{SITE.name} · Mainz</p></div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#052a4e] text-white">
        <div className="container-shell grid lg:grid-cols-[minmax(360px,.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div className="relative min-h-[340px] lg:min-h-[470px]"><Image src={IMAGES.container40hc} alt={`${SITE.name} high-cube container`} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover opacity-75" /><div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#052a4e]" /></div>
          <div className="py-14 lg:p-16 lg:pr-0">
            <p className="eyebrow text-[#ffb33e]">{dict.nav.contact}</p><h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{dict.home.ctaTitle}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50/80">{dict.home.ctaText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={href(locale, "quote")} className="button-primary">{dict.nav.quote}<ArrowRight className="h-4 w-4" /></Link><a href={`tel:${SITE.phoneHref}`} className="button-outline border-white/30 bg-white/5 text-white hover:bg-white hover:text-primary"><Phone className="h-4 w-4" />{SITE.phone}</a></div>
            <a href={`mailto:${SITE.email}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-[#ffb33e]"><Mail className="h-4 w-4" />{SITE.email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
