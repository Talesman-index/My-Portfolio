import React from 'react';

/**
 * 4-Petal Architectural Blueprint Glass Symbol Watermark
 * Used as background ambient art behind major portfolio sections.
 */
export const SymbolWatermark: React.FC<{
  size?: number;
  className?: string;
  opacity?: number;
  rotateSpeed?: number;
  color?: 'cyan' | 'blue' | 'purple' | 'emerald';
}> = ({ 
  size = 520, 
  className = '', 
  opacity = 0.15,
  color = 'cyan'
}) => {
  const colorMap = {
    cyan: {
      glow: 'rgba(56, 189, 248, 0.4)',
      accent: '#38BDF8',
      secondary: '#7DD3FC',
      gradientStart: '#38BDF8',
      gradientEnd: '#818CF8'
    },
    blue: {
      glow: 'rgba(96, 165, 250, 0.4)',
      accent: '#60A5FA',
      secondary: '#93C5FD',
      gradientStart: '#60A5FA',
      gradientEnd: '#3B82F6'
    },
    purple: {
      glow: 'rgba(168, 85, 247, 0.4)',
      accent: '#A855F7',
      secondary: '#C084FC',
      gradientStart: '#A855F7',
      gradientEnd: '#6366F1'
    },
    emerald: {
      glow: 'rgba(52, 211, 153, 0.4)',
      accent: '#34D399',
      secondary: '#6EE7B7',
      gradientStart: '#34D399',
      gradientEnd: '#059669'
    }
  };

  const theme = colorMap[color] || colorMap.cyan;

  return (
    <div 
      className={`symbol-watermark-wrapper ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity
      }}
      aria-hidden="true"
    >
      <div className="symbol-watermark-ambient" style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }} />
      <svg 
        viewBox="0 0 280 290" 
        className="symbol-watermark-svg"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`wmGrad_${color}`} x1="0" y1="0" x2="280" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={theme.gradientStart} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.gradientEnd} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer Orbit Rings */}
        <circle cx="140" cy="145" r="130" stroke={theme.accent} strokeWidth="1" strokeDasharray="6 6" opacity="0.4" className="symbol-spin-slow" />
        <circle cx="140" cy="145" r="105" stroke={theme.secondary} strokeWidth="0.8" strokeDasharray="4 8" opacity="0.3" className="symbol-spin-rev" />

        {/* Blueprint Coordinate Axes */}
        <line x1="10" y1="145" x2="270" y2="145" stroke={`url(#wmGrad_${color})`} strokeWidth="1" strokeDasharray="8 6" opacity="0.6" />
        <line x1="140" y1="15" x2="140" y2="275" stroke={`url(#wmGrad_${color})`} strokeWidth="1" strokeDasharray="8 6" opacity="0.6" />
        <line x1="45" y1="50" x2="235" y2="240" stroke={theme.accent} strokeWidth="0.7" strokeDasharray="4 4" opacity="0.3" />
        <line x1="45" y1="240" x2="235" y2="50" stroke={theme.accent} strokeWidth="0.7" strokeDasharray="4 4" opacity="0.3" />

        {/* Geometric Lobe Guidelines */}
        <circle cx="140" cy="100" r="45" stroke={theme.accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="185" cy="145" r="45" stroke={theme.accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="140" cy="190" r="45" stroke={theme.accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="95" cy="145" r="45" stroke={theme.accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />

        {/* Main 4-Petal Geometric Compound Path */}
        <path 
          d="M 95 100 A 45 45 0 0 1 185 100 A 45 45 0 0 1 185 190 A 45 45 0 0 1 95 190 A 45 45 0 0 1 95 100 Z M 140 100 A 45 45 0 0 0 185 145 A 45 45 0 0 0 140 190 A 45 45 0 0 0 95 145 A 45 45 0 0 0 140 100 Z" 
          stroke={`url(#wmGrad_${color})`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(56, 189, 248, 0.03)"
          fillRule="evenodd"
        />

        {/* Inner Diamond Star Wireframe */}
        <path 
          d="M 140 108 A 37 37 0 0 0 177 145 A 37 37 0 0 0 140 182 A 37 37 0 0 0 103 145 A 37 37 0 0 0 140 108 Z" 
          stroke={theme.secondary} 
          strokeWidth="1" 
          strokeDasharray="4 3"
          opacity="0.6"
        />

        {/* Apex Diamond Stars */}
        <polygon points="140,55 144,59 148,55 144,51" fill={theme.secondary} />
        <polygon points="230,145 234,149 238,145 234,141" fill={theme.secondary} />
        <polygon points="140,235 144,239 148,235 144,231" fill={theme.secondary} />
        <polygon points="50,145 54,149 58,145 54,141" fill={theme.secondary} />
        <polygon points="140,145 143,148 146,145 143,142" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

/**
 * 4-Petal Micro Glyph Icon for Eyebrows, Badges, and Headers
 */
export const SymbolGlyphIcon: React.FC<{
  size?: number;
  className?: string;
  color?: 'cyan' | 'blue' | 'purple' | 'emerald';
}> = ({ 
  size = 18, 
  className = '',
  color = 'cyan'
}) => {
  const colorMap = {
    cyan: '#38BDF8',
    blue: '#60A5FA',
    purple: '#C084FC',
    emerald: '#34D399'
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 280 290" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`symbol-glyph-icon ${className}`}
      style={{ verticalAlign: 'middle', display: 'inline-block' }}
    >
      <defs>
        <linearGradient id={`glyphGrad_${color}`} x1="40" y1="45" x2="240" y2="245" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor={activeColor} />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      
      {/* 4-Petal Outer Outline */}
      <path 
        d="M 95 100 A 45 45 0 0 1 185 100 A 45 45 0 0 1 185 190 A 45 45 0 0 1 95 190 A 45 45 0 0 1 95 100 Z M 140 100 A 45 45 0 0 0 185 145 A 45 45 0 0 0 140 190 A 45 45 0 0 0 95 145 A 45 45 0 0 0 140 100 Z" 
        fill={`url(#glyphGrad_${color})`} 
        fillRule="evenodd"
      />
      
      {/* Center Diamond Specular */}
      <polygon points="140,143 145,145 140,147 135,145" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * Section Laser Gradient Divider with Center 4-Petal Glass Emblem
 */
export const SymbolLaserDivider: React.FC<{
  color?: 'cyan' | 'blue' | 'purple' | 'emerald';
  className?: string;
}> = ({
  color = 'cyan',
  className = ''
}) => {
  return (
    <div className={`symbol-laser-divider ${color} ${className}`} aria-hidden="true">
      <div className="symbol-laser-line line-left" />
      <div className="symbol-laser-center">
        <div className="symbol-laser-glow" />
        <SymbolGlyphIcon size={22} color={color} className="symbol-laser-icon" />
      </div>
      <div className="symbol-laser-line line-right" />
    </div>
  );
};
