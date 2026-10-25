import { Currency, Package, ExtraActivity, BookingReservation, SiteBranding, HotelItem, RouteDestination } from '../types';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: string }> = {
  USD: { rate: 1, symbol: '$', prefix: 'USD' },
  EUR: { rate: 0.92, symbol: '€', prefix: 'EUR' },
  CLP: { rate: 960, symbol: '$', prefix: 'CLP' },
  PEN: { rate: 3.78, symbol: 'S/', prefix: 'PEN' },
};

export interface MediaAssetItem {
  id: string;
  country: 'Chile' | 'Bolivia' | 'Perú';
  type: 'photo' | 'video';
  title: string;
  landmark: string;
  pageUrl: string;
  directUrl: string;
}

export interface CountryMediaCollection {
  photos: MediaAssetItem[];
  videos: MediaAssetItem[];
}

/**
 * Convierte automáticamente enlaces de páginas de Pexels o Unsplash en URLs directas de CDN
 * para que cualquier link pegado desde el Panel Admin (/admin) se renderice en etiquetas <img>.
 */
export function normalizeMediaUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  // Permitir imágenes subidas desde el ordenador en el Panel Admin (Base64)
  if (trimmed.startsWith('data:image/') || trimmed.startsWith('data:video/') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Si el usuario pega una URL de página de foto de Pexels (ej. https://www.pexels.com/photo/...-33047883/)
  const pexelsPhotoMatch = trimmed.match(/pexels\.com\/(?:[a-z]{2}-[a-z]{2}\/)?photo\/(?:.*-)?(\d+)\/?/i);
  if (pexelsPhotoMatch && pexelsPhotoMatch[1]) {
    const id = pexelsPhotoMatch[1];
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  }

  // Si el usuario pega una URL de página de foto de Unsplash (ej. https://unsplash.com/photos/night-sky-llg7GwrWxw0)
  const unsplashPageMatch = trimmed.match(/^https?:\/\/(?:www\.)?unsplash\.com\/photos\/(?:.*-)?([a-zA-Z0-9_-]{11})\/?(?:\?.*)?$/i);
  if (unsplashPageMatch && unsplashPageMatch[1]) {
    const id = unsplashPageMatch[1];
    return `https://unsplash.com/photos/${id}/download?w=1600`;
  }

  return trimmed;
}

/**
 * Catálogo curado de 30 Fotos (10 por país) y 15 Videos (5 por país) libres de derechos
 * para Chile, Bolivia y Perú según los circuitos de Triángulo Andino.
 */
export const DEFAULT_COUNTRY_MEDIA: Record<'chile' | 'bolivia' | 'peru', CountryMediaCollection> = {
  chile: {
    photos: [
      {
        id: 'cl-photo-01',
        country: 'Chile',
        type: 'photo',
        title: 'Stunning Aerial View of Valle de la Luna, Chile',
        landmark: 'Valle de la Luna · San Pedro de Atacama',
        pageUrl: 'https://www.pexels.com/photo/stunning-aerial-view-of-valle-de-la-luna-chile-33047883/',
        directUrl: 'https://images.pexels.com/photos/33047883/pexels-photo-33047883.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'cl-photo-02',
        country: 'Chile',
        type: 'photo',
        title: 'El Tatio Geysers Expansive Blue Sky View',
        landmark: 'Géiseres del Tatio · 4.320 msnm',
        pageUrl: 'https://www.pexels.com/photo/el-tatio-geysers-expansive-blue-sky-view-32453922/',
        directUrl: 'https://images.pexels.com/photos/32453922/pexels-photo-32453922.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'cl-photo-03',
        country: 'Chile',
        type: 'photo',
        title: 'Scenic View of Laguna Miscanti in Chile\'s Atacama Desert',
        landmark: 'Lagunas Altiplánicas Miscanti y Miñiques',
        pageUrl: 'https://www.pexels.com/photo/scenic-view-of-laguna-miscanti-in-chile-s-atacama-desert-28858627/',
        directUrl: 'https://images.pexels.com/photos/28858627/pexels-photo-28858627.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'cl-photo-04',
        country: 'Chile',
        type: 'photo',
        title: 'Stunning Salt Flats in San Pedro de Atacama',
        landmark: 'Salar de Atacama & Lagunas Cejar',
        pageUrl: 'https://www.pexels.com/photo/stunning-salt-flats-in-san-pedro-de-atacama-30807414/',
        directUrl: 'https://images.pexels.com/photos/30807414/pexels-photo-30807414.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'cl-photo-05',
        country: 'Chile',
        type: 'photo',
        title: 'Night Sky — Milky Way in San Pedro de Atacama',
        landmark: 'Astrofotografía Nocturna · Cielo Bortle 1',
        pageUrl: 'https://unsplash.com/photos/night-sky-llg7GwrWxw0',
        directUrl: 'https://unsplash.com/photos/llg7GwrWxw0/download?w=1600',
      },
      {
        id: 'cl-photo-06',
        country: 'Chile',
        type: 'photo',
        title: 'Scenic Sunset Over Atacama Desert Landscape',
        landmark: 'Dunas y Cordillera de la Sal al Atardecer',
        pageUrl: 'https://www.pexels.com/photo/scenic-sunset-over-atacama-desert-landscape-32654432/',
        directUrl: 'https://images.pexels.com/photos/32654432/pexels-photo-32654432.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'cl-photo-07',
        country: 'Chile',
        type: 'photo',
        title: 'Vista Superior del Valle de la Luna',
        landmark: 'Mirador Valle de la Luna · Atacama',
        pageUrl: 'https://unsplash.com/photos/a-view-of-a-mountain-range-from-a-distance-i58kW6kuxww',
        directUrl: 'https://unsplash.com/photos/i58kW6kuxww/download?w=1600',
      },
      {
        id: 'cl-photo-08',
        country: 'Chile',
        type: 'photo',
        title: 'Altiplano Road Around San Pedro de Atacama',
        landmark: 'Ruta Altiplánica hacia Paso Hito Cajón',
        pageUrl: 'https://unsplash.com/photos/brown-road-during-day-time-N8fapqDIc-4',
        directUrl: 'https://unsplash.com/photos/N8fapqDIc-4/download?w=1600',
      },
      {
        id: 'cl-photo-09',
        country: 'Chile',
        type: 'photo',
        title: 'Majestic View of Atacama Desert in Chile',
        landmark: 'Oasis de San Pedro de Atacama · 2.400 msnm',
        pageUrl: 'https://www.pexels.com/photo/majestic-view-of-atacama-desert-in-chile-31767228/',
        directUrl: 'https://images.pexels.com/photos/31767228/pexels-photo-31767228.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'cl-photo-10',
        country: 'Chile',
        type: 'photo',
        title: 'Altiplano Volcanoes & Geothermal Valley in Atacama',
        landmark: 'Estepa Altiplánica y Volcán Licancabur',
        pageUrl: 'https://unsplash.com/photos/brown-grass-on-brown-soil-during-day-time-612hZnDoDE4',
        directUrl: 'https://unsplash.com/photos/612hZnDoDE4/download?w=1600',
      },
    ],
    videos: [
      {
        id: 'cl-video-01',
        country: 'Chile',
        type: 'video',
        title: 'Breathtaking Aerial View of Atacama Desert at Sunset',
        landmark: 'Atardecer Aéreo y Volcanes en Atacama',
        pageUrl: 'https://www.pexels.com/video/breathtaking-aerial-view-of-atacama-desert-40449624/',
        directUrl: 'https://www.pexels.com/video/breathtaking-aerial-view-of-atacama-desert-40449624/',
      },
      {
        id: 'cl-video-02',
        country: 'Chile',
        type: 'video',
        title: 'Majestic Drone View of Atacama Desert Canyon',
        landmark: 'Cañones de Arcilla Roja en San Pedro de Atacama',
        pageUrl: 'https://www.pexels.com/video/majestic-drone-view-of-atacama-desert-canyon-35410039/',
        directUrl: 'https://www.pexels.com/video/majestic-drone-view-of-atacama-desert-canyon-35410039/',
      },
      {
        id: 'cl-video-03',
        country: 'Chile',
        type: 'video',
        title: 'Drone View of Atacama Desert\'s Majestic Rock Formations',
        landmark: 'Formaciones Rocosas del Valle de la Luna',
        pageUrl: 'https://www.pexels.com/video/drone-view-of-atacama-desert-s-majestic-rock-formations-36134424/',
        directUrl: 'https://www.pexels.com/video/drone-view-of-atacama-desert-s-majestic-rock-formations-36134424/',
      },
      {
        id: 'cl-video-04',
        country: 'Chile',
        type: 'video',
        title: 'Aerial View of Desert Road in Atacama, Chile',
        landmark: 'Travesía 4x4 por el Altiplano de Atacama',
        pageUrl: 'https://www.pexels.com/video/aerial-view-of-desert-road-in-atacama-chile-38506071/',
        directUrl: 'https://www.pexels.com/video/aerial-view-of-desert-road-in-atacama-chile-38506071/',
      },
      {
        id: 'cl-video-05',
        country: 'Chile',
        type: 'video',
        title: 'Stunning Drone View of Atacama Desert & Snow-Capped Andes',
        landmark: 'Cordillera de los Andes sobre el Desierto de Atacama',
        pageUrl: 'https://www.pexels.com/video/stunning-drone-view-of-atacama-desert-33655180/',
        directUrl: 'https://www.pexels.com/video/stunning-drone-view-of-atacama-desert-33655180/',
      },
    ],
  },
  bolivia: {
    photos: [
      {
        id: 'bo-photo-01',
        country: 'Bolivia',
        type: 'photo',
        title: 'Flamingos at Laguna Colorada in Bolivia\'s Altiplano',
        landmark: 'Laguna Colorada · Reserva Eduardo Avaroa',
        pageUrl: 'https://www.pexels.com/photo/flamingos-at-laguna-colorada-in-bolivia-s-altiplano-30998364/',
        directUrl: 'https://images.pexels.com/photos/30998364/pexels-photo-30998364.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'bo-photo-02',
        country: 'Bolivia',
        type: 'photo',
        title: 'Breathtaking Uyuni Salt Flats with Reflective Mountains',
        landmark: 'Gran Salar de Uyuni · 3.656 msnm',
        pageUrl: 'https://www.pexels.com/photo/breathtaking-uyuni-salt-flats-with-reflective-mountains-30929532/',
        directUrl: 'https://images.pexels.com/photos/30929532/pexels-photo-30929532.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'bo-photo-03',
        country: 'Bolivia',
        type: 'photo',
        title: 'Stunning Reflections at Salar de Uyuni, Bolivia',
        landmark: 'Espejo de Sal al Atardecer · Uyuni',
        pageUrl: 'https://www.pexels.com/photo/stunning-reflections-at-salar-de-uyuni-bolivia-30929499/',
        directUrl: 'https://images.pexels.com/photos/30929499/pexels-photo-30929499.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'bo-photo-04',
        country: 'Bolivia',
        type: 'photo',
        title: 'Endless Mirror Effect on the Salt Flats of Uyuni',
        landmark: 'Caminata sobre las Nubes · Salar de Uyuni',
        pageUrl: 'https://unsplash.com/photos/man-and-woman-walking-on-clouds-d4jDdMjPeNs',
        directUrl: 'https://unsplash.com/photos/d4jDdMjPeNs/download?w=1600',
      },
      {
        id: 'bo-photo-05',
        country: 'Bolivia',
        type: 'photo',
        title: 'Salar de Uyuni Hexagonal Salt Crust in Bolivia',
        landmark: 'Hexágonos de Sal Cristalina · Colchani',
        pageUrl: 'https://unsplash.com/photos/salar-de-uyuni-in-bolivia-cFPTHl6s5uY',
        directUrl: 'https://unsplash.com/photos/cFPTHl6s5uY/download?w=1600',
      },
      {
        id: 'bo-photo-06',
        country: 'Bolivia',
        type: 'photo',
        title: 'Rocky Outcrop in the Middle of the Uyuni Salt Desert',
        landmark: 'Isla Incahuasi · Salar de Uyuni',
        pageUrl: 'https://unsplash.com/photos/a-vast-expanse-of-rocks-in-the-middle-of-a-desert-GQOdS7pGLWQ',
        directUrl: 'https://unsplash.com/photos/GQOdS7pGLWQ/download?w=1600',
      },
      {
        id: 'bo-photo-07',
        country: 'Bolivia',
        type: 'photo',
        title: 'Expansive Plain of the Uyuni Salt Flats with Mountains',
        landmark: 'Horizonte Blanco del Altiplano Boliviano',
        pageUrl: 'https://unsplash.com/photos/a-large-open-plain-with-mountains-in-the-distance-ls_pYTMfZ0g',
        directUrl: 'https://unsplash.com/photos/ls_pYTMfZ0g/download?w=1600',
      },
      {
        id: 'bo-photo-08',
        country: 'Bolivia',
        type: 'photo',
        title: 'Flock of Flamingos in the Natural Reserves of Uyuni',
        landmark: 'Lagunas Altoandinas · Ruta Siloli',
        pageUrl: 'https://unsplash.com/photos/flock-of-birds-on-body-of-water-during-daytime-RHd1D38KvN0',
        directUrl: 'https://unsplash.com/photos/RHd1D38KvN0/download?w=1600',
      },
      {
        id: 'bo-photo-09',
        country: 'Bolivia',
        type: 'photo',
        title: 'Scenic Lake View with Floating Houses in Copacabana',
        landmark: 'Lago Titicaca & Copacabana · 3.812 msnm',
        pageUrl: 'https://www.pexels.com/photo/scenic-lake-view-with-floating-houses-in-copacabana-34213410/',
        directUrl: 'https://images.pexels.com/photos/34213410/pexels-photo-34213410.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'bo-photo-10',
        country: 'Bolivia',
        type: 'photo',
        title: 'Snow-Covered Andes Mountains in La Paz, Bolivia',
        landmark: 'Cordillera Real & Nevado Illimani · La Paz',
        pageUrl: 'https://www.pexels.com/photo/snow-covered-andes-mountains-in-la-paz-bolivia-39696079/',
        directUrl: 'https://images.pexels.com/photos/39696079/pexels-photo-39696079.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    videos: [
      {
        id: 'bo-video-01',
        country: 'Bolivia',
        type: 'video',
        title: 'Drone Footage of SUV Crossing Uyuni Salt Flats',
        landmark: 'Expedición 4x4 Privada en el Salar de Uyuni',
        pageUrl: 'https://www.pexels.com/video/drone-footage-of-suv-crossing-uyuni-salt-flats-36539751/',
        directUrl: 'https://www.pexels.com/video/drone-footage-of-suv-crossing-uyuni-salt-flats-36539751/',
      },
      {
        id: 'bo-video-02',
        country: 'Bolivia',
        type: 'video',
        title: 'The Salt Flats of Salar de Uyuni, Bolivia at Sunset',
        landmark: 'Reflejos de Agua al Atardecer en Uyuni',
        pageUrl: 'https://www.pexels.com/video/the-salt-flats-of-salar-de-uyuni-bolivia-20466816/',
        directUrl: 'https://www.pexels.com/video/the-salt-flats-of-salar-de-uyuni-bolivia-20466816/',
      },
      {
        id: 'bo-video-03',
        country: 'Bolivia',
        type: 'video',
        title: 'Drone View of Expansive Uyuni Salt Flats, Bolivia',
        landmark: 'Inmensidad Aérea del Desierto de Sal de Uyuni',
        pageUrl: 'https://www.pexels.com/video/drone-view-of-expansive-uyuni-salt-flats-bolivia-39377055/',
        directUrl: 'https://www.pexels.com/video/drone-view-of-expansive-uyuni-salt-flats-bolivia-39377055/',
      },
      {
        id: 'bo-video-04',
        country: 'Bolivia',
        type: 'video',
        title: 'Drone View of Salar de Uyuni with Colorful Flags',
        landmark: 'Monumento de Banderas & Hotel de Sal en Colchani',
        pageUrl: 'https://www.pexels.com/video/drone-view-of-salar-de-uyuni-with-colorful-flags-35094831/',
        directUrl: 'https://www.pexels.com/video/drone-view-of-salar-de-uyuni-with-colorful-flags-35094831/',
      },
      {
        id: 'bo-video-05',
        country: 'Bolivia',
        type: 'video',
        title: 'Stunning Aerial View of La Paz Cityscape',
        landmark: 'La Paz Bohemia y Laderas Andinas · 3.640 msnm',
        pageUrl: 'https://www.pexels.com/video/stunning-aerial-view-of-la-paz-cityscape-37195939/',
        directUrl: 'https://www.pexels.com/video/stunning-aerial-view-of-la-paz-cityscape-37195939/',
      },
    ],
  },
  peru: {
    photos: [
      {
        id: 'pe-photo-01',
        country: 'Perú',
        type: 'photo',
        title: 'Breathtaking View of Machu Picchu in Cusco, Peru',
        landmark: 'Santuario Histórico de Machu Picchu · 2.430 msnm',
        pageUrl: 'https://www.pexels.com/photo/breathtaking-view-of-machu-picchu-in-cusco-peru-31746177/',
        directUrl: 'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-02',
        country: 'Perú',
        type: 'photo',
        title: 'Scenic View of Machu Picchu Terraces and Mountains',
        landmark: 'Andenes Agrícolas y Arquitectura Lítica Inca',
        pageUrl: 'https://www.pexels.com/photo/scenic-view-of-machu-picchu-terraces-and-mountains-29964217/',
        directUrl: 'https://images.pexels.com/photos/29964217/pexels-photo-29964217.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-03',
        country: 'Perú',
        type: 'photo',
        title: 'Scenic View of Ollantaytambo in Sacred Valley',
        landmark: 'Fortaleza de Ollantaytambo · Valle Sagrado',
        pageUrl: 'https://www.pexels.com/photo/scenic-view-of-ollantaytambo-in-sacred-valley-32620257/',
        directUrl: 'https://images.pexels.com/photos/32620257/pexels-photo-32620257.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-04',
        country: 'Perú',
        type: 'photo',
        title: 'Aerial View of Incan Terraces in Moray, Peru',
        landmark: 'Terrazas Concéntricas de Moray · Valle Sagrado',
        pageUrl: 'https://www.pexels.com/photo/aerial-view-of-incan-terraces-in-moray-peru-36609489/',
        directUrl: 'https://images.pexels.com/photos/36609489/pexels-photo-36609489.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-05',
        country: 'Perú',
        type: 'photo',
        title: 'Cascading Maras Salt Mines in Sacred Valley, Peru',
        landmark: 'Salineras de Maras · Urubamba',
        pageUrl: 'https://www.pexels.com/photo/sacred-valley-in-peru-6725678/',
        directUrl: 'https://images.pexels.com/photos/6725678/pexels-photo-6725678.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-06',
        country: 'Perú',
        type: 'photo',
        title: 'Stunning View of Qorikancha in Cusco, Peru',
        landmark: 'Templo del Sol Qorikancha · Cusco Imperial',
        pageUrl: 'https://www.pexels.com/photo/stunning-view-of-qorikancha-in-cusco-peru-34213699/',
        directUrl: 'https://images.pexels.com/photos/34213699/pexels-photo-34213699.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-07',
        country: 'Perú',
        type: 'photo',
        title: 'Aerial Cityscape of Cusco, Peru\'s Historic Architecture',
        landmark: 'Centro Histórico de Cusco · 3.399 msnm',
        pageUrl: 'https://www.pexels.com/photo/aerial-cityscape-of-cusco-peru-s-historic-architecture-36584091/',
        directUrl: 'https://images.pexels.com/photos/36584091/pexels-photo-36584091.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-08',
        country: 'Perú',
        type: 'photo',
        title: 'Breathtaking View of Vinicunca Rainbow Mountain',
        landmark: 'Montaña de 7 Colores Vinicunca · 5.036 msnm',
        pageUrl: 'https://www.pexels.com/photo/breathtaking-view-of-vinicunca-rainbow-mountain-39442820/',
        directUrl: 'https://images.pexels.com/photos/39442820/pexels-photo-39442820.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-09',
        country: 'Perú',
        type: 'photo',
        title: 'Scenic View of Uros Islands on Lake Titicaca',
        landmark: 'Islas Flotantes de los Uros · Puno',
        pageUrl: 'https://www.pexels.com/photo/34053242/',
        directUrl: 'https://images.pexels.com/photos/34053242/pexels-photo-34053242.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'pe-photo-10',
        country: 'Perú',
        type: 'photo',
        title: 'Scenic View of Lake Titicaca and Puno, Peru',
        landmark: 'Lago Titicaca Peruano · Puno (3.812 msnm)',
        pageUrl: 'https://www.pexels.com/photo/scenic-view-of-lake-titicaca-and-puno-peru-34015276/',
        directUrl: 'https://images.pexels.com/photos/34015276/pexels-photo-34015276.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    videos: [
      {
        id: 'pe-video-01',
        country: 'Perú',
        type: 'video',
        title: 'Machu Picchu Ancient Inca Ruins in Clouds',
        landmark: 'Ciudadela Inca de Machu Picchu entre la Bruma',
        pageUrl: 'https://www.pexels.com/video/machu-picchu-ancient-inca-ruins-in-clouds-34533157/',
        directUrl: 'https://www.pexels.com/video/machu-picchu-ancient-inca-ruins-in-clouds-34533157/',
      },
      {
        id: 'pe-video-02',
        country: 'Perú',
        type: 'video',
        title: 'Aerial View of Machu Picchu\'s Terraced Ruins',
        landmark: 'Sobrevuelo de los Andenes de Machu Picchu',
        pageUrl: 'https://www.pexels.com/video/aerial-view-of-machu-picchu-s-terraced-ruins-29837365/',
        directUrl: 'https://www.pexels.com/video/aerial-view-of-machu-picchu-s-terraced-ruins-29837365/',
      },
      {
        id: 'pe-video-03',
        country: 'Perú',
        type: 'video',
        title: 'Aerial View of Andes Railroad in Rural Peru',
        landmark: 'Tren Andino hacia Machu Picchu / Valle Sagrado',
        pageUrl: 'https://www.pexels.com/video/aerial-view-of-andes-railroad-in-rural-peru-36741625/',
        directUrl: 'https://www.pexels.com/video/aerial-view-of-andes-railroad-in-rural-peru-36741625/',
      },
      {
        id: 'pe-video-04',
        country: 'Perú',
        type: 'video',
        title: 'Exploring Colorful Mountain Peaks in Peru (Vinicunca)',
        landmark: 'Expedición a la Montaña de 7 Colores · Cusco',
        pageUrl: 'https://www.pexels.com/video/exploring-colorful-mountain-peaks-in-peru-36035395/',
        directUrl: 'https://www.pexels.com/video/exploring-colorful-mountain-peaks-in-peru-36035395/',
      },
      {
        id: 'pe-video-05',
        country: 'Perú',
        type: 'video',
        title: 'Pueblo de Machu Picchu (Aguas Calientes)',
        landmark: 'Cañón del Urubamba y Machu Picchu Pueblo',
        pageUrl: 'https://www.pexels.com/video/pueblo-de-machu-picchu-aguas-calientes-27647946/',
        directUrl: 'https://www.pexels.com/video/pueblo-de-machu-picchu-aguas-calientes-27647946/',
      },
    ],
  },
};

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'trilogia-andina-completa',
    title: {
      ES: 'Trilogía Andina Completa',
      EN: 'Complete Andean Trilogy',
      PT: 'Trilogia Andina Completa',
      FR: 'Trilogie Andine Complète',
    },
    tagline: {
      ES: 'Santiago → Atacama → Expedición Uyuni 4x4 → Lago Titicaca → Valle Sagrado & Machu Picchu.',
      EN: 'Santiago → Atacama → Private 4x4 Uyuni Expedition → Lake Titicaca → Sacred Valley & Machu Picchu.',
      PT: 'Santiago → Atacama → Expedição privada Uyuni 4x4 → Lago Titicaca → Vale Sagrado e Machu Picchu.',
      FR: 'Santiago → Atacama → Expédition privée Uyuni 4x4 → Lac Titicaca → Vallée Sacrée et Machu Picchu.',
    },
    country: 'Chile · Bolivia · Perú',
    countriesList: ['Chile', 'Bolivia', 'Perú'],
    days: 14,
    nights: 13,
    maxAltitudeMeters: 4900,
    difficulty: 'Media',
    basePriceUSD: 2450,
    hotelCostUSD: {
      none: 0,
      '3star': 850,
      '4star': 1450,
      '5star': 2440,
    },
    logisticsCostUSD: 950,
    ticketsCostUSD: 490,
    imageUrl: 'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      // Perú (Machu Picchu, Moray, Maras, Qorikancha)
      'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/36609489/pexels-photo-36609489.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6725678/pexels-photo-6725678.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/34213699/pexels-photo-34213699.jpeg?auto=compress&cs=tinysrgb&w=1600',
      // Bolivia (Salar de Uyuni, Laguna Colorada, Isla Incahuasi)
      'https://images.pexels.com/photos/30929532/pexels-photo-30929532.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/30998364/pexels-photo-30998364.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://unsplash.com/photos/GQOdS7pGLWQ/download?w=1600',
      // Chile (Valle de la Luna, Géiseres del Tatio, Astrofotografía en Atacama)
      'https://images.pexels.com/photos/33047883/pexels-photo-33047883.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/32453922/pexels-photo-32453922.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://unsplash.com/photos/llg7GwrWxw0/download?w=1600',
    ],
    highlights: [
      '4x4 Lexus LX / Toyota Land Cruiser privado con rastreo satelital',
      'Médico de altura en ruta & oximetría permanente',
      'Hospedajes Atención WhatsApp 24/7 + Palacio de Sal exclusivo',
      'Tren Belmond Hiram Bingham hacia Machu Picchu con cena gourmet',
    ],
    recommendedHotels: [
      { name: 'Tierra Atacama Hotel & Spa', category: '5★ High Luxury', description: 'Spa andino y vistas panorámicas al volcán Licancabur.' },
      { name: 'Palacio de Sal Boutique', category: '5★ High Luxury', description: 'El primer hotel de sal del planeta, chimenea y mirador 360°.' },
      { name: 'Belmond Hotel Monasterio Cusco', category: '5★ High Luxury', description: 'Antiguo monasterio jesuita del siglo XVI con oxígeno enriquecido en habitaciones.' },
    ],
    itinerary: [
      { day: 'Día 01', title: 'Llegada a Santiago o Calama & Oasis de Atacama', region: 'Chile · 2.400 msnm', description: 'Recepción privada VIP en aeropuerto y traslado en SUV hacia San Pedro de Atacama.', meals: 'Cóctel de bienvenida', transport: 'SUV ejecutiva' },
      { day: 'Día 02', title: 'Valle de la Luna, Cordillera de la Sal & Astrofotografía', region: 'Chile · 2.550 msnm', description: 'Cañones de arcilla roja y observación estelar con telescopio motorizado.', meals: 'Desayuno + Picnic sunset', transport: '4x4 privado' },
      { day: 'Día 03', title: 'Géiseres del Tatio al Alba & Termas de Puritama', region: 'Chile · 4.320 msnm (Pico transitorio)', description: 'Fumarolas geotérmicas matutinas y relajación en pozas termales privadas.', meals: 'Desayuno térmico + Almuerzo', transport: '4x4 privado' },
      { day: 'Día 04', title: 'Cruce Hito Cajón hacia Reserva Eduardo Avaroa', region: 'Chile ➔ Bolivia · Cruce 4x4', description: 'Trámite aduanero expedito. Lagunas Verde y Blanca al pie del Licancabur y Laguna Colorada con colonias de flamencos.', meals: 'Pensión completa andina', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 05-06', title: 'Inmensidad del Salar de Uyuni & Hotel de Sal', region: 'Bolivia · 3.653 msnm', description: 'Isla Incahuasi entre cactus milenarios. Almuerzo catering en medio del blanco infinito y noche de sal.', meals: 'Pensión completa de autor', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 07-08', title: 'Vuelo La Paz, Teleféricos & Lago Titicaca Privado', region: 'Bolivia · 3.812 msnm', description: 'Vuelo a La Paz, red de teleféricos urbanos y catamarán privado a la Isla del Sol.', meals: 'Desayuno + Almuerzo a bordo', transport: 'Vuelo charter + Catamarán' },
      { day: 'Días 09-10', title: 'Cruce Kasani a Perú & Descenso al Valle Sagrado', region: 'Bolivia ➔ Perú · 2.430 msnm', description: 'Paso migratorio hacia Puno y traslado al microclima templado de Urubamba.', meals: 'Pensión completa', transport: 'Tren de lujo / Van ejecutiva' },
      { day: 'Días 11-12', title: 'Machu Picchu en Tren Hiram Bingham & Cusco Imperial', region: 'Perú · 2.430 msnm ➔ 3.399 msnm', description: 'Ingreso prioritario a la maravilla del mundo con arqueólogo y retorno a Cusco.', meals: 'Almuerzo Sanctuary Lodge + Cena clausura', transport: 'Tren Hiram Bingham' },
      { day: 'Días 13-14', title: 'Cusco Arqueológico, Qorikancha & Despedida', region: 'Perú · 3.399 msnm', description: 'Recorrido por templos incas, alta gastronomía novoandina y traslado al aeropuerto.', meals: 'Desayuno gourmet', transport: 'SUV ejecutiva' },
    ],
  },
  {
    id: 'altiplano-salvaje-salares',
    title: {
      ES: 'Altiplano Salvaje & Salares',
      EN: 'Wild Altiplano & Salt Flats',
      PT: 'Altiplano Selvagem & Salares',
      FR: 'Altiplano Sauvage & Déserts de Sel',
    },
    tagline: {
      ES: 'San Pedro de Atacama → Valle de la Luna → Lagunas de Colores → Géiseres Sol de Mañana → Gran Salar de Uyuni.',
      EN: 'San Pedro de Atacama → Moon Valley → Colorful Lagoons → Sol de Mañana Geysers → Great Uyuni Salt Flat.',
      PT: 'San Pedro de Atacama → Vale da Lua → Lagoas Coloridas → Gêiseres Sol de Mañana → Grande Salar de Uyuni.',
      FR: 'San Pedro de Atacama → Vallée de la Lune → Lagunes Colorées → Geysers Sol de Mañana → Grand Salar d\'Uyuni.',
    },
    country: 'Chile · Bolivia',
    countriesList: ['Chile', 'Bolivia'],
    days: 8,
    nights: 7,
    maxAltitudeMeters: 5000,
    difficulty: 'Moderada',
    basePriceUSD: 1650,
    hotelCostUSD: {
      none: 0,
      '3star': 480,
      '4star': 750,
      '5star': 1250,
    },
    logisticsCostUSD: 720,
    ticketsCostUSD: 280,
    imageUrl: 'https://images.pexels.com/photos/30998364/pexels-photo-30998364.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      // Chile (10 fotos curadas de Atacama, Valle de la Luna, Tatio, Miscanti, Salar)
      'https://images.pexels.com/photos/33047883/pexels-photo-33047883.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/32453922/pexels-photo-32453922.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/28858627/pexels-photo-28858627.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/30807414/pexels-photo-30807414.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/32654432/pexels-photo-32654432.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/31767228/pexels-photo-31767228.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://unsplash.com/photos/i58kW6kuxww/download?w=1600',
      'https://unsplash.com/photos/N8fapqDIc-4/download?w=1600',
      'https://unsplash.com/photos/612hZnDoDE4/download?w=1600',
      // Bolivia (Laguna Colorada, Salar de Uyuni, Espejo de Sal, Hexágonos, Reserva Avaroa)
      'https://images.pexels.com/photos/30998364/pexels-photo-30998364.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/30929532/pexels-photo-30929532.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/30929499/pexels-photo-30929499.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://unsplash.com/photos/d4jDdMjPeNs/download?w=1600',
      'https://unsplash.com/photos/cFPTHl6s5uY/download?w=1600',
      'https://unsplash.com/photos/ls_pYTMfZ0g/download?w=1600',
      'https://unsplash.com/photos/RHd1D38KvN0/download?w=1600',
    ],
    highlights: [
      'Noche en cúpula geodésica transparente bajo la Vía Láctea',
      'Chef de campo privado y bar andino móvil en el desierto',
      'Asistencia transfronteriza VIP en Hito Cajón sin demoras',
      'Laguna Colorada con más de 30.000 flamencos andinos',
    ],
    recommendedHotels: [
      { name: 'Hotel Cumbres Atacama', category: '4★ Boutique & Sal', description: 'Patios de piedra y huertos desérticos en el corazón de San Pedro.' },
      { name: 'Luna Salada Hotel de Sal', category: '4★ Boutique & Sal', description: 'Habitaciones con vista directa al horizonte de sal y chimeneas cálidas.' },
    ],
    itinerary: [
      { day: 'Día 01', title: 'Recepción en Calama y Atardecer en el Valle de la Luna', region: 'Chile · 2.400 msnm', description: 'Traslado privado al hotel y exploración de las dunas doradas de sal.', meals: 'Cóctel sunset', transport: 'SUV privada' },
      { day: 'Día 02', title: 'Lagunas Cejar & Ojos del Salar', region: 'Chile · 2.450 msnm', description: 'Flotación en aguas hiper-salinas y atardecer en la Laguna Tebinquinche.', meals: 'Desayuno + Picnic', transport: '4x4 privado' },
      { day: 'Día 03', title: 'Cruce Hito Cajón, Laguna Verde & Desierto de Siloli', region: 'Chile ➔ Bolivia · 4.400 msnm', description: 'Ingreso a Bolivia en 4x4. Formación geológica del Árbol de Piedra.', meals: 'Pensión completa', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Día 04', title: 'Laguna Colorada & Géiseres Sol de Mañana', region: 'Bolivia · 4.850 msnm', description: 'Caldos volcánicos en ebullición y avistamiento masivo de flamencos.', meals: 'Pensión completa', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 05-06', title: 'Gran Salar de Uyuni & Isla Incahuasi', region: 'Bolivia · 3.653 msnm', description: 'Exploración del salar y cena de cata de vinos de altura.', meals: 'Pensión completa', transport: 'Toyota Land Cruiser 4x4' },
      { day: 'Días 07-08', title: 'Colchani & Traslado a Uyuni / Calama', region: 'Bolivia ➔ Chile / La Paz', description: 'Mercado artesanal de sal y conexión a vuelo internacional.', meals: 'Desayuno gourmet', transport: 'SUV / Traslado aeropuerto' },
    ],
  },
  {
    id: 'mistica-inca-altiplano-sagrado',
    title: {
      ES: 'Mística Inca & Altiplano Sagrado',
      EN: 'Inca Mystique & Sacred Altiplano',
      PT: 'Mística Inca & Altiplano Sagrado',
      FR: 'Mystique Inca & Altiplano Sacré',
    },
    tagline: {
      ES: 'La Paz bohemia → Copacabana & Isla del Sol → Puno & Uros → Valle Sagrado → Machu Picchu.',
      EN: 'Bohemian La Paz → Copacabana & Sun Island → Puno & Uros → Sacred Valley → Machu Picchu.',
      PT: 'La Paz boêmia → Copacabana e Ilha do Sol → Puno & Uros → Vale Sagrado → Machu Picchu.',
      FR: 'La Paz bohème → Copacabana & Île du Soleil → Puno & Uros → Vallée Sacrée → Machu Picchu.',
    },
    country: 'Bolivia · Perú',
    countriesList: ['Bolivia', 'Perú'],
    days: 10,
    nights: 9,
    maxAltitudeMeters: 3850,
    difficulty: 'Suave',
    basePriceUSD: 1850,
    hotelCostUSD: {
      none: 0,
      '3star': 580,
      '4star': 980,
      '5star': 1750,
    },
    logisticsCostUSD: 780,
    ticketsCostUSD: 420,
    imageUrl: 'https://images.pexels.com/photos/29964217/pexels-photo-29964217.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      // Perú (Machu Picchu, Ollantaytambo, Moray, Maras, Qorikancha, Cusco, Vinicunca, Uros, Puno)
      'https://images.pexels.com/photos/29964217/pexels-photo-29964217.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/32620257/pexels-photo-32620257.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/36609489/pexels-photo-36609489.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/6725678/pexels-photo-6725678.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/34213699/pexels-photo-34213699.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/36584091/pexels-photo-36584091.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/39442820/pexels-photo-39442820.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/34053242/pexels-photo-34053242.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/34015276/pexels-photo-34015276.jpeg?auto=compress&cs=tinysrgb&w=1600',
      // Bolivia (Copacabana, Lago Titicaca, La Paz & Illimani)
      'https://images.pexels.com/photos/34213410/pexels-photo-34213410.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/39696079/pexels-photo-39696079.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    highlights: [
      'Catamarán privado exclusivo en el Lago Titicaca',
      'Guías antropólogos y arqueólogos dedicados',
      'Acceso exclusivo a ruinas incas en horarios privados',
      'Tren panorámico Vistadome Observatory a Machu Picchu',
    ],
    recommendedHotels: [
      { name: 'Titilaka Exclusive Lodge', category: '5★ High Luxury', description: 'Atención WhatsApp 24/7 aislado en península privada del Lago Titicaca.' },
      { name: 'Tambo del Inka Resort & Spa', category: '5★ High Luxury', description: 'Luxury Collection en Urubamba con estación privada de tren.' },
    ],
    itinerary: [
      { day: 'Día 01', title: 'Llegada a La Paz & Circuito de Teleféricos Urbanos', region: 'Bolivia · 3.640 msnm', description: 'Recorrido por el Valle de la Luna y vistas a la cordillera real.', meals: 'Cena novoandina', transport: 'Van VIP' },
      { day: 'Días 02-03', title: 'Copacabana & Navegación a la Isla del Sol', region: 'Bolivia · 3.812 msnm', description: 'Embarque privado en catamarán, escalinatas incas y ceremonia Kallawaya.', meals: 'Pensión completa', transport: 'Catamarán privado' },
      { day: 'Día 04', title: 'Cruce Kasani hacia Puno & Islas Flotantes de los Uros', region: 'Bolivia ➔ Perú · 3.812 msnm', description: 'Paso migratorio ágil y visita comunitaria a las islas de totora.', meals: 'Desayuno + Almuerzo', transport: 'Lancha privada + Van' },
      { day: 'Días 05-06', title: 'Ruta del Sol hacia el Valle Sagrado de Urubamba', region: 'Perú · 2.430 msnm', description: 'Templo de Raqchi, iglesia de Andahuaylillas y descanso en el valle.', meals: 'Almuerzo buffet campestre', transport: 'Tren o transporte privado' },
      { day: 'Días 07-08', title: 'Santuario Histórico Machu Picchu', region: 'Perú · 2.430 msnm', description: 'Ingreso al amanecer en la ciudadela de piedra inca con guía arqueólogo.', meals: 'Desayuno + Almuerzo gourmet', transport: 'Tren Vistadome' },
      { day: 'Días 09-10', title: 'Cusco Imperial & Retorno', region: 'Perú · 3.399 msnm', description: 'Templo de Santo Domingo, San Blas y vuelo de salida.', meals: 'Desayuno buffet', transport: 'SUV privada' },
    ],
  },
];

