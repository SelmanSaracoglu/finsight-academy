import type { Asset } from './types';

export const starterAssets: Asset[] = [
  {
    id: 'aurora-grain',
    name: 'Aurora Grain Co.',
    sector: 'Food Infrastructure',
    riskLevel: 'low',
    startingPrice: 50,
    description:
      'A steady fictional food logistics company with lower growth but stable demand.',
  },
  {
    id: 'nova-circuits',
    name: 'Nova Circuits',
    sector: 'Consumer Technology',
    riskLevel: 'medium',
    startingPrice: 80,
    description:
      'A fictional electronics producer that can grow quickly but reacts strongly to market news.',
  },
  {
    id: 'tidal-energy',
    name: 'Tidal Energy Works',
    sector: 'Clean Energy',
    riskLevel: 'high',
    startingPrice: 40,
    description:
      'A fictional clean energy startup with high uncertainty and high possible movement.',
  },
];