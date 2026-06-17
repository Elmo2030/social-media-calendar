// src/hooks/useCalendar.ts
import { useTransition, useState, useEffect } from 'react';
import type { Brand, CalendarEntry, PlatformCalendars, PlatformName, PillarName, Tone } from '../types/index.js';
import { PLATFORM_DATA, CONTENT_PILLARS, DAYS, CALENDAR_DAYS } from '../data/constants.js';
import { AR_TOPICS, AR_CTAS, AR_CAPTIONS, AR_LABEL, AR_FOCUS, AR_DIFF } from '../data/content-ar.js';
import { useLang, type Lang } from '../i18n.js';

type TopicFn = (arg: string) => string[];

// Seeded PRNG so a plan is deterministic per (brand + platform) — stable for memo
// and tests — yet varies across inputs and platforms. ponytail: mulberry32, swap
// for AI generation when content quality outgrows templates (see ADR-001).
const hashStr = (s: string): number => {
  let h = 2166136261;
  for (let k = 0; k < s.length; k++) { h ^= s.charCodeAt(k); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
const mulberry32 = (seed: number) => (): number => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// monthly-focus & differentiator phrasings (EN; AR parallels in content-ar.ts)
const EN_FOCUS = (f: string): string[] => [`Spotlight: ${f}`, `Why ${f} matters right now`, `${f} — what you need to know`, `Behind the scenes of ${f}`, `Get ready for ${f}`];
const EN_DIFF  = (d: string): string => `What sets us apart: ${d}`;

const TOPICS: Record<PillarName, TopicFn> = {
  Education:       ind  => [`How to choose the right ${ind} solution`,`Common ${ind} mistakes to avoid`,`Beginner guide to ${ind}`,`Key factors before investing in ${ind}`,`${ind} trends shaping 2025`],
  Authority:       ind  => [`Expert perspective on the future of ${ind}`,`What 10 years in ${ind} taught us`,`${ind} industry analysis`,`Overcoming top ${ind} challenges`,`Our proven ${ind} approach`],
  Product:         prod => [`How ${prod} solves your biggest challenges`,`Feature spotlight: ${prod}`,`Real client results with ${prod}`,`Getting started with ${prod}`,`Why leaders choose ${prod}`],
  Engagement:      ind  => [`Biggest challenge in ${ind}?`,`This or that: ${ind} edition`,`Share your ${ind} experience`,`Poll: top priorities in ${ind}`,`Caption this ${ind} moment`],
  'Social Proof':  ()   => [`Client success story: remarkable results`,`Before & after: real transformation`,`What clients say about us`,`Case study: exceptional delivery`,`Celebrating client milestones`],
  'Behind Scenes': ()   => [`A day in the life at our office`,`Meet the team`,`How we prepare for projects`,`Our process from start to finish`,`Team culture: what drives us`],
};
const CTAS: Record<string, string[]> = {
  'Brand Awareness': [`Follow for more insights`,`Share with someone who needs this`,`Save this for later`,`Turn on notifications`],
  'Lead Generation': [`Link in bio to learn more`,`DM us for details`,`Comment for info`,`Book a free consultation`],
  Sales:             [`Shop now via link in bio`,`Limited offer — act now`,`Get your quote today`,`Start your journey`],
  Authority:         [`Follow for daily insights`,`Share your thoughts below`,`Repost to your network`,`Subscribe for updates`],
  Community:         [`Tag a friend who needs this`,`Join our community`,`Follow for more`,`Be part of the conversation`],
  Engagement:        [`Drop your answer below`,`Double tap if you agree`,`Share your experience`,`Vote in our stories`],
};
const CAPTIONS: Record<Tone, (t: string) => string> = {
  Professional:  t => `Industry insight: ${t}. Key takeaways for decision-makers inside.`,
  Bold:          t => `Truth bomb: ${t}. Here's what nobody is telling you.`,
  Friendly:      t => `Let's talk about ${t}. We've got everything you need.`,
  Educational:   t => `Learn: ${t}. Breaking it down step by step.`,
  Luxurious:     t => `Excellence defined: ${t}. Elevate your standards today.`,
  Playful:       t => `Real talk: ${t}. No jargon, just pure value.`,
  Authoritative: t => `Expert analysis: ${t}. Data-driven insights you can trust.`,
};

type GenBrand = Pick<Brand, 'industry' | 'products' | 'goals' | 'tone' | 'differentiation' | 'monthlyFocus'>;

export const buildCalendar = (platform: PlatformName, brand: GenBrand, lang: Lang = 'en'): CalendarEntry[] => {
  const { formats, angles } = PLATFORM_DATA[platform];
  const activeGoals = brand.goals.length > 0 ? brand.goals : ['Brand Awareness'];
  const ar = lang === 'ar';
  const topicSet   = ar ? AR_TOPICS   : TOPICS;
  const ctaSet     = ar ? AR_CTAS     : CTAS;
  const captionSet = ar ? AR_CAPTIONS : CAPTIONS;
  const focusSet   = ar ? AR_FOCUS    : EN_FOCUS;
  const diffFn     = ar ? AR_DIFF     : EN_DIFF;
  // categorical label → Arabic display (logic keys below stay English)
  const L = (s: string): string => ar ? (AR_LABEL[s] ?? s) : s;

  const focus = (brand.monthlyFocus ?? '').trim();
  const diff  = (brand.differentiation ?? '').trim();
  // distinct, non-rigid plan per brand + platform; reshuffles when any input changes
  const rand = mulberry32(hashStr([platform, brand.industry, brand.products, brand.tone, focus, diff, activeGoals.join(',')].join('|')));
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
  const pillarOffset = Math.floor(rand() * CONTENT_PILLARS.length);

  return Array.from({ length: CALENDAR_DAYS }, (_, idx): CalendarEntry => {
    const i       = idx + 1;
    const pillar  = CONTENT_PILLARS[(idx + pillarOffset) % CONTENT_PILLARS.length];
    const goalKey = activeGoals[idx % activeGoals.length];
    const raw     = pillar.name === 'Product' ? (brand.products || brand.industry) : brand.industry;

    let topic = pick((topicSet[pillar.name] ?? topicSet.Education)(raw));
    if (focus && rand() < 0.2) topic = pick(focusSet(focus));                                   // tie ~1 day/week to the monthly focus
    else if (diff && (pillar.name === 'Authority' || pillar.name === 'Product') && rand() < 0.4) topic = diffFn(diff); // weave in the differentiator

    const captionFn = captionSet[brand.tone] ?? captionSet.Professional;
    return {
      day: i, dayName: L(DAYS[(i-1)%DAYS.length]), week: Math.ceil(i/DAYS.length),
      pillar: L(pillar.name), pillarColor: pillar.color,
      topic, angle: L(pick(angles)),
      format: L(pick(formats)),
      caption: captionFn(topic),
      cta: pick(ctaSet[goalKey] ?? ctaSet['Brand Awareness']),
      goal: L(goalKey),
    };
  });
};

interface UseCalendarReturn {
  platformCalendars: PlatformCalendars;
  isComputing:       boolean;
}

export const useCalendar = (brand: Brand, showCalendar: boolean): UseCalendarReturn => {
  const { platforms, industry, products, goals, tone, differentiation, monthlyFocus } = brand;
  const lang = useLang();
  const [isComputing, startCompute] = useTransition();
  const [calendars, setCalendars]   = useState<PlatformCalendars>({});

  useEffect(() => {
    startCompute(() => {
      setCalendars(
        showCalendar && platforms.length
          ? Object.fromEntries(platforms.map(p => [p, buildCalendar(p, { industry, products, goals, tone, differentiation, monthlyFocus }, lang)])) as PlatformCalendars
          : {}
      );
    });
  }, [showCalendar, platforms, industry, products, goals, tone, differentiation, monthlyFocus, lang]);

  return { platformCalendars: calendars, isComputing };
};
