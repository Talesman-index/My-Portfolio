import React, { useEffect, useRef, useState } from 'react';
import { Briefcase } from 'lucide-react';

export interface TimelineExperienceItem {
  id: string;
  company: string;
  monogram: string;
  role: string;
  period: string;
  yearBadge: string;
  statusBadge?: string;
  tagline: string;
  description: string;
  accentColor: 'cyan' | 'blue' | 'green' | 'purple';
  metrics?: { value: string; label: string }[];
  tags: string[];
  highlights?: string[];
}

interface CreativeTimelineProps {
  items: TimelineExperienceItem[];
  lang: 'fr' | 'en';
}

export const CreativeTimelineExperience: React.FC<CreativeTimelineProps> = ({ items, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<string>(items[0]?.id || '');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the timeline container has been scrolled through
      const totalHeight = rect.height;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentScroll / (totalHeight + windowHeight * 0.5), 0), 1);
      setScrollProgress(progress * 100);

      // Trigger reveal for items as they enter viewport
      const rows = containerRef.current.querySelectorAll('.v2-timeline-row');
      rows.forEach((row) => {
        const rowRect = row.getBoundingClientRect();
        if (rowRect.top < windowHeight * 0.82) {
          row.classList.add('timeline-revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="v2-creative-timeline-wrapper" ref={containerRef}>
      {/* Central Ambient Laser Spine */}
      <div className="v2-timeline-spine-track">
        {/* Static subtle background track */}
        <div className="v2-timeline-spine-base" />
        
        {/* Dynamic Glowing Laser Fill that fills as you scroll */}
        <div 
          className="v2-timeline-spine-fill" 
          style={{ height: `${scrollProgress}%` }}
        >
          {/* Animated glowing laser head particle */}
          <div className="v2-timeline-spine-head" />
        </div>
      </div>

      {/* Timeline Rows */}
      <div className="v2-timeline-items-flow">
        {items.map((item, index) => {
          const isEven = index % 2 === 1;
          const isLeft = !isEven;

          return (
            <TimelineRowItem 
              key={item.id}
              item={item}
              index={index}
              isLeft={isLeft}
              lang={lang}
              isActive={activeItem === item.id}
              onMouseEnter={() => setActiveItem(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface TimelineRowItemProps {
  item: TimelineExperienceItem;
  index: number;
  isLeft: boolean;
  lang: 'fr' | 'en';
  isActive: boolean;
  onMouseEnter: () => void;
}

const TimelineRowItem: React.FC<TimelineRowItemProps> = ({
  item,
  isLeft,
  isActive,
  onMouseEnter
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Subtle 3D tilt effect on mouse movement
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    cardRef.current.style.setProperty('--card-rot-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--card-rot-y', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--card-rot-x', `0deg`);
    cardRef.current.style.setProperty('--card-rot-y', `0deg`);
  };

  return (
    <div 
      className={`v2-timeline-row ${isLeft ? 'row-align-left' : 'row-align-right'} glow-${item.accentColor} ${isActive ? 'is-active' : ''}`}
      onMouseEnter={onMouseEnter}
    >
      {/* ─── SIDE A: TIME META & HIGHLIGHTS (Curated Milestone Stepper) ─── */}
      <div className="v2-timeline-meta-col">
        <div className={`v2-milestone-card glow-${item.accentColor}`}>
          {/* Header Bar: Timestamp + Sector Capsule */}
          <div className="v2-milestone-header">
            <div className="v2-milestone-date-wrap">
              <span className={`v2-milestone-beacon dot-${item.accentColor}`} />
              <span className="v2-milestone-period">{item.period}</span>
            </div>

            {item.statusBadge && (
              <span className={`v2-milestone-badge badge-${item.accentColor}`}>
                {item.statusBadge}
              </span>
            )}
          </div>

          <div className="v2-milestone-divider" />

          {/* Stepper / Timeline Micro-Rail for Deliverables */}
          <div className="v2-milestone-rail">
            {item.highlights && item.highlights.map((h, i) => {
              const colonIdx = h.indexOf(':');
              const title = colonIdx > -1 ? h.slice(0, colonIdx).trim() : null;
              const desc = colonIdx > -1 ? h.slice(colonIdx + 1).trim() : h;

              return (
                <div key={i} className="v2-milestone-step">
                  <div className="v2-step-tracker">
                    <span className={`v2-step-node node-${item.accentColor}`}>
                      0{i + 1}
                    </span>
                    {i < (item.highlights?.length || 0) - 1 && (
                      <span className="v2-step-line" />
                    )}
                  </div>

                  <div className="v2-step-content">
                    {title && <h4 className="v2-step-title">{title}</h4>}
                    <p className="v2-step-desc">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── CENTER NODE (Interactive Glass Orb on Timeline Track) ─── */}
      <div className="v2-timeline-center-node">
        {/* Orbital pulse wave */}
        <div className="v2-node-orbital-ring" />
        <div className="v2-node-radar-pulse" />

        {/* Central 3D Glass Emblem */}
        <div className={`v2-timeline-orb orb-${item.accentColor}`}>
          <div className="v2-orb-inner-glass">
            <span className="v2-orb-monogram">{item.monogram}</span>
          </div>
          {/* Active status beacon */}
          <span className="v2-orb-beacon-dot" />
        </div>

        {/* Laser Connector Line to the Card */}
        <div className="v2-timeline-laser-connector">
          <div className="v2-laser-beam" />
          <div className="v2-laser-dot" />
        </div>
      </div>

      {/* ─── SIDE B: THE EXPANDED INTERACTIVE EXPERIENCE CARD ─── */}
      <div className="v2-timeline-card-col">
        <div 
          ref={cardRef}
          className={`v2-timeline-card glow-${item.accentColor}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Interactive Cursor Spotlight Glow */}
          <div className="v2-card-spotlight-border" />
          <div className="v2-card-spotlight-fill" />

          {/* Ambient Glass Reflections */}
          <div className="v2-card-specular-sheen" />

          <div className="v2-timeline-card-inner">
            {/* Header: Company, Role & Quick Meta */}
            <div className="v2-timeline-card-header">
              <div className="v2-tcard-company-wrap">
                <div className={`v2-tcard-logo-badge badge-${item.accentColor}`}>
                  <span>{item.monogram}</span>
                </div>
                <div className="v2-tcard-title-meta">
                  <div className="v2-tcard-name-row">
                    <h3 className="v2-tcard-company-name">{item.company}</h3>
                    <span className={`v2-tcard-role-chip chip-${item.accentColor}`}>
                      <Briefcase size={11} className="v2-chip-icon" />
                      {item.role}
                    </span>
                  </div>
                  <span className="v2-tcard-tagline">{item.tagline}</span>
                </div>
              </div>

              {/* Mobile-only date pill */}
              <div className="v2-tcard-mobile-date">
                <span>{item.period}</span>
              </div>
            </div>

            {/* Narrative Body */}
            <p className="v2-tcard-description">
              {item.description}
            </p>

            {/* Deliverables / Skill Chips */}
            <div className="v2-tcard-footer-tags">
              {item.tags.map((tag, tIdx) => (
                <span key={tIdx} className="v2-tcard-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
