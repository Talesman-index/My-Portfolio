import React, { useEffect, useState, useRef } from 'react';

export const HeroSignature: React.FC = () => {
  const [key, setKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger animation on mount and when re-entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setKey((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.3 }
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
      onClick={() => setKey((prev) => prev + 1)} 
      title="Click to replay signature animation"
      style={{ cursor: 'pointer' }}
    >
      <div key={`sig-text-${key}`} className="v2-signature-text-container">
        {letters.map((char, index) => (
          <span 
            key={index} 
            className="v2-sig-letter" 
            style={{ 
              animationDelay: `${0.35 + index * 0.1}s` 
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
    </div>
  );
};

export default HeroSignature;
