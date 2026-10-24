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
  
  // Live Home Route Planner
  homeRoutePlannerKicker: string;
  homeRoutePlannerTitle: string;
  homeRoutePlannerDesc: string;
  homeSatelliteBadge: string;
  homeSyncCountries: string;
  homeSelectMilestones: string;
  homeRouteElevationTitle: string;
  homeAutoGeoConnection: string;
  homeBonusApplied: string;
  homeStartingPoint: string;
  homeEndingPoint: string;
  homeBorderCrossing1: string;
  homeBorderCrossing2: string;
  homeEstimatedDuration: string;
  homeEstimatedBudget: string;
  homeCombinedSavings: string;
  homeTakeToBuilder: string;

  // Hotels & Experiences Section
  homeHotelsKicker: string;
  homeHotelsTitle: string;
  homeHotelsDesc: string;
  homeCulinaryKicker: string;
  homeCulinaryTitle: string;
  homeCulinaryDesc: string;
  homeStargazingTitle: string;
  homeStargazingDesc: string;
  homePicnicTitle: string;
  homePicnicDesc: string;
  homeTastingTitle: string;
  homeTastingDesc: string;
  homeIncludedBadge: string;
  homeExclusiveBadge: string;
  homeReservedBadge: string;
  homeEmergencyBannerTitle: string;
  homeEmergencyBannerDesc: string;

  // Package Details
  backToCatalog: string;
  maxAltitudeMetersLabel: string;
  highEndInclusions: string;
  realTimeQuoter: string;
  configureExpedition: string;
  expeditionersLabel: string;
  personsUnit: string;
  travelMode: string;
  completePackage: string;
  expeditionOnly: string;
  accommodationCategory: string;
  comfortTier: string;
  boutiqueTier: string;
  luxuryTier: string;
  extraExperiences: string;
  pricePerTraveler: string;
  totalGroupLabel: string;
  baseTour: string;
  hotelCategory: string;
  transfersLogistics: string;
  extraActivities: string;
  reservationGuarantee: string;
  estimatedAgencyMargin: string;
  consultConcierge247: string;
  selectedHotelsForCircuit: string;
  mealsLabel: string;
  transportLabel: string;
  acclimationNotice: string;

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

  // Checkout & Stripe
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
  securePaymentStripe: string;
  sslEncrypted: string;
  expeditionGuaranteeSubtitle: string;
  payNowLabel: string;
  totalExpeditionLabel: string;
  remainingBalanceLabel: string;
  leadTraveler: string;
  emailField: string;
  satelliteWhatsapp: string;
  estimatedDepartureDate: string;
  cardDataSandbox: string;
  noHiddenFees: string;
  sernaturWarranty: string;
  sorocheFlexible: string;
  confirmBookingBtn: string;
  authorizingStripe: string;

  // Voucher
  voucherSuccessTitle: string;
  voucherCode: string;
  voucherOfficialTitle: string;
  voucherDownloadBtn: string;
  voucherPrintBtn: string;
  voucherSendWhatsapp: string;
  officialVoucherTitle: string;
  crossBorderSafeConduct: string;
  uniqueBookingCode: string;
  depositConfirmed: string;
  contractedExpedition: string;
  includedExtrasTitle: string;
  officialScanAdmissions: string;
  cryptoValidator: string;
  medicalProtocolHeading: string;
  medicalProtocolText: string;
  printVoucher: string;
  sendToConcierge: string;
  finalizeBtn: string;

  // Footer
  footerMission: string;
  footerSignatureRoutes: string;
  footerTechData: string;
  footerConciergeSupport: string;
  footerConciergeDesc: string;
  footerSubscribeTitle: string;
  footerSubscribeDesc: string;
  footerSubscribePlaceholder: string;
  footerSubscribeBtn: string;
  footerSubscribedMsg: string;
  footerRights: string;

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

    homeRoutePlannerKicker: "Herramienta interactiva en vivo",
    homeRoutePlannerTitle: "Armador multi-destino con trazado de ruta",
    homeRoutePlannerDesc: "Marca los hitos que sueñas visitar. Nuestro motor geográfico traza la ruta óptima de sur a norte, conecta los cruces fronterizos y calcula tu cotización en vivo con descuento multi-país.",
    homeSatelliteBadge: "Logística satelital Garmin InReach",
    homeSyncCountries: "Chile · Bolivia · Perú sincronizados",
    homeSelectMilestones: "1. Selecciona los hitos que deseas unir en tu expedición:",
    homeRouteElevationTitle: "Trazado altimétrico de tu ruta en vivo",
    homeAutoGeoConnection: "Conexión geográfica automatizada:",
    homeBonusApplied: "15% Bonificación multi-destino aplicada",
    homeStartingPoint: "Punto de partida:",
    homeEndingPoint: "Término:",
    homeBorderCrossing1: "Cruce 4x4 Hito Cajón (Chile ➔ Bolivia)",
    homeBorderCrossing2: "Cruce Kasani / Desaguadero (Bolivia ➔ Perú)",
    homeEstimatedDuration: "Duración estimada",
    homeEstimatedBudget: "Presupuesto por viajero (Base)",
    homeCombinedSavings: "Ahorro por combinar destinos",
    homeTakeToBuilder: "Llevar selección al armador IA",

    homeHotelsKicker: "Colección privada",
    homeHotelsTitle: "Hoteles emblemáticos & lodges de altura",
    homeHotelsDesc: "Descanso sin concesiones en los confines del planeta. Arquitectura vernácula, muros de sal cristalina tallada a mano y servicio de cinco estrellas a más de 3.600 metros de altitud.",
    homeCulinaryKicker: "Sensorial & gastronomía",
    homeCulinaryTitle: "Experiencias culinarias de alta atmósfera",
    homeCulinaryDesc: "Degustaciones maridadas con vinos de altura bolivianos (Tarija), cepas patrimoniales chilenas y cocina de raíces quechuas y aymaras.",
    homeStargazingTitle: "Cena astronómica en el desierto",
    homeStargazingDesc: "Bajo el cielo más puro y límpido del hemisferio sur. Menú de degustación en 5 pasos maridado con vinos del Valle de Huasco mientras un astrofísico guía la observación con telescopio de alta precisión.",
    homePicnicTitle: "Picnic flotante en el espejo de sal",
    homePicnicDesc: "Mesa privada con lencería blanca montada directamente sobre la lámina de agua infinita. Cocina de quinoa real, carne de llama confitada y champagne helado en el corazón del silencio blanco.",
    homeTastingTitle: "Degustación de alturas andinas",
    homeTastingDesc: "Exploración culinaria de ecosistemas verticales inspirada en el centro de investigación Mater Iniciativa de Virgilio Martínez. Ingredientes recolectados desde el nivel del mar hasta 4.500 metros.",
    homeIncludedBadge: "Incluido en circuito insignia",
    homeExclusiveBadge: "Exclusividad Triángulo Andino",
    homeReservedBadge: "Mesa prioritaria reservada",
    homeEmergencyBannerTitle: "¿Deseas una ruta inédita o coordinar tu viaje en privado?",
    homeEmergencyBannerDesc: "Nuestros asesores andinos bilingües y equipo médico de expedición están disponibles para ajustar vuelos locales, permisos de alta montaña y requerimientos de aclimatación.",

    backToCatalog: "Volver al catálogo",
    maxAltitudeMetersLabel: "Altitud máx:",
    highEndInclusions: "Inclusiones de alta gama y seguridad",
    realTimeQuoter: "Cotizador dinámico en tiempo real",
    configureExpedition: "Configura tu expedición",
    expeditionersLabel: "Expedicionarios:",
    personsUnit: "Personas",
    travelMode: "Modalidad de viaje",
    completePackage: "Paquete completo (con hotel)",
    expeditionOnly: "Solo expedición (sin hotel)",
    accommodationCategory: "Categoría de alojamiento",
    comfortTier: "3★ Confort",
    boutiqueTier: "4★ Boutique",
    luxuryTier: "5★ Luxury",
    extraExperiences: "Experiencias extra opcionales",
    pricePerTraveler: "Precio por expedicionario",
    totalGroupLabel: "Total grupo",
    baseTour: "Base tour:",
    hotelCategory: "Hotelería",
    transfersLogistics: "Traslados 4x4 y logística:",
    extraActivities: "Actividades extra:",
    reservationGuarantee: "Garantía de reserva (20%):",
    estimatedAgencyMargin: "Margen neto agencia estimado:",
    consultConcierge247: "Consultar con Concierge 24/7",
    selectedHotelsForCircuit: "Hotelería seleccionada para este circuito",
    mealsLabel: "Comidas:",
    transportLabel: "Transporte:",
    acclimationNotice: "Estructurado para máxima aclimatación física y óptimos tiempos de paso fronterizo.",

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

    checkoutTitle: "Garantía de Expedición (20% Depósito)",
    checkoutSubtitle: "Asegura bloqueos en hoteles de sal, permisos intransferibles a Machu Picchu y logística 4x4 satelital.",
    guaranteeDeposit: "Garantía de Reserva (20%):",
    remainingBalance: "El 80% restante se abona 30 días antes del inicio de la expedición.",
    fullName: "Nombre Completo del Expedicionario Principal",
    email: "Correo Electrónico de Contacto",
    phone: "Teléfono Móvil (WhatsApp)",
    travelDate: "Fecha Estimada de Salida",
    cardNumber: "Número de Tarjeta (Simulador Seguro Stripe)",
    cardExpiry: "Vencimiento",
    cardCVC: "CVC",
    payWithStripe: "Confirmar Reserva con Stripe",
    processingPayment: "Verificando token de pago seguro con Stripe...",
    securePaymentStripe: "Pago seguro con Stripe",
    sslEncrypted: "256-bit SSL",
    expeditionGuaranteeSubtitle: "Garantía de expedición (20% de depósito inicial)",
    payNowLabel: "Monto a pagar ahora (20% depósito):",
    totalExpeditionLabel: "Total expedición",
    remainingBalanceLabel: "Saldo restante:",
    leadTraveler: "Expedicionario principal *",
    emailField: "Correo electrónico *",
    satelliteWhatsapp: "WhatsApp satelital *",
    estimatedDepartureDate: "Fecha estimada de salida *",
    cardDataSandbox: "Datos de tarjeta (Stripe Elements Sandbox)",
    noHiddenFees: "Sin cargos ocultos",
    sernaturWarranty: "Garantía Sernatur #7482",
    sorocheFlexible: "Reprogramable por soroche",
    confirmBookingBtn: "Confirmar reserva",
    authorizingStripe: "Autorizando con Stripe...",

    voucherSuccessTitle: "¡Expedición Reservada Exitosamente!",
    voucherCode: "Código Oficial de Reserva:",
    voucherOfficialTitle: "Voucher Oficial de Expedición y Salvoconducto Andino",
    voucherDownloadBtn: "Descargar / Imprimir Voucher PDF",
    voucherPrintBtn: "Imprimir Voucher",
    voucherSendWhatsapp: "Compartir con Concierge Satelital",
    officialVoucherTitle: "Voucher oficial de expedición",
    crossBorderSafeConduct: "Salvoconducto transfronterizo · Chile, Bolivia & Perú",
    uniqueBookingCode: "Código único de reserva",
    depositConfirmed: "Depósito confirmado (Stripe)",
    contractedExpedition: "Expedición contratada",
    includedExtrasTitle: "Experiencias adicionales incluidas:",
    officialScanAdmissions: "Escaneo oficial en aduanas y hoteles",
    cryptoValidator: "Validador criptográfico Triángulo Andino",
    medicalProtocolHeading: "Protocolo médico andino & cruce de fronteras",
    medicalProtocolText: "Presentar este salvoconducto digital o impreso ante el guía líder de 4x4 en el punto de encuentro. Incluye oxigenoterapia de cabina, seguro satelital Garmin InReach y tramitación migratoria prioritaria en Hito Cajón (Chile-Bolivia) y Kasani (Bolivia-Perú).",
    printVoucher: "Imprimir voucher",
    sendToConcierge: "Enviar a WhatsApp Concierge",
    finalizeBtn: "Finalizar",

    footerMission: "Pioneros en expediciones de alta gama a través del Altiplano, Atacama y los Andes Centrales. Uniendo Chile, Bolivia y Perú con sofisticación arquitectónica, trazabilidad satelital y rigor de servicio.",
    footerSignatureRoutes: "Rutas magistrales",
    footerTechData: "Tecnología & datos",
    footerConciergeSupport: "Asistencia concierge ininterrumpida",
    footerConciergeDesc: "Soporte logístico por satélite Garmin InReach y enlace prioritario WhatsApp 24/7 para expedicionarios en ruta.",
    footerSubscribeTitle: "Boletín de alta montaña",
    footerSubscribeDesc: "Novedades estacionales sobre floración en el desierto, lagunas de colores y nuevas aperturas hoteleras.",
    footerSubscribePlaceholder: "Tu correo corporativo o personal",
    footerSubscribeBtn: "Suscribirme",
    footerSubscribedMsg: "¡Gracias! Recibirás nuestras crónicas trimestrales.",
    footerRights: "Todos los derechos reservados. Salvoconducto y acreditaciones de turismo transfronterizo válidas para Chile, Bolivia y Perú.",

    adminKicker: "Gestión Estratégica & Auditoría",
    adminTitle: "Panel Admin · Triángulo Andino",
    adminSubtitle: "Métricas financieras en tiempo real y Generador IA de Paquetes con traducción en 4 idiomas.",
    kpiTotalRevenue: "Ingresos Totales Brutos",
    kpiNetProfit: "Margen Neto Agencia USD",
    kpiPaidBookings: "Reservas Pagadas",
    kpiTopDestination: "Destino Líder en Ventas",
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

    homeRoutePlannerKicker: "Live Interactive Tool",
    homeRoutePlannerTitle: "Multi-Destination Route Builder",
    homeRoutePlannerDesc: "Select the milestones you dream of visiting. Our geographic engine maps the optimal south-to-north route, connects border crossings, and computes your live quote with multi-country savings.",
    homeSatelliteBadge: "Garmin InReach Satellite Logistics",
    homeSyncCountries: "Chile · Bolivia · Peru synchronized",
    homeSelectMilestones: "1. Select the milestones to connect in your expedition:",
    homeRouteElevationTitle: "Live Route Elevation Profile",
    homeAutoGeoConnection: "Automated geographic connection:",
    homeBonusApplied: "15% Multi-destination bonus applied",
    homeStartingPoint: "Starting point:",
    homeEndingPoint: "End point:",
    homeBorderCrossing1: "4x4 Hito Cajón Crossing (Chile ➔ Bolivia)",
    homeBorderCrossing2: "Kasani / Desaguadero Crossing (Bolivia ➔ Peru)",
    homeEstimatedDuration: "Estimated duration",
    homeEstimatedBudget: "Budget per traveler (Base)",
    homeCombinedSavings: "Savings from combining destinations",
    homeTakeToBuilder: "Transfer Selection to AI Builder",

    homeHotelsKicker: "Private Collection",
    homeHotelsTitle: "Signature Hotels & High-Altitude Lodges",
    homeHotelsDesc: "Uncompromising comfort at the edge of the world. Vernacular architecture, hand-carved crystalline salt walls, and five-star service over 3,600 meters above sea level.",
    homeCulinaryKicker: "Sensory & Gastronomy",
    homeCulinaryTitle: "High-Atmosphere Culinary Experiences",
    homeCulinaryDesc: "Tasting menus paired with Bolivian high-altitude wines (Tarija), Chilean heritage varietals, and Quechua & Aymara ancestral cuisine.",
    homeStargazingTitle: "Astronomical Desert Dinner",
    homeStargazingDesc: "Under the clearest skies in the Southern Hemisphere. 5-course tasting menu paired with Huasco Valley wines while an astrophysicist guides stargazing with high-aperture telescopes.",
    homePicnicTitle: "Floating Picnic on the Salt Mirror",
    homePicnicDesc: "Private table with fine linens set right upon the infinite water sheet. Royal quinoa cuisine, confit llama, and chilled champagne amid absolute silence.",
    homeTastingTitle: "Andean Altitudes Tasting",
    homeTastingDesc: "Culinary journey across vertical ecosystems inspired by Virgilio Martínez's Mater Iniciativa. Ingredients sourced from sea level up to 4,500 meters.",
    homeIncludedBadge: "Included in signature package",
    homeExclusiveBadge: "Triángulo Andino Exclusive",
    homeReservedBadge: "Priority Table Reserved",
    homeEmergencyBannerTitle: "Looking for a custom route or private coordination?",
    homeEmergencyBannerDesc: "Our bilingual Andean advisors and expedition medical team are on hand to tailor local flights, high-mountain permits, and acclimation protocols.",

    backToCatalog: "Back to Catalog",
    maxAltitudeMetersLabel: "Max Altitude:",
    highEndInclusions: "Luxury Inclusions & Expedition Safety",
    realTimeQuoter: "Real-Time Dynamic Quoter",
    configureExpedition: "Configure Your Expedition",
    expeditionersLabel: "Travelers:",
    personsUnit: "People",
    travelMode: "Travel Mode",
    completePackage: "Complete Package (with Hotel)",
    expeditionOnly: "Expedition Only (no Hotel)",
    accommodationCategory: "Accommodation Tier",
    comfortTier: "3★ Comfort",
    boutiqueTier: "4★ Boutique",
    luxuryTier: "5★ Luxury",
    extraExperiences: "Optional Extra Experiences",
    pricePerTraveler: "Price per traveler",
    totalGroupLabel: "Total group",
    baseTour: "Base tour:",
    hotelCategory: "Hospitality",
    transfersLogistics: "4x4 Transfers & Logistics:",
    extraActivities: "Extra Activities:",
    reservationGuarantee: "Reservation Guarantee (20%):",
    estimatedAgencyMargin: "Estimated Net Agency Profit:",
    consultConcierge247: "Consult with 24/7 Concierge",
    selectedHotelsForCircuit: "Selected Hospitality for this Circuit",
    mealsLabel: "Meals:",
    transportLabel: "Transport:",
    acclimationNotice: "Structured for maximum physical acclimation and seamless border crossing intervals.",

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
    securePaymentStripe: "Secure Payment with Stripe",
    sslEncrypted: "256-bit SSL",
    expeditionGuaranteeSubtitle: "Expedition guarantee (20% initial deposit)",
    payNowLabel: "Amount due now (20% deposit):",
    totalExpeditionLabel: "Total expedition",
    remainingBalanceLabel: "Remaining balance:",
    leadTraveler: "Lead traveler *",
    emailField: "Email address *",
    satelliteWhatsapp: "Satellite WhatsApp *",
    estimatedDepartureDate: "Estimated departure date *",
    cardDataSandbox: "Card Details (Stripe Elements Sandbox)",
    noHiddenFees: "No hidden fees",
    sernaturWarranty: "Sernatur Guarantee #7482",
    sorocheFlexible: "Reschedulable for altitude sickness",
    confirmBookingBtn: "Confirm Reservation",
    authorizingStripe: "Authorizing with Stripe...",

    voucherSuccessTitle: "Expedition Successfully Confirmed!",
    voucherCode: "Official Voucher Code:",
    voucherOfficialTitle: "Official Booking Voucher & Andean Safe Conduct",
    voucherDownloadBtn: "Print / Save Voucher PDF",
    voucherPrintBtn: "Print Voucher",
    voucherSendWhatsapp: "Share with Satellite Concierge",
    officialVoucherTitle: "Official Expedition Voucher",
    crossBorderSafeConduct: "Cross-border safe conduct · Chile, Bolivia & Peru",
    uniqueBookingCode: "Unique Booking Code",
    depositConfirmed: "Deposit confirmed (Stripe)",
    contractedExpedition: "Contracted Expedition",
    includedExtrasTitle: "Included Additional Experiences:",
    officialScanAdmissions: "Official scan at customs & lodges",
    cryptoValidator: "Triángulo Andino Cryptographic Validator",
    medicalProtocolHeading: "Andean Medical Protocol & Border Crossing",
    medicalProtocolText: "Present this digital or printed safe conduct to your 4x4 expedition leader at the meeting point. Includes in-cabin oxygen therapy, Garmin InReach satellite insurance, and priority immigration processing at Hito Cajón (Chile-Bolivia) and Kasani (Bolivia-Peru).",
    printVoucher: "Print Voucher",
    sendToConcierge: "Send to WhatsApp Concierge",
    finalizeBtn: "Done",

    footerMission: "Pioneering high-altitude luxury expeditions across the Altiplano, Atacama, and the Central Andes. Uniting Chile, Bolivia, and Peru with architectural refinement, satellite tracking, and bespoke service.",
    footerSignatureRoutes: "Signature Routes",
    footerTechData: "Technology & Data",
    footerConciergeSupport: "Uninterrupted Concierge Care",
    footerConciergeDesc: "Garmin InReach satellite logistics support and priority 24/7 WhatsApp concierge link for travelers in the field.",
    footerSubscribeTitle: "High-Mountain Gazette",
    footerSubscribeDesc: "Seasonal dispatches on desert blooms, mirror-salt conditions, and new lodge openings.",
    footerSubscribePlaceholder: "Your professional or personal email",
    footerSubscribeBtn: "Subscribe",
    footerSubscribedMsg: "Thank you! You will receive our seasonal quarterly dispatches.",
    footerRights: "All rights reserved. Cross-border safe conduct and tourism accreditations valid for Chile, Bolivia, and Peru.",

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

    homeRoutePlannerKicker: "Ferramenta Interativa ao Vivo",
    homeRoutePlannerTitle: "Planejador Multidestino com Rota",
    homeRoutePlannerDesc: "Marque os pontos que você sonha visitar. Nosso motor geográfico traça a rota ideal de sul a norte, conecta fronteiras e calcula sua cotação com desconto multipaís.",
    homeSatelliteBadge: "Logística Satelital Garmin InReach",
    homeSyncCountries: "Chile · Bolívia · Peru sincronizados",
    homeSelectMilestones: "1. Selecione os pontos a conectar na sua expedição:",
    homeRouteElevationTitle: "Perfil Altimétrico da sua Rota ao Vivo",
    homeAutoGeoConnection: "Conexão geográfica automatizada:",
    homeBonusApplied: "15% Bonificação multi-destino aplicada",
    homeStartingPoint: "Ponto de partida:",
    homeEndingPoint: "Ponto de chegada:",
    homeBorderCrossing1: "Cruzamento 4x4 Hito Cajón (Chile ➔ Bolívia)",
    homeBorderCrossing2: "Cruzamento Kasani / Desaguadero (Bolívia ➔ Peru)",
    homeEstimatedDuration: "Duração estimada",
    homeEstimatedBudget: "Orçamento por viajante (Base)",
    homeCombinedSavings: "Economia por combinar destinos",
    homeTakeToBuilder: "Transferir Seleção para o Criador IA",

    homeHotelsKicker: "Coleção Privada",
    homeHotelsTitle: "Hotéis Emblemáticos & Lodges de Altitude",
    homeHotelsDesc: "Descanso sem concessões nos confins do planeta. Arquitetura vernacular, paredes de sal cristalino esculpidas à mão e serviço cinco estrelas a mais de 3.600 metros.",
    homeCulinaryKicker: "Sensorial & Gastronomia",
    homeCulinaryTitle: "Experiências Culinárias de Alta Atmosfera",
    homeCulinaryDesc: "Degustações harmonizadas com vinhos de altitude bolivianos (Tarija), uvas históricas chilenas e gastronomia quéchua e aimará.",
    homeStargazingTitle: "Jantar Astronômico no Deserto",
    homeStargazingDesc: "Sob o céu mais límpido do hemisfério sul. Menu degustação em 5 etapas harmonizado com vinhos do Vale de Huasco e observação guiada por astrofísico.",
    homePicnicTitle: "Piquenique Flutuante no Espelho de Sal",
    homePicnicDesc: "Mesa privativa montada diretamente sobre o espelho d'água infinito. Quinoa real, carne de lhama confitada e champagne gelado no silêncio branco.",
    homeTastingTitle: "Degustação de Altitudes Andinas",
    homeTastingDesc: "Jornada culinária por ecossistemas verticais inspirada na Mater Iniciativa de Virgilio Martínez. Ingredientes do nível do mar a 4.500 metros.",
    homeIncludedBadge: "Incluído no circuito exclusivo",
    homeExclusiveBadge: "Exclusividade Triângulo Andino",
    homeReservedBadge: "Mesa prioritária reservada",
    homeEmergencyBannerTitle: "Deseja um roteiro exclusivo ou atendimento privado?",
    homeEmergencyBannerDesc: "Nossos consultores andinos bilíngues e equipe médica estão disponíveis para organizar voos locais, autorizações e aclimatação.",

    backToCatalog: "Voltar ao Catálogo",
    maxAltitudeMetersLabel: "Altitude Máx.:",
    highEndInclusions: "Inclusões de Alto Padrão & Segurança",
    realTimeQuoter: "Cotador Dinâmico em Tempo Real",
    configureExpedition: "Configure Sua Expedição",
    expeditionersLabel: "Expedicionários:",
    personsUnit: "Pessoas",
    travelMode: "Modalidade de Viagem",
    completePackage: "Pacote Completo (com Hotel)",
    expeditionOnly: "Apenas Expedição (sem Hotel)",
    accommodationCategory: "Categoria de Hospedagem",
    comfortTier: "3★ Conforto",
    boutiqueTier: "4★ Boutique",
    luxuryTier: "5★ Luxo",
    extraExperiences: "Experiências Extras Opcionais",
    pricePerTraveler: "Preço por expedicionário",
    totalGroupLabel: "Total grupo",
    baseTour: "Tour base:",
    hotelCategory: "Hotelaria",
    transfersLogistics: "Traslados 4x4 & Logística:",
    extraActivities: "Atividades extras:",
    reservationGuarantee: "Garantia de Reserva (20%):",
    estimatedAgencyMargin: "Margem Líquida da Agência:",
    consultConcierge247: "Falar com Concierge 24/7",
    selectedHotelsForCircuit: "Hotelaria Selecionada para este Roteiro",
    mealsLabel: "Refeições:",
    transportLabel: "Transporte:",
    acclimationNotice: "Estruturado para máxima aclimatação física e travessias ágeis de fronteira.",

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
    securePaymentStripe: "Pagamento Seguro com Stripe",
    sslEncrypted: "SSL 256 bits",
    expeditionGuaranteeSubtitle: "Garantia de expedição (20% de depósito inicial)",
    payNowLabel: "Valor a pagar agora (20% depósito):",
    totalExpeditionLabel: "Total expedição",
    remainingBalanceLabel: "Saldo restante:",
    leadTraveler: "Expedicionário principal *",
    emailField: "E-mail *",
    satelliteWhatsapp: "WhatsApp satelital *",
    estimatedDepartureDate: "Data estimada de saída *",
    cardDataSandbox: "Dados do Cartão (Stripe Elements Sandbox)",
    noHiddenFees: "Sem taxas ocultas",
    sernaturWarranty: "Garantia Sernatur #7482",
    sorocheFlexible: "Remarcável por soroche",
    confirmBookingBtn: "Confirmar Reserva",
    authorizingStripe: "Autorizando no Stripe...",

    voucherSuccessTitle: "Expedição Confirmada com Sucesso!",
    voucherCode: "Código do Voucher Oficial:",
    voucherOfficialTitle: "Voucher Oficial de Reserva e Salvo-Conduto Andino",
    voucherDownloadBtn: "Imprimir / Salvar Voucher PDF",
    voucherPrintBtn: "Imprimir Voucher",
    voucherSendWhatsapp: "Compartilhar com Concierge Satelital",
    officialVoucherTitle: "Voucher Oficial de Expedição",
    crossBorderSafeConduct: "Salvo-conduto transfronteiriço · Chile, Bolívia & Peru",
    uniqueBookingCode: "Código Único de Reserva",
    depositConfirmed: "Depósito confirmado (Stripe)",
    contractedExpedition: "Expedição Contratada",
    includedExtrasTitle: "Experiências Adicionais Incluídas:",
    officialScanAdmissions: "Leitura oficial em alfândegas e hotéis",
    cryptoValidator: "Validador Criptográfico Triângulo Andino",
    medicalProtocolHeading: "Protocolo Médico Andino & Cruzamento de Fronteiras",
    medicalProtocolText: "Apresente este salvo-conduto digital ou impresso ao líder 4x4 no ponto de encontro. Inclui oxigenoterapia de cabine, seguro satelital Garmin InReach e tramitação prioritária em Hito Cajón e Kasani.",
    printVoucher: "Imprimir Voucher",
    sendToConcierge: "Enviar ao WhatsApp Concierge",
    finalizeBtn: "Finalizar",

    footerMission: "Pioneiros em expedições de alto luxo pelo Altiplano, Atacama e Andes Centrais. Unindo Chile, Bolívia e Peru com sofisticação arquitetônica, rastreamento por satélite e atendimento exclusivo.",
    footerSignatureRoutes: "Rotas Exclusivas",
    footerTechData: "Tecnologia & Dados",
    footerConciergeSupport: "Atendimento Concierge Ininterrupto",
    footerConciergeDesc: "Suporte logístico via satélite Garmin InReach e conexão prioritária WhatsApp 24/7 para viajantes em rota.",
    footerSubscribeTitle: "Boletim de Alta Montanha",
    footerSubscribeDesc: "Novidades sazonais sobre o deserto florido, lagoas coloridas e novos lodges de luxo.",
    footerSubscribePlaceholder: "Seu e-mail profissional ou pessoal",
    footerSubscribeBtn: "Inscrever-se",
    footerSubscribedMsg: "Obrigado! Você receberá nossos boletins trimestrais.",
    footerRights: "Todos os direitos reservados. Salvo-conduto e certificações turísticas válidas para Chile, Bolívia e Peru.",

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

    homeRoutePlannerKicker: "Outil Interactif en Direct",
    homeRoutePlannerTitle: "Concepteur Multi-Destinations avec Tracé",
    homeRoutePlannerDesc: "Sélectionnez les étapes incontournables. Notre moteur cartographie l'itinéraire idéal du sud au nord, gère les frontières et calcule votre devis en direct avec remise multi-pays.",
    homeSatelliteBadge: "Logistique Satellite Garmin InReach",
    homeSyncCountries: "Chili · Bolivie · Pérou synchronisés",
    homeSelectMilestones: "1. Sélectionnez les étapes à relier dans votre expédition :",
    homeRouteElevationTitle: "Profil Altimétrique de votre Itinéraire en Direct",
    homeAutoGeoConnection: "Connexion géographique automatisée :",
    homeBonusApplied: "15% Remise multi-destination appliquée",
    homeStartingPoint: "Point de départ :",
    homeEndingPoint: "Point d'arrivée :",
    homeBorderCrossing1: "Passage 4x4 Hito Cajón (Chili ➔ Bolivie)",
    homeBorderCrossing2: "Passage Kasani / Desaguadero (Bolivie ➔ Pérou)",
    homeEstimatedDuration: "Durée estimée",
    homeEstimatedBudget: "Budget par voyageur (Base)",
    homeCombinedSavings: "Économies grâce au combiné",
    homeTakeToBuilder: "Transférer la Sélection au Concepteur IA",

    homeHotelsKicker: "Collection Privée",
    homeHotelsTitle: "Hôtels d'Exception & Écolodges d'Altitude",
    homeHotelsDesc: "Confort absolu au bout du monde. Architecture vernaculaire, murs de sel cristallin sculptés à la main et service cinq étoiles à plus de 3 600 mètres d'altitude.",
    homeCulinaryKicker: "Expériences Culinaires & Sensorielles",
    homeCulinaryTitle: "Haute Gastronomie des Sommets",
    homeCulinaryDesc: "Dégustations accordées avec les vins d'altitude boliviens (Tarija), cépages patrimoniaux chiliens et cuisine quechua et aymara.",
    homeStargazingTitle: "Dîner Astronomique dans le Désert",
    homeStargazingDesc: "Sous le ciel le plus pur de l'hémisphère sud. Menu dégustation en 5 temps avec vins de la vallée de Huasco et observation guidée par un astrophysicien.",
    homePicnicTitle: "Pique-Nique Flottant sur le Miroir de Sel",
    homePicnicDesc: "Table privée dressée directement sur la fine couche d'eau infinie. Quinoa royale, confit de lama et champagne frappé dans le silence blanc.",
    homeTastingTitle: "Dégustation des Altitudes Andines",
    homeTastingDesc: "Exploration culinaire des écosystèmes verticaux inspirée de Mater Iniciativa de Virgilio Martínez. Ingrédients cueillis du niveau de la mer jusqu'à 4 500 mètres.",
    homeIncludedBadge: "Inclus dans le circuit signature",
    homeExclusiveBadge: "Exclusivité Triángulo Andino",
    homeReservedBadge: "Table prioritaire réservée",
    homeEmergencyBannerTitle: "Souhaitez-vous un circuit sur mesure ou une coordination privée ?",
    homeEmergencyBannerDesc: "Nos conseillers andins bilingues et notre équipe médicale d'expédition sont à votre disposition pour ajuster vos vols, permis et acclimatation.",

    backToCatalog: "Retour au Catalogue",
    maxAltitudeMetersLabel: "Altitude Max :",
    highEndInclusions: "Prestations Haut de Gamme & Sécurité",
    realTimeQuoter: "Calculateur Dynamique en Temps Réel",
    configureExpedition: "Configurez Votre Expédition",
    expeditionersLabel: "Voyageurs :",
    personsUnit: "Personnes",
    travelMode: "Mode de Voyage",
    completePackage: "Forfait Complet (avec Hôtel)",
    expeditionOnly: "Expédition Seule (sans Hôtel)",
    accommodationCategory: "Catégorie d'Hébergement",
    comfortTier: "3★ Confort",
    boutiqueTier: "4★ Boutique",
    luxuryTier: "5★ Luxe",
    extraExperiences: "Expériences Supplémentaires Optionnelles",
    pricePerTraveler: "Prix par voyageur",
    totalGroupLabel: "Total groupe",
    baseTour: "Circuit de base :",
    hotelCategory: "Hôtellerie",
    transfersLogistics: "Transferts 4x4 & Logistique :",
    extraActivities: "Activités optionnelles :",
    reservationGuarantee: "Acompte de Réservation (20%) :",
    estimatedAgencyMargin: "Marge Nette Agence Estimée :",
    consultConcierge247: "Contacter le Concierge 24/7",
    selectedHotelsForCircuit: "Hôtellerie Sélectionnée pour ce Circuit",
    mealsLabel: "Repas :",
    transportLabel: "Transport :",
    acclimationNotice: "Structuré pour une excellente acclimatation et des passages de frontière fluides.",

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
    securePaymentStripe: "Paiement Sécurisé avec Stripe",
    sslEncrypted: "SSL 256 bits",
    expeditionGuaranteeSubtitle: "Garantie d'expédition (20% d'acompte initial)",
    payNowLabel: "Montant dû immédiatement (acompte 20%) :",
    totalExpeditionLabel: "Total expédition",
    remainingBalanceLabel: "Solde restant :",
    leadTraveler: "Voyageur principal *",
    emailField: "Adresse e-mail *",
    satelliteWhatsapp: "WhatsApp satellite *",
    estimatedDepartureDate: "Date estimée de départ *",
    cardDataSandbox: "Coordonnées Bancaires (Stripe Elements Sandbox)",
    noHiddenFees: "Sans frais cachés",
    sernaturWarranty: "Garantie Sernatur #7482",
    sorocheFlexible: "Reportable en cas de mal aigu des montagnes",
    confirmBookingBtn: "Confirmer la Réservation",
    authorizingStripe: "Autorisation bancaire Stripe en cours...",

    voucherSuccessTitle: "Expédition Confirmée avec Succès !",
    voucherCode: "Code du Voucher Officiel :",
    voucherOfficialTitle: "Voucher de Réservation & Sauf-Conduit Andin",
    voucherDownloadBtn: "Imprimer / Enregistrer le Voucher PDF",
    voucherPrintBtn: "Imprimer le Voucher",
    voucherSendWhatsapp: "Transmettre au Concierge Satellite",
    officialVoucherTitle: "Voucher Officiel d'Expédition",
    crossBorderSafeConduct: "Sauf-conduit transfrontalier · Chili, Bolivie & Pérou",
    uniqueBookingCode: "Code Unique de Réservation",
    depositConfirmed: "Acompte confirmé (Stripe)",
    contractedExpedition: "Expédition Souscrite",
    includedExtrasTitle: "Expériences Supplémentaires Incluses :",
    officialScanAdmissions: "Contrôle officiel aux douanes et hôtels",
    cryptoValidator: "Validateur Cryptographique Triángulo Andino",
    medicalProtocolHeading: "Protocole Médical Andin & Franchissement Frontalier",
    medicalProtocolText: "Présentez ce sauf-conduit numérique ou imprimé au guide 4x4 au point de rendez-vous. Comprend l'oxygénothérapie en cabine, l'assurance satellite Garmin InReach et les formalités migratoires prioritaires à Hito Cajón et Kasani.",
    printVoucher: "Imprimer le Voucher",
    sendToConcierge: "Envoyer au Concierge WhatsApp",
    finalizeBtn: "Terminer",

    footerMission: "Pionniers des expéditions de grand luxe à travers l'Altiplano, l'Atacama et les Andes centrales. Réunissant le Chili, la Bolivie et le Pérou avec raffinement architectural, suivi satellite et service d'exception.",
    footerSignatureRoutes: "Itinéraires d'Exception",
    footerTechData: "Technologies & Données",
    footerConciergeSupport: "Assistance Concierge Ininterrompue",
    footerConciergeDesc: "Support logistique par satellite Garmin InReach et liaison prioritaire WhatsApp 24h/24 pour les voyageurs en circuit.",
    footerSubscribeTitle: "Gazette de Haute Montagne",
    footerSubscribeDesc: "Actualités saisonnières sur la floraison du désert, le miroir de sel et l'ouverture de lodges d'exception.",
    footerSubscribePlaceholder: "Votre adresse e-mail",
    footerSubscribeBtn: "S'abonner",
    footerSubscribedMsg: "Merci ! Vous recevrez nos chroniques trimestrielles.",
    footerRights: "Tous droits réservés. Sauf-conduit et accréditations touristiques valables pour le Chili, la Bolivie et le Pérou.",

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
