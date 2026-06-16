import { describe, it, expect } from 'vitest';
import { sanitize } from './sanitize.js';

describe('sanitize', () => {
  it('escapes every HTML-significant character', () => {
    expect(sanitize(`<>&"'/`)).toBe('&lt;&gt;&amp;&quot;&#x27;&#x2F;');
  });

  it('escapes & first so entities are not double-encoded', () => {
    // a naive order would turn "<" into "&lt;" then "&" into "&amp;lt;"
    expect(sanitize('<')).toBe('&lt;');
  });

  it('neutralises a script-injection payload', () => {
    expect(sanitize('<script>alert(1)</script>')).not.toContain('<script>');
  });

  it('returns empty string for nullish/empty input', () => {
    expect(sanitize('')).toBe('');
    expect(sanitize(null)).toBe('');
    expect(sanitize(undefined)).toBe('');
  });
});
