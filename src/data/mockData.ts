import { Currency, Package, ExtraActivity, BookingReservation, SiteBranding, HotelItem, RouteDestination } from '../types';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: string }> = {
  USD: { rate: 1, symbol: '$', prefix: 'USD' },
  EUR: { rate: 0.92, symbol: '€', prefix: 'EUR' },
  CLP: { rate: 960, symbol: '$', prefix: 'CLP' },
  PEN: { rate: 3.78, symbol: 'S/', prefix: 'PEN' },
};

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'trilogia-andina-completa',
    title: {
      ES: 'Trilogía Andina Completa',
      EN: 'Complete Andean Trilogy',
      PT: 'Trilogia Andina Completa',
      FR: 'Trilogie Andine Complète',
    },
    tagline: {
      ES: 'Santiago → Atacama → Expedición Uyuni 4x4 → Lago Titicaca → Valle Sagrado & Machu Picchu.',
      EN: 'Santiago → Atacama → Private 4x4 Uyuni Expedition → Lake Titicaca → Sacred Valley & Machu Picchu.',
      PT: 'Santiago → Atacama → Expedição privada Uyuni 4x4 → Lago Titicaca → Vale Sagrado e Machu Picchu.',
      FR: 'Santiago → Atacama → Expédition privée Uyuni 4x4 → Lac Titicaca → Vallée Sacrée et Machu Picchu.',
    },
    country: 'Chile · Bolivia · Perú',
    countriesList: ['Chile', 'Bolivia', 'Perú'],
    days: 14,
    nights: 13,
    maxAltitudeMeters: 4900,
    difficulty: 'Media',
    basePriceUSD: 2450, // Base tour
    hotelCostUSD: {
      none: 0,
      '3star': 850,
      '4star': 1450,
      '5star': 2440,
    },
    logisticsCostUSD: 950,
    ticketsCostUSD: 490,
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=85',
    ],
    highlights: [
      '4x4 Lexus LX / Toyota Land Cruiser privado con rastreo satelital',
      'Médico de altura en ruta & oximetría permanente',
      'Hospedajes Relais & Châteaux + Palacio de Sal exclusivo',
      'Tren Belmond Hiram Bingham hacia Machu Picchu con cena gourmet'
    ],
    recommendedHotels: [
      { name: 'Tierra Atacama Hotel & Spa', category: '5★ High Luxury', description: 'Spa andino y vistas panorámicas al volcán Licancabur.' },
      { name: 'Palacio de Sal Boutique', category: '5★ High Luxury', description: 'El primer hotel de sal del planeta, chimenea y mirador 360°.' },
      { name: 'Belmond Hotel Monasterio Cusco', category: '5★ High Luxury', description: 'Antiguo monasterio jesuita del siglo XVI con oxígeno enriquecido en habitaciones.' }
    ],
    itinerary: [
      { day: 'Día 01', title: 'Llegada a Santiago o Calama & Oasis de Atacama', region: 'Chile · 2.400 msnm', description: 'Recepción privada VIP en aeropuerto y traslado en SUV hacia San Pedro de Atacama.', meals: 'Cóctel de bienvenida', transport: 'SUV ejecutiva' },
      { day: 'Día 02', title: 'Valle de la Luna, Cordillera de la Sal & Astrofotografía', region: 'Chile · 2.550 msnm', description: 'Cañones de arcilla roja y observación estelar con telescopio motorizado.', meals: 'Desayuno + Picnic sunset', transport: '4x4 privado' },
      { day: 'Día 03', title: 'Géiseres del Tatio al Alba & Termas de Puritama', region: 'Chile · 4.320 msnm (Pico transitorio)', description: 'Fumarolas geotérmicas matutinas y relajación en pozas termales privadas.', meals: 'Desayuno térmico + Almuerzo', transport: '4x4 privado' },
      { day: 'Día 04', title: 'Cruce Hito Cajón hacia Reserva Eduardo Avaroa', region: 'Chile ➔ Bolivia · Cruce 4x4', description: 'Trámite aduanero expedito. Lagunas Verde y Blanca al pie del Licancabur y Laguna Colorada con colonias de flamencos.', meals: 'Pensión completa andina', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 05-06', title: 'Inmensidad del Salar de Uyuni & Hotel de Sal', region: 'Bolivia · 3.653 msnm', description: 'Isla Incahuasi entre cactus milenarios. Almuerzo catering en medio del blanco infinito y noche de sal.', meals: 'Pensión completa de autor', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 07-08', title: 'Vuelo La Paz, Teleféricos & Lago Titicaca Privado', region: 'Bolivia · 3.812 msnm', description: 'Vuelo a La Paz, red de teleféricos urbanos y catamarán privado a la Isla del Sol.', meals: 'Desayuno + Almuerzo a bordo', transport: 'Vuelo charter + Catamarán' },
      { day: 'Días 09-10', title: 'Cruce Kasani a Perú & Descenso al Valle Sagrado', region: 'Bolivia ➔ Perú · 2.430 msnm', description: 'Paso migratorio hacia Puno y traslado al microclima templado de Urubamba.', meals: 'Pensión completa', transport: 'Tren de lujo / Van ejecutiva' },
      { day: 'Días 11-12', title: 'Machu Picchu en Tren Hiram Bingham & Cusco Imperial', region: 'Perú · 2.430 msnm ➔ 3.399 msnm', description: 'Ingreso prioritario a la maravilla del mundo con arqueólogo y retorno a Cusco.', meals: 'Almuerzo Sanctuary Lodge + Cena clausura', transport: 'Tren Hiram Bingham' },
      { day: 'Días 13-14', title: 'Cusco Arqueológico, Qorikancha & Despedida', region: 'Perú · 3.399 msnm', description: 'Recorrido por templos incas, alta gastronomía novoandina y traslado al aeropuerto.', meals: 'Desayuno gourmet', transport: 'SUV ejecutiva' }
    ]
  },
  {
    id: 'altiplano-salvaje-salares',
    title: {
      ES: 'Altiplano Salvaje & Salares',
      EN: 'Wild Altiplano & Salt Flats',
      PT: 'Altiplano Selvagem & Salares',
      FR: 'Altiplano Sauvage & Déserts de Sel',
    },
    tagline: {
      ES: 'San Pedro de Atacama → Valle de la Luna → Lagunas de Colores → Géiseres Sol de Mañana → Gran Salar de Uyuni.',
      EN: 'San Pedro de Atacama → Moon Valley → Colorful Lagoons → Sol de Mañana Geysers → Great Uyuni Salt Flat.',
      PT: 'San Pedro de Atacama → Vale da Lua → Lagoas Coloridas → Gêiseres Sol de Mañana → Grande Salar de Uyuni.',
      FR: 'San Pedro de Atacama → Vallée de la Lune → Lagunes Colorées → Geysers Sol de Mañana → Grand Salar d\'Uyuni.',
    },
    country: 'Chile · Bolivia',
    countriesList: ['Chile', 'Bolivia'],
    days: 8,
    nights: 7,
    maxAltitudeMeters: 5000,
    difficulty: 'Moderada',
    basePriceUSD: 1650,
    hotelCostUSD: {
      none: 0,
      '3star': 480,
      '4star': 750,
      '5star': 1250,
    },
    logisticsCostUSD: 720,
    ticketsCostUSD: 280,
    imageUrl: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
    images: [
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2000&q=85',
    ],
    highlights: [
      'Noche en cúpula geodésica transparente bajo la Vía Láctea',
      'Chef de campo privado y bar andino móvil en el desierto',
      'Asistencia transfronteriza VIP en Hito Cajón sin demoras',
      'Laguna Colorada con más de 30.000 flamencos andinos'
    ],
    recommendedHotels: [
      { name: 'Hotel Cumbres Atacama', category: '4★ Boutique & Sal', description: 'Patios de piedra y huertos desérticos en el corazón de San Pedro.' },
      { name: 'Luna Salada Hotel de Sal', category: '4★ Boutique & Sal', description: 'Habitaciones con vista directa al horizonte de sal y chimeneas cálidas.' }
    ],
    itinerary: [
      { day: 'Día 01', title: 'Recepción en Calama y Atardecer en el Valle de la Luna', region: 'Chile · 2.400 msnm', description: 'Traslado privado al hotel y exploración de las dunas doradas de sal.', meals: 'Cóctel sunset', transport: 'SUV privada' },
      { day: 'Día 02', title: 'Lagunas Cejar & Ojos del Salar', region: 'Chile · 2.450 msnm', description: 'Flotación en aguas hiper-salinas y atardecer en la Laguna Tebinquinche.', meals: 'Desayuno + Picnic', transport: '4x4 privado' },
      { day: 'Día 03', title: 'Cruce Hito Cajón, Laguna Verde & Desierto de Siloli', region: 'Chile ➔ Bolivia · 4.400 msnm', description: 'Ingreso a Bolivia en 4x4. Formación geológica del Árbol de Piedra.', meals: 'Pensión completa', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Día 04', title: 'Laguna Colorada & Géiseres Sol de Mañana', region: 'Bolivia · 4.850 msnm', description: 'Caldos volcánicos en ebullición y avistamiento masivo de flamencos.', meals: 'Pensión completa', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 05-06', title: 'Gran Salar de Uyuni & Isla Incahuasi', region: 'Bolivia · 3.653 msnm', description: 'Exploración del salar y cena de cata de vinos de altura.', meals: 'Pensión completa', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 07-08', title: 'Colchani & Traslado a Uyuni / Calama', region: 'Bolivia ➔ Chile / La Paz', description: 'Mercado artesanal de sal y conexión a vuelo internacional.', meals: 'Desayuno gourmet', transport: 'SUV / Traslado aeropuerto' }
    ]
  },
  {
    id: 'mistica-inca-altiplano-sagrado',
    title: {
      ES: 'Mística Inca & Altiplano Sagrado',
      EN: 'Inca Mystique & Sacred Altiplano',
      PT: 'Mística Inca & Altiplano Sagrado',
      FR: 'Mystique Inca & Altiplano Sacré',
    },
    tagline: {
      ES: 'La Paz bohemia → Copacabana & Isla del Sol → Puno & Uros → Valle Sagrado → Machu Picchu.',
      EN: 'Bohemian La Paz → Copacabana & Sun Island → Puno & Uros → Sacred Valley → Machu Picchu.',
      PT: 'La Paz boêmia → Copacabana e Ilha do Sol → Puno & Uros → Vale Sagrado → Machu Picchu.',
      FR: 'La Paz bohème → Copacabana & Île du Soleil → Puno & Uros → Vallée Sacrée → Machu Picchu.',
    },
    country: 'Bolivia · Perú',
    countriesList: ['Bolivia', 'Perú'],
    days: 10,
    nights: 9,
    maxAltitudeMeters: 3850,
    difficulty: 'Suave',
    basePriceUSD: 1850,
    hotelCostUSD: {
      none: 0,
      '3star': 580,
      '4star': 980,
      '5star': 1750,
    },
    logisticsCostUSD: 780,
    ticketsCostUSD: 420,
    imageUrl: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=1200&q=85',
    ],
    highlights: [
      'Catamarán privado exclusivo en el Lago Titicaca',
      'Guías antropólogos y arqueólogos dedicados',
      'Acceso exclusivo a ruinas incas en horarios privados',
      'Tren panorámico Vistadome Observatory a Machu Picchu'
    ],
    recommendedHotels: [
      { name: 'Titilaka Exclusive Lodge', category: '5★ High Luxury', description: 'Relais & Châteaux aislado en península privada del Lago Titicaca.' },
      { name: 'Tambo del Inka Resort & Spa', category: '5★ High Luxury', description: 'Luxury Collection en Urubamba con estación privada de tren.' }
    ],
    itinerary: [
      { day: 'Día 01', title: 'Llegada a La Paz & Circuito de Teleféricos Urbanos', region: 'Bolivia · 3.640 msnm', description: 'Recorrido por el Valle de la Luna y vistas a la cordillera real.', meals: 'Cena novoandina', transport: 'Van VIP' },
      { day: 'Días 02-03', title: 'Copacabana & Navegación a la Isla del Sol', region: 'Bolivia · 3.812 msnm', description: 'Embarque privado en catamarán, escalinatas incas y ceremonia Kallawaya.', meals: 'Pensión completa', transport: 'Catamarán privado' },
      { day: 'Día 04', title: 'Cruce Kasani hacia Puno & Islas Flotantes de los Uros', region: 'Bolivia ➔ Perú · 3.812 msnm', description: 'Paso migratorio ágil y visita comunitaria a las islas de totora.', meals: 'Desayuno + Almuerzo', transport: 'Lancha privada + Van' },
      { day: 'Días 05-06', title: 'Ruta del Sol hacia el Valle Sagrado de Urubamba', region: 'Perú · 2.430 msnm', description: 'Templo de Raqchi, iglesia de Andahuaylillas y descanso en el valle.', meals: 'Almuerzo buffet campestre', transport: 'Tren o transporte privado' },
      { day: 'Días 07-08', title: 'Santuario Histórico Machu Picchu', region: 'Perú · 2.430 msnm', description: 'Ingreso al amanecer en la ciudadela de piedra inca con guía arqueólogo.', meals: 'Desayuno + Almuerzo gourmet', transport: 'Tren Vistadome' },
      { day: 'Días 09-10', title: 'Cusco Imperial & Retorno', region: 'Perú · 3.399 msnm', description: 'Templo de Santo Domingo, San Blas y vuelo de salida.', meals: 'Desayuno buffet', transport: 'SUV privada' }
    ]
  }
];

