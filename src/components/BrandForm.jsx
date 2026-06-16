// src/components/BrandForm.jsx
import { ChevronRight } from 'lucide-react';
import { FormField, FormSelect, TogglePill } from './FormField.jsx';
import { INDUSTRIES, TONES, GOAL_OPTIONS } from '../data/constants.js';

export default function BrandForm({ brand, updateBrand, toggleGoal, onNext, onNextHover }) {
  const canProceed = brand.name.trim() && brand.industry;
  return (
    <div className="bg-slate-800/80 rounded-xl p-5 backdrop-blur">
      <h2 className="text-lg font-bold text-white mb-4">🏢 Brand Information</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <FormField label="Brand Name *" value={brand.name} onChange={v => updateBrand('name', v)} placeholder="Enter brand name" />
        <FormSelect
          label="Industry *"
          value={brand.industry}
          onChange={v => updateBrand('industry', v)}
          options={[{ value: '', label: 'Select industry' }, ...INDUSTRIES]}
        />
        <FormField label="Country / Market" value={brand.country} onChange={v => updateBrand('country', v)} placeholder="e.g. Libya, Saudi Arabia" />
        <FormSelect
          label="Business Model"
          value={brand.businessModel}
          onChange={v => updateBrand('businessModel', v)}
          options={['B2C', 'B2B', 'Hybrid']}
        />
        <FormSelect
          label="Brand Tone"
          value={brand.tone}
          onChange={v => updateBrand('tone', v)}
          options={TONES}
        />
        <div>
          <label className="block text-purple-200 mb-1 text-xs">Monthly Goals</label>
          <div className="flex flex-wrap gap-1">
            {GOAL_OPTIONS.map(g => (
              <TogglePill key={g} label={g} active={brand.goals.includes(g)} onClick={() => toggleGoal(g)} />
            ))}
          </div>
        </div>
        <FormField label="Target Audience" value={brand.audience} onChange={v => updateBrand('audience', v)} placeholder="Describe target audience" colSpan="md:col-span-2" />
        <FormField label="Key Products / Services" value={brand.products} onChange={v => updateBrand('products', v)} placeholder="Main offerings" />
        <FormField label="Differentiation" value={brand.differentiation} onChange={v => updateBrand('differentiation', v)} placeholder="What makes you unique" />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onNext}
          onMouseEnter={onNextHover}   
          disabled={!canProceed}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
