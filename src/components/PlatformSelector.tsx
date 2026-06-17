// src/components/PlatformSelector.tsx
import { ChevronRight } from 'lucide-react';
import type { PlatformSelectorProps, PlatformName } from '../types/index.js';
import { ALL_PLATFORMS, PLATFORM_DATA } from '../data/constants.js';
import { useT } from '../i18n.js';

export default function PlatformSelector({ selected, onToggle, onBack, onGenerate, onGenerateHover }: PlatformSelectorProps) {
  const t = useT();
  return (
    <div className="bg-surface-card/80 rounded-xl p-5 backdrop-blur animate-fade-in-up">
      <h2 className="text-lg font-bold text-white mb-1">{t('📣 Select Platforms')}</h2>
      <p className="text-content-muted text-xs mb-4" aria-live="polite">{t('{n} of {m} selected', { n: selected.length, m: ALL_PLATFORMS.length })}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label={t('📣 Select Platforms')}>
        {ALL_PLATFORMS.map(p => {
          const active = selected.includes(p);
          const color  = PLATFORM_DATA[p].color;
          return (
            <button key={p} onClick={()=>onToggle(p as PlatformName)}
              aria-pressed={active} aria-label={`${t(active?'Remove':'Add')} ${p}`}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all hover:scale-[1.02] ${active?'text-white':'border-surface-hover bg-surface-raised/50 text-content hover:border-surface-muted'}`}
              style={active?{borderColor:color,background:color+'33'}:{}}>
              {p}
            </button>
          );
        })}
      </div>
      {selected.length === 0 && (
        <p className="mt-3 text-content-faint text-xs text-center animate-fade-in" role="status">
          👆 {t('Pick at least one platform to generate your calendar.')}
        </p>
      )}
      <div className="mt-4 flex justify-between">
        <button onClick={onBack} aria-label={t('Back')}
          className="bg-surface-raised hover:bg-surface-hover text-white px-5 py-2 rounded-lg text-sm transition-colors">{t('Back')}</button>
        <button onClick={onGenerate} onMouseEnter={onGenerateHover} disabled={!selected.length}
          aria-label={t('Generate Calendar')}
          className="bg-brand hover:bg-brand-strong disabled:bg-surface-hover disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
          {t('Generate Calendar')} <ChevronRight size={16} className="rtl:rotate-180" aria-hidden="true"/>
        </button>
      </div>
    </div>
  );
}
