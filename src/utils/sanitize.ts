// src/utils/sanitize.ts — XSS Prevention (FIX 1)
/**
 * Escapes HTML special characters to prevent XSS injection.
 * Applied to ALL user inputs before insertion into generated HTML strings.
 * React JSX already escapes for the DOM — this is for innerHTML/template strings only.
 */
export const sanitize = (str: string | undefined | null): string => {
  if (!str) return '';
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .replace(/\//g, '&#x2F;');
};
