// src/components/PlatformPreviewCard.tsx
import { memo, useCallback } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { PlatformPreviewCardProps } from '../types/index.js';
import { PLATFORM_DATA, CALENDAR_DAYS, PREVIEW_DAYS } from '../data/constants.js';
import { textOn } from '../utils/contrast.js';
import { useT } from '../i18n.js';

export const PlatformPreviewCard = memo(({ platform, calendar, expanded, onToggle }: PlatformPreviewCardProps) => {
  const t       = useT();
  const color   = PLATFORM_DATA[platform].color;
  const hdrBg   = color === '#FFFC00' ? '#333' : color;
  const preview = calendar?.slice(0, PREVIEW_DAYS) ?? [];
  const handleToggle = useCallback(() => onToggle(platform), [onToggle, platform]);

  return (
    <div className="bg-surface-card/80 rounded-xl overflow-hidden backdrop-blur">
      <button onClick={handleToggle} aria-expanded={expanded}
        className="w-full p-3 flex justify-between items-center hover:bg-white/5 transition-colors"
        style={{ background: hdrBg + '33' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: color }} aria-hidden="true"/>
          <h3 className="font-bold text-white">{platform}</h3>
          <span className="text-content-muted text-xs">{t('{n} posts ready', { n: CALENDAR_DAYS })}</span>
        </div>
        {expanded ? <ChevronDown className="text-white" size={18}/> : <ChevronRight className="text-white" size={18}/>}
      </button>
      {expanded && (
        <div className="p-3 overflow-x-auto" role="region" aria-label={`${platform} ${t('Calendar')}`}>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-raised/50 text-start">
                {['Day','Pillar','Topic','Format','Goal'].map(h=>(
                  <th key={h} className="p-2 text-brand-softer font-semibold" scope="col">{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map(d=>(
                <tr key={d.day} className="border-b border-surface-raised/50 hover:bg-surface-raised/20">
                  <td className="p-2 text-white font-medium">{d.day}</td>
                  <td className="p-2"><span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:d.pillarColor,color:textOn(d.pillarColor)}}>{d.pillar}</span></td>
                  <td className="p-2 text-content max-w-xs">{d.topic.length>45?d.topic.slice(0,45)+'…':d.topic}</td>
                  <td className="p-2 text-content-muted">{d.format}</td>
                  <td className="p-2 text-feedback-success">{d.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-content-faint text-xs mt-2 text-center">{t('Preview: first {p} days — all {n} in downloaded file', { p: PREVIEW_DAYS, n: CALENDAR_DAYS })}</p>
        </div>
      )}
    </div>
  );
});
PlatformPreviewCard.displayName = 'PlatformPreviewCard';
