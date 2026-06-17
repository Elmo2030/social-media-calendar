import { describe, it, expect } from 'vitest';
import { buildMarkdown } from './markdownExport.js';
import { buildCalendar } from '../hooks/useCalendar.js';
import type { Brand } from '../types/index.js';

const brand: Brand = {
  name: 'Glow Spa', industry: 'Healthcare', goals: ['Sales'], tone: 'Friendly',
  products: 'facials', differentiation: 'organic products', monthlyFocus: 'Ramadan offers',
  platforms: ['Instagram'],
};

describe('buildMarkdown', () => {
  const md = buildMarkdown(brand, { Instagram: buildCalendar('Instagram', brand) });

  it('includes the brand context the Gem needs', () => {
    expect(md).toContain('# Content Plan — Glow Spa');
    expect(md).toContain('Healthcare');
    expect(md).toContain('organic products');   // differentiator
    expect(md).toContain('Ramadan offers');     // monthly focus
  });

  it('renders a per-platform table with 30 day rows', () => {
    expect(md).toContain('## Instagram');
    expect(md).toContain('| Day | Pillar | Topic | Angle | Format | Goal | CTA |');
    const dayRows = md.split('\n').filter(l => /^\| \d+ \|/.test(l));
    expect(dayRows).toHaveLength(30);
  });
});
