import React, { useEffect, useRef } from 'react';

interface PageTurnOverlayProps {
  isTurning: boolean;
  direction?: 'forward' | 'reverse';
  onMidTurn?: () => void;
  onTurnComplete?: () => void;
}

export const PageTurnOverlay: React.FC<PageTurnOverlayProps> = ({
  isTurning,
  direction = 'forward',
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

    const midTimer = setTimeout(() => {
      onMidTurnRef.current?.();
    }, 280);

    const endTimer = setTimeout(() => {
      onTurnCompleteRef.current?.();
    }, 600);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(endTimer);
    };
  }, [isTurning]);

  if (!isTurning) return null;

  return (
    <div className={`page-turn-stage ${direction}`} aria-hidden="true">
      {/* Dark Dimmed Canvas Backdrop */}
      <div className="page-turn-backdrop" />

      {/* Dynamic Moving Page Fold Spine Shadow */}
      <div className="page-turn-spine-shadow" />

      {/* 3D Flipping Paper Sheet */}
      <div className="page-turn-sheet-container">
        <div className="page-turn-sheet">
          {/* Front Side */}
          <div className="page-turn-side side-front">
            <div className="page-turn-binder-holes">
              <span className="hole" />
              <span className="hole" />
              <span className="hole" />
            </div>
            <div className="page-turn-tab-tag">TALESMAN DOSSIER</div>
            <div className="page-turn-lines" />
            <div className="page-turn-corner-curl-3d" />
          </div>

          {/* Back Side */}
          <div className="page-turn-side side-back">
            <div className="page-turn-binder-holes">
              <span className="hole" />
              <span className="hole" />
              <span className="hole" />
            </div>
            <div className="page-turn-tab-tag" style={{ background: '#18A0FB', color: '#FFF' }}>TALESMAN FILES</div>
            <div className="page-turn-lines" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTurnOverlay;
