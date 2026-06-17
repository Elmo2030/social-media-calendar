// src/App.tsx — v3.0: TypeScript + Accessibility + Error Boundary
import { lazy, Suspense, memo, useDeferredValue, useCallback } from 'react';
import { useBrand }    from './hooks/useBrand.js';
import { useCalendar } from './hooks/useCalendar.js';
import { useExport }   from './hooks/useExport.js';
import { useSteps }    from './hooks/useSteps.js';
import { useT, useLang, setLang } from './i18n.js';

const BrandForm        = lazy(() => import('./components/BrandForm.js'));
const PlatformSelector = lazy(() => import('./components/PlatformSelector.js'));
const CalendarResults  = lazy(() => import('./components/CalendarResults.js'));

const preloadStep2 = (): Promise<unknown> => import('./components/PlatformSelector.js');
const preloadStep3 = (): Promise<unknown> => import('./components/CalendarResults.js');

interface StepIndicatorProps { step: number; isPending: boolean; }
const StepIndicator = memo(({ step, isPending }: StepIndicatorProps) => {
  const t = useT();
  return (
    <div className="flex justify-center mb-8 relative">
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <span key={n} className="flex items-center gap-2">
            <div className={[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
              step >= n ? 'bg-brand text-white' : 'bg-surface-raised text-content',
              step === n && isPending ? 'animate-pulse ring-2 ring-brand-light ring-offset-2 ring-offset-surface-base' : '',
            ].join(' ')}
            aria-current={step === n ? 'step' : undefined}>{n}</div>
            {n < 3 && <div className={`w-12 h-1 rounded transition-colors ${step > n ? 'bg-brand' : 'bg-surface-raised'}`}/>}
          </span>
        ))}
      </div>
      {isPending && (
        <p className="absolute -bottom-5 text-xs text-brand-light animate-pulse" role="status" aria-live="polite">
          ● {t('Computing calendar…')}
        </p>
      )}
    </div>
  );
});
StepIndicator.displayName = 'StepIndicator';

const StepSkeleton = () => {
  const t = useT();
  return (
    <div className="space-y-3 animate-pulse" role="status" aria-label={t('Loading…')}>
      {[1,2,3,4].map(i=><div key={i} className="h-12 bg-surface-card/80 rounded-xl"/>)}
      <div className="h-10 bg-surface-raised/40 rounded-xl w-1/4 ms-auto"/>
    </div>
  );
};

export default function App() {
  const t = useT();
  const lang = useLang();
  const { brand, updateBrand, toggleGoal, togglePlatform, resetBrand } = useBrand();
  const { step, showCalendar, isPending, nextStep, prevStep, generate, reset } = useSteps();
  const deferredBrand = useDeferredValue(brand);
  const isStale       = brand !== deferredBrand;
  const { platformCalendars, isComputing } = useCalendar(deferredBrand, showCalendar);
  const { copied, downloaded, building, error, handleDownload, handleCopy, dismissError } = useExport(deferredBrand, platformCalendars, showCalendar);
  const handleReset = useCallback(() => { reset(); resetBrand(); }, [reset, resetBrand]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-base via-brand-deep to-surface-base p-4">
      <div className="max-w-5xl mx-auto relative">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          aria-label={t('Switch language')} lang={lang === 'ar' ? 'en' : 'ar'}
          className="absolute top-0 end-0 z-10 text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-card/80 text-content border border-surface-hover hover:bg-surface-raised transition-colors backdrop-blur">
          {t('العربية')}
        </button>
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{t('Social Media Content Calendar')}</h1>
          <p className="text-brand-softer text-sm font-medium">v3.0 — TypeScript + Accessibility</p>
        </header>
        <nav aria-label={t('Progress steps')}><StepIndicator step={step} isPending={isPending || isComputing}/></nav>
        <main className="mt-8">
          <Suspense fallback={<StepSkeleton/>}>
            {step === 1 && <BrandForm brand={brand} updateBrand={updateBrand} toggleGoal={toggleGoal} onNext={nextStep} onNextHover={preloadStep2}/>}
            {step === 2 && <PlatformSelector selected={brand.platforms} onToggle={togglePlatform} onBack={prevStep} onGenerate={generate} onGenerateHover={preloadStep3}/>}
            {step === 3 && showCalendar && (
              <div className={`transition-opacity duration-300 ${isStale||isComputing?'opacity-50':'opacity-100'}`}
                aria-busy={isStale||isComputing} aria-label={t('Calendar results')}>
                <CalendarResults brand={deferredBrand} platformCalendars={platformCalendars}
                  copied={copied} downloaded={downloaded} building={building} error={error}
                  onDownload={handleDownload} onCopy={handleCopy} onReset={handleReset} onDismissError={dismissError}/>
              </div>
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
