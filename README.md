# Triángulo Andino - Portal de Turismo y Hotelería

> Plataforma de Turismo Receptivo y Expediciones de Alta Gama en Chile, Bolivia y Perú con Inteligencia Artificial (Google Gemini 3.8 Flash), scroll cinemático de lujo (Lenis) y CMS administrativo en vivo.

---

## 🌟 Características Principales

- **Catálogo de Expediciones de Autor:** Circuitos exclusivos por San Pedro de Atacama, Salar de Uyuni, Cusco, Machu Picchu y Lago Titicaca.
- **Generador Inteligente de Paquetes con IA (Gemini 3.8 Flash):** Creación y publicación de paquetes turísticos en tiempo real con georreferenciación andina y síntesis multilenguaje (ES, EN, PT, FR).
- **Armador Interactivo de Rutas:** Cálculo altimétrico preventivo de aclimatación, cotización de modalidades (Completo vs Solo Expedición) y optimización con Google Grounding.
- **Experiencia de Usuario de Lujo (Lenis Scroll):** Navegación fluida con inercia física exponencial, tipografía editorial en *EB Garamond* y diseño responsive con Tailwind CSS v4.
- **Panel Administrativo (CMS Completo):** Gestión de portada, branding, catálogo de paquetes, vitrina hotelera, hitos altimétricos y reservas con cálculo de rentabilidad.
- **Checkout Seguro con Stripe & Vouchers Criptográficos:** Emisión instantánea de salvoconductos oficiales con código QR y confirmación vía WhatsApp Concierge.

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js** (v18 o superior)
- **npm** (v9 o superior)

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/edusoftware2026-netizen/triangulo_andino.git
   cd triangulo_andino
   ```

2. **Instalar dependencias:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configurar variables de entorno:**
   Copia el archivo `.env.example` como `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Opcional: Agrega tu `GEMINI_API_KEY` de [Google AI Studio](https://aistudio.google.com/app/apikey). Si no la configuras, el sistema cuenta con generadores inteligentes de respaldo).*

4. **Ejecutar en entorno de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

5. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion v12), Lucide Icons
- **Experiencia Sensorial:** Lenis Smooth Scroll
- **Inteligencia Artificial:** Google GenAI SDK (`@google/genai`) con modelos Gemini 3.8 Flash y Google Search Grounding
- **Backend / Servidor:** Express.js + Vite 8