export const AVAILABLE_EXTRAS: ExtraActivity[] = [
  {
    id: 'extra-astro',
    name: 'Astrofotografía de Precisión con Telescopio Motorizado',
    priceUSD: 160,
    description: 'Sesión nocturna con astrofísico en el Desierto de Atacama bajo cielos clase Bortle 1.',
    duration: '3 Horas',
  },
  {
    id: 'extra-champagne',
    name: 'Brindis Flotante con Champagne & Ostras en Salar de Uyuni',
    priceUSD: 240,
    description: 'Montaje de mesa con lencería blanca sobre la lámina de agua reflectante durante el sunset.',
    duration: '2.5 Horas',
  },
  {
    id: 'extra-hiram-upgrade',
    name: 'Upgrade a Vagón Belmond Hiram Bingham (Valle Sagrado)',
    priceUSD: 480,
    description: 'Vagón estilo años 20 con música en vivo, bar abierto de cócteles andinos y menú de autor.',
    duration: 'Trayecto Completo',
  },
  {
    id: 'extra-helicopter',
    name: 'Sobrevuelo Privado en Helicóptero sobre el Valle Sagrado',
    priceUSD: 650,
    description: 'Vistas panorámicas aéreas de las terrazas concéntricas de Moray y nevado Verónica.',
    duration: '45 Minutos',
  },
];