export const AVAILABLE_EXTRAS: ExtraActivity[] = [
  {
    id: 'extra-astro',
    name: 'Astrofotografía de Precisión con Telescopio Motorizado',
    priceUSD: 160,
    description: 'Sesión nocturna con astrofísico en el Desierto de Atacama bajo cielos clase Bortle 1.',
    duration: '3 Horas'
  },
  {
    id: 'extra-champagne',
    name: 'Brindis Flotante con Champagne & Ostras en Salar de Uyuni',
    priceUSD: 240,
    description: 'Montaje de mesa con lencería blanca sobre la lámina de agua reflectante durante el sunset.',
    duration: '2.5 Horas'
  },
  {
    id: 'extra-hiram-upgrade',
    name: 'Upgrade a Vagón Belmond Hiram Bingham (Valle Sagrado)',
    priceUSD: 480,
    description: 'Vagón estilo años 20 con música en vivo, bar abierto de cócteles andinos y menú de autor.',
    duration: 'Trayecto Completo'
  },
  {
    id: 'extra-helicopter',
    name: 'Sobrevuelo Privado en Helicóptero sobre el Valle Sagrado',
    priceUSD: 650,
    description: 'Vistas panorámicas aéreas de las terrazas concéntricas de Moray y nevado Verónica.',
    duration: '45 Minutos'
  }
];

