import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { DnaWorkLogo } from './DnaWorkLogo.tsx';

export const SuccessScreen: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto py-8 sm:py-12 px-4 sm:px-6 text-center animate-in fade-in duration-300">
      {/* Brand Logo */}
      <div className="flex justify-center mb-8">
        <DnaWorkLogo size="md" />
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 text-center">
        {/* Simple Confirmation Icon with subtle accent background */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#17194C] tracking-tight mb-3">
          Avaliação concluída!
        </h1>

        {/* Informative Text */}
        <p className="text-sm sm:text-base text-[#667085] max-w-md mx-auto leading-relaxed mb-8">
          Obrigado por participar. Suas respostas foram registradas e serão consideradas durante o processo seletivo.
        </p>

        {/* Verified Security Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F8FC] border border-[#E9ECF4] text-xs font-medium text-[#25285F] mb-6">
          <ShieldCheck className="w-4 h-4 text-[#FF6500]" />
          <span>Envio seguro confirmado</span>
        </div>

        <div className="border-t border-[#F1F4F9] pt-6">
          {/* Institutional Signature */}
          <p className="text-xs sm:text-sm font-medium text-[#17194C]">
            DNAWork • Conectando pessoas e oportunidades
          </p>
          <p className="text-[11px] text-[#94A3B8] mt-1">
            Plataforma de Seleção e Mapeamento de Talentos
          </p>
        </div>
      </div>
    </div>
  );
};