export const INITIAL_RESERVATIONS: BookingReservation[] = [
  {
    id: 'RES-892410',
    packageId: 'trilogia-andina-completa',
    packageName: 'La Gran Travesía Altiplánica: Atacama, Uyuni & El Imperio Inca',
    travelerName: 'Dr. Alejandro Valenzuela M.',
    travelerEmail: 'avalenzuela@investigacion-medica.cl',
    travelerPhone: '+56 9 8234 9900',
    travelDate: '2025-06-12',
    travelersCount: 2,
    hotelTier: '5star',
    travelMode: 'complete',
    selectedExtras: [AVAILABLE_EXTRAS[0], AVAILABLE_EXTRAS[1]],
    currency: 'USD',
    baseTourPerPaxUSD: 2450,
    hotelPerPaxUSD: 2440,
    transfersPerPaxUSD: 950,
    extrasTotalUSD: 400,
    totalPerPaxUSD: 6240,
    totalGroupUSD: 12480,
    depositAmountUSD: 2496,
    estimatedProfitUSD: 3380,
    paymentStatus: 'paid_deposit',
    paymentMethod: 'stripe_mock',
    stripePaymentId: 'pi_3MoE992eZvKYlo2C1gMOCK01',
    createdAt: '2025-05-10T14:32:00Z',
  },
  {
    id: 'RES-741902',
    packageId: 'altiplano-salvaje-salares',
    packageName: 'Altiplano Salvaje & Salares (Chile + Bolivia)',
    travelerName: 'Sophia Montgomery & James Sterling',
    travelerEmail: 'sophia.montgomery@architects-london.co.uk',
    travelerPhone: '+44 7700 900123',
    travelDate: '2025-07-04',
    travelersCount: 2,
    hotelTier: '4star',
    travelMode: 'complete',
    selectedExtras: [AVAILABLE_EXTRAS[1]],
    currency: 'USD',
    baseTourPerPaxUSD: 1650,
    hotelPerPaxUSD: 750,
    transfersPerPaxUSD: 720,
    extrasTotalUSD: 240,
    totalPerPaxUSD: 3360,
    totalGroupUSD: 6720,
    depositAmountUSD: 1344,
    estimatedProfitUSD: 1840,
    paymentStatus: 'paid_deposit',
    paymentMethod: 'stripe_mock',
    stripePaymentId: 'pi_3MoE992eZvKYlo2C1gMOCK02',
    createdAt: '2025-05-18T09:15:00Z',
  },
  {
    id: 'RES-631890',
    packageId: 'mistica-inca-altiplano-sagrado',
    packageName: 'Mística Inca & Altiplano Sagrado (Bolivia + Perú)',
    travelerName: 'Giselle Fontaine & Pierre Moreau',
    travelerEmail: 'p.moreau@vins-bordeaux.fr',
    travelerPhone: '+33 6 12 34 56 78',
    travelDate: '2025-08-20',
    travelersCount: 4,
    hotelTier: '5star',
    travelMode: 'complete',
    selectedExtras: [AVAILABLE_EXTRAS[2]],
    currency: 'EUR',
    baseTourPerPaxUSD: 1850,
    hotelPerPaxUSD: 1750,
    transfersPerPaxUSD: 780,
    extrasTotalUSD: 480,
    totalPerPaxUSD: 4860,
    totalGroupUSD: 19440,
    depositAmountUSD: 3888,
    estimatedProfitUSD: 5280,
    paymentStatus: 'paid_deposit',
    paymentMethod: 'stripe_mock',
    stripePaymentId: 'pi_3MoE992eZvKYlo2C1gMOCK03',
    createdAt: '2025-05-22T18:40:00Z',
  },
];

