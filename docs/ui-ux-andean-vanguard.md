# Andean Vanguard Luxury — Guía UI/UX
### Aplicación en Triángulo Andino · Chile, Bolivia y Perú
**Versión 1.0 · Recomendaciones de interfaz y experiencia**

---

## 1. Resumen ejecutivo

La nueva paleta es correcta para la marca: aporta calidez editorial, diferencia el producto del “lujo azul marino” genérico y dialoga mejor con la fotografía andina. Para que funcione, la interfaz debe cumplir estas seis reglas:

1. **Lino es el lienzo; Chocolate estructura; Oliva acciona; Terracotta advierte; Oro recompensa.**
2. **Una sola acción principal por pantalla.** El Oliva no se usa para decorar.
3. **Máximo dos acentos por viewport.** Si hay Oliva, Terracotta y Oro compitiendo, no hay jerarquía.
4. **Menos sombras, más bordes finos.** La profundidad se construye con capas y líneas, no con `box-shadow` difusas.
5. **Una banda Chocolate por página larga.** Sin ella, el sitio se vuelve beige y plano.
6. **Contraste primero.** Cuatro valores del manual deben ajustarse para cumplir AA.

---

## 2. Paleta y reglas de uso

### 2.1 Colores base

| Rol | Color | Hex | Uso |
|---|---|---|---|
| Fondo general | Lino | `#F9F6F0` | Lienzo base, secciones editoriales |
| Texto principal | Chocolate | `#3E322C` | Titulares, cuerpo, bordes fuertes |
| Tarjetas / paneles | Piedra suave | `#E5DFD5` | Bandas, pies de tarjeta, filtros |
| Superficie elevada | Blanco alabastro | `#FFFFFF` | Tarjetas sobre Lino |
| Acción principal | Oliva | `#5B6E52` | CTA de reserva, estados activos |
| Acción hover | Oliva profundo | `#44543D` | Hover de CTA principal |
| Acento artesanal | Terracotta | `#C2694E` | Detalles, iconos, bordes, no texto |
| Detalle premium | Oro incaico | `#D4A373` | Ratings, insignias, filetes |
| Texto secundario | Tierra media | `#6B5B52` | Descripciones, metadatos |
| Borde de tarjeta | Chocolate 12% | `rgba(62,50,44,.12)` | Separación de nivel 1 |
| Borde de control | Chocolate 25% | `rgba(62,50,44,.25)` | Inputs y selects |
| Outline decorativo | Piedra oscura | `#B5AB9F` | Divisores, no controles |

### 2.2 Correcciones de contraste obligatorias

Estos valores sustituyen al manual original donde el contraste no cumple AA:

| Necesidad | Valor corregido | Contraste |
|---|---|---:|
| Terracotta como texto o enlace | `#A9543A` | 4.85:1 sobre Lino |
| Terracotta sólido con texto blanco | `#9E4A32` | 6.04:1 con blanco |
| Oro como texto o icono sobre claro | `#8C6239` | 4.96:1 sobre Lino |
| Borde de inputs y controles | `#8A7C6E` | 3.75:1 sobre Lino |
| Placeholder | `#7A6C5E` | 5.08:1 sobre blanco |
| Alerta terracotta suave | Fondo `#F3DFD5` + texto `#7A3B2A` | 6.57:1 |
| Error | `#A94B3F` | 5.17:1 sobre Lino |
| Éxito | `#4F6B4A` | 5.51:1 sobre Lino |
| Advertencia | `#8C6239` | 4.96:1 sobre Lino |
| Scrim de fotografía | `#2E2520` | Base cálida, no negra |

> **Regla:** `#C2694E` y `#D4A373` son colores de **relleno, borde, icono o decoración**. Nunca de texto corrido. `#C2694E` con texto blanco solo se admite en titulares de 24 px o más.

### 2.3 Distribución 75 / 20 / 5

La proporción es una guía de jerarquía, no una medición exacta:

- **75%** Lino y blanco: fondos, aire, superficies.
- **20%** Chocolate: tipografía, líneas, una banda oscura.
- **5%** Oliva + Terracotta + Oro: solo acciones, estados y detalles.

**Regla práctica por pantalla:**
- 1 CTA Oliva.
- 1–2 elementos Terracotta como máximo.
- Oro únicamente en rating, insignia o filete.
- Si hay dos CTAs principales, uno debe ser secundario con borde Chocolate.

### 2.4 Prohibiciones

