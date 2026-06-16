// src/hooks/useBrand.js — Manages all brand state and mutations
import { useState, useCallback } from 'react';
import { INITIAL_BRAND } from '../data/constants.js';

export const useBrand = () => {
  const [brand, setBrand] = useState(INITIAL_BRAND);

  const updateBrand = useCallback((field, value) => {
    setBrand(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleGoal = useCallback((goal) => {
    setBrand(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal],
    }));
  }, []);

  const togglePlatform = useCallback((platform) => {
    setBrand(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  }, []);

  const resetBrand = useCallback(() => {
    setBrand(INITIAL_BRAND);
  }, []);

  return { brand, updateBrand, toggleGoal, togglePlatform, resetBrand };
};
