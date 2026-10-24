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
    { id: 'home', label: 'Explorar Paquetes', icon: 'explore' },
    { id: 'builder', label: '✨ Armador IA', icon: 'auto_awesome', highlight: true },
    { id: 'explorer', label: 'Guía IA', icon: 'travel_explore' },
    { id: 'admin', label: 'Admin', icon: 'query_stats' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/8 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        {/* SINGLE ELEGANT LOGO WITH GOLDEN MOUNTAIN ICON */}
        <button
          type="button"
          onClick={() => {
            setCurrentView('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
        >
          {/* Minimalist Golden Mountain Emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 border border-amber-500/30">
            <svg
              className="w-6 h-6 text-[#d97706]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 6l6 12H4L9.5 8.5 12 12l2-6z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] leading-none group-hover:text-[#c2410c] transition-colors whitespace-nowrap">
              Triángulo Andino
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#76777d] font-bold mt-1 whitespace-nowrap">
              Chile · Bolivia · Perú
            </span>
          </div>
        </button>

        {/* CENTRAL CLEAR NAVIGATION MENU (SINGLE-LINE WHITESPACE-NOWRAP) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : item.highlight
                    ? 'text-[#c2410c] hover:bg-orange-50 font-extrabold'
                    : 'text-[#45464d] hover:text-[#0F172A] hover:bg-gray-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: LANGUAGE, CURRENCY & CONCIERGE */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#f2f4f6] px-1 py-1 rounded-lg text-xs border border-black/5">
            {(['ES', 'EN', 'PT', 'FR'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold uppercase transition-all ${
                  language === lang
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#45464d] hover:text-[#0F172A]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center bg-[#f2f4f6] px-2 py-1 rounded-lg text-xs font-bold border border-black/5">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label="Moneda"
              className="bg-transparent text-[#0F172A] focus:outline-none cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="CLP">CLP ($)</option>
              <option value="PEN">PEN (S/)</option>
            </select>
          </div>

          {/* Concierge Action Button */}
          <button
            type="button"
            onClick={onOpenConcierge}
            className="hidden lg:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs uppercase tracking-wider font-bold transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>Concierge 24/7</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú de navegación"
            className="md:hidden p-2 rounded-lg text-[#0F172A] hover:bg-gray-100 focus:outline-none"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/10 px-6 py-4 flex flex-col gap-2 shadow-lg animate-fade-in">
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
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#191c1e] hover:bg-gray-100'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-sm text-[#c2410c]">
                  arrow_forward
                </span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-black/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#45464d]">Moneda activa:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-[#f2f4f6] px-2 py-1 rounded text-xs font-bold text-[#0F172A]"
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
            className="w-full mt-2 py-3 rounded-xl bg-[#c2410c] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>Hablar con Concierge 24/7</span>
          </button>
        </div>
      )}
    </header>
  );
};
