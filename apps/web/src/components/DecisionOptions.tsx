type DecisionChoice = 'buy-small' | 'hold-cash' | 'wait';

type DecisionOptionsProps = {
  selectedChoice: DecisionChoice | null;
  onSelectChoice: (choice: DecisionChoice) => void;
};

const decisionOptions: {
  id: DecisionChoice;
  label: string;
  description: string;
}[] = [
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

export function DecisionOptions({
  selectedChoice,
  onSelectChoice,
}: DecisionOptionsProps) {
  return (
    <div className="decision-options">
      {decisionOptions.map((option) => {
        const isSelected = option.id === selectedChoice;

        return (
          <button
            key={option.id}
            type="button"
            className={`decision-option ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectChoice(option.id)}
          >
            <span className="decision-option-title">{option.label}</span>
            <span className="decision-option-description">
              {option.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

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

export type { DecisionChoice};
