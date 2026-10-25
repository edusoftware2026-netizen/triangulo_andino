# 📄 INFORME TÉCNICO — Auditoría UX/UI
**Proyecto:** Triángulo Andino / DeiTaNa Travel (React 19 + Vite + Tailwind v4)
**Fecha de auditoría:** 25/10/2026 · **Alcance:** `src/` completo (6.968 líneas en vistas/componentes)
**Modo:** Solo lectura — sin modificaciones aplicadas
**Referencia visual:** https://pukarumitravels.com/

---

## 1. RESUMEN EJECUTIVO

| Dimensión | Estado | Métrica clave |
|---|---|---|
| Contraste y color | 🔴 Crítico | 22 usos de `text-gold` vs. 3 de `gold-text` |
| Accesibilidad (a11y) | 🔴 Crítico | 13 atributos ARIA en 7.000 LOC; 0 soporte reduced-motion |
| Coherencia tipográfica | 🟠 Alto | 164 instancias de `uppercase` vs. norma sentence case |
| Robustez de assets | 🟠 Alto | 72 URLs CDN Pexels; 0 lazy loading en 18 `<img>` |
| Arquitectura | 🟡 Medio | AdminView = 2.721 LOC monolíticos |
| Higiene de código | 🟢 Bueno | 0 `console.log` residuales |

**Veredicto:** El design system está correctamente tokenizado en `src/index.css`, pero la capa de consumo (vistas) ignora sistemáticamente los tokens de contraste y las directrices del manual "Andean Vanguard". La deuda es de **aplicación**, no de definición.

---

## 2. BASE DE REFERENCIA: TOKENS VERIFICADOS

`src/index.css` (líneas 17-18):
```css
--color-gold:      #D4A373;  /* decorativo: bordes, iconos sobre oscuro */
--color-gold-text: #8C6239;  /* texto legible sobre cream — obligatorio WCAG */
```
El token correcto ya existe y está disponible vía `text-gold-text`. El problema es puramente de adopción.

---

## 3. HALLAZGOS DETALLADOS (con evidencia)

### F-P1-01 · Contraste insuficiente: `text-gold` como texto
- **Evidencia:** 22 ocurrencias distribuidas:
  - `src/views/HomeView.tsx` → **15** (foco principal)
  - `src/components/VoucherModal.tsx` → 2 · `StripeCheckoutModal.tsx` → 2
  - `RouteBuilderView.tsx` → 1 · `Navbar.tsx` → 1 · `Footer.tsx` → 1
- **Análisis cromático:** `#D4A373` sobre fondo cream `#FDF8F3` ≈ **1.9:1** (WCAG exige ≥4.5:1 texto normal). Sobre charcoal pasa, pero viola la regla de marca §4 (oro solo decorativo).
- **Fix:** Reemplazo dirigido `text-gold` → `text-gold-text` en contexto de texto; conservar `border-gold`/`text-gold` solo en elementos decorativos sobre oscuro.
- **Estimación:** ~40 min · Riesgo: bajo · Impacto: alto (contraste global).

### F-P1-02 · Uso residual de `black/` opacidades
- **Evidencia:** 15 ocurrencias: `AdminView.tsx` (10), `CodeViewer.tsx` (3), `HomeView.tsx` (2).
- **Fix:** Mapear a scrim cálido `rgba(62,50,44,α)` (charcoal) según manual.
- **Estimación:** 30 min · Riesgo: bajo.

### F-P2-01 · Sin soporte `prefers-reduced-motion`
- **Evidencia:** 0 coincidencias de `prefers-reduced-motion` / `useReducedMotion` en todo `src/`. Lenis se instancia incondicionalmente en `src/App.tsx:70`.
- **Fix propuesto:**
  1. Guard en `App.tsx`: `matchMedia('(prefers-reduced-motion: reduce)').matches` → inicializar Lenis con `duration: 0` o skip.
  2. CSS global: `@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }`
- **Nota positiva:** Ya existe pausa de Lenis con modales abiertos (`App.tsx:98`) y fallback `window.scrollTo` (`App.tsx:131`).
- **Estimación:** 1 h · Riesgo: medio (verificar que el scroll-to-top por cambio de vista siga funcionando) · Impacto: WCAG 2.3.3 / reducción de motion sickness.

### F-P2-02 · Cobertura ARIA mínima (13 attrs / 7.000 LOC)
- **Distribución actual verificada:** HomeView (7), PackageDetailView (2), RouteBuilderView (1), Navbar (1), StripeCheckoutModal (1), VoucherModal (1).
- **Brechas concretas:**
  - Modales (Stripe/Voucher): falta `role="dialog"`, `aria-modal="true"`, foco atrapado y `aria-labelledby`.
  - Cotizador de `RouteBuilderView`: sin live region (`aria-live="polite"`) para resultados asíncronos de IA.
  - Toasts de `AdminView` (`showToast`, línea 101): sin announced region.
  - Icon-buttons: sin `aria-label` consistente.
- **Estimación:** 3-4 h · Riesgo: bajo · Impacto: Lighthouse a11y 95+.

### F-P2-03 · Emojis en interfaz (23 ocurrencias)
- **Evidencia:** `Navbar.tsx:29` (`✨ ${t.navBuilder}` — teniendo ya un icon Material `auto_awesome` redundante); banderas `🇨🇱🇧🇴🇵🇪` en `data/mockData.ts` (líneas 871-919); `✨` en CTA de `translations.ts:366,589`.
- **Fix:** Eliminar ✨ duplicados; banderas → componente SVG o badge con código ISO + nombre accesible.
- **Estimación:** 1-2 h · Riesgo: bajo.

