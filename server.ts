import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Endpoint: AI Destination Explorer & Encyclopedia with Google Search Grounding
app.post('/api/gemini/destination-lookup', async (req: Request, res: Response) => {
  const { query, language = 'ES' } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const prompt = `Actúa como la enciclopedia de expedición y concierge de Triángulo Andino Travel (especialistas en Chile, Bolivia y Perú).
Investiga a fondo el destino andino: "${query}".
Utiliza Google Search para obtener datos reales y actualizados.
Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin backticks de markdown adicionales, solo texto parseable como JSON) con esta estructura exacta:
{
  "destinationName": "Nombre oficial del destino",
  "country": "Chile, Bolivia o Perú",
  "altitudeMeters": 3656,
  "altitudeFormatted": "3.656 msnm",
  "climate": "Descripción concisa del clima, temperaturas diurnas/nocturnas y mejor época para visitar",
  "whatToPack": ["Prenda térmica / capas", "Protección UV 50+", "Lentes de sol polarizados con filtro UV400", "Calzado de trekking impermeable"],
  "borderRequirements": "Requisitos migratorios específicos si cruza frontera (pasaporte, visas, tasa de reciprocidad, vacunas)",
  "topAttractions": [
    {"name": "Atracción 1", "description": "Breve descripción"},
    {"name": "Atracción 2", "description": "Breve descripción"},
    {"name": "Atracción 3", "description": "Breve descripción"}
  ],
  "altitudeRiskLevel": "Bajo | Moderado | Alto | Muy Alto",
  "acclimationAdvice": "Consejos médicos para aclimatación escalonada y evitar el soroche",
  "recommendedDays": 3,
  "summary": "Resumen evocador de 2 o 3 oraciones sobre por qué este destino es una joya andina imperdible."
}`;

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const responseText = response.text || '';
      // Clean possible markdown code fences
      const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      let parsedData;
      try {
        parsedData = JSON.parse(cleaned);
      } catch {
        // Fallback extraction
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        }
      }

      // Extract Grounding Chunks / Web references
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks
        .filter((chunk: any) => chunk.web?.uri)
        .map((chunk: any) => ({
          title: chunk.web.title || 'Fuente web oficial',
          url: chunk.web.uri,
        }));

      if (parsedData) {
        return res.json({
          success: true,
          data: parsedData,
          sources: sources.slice(0, 4),
          mode: 'real_gemini_search_grounding',
        });
      }
    }
  } catch (err: any) {
    console.error('Error in Gemini destination-lookup, falling back to curated encyclopedia:', err?.message);
  }

  // Curated high-fidelity fallback database
  const fallback = getCuratedDestinationFallback(query);
  return res.json({
    success: true,
    data: fallback,
    sources: [
      { title: 'Sernatur Chile - Protocolos de Altura', url: 'https://www.sernatur.cl' },
      { title: 'Viceministerio de Turismo Bolivia - Salar de Uyuni', url: 'https://www.minculturas.gob.bo' },
      { title: 'PromPerú - Guía Oficial de Machu Picchu y Cusco', url: 'https://www.peru.travel' },
    ],
    mode: 'curated_database_fallback',
  });
});

