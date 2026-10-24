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

  // Search Bar State (Andean Vanguard Floating Filter)
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
    <div className="flex flex-col w-full text-chocolate bg-canvas">
      {/* 1. IMMERSIVE HERO SECTION (ANDEAN VANGUARD LUXURY) */}
      <section className="relative w-full min-h-[78vh] flex flex-col justify-between pt-16 pb-12 overflow-hidden">
        {/* Full-Bleed High-Res Photography Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        {/* Cinematic Scrims: Warm Vignette Gradient (#2E2520) for Crisp Typographic Contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-[#2E2520]/95 via-[#2E2520]/60 to-black/35" />
        <div className="absolute inset-0 bg-linear-to-r from-[#2E2520]/90 via-[#2E2520]/45 to-transparent" />

        {/* Hero Narrative Content */}
        <div className="relative max-w-360 mx-auto px-6 lg:px-12 w-full z-10 flex flex-col gap-4 pt-4">
          {/* Editorial Kicker */}
          <div className="flex items-center gap-3 text-gold font-sans">
            <span className="text-xs uppercase tracking-[0.22em] font-bold">{t.heroTag}</span><span className="text-white/40">·</span><span className="text-xs uppercase tracking-widest text-stone font-medium">{t.heroSubtitle}</span><span className="text-white/40">·</span><span className="text-xs text-gold/90 font-medium">{t.pillHotels}</span>
          </div>

          {/* Master Headline (Sentence case) */}
          <div className="max-w-4xl flex flex-col gap-2.5">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-tight">
              Travesías privadas al{' '}
              <span className="italic font-light text-gold font-serif">
                techo del mundo
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-white/90 font-light max-w-2xl leading-relaxed">
              Descubre la inmensidad del Salar de Uyuni, los cañones de Atacama y la gloria de Machu Picchu en vehículos 4x4 satelitales con logística médica y curaduría cinco estrellas.
            </p>
          </div>
        </div>

        {/* 2. FLOATING SEARCH CARD (NIVEL 2 ELEVATION, RADIUS 4PX, OLIVE CTA) */}
        <div className="relative max-w-360 mx-auto px-6 lg:px-12 w-full z-20 mt-6">
          <div className="bg-white/95 backdrop-blur-md rounded-lg elevation-floating border border-chocolate/12 p-5 lg:p-7">
            {/* Search Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-chocolate/10">
              <button
                type="button"
                onClick={() => setActiveSearchTab('all_inclusive')}
                className={`px-4 py-2 rounded text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                  activeSearchTab === 'all_inclusive'
                    ? 'bg-chocolate text-white shadow-xs'
                    : 'text-earth hover:text-chocolate hover:bg-stone/30'
                }`}
              >
                <span className="material-symbols-outlined text-base">hotel</span>
                <span>{language === "EN" ? "Packages with Hotels" : language === "PT" ? "Pacotes com Hotel" : language === "FR" ? "Forfaits avec Hôtels" : "Paquetes con hotelería incluida"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('tours_only')}
                className={`px-4 py-2 rounded text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                  activeSearchTab === 'tours_only'
                    ? 'bg-chocolate text-white shadow-xs'
                    : 'text-earth hover:text-chocolate hover:bg-stone/30'
                }`}
              >
                <span className="material-symbols-outlined text-base">directions_car</span>
                <span>{language === "EN" ? "4x4 Expedition Only (No Hotel)" : language === "PT" ? "Apenas Expedição 4x4 (Sem Hotel)" : language === "FR" ? "Expédition 4x4 Seule (Sans Hôtel)" : "Solo expedición 4x4 (sin hotel)"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('custom_ai')}
                className={`px-4 py-2 rounded text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                  activeSearchTab === 'custom_ai'
                    ? 'bg-olive text-white shadow-xs'
                    : 'text-terracotta-text bg-secondary-soft/50 hover:bg-secondary-soft font-extrabold'
                }`}
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>{t.customizeWithAI}</span>
              </button>
            </div>

            {/* Interactive Search Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-5 items-end">
              {/* Selector 1: Destino */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-earth font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-olive">
                    explore
                  </span>{t.quickDestinations}</label>
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  aria-label="Destino Andino"
                  className="w-full bg-canvas border border-outline px-3.5 py-3 rounded text-xs font-semibold text-chocolate focus:outline-none focus:ring-2 focus:ring-olive transition-all cursor-pointer"
                >
                  <option value="all">Cualquier circuito (Todos)</option>
                  <option value="trilogia">Gran Trilogía (Atacama + Uyuni + Cusco)</option>
                  <option value="atacama_uyuni">Altiplano & Salares (Chile + Bolivia)</option>
                  <option value="machupicchu">Cultura Inca & Titicaca (Bolivia + Perú)</option>
                </select>
              </div>

              {/* Selector 2: Duración */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-earth font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-olive">
                    calendar_month
                  </span>{t.quickDuration}</label>
                <select
                  value={searchDuration}
                  onChange={(e) => setSearchDuration(e.target.value)}
                  aria-label="Duración"
                  className="w-full bg-canvas border border-outline px-3.5 py-3 rounded text-xs font-semibold text-chocolate focus:outline-none focus:ring-2 focus:ring-olive transition-all cursor-pointer"
                >
                  <option value="all">Cualquier duración</option>
                  <option value="8">8 días (Inmersión salares)</option>
                  <option value="10">10 días (Itinerario expreso)</option>
                  <option value="14">14 días (Experiencia completa)</option>
                  <option value="21">21 días (Gran travesía andina)</option>
                </select>
              </div>

              {/* Selector 3: Categoría de Hotel */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-earth font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-olive">
                    bed
                  </span>{t.paramTier}</label>
                <select
                  value={searchHotelTier}
                  onChange={(e) => setSearchHotelTier(e.target.value)}
                  disabled={activeSearchTab === 'tours_only'}
                  aria-label="Categoría Alojamiento"
                  className={`w-full border px-3.5 py-3 rounded text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-olive transition-all cursor-pointer ${
                    activeSearchTab === 'tours_only'
                      ? 'bg-stone/50 border-outline/40 text-earth/50 cursor-not-allowed'
                      : 'bg-canvas border-outline text-chocolate focus:bg-white'
                  }`}
                >
                  {activeSearchTab === 'tours_only' ? (
                    <option value="none">Sin hotel (Solo tours 4x4)</option>
                  ) : (
                    <>
                      <option value="5star">5★ Lodges & Hoteles de sal icon</option>
                      <option value="4star">4★ Boutique andino superior</option>
                      <option value="3star">3★ Confort rústico</option>
                    </>
                  )}
                </select>
              </div>

              {/* Selector 4: Viajeros */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-earth font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-olive">
                    group
                  </span>
                  Número de viajeros
                </label>
                <select
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(parseInt(e.target.value, 10))}
                  aria-label="Número de Viajeros"
                  className="w-full bg-canvas border border-outline px-3.5 py-3 rounded text-xs font-semibold text-chocolate focus:outline-none focus:ring-2 focus:ring-olive transition-all cursor-pointer"
                >
                  <option value="1">1 viajero (Privado solo)</option>
                  <option value="2">2 viajeros (En pareja)</option>
                  <option value="3">3-4 viajeros (Grupo amigos)</option>
                  <option value="5">5+ viajeros (Familia / delegación)</option>
                </select>
              </div>

              {/* Search Action CTA (Oliva, radio 4px) */}
              <div>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full py-3.5 px-6 rounded bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">
                    {activeSearchTab === 'custom_ai' ? 'auto_awesome' : 'search'}
                  </span>
                  <span>
                    {activeSearchTab === 'custom_ai' ? t.quickButton : (language === 'EN' ? 'Search Expeditions' : language === 'PT' ? 'Buscar Expedições' : language === 'FR' ? 'Rechercher des Expéditions' : 'Buscar expedición')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL PACKAGE CARDS (REDISENO ANATOMICO OFICIAL 7.4) */}
      <section id="catalog-section" className="w-full bg-canvas py-20 border-b border-chocolate/12">
        <div className="max-w-360 mx-auto px-6 lg:px-12">
          {/* Header & Filter Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-10 border-b border-chocolate/12">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-terracotta-text font-bold">{t.curatedCatalog}</span><h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-medium tracking-tight">{t.catalogTitle}</h2><p className="text-sm text-earth leading-relaxed">{t.catalogDesc}</p>
            </div>

            {/* Currency & Filter Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-stone p-1.5 rounded border border-chocolate/10 shadow-xs">
                {(['all', 'trilogia', 'chile_bolivia', 'bolivia_peru'] as const).map((filter) => {
                  const labelMap = { all: t.filterAll, trilogia: t.nav3Countries, chile_bolivia: `${t.filterChile} + ${t.filterBolivia}`, bolivia_peru: `${t.filterBolivia} + ${t.filterPeru}` };
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setPackageFilter(filter)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                        packageFilter === filter
                          ? 'bg-chocolate text-white shadow-xs'
                          : 'text-earth hover:text-chocolate'
                      }`}
                    >
                      {labelMap[filter]}
                    </button>
                  );
                })}
              </div>

              {/* Currency Selector */}
              <div className="flex items-center bg-stone px-3 py-2 rounded border border-chocolate/10 shadow-xs text-xs font-bold text-chocolate">
                <span className="text-earth mr-2 uppercase text-[10px] tracking-wider">Moneda:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  aria-label="Moneda de visualización"
                  className="bg-transparent font-bold text-chocolate focus:outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="CLP">CLP ($)</option>
                  <option value="PEN">PEN (S/)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Large Visual Bento Cards Grid (Anatomía Oficial: radio 8px, sin sombra, zoom 1.03, pie Piedra) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
            {filteredPackages.map((pkg) => {
              const gallery = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.imageUrl];
              const currentImgIdx = cardImageIndices[pkg.id] || 0;
              const displayImg = gallery[currentImgIdx] || pkg.imageUrl;
              const convertedPrice = Math.round(pkg.basePriceUSD * rateInfo.rate);

              return (
                <article
                  key={pkg.id}
                  className="flex flex-col bg-white rounded-lg elevation-card border border-chocolate/12 overflow-hidden group hover:border-chocolate/25 transition-all duration-300"
                >
                  {/* Photo Viewport with 36px Top Translucent Bar & Max 2 Badges */}
                  <div className="relative h-72 w-full overflow-hidden bg-chocolate">
                    <img
                      src={displayImg}
                      alt={pkg.title[language] || pkg.title.ES}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Barra Superior Translúcida de 36px (Anatomía Oficial 7.4) */}
                    <div className="absolute top-0 inset-x-0 h-9 bg-chocolate/75 backdrop-blur-sm px-4 flex items-center justify-between text-white z-10 border-b border-white/10">
                      <span className="text-[11px] font-bold tracking-wider uppercase font-sans truncate">
                        {pkg.country.toUpperCase()}
                      </span>
                      {/* Rating Badge (Máx. 2 badges sobre foto) */}
                      <span className="flex items-center gap-1 text-gold font-bold text-xs shrink-0">
                        <span className="material-symbols-outlined text-xs fill-current">star</span>
                        <span>4.9★</span>
                      </span>
                    </div>

                    {/* Carousel Navigation Arrows */}
                    {gallery.length > 1 && (
                      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          type="button"
                          onClick={(e) => prevImage(pkg.id, gallery.length, e)}
                          aria-label="Foto anterior"
                          className="w-8 h-8 rounded-full bg-chocolate/70 hover:bg-chocolate text-white flex items-center justify-center transition-transform active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => nextImage(pkg.id, gallery.length, e)}
                          aria-label="Foto siguiente"
                          className="w-8 h-8 rounded-full bg-chocolate/70 hover:bg-chocolate text-white flex items-center justify-center transition-transform active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                      </div>
                    )}

                    {/* Subtle warm vignette on bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-chocolate/70 to-transparent pointer-events-none" />

                    {/* Carousel Dots */}
                    {gallery.length > 1 && (
                      <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-10">
                        {gallery.map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === currentImgIdx ? 'bg-gold w-3' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Body (Blanco Alabastro, padding 24-32px) */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4 bg-white">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-widest text-terracotta-text font-bold">
                          {pkg.isCustomAI ? '✨ Generado por IA' : 'Circuito insignia'}
                        </span>
                        <span className="text-xs text-earth font-medium">
                          Dificultad {pkg.difficulty}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-chocolate font-bold leading-snug line-clamp-2">
                        {pkg.title[language] || pkg.title.ES}
                      </h3>

                      <p className="text-xs sm:text-sm text-earth line-clamp-2 leading-relaxed">
                        {pkg.tagline[language] || pkg.tagline.ES}
                      </p>
                    </div>

                    {/* Métricas Altimétricas & Duración con iconos Oliva */}
                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-chocolate/8">
                      <div className="flex items-center gap-1.5 text-chocolate">
                        <span className="material-symbols-outlined text-sm text-olive">landscape</span>
                        <span className="font-semibold">{pkg.maxAltitudeMeters.toLocaleString()} msnm</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-chocolate justify-end">
                        <span className="material-symbols-outlined text-sm text-olive">schedule</span>
                        <span className="font-semibold">{pkg.days} días / {pkg.nights} noches</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-col gap-1.5 bg-canvas p-3 rounded border border-chocolate/8">
                      {pkg.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-earth">
                          <span className="material-symbols-outlined text-olive text-sm shrink-0">
                            check
                          </span>
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pie de Tarjeta en Piedra Suave (#E5DFD5) según Manual 7.4 */}
                  <div className="bg-stone p-4 px-6 border-t border-chocolate/10 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-earth uppercase tracking-wider font-semibold">{t.pricePerPax}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-2xl font-bold text-chocolate">
                          {rateInfo.symbol}{convertedPrice.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-bold text-earth uppercase">
                          {currency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectPackage(pkg)}
                        className="py-2.5 px-4 rounded bg-olive hover:bg-olive-deep text-white text-xs uppercase tracking-wider font-bold transition-colors shadow-xs"
                      >
                        Ver expedición
                      </button>
                      <button
                        type="button"
                        onClick={() => onCustomizeAI(pkg)}
                        title="Ajustar con IA"
                        aria-label="Ajustar con IA"
                        className="p-2.5 rounded bg-white hover:bg-stone/80 text-chocolate border border-chocolate/15 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-terracotta-text">
                          tune
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LA BANDA CHOCOLATE OFICIAL DE LA PÁGINA (ARMADOR MULTI-DESTINO INTERACTIVO) */}
      <section className="w-full bg-chocolate text-white py-20 relative overflow-hidden">
        {/* Subtle Map Ambient Grid */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-360 mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex flex-col gap-2 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-bold">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Herramienta interactiva en vivo
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
                Armador multi-destino con trazado de ruta
              </h2>
              <p className="text-sm sm:text-base text-stone/90 leading-relaxed">
                Marca los hitos que sueñas visitar. Nuestro motor geográfico traza la ruta óptima de sur a norte, conecta los cruces fronterizos y calcula tu cotización en vivo con descuento multi-país.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded border border-white/15">
              <span className="material-symbols-outlined text-gold text-xl">satellite_alt</span>
              <div className="flex flex-col text-xs">
                <span className="font-bold text-white">Logística satelital Garmin InReach</span>
                <span className="text-stone/80">Chile · Bolivia · Perú sincronizados</span>
              </div>
            </div>
          </div>

          {/* Destination Selector Visual Cards (Radius 8px, Chocolate Layering) */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest text-stone font-bold">
              1. Selecciona los hitos que deseas unir en tu expedición:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {homeDestinations.map((dest) => {
                const isSelected = selectedHomeDests.includes(dest.id);
                return (
                  <div
                    key={dest.id}
                    onClick={() => toggleHomeDest(dest.id)}
                    className={`cursor-pointer rounded-lg overflow-hidden border transition-all duration-300 flex flex-col relative group ${
                      isSelected
                        ? 'border-gold ring-2 ring-gold/40 bg-white/10 shadow-sm scale-[1.02]'
                        : 'border-white/10 bg-white/5 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    {/* Destination Photo */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-chocolate via-transparent to-transparent" />

                      {/* Flag and Country Badge */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-chocolate/85 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider">
                        {dest.flag} {dest.country}
                      </span>

                      {/* Checkbox */}
                      <div className="absolute top-3 right-3 w-6 h-6 rounded flex items-center justify-center transition-all bg-chocolate/70 border border-white/30">
                        {isSelected && (
                          <span className="material-symbols-outlined text-gold text-lg">
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
                        <span className="text-[11px] text-gold font-medium block mt-0.5">
                          {dest.altitude}
                        </span>
                        <p className="text-xs text-stone/80 mt-2 line-clamp-2 leading-relaxed">
                          {dest.tag}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-stone">
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
          <div className="bg-white/5 rounded-lg border border-white/15 p-6 lg:p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-2xl">
                  timeline
                </span>
                <div>
                  <h4 className="font-serif text-xl font-semibold text-white">
                    Trazado altimétrico de tu ruta en vivo
                  </h4>
                  <span className="text-xs text-stone/80">
                    Conexión geográfica automatizada: {activeDestObjects.map((d) => d.name).join(' ➔ ')}
                  </span>
                </div>
              </div>

              {selectedHomeDests.length >= 3 && (
                <span className="px-3 py-1 rounded bg-olive/30 text-white border border-olive/50 text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">percent</span>
                  15% Bonificación multi-destino aplicada
                </span>
              )}
            </div>

            {/* Dynamic Interactive SVG Elevation & Route Graph */}
            <div className="w-full bg-black/25 rounded p-5 border border-white/10">
              <div className="h-40 w-full relative">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 800 160"
                >
                  <defs>
                    <linearGradient id="liveAltGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4A373" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#D4A373" stopOpacity="0.0" />
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
                            const y = Math.max(20, Math.min(130, 140 - ((d.altitudeMeters - 2000) / 2900) * 110));
                            return `${x},${y}`;
                          })
                          .join(' ')} 750,140`}
                      />

                      <polyline
                        fill="none"
                        stroke="#D4A373"
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
                        <circle cx={x} cy={y} r="6" fill="#3E322C" stroke="#D4A373" strokeWidth="2.5" />
                        <circle cx={x} cy={y} r="2.5" fill="#D4A373" />
                        <text
                          x={x}
                          y={y - 12}
                          fill="#F9F6F0"
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
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-stone/90">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-olive"></span>
                  Punto de partida: {activeDestObjects[0]?.name || 'Atacama'}
                </span>
                {selectedHomeDests.includes('uyuni') && selectedHomeDests.includes('atacama') && (
                  <span className="text-gold font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    Cruce 4x4 Hito Cajón (Chile ➔ Bolivia)
                  </span>
                )}
                {selectedHomeDests.includes('titicaca') && (selectedHomeDests.includes('machupicchu') || selectedHomeDests.includes('cusco')) && (
                  <span className="text-gold font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    Cruce Kasani / Desaguadero (Bolivia ➔ Perú)
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-terracotta"></span>
                  Término: {activeDestObjects[activeDestObjects.length - 1]?.name || 'Cusco'}
                </span>
              </div>
            </div>

            {/* Live Pricing Summary & Launch CTA (Oliva Button) */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-2">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-stone/70 font-bold">
                    Duración estimada
                  </span>
                  <span className="font-serif text-2xl font-bold text-white">
                    {liveTotalDays} días / {Math.max(1, liveTotalDays - 1)} noches
                  </span>
                </div>

                <div className="w-[1px] h-10 bg-white/15 hidden sm:block"></div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-stone/70 font-bold">
                    Presupuesto por viajero (Base)
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl font-bold text-gold">
                      {rateInfo.symbol}{convertedLivePrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone font-bold uppercase">
                      {currency}
                    </span>
                  </div>
                </div>

                {multiDestDiscountUSD > 0 && (
                  <div className="text-xs text-white font-semibold bg-olive/30 px-3 py-1 rounded border border-olive/40">
                    Ahorro de {rateInfo.symbol}{Math.round(multiDestDiscountUSD * rateInfo.rate)} {currency} por combinar destinos
                  </div>
                )}
              </div>

              {/* Direct Link to the Full Route Builder with These Destinations */}
              <button
                type="button"
                onClick={() => onCustomizeAI()}
                className="w-full lg:w-auto px-8 py-4 rounded bg-olive hover:bg-olive-deep text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                <span>Llevar selección al armador IA</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOTELES EMBLEMÁTICOS & EXPERIENCIAS DE ALTURA */}
      <section id="hotels-section" className="w-full bg-canvas py-20 border-b border-chocolate/12">
        <div className="max-w-360 mx-auto px-6 lg:px-12 flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-terracotta-text font-bold">
                Colección privada
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-medium">
                Hoteles emblemáticos & lodges de altura
              </h2>
              <p className="text-sm text-earth leading-relaxed">
                Descanso sin concesiones en los confines del planeta. Arquitectura vernácula, muros de sal cristalina tallada a mano y servicio de cinco estrellas a más de 3.600 metros de altitud.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-stone rounded border border-chocolate/10">
              <button
                type="button"
                onClick={() => setHotelFilter('all')}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'all'
                    ? 'bg-white text-chocolate shadow-xs border border-chocolate/10'
                    : 'text-earth hover:text-chocolate'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                type="button"
                onClick={() => setHotelFilter('chile')}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'chile'
                    ? 'bg-white text-chocolate shadow-xs border border-chocolate/10'
                    : 'text-earth hover:text-chocolate'
                }`}
              >
                {t.filterChile}
              </button>
              <button
                type="button"
                onClick={() => setHotelFilter('bolivia')}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'bolivia'
                    ? 'bg-white text-chocolate shadow-xs border border-chocolate/10'
                    : 'text-earth hover:text-chocolate'
                }`}
              >
                {t.filterBolivia}
              </button>
              <button
                type="button"
                onClick={() => setHotelFilter('peru')}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-bold transition-all ${
                  hotelFilter === 'peru'
                    ? 'bg-white text-chocolate shadow-xs border border-chocolate/10'
                    : 'text-earth hover:text-chocolate'
                }`}
              >
                {t.filterPeru}
              </button>
            </div>
          </div>

          {/* Hotels Grid (Radius 8px, Elevation Card) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-lg overflow-hidden elevation-card border border-chocolate/12 flex flex-col group hover:border-chocolate/25 transition-all"
              >
                <div className="relative h-64 w-full overflow-hidden bg-chocolate">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-chocolate/80 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider">
                    {hotel.countryBadge}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-terracotta-text uppercase font-bold tracking-wider block">
                      {hotel.subtitle}
                    </span>
                    <h4 className="font-serif text-lg text-chocolate font-semibold mt-1">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-earth mt-2 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between border-t border-chocolate/8 text-xs text-earth font-semibold">
                    <span>{hotel.comfort}</span>
                    <span className="material-symbols-outlined text-olive text-sm">
                      verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experiencias Culinarias de Alta Atmósfera */}
          <div className="pt-10 flex flex-col gap-6 border-t border-chocolate/12">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.2em] text-terracotta-text font-bold">
                Sensorial & gastronomía
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-chocolate font-medium">
                Experiencias culinarias de alta atmósfera
              </h3>
              <p className="text-sm text-earth max-w-2xl">
                Degustaciones maridadas con vinos de altura bolivianos (Tarija), cepas patrimoniales chilenas y cocina de raíces quechuas y aymaras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exp 1 */}
              <div className="bg-white p-5 rounded-lg flex flex-col gap-3 elevation-card border border-chocolate/12">
                <div className="h-44 w-full rounded overflow-hidden relative bg-chocolate">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEOjZbHGZ2JcjXn1AIDcFj8TRd52aLAfePAy-v2oAc9wKfxTFSnKEAadii0IylRPt1U8X5M_ellITqOY6129zYqh8kuDTsZ2LjV_GJGKQKeZlTgvMHqBP8xfCvq7_6SincnccNowDdcuE0SrvsqV9SsZKdLlWIywBo_Im-OnaFR5Op4dmRfLnMKk7IThZ_zrU_ApE-vtGac9N32hZllp67h5iFgD8zi36cD6v_HONQ-M81mdGilOX6"
                    alt="Cena Astronómica en el Desierto"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded bg-chocolate/85 text-white text-[10px] uppercase font-bold tracking-wider">
                    Atacama Stargazing
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-chocolate">
                    Cena astronómica en el desierto
                  </h4>
                  <p className="text-xs text-earth mt-1.5 leading-relaxed">
                    Bajo el cielo más puro y límpido del hemisferio sur. Menú de degustación en 5 pasos maridado con vinos del Valle de Huasco mientras un astrofísico guía la observación con telescopio de alta precisión.
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center text-olive text-xs font-bold gap-1">
                  <span>Incluido en circuito insignia</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Exp 2 */}
              <div className="bg-white p-5 rounded-lg flex flex-col gap-3 elevation-card border border-chocolate/12">
                <div className="h-44 w-full rounded overflow-hidden relative bg-chocolate">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS3gDCWBQk3irZJgLMfabAPIiYseScdrUi9JQe9gPRNLQpBjhqbyFSaPg8XDj83vkR5_JrNpUckWRgKRUEt0PeaWRrf4ZuD8C1UMyHnbTagImZthBFL0bfMmbStarkvzZhwuq8KpJVIZWXUJkSMPXta4mlkL7yG0Fe1CTO1ZgE_BgYz2DtVJBD-e4Hlc1lC6pesavXZQnT5qGnjPpeD7AsftZ2EH_5fxMG8SF-7APqsGbwxF50BJ3t"
                    alt="Picnic Flotante en el Espejo de Sal"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded bg-chocolate/85 text-white text-[10px] uppercase font-bold tracking-wider">
                    Salar de Uyuni
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-chocolate">
                    Picnic flotante en el espejo de sal
                  </h4>
                  <p className="text-xs text-earth mt-1.5 leading-relaxed">
                    Mesa privada con lencería blanca montada directamente sobre la lámina de agua infinita. Cocina de quinoa real, carne de llama confitada y champagne helado en el corazón del silencio blanco.
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center text-olive text-xs font-bold gap-1">
                  <span>Exclusividad Triángulo Andino</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Exp 3 */}
              <div className="bg-white p-5 rounded-lg flex flex-col gap-3 elevation-card border border-chocolate/12">
                <div className="h-44 w-full rounded overflow-hidden relative bg-chocolate">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQHW9-5fs-asyRdXOfnn8HegM_cCHGG0iKvsLgGO_q1mRGDlC8JFjy6lmEJOJW2oJNOMbN4GF3Gx1Yw-vQb6o8mUYKUy7jJVZUP3LlyDVAM8Vb11XAuDMoERVXtK293hDbRISUu8w9yi5aepYyGj0U5G9R6o5SVbtgPevaW3rvgIGeBgO9ZaFSkPuq1zTYUiBgqXFpIaQCpYxYlWsBLBEEIARNmszNgZnVa1Gay0fn8YnGVVW3J3IZ"
                    alt="Degustación de Alturas Andinas"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded bg-chocolate/85 text-white text-[10px] uppercase font-bold tracking-wider">
                    Cusco & Valle Sagrado
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-chocolate">
                    Degustación de alturas andinas
                  </h4>
                  <p className="text-xs text-earth mt-1.5 leading-relaxed">
                    Exploración culinaria de ecosistemas verticales inspirada en el centro de investigación Mater Iniciativa de Virgilio Martínez. Ingredientes recolectados desde el nivel del mar hasta 4.500 metros.
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center text-olive text-xs font-bold gap-1">
                  <span>Mesa prioritaria reservada</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONCIERGE & SAFETY GUARANTEE (CHOCOLATE CARD EMBEDDED) */}
      <section className="w-full bg-canvas py-16">
        <div className="max-w-360 mx-auto px-6 lg:px-12">
          <div className="bg-chocolate text-white rounded-lg p-8 lg:p-12 border border-chocolate/20 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-gold font-bold">
                Asistencia de emergencia & confort 24/7
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                ¿Deseas una ruta inédita o coordinar tu viaje en privado?
              </h3>
              <p className="text-xs sm:text-sm text-stone/90 leading-relaxed">
                Nuestros asesores andinos bilingües y equipo médico de expedición están disponibles para ajustar vuelos locales, permisos de alta montaña y requerimientos de aclimatación.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => onCustomizeAI()}
                className="w-full sm:w-auto px-6 py-3.5 rounded bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>Armar con IA</span>
              </button>

              <button
                type="button"
                onClick={onOpenConcierge}
                className="w-full sm:w-auto px-6 py-3.5 rounded bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-white/20"
              >
                <span className="material-symbols-outlined text-gold text-base">chat</span>
                <span>WhatsApp Concierge 24/7</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
