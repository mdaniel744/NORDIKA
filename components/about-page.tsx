import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, MapPin, PackageCheck, Ship, Truck, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { categories, type PageContent } from "@/lib/content";
import { IMAGES } from "@/lib/assets";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { SITE } from "@/lib/site";

type AboutCopy = {
  heroLabel: string;
  heroTitle: string;
  heroText: string;
  facts: Array<{ value: string; label: string }>;
  focusLabel: string;
  focusTitle: string;
  focusText: string;
  focusPoints: Array<{ title: string; text: string }>;
  rangeLabel: string;
  rangeTitle: string;
  rangeText: string;
  viewType: string;
  customersLabel: string;
  customersTitle: string;
  customersText: string;
  customers: string[];
  processLabel: string;
  processTitle: string;
  process: Array<{ title: string; text: string }>;
  mainzLabel: string;
  mainzTitle: string;
  mainzText: string;
  addressLabel: string;
  standardsLabel: string;
  standardsTitle: string;
  standardsText: string;
  standards: string[];
  ctaTitle: string;
  ctaText: string;
};

const aboutCopy: Record<Locale, AboutCopy> = {
  de: {
    heroLabel: "Containerhandel aus Mainz", heroTitle: "Spezialisiert auf den Verkauf von Seecontainern.", heroText: "NORDIKA Container ist ein auf den Verkauf neuer und gebrauchter Seecontainer spezialisiertes Unternehmen mit Hauptsitz in Mainz, Deutschland. Wir verbinden Produktauswahl, klare Zustandsinformationen und projektbezogene Lieferplanung.",
    facts: [{ value: "Mainz", label: "Hauptsitz in Deutschland" }, { value: "Neu & gebraucht", label: "Seecontainer im Verkauf" }, { value: "10–40 ft", label: "gängige Containergrößen" }, { value: "EU", label: "Lieferung nach Prüfung" }],
    focusLabel: "Unser Kerngeschäft", focusTitle: "Seecontainer passend zu Einsatz, Standort und Budget", focusText: "Im Mittelpunkt steht der Verkauf von Containern. Wir helfen dabei, Typ, Größe, Höhe und Zustandsklasse nachvollziehbar zu vergleichen, bevor ein konkretes Produkt bestätigt wird.",
    focusPoints: [{ title: "Neue und gebrauchte Container", text: "One-Trip-, Cargo-Worthy- und wind- und wasserdichte Ausführungen werden passend zum vorgesehenen Einsatz betrachtet." }, { title: "Standard- und Spezialtypen", text: "Vom Standard-Seecontainer über High Cube und Open Side bis zu Kühl- und Raumlösungen." }, { title: "Lieferung und Aufstellung", text: "Zufahrt, Untergrund, Entladeart, Kranbedarf und gewünschte Position werden projektbezogen geprüft." }],
    rangeLabel: "Sortiment", rangeTitle: "Containerlösungen für unterschiedliche Anforderungen", rangeText: "Die einzelnen Typenseiten erklären Einsatz, Eigenschaften und verfügbare Produkte und führen direkt weiter zum passenden Bestand.", viewType: "Typ ansehen",
    customersLabel: "Für wen wir arbeiten", customersTitle: "Container für Gewerbe, öffentliche Auftraggeber und Privatkunden", customersText: "Vom zusätzlichen Lagerraum bis zum langfristigen Betriebsprojekt: Die Empfehlung orientiert sich am tatsächlichen Einsatz und den Bedingungen am Aufstellort.", customers: ["Unternehmen und Handwerksbetriebe", "Industrie, Logistik und Bau", "Kommunen und öffentliche Auftraggeber", "Landwirtschaft und Veranstaltungen", "Private Lager- und Umbauprojekte"],
    processLabel: "Unsere Arbeitsweise", processTitle: "Klar vom Bedarf bis zur Lieferung", process: [{ title: "Bedarf verstehen", text: "Einsatz, Platzbedarf, Standort und Budget werden eingeordnet." }, { title: "Container auswählen", text: "Typ, Größe, Zustand und technische Angaben werden transparent verglichen." }, { title: "Angebot bestätigen", text: "Produkt, Ausstattung, Steuern und Logistik werden schriftlich zusammengeführt." }, { title: "Lieferung koordinieren", text: "Fahrzeug, Entladung, Termin und Übergabe werden zum Standort passend geplant." }],
    mainzLabel: "Hauptsitz", mainzTitle: "Zentral betreut aus Mainz", mainzText: "Von unserer Basis in Mainz aus koordinieren wir Beratung, Angebote, Bestellungen und die projektbezogene Containerlogistik. Besuche erfolgen nach vorheriger Terminvereinbarung.", addressLabel: "Unternehmensadresse",
    standardsLabel: "Wofür wir stehen", standardsTitle: "Klare Informationen statt pauschaler Versprechen", standardsText: "Der konkrete Container, sein dokumentierter Zustand und die schriftlich bestätigten Leistungen sind entscheidend.", standards: ["Nachvollziehbare Produkt- und Zustandsangaben", "Transparente Preise und separat ausgewiesene Logistik", "Direkte Ansprechpartner für Rückfragen", "Standortbezogene Liefer- und Entladeplanung"],
    ctaTitle: "Welcher Container passt zu Ihrem Projekt?", ctaText: "Vergleichen Sie verfügbare Modelle oder senden Sie uns Einsatz, Größe und Lieferort für ein persönliches Angebot.",
  },
  en: {
    heroLabel: "Container sales from Mainz", heroTitle: "Specialists in selling shipping containers.", heroText: "NORDIKA Container is a company specialising in the sale of new and used shipping containers, with its main base in Mainz, Germany. We bring together product selection, clear condition information and project-specific delivery planning.",
    facts: [{ value: "Mainz", label: "Main base in Germany" }, { value: "New & used", label: "Shipping containers for sale" }, { value: "10–40 ft", label: "Common container sizes" }, { value: "EU", label: "Delivery after review" }],
    focusLabel: "Our core business", focusTitle: "Shipping containers matched to use, site and budget", focusText: "Container sales are at the heart of the business. We help customers compare type, length, height and condition grade before a specific product is confirmed.",
    focusPoints: [{ title: "New and used containers", text: "One-trip, cargo-worthy and wind-and-watertight options are considered against the intended use." }, { title: "Standard and specialist types", text: "From standard shipping containers and high cubes to open-side, refrigerated and room solutions." }, { title: "Delivery and installation", text: "Access, ground, unloading, crane requirements and the final position are reviewed for the project." }],
    rangeLabel: "Container range", rangeTitle: "Solutions for different requirements", rangeText: "Each type page explains applications and features and links directly to relevant available products.", viewType: "View type",
    customersLabel: "Who we serve", customersTitle: "Containers for businesses, public bodies and private customers", customersText: "From extra storage to a long-term operational project, recommendations are based on the actual use and placement-site conditions.", customers: ["Companies and trades", "Industry, logistics and construction", "Municipalities and public-sector buyers", "Agriculture and events", "Private storage and conversion projects"],
    processLabel: "How we work", processTitle: "Clear from requirement to delivery", process: [{ title: "Understand the requirement", text: "Use, capacity, site and budget are established." }, { title: "Select the container", text: "Type, size, condition and technical details are compared clearly." }, { title: "Confirm the quotation", text: "Product, equipment, tax and logistics are brought together in writing." }, { title: "Coordinate delivery", text: "Vehicle, unloading, timing and handover are planned for the site." }],
    mainzLabel: "Main base", mainzTitle: "Centrally managed from Mainz", mainzText: "From our base in Mainz, we coordinate advice, quotations, orders and project-specific container logistics. Visits are available by prior appointment.", addressLabel: "Company address",
    standardsLabel: "What guides us", standardsTitle: "Clear information instead of broad promises", standardsText: "The specific container, its documented condition and the services confirmed in writing are what matter.", standards: ["Traceable product and condition information", "Transparent pricing with logistics shown separately", "Direct contacts for questions", "Site-specific delivery and unloading planning"],
    ctaTitle: "Which container fits your project?", ctaText: "Compare available models or send us the intended use, size and delivery location for a personal quotation.",
  },
  nl: {
    heroLabel: "Containerverkoop vanuit Mainz", heroTitle: "Gespecialiseerd in de verkoop van zeecontainers.", heroText: "NORDIKA Container is gespecialiseerd in de verkoop van nieuwe en gebruikte zeecontainers, met de hoofdvestiging in Mainz, Duitsland. Wij combineren productkeuze, duidelijke conditie-informatie en leverplanning.",
    facts: [{ value: "Mainz", label: "Hoofdvestiging in Duitsland" }, { value: "Nieuw & gebruikt", label: "Zeecontainers te koop" }, { value: "10–40 ft", label: "Gangbare maten" }, { value: "EU", label: "Levering na controle" }],
    focusLabel: "Onze kernactiviteit", focusTitle: "Zeecontainers passend bij gebruik, locatie en budget", focusText: "De verkoop van containers staat centraal. We helpen type, lengte, hoogte en conditie te vergelijken vóór bevestiging.", focusPoints: [{ title: "Nieuwe en gebruikte containers", text: "One-trip, cargo-worthy en wind- en waterdichte opties worden aan het gebruik gekoppeld." }, { title: "Standaard en speciale typen", text: "Van standaard en high cube tot open side, koel- en ruimtecontainers." }, { title: "Levering en plaatsing", text: "Toegang, bodem, lossing, kraan en eindpositie worden projectgericht gecontroleerd." }],
    rangeLabel: "Assortiment", rangeTitle: "Oplossingen voor verschillende toepassingen", rangeText: "Elke typepagina legt gebruik en eigenschappen uit en verwijst naar beschikbare producten.", viewType: "Type bekijken",
    customersLabel: "Voor wie", customersTitle: "Containers voor bedrijven, publieke opdrachtgevers en particulieren", customersText: "Van extra opslag tot een bedrijfsproject: het advies volgt het gebruik en de locatie.", customers: ["Bedrijven en vakbedrijven", "Industrie, logistiek en bouw", "Gemeenten en publieke klanten", "Landbouw en evenementen", "Particuliere opslag en ombouw"],
    processLabel: "Werkwijze", processTitle: "Duidelijk van behoefte tot levering", process: [{ title: "Behoefte bepalen", text: "Gebruik, ruimte, locatie en budget worden vastgesteld." }, { title: "Container kiezen", text: "Type, maat, conditie en techniek worden vergeleken." }, { title: "Offerte bevestigen", text: "Product, uitrusting, belasting en logistiek staan schriftelijk vast." }, { title: "Levering afstemmen", text: "Voertuig, lossing, termijn en overdracht worden gepland." }],
    mainzLabel: "Hoofdvestiging", mainzTitle: "Centraal begeleid vanuit Mainz", mainzText: "Vanuit Mainz coördineren wij advies, offertes, orders en containerlogistiek. Bezoek is mogelijk op afspraak.", addressLabel: "Bedrijfsadres",
    standardsLabel: "Waar we voor staan", standardsTitle: "Duidelijke informatie zonder algemene beloften", standardsText: "De concrete container, gedocumenteerde conditie en schriftelijk bevestigde diensten zijn bepalend.", standards: ["Controleerbare productinformatie", "Transparante prijs en logistiek", "Direct aanspreekpunt", "Leverplanning per locatie"],
    ctaTitle: "Welke container past bij uw project?", ctaText: "Vergelijk modellen of stuur gebruik, maat en leverlocatie voor een offerte.",
  },
  it: {
    heroLabel: "Vendita container da Mainz", heroTitle: "Specialisti nella vendita di container marittimi.", heroText: "NORDIKA Container è specializzata nella vendita di container marittimi nuovi e usati, con sede principale a Mainz, Germania. Uniamo scelta del prodotto, informazioni chiare e pianificazione della consegna.",
    facts: [{ value: "Mainz", label: "Sede principale in Germania" }, { value: "Nuovi e usati", label: "Container in vendita" }, { value: "10–40 ft", label: "Misure comuni" }, { value: "UE", label: "Consegna previa verifica" }],
    focusLabel: "Attività principale", focusTitle: "Container adatti a uso, sito e budget", focusText: "La vendita di container è al centro dell'attività. Aiutiamo a confrontare tipo, lunghezza, altezza e condizione.", focusPoints: [{ title: "Container nuovi e usati", text: "Soluzioni one trip, cargo worthy e resistenti a vento e acqua secondo l'uso." }, { title: "Tipi standard e speciali", text: "Standard, high cube, open side, refrigerati e soluzioni modulari." }, { title: "Consegna e posa", text: "Accesso, terreno, scarico, gru e posizione finale vengono verificati." }],
    rangeLabel: "Gamma", rangeTitle: "Soluzioni per esigenze diverse", rangeText: "Le pagine dei tipi spiegano utilizzi e caratteristiche e portano ai prodotti disponibili.", viewType: "Vedi tipo",
    customersLabel: "Clienti", customersTitle: "Container per aziende, enti pubblici e privati", customersText: "Dal deposito aggiuntivo al progetto operativo, la proposta segue l'uso e il luogo.", customers: ["Aziende e artigiani", "Industria, logistica e costruzioni", "Comuni ed enti pubblici", "Agricoltura ed eventi", "Deposito e trasformazioni private"],
    processLabel: "Come lavoriamo", processTitle: "Chiarezza dall'esigenza alla consegna", process: [{ title: "Capire l'esigenza", text: "Definiamo uso, capacità, luogo e budget." }, { title: "Scegliere il container", text: "Confrontiamo tipo, misura, condizione e dati tecnici." }, { title: "Confermare l'offerta", text: "Prodotto, dotazioni, imposte e logistica sono indicati per iscritto." }, { title: "Coordinare la consegna", text: "Mezzo, scarico, tempi e consegna sono pianificati." }],
    mainzLabel: "Sede principale", mainzTitle: "Gestione centrale da Mainz", mainzText: "Da Mainz coordiniamo consulenza, offerte, ordini e logistica. Visite su appuntamento.", addressLabel: "Indirizzo aziendale",
    standardsLabel: "I nostri principi", standardsTitle: "Informazioni chiare, non promesse generiche", standardsText: "Contano il container specifico, la condizione documentata e i servizi confermati.", standards: ["Dati di prodotto verificabili", "Prezzi e logistica trasparenti", "Contatti diretti", "Consegna pianificata per il sito"],
    ctaTitle: "Quale container serve al tuo progetto?", ctaText: "Confronta i modelli o invia uso, misura e destinazione per un'offerta.",
  },
  cs: {
    heroLabel: "Prodej kontejnerů z Mohuče", heroTitle: "Specialisté na prodej námořních kontejnerů.", heroText: "NORDIKA Container se specializuje na prodej nových a použitých námořních kontejnerů a má hlavní sídlo v Mohuči v Německu. Propojujeme výběr, jasné informace a plánování dopravy.",
    facts: [{ value: "Mainz", label: "Hlavní sídlo v Německu" }, { value: "Nové i použité", label: "Kontejnery k prodeji" }, { value: "10–40 ft", label: "Běžné velikosti" }, { value: "EU", label: "Doprava po ověření" }],
    focusLabel: "Hlavní činnost", focusTitle: "Kontejnery podle využití, místa a rozpočtu", focusText: "Prodej kontejnerů je jádrem činnosti. Pomáháme porovnat typ, délku, výšku a stav.", focusPoints: [{ title: "Nové a použité kontejnery", text: "One-trip, cargo worthy a větru i vodě odolné varianty podle využití." }, { title: "Standardní a speciální typy", text: "Standard, high cube, open side, chladicí i prostorová řešení." }, { title: "Doprava a usazení", text: "Přístup, podklad, vykládka, jeřáb a poloha se kontrolují pro projekt." }],
    rangeLabel: "Sortiment", rangeTitle: "Řešení pro různé požadavky", rangeText: "Stránky typů vysvětlují využití a vlastnosti a odkazují na dostupné produkty.", viewType: "Zobrazit typ",
    customersLabel: "Pro koho", customersTitle: "Kontejnery pro firmy, veřejné subjekty i soukromé zákazníky", customersText: "Od dalšího skladu po provozní projekt se doporučení řídí využitím a místem.", customers: ["Firmy a řemesla", "Průmysl, logistika a stavby", "Obce a veřejní zákazníci", "Zemědělství a akce", "Soukromé skladové a přestavbové projekty"],
    processLabel: "Jak pracujeme", processTitle: "Jasně od potřeby po dopravu", process: [{ title: "Pochopit potřebu", text: "Určíme využití, kapacitu, místo a rozpočet." }, { title: "Vybrat kontejner", text: "Porovnáme typ, velikost, stav a technické údaje." }, { title: "Potvrdit nabídku", text: "Produkt, vybavení, daně a logistika jsou písemně." }, { title: "Koordinovat dopravu", text: "Naplánujeme vozidlo, vykládku, termín a předání." }],
    mainzLabel: "Hlavní sídlo", mainzTitle: "Centrálně řízeno z Mohuče", mainzText: "Z Mohuče koordinujeme poradenství, nabídky, objednávky a logistiku. Návštěvy po dohodě.", addressLabel: "Adresa společnosti",
    standardsLabel: "Naše zásady", standardsTitle: "Jasné informace místo obecných slibů", standardsText: "Rozhoduje konkrétní kontejner, zdokumentovaný stav a písemně potvrzené služby.", standards: ["Dohledatelné informace", "Transparentní ceny a logistika", "Přímé kontakty", "Doprava podle místa"],
    ctaTitle: "Který kontejner se hodí pro váš projekt?", ctaText: "Porovnejte modely nebo pošlete využití, velikost a místo dodání.",
  },
  es: {
    heroLabel: "Venta de contenedores desde Maguncia", heroTitle: "Especialistas en la venta de contenedores marítimos.", heroText: "NORDIKA Container está especializada en la venta de contenedores marítimos nuevos y usados, con sede principal en Maguncia, Alemania. Combinamos selección, información clara y planificación de entrega.",
    facts: [{ value: "Mainz", label: "Sede principal en Alemania" }, { value: "Nuevos y usados", label: "Contenedores en venta" }, { value: "10–40 ft", label: "Medidas habituales" }, { value: "UE", label: "Entrega tras revisión" }],
    focusLabel: "Actividad principal", focusTitle: "Contenedores según uso, ubicación y presupuesto", focusText: "La venta de contenedores es el centro de la actividad. Ayudamos a comparar tipo, longitud, altura y estado.", focusPoints: [{ title: "Contenedores nuevos y usados", text: "Opciones one trip, cargo worthy y resistentes al viento y agua según el uso." }, { title: "Tipos estándar y especiales", text: "Estándar, high cube, open side, refrigerados y soluciones modulares." }, { title: "Entrega e instalación", text: "Acceso, suelo, descarga, grúa y posición final se revisan para el proyecto." }],
    rangeLabel: "Gama", rangeTitle: "Soluciones para diferentes necesidades", rangeText: "Las páginas de tipo explican usos y características y enlazan con productos disponibles.", viewType: "Ver tipo",
    customersLabel: "Nuestros clientes", customersTitle: "Contenedores para empresas, entidades públicas y particulares", customersText: "Desde almacenamiento adicional hasta proyectos operativos, la recomendación depende del uso y el lugar.", customers: ["Empresas y profesionales", "Industria, logística y construcción", "Municipios y sector público", "Agricultura y eventos", "Almacenamiento y reformas privadas"],
    processLabel: "Cómo trabajamos", processTitle: "Claridad desde la necesidad hasta la entrega", process: [{ title: "Entender la necesidad", text: "Definimos uso, capacidad, lugar y presupuesto." }, { title: "Elegir contenedor", text: "Comparamos tipo, tamaño, estado y datos técnicos." }, { title: "Confirmar oferta", text: "Producto, equipo, impuestos y logística quedan por escrito." }, { title: "Coordinar entrega", text: "Planificamos vehículo, descarga, fecha y entrega." }],
    mainzLabel: "Sede principal", mainzTitle: "Gestión central desde Maguncia", mainzText: "Desde Maguncia coordinamos asesoramiento, ofertas, pedidos y logística. Visitas con cita previa.", addressLabel: "Dirección de la empresa",
    standardsLabel: "Nuestros principios", standardsTitle: "Información clara en lugar de promesas generales", standardsText: "Importan el contenedor específico, su estado documentado y los servicios confirmados.", standards: ["Información verificable", "Precios y logística transparentes", "Contacto directo", "Entrega adaptada al lugar"],
    ctaTitle: "¿Qué contenedor encaja en tu proyecto?", ctaText: "Compara modelos o envía uso, tamaño y destino para recibir una oferta.",
  },
};

