// src/components/BrandForm.tsx
import { useState, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { FormField, FormSelect, TogglePill } from './FormField.js';
import type { BrandFormProps } from '../types/index.js';
import { INDUSTRIES, TONES, GOAL_OPTIONS } from '../data/constants.js';

export default function BrandForm({ brand, updateBrand, toggleGoal, onNext, onNextHover }: BrandFormProps) {
  const [touched, setTouched] = useState<{ name?: boolean; industry?: boolean }>({});
  const touch = useCallback((k: 'name' | 'industry') => setTouched(t => ({ ...t, [k]: true })), []);

  const nameError     = !brand.name.trim() ? 'Brand name is required.'    : '';
  const industryError = !brand.industry    ? 'Please select an industry.' : '';
  const canProceed    = !nameError && !industryError;

  const handleNext = useCallback(() => {
    if (!canProceed) { setTouched({ name: true, industry: true }); return; }
    onNext();
  }, [canProceed, onNext]);

  return (
    <div className="bg-surface-card/80 rounded-xl p-5 backdrop-blur animate-fade-in-up" role="form" aria-label="Brand information">
      <h2 className="text-lg font-bold text-white mb-4">🏢 Brand Information</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <FormField label="Brand Name *" value={brand.name} onChange={v => updateBrand('name', v)} placeholder="Enter brand name"
          error={touched.name ? nameError : ''} onBlur={() => touch('name')}/>
        <FormSelect label="Industry *" value={brand.industry} onChange={v => updateBrand('industry', v)}
          error={touched.industry ? industryError : ''} onBlur={() => touch('industry')}
          options={[{ value: '', label: 'Select industry' }, ...INDUSTRIES]}/>
        <FormField label="Country / Market" value={brand.country} onChange={v => updateBrand('country', v)} placeholder="e.g. Libya, Saudi Arabia"/>
        <FormSelect label="Business Model" value={brand.businessModel} onChange={v => updateBrand('businessModel', v)} options={['B2C','B2B','Hybrid']}/>
        <FormSelect label="Brand Tone" value={brand.tone} onChange={v => updateBrand('tone', v)} options={TONES}/>
        <div>
          <label className="block text-brand-softer mb-1 text-xs">Monthly Goals</label>
          <div className="flex flex-wrap gap-1" role="group" aria-label="Monthly goals">
            {GOAL_OPTIONS.map(g=>(
              <TogglePill key={g} label={g} active={brand.goals.includes(g)} onClick={()=>toggleGoal(g)}/>
            ))}
          </div>
        </div>
        <FormField label="Target Audience" value={brand.audience} onChange={v => updateBrand('audience', v)} placeholder="Describe target audience" colSpan="md:col-span-2"/>
        <FormField label="Key Products / Services" value={brand.products} onChange={v => updateBrand('products', v)} placeholder="Main offerings"/>
        <FormField label="Differentiation" value={brand.differentiation} onChange={v => updateBrand('differentiation', v)} placeholder="What makes you unique"/>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={handleNext} onMouseEnter={onNextHover} aria-disabled={!canProceed}
          aria-label="Proceed to platform selection"
          className={`text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${canProceed ? 'bg-brand hover:bg-brand-strong' : 'bg-surface-hover'}`}>
          Next <ChevronRight size={16} aria-hidden="true"/>
        </button>
      </div>
    </div>
  );
}
