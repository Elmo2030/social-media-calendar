// src/App.jsx — Main component: ONLY orchestration (~50 lines)
// All state → hooks, All UI → components
import { useBrand }    from './hooks/useBrand.js';
import { useCalendar } from './hooks/useCalendar.js';
import { useExport }   from './hooks/useExport.js';
import { useSteps }    from './hooks/useSteps.js';
import { BrandForm }          from './components/BrandForm.jsx';
import { PlatformSelector }   from './components/PlatformSelector.jsx';
import { CalendarResults }    from './components/CalendarResults.jsx';

const STEP_LABELS = ['Brand Info', 'Platforms', 'Calendar'];

const StepIndicator = ({ step }) => (
  <div className="flex justify-center mb-6">
    <div className="flex items-center gap-2">
      {STEP_LABELS.map((label, idx) => {
        const n = idx + 1;
        return (
          <span key={n} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= n ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'
            }`}>{n}</div>
            {n < STEP_LABELS.length && (
              <div className={`w-12 h-1 rounded transition-colors ${step > n ? 'bg-purple-500' : 'bg-slate-700'}`} />
            )}
          </span>
        );
      })}
    </div>
  </div>
);

export default function App() {
  const { brand, updateBrand, toggleGoal, togglePlatform, resetBrand } = useBrand();
  const { step, showCalendar, nextStep, prevStep, generate, reset }    = useSteps();
  const { platformCalendars }                                          = useCalendar(brand, showCalendar);
  const { copied, handleDownload, handleCopy }                         = useExport(brand, platformCalendars, showCalendar);

  const handleReset = () => { reset(); resetBrand(); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Social Media Content Calendar</h1>
          <p className="text-purple-200 text-sm">v2.0 — Architecture Refactored</p>
        </div>

        <StepIndicator step={step} />

        {step === 1 && (
          <BrandForm
            brand={brand}
            updateBrand={updateBrand}
            toggleGoal={toggleGoal}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <PlatformSelector
            selected={brand.platforms}
            onToggle={togglePlatform}
            onBack={prevStep}
            onGenerate={generate}
          />
        )}

        {step === 3 && showCalendar && (
          <CalendarResults
            brand={brand}
            platformCalendars={platformCalendars}
            copied={copied}
            onDownload={handleDownload}
            onCopy={handleCopy}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