export const INITIAL_RESERVATIONS: BookingReservation[] = [
  {
    id: 'RES-892410',
    packageId: 'trilogia-andina-completa',
    packageName: 'La Gran Travesía Altiplánica: Atacama, Uyuni & El Imperio Inca',
    travelerName: 'Dr. Alejandro Valenzuela M.',
    travelerEmail: 'avalenzuela@investigacion-medica.cl',
    travelerPhone: '+56 9 8234 9900',
    travelDate: '2025-06-12',
    travelersCount: 2,
    hotelTier: '5star',
    travelMode: 'complete',
    selectedExtras: [
      AVAILABLE_EXTRAS[0],
      AVAILABLE_EXTRAS[1]
    ],
    currency: 'USD',
    baseTourPerPaxUSD: 2450,
    hotelPerPaxUSD: 2440,
    transfersPerPaxUSD: 950,
    extrasTotalUSD: 400,
    totalPerPaxUSD: 6240,
    totalGroupUSD: 12480,
    depositAmountUSD: 2496,
    estimatedProfitUSD: 3380, // Calculated agency profit
    paymentStatus: 'paid_deposit',
    paymentMethod: 'stripe_mock',
    stripePaymentId: 'pi_3MoE992eZvKYlo2C1gMOCK01',
    createdAt: '2025-05-10T14:32:00Z'
  },
  {
    id: 'RES-741902',
    packageId: 'altiplano-salvaje-salares',
    packageName: 'Altiplano Salvaje & Salares (Chile + Bolivia)',
    travelerName: 'Sophia Montgomery & James Sterling',
    travelerEmail: 'sophia.montgomery@architects-london.co.uk',
    travelerPhone: '+44 7700 900123',
    travelDate: '2025-07-04',
    travelersCount: 2,
    hotelTier: '4star',
    travelMode: 'complete',
    selectedExtras: [
      AVAILABLE_EXTRAS[1]
    ],
    currency: 'USD',
    baseTourPerPaxUSD: 1650,
    hotelPerPaxUSD: 750,
    transfersPerPaxUSD: 720,
    extrasTotalUSD: 240,
    totalPerPaxUSD: 3360,
    totalGroupUSD: 6720,
    depositAmountUSD: 1344,
    estimatedProfitUSD: 1840,
    paymentStatus: 'paid_deposit',
    paymentMethod: 'stripe_mock',
    stripePaymentId: 'pi_3MoE992eZvKYlo2C1gMOCK02',
    createdAt: '2025-05-18T09:15:00Z'
  },
  {
    id: 'RES-631890',
    packageId: 'mistica-inca-altiplano-sagrado',
    packageName: 'Mística Inca & Altiplano Sagrado (Bolivia + Perú)',
    travelerName: 'Giselle Fontaine & Pierre Moreau',
    travelerEmail: 'p.moreau@vins-bordeaux.fr',
    travelerPhone: '+33 6 12 34 56 78',
    travelDate: '2025-08-20',
    travelersCount: 4,
    hotelTier: '5star',
    travelMode: 'complete',
    selectedExtras: [
      AVAILABLE_EXTRAS[2]
    ],
    currency: 'EUR',
    baseTourPerPaxUSD: 1850,
    hotelPerPaxUSD: 1750,
    transfersPerPaxUSD: 780,
    extrasTotalUSD: 480,
    totalPerPaxUSD: 4860,
    totalGroupUSD: 19440,
    depositAmountUSD: 3888,
    estimatedProfitUSD: 5280,
    paymentStatus: 'paid_deposit',
    paymentMethod: 'stripe_mock',
    stripePaymentId: 'pi_3MoE992eZvKYlo2C1gMOCK03',
    createdAt: '2025-05-22T18:40:00Z'
  }
];