export function AboutPage({ locale, content }: { locale: Locale; content: PageContent }) {
  const dict = getDictionary(locale);
  const copy = aboutCopy[locale];

  return (
    <main>
      <Breadcrumbs locale={locale} items={[{ label: content.title }]} />
      <header className="border-y border-zinc-100 bg-white py-10 md:py-14">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div><p className="eyebrow"><span className="h-1.5 w-1.5 bg-[#ffb33e]" />{copy.heroLabel}</p><h1 className="display-title max-w-3xl">{copy.heroTitle}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">{copy.heroText}</p><div className="mt-7 flex flex-wrap gap-3"><Link href={href(locale, "shop")} className="button-primary">{dict.nav.shop}<ArrowRight className="h-4 w-4" /></Link><Link href={href(locale, "quote")} className="button-outline">{dict.nav.quote}</Link></div></div>
          <div className="relative min-h-[380px] overflow-hidden bg-zinc-200 shadow-[0_18px_45px_rgba(0,0,0,0.12)] md:min-h-[520px]"><Image src={IMAGES.homeMainz} alt={`${SITE.name} ${SITE.address.city}`} fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#092b4e] via-[#092b4e]/75 to-transparent p-7 pt-24 text-white"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#ffb33e]">{copy.mainzLabel}</p><p className="mt-2 text-2xl font-extrabold">{SITE.address.city}, {SITE.address.country}</p></div></div>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-zinc-50"><div className="container-shell grid sm:grid-cols-2 lg:grid-cols-4">{copy.facts.map((fact) => <div key={fact.label} className="border-b border-zinc-200 py-6 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0"><p className="text-xl font-extrabold text-[#092b4e]">{fact.value}</p><p className="mt-1 text-sm text-zinc-500">{fact.label}</p></div>)}</div></section>

      <section className="section-space bg-white"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">{copy.focusLabel}</p><h2 className="section-title max-w-xl">{copy.focusTitle}</h2><p className="mt-5 max-w-xl text-zinc-600">{copy.focusText}</p></div><div className="grid gap-4 sm:grid-cols-3">{copy.focusPoints.map((point, index) => <article key={point.title} className="bg-zinc-50 p-6"><div className="grid h-11 w-11 place-items-center bg-primary text-white">{index === 0 ? <Ship className="h-5 w-5" /> : index === 1 ? <PackageCheck className="h-5 w-5" /> : <Truck className="h-5 w-5" />}</div><h3 className="mt-6 text-xl font-extrabold">{point.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{point.text}</p></article>)}</div></div></div></section>

      <section className="section-space bg-zinc-50"><div className="container-shell"><p className="eyebrow">{copy.rangeLabel}</p><div className="grid items-end gap-5 lg:grid-cols-2"><h2 className="section-title">{copy.rangeTitle}</h2><p className="max-w-2xl text-zinc-600">{copy.rangeText}</p></div><nav aria-label={copy.rangeTitle} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{categories.map((category) => <Link key={category.key} href={href(locale, "types", category.slugs[locale])} className="group flex min-h-52 flex-col justify-between bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:bg-primary hover:text-white"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary group-hover:text-[#ffb33e]">{category.key}</p><h3 className="mt-4 text-xl font-extrabold">{category.titles[locale]}</h3><p className="mt-3 line-clamp-3 text-sm text-zinc-600 group-hover:text-blue-50/80">{category.descriptions[locale]}</p></div><span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary group-hover:text-[#ffb33e]">{copy.viewType}<ArrowRight className="h-4 w-4" /></span></Link>)}</nav></div></section>

      <section className="section-space bg-[#092b4e] text-white"><div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow !text-[#ffb33e]">{copy.customersLabel}</p><h2 className="section-title">{copy.customersTitle}</h2><p className="mt-5 max-w-xl text-blue-100/80">{copy.customersText}</p></div><div className="grid gap-px bg-white/15 sm:grid-cols-2">{copy.customers.map((customer) => <div key={customer} className="flex items-center gap-4 bg-[#0c3763] p-5"><Users className="h-5 w-5 shrink-0 text-[#ffb33e]" /><span className="font-bold">{customer}</span></div>)}</div></div></section>

      <section className="section-space bg-white"><div className="container-shell grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="eyebrow">{copy.processLabel}</p><h2 className="section-title">{copy.processTitle}</h2></div><ol className="grid gap-px bg-zinc-200 sm:grid-cols-2">{copy.process.map((step, index) => <li key={step.title} className="bg-zinc-50 p-6"><span className="font-mono text-xs font-bold text-primary">0{index + 1}</span><h3 className="mt-4 text-xl font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{step.text}</p></li>)}</ol></div></section>

      <section className="section-space bg-zinc-50"><div className="container-shell grid gap-5 lg:grid-cols-2"><article className="surface-card p-8"><MapPin className="h-7 w-7 text-primary" /><p className="eyebrow mt-7">{copy.mainzLabel}</p><h2 className="section-title">{copy.mainzTitle}</h2><p className="mt-4 text-zinc-600">{copy.mainzText}</p><div className="mt-7 border-l-4 border-[#ffb33e] bg-zinc-50 p-5"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-zinc-500">{copy.addressLabel}</p><p className="mt-2 font-extrabold">{SITE.address.street}<br />D-{SITE.address.postalCode} {SITE.address.city}, Germany</p></div><Link href={href(locale, "locations")} className="mt-6 inline-flex items-center gap-2 font-extrabold text-primary">{dict.nav.locations}<ArrowRight className="h-4 w-4" /></Link></article><article className="surface-card p-8"><Building2 className="h-7 w-7 text-primary" /><p className="eyebrow mt-7">{copy.standardsLabel}</p><h2 className="section-title">{copy.standardsTitle}</h2><p className="mt-4 text-zinc-600">{copy.standardsText}</p><ul className="mt-6 grid gap-3">{copy.standards.map((standard) => <li key={standard} className="flex gap-3 font-semibold text-zinc-700"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{standard}</li>)}</ul></article></div></section>

      <section className="bg-[#ffb33e] py-10 text-[#092b4e]"><div className="container-shell flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><h2 className="text-2xl font-extrabold sm:text-3xl">{copy.ctaTitle}</h2><p className="mt-2 max-w-3xl font-medium text-[#092b4e]/75">{copy.ctaText}</p></div><div className="flex shrink-0 flex-wrap gap-3"><Link href={href(locale, "shop")} className="button-dark">{dict.nav.shop}<ArrowRight className="h-4 w-4" /></Link><Link href={href(locale, "quote")} className="inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 text-sm font-extrabold">{dict.nav.quote}</Link></div></div></section>
    </main>
  );
}
