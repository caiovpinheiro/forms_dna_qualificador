import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS } from './data/questions.ts';
import { OptionId } from './types.ts';
import { submitAssessment } from './services/assessmentService.ts';
import { DnaWorkLogo } from './components/DnaWorkLogo.tsx';
import { ProgressBar } from './components/ProgressBar.tsx';
import { QuestionCard } from './components/QuestionCard.tsx';
import { SuccessScreen } from './components/SuccessScreen.tsx';
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, OptionId>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSteps = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentStep - 1];
  const selectedOptionId = answers[currentQuestion.id];
  const isLastStep = currentStep === totalSteps;
  const canProceed = Boolean(selectedOptionId);

  // Handle selecting an option
  const handleSelectOption = (optionId: OptionId) => {
    if (isSubmitting || isCompleted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
    // Clear any previous error message when candidate interacts
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  // Central submission handler
  const handleFinalSubmit = async () => {
    // Prevent duplicate submissions or submitting without final answer
    if (isSubmitting || isCompleted) return;
    if (!answers[currentQuestion.id]) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitAssessment(answers);
      // ONLY advance to completed screen upon verified HTTP 2xx
      setIsCompleted(true);
    } catch (error) {
      console.error('Falha ao processar envio final:', error);
      // Error message specified in prompt
      setErrorMessage(
        'Não foi possível enviar sua avaliação. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Advance to next question or submit if on last question
  const handleNext = () => {
    if (!canProceed || isSubmitting) return;

    if (isLastStep) {
      handleFinalSubmit();
    } else {
      setErrorMessage(null);
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      // Scroll smoothly to top of card for comfortable mobile reading
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Go back to previous question
  const handleBack = () => {
    if (currentStep <= 1 || isSubmitting) return;
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation support
  const handleGlobalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isSubmitting || isCompleted) return;

      // Allow 1, 2, 3, 4 to select options A, B, C, D
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionKeys: OptionId[] = ['A', 'B', 'C', 'D'];
        const chosen = optionKeys[parseInt(e.key, 10) - 1];
        if (chosen) {
          handleSelectOption(chosen);
        }
      }

      // Enter to advance if an alternative is selected
      if (e.key === 'Enter' && canProceed) {
        // Prevent enter on buttons from double triggering
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag !== 'button') {
          handleNext();
        }
      }
    },
    [isSubmitting, isCompleted, canProceed, currentStep, isLastStep]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  // When assessment is completed, render success screen
  if (isCompleted) {
    return (
      <main className="min-h-screen bg-[#F7F8FC] flex flex-col justify-center items-center py-8 px-4 sm:px-6">
        <SuccessScreen />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-[#E9ECF4] shadow-2xs">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <DnaWorkLogo size="sm" showTagline={true} />
          
          <div className="text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#17194C] bg-[#F1F4F9] px-2.5 py-1 rounded-md">
              Processo Seletivo
            </span>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 max-w-[760px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        {/* Main Form Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-8 md:p-9 transition-all">
          {/* Card Title & Instructions */}
          <div className="mb-6 pb-5 border-b border-[#F1F4F9]">
            <h1 className="text-xl sm:text-2xl font-bold text-[#17194C] tracking-tight mb-2">
              Avaliação de Perfil Profissional
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Queremos conhecer um pouco mais sobre a sua forma de agir no ambiente profissional.
              Não existem respostas certas ou erradas. Escolha a alternativa que mais combina com você.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 sm:mb-8">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          {/* Error Banner if submission fails */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 transition-all animate-in fade-in"
            >
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm">
                <p className="font-medium">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Current Question View */}
          <div className="transition-opacity duration-200">
            <QuestionCard
              question={currentQuestion}
              selectedOptionId={selectedOptionId}
              onSelectOption={handleSelectOption}
              disabled={isSubmitting}
            />
          </div>

          {/* Bottom Actions Bar */}
          <div className="mt-8 pt-5 border-t border-[#F1F4F9] flex items-center justify-between gap-3">
            {/* Back Button - Hidden on Step 1 as requested */}
            <div>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-[#D0D5DD] bg-white text-xs sm:text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] hover:border-[#98A2B3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17194C] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#667085]" />
                  <span>Voltar</span>
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* Forward / Finalize Button */}
            <div className="flex items-center gap-2">
              {errorMessage && isLastStep ? (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-[#FF6500] to-[#F5A21B] text-white text-xs sm:text-sm font-semibold shadow-sm hover:brightness-105 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6500] focus-visible:ring-offset-2 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'Enviando...' : 'Tentar novamente'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed || isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6500] focus-visible:ring-offset-2 select-none cursor-pointer ${
                    canProceed && !isSubmitting
                      ? 'bg-gradient-to-r from-[#FF6500] to-[#F5A21B] text-white hover:brightness-105 active:scale-[0.98]'
                      : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed shadow-none'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Enviando...</span>
                    </>
                  ) : isLastStep ? (
                    <>
                      <span>Finalizar avaliação</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Continuar</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Informative Micro-Note */}
        <div className="mt-4 text-center">
          <p className="text-[11px] sm:text-xs text-[#98A2B3]">
            Todas as perguntas são obrigatórias · Respostas tratadas com sigilo profissional
          </p>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="w-full py-4 text-center border-t border-[#E9ECF4] bg-white/60">
        <div className="max-w-[760px] mx-auto px-4 text-xs text-[#667085]">
          <p className="font-medium text-[#17194C]">
            DNAWork • Conectando pessoas e oportunidades
          </p>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">
            © {new Date().getFullYear()} DNAWork. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
