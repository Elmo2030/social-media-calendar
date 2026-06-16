// src/components/PlatformSelector.jsx — Step 2: Platform selection grid
import { ChevronRight } from 'lucide-react';
import { ALL_PLATFORMS, PLATFORM_DATA } from '../data/constants.js';

const PLATFORM_ICONS = {
  Facebook: 'f', Instagram: '📷', LinkedIn: 'in',
  TikTok: '♪', Twitter: '𝕏', Snapchat: '👻',
};

export const PlatformSelector = ({ selected, onToggle, onBack, onGenerate }) => (
  <div className="bg-slate-800/80 rounded-xl p-5 backdrop-blur">
    <h2 className="text-lg font-bold text-white mb-1">📣 Select Platforms</h2>
    <p className="text-slate-400 text-xs mb-4">{selected.length} of {ALL_PLATFORMS.length} selected</p>
    <div className="grid grid-cols-3 gap-3">
      {ALL_PLATFORMS.map(p => {
        const active = selected.includes(p);
        const color  = PLATFORM_DATA[p].color;
        return (
          <button
            key={p}
            onClick={() => onToggle(p)}
            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
              active ? 'text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
            }`}
            style={active ? { borderColor: color, background: color + '33' } : {}}
          >
            {p}
          </button>
        );
      })}
    </div>
    <div className="mt-4 flex justify-between">
      <button onClick={onBack} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-lg text-sm transition-colors">
        Back
      </button>
      <button
        onClick={onGenerate}
        disabled={!selected.length}
        className="bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
      >
        Generate Calendar <ChevronRight size={16} />
      </button>
    </div>
  </div>
);