- No usar `#000000` ni `black/…`. Sustituir por `rgba(62,50,44,α)`.
- No usar Oro como texto sobre Lino.
- No usar Terracotta como texto de párrafo o enlace de 12–14 px.
- No usar blanco sobre Terracotta en botones pequeños.
- No usar Oliva como color de cuerpo de texto.
- No mezclar Terracotta y Oro en el mismo bloque de texto.
- No usar más de una banda Chocolate por página.
- No usar sombras difusas en tarjetas.

---

## 3. Tipografía

### 3.1 Reparto de voces

| Fuente | Rol | Uso |
|---|---|---|
| **EB Garamond** | Voz editorial | Portadas, titulares de expedición, precios, citas, cabeceras de sección |
| **Plus Jakarta Sans** | Voz funcional | Itinerarios, metadatos, coordenadas, labels, botones, formularios, tablas |

### 3.2 Escala

| Estilo | Fuente | Tamaño / interlineado | Caja | Uso |
|---|---|---|---:|---|
| Display | EB Garamond | `clamp(34px, 4vw, 56px)` / 1.08 | Oración | Hero y portada |
| Headline LG | EB Garamond | `clamp(26px, 3vw, 40px)` / 1.15 | Oración | Títulos de sección |
| Headline MD | EB Garamond | 28px / 1.25 | Oración | Título de tarjeta grande |
| Headline SM | EB Garamond | 22px / 1.35 | Oración | Título de tarjeta |
| Body LG | Plus Jakarta | 18px / 28px | Oración | Introducciones |
| Body MD | Plus Jakarta | 15px / 24px | Oración | Texto general |
| Body SM | Plus Jakarta | 13px / 20px | Oración | Metadatos, ayudas |
| Label LG | Plus Jakarta | 14px / 20px · 600 | Mayúsculas | Botones y tabs |
| Label MD | Plus Jakarta | 12px / 16px · 600 | Mayúsculas | Metadatos |
| Label SM | Plus Jakarta | 11px / 14px · 700 | Mayúsculas | País, región, códigos |

### 3.3 Reglas

- **Sentence case en español.** “Colección de rutas del Triángulo Andino”, no “Colección de Rutas del Triángulo Andino”.
- **Mayúsculas solo en labels cortos**, nunca en titulares ni párrafos.
- **Máximo dos pesos por vista.** EB Garamond 400/500; Jakarta 400/600/700.
- **No usar EB Garamond en negrita para bloques largos.** En titulares, 500–600 es suficiente.
- **Ancho de lectura:** 60–75 caracteres; párrafos de 2–3 líneas en móvil.
- **Números tabulares** en precios, altitudes, duraciones y tablas. Usar Plus Jakarta para métricas; EB Garamond solo para el precio protagonista.
- **Precio:** EB Garamond 28–32 px, sin negrita excesiva; moneda en Label SM.
- **Tracking:** `0.08em` en Label SM, `0.06em` en Label MD, `0.04em` en Label LG.
- **Puntos suspensivos y guiones:** usar `…` y `—`, no `...` ni `-`.

---

## 4. Layout y espaciado

### 4.1 Retícula

| Breakpoint | Columnas | Margen lateral | Gutter | Ancho máximo |
|---|---:|---:|---:|---:|
| Escritorio ≥1280 px | 12 | 80px (5rem) | 40px (2.5rem) | 1440px |
| Tableta 768–1279 px | 8 | 48px (3rem) | 24px (1.5rem) | 100% |
| Móvil <768 px | 4 | 24px (1.5rem) | 24px (1.5rem) | 100% |

**Reglas:**
- El contenido nunca toca el borde: mínimo 24 px en móvil.
- La barra de navegación usa el mismo margen que el contenido.
- El máximo de 1440 px incluye el margen; no centrar bloques de 1440 px con padding extra.
- En escritorio, el margen de 80 px debe ser visible; no reducirlo a 48 px por comodidad.

### 4.2 Ritmo vertical

Escala de 8 px: `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120`.

| Espacio | Escritorio | Tableta | Móvil |
|---|---:|---:|---:|
| Entre secciones | 120px | 80px | 56px |
| Cabecera de sección → contenido | 48px | 40px | 32px |
| Título → párrafo | 12–16px | 12px | 12px |
| Párrafo → CTA | 24px | 24px | 20px |
| Padding de tarjeta | 32px | 24px | 24px |
| Gap de grilla | 40px | 24px | 24px |

### 4.3 Composición

