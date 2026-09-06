import React, { useState, useEffect } from 'react';

export const FuturisticPreloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('SYSTEM_INIT');
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth cinematic progress counter
    const startTime = performance.now();
    const duration = 1800; // 1.8s total smooth load time

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress < 30) {
        setPhaseText('CALIBRATING_BLUEPRINT_GEOMETRY');
      } else if (rawProgress < 65) {
        setPhaseText('MATERIALIZING_3D_GLASS_MATRIX');
      } else if (rawProgress < 90) {
        setPhaseText('OPTIMIZING_SPATIAL_SHADERS');
      } else {
        setPhaseText('WORKSPACE_READY');
      }

      if (rawProgress < 100) {
        requestAnimationFrame(updateLoader);
      } else {
        // Exit transition trigger
        setTimeout(() => {
          setIsExiting(true);
          (window as any).__preloaderComplete = true;
          window.dispatchEvent(new CustomEvent('preloaderComplete'));
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 600); // Wait for exit animation
        }, 300);
      }
    };

    requestAnimationFrame(updateLoader);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className={`futuristic-preloader-overlay ${isExiting ? 'preloader-exit' : ''}`}>
      {/* Ambient background spatial aura */}
      <div className="preloader-ambient-glow" />

      <div className="preloader-content-stage">
        {/* 3D Blueprint Glass Symbol */}
        <div className="preloader-symbol-wrapper">
          {/* Outer Rotating Coordinate Ring */}
          <div className="preloader-orbit-ring ring-outer" />
          <div className="preloader-orbit-ring ring-inner" />

          <svg 
            viewBox="0 0 280 290" 
            className="preloader-symbol-svg" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pGlassRim" x1="40" y1="45" x2="240" y2="245" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#7DD3FC" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="pBlueprint" x1="0" y1="0" x2="280" y2="290" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.75" />
              </linearGradient>

              <linearGradient id="pGlassBody" x1="50" y1="55" x2="230" y2="235" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
                <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.18" />
                <stop offset="70%" stopColor="#0B132B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
              </linearGradient>

              <radialGradient id="pCoreGlow" cx="140" cy="145" r="75" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.6" />
                <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
              </radialGradient>

              <filter id="pAuraFilter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. BLUEPRINT GRID & GUIDELINES (Animated stroke) */}
            <line x1="20" y1="145" x2="260" y2="145" stroke="url(#pBlueprint)" strokeWidth="1.2" strokeDasharray="6 4" className="blueprint-line" />
            <line x1="140" y1="25" x2="140" y2="265" stroke="url(#pBlueprint)" strokeWidth="1.2" strokeDasharray="6 4" className="blueprint-line" />

            <line x1="45" y1="50" x2="235" y2="240" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />
            <line x1="45" y1="240" x2="235" y2="50" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />

            {/* Concentric Blueprint Circles */}
            <circle cx="140" cy="145" r="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" className="pulse-circle" />
            <circle cx="140" cy="145" r="45" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            
            {/* Lobe Guideline Circles */}
            <circle cx="140" cy="100" r="45" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.3" />
            <circle cx="185" cy="145" r="45" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.3" />
            <circle cx="140" cy="190" r="45" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.3" />
            <circle cx="95" cy="145" r="45" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.3" />

            {/* Blueprint Dimension Ticks */}
            <line x1="135" y1="55" x2="145" y2="55" stroke="#7DD3FC" strokeWidth="1.4" opacity="0.8" />
            <line x1="135" y1="235" x2="145" y2="235" stroke="#7DD3FC" strokeWidth="1.4" opacity="0.8" />
            <line x1="50" y1="140" x2="50" y2="150" stroke="#7DD3FC" strokeWidth="1.4" opacity="0.8" />
            <line x1="230" y1="140" x2="230" y2="150" stroke="#7DD3FC" strokeWidth="1.4" opacity="0.8" />

            {/* 2. MAIN 3D TRANSLUCENT GLASS BODY */}
            <path 
              d="M 95 100 A 45 45 0 0 1 185 100 A 45 45 0 0 1 185 190 A 45 45 0 0 1 95 190 A 45 45 0 0 1 95 100 Z M 140 100 A 45 45 0 0 0 185 145 A 45 45 0 0 0 140 190 A 45 45 0 0 0 95 145 A 45 45 0 0 0 140 100 Z" 
              fill="url(#pGlassBody)" 
              stroke="url(#pGlassRim)" 
              strokeWidth="2.6" 
              strokeLinejoin="round"
              strokeLinecap="round"
              fillRule="evenodd"
              className="preloader-glass-body"
            />

            {/* Core Glow */}
            <circle 
              cx="140" 
              cy="145" 
              r="52" 
              fill="url(#pCoreGlow)" 
              pointerEvents="none"
              className="preloader-core-pulse"
            />

            {/* 3. INTERNAL WIREFRAME INSETS */}
            <path 
              d="M 105 110 A 35 35 0 0 1 175 110 A 35 35 0 0 1 175 180 A 35 35 0 0 1 105 180 A 35 35 0 0 1 105 110 Z" 
              stroke="#7DD3FC" 
              strokeWidth="1.2" 
              strokeDasharray="5 3"
              opacity="0.8"
            />
            <path 
              d="M 140 108 A 37 37 0 0 0 177 145 A 37 37 0 0 0 140 182 A 37 37 0 0 0 103 145 A 37 37 0 0 0 140 108 Z" 
              stroke="#7DD3FC" 
              strokeWidth="1.2" 
              strokeDasharray="5 3"
              opacity="0.8"
            />

            {/* 4. 3D BEVEL CHAMFERS */}
            <line x1="95" y1="100" x2="105" y2="110" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />
            <line x1="185" y1="100" x2="175" y2="110" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />
            <line x1="185" y1="190" x2="175" y2="180" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />
            <line x1="95" y1="190" x2="105" y2="180" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />

            <line x1="140" y1="55" x2="140" y2="65" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />
            <line x1="230" y1="145" x2="220" y2="145" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />
            <line x1="140" y1="235" x2="140" y2="225" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />
            <line x1="50" y1="145" x2="60" y2="145" stroke="url(#pGlassRim)" strokeWidth="1.8" opacity="0.85" />

            <line x1="140" y1="100" x2="140" y2="108" stroke="url(#pGlassRim)" strokeWidth="1.6" opacity="0.85" />
            <line x1="185" y1="145" x2="177" y2="145" stroke="url(#pGlassRim)" strokeWidth="1.6" opacity="0.85" />
            <line x1="140" y1="190" x2="140" y2="182" stroke="url(#pGlassRim)" strokeWidth="1.6" opacity="0.85" />
            <line x1="95" y1="145" x2="103" y2="145" stroke="url(#pGlassRim)" strokeWidth="1.6" opacity="0.85" />

            {/* 5. BRIGHT SPECULAR GLINTS */}
            <path 
              d="M 100 85 A 45 45 0 0 1 175 75" 
              stroke="#FFFFFF" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              opacity="0.9"
              filter="url(#pAuraFilter)"
            />
            <path 
              d="M 60 120 A 45 45 0 0 1 75 100" 
              stroke="#FFFFFF" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              opacity="0.85"
            />
            <path 
              d="M 215 120 A 45 45 0 0 0 200 100" 
              stroke="#FFFFFF" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              opacity="0.85"
            />

            {/* Corner Precision Nodes */}
            <polygon points="140,50 144,55 140,60 136,55" fill="#FFFFFF" />
            <polygon points="230,140 235,145 230,150 225,145" fill="#FFFFFF" />
            <polygon points="140,230 144,235 140,240 136,235" fill="#FFFFFF" />
            <polygon points="50,140 55,145 50,150 45,145" fill="#FFFFFF" />
            <polygon points="140,142 143,145 140,148 137,145" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Telemetry Progress Info */}
        <div className="preloader-telemetry">
          <div className="preloader-counter-row">
            <span className="preloader-os-tag">TALESMAN PORTFOLIO</span>
            <span className="preloader-percentage">{progress.toString().padStart(3, '0')}%</span>
          </div>

          {/* Progress Bar Track */}
          <div className="preloader-progress-track">
            <div 
              className="preloader-progress-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          {/* Dynamic Status Log */}
          <div className="preloader-status-line">
            <span className="preloader-status-dot" />
            <span className="preloader-status-text">{phaseText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
