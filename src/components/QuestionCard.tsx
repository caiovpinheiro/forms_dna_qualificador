import React from 'react';
import { Question, OptionId } from '../types.ts';
import { OptionCard } from './OptionCard.tsx';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: OptionId;
  onSelectOption: (optionId: OptionId) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      {/* Question Header */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#17194C] leading-snug tracking-tight">
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div
        role="radiogroup"
        aria-label={question.question}
        className="space-y-3 sm:space-y-3.5"
      >
        {question.options.map((option, idx) => (
          <OptionCard
            key={option.id}
            option={option}
            index={idx}
            isSelected={selectedOptionId === option.id}
            onSelect={onSelectOption}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