// CMS Defaults & Persistence Helpers
export const DEFAULT_BRANDING: SiteBranding = {
  heroImageUrl: 'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroTag: 'Expediciones de Lujo',
  heroSubtitle: 'Chile · Bolivia · Perú',
  heroTitle1: 'Travesías Privadas al',
  heroTitle2: 'Techo del Mundo',
  heroDesc: 'Descubre la inmensidad del Salar de Uyuni, los cañones de Atacama y la gloria de Machu Picchu en vehículos 4x4 satelitales con logística médica y curaduría cinco estrellas.',
  conciergePhone: '+56 9 8452 1109',
  conciergeDefaultMsg: 'Hola DeiTaNa Travel Concierge. Me gustaría consultar una expedición privada por Chile, Bolivia y Perú.',
};

export const DEFAULT_HOTELS: HotelItem[] = [
  {
    id: 'tierra-atacama',
    region: 'chile',
    countryBadge: 'San Pedro de Atacama',
    subtitle: 'Atención WhatsApp 24/7 Partner',
    name: 'Tierra Atacama Hotel & Spa',
    description: 'Arquitectura de adobe orgánico y spa termal andino con vistas despejadas al Volcán Licancabur.',
    comfort: 'Gran Lujo · 2.400 msnm',
    category: '5star',
    pricePerNightUSD: 650,
    imageUrl: 'https://images.pexels.com/photos/32654432/pexels-photo-32654432.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'palacio-de-sal',
    region: 'bolivia',
    countryBadge: 'Colchani · Uyuni',
    subtitle: 'Arquitectura de Sal Pura',
    name: 'Palacio de Sal Boutique',
    description: 'El primer hotel de sal del mundo. Bóvedas termales, chimeneas de leña y mirador astral 360° frente al manto blanco.',
    comfort: 'Icono Altiplánico · 3.656 msnm',
    category: '5star',
    pricePerNightUSD: 420,
    imageUrl: 'https://images.pexels.com/photos/30929499/pexels-photo-30929499.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'titilaka-exclusive',
    region: 'peru',
    countryBadge: 'Puno · Lago Titicaca',
    subtitle: 'Península Privada',
    name: 'Titilaka Exclusive Lodge',
    description: 'Aislado en una península privada sobre las aguas del lago navegable más alto de la Tierra. Atención WhatsApp 24/7.',
    comfort: 'Atención WhatsApp 24/7 · 3.812 msnm',
    category: '5star',
    pricePerNightUSD: 780,
    imageUrl: 'https://images.pexels.com/photos/34015276/pexels-photo-34015276.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'belmond-sanctuary',
    region: 'peru',
    countryBadge: 'Machu Picchu Pueblo',
    subtitle: 'Ubicación Privilegiada',
    name: 'Belmond Sanctuary Lodge',
    description: 'El único hotel situado justo en la puerta de la ciudadela sagrada de Machu Picchu para ingresos al alba.',
    comfort: 'Belmond Heritage · 2.430 msnm',
    category: '5star',
    pricePerNightUSD: 1100,
    imageUrl: 'https://images.pexels.com/photos/29964217/pexels-photo-29964217.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

export const DEFAULT_DESTINATIONS: RouteDestination[] = [
  {
    id: 'atacama',
    name: 'San Pedro de Atacama',
    country: 'Chile',
    flag: '🇨🇱',
    altitude: '2.400 msnm',
    altitudeMeters: 2400,
    days: 3,
    costUSD: 680,
    tag: 'Geysers del Tatio & Valle de la Luna',
    imageUrl: 'https://images.pexels.com/photos/33047883/pexels-photo-33047883.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'uyuni',
    name: 'Salar de Uyuni & Lagunas',
    country: 'Bolivia',
    flag: '🇧🇴',
    altitude: '3.656 msnm',
    altitudeMeters: 3656,
    days: 3,
    costUSD: 850,
    tag: 'Altiplano Andino & Laguna Colorada',
    imageUrl: 'https://images.pexels.com/photos/30929532/pexels-photo-30929532.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'titicaca',
    name: 'Lago Titicaca & Copacabana',
    country: 'Bolivia',
    flag: '🇧🇴',
    altitude: '3.812 msnm',
    altitudeMeters: 3812,
    days: 2,
    costUSD: 490,
    tag: 'Isla del Sol & Catamarán Privado',
    imageUrl: 'https://images.pexels.com/photos/34213410/pexels-photo-34213410.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'machupicchu',
    name: 'Valle Sagrado & Machu Picchu',
    country: 'Perú',
    flag: '🇵🇪',
    altitude: '2.430 msnm',
    altitudeMeters: 2430,
    days: 3,
    costUSD: 920,
    tag: 'Ciudadela Inca & Tren Hiram Bingham',
    imageUrl: 'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'cusco',
    name: 'Cusco Imperial & Vinicunca',
    country: 'Perú',
    flag: '🇵🇪',
    altitude: '3.399 msnm',
    altitudeMeters: 3399,
    days: 2,
    costUSD: 540,
    tag: 'Qorikancha & Montaña 7 Colores',
    imageUrl: 'https://images.pexels.com/photos/39442820/pexels-photo-39442820.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

// LocalStorage Keys (v4 garantiza que carguen los nuevos links manteniendo edición completa en /admin)
const STORAGE_PACKAGES_KEY = 'triangulo_andino_packages_v4';
const STORAGE_RESERVATIONS_KEY = 'triangulo_andino_reservations_v1';
const STORAGE_BRANDING_KEY = 'triangulo_andino_branding_v2';
const STORAGE_HOTELS_KEY = 'triangulo_andino_hotels_v2';
const STORAGE_DESTINATIONS_KEY = 'triangulo_andino_destinations_v2';
const STORAGE_COUNTRY_MEDIA_KEY = 'triangulo_andino_country_media_v1';

// Branding (Editable desde /admin -> Portada & Branding)
export function getStoredBranding(): SiteBranding {
  try {
    const raw = localStorage.getItem(STORAGE_BRANDING_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.heroTitle1) {
        return {
          ...parsed,
          heroImageUrl: normalizeMediaUrl(parsed.heroImageUrl) || DEFAULT_BRANDING.heroImageUrl,
        };
      }
    }
  } catch (e) {
    console.warn('Error reading stored branding:', e);
  }
  return DEFAULT_BRANDING;
}

export function saveStoredBranding(branding: SiteBranding) {
  try {
    const normalized: SiteBranding = {
      ...branding,
      heroImageUrl: normalizeMediaUrl(branding.heroImageUrl) || DEFAULT_BRANDING.heroImageUrl,
    };
    localStorage.setItem(STORAGE_BRANDING_KEY, JSON.stringify(normalized));
  } catch (e) {
    console.error('Error saving branding:', e);
  }
}

// Hotels (Editable desde /admin -> Hoteles & Lodges)
export function getStoredHotels(): HotelItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_HOTELS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((h: HotelItem) => ({
          ...h,
          imageUrl: normalizeMediaUrl(h.imageUrl) || h.imageUrl,
        }));
      }
    }
  } catch (e) {
    console.warn('Error reading stored hotels:', e);
  }
  return DEFAULT_HOTELS;
}