- **Home:** grilla de 12 columnas; catálogo en 3 tarjetas de 4 columnas; en tableta 2 de 4; en móvil 1 de 4.
- **Buscador del hero:** 5 campos en escritorio (2.4 columnas cada uno), 2 en tableta, 1 en móvil. El CTA ocupa el ancho completo en móvil.
- **Detalle:** 7 columnas de contenido + 5 de cotización; en móvil, una columna y barra inferior fija.
- **Armador:** 8 columnas de selección + 4 de resumen; resumen sticky en escritorio.
- **Texto editorial:** máximo 720 px de ancho.
- **Tablas del Admin:** scroll horizontal en móvil; no colapsar filas en tarjetas.

---

## 5. Elevación y profundidad

| Nivel | Uso | Tratamiento |
|---|---|---|
| 0 | Lienzo | Lino `#F9F6F0` |
| 1 | Tarjetas y paneles | Blanco o Piedra + borde `1px rgba(62,50,44,.12)`. Sin sombra. |
| 2 | Menús, dropdowns, buscador flotante | Fondo claro + `0 12px 32px -4px rgba(62,50,44,.08)` y `0 4px 12px -2px rgba(62,50,44,.04)` |
| 3 | Modales | Overlay `rgba(62,50,44,.65)` + tarjeta blanca + sombra de nivel 2 |

**Reglas:**
- Las tarjetas no “flotan” al hover. El feedback es borde + zoom de foto.
- No usar `shadow-xl` ni `shadow-2xl` en tarjetas.
- No usar sombra para separar secciones; usar borde o cambio de superficie.
- El overlay de modal no es negro; es Chocolate al 65%.
- El hero puede usar un scrim cálido `#2E2520` para garantizar legibilidad.

---

## 6. Formas y geometría

| Elemento | Radio | Ejemplo |
|---|---:|---|
| Campos, botones, selects, tabs | 4px | `rounded` |
| Tarjetas, imágenes, modales, menús | 8px | `rounded-lg` |
| Chips, badges, avatares, pills | Full | `rounded-full` |

**Reglas:**
- No usar 12 px ni 16 px en contenedores.
- No mezclar radios dentro de un mismo componente.
- La foto de tarjeta hereda el radio superior de 8 px; el pie, el inferior.
- Los botones de icono pueden ser cuadrados de 4 px o circulares; no ambos en la misma barra.
- Los inputs de 44 px de alto con radio 4 px se ven deliberadamente arquitectónicos; no aumentarlos a 8 px “para suavizar”.

---

## 7. Componentes

### 7.1 Navegación superior

- Altura 80 px en escritorio, 64 px en móvil.
- Fondo Lino o blanco al 95%, `backdrop-blur` 8 px, borde inferior `rgba(62,50,44,.12)`.
- Logo: símbolo de montaña en Oro sobre cuadrado Oliva o Chocolate; texto en Chocolate.
- Ítem activo: texto Chocolate + subrayado Oliva de 2 px. No llenar de Oliva toda la barra.
- Ítem “Armador IA”: texto `#A9543A`, no naranja.
- Selector de idioma/moneda: contenedor Piedra, radio 4 px, texto Chocolate; activo con fondo blanco y borde fino.
- CTA Concierge: Oliva, texto blanco, radio 4 px. Es la acción principal de la barra.
- Móvil: drawer Lino a pantalla completa, ítems de 48 px, cierre visible.

### 7.2 Botones

| Variante | Fondo | Texto | Borde | Hover | Uso |
|---|---|---|---|---|---|
| Primario | `#5B6E52` | Blanco | Ninguno | `#44543D` | Reservar, continuar, pagar |
| Secundario | Transparente | `#3E322C` | `1px #3E322C` | Fondo `#3E322C`, texto blanco | Descargar itinerario, explorar |
| Terciario | Transparente | `#A9543A` | Ninguno | Subrayado + flecha +4 px | Enlaces de acción |
| Destructivo | Transparente | `#A94B3F` | `1px #A94B3F` | Fondo `#A94B3F`, texto blanco | Eliminar, cancelar reserva |

**Especificaciones:**
- Padding: `14px 32px`; altura mínima 44 px.
- Radio: 4 px.
- Transición: color 250 ms; sin rebote ni `scale`.
- Un solo primario por pantalla.
- El hover del primario es **Oliva profundo**, no Terracotta. El Terracotta se reserva para alertas y atención.
- Deshabilitado: fondo Piedra, texto `#7A6C5E`, sin sombra, `cursor: not-allowed`.
- Loading: spinner de 16 px + texto “Procesando…”; mantener el ancho para no saltar.

