import React, { useState } from 'react';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenConcierge }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  return (
    <footer className="w-full bg-white shadow-[0_-1px_12px_rgba(0,0,0,0.03)] pt-16 pb-12 border-t border-black/5 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-black/5">
          {/* Brand Info & Accreditations */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Triángulo Andino Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WbI1b3W87j_X4Czfrq3qSnHZF0wTnt1GIRF85bEfzhKv3cRjWGASopjeHsyLz2pcNbx7WfTFNb3ABN8XDB8_XT_rGLd79nHPaVYpeK-j07XU2bq23y2llPC276l6VKKM3rHe_7ePPhzNOCvGByTLcLSvBLaWrl2RQHRRmaJEZtAzDVKsBQu8KSw5KDpX-dpyf0O3O5uEq1rnUM3lgIHTPJdeJLFBoQAVetfawvGJ3P3tjN9tkOBbVTIQ"
              />
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#191c1e]">
                Triángulo Andino
              </span>
            </div>
            <p className="text-sm text-[#45464d] max-w-sm leading-relaxed">
              Pioneros en expediciones de alta gama a través del Altiplano, Atacama y los Andes Centrales. Uniendo Chile, Bolivia y Perú con sofisticación arquitectónica, trazabilidad satelital y rigor de servicio.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2 py-1 rounded bg-[#eceef0] text-[11px] uppercase tracking-wider text-[#45464d] font-semibold">
                Sernatur Chile #7482
              </span>
              <span className="px-2 py-1 rounded bg-[#eceef0] text-[11px] uppercase tracking-wider text-[#45464d] font-semibold">
                Viceministerio Bolivia
              </span>
              <span className="px-2 py-1 rounded bg-[#eceef0] text-[11px] uppercase tracking-wider text-[#45464d] font-semibold">
                Dircetur Perú
              </span>
            </div>
          </div>

          {/* Quick Routes Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191c1e]">
              Rutas Magistrales
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCurrentView('home')}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Travesía Salar & Atacama
              </button>
              <button
                onClick={() => setCurrentView('builder')}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Gran Circuito Tres Naciones
              </button>
              <button
                onClick={() => setCurrentView('explorer')}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Enciclopedia IA de Destinos
              </button>
              <button
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => {
                    document.getElementById('hotels-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Refugios de Altura & Lodges
              </button>
            </div>
          </div>

          {/* Tech & API */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191c1e]">
              Tecnología & Datos
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCurrentView('builder')}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Smart Route Engine (Gemini)
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Panel de Auditoría & KPIs
              </button>
              <button
                onClick={() => setCurrentView('explorer')}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Google Search Grounding
              </button>
              <a
                href="#code-architecture"
                onClick={() => {
                  setCurrentView('builder');
                  setTimeout(() => {
                    document.getElementById('architecture-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="text-sm text-[#45464d] hover:text-[#ac3400] transition-colors text-left"
              >
                Arquitectura Dual Full-Stack
              </a>
            </div>
          </div>

          {/* Direct Concierge Line & Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#191c1e]">
              Asistencia Concierge Ininterrumpida
            </h4>
            <p className="text-sm text-[#45464d]">
              Soporte logístico por satélite Garmin InReach y enlace prioritario WhatsApp 24/7 para expedicionarios en ruta.
            </p>
            <div
              onClick={onOpenConcierge}
              className="flex items-center gap-3 p-3 rounded bg-[#f2f4f6] cursor-pointer hover:bg-[#e6e8ea] transition-colors"
            >
              <span className="material-symbols-outlined text-[#ac3400] text-2xl">
                support_agent
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#45464d] font-bold">
                  Línea Directa Satelital
                </p>
                <p className="text-sm font-semibold text-[#191c1e]">
                  +56 9 8234 9900 · +591 2 244 8900
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-1">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Correo corporativo o privado..."
                className="w-full px-3 py-2 rounded bg-[#f2f4f6] text-xs text-[#191c1e] placeholder:text-[#76777d] border border-black/5 focus:outline-none focus:ring-1 focus:ring-[#ac3400]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#0F172A] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#ac3400] transition-colors shrink-0"
              >
                {subscribed ? '¡Suscrito!' : 'Suscribir'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#76777d]">
          <p className="tracking-wider uppercase">
            © 2025 Triángulo Andino Expeditions SAC / Ltda. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#191c1e] cursor-pointer transition-colors">
              Privacidad y Protocolo Andino
            </span>
            <span>·</span>
            <span className="hover:text-[#191c1e] cursor-pointer transition-colors">
              Términos de Expedición
            </span>
            <span>·</span>
            <span className="hover:text-[#191c1e] cursor-pointer transition-colors">
              Políticas de Cancelación
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
