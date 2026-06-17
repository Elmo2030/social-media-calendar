// src/data/content-ar.ts — Arabic generation content, parallel to the English
// tables in useCalendar.ts. Keys stay English (they're logic keys); only the
// produced strings are Arabic. buildCalendar picks these when lang === 'ar'.
import type { PillarName, Tone } from '../types/index.js';

// Categorical labels: pillars, goals, weekdays, formats, angles. Flat map —
// anything missing falls back to its English value.
export const AR_LABEL: Record<string, string> = {
  // pillars
  Education: 'تعليمي', Authority: 'ريادة فكرية', Product: 'المنتج',
  Engagement: 'تفاعل', 'Social Proof': 'دليل اجتماعي', 'Behind Scenes': 'كواليس',
  // goals
  'Brand Awareness': 'الوعي بالعلامة', 'Lead Generation': 'جذب العملاء', Sales: 'مبيعات',
  Community: 'مجتمع',
  // weekdays
  Monday: 'الإثنين', Tuesday: 'الثلاثاء', Wednesday: 'الأربعاء', Thursday: 'الخميس',
  Friday: 'الجمعة', Saturday: 'السبت', Sunday: 'الأحد',
  // formats
  Video: 'فيديو', Carousel: 'كاروسيل', Static: 'صورة ثابتة', 'Link Post': 'منشور برابط',
  Live: 'بث مباشر', Story: 'ستوري', Reel: 'ريل', Guide: 'دليل', Article: 'مقال',
  Document: 'مستند', Poll: 'استطلاع', 'Text Post': 'منشور نصي', Newsletter: 'نشرة بريدية',
  'Short Video': 'فيديو قصير', Trend: 'تريند', Tutorial: 'شرح', Duet: 'ديو', Stitch: 'ستيتش',
  Thread: 'سلسلة تغريدات', Tweet: 'تغريدة', Quote: 'اقتباس', Space: 'مساحة صوتية',
  Spotlight: 'سبوت لايت', BTS: 'كواليس', Update: 'تحديث', Reveal: 'كشف', 'Day-in-Life': 'يوم في الحياة',
  // angles
  'Community story': 'قصة مجتمعية', 'Value tip': 'نصيحة قيّمة', Testimonial: 'شهادة عميل',
  'News reaction': 'تفاعل مع خبر', 'Product benefit': 'فائدة المنتج', Question: 'سؤال',
  'Visual hook': 'جذب بصري', 'Before/after': 'قبل/بعد', 'Step-by-step': 'خطوة بخطوة',
  Relatable: 'قريب من الجمهور', Aspirational: 'مُلهم', 'Quick tip': 'نصيحة سريعة',
  'Industry insight': 'رؤية في المجال', 'Lesson learned': 'درس مستفاد', 'Data opinion': 'رأي مبني على بيانات',
  'Business tip': 'نصيحة عملية', 'Thought leadership': 'ريادة فكرية', Framework: 'إطار عمل',
  'Trend twist': 'لمسة على التريند', 'Myth-bust': 'تصحيح مفهوم', 'Day in life': 'يوم في الحياة',
  'Quick hack': 'حيلة سريعة', POV: 'وجهة نظر', 'Hot take': 'رأي جريء',
  'Thread insight': 'رؤية في سلسلة', Observation: 'ملاحظة', Contrarian: 'رأي مخالف',
  'Micro-lesson': 'درس مصغّر', 'Raw BTS': 'كواليس صريحة', 'Sneak peek': 'نظرة خاطفة',
  'Quick update': 'تحديث سريع', Personal: 'شخصي', 'Flash offer': 'عرض سريع', 'Real-time': 'لحظي',
};

type TopicFn = (arg: string) => string[];

export const AR_TOPICS: Record<PillarName, TopicFn> = {
  Education:       ind  => [`كيف تختار حل ${ind} المناسب`,`أخطاء ${ind} الشائعة التي يجب تجنّبها`,`دليل المبتدئين في ${ind}`,`عوامل أساسية قبل الاستثمار في ${ind}`,`اتجاهات ${ind} التي تشكّل 2025`],
  Authority:       ind  => [`رؤية خبير لمستقبل ${ind}`,`ماذا علّمتنا 10 سنوات في ${ind}`,`تحليل قطاع ${ind}`,`تجاوز أبرز تحديات ${ind}`,`منهجنا المُثبَت في ${ind}`],
  Product:         prod => [`كيف يحل ${prod} أكبر تحدياتك`,`تسليط الضوء على ميزة: ${prod}`,`نتائج حقيقية لعملاء مع ${prod}`,`البدء مع ${prod}`,`لماذا يختار القادة ${prod}`],
  Engagement:      ind  => [`ما أكبر تحدٍّ في ${ind}؟`,`هذا أم ذاك: نسخة ${ind}`,`شاركنا تجربتك في ${ind}`,`استطلاع: أهم الأولويات في ${ind}`,`علّق على لحظة ${ind} هذه`],
  'Social Proof':  ()   => [`قصة نجاح عميل: نتائج لافتة`,`قبل وبعد: تحوّل حقيقي`,`ماذا يقول عملاؤنا عنا`,`دراسة حالة: تنفيذ استثنائي`,`نحتفل بإنجازات عملائنا`],
  'Behind Scenes': ()   => [`يوم في حياة مكتبنا`,`تعرّف على الفريق`,`كيف نستعد لمشاريعنا`,`عمليتنا من البداية للنهاية`,`ثقافة الفريق: ما الذي يحرّكنا`],
};

export const AR_CTAS: Record<string, string[]> = {
  'Brand Awareness': [`تابعنا لمزيد من الأفكار`,`شاركها مع من يحتاجها`,`احفظها لوقت لاحق`,`فعّل الإشعارات`],
  'Lead Generation': [`الرابط في البايو لمعرفة المزيد`,`راسلنا للتفاصيل`,`علّق للمعلومات`,`احجز استشارة مجانية`],
  Sales:             [`تسوّق الآن عبر الرابط في البايو`,`عرض محدود — بادر الآن`,`احصل على عرض سعرك اليوم`,`ابدأ رحلتك`],
  Authority:         [`تابعنا لأفكار يومية`,`شاركنا رأيك بالأسفل`,`أعد النشر لشبكتك`,`اشترك للتحديثات`],
  Community:         [`اذكر صديقاً يحتاج هذا`,`انضم لمجتمعنا`,`تابعنا للمزيد`,`كن جزءاً من الحوار`],
  Engagement:        [`اكتب إجابتك بالأسفل`,`اضغط ضغطتين إن وافقت`,`شاركنا تجربتك`,`صوّت في قصصنا`],
};

export const AR_CAPTIONS: Record<Tone, (t: string) => string> = {
  Professional:  t => `رؤية في المجال: ${t}. أهم النقاط لصنّاع القرار بالداخل.`,
  Bold:          t => `حقيقة صادمة: ${t}. إليك ما لا يخبرك به أحد.`,
  Friendly:      t => `لنتحدث عن ${t}. لدينا كل ما تحتاجه.`,
  Educational:   t => `تعلّم: ${t}. نشرحها خطوة بخطوة.`,
  Luxurious:     t => `التميّز المُعرَّف: ${t}. ارتقِ بمعاييرك اليوم.`,
  Playful:       t => `كلام من القلب: ${t}. بدون تعقيد، قيمة خالصة.`,
  Authoritative: t => `تحليل خبير: ${t}. رؤى مبنية على بيانات يمكنك الوثوق بها.`,
};
