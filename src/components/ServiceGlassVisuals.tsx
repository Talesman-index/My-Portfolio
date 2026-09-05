import React from 'react';

// Soft, Minimalist, Pro 3D Glass Icon Glyphs
export const GlassServiceVisual: React.FC<{
  type: 'saas' | 'craft' | 'code' | 'system';
}> = ({ type }) => {
  return (
    <div className={`glass-glyph-container glyph-${type}`}>
      {type === 'saas' && <SaaSGlyph />}
      {type === 'craft' && <CraftGlyph />}
      {type === 'code' && <CodeGlyph />}
      {type === 'system' && <SystemGlyph />}
    </div>
  );
};

/* 01: SaaS & Product — Layered 3D Isometric Glass Panes */
const SaaSGlyph: React.FC = () => (
  <svg viewBox="0 0 64 64" className="glass-glyph-svg" fill="none">
    <defs>
      <linearGradient id="saasGlass1" x1="12" y1="18" x2="52" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0B132B" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="saasStroke" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Base Layer */}
    <path d="M 32 12 L 52 23 L 32 34 L 12 23 Z" fill="url(#saasGlass1)" stroke="url(#saasStroke)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" transform="translate(0, 14)" />
    {/* Middle Layer */}
    <path d="M 32 12 L 52 23 L 32 34 L 12 23 Z" fill="url(#saasGlass1)" stroke="url(#saasStroke)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.75" transform="translate(0, 7)" />
    {/* Top Layer */}
    <path d="M 32 12 L 52 23 L 32 34 L 12 23 Z" fill="url(#saasGlass1)" stroke="url(#saasStroke)" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="32" cy="23" r="3" fill="#38BDF8" filter="drop-shadow(0 0 4px #38BDF8)" />
  </svg>
);

/* 02: Art Direction & Web — Refractive 3D Glass Prism Ring */
const CraftGlyph: React.FC = () => (
  <svg viewBox="0 0 64 64" className="glass-glyph-svg" fill="none">
    <defs>
      <linearGradient id="craftGlass" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
        <stop offset="40%" stopColor="#FBBF24" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0B132B" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="craftStroke" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Concentric Glass Rings */}
    <circle cx="32" cy="32" r="22" stroke="url(#craftStroke)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
    <circle cx="32" cy="32" r="16" fill="url(#craftGlass)" stroke="url(#craftStroke)" strokeWidth="1.8" />
    {/* 3D Focal Crosshair */}
    <path d="M 32 20 L 32 44 M 20 32 L 44 32" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
    <circle cx="32" cy="32" r="4" fill="#FBBF24" filter="drop-shadow(0 0 5px #FBBF24)" />
  </svg>
);

/* 03: Vibe Coding & MVP — 3D Glass Kinetic Spark / Compiler Chip */
const CodeGlyph: React.FC = () => (
  <svg viewBox="0 0 64 64" className="glass-glyph-svg" fill="none">
    <defs>
      <linearGradient id="codeGlass" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
        <stop offset="40%" stopColor="#34D399" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0B132B" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="codeStroke" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#34D399" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Diamond Cube */}
    <rect x="18" y="18" width="28" height="28" rx="8" transform="rotate(45 32 32)" fill="url(#codeGlass)" stroke="url(#codeStroke)" strokeWidth="1.8" />
    {/* Code Brackets / Lightning Core */}
    <path d="M 28 27 L 23 32 L 28 37 M 36 27 L 41 32 L 36 37" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 4px #34D399)" />
  </svg>
);

/* 04: Design Systems — 3D Glass Interlinked Token Nodes */
const SystemGlyph: React.FC = () => (
  <svg viewBox="0 0 64 64" className="glass-glyph-svg" fill="none">
    <defs>
      <linearGradient id="systemGlass" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
        <stop offset="40%" stopColor="#A78BFA" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0B132B" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="systemStroke" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Interlinked Node Matrix */}
    <path d="M 24 24 L 40 24 L 40 40 L 24 40 Z" stroke="url(#systemStroke)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="24" cy="24" r="6" fill="url(#systemGlass)" stroke="url(#systemStroke)" strokeWidth="1.5" />
    <circle cx="40" cy="24" r="6" fill="url(#systemGlass)" stroke="url(#systemStroke)" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="6" fill="url(#systemGlass)" stroke="url(#systemStroke)" strokeWidth="1.5" />
    <circle cx="24" cy="40" r="6" fill="url(#systemGlass)" stroke="url(#systemStroke)" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="4" fill="#A78BFA" filter="drop-shadow(0 0 5px #A78BFA)" />
  </svg>
);
