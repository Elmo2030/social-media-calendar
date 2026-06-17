// src/i18n.ts — tiny DIY i18n. English strings are the source/keys; only the
// Arabic dictionary is maintained. No library: a module store + useSyncExternalStore.
// ponytail: en-as-key flat dict, fine for ~1 app; swap for react-i18next only if
// translation volume or pluralization rules outgrow a flat map.
import { useSyncExternalStore } from 'react';

export type Lang = 'en' | 'ar';
const STORAGE_KEY = 'smc.lang';

// Arabic overrides. Any string missing here falls back to the English key.
const AR: Record<string, string> = {
  // app shell
  'Social Media Content Calendar': 'تقويم محتوى السوشيال ميديا',
  'Brand Info': 'بيانات البراند',
  'Platforms': 'المنصّات',
  'Calendar': 'التقويم',
  'Computing calendar…': 'جارٍ حساب التقويم…',
  'Loading…': 'جارٍ التحميل…',
  'Progress steps': 'خطوات التقدّم',
  'Calendar results': 'نتائج التقويم',
  'العربية': 'English',
  // step 1 — brand form
  '🏢 Brand Information': '🏢 بيانات البراند',
  'Brand Name *': 'اسم البراند *',
  'Industry *': 'المجال *',
  'Select industry': 'اختر المجال',
  'Brand Tone': 'نبرة البراند',
  'Monthly Goals': 'الأهداف الشهرية',
  'Key Products / Services': 'المنتجات / الخدمات الأساسية',
  'Enter brand name': 'اكتب اسم البراند',
  'Main offerings': 'أهم ما تقدّمه',
  'Brand name is required.': 'اسم البراند مطلوب.',
  'Please select an industry.': 'من فضلك اختر المجال.',
  'Next': 'التالي',
  'Proceed to platform selection': 'المتابعة لاختيار المنصّات',
  // step 2 — platform selector
  '📣 Select Platforms': '📣 اختر المنصّات',
  '{n} of {m} selected': 'تم اختيار {n} من {m}',
  'Pick at least one platform to generate your calendar.': 'اختر منصّة واحدة على الأقل لتوليد تقويمك.',
  'Back': 'رجوع',
  'Generate Calendar': 'توليد التقويم',
  'Add': 'إضافة',
  'Remove': 'إزالة',
  // step 3 — results
  'Content Calendar Ready': 'تقويم المحتوى جاهز',
  'Copy HTML': 'نسخ HTML',
  'Copied!': 'تم النسخ!',
  'Building…': 'جارٍ البناء…',
  'Building HTML…': 'جارٍ بناء HTML…',
  'Download': 'تحميل',
  'Downloaded!': 'تم التحميل!',
  'Download Premium Calendar': 'تحميل التقويم الكامل',
  'New Calendar': 'تقويم جديد',
  'Total Posts': 'إجمالي المنشورات',
  'Pillars': 'الركائز',
  'Download saves a full HTML document. Open in any browser and print to PDF.':
    'التحميل يحفظ مستند HTML كامل. افتحه في أي متصفّح واطبعه PDF.',
  'Dismiss error': 'إغلاق الخطأ',
  'Download failed — try Copy HTML instead.': 'فشل التحميل — جرّب نسخ HTML بدلاً منه.',
  'Clipboard unavailable — your browser may block it on this page.':
    'الحافظة غير متاحة — قد يحجبها متصفّحك في هذه الصفحة.',
  // preview card
  '{n} posts ready': '{n} منشور جاهز',
  'Day': 'اليوم',
  'Pillar': 'الركيزة',
  'Topic': 'الموضوع',
  'Format': 'الصيغة',
  'Goal': 'الهدف',
  'Preview: first {p} days — all {n} in downloaded file':
    'معاينة: أول {p} أيام — الـ{n} كاملة في الملف المُحمّل',
  // error boundary
  'Something went wrong': 'حدث خطأ ما',
  'Try Again': 'حاول مجدداً',
  'Unknown error': 'خطأ غير معروف',
};

let lang: Lang = read();
const listeners = new Set<() => void>();

function read(): Lang {
  try { return localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en'; } catch { return 'en'; }
}

function applyDir(l: Lang): void {
  const el = document.documentElement;
  el.lang = l;
  el.dir = l === 'ar' ? 'rtl' : 'ltr';
}

const interpolate = (s: string, vars?: Record<string, string | number>): string =>
  vars ? s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : s;

export const getLang = (): Lang => lang;

// Non-reactive translate for non-hook contexts (e.g. class components).
export const tr = (s: string, vars?: Record<string, string | number>): string =>
  interpolate(lang === 'ar' ? (AR[s] ?? s) : s, vars);

export function setLang(l: Lang): void {
  if (l === lang) return;
  lang = l;
  try { localStorage.setItem(STORAGE_KEY, l); } catch { /* private mode — non-fatal */ }
  applyDir(l);
  listeners.forEach(fn => fn());
}

export const useLang = (): Lang =>
  useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => lang,
    () => lang,
  );

// Returns a translate fn bound to the current language; re-renders on switch.
export function useT(): (s: string, vars?: Record<string, string | number>) => string {
  const l = useLang();
  return (s, vars) => interpolate(l === 'ar' ? (AR[s] ?? s) : s, vars);
}

applyDir(lang); // set <html dir/lang> on first import
