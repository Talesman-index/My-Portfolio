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
        viewBox="0 0 280 300" 
        className="glass-monogram-svg" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Glass Rim Gradient */}
          <linearGradient id="glassRimT" x1="20" y1="20" x2="260" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#7DD3FC" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
          </linearGradient>

          {/* Secondary Soft Blueprint Gradient */}
          <linearGradient id="blueprintCyan" x1="0" y1="0" x2="280" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
          </linearGradient>

          {/* Frosted Glass Spiral Facet */}
          <linearGradient id="glassFacetSpiral" x1="40" y1="30" x2="240" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#0B132B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.14" />
          </linearGradient>

          {/* Glass T Stem Gradient */}
          <linearGradient id="glassTStem" x1="120" y1="40" x2="160" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.18" />
          </linearGradient>

          {/* Atmospheric Glow Filter */}
          <filter id="glassGlowT" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. ARCHITECTURAL BLUEPRINT GRID & GUIDE LINES ── */}
        {/* Horizontal construction guide along top crossbar of T */}
        <line x1="20" y1="72" x2="260" y2="60" stroke="#7DD3FC" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.55" />
        {/* Vertical center axis guide down stem of T */}
        <line x1="138" y1="30" x2="138" y2="280" stroke="#7DD3FC" strokeWidth="1.4" strokeDasharray="8 5" opacity="0.6" />
        
        {/* Concentric blueprint reference circles */}
        <circle cx="138" cy="155" r="95" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        <circle cx="138" cy="155" r="60" stroke="#38BDF8" strokeWidth="0.8" opacity="0.25" />

        {/* ── 2. THE MONOGRAM "T" STRUCTURE (GLASS COLUMN & TOP ARCH) ── */}
        
        {/* Vertical Stem of T (Translucent 3D Glass Bar) */}
        <rect 
          x="122" 
          y="68" 
          width="32" 
          height="195" 
          rx="6"
          fill="url(#glassTStem)" 
          stroke="url(#glassRimT)" 
          strokeWidth="1.8"
          opacity="0.85"
        />
        {/* Internal reflection line down T stem */}
        <line x1="130" y1="75" x2="130" y2="255" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />

        {/* Horizontal Top Crossbar of T (Broad sweeping glass cap) */}
        <path 
          d="M 32 64 C 70 52, 210 50, 248 66 L 244 86 C 205 74, 75 74, 36 84 Z" 
          fill="url(#glassFacetSpiral)"
          stroke="url(#glassRimT)"
          strokeWidth="1.8"
          opacity="0.9"
        />

        {/* ── 3. 3D GLASS SPIRAL / VORTEX CURVES INTERTWINED WITH THE T ── */}
        
        {/* Background depth curve */}
        <path 
          d="M 50 80 C 10 160, 60 270, 140 275 C 225 280, 265 190, 250 115 C 235 45, 120 30, 65 85 C 25 130, 45 220, 115 240 C 180 255, 225 200, 220 145 C 215 95, 160 85, 125 125 C 95 160, 110 205, 145 210 C 175 215, 195 185, 185 155" 
          stroke="rgba(15, 23, 42, 0.5)" 
          strokeWidth="14" 
          strokeLinecap="round"
          filter="url(#glassGlowT)"
        />

        {/* Main 3D Frosted Glass Ribbon Spiral Loop */}
        <path 
          d="M 52 82 C 12 162, 62 268, 140 272 C 222 278, 262 192, 248 118 C 234 48, 122 32, 68 86 C 28 132, 48 218, 116 238 C 178 252, 222 198, 218 146 C 214 98, 162 88, 128 126 C 98 162, 112 202, 146 208 C 172 212, 190 186, 182 158" 
          fill="url(#glassFacetSpiral)"
          stroke="url(#glassRimT)" 
          strokeWidth="2.4" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Blueprint Wireframe Dashed Orbital Track */}
        <path 
          d="M 248 118 C 265 185, 220 270, 138 272 C 60 274, 15 180, 52 82 C 85 30, 205 25, 246 80" 
          stroke="url(#blueprintCyan)" 
          strokeWidth="1.4" 
          strokeDasharray="5 4" 
          opacity="0.8" 
        />

        {/* ── 4. SPECULAR HIGHLIGHTS & BRIGHT GLINTS ── */}
        
        {/* Top sweeping white specular arch across T */}
        <path 
          d="M 40 68 C 95 38, 185 40, 238 60" 
          stroke="#FFFFFF" 
          strokeWidth="3.2" 
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #FFFFFF)"
        />

        {/* Bottom curve specular catch */}
        <path 
          d="M 68 238 C 110 268, 175 268, 228 230" 
          stroke="#FFFFFF" 
          strokeWidth="2.2" 
          strokeLinecap="round"
          opacity="0.85"
          filter="drop-shadow(0 0 6px #7DD3FC)"
        />

        {/* Right spiral specular contour */}
        <path 
          d="M 246 110 C 255 155, 248 200, 218 245" 
          stroke="#FFFFFF" 
          strokeWidth="2.4" 
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* ── 5. DIAMOND STAR GLINTS ── */}
        {/* Top right vertex star */}
        <polygon 
          points="238,58 243,62 248,58 243,54" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 8px #FFFFFF)" 
        />
        {/* Top left crossbar star */}
        <polygon 
          points="40,68 44,71 48,68 44,65" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 6px #7DD3FC)" 
        />
        {/* Center intersection star */}
        <polygon 
          points="138,62 141,65 144,62 141,59" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 6px #FFFFFF)" 
        />
      </svg>
    </div>
  );
};

export default GlassMonogram;
