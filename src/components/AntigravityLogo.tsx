import React, { useState } from 'react';

interface AntigravityLogoProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
  style?: React.CSSProperties;
}

export const AntigravityLogo: React.FC<AntigravityLogoProps> = ({
  size = 48,
  className = '',
  glow = true,
  interactive = true,
  style = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`antigravity-logo-wrap ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered && interactive ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
        ...style
      }}
    >
      {/* Signature Multi-Chromatic Glow Aura */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            background: 'radial-gradient(ellipse at 40% 30%, rgba(132, 204, 22, 0.35) 0%, rgba(249, 115, 22, 0.35) 45%, rgba(59, 130, 246, 0.35) 80%, transparent 100%)',
            filter: isHovered ? 'blur(16px)' : 'blur(12px)',
            opacity: isHovered ? 0.95 : 0.65,
            transition: 'opacity 0.4s ease, filter 0.4s ease',
            pointerEvents: 'none',
            borderRadius: '50%',
            zIndex: 0
          }}
        />
      )}

      <svg
        viewBox="0 0 200 170"
        width={size}
        height={typeof size === 'number' ? (size * 170) / 200 : size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
          filter: isHovered
            ? 'drop-shadow(0 0 14px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))'
            : 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.35))'
        }}
      >
        <defs>
          {/* Main Chromatic Linear Gradient (Green-Yellow -> Coral Orange -> Cobalt Blue) */}
          <linearGradient id="agGradientMain" x1="40" y1="20" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7CD92C" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="48%" stopColor="#FF4D2E" />
            <stop offset="68%" stopColor="#818CF8" />
            <stop offset="90%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Top-Left Lime/Green Highlight */}
          <radialGradient id="agGreenApex" cx="38%" cy="22%" r="45%" fx="35%" fy="18%">
            <stop offset="0%" stopColor="#A3E635" stopOpacity="1" />
            <stop offset="45%" stopColor="#84CC16" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#22C55E" stopOpacity="0" />
          </radialGradient>

          {/* Top-Right Coral-Orange Flame Highlight */}
          <radialGradient id="agCoralApex" cx="65%" cy="20%" r="45%" fx="68%" fy="18%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
            <stop offset="50%" stopColor="#EF4444" stopOpacity="0.9" />
            <stop offset="90%" stopColor="#F43F5E" stopOpacity="0" />
          </radialGradient>

          {/* Base Azure Leg Glow */}
          <linearGradient id="agBlueLegs" x1="100" y1="90" x2="100" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#2563EB" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
          </linearGradient>

          {/* Specular Inner Rim Light */}
          <linearGradient id="agRimSpec" x1="100" y1="8" x2="100" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <filter id="agGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── HIGH FIDELITY ANTIGRAVITY ARCH PATH ── */}
        <g filter="url(#agGlowFilter)">
          {/* Base Shape with Main Chromatic Gradient */}
          <path
            d="M 28 152 
               C 18 156, 10 148, 14 138 
               C 22 118, 42 72, 70 32 
               C 82 14, 94 6, 100 6 
               C 106 6, 118 14, 130 32 
               C 158 72, 178 118, 186 138 
               C 190 148, 182 156, 172 152 
               C 160 148, 148 132, 140 114 
               C 132 96, 120 78, 100 78 
               C 80 78, 68 96, 60 114 
               C 52 132, 40 148, 28 152 Z"
            fill="url(#agGradientMain)"
          />

          {/* Lime Green Accent Overlay on Left Shoulder */}
          <path
            d="M 28 152 
               C 18 156, 10 148, 14 138 
               C 22 118, 42 72, 70 32 
               C 82 14, 94 6, 100 6 
               C 100 45, 80 78, 60 114 
               C 52 132, 40 148, 28 152 Z"
            fill="url(#agGreenApex)"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Coral / Orange Accent Overlay on Right Shoulder */}
          <path
            d="M 100 6 
               C 106 6, 118 14, 130 32 
               C 158 72, 178 118, 186 138 
               C 190 148, 182 156, 172 152 
               C 160 148, 148 132, 140 114 
               C 120 78, 100 45, 100 6 Z"
            fill="url(#agCoralApex)"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Cobalt & Azure Accent on Lower Base Legs */}
          <path
            d="M 28 152 
               C 18 156, 10 148, 14 138 
               C 22 118, 38 90, 50 78 
               C 65 96, 135 96, 150 78 
               C 162 90, 178 118, 186 138 
               C 190 148, 182 156, 172 152 
               C 160 148, 148 132, 140 114 
               C 132 96, 120 78, 100 78 
               C 80 78, 68 96, 60 114 
               C 52 132, 40 148, 28 152 Z"
            fill="url(#agBlueLegs)"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Soft Specular Apex Rim Light */}
          <path
            d="M 72 30 C 84 14, 94 8, 100 8 C 106 8, 116 14, 128 30"
            stroke="url(#agRimSpec)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export default AntigravityLogo;
