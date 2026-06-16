// src/hooks/useBrand.ts
import { useReducer, useCallback } from 'react';
import type { Brand, BrandAction, PlatformName } from '../types/index.js';
import { INITIAL_BRAND } from '../data/constants.js';

const brandReducer = (state: Brand, action: BrandAction): Brand => {
  switch (action.type) {
    case 'UPDATE_FIELD':    return { ...state, [action.field]: action.value };
    case 'TOGGLE_GOAL':     return { ...state, goals:     state.goals.includes(action.goal) ? state.goals.filter(g => g !== action.goal) : [...state.goals, action.goal] };
    case 'TOGGLE_PLATFORM': return { ...state, platforms: state.platforms.includes(action.platform) ? state.platforms.filter(p => p !== action.platform) : [...state.platforms, action.platform] };
    case 'RESET':           return INITIAL_BRAND;
    default:                return state;
  }
};

interface UseBrandReturn {
  brand:          Brand;
  updateBrand:    (field: keyof Brand, value: Brand[keyof Brand]) => void;
  toggleGoal:     (goal: string) => void;
  togglePlatform: (platform: PlatformName) => void;
  resetBrand:     () => void;
}

export const useBrand = (): UseBrandReturn => {
  const [brand, dispatch] = useReducer(brandReducer, INITIAL_BRAND);
  const updateBrand    = useCallback((field: keyof Brand, value: Brand[keyof Brand]) => dispatch({ type: 'UPDATE_FIELD', field, value }), []);
  const toggleGoal     = useCallback((goal: string)            => dispatch({ type: 'TOGGLE_GOAL', goal }),         []);
  const togglePlatform = useCallback((platform: PlatformName)  => dispatch({ type: 'TOGGLE_PLATFORM', platform }), []);
  const resetBrand     = useCallback(()                        => dispatch({ type: 'RESET' }),                     []);
  return { brand, updateBrand, toggleGoal, togglePlatform, resetBrand };
};