// CMS Defaults & Persistence Helpers
export const DEFAULT_BRANDING: SiteBranding = {
  heroImageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
  heroTag: 'Expediciones de Lujo',
  heroSubtitle: 'Chile · Bolivia · Perú',
  heroTitle1: 'Travesías Privadas al',
  heroTitle2: 'Techo del Mundo',
  heroDesc: 'Descubre la inmensidad del Salar de Uyuni, los cañones de Atacama y la gloria de Machu Picchu en vehículos 4x4 satelitales con logística médica y curaduría cinco estrellas.',
  conciergePhone: '+56 9 8452 1109',
  conciergeDefaultMsg: 'Hola Triángulo Andino Concierge. Me gustaría consultar una expedición privada por Chile, Bolivia y Perú.',
};

export const DEFAULT_HOTELS: HotelItem[] = [
  {
    id: 'tierra-atacama',
    region: 'chile',
    countryBadge: 'San Pedro de Atacama',
    subtitle: 'Relais & Châteaux Partner',
    name: 'Tierra Atacama Hotel & Spa',
    description: 'Arquitectura de adobe orgánico y spa termal andino con vistas despejadas al Volcán Licancabur.',
    comfort: 'Gran Lujo · 2.400 msnm',
    category: '5star',
    pricePerNightUSD: 650,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd-ynNlC-u-Wx2DL1vPA-QUwVeHMZyndrDmNvJZhglZHanaWV0zFAGhaYTx9XsLjMTx4evxSjSb7ADyQmL4gglAizObwvmhBC51g94zRuRio3Gu7fucyh17cIwo93KtGrZGudTU7hhdBEDEs92JZnPfC10l03_289YH-fIV1JdCnJje1QxVfQ1WeC_i4V8MX5HBihJaK7lEzEHQk1EqIVqQWiNL9dq5KuV-d0MmI5pMvpjRR4VTZXm',
  },
  {
    id: 'palacio-de-sal',
    region: 'bolivia',
    countryBadge: 'Colchani · Uyuni',
    subtitle: 'Arquitectura de Sal Pura',
    name: 'Palacio de Sal Boutique',
    description: 'El primer hotel de sal del mundo. Bóvedas termales, chimeneas de leña y mirador astral 360° frente al manto blanco.',
    comfort: 'Icono Altiplánico · 3.656 msnm',
    category: '5star',
    pricePerNightUSD: 420,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWjG04n8hSkKDeZGxOZo03Lvp62zrDTW9zfk85kia1DFUzCEM2qah__lW5XbA9KflqRJsxqdbZaYr-FI_SNbqI9KT8NyHQOzf_pVbLxY5hVWLw5GgpMi8rtSfL6rt33_8943xSzPPpiZl7O-O03Sy0myT6mOU50QocXGipOmBX-AOTbwKZfwHte36W6HLynULPPnvkl1Dwg0B_LAzZPy2Fptwsv1xKW9szRMoUKGtaaJPgbcwYu7_B',
  },
  {
    id: 'titilaka-exclusive',
    region: 'peru',
    countryBadge: 'Puno · Lago Titicaca',
    subtitle: 'Península Privada',
    name: 'Titilaka Exclusive Lodge',
    description: 'Aislado en una península privada sobre las aguas del lago navegable más alto de la Tierra. Relais & Châteaux.',
    comfort: 'Relais & Châteaux · 3.812 msnm',
    category: '5star',
    pricePerNightUSD: 780,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9qolg9rzUryat_Z4j8PVlhwzkHRfIrj8nHXhOOWViUonAwbkYv2bx9um9oLFIc7JzYWQlriazXYcidq9b4ykD7GkXx0C8bbIE1sQBlX3grVtREhMdAujEe5r9TU6CbXY82aIpiHSdewJ7kSnG0ovZ3uBg3viGxpJoyUZ3Zg1rlBlE2eD0PNCFSjzhrI1alocxQLcdWwcQn7_f8UjwGNr3X7iZF9WE5MWGv0Qw9ouQyHBGQVNzZl0v',
  },
  {
    id: 'belmond-sanctuary',
    region: 'peru',
    countryBadge: 'Machu Picchu Pueblo',
    subtitle: 'Ubicación Privilegiada',
    name: 'Belmond Sanctuary Lodge',
    description: 'El único hotel situado justo en la puerta de la ciudadela sagrada de Machu Picchu para ingresos al alba.',
    comfort: 'Belmond Heritage · 2.430 msnm',
    category: '5star',
    pricePerNightUSD: 1100,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0zERwRiMewXCwmDXDAdLSTpPwYkkNXtV8LYkA95xVdagA8JPcHDKpt6M88fXoWfGxkka9-4VG73LYC_utYe-dK4WKTGLKUAVPZYBROP6KWhuLUO0I05BMInmogq8PLuwC2msT2KZP-Rjw4_CLQrRsOzQDpxI5sDZUgejktQN8GmOq369JBFjjiS86kl5BpuOmplJXq8JrATMKgtilYgBrmMKh8YG5o4LiKzwLb7iuG5eVk43MHHAk',
  },
];

