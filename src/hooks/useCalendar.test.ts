import { describe, it, expect } from 'vitest';
import { buildCalendar } from './useCalendar.js';

const base = { industry: 'Real Estate', products: 'CRM', goals: ['Sales'], tone: 'Bold' as const, differentiation: '', monthlyFocus: '' };

describe('buildCalendar', () => {
  it('produces exactly 30 sequential days', () => {
    const cal = buildCalendar('Instagram', base);
    expect(cal).toHaveLength(30);
    expect(cal.map(d => d.day)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
  });

  it('fills every required field on every entry', () => {
    for (const d of buildCalendar('LinkedIn', base)) {
      expect(d.topic).toBeTruthy();
      expect(d.caption).toBeTruthy();
      expect(d.cta).toBeTruthy();
      expect(d.format).toBeTruthy();
      expect(d.goal).toBe('Sales');
    }
  });

  it('defaults to Brand Awareness when no goals are selected', () => {
    const cal = buildCalendar('TikTok', { ...base, goals: [] });
    expect(cal.every(d => d.goal === 'Brand Awareness')).toBe(true);
  });

  it('cycles weekday names within Mon–Sun', () => {
    const cal = buildCalendar('Facebook', base);
    expect(cal[0].dayName).toBe('Monday');
    expect(cal[7].dayName).toBe('Monday'); // day 8 wraps
  });

  it('weaves the monthly focus into some topics', () => {
    const cal = buildCalendar('Instagram', { ...base, monthlyFocus: 'Ramadan offers' });
    expect(cal.some(d => d.topic.includes('Ramadan offers'))).toBe(true);
  });

  it('is deterministic per brand+platform but varies across platforms', () => {
    const a = buildCalendar('Instagram', base).map(d => d.topic);
    const b = buildCalendar('Instagram', base).map(d => d.topic);
    const c = buildCalendar('TikTok', base).map(d => d.topic);
    expect(a).toEqual(b);          // stable for memo/tests
    expect(a).not.toEqual(c);      // different platform → different plan
  });

  it('produces Arabic content + labels when lang="ar"', () => {
    const cal = buildCalendar('Instagram', base, 'ar');
    expect(cal).toHaveLength(30);
    expect(cal[0].dayName).toBe('الإثنين');           // weekday label localized
    expect(cal.every(d => d.goal === 'مبيعات')).toBe(true); // goal label localized
    // generated prose is Arabic, not the English template
    expect(cal.some(d => /[؀-ۿ]/.test(d.topic))).toBe(true);
    expect(cal.every(d => !/[a-z]/i.test(d.cta))).toBe(true);
  });
});
