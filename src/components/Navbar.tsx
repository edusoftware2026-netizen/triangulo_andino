import React, { useState } from 'react';
import { Currency, Language } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  language,
  setLanguage,
  currency,
  setCurrency,
  onOpenConcierge,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Explorar paquetes', icon: 'explore' },
    { id: 'builder', label: '✨ Armador IA', icon: 'auto_awesome', highlight: true },
    { id: 'explorer', label: 'Guía de destinos', icon: 'travel_explore' },
    { id: 'admin', label: 'Panel admin', icon: 'query_stats' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-chocolate/12 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        {/* SINGLE ELEGANT LOGO WITH GOLDEN MOUNTAIN ICON (ANDEAN VANGUARD) */}
        <button
          type="button"
          onClick={() => {
            setCurrentView('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left group focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 rounded shrink-0"
        >
          {/* Mountain in Gold over Chocolate box */}
          <div className="w-10 h-10 rounded bg-chocolate flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 border border-gold/40">
            <svg
              className="w-6 h-6 text-gold"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 6l6 12H4L9.5 8.5 12 12l2-6z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-chocolate leading-none group-hover:text-olive transition-colors whitespace-nowrap">
              Triángulo Andino
            </span>
            <span className="text-[10px] uppercase tracking-widest text-earth font-bold mt-1 whitespace-nowrap">
              Chile · Bolivia · Perú
            </span>
          </div>
        </button>

        {/* CENTRAL CLEAR NAVIGATION MENU (EDITORIAL SENTENCE STYLE WITH OLIVE UNDERLINE) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-2 text-xs tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border-b-2 rounded-t font-semibold ${
                  isActive
                    ? 'border-olive text-chocolate font-bold bg-stone/40'
                    : item.highlight
                    ? 'border-transparent text-terracotta-text font-bold hover:text-terracotta-strong hover:bg-stone/30'
                    : 'border-transparent text-earth hover:text-chocolate hover:bg-stone/20'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: LANGUAGE, CURRENCY & CONCIERGE */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher in Stone Container */}
          <div className="flex items-center bg-stone px-1 py-1 rounded text-xs border border-chocolate/10">
            {(['ES', 'EN', 'PT', 'FR'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold uppercase transition-all ${
                  language === lang
                    ? 'bg-white text-chocolate shadow-xs border border-chocolate/10'
                    : 'text-earth hover:text-chocolate'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Currency Switcher in Stone Container */}
          <div className="hidden sm:flex items-center bg-stone px-2 py-1 rounded text-xs font-bold border border-chocolate/10">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label="Moneda"
              className="bg-transparent text-chocolate focus:outline-none cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="CLP">CLP ($)</option>
              <option value="PEN">PEN (S/)</option>
            </select>
          </div>

          {/* Concierge Action Button (Oliva, radio 4px) */}
          <button
            type="button"
            onClick={onOpenConcierge}
            className="hidden lg:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-olive hover:bg-olive-deep text-white text-xs uppercase tracking-wider font-bold transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>Concierge 24/7</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú de navegación"
            className="md:hidden p-2 rounded text-chocolate hover:bg-stone/50 focus:outline-none"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU DRAWER (LINO CANVAS WITH 48PX ROWS) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-canvas border-b border-chocolate/12 px-6 py-4 flex flex-col gap-2 shadow-lg animate-fade-in">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded text-sm font-bold flex items-center justify-between min-h-[48px] ${
                  isActive
                    ? 'bg-stone text-chocolate border-l-4 border-olive'
                    : 'text-chocolate hover:bg-stone/40'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-sm text-olive">
                  arrow_forward
                </span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-chocolate/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-earth">Moneda activa:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-stone px-2 py-1 rounded text-xs font-bold text-chocolate border border-chocolate/10"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="CLP">CLP ($)</option>
              <option value="PEN">PEN (S/)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              onOpenConcierge();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-3 rounded bg-olive hover:bg-olive-deep text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>Hablar con Concierge 24/7</span>
          </button>
        </div>
      )}
    </header>
  );
};
