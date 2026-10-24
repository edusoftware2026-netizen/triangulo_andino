export type Currency = 'USD' | 'EUR' | 'CLP' | 'PEN';
export type Language = 'ES' | 'EN' | 'PT' | 'FR';

export interface CurrencyRate {
  rate: number;
  symbol: string;
  prefix: string;
}

export type HotelTier = 'none' | '3star' | '4star' | '5star';
export type TravelMode = 'complete' | 'expedition';

export interface DayItinerary {
  day: number | string;
  title: string;
  region?: string;
  description: string;
  desc?: string;
  meals?: string;
  transport?: string;
  altitude?: string;
  altitudeMeters?: number;
  acclimation?: string;
}

export interface SiteBranding {
  heroImageUrl: string;
  heroTag: string;
  heroKicker?: string;
  heroSubtitle: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  conciergePhone: string;
  conciergeDefaultMsg: string;
}

export interface HotelItem {
  id: string;
  name: string;
  region: 'chile' | 'bolivia' | 'peru';
  countryBadge: string;
  subtitle: string;
  description: string;
  comfort: string;
  category: '3star' | '4star' | '5star';
  pricePerNightUSD: number;
  imageUrl: string;
}

export interface RouteDestination {
  id: string;
  name: string;
  country: 'Chile' | 'Bolivia' | 'Perú';
  flag: string;
  altitude: string;
  altitudeMeters: number;
  days: number;
  costUSD: number;
  tag: string;
  imageUrl: string;
}

export interface Package {
  id: string;
  title: {
    ES: string;
    EN: string;
    PT: string;
    FR: string;
  };
  tagline: {
    ES: string;
    EN: string;
    PT: string;
    FR: string;
  };
  country: string;
  countriesList: string[];
  days: number;
  nights: number;
  maxAltitudeMeters: number;
  difficulty: 'Suave' | 'Media' | 'Moderada' | 'Exigente';
  basePriceUSD: number; // Base tour price per person
  hotelCostUSD: {
    none: number;
    '3star': number;
    '4star': number;
    '5star': number;
  };
  logisticsCostUSD: number; // Transfers 4x4
  ticketsCostUSD: number; // Machu Picchu / Parks
  imageUrl: string;
  images?: string[]; // Dynamic photo gallery (CMS managed)
  highlights: string[];
  itinerary: DayItinerary[];
  recommendedHotels: {
    name: string;
    category: string;
    description: string;
  }[];
  isCustomAI?: boolean;
}

export interface DestinationLookupResult {
  destinationName: string;
  country: string;
  altitudeMeters: number;
  altitudeFormatted: string;
  climate: string;
  whatToPack: string[];
  borderRequirements: string;
  topAttractions: {
    name: string;
    description: string;
  }[];
  altitudeRiskLevel: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  acclimationAdvice: string;
  recommendedDays: number;
  summary: string;
  sources?: {
    title: string;
    url: string;
  }[];
  mode?: string;
}

export interface ExtraActivity {
  id: string;
  name: string;
  priceUSD: number;
  description: string;
  duration: string;
  selected?: boolean;
}

export interface BookingReservation {
  id: string;
  packageId: string;
  packageName: string;
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  travelDate: string;
  travelersCount: number;
  hotelTier: HotelTier;
  travelMode: TravelMode;
  selectedExtras: ExtraActivity[];
  currency: Currency;
  
  // Financial breakdown
  baseTourPerPaxUSD: number;
  hotelPerPaxUSD: number;
  transfersPerPaxUSD: number;
  extrasTotalUSD: number;
  totalPerPaxUSD: number;
  totalGroupUSD: number;
  depositAmountUSD: number; // 20%
  
  // Agency Profitability (30% tour margin, 20% hotel margin, 30% transfers margin)
  estimatedProfitUSD: number;
  
  // Status and Voucher
  paymentStatus: 'paid_deposit' | 'paid_full' | 'pending';
  paymentMethod: 'stripe_mock' | 'transfer' | 'crypto';
  stripePaymentId?: string;
  createdAt: string;
  qrCodeDataUrl?: string;
}

export interface AdminKPIs {
  totalRevenueUSD: number;
  netAgencyProfitUSD: number;
  paidReservationsCount: number;
  topDestination: string;
}
