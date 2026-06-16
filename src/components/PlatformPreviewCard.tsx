// src/components/PlatformPreviewCard.tsx
import { memo, useCallback } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { PlatformPreviewCardProps } from '../types/index.js';
import { PLATFORM_DATA } from '../data/constants.js';

export const PlatformPreviewCard = memo(({ platform, calendar, expanded, onToggle }: PlatformPreviewCardProps) => {
  const color   = PLATFORM_DATA[platform].color;
  const hdrBg   = color === '#FFFC00' ? '#333' : color;
  const preview = calendar?.slice(0, 7) ?? [];
  const handleToggle = useCallback(() => onToggle(platform), [onToggle, platform]);

  return (
    <div className="bg-surface-card/80 rounded-xl overflow-hidden backdrop-blur">
      <button onClick={handleToggle} aria-expanded={expanded}
        className="w-full p-3 flex justify-between items-center hover:bg-white/5 transition-colors"
        style={{ background: hdrBg + '33' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: color }} aria-hidden="true"/>
          <span className="font-bold text-white">{platform}</span>
          <span className="text-content-muted text-xs">30 posts ready</span>
        </div>
        {expanded ? <ChevronDown className="text-white" size={18}/> : <ChevronRight className="text-white" size={18}/>}
      </button>
      {expanded && (
        <div className="p-3 overflow-x-auto" role="region" aria-label={`${platform} calendar preview`}>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-raised/50 text-left">
                {['Day','Pillar','Topic','Format','Goal'].map(h=>(
                  <th key={h} className="p-2 text-brand-softer font-semibold" scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map(d=>(
                <tr key={d.day} className="border-b border-surface-raised/50 hover:bg-surface-raised/20">
                  <td className="p-2 text-white font-medium">{d.day}</td>
                  <td className="p-2"><span className="px-2 py-0.5 rounded-full text-white text-xs" style={{background:d.pillarColor}}>{d.pillar}</span></td>
                  <td className="p-2 text-content max-w-xs">{d.topic.length>45?d.topic.slice(0,45)+'…':d.topic}</td>
                  <td className="p-2 text-content-muted">{d.format}</td>
                  <td className="p-2 text-green-400">{d.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-content-faint text-xs mt-2 text-center">Preview: first 7 days — all 30 in downloaded file</p>
        </div>
      )}
    </div>
  );
});
PlatformPreviewCard.displayName = 'PlatformPreviewCard';
