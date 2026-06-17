# Stitch Export — Social Content Calendar Generator

Project ID: `11265448650215880968` · Pulled via the Stitch MCP on 2026-06-16.

## Screens (HTML code + PNG screenshot)

| File | Title | Device |
|------|-------|--------|
| `01-brand-information-step1` | Brand Information — Step 1 | Desktop |
| `02-select-platforms-step2` | Select Platforms — Step 2 | Desktop |
| `03-calendar-results-step3` | Calendar Results — Step 3 | Desktop |
| `04-creator-dashboard` | Creator Dashboard | Mobile |
| `05-create-new-post` | Create New Post | Mobile |
| `06-content-calendar` | Content Calendar | Mobile |
| `07-settings-integrations` | Settings & Integrations | Mobile |

Each screen has a `.html` (self-contained Tailwind, dark theme) and a `.png` preview.

## Direction: DARK (Lumina) — unified 2026-06-16

All 7 screens now use the dark glassmorphic Lumina system. The 4 mobile screens
(originally light "Productivity Flow") were converted via Stitch `apply_design_system`.

> **Dashboard note:** `apply_design_system` left 4 white KPI cards on the Creator
> Dashboard (a leftover `.tonal-elevation-1 { background:#fff }` rule). Fixed directly in
> `04-creator-dashboard.html` (rule → dark glass). The **PNG for that screen is the
> pre-fix Stitch render** and still shows white KPI cards — the HTML is correct; re-pull
> the screenshot from Stitch once its async re-render catches up if you need a matching image.

## Design systems

- `design-system-lumina.md` — **the system all 7 screens now use.** Dark glassmorphic,
  purple `#A855F7` / pink `#EC4899`. Matches the live React app's tokens.
- `design-system-productivity-flow.md` — the original light-mode system the 4 mobile
  screens used before conversion. Kept for reference only; not used anymore.

## Notes

- The 7 screens go beyond the current 3-step React app — Stitch also generated a
  Creator Dashboard, Create New Post, Content Calendar grid, and Settings & Integrations.
  Those are net-new screens to build if you expand the product.
- `download.sh` re-fetches everything (signed URLs may expire; re-run `list_screens` to refresh).
