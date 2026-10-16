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
      {/* Official "DW" Emblem with Orange-to-Amber Gradient */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-[1.03]"
          aria-hidden="true"
        >
          <defs>
            {/* Primary Orange-to-Yellow gradient from DNAWork mark */}
            <linearGradient id="dnaWorkGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FF6500" />
              <stop offset="55%" stopColor="#F8820E" />
              <stop offset="100%" stopColor="#F5A21B" />
            </linearGradient>

            {/* Deep navy accent for depth */}
            <linearGradient id="dnaWorkDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#17194C" />
              <stop offset="100%" stopColor="#25285F" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF6500" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Rounded soft container */}
          <rect
            width="100"
            height="100"
            rx="24"
            fill="#FFFFFF"
            stroke="#F1F4F9"
            strokeWidth="2"
          />

          {/* Dynamic DW Intersecting Geometric Mark */}
          <g filter="url(#softShadow)">
            {/* Left D stem & curve */}
            <path
              d="M 24 24 H 44 C 58 24 67 34 67 50 C 67 66 58 76 44 76 H 24 Z"
              fill="url(#dnaWorkGrad)"
            />
            {/* Inner negative space of D */}
            <path
              d="M 37 37 H 44 C 50 37 54 42 54 50 C 54 58 50 63 44 63 H 37 Z"
              fill="#FFFFFF"
            />

            {/* Stylized W diagonal fold that cuts and interlocks */}
            <path
              d="M 46 44 L 56 76 H 67 L 57 44 Z"
              fill="url(#dnaWorkDark)"
              opacity="0.95"
            />
            <path
              d="M 64 44 L 74 76 H 82 L 72 44 Z"
              fill="url(#dnaWorkGrad)"
            />
            {/* Accent connector dot / bridge */}
            <circle cx="73" cy="33" r="5" fill="url(#dnaWorkGrad)" />
          </g>
        </svg>
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