export const DEFAULT_DESTINATIONS: RouteDestination[] = [
  {
    id: 'atacama',
    name: 'San Pedro de Atacama',
    country: 'Chile',
    flag: '🇨🇱',
    altitude: '2.400 msnm',
    altitudeMeters: 2400,
    days: 3,
    costUSD: 680,
    tag: 'Geysers del Tatio & Valle de la Luna',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmGkIgyAR3vhUSEP67fgohJamfVA9s1y082jHQstijnsPz05PpdfEyX6UBhdA3qtrs8oBiwzyclk4pMx5c1CjMv6EV33CdpHzMk6xMm-9yoTy4OnprugeGwJoiYM_eGGSFYwPH_h0xyHq1m8_-Mk9_VBcMhcFjERonOX1QCqpbsB8hghJdHf_O3krKtqIjqpvxVrftZ-Sfd5o5AfehsWxC7FXS9S0SHmbymKNK3LuWG4t1pzFDUpW8',
  },
  {
    id: 'uyuni',
    name: 'Salar de Uyuni & Lagunas',
    country: 'Bolivia',
    flag: '🇧🇴',
    altitude: '3.656 msnm',
    altitudeMeters: 3656,
    days: 3,
    costUSD: 850,
    tag: 'Altiplano Andino & Laguna Colorada',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChlFkOy5Hy_AQyFucQlyl0pxbg94ppW4oyn1Lgp85gla7TSgLcgiOXFf2oicjpEO-IVoP97WJckXqyf3rptg43125X2jD5OjN8eNHFcxDb-oeMjUQeEtoh24CER_gX7HXXvzlKhemAVVnDYdUBQ6iW_OuDx7WNMJpwe-xqxAqFClSft1w4lG_0h-Ro54oQAL4bnzziO5yaRQ3SegWI_TwmCDhIyWqPZWF1ext1yhBCWyE4ol7rXW-d',
  },
  {
    id: 'titicaca',
    name: 'Lago Titicaca & Copacabana',
    country: 'Bolivia',
    flag: '🇧🇴',
    altitude: '3.812 msnm',
    altitudeMeters: 3812,
    days: 2,
    costUSD: 490,
    tag: 'Isla del Sol & Catamarán Privado',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jTpjafSBqD6JpkOWj4IOFlzgyGs6lAk75J-4zii5_yFUfCAjvPJWnmFW1d2Jj6G83ju8czFQ5-3WhrRtDycjvgFC__5sEGZGe9iJD-Ss64Jd6VEomePgs53Vx3BJ9CawIEvZbMIKJbUg9dDJQlfJDzSYb_dmkceZoM2ecM2CeFHfLrTke6R_YdVBmWCk9avG6TIQmB83WMxuvGDvkZQDp00WoxeUcKfRDILIt1oO0GQilzb8_AIg',
  },
  {
    id: 'machupicchu',
    name: 'Valle Sagrado & Machu Picchu',
    country: 'Perú',
    flag: '🇵🇪',
    altitude: '2.430 msnm',
    altitudeMeters: 2430,
    days: 3,
    costUSD: 920,
    tag: 'Ciudadela Inca & Tren Hiram Bingham',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADNWLNxlBIjcL-d49H51m3_Dr-TCNa0zcszKv4LnvdtfaLFqf5EBzFqhBIkSf4CX_rIiu-RIRpifmcnq7T747FhYuwHP2KmYxvAikjB1W2rsf6UT6SK9Iwhw9sbyhP69HsMQpkp8bMxQDIdZ5VfM9p9uRLk1DMrPzaASLjuXKV3HLPEd1wADxg231qJE08qKI-JYB4uNpAOYSfU8isQYVGFEIJGigkiurnOEk43Y7qDQWSrvarxsXH',
  },
  {
    id: 'cusco',
    name: 'Cusco Imperial & Vinicunca',
    country: 'Perú',
    flag: '🇵🇪',
    altitude: '3.399 msnm',
    altitudeMeters: 3399,
    days: 2,
    costUSD: 540,
    tag: 'Qorikancha & Montaña 7 Colores',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmOj_fo8-IvBQb-0RIfHsD24veroFK53DglDW1sApKNgSKclH7NdQlsHbsBCwxx834mE67_FJgPqOEhiI-ZJZDGsSNOmNV0jlXo5whcJAEprjAy94Ai5nYLIX7j5VAYPmbo1Y8m6fAOus3vneYoEFOQOzWRbV56MoDveiU04JdxULwIr4h1pZAHhkIsxvRKMoHy6UWpwKMQ3TSlj6pWqLZ7XOq1M8CcwoZacdVJ7bw2VSne3CNalsf',
  },
];

