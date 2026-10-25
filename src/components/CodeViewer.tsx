import React, { useState } from 'react';

export const CodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'config' | 'gemini' | 'firebase' | 'env'>('config');

  const codeSnippets = {
    config: `// lib/config.ts
// Configuración dinámica de dual-mode: Mock Simulator vs. Cloud Native APIs

export interface AppConfig {
  useRealFirebase: boolean;
  useRealGeminiAI: boolean;
  activeLanguage: 'ES' | 'EN' | 'PT' | 'FR';
  defaultCurrency: 'USD' | 'EUR' | 'CLP' | 'PEN';
  altitudeSafetyThresholdMeters: number;
}

export const APP_CONFIG: AppConfig = {
  // Cuando se agregan las credenciales en Vercel/Firebase, se cambia a true
  useRealFirebase: process.env.NEXT_PUBLIC_USE_REAL_FIREBASE === 'true',
  useRealGeminiAI: process.env.NEXT_PUBLIC_USE_REAL_GEMINI === 'true',
  activeLanguage: 'ES',
  defaultCurrency: 'USD',
  altitudeSafetyThresholdMeters: 4200, // Alerta médica preventiva sobre 4.200 msnm
};`,

    gemini: `// lib/geminiService.ts
import { GoogleGenAI } from "@google/genai";
import { APP_CONFIG } from "./config";

export async function lookupDestinationWithGrounding(query: string) {
  // Llamada Real al SDK de Google Gemini 3.8 con Google Search Grounding
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: \`Investiga el destino andino: "\${query}". Devuelve altitud, clima, qué llevar y aduanas.\`,
    config: {
      tools: [{ googleSearch: {} }], // Google Search Grounding activado
    },
  });

  // Extracción de citas web con URLs reales
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    sources: chunks.map(c => c.web?.uri)
  };
}`,

    firebase: `// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";
import { APP_CONFIG } from "./config";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const app = !getApps().length && APP_CONFIG.useRealFirebase 
  ? initializeApp(firebaseConfig) 
  : null;

export const db = app ? getFirestore(app) : null;

// Guardado de cotizaciones con fallback instantáneo a localStorage
export async function persistQuote(quoteData: Record<string, any>) {
  if (db) {
    const quoteRef = doc(db, "quotes", quoteData.id);
    return await setDoc(quoteRef, quoteData);
  } else {
    const existing = JSON.parse(localStorage.getItem("triangulo_quotes") || "[]");
    existing.push({ ...quoteData, savedAt: new Date().toISOString(), mode: "local_mock" });
    localStorage.setItem("triangulo_quotes", JSON.stringify(existing));
    return true;
  }
}`,

    env: `# .env.example - Triángulo Andino Travel Full-Stack
NEXT_PUBLIC_USE_REAL_FIREBASE=false
NEXT_PUBLIC_USE_REAL_GEMINI=true

# Google Gemini AI & Grounding Keys
GEMINI_API_KEY=MY_GEMINI_API_KEY

# Firebase Client Configuration (Firestore & Auth)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=triangulo-andino.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=triangulo-andino
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=triangulo-andino.appspot.com

# WhatsApp Concierge Gateway
CONCIERGE_WHATSAPP_NUMBER=+56982349900`
  };

  return (
    <div id="architecture-section" className="mt-16 bg-stone/30 p-6 lg:p-10 rounded-2xl border border-black/10 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-terracotta-strong text-2xl">
              developer_board
            </span>
            <h3 className="font-serif text-2xl font-semibold text-chocolate">
              Arquitectura Dual Full-Stack (Inspect Code & Config)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-earth mt-1 max-w-3xl leading-relaxed">
            Demostración transparente para ingenieros y arquitectos cloud: Código listo para producción con selector de modo Offline Mock vs. Producción Real con Google Gemini 3.8 Pro & Firestore.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-white text-terracotta-strong text-xs uppercase font-bold tracking-wider border border-black/10">
            Production-Ready TS
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 pb-2 overflow-x-auto">
        {(['config', 'gemini', 'firebase', 'env'] as const).map((tab) => {
          const labels = {
            config: 'lib/config.ts',
            gemini: 'lib/geminiService.ts',
            firebase: 'lib/firebase.ts',
            env: '.env.example'
          };
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded text-xs uppercase font-bold transition-all ${
                activeTab === tab
                  ? 'bg-chocolate text-white shadow-xs'
                  : 'bg-white text-earth hover:text-chocolate border border-black/10'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Code Display */}
      <div className="bg-chocolate text-stone p-5 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed mt-2 shadow-inner border border-white/10">
        <pre className="block">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
};
