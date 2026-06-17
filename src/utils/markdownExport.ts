// src/utils/markdownExport.ts — AI-friendly brief for a custom Gem/GPT.
// Brand context + the full 30-day plan as Markdown (LLMs parse this far better
// than the styled HTML). Entry fields are already localized by buildCalendar;
// only the chrome labels are translated here.
import type { Brand, PlatformCalendars, PlatformName } from '../types/index.js';
import type { Lang } from '../i18n.js';

interface MdChrome {
  title: string; industry: string; tone: string; products: string;
  diff: string; focus: string; goals: string; sep: string; headers: string[];
}
const CHROME: Record<Lang, MdChrome> = {
  en: {
    title: 'Content Plan', industry: 'Business', tone: 'Tone', products: 'Products / Services',
    diff: 'Differentiator', focus: "This month's focus", goals: 'Goals', sep: ', ',
    headers: ['Day', 'Pillar', 'Topic', 'Angle', 'Format', 'Goal', 'CTA'],
  },
  ar: {
    title: 'خطة محتوى', industry: 'النشاط', tone: 'النبرة', products: 'المنتجات / الخدمات',
    diff: 'الميزة التنافسية', focus: 'تركيز هذا الشهر', goals: 'الأهداف', sep: '، ',
    headers: ['اليوم', 'الركيزة', 'الموضوع', 'الزاوية', 'الصيغة', 'الهدف', 'الإجراء'],
  },
};

export const buildMarkdown = (brand: Brand, platformCalendars: PlatformCalendars, lang: Lang = 'en'): string => {
  const C = CHROME[lang];

  const context = [
    `# ${C.title} — ${brand.name}`,
    `**${C.industry}:** ${brand.industry}  |  **${C.tone}:** ${brand.tone}`,
    brand.products        && `**${C.products}:** ${brand.products}`,
    brand.differentiation && `**${C.diff}:** ${brand.differentiation}`,
    brand.monthlyFocus    && `**${C.focus}:** ${brand.monthlyFocus}`,
    brand.goals.length    && `**${C.goals}:** ${brand.goals.join(C.sep)}`,
  ].filter(Boolean).join('\n');

  const headerRow = `| ${C.headers.join(' | ')} |\n|${C.headers.map(() => '---').join('|')}|`;
  const tables = brand.platforms.map((p: PlatformName) => {
    const rows = (platformCalendars[p] ?? [])
      .map(d => `| ${d.day} | ${d.pillar} | ${d.topic} | ${d.angle} | ${d.format} | ${d.goal} | ${d.cta} |`)
      .join('\n');
    return `\n## ${p}\n\n${headerRow}\n${rows}`;
  }).join('\n');

  return `${context}\n${tables}\n`;
};
