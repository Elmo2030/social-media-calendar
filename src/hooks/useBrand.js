// src/hooks/useBrand.js
// PERF-2: useReducer replaces useState — O(1) updates, no full-object spread
import { useReducer, useCallback } from 'react';
import { INITIAL_BRAND } from '../data/constants.js';

const brandReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_GOAL':
      return {
        ...state,
        goals: state.goals.includes(action.goal)
          ? state.goals.filter(g => g !== action.goal)
          : [...state.goals, action.goal],
      };
    case 'TOGGLE_PLATFORM':
      return {
        ...state,
        platforms: state.platforms.includes(action.platform)
          ? state.platforms.filter(p => p !== action.platform)
          : [...state.platforms, action.platform],
      };
    case 'RESET':
      return INITIAL_BRAND;
    default:
      return state;
  }
};

export const useBrand = () => {
  const [brand, dispatch] = useReducer(brandReducer, INITIAL_BRAND);

  // Stable refs — dispatch identity never changes (React guarantee)
  const updateBrand    = useCallback((field, value) => dispatch({ type: 'UPDATE_FIELD', field, value }), []);
  const toggleGoal     = useCallback((goal)          => dispatch({ type: 'TOGGLE_GOAL', goal }),         []);
  const togglePlatform = useCallback((platform)      => dispatch({ type: 'TOGGLE_PLATFORM', platform }), []);
  const resetBrand     = useCallback(()              => dispatch({ type: 'RESET' }),                     []);

  return { brand, updateBrand, toggleGoal, togglePlatform, resetBrand };
};
