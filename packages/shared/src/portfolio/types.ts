export type RiskLevel = 'low' | 'medium' | 'high';

export type Asset = {
  id: string;
  name: string;
  sector: string;
  riskLevel: RiskLevel;
  startingPrice: number;
  currentPrice: number;
  description: string;
};

export type Holding = {
  assetId: string;
  quantity: number;
};

export type Portfolio = {
  cash: number;
  holdings: Holding[];
};

export type AllocationItem = {
  assetId: string;
  amount: number;
};

export type AllocationRequest = {
  items: AllocationItem[];
};

export type AllocationResult =
  | {
      success: true;
      portfolio: Portfolio;
    }
  | {
      success: false;
      reason: string;
    };

export type AssetImpact = {
  assetId: string;
  priceChangePercent: number;
};

export type MarketEvent = {
  id: string;
  title: string;
  description: string;
  educationalConcept: string;
  impacts: AssetImpact[];
};

export type HoldingResult = {
  assetId: string;
  quantity: number;
  startingValue: number;
  finalValue: number;
  change: number;
  changePercent: number;
};

export type PortfolioResult = {
  startingValue: number;
  finalValue: number;
  change: number;
  changePercent: number;
  cash: number;
  holdingResults: HoldingResult[];
};

export type CoachingFeedback = {
  title: string;
  message: string;
  tags: string[];
};