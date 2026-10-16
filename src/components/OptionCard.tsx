import React from 'react';
import { Option, OptionId } from '../types.ts';
import { Check } from 'lucide-react';

interface OptionCardProps {
  option: Option;
  index: number;
  isSelected: boolean;
  onSelect: (optionId: OptionId) => void;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  index,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onSelect(option.id);
    }
  };

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onSelect(option.id)}
      onKeyDown={handleKeyDown}
      className={`group relative flex items-start gap-3.5 sm:gap-4 p-4 sm:p-4.5 rounded-xl transition-all duration-200 cursor-pointer select-none outline-none border focus-visible:ring-2 focus-visible:ring-[#FF6500] focus-visible:ring-offset-2 ${
        isSelected
          ? 'bg-[#FFF9F5] border-[#FF6500] shadow-xs'
          : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#FAFBFD] shadow-2xs'
      } ${disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'active:scale-[0.995]'}`}
    >
      {/* Option Identifier Badge (A, B, C, D) & Selection Circle */}
      <div className="flex items-center gap-2.5 pt-0.5 shrink-0">
        {/* Letter pill */}
        <span
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors duration-200 ${
            isSelected
              ? 'bg-[#FF6500] text-white'
              : 'bg-[#F1F4F9] text-[#25285F] group-hover:bg-[#E4E9F2]'
          }`}
        >
          {option.id}
        </span>

        {/* Circular indicator showing selection */}
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? 'border-[#FF6500] bg-[#FF6500]'
              : 'border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]'
          }`}
          aria-hidden="true"
        >
          {isSelected && (
            <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
          )}
        </div>
      </div>

      {/* Alternative text content */}
      <div className="flex-1 text-sm sm:text-base leading-relaxed text-[#1E2433] font-normal pt-0.5">
        <span className={isSelected ? 'font-medium text-[#17194C]' : 'text-[#2D3748]'}>
          {option.text}
        </span>
      </div>
    </div>
  );
};
