import React, { useState, useEffect } from 'react';

export const GlassMonogram: React.FC<{ className?: string }> = ({ className }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`glass-monogram-container ${className || ''}`}
      style={{
        transform: `perspective(900px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg) translateZ(25px)`,
        transition: 'transform 0.12s ease-out'
      }}
    >
      <svg 
        viewBox="0 0 280 290" 
        className="glass-monogram-svg" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Glass Rim Gradient */}
          <linearGradient id="glassRimSymbol" x1="40" y1="45" x2="240" y2="245" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#7DD3FC" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
          </linearGradient>

          {/* Blueprint Guideline Gradient */}
          <linearGradient id="blueprintSymbol" x1="0" y1="0" x2="280" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.75" />
          </linearGradient>

          {/* Frosted Glass Body Gradient */}
          <linearGradient id="glassBodySymbol" x1="50" y1="55" x2="230" y2="235" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.14" />
            <stop offset="70%" stopColor="#0B132B" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
          </linearGradient>

          {/* Core Radial Refraction Glow */}
          <radialGradient id="glassCoreSymbol" cx="140" cy="145" r="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
          </radialGradient>

          {/* Ambient Glass Glow Filter */}
          <filter id="glassAuraSymbol" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. ARCHITECTURAL BLUEPRINT GRID & AXIS GUIDES ── */}
        {/* Horizontal & Vertical Main Axes */}
        <line x1="20" y1="145" x2="260" y2="145" stroke="url(#blueprintSymbol)" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
        <line x1="140" y1="25" x2="140" y2="265" stroke="url(#blueprintSymbol)" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />

        {/* Diagonal 45° Guidelines */}
        <line x1="45" y1="50" x2="235" y2="240" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.25" />
        <line x1="45" y1="240" x2="235" y2="50" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.25" />

        {/* Concentric Blueprint Circles */}
        <circle cx="140" cy="145" r="90" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.25" />
        <circle cx="140" cy="145" r="45" stroke="#7DD3FC" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.35" />
        
        {/* Lobe Geometric Reference Circles */}
        <circle cx="140" cy="100" r="45" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.2" />
        <circle cx="185" cy="145" r="45" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.2" />
        <circle cx="140" cy="190" r="45" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.2" />
        <circle cx="95" cy="145" r="45" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.2" />

        {/* Blueprint Dimension Ticks */}
        <line x1="135" y1="55" x2="145" y2="55" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.6" />
        <line x1="135" y1="235" x2="145" y2="235" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.6" />
        <line x1="50" y1="140" x2="50" y2="150" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.6" />
        <line x1="230" y1="140" x2="230" y2="150" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.6" />

        {/* ── 2. GLASS BACK SHADOW / VOLUME OF THE SYMBOL ── */}
        <path 
          d="M 95 100 A 45 45 0 0 1 185 100 A 45 45 0 0 1 185 190 A 45 45 0 0 1 95 190 A 45 45 0 0 1 95 100 Z M 140 100 A 45 45 0 0 0 185 145 A 45 45 0 0 0 140 190 A 45 45 0 0 0 95 145 A 45 45 0 0 0 140 100 Z" 
          fill="rgba(11, 19, 43, 0.45)"
          fillRule="evenodd"
          filter="url(#glassAuraSymbol)"
        />

        {/* ── 3. MAIN 3D TRANSLUCENT GLASS SYMBOL BODY (EVENODD COMPOUND PATH) ── */}
        <path 
          d="M 95 100 A 45 45 0 0 1 185 100 A 45 45 0 0 1 185 190 A 45 45 0 0 1 95 190 A 45 45 0 0 1 95 100 Z M 140 100 A 45 45 0 0 0 185 145 A 45 45 0 0 0 140 190 A 45 45 0 0 0 95 145 A 45 45 0 0 0 140 100 Z" 
          fill="url(#glassBodySymbol)" 
          stroke="url(#glassRimSymbol)" 
          strokeWidth="2.4" 
          strokeLinejoin="round"
          strokeLinecap="round"
          fillRule="evenodd"
        />

        {/* Core Radial Refraction Light */}
        <circle 
          cx="140" 
          cy="145" 
          r="48" 
          fill="url(#glassCoreSymbol)" 
          pointerEvents="none"
        />

        {/* ── 4. 3D BEVELS, INTERNAL FACETS & INSET WIREFRAME RIBS ── */}
        {/* Outer Inset Outline */}
        <path 
          d="M 105 110 A 35 35 0 0 1 175 110 A 35 35 0 0 1 175 180 A 35 35 0 0 1 105 180 A 35 35 0 0 1 105 110 Z" 
          stroke="#7DD3FC" 
          strokeWidth="1.2" 
          strokeDasharray="5 3"
          opacity="0.75"
        />

        {/* Inner Star Inset Outline */}
        <path 
          d="M 140 108 A 37 37 0 0 0 177 145 A 37 37 0 0 0 140 182 A 37 37 0 0 0 103 145 A 37 37 0 0 0 140 108 Z" 
          stroke="#7DD3FC" 
          strokeWidth="1.2" 
          strokeDasharray="5 3"
          opacity="0.75"
        />

        {/* 3D Diagonal Bevel Chamfer Ribs: Outer Corners */}
        <line x1="95" y1="100" x2="105" y2="110" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />
        <line x1="185" y1="100" x2="175" y2="110" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />
        <line x1="185" y1="190" x2="175" y2="180" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />
        <line x1="95" y1="190" x2="105" y2="180" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />

        {/* 3D Chamfer Ribs: Outer Apexes */}
        <line x1="140" y1="55" x2="140" y2="65" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />
        <line x1="230" y1="145" x2="220" y2="145" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />
        <line x1="140" y1="235" x2="140" y2="225" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />
        <line x1="50" y1="145" x2="60" y2="145" stroke="url(#glassRimSymbol)" strokeWidth="1.6" opacity="0.8" />

        {/* 3D Chamfer Ribs: Inner Star Tips */}
        <line x1="140" y1="100" x2="140" y2="108" stroke="url(#glassRimSymbol)" strokeWidth="1.4" opacity="0.8" />
        <line x1="185" y1="145" x2="177" y2="145" stroke="url(#glassRimSymbol)" strokeWidth="1.4" opacity="0.8" />
        <line x1="140" y1="190" x2="140" y2="182" stroke="url(#glassRimSymbol)" strokeWidth="1.4" opacity="0.8" />
        <line x1="95" y1="145" x2="103" y2="145" stroke="url(#glassRimSymbol)" strokeWidth="1.4" opacity="0.8" />

        {/* ── 5. SPECULAR HIGHLIGHTS & BRIGHT GLASS GLINTS ── */}
        {/* Top Lobe Intense Curved Specular Arc */}
        <path 
          d="M 100 88 A 45 45 0 0 1 180 88" 
          stroke="#FFFFFF" 
          strokeWidth="3.2" 
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #FFFFFF)"
        />

        {/* Left Lobe Specular Highlight Arc */}
        <path 
          d="M 60 135 A 45 45 0 0 1 85 105" 
          stroke="#FFFFFF" 
          strokeWidth="2.4" 
          strokeLinecap="round"
          opacity="0.9"
          filter="drop-shadow(0 0 6px #7DD3FC)"
        />

        {/* Right Lobe Subtle Specular Arc */}
        <path 
          d="M 220 135 A 45 45 0 0 0 195 105" 
          stroke="#7DD3FC" 
          strokeWidth="1.8" 
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Inner Star Specular Edge */}
        <path 
          d="M 140 100 A 45 45 0 0 0 185 145" 
          stroke="#FFFFFF" 
          strokeWidth="1.8" 
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* ── 6. DIAMOND STAR GLINTS ON KEY VERTICES & APEXES ── */}
        {/* Top Apex Star */}
        <polygon 
          points="140,55 144,59 148,55 144,51" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 8px #FFFFFF)" 
        />
        {/* Right Apex Star */}
        <polygon 
          points="230,145 234,149 238,145 234,141" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 8px #FFFFFF)" 
        />
        {/* Left Apex Star */}
        <polygon 
          points="50,145 54,149 58,145 54,141" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 7px #7DD3FC)" 
        />
        {/* Bottom Apex Star */}
        <polygon 
          points="140,235 143,238 146,235 143,232" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 6px #38BDF8)" 
        />

        {/* Inner Corner Stars */}
        <polygon 
          points="95,100 98,103 101,100 98,97" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 6px #7DD3FC)" 
        />
        <polygon 
          points="185,100 188,103 191,100 188,97" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 6px #7DD3FC)" 
        />
        <polygon 
          points="140,145 143,148 146,145 143,142" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 8px #FFFFFF)" 
        />
      </svg>
    </div>
  );
};

export default GlassMonogram;