export function saveStoredHotels(hotels: HotelItem[]) {
  try {
    const normalized = hotels.map((h) => ({
      ...h,
      imageUrl: normalizeMediaUrl(h.imageUrl) || h.imageUrl,
    }));
    localStorage.setItem(STORAGE_HOTELS_KEY, JSON.stringify(normalized));
  } catch (e) {
    console.error('Error saving hotels:', e);
  }
}

// Destinations / Hitos (Editable desde /admin -> Rutas & Hitos)
export function getStoredDestinations(): RouteDestination[] {
  try {
    const raw = localStorage.getItem(STORAGE_DESTINATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((d: RouteDestination) => ({
          ...d,
          imageUrl: normalizeMediaUrl(d.imageUrl) || d.imageUrl,
        }));
      }
    }
  } catch (e) {
    console.warn('Error reading stored destinations:', e);
  }
  return DEFAULT_DESTINATIONS;
}

export function saveStoredDestinations(destinations: RouteDestination[]) {
  try {
    const normalized = destinations.map((d) => ({
      ...d,
      imageUrl: normalizeMediaUrl(d.imageUrl) || d.imageUrl,
    }));
    localStorage.setItem(STORAGE_DESTINATIONS_KEY, JSON.stringify(normalized));
  } catch (e) {
    console.error('Error saving destinations:', e);
  }
}

