import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {
  Package,
  Currency,
  Language,
  HotelTier,
  TravelMode,
  ExtraActivity,
  BookingReservation,
  SiteBranding,
  HotelItem,
  RouteDestination,
} from './types';
import {
  getStoredPackages,
  saveStoredPackages,
  getStoredReservations,
  getStoredBranding,
  saveStoredBranding,
  getStoredHotels,
  saveStoredHotels,
  getStoredDestinations,
  saveStoredDestinations,
  resetAllToFactoryDefaults,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { RouteBuilderView } from './views/RouteBuilderView';
import { ExplorerView } from './views/ExplorerView';
import { PackageDetailView } from './views/PackageDetailView';
import { AdminView } from './views/AdminView';
import { StripeCheckoutModal } from './components/StripeCheckoutModal';
import { VoucherModal } from './components/VoucherModal';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('ES');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Stored dynamic CMS state (Persisted in localStorage, ready for Firebase Firestore)
  const [packages, setPackages] = useState<Package[]>(() => getStoredPackages());
  const [reservations, setReservations] = useState<BookingReservation[]>(() => getStoredReservations());
  const [siteBranding, setSiteBranding] = useState<SiteBranding>(() => getStoredBranding());
  const [hotelsList, setHotelsList] = useState<HotelItem[]>(() => getStoredHotels());
  const [destinations, setDestinations] = useState<RouteDestination[]>(() => getStoredDestinations());

  // Navigation targets
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0] || null);
  const [builderInitialDest, setBuilderInitialDest] = useState<string>('');

  // Modals state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutTargetPackage, setCheckoutTargetPackage] = useState<Package>(packages[0]);
  const [checkoutTravelers, setCheckoutTravelers] = useState<number>(2);
  const [checkoutTier, setCheckoutTier] = useState<HotelTier>('5star');
  const [checkoutMode, setCheckoutMode] = useState<TravelMode>('complete');
  const [checkoutExtras, setCheckoutExtras] = useState<ExtraActivity[]>([]);

  // Voucher modal state
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [activeVoucherReservation, setActiveVoucherReservation] = useState<BookingReservation | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).lenis;
    };
  }, []);

  // Pause Lenis scrolling when modals are open
  useEffect(() => {
    if (checkoutModalOpen || voucherModalOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [checkoutModalOpen, voucherModalOpen]);

  // Sync with browser URL / hash for /admin direct access
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === 'admin' || path === '/admin') {
        setCurrentView('admin');
      } else if (hash === 'builder' || hash === 'armador') {
        setCurrentView('builder');
      } else if (hash === 'explorer' || hash === 'enciclopedia') {
        setCurrentView('explorer');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Scroll to top on view changes with Lenis
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  // CMS State Updater Handlers with localStorage persistence
  const handleUpdateBranding = (newBranding: SiteBranding) => {
    setSiteBranding(newBranding);
    saveStoredBranding(newBranding);
  };

  const handleUpdateHotels = (newHotels: HotelItem[]) => {
    setHotelsList(newHotels);
    saveStoredHotels(newHotels);
  };

  const handleUpdateDestinations = (newDests: RouteDestination[]) => {
    setDestinations(newDests);
    saveStoredDestinations(newDests);
  };

  const handleFactoryReset = () => {
    resetAllToFactoryDefaults();
    setPackages(getStoredPackages());
    setReservations(getStoredReservations());
    setSiteBranding(getStoredBranding());
    setHotelsList(getStoredHotels());
    setDestinations(getStoredDestinations());
  };

  // User Actions
  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentView('detail');
  };

  const handleCustomizeAI = (pkg?: Package) => {
    if (pkg) {
      setSelectedPackage(pkg);
    }
    setCurrentView('builder');
  };

  const handleOpenBuilderWithDest = (destId: string) => {
    setBuilderInitialDest(destId);
    setCurrentView('builder');
  };

  const handleOpenCheckout = (
    pkg: Package,
    travelers: number,
    tier: HotelTier,
    mode: TravelMode,
    selectedExtras: ExtraActivity[] = []
  ) => {
    setCheckoutTargetPackage(pkg);
    setCheckoutTravelers(travelers);
    setCheckoutTier(tier);
    setCheckoutMode(mode);
    setCheckoutExtras(selectedExtras);
    setCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = (newRes: BookingReservation) => {
    setReservations((prev) => [newRes, ...prev]);
    setCheckoutModalOpen(false);
    setActiveVoucherReservation(newRes);
    setVoucherModalOpen(true);
  };

  const handleViewVoucher = (res: BookingReservation) => {
    setActiveVoucherReservation(res);
    setVoucherModalOpen(true);
  };

  const handleOpenConcierge = () => {
    const phone = siteBranding.conciergePhone || '56982349900';
    const msg = encodeURIComponent(
      siteBranding.conciergeDefaultMsg ||
        'Hola DeiTaNa Travel. Me gustaría consultar una expedición privada por Chile, Bolivia y Perú.'
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-chocolate selection:bg-terracotta selection:text-white">
      {/* Universal Fixed Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HomeView
            packages={packages}
            language={language}
            currency={currency}
            setCurrency={setCurrency}
            onSelectPackage={handleSelectPackage}
            onCustomizeAI={handleCustomizeAI}
            onOpenConcierge={handleOpenConcierge}
            siteBranding={siteBranding}
            hotelsList={hotelsList}
            homeDestinations={destinations}
          />
        )}

        {currentView === 'builder' && (
          <RouteBuilderView
            language={language}
            currency={currency}
            setLanguage={setLanguage}
            setCurrency={setCurrency}
            onOpenCheckout={(pkg, travelers, tier, mode) =>
              handleOpenCheckout(pkg, travelers, tier, mode, [])
            }
            onOpenConcierge={handleOpenConcierge}
            initialSelectedDest={builderInitialDest}
          />
        )}

        {currentView === 'explorer' && (
          <ExplorerView
            language={language}
            currency={currency}
            packages={packages}
            onSelectPackage={handleSelectPackage}
            onOpenBuilderWithDest={handleOpenBuilderWithDest}
          />
        )}

        {currentView === 'detail' && selectedPackage && (
          <PackageDetailView
            packageItem={selectedPackage}
            language={language}
            currency={currency}
            onBack={() => setCurrentView('home')}
            onOpenCheckout={handleOpenCheckout}
            onOpenConcierge={handleOpenConcierge}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            reservations={reservations}
            packages={packages}
            setPackages={setPackages}
            siteBranding={siteBranding}
            onUpdateBranding={handleUpdateBranding}
            hotelsList={hotelsList}
            onUpdateHotels={handleUpdateHotels}
            destinations={destinations}
            onUpdateDestinations={handleUpdateDestinations}
            onFactoryReset={handleFactoryReset}
            onNavigateHome={() => setCurrentView('home')}
            language={language}
            onViewVoucher={handleViewVoucher}
            onViewPackage={handleSelectPackage}
          />
        )}
      </main>

      {/* Stripe Checkout Simulation Modal */}
      <StripeCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        packageItem={checkoutTargetPackage}
        travelers={checkoutTravelers}
        hotelTier={checkoutTier}
        travelMode={checkoutMode}
        selectedExtras={checkoutExtras}
        currency={currency}
        language={language}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Official Voucher with QR Modal */}
      {voucherModalOpen && activeVoucherReservation && (
        <VoucherModal
          reservation={activeVoucherReservation}
          language={language}
          onClose={() => setVoucherModalOpen(false)}
        />
      )}

      {/* Global Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenConcierge={handleOpenConcierge}
        language={language}
      />
    </div>
  );
}
