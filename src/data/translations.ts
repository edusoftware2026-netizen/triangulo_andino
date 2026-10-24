import { Language } from '../types';

export interface TranslationDict {
  navHome: string;
  navBuilder: string;
  navSmartRoute: string;
  nav3Countries: string;
  navHotels: string;
  navExplorer: string;
  navArchitecture: string;
  navAdmin: string;
  concierge247: string;
  modeBadge: string;
  
  // Hero
  heroTag: string;
  heroSubtitle: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  pillMedical: string;
  pill4x4: string;
  pillHotels: string;
  pillAI: string;
  quickDeparture: string;
  quickDestinations: string;
  quickDuration: string;
  quickButton: string;

  // Catalog
  curatedCatalog: string;
  catalogTitle: string;
  catalogDesc: string;
  pricePerPax: string;
  dailyDepartures: string;
  customizeWithAI: string;
  viewDetails: string;
  filterAll: string;
  filterChile: string;
  filterBolivia: string;
  filterPeru: string;
  
  // Explorer
  explorerTitle: string;
  explorerSubtitle: string;
  explorerPlaceholder: string;
  explorerSearchBtn: string;
  explorerSearching: string;
  altitudeMsnm: string;
  climateTitle: string;
  whatToPackTitle: string;
  borderRequirementsTitle: string;
  attractionsTitle: string;
  acclimationAdviceTitle: string;
  riskLevel: string;
  verifiedGrounding: string;

  // Builder
  builderKicker: string;
  builderTitle: string;
  builderSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  paramDays: string;
  paramTravelers: string;
  paramMode: string;
  paramTier: string;
  btnGenerateRoute: string;
  itineraryDaysTitle: string;
  itineraryDaysSubtitle: string;
  routeTotalQuote: string;
  totalGroup: string;
  subtotalLogistics: string;
  subtotalHotels: string;
  subtotalTickets: string;
  satelliteIncluded: string;
  btnBookGuarantee: string;
  btnWhatsapp: string;
  btnDownloadPDF: string;

  // Checkout & Voucher
  checkoutTitle: string;
  checkoutSubtitle: string;
  guaranteeDeposit: string;
  remainingBalance: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  payWithStripe: string;
  processingPayment: string;
  voucherSuccessTitle: string;
  voucherCode: string;
  voucherOfficialTitle: string;
  voucherDownloadBtn: string;
  voucherPrintBtn: string;
  voucherSendWhatsapp: string;

