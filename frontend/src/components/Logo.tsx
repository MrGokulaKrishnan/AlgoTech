import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", showText = true, size = "md" }) => {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-black border border-emerald-500/40 p-1.5 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-transform duration-300 hover:scale-105 hover:border-emerald-400 ${iconSizes[size]}`}>
        {/* Glow overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 blur-sm pointer-events-none" />
        
        {/* Vector SVG Nanobanana Algorithmic Mark */}
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-400 relative z-10">
          <defs>
            <linearGradient id="nanobanana-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E676" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Outer Nano Loop / Brackets */}
          <path d="M11 9L4 18L11 27" stroke="url(#nanobanana-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <path d="M25 9L32 18L25 27" stroke="url(#nanobanana-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          
          {/* Dynamic Nodes & Central Link */}
          <circle cx="18" cy="18" r="3.5" fill="#00E676" />
          <path d="M13 18H23" stroke="#34D399" strokeWidth="2.5" strokeDasharray="2 2" strokeLinecap="round" />
          <circle cx="12" cy="18" r="2" fill="#34D399" />
          <circle cx="24" cy="18" r="2" fill="#34D399" />
          
          {/* Subtle Algo Pulse dots */}
          <circle cx="18" cy="10" r="1.5" fill="#6EE7B7" opacity="0.8" />
          <circle cx="18" cy="26" r="1.5" fill="#6EE7B7" opacity="0.8" />
          <path d="M18 12.5V14.5M18 21.5V23.5" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>

      {showText && (
        <span className={`font-black tracking-tight ${textSizes[size]}`}>
          <span className="text-white">Algo</span>
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
            Visual
          </span>
        </span>
      )}
    </div>
  );
};
