export const locales = ["de", "en", "nl", "it", "cs", "es"] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  nl: "Nederlands",
  it: "Italiano",
  cs: "Čeština",
  es: "Español",
};

type Dictionary = {
  localeLabel: string;
  nav: {
    home: string;
    shop: string;
    types: string;
    conversions: string;
    delivery: string;
    guides: string;
    about: string;
    contact: string;
    locations: string;
    faq: string;
    quote: string;
    cart: string;
    menu: string;
    close: string;
  };
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    browse: string;
    request: string;
    trust: [string, string, string];
    finderEyebrow: string;
    finderTitle: string;
    finderText: string;
    categoriesEyebrow: string;
    categoriesTitle: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredText: string;
    processEyebrow: string;
    processTitle: string;
    process: [
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
    ];
    aboutEyebrow: string;
    aboutTitle: string;
    aboutText: string;
    learnMore: string;
    ctaTitle: string;
    ctaText: string;
  };
  common: {
    viewProduct: string;
    viewAll: string;
    from: string;
    priceOnRequest: string;
    inclVat: string;
    available: string;
    lowStock: string;
    outOfStock: string;
    new: string;
    used: string;
    size: string;
    condition: string;
    type: string;
    depot: string;
    price: string;
    search: string;
    reset: string;
    noResults: string;
    loading: string;
    back: string;
    next: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    breadcrumbHome: string;
    skipContent: string;
  };
  catalogue: {
    eyebrow: string;
    title: string;
    intro: string;
    searchPlaceholder: string;
    filters: string;
    allTypes: string;
    allSizes: string;
    allConditions: string;
    allDepots: string;
    sort: string;
    recommended: string;
    priceAsc: string;
    priceDesc: string;
    results: string;
    mobileFilters: string;
  };
  product: {
    sku: string;
    specifications: string;
    description: string;
    dimensions: string;
    exterior: string;
    interior: string;
    doors: string;
    weight: string;
    volume: string;
    color: string;
    quantity: string;
    addToCart: string;
    addedToCart: string;
    requestQuote: string;
    deliveryTitle: string;
    deliveryText: string;
    related: string;
    notFound: string;
  };
  footer: {
    summary: string;
    products: string;
    service: string;
    company: string;
    legal: string;
    rights: string;
    notice: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  de: {
    localeLabel: "Sprache wählen",
    nav: { home: "Start", shop: "Container kaufen", types: "Containertypen", conversions: "Containerumbau", delivery: "Lieferung & Aufstellung", guides: "Ratgeber", about: "Über uns", contact: "Kontakt", locations: "Standorte", faq: "FAQ", quote: "Angebot anfordern", cart: "Warenkorb", menu: "Menü öffnen", close: "Menü schließen" },
    home: {
      eyebrow: "Containerhandel seit 1983",
      title: "Der passende Container. Transparent beraten. Sicher geliefert.",
      intro: "Neue und gebrauchte See-, Lager-, Kühl- und Spezialcontainer für Unternehmen, öffentliche Auftraggeber und Privatkunden.",
      browse: "Container entdecken",
      request: "Persönliches Angebot",
      trust: ["Über 40 Jahre Erfahrung", "Geprüfte Container", "Deutschlandweite Lieferung"],
      finderEyebrow: "Schnell zum passenden Modell",
      finderTitle: "Welchen Container benötigen Sie?",
      finderText: "Wählen Sie Einsatz, Größe und Zustand. Unser Katalog zeigt passende verfügbare Modelle.",
      categoriesEyebrow: "Sortiment",
      categoriesTitle: "Container für jeden Einsatz",
      featuredEyebrow: "Direkt verfügbar",
      featuredTitle: "Ausgewählte Container",
      featuredText: "Aktuelle Modelle aus unserem Bestand – mit transparenten Preisen und technischen Daten.",
      processEyebrow: "Einfach geplant",
      processTitle: "Von der Auswahl bis zur Aufstellung",
      process: [
        { title: "Container auswählen", text: "Filtern Sie den Bestand oder lassen Sie sich persönlich beraten." },
        { title: "Lieferung abstimmen", text: "Wir klären Zufahrt, Untergrund, Termin und benötigte Kranleistung." },
        { title: "Sicher aufstellen", text: "Ihr Container wird am vereinbarten Ort fachgerecht positioniert." },
      ],
      aboutEyebrow: "Über Baltes Container",
      aboutTitle: "Erfahrung, die bei jedem Projekt zählt.",
      aboutText: "Seit 1983 begleiten wir Containerprojekte mit klarer Beratung, sorgfältig ausgewähltem Bestand und verlässlicher Logistik.",
      learnMore: "Mehr über uns",
      ctaTitle: "Sie haben ein konkretes Projekt?",
      ctaText: "Beschreiben Sie kurz Ihren Bedarf. Wir melden uns mit einer passenden Lösung und einem transparenten Angebot.",
    },
    common: { viewProduct: "Produkt ansehen", viewAll: "Alle anzeigen", from: "ab", priceOnRequest: "Preis auf Anfrage", inclVat: "inkl. MwSt.", available: "Verfügbar", lowStock: "Wenige verfügbar", outOfStock: "Derzeit nicht verfügbar", new: "Neu", used: "Gebraucht", size: "Größe", condition: "Zustand", type: "Typ", depot: "Depot", price: "Preis", search: "Suchen", reset: "Zurücksetzen", noResults: "Keine passenden Container gefunden.", loading: "Wird geladen …", back: "Zurück", next: "Weiter", submit: "Absenden", sending: "Wird gesendet …", success: "Vielen Dank. Ihre Anfrage wurde übermittelt.", error: "Das hat leider nicht funktioniert. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.", required: "Pflichtfeld", breadcrumbHome: "Startseite", skipContent: "Zum Inhalt springen" },
    catalogue: { eyebrow: "Aktueller Bestand", title: "Container kaufen", intro: "Vergleichen Sie neue und gebrauchte Container nach Typ, Größe, Zustand und Standort.", searchPlaceholder: "Titel, SKU oder Typ suchen", filters: "Filter", allTypes: "Alle Typen", allSizes: "Alle Größen", allConditions: "Alle Zustände", allDepots: "Alle Depots", sort: "Sortierung", recommended: "Empfohlen", priceAsc: "Preis aufsteigend", priceDesc: "Preis absteigend", results: "Ergebnisse", mobileFilters: "Filter anzeigen" },
    product: { sku: "Artikelnummer", specifications: "Technische Daten", description: "Produktbeschreibung", dimensions: "Abmessungen", exterior: "Außen", interior: "Innen", doors: "Türöffnung", weight: "Leergewicht", volume: "Volumen", color: "Farbe", quantity: "Menge", addToCart: "In den Warenkorb", addedToCart: "Zum Warenkorb hinzugefügt", requestQuote: "Angebot anfordern", deliveryTitle: "Lieferung und Aufstellung", deliveryText: "Lieferkosten werden nach Zielort, Zufahrt, Entladeart und Kranbedarf individuell berechnet. Kosten, Bearbeitungszeit und Transportzeit werden vor Vertragsschluss bestätigt; Einzelheiten stehen in den Versand- und Lieferbedingungen.", related: "Ähnliche Container", notFound: "Dieser Container ist nicht verfügbar." },
    footer: { summary: "Neue und gebrauchte Container, individuelle Umbauten und verlässliche Logistik – persönlich betreut seit 1983.", products: "Produkte", service: "Service", company: "Unternehmen", legal: "Rechtliches", rights: "Alle Rechte vorbehalten.", notice: "Preise und Verfügbarkeit vorbehaltlich finaler Bestätigung." },
  },
  en: {
    localeLabel: "Choose language",
    nav: { home: "Home", shop: "Buy containers", types: "Container types", conversions: "Container conversions", delivery: "Delivery & installation", guides: "Guides", about: "About us", contact: "Contact", locations: "Locations", faq: "FAQ", quote: "Request a quote", cart: "Cart", menu: "Open menu", close: "Close menu" },
    home: {
      eyebrow: "Container specialists since 1983", title: "The right container. Clear advice. Safe delivery.", intro: "New and used shipping, storage, refrigerated and specialist containers for businesses, public bodies and private customers.", browse: "Browse containers", request: "Get a personal quote", trust: ["Over 40 years of experience", "Inspected containers", "Delivery throughout Germany"], finderEyebrow: "Find the right model", finderTitle: "Which container do you need?", finderText: "Choose the intended use, size and condition. Our catalogue will show suitable available models.", categoriesEyebrow: "Range", categoriesTitle: "Containers for every application", featuredEyebrow: "Available now", featuredTitle: "Selected containers", featuredText: "Current models from our stock, with clear prices and technical details.", processEyebrow: "Simple planning", processTitle: "From selection to installation", process: [{ title: "Choose a container", text: "Filter our stock or ask us for personal advice." }, { title: "Plan delivery", text: "We clarify access, ground conditions, timing and crane requirements." }, { title: "Install safely", text: "Your container is positioned professionally at the agreed location." }], aboutEyebrow: "About Baltes Container", aboutTitle: "Experience that counts on every project.", aboutText: "Since 1983, we have supported container projects with straightforward advice, carefully selected stock and reliable logistics.", learnMore: "Learn more about us", ctaTitle: "Have a specific project in mind?", ctaText: "Tell us what you need. We will respond with a suitable solution and a transparent quote." },
    common: { viewProduct: "View product", viewAll: "View all", from: "from", priceOnRequest: "Price on request", inclVat: "incl. VAT", available: "Available", lowStock: "Low stock", outOfStock: "Currently unavailable", new: "New", used: "Used", size: "Size", condition: "Condition", type: "Type", depot: "Depot", price: "Price", search: "Search", reset: "Reset", noResults: "No matching containers found.", loading: "Loading …", back: "Back", next: "Next", submit: "Submit", sending: "Sending …", success: "Thank you. Your enquiry has been sent.", error: "Something went wrong. Please try again or contact us directly.", required: "Required", breadcrumbHome: "Home", skipContent: "Skip to content" },
    catalogue: { eyebrow: "Current stock", title: "Buy containers", intro: "Compare new and used containers by type, size, condition and location.", searchPlaceholder: "Search title, SKU or type", filters: "Filters", allTypes: "All types", allSizes: "All sizes", allConditions: "All conditions", allDepots: "All depots", sort: "Sort", recommended: "Recommended", priceAsc: "Price: low to high", priceDesc: "Price: high to low", results: "results", mobileFilters: "Show filters" },
    product: { sku: "SKU", specifications: "Technical details", description: "Product description", dimensions: "Dimensions", exterior: "Exterior", interior: "Interior", doors: "Door opening", weight: "Tare weight", volume: "Volume", color: "Colour", quantity: "Quantity", addToCart: "Add to cart", addedToCart: "Added to cart", requestQuote: "Request a quote", deliveryTitle: "Delivery and installation", deliveryText: "Delivery cost depends on location, access and crane requirements. We confirm it before you place an order.", related: "Related containers", notFound: "This container is not available." },
    footer: { summary: "New and used containers, custom conversions and reliable logistics, personally managed since 1983.", products: "Products", service: "Service", company: "Company", legal: "Legal", rights: "All rights reserved.", notice: "Prices and availability are subject to final confirmation." },
  },
  nl: {
    localeLabel: "Taal kiezen",
    nav: { home: "Home", shop: "Containers kopen", types: "Containertypes", conversions: "Containerombouw", delivery: "Levering & plaatsing", guides: "Advies", about: "Over ons", contact: "Contact", locations: "Locaties", faq: "Veelgestelde vragen", quote: "Offerte aanvragen", cart: "Winkelwagen", menu: "Menu openen", close: "Menu sluiten" },
    home: { eyebrow: "Containerspecialist sinds 1983", title: "De juiste container. Helder advies. Veilig geleverd.", intro: "Nieuwe en gebruikte zee-, opslag-, koel- en speciale containers voor bedrijven, overheden en particulieren.", browse: "Bekijk containers", request: "Persoonlijke offerte", trust: ["Meer dan 40 jaar ervaring", "Gecontroleerde containers", "Levering in heel Duitsland"], finderEyebrow: "Snel het juiste model", finderTitle: "Welke container hebt u nodig?", finderText: "Kies toepassing, maat en staat. Onze catalogus toont geschikte beschikbare modellen.", categoriesEyebrow: "Assortiment", categoriesTitle: "Containers voor elke toepassing", featuredEyebrow: "Direct beschikbaar", featuredTitle: "Geselecteerde containers", featuredText: "Actuele voorraad met duidelijke prijzen en technische gegevens.", processEyebrow: "Eenvoudig geregeld", processTitle: "Van keuze tot plaatsing", process: [{ title: "Container kiezen", text: "Filter de voorraad of vraag persoonlijk advies." }, { title: "Levering plannen", text: "We bespreken toegang, ondergrond, datum en kraanvereisten." }, { title: "Veilig plaatsen", text: "Uw container wordt professioneel op de afgesproken plek gezet." }], aboutEyebrow: "Over Baltes Container", aboutTitle: "Ervaring die bij elk project telt.", aboutText: "Sinds 1983 begeleiden we containerprojecten met helder advies, zorgvuldig geselecteerde voorraad en betrouwbare logistiek.", learnMore: "Meer over ons", ctaTitle: "Hebt u een concreet project?", ctaText: "Vertel ons kort wat u nodig hebt. Wij reageren met een passende oplossing en transparante offerte." },
    common: { viewProduct: "Product bekijken", viewAll: "Alles bekijken", from: "vanaf", priceOnRequest: "Prijs op aanvraag", inclVat: "incl. btw", available: "Beschikbaar", lowStock: "Beperkte voorraad", outOfStock: "Momenteel niet beschikbaar", new: "Nieuw", used: "Gebruikt", size: "Maat", condition: "Staat", type: "Type", depot: "Depot", price: "Prijs", search: "Zoeken", reset: "Resetten", noResults: "Geen passende containers gevonden.", loading: "Laden …", back: "Terug", next: "Volgende", submit: "Verzenden", sending: "Verzenden …", success: "Bedankt. Uw aanvraag is verzonden.", error: "Er ging iets mis. Probeer het opnieuw of neem rechtstreeks contact op.", required: "Verplicht", breadcrumbHome: "Home", skipContent: "Naar inhoud" },
    catalogue: { eyebrow: "Actuele voorraad", title: "Containers kopen", intro: "Vergelijk nieuwe en gebruikte containers op type, maat, staat en locatie.", searchPlaceholder: "Zoek op titel, SKU of type", filters: "Filters", allTypes: "Alle types", allSizes: "Alle maten", allConditions: "Alle condities", allDepots: "Alle depots", sort: "Sorteren", recommended: "Aanbevolen", priceAsc: "Prijs oplopend", priceDesc: "Prijs aflopend", results: "resultaten", mobileFilters: "Filters tonen" },
    product: { sku: "Artikelnummer", specifications: "Technische gegevens", description: "Productbeschrijving", dimensions: "Afmetingen", exterior: "Buiten", interior: "Binnen", doors: "Deuropening", weight: "Leeggewicht", volume: "Volume", color: "Kleur", quantity: "Aantal", addToCart: "In winkelwagen", addedToCart: "Toegevoegd aan winkelwagen", requestQuote: "Offerte aanvragen", deliveryTitle: "Levering en plaatsing", deliveryText: "De leveringskosten hangen af van locatie, toegang en kraanvereisten. We bevestigen ze vóór de bestelling.", related: "Vergelijkbare containers", notFound: "Deze container is niet beschikbaar." },
    footer: { summary: "Nieuwe en gebruikte containers, maatwerk en betrouwbare logistiek, persoonlijk begeleid sinds 1983.", products: "Producten", service: "Service", company: "Bedrijf", legal: "Juridisch", rights: "Alle rechten voorbehouden.", notice: "Prijzen en beschikbaarheid onder voorbehoud van definitieve bevestiging." },
  },
  it: {
    localeLabel: "Scegli la lingua",
    nav: { home: "Home", shop: "Acquista container", types: "Tipi di container", conversions: "Trasformazioni", delivery: "Consegna e posa", guides: "Guide", about: "Chi siamo", contact: "Contatti", locations: "Sedi", faq: "Domande frequenti", quote: "Richiedi preventivo", cart: "Carrello", menu: "Apri menu", close: "Chiudi menu" },
    home: { eyebrow: "Specialisti dal 1983", title: "Il container giusto. Consulenza chiara. Consegna sicura.", intro: "Container marittimi, da deposito, refrigerati e speciali, nuovi e usati, per aziende, enti pubblici e privati.", browse: "Scopri i container", request: "Preventivo personale", trust: ["Oltre 40 anni di esperienza", "Container controllati", "Consegna in tutta la Germania"], finderEyebrow: "Trova subito il modello", finderTitle: "Di quale container hai bisogno?", finderText: "Scegli utilizzo, dimensione e condizione. Il catalogo mostra i modelli disponibili più adatti.", categoriesEyebrow: "Gamma", categoriesTitle: "Container per ogni utilizzo", featuredEyebrow: "Disponibili subito", featuredTitle: "Container selezionati", featuredText: "Modelli attualmente in stock, con prezzi chiari e dati tecnici.", processEyebrow: "Pianificazione semplice", processTitle: "Dalla scelta alla posa", process: [{ title: "Scegli il container", text: "Filtra lo stock o richiedi una consulenza personale." }, { title: "Pianifica la consegna", text: "Verifichiamo accesso, terreno, data e necessità della gru." }, { title: "Posa sicura", text: "Il container viene posizionato professionalmente nel luogo concordato." }], aboutEyebrow: "Baltes Container", aboutTitle: "Esperienza che conta in ogni progetto.", aboutText: "Dal 1983 seguiamo progetti container con consulenza chiara, stock selezionato e logistica affidabile.", learnMore: "Scopri chi siamo", ctaTitle: "Hai un progetto concreto?", ctaText: "Descrivici brevemente le tue esigenze. Ti proporremo una soluzione adatta e un preventivo trasparente." },
    common: { viewProduct: "Vedi prodotto", viewAll: "Vedi tutti", from: "da", priceOnRequest: "Prezzo su richiesta", inclVat: "IVA incl.", available: "Disponibile", lowStock: "Pochi disponibili", outOfStock: "Non disponibile", new: "Nuovo", used: "Usato", size: "Dimensione", condition: "Condizione", type: "Tipo", depot: "Deposito", price: "Prezzo", search: "Cerca", reset: "Azzera", noResults: "Nessun container corrispondente.", loading: "Caricamento …", back: "Indietro", next: "Avanti", submit: "Invia", sending: "Invio …", success: "Grazie. La richiesta è stata inviata.", error: "Si è verificato un errore. Riprova o contattaci direttamente.", required: "Obbligatorio", breadcrumbHome: "Home", skipContent: "Vai al contenuto" },
    catalogue: { eyebrow: "Stock attuale", title: "Acquista container", intro: "Confronta container nuovi e usati per tipo, dimensione, condizione e località.", searchPlaceholder: "Cerca titolo, SKU o tipo", filters: "Filtri", allTypes: "Tutti i tipi", allSizes: "Tutte le dimensioni", allConditions: "Tutte le condizioni", allDepots: "Tutti i depositi", sort: "Ordina", recommended: "Consigliati", priceAsc: "Prezzo crescente", priceDesc: "Prezzo decrescente", results: "risultati", mobileFilters: "Mostra filtri" },
    product: { sku: "Codice", specifications: "Dati tecnici", description: "Descrizione", dimensions: "Dimensioni", exterior: "Esterno", interior: "Interno", doors: "Apertura porte", weight: "Tara", volume: "Volume", color: "Colore", quantity: "Quantità", addToCart: "Aggiungi al carrello", addedToCart: "Aggiunto al carrello", requestQuote: "Richiedi preventivo", deliveryTitle: "Consegna e posa", deliveryText: "Il costo dipende da località, accesso e gru necessaria. Lo confermiamo prima dell'ordine.", related: "Container simili", notFound: "Questo container non è disponibile." },
    footer: { summary: "Container nuovi e usati, trasformazioni su misura e logistica affidabile, seguiti personalmente dal 1983.", products: "Prodotti", service: "Servizi", company: "Azienda", legal: "Note legali", rights: "Tutti i diritti riservati.", notice: "Prezzi e disponibilità soggetti a conferma finale." },
  },
  cs: {
    localeLabel: "Vyberte jazyk",
    nav: { home: "Úvod", shop: "Koupit kontejnery", types: "Typy kontejnerů", conversions: "Úpravy kontejnerů", delivery: "Doprava a usazení", guides: "Průvodci", about: "O nás", contact: "Kontakt", locations: "Pobočky", faq: "Časté dotazy", quote: "Poptat nabídku", cart: "Košík", menu: "Otevřít nabídku", close: "Zavřít nabídku" },
    home: { eyebrow: "Specialisté na kontejnery od roku 1983", title: "Správný kontejner. Jasné poradenství. Bezpečné dodání.", intro: "Nové i použité námořní, skladové, chladicí a speciální kontejnery pro firmy, veřejný sektor i soukromé zákazníky.", browse: "Prohlédnout kontejnery", request: "Osobní nabídka", trust: ["Více než 40 let zkušeností", "Kontrolované kontejnery", "Doprava po celém Německu"], finderEyebrow: "Rychlý výběr", finderTitle: "Jaký kontejner potřebujete?", finderText: "Vyberte použití, velikost a stav. Katalog zobrazí vhodné dostupné modely.", categoriesEyebrow: "Sortiment", categoriesTitle: "Kontejnery pro každé využití", featuredEyebrow: "Ihned k dispozici", featuredTitle: "Vybrané kontejnery", featuredText: "Aktuální skladové modely s přehlednými cenami a technickými údaji.", processEyebrow: "Snadné plánování", processTitle: "Od výběru po usazení", process: [{ title: "Vyberte kontejner", text: "Filtrujte sklad nebo požádejte o osobní poradenství." }, { title: "Naplánujte dopravu", text: "Prověříme příjezd, podklad, termín a požadavky na jeřáb." }, { title: "Bezpečné usazení", text: "Kontejner odborně umístíme na dohodnuté místo." }], aboutEyebrow: "O Baltes Container", aboutTitle: "Zkušenosti důležité pro každý projekt.", aboutText: "Od roku 1983 zajišťujeme kontejnerové projekty s jasným poradenstvím, pečlivě vybraným skladem a spolehlivou logistikou.", learnMore: "Více o nás", ctaTitle: "Máte konkrétní projekt?", ctaText: "Stručně popište svou potřebu. Navrhneme vhodné řešení a transparentní nabídku." },
    common: { viewProduct: "Zobrazit produkt", viewAll: "Zobrazit vše", from: "od", priceOnRequest: "Cena na dotaz", inclVat: "vč. DPH", available: "Dostupné", lowStock: "Poslední kusy", outOfStock: "Nyní nedostupné", new: "Nový", used: "Použitý", size: "Velikost", condition: "Stav", type: "Typ", depot: "Depo", price: "Cena", search: "Hledat", reset: "Obnovit", noResults: "Nebyly nalezeny odpovídající kontejnery.", loading: "Načítání …", back: "Zpět", next: "Další", submit: "Odeslat", sending: "Odesílání …", success: "Děkujeme. Vaše poptávka byla odeslána.", error: "Něco se nezdařilo. Zkuste to znovu nebo nás kontaktujte přímo.", required: "Povinné", breadcrumbHome: "Úvod", skipContent: "Přejít k obsahu" },
    catalogue: { eyebrow: "Aktuální sklad", title: "Koupit kontejnery", intro: "Porovnejte nové a použité kontejnery podle typu, velikosti, stavu a lokality.", searchPlaceholder: "Hledat název, SKU nebo typ", filters: "Filtry", allTypes: "Všechny typy", allSizes: "Všechny velikosti", allConditions: "Všechny stavy", allDepots: "Všechna depa", sort: "Řazení", recommended: "Doporučené", priceAsc: "Cena vzestupně", priceDesc: "Cena sestupně", results: "výsledků", mobileFilters: "Zobrazit filtry" },
    product: { sku: "Kód", specifications: "Technické údaje", description: "Popis produktu", dimensions: "Rozměry", exterior: "Vnější", interior: "Vnitřní", doors: "Otvor dveří", weight: "Hmotnost", volume: "Objem", color: "Barva", quantity: "Množství", addToCart: "Přidat do košíku", addedToCart: "Přidáno do košíku", requestQuote: "Poptat nabídku", deliveryTitle: "Doprava a usazení", deliveryText: "Cena dopravy závisí na místě, přístupu a potřebném jeřábu. Potvrdíme ji před objednávkou.", related: "Podobné kontejnery", notFound: "Tento kontejner není dostupný." },
    footer: { summary: "Nové a použité kontejnery, úpravy na míru a spolehlivá logistika s osobním přístupem od roku 1983.", products: "Produkty", service: "Služby", company: "Společnost", legal: "Právní informace", rights: "Všechna práva vyhrazena.", notice: "Ceny a dostupnost podléhají konečnému potvrzení." },
  },
  es: {
    localeLabel: "Elegir idioma",
    nav: { home: "Inicio", shop: "Comprar contenedores", types: "Tipos de contenedor", conversions: "Transformaciones", delivery: "Entrega e instalación", guides: "Guías", about: "Quiénes somos", contact: "Contacto", locations: "Ubicaciones", faq: "Preguntas frecuentes", quote: "Solicitar presupuesto", cart: "Carrito", menu: "Abrir menú", close: "Cerrar menú" },
    home: { eyebrow: "Especialistas desde 1983", title: "El contenedor adecuado. Asesoramiento claro. Entrega segura.", intro: "Contenedores marítimos, de almacenamiento, refrigerados y especiales, nuevos y usados, para empresas, organismos públicos y particulares.", browse: "Ver contenedores", request: "Presupuesto personal", trust: ["Más de 40 años de experiencia", "Contenedores revisados", "Entrega en toda Alemania"], finderEyebrow: "Encuentra tu modelo", finderTitle: "¿Qué contenedor necesitas?", finderText: "Elige uso, tamaño y estado. El catálogo mostrará los modelos disponibles más adecuados.", categoriesEyebrow: "Gama", categoriesTitle: "Contenedores para cada uso", featuredEyebrow: "Disponibles ahora", featuredTitle: "Contenedores seleccionados", featuredText: "Modelos actuales en stock, con precios claros y datos técnicos.", processEyebrow: "Planificación sencilla", processTitle: "De la elección a la instalación", process: [{ title: "Elige el contenedor", text: "Filtra el stock o solicita asesoramiento personal." }, { title: "Planifica la entrega", text: "Revisamos acceso, suelo, fecha y necesidades de grúa." }, { title: "Instalación segura", text: "Tu contenedor se coloca profesionalmente en el lugar acordado." }], aboutEyebrow: "Sobre Baltes Container", aboutTitle: "Experiencia que cuenta en cada proyecto.", aboutText: "Desde 1983 gestionamos proyectos de contenedores con asesoramiento claro, stock seleccionado y logística fiable.", learnMore: "Conócenos", ctaTitle: "¿Tienes un proyecto concreto?", ctaText: "Cuéntanos brevemente qué necesitas. Te propondremos una solución adecuada y un presupuesto transparente." },
    common: { viewProduct: "Ver producto", viewAll: "Ver todos", from: "desde", priceOnRequest: "Precio a consultar", inclVat: "IVA incl.", available: "Disponible", lowStock: "Pocas unidades", outOfStock: "No disponible", new: "Nuevo", used: "Usado", size: "Tamaño", condition: "Estado", type: "Tipo", depot: "Depósito", price: "Precio", search: "Buscar", reset: "Restablecer", noResults: "No hay contenedores coincidentes.", loading: "Cargando …", back: "Atrás", next: "Siguiente", submit: "Enviar", sending: "Enviando …", success: "Gracias. Tu solicitud ha sido enviada.", error: "Algo ha fallado. Inténtalo de nuevo o contáctanos directamente.", required: "Obligatorio", breadcrumbHome: "Inicio", skipContent: "Ir al contenido" },
    catalogue: { eyebrow: "Stock actual", title: "Comprar contenedores", intro: "Compara contenedores nuevos y usados por tipo, tamaño, estado y ubicación.", searchPlaceholder: "Buscar título, SKU o tipo", filters: "Filtros", allTypes: "Todos los tipos", allSizes: "Todos los tamaños", allConditions: "Todos los estados", allDepots: "Todos los depósitos", sort: "Ordenar", recommended: "Recomendados", priceAsc: "Precio ascendente", priceDesc: "Precio descendente", results: "resultados", mobileFilters: "Mostrar filtros" },
    product: { sku: "Referencia", specifications: "Datos técnicos", description: "Descripción", dimensions: "Dimensiones", exterior: "Exterior", interior: "Interior", doors: "Apertura de puertas", weight: "Tara", volume: "Volumen", color: "Color", quantity: "Cantidad", addToCart: "Añadir al carrito", addedToCart: "Añadido al carrito", requestQuote: "Solicitar presupuesto", deliveryTitle: "Entrega e instalación", deliveryText: "El coste depende de la ubicación, el acceso y la grúa necesaria. Lo confirmamos antes del pedido.", related: "Contenedores similares", notFound: "Este contenedor no está disponible." },
    footer: { summary: "Contenedores nuevos y usados, transformaciones a medida y logística fiable, con atención personal desde 1983.", products: "Productos", service: "Servicios", company: "Empresa", legal: "Legal", rights: "Todos los derechos reservados.", notice: "Precios y disponibilidad sujetos a confirmación final." },
  },
};

