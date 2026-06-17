---
name: Lumina Social Design System
colors:
  surface: '#16111b'
  surface-dim: '#16111b'
  surface-bright: '#3d3741'
  surface-container-lowest: '#110c15'
  surface-container-low: '#1f1a23'
  surface-container: '#231e27'
  surface-container-high: '#2e2832'
  surface-container-highest: '#39323d'
  on-surface: '#eadfed'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#eadfed'
  inverse-on-surface: '#342e38'
  outline: '#988d9f'
  outline-variant: '#4d4354'
  surface-tint: '#ddb7ff'
  primary: '#ddb7ff'
  on-primary: '#490080'
  primary-container: '#b76dff'
  on-primary-container: '#400071'
  inverse-primary: '#842bd2'
  secondary: '#ffb0cd'
  on-secondary: '#640039'
  secondary-container: '#aa0266'
  on-secondary-container: '#ffbad3'
  tertiary: '#fabc4e'
  on-tertiary: '#432c00'
  tertiary-container: '#bd871a'
  on-tertiary-container: '#3a2600'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  background: '#16111b'
  on-background: '#eadfed'
  surface-variant: '#39323d'
# Brand overrides (the colors the screens actually use):
#   primary  override: #a855f7  (purple)
#   secondary override: #ec4899  (pink accent)
typography:
  display-lg:        { fontFamily: Inter, fontSize: 48px, fontWeight: '800', lineHeight: '1.1', letterSpacing: -0.02em }
  headline-lg:       { fontFamily: Inter, fontSize: 32px, fontWeight: '800', lineHeight: '1.2', letterSpacing: -0.01em }
  headline-lg-mobile:{ fontFamily: Inter, fontSize: 28px, fontWeight: '800', lineHeight: '1.2' }
  headline-md:       { fontFamily: Inter, fontSize: 24px, fontWeight: '700', lineHeight: '1.3' }
  body-lg:           { fontFamily: Inter, fontSize: 18px, fontWeight: '400', lineHeight: '1.6' }
  body-md:           { fontFamily: Inter, fontSize: 16px, fontWeight: '400', lineHeight: '1.6' }
  label-md:          { fontFamily: Inter, fontSize: 14px, fontWeight: '500', lineHeight: '1.4' }
  label-sm:          { fontFamily: Inter, fontSize: 12px, fontWeight: '600', lineHeight: '1.2', letterSpacing: 0.05em }
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
A high-performance SaaS environment that balances professional utility with creative
energy. Personality: **Polished, Premium, Confident**, using a **Glassmorphic** aesthetic
for depth and focus in a dark-mode ecosystem. An immersive full-page diagonal gradient
transitions Slate-900 → vibrant Deep Purple → Slate-900, creating a "stage" for
semi-transparent elements to float on. **Slightly Playful** pink accents and soft rounded
geometries keep it inspiring rather than overwhelming.

## Colors
Dark mode only. Primary interactive color **Purple #A855F7** pops against the slate
backgrounds. **Pink Accent #EC4899** used sparingly for high-interest call-outs /
"celebration" moments. Text hierarchy via contrast: **Slate-300** primary, **Slate-400**
secondary metadata. Platform colors are functional tokens so platform-specific content is
instantly recognizable.

## Typography
**Inter** throughout. Headlines use **Extrabold (800)** with tight letter-spacing as a
strong anchor. Body text uses generous line-height for comfortable long-form work. Labels
use medium weight and muted color.

## Layout & Spacing
Fluid 12-column grid. Desktop: 12 cols, 24px gutters, 1280px max-width. Tablet: 8 cols,
16px margins. Mobile: 4 cols, 16px margins, glass cards full-width minus margins. 4px base
scale; primary sections leverage `xl` (48px) to avoid clutter.

## Elevation & Depth (Glassmorphism, not drop shadows)
1. **Background:** diagonal linear gradient (Slate-900 0% → Deep Purple 50% → Slate-900 100%).
2. **Surface:** semi-transparent Slate-800 `rgba(30,41,59,0.8)` + `backdrop-filter: blur(12px)`.
3. **Stroke:** subtle 1px inner border `rgba(255,255,255,0.1)`.
Interactive/active elements may use a soft ambient outer glow in Primary Purple for focus.

## Shapes
- Cards & containers: `rounded-2xl` (16px)
- Buttons & inputs: `rounded-lg` (8px)
- Platform icons: `rounded-full` (pill/circle) in social selectors

## Components
**Buttons** — Primary: solid Purple #A855F7, white text; hover #7C3AED. Secondary:
"Ghost Glass" transparent, 1px Slate-700 border, Slate-300 text.
**Step Indicators** — Horizontal. Numbered `rounded-full` circles joined by 2px lines.
Active = filled Purple; completed = checkmark; pending = Slate-700 + Slate-400 text.
**Cards** — Glassmorphism per Elevation; internal padding `md` (16px).
**Platform Chips** — Background = platform color; text white or black per contrast
(Snapchat = black text, others = white).
**Inputs** — Slate-900 background, 1px Slate-700 border; on focus border → Primary Purple
with subtle outer glow.
