/** @type {import('tailwindcss').Config} */

// Design tokens live as RGB channels in src/index.css (:root) and are referenced
// here via var() so opacity modifiers (e.g. bg-surface-card/80) keep working.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          deep:    token('--brand-deep'),   // gradient backdrop
          strong:  token('--brand-strong'), // primary action hover
          DEFAULT: token('--brand'),        // primary
          light:   token('--brand-light'),  // focus ring / accent text
          soft:    token('--brand-soft'),
          softer:  token('--brand-softer'), // muted brand text on dark
        },
        accent: token('--accent'),
        surface: {
          base:   token('--surface-base'),   // app background
          card:   token('--surface-card'),   // panels
          raised: token('--surface-raised'), // raised controls
          hover:  token('--surface-hover'),  // interactive hover
          muted:  token('--surface-muted'),  // dividers / disabled
        },
        content: {
          DEFAULT: token('--content'),       // body text on dark
          muted:   token('--content-muted'),
          faint:   token('--content-faint'),
        },
        feedback: {
          success: token('--feedback-success'),
          warning: token('--feedback-warning'),
          error:   token('--feedback-error'),
          info:    token('--feedback-info'),
        },
      },
    },
  },
  plugins: [],
};