### 7.3 Campos de entrada y selectores

- Fondo blanco sobre Lino; Piedra sobre blanco.
- Borde `1px rgba(62,50,44,.25)`; radio 4 px.
- Padding `14px 16px`; altura 44–48 px.
- Label arriba, Label SM mayúsculas, Chocolate; opcional “(opcional)”.
- Placeholder `#7A6C5E`, nunca más claro.
- Focus: borde Oliva + anillo de 2 px `rgba(91,110,82,.35)`. Nunca eliminar el foco sin reemplazo.
- Error: borde `#C2694E`, texto `#A94B3F`, icono de alerta y mensaje debajo. No solo color.
- Éxito: borde `#4F6B4A`, check discreto.
- Select: chevron a la derecha, 16 px, Chocolate; mismo foco.
- Búsqueda: icono a la izquierda, 16 px desde el borde; no usar placeholder como label.

### 7.4 Tarjeta de expedición

**Anatomía:**
1. **Imagen** 3:2 o 16:10, radio superior 8 px, zoom `1.03` en 600 ms al hover.
2. **Barra superior** de 36 px, fondo `rgba(62,50,44,.72)`, blur 8 px, label SM blanca: `BOLIVIA // SALAR DE UYUNI`.
3. **Máximo dos badges sobre la foto:** país/región y rating. Nada más.
4. **Cuerpo** blanco o Piedra, padding 24–32 px.
5. **Eyebrow** Label SM `#A9543A`: “Circuito insignia” o “Generado por IA”.
6. **Título** EB Garamond 24–28 px, Chocolate, sentence case, máximo 2 líneas.
7. **Tagline** 14/22, `#6B5B52`, máximo 2 líneas.
8. **Métricas** altitud y duración en Plus Jakarta 12 px, tabulares, iconos Oliva.
9. **Pie** Piedra `#E5DFD5` o blanco con borde superior; precio EB Garamond 28 px + moneda Label SM; CTA primario.
10. **Hover:** zoom de imagen + borde `rgba(62,50,44,.20)`. Sin sombra.
11. **Seleccionada:** borde Oliva de 2 px + check; no solo cambio de color.

**Prohibiciones:**
- No usar cuatro badges flotantes.
- No usar `rounded-2xl`.
- No usar `hover:shadow-xl`.
- No poner el precio en naranja.

### 7.5 Badges, chips y ratings

- **País/región:** Chocolate translúcido + texto blanco, label SM, radio 4 px.
- **Rating:** fondo Oro `#D4A373` + texto Chocolate; estrella rellena. Sobre foto oscura, Oro con textura/contorno.
- **Estado:** fondo suave + texto oscuro; nunca sólido saturado.
- **Chips de filtro:** full, borde 1 px, texto Chocolate; activo Oliva con texto blanco.
- **Máximo 2 badges por tarjeta** y 1 por bloque de contenido.

### 7.6 Alertas y mensajes

| Tipo | Fondo | Borde | Texto | Icono |
|---|---|---|---|---|
| Información | `#F4F0E8` | `#D5CEC6` | `#3E322C` | Oliva |
| Éxito | `#EEF3EC` | `#C9D6C4` | `#4F6B4A` | Check |
| Advertencia | `#F7EEDF` | `#E7D3B4` | `#8C6239` | Alerta |
| Error | `#F7E3DF` | `#E5BDB5` | `#A94B3F` | Alerta |

- Radio 4 px; padding 12–16 px.
- No usar bloques rojos o verdes saturados.
- El error debe incluir texto, no solo color.

### 7.7 Modales

- Overlay `rgba(62,50,44,.65)` + blur 8 px.
- Tarjeta blanca, radio 8 px, máximo 640 px (formulario) o 960 px (voucher).
- Cabecera de 64 px, título EB Garamond 24 px, cierre de 44 px.
- Móvil: bottom sheet de ancho completo, radio superior 8 px, altura máxima 92 vh.
- Bloquear scroll de fondo, atrapar foco, cerrar con Esc y con clic en overlay.
- Checkout: una columna en móvil; resumen sticky en escritorio.
- Voucher: imprimible en blanco, sin overlay ni fondos pesados; QR de 144 px; borde 1 px.

### 7.8 Panel administrativo

El Admin no debe convertirse en Lino: perdería densidad y legibilidad. Usar un **dark cálido**:

