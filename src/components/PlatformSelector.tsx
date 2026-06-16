// src/components/PlatformSelector.tsx
import { ChevronRight } from 'lucide-react';
import type { PlatformSelectorProps, PlatformName } from '../types/index.js';
import { ALL_PLATFORMS, PLATFORM_DATA } from '../data/constants.js';

export default function PlatformSelector({ selected, onToggle, onBack, onGenerate, onGenerateHover }: PlatformSelectorProps) {
  return (
    <div className="bg-surface-card/80 rounded-xl p-5 backdrop-blur">
      <h2 className="text-lg font-bold text-white mb-1">📣 Select Platforms</h2>
      <p className="text-content-muted text-xs mb-4" aria-live="polite">{selected.length} of {ALL_PLATFORMS.length} selected</p>
      <div className="grid grid-cols-3 gap-3" role="group" aria-label="Platform selection">
        {ALL_PLATFORMS.map(p => {
          const active = selected.includes(p);
          const color  = PLATFORM_DATA[p].color;
          return (
            <button key={p} onClick={()=>onToggle(p as PlatformName)}
              aria-pressed={active} aria-label={`${active?'Remove':'Add'} ${p}`}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${active?'text-white':'border-surface-hover bg-surface-raised/50 text-content hover:border-surface-muted'}`}
              style={active?{borderColor:color,background:color+'33'}:{}}>
              {p}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between">
        <button onClick={onBack} aria-label="Go back to brand information"
          className="bg-surface-raised hover:bg-surface-hover text-white px-5 py-2 rounded-lg text-sm transition-colors">Back</button>
        <button onClick={onGenerate} onMouseEnter={onGenerateHover} disabled={!selected.length}
          aria-label={`Generate calendar for ${selected.length} platform${selected.length!==1?'s':''}`}
          className="bg-brand hover:bg-brand-strong disabled:bg-surface-hover disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
          Generate Calendar <ChevronRight size={16} aria-hidden="true"/>
        </button>
      </div>
    </div>
  );
}
