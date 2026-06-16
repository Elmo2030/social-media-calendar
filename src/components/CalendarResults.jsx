// src/components/CalendarResults.jsx — Step 3: Results dashboard
import { useState, useCallback } from 'react';
import { Download, Copy, Check, FileText, ShieldCheck, Zap, Layers } from 'lucide-react';
import { PlatformPreviewCard } from './PlatformPreviewCard.jsx';
import { CONTENT_PILLARS } from '../data/constants.js';

const FIX_BADGES = [
  { icon: ShieldCheck, label: 'XSS Fixed',       color: '#10B981' },
  { icon: Zap,         label: 'useMemo Active',   color: '#3B82F6' },
  { icon: Layers,      label: 'Code Split',        color: '#8B5CF6' },
];

const StatCard = ({ label, value }) => (
  <div className="bg-slate-700/50 p-3 rounded-lg text-center">
    <div className="text-purple-300 text-xs">{label}</div>
    <div className="text-xl font-bold text-white">{value}</div>
  </div>
);

export const CalendarResults = ({
  brand, platformCalendars, copied, onDownload, onCopy, onReset,
}) => {
  const [expanded, setExpanded] = useState({});
  const toggle = useCallback(p => setExpanded(prev => ({ ...prev, [p]: !prev[p] })), []);

  return (
    <div className="space-y-4">
      {/* Fix badges */}
      <div className="flex gap-2 flex-wrap justify-center">
        {FIX_BADGES.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: color + '22', border: `1px solid ${color}66`, color }}>
            <Icon size={13} /> {label}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-slate-800/80 rounded-xl p-5 backdrop-blur">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{brand.name}</h2>
            <p className="text-purple-300 text-sm">Content Calendar Ready</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onCopy}
              className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy HTML'}
            </button>
            <button onClick={onDownload}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-medium transition-colors">
              <Download size={16} /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard label="Total Posts" value={brand.platforms.length * 30} />
          <StatCard label="Platforms"   value={brand.platforms.length} />
          <StatCard label="Pillars"     value={CONTENT_PILLARS.length} />
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-300 text-sm flex items-center gap-2">
            <FileText size={18} />
            Download saves a full HTML document. Open in any browser and print to PDF.
          </p>
        </div>
      </div>

      {/* Platform previews */}
      {brand.platforms.map(platform => (
        <PlatformPreviewCard
          key={platform}
          platform={platform}
          calendar={platformCalendars[platform]}
          expanded={!!expanded[platform]}
          onToggle={() => toggle(platform)}
        />
      ))}

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={onReset}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          New Calendar
        </button>
        <button onClick={onDownload}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 flex-1 justify-center font-medium transition-colors">
          <Download size={16} /> Download Premium Calendar
        </button>
      </div>
    </div>
  );
};
