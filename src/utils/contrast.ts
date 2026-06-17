// src/utils/contrast.ts — pick the higher-contrast text color (near-black vs
// white) for a hex background, per WCAG relative luminance. Lets category badges
// keep their colors while staying legible.
const lin = (c: number): number => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

export const textOn = (hex: string): string => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const onWhite = 1.05 / (L + 0.05);
  const onDark  = (L + 0.05) / 0.0596; // vs surface-base #0F172A
  return onDark >= onWhite ? '#0F172A' : '#FFFFFF';
};