// Country Media Catalog (10 Fotos + 5 Videos por País, editable y persistente en localStorage)
export function getStoredCountryMedia(): Record<'chile' | 'bolivia' | 'peru', CountryMediaCollection> {
  try {
    const raw = localStorage.getItem(STORAGE_COUNTRY_MEDIA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.chile && parsed.bolivia && parsed.peru) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading stored country media:', e);
  }
  return DEFAULT_COUNTRY_MEDIA;
}

export function saveStoredCountryMedia(media: Record<'chile' | 'bolivia' | 'peru', CountryMediaCollection>) {
  try {
    localStorage.setItem(STORAGE_COUNTRY_MEDIA_KEY, JSON.stringify(media));
  } catch (e) {
    console.error('Error saving country media:', e);
  }
}

const BANNED_IMAGE_KEYS = ['photo-1518638150340', 'photo-1509316975850'];
const SAFE_FALLBACK_IMG = 'https://images.pexels.com/photos/31746177/pexels-photo-31746177.jpeg?auto=compress&cs=tinysrgb&w=1600';

export function sanitizePackageImages(pkg: Package): Package {
  const isBanned = (url?: string) =>
    !url || BANNED_IMAGE_KEYS.some((banned) => url.includes(banned));

  let cleanImages = Array.isArray(pkg.images)
    ? pkg.images
        .map((url) => normalizeMediaUrl(url))
        .filter((url) => !isBanned(url))
    : [];

  const normalizedCover = normalizeMediaUrl(pkg.imageUrl);

  if (cleanImages.length === 0) {
    cleanImages = isBanned(normalizedCover) ? [SAFE_FALLBACK_IMG] : [normalizedCover];
  }

  const cleanImageUrl = isBanned(normalizedCover) ? cleanImages[0] : normalizedCover;

  return {
    ...pkg,
    imageUrl: cleanImageUrl,
    images: cleanImages,
  };
}

