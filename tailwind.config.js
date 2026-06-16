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
      keyframes: {
        'fade-in':    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in':    'fade-in 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
