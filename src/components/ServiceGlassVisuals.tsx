import React, { useState } from 'react';

// Common 3D Glass Card Container with Interactive Tilt
export const GlassServiceVisual: React.FC<{
  type: 'saas' | 'craft' | 'code' | 'system';
}> = ({ type }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      className="glass-visual-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="glass-visual-stage"
        style={{
          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
        }}
      >
        {type === 'saas' && <SaaS3DVisual />}
        {type === 'craft' && <Craft3DVisual />}
        {type === 'code' && <Code3DVisual />}
        {type === 'system' && <System3DVisual />}
      </div>
    </div>
  );
};

/* 01: SAAS & PRODUCT 3D ISOMETRIC GLASS WIREFRAME */
const SaaS3DVisual: React.FC = () => {
  return (
    <div className="glass-3d-scene saas-scene">
      {/* Base Grid Plate */}
      <div className="glass-layer layer-base">
        <svg className="blueprint-grid-svg" viewBox="0 0 280 140" fill="none">
          <defs>
            <pattern id="grid-pattern-saas" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
              <stop offset="50%" stopColor="rgba(56, 189, 248, 0.9)" />
              <stop offset="100%" stopColor="rgba(129, 140, 248, 0.9)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-saas)" />
          {/* Telemetry wave curve */}
          <path 
            d="M 10 110 Q 70 20, 140 75 T 270 25" 
            fill="none" 
            stroke="url(#curve-grad)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <circle cx="140" cy="75" r="4" fill="#38BDF8" className="pulse-glow-node" />
          <circle cx="270" cy="25" r="4" fill="#818CF8" className="pulse-glow-node" />
        </svg>
      </div>

      {/* Floating Mid Layer: Glass Dash HUD */}
      <div className="glass-layer layer-mid glass-dash-card">
        <div className="glass-dash-header">
          <div className="glass-dot-matrix">
            <span className="dot dot-cyan"></span>
            <span className="dot dot-cyan"></span>
          </div>
          <span className="glass-dash-mono">UX_METRICS // RETENTION</span>
          <span className="glass-dash-val">+42.8%</span>
        </div>
        <div className="glass-dash-bars">
          <div className="dash-bar"><span style={{ height: '40%' }}></span></div>
          <div className="dash-bar"><span style={{ height: '65%' }}></span></div>
          <div className="dash-bar"><span style={{ height: '85%' }}></span></div>
          <div className="dash-bar active"><span style={{ height: '100%' }}></span></div>
          <div className="dash-bar"><span style={{ height: '70%' }}></span></div>
        </div>
      </div>

      {/* Floating Top Layer: Specular Glass Chip */}
      <div className="glass-layer layer-top glass-kpi-chip">
        <div className="chip-indicator"></div>
        <span>ARCH_V2.4 // 0ms_LATENCY</span>
      </div>
    </div>
  );
};

/* 02: ART DIRECTION 3D REFRACTIVE LENS & TYPOGRAPHY */
const Craft3DVisual: React.FC = () => {
  return (
    <div className="glass-3d-scene craft-scene">
      {/* Background Optical Frame */}
      <div className="glass-layer layer-base">
        <svg className="blueprint-grid-svg" viewBox="0 0 280 140" fill="none">
          {/* Golden Spiral & Crosshairs */}
          <circle cx="140" cy="70" r="55" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="140" cy="70" r="32" stroke="rgba(251, 191, 36, 0.35)" strokeWidth="1" />
          <line x1="140" y1="10" x2="140" y2="130" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="20" y1="70" x2="260" y2="70" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.8" strokeDasharray="4 4" />
          <rect x="70" y="30" width="140" height="80" rx="12" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>

      {/* Mid Layer: 3D Frosted Editorial Glass Canvas */}
      <div className="glass-layer layer-mid craft-typography-glass">
        <div className="craft-badge-line">
          <span className="craft-mono-spec">DEPTH_Z: +48px</span>
          <span className="craft-mono-spec">COLOR: DCI-P3</span>
        </div>
        <div className="craft-sculpted-title">
          <span>ATMOSPHERE</span>
        </div>
      </div>

      {/* Top Layer: Floating Refraction Prism Node */}
      <div className="glass-layer layer-top craft-lens-pill">
        <div className="lens-aperture-core"></div>
        <span>SPATIAL_AESTHETICS</span>
      </div>
    </div>
  );
};