type BrandOverride = {
  nav: Pick<Dictionary["nav"], "locations">;
  home: Pick<Dictionary["home"], "eyebrow" | "trust" | "aboutEyebrow" | "aboutTitle" | "aboutText">;
  catalogue: Pick<Dictionary["catalogue"], "intro">;
  footer: Pick<Dictionary["footer"], "summary">;
};

const brandOverrides: Record<Locale, BrandOverride> = {
  de: {
    nav: { locations: "Adresse" },
    home: { eyebrow: "Containerlösungen für Gewerbe und Privat", trust: ["Persönliche Beratung", "Geprüfte Container", "Deutschlandweite Lieferung"], aboutEyebrow: "Über NORDIKA Container", aboutTitle: "Klare Lösungen für jedes Projekt.", aboutText: "NORDIKA Container verbindet passende Container, klare Beratung und verlässliche Logistik – zentral betreut von unserem Standort in Mainz." },
    catalogue: { intro: "Vergleichen Sie neue und gebrauchte Container nach Typ, Größe und Zustand." },
    footer: { summary: "Neue und gebrauchte Container, individuelle Umbauten und verlässliche Logistik – persönlich betreut von Mainz aus." },
  },
  en: {
    nav: { locations: "Address" },
    home: { eyebrow: "Container solutions for business and private customers", trust: ["Personal advice", "Inspected containers", "Delivery throughout Germany"], aboutEyebrow: "About NORDIKA Container", aboutTitle: "Clear solutions for every project.", aboutText: "NORDIKA Container brings together suitable containers, straightforward advice and reliable logistics, managed centrally from Mainz." },
    catalogue: { intro: "Compare new and used containers by type, size and condition." },
    footer: { summary: "New and used containers, custom conversions and reliable logistics, personally managed from Mainz." },
  },
  nl: {
    nav: { locations: "Adres" },
    home: { eyebrow: "Containeroplossingen voor zakelijk en privé", trust: ["Persoonlijk advies", "Gecontroleerde containers", "Levering in heel Duitsland"], aboutEyebrow: "Over NORDIKA Container", aboutTitle: "Duidelijke oplossingen voor elk project.", aboutText: "NORDIKA Container combineert passende containers, helder advies en betrouwbare logistiek, centraal begeleid vanuit Mainz." },
    catalogue: { intro: "Vergelijk nieuwe en gebruikte containers op type, maat en staat." },
    footer: { summary: "Nieuwe en gebruikte containers, maatwerk en betrouwbare logistiek, persoonlijk begeleid vanuit Mainz." },
  },
  it: {
    nav: { locations: "Indirizzo" },
    home: { eyebrow: "Soluzioni container per aziende e privati", trust: ["Consulenza personale", "Container controllati", "Consegna in tutta la Germania"], aboutEyebrow: "NORDIKA Container", aboutTitle: "Soluzioni chiare per ogni progetto.", aboutText: "NORDIKA Container unisce container adatti, consulenza chiara e logistica affidabile, con gestione centrale da Mainz." },
    catalogue: { intro: "Confronta container nuovi e usati per tipo, dimensione e condizione." },
    footer: { summary: "Container nuovi e usati, trasformazioni su misura e logistica affidabile, gestiti personalmente da Mainz." },
  },
  cs: {
    nav: { locations: "Adresa" },
    home: { eyebrow: "Kontejnerová řešení pro firmy i soukromé zákazníky", trust: ["Osobní poradenství", "Kontrolované kontejnery", "Doprava po celém Německu"], aboutEyebrow: "O NORDIKA Container", aboutTitle: "Jasná řešení pro každý projekt.", aboutText: "NORDIKA Container spojuje vhodné kontejnery, jasné poradenství a spolehlivou logistiku s centrálním řízením z Mohuče." },
    catalogue: { intro: "Porovnejte nové a použité kontejnery podle typu, velikosti a stavu." },
    footer: { summary: "Nové a použité kontejnery, úpravy na míru a spolehlivá logistika s osobním přístupem z Mohuče." },
  },
  es: {
    nav: { locations: "Dirección" },
    home: { eyebrow: "Soluciones de contenedores para empresas y particulares", trust: ["Asesoramiento personal", "Contenedores revisados", "Entrega en toda Alemania"], aboutEyebrow: "Sobre NORDIKA Container", aboutTitle: "Soluciones claras para cada proyecto.", aboutText: "NORDIKA Container reúne contenedores adecuados, asesoramiento claro y logística fiable, gestionados de forma central desde Maguncia." },
    catalogue: { intro: "Compara contenedores nuevos y usados por tipo, tamaño y estado." },
    footer: { summary: "Contenedores nuevos y usados, transformaciones a medida y logística fiable, gestionados personalmente desde Maguncia." },
  },
};

for (const locale of locales) {
  Object.assign(dictionaries[locale].nav, brandOverrides[locale].nav);
  Object.assign(dictionaries[locale].home, brandOverrides[locale].home);
  Object.assign(dictionaries[locale].catalogue, brandOverrides[locale].catalogue);
  Object.assign(dictionaries[locale].footer, brandOverrides[locale].footer);
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
