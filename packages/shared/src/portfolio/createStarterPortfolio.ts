import type { Portfolio } from './types';

export function createStarterPortfolio(): Portfolio {
  return {
    cash: 1000,
    holdings: [],
  };
}