| Rol | Color |
|---|---|
| Fondo | `#2A211D` |
| Superficie | `#332923` |
| Superficie elevada | `#3E322C` |
| Borde | `#5A4C42` |
| Texto | `#F9F6F0` |
| Texto secundario | `#D8CEC2` |
| Primario | `#5B6E52` |
| Éxito | `#4F6B4A` |
| Advertencia | `#8C6239` |
| Peligro | `#A94B3F` |
| Oro | `#D4A373` |

- Tablas de 12–13 px, filas de 44 px, números tabulares.
- Tabs de 40 px; activo con subrayado Oliva.
- Charts: no usar solo los tres acentos de marca; añadir etiquetas, patrones o una quinta serie neutra.
- Mantener el esquema oscuro en todo el panel para no romper la lectura de datos.

### 7.9 Estados

| Estado | Tratamiento |
|---|---|
| Hover | Cambio de color 250 ms; sin sombra; sin escala salvo foto 1.03 |
| Focus | Anillo Oliva 2 px + offset 2 px; visible en teclado |
| Active / pressed | Oscurecer 8–10%; sin rebote |
| Disabled | Piedra + texto `#7A6C5E`; sin sombra; cursor bloqueado |
| Loading | Skeleton Piedra o spinner Oliva; mantener layout |
| Empty | Ilustración discreta + título EB Garamond + CTA secundario |
| Error | Alerta suave Terracotta + acción de recuperación |
| Selected | Borde Oliva 2 px + check; nunca solo color |

### 7.10 Navegación móvil

- Drawer Lino a pantalla completa; ítems de 48 px.
- CTA Concierge fija al final del drawer.
- Selector de moneda dentro del drawer, no oculto.
- Cerrar con gesto, botón y Esc.
- En detalle, barra inferior fija con precio + “Reservar”.

---

## 8. Contenido y microcopy

- **Sentence case** en títulos, botones y párrafos. Solo labels y códigos van en mayúsculas.
- **Botones = verbo + objeto:** “Reservar expedición”, “Descargar itinerario”, “Explorar rutas”, “Ajustar con IA”. Evitar “Enviar”, “Ver más”, “OK”.
- **Labels = sustantivo corto:** “ALTITUD MÁX.”, “DURACIÓN”, “PAÍS / REGIÓN”, “SALIDAS”.
- **Tono:** sereno, preciso, sensorial; sin superlativos vacíos ni signos de exclamación.
- **Emojis:** evitar en la interfaz principal. Usar iconos de Material Symbols. Las banderas se admiten solo en filtros, no en tarjetas editoriales.
- **Números:** `3.656 msnm`, `8 días / 7 noches`, `USD 4.850`. Usar separador de miles local y numerales tabulares.
- **Fechas:** “12–19 nov 2026”, no “12/11/2026” en contexto editorial.
- **País / región:** `BOLIVIA // SALAR DE UYUNI` en labels; “Bolivia · Salar de Uyuni” en cuerpo.
- **Errores:** explicar qué pasó y cómo resolverlo; no culpar al usuario.

---

## 9. Accesibilidad

### 9.1 Contraste mínimo

| Combinación | Ratio | ¿AA? |
|---|---:|---|
| Chocolate / Lino | 11.47 | ✅ |
| `#6B5B52` / Lino | 6.00 | ✅ |
| Blanco / Oliva | 5.53 | ✅ |
| Blanco / Oliva profundo | 8.14 | ✅ |
| Blanco / Terracotta | 3.87 | ❌ texto normal |
| Terracotta / Lino | 3.59 | ❌ texto normal |
| Oro / Lino | 2.10 | ❌ |
| Chocolate / Oro | 5.47 | ✅ |
| Blanco / Chocolate | 12.37 | ✅ |
| Borde `#8A7C6E` / Lino | 3.75 | ✅ UI |

### 9.2 Reglas

- **Foco visible** en todos los interactivos: anillo Oliva 2 px + offset 2 px.
- **Objetivos táctiles** de 44 × 44 px mínimo.
- **No depender del color** para selección, error o estado; añadir icono, texto o patrón.
- **Formularios:** label asociado, `autocomplete`, mensaje de error junto al campo, resumen de errores al enviar.
- **Imágenes:** alt descriptivo en fotos de expedición; alt vacío en decorativas.
- **Texto sobre foto:** scrim mínimo `rgba(46,37,32,.55)` y verificar 4.5:1.
- **Movimiento:** respetar `prefers-reduced-motion`; desactivar zoom, parallax y Lenis si es necesario.
- **Idioma:** `lang` correcto por vista; no mezclar ES/EN en el mismo bloque.
- **Print:** voucher legible en blanco y negro; no depender de fondos.

