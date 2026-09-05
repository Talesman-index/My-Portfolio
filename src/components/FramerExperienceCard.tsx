import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
}

interface FramerExperienceCardProps {
  company: string;
  monogram: string;
  role: string;
  date: string;
  tagline: string;
  description: string;
  accentColor: 'cyan' | 'blue' | 'green';
  metrics: MetricItem[];
  tags: string[];
  link?: string;
}

export const FramerExperienceCard: React.FC<FramerExperienceCardProps> = ({
  company,
  monogram,
  role,
  date,
  tagline,
  description,
  accentColor,
  metrics,
  tags
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      className={`framer-exp-card glow-${accentColor}`}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Cursor Spotlight Border Glow */}
      <div className="framer-spotlight-border" />
      <div className="framer-spotlight-fill" />

      <div className="framer-card-content">
        {/* Top Header: Company Monogram + Role + Period */}
        <div className="framer-card-header">
          <div className="framer-company-block">
            <div className={`framer-monogram-tile tile-${accentColor}`}>
              <span>{monogram}</span>
            </div>
            <div className="framer-company-info">
              <div className="framer-company-title-row">
                <h3 className="framer-company-name">{company}</h3>
                <span className={`framer-role-badge role-${accentColor}`}>{role}</span>
              </div>
              <span className="framer-tagline">{tagline}</span>
            </div>
          </div>

          <div className="framer-meta-pill">
            <span className="framer-date-text">{date}</span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="framer-card-desc">{description}</p>

        {/* Framer Key Metrics & Achievements Grid */}
        <div className="framer-metrics-grid">
          {metrics.map((metric, idx) => (
            <div key={idx} className="framer-metric-item">
              <div className="framer-metric-header">
                <span className="framer-metric-val">{metric.value}</span>
                <ArrowUpRight size={14} className="framer-metric-icon" />
              </div>
              <span className="framer-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Soft Deliverables & Tools Tags */}
        <div className="framer-card-footer">
          <div className="framer-tags-row">
            {tags.map((tag, idx) => (
              <span key={idx} className="framer-tag-chip">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
