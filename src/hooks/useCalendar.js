// src/hooks/useCalendar.js
// DEFER-FIX 3/3: useTransition inside the hook for internal heavy recomputation
// When platforms/tone/industry changes AFTER calendar is shown, wrap recompute
import { useMemo, useTransition, useState, useEffect } from 'react';
import { PLATFORM_DATA, CONTENT_PILLARS, DAYS } from '../data/constants.js';

const TOPICS = {
  Education:       ind  => [`How to choose the right ${ind} solution`,`Common ${ind} mistakes to avoid`,`Beginner guide to ${ind}`,`Key factors before investing in ${ind}`,`${ind} trends shaping 2025`],
  Authority:       ind  => [`Expert perspective on the future of ${ind}`,`What 10 years in ${ind} taught us`,`${ind} industry analysis`,`Overcoming top ${ind} challenges`,`Our proven ${ind} approach`],
  Product:         prod => [`How ${prod} solves your biggest challenges`,`Feature spotlight: what makes ${prod} unique`,`Real client results with ${prod}`,`Getting started with ${prod}`,`Why leaders choose ${prod}`],
  Engagement:      ind  => [`What's your biggest challenge in ${ind}?`,`This or that: ${ind} edition`,`Share your ${ind} experience`,`Poll: top priorities in ${ind}`,`Caption this ${ind} moment`],
  'Social Proof':  ()   => [`Client success story: remarkable results`,`Before & after: real transformation`,`What clients say about us`,`Case study: exceptional delivery`,`Celebrating client milestones`],
  'Behind Scenes': ()   => [`A day in the life at our office`,`Meet the team behind the brand`,`How we prepare for projects`,`Our process from start to finish`,`Team culture: what drives us`],
};
const CTAS = {
  'Brand Awareness': [`Follow for more insights`,`Share with someone who needs this`,`Save this for later`,`Turn on notifications`],
  'Lead Generation': [`Link in bio to learn more`,`DM us for details`,`Comment for info`,`Book a free consultation`],
  Sales:             [`Shop now via link in bio`,`Limited offer — act now`,`Get your quote today`,`Start your journey`],
  Authority:         [`Follow for daily insights`,`Share your thoughts below`,`Repost to your network`,`Subscribe for updates`],
  Community:         [`Tag a friend who needs this`,`Join our community`,`Follow for more`,`Be part of the conversation`],
  Engagement:        [`Drop your answer below`,`Double tap if you agree`,`Share your experience`,`Vote in our stories`],
};
const CAPTIONS = {
  Professional:  t => `Industry insight: ${t}. Key takeaways for decision-makers inside.`,
  Bold:          t => `Truth bomb: ${t}. Here's what nobody is telling you.`,
  Friendly:      t => `Let's talk about ${t}. We've got everything you need.`,
  Educational:   t => `Learn: ${t}. Breaking it down step by step.`,
  Luxurious:     t => `Excellence defined: ${t}. Elevate your standards today.`,
  Playful:       t => `Real talk: ${t}. No jargon, just pure value.`,
  Authoritative: t => `Expert analysis: ${t}. Data-driven insights you can trust.`,
};

export const buildCalendar = (platform, { industry, products, goals, tone }) => {
  const { formats, angles } = PLATFORM_DATA[platform];
  const activeGoals = goals.length > 0 ? goals : ['Brand Awareness'];
  return Array.from({ length: 30 }, (_, idx) => {
    const i      = idx + 1;
    const pillar = CONTENT_PILLARS[i % CONTENT_PILLARS.length];
    const goal   = activeGoals[i % activeGoals.length];
    const raw    = pillar.name === 'Product' ? products : industry;
    const topics = TOPICS[pillar.name]?.(raw) ?? TOPICS.Education(industry);
    const topic  = topics[i % topics.length];
    return {
      day: i, dayName: DAYS[(i-1)%7], week: Math.ceil(i/7),
      pillar: pillar.name, pillarColor: pillar.color,
      topic, angle: angles[i % angles.length],
      format: formats[i % formats.length],
      caption: (CAPTIONS[tone] ?? CAPTIONS.Professional)(topic),
      cta: (CTAS[goal] ?? CTAS['Brand Awareness'])[i % 4],
      goal,
    };
  });
};

export const useCalendar = (brand, showCalendar) => {
  const { platforms, industry, products, goals, tone } = brand;

  // DEFER-FIX 3/3: useTransition for recomputation after initial render
  // isComputing = true while React processes the heavy calendar update
  const [isComputing, startCompute] = useTransition();
  const [calendars, setCalendars]   = useState({});

  useEffect(() => {
    if (!showCalendar || !platforms.length) { setCalendars({}); return; }
    // Wrap in startTransition — calendar recompute is non-urgent
    startCompute(() => {
      setCalendars(
        Object.fromEntries(
          platforms.map(p => [p, buildCalendar(p, { industry, products, goals, tone })])
        )
      );
    });
  }, [showCalendar, platforms, industry, products, goals, tone]);

  return { platformCalendars: calendars, isComputing };
};
