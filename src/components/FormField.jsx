// src/components/FormField.jsx
// PERF-1: memo() — prevents re-render on unrelated brand field changes
import { memo } from 'react';

export const FormField = memo(({ label, value, onChange, placeholder, type = 'text', colSpan = '' }) => (
  <div className={colSpan}>
    <label className="block text-purple-200 mb-1 text-xs">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-700 text-white rounded-lg p-2.5 text-sm border border-slate-600 focus:border-purple-500 outline-none"
    />
  </div>
));
FormField.displayName = 'FormField';

export const FormSelect = memo(({ label, value, onChange, options }) => (
  <div>
    <label className="block text-purple-200 mb-1 text-xs">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-slate-700 text-white rounded-lg p-2.5 text-sm border border-slate-600 focus:border-purple-500 outline-none"
    >
      {options.map(opt => {
        const val   = typeof opt === 'string' ? opt : opt.value;
        const label = typeof opt === 'string' ? opt : opt.label;
        return <option key={val} value={val}>{label}</option>;
      })}
    </select>
  </div>
));
FormSelect.displayName = 'FormSelect';

export const TogglePill = memo(({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 rounded text-xs transition-colors ${
      active ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
    }`}
  >
    {label}
  </button>
));
TogglePill.displayName = 'TogglePill';
