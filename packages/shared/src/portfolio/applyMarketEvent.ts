import type { Asset, MarketEvent } from './types';
import { roundToTwoDecimals } from './rounding';

function findImpactPercent(assetId: string, event: MarketEvent): number {
  const impact = event.impacts.find((item) => item.assetId === assetId);

  if (!impact) {
    return 0;
  }

  return impact.priceChangePercent;
}

export function applyMarketEvent(
  assets: Asset[],
  event: MarketEvent,
): Asset[] {
  return assets.map((asset) => {
    const impactPercent = findImpactPercent(asset.id, event);
    const multiplier = 1 + impactPercent / 100;

    return {
      ...asset,
      currentPrice: roundToTwoDecimals(asset.currentPrice * multiplier),
    };
  });
}