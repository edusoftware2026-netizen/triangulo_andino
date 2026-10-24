---
name: Andean Vanguard Luxury
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#ac3400'
  on-secondary: '#ffffff'
  secondary-container: '#fd6b36'
  on-secondary-container: '#5d1900'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f1500'
  on-tertiary-container: '#c76c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59d'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#832600'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 46px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-lg: 2.5rem
  margin: 1.5rem
  margin-md: 3rem
  margin-lg: 5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system crafts an evocative, high-end editorial experience tailored for bespoke high-altitude exploration across Chile, Bolivia, and Peru. It bridges raw Andean mysticism with contemporary architectural minimalism, designed specifically for discerning luxury travelers, cultural connoisseurs, and private expeditions. 

The aesthetic philosophy centers on **Architectural Elegance**: generous, airy canvases inspired by the stark expanse of the Salar de Uyuni and Atacama, anchored by the grounded geometry of Incan stonework. The interface prioritizes calm authority, deliberate pacing, high tactile refinement, and editorial clarity. Interactions feel quiet, responsive, and substantial—never hurried or cluttered.

## Colors

The palette draws inspiration directly from the geological and astronomical contrasts of the Andes:

- **Deep Andean Night (`#0F172A`)**: The primary anchor, referencing high-altitude nocturnal skies and obsidian stone. It commands primary typography, formal borders, and grounding UI surfaces.
- **Atacama Terracotta (`#C2410C`)**: Secondary tone echoing hyper-arid desert plateaus, volcanic soils, and weathered clay. Used strategically for focused calls to action, active indicators, and curated focal highlights.
- **Inca Gold (`#D97706`)**: Tertiary accent honoring sacred metallurgy and sun deities. Reserved strictly for ratings, bespoke status insignias, curation badges, and interactive tier markers.
- **Warm Canvas (`#F8FAFC`)**: A mineral off-white canvas that softens screen fatigue and establishes an editorial print sensibility.

### Color Rules
- Maintain an expansive 80/15/5 distribution: Canvas/Off-White takes 80%, Deep Andean Night commands 15%, while Terracotta and Inca Gold share the remaining 5% purely for interactive accentuation.
- Avoid raw pure blacks (`#000000`) or synthetic primary blues. Tonal depths must always lean into midnight-slate undertones.

## Typography

The type system balances classical literary romance with utilitarian clarity:
- **EB Garamond** acts as the narrative voice. It imparts grace, heritage, and timeless luxury across prominent titles, destination narratives, and expedition headings.
- **Plus Jakarta Sans** provides a warm, contemporary, highly legible geometric companion for itineraries, UI controls, technical metadata, coordinates, and multi-language selections.

### Typographic Guidelines
- All editorial and destination headlines (`display-*`, `headline-*`) must be set in sentence case to maintain quiet elegance; avoid aggressive full-uppercase display headers.
- Badges, technical badges, elevation meters, and language codes use `label-sm` or `label-md` with positive letter tracking and uppercase styling for micro-legibility.

## Layout & Spacing

The layout is grounded on a disciplined, responsive 12-column grid anchored by wide breathing margins that evoke editorial art catalogs.

- **Desktop (1280px and above)**: 12-column grid, max-width `1440px`, `margin-lg` (5rem) margins, `gutter-lg` (2.5rem) column gap.
- **Tablet (768px - 1279px)**: 8-column grid, `margin-md` (3rem) margins, `gutter` (1.5rem) column gap.
- **Mobile (under 768px)**: 4-column grid, `margin` (1.5rem) screen-edge padding, `gutter` (1.5rem) column gap.

Content should flow intentionally with asymmetric balance: large photographic plates spanning 7-8 columns offset by narrative metadata blocks spanning 4-5 columns.

## Elevation & Depth

Depth is established primarily through **tactile paper layering and whisper-soft structural outlines**, rejecting hyper-blurred synthetic drop shadows in favor of a clean, grounded physical presence.

- **Level 0 (Base Canvas)**: Mineral tone (`#F8FAFC`).
- **Level 1 (Cards, Modules, Flight Panels)**: Pure alabaster white (`#FFFFFF`) with a 1px structural hairline border (`rgba(15, 23, 42, 0.08)`).
- **Level 2 (Overlays, Interactive Popovers, Language Drawers)**: Pure white background paired with an ambient, tinted shadow: `box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.
- **Level 3 (Modals, Itinerary Builders)**: Deep Andean backdrop scrim (`rgba(15, 23, 42, 0.65)`) with a high-definition card surface bordered by `rgba(255, 255, 255, 0.15)` on dark contexts or `rgba(15, 23, 42, 0.12)` on light surfaces.

## Shapes

The geometric framework mirrors Andean stone masonry: precise, tight joints and enduring architectural weight. 

- Base interface components (inputs, interactive chips, primary buttons) use **Soft roundedness** (`0.25rem` / `4px`), preserving crisp rectangular integrity.
- Cards, modal containers, and expedition showcases employ `rounded-lg` (`0.5rem` / `8px`).
- Badges and tag indicators alone utilize full pill-radii to provide contrast against the architectural structure.

## Components

### Buttons
- **Primary Action (Expedition Booking, Inquire)**: Solid Deep Andean Night (`#0F172A`) background, off-white text, 4px border radius. On hover, shifts to Atacama Terracotta (`#C2410C`) via a refined 250ms ease transition. Padding: `0.875rem 2rem`.
- **Secondary (Itinerary Download, Explore)**: Transparent background, 1px solid `#0F172A`, text in `#0F172A`. On hover, fills with `#0F172A` with inverted white text.
- **Ghost/Tertiary**: Transparent, no border, text styled in `#C2410C` with an understated directional arrow (`→`) shifting 4px on hover.

### Polished Luxury Tour Cards
- Composed of an edge-to-edge 4:5 or 16:10 photography viewport with a subtle zoom hover (scale `1.03` over 600ms).
- Fixed floating metadata bar at the top: Country identifier pill (e.g., "BOLIVIA // SALAR DE UYUNI") using `label-sm` with translucent frosted backdrop (`rgba(15, 23, 42, 0.6)` with white text).
- Content container set in pure white with a delicate 1px border. Includes EB Garamond title, route metrics (altitude, duration, comfort tier), and price displayed in refined Plus Jakarta Sans tabular numerals.

### Interactive Planning Badges & Chips
- **Interactive Badges**: Outlined with `rgba(15, 23, 42, 0.15)`, background in `#FFFFFF`, featuring `label-md` uppercase text.
- **Active Selection**: Inset border highlighted with Atacama Terracotta (`#C2410C`), with an accent dot in Inca Gold (`#D97706`).

### Input Fields & Selectors
- Background in pure `#FFFFFF`, border set at 1px `rgba(15, 23, 42, 0.2)`, padding `0.875rem 1rem`.
- Focus state: Border transitions to `#0F172A` with a subtle offset ring (`2px` in `rgba(194, 65, 12, 0.2)`). Error states marked cleanly in `#C2410C`.

### Multi-Language Selector
- Minimalist dual-state switch or drop panel (`ES`, `EN`, `DE`, `FR`).
- Displays current ISO code with high tracking (`label-md`). When active, reveals a quiet floating card with subtle ambient drop shadow, listing regional languages and currency options (`USD`, `EUR`, `CLP`, `BOB`, `PEN`) divided by hairline dividers.

### Checkboxes & Radios
- Sharp 2px rounded boxes or circular radios with 1.5px `#0F172A` borders. Active states display a solid `#0F172A` fill with an Inca Gold check/inner pip for subtle luxury differentiation.