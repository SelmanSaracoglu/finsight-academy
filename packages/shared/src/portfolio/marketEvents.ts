import type { MarketEvent } from './types';

export const starterMarketEvent: MarketEvent = {
  id: 'supply-route-disruption',
  title: 'Supply Route Disruption',
  description:
    'A fictional transport delay affects food infrastructure while investors temporarily rotate away from consumer technology.',
  educationalConcept:
    'Market events can affect sectors differently. Diversification can reduce the impact of being wrong about one sector.',
  impacts: [
    {
      assetId: 'aurora-grain',
      priceChangePercent: 8,
    },
    {
      assetId: 'nova-circuits',
      priceChangePercent: -6,
    },
    {
      assetId: 'tidal-energy',
      priceChangePercent: 2,
    },
  ],
};