import type {
  Asset,
  CoachingFeedback,
  Portfolio,
  PortfolioResult,
} from './types';

function calculateCashRatio(portfolio: Portfolio, result: PortfolioResult): number {
  if (result.startingValue === 0) {
    return 0;
  }

  return portfolio.cash / result.startingValue;
}

function findLargestHoldingRatio(result: PortfolioResult): number {
  if (result.startingValue === 0) {
    return 0;
  }

  const largestHoldingValue = result.holdingResults.reduce(
    (largestValue, holding) => {
      return Math.max(largestValue, holding.startingValue);
    },
    0,
  );

  return largestHoldingValue / result.startingValue;
}

function calculateHighRiskExposure(
  result: PortfolioResult,
  assets: Asset[],
): number {
  if (result.startingValue === 0) {
    return 0;
  }

  const highRiskAssetIds = assets
    .filter((asset) => asset.riskLevel === 'high')
    .map((asset) => asset.id);

  const highRiskValue = result.holdingResults.reduce((total, holding) => {
    if (highRiskAssetIds.includes(holding.assetId)) {
      return total + holding.startingValue;
    }

    return total;
  }, 0);

  return highRiskValue / result.startingValue;
}

export function generateCoachingFeedback(
  portfolio: Portfolio,
  result: PortfolioResult,
  assets: Asset[],
): CoachingFeedback {
  const cashRatio = calculateCashRatio(portfolio, result);
  const largestHoldingRatio = findLargestHoldingRatio(result);
  const highRiskExposure = calculateHighRiskExposure(result, assets);

  if (largestHoldingRatio >= 0.7) {
    return {
      title: 'Concentration risk spotted',
      message:
        'Most of your portfolio depended on one asset. That can work in one event, but it leaves you exposed when the story changes.',
      tags: ['Concentration risk', 'Diversification'],
    };
  }

  if (highRiskExposure >= 0.5) {
    return {
      title: 'High uncertainty exposure',
      message:
        'A large part of your portfolio was placed in a high-risk asset. The outcome may be exciting, but the decision carried meaningful uncertainty.',
      tags: ['Risk awareness', 'Uncertainty'],
    };
  }

  if (cashRatio >= 0.25) {
    return {
      title: 'Flexibility preserved',
      message:
        'You kept a meaningful cash reserve. That limited your exposure and gives you room to react in a future round.',
      tags: ['Cash flexibility', 'Patience'],
    };
  }

  if (result.changePercent > 0) {
    return {
      title: 'Balanced decision rewarded',
      message:
        'Your portfolio gained value, but the stronger lesson is that your allocation avoided relying on a single outcome.',
      tags: ['Balanced allocation', 'Decision quality'],
    };
  }

  if (result.changePercent < 0) {
    return {
      title: 'Useful loss, not failure',
      message:
        'The event moved against part of your portfolio. Use this as information: what risk did you accept, and was it intentional?',
      tags: ['Reflection', 'Risk review'],
    };
  }

  return {
    title: 'Stable outcome',
    message:
      'Your portfolio ended close to where it started. Stability can be useful when uncertainty is high.',
    tags: ['Stability', 'Risk control'],
  };
}