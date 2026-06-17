// src/utils/htmlExport.ts — Pure function, typed, safe to dynamic import
import { sanitize } from './sanitize.js';
import { textOn } from './contrast.js';
import { PLATFORM_DATA, CALENDAR_DAYS } from '../data/constants.js';
import type { Brand, PlatformCalendars, CalendarEntry, PlatformName } from '../types/index.js';
import type { Lang } from '../i18n.js'; // type-only: no runtime/React import pulled in

interface Chrome {
  dir: 'rtl' | 'ltr'; locale: string; titleSuffix: string; section: string;
  perPlat: string; day: string; coverSub: string; headers: string[];
}
const CHROME: Record<Lang, Chrome> = {
  en: {
    dir: 'ltr', locale: 'en-US', titleSuffix: 'Content Calendar', section: 'Platform Calendars',
    perPlat: `${CALENDAR_DAYS}-Day Calendar`, day: 'Day',
    coverSub: `${CALENDAR_DAYS}-Day Social Media Content Calendar`,
    headers: ['Day', 'Pillar', 'Topic', 'Angle', 'Format', 'Caption', 'CTA', 'Goal'],
  },
  ar: {
    dir: 'rtl', locale: 'ar', titleSuffix: 'تقويم المحتوى', section: 'تقاويم المنصّات',
    perPlat: `تقويم ${CALENDAR_DAYS} يوم`, day: 'اليوم',
    coverSub: `تقويم محتوى سوشيال ميديا لـ${CALENDAR_DAYS} يوم`,
    headers: ['اليوم', 'الركيزة', 'الموضوع', 'الزاوية', 'الصيغة', 'الكابشن', 'الإجراء', 'الهدف'],
  },
};

export const buildHTMLDocument = (brand: Brand, platformCalendars: PlatformCalendars, lang: Lang = 'en'): string => {
  const s    = (v: string | undefined | null): string => sanitize(v ?? '');
  const C    = CHROME[lang];
  const date = new Date().toLocaleDateString(C.locale, { year: 'numeric', month: 'long', day: 'numeric' });

  const platformTables = brand.platforms.map((platform: PlatformName) => {
    const cal    = platformCalendars[platform] ?? [];
    const pColor = PLATFORM_DATA[platform].color;
    const hdrBg  = pColor === '#FFFC00' ? '#333' : pColor;
    const rows   = cal.map((d: CalendarEntry, idx: number) => `
      <tr class="${idx % 2 === 0 ? 'even' : 'odd'}">
        <td><strong>${C.day} ${d.day}</strong><br/><small>${s(d.dayName)}</small></td>
        <td><span class="badge" style="background:${d.pillarColor};color:${textOn(d.pillarColor)}">${s(d.pillar)}</span></td>
        <td>${s(d.topic)}</td><td>${s(d.angle)}</td>
        <td><span class="fmt">${s(d.format)}</span></td>
        <td><em>${s(d.caption)}</em></td>
        <td class="cta">${s(d.cta)}</td>
        <td><span class="goal">${s(d.goal)}</span></td>
      </tr>`).join('');
    return `
    <div class="plat">
      <div class="plat-hdr" style="background:${hdrBg}"><h3>${s(platform)}</h3><span>${C.perPlat}</span></div>
      <table><thead><tr>${C.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows}</tbody></table>
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${C.dir}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${s(brand.name)} — ${C.titleSuffix}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:'Segoe UI',sans-serif;background:#f8fafc;color:#1e293b}
@page{margin:12mm}@media print{.wrap{padding:0}.plat{break-inside:avoid}}
.wrap{max-width:1400px;margin:0 auto;padding:40px}.cover{background:linear-gradient(135deg,#1e1b4b,#4c1d95,#7c3aed);color:#fff;padding:60px;border-radius:20px;margin-bottom:40px;text-align:center}
.cover h1{font-size:40px;font-weight:800}.section{background:#fff;border-radius:16px;padding:36px;margin-bottom:28px;box-shadow:0 4px 12px rgba(0,0,0,.08)}
.plat{margin-bottom:36px;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)}.plat-hdr{color:#fff;padding:18px 24px;display:flex;justify-content:space-between;align-items:center}.plat-hdr h3{font-size:22px;font-weight:700}
table{width:100%;border-collapse:collapse;font-size:12px}th{background:#1e1b4b;color:#fff;padding:12px 10px;text-align:start;font-size:11px;text-transform:uppercase}
td{padding:11px 10px;border-bottom:1px solid #e2e8f0;vertical-align:top}.even{background:#fff}.odd{background:#f8fafc}
.badge{display:inline-block;padding:3px 10px;border-radius:20px;color:#fff;font-size:10px;font-weight:600}.fmt{display:inline-block;padding:3px 8px;background:#e0e7ff;color:#4338ca;border-radius:6px;font-size:10px}
.goal{display:inline-block;padding:3px 8px;background:#d1fae5;color:#065f46;border-radius:6px;font-size:10px}.cta{color:#7c3aed;font-weight:600}
</style></head><body>
<div class="wrap">
  <div class="cover"><h1>${s(brand.name)}</h1><p style="opacity:.85;margin-top:8px">${C.coverSub} &mdash; ${date}</p></div>
  <div class="section"><h2 style="margin-bottom:20px">${C.section}</h2>${platformTables}</div>
</div></body></html>`;
};
