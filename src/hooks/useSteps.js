// src/hooks/useSteps.js
// DEFER-FIX: generate() wrapped in startTransition — step change is non-urgent
// React renders current step instantly, then computes calendar in background
import { useState, useCallback, useTransition } from 'react';

export const useSteps = () => {
  const [step, setStep]                 = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isPending, startTransition]    = useTransition();

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, 3)), []);
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);

  const generate = useCallback(() => {
    // DEFER-FIX: startTransition marks this as non-urgent
    // React keeps the UI responsive and renders the new step in the background
    startTransition(() => {
      setShowCalendar(true);
      setStep(3);
    });
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setShowCalendar(false);
  }, []);

  // isPending: true while React is still computing the transition
  return { step, showCalendar, isPending, nextStep, prevStep, generate, reset };
};
