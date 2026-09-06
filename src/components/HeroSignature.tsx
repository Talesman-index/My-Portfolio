import React, { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    __preloaderComplete?: boolean;
  }
}

export const HeroSignature: React.FC = () => {
  const [key, setKey] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredInitial = useRef(false);

  // Trigger animation on initial load after preloader finishes
  useEffect(() => {
    const startWriting = () => {
      if (hasTriggeredInitial.current) return;
      hasTriggeredInitial.current = true;
      setHasStarted(true);
      setKey((prev) => prev + 1);
    };

    // Check if preloader overlay is active in DOM
    const preloaderEl = document.querySelector('.futuristic-preloader-overlay');
    const isPreloaderActive = !window.__preloaderComplete && !!preloaderEl;

    if (!isPreloaderActive) {
      // Preloader not present or already finished: start after brief entrance pause
      const timer = setTimeout(startWriting, 350);
      return () => clearTimeout(timer);
    }

    // Wait for the preloader exit event
    const handlePreloaderDone = () => {
      setTimeout(startWriting, 350);
    };

    window.addEventListener('preloaderComplete', handlePreloaderDone, { once: true });

    // Safety fallback timeout in case event is missed
    const fallbackTimer = setTimeout(startWriting, 2700);

    return () => {
      window.removeEventListener('preloaderComplete', handlePreloaderDone);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Trigger replay when user scrolls out and back into view
  useEffect(() => {
    let wasOutOfView = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (wasOutOfView && hasTriggeredInitial.current) {
              setKey((prev) => prev + 1);
            }
            wasOutOfView = false;
          } else {
            wasOutOfView = true;
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const letters = 'Talesman'.split('');

  return (
    <div 
      ref={containerRef} 
      className="v2-hero-signature" 
      onClick={() => {
        setHasStarted(true);
        setKey((prev) => prev + 1);
      }} 
      title="Click to replay signature animation"
      style={{ cursor: 'pointer' }}
    >
      {hasStarted && (
        <>
          <div key={`sig-text-${key}`} className="v2-signature-text-container">
            {letters.map((char, index) => (
              <span 
                key={index} 
                className="v2-sig-letter" 
                style={{ 
                  animationDelay: `${0.15 + index * 0.09}s` 
                }}
              >
                {char}
              </span>
            ))}
          </div>

          <svg 
            key={`sig-svg-${key}`}
            className="v2-signature-stroke" 
            viewBox="0 0 160 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              className="v2-sig-path"
              d="M 6 22 Q 65 6 128 18 Q 142 21 152 14" 
              stroke="#FBBF24" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
            />
            <circle 
              className="v2-sig-dot"
              cx="152" 
              cy="8" 
              r="3.6" 
              fill="#FBBF24" 
            />
          </svg>
        </>
      )}
    </div>
  );
};

export default HeroSignature;
