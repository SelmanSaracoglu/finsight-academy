export type SceneId = 'welcome' | 'market-briefing' | 'portfolio-snapshot';

export type SessionScene = {
  id: SceneId;
  eyebrow: string;
  title: string;
  body: string;
  notice: string;
  primaryActionLabel: string;
  nextSceneId?: SceneId;
};

export const sessionScenes: SessionScene[] = [
  {
    id: 'welcome',
    eyebrow: 'FinSight Academy',
    title: 'Learn to think through market decisions calmly.',
    body: 'Enter a fictional market session where you will review a short briefing, make one focused decision, and reflect on the reasoning behind it.',
    notice:
      'Safe learning space: All assets, prices, and market events are fictional. This is not investment advice.',
    primaryActionLabel: 'Begin Session',
    nextSceneId: 'market-briefing',
  },
  {
    id: 'market-briefing',
    eyebrow: 'Market Briefing',
    title: 'A quiet shift in the fictional energy sector.',
    body: "In today's simulated session, renewable infrastructure companies are seeing cautious interest after a fictional city announced a long-term grid modernization plan.",
    notice:
      'The market reaction is uncertain. Some investors may see opportunity, while others may worry that expectations are already too high.',
    primaryActionLabel: 'Review Starting Portfolio',
    nextSceneId: 'portfolio-snapshot',
  },
  {
    id: 'portfolio-snapshot',
    eyebrow: 'Portfolio Snapshot',
    title: 'You begin with 1,000 learning credits in virtual cash.',
    body: 'Your session starts with no holdings and a simple choice ahead. The goal is not to maximize returns, but to notice how you weigh uncertainty, opportunity, and patience.',
    notice:
        'Learning credits are fictional. They exist only to make the decision feel concrete without using real money.',
    primaryActionLabel: 'Back to Briefing',
    nextSceneId: 'market-briefing',
  },
];