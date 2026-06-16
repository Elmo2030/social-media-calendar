# CLAUDE.md — Project Intelligence File
> Claude Code reads this file automatically on startup.
> Last updated: generated from claude.ai conversation — June 2026

---

## 🎯 Project Overview

**Social Media Content Calendar Generator**
- Stack: React 18 + TypeScript + Vite 5 + Tailwind CSS 3
- Version: v3.0 (Architecture + Performance + Security complete)
- GitHub: https://github.com/Elmo2030/social-media-calendar
- Local: /Users/user/Desktop/social-media-calendar

Generates a 30-day content calendar for up to 6 social media platforms.
Exports a fully styled HTML document (100-150KB) with per-platform tables.

---

## 📁 Architecture (v3.0)

```
src/
├── types/
│   └── index.ts          ← ALL type definitions (single source of truth)
├── data/
│   └── constants.ts      ← CONTENT_PILLARS, PLATFORM_DATA, INITIAL_BRAND, etc.
├── utils/
│   ├── sanitize.ts       ← XSS prevention — applies to all user inputs before HTML
│   └── htmlExport.ts     ← buildHTMLDocument() — pure function, dynamic import only
├── hooks/
│   ├── useBrand.ts       ← useReducer (UPDATE_FIELD/TOGGLE_GOAL/TOGGLE_PLATFORM/RESET)
│   ├── useCalendar.ts    ← buildCalendar() + useTransition for recomputation
│   ├── useExport.ts      ← dynamic import of htmlExport + async download/copy
│   └── useSteps.ts       ← step wizard + useTransition for generate()
└── components/
    ├── ErrorBoundary.tsx ← class component, wraps entire App in main.tsx
    ├── FormField.tsx     ← memo(FormField) + memo(FormSelect) + memo(TogglePill)
    ├── BrandForm.tsx     ← Step 1 (lazy loaded)
    ├── PlatformSelector.tsx ← Step 2 (lazy loaded)
    ├── PlatformPreviewCard.tsx ← memo + useCallback internal toggle
    └── CalendarResults.tsx ← Step 3 (lazy loaded) + memo(StatCard)
App.tsx                   ← ~60 lines, orchestration only
main.tsx                  ← ReactDOM.createRoot + ErrorBoundary wrapper
```

---

## 🏗️ Key Architecture Decisions

### State Management
- `useBrand` uses `useReducer` — NOT useState. Actions: UPDATE_FIELD, TOGGLE_GOAL, TOGGLE_PLATFORM, RESET
- Never spread the full brand object into deps arrays — destructure individual primitive fields

### Performance Patterns
- `React.lazy()` on ALL 3 step components (BrandForm, PlatformSelector, CalendarResults)
- `useDeferredValue(brand)` in App.tsx — deferredBrand drives all heavy computation
- `useTransition` in useSteps (generate) AND useCalendar (recompute) — both non-urgent
- `htmlExport.ts` is DYNAMIC IMPORT ONLY via useRef cache in useExport — never in static bundle
- Hover preloading: onNextHover → preloadStep2, onGenerateHover → preloadStep3

### Security Rules (MANDATORY)
- ALL user inputs must pass through `sanitize()` before HTML string insertion
- React JSX is safe automatically — sanitize() is for template strings / htmlExport only
- No dangerouslySetInnerHTML anywhere in the codebase

### TypeScript Rules
- All types live in `src/types/index.ts` — import from there, never inline interfaces in components
- Strict mode enabled — no `any` allowed (@typescript-eslint/no-explicit-any: error)
- PlatformName, Tone, BusinessModel are literal union types — use them everywhere

### Naming Conventions
- UPPER_CASE for constants (CONTENT_PILLARS, PLATFORM_DATA)
- buildXxx for pure generator functions (buildCalendar, buildHTMLDocument)
- useXxx for hooks
- Xxx.displayName = 'Xxx' required on all memo() components

---

## 📊 Code Review Scores (Progress Tracker)

This project is being reviewed against international standards.
Each criterion scored 1-10, with 8 sub-points per criterion.

### ✅ DONE — بنية الكود والتنظيم (Code Architecture)
| Sub-point | Before | After |
|-----------|--------|-------|
| SRP | 4 | 8 |
| Separation of Concerns | 6 | 9 |
| Component Decomposition | 2 | 9 |
| Custom Hooks | 1 | 9 |
| Naming Conventions | 9 | 9 |
| DRY Principle | 5 | 8 |
| Data/Config Layer | 8 | 9 |
| File & Folder Structure | 2 | 9 |

