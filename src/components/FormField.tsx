// src/components/FormField.tsx
import { memo } from 'react';
import type { FormFieldProps, FormSelectProps, TogglePillProps, FormSelectOption } from '../types/index.js';

// unicode-aware so Arabic labels still yield unique, valid ids (not all-dashes)
const slug = (s: string) => s.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
// border tokens swap to feedback-error when the field carries a validation message.
// a11y (1.4.11): border-surface-muted on the recessed surface-base fill = ~3.7:1
const borderClass = (error?: string) =>
  error ? 'border-feedback-error focus:border-feedback-error' : 'border-surface-muted focus:border-brand-light';

export const FormField = memo(({ label, value, onChange, placeholder, type = 'text', colSpan = '', error, onBlur }: FormFieldProps) => {
  const id = slug(label);
  return (
    <div className={colSpan}>
      <label htmlFor={id} className="block text-brand-softer mb-1 text-xs">{label}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full bg-surface-base text-white rounded-lg p-2.5 text-sm border outline-none ${borderClass(error)}`}/>
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-feedback-error text-xs animate-fade-in">{error}</p>}
    </div>
  );
});
FormField.displayName = 'FormField';

export const FormSelect = memo(({ label, value, onChange, options, error, onBlur }: FormSelectProps) => {
  const id = slug(label);
  return (
    <div>
      <label htmlFor={id} className="block text-brand-softer mb-1 text-xs">{label}</label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full bg-surface-base text-white rounded-lg p-2.5 text-sm border outline-none ${borderClass(error)}`}>
        {options.map(opt => {
          const val   = typeof opt === 'string' ? opt : (opt as FormSelectOption).value;
          const label = typeof opt === 'string' ? opt : (opt as FormSelectOption).label;
          return <option key={val} value={val}>{label}</option>;
        })}
      </select>
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-feedback-error text-xs animate-fade-in">{error}</p>}
    </div>
  );
});
FormSelect.displayName = 'FormSelect';

export const TogglePill = memo(({ label, active, onClick }: TogglePillProps) => (
  <button onClick={onClick}
    className={`px-2 py-1 rounded text-xs transition-colors ${active ? 'bg-brand text-white' : 'bg-surface-raised text-content hover:bg-surface-hover'}`}>
    {label}
  </button>
));
TogglePill.displayName = 'TogglePill';
