// src/components/CalendarResults.tsx
import { useState, useCallback, memo } from 'react';
import { Download, Copy, Check, FileText, ShieldCheck, Zap, Layers, Loader2, AlertTriangle, X } from 'lucide-react';
import { PlatformPreviewCard } from './PlatformPreviewCard.js';
import type { CalendarResultsProps, PlatformName } from '../types/index.js';
import { CONTENT_PILLARS, CALENDAR_DAYS } from '../data/constants.js';

interface BadgeItem { Icon: React.ElementType; label: string; color: string; }
const FIX_BADGES: BadgeItem[] = [
  { Icon: ShieldCheck, label: 'XSS Fixed',      color: '#10B981' },
  { Icon: Zap,         label: 'useMemo Active',  color: '#3B82F6' },
  { Icon: Layers,      label: 'TypeScript',      color: '#8B5CF6' },
];

interface StatCardProps { label: string; value: number; }
const StatCard = memo(({ label, value }: StatCardProps) => (
  <div className="bg-surface-raised/50 p-3 rounded-lg text-center">
    <div className="text-brand-soft text-xs">{label}</div>
    <div className="text-xl font-bold text-white">{value}</div>
  </div>
));
StatCard.displayName = 'StatCard';

const CalendarResults = ({ brand, platformCalendars, copied, downloaded, building, error, onDownload, onCopy, onReset, onDismissError }: CalendarResultsProps) => {
  const [expanded, setExpanded] = useState<Record<PlatformName, boolean>>({} as Record<PlatformName, boolean>);
  const handleToggle = useCallback((platform: PlatformName) => {
    setExpanded(prev => ({ ...prev, [platform]: !prev[platform] }));
  }, []);

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="flex gap-2 flex-wrap justify-center" role="status" aria-label="Applied security and performance fixes">
        {FIX_BADGES.map(({ Icon, label, color }) => (
          <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: color + '22', border: `1px solid ${color}66`, color }}>
            <Icon size={13} aria-hidden="true"/> {label}
          </div>
        ))}
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 bg-feedback-error/10 border border-feedback-error/40 text-feedback-error rounded-lg p-3 text-sm animate-fade-in">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" aria-hidden="true"/>
          <span className="flex-1">{error}</span>
          <button onClick={onDismissError} aria-label="Dismiss error"
            className="shrink-0 hover:opacity-70 transition-opacity"><X size={16} aria-hidden="true"/></button>
        </div>
      )}

      <div className="bg-surface-card/80 rounded-xl p-5 backdrop-blur">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{brand.name}</h2>
            <p className="text-brand-soft text-sm">Content Calendar Ready</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onCopy} disabled={building} aria-label={copied?'Copied to clipboard':'Copy HTML to clipboard'}
              className="bg-surface-hover hover:bg-surface-muted disabled:opacity-60 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors">
              {building?<Loader2 size={16} className="animate-spin" aria-hidden="true"/>:copied?<Check size={16} aria-hidden="true"/>:<Copy size={16} aria-hidden="true"/>}
              {building?'Building…':copied?'Copied!':'Copy HTML'}
            </button>
            <button onClick={onDownload} disabled={building} aria-label="Download calendar as HTML file"
              className="bg-feedback-success hover:bg-feedback-success/90 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-medium transition-colors">
              {building?<Loader2 size={16} className="animate-spin" aria-hidden="true"/>:downloaded?<Check size={16} aria-hidden="true"/>:<Download size={16} aria-hidden="true"/>}
              {building?'Building…':downloaded?'Downloaded!':'Download'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4" role="group" aria-label="Calendar statistics">
          <StatCard label="Total Posts" value={brand.platforms.length * CALENDAR_DAYS}/>
          <StatCard label="Platforms"   value={brand.platforms.length}/>
          <StatCard label="Pillars"     value={CONTENT_PILLARS.length}/>
        </div>
        <div className="bg-feedback-success/10 border border-feedback-success/30 rounded-lg p-4">
          <p className="text-feedback-success text-sm flex items-center gap-2">
            <FileText size={18} aria-hidden="true"/>
            Download saves a full HTML document. Open in any browser and print to PDF.
          </p>
        </div>
      </div>

      {brand.platforms.map(platform => (
        <PlatformPreviewCard key={platform} platform={platform}
          calendar={platformCalendars[platform]}
          expanded={!!expanded[platform as PlatformName]}
          onToggle={handleToggle}/>
      ))}

      <div className="flex gap-3">
        <button onClick={onReset} aria-label="Start a new calendar"
          className="bg-surface-raised hover:bg-surface-hover text-white px-4 py-2 rounded-lg text-sm transition-colors">
          New Calendar
        </button>
        <button onClick={onDownload} disabled={building} aria-label="Download premium calendar as HTML"
          className="bg-feedback-success hover:bg-feedback-success/90 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 flex-1 justify-center font-medium transition-colors">
          {building?<Loader2 size={16} className="animate-spin" aria-hidden="true"/>:downloaded?<Check size={16} aria-hidden="true"/>:<Download size={16} aria-hidden="true"/>}
          {building?'Building HTML…':downloaded?'Downloaded!':'Download Premium Calendar'}
        </button>
      </div>
    </div>
  );
};
export default memo(CalendarResults);
