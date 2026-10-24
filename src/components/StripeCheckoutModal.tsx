import React, { useState } from 'react';
import { Package, HotelTier, TravelMode, ExtraActivity, Currency, BookingReservation } from '../types';
import { CURRENCY_RATES, addReservation } from '../data/mockData';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageItem: Package;
  travelers: number;
  hotelTier: HotelTier;
  travelMode: TravelMode;
  selectedExtras: ExtraActivity[];
  currency: Currency;
  onSuccess: (reservation: BookingReservation) => void;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  isOpen,
  onClose,
  packageItem,
  travelers,
  hotelTier,
  travelMode,
  selectedExtras,
  currency,
  onSuccess,
}) => {
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('+56 9 ');
  const [travelDate, setTravelDate] = useState('2025-06-15');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Rate info
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  // Pricing calculations
  const baseTourUSD = packageItem.basePriceUSD;
  const hotelUSD = travelMode === 'expedition' ? 0 : packageItem.hotelCostUSD[hotelTier] || 0;
  const transfersUSD = packageItem.logisticsCostUSD;
  const extrasUSD = selectedExtras.reduce((acc, curr) => acc + curr.priceUSD, 0);

  const pricePerPaxUSD = baseTourUSD + hotelUSD + transfersUSD + extrasUSD;
  const totalGroupUSD = pricePerPaxUSD * travelers;
  const depositUSD = Math.round(totalGroupUSD * 0.20);
  const remainingUSD = totalGroupUSD - depositUSD;

  // Agency margin calculation (30% tour, 20% hotel, 30% transfers)
  const estimatedProfitUSD = Math.round(
    (baseTourUSD * 0.30 + hotelUSD * 0.20 + transfersUSD * 0.30 + extrasUSD * 0.25) * travelers
  );

  const depositConverted = Math.round(depositUSD * rateInfo.rate);
  const totalConverted = Math.round(totalGroupUSD * rateInfo.rate);
  const remainingConverted = Math.round(remainingUSD * rateInfo.rate);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newReservation: BookingReservation = {
        id: `ANDINO-${Math.floor(100000 + Math.random() * 900000)}`,
        packageId: packageItem.id,
        packageName: packageItem.title.ES,
        travelerName: leadName || 'Expedicionario Principal',
        travelerEmail: leadEmail || 'pasajero@privado.com',
        travelerPhone: leadPhone || '+56982349900',
        travelDate: travelDate,
        travelersCount: travelers,
        hotelTier: hotelTier,
        travelMode: travelMode,
        selectedExtras: selectedExtras,
        currency: currency,
        baseTourPerPaxUSD: baseTourUSD,
        hotelPerPaxUSD: hotelUSD,
        transfersPerPaxUSD: transfersUSD,
        extrasTotalUSD: extrasUSD,
        totalPerPaxUSD: pricePerPaxUSD,
        totalGroupUSD: totalGroupUSD,
        depositAmountUSD: depositUSD,
        estimatedProfitUSD: estimatedProfitUSD,
        paymentStatus: 'paid_deposit',
        paymentMethod: 'stripe_mock',
        stripePaymentId: `pi_mock_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      // Persist to localStorage
      addReservation(newReservation);
      onSuccess(newReservation);
    }, 1800);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 bg-chocolate/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white max-w-xl w-full rounded-lg elevation-modal overflow-hidden border border-chocolate/12 my-6 animate-fade-in text-chocolate">
        {/* Stripe Header */}
        <div className="bg-chocolate text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gold text-2xl">
              lock
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold tracking-tight">
                  Pago seguro con Stripe
                </h3>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] tracking-wider uppercase font-semibold text-gold">
                  256-bit SSL
                </span>
              </div>
              <p className="text-xs text-stone/80 mt-0.5">
                Garantía de expedición (20% de depósito inicial)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Cerrar ventana"
            className="text-white/70 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Financial Summary Strip */}
        <div className="bg-stone/30 p-4 px-6 border-b border-chocolate/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-earth uppercase font-semibold block">
              Monto a pagar ahora (20% depósito):
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-terracotta-text">
                {rateInfo.symbol}{depositConverted.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-earth">{currency}</span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-earth block">Total expedición ({travelers} pax):</span>
            <span className="font-bold text-chocolate">
              {rateInfo.symbol}{totalConverted.toLocaleString()} {currency}
            </span>
            <span className="text-[10px] text-earth/80 block mt-0.5">
              Saldo restante: {rateInfo.symbol}{remainingConverted.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handlePay} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-chocolate block mb-1">
                Expedicionario principal *
              </label>
              <input
                type="text"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Ej: Dr. Alejandro Valenzuela"
                className="w-full px-3 py-2.5 rounded bg-canvas border border-outline text-xs text-chocolate placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-chocolate block mb-1">
                Correo electrónico *
              </label>
              <input
                type="email"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="pasajero@privado.com"
                className="w-full px-3 py-2.5 rounded bg-canvas border border-outline text-xs text-chocolate placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-chocolate block mb-1">
                WhatsApp satelital *
              </label>
              <input
                type="tel"
                required
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="+56 9 8234 9900"
                className="w-full px-3 py-2.5 rounded bg-canvas border border-outline text-xs text-chocolate placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-chocolate block mb-1">
                Fecha estimada de salida *
              </label>
              <input
                type="date"
                required
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-canvas border border-outline text-xs text-chocolate focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              />
            </div>
          </div>

          {/* Stripe Card Element Box */}
          <div className="mt-2 p-4 rounded bg-stone/25 border border-chocolate/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-earth flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-olive">credit_card</span>
                Datos de tarjeta (Stripe Elements Sandbox)
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-chocolate bg-stone/50 px-1.5 py-0.5 rounded">VISA</span>
                <span className="text-[10px] font-bold text-chocolate bg-stone/50 px-1.5 py-0.5 rounded">MC</span>
                <span className="text-[10px] font-bold text-chocolate bg-stone/50 px-1.5 py-0.5 rounded">AMEX</span>
              </div>
            </div>

            <div>
              <input
                type="text"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white border border-outline text-xs font-mono font-semibold text-chocolate focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM / AA"
                  className="w-full px-3 py-2 rounded bg-white border border-outline text-xs font-mono text-center font-semibold text-chocolate focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  placeholder="CVC"
                  className="w-full px-3 py-2 rounded bg-white border border-outline text-xs font-mono text-center font-semibold text-chocolate focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
                />
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="flex items-center justify-between text-[11px] text-earth pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-olive text-sm">check_circle</span>
              Sin cargos ocultos
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-olive text-sm">security</span>
              Garantía Sernatur #7482
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-olive text-sm">cached</span>
              Reprogramable por soroche
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-6 rounded bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 elevation-card flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-base">
                  progress_activity
                </span>
                <span>Autorizando con Stripe...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">lock</span>
                <span>
                  Confirmar reserva ({rateInfo.symbol}{depositConverted.toLocaleString()} {currency})
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
