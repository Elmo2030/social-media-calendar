import { describe, it, expect } from 'vitest';
import { textOn } from './contrast.js';

describe('textOn', () => {
  it('returns dark text on light backgrounds', () => {
    expect(textOn('#F59E0B')).toBe('#0F172A'); // amber
    expect(textOn('#10B981')).toBe('#0F172A'); // emerald
    expect(textOn('#FFFFFF')).toBe('#0F172A');
  });

  it('returns white text on dark backgrounds', () => {
    expect(textOn('#7C3AED')).toBe('#FFFFFF'); // violet-600
    expect(textOn('#2563EB')).toBe('#FFFFFF'); // blue-600
    expect(textOn('#000000')).toBe('#FFFFFF');
  });
});