// Endpoint: AI Package Generator for Admin (/admin)
app.post('/api/gemini/generate-package', async (req: Request, res: Response) => {
  const { destination, days = 5 } = req.body;

  if (!destination) {
    return res.status(400).json({ error: 'Destination is required' });
  }

  const prompt = `Actúa como diseñador jefe de expediciones de lujo en Triángulo Andino Travel (Chile, Bolivia, Perú).
Diseña un nuevo paquete turístico completo de alta gama para el destino: "${destination}" con duración de ${days} días.
Devuelve EXCLUSIVAMENTE un objeto JSON válido con esta estructura:
{
  "id": "pkg-${Date.now()}",
  "title": {
    "ES": "Título atractivo en Español",
    "EN": "Title in English",
    "PT": "Título em Português",
    "FR": "Titre en Français"
  },
  "tagline": {
    "ES": "Frase destacada en Español",
    "EN": "Tagline in English",
    "PT": "Frase em Português",
    "FR": "Phrase en Français"
  },
  "country": "Chile, Bolivia o Perú",
  "days": ${days},
  "nights": ${Math.max(1, days - 1)},
  "maxAltitudeMeters": 3800,
  "difficulty": "Suave | Media | Moderada | Exigente",
  "basePriceUSD": 1950,
  "estimatedHotelCostUSD": 600,
  "estimatedLogisticsCostUSD": 850,
  "estimatedTicketsCostUSD": 250,
  "highlights": [
    "Hito 1 exclusivo",
    "Hito 2 exclusivo",
    "Hito 3 exclusivo"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Llegada y bienvenida",
      "altitude": "2.400 msnm",
      "description": "Detalle del día",
      "meals": "Cena de bienvenida andina",
      "transport": "SUV 4x4 privada"
    }
  ],
  "recommendedHotels": [
    {
      "name": "Hotel seleccionado",
      "category": "5★ High Luxury | 4★ Boutique | 3★ Confort",
      "description": "Descripción del alojamiento"
    }
  ]
}`;

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      const parsed = JSON.parse(responseText);
      return res.json({ success: true, package: parsed, mode: 'gemini_generated' });
    }
  } catch (err: any) {
    console.error('Error generating AI package, using procedural synthesis:', err?.message);
  }

  // Procedural curated creation fallback
  const simulatedPkg = generateProceduralPackage(destination, days);
  return res.json({ success: true, package: simulatedPkg, mode: 'synthesized_fallback' });
});

// Endpoint: AI Smart Route Optimizer
app.post('/api/gemini/smart-route', async (req: Request, res: Response) => {
  const { destinations = [], days = 12, travelers = 2, tier = '5star', mode = 'complete' } = req.body;

  const prompt = `Actúa como el motor inteligente de rutas de Triángulo Andino Travel.
Analiza la combinación de destinos: ${destinations.join(', ')} para ${days} días, ${travelers} personas, categoría ${tier}, modalidad ${mode}.
Ordena cronológicamente los destinos para una óptima aclimatación física escalonada (evitar soroche), considerando pasos de frontera como Hito Cajón o Kasani.
Devuelve un JSON con:
{
  "routeName": "Nombre poético y comercial de la ruta",
  "acclimationScore": 98,
  "altitudeProfileSummary": "2.400m -> 3.650m -> 3.812m -> 2.430m",
  "countriesCount": 3,
  "logisticsNote": "Detalle de los cruces de frontera y transportes",
  "daysBreakdown": [
    {
      "dayNumber": "DÍA 01",
      "title": "Título del día",
      "region": "País · Altitud · Enfoque",
      "description": "Detalle de actividades",
      "meals": "Comidas incluidas",
      "transfer": "Tiempos y tipo de vehículo"
    }
  ]
}`;

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, mode: 'gemini_live' });
    }
  } catch (err: any) {
    console.error('Error in smart-route Gemini call:', err?.message);
  }

  return res.json({
    success: true,
    data: null,
    mode: 'client_fallback',
  });
});

