# Social Media Content Calendar Generator

> v2.0 — Refactored Architecture

## Run as a Claude artifact

`npm run build:artifact` inlines the whole app (JS + CSS + design tokens) into a
single self-contained **`artifact.html`**. Open the file in any browser, or paste
its contents into Claude as an HTML artifact — no build step, no external files.
(In the sandbox, `localStorage` persistence and the print-to-PDF dialog may be
limited; the app degrades gracefully and the AI/Gem link still works.)

## Stack
- React 18 + Vite 5
- Tailwind CSS 3
- lucide-react

## Architecture

\`\`\`
src/
├── data/          constants.js          — Single source of truth
├── utils/         sanitize.js           — XSS prevention (FIX 1)
│                  htmlExport.js         — Pure HTML builder (FIX 2)
├── hooks/         useBrand.js           — Brand state
│                  useCalendar.js        — Memoized calendar logic (FIX 2)
│                  useExport.js          — Download + Copy
│                  useSteps.js           — Wizard step state
└── components/    FormField.jsx         — Reusable inputs (DRY)
                   BrandForm.jsx         — Step 1
                   PlatformSelector.jsx  — Step 2
                   PlatformPreviewCard.jsx
                   CalendarResults.jsx   — Step 3
App.jsx                                  — Orchestration only (~50 lines)
\`\`\`

## Fixes Applied
| Fix | Issue | Solution |
|-----|-------|----------|
| FIX 1 | XSS vulnerability | sanitize() on all user inputs |
| FIX 2 | Performance | useMemo + useCallback + pure functions |
| FIX 3 | Monolithic component | 13 files, 4 layers |

## Setup
\`\`\`bash
npm install
npm run dev
\`\`\`
