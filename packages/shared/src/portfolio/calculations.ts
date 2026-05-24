import type { Asset, Holding, Portfolio } from './types';

export function calculateHoldingValue(
  holding: Holding,
  assets: Asset[],
): number {
  const asset = assets.find((item) => item.id === holding.assetId);

  if (!asset) {
    return 0;
  }

  return holding.quantity * asset.startingPrice;
}

export function calculateHoldingsValue(
  holdings: Holding[],
  assets: Asset[],
): number {
  return holdings.reduce((total, holding) => {
    return total + calculateHoldingValue(holding, assets);
  }, 0);
}

export function calculatePortfolioValue(
  portfolio: Portfolio,
  assets: Asset[],
): number {
  return portfolio.cash + calculateHoldingsValue(portfolio.holdings, assets);
}