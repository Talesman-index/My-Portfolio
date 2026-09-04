import React, { useState, useEffect } from 'react';

export const GlassMonogram: React.FC<{ className?: string }> = ({ className }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`glass-monogram-container ${className || ''}`}
      style={{
        transform: `perspective(800px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg) translateZ(20px)`,
        transition: 'transform 0.15s ease-out'
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
          <linearGradient id="glassRim" x1="20" y1="20" x2="260" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#7DD3FC" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
          </linearGradient>

          {/* Secondary Rim Gradient */}
          <linearGradient id="glassRimSoft" x1="260" y1="30" x2="40" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.75" />
          </linearGradient>

          {/* Frosted Translucent Glass Facet Fills */}
          <linearGradient id="glassFacet1" x1="50" y1="40" x2="220" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="80%" stopColor="#0F172A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.12" />
          </linearGradient>

          <linearGradient id="glassFacet2" x1="180" y1="40" x2="60" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
          </linearGradient>

          {/* Fine Specular Highlights */}
          <linearGradient id="specularGlint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Glass Atmospheric Glow */}
          <filter id="glassAura" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Glass Sculptural Monogram Loop & Wireframe Curves (intertwining Talesman 'T' & sculptural loop) */}
        
        {/* Back facet shadow */}
        <path 
          d="M 65 50 C 130 15, 230 40, 245 130 C 260 215, 170 270, 95 260 C 50 250, 40 190, 75 140 C 110 90, 190 85, 210 135 C 225 170, 195 210, 150 215 C 120 220, 105 195, 115 170" 
          stroke="rgba(15, 23, 42, 0.45)" 
          strokeWidth="18" 
          strokeLinecap="round"
          filter="url(#glassAura)"
        />

        {/* Outer Translucent Glass Body Volume */}
        <path 
          d="M 60 55 C 135 15, 235 40, 248 135 C 260 215, 175 272, 95 260 C 45 250, 42 185, 78 138 C 115 90, 192 88, 212 138 C 226 172, 195 212, 150 216 C 118 220, 102 195, 114 168 C 125 140, 160 130, 180 145" 
          fill="url(#glassFacet1)" 
          stroke="url(#glassRim)" 
          strokeWidth="2.4" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3D Wireframe Ribs & Contour Lines */}
        <path 
          d="M 60 55 C 80 85, 110 120, 140 150 M 110 35 C 130 75, 160 120, 185 160 M 165 30 C 180 80, 205 130, 220 180 M 215 50 C 220 100, 230 150, 235 205" 
          stroke="url(#glassRimSoft)" 
          strokeWidth="1.2" 
          strokeDasharray="4 3" 
          opacity="0.65" 
        />

        {/* Central Core Cross-Bar Monogram Accent */}
        <path 
          d="M 45 68 L 225 45 M 135 50 L 130 255" 
          stroke="url(#glassRim)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          opacity="0.85" 
        />
        
        {/* Inner Curved Refraction Loop */}
        <path 
          d="M 90 65 C 150 40, 220 60, 230 130 C 240 190, 180 240, 115 235 C 75 230, 68 185, 95 145 C 122 105, 180 105, 195 142 C 205 168, 180 198, 145 198" 
          fill="url(#glassFacet2)" 
          stroke="url(#glassRimSoft)" 
          strokeWidth="1.6" 
          strokeLinecap="round"
        />

        {/* Specular Bright Glint Highlights */}
        <path 
          d="M 68 55 C 110 28, 165 28, 205 45" 
          stroke="#FFFFFF" 
          strokeWidth="2.8" 
          strokeLinecap="round"
          opacity="0.95"
          filter="drop-shadow(0 0 6px #FFFFFF)"
        />

        <path 
          d="M 240 110 C 248 145, 245 180, 225 218" 
          stroke="#FFFFFF" 
          strokeWidth="2" 
          strokeLinecap="round"
          opacity="0.8"
          filter="drop-shadow(0 0 5px #7DD3FC)"
        />

        {/* Star Glint Diamond */}
        <polygon 
          points="208,44 212,47 216,44 212,41" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 8px #FFFFFF)" 
        />
        <polygon 
          points="70,54 73,56 76,54 73,52" 
          fill="#FFFFFF" 
          filter="drop-shadow(0 0 6px #7DD3FC)" 
        />
      </svg>
    </div>
  );
};

export default GlassMonogram;
