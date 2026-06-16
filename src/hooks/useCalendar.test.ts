import { describe, it, expect } from 'vitest';
import { buildCalendar } from './useCalendar.js';

const base = { industry: 'Real Estate', products: 'CRM', goals: ['Sales'], tone: 'Bold' as const };

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
});
