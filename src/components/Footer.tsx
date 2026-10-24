import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenConcierge: () => void;
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenConcierge, language = 'ES' }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.ES;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  return (
    <footer className="w-full bg-stone/30 pt-16 pb-12 border-t border-chocolate/12 mt-auto text-chocolate">
      <div className="max-w-360 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-chocolate/12">
          {/* Brand Info & Accreditations */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-chocolate flex items-center justify-center border border-gold/40 shadow-xs">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 6l6 12H4L9.5 8.5 12 12l2-6z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-chocolate">
                Triángulo Andino
              </span>
            </div>
            <p className="text-sm text-earth max-w-sm leading-relaxed">
              {t.footerMission}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2 py-1 rounded bg-stone text-[11px] uppercase tracking-wider text-earth font-semibold border border-chocolate/10">
                Sernatur Chile #7482
              </span>
              <span className="px-2 py-1 rounded bg-stone text-[11px] uppercase tracking-wider text-earth font-semibold border border-chocolate/10">
                Viceministerio Bolivia
              </span>
              <span className="px-2 py-1 rounded bg-stone text-[11px] uppercase tracking-wider text-earth font-semibold border border-chocolate/10">
                Dircetur Perú
              </span>
            </div>
          </div>

          {/* Quick Routes Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-chocolate">
              {t.footerSignatureRoutes}
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCurrentView('home')}
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
              >
                Travesía Salar & Atacama
              </button>
              <button
                onClick={() => setCurrentView('builder')}
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
              >
                Gran Circuito Tres Naciones
              </button>
              <button
                onClick={() => setCurrentView('explorer')}
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
              >
                Enciclopedia IA de destinos
              </button>
              <button
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => {
                    document.getElementById('hotels-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
              >
                Refugios de altura & lodges
              </button>
            </div>
          </div>

          {/* Tech & Data */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-chocolate">
              {t.footerTechData}
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCurrentView('builder')}
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
              >
                Smart Route Engine (Gemini)
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
              >
                Panel de auditoría & KPIs
              </button>
              <button
                onClick={() => setCurrentView('explorer')}
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
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
                className="text-sm text-earth hover:text-chocolate hover:underline transition-colors text-left"
              >
                Arquitectura dual full-stack
              </a>
            </div>
          </div>

          {/* Direct Concierge Line & Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-chocolate">
              {t.footerConciergeSupport}
            </h4>
            <p className="text-sm text-earth">
              {t.footerConciergeDesc}
            </p>
            <div
              onClick={onOpenConcierge}
              className="flex items-center gap-3 p-3.5 rounded bg-white border border-chocolate/12 cursor-pointer hover:bg-stone/40 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-olive text-2xl">
                support_agent
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-earth font-bold">
                  {language === 'EN' ? 'Direct Satellite Line' : language === 'FR' ? 'Ligne Satellite Directe' : language === 'PT' ? 'Linha Satélite Direta' : 'Línea directa satelital'}
                </p>
                <p className="text-sm font-semibold text-chocolate">
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
                placeholder={t.footerSubscribePlaceholder}
                className="w-full px-3 py-2.5 rounded bg-white text-xs text-chocolate placeholder:text-earth/70 border border-outline focus:outline-none focus:ring-2 focus:ring-olive"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded bg-olive hover:bg-olive-deep text-white text-xs uppercase tracking-wider font-bold transition-colors shrink-0 shadow-xs"
              >
                {subscribed ? t.footerSubscribedMsg : t.footerSubscribeBtn}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth">
          <p className="tracking-wider uppercase text-[11px]">
            {t.footerRights}
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-chocolate cursor-pointer transition-colors">
              {language === 'EN' ? 'Privacy & Andean protocol' : language === 'FR' ? 'Confidentialité & protocole andin' : language === 'PT' ? 'Privacidade & protocolo andino' : 'Privacidad y protocolo andino'}
            </span>
            <span>·</span>
            <span className="hover:text-chocolate cursor-pointer transition-colors">
              {language === 'EN' ? 'Expedition terms' : language === 'FR' ? 'Conditions d\'expédition' : language === 'PT' ? 'Termos de expedição' : 'Términos de expedición'}
            </span>
            <span>·</span>
            <span className="hover:text-chocolate cursor-pointer transition-colors">
              {language === 'EN' ? 'Cancellation policy' : language === 'FR' ? 'Politique d\'annulation' : language === 'PT' ? 'Políticas de cancelamento' : 'Políticas de cancelación'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
