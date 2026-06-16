// src/App.jsx
// PERF-3: React.lazy + Suspense — CalendarResults loads only when needed (Step 3)
// PERF-3: useDeferredValue — defers heavy HTML generation off the critical render path
// PERF-1: StepIndicator wrapped with memo
import { lazy, Suspense, memo, useDeferredValue } from 'react';
import { useBrand }    from './hooks/useBrand.js';
import { useCalendar } from './hooks/useCalendar.js';
import { useExport }   from './hooks/useExport.js';
import { useSteps }    from './hooks/useSteps.js';
import { BrandForm }        from './components/BrandForm.jsx';
import { PlatformSelector } from './components/PlatformSelector.jsx';

// PERF-3: lazy — only downloaded when user reaches Step 3
const CalendarResults = lazy(() => import('./components/CalendarResults.jsx'));

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

const CalendarSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-10 bg-slate-700/50 rounded-xl"/>
    <div className="h-32 bg-slate-800/80 rounded-xl"/>
    {[1,2,3].map(i => <div key={i} className="h-14 bg-slate-800/60 rounded-xl"/>)}
  </div>
);

export default function App() {
  const { brand, updateBrand, toggleGoal, togglePlatform, resetBrand } = useBrand();
  const { step, showCalendar, nextStep, prevStep, generate, reset }    = useSteps();

  // PERF-3: useDeferredValue — calendar computation doesn't block typing/interaction
  const deferredBrand    = useDeferredValue(brand);
  const { platformCalendars } = useCalendar(deferredBrand, showCalendar);
  const { copied, handleDownload, handleCopy } = useExport(deferredBrand, platformCalendars, showCalendar);

  const handleReset = () => { reset(); resetBrand(); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Social Media Content Calendar</h1>
          <p className="text-purple-200 text-sm">v2.1 — Performance Optimized</p>
        </div>

        <StepIndicator step={step} />

        {step === 1 && (
          <BrandForm brand={brand} updateBrand={updateBrand} toggleGoal={toggleGoal} onNext={nextStep} />
        )}
        {step === 2 && (
          <PlatformSelector selected={brand.platforms} onToggle={togglePlatform} onBack={prevStep} onGenerate={generate} />
        )}
        {step === 3 && showCalendar && (
          <Suspense fallback={<CalendarSkeleton />}>
            <CalendarResults
              brand={deferredBrand}
              platformCalendars={platformCalendars}
              copied={copied}
              onDownload={handleDownload}
              onCopy={handleCopy}
              onReset={handleReset}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
