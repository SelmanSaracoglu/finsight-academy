export type SceneId =
  | 'welcome'
  | 'market-briefing'
  | 'portfolio-snapshot'
  | 'decision'
  | 'reflection';

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
    primaryActionLabel: 'Consider Your Decision',
    nextSceneId: 'decision',
  },
  {
    id: 'decision',
    eyebrow: 'Decision Moment',
    title: 'How would you respond to the fictional energy shift?',
    body: 'Aurora Gridworks is a fictional renewable infrastructure company mentioned in today’s briefing. You are not trying to predict the future perfectly. You are practicing how to make a calm decision with incomplete information.',
    notice:
      'Choose whether to buy a small position, hold your cash, or wait for more clarity. Your reasoning matters more than the outcome.',
    primaryActionLabel: 'Continue to Reflection',
    nextSceneId: 'reflection',
  },
  {
    id: 'reflection',
    eyebrow: 'Reflection',
    title: 'Your decision reveals how you respond to uncertainty.',
    body: 'There is no perfect answer in this fictional session. The useful question is whether your choice matched your risk comfort, available information, and emotional state.',
    notice:
      'Good investing behavior is not about always being right. It is about understanding why you acted and what trade-offs you accepted.',
    primaryActionLabel: 'Back to Decision',
    nextSceneId: 'decision',
  },
];