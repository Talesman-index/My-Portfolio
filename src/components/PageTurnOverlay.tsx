import React, { useEffect, useRef } from 'react';
import { SymbolGlyphIcon } from './SymbolIllustrations';

interface PageTurnOverlayProps {
  isTurning: boolean;
  direction?: 'forward' | 'reverse';
  targetLabel?: string;
  onMidTurn?: () => void;
  onTurnComplete?: () => void;
}

export const PageTurnOverlay: React.FC<PageTurnOverlayProps> = ({
  isTurning,
  direction = 'forward',
  targetLabel,
  onMidTurn,
  onTurnComplete,
}) => {
  const onMidTurnRef = useRef(onMidTurn);
  const onTurnCompleteRef = useRef(onTurnComplete);

  useEffect(() => {
    onMidTurnRef.current = onMidTurn;
    onTurnCompleteRef.current = onTurnComplete;
  });

  useEffect(() => {
    if (!isTurning) return;

    // Snappy, silky-smooth cyber transition (170ms mid-point switch, 380ms completion)
    const midTimer = setTimeout(() => {
      onMidTurnRef.current?.();
      window.scrollTo(0, 0);
    }, 170);

    const endTimer = setTimeout(() => {
      onTurnCompleteRef.current?.();
    }, 380);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(endTimer);
    };
  }, [isTurning]);

  if (!isTurning) return null;

  const isReverse = direction === 'reverse';

  return (
    <div className={`v2-portal-transition ${isReverse ? 'is-reverse' : 'is-forward'}`} aria-hidden="true">
      {/* Dark Ambient Backdrop */}
      <div className="v2-portal-backdrop" />

      {/* Top and Bottom Glass Aperture Shutters */}
      <div className="v2-portal-shutter shutter-top" />
      <div className="v2-portal-shutter shutter-bottom" />

      {/* Horizontal Laser Scanning Energy Beam */}
      <div className="v2-portal-laser-beam" />

      {/* Central Hologram Emblem HUD */}
      <div className="v2-portal-hud">
        <div className="v2-portal-symbol-wrap">
          <SymbolGlyphIcon size={38} color="cyan" className="v2-portal-symbol" />
        </div>
        <div className="v2-portal-ticker">
          <span className="v2-portal-ticker-dot" />
          <span className="v2-portal-ticker-text">
            {targetLabel || (isReverse ? 'RETOUR AU PORTFOLIO' : 'SYSTEM INITIALIZATION')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageTurnOverlay;