---

## 10. Responsive

| Elemento | Móvil <768 | Tableta 768–1279 | Escritorio ≥1280 |
|---|---|---|---|
| Navegación | Drawer + 64 px | Menú horizontal + 80 px | Menú horizontal + 80 px |
| Buscador hero | 1 columna | 2 columnas | 5 columnas |
| Catálogo | 1 tarjeta | 2 tarjetas | 3 tarjetas |
| Detalle | 1 columna + barra fija | 7/5 columnas | 7/5 columnas |
| Armador | 1 columna + resumen al final | 8/4 con resumen sticky | 8/4 con resumen sticky |
| Modales | Bottom sheet | Modal centrado | Modal centrado |
| Tablas Admin | Scroll horizontal | Scroll horizontal | Tabla completa |
| Tipografía | Display 34–40 px | Display 40–48 px | Display 48–56 px |

- No reducir el margen lateral por debajo de 24 px.
- No usar texto menor a 12 px en móvil.
- No esconder acciones críticas en hover; en táctil deben ser visibles.
- El CTA de reserva siempre visible en detalle (barra inferior).

---

## 11. Do / Don’t

| ✅ Hacer | ❌ Evitar |
|---|---|
| Lino de fondo, blanco en tarjetas | Todo el sitio blanco o todo Piedra |
| Una banda Chocolate por página | Tres secciones oscuras seguidas |
| Oliva solo en la acción principal | Oliva en títulos, iconos y botones a la vez |
| Terracotta en un detalle o alerta | Terracotta en párrafos y enlaces pequeños |
| Oro en rating e insignias | Oro como texto sobre Lino |
| Bordes de 1 px y capas | Sombras difusas en cada tarjeta |
| Radios 4 / 8 / full | Radios 12 y 16 mezclados |
| Foto con zoom 1.03 | Rebote, scale 1.1 y hover con sombra |
| Sentence case | Title Case en español |
| Un CTA primario por pantalla | Cinco botones naranjas compitiendo |
| Foco Oliva visible | `outline: none` sin reemplazo |
| Números tabulares | Precios con cifras proporcionales desalineadas |

---

## 12. Checklist de QA visual

- [ ] No queda ningún `#000000` ni `black/…` visible.
- [ ] El 75/20/5 se percibe: Lino domina, Chocolate estructura, acentos son escasos.
- [ ] Hay una sola acción Oliva por pantalla.
- [ ] Ningún texto Terracotta mide menos de 24 px.
- [ ] Ningún texto Oro aparece sobre Lino.
- [ ] Los inputs tienen borde visible y foco Oliva.
- [ ] Todos los interactivos tienen foco de teclado visible.
- [ ] Los radios son 4 px en controles, 8 px en tarjetas, full en chips.
- [ ] No hay `shadow-xl` ni `shadow-2xl` en tarjetas.
- [ ] Las tarjetas no se elevan con sombra al hover.
- [ ] La foto tiene zoom 1.03/600 ms, no más.
- [ ] Los badges sobre foto son máximo dos.
- [ ] Los precios y altitudes usan numerales tabulares.
- [ ] Los títulos están en sentence case.
- [ ] Los labels están en mayúsculas con tracking.
- [ ] El texto sobre fotos cumple 4.5:1.
- [ ] Los estados de error no dependen solo del color.
- [ ] 360, 768, 1280 y 1440 px se ven correctos.
- [ ] El voucher se imprime legible en blanco y negro.
- [ ] `prefers-reduced-motion` desactiva zoom y parallax.

---

## 13. Decisiones de diseño pendientes

1. **Banda Chocolate en Home:** recomendada. Sin ella, la página pierde ritmo y se vuelve beige.
2. **Admin:** mantener dark cálido, no migrarlo a Lino.
3. **Tarjeta de expedición:** rediseñar la anatomía (barra de país + pie Piedra), no solo recolorear.
4. **Hover del CTA primario:** Oliva profundo `#44543D`, no Terracotta, para no perder contraste con texto blanco.
5. **Logo:** montaña Oro sobre Oliva o Chocolate; actualizar favicon a la misma familia.
6. **Banderas:** solo en filtros; en tarjetas editoriales, usar texto de país/región.
7. **Oro:** limitarlo a rating, insignias y filetes; no usarlo como color de enlaces ni iconos sobre Lino.

---

**Principio rector:** la paleta no debe gritar. El lujo se percibe en el aire, la tipografía, la foto y la precisión de los detalles; el color solo debe confirmar la jerarquía.
