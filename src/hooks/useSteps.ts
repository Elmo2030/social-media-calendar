// src/hooks/useSteps.ts
import { useState, useCallback, useTransition } from 'react';

interface UseStepsReturn {
  step:         number;
  showCalendar: boolean;
  isPending:    boolean;
  nextStep:     () => void;
  prevStep:     () => void;
  generate:     () => void;
  reset:        () => void;
}

export const useSteps = (): UseStepsReturn => {
  const [step, setStep]                   = useState<number>(1);
  const [showCalendar, setShowCalendar]   = useState<boolean>(false);
  const [isPending, startTransition]      = useTransition();

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, 3)), []);
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);

  const generate = useCallback(() => {
    startTransition(() => {
      setShowCalendar(true);
      setStep(3);
    });
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setShowCalendar(false);
  }, []);

  return { step, showCalendar, isPending, nextStep, prevStep, generate, reset };
};
