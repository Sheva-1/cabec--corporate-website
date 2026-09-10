import React, { useState } from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'white' | 'symbol-only';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  useImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
  useImage = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const isWhite = variant === 'white';

  // Height sizing for the official logo image
  const imgHeightClass = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-18',
    xl: 'h-20 sm:h-24'
  }[size];

  // Symbol sizing for vector fallback
  const symbolSize = {
    sm: 36,
    md: 46,
    lg: 60,
    xl: 74
  }[size];

  // If using the official uploaded logo image directly and no load error occurred
  if (useImage && !imgError && variant !== 'symbol-only') {
    if (isWhite) {
      // For dark backgrounds (like the footer), frame the official logo in a crisp white badge
      return (
        <div className={`inline-flex items-center select-none ${className}`}>
          <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-100/90 transition-transform duration-200 hover:scale-[1.02]">
            <img
              src="/cabec-logo.jpg"
              alt="Cabinet Belkal Consulting - Conseil, Digital solution, Innovation"
              className={`${imgHeightClass} w-auto object-contain`}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/cabec-logo.jpg"
          alt="Cabinet Belkal Consulting - Conseil, Digital solution, Innovation"
          className={`${imgHeightClass} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* High-definition Vector Tree, Mountain & River Emblem faithfully replicating the official emblem */}
      <svg
        width={symbolSize}
        height={symbolSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Logo Cabinet Belkal Consulting"
      >
        <defs>
          <linearGradient id="cabecTreeGrad" x1="20" y1="10" x2="100" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7CBD48" />
            <stop offset="50%" stopColor="#4F8B50" />
            <stop offset="100%" stopColor="#2E6230" />
          </linearGradient>
          <linearGradient id="cabecRiverGrad" x1="60" y1="65" x2="55" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0066B3" />
            <stop offset="100%" stopColor="#1686C7" />
          </linearGradient>
          <linearGradient id="cabecMountainGradL" x1="15" y1="75" x2="50" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="cabecMountainGradR" x1="105" y1="75" x2="65" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Mountain Base (Rocky peaks left and right) */}
        <polygon points="10,112 38,68 62,112" fill="url(#cabecMountainGradL)" />
        <polygon points="38,68 47,84 34,112 20,112" fill="#475569" opacity="0.7" />
        
        <polygon points="56,112 84,70 110,112" fill="url(#cabecMountainGradR)" />
        <polygon points="84,70 92,88 80,112 68,112" fill="#334155" opacity="0.6" />
        
        {/* Rocky ridges and contours */}
        <path d="M38 68 L42 76 L36 82 L38 88 L32 94" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M84 70 L80 78 L86 84 L82 92" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />

        {/* Winding Blue River flowing down between the mountains */}
        <path
          d="M 58 70 
             C 53 78, 64 85, 55 95
             C 48 103, 56 109, 52 115
             L 66 115
             C 70 109, 62 102, 67 94
             C 74 85, 65 77, 62 70 Z"
          fill="url(#cabecRiverGrad)"
        />
        {/* River reflection curves */}
        <path d="M57 82 C61 86, 58 90, 62 94" stroke="#BAE6FD" strokeWidth="1.3" strokeLinecap="round" fill="none" />

        {/* Tree Trunk & Roots firmly anchored in the rocky crags */}
        <path
          d="M 60 74
             C 58 64, 57 56, 54 50
             C 52 46, 48 42, 44 39
             M 54 50 C 58 45, 62 41, 64 36
             M 60 60 C 63 54, 68 50, 74 46
             M 58 74 C 55 80, 48 88, 42 93
             M 62 74 C 66 80, 73 87, 78 92"
          stroke="#4A3528"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lush Foliage Canopy (Dense dome of vibrant green leaves) */}
        <g>
          {/* Main clusters */}
          <circle cx="60" cy="28" r="17" fill="url(#cabecTreeGrad)" />
          <circle cx="43" cy="33" r="14" fill="#4F8B50" />
          <circle cx="77" cy="33" r="14" fill="#4F8B50" />
          <circle cx="32" cy="45" r="12" fill="#3D703E" />
          <circle cx="88" cy="45" r="12" fill="#3D703E" />
          <circle cx="49" cy="45" r="13" fill="#478048" />
          <circle cx="71" cy="45" r="13" fill="#478048" />
          <circle cx="60" cy="16" r="11" fill="#7CBD48" />
          
          {/* Leaf highlights matching the official emblem */}
          <circle cx="55" cy="23" r="3.5" fill="#A7E4A7" opacity="0.8" />
          <circle cx="67" cy="25" r="3.5" fill="#A7E4A7" opacity="0.8" />
          <circle cx="41" cy="30" r="3" fill="#B8EBB8" opacity="0.8" />
          <circle cx="79" cy="30" r="3" fill="#B8EBB8" opacity="0.8" />
          <circle cx="32" cy="42" r="2.5" fill="#A7E4A7" opacity="0.7" />
          <circle cx="88" cy="42" r="2.5" fill="#A7E4A7" opacity="0.7" />
          <circle cx="60" cy="38" r="4" fill="#325E33" />
        </g>
      </svg>

      {/* Typography Lockup matching the user's official brand mark */}
      {variant !== 'symbol-only' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline">
            <span
              className={`font-['Outfit',sans-serif] font-black tracking-wider ${
                size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : 'text-base sm:text-lg'
              } ${isWhite ? 'text-white' : 'text-[#0066B3]'}`}
            >
              CABINET BELKAL
            </span>
          </div>
          <span
            className={`font-['Outfit',sans-serif] font-extrabold tracking-widest ${
              size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : size === 'xl' ? 'text-base' : 'text-xs sm:text-sm'
            } ${isWhite ? 'text-sky-300' : 'text-[#0066B3]'}`}
          >
            CONSULTING
          </span>
          {variant === 'full' && (
            <span
              className={`text-[10px] tracking-tight font-medium mt-0.5 ${
                isWhite ? 'text-slate-300' : 'text-slate-800'
              }`}
            >
              Conseil - Digital solution - Innovation
            </span>
          )}
        </div>
      )}
    </div>
  );
};
