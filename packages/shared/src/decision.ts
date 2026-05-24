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

