import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'image' | 'vector' | 'crest';
  alt?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  variant = 'crest',
  alt = 'Plain Layers Logo',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  // If variant is image or fallback needed
  if (variant === 'image' && !imageError) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-slate-950 border border-amber-950/40 shadow-xs shrink-0 ${sizeClasses[size]} ${className}`}>
        <img
          src="/assets/plain_layers_logo.jpg"
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Precision vector crest matching the user's uploaded logo
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden bg-slate-950 border border-orange-500/30 shadow-sm shrink-0 transition-transform duration-200 group-hover:scale-105 ${sizeClasses[size]} ${className}`}
      title="Plain Layers"
    >
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[88%] h-[88%] drop-shadow-md"
        aria-hidden="true"
      >
        <defs>
          {/* Metallic Orange Gradients matching user's logo */}
          <linearGradient id="plOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          <linearGradient id="plOrangeLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <linearGradient id="plDarkBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <filter id="plGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ea580c" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Shield Background */}
        <path
          d="M80 168 C115 145 136 112 136 70 L136 34 L80 20 L24 34 L24 70 C24 112 45 145 80 168 Z"
          fill="url(#plDarkBack)"
          stroke="url(#plOrangeGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Left Wing Flourish */}
        <path
          d="M24 55 C10 45 4 60 2 64 C8 78 18 86 30 92 C26 80 24 67 24 55 Z"
          fill="url(#plOrangeGrad)"
        />
        <path
          d="M26 80 C12 90 8 102 6 108 C16 118 24 122 36 126 C30 114 28 97 26 80 Z"
          fill="url(#plOrangeLight)"
          opacity="0.9"
        />

        {/* Right Wing Flourish */}
        <path
          d="M136 55 C150 45 156 60 158 64 C152 78 142 86 130 92 C134 80 136 67 136 55 Z"
          fill="url(#plOrangeGrad)"
        />
        <path
          d="M134 80 C148 90 152 102 154 108 C144 118 136 122 124 126 C130 114 132 97 134 80 Z"
          fill="url(#plOrangeLight)"
          opacity="0.9"
        />

        {/* Top Extruder Pointer / Arrow */}
        <path
          d="M80 32 L94 48 L80 44 L66 48 Z"
          fill="url(#plOrangeLight)"
        />

        {/* Top Horizontal Accent Notches */}
        <rect x="42" y="47" width="16" height="3.5" rx="1.75" fill="url(#plOrangeGrad)" />
        <rect x="102" y="47" width="16" height="3.5" rx="1.75" fill="url(#plOrangeGrad)" />

        {/* Camera Body in Center */}
        <rect
          x="58"
          y="58"
          width="44"
          height="30"
          rx="4"
          fill="url(#plOrangeGrad)"
          filter="url(#plGlow)"
        />
        {/* Top Camera Flash/Prism bump */}
        <path d="M72 58 L75 52 L85 52 L88 58 Z" fill="url(#plOrangeLight)" />

        {/* Camera Aperture Lens Ring */}
        <circle cx="80" cy="73" r="11" fill="#09090b" stroke="url(#plOrangeLight)" strokeWidth="2.5" />
        <circle cx="80" cy="73" r="7" fill="#18181b" />
        {/* Aperture Iris Blades */}
        <path d="M76 68 L84 70 L80 77 Z" fill="#ea580c" opacity="0.8" />
        <path d="M84 70 L84 77 L78 76 Z" fill="#fb923c" opacity="0.8" />
        <circle cx="80" cy="73" r="2.5" fill="#ffffff" />

        {/* 3D Extruder Nozzle Base & Tip pointing down */}
        <rect x="74" y="88" width="12" height="6" fill="url(#plOrangeLight)" />
        <polygon points="73,94 87,94 80,103" fill="url(#plOrangeGrad)" />
        <circle cx="80" cy="103" r="1.5" fill="#ffffff" />

        {/* 3D Printed Layers Stack (Chevron/Isometric stacked plates) */}
        {/* Layer 1 (Top) */}
        <path
          d="M80 110 L108 120 L80 128 L52 120 Z"
          fill="url(#plOrangeLight)"
          stroke="#09090b"
          strokeWidth="1.5"
        />
        {/* Layer 2 (Middle) */}
        <path
          d="M80 124 L108 134 L80 142 L52 134 Z"
          fill="url(#plOrangeGrad)"
          stroke="#09090b"
          strokeWidth="1.5"
        />
        {/* Layer 3 (Bottom) */}
        <path
          d="M80 138 L108 148 L80 156 L52 148 Z"
          fill="#c2410c"
          stroke="#09090b"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