// LocalStorage Keys
const STORAGE_PACKAGES_KEY = 'triangulo_andino_packages_v3';
const STORAGE_RESERVATIONS_KEY = 'triangulo_andino_reservations_v1';
const STORAGE_BRANDING_KEY = 'triangulo_andino_branding_v1';
const STORAGE_HOTELS_KEY = 'triangulo_andino_hotels_v1';
const STORAGE_DESTINATIONS_KEY = 'triangulo_andino_destinations_v1';

// Branding
export function getStoredBranding(): SiteBranding {
  try {
    const raw = localStorage.getItem(STORAGE_BRANDING_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.heroTitle1) return parsed;
    }
  } catch (e) {
    console.warn('Error reading stored branding:', e);
  }
  return DEFAULT_BRANDING;
}

export function saveStoredBranding(branding: SiteBranding) {
  try {
    localStorage.setItem(STORAGE_BRANDING_KEY, JSON.stringify(branding));
  } catch (e) {
    console.error('Error saving branding:', e);
  }
}

// Hotels
export function getStoredHotels(): HotelItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_HOTELS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading stored hotels:', e);
  }
  return DEFAULT_HOTELS;
}

export function saveStoredHotels(hotels: HotelItem[]) {
  try {
    localStorage.setItem(STORAGE_HOTELS_KEY, JSON.stringify(hotels));
  } catch (e) {
    console.error('Error saving hotels:', e);
  }
}

