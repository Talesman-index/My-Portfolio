import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  scrollProgress: number;
  lang?: 'en' | 'fr';
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollProgress, lang = 'fr' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Show button once user has scrolled past initial viewport
  const isVisible = scrollProgress > 4;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Circular scroll meter geometry (Radius = 20, Circumference = 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(scrollProgress, 0), 100);
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div className={`v2-scroll-top-wrapper ${isVisible ? 'is-visible' : ''}`}>
      {/* Tooltip on hover */}
      <span className={`v2-scroll-top-tooltip ${isHovered ? 'tooltip-open' : ''}`}>
        {lang === 'fr' ? 'Haut de page' : 'Back to top'}
      </span>

      <button
        type="button"
        className="v2-scroll-top-btn"
        onClick={handleScrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={lang === 'fr' ? 'Remonter en haut de page' : 'Scroll to top'}
        title={lang === 'fr' ? 'Remonter en haut de page' : 'Scroll to top'}
      >
        {/* SVG Dynamic Progress Ring */}
        <svg className="v2-scroll-top-ring" width="48" height="48" viewBox="0 0 48 48">
          <circle
            className="v2-scroll-ring-bg"
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="2.2"
            fill="none"
          />
          <circle
            className="v2-scroll-ring-fill"
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="2.2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Floating Center Icon */}
        <div className="v2-scroll-top-icon-wrap">
          <ArrowUp size={18} className="v2-scroll-top-arrow" />
        </div>
      </button>
    </div>
  );
};
