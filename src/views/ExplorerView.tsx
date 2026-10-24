import React, { useState, useEffect } from 'react';
import { DestinationLookupResult, Package, Currency, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES } from '../data/mockData';

interface ExplorerViewProps {
  language: Language;
  currency: Currency;
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
  onOpenBuilderWithDest: (destId: string) => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  language,
  currency,
  packages,
  onSelectPackage,
  onOpenBuilderWithDest,
}) => {
  const t = TRANSLATIONS[language];
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const [searchQuery, setSearchQuery] = useState('Salar de Uyuni');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DestinationLookupResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const quickPicks = [
    'Salar de Uyuni',
    'San Pedro de Atacama',
    'Machu Picchu',
    'Cusco & Vinicunca',
    'Lago Titicaca',
    'Samaipata',
  ];

  const handleSearch = async (queryToSearch: string) => {
    if (!queryToSearch.trim()) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/gemini/destination-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToSearch, language }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setResult({
          ...json.data,
          sources: json.sources || [],
          mode: json.mode,
        });
      } else {
        setErrorMsg('No pudimos procesar la consulta. Intenta con otro destino.');
      }
    } catch (err: any) {
      console.error('Lookup error:', err);
      setErrorMsg('Error de conexión con el servicio de búsqueda.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch for demo preview
    handleSearch('Salar de Uyuni');
  }, []);

  // Filter packages connected to this destination
  const matchedPackages = packages.filter((p) => {
    if (!result) return true;
    const destLower = result.destinationName.toLowerCase();
    const countryLower = result.country.toLowerCase();
    return (
      p.title.ES.toLowerCase().includes(destLower) ||
      p.tagline.ES.toLowerCase().includes(destLower) ||
      p.country.toLowerCase().includes(countryLower) ||
      p.countriesList.some((c) => countryLower.includes(c.toLowerCase()))
    );
  });

  return (
    <div className="w-full bg-canvas min-h-screen pt-24 pb-20 text-chocolate">
      <div className="max-w-360 mx-auto px-6 lg:px-12 flex flex-col gap-10">
        {/* Header Hero */}
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-olive text-2xl">
              travel_explore
            </span>
            <span className="text-xs uppercase tracking-widest text-terracotta-text font-bold">
              Google Search Grounding Engine
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-chocolate font-medium tracking-tight">
            {t.explorerTitle}
          </h1>
          <p className="text-sm sm:text-base text-earth leading-relaxed">
            {t.explorerSubtitle}
          </p>
        </div>

        {/* Search Bar & Quick Picks */}
        <div className="bg-white p-6 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-earth">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.explorerPlaceholder}
                className="w-full pl-11 pr-4 py-3 rounded bg-stone/20 text-sm text-chocolate placeholder:text-earth/60 border border-outline focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="py-3 px-6 rounded bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">
                    progress_activity
                  </span>
                  <span>Investigando...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  <span>{t.explorerSearchBtn}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-earth uppercase font-bold mr-1">
              Destinos sugeridos:
            </span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                type="button"
                onClick={() => {
                  setSearchQuery(pick);
                  handleSearch(pick);
                }}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all border ${
                  searchQuery === pick
                    ? 'bg-olive text-white border-olive'
                    : 'bg-stone/25 text-chocolate hover:bg-stone/50 border-chocolate/10'
                }`}
              >
                {pick}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div className="bg-white p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded bg-stone/40 flex items-center justify-center text-olive">
              <span className="material-symbols-outlined text-2xl animate-spin">
                satellite_alt
              </span>
            </div>
            <div>
              <h4 className="font-serif text-xl font-semibold text-chocolate">
                Conectando con satélites y Google Search Grounding
              </h4>
              <p className="text-xs text-earth mt-1">
                Extrayendo altitud geométrica, pasos fronterizos en vivo, clima actual y recomendaciones de equipamiento...
              </p>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded">
            {errorMsg}
          </div>
        )}

        {/* Destination Information Display */}
        {result && !isLoading && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* Main Destination Hero Card */}
            <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-chocolate/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-chocolate text-white text-[11px] font-bold uppercase tracking-wider">
                      {result.country}
                    </span>
                    <span className="text-xs text-earth font-semibold">
                      Sugerido: {result.recommendedDays} Días
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-semibold mt-1">
                    {result.destinationName}
                  </h2>
                </div>

                {/* Altitude Pill with Risk Badge */}
                <div className="flex items-center gap-3 bg-stone/25 p-3 rounded border border-chocolate/10">
                  <span className="material-symbols-outlined text-terracotta text-3xl">
                    landscape
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-earth font-bold block">
                      {t.altitudeMsnm}
                    </span>
                    <span className="font-serif text-xl font-bold text-chocolate">
                      {result.altitudeFormatted}
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] text-earth font-semibold">Riesgo:</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          result.altitudeRiskLevel === 'Alto' || result.altitudeRiskLevel === 'Muy Alto'
                            ? 'bg-red-100 text-red-800'
                            : result.altitudeRiskLevel === 'Moderado'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {result.altitudeRiskLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary narrative */}
              <p className="font-serif text-lg sm:text-xl text-chocolate italic leading-relaxed bg-stone/20 p-5 rounded border-l-4 border-olive">
                "{result.summary}"
              </p>

              {/* 4 Bento Panels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Clima */}
                <div className="p-5 rounded bg-stone/25 flex flex-col gap-2 border border-chocolate/8">
                  <div className="flex items-center gap-2 text-chocolate">
                    <span className="material-symbols-outlined text-olive">wb_sunny</span>
                    <h3 className="font-bold text-sm uppercase tracking-wider">
                      {t.climateTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-earth leading-relaxed">
                    {result.climate}
                  </p>
                </div>

                {/* 2. Requisitos de Frontera */}
                <div className="p-5 rounded bg-stone/25 flex flex-col gap-2 border border-chocolate/8">
                  <div className="flex items-center gap-2 text-chocolate">
                    <span className="material-symbols-outlined text-olive">badge</span>
                    <h3 className="font-bold text-sm uppercase tracking-wider">
                      {t.borderRequirementsTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-earth leading-relaxed">
                    {result.borderRequirements}
                  </p>
                </div>

                {/* 3. Qué Llevar en la Maleta */}
                <div className="p-5 rounded bg-stone/25 flex flex-col gap-2 border border-chocolate/8">
                  <div className="flex items-center gap-2 text-chocolate">
                    <span className="material-symbols-outlined text-olive">backpack</span>
                    <h3 className="font-bold text-sm uppercase tracking-wider">
                      {t.whatToPackTitle}
                    </h3>
                  </div>
                  <ul className="grid grid-cols-1 gap-1 text-xs sm:text-sm text-earth">
                    {result.whatToPack.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Aclimatación Médica y Soroche */}
                <div className="p-5 rounded bg-stone/25 flex flex-col gap-2 border border-chocolate/8">
                  <div className="flex items-center gap-2 text-chocolate">
                    <span className="material-symbols-outlined text-olive">medical_services</span>
                    <h3 className="font-bold text-sm uppercase tracking-wider">
                      {t.acclimationAdviceTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-earth leading-relaxed">
                    {result.acclimationAdvice}
                  </p>
                </div>
              </div>

              {/* Atractivos Principales */}
              {result.topAttractions && result.topAttractions.length > 0 && (
                <div className="flex flex-col gap-3 pt-2">
                  <h3 className="font-serif text-xl font-semibold text-chocolate flex items-center gap-2">
                    <span className="material-symbols-outlined text-olive">photo_camera</span>
                    <span>{t.attractionsTitle}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.topAttractions.map((att, i) => (
                      <div
                        key={i}
                        className="p-4 rounded bg-stone/20 border border-chocolate/8 flex flex-col gap-1"
                      >
                        <span className="text-xs font-bold text-terracotta-text">Hito {i + 1}</span>
                        <h4 className="font-semibold text-sm text-chocolate">{att.name}</h4>
                        <p className="text-xs text-earth leading-relaxed mt-1">
                          {att.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grounding Sources Chips */}
              {result.sources && result.sources.length > 0 && (
                <div className="pt-3 border-t border-chocolate/10 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-earth flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-olive">verified</span>
                    Citas web verificadas en tiempo real:
                  </span>
                  {result.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-stone/25 hover:bg-stone/50 text-chocolate font-medium transition-colors flex items-center gap-1 border border-chocolate/10"
                    >
                      <span className="line-clamp-1 max-w-xs">{src.title}</span>
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* CONNECT WITH MATCHING PACKAGES */}
            <div className="flex flex-col gap-5 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-terracotta-text font-bold">
                    Integración con el catálogo
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-chocolate font-semibold">
                    Expediciones disponibles que incluyen este destino
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedPackages.slice(0, 3).map((pkg) => {
                  const convertedPrice = Math.round(pkg.basePriceUSD * rateInfo.rate);
                  return (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-lg elevation-card border border-chocolate/12 overflow-hidden flex flex-col justify-between group transition-all"
                    >
                      {/* Photo Container */}
                      <div className="h-48 w-full relative overflow-hidden bg-stone/20">
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.title[language] || pkg.title.ES}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                        {/* Translucent Country Bar */}
                        <div className="absolute bottom-0 inset-x-0 h-9 bg-chocolate/85 backdrop-blur-sm px-4 flex items-center justify-between text-white text-xs">
                          <span className="font-semibold tracking-wide uppercase text-[11px] truncate">
                            {pkg.country}
                          </span>
                          <span className="text-white/80 font-medium text-[11px]">
                            {pkg.days} Días / {pkg.nights} Noches
                          </span>
                        </div>
                        {/* Top Badges */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded bg-terracotta-strong text-white text-[11px] font-bold tracking-wider uppercase">
                            Circuito oficial
                          </span>
                          <span className="px-2.5 py-1 rounded bg-stone/90 backdrop-blur text-chocolate text-[11px] font-semibold">
                            {pkg.maxAltitudeMeters.toLocaleString()} msnm
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                        <div>
                          <h4 className="font-serif text-lg font-semibold text-chocolate leading-snug">
                            {pkg.title[language] || pkg.title.ES}
                          </h4>
                          <p className="text-xs text-earth line-clamp-2 mt-1 leading-relaxed">
                            {pkg.tagline[language] || pkg.tagline.ES}
                          </p>
                        </div>

                        {/* Card Piedra Footer */}
                        <div className="pt-3 border-t border-chocolate/8 flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-earth block">
                              Desde:
                            </span>
                            <span className="font-serif text-xl font-bold text-chocolate">
                              {rateInfo.symbol}{convertedPrice.toLocaleString()} {currency}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => onSelectPackage(pkg)}
                            className="px-3.5 py-2 rounded bg-olive hover:bg-olive-deep text-white text-xs uppercase tracking-wider font-bold transition-colors"
                          >
                            Ver expedición
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