// Destinations / Hitos
export function getStoredDestinations(): RouteDestination[] {
  try {
    const raw = localStorage.getItem(STORAGE_DESTINATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading stored destinations:', e);
  }
  return DEFAULT_DESTINATIONS;
}

export function saveStoredDestinations(destinations: RouteDestination[]) {
  try {
    localStorage.setItem(STORAGE_DESTINATIONS_KEY, JSON.stringify(destinations));
  } catch (e) {
    console.error('Error saving destinations:', e);
  }
}

const BANNED_IMAGE_KEYS = ['photo-1518638150340', 'photo-1509316975850'];
const SAFE_FALLBACK_IMG = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85';

export function sanitizePackageImages(pkg: Package): Package {
  const isBanned = (url?: string) =>
    !url || BANNED_IMAGE_KEYS.some((banned) => url.includes(banned));

  let cleanImages = Array.isArray(pkg.images)
    ? pkg.images.filter((url) => !isBanned(url))
    : [];

  if (cleanImages.length === 0) {
    cleanImages = isBanned(pkg.imageUrl) ? [SAFE_FALLBACK_IMG] : [pkg.imageUrl];
  }

  const cleanImageUrl = isBanned(pkg.imageUrl) ? cleanImages[0] : pkg.imageUrl;

  return {
    ...pkg,
    imageUrl: cleanImageUrl,
    images: cleanImages,
  };
}

// Packages
export function getStoredPackages(): Package[] {
  try {
    const raw = localStorage.getItem(STORAGE_PACKAGES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const sanitized = parsed.map(sanitizePackageImages);
        try {
          localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(sanitized));
        } catch {}
        return sanitized;
      }
    }
  } catch (e) {
    console.warn('Error reading stored packages:', e);
  }
  const defaultSanitized = INITIAL_PACKAGES.map(sanitizePackageImages);
  try {
    localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(defaultSanitized));
  } catch {}
  return defaultSanitized;
}