### F-P3-01 · Sobrerrepresentación de `uppercase` (164 usos)
- **Análisis:** No todos son violatorios — los *eyebrows/kickers* (§6.2 del manual) sí usan uppercase+tracking. La auditoría debe clasificar: eyebrow (permitido) vs. títulos hero/body (deben ser sentence case).
- **Método:** `grep -rn "uppercase" src/` → triage por componente; priorizar jerarquía h1/h2 en HomeView y PackageDetailView.
- **Estimación:** 2-3 h · Riesgo: medio (impacta percepción de marca) · Requiere aprobación de diseño.

### F-P3-02 · Dependencia de CDN externo (72 URLs Pexels)
- **Riesgos:** hotlinking inestable, sin control de formato, LCP expuesto a terceros.
- **Estado actual:** 18 tags `<img>` con **0** `loading="lazy"` ni `fetchpriority`.
- **Fix en 2 pasos:**
  1. **Quick win:** añadir `loading="lazy"` + `width/height` a imágenes under-the-fold; `fetchpriority="high"` al hero.
  2. **Migración:** assetizar en `public/assets/` (paridad con referencia pukarumitravels.com, que sirve imágenes propias optimizadas).
- **Estimación:** quick win 1 h; migración 3-4 h · Riesgo: bajo.

### F-P3-03 · Números sin alineación tabular
- **Evidencia:** 0 usos de `tabular-nums`. Afecta precios del cotizador, altitudes (m.s.n.m.) y comparadores de `AdminView`.
- **Fix:** clase `.num` utilitaria (`font-variant-numeric: tabular-nums`) aplicada a campos monetarios/métricos.
- **Estimación:** 45 min · Riesgo: bajo.

### F-P4-01 · Deuda estructural: vistas monolíticas
| Archivo | LOC | Problema |
|---|---|---|
| `views/AdminView.tsx` | **2.721** | ≥12 handlers en un solo componente (branding, paquetes, hoteles, media, galerías, toasts…) |
| `views/RouteBuilderView.tsx` | 1.083 | formulario + resultados IA + mapa sin separación |
| `views/HomeView.tsx` | 1.038 | secciones hero/features/testimonios inline |
| Resto (7 archivos) | 2.126 | tamaño saludable |

- **Plan de refactor incremental (sin big-bang):** extraer primero bloques reutilizables (`ui/SectionHeading`, `ui/Field`, `ui/ModalShell` con foco atrapado resuelve también F-P2-02). Dividir AdminView por pestaña/tab en subcomponentes bajo `views/admin/`.
- **Ventaja colateral:** los fixes P1/P2 se aplican una vez en componentes compartidos en vez de 22+ sitios.
- **Estimación:** 2-3 días repartidos · Riesgo: medio (requiere smoke test de rutas admin).

---

## 4. HOJA DE RUTA POR FASES

| Fase | Tareas | Hours est. | Criterio de salida |
|---|---|---|---|
| **1. Quick Wins** | F-P1-01, F-P1-02, F-P3-03 | 2.5 h | `grep text-gold` = 0 en contexto texto; `black/` = 0 |
| **2. Motion seguro** | F-P2-01 | 1 h | Lenis + animaciones respetan OS setting |
| **3. ARIA pass** | F-P2-02, F-P2-03 | 4-6 h | axe-core: 0 violations críticas |
| **4. Tipografía & copy** | F-P3-01 | 2-3 h | Triage aprobado por diseño |
| **5. Assets** | F-P3-02 | 4-5 h | LCP < 2.5 s; 0 dependencias pexels críticas |
| **6. Refactor** | F-P4-01 | 16-24 h | AdminView < 800 LOC; componentes compartidos adoptados |
| **7. QA final** | — | 3 h | Lighthouse ≥95 a11y / ≥90 perf; checklist §12 manual ✅ |

**Total estimado:** ~5-7 días de trabajo concentrado. Las fases 1-2 son independientes y reversibles individualmente (un commit por fase, revertible con `git revert`).

## 5. PLAN DE PRUEBAS
1. **Contraste:** WebAIM checker sobre los pares corregidos (meta ≥4.5:1 texto, ≥3:1 UI).
2. **A11y automatizada:** `axe-core` + Lighthouse Accessibility en 5 vistas clave.
3. **Teclado:** flujo completo del cotizador y checkout sin ratón; Escape cierra modales devolviendo foco.
4. **Motion:** toggle de `prefers-reduced-motion` en DevTools → verificar scroll instantáneo.
5. **Visual diff:** capturas antes/después por vista (Chromatic-like manual) contra referencia pukarumitravels.com.
6. **Regresión admin:** CRUD de paquetes/hoteles/media tras refactor.

## 6. RIESGOS Y MITIGACIONES
- **R1 — Retrabajo si el refactor (Fase 6) va después de los fixes:** mitigado extrayendo `ModalShell`/`SectionHeading` en la Fase 3, que absorbe parte de la Fase 6.
- **R2 — Cambio perceptual de marca al eliminar uppercase/emojis:** validar con stakeholder antes de la Fase 4 (punto de decisión explícito).
- **R3 — Migración de assets rompe URLs en data dinámica (`mockData.ts`):** script de reescritura centralizada + fallback roto→placeholder.

---
*Este informe no introduce cambios en el repositorio. Cada hallazgo es reproducible con los comandos grep citados sobre HEAD actual.*
