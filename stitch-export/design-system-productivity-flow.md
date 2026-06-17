---
name: Productivity Flow   # ALTERNATIVE light-mode design system (the app does NOT use this)
colors:
  primary:   '#2e5bff'   # Electric Blue (primary actions / focus)
  secondary: '#10b981'   # Mint Green (Published / success)
  tertiary:  '#f59e0b'   # Warm Amber (Scheduled / warning)
  neutral:   '#111827'   # Charcoal text
  surface:        '#f9fafb'  # background (Level 0)
  surface-card:   '#ffffff'  # cards / inputs (Level 1)
  outline:        '#e5e7eb'  # borders / dividers
  text-secondary: '#6b7280'
  placeholder:    '#9ca3af'
typography:
  headline-xl: { fontFamily: Inter, fontSize: 32px, fontWeight: '700', lineHeight: 40px, letterSpacing: -0.02em }
  headline-lg: { fontFamily: Inter, fontSize: 24px, fontWeight: '600', lineHeight: 32px, letterSpacing: -0.01em }
  headline-md: { fontFamily: Inter, fontSize: 20px, fontWeight: '600', lineHeight: 28px }
  body-lg:     { fontFamily: Inter, fontSize: 16px, fontWeight: '400', lineHeight: 24px }
  body-md:     { fontFamily: Inter, fontSize: 14px, fontWeight: '400', lineHeight: 20px }
  label-md:    { fontFamily: Inter, fontSize: 12px, fontWeight: '600', lineHeight: 16px, letterSpacing: 0.02em }
spacing:
  base: 8px          # 8px soft-grid (multiples of 8, or 4 for tight components)
  container-max: 1280px
  gutter: 12px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
rounded:
  md: 0.75rem   # inputs/chips (12px)
  xl: 1.5rem    # buttons/main cards (16px)
  full: 9999px
---

## Brand & Style
Engineered for high-velocity content planning. Personality: **Efficient, Creative,
Reliable** — **Modern Corporate** + **Minimalist**. Prioritizes clarity and functional
density; a premium, streamlined "command center" for digital creators. Light off-white
background (#F9FAFB) to reduce eye strain on long sessions.

## Colors (functional hierarchy)
- **Primary Electric Blue #2E5BFF** — primary actions, active nav, focus.
- **Secondary Mint Green #10B981** — Success / Published only.
- **Tertiary Warm Amber #F59E0B** — Scheduled / Warning.
- Neutral charcoal #111827 text; cool grays for borders/metadata.

## Elevation (Tonal layers + ambient shadows)
- Level 0 surface #F9FAFB. Level 1 cards #FFFFFF + soft shadow (0 2px 8px / 5% charcoal).
  Level 2 floating/active + stronger shadow (0 4px 12px / 10%). Borders #E5E7EB.

## Components
**Buttons** — Primary: Electric Blue bg, white text, 16px radius. Secondary: white bg +
blue border/text. Ghost: blue text only.
**Status Chips** (pill, label-sm) — Published: mint bg/dark-green text · Scheduled: amber
bg/dark-amber text · Draft: gray bg/charcoal text.
**Cards** — white, 16px radius, Level 1 shadow, 16px padding.
**Inputs** — 12px radius, 1px #E5E7EB border → 2px Electric Blue on focus; placeholder #9CA3AF.
**Iconography** — thin-line 2px stroke; platform icons monochrome charcoal, blue when active.
**Calendar Cells** — clean grid, date in label-md; "today" = Electric Blue circle.