// Helper: Curated Destination Fallback
function getCuratedDestinationFallback(query: string) {
  const q = query.toLowerCase();
  if (q.includes('uyuni') || q.includes('salar')) {
    return {
      destinationName: 'Salar de Uyuni & Reserva Eduardo Avaroa',
      country: 'Bolivia',
      altitudeMeters: 3656,
      altitudeFormatted: '3.656 msnm (hasta 4.900 msnm en géiseres)',
      climate: 'Clima desértico frío de altura. Días soleados (15°C a 20°C) y noches bajo cero (-5°C a -15°C en invierno).',
      whatToPack: [
        'Primera capa térmica (lana merino)',
        'Chaqueta cortaviento impermeable y pluma',
        'Lentes de sol polarizados con filtro UV400 (el reflejo de la sal es enceguecedor)',
        'Protector solar factor 50+ y bálsamo labial con cera de abeja',
        'Guantes térmicos y gorro de lana andina',
        'Calzado de caña alta impermeable o botas de agua para época de lluvias (enero-abril)'
      ],
      borderRequirements: 'Si cruza desde San Pedro de Atacama por Hito Cajón: pasaporte vigente (mínimo 6 meses), ticket migratorio de salida de Chile, pago de visa de turismo si aplica según nacionalidad, tasa de ingreso a la Reserva Eduardo Avaroa (150 BOB en efectivo).',
      topAttractions: [
        { name: 'Isla Incahuasi', description: 'Colina de roca volcánica y corales fósiles cubierta de cactus gigantes milenarios.' },
        { name: 'Laguna Colorada', description: 'Espejo de agua rojizo por algas microscópicas habitado por miles de flamencos James y Andinos.' },
        { name: 'Cementerio de Trenes & Hotel de Sal', description: 'Locomotoras de vapor del siglo XIX y arquitectura íntegramente esculpida en bloques de sal mineral.' }
      ],
      altitudeRiskLevel: 'Alto',
      acclimationAdvice: 'No ingresar directamente en avión a Uyuni sin aclimatación previa. Se recomienda pasar 2 noches en San Pedro de Atacama (2.400 msnm) o Sucre/Potosí antes del altiplano profundo. Hidratación abundante con electrolitos y té de coca.',
      recommendedDays: 3,
      summary: 'El desierto de sal continuo más grande del mundo (10.582 km²). Un lienzo surrealista de hexágonos de sal y reflejos infinitos donde la tierra y el cielo se funden sin horizonte.'
    };
  }

  if (q.includes('atacama') || q.includes('san pedro')) {
    return {
      destinationName: 'San Pedro de Atacama',
      country: 'Chile',
      altitudeMeters: 2400,
      altitudeFormatted: '2.400 msnm (puntos turísticos hasta 4.320 msnm)',
      climate: 'Hiperárido, más de 330 días despejados al año. Temperatura diurna de 22°C a 27°C, nocturna de 2°C a 8°C.',
      whatToPack: [
        'Ropa en capas ("efecto cebolla")',
        'Traje de baño para las termas de Puritama y lagunas de sal',
        'Cortaviento liviano para atardeceres en el Valle de la Luna',
        'Gotas humectantes para ojos y crema hidratante'
      ],
      borderRequirements: 'Cédula de identidad (países Mercosur) o pasaporte válido. Para cruzar hacia Bolivia se realiza el trámite en la aduana de San Pedro antes de subir a Hito Cajón.',
      topAttractions: [
        { name: 'Géiseres del Tatio', description: 'El campo geotérmico más alto del hemisferio sur con fumarolas al amanecer.' },
        { name: 'Valle de la Luna y de la Muerte', description: 'Formaciones de sal y arcilla esculpidas por el viento, similares a la superficie lunar.' },
        { name: 'Lagunas Altiplánicas Miscanti y Miñiques', description: 'Espejos de aguas azules rodeados por volcanes nevados a más de 4.000 metros.' }
      ],
      altitudeRiskLevel: 'Moderado',
      acclimationAdvice: 'Excelente punto de partida para toda la ruta altiplánica. Permite al cuerpo generar glóbulos rojos antes de ascender hacia Bolivia o Cusco.',
      recommendedDays: 3,
      summary: 'El oasis más fascinante de Sudamérica, puerta de entrada a los salares chilenos y considerado la capital mundial de la astrofotografía y observación celeste.'
    };
  }

  if (q.includes('machu picchu') || q.includes('machupicchu') || q.includes('valle sagrado')) {
    return {
      destinationName: 'Santuario Histórico Machu Picchu & Valle Sagrado',
      country: 'Perú',
      altitudeMeters: 2430,
      altitudeFormatted: '2.430 msnm (Aguas Calientes: 2.040 msnm)',
      climate: 'Subtropical de montaña, húmedo y templado. Días cálidos de 20°C a 25°C, lluvias moderadas entre diciembre y marzo.',
      whatToPack: [
        'Calzado de trekking con buen agarre para peldaños de piedra inca',
        'Chubasquero o poncho impermeable liviano',
        'Repelente de mosquitos ecológico',
        'Mochila pequeña (máximo 40x35x20 cm permitido por el Parque Nacional)'
      ],
      borderRequirements: 'Pasaporte original físico obligatorio para sellar el ingreso al Santuario. Tarjeta Andina de Migración (TAM) virtual emitida al entrar a Perú.',
      topAttractions: [
        { name: 'Ciudadela Inca de Machu Picchu', description: 'Obra maestra de la ingeniería lítica incaica, Circuito 1 Panorámico o Circuito 2 Clásico.' },
        { name: 'Montaña Huayna Picchu', description: 'Ascenso desafiante entre escalinatas sagradas con vista aérea inigualable.' },
        { name: 'Ollantaytambo y Moray', description: 'Fortaleza viviente y anfiteatro agrícola experimental con microclimas concéntricos.' }
      ],
      altitudeRiskLevel: 'Bajo',
      acclimationAdvice: 'Curiosamente, Machu Picchu está a menor altura que Cusco (2.430 m vs 3.399 m). Descender directamente del aeropuerto de Cusco al Valle Sagrado evita el mal de altura y garantiza un descanso placentero.',
      recommendedDays: 2,
      summary: 'Una de las Siete Maravillas del Mundo Moderno. Ciudadela de piedra suspendida entre picos selváticos y la bruma del río Urubamba.'
    };
  }

  if (q.includes('cusco') || q.includes('cuzco') || q.includes('vinicunca')) {
    return {
      destinationName: 'Cusco Imperial & Montaña de 7 Colores (Vinicunca)',
      country: 'Perú',
      altitudeMeters: 3399,
      altitudeFormatted: '3.399 msnm (Vinicunca a 5.036 msnm)',
      climate: 'Clima templado andino, seco en temporada alta (mayo a octubre). Días soleados y noches frescas.',
      whatToPack: [
        'Prendas térmicas y gorro para la expedición matutina a Vinicunca',
        'Zapatos cómodos para caminar por empinadas calles empedradas de San Blas',
        'Dinero en efectivo en Soles peruanos para boletos turísticos'
      ],
      borderRequirements: 'Pasaporte o documento de identidad según tratado Mercosur. Permiso especial para operadores turísticos en la ruta de Vinicunca.',
      topAttractions: [
        { name: 'Qorikancha (Templo del Sol)', description: 'El templo más sagrado del Tahuantinsuyo sobre cuyos cimientos se erigió el convento de Santo Domingo.' },
        { name: 'Sacsayhuamán', description: 'Megalítica fortaleza ceremonial con bloques de piedra de más de 120 toneladas tallados al milímetro.' },
        { name: 'Vinicunca', description: 'Montaña con franjas minerales de turquesa, oro y lavanda a más de 5.000 metros de altitud.' }
      ],
      altitudeRiskLevel: 'Alto',
      acclimationAdvice: 'El primer día en Cusco debe ser de reposo, digestiones ligeras y abundante mate de muña o coca. Para Vinicunca, aclimatarse un mínimo de 48 horas en la ciudad.',
      recommendedDays: 3,
      summary: 'Capital histórica del Imperio Incaico y joya del barroco andino mestizo, reconocida como Patrimonio de la Humanidad por la UNESCO.'
    };
  }

  if (q.includes('titicaca') || q.includes('titikaka') || q.includes('la paz') || q.includes('copacabana')) {
    return {
      destinationName: 'Lago Titicaca & La Paz Bohemia',
      country: 'Bolivia / Perú',
      altitudeMeters: 3812,
      altitudeFormatted: '3.812 msnm',
      climate: 'Frío altiplánico moderado por la inmensa masa térmica de agua dulce del lago. Viento constante y sol brillante.',
      whatToPack: [
        'Cortaviento para navegación en lancha o catamarán',
        'Gafas de sol de protección alta',
        'Chaqueta abrigada para la brisa lacustre nocturna'
      ],
      borderRequirements: 'Cruce fronterizo Kasani (Copacabana - Yunguyo) o Desaguadero. Trámite de salida e ingreso expedito con pasaporte.',
      topAttractions: [
        { name: 'Isla del Sol', description: 'Santuario mítico donde nació el dios Sol Inti y los fundadores del imperio inca.' },
        { name: 'Islas Flotantes de los Uros', description: 'Comunidades ancestrales construidas artesanalmente sobre densas capas de totora.' },
        { name: 'Red de Teleféricos Urbanos Mi Teleférico', description: 'Sistema de transporte por cable más alto y extenso del mundo con vistas al Illimani.' }
      ],
      altitudeRiskLevel: 'Alto',
      acclimationAdvice: 'Mantener un ritmo de caminata pausado en las escalinatas de la Isla del Sol. La altitud de 3.812 msnm requiere buena oxigenación y pausas frecuentes.',
      recommendedDays: 2,
      summary: 'El lago navegable más alto del mundo, cuna sagrada de civilizaciones andinas preincaicas con aguas azules profundas como el océano.'
    };
  }

  // Generic Andean destination fallback (e.g. Samaipata, Huayhuash, etc.)
  return {
    destinationName: query.charAt(0).toUpperCase() + query.slice(1),
    country: 'Chile / Bolivia / Perú',
    altitudeMeters: 2800,
    altitudeFormatted: '2.800 - 3.500 msnm',
    climate: 'Clima andino característico con marcada amplitud térmica entre el día y la noche.',
    whatToPack: [
      'Vestimenta por capas térmicas y transpirables',
      'Protector solar factor 50+',
      'Gafas con filtro UV certificado',
      'Calzado de trekking con suela de tracción'
    ],
    borderRequirements: 'Pasaporte con al menos 6 meses de vigencia y tarjeta migratoria andina correspondiente.',
    topAttractions: [
      { name: 'Paisaje Natural Andino', description: 'Vistas panorámicas de la cordillera y valles fértiles.' },
      { name: 'Patrimonio Comunitario y Arqueológico', description: 'Centros ceremoniales y mercados de artesanía tradicional.' },
      { name: 'Gastronomía de Altura', description: 'Platos típicos preparados con tubérculos nativos y cereales andinos.' }
    ],
    altitudeRiskLevel: 'Moderado',
    acclimationAdvice: 'Beber abundante agua sin gas, evitar alcohol las primeras 24 horas y realizar caminatas suaves de adaptación.',
    recommendedDays: 2,
    summary: `Un hito singular del circuito andino que complementa la travesía entre Chile, Bolivia y Perú con riqueza cultural y paisajes vírgenes.`
  };
}

