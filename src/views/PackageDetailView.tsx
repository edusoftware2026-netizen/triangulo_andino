import React, { useState } from 'react';
import { Package, Currency, Language, HotelTier, TravelMode, ExtraActivity } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES, AVAILABLE_EXTRAS } from '../data/mockData';

interface PackageDetailViewProps {
  packageItem: Package;
  language: Language;
  currency: Currency;
  onBack: () => void;
  onOpenCheckout: (
    pkg: Package,
    travelers: number,
    tier: HotelTier,
    mode: TravelMode,
    selectedExtras: ExtraActivity[]
  ) => void;
  onOpenConcierge: () => void;
}

export const PackageDetailView: React.FC<PackageDetailViewProps> = ({
  packageItem,
  language,
  currency,
  onBack,
  onOpenCheckout,
  onOpenConcierge,
}) => {
  const t = TRANSLATIONS[language];
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  // Quotation State
  const [travelers, setTravelers] = useState<number>(2);
  const [hotelTier, setHotelTier] = useState<HotelTier>('5star');
  const [travelMode, setTravelMode] = useState<TravelMode>('complete');
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>(['extra-astro']);

  const toggleExtra = (id: string) => {
    if (selectedExtraIds.includes(id)) {
      setSelectedExtraIds(selectedExtraIds.filter((e) => e !== id));
    } else {
      setSelectedExtraIds([...selectedExtraIds, id]);
    }
  };

  // Real-time calculation formula
  // (Precio Base Tour + Categoría de Hotel 3★/4★/5★ o Sin Hotel + Traslados + Actividades Extra) * Número de Viajeros
  const baseTourUSD = packageItem.basePriceUSD;
  const hotelUSD = travelMode === 'expedition' ? 0 : packageItem.hotelCostUSD[hotelTier] || 0;
  const transfersUSD = packageItem.logisticsCostUSD;
  const activeExtras = AVAILABLE_EXTRAS.filter((e) => selectedExtraIds.includes(e.id));
  const extrasUSD = activeExtras.reduce((sum, item) => sum + item.priceUSD, 0);

  const pricePerPersonUSD = baseTourUSD + hotelUSD + transfersUSD + extrasUSD;
  const totalGroupUSD = pricePerPersonUSD * travelers;
  const depositAmountUSD = Math.round(totalGroupUSD * 0.20);
  const remainingAmountUSD = totalGroupUSD - depositAmountUSD;

  // Estimated agency profit (30% tour margin, 20% hotel margin, 30% transfers margin, 25% extras margin)
  const estimatedProfitUSD = Math.round(
    (baseTourUSD * 0.30 + hotelUSD * 0.20 + transfersUSD * 0.30 + extrasUSD * 0.25) * travelers
  );

  const pricePerPersonConverted = Math.round(pricePerPersonUSD * rateInfo.rate);
  const totalGroupConverted = Math.round(totalGroupUSD * rateInfo.rate);
  const depositConverted = Math.round(depositAmountUSD * rateInfo.rate);
  const remainingConverted = Math.round(remainingAmountUSD * rateInfo.rate);

  return (
    <div className="w-full bg-canvas min-h-screen pt-24 pb-20 text-chocolate">
      <div className="max-w-360 mx-auto px-6 lg:px-12 flex flex-col gap-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-earth">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-terracotta-text transition-colors flex items-center gap-1 font-semibold"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{t.backToCatalog}</span>
          </button>
          <span className="text-chocolate/20">/</span>
          <span className="text-chocolate font-medium">{packageItem.country}</span>
          <span className="text-chocolate/20">/</span>
          <span className="text-terracotta-text font-semibold truncate max-w-xs">
            {packageItem.title[language] || packageItem.title.ES}
          </span>
        </div>

        {/* Main Header Hero */}
        <div className="relative w-full rounded-lg overflow-hidden elevation-card border border-chocolate/12 min-h-[380px] flex items-end p-6 sm:p-10 text-white">
          <img
            src={packageItem.imageUrl}
            alt={packageItem.title[language] || packageItem.title.ES}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-chocolate via-chocolate/65 to-transparent" />

          <div className="relative z-10 max-w-4xl flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-chocolate/85 backdrop-blur text-white text-xs uppercase font-bold tracking-wider border border-white/10">
                {packageItem.country}
              </span>
              <span className="px-3 py-1 rounded bg-terracotta-strong text-white text-xs font-bold uppercase tracking-wider">
                {packageItem.days} {language === 'EN' ? 'Days' : language === 'FR' ? 'Jours' : language === 'PT' ? 'Dias' : 'Días'} / {packageItem.nights} {language === 'EN' ? 'Nights' : language === 'FR' ? 'Nuits' : language === 'PT' ? 'Noites' : 'Noches'}
              </span>
              <span className="px-3 py-1 rounded bg-white/20 backdrop-blur text-white text-xs font-semibold">
                {t.maxAltitudeMetersLabel}: {packageItem.maxAltitudeMeters.toLocaleString()} msnm
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
              {packageItem.title[language] || packageItem.title.ES}
            </h1>
            <p className="text-sm sm:text-base text-stone/90 leading-relaxed max-w-2xl">
              {packageItem.tagline[language] || packageItem.tagline.ES}
            </p>
          </div>
        </div>

        {/* Two-Column Grid: Details Left, Quotation & Booking Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Inclusions, Itinerary & Hotels */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Highlights Box */}
            <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-4">
              <h2 className="font-serif text-2xl font-semibold text-chocolate flex items-center gap-2">
                <span className="material-symbols-outlined text-olive">verified</span>
                <span>{t.highEndInclusions}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {packageItem.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded bg-stone/25 border border-chocolate/8 text-xs text-chocolate">
                    <span className="material-symbols-outlined text-olive text-base shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Day-by-Day Itinerary */}
            <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-chocolate/10">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-chocolate">
                    {t.itineraryDaysTitle}
                  </h2>
                  <p className="text-xs text-earth mt-1">
                    {t.acclimationNotice}
                  </p>
                </div>
                <span className="material-symbols-outlined text-olive text-2xl">
                  timeline
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {packageItem.itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded bg-stone/25 border border-chocolate/8 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-terracotta-text uppercase tracking-wider">
                        {day.day}
                      </span>
                      <span className="text-[11px] text-earth font-semibold">
                        {day.region}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-chocolate">
                      {day.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-earth leading-relaxed">
                      {day.description}
                    </p>
                    {(day.meals || day.transport) && (
                      <div className="pt-2 border-t border-chocolate/8 flex flex-wrap gap-4 text-xs font-semibold text-chocolate">
                        {day.meals && <span>{t.mealsLabel}: {day.meals}</span>}
                        {day.transport && <span>{t.transportLabel}: {day.transport}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Luxury Lodges */}
            {packageItem.recommendedHotels && packageItem.recommendedHotels.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-4">
                <h3 className="font-serif text-2xl font-semibold text-chocolate flex items-center gap-2">
                  <span className="material-symbols-outlined text-olive">hotel</span>
                  <span>{t.selectedHotelsForCircuit}</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {packageItem.recommendedHotels.map((h, i) => (
                    <div key={i} className="p-4 rounded bg-stone/25 border border-chocolate/8 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-chocolate">{h.name}</h4>
                        <span className="text-xs font-bold text-terracotta-text">{h.category}</span>
                      </div>
                      <p className="text-xs text-earth leading-relaxed">{h.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Dynamic Quotation & Real-Time Booking Widget */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <div className="bg-white p-6 sm:p-8 rounded-lg elevation-card border border-chocolate/12 flex flex-col gap-6">
              <div className="pb-4 border-b border-chocolate/10">
                <span className="text-[10px] uppercase tracking-widest text-terracotta-text font-bold block">
                  {t.realTimeQuoter}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-chocolate mt-1">
                  {t.configureExpedition}
                </h3>
              </div>

              {/* 1. Número de Expedicionarios */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-chocolate flex justify-between">
                  <span>{t.expeditionersLabel}:</span>
                  <span className="text-terracotta-text font-serif text-base">{travelers} {t.personsUnit}</span>
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-10 h-10 rounded bg-stone/30 hover:bg-stone text-lg font-bold text-chocolate transition-colors flex items-center justify-center border border-chocolate/12"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center font-serif text-xl font-bold bg-stone/20 py-1.5 rounded border border-chocolate/12">
                    {travelers}
                  </div>
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.min(8, travelers + 1))}
                    className="w-10 h-10 rounded bg-stone/30 hover:bg-stone text-lg font-bold text-chocolate transition-colors flex items-center justify-center border border-chocolate/12"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 2. Modalidad de Viaje */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-chocolate">
                  {t.travelMode}
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setTravelMode('complete')}
                    className={`p-2.5 rounded text-left text-xs font-bold transition-all border ${
                      travelMode === 'complete'
                        ? 'bg-chocolate text-white border-chocolate'
                        : 'bg-stone/30 text-earth border-chocolate/10 hover:bg-stone/50'
                    }`}
                  >
                    {t.completePackage}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTravelMode('expedition')}
                    className={`p-2.5 rounded text-left text-xs font-bold transition-all border ${
                      travelMode === 'expedition'
                        ? 'bg-chocolate text-white border-chocolate'
                        : 'bg-stone/30 text-earth border-chocolate/10 hover:bg-stone/50'
                    }`}
                  >
                    {t.expeditionOnly}
                  </button>
                </div>
              </div>

              {/* 3. Categoría Hotelera (si completa) */}
              {travelMode === 'complete' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-chocolate">
                    {t.accommodationCategory}
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setHotelTier('3star')}
                      className={`p-2 rounded text-center text-xs font-bold transition-all border ${
                        hotelTier === '3star'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-stone/30 text-earth border-chocolate/10 hover:bg-stone/50'
                      }`}
                    >
                      {t.comfortTier}
                    </button>
                    <button
                      type="button"
                      onClick={() => setHotelTier('4star')}
                      className={`p-2 rounded text-center text-xs font-bold transition-all border ${
                        hotelTier === '4star'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-stone/30 text-earth border-chocolate/10 hover:bg-stone/50'
                      }`}
                    >
                      {t.boutiqueTier}
                    </button>
                    <button
                      type="button"
                      onClick={() => setHotelTier('5star')}
                      className={`p-2 rounded text-center text-xs font-bold transition-all border ${
                        hotelTier === '5star'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-stone/30 text-earth border-chocolate/10 hover:bg-stone/50'
                      }`}
                    >
                      {t.luxuryTier}
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Actividades Extra / Upgrades */}
              <div className="flex flex-col gap-2 pt-2 border-t border-chocolate/10">
                <label className="text-xs font-bold uppercase tracking-wider text-chocolate">
                  {t.extraExperiences}
                </label>
                <div className="flex flex-col gap-2">
                  {AVAILABLE_EXTRAS.map((extra) => {
                    const isSelected = selectedExtraIds.includes(extra.id);
                    const convertedExtra = Math.round(extra.priceUSD * rateInfo.rate);
                    return (
                      <label
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-3 rounded border text-xs cursor-pointer flex items-start gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-stone/40 border-olive/40 ring-1 ring-olive/20'
                            : 'bg-stone/20 border-chocolate/8 hover:bg-stone/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-0.5 w-4 h-4 accent-olive cursor-pointer shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between font-semibold text-chocolate">
                            <span>{extra.name}</span>
                            <span className="text-terracotta-text font-bold">
                              +{rateInfo.symbol}{convertedExtra} {currency}
                            </span>
                          </div>
                          <p className="text-[11px] text-earth mt-0.5">{extra.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Financial Calculation Box */}
              <div className="p-4 bg-stone/25 rounded border border-chocolate/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-earth font-bold block">
                      {t.pricePerTraveler}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-serif text-3xl font-bold text-chocolate">
                        {rateInfo.symbol}{pricePerPersonConverted.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-earth">{currency}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-earth block font-semibold">
                      {t.totalGroupLabel} ({travelers} pax):
                    </span>
                    <span className="font-serif text-xl font-bold text-terracotta-text">
                      {rateInfo.symbol}{totalGroupConverted.toLocaleString()} {currency}
                    </span>
                  </div>
                </div>

                {/* Formula Breakdown Details */}
                <div className="flex flex-col gap-1 text-[11px] text-earth pt-2 border-t border-chocolate/10">
                  <div className="flex justify-between">
                    <span>{t.baseTour}:</span>
                    <span>{rateInfo.symbol}{Math.round(baseTourUSD * rateInfo.rate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.hotelCategory} ({hotelTier}):</span>
                    <span>{rateInfo.symbol}{Math.round(hotelUSD * rateInfo.rate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.transfersLogistics}:</span>
                    <span>{rateInfo.symbol}{Math.round(transfersUSD * rateInfo.rate).toLocaleString()}</span>
                  </div>
                  {extrasUSD > 0 && (
                    <div className="flex justify-between text-terracotta-text">
                      <span>{t.extraActivities}:</span>
                      <span>+{rateInfo.symbol}{Math.round(extrasUSD * rateInfo.rate).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-chocolate pt-1 border-t border-chocolate/10">
                    <span>{t.reservationGuarantee}:</span>
                    <span>{rateInfo.symbol}{depositConverted.toLocaleString()} {currency}</span>
                  </div>
                </div>
              </div>

              {/* Profitability Transparency Metric */}
              <div className="p-3 bg-stone/40 rounded border border-chocolate/12 text-xs flex items-center justify-between text-chocolate">
                <div className="flex items-center gap-1.5 font-semibold text-earth">
                  <span className="material-symbols-outlined text-sm text-gold-text">analytics</span>
                  <span>{t.estimatedAgencyMargin}:</span>
                </div>
                <span className="font-mono font-bold text-chocolate">
                  ${estimatedProfitUSD.toLocaleString()} USD
                </span>
              </div>

              {/* Booking Actions */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onOpenCheckout(
                      packageItem,
                      travelers,
                      hotelTier,
                      travelMode,
                      activeExtras
                    )
                  }
                  className="w-full py-3.5 px-4 rounded bg-olive hover:bg-olive-deep text-white text-xs uppercase tracking-wider font-bold transition-colors elevation-card flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">credit_card</span>
                  <span>{t.btnBookGuarantee}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenConcierge}
                  className="w-full py-2.5 px-4 rounded bg-stone/30 hover:bg-stone/60 text-chocolate text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 border border-chocolate/12"
                >
                  <span className="material-symbols-outlined text-olive text-base">chat</span>
                  <span>{t.consultConcierge247}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
