import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { BookingReservation } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

interface VoucherModalProps {
  reservation: BookingReservation | null;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ reservation, onClose }) => {
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
          dark: '#0F172A',
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
      className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden border border-black/10 my-8 flex flex-col">
        {/* Top Header Bar */}
        <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container text-2xl">
              verified
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold tracking-tight">
                Voucher Oficial de Expedición
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#bec6e0]">
                Salvoconducto Transfronterizo · Chile, Bolivia & Perú
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
        <div id="printable-voucher" className="p-6 sm:p-8 flex flex-col gap-6 bg-surface">
          {/* Certificate Header Banner */}
          <div className="bg-white p-5 rounded-xl border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1WbI1b3W87j_X4Czfrq3qSnHZF0wTnt1GIRF85bEfzhKv3cRjWGASopjeHsyLz2pcNbx7WfTFNb3ABN8XDB8_XT_rGLd79nHPaVYpeK-j07XU2bq23y2llPC276l6VKKM3rHe_7ePPhzNOCvGByTLcLSvBLaWrl2RQHRRmaJEZtAzDVKsBQu8KSw5KDpX-dpyf0O3O5uEq1rnUM3lgIHTPJdeJLFBoQAVetfawvGJ3P3tjN9tkOBbVTIQ"
                alt="Triángulo Andino Logo"
                className="h-10 w-auto"
              />
              <div>
                <h2 className="font-serif text-2xl font-bold text-on-surface leading-tight">
                  Triángulo Andino Expeditions
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                  Garantía Satelital InReach & Acreditación Triple
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Código Único de Reserva
              </span>
              <span className="font-mono text-lg font-bold text-secondary bg-[#ffdbd0]/40 px-3 py-1 rounded border border-secondary/20">
                {reservation.id}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-green-700 font-bold mt-1">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                Depósito Confirmado (Stripe)
              </span>
            </div>
          </div>

          {/* Core Voucher Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl border border-black/10 shadow-xs">
            {/* Left 2 Cols: Details */}
            <div className="md:col-span-2 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold block mb-1">
                  Expedición Contratada
                </span>
                <h4 className="font-serif text-xl font-bold text-primary leading-snug">
                  {reservation.packageName}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-on-surface-variant block font-medium">Expedicionario Principal:</span>
                  <span className="font-bold text-on-surface text-sm">{reservation.travelerName}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">Fecha de Salida:</span>
                  <span className="font-bold text-on-surface text-sm">{reservation.travelDate}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">Expedicionarios:</span>
                  <span className="font-bold text-on-surface">{reservation.travelersCount} Personas</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">Categoría Hotelera:</span>
                  <span className="font-bold text-secondary uppercase">
                    {reservation.hotelTier === 'none' ? 'Sin Hotel (Solo Tours)' : reservation.hotelTier}
                  </span>
                </div>
              </div>

              {/* Extra Activities included */}
              {reservation.selectedExtras.length > 0 && (
                <div className="pt-2 border-t border-black/5 text-xs">
                  <span className="font-semibold text-on-surface block mb-1">
                    Experiencias Adicionales Incluidas:
                  </span>
                  <ul className="list-disc list-inside text-on-surface-variant space-y-0.5">
                    {reservation.selectedExtras.map((ext) => (
                      <li key={ext.id}>{ext.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Financial Box */}
              <div className="p-3 bg-surface-container-low rounded-lg text-xs space-y-1">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total Expedición:</span>
                  <span className="font-bold text-on-surface">
                    {rateInfo.symbol}{totalConverted.toLocaleString()} {reservation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-secondary font-bold text-sm">
                  <span>Garantía 20% Abonada:</span>
                  <span>
                    {rateInfo.symbol}{depositConverted.toLocaleString()} {reservation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-[#76777d]">
                  <span>Saldo Restante (80%):</span>
                  <span>
                    {rateInfo.symbol}{remainingConverted.toLocaleString()} {reservation.currency} (a pagar 30 días antes)
                  </span>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Official QR Code Stamp */}
            <div className="flex flex-col items-center justify-center p-3 border border-dashed border-primary/20 rounded-lg bg-surface">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code Voucher"
                  className="w-36 h-36 object-contain rounded shadow-xs"
                />
              ) : (
                <div className="w-36 h-36 bg-gray-200 animate-pulse rounded flex items-center justify-center text-xs text-gray-500">
                  Generando QR...
                </div>
              )}
              <span className="text-[10px] text-center uppercase tracking-widest text-on-surface-variant font-bold mt-2">
                Escaneo Oficial en Aduanas y Hoteles
              </span>
              <span className="text-[9px] text-[#76777d] text-center mt-0.5">
                Validador Criptográfico Triángulo Andino
              </span>
            </div>
          </div>

          {/* High Altitude Protocol Notice */}
          <div className="bg-[#131b2e] text-white p-4 rounded-xl text-xs space-y-1 flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary-container text-xl shrink-0 mt-0.5">
              health_and_safety
            </span>
            <div>
              <h5 className="font-bold uppercase tracking-wider text-[#ffdcc3]">
                Protocolo Médico Andino & Cruce de Fronteras
              </h5>
              <p className="text-white/80 leading-relaxed text-[11px]">
                Presentar este salvoconducto digital o impreso ante el guía líder de 4x4 en el punto de encuentro. Incluye oxigenoterapia de cabina, seguro satelital Garmin InReach y tramitación migratoria prioritaria en Hito Cajón (Chile-Bolivia) y Kasani (Bolivia-Perú).
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-white px-6 py-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-2 rounded bg-surface-container hover:bg-[#e0e3e5] text-on-surface text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Imprimir Voucher</span>
            </button>
            <button
              onClick={handleSendWhatsApp}
              type="button"
              className="px-4 py-2 rounded bg-green-700 hover:bg-green-800 text-white text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Enviar a WhatsApp Concierge</span>
            </button>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 rounded bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-bold transition-colors"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};
