export type RiskLevel = 'low' | 'medium' | 'high';

export type Asset = {
  id: string;
  name: string;
  sector: string;
  riskLevel: RiskLevel;
  startingPrice: number;
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