export function saveStoredPackages(packages: Package[]) {
  try {
    const sanitized = packages.map(sanitizePackageImages);
    localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(sanitized));
  } catch (e) {
    console.error('Error saving packages to localStorage:', e);
  }
}

// Reservations
export function getStoredReservations(): BookingReservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_RESERVATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading stored reservations:', e);
  }
  try {
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(INITIAL_RESERVATIONS));
  } catch {}
  return INITIAL_RESERVATIONS;
}

export function saveStoredReservations(reservations: BookingReservation[]) {
  try {
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(reservations));
  } catch (e) {
    console.error('Error saving reservations to localStorage:', e);
  }
}

export function addReservation(reservation: BookingReservation) {
  const current = getStoredReservations();
  const updated = [reservation, ...current];
  saveStoredReservations(updated);
  return updated;
}

// Factory Reset
export function resetAllToFactoryDefaults() {
  try {
    localStorage.setItem(STORAGE_BRANDING_KEY, JSON.stringify(DEFAULT_BRANDING));
    localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(INITIAL_PACKAGES));
    localStorage.setItem(STORAGE_HOTELS_KEY, JSON.stringify(DEFAULT_HOTELS));
    localStorage.setItem(STORAGE_DESTINATIONS_KEY, JSON.stringify(DEFAULT_DESTINATIONS));
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(INITIAL_RESERVATIONS));
  } catch (e) {
    console.error('Error resetting factory defaults:', e);
  }
}
