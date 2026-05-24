import { roundToTwoDecimals } from './rounding';

import type {
  Asset,
  Holding,
  HoldingResult,
  Portfolio,
  PortfolioResult,
} from './types';

function findAsset(assetId: string, assets: Asset[]): Asset | undefined {
  return assets.find((asset) => asset.id === assetId);
}

function calculateChangePercent(startingValue: number, finalValue: number): number {
  if (startingValue === 0) {
    return 0;
  }

  return roundToTwoDecimals(((finalValue - startingValue) / startingValue) * 100);
}

function calculateHoldingResult(
  holding: Holding,
  startingAssets: Asset[],
  finalAssets: Asset[],
): HoldingResult {
  const startingAsset = findAsset(holding.assetId, startingAssets);
  const finalAsset = findAsset(holding.assetId, finalAssets);

  if (!startingAsset || !finalAsset) {
    return {
      assetId: holding.assetId,
      quantity: holding.quantity,
      startingValue: 0,
      finalValue: 0,
      change: 0,
      changePercent: 0,
    };
  }

  const startingValue = roundToTwoDecimals(
    holding.quantity * startingAsset.startingPrice,
  );

  const finalValue = roundToTwoDecimals(
    holding.quantity * finalAsset.currentPrice,
  );

  return {
    assetId: holding.assetId,
    quantity: holding.quantity,
    startingValue,
    finalValue,
    change: roundToTwoDecimals(finalValue - startingValue),
    changePercent: calculateChangePercent(startingValue, finalValue),
  };
}

export function calculatePortfolioResult(
  portfolio: Portfolio,
  startingAssets: Asset[],
  finalAssets: Asset[],
): PortfolioResult {
  const holdingResults = portfolio.holdings.map((holding) =>
    calculateHoldingResult(holding, startingAssets, finalAssets),
  );

  const startingHoldingsValue = holdingResults.reduce((total, holding) => {
    return total + holding.startingValue;
  }, 0);

  const finalHoldingsValue = holdingResults.reduce((total, holding) => {
    return total + holding.finalValue;
  }, 0);

  const startingValue = roundToTwoDecimals(portfolio.cash + startingHoldingsValue);
  const finalValue = roundToTwoDecimals(portfolio.cash + finalHoldingsValue);

  return {
    startingValue,
    finalValue,
    change: roundToTwoDecimals(finalValue - startingValue),
    changePercent: calculateChangePercent(startingValue, finalValue),
    cash: portfolio.cash,
    holdingResults,
  };
}