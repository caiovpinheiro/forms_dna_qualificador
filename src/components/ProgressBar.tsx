import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
        <span className="text-[#17194C] font-semibold tracking-wide">
          Pergunta {currentStep} de {totalSteps}
        </span>
        <span className="text-[#667085] tabular-nums font-medium">
          {percentage}% concluído
        </span>
      </div>

      {/* Track */}
      <div
        className="w-full h-2 bg-[#E9ECF4] rounded-full overflow-hidden p-0.5"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Progresso da avaliação: etapa ${currentStep} de ${totalSteps}`}
      >
        {/* Animated Bar with DNAWork Orange/Amber Gradient */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FF6500] to-[#F5A21B] transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
