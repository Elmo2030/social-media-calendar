// src/types/index.ts — Central type definitions for the entire app
// Every component, hook, and utility imports from here

// ── Literal union types ───────────────────────────────────────────────────────
export type PlatformName =
  | 'Facebook' | 'Instagram' | 'LinkedIn'
  | 'TikTok'   | 'Twitter'   | 'Snapchat';

export type PillarName =
  | 'Education' | 'Authority'     | 'Product'
  | 'Engagement'| 'Social Proof'  | 'Behind Scenes';

export type Tone =
  | 'Professional' | 'Bold'         | 'Friendly'
  | 'Educational'  | 'Luxurious'    | 'Playful'
  | 'Authoritative';

export type BusinessModel = 'B2C' | 'B2B' | 'Hybrid';

// ── Core data shapes ─────────────────────────────────────────────────────────
export interface Brand {
  name:            string;
  industry:        string;
  country:         string;
  businessModel:   BusinessModel;
  goals:           string[];
  audience:        string;
  tone:            Tone;
  products:        string;
  differentiation: string;
  platforms:       PlatformName[];
}

export interface ContentPillar {
  name:   PillarName;
  desc:   string;
  weight: number;
  color:  string;
}

export interface PlatformConfig {
  color:   string;
  formats: string[];
  angles:  string[];
}

export interface CalendarEntry {
  day:         number;
  dayName:     string;
  week:        number;
  pillar:      PillarName;
  pillarColor: string;
  topic:       string;
  angle:       string;
  format:      string;
  caption:     string;
  cta:         string;
  goal:        string;
}

export type PlatformCalendars = Partial<Record<PlatformName, CalendarEntry[]>>;

// ── Reducer action types ─────────────────────────────────────────────────────
export type BrandAction =
  | { type: 'UPDATE_FIELD';    field: keyof Brand;   value: Brand[keyof Brand] }
  | { type: 'TOGGLE_GOAL';     goal:     string }
  | { type: 'TOGGLE_PLATFORM'; platform: PlatformName }
  | { type: 'RESET' };

// ── Component prop types ─────────────────────────────────────────────────────
export interface FormFieldProps {
  label:        string;
  value:        string;
  onChange:     (v: string) => void;
  placeholder?: string;
  type?:        string;
  colSpan?:     string;
  error?:       string;
  onBlur?:      () => void;
}

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
  options:  Array<string | FormSelectOption>;
  error?:   string;
  onBlur?:  () => void;
}

export interface TogglePillProps {
  label:   string;
  active:  boolean;
  onClick: () => void;
}

export interface BrandFormProps {
  brand:        Brand;
  updateBrand:  (field: keyof Brand, value: Brand[keyof Brand]) => void;
  toggleGoal:   (goal: string) => void;
  onNext:       () => void;
  onNextHover?: () => void;
}

export interface PlatformSelectorProps {
  selected:          PlatformName[];
  onToggle:          (p: PlatformName) => void;
  onBack:            () => void;
  onGenerate:        () => void;
  onGenerateHover?:  () => void;
}

export interface PlatformPreviewCardProps {
  platform: PlatformName;
  calendar: CalendarEntry[] | undefined;
  expanded: boolean;
  onToggle: (p: PlatformName) => void;
}

export interface CalendarResultsProps {
  brand:            Brand;
  platformCalendars:PlatformCalendars;
  copied:           boolean;
  downloaded:       boolean;
  building:         boolean;
  error:            string | null;
  onDownload:       () => void;
  onCopy:           () => void;
  onReset:          () => void;
  onDismissError:   () => void;
}
