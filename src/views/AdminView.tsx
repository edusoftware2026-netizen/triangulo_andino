import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import {
  BookingReservation,
  Package,
  Language,
  SiteBranding,
  HotelItem,
  RouteDestination,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  saveStoredPackages,
  getStoredCountryMedia,
  saveStoredCountryMedia,
  normalizeMediaUrl,
  CountryMediaCollection,
} from '../data/mockData';

interface AdminViewProps {
  reservations: BookingReservation[];
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  siteBranding: SiteBranding;
  onUpdateBranding: (branding: SiteBranding) => void;
  hotelsList: HotelItem[];
  onUpdateHotels: (hotels: HotelItem[]) => void;
  destinations: RouteDestination[];
  onUpdateDestinations: (destinations: RouteDestination[]) => void;
  onFactoryReset: () => void;
  onNavigateHome: () => void;
  language: Language;
  onViewVoucher: (res: BookingReservation) => void;
  onViewPackage: (pkg: Package) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  reservations,
  packages,
  setPackages,
  siteBranding,
  onUpdateBranding,
  hotelsList,
  onUpdateHotels,
  destinations,
  onUpdateDestinations,
  onFactoryReset,
  onNavigateHome,
  language,
  onViewVoucher,
  onViewPackage,
}) => {
  const t = TRANSLATIONS[language];

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'branding' | 'packages' | 'hotels' | 'destinations' | 'media' | 'reservations' | 'ai_gen'
  >('branding');

  // 3-Country Media Catalog State (10 Photos + 5 Videos per Country, editable in Admin)
  const [countryMedia, setCountryMedia] = useState<Record<'chile' | 'bolivia' | 'peru', CountryMediaCollection>>(
    () => getStoredCountryMedia()
  );
  const [selectedMediaCountry, setSelectedMediaCountry] = useState<'chile' | 'bolivia' | 'peru'>('chile');

  const handleUpdateMediaItem = (
    countryKey: 'chile' | 'bolivia' | 'peru',
    mediaType: 'photos' | 'videos',
    index: number,
    field: 'title' | 'landmark' | 'pageUrl' | 'directUrl',
    value: string
  ) => {
    setCountryMedia((prev) => {
      const updatedList = [...prev[countryKey][mediaType]];
      const item = { ...updatedList[index], [field]: value };
      if (field === 'pageUrl' && mediaType === 'photos') {
        item.directUrl = normalizeMediaUrl(value) || item.directUrl;
      }
      if (field === 'directUrl' && mediaType === 'photos') {
        item.directUrl = normalizeMediaUrl(value) || value;
      }
      updatedList[index] = item;
      return {
        ...prev,
        [countryKey]: {
          ...prev[countryKey],
          [mediaType]: updatedList,
        },
      };
    });
  };

  const handleSaveCountryMedia = () => {
    saveStoredCountryMedia(countryMedia);
    showToast('¡Catálogo de 10 Fotos y 5 Videos por país guardado exitosamente!');
  };

  // Toast confirmation state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Helper for reading uploaded file to Base64
  const handleFileToDataUrl = (file: File, callback: (url: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // ----------------------------------------------------
  // TAB 1: BRANDING & HERO STATE
  // ----------------------------------------------------
  const [brandingForm, setBrandingForm] = useState<SiteBranding>({ ...siteBranding });

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBranding(brandingForm);
    showToast('¡Portada y Branding actualizados! Ya visibles en el Frontend en vivo.');
  };

  // ----------------------------------------------------
  // TAB 2: PACKAGES CRUD
  // ----------------------------------------------------
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [isCreatingPkg, setIsCreatingPkg] = useState(false);
  const [newGalleryUrlInput, setNewGalleryUrlInput] = useState('');

  const handleAddGalleryUrls = () => {
    if (!editingPkg || !newGalleryUrlInput.trim()) return;
    const rawMatches = newGalleryUrlInput.match(/https?:\/\/[^\s,;"'<>]+/gi) || [];
    const banned = ['photo-1518638150340', 'photo-1509316975850'];
    const validCleanUrls = rawMatches.filter((url) => !banned.some((b) => url.includes(b)));
    
    if (rawMatches.length > 0 && validCleanUrls.length === 0) {
      alert('Las URLs ingresadas corresponden a enlaces bloqueados y fueron omitidas.');
      setNewGalleryUrlInput('');
      return;
    }

    let urlsToAdd = validCleanUrls;
    if (urlsToAdd.length === 0 && newGalleryUrlInput.trim().startsWith('http')) {
      const single = newGalleryUrlInput.trim();
      if (!banned.some((b) => single.includes(b))) {
        urlsToAdd = [single];
      }
    }

    if (urlsToAdd.length === 0) {
      alert('Por favor ingresa una URL válida (ej. https://images.unsplash.com/...)');
      return;
    }

    const current = editingPkg.images && editingPkg.images.length > 0 ? editingPkg.images : [editingPkg.imageUrl];
    const newImages = [...current, ...urlsToAdd];
    setEditingPkg({
      ...editingPkg,
      images: newImages,
    });
    setNewGalleryUrlInput('');
    showToast(`¡${urlsToAdd.length} foto(s) agregada(s) a la galería!`);
  };

  const handleStartEditPkg = (pkg: Package) => {
    setEditingPkg(JSON.parse(JSON.stringify(pkg)));
    setIsCreatingPkg(false);
  };

  const handleStartCreatePkg = () => {
    const blankPkg: Package = {
      id: `pkg-${Date.now()}`,
      title: {
        ES: 'Nueva Gran Travesía Andina',
        EN: 'New Great Andean Expedition',
        PT: 'Nova Grande Expedição Andina',
        FR: 'Nouvelle Grande Expédition Andine',
      },
      tagline: {
        ES: 'Circuito privado de autor con hotelería cinco estrellas y asistencia 24/7.',
        EN: 'Private signature circuit with five-star hospitality and 24/7 care.',
        PT: 'Circuito privado de autor com hotelaria cinco estrelas e assistência 24/7.',
        FR: 'Circuit privé signature avec hébergement cinq étoiles et conciergerie 24/7.',
      },
      country: 'Chile · Bolivia · Perú',
      countriesList: ['Chile', 'Bolivia'],
      days: 7,
      nights: 6,
      maxAltitudeMeters: 4000,
      difficulty: 'Moderada',
      basePriceUSD: 1950,
      hotelCostUSD: {
        none: 0,
        '3star': 450,
        '4star': 750,
        '5star': 1100,
      },
      logisticsCostUSD: 650,
      ticketsCostUSD: 240,
      imageUrl:
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
      images: [
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
      ],
      highlights: [
        'Guía Bilingüe y Conductor Certificado',
        'Camioneta 4x4 Satelital con Oxígeno Medicinal',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Bienvenida y Acogida',
          region: 'Atacama',
          description: 'Arribo, traslado privado al lodge y cena de aclimatación.',
          altitudeMeters: 2400,
        },
        {
          day: 2,
          title: 'Exploración del Paisaje Altiplánico',
          region: 'Atacama',
          description: 'Excursión guiada por formaciones geológicas y lagunas.',
          altitudeMeters: 3800,
        },
      ],
      recommendedHotels: [
        {
          name: 'Tierra Atacama Hotel & Spa',
          category: '5 Estrellas',
          description: 'Lodge de arquitectura orgánica y spa termal.',
        },
      ],
    };
    setEditingPkg(blankPkg);
    setIsCreatingPkg(true);
  };

  const handleSavePkg = () => {
    if (!editingPkg) return;
    const banned = ['photo-1518638150340', 'photo-1509316975850'];
    const currentImages = editingPkg.images && editingPkg.images.length > 0 ? editingPkg.images : [editingPkg.imageUrl];
    const cleanImages = currentImages.filter((img) => !banned.some((b) => img.includes(b)));
    const fallbackCover = cleanImages[0] || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85';

    const finalPkg: Package = {
      ...editingPkg,
      imageUrl: cleanImages.includes(editingPkg.imageUrl) ? editingPkg.imageUrl : fallbackCover,
      images: cleanImages.length > 0 ? cleanImages : [fallbackCover],
    };

    let updated: Package[];
    if (isCreatingPkg) {
      updated = [finalPkg, ...packages];
    } else {
      updated = packages.map((p) => (p.id === finalPkg.id ? finalPkg : p));
    }
    setPackages(updated);
    saveStoredPackages(updated);
    setEditingPkg(null);
    setIsCreatingPkg(false);
    showToast(`¡Galería y paquete "${finalPkg.title.ES}" guardados exitosamente!`);
  };

  const handleDeletePkg = (id: string) => {
    if (packages.length <= 1) {
      alert('Debe quedar al menos un paquete en el catálogo.');
      return;
    }
    if (window.confirm('¿Seguro que deseas eliminar este paquete del catálogo público?')) {
      const updated = packages.filter((p) => p.id !== id);
      setPackages(updated);
      saveStoredPackages(updated);
      showToast('Paquete eliminado del catálogo.');
    }
  };

  // ----------------------------------------------------
  // TAB 3: HOTELS CRUD
  // ----------------------------------------------------
  const [editingHotel, setEditingHotel] = useState<HotelItem | null>(null);
  const [isCreatingHotel, setIsCreatingHotel] = useState(false);

  const handleStartEditHotel = (h: HotelItem) => {
    setEditingHotel({ ...h });
    setIsCreatingHotel(false);
  };

  const handleStartCreateHotel = () => {
    const blankHotel: HotelItem = {
      id: `hotel-${Date.now()}`,
      name: 'Nuevo Lodge Andino',
      category: '5star',
      region: 'bolivia',
      countryBadge: 'Uyuni · Altiplano',
      subtitle: 'Arquitectura Sostenible',
      description: 'Lodge bioclimático de lujo con ventanales panorámicos y spa geotermal.',
      comfort: 'Lujo Altiplánico · 3.700 msnm',
      pricePerNightUSD: 380,
      imageUrl:
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2000&q=85',
    };
    setEditingHotel(blankHotel);
    setIsCreatingHotel(true);
  };

  const handleSaveHotel = () => {
    if (!editingHotel) return;
    let updated: HotelItem[];
    if (isCreatingHotel) {
      updated = [editingHotel, ...hotelsList];
    } else {
      updated = hotelsList.map((h) => (h.id === editingHotel.id ? editingHotel : h));
    }
    onUpdateHotels(updated);
    setEditingHotel(null);
    setIsCreatingHotel(false);
    showToast(`¡Hotel "${editingHotel.name}" guardado y visible en la sección de hoteles!`);
  };

  const handleDeleteHotel = (id: string) => {
    if (hotelsList.length <= 1) {
      alert('Debe quedar al menos un hotel en la colección.');
      return;
    }
    if (window.confirm('¿Deseas eliminar este hotel de la vitrina?')) {
      const updated = hotelsList.filter((h) => h.id !== id);
      onUpdateHotels(updated);
      showToast('Hotel eliminado con éxito.');
    }
  };

  // ----------------------------------------------------
  // TAB 4: DESTINATIONS & HITOS CRUD
  // ----------------------------------------------------
  const [editingDest, setEditingDest] = useState<RouteDestination | null>(null);
  const [isCreatingDest, setIsCreatingDest] = useState(false);

  const handleStartEditDest = (d: RouteDestination) => {
    setEditingDest({ ...d });
    setIsCreatingDest(false);
  };

  const handleStartCreateDest = () => {
    const blankDest: RouteDestination = {
      id: `dest-${Date.now()}`,
      name: 'Nuevo Destino Andino',
      country: 'Bolivia',
      flag: '🇧🇴',
      altitude: '3.500 msnm',
      altitudeMeters: 3500,
      days: 2,
      costUSD: 450,
      tag: 'Paisaje Natural & Aventura Privada',
      imageUrl:
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
    };
    setEditingDest(blankDest);
    setIsCreatingDest(true);
  };

  const handleSaveDest = () => {
    if (!editingDest) return;
    let updated: RouteDestination[];
    if (isCreatingDest) {
      updated = [...destinations, editingDest];
    } else {
      updated = destinations.map((d) => (d.id === editingDest.id ? editingDest : d));
    }
    onUpdateDestinations(updated);
    setEditingDest(null);
    setIsCreatingDest(false);
    showToast(`¡Destino "${editingDest.name}" guardado! El gráfico altimétrico del Home ya lo incluye.`);
  };

  const handleDeleteDest = (id: string) => {
    if (destinations.length <= 2) {
      alert('Se requieren al menos 2 destinos para trazar la ruta interactiva.');
      return;
    }
    if (window.confirm('¿Eliminar este destino del trazador interactivo del Home?')) {
      const updated = destinations.filter((d) => d.id !== id);
      onUpdateDestinations(updated);
      showToast('Destino eliminado del trazador.');
    }
  };

  // ----------------------------------------------------
  // TAB 5 & 6: AI GENERATOR & FINANCIAL METRICS
  // ----------------------------------------------------
  const [destInput, setDestInput] = useState('Samaipata & Valles Cruceños');
  const [daysInput, setDaysInput] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMsg, setGenerationMsg] = useState('');
  const [lastGeneratedPkg, setLastGeneratedPkg] = useState<Package | null>(null);

  const totalRevenueUSD = reservations.reduce((acc, r) => acc + (r.totalGroupUSD || 0), 0);
  const netAgencyProfitUSD = reservations.reduce((acc, r) => acc + (r.estimatedProfitUSD || 0), 0);
  const paidReservationsCount = reservations.filter(
    (r) => r.paymentStatus === 'paid_deposit' || r.paymentStatus === 'paid_full'
  ).length;

  const getGeminiApiKey = (): string => {
    try {
      if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
        return process.env.GEMINI_API_KEY;
      }
    } catch {
      // process is not defined
    }
    try {
      const metaEnv = (import.meta as any)?.env;
      if (metaEnv?.VITE_GEMINI_API_KEY) return metaEnv.VITE_GEMINI_API_KEY;
      if (metaEnv?.GEMINI_API_KEY) return metaEnv.GEMINI_API_KEY;
    } catch {
      // import.meta.env not available
    }
    return '';
  };

  const generateIntelligentBackupPackage = (dest: string, days: number): any => {
    const cleanDest = dest.trim();
    const q = cleanDest.toLowerCase();

    let country = 'Chile · Bolivia · Perú';
    let countriesList = ['Chile', 'Bolivia', 'Perú'];
    let baseAltitude = 3200;
    let maxAltitude = 3850;
    let difficulty: 'Suave' | 'Media' | 'Moderada' | 'Exigente' = 'Moderada';
    let heroImage = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85';
    let gallery = [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=2000&q=85',
    ];

    if (q.includes('uyuni') || q.includes('salar') || q.includes('potos') || q.includes('incahuasi')) {
      country = 'Bolivia';
      countriesList = ['Bolivia'];
      baseAltitude = 3650;
      maxAltitude = 4400;
      difficulty = 'Moderada';
      heroImage = 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85';
      gallery = [
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=85',
      ];
    } else if (q.includes('atacama') || q.includes('san pedro') || q.includes('tatio') || q.includes('chile')) {
      country = 'Chile';
      countriesList = ['Chile'];
      baseAltitude = 2400;
      maxAltitude = 4320;
      difficulty = 'Media';
      heroImage = 'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=2000&q=85';
      gallery = [
        'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
      ];
    } else if (
      q.includes('cusco') ||
      q.includes('cuzco') ||
      q.includes('machu') ||
      q.includes('sagrado') ||
      q.includes('vinicunca') ||
      q.includes('colca') ||
      q.includes('arequipa') ||
      q.includes('peru') ||
      q.includes('perú')
    ) {
      country = 'Perú';
      countriesList = ['Perú'];
      baseAltitude = 2430;
      maxAltitude = 3800;
      difficulty = q.includes('vinicunca') ? 'Exigente' : 'Media';
      heroImage = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85';
      gallery = [
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
      ];
    } else if (q.includes('samaipata') || q.includes('valles') || q.includes('amboro') || q.includes('cruceños')) {
      country = 'Bolivia';
      countriesList = ['Bolivia'];
      baseAltitude = 1650;
      maxAltitude = 2200;
      difficulty = 'Suave';
      heroImage = 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85';
      gallery = [
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=2000&q=85',
      ];
    } else if (q.includes('titicaca') || q.includes('copacabana') || q.includes('puno') || q.includes('isla del sol')) {
      country = 'Bolivia · Perú';
      countriesList = ['Bolivia', 'Perú'];
      baseAltitude = 3812;
      maxAltitude = 4050;
      difficulty = 'Media';
      heroImage = 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=2000&q=85';
      gallery = [
        'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
      ];
    }

    const basePriceUSD = Math.max(950, Math.round((days * 220 + 600) / 10) * 10);
    const logisticsCostUSD = Math.round(basePriceUSD * 0.36);
    const ticketsCostUSD = Math.round(basePriceUSD * 0.14);

    const itinerary = Array.from({ length: days }, (_, idx) => {
      const dayNum = idx + 1;
      if (dayNum === 1) {
        return {
          day: 1,
          title: `Llegada VIP, Recepción & Aclimatación en ${cleanDest}`,
          region: `${cleanDest} (${country})`,
          description: `Bienvenida privada en el punto de encuentro o terminal, traslado exclusivo al lodge boutique, infusión digestiva andina de bienvenida y briefing de aclimatación médica preventiva.`,
          altitudeMeters: baseAltitude,
          meals: 'Cena de bienvenida con gastronomía andina de autor',
          transport: 'SUV ejecutiva privada con chófer bilingüe',
        };
      }
      if (dayNum === days) {
        return {
          day: days,
          title: `Amanecer Panorámico, Despedida y Conexión desde ${cleanDest}`,
          region: `${cleanDest} (${country})`,
          description: `Desayuno buffet con vistas abiertas a la cordillera, recorrido por tiendas de artesanía fina comunitaria y traslado privado al aeropuerto o siguiente punto de enlace.`,
          altitudeMeters: baseAltitude,
          meals: 'Desayuno gourmet completo',
          transport: 'SUV ejecutiva privada',
        };
      }
      const stepAlt = Math.min(
        maxAltitude,
        Math.round(baseAltitude + (maxAltitude - baseAltitude) * (idx / Math.max(1, days - 1)))
      );
      const activities = [
        `Expedición guiada por cañones geológicos, miradores panorámicos y senderos vírgenes de ${cleanDest}. Almuerzo campestre privado al aire libre.`,
        `Travesía 4x4 por enclaves patrimoniales, formaciones rocosas milenarias y lagunas altiplánicas con colonias de avifauna nativa.`,
        `Inmersión cultural con comunidades locales, degustación de productos nativos y sesión nocturna de astrofotografía en cielos limpios.`,
        `Trekking suave por valles sagrados, sitios arqueológicos y miradores de 360° con asistencia de oxígeno permanente.`,
        `Ruta escénica por pasos de altura, observación de vicuñas silvestres y relajación en aguas termales de origen volcánico.`,
      ];
      const actDesc = activities[(idx - 1) % activities.length];
      return {
        day: dayNum,
        title: `Día ${dayNum}: Exploración Profunda de ${cleanDest} & Entorno Andino`,
        region: `${cleanDest} · ${stepAlt} msnm`,
        description: actDesc,
        altitudeMeters: stepAlt,
        meals: 'Pensión completa (Desayuno buffet + Almuerzo gourmet + Cena de autor)',
        transport: 'Vehículo 4x4 todoterreno privado con oxígeno medicinal y teléfono satelital',
      };
    });

    return {
      id: `pkg-${Date.now()}`,
      title: {
        ES: `Expedición de Autor: ${cleanDest}`,
        EN: `Signature Expedition: ${cleanDest}`,
        PT: `Expedição de Autor: ${cleanDest}`,
        FR: `Expédition Signature: ${cleanDest}`,
      },
      tagline: {
        ES: `Inmersión exclusiva de ${days} días por paisajes prístinos andinos en privado.`,
        EN: `Exclusive ${days}-day private immersion across pristine Andean landscapes.`,
        PT: `Imersão exclusiva de ${days} dias em privado pelas paisagens andinas intocadas.`,
        FR: `Immersion privée exclusive de ${days} jours à travers les paysages andins préservés.`,
      },
      country,
      countriesList,
      days,
      nights: Math.max(1, days - 1),
      maxAltitudeMeters: maxAltitude,
      difficulty,
      basePriceUSD,
      hotelCostUSD: {
        none: 0,
        '3star': Math.round(basePriceUSD * 0.25),
        '4star': Math.round(basePriceUSD * 0.42),
        '5star': Math.round(basePriceUSD * 0.65),
      },
      logisticsCostUSD,
      ticketsCostUSD,
      imageUrl: heroImage,
      images: gallery,
      highlights: [
        `Expedición 100% privada en camioneta 4x4 con conductor local y guía bilingüe certificado`,
        `Monitoreo preventivo de aclimatación con oximetría permanente y oxígeno medicinal a bordo`,
        `Hospedaje boutique seleccionado con arquitectura orgánica y gastronomía de autor`,
        `Accesos VIP y permisos de preservación en todos los parques y miradores de ${cleanDest}`,
      ],
      itinerary,
      recommendedHotels: [
        {
          name: `Lodge Boutique & Spa ${cleanDest}`,
          category: '5★ High Luxury',
          description:
            'Arquitectura integrada al paisaje con ventanales panorámicos, calefacción de suelo radiante y spa andino.',
        },
        {
          name: `Hotel de Autor ${cleanDest}`,
          category: '4★ Boutique & Confort',
          description: 'Ambiente cálido con chimenea de leña, gastronomía novoandina y cava de vinos de altura.',
        },
      ],
      isCustomAI: true,
    };
  };

  const handleGeneratePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destInput.trim()) return;

    setIsGenerating(true);
    setGenerationMsg('Investigando destino andino con IA y consultando geografía...');

    let rawPkg: any = null;

    // 1. Intentar backend /api/gemini/generate-package
    try {
      const response = await fetch('/api/gemini/generate-package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: destInput, days: daysInput }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json && json.success && json.package) {
          rawPkg = json.package;
        }
      }
    } catch {
      // Backend no disponible o error de red: continuar sin mostrar alertas
    }

    // 2. Si no hubo backend o falló, intentar directamente con @google/genai si hay API key
    if (!rawPkg) {
      const apiKey = getGeminiApiKey();
      if (apiKey) {
        try {
          setGenerationMsg('Generando paquete completo en vivo con Google GenAI...');
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `Actúa como diseñador jefe de expediciones de lujo en Triángulo Andino Travel (Chile, Bolivia, Perú).
Diseña un nuevo paquete turístico completo de alta gama para el destino: "${destInput}" con duración de ${daysInput} días.
Devuelve EXCLUSIVAMENTE un objeto JSON válido con esta estructura:
{
  "id": "pkg-${Date.now()}",
  "title": {
    "ES": "Título atractivo en Español",
    "EN": "Title in English",
    "PT": "Título em Português",
    "FR": "Titre en Français"
  },
  "tagline": {
    "ES": "Frase destacada en Español",
    "EN": "Tagline in English",
    "PT": "Frase em Português",
    "FR": "Phrase en Français"
  },
  "country": "Chile, Bolivia o Perú",
  "days": ${daysInput},
  "nights": ${Math.max(1, daysInput - 1)},
  "maxAltitudeMeters": 3800,
  "difficulty": "Suave | Media | Moderada | Exigente",
  "basePriceUSD": 1950,
  "estimatedHotelCostUSD": 600,
  "estimatedLogisticsCostUSD": 850,
  "estimatedTicketsCostUSD": 250,
  "highlights": [
    "Hito 1 exclusivo",
    "Hito 2 exclusivo",
    "Hito 3 exclusivo"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Llegada y bienvenida",
      "altitude": "2.400 msnm",
      "description": "Detalle del día",
      "meals": "Cena de bienvenida andina",
      "transport": "SUV 4x4 privada"
    }
  ],
  "recommendedHotels": [
    {
      "name": "Hotel seleccionado",
      "category": "5★ High Luxury | 4★ Boutique | 3★ Confort",
      "description": "Descripción del alojamiento"
    }
  ]
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          const responseText = response.text || '';
          if (responseText) {
            const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            rawPkg = JSON.parse(cleaned);
          }
        } catch {
          // Continuar al generador estructurado de respaldo
        }
      }
    }

    // 3. Respaldo inteligente completo: nunca falla
    if (!rawPkg) {
      rawPkg = generateIntelligentBackupPackage(destInput, daysInput);
    }

    try {
      const validDifficulties: Array<'Suave' | 'Media' | 'Moderada' | 'Exigente'> = [
        'Suave',
        'Media',
        'Moderada',
        'Exigente',
      ];
      const difficulty = validDifficulties.includes(rawPkg.difficulty)
        ? (rawPkg.difficulty as 'Suave' | 'Media' | 'Moderada' | 'Exigente')
        : 'Moderada';

      const newPkg: Package = {
        id: rawPkg.id || `pkg-${Date.now()}`,
        title: rawPkg.title || {
          ES: `Expedición de Autor: ${destInput}`,
          EN: `Signature Expedition: ${destInput}`,
          PT: `Expedição de Autor: ${destInput}`,
          FR: `Expédition Signature: ${destInput}`,
        },
        tagline: rawPkg.tagline || {
          ES: `Inmersión exclusiva de ${daysInput} días por paisajes prístinos andinos.`,
          EN: `Exclusive ${daysInput}-day immersion across pristine Andean landscapes.`,
          PT: `Imersão exclusiva de ${daysInput} dias por paisagens andinas intocadas.`,
          FR: `Immersion exclusive de ${daysInput} jours à travers des paysages andins préservés.`,
        },
        country: rawPkg.country || 'Chile · Bolivia · Perú',
        countriesList:
          Array.isArray(rawPkg.countriesList) && rawPkg.countriesList.length > 0
            ? rawPkg.countriesList
            : [rawPkg.country || 'Bolivia'],
        days: rawPkg.days || daysInput,
        nights: rawPkg.nights || Math.max(1, daysInput - 1),
        maxAltitudeMeters: rawPkg.maxAltitudeMeters || 3600,
        difficulty,
        basePriceUSD: rawPkg.basePriceUSD || 1850,
        hotelCostUSD: rawPkg.hotelCostUSD || {
          none: 0,
          '3star': Math.round((rawPkg.basePriceUSD || 1850) * 0.25),
          '4star': Math.round((rawPkg.basePriceUSD || 1850) * 0.35),
          '5star': Math.round((rawPkg.basePriceUSD || 1850) * 0.5),
        },
        logisticsCostUSD: rawPkg.estimatedLogisticsCostUSD || rawPkg.logisticsCostUSD || 650,
        ticketsCostUSD: rawPkg.estimatedTicketsCostUSD || rawPkg.ticketsCostUSD || 220,
        imageUrl:
          rawPkg.imageUrl ||
          'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
        images:
          Array.isArray(rawPkg.images) && rawPkg.images.length > 0
            ? rawPkg.images
            : [
                rawPkg.imageUrl ||
                  'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85',
                'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2000&q=85',
              ],
        highlights: Array.isArray(rawPkg.highlights)
          ? rawPkg.highlights.map((h: any) =>
              typeof h === 'string' ? h : h.title || h.name || 'Visita destacada'
            )
          : ['Expedición privada guiada', 'Vehículo 4x4 con oxígeno'],
        itinerary: Array.isArray(rawPkg.itinerary)
          ? rawPkg.itinerary.map((it: any, i: number) => ({
              day: it.day || i + 1,
              title: it.title || `Día ${i + 1}`,
              region: it.region || destInput,
              description: it.description || it.desc || 'Recorrido privado guiado.',
              altitudeMeters: it.altitudeMeters || 3000,
              meals: it.meals || 'Pensión completa andina',
              transport: it.transport || 'Vehículo 4x4 privado con oxígeno medicinal',
            }))
          : [
              {
                day: 1,
                title: 'Llegada y Aclimatación',
                region: destInput,
                description: 'Recepción privada y traslado al lodge.',
                altitudeMeters: 2000,
                meals: 'Cena de bienvenida',
                transport: 'SUV ejecutiva privada',
              },
            ],
        recommendedHotels:
          Array.isArray(rawPkg.recommendedHotels) && rawPkg.recommendedHotels.length > 0
            ? rawPkg.recommendedHotels
            : [
                {
                  name: 'Lodge Boutique Andino',
                  category: '5 Estrellas',
                  description: 'Confort de altura con gastronomía local.',
                },
              ],
        isCustomAI: true,
      };

      const updated = [newPkg, ...packages];
      setPackages(updated);
      saveStoredPackages(updated);
      setLastGeneratedPkg(newPkg);
      showToast(`¡Paquete "${destInput}" creado con éxito y publicado en la web!`);
    } catch (err) {
      console.error('Error publicando el paquete:', err);
    } finally {
      setIsGenerating(false);
      setGenerationMsg('');
    }
  };

  return (
    <div className="min-h-screen bg-admin-bg text-canvas pb-24">
      {/* Visual Floating Toast Confirmation */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-lg shadow-2xl border border-emerald-400 font-semibold text-sm animate-bounce">
          <span className="material-symbols-outlined text-xl">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Navigation Bar */}
      <div className="bg-admin-card border-b border-admin-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-terracotta to-gold flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-wide">
                  Panel de Control & CMS Central
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider">
                  En Vivo
                </span>
              </div>
              <p className="text-xs text-admin-text-secondary">
                Edición en tiempo real del Frontend, Portada, Paquetes, Hoteles y Destinos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone text-admin-bg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base text-terracotta">visibility</span>
              <span>Ver Portada en Vivo</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    '¿Deseas restaurar todos los textos, fotos, paquetes, hoteles y destinos a los valores originales de fábrica?'
                  )
                ) {
                  onFactoryReset();
                  setCountryMedia(getStoredCountryMedia());
                  showToast('¡Datos de fábrica restaurados con éxito!');
                }
              }}
              className="px-3.5 py-2.5 rounded-xl bg-admin-surface hover:bg-rose-950/60 hover:text-rose-300 text-stone text-xs font-semibold flex items-center gap-1.5 border border-admin-border transition-all"
              title="Restaurar datos iniciales"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span className="hidden sm:inline">Restaurar Fábrica</span>
            </button>
          </div>
        </div>

        {/* CMS Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 overflow-x-auto border-t border-admin-border/80 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'branding'
                ? 'border-terracotta text-white bg-admin-bg/70'
                : 'border-transparent text-admin-text-secondary hover:text-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">palette</span>
            <span>🎨 Portada & Branding</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'packages'
                ? 'border-terracotta text-white bg-admin-bg/70'
                : 'border-transparent text-admin-text-secondary hover:text-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">inventory_2</span>
            <span>📦 Paquetes Turísticos ({packages.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hotels')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'hotels'
                ? 'border-terracotta text-white bg-admin-bg/70'
                : 'border-transparent text-admin-text-secondary hover:text-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">hotel</span>
            <span>🏨 Hoteles & Lodges ({hotelsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'destinations'
                ? 'border-terracotta text-white bg-admin-bg/70'
                : 'border-transparent text-admin-text-secondary hover:text-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">map</span>
            <span>🗺️ Rutas & Hitos ({destinations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'media'
                ? 'border-terracotta text-white bg-admin-bg/70'
                : 'border-transparent text-admin-text-secondary hover:text-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">perm_media</span>
            <span>🎬 Media 3 Países (30 Fotos / 15 Videos)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reservations'
                ? 'border-terracotta text-white bg-admin-bg/70'
                : 'border-transparent text-admin-text-secondary hover:text-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            <span>📑 Reservas & Finanzas ({reservations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai_gen')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'ai_gen'
                ? 'border-terracotta text-white bg-admin-bg/70'
                : 'border-transparent text-admin-text-secondary hover:text-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base text-amber-400">auto_awesome</span>
            <span>✨ Generador IA</span>
          </button>
        </div>
      </div>

      {/* Main CMS Container */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* ========================================================================= */}
        {/* MODULE 1: PORTADA & BRANDING                                              */}
        {/* ========================================================================= */}
        {activeTab === 'branding' && (
          <div className="bg-admin-card border border-admin-border rounded-lg p-6 lg:p-8 shadow-xl flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-admin-border gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-terracotta">palette</span>
                  Configuración de Portada, Hero y Concierge
                </h2>
                <p className="text-xs text-admin-text-secondary mt-1">
                  Actualiza la fotografía principal de fondo, titulares y canales de contacto directo.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveBranding}
                className="px-6 py-3 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span className="material-symbols-outlined text-base">save</span>
                <span>Guardar y Publicar en Portada</span>
              </button>
            </div>

            <form onSubmit={handleSaveBranding} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Background Image Manager */}
              <div className="flex flex-col gap-4 bg-admin-bg/80 p-6 rounded-lg border border-admin-border">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">image</span>
                  Fotografía de Fondo del Hero (Pantalla Completa)
                </span>

                {/* Live Preview of Hero Background */}
                <div className="relative h-56 w-full rounded-xl overflow-hidden border border-admin-border bg-admin-card">
                  <img
                    src={brandingForm.heroImageUrl}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-mono text-stone truncate">
                      {brandingForm.heroImageUrl}
                    </span>
                  </div>
                </div>

                {/* URL Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone">
                    URL de la Imagen (Unsplash u otro servidor):
                  </label>
                  <input
                    type="url"
                    value={brandingForm.heroImageUrl}
                    onChange={(e) =>
                      setBrandingForm({ ...brandingForm, heroImageUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-terracotta"
                  />
                </div>

                {/* Local File Upload */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-admin-border">
                  <label className="text-xs font-semibold text-stone flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-terracotta">
                      upload_file
                    </span>
                    O subir imagen desde tu ordenador (Base64 local):
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileToDataUrl(file, (dataUrl) => {
                          setBrandingForm({ ...brandingForm, heroImageUrl: dataUrl });
                        });
                      }
                    }}
                    className="text-xs text-admin-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-admin-surface file:text-white hover:file:bg-admin-hover cursor-pointer"
                  />
                </div>

                {/* Curated Presets */}
                <div className="pt-2 flex flex-col gap-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-admin-text-secondary font-bold">
                    Presets Recomendados del Triángulo Andino:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setBrandingForm({
                          ...brandingForm,
                          heroImageUrl:
                            'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600',
                        })
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-hover text-[11px] text-stone text-left truncate"
                    >
                      🏔️ Machu Picchu (Perú)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBrandingForm({
                          ...brandingForm,
                          heroImageUrl:
                            'https://images.pexels.com/photos/30929532/pexels-photo-30929532.jpeg?auto=compress&cs=tinysrgb&w=1600',
                        })
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-hover text-[11px] text-stone text-left truncate"
                    >
                      🦩 Salar de Uyuni (Bolivia)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBrandingForm({
                          ...brandingForm,
                          heroImageUrl:
                            'https://images.pexels.com/photos/33047883/pexels-photo-33047883.jpeg?auto=compress&cs=tinysrgb&w=1600',
                        })
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-hover text-[11px] text-stone text-left truncate"
                    >
                      🏜️ Valle de la Luna · Atacama (Chile)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBrandingForm({
                          ...brandingForm,
                          heroImageUrl:
                            'https://images.pexels.com/photos/39442820/pexels-photo-39442820.jpeg?auto=compress&cs=tinysrgb&w=1600',
                        })
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-hover text-[11px] text-stone text-left truncate"
                    >
                      🌈 Vinicunca 7 Colores (Perú)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Titles, Kicker & WhatsApp Concierge */}
              <div className="flex flex-col gap-5 bg-admin-bg/80 p-6 rounded-lg border border-admin-border">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">edit_note</span>
                  Titulares y Mensajería Concierge
                </span>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone">
                    Kicker Superior (Encabezado pequeño):
                  </label>
                  <input
                    type="text"
                    value={brandingForm.heroKicker || brandingForm.heroTag || ''}
                    onChange={(e) =>
                      setBrandingForm({
                        ...brandingForm,
                        heroKicker: e.target.value,
                        heroTag: e.target.value,
                      })
                    }
                    className="w-full bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone">
                      Título Hero - Parte 1:
                    </label>
                    <input
                      type="text"
                      value={brandingForm.heroTitle1}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, heroTitle1: e.target.value })
                      }
                      className="w-full bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone">
                      Título Hero - Parte 2 (Dorado / Cursiva):
                    </label>
                    <input
                      type="text"
                      value={brandingForm.heroTitle2}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, heroTitle2: e.target.value })
                      }
                      className="w-full bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-amber-300 font-serif focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone">
                    Subtítulo / Bajada Descriptiva:
                  </label>
                  <textarea
                    rows={3}
                    value={brandingForm.heroSubtitle}
                    onChange={(e) =>
                      setBrandingForm({ ...brandingForm, heroSubtitle: e.target.value })
                    }
                    className="w-full bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-terracotta leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-admin-border flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">chat</span>
                    WhatsApp Concierge 24/7
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Teléfono WhatsApp (Con código de país):
                      </label>
                      <input
                        type="text"
                        value={brandingForm.conciergePhone}
                        onChange={(e) =>
                          setBrandingForm({ ...brandingForm, conciergePhone: e.target.value })
                        }
                        placeholder="56982349900"
                        className="w-full bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Mensaje Pre-cargado:
                      </label>
                      <input
                        type="text"
                        value={brandingForm.conciergeDefaultMsg}
                        onChange={(e) =>
                          setBrandingForm({ ...brandingForm, conciergeDefaultMsg: e.target.value })
                        }
                        className="w-full bg-admin-card border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-base">save</span>
                    <span>Guardar y Publicar en Portada</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: PAQUETES TURÍSTICOS CRUD                                        */}
        {/* ========================================================================= */}
        {activeTab === 'packages' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-admin-card p-6 rounded-lg border border-admin-border">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-terracotta">inventory_2</span>
                  Gestor de Paquetes Turísticos del Catálogo
                </h2>
                <p className="text-xs text-admin-text-secondary mt-1">
                  Administra precios base, itinerarios día a día y galerías fotográficas completas.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartCreatePkg}
                className="px-5 py-3 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Crear Nuevo Paquete</span>
              </button>
            </div>

            {/* Packages List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => {
                const gallery = pkg.images || [pkg.imageUrl];
                return (
                  <div
                    key={pkg.id}
                    className="bg-admin-card border border-admin-border rounded-lg overflow-hidden flex flex-col group hover:border-admin-border transition-all shadow-lg"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-admin-bg">
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.title.ES}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur text-white text-[10px] font-bold uppercase">
                        {pkg.countriesList.join(' · ')}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-olive text-white text-[10px] font-bold">
                        {pkg.days} Días / {pkg.nights} Noches
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/75 text-amber-400 text-[10px] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">photo_library</span>
                        {gallery.length} fotos
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white line-clamp-1">
                          {pkg.title.ES}
                        </h3>
                        <p className="text-xs text-admin-text-secondary mt-1 line-clamp-2">
                          {pkg.tagline.ES}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs text-stone">
                          <span>Altitud Máx: {pkg.maxAltitudeMeters.toLocaleString()} msnm</span>
                          <span className="text-amber-400 font-bold text-sm">
                            ${pkg.basePriceUSD} USD
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-admin-border flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onViewPackage(pkg)}
                          className="px-3 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-hover text-stone text-xs font-semibold flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          Ver
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEditPkg(pkg)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1 border border-amber-500/30"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePkg(pkg.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20"
                            title="Eliminar paquete"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Package Edit/Create Modal */}
            {editingPkg && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-admin-card border border-admin-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-admin-border">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-terracotta">
                        {isCreatingPkg ? 'add_circle' : 'edit'}
                      </span>
                      {isCreatingPkg ? 'Crear Nuevo Paquete' : `Editar: ${editingPkg.title.ES}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="w-8 h-8 rounded-full bg-admin-surface hover:bg-admin-hover text-stone flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-stone">
                        Título del Paquete (Español):
                      </label>
                      <input
                        type="text"
                        value={editingPkg.title.ES}
                        onChange={(e) =>
                          setEditingPkg({
                            ...editingPkg,
                            title: { ...editingPkg.title, ES: e.target.value },
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-stone">
                        Tagline / Descripción Corta:
                      </label>
                      <input
                        type="text"
                        value={editingPkg.tagline.ES}
                        onChange={(e) =>
                          setEditingPkg({
                            ...editingPkg,
                            tagline: { ...editingPkg.tagline, ES: e.target.value },
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Precio Base USD (Por Viajero):
                      </label>
                      <input
                        type="number"
                        value={editingPkg.basePriceUSD}
                        onChange={(e) =>
                          setEditingPkg({
                            ...editingPkg,
                            basePriceUSD: Number(e.target.value) || 0,
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-amber-400 font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Altitud Máxima (msnm):
                      </label>
                      <input
                        type="number"
                        value={editingPkg.maxAltitudeMeters}
                        onChange={(e) =>
                          setEditingPkg({
                            ...editingPkg,
                            maxAltitudeMeters: Number(e.target.value) || 0,
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">Días:</label>
                      <input
                        type="number"
                        value={editingPkg.days}
                        onChange={(e) =>
                          setEditingPkg({
                            ...editingPkg,
                            days: Number(e.target.value) || 1,
                            nights: Math.max(1, (Number(e.target.value) || 1) - 1),
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">Noches:</label>
                      <input
                        type="number"
                        value={editingPkg.nights}
                        onChange={(e) =>
                          setEditingPkg({
                            ...editingPkg,
                            nights: Number(e.target.value) || 1,
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-stone">
                        Países Incluidos (Separados por coma):
                      </label>
                      <input
                        type="text"
                        value={editingPkg.countriesList.join(', ')}
                        onChange={(e) => {
                          const list = e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setEditingPkg({
                            ...editingPkg,
                            countriesList: list,
                            country: list.join(' · '),
                          });
                        }}
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Multi-Photo Gallery Manager */}
                  <div className="pt-4 border-t border-admin-border flex flex-col gap-3">
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">photo_library</span>
                      Galería de Fotos del Paquete (Multi-Imagen en Carrusel)
                    </span>

                    {/* Gallery Thumbnails */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(editingPkg.images || [editingPkg.imageUrl]).map((img, idx) => (
                        <div
                          key={`${img}-${idx}`}
                          className="relative h-28 rounded-xl overflow-hidden border border-admin-border group bg-admin-bg"
                        >
                          <img
                            src={img}
                            alt={`Foto ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {idx === 0 && (
                            <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-olive text-white text-[9px] font-bold uppercase">
                              Principal
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const currentImages = editingPkg.images || [editingPkg.imageUrl];
                                  const newImages = [
                                    img,
                                    ...currentImages.filter((_, i) => i !== idx),
                                  ];
                                  setEditingPkg({
                                    ...editingPkg,
                                    imageUrl: img,
                                    images: newImages,
                                  });
                                }}
                                className="px-2 py-1 rounded-md bg-amber-500 text-admin-bg text-[10px] font-bold"
                                title="Establecer como foto principal"
                              >
                                Portada
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const currentImages = editingPkg.images || [editingPkg.imageUrl];
                                if (currentImages.length <= 1) {
                                  alert('El paquete debe tener al menos una foto.');
                                  return;
                                }
                                const newImages = currentImages.filter((_, i) => i !== idx);
                                setEditingPkg({
                                  ...editingPkg,
                                  imageUrl: newImages[0],
                                  images: newImages,
                                });
                              }}
                              className="w-7 h-7 rounded-md bg-rose-600 text-white flex items-center justify-center"
                              title="Eliminar foto"
                            >
                              <span className="material-symbols-outlined text-xs">delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Photo by URL or File Upload */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <div className="flex-1 flex gap-2">
                        <input
                          type="url"
                          placeholder="Agregar URL de foto..."
                          value={newGalleryUrlInput}
                          onChange={(e) => setNewGalleryUrlInput(e.target.value)}
                          className="flex-1 bg-admin-bg border border-admin-border px-3 py-2 rounded-xl text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newGalleryUrlInput.trim()) return;
                            const current = editingPkg.images || [editingPkg.imageUrl];
                            setEditingPkg({
                              ...editingPkg,
                              images: [...current, newGalleryUrlInput.trim()],
                            });
                            setNewGalleryUrlInput('');
                          }}
                          className="px-3 py-2 rounded-xl bg-admin-surface hover:bg-admin-hover text-white text-xs font-semibold"
                        >
                          + URL
                        </button>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileToDataUrl(file, (dataUrl) => {
                                const current = editingPkg.images || [editingPkg.imageUrl];
                                setEditingPkg({
                                  ...editingPkg,
                                  images: [...current, dataUrl],
                                });
                              });
                            }
                          }}
                          className="text-xs text-admin-text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-admin-surface file:text-white hover:file:bg-admin-hover cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Day-by-Day Itinerary Editor */}
                  <div className="pt-4 border-t border-admin-border flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">calendar_month</span>
                        Itinerario Día por Día ({editingPkg.itinerary.length} días)
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const nextDayNum = editingPkg.itinerary.length + 1;
                          setEditingPkg({
                            ...editingPkg,
                            itinerary: [
                              ...editingPkg.itinerary,
                              {
                                day: nextDayNum,
                                title: `Día ${nextDayNum}: Exploración Andina`,
                                region: 'Altiplano Andino',
                                description: 'Actividad privada guiada con traslados y degustación.',
                                altitudeMeters: 3000,
                              },
                            ],
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-hover text-xs text-surface-container-low font-semibold"
                      >
                        + Agregar Día
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                      {editingPkg.itinerary.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-admin-bg p-3.5 rounded-xl border border-admin-border flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-olive text-white text-[10px] font-bold">
                              Día {item.day}
                            </span>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                placeholder="Altitud msnm"
                                value={item.altitudeMeters || 3000}
                                onChange={(e) => {
                                  const updatedItin = [...editingPkg.itinerary];
                                  updatedItin[idx] = {
                                    ...updatedItin[idx],
                                    altitudeMeters: Number(e.target.value) || 0,
                                  };
                                  setEditingPkg({ ...editingPkg, itinerary: updatedItin });
                                }}
                                className="w-24 bg-admin-card border border-admin-border px-2 py-1 rounded-md text-[11px] text-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (editingPkg.itinerary.length <= 1) return;
                                  const updatedItin = editingPkg.itinerary
                                    .filter((_, i) => i !== idx)
                                    .map((it, i) => ({ ...it, day: i + 1 }));
                                  setEditingPkg({ ...editingPkg, itinerary: updatedItin });
                                }}
                                className="w-6 h-6 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updatedItin = [...editingPkg.itinerary];
                              updatedItin[idx] = { ...updatedItin[idx], title: e.target.value };
                              setEditingPkg({ ...editingPkg, itinerary: updatedItin });
                            }}
                            className="w-full bg-admin-card border border-admin-border px-3 py-1.5 rounded-lg text-xs text-white font-semibold"
                          />

                          <textarea
                            rows={2}
                            value={item.description || item.desc || ''}
                            onChange={(e) => {
                              const updatedItin = [...editingPkg.itinerary];
                              updatedItin[idx] = {
                                ...updatedItin[idx],
                                description: e.target.value,
                                desc: e.target.value,
                              };
                              setEditingPkg({ ...editingPkg, itinerary: updatedItin });
                            }}
                            className="w-full bg-admin-card border border-admin-border px-3 py-1.5 rounded-lg text-xs text-stone"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-admin-border">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="px-5 py-2.5 rounded-xl bg-admin-surface hover:bg-admin-hover text-stone text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePkg}
                      className="px-6 py-2.5 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      Guardar Paquete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 3: HOTELES Y LODGES CRUD                                           */}
        {/* ========================================================================= */}
        {activeTab === 'hotels' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-admin-card p-6 rounded-lg border border-admin-border">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-terracotta">hotel</span>
                  Gestor de Hoteles, Hostales & Lodges de Altura
                </h2>
                <p className="text-xs text-admin-text-secondary mt-1">
                  Controla la sección de hoteles del Home (Chile, Bolivia y Perú) en tiempo real.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartCreateHotel}
                className="px-5 py-3 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span className="material-symbols-outlined text-base">add_business</span>
                <span>Agregar Nuevo Hotel</span>
              </button>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotelsList.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-admin-card border border-admin-border rounded-lg overflow-hidden flex flex-col group hover:border-admin-border transition-all shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-admin-bg">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur text-white text-[10px] font-bold uppercase">
                      {hotel.countryBadge}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-500 text-admin-bg text-[10px] font-extrabold uppercase">
                      {hotel.category === '5star'
                        ? '5 Estrellas'
                        : hotel.category === '4star'
                        ? '4 Estrellas'
                        : '3 Estrellas'}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-terracotta uppercase font-bold tracking-wider">
                        {hotel.subtitle}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                        {hotel.name}
                      </h4>
                      <p className="text-[11px] text-admin-text-secondary mt-1 line-clamp-2 leading-relaxed">
                        {hotel.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-admin-border flex items-center justify-between text-xs">
                      <span className="text-admin-text-secondary text-[11px]">{hotel.comfort}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEditHotel(hotel)}
                          className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center hover:bg-amber-500/30"
                          title="Editar hotel"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteHotel(hotel.id)}
                          className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center hover:bg-rose-500/20"
                          title="Eliminar hotel"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hotel Edit/Create Modal */}
            {editingHotel && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-admin-card border border-admin-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-admin-border">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-terracotta">hotel</span>
                      {isCreatingHotel ? 'Agregar Hotel / Lodge' : `Editar: ${editingHotel.name}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingHotel(null)}
                      className="w-8 h-8 rounded-full bg-admin-surface hover:bg-admin-hover text-stone flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone">
                        Nombre del Hotel / Lodge:
                      </label>
                      <input
                        type="text"
                        value={editingHotel.name}
                        onChange={(e) =>
                          setEditingHotel({ ...editingHotel, name: e.target.value })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">País / Región:</label>
                      <select
                        value={editingHotel.region}
                        onChange={(e) =>
                          setEditingHotel({
                            ...editingHotel,
                            region: e.target.value as 'chile' | 'bolivia' | 'peru',
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      >
                        <option value="chile">🇨🇱 Chile</option>
                        <option value="bolivia">🇧🇴 Bolivia</option>
                        <option value="peru">🇵🇪 Perú</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">Categoría:</label>
                      <select
                        value={editingHotel.category}
                        onChange={(e) =>
                          setEditingHotel({
                            ...editingHotel,
                            category: e.target.value as '3star' | '4star' | '5star',
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      >
                        <option value="5star">5 Estrellas (Lujo / Relais & Châteaux)</option>
                        <option value="4star">4 Estrellas (Superior / Boutique)</option>
                        <option value="3star">3 Estrellas (Turista Confort)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Badge Ubicación (ej. San Pedro de Atacama):
                      </label>
                      <input
                        type="text"
                        value={editingHotel.countryBadge}
                        onChange={(e) =>
                          setEditingHotel({ ...editingHotel, countryBadge: e.target.value })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Subtítulo (ej. Relais & Châteaux Partner):
                      </label>
                      <input
                        type="text"
                        value={editingHotel.subtitle}
                        onChange={(e) =>
                          setEditingHotel({ ...editingHotel, subtitle: e.target.value })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone">Descripción:</label>
                      <textarea
                        rows={3}
                        value={editingHotel.description}
                        onChange={(e) =>
                          setEditingHotel({ ...editingHotel, description: e.target.value })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white leading-relaxed"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Confort / Altitud (ej. Gran Lujo · 2.400 msnm):
                      </label>
                      <input
                        type="text"
                        value={editingHotel.comfort}
                        onChange={(e) =>
                          setEditingHotel({ ...editingHotel, comfort: e.target.value })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Precio Estimado por Noche USD:
                      </label>
                      <input
                        type="number"
                        value={editingHotel.pricePerNightUSD}
                        onChange={(e) =>
                          setEditingHotel({
                            ...editingHotel,
                            pricePerNightUSD: Number(e.target.value) || 0,
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-amber-400 font-bold"
                      />
                    </div>

                    {/* Image URL & Upload */}
                    <div className="flex flex-col gap-2 sm:col-span-2 pt-2 border-t border-admin-border">
                      <label className="text-xs font-semibold text-stone">
                        Foto del Hotel (URL o Subir archivo):
                      </label>
                      <input
                        type="url"
                        value={editingHotel.imageUrl}
                        onChange={(e) =>
                          setEditingHotel({ ...editingHotel, imageUrl: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileToDataUrl(file, (dataUrl) => {
                              setEditingHotel({ ...editingHotel, imageUrl: dataUrl });
                            });
                          }
                        }}
                        className="text-xs text-admin-text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-admin-surface file:text-white hover:file:bg-admin-hover cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-admin-border">
                    <button
                      type="button"
                      onClick={() => setEditingHotel(null)}
                      className="px-5 py-2.5 rounded-xl bg-admin-surface hover:bg-admin-hover text-stone text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveHotel}
                      className="px-6 py-2.5 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      Guardar Hotel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 4: RUTAS & HITOS CRUD                                              */}
        {/* ========================================================================= */}
        {activeTab === 'destinations' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-admin-card p-6 rounded-lg border border-admin-border">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-terracotta">map</span>
                  Gestor de Destinos & Hitos del Trazador Interactivo
                </h2>
                <p className="text-xs text-admin-text-secondary mt-1">
                  Crea o modifica los hitos que los turistas eligen para trazar la ruta en vivo y el
                  gráfico altimétrico SVG del Home.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartCreateDest}
                className="px-5 py-3 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span className="material-symbols-outlined text-base">add_location_alt</span>
                <span>Agregar Nuevo Hito</span>
              </button>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-admin-card border border-admin-border rounded-lg overflow-hidden flex flex-col group hover:border-admin-border transition-all shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-admin-bg">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur text-white text-[10px] font-bold uppercase">
                      {dest.flag} {dest.country}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-admin-card/85 backdrop-blur text-amber-300 text-[11px] font-bold">
                      {dest.altitudeMeters.toLocaleString()} msnm
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-white">{dest.name}</h4>
                      <p className="text-xs text-admin-text-secondary mt-1 line-clamp-2 leading-relaxed">
                        {dest.tag}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-stone">
                        <span>{dest.days} días sugeridos</span>
                        <span className="text-amber-400 font-bold">+${dest.costUSD} USD</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-admin-border flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartEditDest(dest)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1 border border-amber-500/30"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDest(dest.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20"
                        title="Eliminar destino"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Destination Edit/Create Modal */}
            {editingDest && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-admin-card border border-admin-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-admin-border">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-terracotta">map</span>
                      {isCreatingDest ? 'Nuevo Destino / Hito' : `Editar Hito: ${editingDest.name}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingDest(null)}
                      className="w-8 h-8 rounded-full bg-admin-surface hover:bg-admin-hover text-stone flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone">
                        Nombre del Destino / Hito:
                      </label>
                      <input
                        type="text"
                        value={editingDest.name}
                        onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">País:</label>
                      <select
                        value={editingDest.country}
                        onChange={(e) =>
                          setEditingDest({
                            ...editingDest,
                            country: e.target.value as 'Chile' | 'Bolivia' | 'Perú',
                          })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      >
                        <option value="Chile">🇨🇱 Chile</option>
                        <option value="Bolivia">🇧🇴 Bolivia</option>
                        <option value="Perú">🇵🇪 Perú</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Bandera Emoji (ej. 🇨🇱, 🇧🇴, 🇵🇪):
                      </label>
                      <input
                        type="text"
                        value={editingDest.flag}
                        onChange={(e) => setEditingDest({ ...editingDest, flag: e.target.value })}
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Altitud en Metros (Afecta el SVG altimétrico):
                      </label>
                      <input
                        type="number"
                        value={editingDest.altitudeMeters}
                        onChange={(e) => {
                          const m = Number(e.target.value) || 0;
                          setEditingDest({
                            ...editingDest,
                            altitudeMeters: m,
                            altitude: `${m.toLocaleString()} msnm`,
                          });
                        }}
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-amber-300 font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Días Sugeridos:
                      </label>
                      <input
                        type="number"
                        value={editingDest.days}
                        onChange={(e) =>
                          setEditingDest({ ...editingDest, days: Number(e.target.value) || 1 })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-stone">
                        Costo Base en USD (Por persona):
                      </label>
                      <input
                        type="number"
                        value={editingDest.costUSD}
                        onChange={(e) =>
                          setEditingDest({ ...editingDest, costUSD: Number(e.target.value) || 0 })
                        }
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-amber-400 font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone">
                        Tagline / Atractivos Clave:
                      </label>
                      <input
                        type="text"
                        value={editingDest.tag}
                        onChange={(e) => setEditingDest({ ...editingDest, tag: e.target.value })}
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Image URL & Upload */}
                    <div className="flex flex-col gap-2 sm:col-span-2 pt-2 border-t border-admin-border">
                      <label className="text-xs font-semibold text-stone">
                        Foto del Hito (URL o Subir archivo):
                      </label>
                      <input
                        type="url"
                        value={editingDest.imageUrl}
                        onChange={(e) =>
                          setEditingDest({ ...editingDest, imageUrl: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileToDataUrl(file, (dataUrl) => {
                              setEditingDest({ ...editingDest, imageUrl: dataUrl });
                            });
                          }
                        }}
                        className="text-xs text-admin-text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-admin-surface file:text-white hover:file:bg-admin-hover cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-admin-border">
                    <button
                      type="button"
                      onClick={() => setEditingDest(null)}
                      className="px-5 py-2.5 rounded-xl bg-admin-surface hover:bg-admin-hover text-stone text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveDest}
                      className="px-6 py-2.5 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      Guardar Hito
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 4B: BANCO MULTIMEDIA DE LOS 3 PAÍSES (10 FOTOS + 5 VIDEOS / PAÍS)  */}
        {/* ========================================================================= */}
        {activeTab === 'media' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-admin-card p-6 rounded-lg border border-admin-border">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-terracotta">perm_media</span>
                  Banco Multimedia Free por País (10 Fotos y 5 Videos por País)
                </h2>
                <p className="text-xs text-admin-text-secondary mt-1">
                  Edita o reemplaza cualquiera de los enlaces de fotos y videos libres de derechos de Chile, Bolivia y Perú, o aplícalos con 1 clic en la Portada y Paquetes.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveCountryMedia}
                className="px-6 py-3 rounded-xl bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span className="material-symbols-outlined text-base">save</span>
                <span>Guardar Enlaces Multimedia</span>
              </button>
            </div>

            {/* Country Selector Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {(
                [
                  { key: 'chile', label: '🇨🇱 Chile (10 Fotos · 5 Videos)' },
                  { key: 'bolivia', label: '🇧🇴 Bolivia (10 Fotos · 5 Videos)' },
                  { key: 'peru', label: '🇵🇪 Perú (10 Fotos · 5 Videos)' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedMediaCountry(tab.key)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    selectedMediaCountry === tab.key
                      ? 'bg-terracotta text-white border-terracotta shadow-md'
                      : 'bg-admin-card text-stone border-admin-border hover:bg-admin-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 10 Photos Editor Grid */}
            <div className="bg-admin-card border border-admin-border rounded-lg p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
                10 Fotografías Free — {selectedMediaCountry.toUpperCase()}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {countryMedia[selectedMediaCountry].photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="bg-admin-bg border border-admin-border rounded-xl p-4 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="w-full sm:w-36 h-28 rounded-lg overflow-hidden bg-admin-card shrink-0 border border-admin-border relative">
                      <img
                        src={photo.directUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-amber-300 text-[10px] font-bold">
                        Foto #{idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        type="text"
                        value={photo.landmark}
                        onChange={(e) =>
                          handleUpdateMediaItem(selectedMediaCountry, 'photos', idx, 'landmark', e.target.value)
                        }
                        placeholder="Hito / Destino"
                        className="w-full bg-admin-card border border-admin-border px-2.5 py-1.5 rounded-lg text-xs text-white font-semibold"
                      />
                      <input
                        type="url"
                        value={photo.directUrl}
                        onChange={(e) =>
                          handleUpdateMediaItem(selectedMediaCountry, 'photos', idx, 'directUrl', e.target.value)
                        }
                        placeholder="URL directa de imagen (o link de Pexels/Unsplash)"
                        className="w-full bg-admin-card border border-admin-border px-2.5 py-1.5 rounded-lg text-[11px] text-stone font-mono"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <a
                          href={photo.pageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">open_in_new</span>
                          Ver fuente original
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedBranding = { ...brandingForm, heroImageUrl: photo.directUrl };
                            setBrandingForm(updatedBranding);
                            onUpdateBranding(updatedBranding);
                            showToast(`¡Foto #${idx + 1} aplicada como Portada Hero!`);
                          }}
                          className="px-2.5 py-1 rounded bg-olive hover:bg-olive-deep text-white text-[10px] font-bold uppercase tracking-wider"
                        >
                          Usar en Hero
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Videos Editor Grid */}
            <div className="bg-admin-card border border-admin-border rounded-lg p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">videocam</span>
                5 Videos Free (4K / HD) — {selectedMediaCountry.toUpperCase()}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {countryMedia[selectedMediaCountry].videos.map((video, idx) => (
                  <div
                    key={video.id}
                    className="bg-admin-bg border border-admin-border rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                        Video #{idx + 1}
                      </span>
                      <div>
                        <input
                          type="text"
                          value={video.landmark}
                          onChange={(e) =>
                            handleUpdateMediaItem(selectedMediaCountry, 'videos', idx, 'landmark', e.target.value)
                          }
                          className="bg-admin-card border border-admin-border px-3 py-1.5 rounded-lg text-xs text-white font-semibold w-64 sm:w-80"
                        />
                      </div>
                    </div>

                    <div className="flex-1 w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="url"
                        value={video.pageUrl}
                        onChange={(e) => {
                          handleUpdateMediaItem(selectedMediaCountry, 'videos', idx, 'pageUrl', e.target.value);
                          handleUpdateMediaItem(selectedMediaCountry, 'videos', idx, 'directUrl', e.target.value);
                        }}
                        placeholder="https://www.pexels.com/video/..."
                        className="flex-1 bg-admin-card border border-admin-border px-3 py-1.5 rounded-lg text-xs text-stone font-mono"
                      />
                      <a
                        href={video.pageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-admin-surface hover:bg-admin-hover text-amber-300 text-xs font-semibold flex items-center justify-center gap-1 shrink-0"
                      >
                        <span className="material-symbols-outlined text-sm">play_circle</span>
                        Abrir Video
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 5: RESERVAS & FINANZAS                                             */}
        {/* ========================================================================= */}
        {activeTab === 'reservations' && (
          <div className="flex flex-col gap-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-admin-card border border-admin-border p-5 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-admin-text-secondary uppercase tracking-wider font-semibold">
                  Facturación Total
                </span>
                <span className="text-2xl font-bold text-amber-400 font-mono">
                  ${totalRevenueUSD.toLocaleString()} USD
                </span>
                <span className="text-[11px] text-admin-text-secondary">
                  {reservations.length} expediciones contratadas
                </span>
              </div>

              <div className="bg-admin-card border border-admin-border p-5 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-admin-text-secondary uppercase tracking-wider font-semibold">
                  Margen Bruto Agencia
                </span>
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  ${netAgencyProfitUSD.toLocaleString()} USD
                </span>
                <span className="text-[11px] text-emerald-500/80">
                  {totalRevenueUSD > 0
                    ? `${Math.round((netAgencyProfitUSD / totalRevenueUSD) * 100)}% de margen`
                    : '0% de margen'}
                </span>
              </div>

              <div className="bg-admin-card border border-admin-border p-5 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-admin-text-secondary uppercase tracking-wider font-semibold">
                  Reservas Confirmadas
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {paidReservationsCount}
                </span>
                <span className="text-[11px] text-admin-text-secondary">Con pago Stripe simulado</span>
              </div>

              <div className="bg-admin-card border border-admin-border p-5 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-admin-text-secondary uppercase tracking-wider font-semibold">
                  Destino Más Vendido
                </span>
                <span className="text-xl font-bold text-amber-300 truncate">
                  Salar de Uyuni
                </span>
                <span className="text-[11px] text-admin-text-secondary">Líder en ventas cruzadas</span>
              </div>
            </div>

            {/* Reservations Table */}
            <div className="bg-admin-card border border-admin-border rounded-lg overflow-hidden shadow-xl">
              <div className="p-5 border-b border-admin-border flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Registro de Reservas y Vouchers Generados
                  </h3>
                  <p className="text-xs text-admin-text-secondary mt-0.5">
                    Historial de clientes, estado de pago y acceso a comprobantes oficiales con código QR.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-admin-bg/80 text-admin-text-secondary uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Código / Cliente</th>
                      <th className="px-5 py-3 font-semibold">Paquete Contratado</th>
                      <th className="px-5 py-3 font-semibold">Pasajeros</th>
                      <th className="px-5 py-3 font-semibold">Monto USD</th>
                      <th className="px-5 py-3 font-semibold">Margen</th>
                      <th className="px-5 py-3 font-semibold">Estado Pago</th>
                      <th className="px-5 py-3 font-semibold text-right">Voucher</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-admin-border text-surface-container-low">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-admin-bg/60 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-white font-mono">{res.id}</div>
                          <div className="text-[11px] text-admin-text-secondary">
                            {res.travelerName}
                          </div>
                          <div className="text-[10px] text-admin-text-secondary">
                            {res.travelerEmail}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="font-medium text-white max-w-xs truncate">
                            {res.packageName}
                          </div>
                          <div className="text-[10px] text-amber-400">
                            {res.travelMode === 'complete'
                              ? 'Todo Incluido'
                              : 'Solo Tours (Sin Hotel)'}
                          </div>
                        </td>

                        <td className="px-5 py-4 font-mono">{res.travelersCount} pax</td>

                        <td className="px-5 py-4 font-mono font-bold text-amber-400">
                          ${res.totalGroupUSD.toLocaleString()} USD
                        </td>

                        <td className="px-5 py-4 font-mono text-emerald-400 font-semibold">
                          +${res.estimatedProfitUSD.toLocaleString()}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              res.paymentStatus === 'paid_full'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : res.paymentStatus === 'paid_deposit'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-admin-surface text-admin-text-secondary'
                            }`}
                          >
                            {res.paymentStatus === 'paid_full'
                              ? '100% Pagado'
                              : res.paymentStatus === 'paid_deposit'
                              ? 'Depósito 30%'
                              : 'Pendiente'}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => onViewVoucher(res)}
                            className="px-3 py-1.5 rounded-lg bg-olive hover:bg-olive-deep text-white text-xs font-bold flex items-center gap-1.5 ml-auto shadow-sm"
                          >
                            <span className="material-symbols-outlined text-sm">qr_code_2</span>
                            <span>Ver Voucher</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 6: GENERADOR IA DE PAQUETES                                        */}
        {/* ========================================================================= */}
        {activeTab === 'ai_gen' && (
          <div className="bg-admin-card border border-admin-border rounded-lg p-6 lg:p-8 shadow-xl flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-2xl">
                  auto_awesome
                </span>
                <h2 className="text-xl font-bold text-white">
                  Generador de Paquetes con Inteligencia Artificial
                </h2>
              </div>
              <p className="text-xs text-admin-text-secondary mt-1 max-w-2xl">
                Ingresa cualquier destino andino (incluso no tradicionales como Samaipata, Sajama,
                Arequipa o Cañón del Colca) y la IA estructurará el itinerario, calculará
                logística y lo publicará en el catálogo.
              </p>
            </div>

            <form onSubmit={handleGeneratePackage} className="flex flex-col gap-4 max-w-xl">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone">
                  Destino o Región a Desarrollar:
                </label>
                <input
                  type="text"
                  value={destInput}
                  onChange={(e) => setDestInput(e.target.value)}
                  placeholder="ej. Samaipata, Sajama & Valles Cruceños"
                  className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone">
                  Duración Deseada (Días):
                </label>
                <input
                  type="number"
                  min={2}
                  max={25}
                  value={daysInput}
                  onChange={(e) => setDaysInput(Number(e.target.value) || 5)}
                  className="w-full bg-admin-bg border border-admin-border px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-terracotta"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="py-3 px-6 rounded-xl bg-linear-to-r from-orange-700 to-amber-600 hover:from-orange-800 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>{isGenerating ? 'Generando Expedición...' : 'Generar y Publicar en Web'}</span>
              </button>

              {generationMsg && (
                <div className="text-xs text-amber-300 flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  <span>{generationMsg}</span>
                </div>
              )}
            </form>

            {lastGeneratedPkg && (
              <div className="mt-4 p-5 rounded-xl bg-admin-bg border border-emerald-500/40 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  ¡Último Paquete Creado Exitosamente!
                </div>
                <h4 className="text-sm font-bold text-white">{lastGeneratedPkg.title.ES}</h4>
                <p className="text-xs text-stone">{lastGeneratedPkg.tagline.ES}</p>
                <div className="text-xs text-amber-400 font-bold">
                  Precio Base: ${lastGeneratedPkg.basePriceUSD} USD · {lastGeneratedPkg.days} Días
                </div>
                <button
                  type="button"
                  onClick={() => onViewPackage(lastGeneratedPkg)}
                  className="mt-2 text-xs font-semibold text-terracotta hover:underline flex items-center gap-1"
                >
                  <span>Ver Detalle del Paquete</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