  // Admin
  adminKicker: string;
  adminTitle: string;
  adminSubtitle: string;
  kpiTotalRevenue: string;
  kpiNetProfit: string;
  kpiPaidBookings: string;
  kpiTopDestination: string;
  aiGeneratorTitle: string;
  aiGeneratorDesc: string;
  aiDestinationInput: string;
  aiDaysInput: string;
  btnGenerateAndPublish: string;
  recentBookingsTitle: string;
  tableId: string;
  tableClient: string;
  tablePackage: string;
  tableTotal: string;
  tableProfit: string;
  tableStatus: string;
  tableDate: string;
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  ES: {
    navHome: "Explorar Paquetes",
    navBuilder: "Armador de Ruta IA",
    navSmartRoute: "Smart Route",
    nav3Countries: "Circuitos 3 Países",
    navHotels: "Experiencias & Hoteles",
    navExplorer: "Enciclopedia IA",
    navArchitecture: "Arquitectura & API",
    navAdmin: "Panel Admin",
    concierge247: "Concierge 24/7",
    modeBadge: "Dual Mode: Gemini 3.8 + Grounding Activo",

    heroTag: "Expediciones de Autor 2025 · 2026",
    heroSubtitle: "Chile · Bolivia · Perú",
    heroTitle1: "El Encuentro de Tres Mundos:",
    heroTitle2: "Chile, Bolivia & Perú",
    heroDesc: "Expediciones privadas y circuitos de alta gama orquestados por Inteligencia Artificial y respaldados las 24 horas por concierges locales en el Altiplano y los Andes Centrales.",
    pillMedical: "Aclimatación Médica Progresiva",
    pill4x4: "Tracción 4x4 Privada Satelital",
    pillHotels: "Relais & Châteaux · Palacios de Sal",
    pillAI: "Grounding Gemini & Live Search API",
    quickDeparture: "Punto de Partida",
    quickDestinations: "Destinos Predilectos",
    quickDuration: "Duración & Época",
    quickButton: "Trazar con IA",

    curatedCatalog: "Catálogo Curado",
    catalogTitle: "Circuitos Estrella Pre-armados",
    catalogDesc: "Rutas transfronterizas diseñadas con ritmos biológicos controlados, permisos diplomáticos de aduana expedita y campamentos de lujo móvil en zonas remotas.",
    pricePerPax: "Precio base por expedicionario",
    dailyDepartures: "Salidas Diarias",
    customizeWithAI: "Personalizar con IA",
    viewDetails: "Cotizar & Reservar",
    filterAll: "Todos",
    filterChile: "Chile (Atacama)",
    filterBolivia: "Bolivia (Uyuni)",
    filterPeru: "Perú (Cusco & Puno)",

    explorerTitle: "Enciclopedia IA de Destinos Andinos",
    explorerSubtitle: "Búsqueda en vivo respaldada por Google Search Grounding. Datos reales de altitud, clima, logística de frontera y recomendaciones médicas.",
    explorerPlaceholder: "Busca un destino (ej. Salar de Uyuni, San Pedro de Atacama, Machu Picchu, Lago Titicaca, Samaipata)...",
    explorerSearchBtn: "Investigar con IA",
    explorerSearching: "Consultando satélites y Google Search Grounding...",
    altitudeMsnm: "Altitud Oficial",
    climateTitle: "Clima & Mejor Época",
    whatToPackTitle: "Qué Llevar en la Maleta",
    borderRequirementsTitle: "Requisitos de Cruce de Frontera",
    attractionsTitle: "Atractivos Principales",
    acclimationAdviceTitle: "Aclimatación Médica y Soroche",
    riskLevel: "Nivel de Altura",
    verifiedGrounding: "Información verificada en tiempo real mediante Google Search Grounding",

    builderKicker: "Módulo Inteligente de Planificación",
    builderTitle: "Armador Inteligente de Ruta Andina",
    builderSubtitle: "Diseña tu expedición combinada por Chile, Bolivia y Perú. Nuestra IA con Google Search Grounding optimiza altitud, aclimatación escalonada, logística de frontera y cotización en tiempo real.",
    step1Title: "Selección de Destinos Emblemáticos",
    step1Desc: "Marca los hitos de tu viaje. El motor recalcula la curva de altitud automáticamente.",
    step2Title: "Parámetros del Viajero & Nivel de Confort",
    paramDays: "Días Totales Disponibles",
    paramTravelers: "Número de Expedicionarios",
    paramMode: "Modalidad de Viaje",
    paramTier: "Categoría Hotelera & Refugios",
    btnGenerateRoute: "✨ Trazar Ruta Óptima y Cotizar con IA (Simulador Gemini + Grounding)",
    itineraryDaysTitle: "Desglose Cronológico Día por Día",
    itineraryDaysSubtitle: "Estructurado para máxima aclimatación física y óptimos tiempos de paso fronterizo.",
    routeTotalQuote: "Cotización Estimada Por Pasajero",
    totalGroup: "Total Grupo",
    subtotalLogistics: "Expedición 4x4 Privada & Cruce de Fronteras",
    subtotalHotels: "Hotelería Seleccionada & Refugios",
    subtotalTickets: "Permisos Machu Picchu & Parques Nacionales",
    satelliteIncluded: "Incluido",
    btnBookGuarantee: "Reservar con 20% de Garantía (Mock Checkout)",
    btnWhatsapp: "WhatsApp Concierge",
    btnDownloadPDF: "Descargar Voucher / PDF",

    checkoutTitle: "Garantía de Expedición (20%)",
    checkoutSubtitle: "Bloqueo de cupos en hoteles boutique de sal, permisos intransferibles a Machu Picchu y logística 4x4 satelital.",
    guaranteeDeposit: "Depósito de Confirmación (20%):",
    remainingBalance: "Saldo restante (80%) a cancelar 30 días antes del inicio de la ruta.",
    fullName: "Nombre Completo del Expedicionario Principal",
    email: "Correo Electrónico de Contacto",
    phone: "Teléfono Móvil (WhatsApp)",
    travelDate: "Fecha Estimada de Inicio",
    cardNumber: "Número de Tarjeta (Simulador Seguro Stripe)",
    cardExpiry: "Vencimiento",
    cardCVC: "CVC",
    payWithStripe: "Procesar Pago Seguro con Stripe",
    processingPayment: "Verificando token bancario en Stripe...",
    voucherSuccessTitle: "¡Expedición Confirmada Exitosamente!",
    voucherCode: "Código de Voucher Oficial:",
    voucherOfficialTitle: "Voucher de Reserva y Salvoconducto Andino",
    voucherDownloadBtn: "Imprimir / Guardar Voucher PDF",
    voucherPrintBtn: "Imprimir Voucher",
    voucherSendWhatsapp: "Compartir con Concierge Satelital",

    adminKicker: "Administración Estratégica & Rendición de Cuentas",
    adminTitle: "Panel Admin · Triángulo Andino",
    adminSubtitle: "Métricas financieras en tiempo real y Generador IA de Paquetes con traducción en 4 idiomas.",
    kpiTotalRevenue: "Ingresos Totales Brutos",
    kpiNetProfit: "Ganancia Neta Agencia USD",
    kpiPaidBookings: "Reservas Pagadas",
    kpiTopDestination: "Destino Top en Ventas",
    aiGeneratorTitle: "Generador IA de Paquetes de Alta Gama",
    aiGeneratorDesc: "La dueña escribe un destino y número de días. La IA investiga el destino, genera el itinerario día por día, calcula costos y márgenes, traduce a 4 idiomas (ES, EN, PT, FR) y lo publica al catálogo en vivo.",
    aiDestinationInput: "Destino o Región a Desarrollar",
    aiDaysInput: "Cantidad de Días",
    btnGenerateAndPublish: "🚀 Generar Itinerario, Traducir a 4 Idiomas & Publicar al Catálogo",
    recentBookingsTitle: "Registro de Reservas y Rentabilidad (30% Tour, 20% Hotel, 30% Traslados)",
    tableId: "ID Voucher",
    tableClient: "Expedicionario",
    tablePackage: "Paquete",
    tableTotal: "Monto Total",
    tableProfit: "Ganancia Agencia",
    tableStatus: "Estado",
    tableDate: "Fecha"
  },
  EN: {
    navHome: "Explore Packages",
    navBuilder: "AI Route Builder",
    navSmartRoute: "Smart Route",
    nav3Countries: "3-Nation Circuits",
    navHotels: "Experiences & Lodges",
    navExplorer: "AI Encyclopedia",
    navArchitecture: "Architecture & API",
    navAdmin: "Admin Panel",
    concierge247: "Concierge 24/7",
    modeBadge: "Dual Mode: Gemini 3.8 + Grounding Active",

    heroTag: "Signature Expeditions 2025 · 2026",
    heroSubtitle: "Chile · Bolivia · Peru",
    heroTitle1: "The Crossroads of Three Worlds:",
    heroTitle2: "Chile, Bolivia & Peru",
    heroDesc: "Private high-altitude bespoke expeditions orchestrated by Artificial Intelligence and backed 24 hours a day by local concierges across the Altiplano and Central Andes.",
    pillMedical: "Progressive Medical Acclimation",
    pill4x4: "Private Satellite 4x4 Traction",
    pillHotels: "Relais & Châteaux · Salt Palaces",
    pillAI: "Gemini Grounding & Live Search API",
    quickDeparture: "Departure Point",
    quickDestinations: "Desired Destinations",
    quickDuration: "Duration & Season",
    quickButton: "Design with AI",

    curatedCatalog: "Curated Catalog",
    catalogTitle: "Star Signature Packages",
    catalogDesc: "Cross-border routes crafted with controlled circadian biological rhythms, expedited diplomatic customs assistance, and mobile luxury camps.",
    pricePerPax: "Base price per traveler",
    dailyDepartures: "Daily Departures",
    customizeWithAI: "Customize with AI",
    viewDetails: "Quote & Book",
    filterAll: "All",
    filterChile: "Chile (Atacama)",
    filterBolivia: "Bolivia (Uyuni)",
    filterPeru: "Peru (Cusco & Puno)",

    explorerTitle: "AI Andean Destination Encyclopedia",
    explorerSubtitle: "Live search powered by Google Search Grounding. Real data for elevation, weather, border regulations, and medical precautions.",
    explorerPlaceholder: "Search any destination (e.g., Salar de Uyuni, San Pedro de Atacama, Machu Picchu, Lake Titicaca, Samaipata)...",
    explorerSearchBtn: "Research with AI",
    explorerSearching: "Querying satellite data & Google Search Grounding...",
    altitudeMsnm: "Official Elevation",
    climateTitle: "Climate & Best Season",
    whatToPackTitle: "Essential Packing List",
    borderRequirementsTitle: "Border Crossing Regulations",
    attractionsTitle: "Key Landmarks",
    acclimationAdviceTitle: "Altitude Acclimation Advice",
    riskLevel: "Altitude Level",
    verifiedGrounding: "Information verified in real time via Google Search Grounding",

    builderKicker: "Intelligent Route Planning Module",
    builderTitle: "Intelligent Andean Route Builder",
    builderSubtitle: "Design your bespoke expedition across Chile, Bolivia, and Peru. Our AI with Google Search Grounding optimizes altitude acclimation, border logistics, and live pricing.",
    step1Title: "Select Key Andean Destinations",
    step1Desc: "Pick your landmarks. The engine automatically recalculates altitude curves.",
    step2Title: "Traveler Parameters & Comfort Tier",
    paramDays: "Total Available Days",
    paramTravelers: "Number of Travelers",
    paramMode: "Travel Mode",
    paramTier: "Hospitality & Lodge Tier",
    btnGenerateRoute: "✨ Generate Optimal Route & Quote with AI (Gemini + Grounding)",
    itineraryDaysTitle: "Day-by-Day Chronological Itinerary",
    itineraryDaysSubtitle: "Structured for maximum physical acclimation and seamless border crossing intervals.",
    routeTotalQuote: "Estimated Quote Per Traveler",
    totalGroup: "Total Group",
    subtotalLogistics: "Private 4x4 Expedition & Border Crossing",
    subtotalHotels: "Selected Hospitality & Mountain Lodges",
    subtotalTickets: "Machu Picchu & National Park Permits",
    satelliteIncluded: "Included",
    btnBookGuarantee: "Book with 20% Guarantee (Mock Checkout)",
    btnWhatsapp: "WhatsApp Concierge",
    btnDownloadPDF: "Download Voucher / PDF",

    checkoutTitle: "Expedition Guarantee Deposit (20%)",
    checkoutSubtitle: "Secures reservation in boutique salt hotels, non-transferable Machu Picchu circuit permits, and satellite 4x4 vehicles.",
    guaranteeDeposit: "Confirmation Deposit (20%):",
    remainingBalance: "Remaining 80% balance due 30 days prior to departure.",
    fullName: "Lead Traveler Full Name",
    email: "Contact Email",
    phone: "Mobile Phone (WhatsApp)",
    travelDate: "Target Travel Date",
    cardNumber: "Card Number (Stripe Secure Simulator)",
    cardExpiry: "Expiry",
    cardCVC: "CVC",
    payWithStripe: "Process Secure Payment with Stripe",
    processingPayment: "Verifying secure payment token with Stripe...",
    voucherSuccessTitle: "Expedition Successfully Confirmed!",
    voucherCode: "Official Voucher Code:",
    voucherOfficialTitle: "Official Booking Voucher & Andean Safe Conduct",
    voucherDownloadBtn: "Print / Save Voucher PDF",
    voucherPrintBtn: "Print Voucher",
    voucherSendWhatsapp: "Share with Satellite Concierge",

    adminKicker: "Strategic Administration & Financial Audit",
    adminTitle: "Admin Dashboard · Triángulo Andino",
    adminSubtitle: "Live financial metrics and AI Package Generator with automated 4-language localization.",
    kpiTotalRevenue: "Gross Total Revenue",
    kpiNetProfit: "Net Agency Profit USD",
    kpiPaidBookings: "Paid Bookings",
    kpiTopDestination: "Top Selling Destination",
    aiGeneratorTitle: "AI High-End Package Generator",
    aiGeneratorDesc: "Type a destination and duration. Gemini researches the location, drafts the daily itinerary, computes cost margins, translates to 4 languages (ES, EN, PT, FR), and instantly publishes it live.",
    aiDestinationInput: "Target Destination or Region",
    aiDaysInput: "Duration in Days",
    btnGenerateAndPublish: "🚀 Research, Generate in 4 Languages & Publish Live to Catalog",
    recentBookingsTitle: "Recent Reservations & Profitability Audit (30% Tour, 20% Hotel, 30% Transfers)",
    tableId: "Voucher ID",
    tableClient: "Lead Traveler",
    tablePackage: "Expedition Package",
    tableTotal: "Total Gross",
    tableProfit: "Agency Profit",
    tableStatus: "Status",
    tableDate: "Date"
  },
  PT: {
    navHome: "Explorar Pacotes",
    navBuilder: "Planejador de Rota IA",
    navSmartRoute: "Smart Route",
    nav3Countries: "Circuitos 3 Países",
    navHotels: "Experiências & Hotéis",
    navExplorer: "Enciclopédia IA",
    navArchitecture: "Arquitetura & API",
    navAdmin: "Painel Admin",
    concierge247: "Concierge 24/7",
    modeBadge: "Dual Mode: Gemini 3.8 + Grounding Ativo",

    heroTag: "Expedições Exclusivas 2025 · 2026",
    heroSubtitle: "Chile · Bolívia · Peru",
    heroTitle1: "O Encontro de Três Mundos:",
    heroTitle2: "Chile, Bolívia & Peru",
    heroDesc: "Expedições privadas e circuitos de alto luxo orquestrados por Inteligência Artificial e acompanhados 24 horas por concierges locais no Altiplano e nos Andes Centrais.",
    pillMedical: "Aclimatação Médica Progressiva",
    pill4x4: "Tração 4x4 Privada Satelital",
    pillHotels: "Relais & Châteaux · Palácios de Sal",
    pillAI: "Grounding Gemini & Live Search API",
    quickDeparture: "Ponto de Partida",
    quickDestinations: "Destinos Preferidos",
    quickDuration: "Duração & Época",
    quickButton: "Desenhar com IA",

    curatedCatalog: "Catálogo Curado",
    catalogTitle: "Circuitos Estrela Pré-Montados",
    catalogDesc: "Rotas transfronteiriças desenhadas com ritmos biológicos controlados, auxílio alfandegário VIP e acampamentos de luxo móvel.",
    pricePerPax: "Preço base por expedicionário",
    dailyDepartures: "Saídas Diárias",
    customizeWithAI: "Personalizar com IA",
    viewDetails: "Cotar & Reservar",
    filterAll: "Todos",
    filterChile: "Chile (Atacama)",
    filterBolivia: "Bolivia (Uyuni)",
    filterPeru: "Peru (Cusco & Puno)",

    explorerTitle: "Enciclopédia IA de Destinos Andinos",
    explorerSubtitle: "Pesquisa em tempo real respaldada pelo Google Search Grounding. Dados reais de altitude, clima e fronteiras.",
    explorerPlaceholder: "Procure qualquer destino (ex.: Salar de Uyuni, San Pedro de Atacama, Machu Picchu, Lago Titicaca, Samaipata)...",
    explorerSearchBtn: "Investigar com IA",
    explorerSearching: "Consultando satélites e Google Search Grounding...",
    altitudeMsnm: "Altitude Oficial",
    climateTitle: "Clima & Melhor Época",
    whatToPackTitle: "O Que Levar na Mala",
    borderRequirementsTitle: "Requisitos de Fronteira",
    attractionsTitle: "Atrações Principais",
    acclimationAdviceTitle: "Aclimatação e Soroche",
    riskLevel: "Nível de Altitude",
    verifiedGrounding: "Informação verificada em tempo real via Google Search Grounding",

    builderKicker: "Módulo Inteligente de Planejamento",
    builderTitle: "Planejador Inteligente de Rota Andina",
    builderSubtitle: "Desenhe sua expedição combinada pelo Chile, Bolívia e Peru com otimização médica e cálculo em tempo real.",
    step1Title: "Seleção de Destinos Emblemáticos",
    step1Desc: "Marque os pontos da sua viagem para o cálculo automático de altitude.",
    step2Title: "Parâmetros dos Viajantes & Nível de Conforto",
    paramDays: "Dias Totais Disponíveis",
    paramTravelers: "Número de Expedicionários",
    paramMode: "Modalidade de Viagem",
    paramTier: "Categoria de Hotéis & Refúgios",
    btnGenerateRoute: "✨ Traçar Rota Ótima e Cotar com IA (Gemini + Grounding)",
    itineraryDaysTitle: "Itinerário Detalhado Dia a Dia",
    itineraryDaysSubtitle: "Estruturado para máxima aclimatação física e cruzamentos de fronteira tranquilos.",
    routeTotalQuote: "Cotação Estimada Por Passageiro",
    totalGroup: "Total Grupo",
    subtotalLogistics: "Expedição 4x4 Privada & Cruzamento de Fronteiras",
    subtotalHotels: "Hotelaria Selecionada & Refúgios",
    subtotalTickets: "Ingressos Machu Picchu & Parques Nacionais",
    satelliteIncluded: "Incluído",
    btnBookGuarantee: "Reservar com 20% de Garantia (Mock Checkout)",
    btnWhatsapp: "WhatsApp Concierge",
    btnDownloadPDF: "Baixar Voucher / PDF",

    checkoutTitle: "Garantia de Expedição (20%)",
    checkoutSubtitle: "Bloqueio de vagas em hotéis de sal, autorizações para Machu Picchu e veículos 4x4 satelitais.",
    guaranteeDeposit: "Depósito de Confirmação (20%):",
    remainingBalance: "Saldo restante (80%) pago 30 dias antes do início.",
    fullName: "Nome Completo do Expedicionário Principal",
    email: "E-mail de Contato",
    phone: "Telefone Celular (WhatsApp)",
    travelDate: "Data Estimada",
    cardNumber: "Número do Cartão (Simulador Seguro Stripe)",
    cardExpiry: "Validade",
    cardCVC: "CVC",
    payWithStripe: "Processar Pagamento Seguro com Stripe",
    processingPayment: "Verificando token bancário no Stripe...",
    voucherSuccessTitle: "Expedição Confirmada com Sucesso!",
    voucherCode: "Código do Voucher Oficial:",
    voucherOfficialTitle: "Voucher Oficial de Reserva e Salvo-Conduto Andino",
    voucherDownloadBtn: "Imprimir / Salvar Voucher PDF",
    voucherPrintBtn: "Imprimir Voucher",
    voucherSendWhatsapp: "Compartilhar com Concierge Satelital",

    adminKicker: "Administração Estratégica & Auditoria",
    adminTitle: "Painel Admin · Triângulo Andino",
    adminSubtitle: "Métricas financeiras em tempo real e Gerador IA de Pacotes com tradução automática em 4 idiomas.",
    kpiTotalRevenue: "Receita Bruta Total",
    kpiNetProfit: "Lucro Líquido da Agência USD",
    kpiPaidBookings: "Reservas Pagas",
    kpiTopDestination: "Destino Líder em Vendas",
    aiGeneratorTitle: "Gerador IA de Pacotes de Alto Padrão",
    aiGeneratorDesc: "A proprietária digita um destino e os dias. A IA investiga o local, cria o itinerário diário, calcula custos e margens, traduz para 4 idiomas e publica ao vivo no catálogo.",
    aiDestinationInput: "Destino ou Região Alvo",
    aiDaysInput: "Quantidade de Dias",
    btnGenerateAndPublish: "🚀 Gerar Itinerário, Traduzir para 4 Idiomas & Publicar no Catálogo",
    recentBookingsTitle: "Registro de Reservas e Rentabilidade (30% Tour, 20% Hotel, 30% Traslados)",
    tableId: "ID Voucher",
    tableClient: "Expedicionário",
    tablePackage: "Pacote",
    tableTotal: "Valor Total",
    tableProfit: "Lucro Agência",
    tableStatus: "Estado",
    tableDate: "Data"
  },
  FR: {
    navHome: "Explorer les Forfaits",
    navBuilder: "Créateur d'Itinéraire IA",
    navSmartRoute: "Smart Route",
    nav3Countries: "Circuits 3 Pays",
    navHotels: "Expériences & Hôtels",
    navExplorer: "Encyclopédie IA",
    navArchitecture: "Architecture & API",
    navAdmin: "Panneau Admin",
    concierge247: "Concierge 24/7",
    modeBadge: "Dual Mode: Gemini 3.8 + Grounding Actif",

    heroTag: "Expéditions de Haute Gamme 2025 · 2026",
    heroSubtitle: "Chili · Bolivie · Pérou",
    heroTitle1: "La Rencontre de Trois Mondes :",
    heroTitle2: "Chili, Bolivie & Pérou",
    heroDesc: "Expéditions privées et circuits d'exception orchestrés par l'Intelligence Artificielle et accompagnés 24h/24 par des concierges locaux sur l'Altiplano et les Andes centrales.",
    pillMedical: "Acclimatation Médicale Progressive",
    pill4x4: "Traction 4x4 Privée par Satellite",
    pillHotels: "Relais & Châteaux · Palais de Sel",
    pillAI: "Grounding Gemini & Live Search API",
    quickDeparture: "Point de Départ",
    quickDestinations: "Destinations Souhaitées",
    quickDuration: "Durée & Période",
    quickButton: "Concevoir avec l'IA",

    curatedCatalog: "Catalogue Privé",
    catalogTitle: "Circuits d'Auteur Prémontés",
    catalogDesc: "Itinéraires transfrontaliers avec rythmes biologiques régulés, dédouanement diplomatique express et camps de luxe mobiles.",
    pricePerPax: "Prix de base par voyageur",
    dailyDepartures: "Départs Quotidiens",
    customizeWithAI: "Personnaliser avec l'IA",
    viewDetails: "Devis & Réserver",
    filterAll: "Tous",
    filterChile: "Chili (Atacama)",
    filterBolivia: "Bolivie (Uyuni)",
    filterPeru: "Pérou (Cusco & Puno)",

    explorerTitle: "Encyclopédie IA des Destinations Andines",
    explorerSubtitle: "Recherche en direct propulsée par Google Search Grounding. Données certifiées d'altitude, météo et formalités de frontière.",
    explorerPlaceholder: "Recherchez une destination (ex. Salar de Uyuni, Atacama, Machu Picchu, Lac Titicaca, Samaipata)...",
    explorerSearchBtn: "Explorer avec l'IA",
    explorerSearching: "Consultation des données satellites & Google Search Grounding...",
    altitudeMsnm: "Altitude Officielle",
    climateTitle: "Climat & Meilleure Période",
    whatToPackTitle: "Vêtements & Équipements Clés",
    borderRequirementsTitle: "Conditions de Passage Frontalier",
    attractionsTitle: "Sites Remarquables",
    acclimationAdviceTitle: "Conseils Médicaux & Mal des Montagnes",
    riskLevel: "Niveau d'Altitude",
    verifiedGrounding: "Informations vérifiées en temps réel via Google Search Grounding",

    builderKicker: "Module Intelligent d'Expédition",
    builderTitle: "Concepteur Intelligent d'Itinéraire Andin",
    builderSubtitle: "Concevez votre expédition d'exception à travers le Chili, la Bolivie et le Pérou avec optimisation de l'acclimatation et devis en temps réel.",
    step1Title: "Sélection des Destinations Clés",
    step1Desc: "Choisissez vos étapes. Le moteur réajuste le profil d'altitude en direct.",
    step2Title: "Paramètres des Voyageurs & Confort",
    paramDays: "Jours Totaux Disponibles",
    paramTravelers: "Nombre de Voyageurs",
    paramMode: "Mode de Voyage",
    paramTier: "Catégorie Hôtelière & Lodges",
    btnGenerateRoute: "✨ Tracer l'Itinéraire Idéal avec IA (Gemini + Grounding)",
    itineraryDaysTitle: "Programme Chronologique Jour par Jour",
    itineraryDaysSubtitle: "Structuré pour une acclimatation douce et un franchissement optimal des frontières.",
    routeTotalQuote: "Devis Estimé Par Voyageur",
    totalGroup: "Total Groupe",
    subtotalLogistics: "Expédition 4x4 Privée & Passage Frontières",
    subtotalHotels: "Hôtellerie d'Exception & Lodges",
    subtotalTickets: "Permis Machu Picchu & Parcs Nationaux",
    satelliteIncluded: "Inclus",
    btnBookGuarantee: "Réserver avec 20% d'Acompte (Mock Checkout)",
    btnWhatsapp: "WhatsApp Concierge",
    btnDownloadPDF: "Télécharger Voucher / PDF",

    checkoutTitle: "Garantie d'Expédition (20%)",
    checkoutSubtitle: "Verrouillage des chambres dans les hôtels de sel de prestige, permis exclusifs Machu Picchu et véhicules 4x4 par satellite.",
    guaranteeDeposit: "Acompte de Confirmation (20%) :",
    remainingBalance: "Solde restant (80%) payable 30 jours avant le départ.",
    fullName: "Nom Complet du Voyageur Principal",
    email: "Adresse E-mail de Contact",
    phone: "Téléphone Mobile (WhatsApp)",
    travelDate: "Date Cible de Départ",
    cardNumber: "Numéro de Carte (Simulateur Sécurisé Stripe)",
    cardExpiry: "Expiration",
    cardCVC: "CVC",
    payWithStripe: "Procéder au Paiement Sécurisé via Stripe",
    processingPayment: "Validation du token bancaire auprès de Stripe...",
    voucherSuccessTitle: "Expédition Confirmée avec Succès !",
    voucherCode: "Code du Voucher Officiel :",
    voucherOfficialTitle: "Voucher de Réservation & Sauf-Conduit Andin",
    voucherDownloadBtn: "Imprimer / Enregistrer le Voucher PDF",
    voucherPrintBtn: "Imprimer le Voucher",
    voucherSendWhatsapp: "Transmettre au Concierge Satellite",

    adminKicker: "Gestion Stratégique & Audit Financier",
    adminTitle: "Tableau de Bord Admin · Triángulo Andino",
    adminSubtitle: "Indicateurs financiers en direct et Générateur IA de Forfaits avec traduction automatique en 4 langues.",
    kpiTotalRevenue: "Chiffre d'Affaires Brut Total",
    kpiNetProfit: "Marge Nette Agence USD",
    kpiPaidBookings: "Réservations Validées",
    kpiTopDestination: "Destination la Plus Vendue",
    aiGeneratorTitle: "Générateur IA de Forfaits de Haute Gamme",
    aiGeneratorDesc: "La directrice saisit une destination et une durée. L'IA étudie le lieu, structure l'itinéraire quotidien, calcule les coûts et marges, traduit en 4 langues et publie directement dans le catalogue.",
    aiDestinationInput: "Destination ou Région Cible",
    aiDaysInput: "Nombre de Jours",
    btnGenerateAndPublish: "🚀 Générer l'Itinéraire, Traduire en 4 Langues & Publier au Catalogue",
    recentBookingsTitle: "Registre des Réservations et Marges (30% Tour, 20% Hôtel, 30% Transferts)",
    tableId: "ID Voucher",
    tableClient: "Voyageur",
    tablePackage: "Circuit",
    tableTotal: "Montant Total",
    tableProfit: "Marge Agence",
    tableStatus: "Statut",
    tableDate: "Date"
  }
};
