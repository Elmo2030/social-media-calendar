// src/App.jsx
// LAZY-FIX: ALL 3 step-components are lazy-loaded
// PRELOAD: next step preloads on hover of the Next button
import { lazy, Suspense, memo, useDeferredValue, useCallback } from 'react';
import { useBrand }    from './hooks/useBrand.js';
import { useCalendar } from './hooks/useCalendar.js';
import { useExport }   from './hooks/useExport.js';
import { useSteps }    from './hooks/useSteps.js';

// LAZY-FIX: all 3 steps lazy — only current step chunk is in the browser
const BrandForm        = lazy(() => import('./components/BrandForm.jsx'));
const PlatformSelector = lazy(() => import('./components/PlatformSelector.jsx'));
const CalendarResults  = lazy(() => import('./components/CalendarResults.jsx'));

// Preload helpers — called on hover to make transitions instant
const preloadStep2 = () => import('./components/PlatformSelector.jsx');
const preloadStep3 = () => import('./components/CalendarResults.jsx');

const StepIndicator = memo(({ step }) => (
  <div className="flex justify-center mb-6">
    <div className="flex items-center gap-2">
      {['Brand Info', 'Platforms', 'Calendar'].map((label, idx) => {
        const n = idx + 1;
        return (
          <span key={n} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= n ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'
            }`}>{n}</div>
            {n < 3 && <div className={`w-12 h-1 rounded transition-colors ${step > n ? 'bg-purple-500' : 'bg-slate-700'}`} />}
          </span>
        );
      })}
    </div>
  </div>
));
StepIndicator.displayName = 'StepIndicator';

// Shared skeleton for all step transitions
const StepSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-8  bg-slate-700/50 rounded-xl w-1/3"/>
    <div className="h-12 bg-slate-800/80 rounded-xl"/>
    <div className="h-12 bg-slate-800/80 rounded-xl"/>
    <div className="h-12 bg-slate-800/80 rounded-xl"/>
    <div className="h-10 bg-slate-700/40 rounded-xl w-1/4 ml-auto"/>
  </div>
);

export default function App() {
  const { brand, updateBrand, toggleGoal, togglePlatform, resetBrand } = useBrand();
  const { step, showCalendar, nextStep, prevStep, generate, reset }    = useSteps();
  const deferredBrand                                                  = useDeferredValue(brand);
  const { platformCalendars }   = useCalendar(deferredBrand, showCalendar);
  const { copied, building, handleDownload, handleCopy } = useExport(deferredBrand, platformCalendars, showCalendar);

  const handleReset = useCallback(() => { reset(); resetBrand(); }, [reset, resetBrand]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Social Media Content Calendar</h1>
          <p className="text-purple-200 text-sm">v2.2 — Lazy Loading Complete</p>
        </div>
        <StepIndicator step={step} />

        <Suspense fallback={<StepSkeleton />}>
          {step === 1 && (
            <BrandForm
              brand={brand}
              updateBrand={updateBrand}
              toggleGoal={toggleGoal}
              onNext={nextStep}
              onNextHover={preloadStep2}  {/* PRELOAD on hover */}
            />
          )}
          {step === 2 && (
            <PlatformSelector
              selected={brand.platforms}
              onToggle={togglePlatform}
              onBack={prevStep}
              onGenerate={generate}
              onGenerateHover={preloadStep3}  {/* PRELOAD on hover */}
            />
          )}
          {step === 3 && showCalendar && (
            <CalendarResults
              brand={deferredBrand}
              platformCalendars={platformCalendars}
              copied={copied}
              building={building}
              onDownload={handleDownload}
              onCopy={handleCopy}
              onReset={handleReset}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
