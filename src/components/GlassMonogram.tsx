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
          <linearGradient id="glassRimT" x1="30" y1="40" x2="250" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#7DD3FC" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
          </linearGradient>

          {/* Blueprint Guideline Gradient */}
          <linearGradient id="blueprintT" x1="0" y1="0" x2="280" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.75" />
          </linearGradient>

          {/* Frosted Glass Body Gradient */}
          <linearGradient id="glassBodyT" x1="40" y1="50" x2="240" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#0B132B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.18" />
          </linearGradient>

          {/* Inner Core Refraction */}
          <linearGradient id="glassCoreReflect" x1="140" y1="50" x2="140" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>

          {/* Ambient Glass Glow */}
          <filter id="glassAuraT" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. ARCHITECTURAL BLUEPRINT GRID (CLEAN 'T' GEOMETRY) ── */}
        {/* Horizontal Top Axis Guide */}
        <line x1="15" y1="75" x2="265" y2="75" stroke="url(#blueprintT)" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
        {/* Vertical Center Axis Guide */}
        <line x1="140" y1="25" x2="140" y2="285" stroke="url(#blueprintT)" strokeWidth="1.4" strokeDasharray="8 5" opacity="0.65" />
        
        {/* Blueprint Dimension Arcs & Grid Bounds */}
        <circle cx="140" cy="75" r="55" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="140" cy="200" r="70" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.25" />
        <line x1="40" y1="45" x2="240" y2="45" stroke="#7DD3FC" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />
        <line x1="115" y1="280" x2="165" y2="280" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

        {/* ── 2. GLASS BACK SHADOW / VOLUME OF THE 'T' ── */}
        <path 
          d="M 32 55 L 248 55 L 248 98 L 165 98 L 165 272 L 115 272 L 115 98 L 32 98 Z" 
          fill="rgba(11, 19, 43, 0.45)"
          filter="url(#glassAuraT)"
        />

        {/* ── 3. MAIN 3D TRANSLUCENT GLASS 'T' BODY ── */}
        <path 
          d="M 32 55 L 248 55 L 248 98 L 165 98 L 165 272 L 115 272 L 115 98 L 32 98 Z" 
          fill="url(#glassBodyT)" 
          stroke="url(#glassRimT)" 
          strokeWidth="2.4" 
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── 4. 3D BEVELS, INTERNAL FACETS & WIREFRAME RIBS ── */}
        {/* Inner Bevel Inset for the 'T' */}
        <path 
          d="M 44 67 L 236 67 L 236 86 L 153 86 L 153 260 L 127 260 L 127 86 L 44 86 Z" 
          stroke="#7DD3FC" 
          strokeWidth="1.2" 
          strokeDasharray="5 3"
          opacity="0.75"
        />

        {/* 3D Diagonal Bevel Chamfer Ribs */}
        <line x1="32" y1="55" x2="44" y2="67" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />
        <line x1="248" y1="55" x2="236" y2="67" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />
        <line x1="248" y1="98" x2="236" y2="86" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />
        <line x1="165" y1="98" x2="153" y2="86" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />
        <line x1="165" y1="272" x2="153" y2="260" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />
        <line x1="115" y1="272" x2="127" y2="260" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />
        <line x1="115" y1="98" x2="127" y2="86" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />
        <line x1="32" y1="98" x2="44" y2="86" stroke="url(#glassRimT)" strokeWidth="1.6" opacity="0.8" />

        {/* Vertical Core Reflection Stripe */}
        <rect 
          x="134" 
          y="60" 
          width="12" 
          height="205" 
          fill="url(#glassCoreReflect)" 
          opacity="0.5" 
          rx="3"
        />

        {/* ── 5. SPECULAR HIGHLIGHTS & BRIGHT GLASS GLINTS ── */}
        {/* Top Edge Intense White Reflection */}
        <line 
          x1="34" 
          y1="55" 
          x2="246" 
          y2="55" 
          stroke="#FFFFFF" 
          strokeWidth="3.2" 
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #FFFFFF)"
        />

        {/* Left Vertical Edge Highlight */}
        <line 
          x1="115" 
          y1="100" 
          x2="115" 
          y2="270" 
          stroke="#FFFFFF" 
          strokeWidth="2.2" 
          strokeLinecap="round"
          opacity="0.85"
          filter="drop-shadow(0 0 6px #7DD3FC)"
        />

        {/* Crossbar Left Edge Highlight */}
        <line 
          x1="32" 
          y1="56" 
          x2="32" 
          y2="96" 
          stroke="#FFFFFF" 
          strokeWidth="2.4" 
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* ── 6. DIAMOND STAR GLINTS ON KEY VERTICES ── */}
        {/* Top-Right Vertex Star */}
        <polygon 
          points="248,55 253,59 258,55 253,51" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 8px #FFFFFF)" 
        />
        {/* Top-Left Vertex Star */}
        <polygon 
          points="32,55 36,58 40,55 36,52" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 7px #7DD3FC)" 
        />
        {/* Center Intersection Star */}
        <polygon 
          points="140,55 143,58 146,55 143,52" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 8px #FFFFFF)" 
        />
        {/* Bottom-Center Base Star */}
        <polygon 
          points="140,272 143,275 146,272 143,269" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 6px #38BDF8)" 
        />
      </svg>
    </div>
  );
};

export default GlassMonogram;