// Packages (Editable desde /admin -> Paquetes Turísticos)
export function getStoredPackages(): Package[] {
  try {
    const raw = localStorage.getItem(STORAGE_PACKAGES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const sanitized = parsed.map(sanitizePackageImages);
        try {
          localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(sanitized));
        } catch {}
        return sanitized;
      }
    }
  } catch (e) {
    console.warn('Error reading stored packages:', e);
  }
  const defaultSanitized = INITIAL_PACKAGES.map(sanitizePackageImages);
  try {
    localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(defaultSanitized));
  } catch {}
  return defaultSanitized;
}

export function saveStoredPackages(packages: Package[]) {
  try {
    const sanitized = packages.map(sanitizePackageImages);
    localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(sanitized));
  } catch (e) {
    console.error('Error saving packages to localStorage:', e);
  }
}

// Reservations
export function getStoredReservations(): BookingReservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_RESERVATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading stored reservations:', e);
  }
  try {
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(INITIAL_RESERVATIONS));
  } catch {}
  return INITIAL_RESERVATIONS;
}

export function saveStoredReservations(reservations: BookingReservation[]) {
  try {
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(reservations));
  } catch (e) {
    console.error('Error saving reservations to localStorage:', e);
  }
}

export function addReservation(reservation: BookingReservation) {
  const current = getStoredReservations();
  const updated = [reservation, ...current];
  saveStoredReservations(updated);
  return updated;
}

// Factory Reset (Restaurar Fábrica desde /admin)
export function resetAllToFactoryDefaults() {
  try {
    localStorage.setItem(STORAGE_BRANDING_KEY, JSON.stringify(DEFAULT_BRANDING));
    localStorage.setItem(STORAGE_PACKAGES_KEY, JSON.stringify(INITIAL_PACKAGES));
    localStorage.setItem(STORAGE_HOTELS_KEY, JSON.stringify(DEFAULT_HOTELS));
    localStorage.setItem(STORAGE_DESTINATIONS_KEY, JSON.stringify(DEFAULT_DESTINATIONS));
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(INITIAL_RESERVATIONS));
    localStorage.setItem(STORAGE_COUNTRY_MEDIA_KEY, JSON.stringify(DEFAULT_COUNTRY_MEDIA));
  } catch (e) {
    console.error('Error resetting factory defaults:', e);
  }
}