// Helper: Procedural Package generator for Admin
function generateProceduralPackage(destination: string, days: number) {
  const baseCost = Math.round((days * 180 + 800) / 10) * 10;
  return {
    id: `pkg-${Date.now()}`,
    title: {
      ES: `Expedición de Autor: ${destination} Secreto`,
      EN: `Signature Expedition: Secret ${destination}`,
      PT: `Expedição de Autor: ${destination} Secreto`,
      FR: `Expédition Signature: ${destination} Secret`,
    },
    tagline: {
      ES: `Inmersión exclusiva de ${days} días por paisajes prístinos andinos.`,
      EN: `Exclusive ${days}-day immersion across pristine Andean landscapes.`,
      PT: `Imersão exclusiva de ${days} dias por paisagens andinas intocadas.`,
      FR: `Immersion exclusive de ${days} jours à travers des paysages andins préservés.`,
    },
    country: destination.toLowerCase().includes('atacama') ? 'Chile' : destination.toLowerCase().includes('uyuni') ? 'Bolivia' : 'Perú',
    days: days,
    nights: Math.max(1, days - 1),
    maxAltitudeMeters: 3850,
    difficulty: 'Moderada',
    basePriceUSD: baseCost,
    estimatedHotelCostUSD: Math.round(baseCost * 0.45),
    estimatedLogisticsCostUSD: Math.round(baseCost * 0.40),
    estimatedTicketsCostUSD: Math.round(baseCost * 0.15),
    highlights: [
      `Exploración privada en 4x4 con conductor local y guía bilingüe`,
      `Acceso prioritario a reservas y miradores exclusivos`,
      `Hospedaje boutique con calefacción y gastronomía novoandina`,
    ],
    itinerary: Array.from({ length: days }).map((_, idx) => ({
      day: idx + 1,
      title: idx === 0 ? `Llegada a ${destination} & Aclimatación` : idx === days - 1 ? `Despedida y retorno panorámico` : `Travesía profunda día ${idx + 1}`,
      altitude: '2.800 - 3.600 msnm',
      description: `Recorrido guiado explorando los valles y formaciones más fotogénicas de ${destination}.`,
      meals: 'Pensión completa con ingredientes de altura',
      transport: '4x4 privado con oxígeno medicinal a bordo',
    })),
    recommendedHotels: [
      {
        name: `Lodge Boutique ${destination}`,
        category: '4★ Boutique & Sal',
        description: 'Confort de altura con chimenea y vistas panorámicas.',
      },
    ],
  };
}

// Development and production Vite handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`✨ Triángulo Andino Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
