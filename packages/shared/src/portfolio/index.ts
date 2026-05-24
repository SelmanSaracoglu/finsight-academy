export type {
  AllocationItem,
  AllocationRequest,
  AllocationResult,
  Asset,
  AssetImpact,
  CoachingFeedback,
  Holding,
  HoldingResult,
  MarketEvent,
  Portfolio,
  PortfolioResult,
  RiskLevel,
} from './types';

export { starterAssets } from './assets';

export { applyAllocationDecision } from './allocation';

export { applyMarketEvent } from './applyMarketEvent';
export { starterMarketEvent } from './marketEvents';

export {
  calculateHoldingValue,
  calculateHoldingsValue,
  calculatePortfolioValue,
} from './calculations';

export { createStarterPortfolio } from './createStarterPortfolio';
export { calculatePortfolioResult } from './calculatePortfolioResult';
export { generateCoachingFeedback } from './generateCoachingFeedback';

