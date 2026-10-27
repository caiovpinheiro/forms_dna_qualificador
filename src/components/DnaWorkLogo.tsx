import React from 'react';

interface DnaWorkLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const DnaWorkLogo: React.FC<DnaWorkLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  // Dimensions based on size
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const brandFontSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';
  const taglineFontSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[10px]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="/android-chrome-512x512.png"
          width={iconSize}
          height={iconSize}
          alt=""
          aria-hidden="true"
          className="block"
        />
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center leading-none text-left">
        <div className={`font-bold tracking-tight text-[#17194C] ${brandFontSize} flex items-center`}>
          <span>DNA</span>
          <span className="font-semibold text-[#25285F]">Work</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF6500] ml-1 mb-1"></span>
        </div>
        {showTagline && (
          <span className={`tracking-[0.16em] uppercase font-medium text-[#667085] mt-1 ${taglineFontSize}`}>
            Recrutamento &amp; Seleção
          </span>
        )}
      </div>
    </div>
  );
};