### ✅ DONE — الأداء والتحسين (Performance)
| Sub-point | Before | After |
|-----------|--------|-------|
| useMemo | 8 | 10 |
| useCallback | 7 | 9 |
| React.memo | 1 | 9 |
| Lazy Loading | 1 | 9 |
| Dependency Arrays | 5 | 9 |
| useReducer/State | 3 | 8 |
| useDeferredValue | 2 | 9 |
| Virtualisation | 2 | 6 |

### ✅ DONE — المعايير والأمان (Standards & Security)
| Sub-point | Before | After |
|-----------|--------|-------|
| TypeScript | 1 | 9 |
| ESLint + Prettier | 1 | 9 |
| Error Boundaries | 1 | 8 |
| Accessibility (ARIA) | 1 | 8 |
| Form Validation | 3 | 3 |
| XSS Prevention | 8 | 10 |
| Environment/Secrets | 7 | 7 |
| Dependency Audit | 5 | 5 |

### 🔄 IN PROGRESS — جودة التصميم وتجربة المستخدم (UI/UX)
| Sub-point | Current | Target | Priority |
|-----------|---------|--------|----------|
| 🎨 Design Tokens & Color System | 3 | 9 | #1 |
| 📱 Responsive Design | 4 | 9 | #2 |
| 📭 Empty & Error States | 1 | 8 | #3 |
| 📝 Form UX & Validation Messages | 3 | 8 | #4 |
| ✨ Loading & Interactive Feedback | 7 | 9 | #5 |
| 🌊 Micro-animations & Transitions | 3 | 8 | #6 |
| 🎯 Focus & Keyboard States | 2 | 8 | #7 |
| 📖 Typography & Visual Hierarchy | 5 | 8 | #8 |

**START HERE: Design Tokens** — hardcoded colors must become CSS variables + tailwind.config.ts tokens

### ⏳ PENDING — قابلية التوسع والصيانة (Scalability)
Not started yet. Original score: 3/10.

---

## 🔄 Git History

```
435fb90  security: TypeScript + ESLint + A11y + ErrorBoundary v3.0
07052a3  perf: concurrent mode complete v2.3 — useDeferredValue 7→9
ad681bc  perf: lazy loading complete v2.2 — score 7→9
fd3d33e  perf: full performance optimization pass v2.1
ce70b9f  feat: initial architecture refactor v2.0
```

Commit convention: `<type>: <description> v<version>`
Types: feat, perf, security, fix, refactor, ux

---

## 🚀 Available Scripts

```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run typecheck # tsc --noEmit (must pass before commit)
npm run lint      # ESLint --max-warnings 0
npm run format    # Prettier --write src
```

---

## 📐 UI/UX Work — Design Token Implementation Plan

When implementing Design Tokens (#1 priority), follow this pattern:

### Step 1 — tailwind.config.ts
```ts
extend: {
  colors: {
    brand: {
      primary:   '#8B5CF6',  // purple-500
      secondary: '#6D28D9',  // purple-700
      accent:    '#EC4899',  // pink-500
    },
    surface: {
      base:    '#0F172A',  // slate-900
      card:    '#1E293B',  // slate-800
      overlay: '#334155',  // slate-700
    },
    feedback: {
      success: '#10B981',
      warning: '#F59E0B',
      error:   '#EF4444',
      info:    '#3B82F6',
    },
  },
}
```

### Step 2 — index.css CSS variables
```css
:root {
  --color-primary: theme('colors.brand.primary');
  --color-surface: theme('colors.surface.base');
}
```

### Step 3 — Replace hardcoded colors in all components

---

## 🛑 Anti-patterns — Never Do These

```ts
// ❌ brand object in useMemo deps
useMemo(() => ..., [brand]);

// ✅ destructure primitives
const { name, industry } = brand;
useMemo(() => ..., [name, industry]);

// ❌ inline arrow in map (breaks memo)
platforms.map(p => <Card onToggle={() => toggle(p)} />)

// ✅ stable ref + internal call
const handleToggle = useCallback((p) => toggle(p), [toggle]);
<Card onToggle={handleToggle} />

// ❌ sanitize missing
`<h1>${brand.name}</h1>`

// ✅ always sanitize in template strings
`<h1>${sanitize(brand.name)}</h1>`

// ❌ any type
const fn = (x: any) => x;

// ✅ proper typing
const fn = (x: Brand) => x;
```

---

## 💡 Context from claude.ai Session

This project started as a monolithic 600-line single-component React app.
It was progressively refactored over multiple sessions covering:
1. Architecture (file separation, hooks extraction)
2. Performance (React.memo, useMemo, useCallback, lazy, useTransition)
3. Security (TypeScript, ESLint, Error Boundaries, ARIA accessibility)
4. UI/UX — CURRENTLY IN PROGRESS

The methodology is: analyze each criterion into 8 sub-points → score each 1-10 →
fix in priority order → commit with descriptive message → push to GitHub.

Continue this methodology for the remaining UI/UX sub-points.
