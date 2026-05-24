import { decisionOptions } from '@finsight-academy/shared';
import type { DecisionChoice } from '@finsight-academy/shared';

type DecisionOptionsProps = {
  selectedChoice: DecisionChoice | null;
  onSelectChoice: (choice: DecisionChoice) => void;
};

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