import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = '', delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`v2-text-reveal-container ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

interface WordByWordRevealProps {
  text: string;
  highlightWords?: string[];
  className?: string;
}

export const WordByWordReveal: React.FC<WordByWordRevealProps> = ({
  text,
  highlightWords = [],
  className = ''
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when the element enters the viewport bottom 85%
      // Complete revealing when it reaches the viewport center 45%
      const start = windowHeight * 0.88;
      const end = windowHeight * 0.42;

      if (rect.top > start) {
        setRevealedCount(0);
      } else if (rect.top < end) {
        setRevealedCount(words.length);
      } else {
        const progress = (start - rect.top) / (start - end);
        const count = Math.round(progress * words.length);
        setRevealedCount(Math.min(Math.max(count, 0), words.length));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <p ref={containerRef} className={`v2-word-reveal-paragraph ${className}`}>
      {words.map((word, idx) => {
        const isRevealed = idx <= revealedCount;
        const cleanWord = word.replace(/[^a-zA-Z0-9àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]/g, '');
        const isHighlight = highlightWords.some(h => 
          cleanWord.toLowerCase().includes(h.toLowerCase()) || h.toLowerCase().includes(cleanWord.toLowerCase())
        );

        return (
          <span
            key={idx}
            className={`v2-reveal-word ${isRevealed ? 'is-lit' : 'is-dim'} ${isHighlight ? 'is-highlight' : ''}`}
            style={{ '--word-idx': idx } as React.CSSProperties}
          >
            {word}{' '}
          </span>
        );
      })}
    </p>
  );
};
