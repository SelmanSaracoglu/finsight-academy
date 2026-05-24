export type DecisionChoice = 'buy-small' | 'hold-cash' | 'wait';

export type DecisionOption = {
  id: DecisionChoice;
  label: string;
  description: string;
};

export const decisionOptions: DecisionOption[] = [
  {
    id: 'buy-small',
    label: 'Buy a small position',
    description:
      'You see potential, but you keep the position modest because the outcome is uncertain.',
  },
  {
    id: 'hold-cash',
    label: 'Hold cash',
    description:
      'You choose patience and preserve flexibility instead of reacting immediately.',
  },
  {
    id: 'wait',
    label: 'Wait for more clarity',
    description:
      'You want more evidence before making a commitment, even if that means missing an early move.',
  },
];

export function getDecisionReflection(choice: DecisionChoice | null): string {
  if (choice === 'buy-small') {
    return 'You leaned toward opportunity, but kept the position modest. This suggests you were willing to act under uncertainty while still managing exposure.';
  }

  if (choice === 'hold-cash') {
    return 'You prioritized flexibility. Holding cash can be a calm decision when the situation feels uncertain or expectations may already be priced in.';
  }

  if (choice === 'wait') {
    return 'You preferred more evidence before acting. Waiting can reduce impulsive decisions, though it may also mean missing an early move.';
  }

  return 'Choose a response in the Decision scene to see a reflection on your reasoning.';
}

export function getMarketReaction(choice: DecisionChoice | null): string {
  if (choice === 'buy-small') {
    return 'The fictional market moved slightly against Aurora Gridworks after cautious analyst commentary. Your small position limited the impact, showing why position size matters when uncertainty is high.';
  }

  if (choice === 'hold-cash') {
    return 'The fictional market moved unevenly. Aurora Gridworks dipped at first, then stabilized. Holding cash gave you flexibility, but also meant observing rather than participating.';
  }

  if (choice === 'wait') {
    return 'More information arrived later in the session, but the market had already adjusted. Waiting reduced impulsive action, while also showing the trade-off between patience and timing.';
  }

  return 'Choose a response in the Decision scene to see how the fictional market reacted.';
}

export function getLessonSummary(choice: DecisionChoice | null): string {
  if (choice === 'buy-small') {
    return 'You practiced acting with caution: taking a small position while recognizing that uncertainty was still present.';
  }

  if (choice === 'hold-cash') {
    return 'You practiced patience and flexibility: choosing not to act immediately can be a valid decision when conviction is limited.';
  }

  if (choice === 'wait') {
    return 'You practiced evidence-seeking: waiting for more clarity can reduce emotional decisions, while still carrying opportunity cost.';
  }

  return 'Complete the Decision scene to see your personalized lesson summary.';
}