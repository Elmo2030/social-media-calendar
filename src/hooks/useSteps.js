// src/hooks/useSteps.js — Step wizard state, fully isolated
import { useState, useCallback } from 'react';

export const useSteps = () => {
  const [step, setStep]               = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, 3)), []);
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);

  const generate = useCallback(() => {
    setShowCalendar(true);
    setStep(3);
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setShowCalendar(false);
  }, []);

  return { step, showCalendar, nextStep, prevStep, generate, reset };
};