/* 03: VIBE CODING & RAPID MVP 3D GLASS TERMINAL */
const Code3DVisual: React.FC = () => {
  return (
    <div className="glass-3d-scene code-scene">
      {/* Base Grid */}
      <div className="glass-layer layer-base">
        <svg className="blueprint-grid-svg" viewBox="0 0 280 140" fill="none">
          <defs>
            <pattern id="grid-pattern-code" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(52, 211, 153, 0.1)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-code)" />
          <path d="M 30 110 L 100 40 L 180 80 L 250 20" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
      </div>

      {/* Mid Layer: Glass Code Terminal */}
      <div className="glass-layer layer-mid code-terminal-glass">
        <div className="code-term-bar">
          <span className="code-dot red"></span>
          <span className="code-dot yellow"></span>
          <span className="code-dot green"></span>
          <span className="code-term-title">RUNTIME_ENGINE // REACT_19</span>
        </div>
        <div className="code-term-lines">
          <p className="code-line"><span className="tok-fn">deploy</span>(<span className="tok-str">"https://mvp.app"</span>);</p>
          <p className="code-line hl"><span className="tok-prompt">›</span> <span className="tok-var">GoogleAIStudio</span>.<span className="tok-fn">stream</span>() <span className="tok-status">ONLINE</span></p>
          <p className="code-line"><span className="tok-prompt">›</span> <span className="tok-dim">Build latency: 240ms [PRODUCTION]</span></p>
        </div>
      </div>

      {/* Top Layer: Floating Execution Status Tag */}
      <div className="glass-layer layer-top code-status-chip">
        <span className="code-pulse-dot"></span>
        <span>FAST_ITERATION // LIVE_URL</span>
      </div>
    </div>
  );
};

/* 04: DESIGN SYSTEMS 3D GLASS TOKEN GRAPH */
const System3DVisual: React.FC = () => {
  return (
    <div className="glass-3d-scene system-scene">
      {/* Base Circuit Nodes */}
      <div className="glass-layer layer-base">
        <svg className="blueprint-grid-svg" viewBox="0 0 280 140" fill="none">
          {/* Connection Lines */}
          <path d="M 50 40 L 140 70 L 230 40" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1.2" />
          <path d="M 140 70 L 140 120" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="50" cy="40" r="5" fill="rgba(167, 139, 250, 0.4)" stroke="#A78BFA" strokeWidth="1.5" />
          <circle cx="230" cy="40" r="5" fill="rgba(167, 139, 250, 0.4)" stroke="#A78BFA" strokeWidth="1.5" />
          <circle cx="140" cy="70" r="7" fill="rgba(167, 139, 250, 0.6)" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="140" cy="120" r="4" fill="rgba(167, 139, 250, 0.3)" stroke="#A78BFA" strokeWidth="1" />
        </svg>
      </div>

      {/* Mid Layer: Floating Glass Token Card */}
      <div className="glass-layer layer-mid system-token-glass">
        <div className="system-token-header">
          <span className="token-mono-label">DESIGN_TOKEN_ENGINE</span>
          <span className="token-sync-badge">SYNCED</span>
        </div>
        <div className="system-tokens-list">
          <div className="token-pill-item">
            <span className="token-key">$radius-3d</span>
            <span className="token-val">24px</span>
          </div>
          <div className="token-pill-item">
            <span className="token-key">$blur-frost</span>
            <span className="token-val">32px</span>
          </div>
          <div className="token-pill-item">
            <span className="token-key">$wcag-spec</span>
            <span className="token-val">AAA</span>
          </div>
        </div>
      </div>

      {/* Top Layer: Spec Floating Node */}
      <div className="glass-layer layer-top system-spec-chip">
        <div className="spec-cube-icon"></div>
        <span>ZERO_ENGINEERING_DRIFT</span>
      </div>
    </div>
  );
};
