import React, { useState } from 'react';
import { Package, Currency, Language, SiteBranding, HotelItem, RouteDestination } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES } from '../data/mockData';

interface HomeViewProps {
  packages: Package[];
  language: Language;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  onSelectPackage: (pkg: Package) => void;
  onCustomizeAI: (pkg?: Package) => void;
  onOpenConcierge: () => void;
  siteBranding: SiteBranding;
  hotelsList: HotelItem[];
  homeDestinations: RouteDestination[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  packages,
  language,
  currency,
  setCurrency,
  onSelectPackage,
  onCustomizeAI,
  onOpenConcierge,
  siteBranding,
  hotelsList,
  homeDestinations,
}) => {
  const t = TRANSLATIONS[language];
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  // Search Bar State (Booking / Airbnb Luxe Floating Filter)
  const [activeSearchTab, setActiveSearchTab] = useState<'all_inclusive' | 'tours_only' | 'custom_ai'>('all_inclusive');
  const [searchDestination, setSearchDestination] = useState<string>('all');
  const [searchDuration, setSearchDuration] = useState<string>('all');
  const [searchHotelTier, setSearchHotelTier] = useState<string>('5star');
  const [searchTravelers, setSearchTravelers] = useState<number>(2);

  // Package Filter Chip
  const [packageFilter, setPackageFilter] = useState<'all' | 'trilogia' | 'chile_bolivia' | 'bolivia_peru'>('all');

  // Carousel Image Index for each package card
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});

  // Interactive Star Tool: Live Multi-Destination Route Planner State
  const [selectedHomeDests, setSelectedHomeDests] = useState<string[]>([
    'atacama',
    'uyuni',
    'titicaca',
    'machupicchu',
  ]);

  // Hotel section filter
  const [hotelFilter, setHotelFilter] = useState<'all' | 'chile' | 'bolivia' | 'peru'>('all');

  const nextImage = (pkgId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [pkgId]: ((prev[pkgId] || 0) + 1) % max,
    }));
  };

  const prevImage = (pkgId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [pkgId]: ((prev[pkgId] || 0) - 1 + max) % max,
    }));
  };

  // Toggle destination in the interactive live route builder
  const toggleHomeDest = (id: string) => {
    if (selectedHomeDests.includes(id)) {
      if (selectedHomeDests.length > 1) {
        setSelectedHomeDests(selectedHomeDests.filter((d) => d !== id));
      }
    } else {
      setSelectedHomeDests([...selectedHomeDests, id]);
    }
  };

  // Calculate live route pricing & metrics
  const activeDestObjects = homeDestinations.filter((d) => selectedHomeDests.includes(d.id));
  const liveTotalDays = activeDestObjects.reduce((acc, curr) => acc + curr.days, 0) + 1;
  const rawDestSumUSD = activeDestObjects.reduce((acc, curr) => acc + curr.costUSD, 0);
  const multiDestDiscountUSD = selectedHomeDests.length >= 3 ? Math.round(rawDestSumUSD * 0.15) : 0;
  const liveCalculatedPriceUSD = rawDestSumUSD - multiDestDiscountUSD;
  const convertedLivePrice = Math.round(liveCalculatedPriceUSD * rateInfo.rate);

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    if (packageFilter === 'trilogia') {
      return pkg.countriesList.length === 3;
    }
    if (packageFilter === 'chile_bolivia') {
      return pkg.countriesList.includes('Chile') && pkg.countriesList.includes('Bolivia') && !pkg.countriesList.includes('Perú');
    }
    if (packageFilter === 'bolivia_peru') {
      return pkg.countriesList.includes('Bolivia') && pkg.countriesList.includes('Perú') && !pkg.countriesList.includes('Chile');
    }
    // Search bar destination filter
    if (searchDestination === 'trilogia') return pkg.countriesList.length === 3;
    if (searchDestination === 'atacama_uyuni') return pkg.countriesList.includes('Chile') && pkg.countriesList.includes('Bolivia');
    if (searchDestination === 'machupicchu') return pkg.countriesList.includes('Perú');
    return true;
  });

  const handleSearchSubmit = () => {
    if (activeSearchTab === 'custom_ai') {
      onCustomizeAI();
      return;
    }
    // Scroll smoothly to catalog
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredHotels =
    hotelFilter === 'all'
      ? hotelsList
      : hotelsList.filter((h) => h.region === hotelFilter);

  return (
    <div className="flex flex-col w-full text-[#191c1e] bg-[#f8fafc]">
      {/* 1. IMMERSIVE HERO SECTION (AIRBNB LUXE + NATIONAL GEOGRAPHIC EXPEDITIONS) */}
      <section className="relative w-full min-h-[78vh] flex flex-col justify-between pt-16 pb-12 overflow-hidden">
        {/* Full-Bleed High-Res Photography Background: Machu Picchu & Los Andes */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        {/* Cinematic Scrims: Dark Vignette Gradient for Crisp Typographic Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/55 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/90 via-[#0A0F1D]/40 to-transparent" />

        {/* Hero Narrative Content */}
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 w-full z-10 flex flex-col gap-4 pt-4">
          {/* Editorial Kicker */}
          <div className="flex items-center gap-3 text-amber-300 font-sans">
            <span className="text-xs uppercase tracking-[0.22em] font-bold">
              Expediciones de Lujo
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs uppercase tracking-widest text-slate-200 font-medium">
              Chile · Bolivia · Perú
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-amber-200/90 font-medium">
              Lodges Relais & Châteaux
            </span>
          </div>

          {/* Master Headline */}
          <div className="max-w-4xl flex flex-col gap-2.5">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-tight">
              Travesías Privadas al{' '}
              <span className="italic font-light text-amber-200 font-serif">
                Techo del Mundo
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-200/95 font-light max-w-2xl leading-relaxed">
              Descubre la inmensidad del Salar de Uyuni, los cañones de Atacama y la gloria de Machu Picchu en vehículos 4x4 satelitales con logística médica y curaduría cinco estrellas.
            </p>
          </div>
        </div>

        {/* 2. FLOATING INTERACTIVE SEARCH CARD (BOOKING / AIRBNB LUXE GLASSMORPHISM) */}
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 w-full z-20 mt-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-5 lg:p-7">
            {/* Search Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-slate-200/80">
              <button
                type="button"
                onClick={() => setActiveSearchTab('all_inclusive')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                  activeSearchTab === 'all_inclusive'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-base">hotel</span>
                <span>Paquetes Todo Incluido (con Hotel)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('tours_only')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                  activeSearchTab === 'tours_only'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-base">directions_car</span>
                <span>Solo Tours & Expediciones (sin Hotel)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('custom_ai')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                  activeSearchTab === 'custom_ai'
                    ? 'bg-[#c2410c] text-white shadow-sm'
                    : 'text-[#c2410c] bg-orange-50/80 hover:bg-orange-100 font-extrabold'
                }`}
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>Armar Ruta a Medida IA</span>
              </button>
            </div>

            {/* Interactive Search Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-5 items-end">
              {/* Selector 1: Destino */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#c2410c]">
                    explore
                  </span>
                  Destino Andino
                </label>
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  aria-label="Destino Andino"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="all">Cualquier Circuito (Todos)</option>
                  <option value="trilogia">Gran Trilogía (Atacama + Uyuni + Cusco)</option>
                  <option value="atacama_uyuni">Altiplano & Salares (Chile + Bolivia)</option>
                  <option value="machupicchu">Cultura Inca & Titicaca (Bolivia + Perú)</option>
                </select>
              </div>

              {/* Selector 2: Duración */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#c2410c]">
                    calendar_month
                  </span>
                  Duración
                </label>
                <select
                  value={searchDuration}
                  onChange={(e) => setSearchDuration(e.target.value)}
                  aria-label="Duración"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="all">Cualquier duración</option>
                  <option value="8">8 Días (Inmersión Salares)</option>
                  <option value="10">10 Días (Itinerario Expreso)</option>
                  <option value="14">14 Días (Experiencia Completa)</option>
                  <option value="21">21 Días (Gran Travesía Andina)</option>
                </select>
              </div>

              {/* Selector 3: Categoría de Hotel */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#c2410c]">
                    bed
                  </span>
                  Categoría Alojamiento
                </label>
                <select
                  value={searchHotelTier}
                  onChange={(e) => setSearchHotelTier(e.target.value)}
                  disabled={activeSearchTab === 'tours_only'}
                  aria-label="Categoría Alojamiento"
                  className={`w-full border px-3.5 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#c2410c] transition-all cursor-pointer ${
                    activeSearchTab === 'tours_only'
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                  }`}
                >
                  {activeSearchTab === 'tours_only' ? (
                    <option value="none">Sin Hotel (Solo Tours & 4x4)</option>
                  ) : (
                    <>
                      <option value="5star">5★ Lodges & Hoteles de Sal Icon</option>
                      <option value="4star">4★ Boutique Andino Superior</option>
                      <option value="3star">3★ Confort Rústico</option>
                    </>
                  )}
                </select>
              </div>

              {/* Selector 4: Viajeros */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#c2410c]">
                    group
                  </span>
                  Número de Viajeros
                </label>
                <select
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(parseInt(e.target.value, 10))}
                  aria-label="Número de Viajeros"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="1">1 Viajero (Privado Solo)</option>
                  <option value="2">2 Viajeros (En Pareja)</option>
                  <option value="3">3-4 Viajeros (Grupo Amigos)</option>
                  <option value="5">5+ Viajeros (Familia / Delegación)</option>
                </select>
              </div>

              {/* Search Action CTA */}
              <div>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-base">
                    {activeSearchTab === 'custom_ai' ? 'auto_awesome' : 'search'}
                  </span>
                  <span>
                    {activeSearchTab === 'custom_ai'
                      ? 'Diseñar con IA'
                      : 'Buscar Experiencias'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL PACKAGE CARDS (BENTO GRID & HIGH-END PHOTOGRAPHY) */}
      <section id="catalog-section" className="w-full bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Header & Filter Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c2410c] font-bold">
                Expediciones Insignia Curadas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-medium tracking-tight">
                Colección de Rutas del Triángulo Andino
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cada expedición incluye chofer-guía privado bilingüe, camioneta 4x4 equipada con oxígeno medicinal satelital y coordinación integral en cruces de frontera.
              </p>
            </div>

            {/* Currency & Filter Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
                {(['all', 'trilogia', 'chile_bolivia', 'bolivia_peru'] as const).map((filter) => {
                  const labelMap = {
                    all: 'Todos',
                    trilogia: '3 Países (Trilogía)',
                    chile_bolivia: '🇨🇱 + 🇧🇴',
                    bolivia_peru: '🇧🇴 + 🇵🇪',
                  };
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setPackageFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        packageFilter === filter
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {labelMap[filter]}
                    </button>
                  );
                })}
              </div>

              {/* Currency Selector */}
              <div className="flex items-center bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs text-xs font-bold text-slate-700">
                <span className="text-slate-400 mr-2 uppercase text-[10px] tracking-wider">Moneda:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  aria-label="Moneda de visualización"
                  className="bg-transparent font-bold text-[#0F172A] focus:outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="CLP">CLP ($)</option>
                  <option value="PEN">PEN (S/)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Large Visual Bento Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
            {filteredPackages.map((pkg) => {
              const gallery = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.imageUrl];
              const currentImgIdx = cardImageIndices[pkg.id] || 0;
              const displayImg = gallery[currentImgIdx] || pkg.imageUrl;
              const convertedPrice = Math.round(pkg.basePriceUSD * rateInfo.rate);

              return (
                <article
                  key={pkg.id}
                  className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden group hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                >
                  {/* Large High-Res Photo Viewport with Carousel Controls */}
                  <div className="relative h-80 w-full overflow-hidden bg-slate-900">
                    <img
                      src={displayImg}
                      alt={pkg.title[language] || pkg.title.ES}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Carousel Navigation Arrows */}
                    {gallery.length > 1 && (
                      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => prevImage(pkg.id, gallery.length, e)}
                          aria-label="Foto anterior"
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-transform active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => nextImage(pkg.id, gallery.length, e)}
                          aria-label="Foto siguiente"
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-transform active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                      </div>
                    )}

                    {/* Country Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] uppercase tracking-wider font-bold">
                      {pkg.countriesList.map((c, i) => (
                        <span key={c}>
                          {c === 'Chile' ? '🇨🇱 Chile' : c === 'Bolivia' ? '🇧🇴 Bolivia' : '🇵🇪 Perú'}
                          {i < pkg.countriesList.length - 1 && <span className="text-white/40 mx-1">·</span>}
                        </span>
                      ))}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold">
                      <span className="material-symbols-outlined text-xs fill-current">star</span>
                      <span>4.9★</span>
                    </div>

                    {/* Altitude & Duration Badges */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md">
                        <span className="material-symbols-outlined text-sm text-amber-300">
                          landscape
                        </span>
                        <span className="font-semibold">
                          Altitud Máx: {pkg.maxAltitudeMeters.toLocaleString()} msnm
                        </span>
                      </div>

                      <div className="px-2.5 py-1 rounded-md bg-[#c2410c] text-white font-bold text-[11px] uppercase tracking-wider">
                        {pkg.days} Días / {pkg.nights} Noches
                      </div>
                    </div>

                    {/* Carousel Indicators */}
                    {gallery.length > 1 && (
                      <div className="absolute bottom-1.5 inset-x-0 flex justify-center gap-1">
                        {gallery.map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === currentImgIdx ? 'bg-white w-4' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-widest text-[#c2410c] font-bold">
                          {pkg.isCustomAI ? '✨ Generado por IA' : 'Circuito Insignia'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Dificultad {pkg.difficulty}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#0F172A] font-semibold leading-snug">
                        {pkg.title[language] || pkg.title.ES}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {pkg.tagline[language] || pkg.tagline.ES}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-col gap-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="material-symbols-outlined text-[#c2410c] text-sm shrink-0">
                            check_circle
                          </span>
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing & CTAs */}
                    <div className="pt-2 flex flex-col gap-3 border-t border-slate-100">
                      <div className="flex items-baseline justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            Desde por viajero
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
                              {rateInfo.symbol}{convertedPrice.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-slate-500">
                              {currency}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#c2410c] bg-orange-50 border border-orange-200/60 px-2.5 py-1 rounded-md font-bold">
                          Salidas Diarias 4x4
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onSelectPackage(pkg)}
                          className="flex-1 py-3 px-4 rounded-xl bg-[#0F172A] text-white hover:bg-[#c2410c] text-center text-xs uppercase tracking-wider font-bold transition-all shadow-xs"
                        >
                          Personalizar y Cotizar
                        </button>
                        <button
                          type="button"
                          onClick={() => onCustomizeAI(pkg)}
                          className="py-3 px-4 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-center text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-sm text-[#c2410c]">
                            tune
                          </span>
                          <span>Ajustar con IA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE STAR TOOL ON HOME: LIVE MULTI-DESTINATION ROUTE CONNECTOR */}
      <section className="w-full bg-[#0F172A] text-white py-20 relative overflow-hidden">
        {/* Subtle Map Elevation Grid Ambient Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex flex-col gap-2 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Herramienta Estrella en Vivo
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
                Armador Multi-Destino con Trazado de Ruta
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Marca los destinos que sueñas visitar. Nuestro motor geográfico traza la ruta óptima de sur a norte, conecta los cruces fronterizos y calcula tu cotización en vivo con descuento multi-país.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-amber-400 text-xl">satellite_alt</span>
              <div className="flex flex-col text-xs">
                <span className="font-bold text-white">Logística Satelital Garmin InReach</span>
                <span className="text-slate-400">Chile · Bolivia · Perú sincronizados</span>
              </div>
            </div>
          </div>

          {/* Destination Selector Visual Cards (With Real High-Res Photography) */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              1. Selecciona los hitos que deseas unir en tu expedición:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {homeDestinations.map((dest) => {
                const isSelected = selectedHomeDests.includes(dest.id);
                return (
                  <div
                    key={dest.id}
                    onClick={() => toggleHomeDest(dest.id)}
                    className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col relative group ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/40 bg-slate-800 shadow-lg scale-[1.02]'
                        : 'border-white/10 bg-slate-800/60 opacity-65 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    {/* Destination Photo */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                      {/* Flag and Country Badge */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider">
                        {dest.flag} {dest.country}
                      </span>

                      {/* Checkbox */}
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center transition-all bg-black/60 border border-white/30">
                        {isSelected && (
                          <span className="material-symbols-outlined text-amber-400 text-lg">
                            check
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Destination Info */}
                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-lg font-semibold text-white">
                          {dest.name}
                        </h4>
                        <span className="text-[11px] text-amber-300 font-medium block mt-0.5">
                          {dest.altitude}
                        </span>
                        <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                          {dest.tag}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                        <span>{dest.days} días sugeridos</span>
                        <span className="font-bold text-white">
                          +{rateInfo.symbol}{Math.round(dest.costUSD * rateInfo.rate)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Route Tracer Graphic & Dynamic Quote Strip */}
          <div className="bg-slate-800/90 rounded-2xl border border-white/15 p-6 lg:p-8 flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-2xl">
                  timeline
                </span>
                <div>
                  <h4 className="font-serif text-xl font-semibold text-white">
                    Trazado Altimétrico de tu Ruta en Vivo
                  </h4>
                  <span className="text-xs text-slate-400">
                    Conexión geográfica automatizada: {activeDestObjects.map((d) => d.name).join(' ➔ ')}
                  </span>
                </div>
              </div>

              {selectedHomeDests.length >= 3 && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">percent</span>
                  15% Bonificación Multi-Destino Aplicada
                </span>
              )}
            </div>

            {/* Dynamic Interactive SVG Elevation & Route Graph */}
            <div className="w-full bg-slate-900/80 rounded-xl p-5 border border-white/10">
              <div className="h-40 w-full relative">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 800 160"
                >
                  <defs>
                    <linearGradient id="liveAltGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Draw points & polygon dynamically based on active selected destinations */}
                  {activeDestObjects.length > 1 && (
                    <>
                      <polygon
                        fill="url(#liveAltGrad)"
                        points={`50,140 ${activeDestObjects
                          .map((d, idx) => {
                            const x = 50 + (idx * 700) / (activeDestObjects.length - 1);
                            // Altitude scale: 2000m -> 130, 4900m -> 20
                            const y = Math.max(20, Math.min(130, 140 - ((d.altitudeMeters - 2000) / 2900) * 110));
                            return `${x},${y}`;
                          })
                          .join(' ')} 750,140`}
                      />

                      <polyline
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={activeDestObjects
                          .map((d, idx) => {
                            const x = 50 + (idx * 700) / (activeDestObjects.length - 1);
                            const y = Math.max(20, Math.min(130, 140 - ((d.altitudeMeters - 2000) / 2900) * 110));
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    </>
                  )}

                  {/* Nodes & Labels */}
                  {activeDestObjects.map((d, idx) => {
                    const x =
                      activeDestObjects.length === 1
                        ? 400
                        : 50 + (idx * 700) / (activeDestObjects.length - 1);
                    const y = Math.max(20, Math.min(130, 140 - ((d.altitudeMeters - 2000) / 2900) * 110));
                    return (
                      <g key={d.id}>
                        <circle cx={x} cy={y} r="6" fill="#0F172A" stroke="#f59e0b" strokeWidth="2.5" />
                        <circle cx={x} cy={y} r="2.5" fill="#f59e0b" />
                        <text
                          x={x}
                          y={y - 12}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          fontFamily="Plus Jakarta Sans"
                          textAnchor="middle"
                        >
                          {d.name} ({d.altitude})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Waypoint badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Punto de Partida: {activeDestObjects[0]?.name || 'Atacama'}
                </span>
                {selectedHomeDests.includes('uyuni') && selectedHomeDests.includes('atacama') && (
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    Cruce 4x4 Hito Cajón (Chile ➔ Bolivia)
                  </span>
                )}
                {selectedHomeDests.includes('titicaca') && (selectedHomeDests.includes('machupicchu') || selectedHomeDests.includes('cusco')) && (
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    Cruce Kasani / Desaguadero (Bolivia ➔ Perú)
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#c2410c]"></span>
                  Término: {activeDestObjects[activeDestObjects.length - 1]?.name || 'Cusco'}
                </span>
              </div>
            </div>

            {/* Live Pricing Summary & Launch CTA */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-2">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Duración Estimada
                  </span>
                  <span className="font-serif text-2xl font-bold text-white">
                    {liveTotalDays} Días / {Math.max(1, liveTotalDays - 1)} Noches
                  </span>
                </div>

                <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Presupuesto por Viajero (Base)
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl font-bold text-amber-400">
                      {rateInfo.symbol}{convertedLivePrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      {currency}
                    </span>
                  </div>
                </div>

                {multiDestDiscountUSD > 0 && (
                  <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    Ahorro de {rateInfo.symbol}{Math.round(multiDestDiscountUSD * rateInfo.rate)} {currency} por combinar destinos
                  </div>
                )}
              </div>

              {/* Direct Link to the Full Route Builder with These Destinations */}
              <button
                type="button"
                onClick={() => onCustomizeAI()}
                className="w-full lg:w-auto px-8 py-4 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                <span>Llevar esta Selección al Armador IA Completo</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOTELES EMBLEMÁTICOS & EXPERIENCIAS DE ALTURA */}
      <section id="hotels-section" className="w-full bg-white py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c2410c] font-bold">
                Colección Privada
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-medium">
                Hoteles Emblemáticos & Lodges de Altura
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Descanso sin concesiones en los confines del planeta. Arquitectura vernácula, muros de sal cristalina tallada a mano y servicio de cinco estrellas a más de 3.600 metros de altitud.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setHotelFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'all'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                type="button"
                onClick={() => setHotelFilter('chile')}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'chile'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.filterChile}
              </button>
              <button
                type="button"
                onClick={() => setHotelFilter('bolivia')}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'bolivia'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.filterBolivia}
              </button>
              <button
                type="button"
                onClick={() => setHotelFilter('peru')}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'peru'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.filterPeru}
              </button>
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200 flex flex-col group hover:shadow-lg transition-all"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider">
                    {hotel.countryBadge}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#c2410c] uppercase font-bold tracking-wider block">
                      {hotel.subtitle}
                    </span>
                    <h4 className="font-serif text-lg text-[#0F172A] font-semibold mt-1">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500 font-semibold">
                    <span>{hotel.comfort}</span>
                    <span className="material-symbols-outlined text-[#c2410c] text-sm">
                      verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experiencias Culinarias de Alta Atmósfera */}
          <div className="pt-10 flex flex-col gap-6 border-t border-slate-200">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c2410c] font-bold">
                Sensorial & Gastronomía
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0F172A] font-medium">
                Experiencias Culinarias de Alta Atmósfera
              </h3>
              <p className="text-sm text-slate-600 max-w-2xl">
                Degustaciones maridadas con vinos de altura bolivianos (Tarija), cepas patrimoniales chilenas y cocina de raíces quechuas y aymaras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exp 1 */}
              <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 shadow-xs border border-slate-200">
                <div className="h-44 w-full rounded-xl overflow-hidden relative bg-slate-900">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEOjZbHGZ2JcjXn1AIDcFj8TRd52aLAfePAy-v2oAc9wKfxTFSnKEAadii0IylRPt1U8X5M_ellITqOY6129zYqh8kuDTsZ2LjV_GJGKQKeZlTgvMHqBP8xfCvq7_6SincnccNowDdcuE0SrvsqV9SsZKdLlWIywBo_Im-OnaFR5Op4dmRfLnMKk7IThZ_zrU_ApE-vtGac9N32hZllp67h5iFgD8zi36cD6v_HONQ-M81mdGilOX6"
                    alt="Cena Astronómica en el Desierto"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#0F172A]/85 text-white text-[10px] uppercase font-bold tracking-wider">
                    Atacama Stargazing
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#0F172A]">
                    Cena Astronómica en el Desierto
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Bajo el cielo más puro y límpido del hemisferio sur. Menú de degustación en 5 pasos maridado con vinos del Valle de Huasco mientras un astrofísico guía la observación con telescopio de alta precisión.
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center text-[#c2410c] text-xs font-bold gap-1">
                  <span>Incluido en Circuito Insignia</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Exp 2 */}
              <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 shadow-xs border border-slate-200">
                <div className="h-44 w-full rounded-xl overflow-hidden relative bg-slate-900">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS3gDCWBQk3irZJgLMfabAPIiYseScdrUi9JQe9gPRNLQpBjhqbyFSaPg8XDj83vkR5_JrNpUckWRgKRUEt0PeaWRrf4ZuD8C1UMyHnbTagImZthBFL0bfMmbStarkvzZhwuq8KpJVIZWXUJkSMPXta4mlkL7yG0Fe1CTO1ZgE_BgYz2DtVJBD-e4Hlc1lC6pesavXZQnT5qGnjPpeD7AsftZ2EH_5fxMG8SF-7APqsGbwxF50BJ3t"
                    alt="Picnic Flotante en el Espejo de Sal"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#0F172A]/85 text-white text-[10px] uppercase font-bold tracking-wider">
                    Salar de Uyuni
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#0F172A]">
                    Picnic Flotante en el Espejo de Sal
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Mesa privada con lencería blanca montada directamente sobre la lámina de agua infinita. Cocina de quinoa real, carne de llama confitada y champagne helado en el corazón del silencio blanco.
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center text-[#c2410c] text-xs font-bold gap-1">
                  <span>Exclusividad Triángulo Andino</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Exp 3 */}
              <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 shadow-xs border border-slate-200">
                <div className="h-44 w-full rounded-xl overflow-hidden relative bg-slate-900">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQHW9-5fs-asyRdXOfnn8HegM_cCHGG0iKvsLgGO_q1mRGDlC8JFjy6lmEJOJW2oJNOMbN4GF3Gx1Yw-vQb6o8mUYKUy7jJVZUP3LlyDVAM8Vb11XAuDMoERVXtK293hDbRISUu8w9yi5aepYyGj0U5G9R6o5SVbtgPevaW3rvgIGeBgO9ZaFSkPuq1zTYUiBgqXFpIaQCpYxYlWsBLBEEIARNmszNgZnVa1Gay0fn8YnGVVW3J3IZ"
                    alt="Degustación de Alturas Andinas"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#0F172A]/85 text-white text-[10px] uppercase font-bold tracking-wider">
                    Cusco & Valle Sagrado
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#0F172A]">
                    Degustación de Alturas Andinas
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Exploración culinaria de ecosistemas verticales inspirada en el centro de investigación Mater Iniciativa de Virgilio Martínez. Ingredientes recolectados desde el nivel del mar hasta 4.500 metros.
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center text-[#c2410c] text-xs font-bold gap-1">
                  <span>Mesa Prioritaria Reservada</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONCIERGE & SAFETY SATELITAL GUARANTEE */}
      <section className="w-full bg-slate-50 py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-[#0F172A] text-white rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Asistencia de Emergencia & Confort 24/7
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                ¿Deseas una ruta inédita o coordinar tu viaje en privado?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nuestros asesores andinos bilingües y equipo médico de expedición están disponibles para ajustar vuelos locales, permisos de alta montaña y requerimientos de aclimatación.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => onCustomizeAI()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>Armar con IA</span>
              </button>

              <button
                type="button"
                onClick={onOpenConcierge}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/20"
              >
                <span className="material-symbols-outlined text-emerald-400 text-base">chat</span>
                <span>WhatsApp Concierge 24/7</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
