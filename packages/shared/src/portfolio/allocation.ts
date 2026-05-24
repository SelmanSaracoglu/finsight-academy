import type {
  AllocationRequest,
  AllocationResult,
  Asset,
  Holding,
  Portfolio,
} from './types';

import { roundToTwoDecimals } from './rounding';

function findAsset(assetId: string, assets: Asset[]): Asset | undefined {
  return assets.find((asset) => asset.id === assetId);
}

function calculateTotalAllocation(request: AllocationRequest): number {
  return request.items.reduce((total, item) => total + item.amount, 0);
}

export function applyAllocationDecision(
  currentPortfolio: Portfolio,
  assets: Asset[],
  request: AllocationRequest,
): AllocationResult {
  if (request.items.length === 0) {
    return {
      success: false,
      reason: 'Choose at least one asset before continuing.',
    };
  }

  const totalAllocation = calculateTotalAllocation(request);

  if (totalAllocation <= 0) {
    return {
      success: false,
      reason: 'Allocation amount must be greater than zero.',
    };
  }

  if (totalAllocation > currentPortfolio.cash) {
    return {
      success: false,
      reason: 'Allocation exceeds available cash.',
    };
  }

  const holdings: Holding[] = [];

  for (const item of request.items) {
    if (item.amount <= 0) {
      return {
        success: false,
        reason: 'Allocation amounts must be greater than zero.',
      };
    }

    const asset = findAsset(item.assetId, assets);

    if (!asset) {
      return {
        success: false,
        reason: `Unknown asset: ${item.assetId}`,
      };
    }

    holdings.push({
      assetId: item.assetId,
      quantity: roundToTwoDecimals(item.amount / asset.startingPrice),
    });
  }

  return {
    success: true,
    portfolio: {
      cash: roundToTwoDecimals(currentPortfolio.cash - totalAllocation),
      holdings,
    },
  };
}