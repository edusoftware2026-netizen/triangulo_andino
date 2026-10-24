import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { BookingReservation, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES } from '../data/mockData';

interface VoucherModalProps {
  reservation: BookingReservation | null;
  onClose: () => void;
  language?: Language;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ reservation, onClose, language = 'ES' }) => {
  const t = TRANSLATIONS[language || 'ES'];
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (reservation) {
      const payload = JSON.stringify({
        voucherId: reservation.id,
        leadTraveler: reservation.travelerName,
        package: reservation.packageName,
        travelDate: reservation.travelDate,
        travelers: reservation.travelersCount,
        status: reservation.paymentStatus,
        depositUSD: reservation.depositAmountUSD,
        totalUSD: reservation.totalGroupUSD,
        agencySeal: 'TRIANGULO-ANDINO-VALIDATED-EXPEDITION'
      });

      QRCode.toDataURL(payload, {
        width: 220,
        margin: 2,
        color: {
          dark: '#3E322C',
          light: '#FFFFFF'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Error generating QR code:', err));
    }
  }, [reservation]);

  if (!reservation) return null;

  const rateInfo = CURRENCY_RATES[reservation.currency] || CURRENCY_RATES.USD;
  const totalConverted = Math.round(reservation.totalGroupUSD * rateInfo.rate);
  const depositConverted = Math.round(reservation.depositAmountUSD * rateInfo.rate);
  const remainingConverted = totalConverted - depositConverted;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola Triángulo Andino! Confirmo mi expedición reservada.\n` +
      `*Voucher ID:* ${reservation.id}\n` +
      `*Expedicionario Principal:* ${reservation.travelerName}\n` +
      `*Circuito:* ${reservation.packageName}\n` +
      `*Fecha de Salida:* ${reservation.travelDate}\n` +
      `*Viajeros:* ${reservation.travelersCount} pax\n` +
      `*Garantía Pagada:* ${rateInfo.symbol}${depositConverted.toLocaleString()} ${reservation.currency}\n` +
      `Solicito conexión con el Concierge de guardia.`
    );
    window.open(`https://wa.me/56982349900?text=${text}`, '_blank');
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 bg-chocolate/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white max-w-2xl w-full rounded-lg elevation-modal overflow-hidden border border-chocolate/12 my-8 flex flex-col text-chocolate">
        {/* Top Header Bar */}
        <div className="bg-chocolate text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gold text-2xl">
              verified
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold tracking-tight">
                {t.officialVoucherTitle}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-stone/80">
                {t.crossBorderSafeConduct}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Printable Certificate Body */}
        <div id="printable-voucher" className="p-6 sm:p-8 flex flex-col gap-6 bg-canvas">
          {/* Certificate Header Banner */}
          <div className="bg-white p-5 rounded border border-chocolate/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-chocolate flex items-center justify-center text-gold font-serif font-bold text-lg shadow-xs">
                ▲
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-chocolate leading-tight">
                  Triángulo Andino Expeditions
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta-text">
                  Garantía satelital InReach & acreditación triple
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end">
              <span className="text-[10px] uppercase tracking-wider text-earth font-semibold">
                {t.uniqueBookingCode}
              </span>
              <span className="font-mono text-lg font-bold text-terracotta-text bg-stone/30 px-3 py-1 rounded border border-chocolate/10">
                {reservation.id}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-olive font-bold mt-1">
                <span className="w-2 h-2 rounded-full bg-olive"></span>
                {t.depositConfirmed}
              </span>
            </div>
          </div>

          {/* Core Voucher Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded border border-chocolate/10">
            {/* Left 2 Cols: Details */}
            <div className="md:col-span-2 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-earth font-bold block mb-1">
                  {t.contractedExpedition}
                </span>
                <h4 className="font-serif text-xl font-bold text-chocolate leading-snug">
                  {reservation.packageName}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-earth block font-medium">{t.leadTraveler}:</span>
                  <span className="font-bold text-chocolate text-sm">{reservation.travelerName}</span>
                </div>
                <div>
                  <span className="text-earth block font-medium">{t.travelDate}:</span>
                  <span className="font-bold text-chocolate text-sm">{reservation.travelDate}</span>
                </div>
                <div>
                  <span className="text-earth block font-medium">{t.expeditionersLabel}:</span>
                  <span className="font-bold text-chocolate">{reservation.travelersCount} {t.personsUnit}</span>
                </div>
                <div>
                  <span className="text-earth block font-medium">{t.hotelCategory}:</span>
                  <span className="font-bold text-terracotta-text uppercase">
                    {reservation.hotelTier === 'none' ? t.expeditionOnly : reservation.hotelTier}
                  </span>
                </div>
              </div>

              {/* Extra Activities included */}
              {reservation.selectedExtras.length > 0 && (
                <div className="pt-2 border-t border-chocolate/8 text-xs">
                  <span className="font-semibold text-chocolate block mb-1">
                    {t.includedExtrasTitle}
                  </span>
                  <ul className="list-disc list-inside text-earth space-y-0.5">
                    {reservation.selectedExtras.map((ext) => (
                      <li key={ext.id}>{ext.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Financial Box */}
              <div className="p-3 bg-stone/25 rounded text-xs space-y-1 border border-chocolate/8">
                <div className="flex justify-between text-earth">
                  <span>{t.totalGroupLabel}:</span>
                  <span className="font-bold text-chocolate">
                    {rateInfo.symbol}{totalConverted.toLocaleString()} {reservation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-terracotta-text font-bold text-sm">
                  <span>{t.guaranteeDeposit}:</span>
                  <span>
                    {rateInfo.symbol}{depositConverted.toLocaleString()} {reservation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-earth/80">
                  <span>{t.remainingBalanceLabel}:</span>
                  <span>
                    {rateInfo.symbol}{remainingConverted.toLocaleString()} {reservation.currency} {language === 'EN' ? '(payable 30 days prior)' : language === 'FR' ? '(à payer 30 jours avant)' : language === 'PT' ? '(a pagar 30 dias antes)' : '(a pagar 30 días antes)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Official QR Code Stamp */}
            <div className="flex flex-col items-center justify-center p-3 border border-dashed border-chocolate/20 rounded bg-canvas">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code Voucher"
                  className="w-36 h-36 object-contain rounded"
                />
              ) : (
                <div className="w-36 h-36 bg-stone/30 animate-pulse rounded flex items-center justify-center text-xs text-earth">
                  Generando QR...
                </div>
              )}
              <span className="text-[10px] text-center uppercase tracking-widest text-chocolate font-bold mt-2">
                {t.officialScanAdmissions}
              </span>
              <span className="text-[9px] text-earth text-center mt-0.5">
                {t.cryptoValidator}
              </span>
            </div>
          </div>

          {/* High Altitude Protocol Notice */}
          <div className="bg-stone/30 text-chocolate p-4 rounded text-xs space-y-1 flex items-start gap-3 border border-chocolate/10">
            <span className="material-symbols-outlined text-olive text-xl shrink-0 mt-0.5">
              health_and_safety
            </span>
            <div>
              <h5 className="font-bold uppercase tracking-wider text-chocolate">
                {t.medicalProtocolHeading}
              </h5>
              <p className="text-earth leading-relaxed text-[11px]">
                {t.medicalProtocolText}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-white px-6 py-4 border-t border-chocolate/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-2 rounded bg-stone/25 hover:bg-stone/50 text-chocolate text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 border border-chocolate/10"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>{t.printVoucher}</span>
            </button>
            <button
              onClick={handleSendWhatsApp}
              type="button"
              className="px-4 py-2 rounded bg-olive hover:bg-olive-deep text-white text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>{t.sendToConcierge}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 rounded bg-chocolate hover:bg-chocolate/85 text-white text-xs uppercase tracking-wider font-bold transition-colors"
          >
            {t.finalizeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
