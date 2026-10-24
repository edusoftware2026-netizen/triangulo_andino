import React, { useState } from 'react';
import { Currency, Language, HotelTier, TravelMode, Package, BookingReservation } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES } from '../data/mockData';
import { CodeViewer } from '../components/CodeViewer';

interface RouteBuilderViewProps {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  onOpenCheckout: (pkg: Package, travelers: number, tier: HotelTier, mode: TravelMode) => void;
  onOpenConcierge: () => void;
  initialSelectedDest?: string;
}

interface DestinationHito {
  id: string;
  name: string;
  country: string;
  altitudeMeters: number;
  altitudeTag: string;
  daysSuggested: number;
  costUSD: number;
  imageUrl: string;
  description: string;
}

export const RouteBuilderView: React.FC<RouteBuilderViewProps> = ({
  language,
  currency,
  setLanguage,
  setCurrency,
  onOpenCheckout,
  onOpenConcierge,
  initialSelectedDest,
}) => {
  const t = TRANSLATIONS[language];
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  const destinationHitos: DestinationHito[] = [
    {
      id: 'atacama',
      name: 'San Pedro de Atacama',
      country: 'Chile',
      altitudeMeters: 2400,
      altitudeTag: '2.400 msnm · Punto de inflexión',
      daysSuggested: 3,
      costUSD: 750,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmGkIgyAR3vhUSEP67fgohJamfVA9s1y082jHQstijnsPz05PpdfEyX6UBhdA3qtrs8oBiwzyclk4pMx5c1CjMv6EV33CdpHzMk6xMm-9yoTy4OnprugeGwJoiYM_eGGSFYwPH_h0xyHq1m8_-Mk9_VBcMhcFjERonOX1QCqpbsB8hghJdHf_O3krKtqIjqpvxVrftZ-Sfd5o5AfehsWxC7FXS9S0SHmbymKNK3LuWG4t1pzFDUpW8',
      description: 'Géiseres del Tatio, Valle de la Luna, Salares de Atacama y astrofotografía en los cielos más limpios del planeta.',
    },
    {
      id: 'uyuni',
      name: 'Salar de Uyuni & Lagunas',
      country: 'Bolivia',
      altitudeMeters: 3650,
      altitudeTag: '3.650 msnm · Altiplano central',
      daysSuggested: 3,
      costUSD: 980,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChlFkOy5Hy_AQyFucQlyl0pxbg94ppW4oyn1Lgp85gla7TSgLcgiOXFf2oicjpEO-IVoP97WJckXqyf3rptg43125X2jD5OjN8eNHFcxDb-oeMjUQeEtoh24CER_gX7HXXvzlKhemAVVnDYdUBQ6iW_OuDx7WNMJpwe-xqxAqFClSft1w4lG_0h-Ro54oQAL4bnzziO5yaRQ3SegWI_TwmCDhIyWqPZWF1ext1yhBCWyE4ol7rXW-d',
      description: 'Cruce de frontera Hito Cajón, Laguna Colorada con flamencos andinos, desierto de Siloli y descanso en Hotel de Sal esculpido.',
    },
    {
      id: 'titicaca',
      name: 'La Paz & Lago Titicaca',
      country: 'Bolivia',
      altitudeMeters: 3812,
      altitudeTag: '3.812 msnm · Cuenca sagrada',
      daysSuggested: 2,
      costUSD: 550,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jTpjafSBqD6JpkOWj4IOFlzgyGs6lAk75J-4zii5_yFUfCAjvPJWnmFW1d2Jj6G83ju8czFQ5-3WhrRtDycjvgFC__5sEGZGe9iJD-Ss64Jd6VEomePgs53Vx3BJ9CawIEvZbMIKJbUg9dDJQlfJDzSYb_dmkceZoM2ecM2CeFHfLrTke6R_YdVBmWCk9avG6TIQmB83WMxuvGDvkZQDp00WoxeUcKfRDILIt1oO0GQilzb8_AIg',
      description: 'Red de teleféricos urbanos más alta del mundo, santuario de Copacabana, Isla del Sol y travesía en catamarán privado.',
    },
    {
      id: 'machupicchu',
      name: 'Valle Sagrado & Machu Picchu',
      country: 'Perú',
      altitudeMeters: 2430,
      altitudeTag: '2.430 msnm · Selva alta',
      daysSuggested: 2,
      costUSD: 920,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADNWLNxlBIjcL-d49H51m3_Dr-TCNa0zcszKv4LnvdtfaLFqf5EBzFqhBIkSf4CX_rIiu-RIRpifmcnq7T747FhYuwHP2KmYxvAikjB1W2rsf6UT6SK9Iwhw9sbyhP69HsMQpkp8bMxQDIdZ5VfM9p9uRLk1DMrPzaASLjuXKV3HLPEd1wADxg231qJE08qKI-JYB4uNpAOYSfU8isQYVGFEIJGigkiurnOEk43Y7qDQWSrvarxsXH',
      description: 'Tren Vistadome Observatory o Hiram Bingham, fortaleza de Ollantaytambo, terrazas circulares de Moray y salineras de Maras.',
    },
    {
      id: 'cusco',
      name: 'Cusco Imperial & Vinicunca',
      country: 'Perú',
      altitudeMeters: 3399,
      altitudeTag: '3.399 msnm · Capital arqueológica',
      daysSuggested: 2,
      costUSD: 580,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmOj_fo8-IvBQb-0RIfHsD24veroFK53DglDW1sApKNgSKclH7NdQlsHbsBCwxx834mE67_FJgPqOEhiI-ZJZDGsSNOmNV0jlXo5whcJAEprjAy94Ai5nYLIX7j5VAYPmbo1Y8m6fAOus3vneYoEFOQOzWRbV56MoDveiU04JdxULwIr4h1pZAHhkIsxvRKMoHy6UWpwKMQ3TSlj6pWqLZ7XOq1M8CcwoZacdVJ7bw2VSne3CNalsf',
      description: 'Templo del Sol Qorikancha, Sacsayhuamán, alta gastronomía novoandina y expedición opcional a Montaña de 7 Colores.',
    },
  ];

  // State
  const [selectedDests, setSelectedDests] = useState<string[]>(['atacama', 'uyuni', 'titicaca', 'machupicchu', 'cusco']);
  const [days, setDays] = useState<number>(12);
  const [travelers, setTravelers] = useState<number>(2);
  const [tripMode, setTripMode] = useState<TravelMode>('complete');
  const [tier, setTier] = useState<HotelTier>('5star');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [openDayAccordions, setOpenDayAccordions] = useState<Record<string, boolean>>({
    'day-1': true,
    'day-2': false,
    'day-3': false,
    'day-4': false,
    'day-5': false,
    'day-7': false,
    'day-9': false,
    'day-11': false,
  });

  const toggleAccordion = (dayId: string) => {
    setOpenDayAccordions((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  const handleToggleDest = (id: string) => {
    if (selectedDests.includes(id)) {
      if (selectedDests.length > 1) {
        setSelectedDests(selectedDests.filter((d) => d !== id));
      }
    } else {
      setSelectedDests([...selectedDests, id]);
    }
  };

  // Dynamic price calculation
  const baseDestCostUSD = destinationHitos
    .filter((d) => selectedDests.includes(d.id))
    .reduce((acc, curr) => acc + curr.costUSD, 0);

  // Multi-destination discount: 4% per extra destination above 2
  const multiDestDiscount = selectedDests.length > 2 ? 1 - (selectedDests.length - 2) * 0.04 : 1.0;
  const daysMultiplier = days / 10;
  
  let tierMultiplier = 1.0;
  if (tier === '3star') tierMultiplier = 0.85;
  if (tier === '4star') tierMultiplier = 1.08;
  if (tier === '5star') tierMultiplier = 1.35;
  if (tier === 'none') tierMultiplier = 0.55;

  const modeMultiplier = tripMode === 'complete' ? 1.0 : 0.65;
  const groupDiscountFactor = travelers >= 4 ? 0.90 : travelers >= 6 ? 0.82 : 1.0;

  const pricePerPaxUSD = Math.round(
    ((baseDestCostUSD * daysMultiplier * tierMultiplier * modeMultiplier * multiDestDiscount * groupDiscountFactor) / 10) * 10
  );
  const totalGroupUSD = pricePerPaxUSD * travelers;

  const pricePaxConverted = Math.round(pricePerPaxUSD * rateInfo.rate);
  const totalGroupConverted = Math.round(totalGroupUSD * rateInfo.rate);

  const logisticsConverted = Math.round(pricePaxConverted * 0.40);
  const hotelsConverted = Math.round(pricePaxConverted * 0.45);
  const ticketsConverted = Math.round(pricePaxConverted * 0.15);

  // Countries count
  const countriesConnected = new Set(
    destinationHitos
      .filter((d) => selectedDests.includes(d.id))
      .map((d) => d.country)
  ).size;

  // Trigger Gemini AI generation simulation with Google Grounding steps
  const handleGenerateSmartRoute = () => {
    setIsGenerating(true);
    setGenerationProgress(20);
    setGenerationStatus('Conectando con Google Search Grounding: consultando tasas vigentes Hito Cajón...');

    setTimeout(() => {
      setGenerationProgress(55);
      setGenerationStatus('Evaluando perfiles de aclimatación médica y frecuencias de trenes Hiram Bingham...');
    }, 600);

    setTimeout(() => {
      setGenerationProgress(85);
      setGenerationStatus('Alineando cronograma día por día y optimizando cotización multi-moneda...');
    }, 1200);

    setTimeout(() => {
      setGenerationProgress(100);
      setIsGenerating(false);
    }, 1800);
  };

  // Convert current builder state into a Package object for checkout
  const currentCustomPackage: Package = {
    id: `custom-route-${Date.now()}`,
    title: {
      ES: 'La Gran Travesía Altiplánica: Atacama, Uyuni & El Imperio Inca',
      EN: 'The Grand Altiplanic Journey: Atacama, Uyuni & Inca Empire',
      PT: 'A Grande Travessia Altiplânica: Atacama, Uyuni & O Império Inca',
      FR: 'La Grande Traversée de l\'Altiplano : Atacama, Uyuni & l\'Empire Inca',
    },
    tagline: {
      ES: `Circuito personalizado de ${days} días combinando ${selectedDests.length} destinos emblemáticos.`,
      EN: `Customized ${days}-day circuit combining ${selectedDests.length} signature destinations.`,
      PT: `Circuito personalizado de ${days} dias combinando ${selectedDests.length} destinos emblemáticos.`,
      FR: `Circuit sur mesure de ${days} jours combinant ${selectedDests.length} étapes phares.`,
    },
    country: 'Chile · Bolivia · Perú',
    countriesList: ['Chile', 'Bolivia', 'Perú'],
    days: days,
    nights: Math.max(1, days - 1),
    maxAltitudeMeters: 4900,
    difficulty: 'Media',
    basePriceUSD: Math.round(pricePerPaxUSD * 0.50),
    hotelCostUSD: {
      none: 0,
      '3star': Math.round(pricePerPaxUSD * 0.25),
      '4star': Math.round(pricePerPaxUSD * 0.35),
      '5star': Math.round(pricePerPaxUSD * 0.45),
    },
    logisticsCostUSD: Math.round(pricePerPaxUSD * 0.40),
    ticketsCostUSD: Math.round(pricePerPaxUSD * 0.10),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdGs063hxFmbfoBRnwLhff8J5HBK5tcFy9iOquIoGKPAeVPdHwzjUv4gno8jqa_CKSaUNwvjg3NeSaoOWWXkYZs6ms2f-R4YK82qr2rpbNp3Sfk-iL4eA9gfCWyUwHPPkmVT1qZoIg_PNf9uMOqeBAS4o55DbtSjqKgcsrd8k9JgP3CoF9xRGs2UohruBYi6p7h7Vk7i-n711-78XFQNaRrEk7fIsie9SVNUGeQD70UEgcc8E8zh3L',
    highlights: [
      'Expedición 4x4 privada con oxígeno y teléfono satelital',
      'Alojamiento en hoteles de sal y casonas de patrimonio andino',
      'Permisos garantizados a Machu Picchu y parques protegidos'
    ],
    recommendedHotels: [],
    itinerary: [],
    isCustomAI: true,
  };

  return (
    <div className="w-full bg-canvas min-h-screen pt-20 pb-20 text-chocolate">
      {/* TOP HEADER CONCIERGE BRANDING */}
      <section className="relative w-full bg-stone/25 pb-12 pt-8 border-b border-chocolate/10">
        <div className="max-w-360 mx-auto px-6 lg:px-12 flex flex-col gap-4">
          {/* Top Status & Dual-mode Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white elevation-card border border-chocolate/10">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-ping"></span>
              <span className="text-[11px] uppercase tracking-wider text-terracotta-text font-bold">
                Modo operativo (localStorage + Gemini 3.8 + Search Grounding)
              </span>
            </div>

            {/* Language & Currency Quick Switcher */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded border border-chocolate/12">
              <span className="material-symbols-outlined text-olive text-sm pl-1">language</span>
              {(['ES', 'EN', 'PT', 'FR'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 rounded text-xs font-bold uppercase transition-all ${
                    language === lang
                      ? 'bg-chocolate text-white'
                      : 'text-earth hover:text-chocolate'
                  }`}
                >
                  {lang}
                </button>
              ))}
              <span className="w-[1px] h-4 bg-chocolate/15 mx-1"></span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                aria-label="Moneda"
                className="bg-transparent text-xs uppercase font-bold text-chocolate focus:outline-none cursor-pointer pr-1"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CLP">CLP ($)</option>
                <option value="PEN">PEN (S/)</option>
              </select>
            </div>
          </div>

          {/* Main Title Block */}
          <div className="max-w-4xl pt-2">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-olive text-xl">
                auto_awesome
              </span>
              <span className="text-xs uppercase tracking-widest text-terracotta-text font-bold">
                {t.builderKicker}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-chocolate tracking-tight">
              {t.builderTitle} <span className="text-terracotta-text italic">(Multi-destino)</span>
            </h1>
            <p className="text-sm sm:text-base text-earth mt-2 leading-relaxed">
              {t.builderSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN INTERACTIVE WORKFLOW */}
      <section className="max-w-360 mx-auto w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONFIGURATION COLUMN */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* PASO 1: SELECCIÓN DE DESTINOS */}
            <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12">
              <div className="flex items-center justify-between pb-6 border-b border-chocolate/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-chocolate text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-chocolate font-semibold">
                      {t.step1Title}
                    </h2>
                  </div>
                  <p className="text-xs text-earth mt-1">
                    {t.step1Desc}
                  </p>
                </div>
                <span className="text-xs text-terracotta-text bg-stone/30 px-3 py-1 rounded uppercase tracking-wider font-bold border border-chocolate/8">
                  {selectedDests.length} Destinos activos
                </span>
              </div>

              {/* Cards de Destinos con Checkbox */}
              <div className="flex flex-col gap-4 mt-6">
                {destinationHitos.map((dest) => {
                  const isChecked = selectedDests.includes(dest.id);
                  const convertedDestCost = Math.round(dest.costUSD * rateInfo.rate);
                  return (
                    <div
                      key={dest.id}
                      onClick={() => handleToggleDest(dest.id)}
                      className={`relative flex flex-col md:flex-row gap-4 p-4 rounded-lg border transition-all cursor-pointer group ${
                        isChecked
                          ? 'bg-canvas border-olive/50 ring-1 ring-olive/30'
                          : 'bg-white border-chocolate/12 hover:border-chocolate/25 opacity-70'
                      }`}
                    >
                      <div className="relative w-full md:w-44 h-36 md:h-auto shrink-0 rounded overflow-hidden bg-stone/20">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-chocolate/85 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider">
                          {dest.country}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-lg text-chocolate font-semibold">
                                {dest.name}
                              </h3>
                              <span className="text-xs uppercase tracking-wider text-terracotta-text font-bold">
                                {dest.altitudeTag}
                              </span>
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleToggleDest(dest.id);
                              }}
                              className="w-4 h-4 accent-olive cursor-pointer mt-1"
                            />
                          </div>
                          <p className="text-xs text-earth mt-2 line-clamp-2 leading-relaxed">
                            {dest.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-2 border-t border-chocolate/8">
                          <div className="flex items-center gap-1 text-earth text-xs font-medium">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span>{dest.daysSuggested} Días sugeridos</span>
                          </div>
                          <span className="text-xs font-bold text-chocolate">
                            +{rateInfo.symbol}{convertedDestCost.toLocaleString()} {currency} / pax
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PASO 2: PARÁMETROS DEL VIAJERO Y NIVELES */}
            <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-6">
              <div className="flex items-center gap-2 pb-4 border-b border-chocolate/10">
                <span className="w-6 h-6 rounded bg-chocolate text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-chocolate font-semibold">
                  {t.step2Title}
                </h2>
              </div>

              {/* Sliders and Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Duración Slider */}
                <div className="flex flex-col gap-2 p-4 bg-stone/25 rounded border border-chocolate/8">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-chocolate">
                      {t.paramDays}
                    </label>
                    <span className="font-serif text-xl text-terracotta-text font-bold">
                      {days} Días
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="21"
                    step="1"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value, 10))}
                    className="w-full accent-olive cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-earth text-[11px]">
                    <span>Min: 7 días</span>
                    <span className="font-semibold text-terracotta-text">Óptimo: 12-15</span>
                    <span>Max: 21 días</span>
                  </div>
                </div>

                {/* Viajeros Selector */}
                <div className="flex flex-col gap-2 p-4 bg-stone/25 rounded border border-chocolate/8">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-chocolate">
                      {t.paramTravelers}
                    </label>
                    <span className="font-serif text-xl text-terracotta-text font-bold">
                      {travelers} {travelers > 1 ? 'Personas' : 'Persona'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 rounded bg-white hover:bg-stone/50 text-lg font-bold text-chocolate transition-colors border border-chocolate/12 flex items-center justify-center"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center font-serif text-xl font-bold bg-white py-1.5 rounded border border-chocolate/12">
                      {travelers}
                    </div>
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.min(8, travelers + 1))}
                      className="w-10 h-10 rounded bg-white hover:bg-stone/50 text-lg font-bold text-chocolate transition-colors border border-chocolate/12 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[10px] text-earth">
                    Tarifas optimizadas para traslados privados 4x4 satelitales.
                  </p>
                </div>
              </div>

              {/* Modalidad de Viaje Toggle */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-chocolate block mb-2">
                  {t.paramMode}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTripMode('complete')}
                    className={`p-4 text-left rounded transition-all flex flex-col gap-1 border ${
                      tripMode === 'complete'
                        ? 'bg-chocolate text-white border-chocolate'
                        : 'bg-stone/25 text-chocolate border-chocolate/8 hover:bg-stone/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Paquete completo (con hotel)
                      </span>
                      <span className="material-symbols-outlined text-sm text-terracotta">
                        {tripMode === 'complete' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <p className="text-xs opacity-85 leading-relaxed">
                      Hoteles de alta gama + 4x4 privado + cruces de frontera asistidos + guía bilingüe satelital.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripMode('expedition')}
                    className={`p-4 text-left rounded transition-all flex flex-col gap-1 border ${
                      tripMode === 'expedition'
                        ? 'bg-chocolate text-white border-chocolate'
                        : 'bg-stone/25 text-chocolate border-chocolate/8 hover:bg-stone/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Solo expedición y logística (sin hotel)
                      </span>
                      <span className="material-symbols-outlined text-sm text-terracotta">
                        {tripMode === 'expedition' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <p className="text-xs opacity-85 leading-relaxed">
                      Conductor 4x4 especializado + guías nativos + entradas a reservas. Hoteles gestionados libremente.
                    </p>
                  </button>
                </div>
              </div>

              {/* Categoría Hotelera Selector */}
              {tripMode === 'complete' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-chocolate block mb-2">
                    {t.paramTier}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setTier('3star')}
                      className={`p-3.5 rounded text-left transition-all border ${
                        tier === '3star'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-stone/25 text-chocolate border-chocolate/8 hover:bg-stone/40'
                      }`}
                    >
                      <div className="text-xs font-bold">3★ Confort étnico</div>
                      <p className="text-[11px] opacity-85 mt-1">Hostales boutique con calefacción y baño privado.</p>
                      <div className="text-[10px] font-bold mt-2 text-stone/80">Estándar regional</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTier('4star')}
                      className={`p-3.5 rounded text-left transition-all border ${
                        tier === '4star'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-stone/25 text-chocolate border-chocolate/8 hover:bg-stone/40'
                      }`}
                    >
                      <div className="text-xs font-bold">4★ Boutique & Sal</div>
                      <p className="text-[11px] opacity-85 mt-1">Hoteles de sal destacados y casonas coloniales.</p>
                      <div className="text-[10px] font-bold mt-2 text-stone/80">+15% Factor confort</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTier('5star')}
                      className={`p-3.5 rounded text-left transition-all border ${
                        tier === '5star'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-stone/25 text-chocolate border-chocolate/8 hover:bg-stone/40'
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span>5★ High Luxury</span>
                        <span className="material-symbols-outlined text-sm">hotel_class</span>
                      </div>
                      <p className="text-[11px] opacity-85 mt-1">Explora Atacama, Palacio de Sal VIP, Monasterio Cusco.</p>
                      <div className="text-[10px] font-bold mt-2 text-stone/80">Experiencia definitiva</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Botón Principal de Generación IA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerateSmartRoute}
                  disabled={isGenerating}
                  className="w-full py-4 px-6 rounded bg-olive hover:bg-olive-deep text-white transition-all duration-300 elevation-card flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-gold text-xl">
                    auto_awesome
                  </span>
                  <span className="text-xs font-bold tracking-wider uppercase">
                    {t.btnGenerateRoute}
                  </span>
                </button>
                <p className="text-xs text-center text-earth mt-2">
                  Validación continua de altitudes para mitigar el soroche y sincronización logística de pasos fronterizos.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT RESULTS & SUMMARY COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            {/* AI Progress Loader Card */}
            {isGenerating && (
              <div className="bg-white p-6 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-3 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-stone/40 flex items-center justify-center text-olive">
                    <span className="material-symbols-outlined animate-spin text-lg">
                      progress_activity
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-chocolate">
                      Gemini 3.8 Flash Engine
                    </h4>
                    <p className="text-[10px] uppercase tracking-wider text-terracotta-text font-bold">
                      Consultando Google Search Grounding...
                    </p>
                  </div>
                </div>
                <div className="w-full bg-stone/30 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-olive h-2 rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-earth italic">
                  {generationStatus}
                </div>
              </div>
            )}

            {/* Executive Summary Card */}
            <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-5">
              <div className="flex items-center justify-between pb-2 border-b border-chocolate/10">
                <span className="px-2.5 py-1 rounded bg-stone/30 text-[10px] uppercase tracking-widest text-terracotta-text font-bold">
                  Itinerario optimizado IA
                </span>
                <div className="flex items-center gap-1.5 text-xs text-chocolate font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-700"></span>
                  <span>Aclimatación: 98% Score</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-chocolate leading-tight">
                  La Gran Travesía Altiplánica: Atacama, Uyuni & El Imperio Inca
                </h3>
              </div>

              {/* Days & Countries connected */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone/25 rounded border border-chocolate/8">
                  <span className="text-[10px] uppercase tracking-wider text-earth font-semibold block">
                    Duración total
                  </span>
                  <span className="font-serif text-lg font-bold text-chocolate">
                    {days} Días / {days - 1} Noches
                  </span>
                </div>
                <div className="p-3 bg-stone/25 rounded border border-chocolate/8">
                  <span className="text-[10px] uppercase tracking-wider text-earth font-semibold block">
                    Países conectados
                  </span>
                  <span className="font-serif text-lg font-bold text-chocolate">
                    {countriesConnected} Naciones
                  </span>
                </div>
              </div>

              {/* Cotización Dinámica */}
              <div className="p-5 bg-stone/25 rounded border border-chocolate/10 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-earth font-bold block">
                      {t.routeTotalQuote}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-serif text-3xl font-bold text-chocolate">
                        {rateInfo.symbol}{pricePaxConverted.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-earth">{currency}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-earth block font-semibold">
                      {t.totalGroup} ({travelers} pax):
                    </span>
                    <span className="font-serif text-xl font-bold text-terracotta-text">
                      {rateInfo.symbol}{totalGroupConverted.toLocaleString()} {currency}
                    </span>
                  </div>
                </div>

                {/* Desglose Transparente */}
                <div className="flex flex-col gap-1.5 pt-3 border-t border-chocolate/10 text-xs text-earth">
                  <div className="flex justify-between">
                    <span>· {t.subtotalLogistics}</span>
                    <span className="font-bold text-chocolate">
                      {rateInfo.symbol}{logisticsConverted.toLocaleString()} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>· {t.subtotalHotels}</span>
                    <span className="font-bold text-chocolate">
                      {rateInfo.symbol}{hotelsConverted.toLocaleString()} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>· {t.subtotalTickets}</span>
                    <span className="font-bold text-chocolate">
                      {rateInfo.symbol}{ticketsConverted.toLocaleString()} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>· Seguro satelital y asistencia altiplano 24/7</span>
                    <span className="font-bold text-olive">{t.satelliteIncluded}</span>
                  </div>
                </div>
              </div>

              {/* Visual Altitude Graph */}
              <div className="p-3 rounded bg-stone/25 border border-chocolate/8">
                <div className="flex items-center justify-between pb-1 text-[10px] font-bold uppercase tracking-wider text-earth">
                  <span>Perfil de ascenso gradual (mitigación soroche)</span>
                  <span className="text-terracotta-text">2.400m ➔ 3.812m ➔ 2.430m</span>
                </div>
                <svg className="w-full h-12 text-terracotta" fill="none" viewBox="0 0 300 45">
                  <path d="M5 40 L60 25 L120 8 L180 5 L240 24 L295 14" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                  <circle cx="5" cy="40" r="4" fill="#3E322C" />
                  <circle cx="60" cy="25" r="4" fill="#5B6E52" />
                  <circle cx="120" cy="8" r="4" fill="#C2694E" />
                  <circle cx="180" cy="5" r="4" fill="#D4A373" />
                  <circle cx="240" cy="24" r="4" fill="#5B6E52" />
                  <circle cx="295" cy="14" r="4" fill="#C2694E" />
                  <text x="5" y="44" textAnchor="start" className="text-[7px] fill-current">Calama</text>
                  <text x="60" y="21" textAnchor="middle" className="text-[7px] fill-current">Atacama</text>
                  <text x="120" y="6" textAnchor="middle" className="text-[7px] fill-current">Uyuni</text>
                  <text x="180" y="4" textAnchor="middle" className="text-[7px] fill-current">Titicaca</text>
                  <text x="240" y="21" textAnchor="middle" className="text-[7px] fill-current">M.Picchu</text>
                  <text x="295" y="11" textAnchor="end" className="text-[7px] fill-current">Cusco</text>
                </svg>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenCheckout(currentCustomPackage, travelers, tier, tripMode)}
                  className="w-full py-3.5 px-4 rounded bg-olive hover:bg-olive-deep text-white text-xs uppercase tracking-wider font-bold transition-colors elevation-card flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">credit_card</span>
                  <span>{t.btnBookGuarantee}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onOpenConcierge}
                    className="py-2.5 px-3 rounded bg-stone/25 hover:bg-stone/50 text-chocolate text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 border border-chocolate/12"
                  >
                    <span className="material-symbols-outlined text-olive text-base">chat</span>
                    <span>{t.btnWhatsapp}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert('Generando propuesta ejecutiva en PDF de alta resolución de Triángulo Andino...');
                    }}
                    className="py-2.5 px-3 rounded bg-stone/25 hover:bg-stone/50 text-chocolate text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 border border-chocolate/12"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>Descargar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCORDION ITINERARIO DÍA POR DÍA */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-chocolate/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-olive text-2xl">
                  route
                </span>
                <h2 className="font-serif text-2xl font-semibold text-chocolate">
                  {t.itineraryDaysTitle}
                </h2>
              </div>
              <p className="text-xs text-earth mt-1">
                {t.itineraryDaysSubtitle}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone/25 text-earth text-xs border border-chocolate/10">
              <span className="material-symbols-outlined text-olive text-sm">verified</span>
              <span>Google Search Grounding: horarios PerúRail, paso Hito Cajón y clima Uyuni validados.</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            {/* Day 1 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-1')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 01</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Llegada a Calama & Traslado al Oasis de Atacama
                    </h4>
                    <span className="text-xs text-earth">
                      Chile · 2.400 msnm · Aclimatación inicial
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-1'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-1'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Recepción privada en Aeropuerto El Loa (CJC) por concierge bilingüe. Traslado en SUV privada hacia San Pedro de Atacama cruzando la Cordillera de la Sal. Check-in en hotel boutique seleccionado.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Comidas:</strong> Cóctel de bienvenida andino</span>
                    <span><strong>Traslado:</strong> 1h 15m (102 km pavimentados)</span>
                    <span><strong>Aclimatación:</strong> Infusión de Rica-Rica y descanso preventivo</span>
                  </div>
                </div>
              )}
            </div>

            {/* Day 2 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-2')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 02</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Valle de la Luna, Cordillera de la Sal & Cielos Estelares
                    </h4>
                    <span className="text-xs text-earth">
                      Chile · 2.550 msnm · Geología & Astrofotografía
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-2'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-2'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Exploración matutina de las formaciones de cañones de arcilla y sal. Por la tarde, atardecer dorado en la Duna Mayor con vista a los volcanes Licancabur y Juriques. Sesión privada nocturna con astrónomo y telescopio de alta apertura.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Comidas:</strong> Desayuno gourmet + Picnic al atardecer</span>
                    <span><strong>Guía:</strong> Geólogo local certificado</span>
                  </div>
                </div>
              )}
            </div>

            {/* Day 3 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-3')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 03</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Géiseres del Tatio al Amanecer & Termas de Puritama
                    </h4>
                    <span className="text-xs text-earth">
                      Chile · 4.320 msnm (Pico transitorio) · Hidrotermalismo
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-3'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-3'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Ascenso temprano al campo geotérmico más alto del hemisferio sur para observar columnas de vapor al alba. Descenso reconfortante para baño privado en los pozos cálidos de Puritama.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Comidas:</strong> Desayuno térmico en el Tatio + Almuerzo en Guatín</span>
                    <span><strong>Oxígeno:</strong> Vehículo equipado con kit de O2 medicinal preventivo</span>
                  </div>
                </div>
              )}
            </div>

            {/* Day 4 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-4')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 04</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Cruce Hito Cajón (Chile-Bolivia) & Reserva Eduardo Avaroa
                    </h4>
                    <span className="text-xs text-earth">
                      Chile ➔ Bolivia · Cruce fronterizo 4x4 · Laguna Verde & Colorada
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-4'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-4'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Trámites expeditos de control migratorio asistidos en Hito Cajón. Transbordo a expedición Toyota Land Cruiser 4x4 boliviana. Visita a Laguna Blanca, Laguna Verde al pie del Licancabur y la asombrosa Laguna Colorada con colonias de 3 especies de parinas.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Hospedaje:</strong> Ecolodge del Desierto Ojo de Perdiz</span>
                    <span><strong>Comidas:</strong> Pensión completa andina</span>
                  </div>
                </div>
              )}
            </div>

            {/* Day 5 & 6 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-5')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 05-06</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Inmensidad del Salar de Uyuni & Hotel de Sal Monumental
                    </h4>
                    <span className="text-xs text-earth">
                      Bolivia · 3.653 msnm · Isla Incahuasi & Sunset reflejos
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-5'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-5'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Entrada al desierto de sal continuo más extenso del planeta (10.582 km²). Ascenso entre cactus milenarios en Isla Incahuasi. Almuerzo catering privado montado en medio de la nada blanca. Noche en Palacio de Sal con cena degustación de carne de llama y quinua real.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Hospedaje:</strong> Palacio de Sal / Luna Salada (Suite VIP)</span>
                    <span><strong>Comidas:</strong> Menú de autor altiplánico maridado con vinos de altura de Tarija</span>
                  </div>
                </div>
              )}
            </div>

            {/* Day 7 & 8 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-7')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 07-08</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Vuelo La Paz, Teleféricos & Navegación Lago Titicaca
                    </h4>
                    <span className="text-xs text-earth">
                      Bolivia · 3.812 msnm · Copacabana & Isla del Sol
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-7'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-7'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Vuelo doméstico Uyuni-La Paz. Circuito panorámico en teleférico sobre el cañón paceño y Valle de la Luna. Traslado privado al Lago Titicaca para embarque en catamarán privado hacia la Isla del Sol, cuna mítica de Manco Cápac y Mama Ocllo.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Hospedaje:</strong> Posada del Inca Ecolodge / Hotel Rosario Copacabana</span>
                    <span><strong>Experiencia:</strong> Ceremonia Kallawaya tradicional de bendición andina</span>
                  </div>
                </div>
              )}
            </div>

            {/* Day 9 & 10 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-9')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 09-10</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Cruce Kasani a Perú, Cusco & Descenso al Valle Sagrado
                    </h4>
                    <span className="text-xs text-earth">
                      Bolivia ➔ Perú · 2.430 msnm (Microclima templado) · Ollantaytambo
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-9'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-9'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Cruce fronterizo Kasani hacia Puno y enlace en tren panorámico Titicaca Train o vuelo a Cusco. Descenso estratégico al Valle Sagrado de los Incas (Urubamba) para asegurar descanso en menor altitud. Visita a los andenes agrícolas de Moray y minas de sal de Maras.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Hospedaje:</strong> Tambo del Inka Luxury Collection Resort & Spa</span>
                    <span><strong>Comidas:</strong> Almuerzo campestre con pachamanca orgánica</span>
                  </div>
                </div>
              )}
            </div>

            {/* Day 11 & 12 */}
            <div className="rounded bg-stone/20 border border-chocolate/8 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('day-11')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone/35 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-terracotta-text text-sm w-16">DÍA 11-12</span>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate font-semibold">
                      Santuario Histórico Machu Picchu & Retorno Imperial Cusco
                    </h4>
                    <span className="text-xs text-earth">
                      Perú · Maravilla del mundo · Despedida de expedición
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-earth">
                  {openDayAccordions['day-11'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openDayAccordions['day-11'] && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-earth space-y-2 border-t border-chocolate/8 mt-1 bg-white/70">
                  <p className="pt-3">
                    Embarque en estación privada en tren de lujo rumbo a Aguas Calientes. Ingreso prioritario a Machu Picchu con arqueólogo privado (Circuito 1 Panorámico o Circuito 2 Clásico). Almuerzo gourmet en Sanctuary Lodge. Traslado final a la capital histórica de Cusco.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-chocolate">
                    <span><strong>Hospedaje:</strong> Belmond Hotel Monasterio Cusco</span>
                    <span><strong>Cena de clausura:</strong> Menú maridado en restaurante premiado de San Blas</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FULL STACK ARCHITECTURE CODE TABS */}
        <CodeViewer />
      </section>
    </div>
  );
};
