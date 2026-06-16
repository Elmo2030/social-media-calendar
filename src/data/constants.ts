// src/data/constants.ts
import type { ContentPillar, PlatformConfig, PlatformName, Tone, Brand, BusinessModel } from '../types/index.js';

export const CONTENT_PILLARS: ContentPillar[] = [
  { name: 'Education',     desc: 'Teach your audience something valuable',          weight: 25, color: '#3B82F6' },
  { name: 'Authority',     desc: 'Position the brand as an industry leader',        weight: 20, color: '#8B5CF6' },
  { name: 'Product',       desc: 'Highlight products/services with focus on value', weight: 20, color: '#10B981' },
  { name: 'Engagement',    desc: 'Drive interaction through questions',              weight: 15, color: '#F59E0B' },
  { name: 'Social Proof',  desc: 'Build trust through testimonials and results',    weight: 10, color: '#EF4444' },
  { name: 'Behind Scenes', desc: 'Humanize the brand with team and culture',        weight: 10, color: '#EC4899' },
];

export const PLATFORM_DATA: Record<PlatformName, PlatformConfig> = {
  Facebook:  { color: '#1877F2', formats: ['Video','Carousel','Static','Link Post','Live','Story'],     angles: ['Community story','Value tip','Testimonial','News reaction','Product benefit','Question'] },
  Instagram: { color: '#E4405F', formats: ['Reel','Carousel','Static','Story','Live','Guide'],           angles: ['Visual hook','Before/after','Step-by-step','Relatable','Aspirational','Quick tip'] },
  LinkedIn:  { color: '#0A66C2', formats: ['Article','Document','Video','Poll','Text Post','Newsletter'],angles: ['Industry insight','Lesson learned','Data opinion','Business tip','Thought leadership','Framework'] },
  TikTok:    { color: '#000000', formats: ['Short Video','Trend','Tutorial','Duet','Stitch','Live'],     angles: ['Trend twist','Myth-bust','Day in life','Quick hack','Story','POV'] },
  Twitter:   { color: '#1DA1F2', formats: ['Thread','Tweet','Poll','Video','Quote','Space'],             angles: ['Hot take','Thread insight','Observation','Contrarian','Micro-lesson','Question'] },
  Snapchat:  { color: '#FFFC00', formats: ['Story','Spotlight','BTS','Update','Reveal','Day-in-Life'],  angles: ['Raw BTS','Sneak peek','Quick update','Personal','Flash offer','Real-time'] },
};

export const CALENDAR_DAYS = 30; // days generated per platform
export const PREVIEW_DAYS   = 7;  // rows shown in the in-app preview table

export const INDUSTRIES:    string[]         = ['Real Estate','E-commerce','Healthcare','Education','Food and Beverage','Technology','Finance','Fashion','Automotive','Travel','Other'];
export const TONES:         Tone[]           = ['Professional','Bold','Friendly','Educational','Luxurious','Playful','Authoritative'];
export const GOAL_OPTIONS:  string[]         = ['Brand Awareness','Lead Generation','Sales','Authority','Community','Engagement'];
export const ALL_PLATFORMS: PlatformName[]   = ['Facebook','Instagram','LinkedIn','TikTok','Twitter','Snapchat'];
export const DAYS:          string[]         = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export const INITIAL_BRAND: Brand = {
  name: '', industry: '', country: '', businessModel: 'B2C' as BusinessModel,
  goals: [], audience: '', tone: 'Professional' as Tone,
  products: '', differentiation: '',
  platforms: [...ALL_PLATFORMS],
};
