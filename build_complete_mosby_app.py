import re

app_content = r'''import { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  X,
  Mail,
  Phone,
  Calendar,
  Linkedin,
  ExternalLink,
  FileText,
  Download,
  Layers,
  Sparkles
} from 'lucide-react';
import './App.css';
import { caseStudiesData, CaseStudyId } from './caseStudiesData';

/* Metal Paperclip SVG Helper */
const PaperclipSVG = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 50" width="22" height="44" fill="none" stroke="#666666" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', zIndex: 15, filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.3))', ...style }}>
    <path d="M7 40 V10 A5 5 0 0 1 17 10 V36 A8 8 0 0 1 1 36 V14 A11 11 0 0 1 23 14 V40" />
  </svg>
);

/* Binder Holes Helper */
const BinderHoles = () => (
  <div className="mosby-binder-holes">
    <div className="mosby-binder-hole" />
    <div className="mosby-binder-hole" />
    <div className="mosby-binder-hole" />
    <div className="mosby-binder-hole" />
    <div className="mosby-binder-hole" />
    <div className="mosby-binder-hole" />
    <div className="mosby-binder-hole" />
  </div>
);

const VALID_PROJECT_IDS: CaseStudyId[] = ['asset-iq', 'ehadj', 'beans', 'sagana', 'vortex', 'sport-advisor', 'truvox', 'tavares', 'the-refuge', 'strategy-arena', 'dolce-riviera'];

function getViewFromHash(): 'home' | 'cv' | 'experiences' | 'services' | CaseStudyId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  if (hash === 'cv') return 'cv';
  if (hash === 'experiences') return 'experiences';
  if (hash === 'services') return 'services';
  if (VALID_PROJECT_IDS.includes(hash as CaseStudyId)) return hash as CaseStudyId;
  return 'home';
}

const PROJECT_CONFIGS: Record<string, { title: string; color: string; categoryLabel: string; year: string; externalLink?: string }> = {
  'asset-iq': { title: 'Asset IQ', color: '#1D4ED8', categoryLabel: 'B2B SaaS & Resource Telemetry', year: '2026', externalLink: 'https://www.assetiQ.com' },
  'ehadj': { title: 'eHadj', color: '#DC2626', categoryLabel: 'Logistics & Process Orchestration', year: '2026', externalLink: 'https://talesmanwebcraft.vercel.app/#ehadj' },
  'beans': { title: 'Beans', color: '#059669', categoryLabel: 'Customer Engagement & Integrations', year: '2025', externalLink: 'https://trybeans.com' },
  'sagana': { title: 'Sagana', color: '#7C3AED', categoryLabel: 'Modular Design Systems', year: '2025', externalLink: 'https://talesmanwebcraft.vercel.app/#sagana' },
  'vortex': { title: 'Vortex Gallery', color: '#EAB308', categoryLabel: 'Immersive Web3 Exhibition', year: '2024', externalLink: 'https://talesmanwebcraft.vercel.app/#vortex' },
  'sport-advisor': { title: 'Sport Advisor', color: '#000000', categoryLabel: 'Mobile App & Athletic Engine', year: '2024', externalLink: 'https://talesmanwebcraft.vercel.app/#sport-advisor' },
  'truvox': { title: 'Truvox Studio', color: '#DC2626', categoryLabel: 'Digital Studio Web Experience', year: '2025', externalLink: 'https://www.truvox.studio/' },
  'dolce-riviera': { title: 'Dolce Riviera', color: '#1D4ED8', categoryLabel: 'Luxury E-Commerce & Editorial UI', year: '2025', externalLink: 'https://talesmanwebcraft.vercel.app/#dolce-riviera' }
};

/* ─────────────────────────────────────────────
   ABOUT SHEET MODAL (MOSBY'S FILES SCREENSHOT 3 DIRECT REPRODUCTION)
───────────────────────────────────────────── */
const AboutSheetModal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: 'en' | 'fr' }) => {
  if (!isOpen) return null;

  return (
    <div className="mosby-modal-overlay" onClick={onClose}>
      <div className="mosby-about-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="mosby-modal-close-btn" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        <div className="mosby-about-grid">
          {/* Left Column: Big Bold Quote + Photo */}
          <div>
            <h2 className="mosby-about-quote-title">
              {lang === 'fr' 
                ? "LE DESIGN SYSTÉMIQUE N'EST PAS UN POLI ESTHÉTIQUE. C'EST LA RÉDUCTION DU BRUIT COGNITIF."
                : "SYSTEMIC DESIGN IS NOT AESTHETIC POLISH. IT IS THE REDUCTION OF COGNITIVE NOISE."}
            </h2>

            <div className="mosby-about-photo-wrapper">
              <img src="/imgs/hero_image.png" alt="Sacca Dafia" className="mosby-about-photo-img" />
              <div className="mosby-about-caption">
                Sacca Dafia, Product &amp; Solution Designer (+4 ans exp) <br />
                Archive of Digital Products, Cotonou / Remote
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Serif Text + Bullets + Signature */}
          <div>
            <p className="mosby-about-serif-text">
              {lang === 'fr'
                ? "Ce portfolio a été conçu pour répliquer le sentiment d'ouvrir un dossier d'archives physiques — une collection rigoureuse appartenant à un designer passionné par la clarté, l'architecture d'information et les logiciels d'entreprise complexes."
                : "We built this archive to replicate the feeling of opening an old physical design folder — a carefully assembled collection belonging to someone obsessed with clarity, systemic architecture, and enterprise software."}
            </p>

            <ul className="mosby-about-bullets">
              <li>
                {lang === 'fr' 
                  ? "Conception de solutions digitales sur mesure et de plateformes SaaS B2B complexes."
                  : "Design of tailored digital solutions and complex B2B SaaS platforms."}
              </li>
              <li>
                {lang === 'fr'
                  ? "Rédaction de PRDs, spécifications techniques et supervision des équipes d'ingénierie dev."
                  : "Writing PRDs, technical integration specs, and supervising engineering dev teams."}
              </li>
              <li>
                {lang === 'fr'
                  ? "Design systems modulables, hiérarchie visuelle stricte et recherche utilisateur terrain."
                  : "Modular design systems, strict visual hierarchy, and real-world field research."}
              </li>
            </ul>

            <p className="mosby-about-serif-text" style={{ marginTop: '20px' }}>
              {lang === 'fr' 
                ? "Le dossier est ouvert. Explorez les études de cas ci-dessous."
                : "The folder's open. We won't tell you where to start."}
            </p>

            <div className="mosby-signature-block">
              <div className="mosby-signature-text">Sacca Dafia</div>
              <div className="mosby-signature-sub">Sacca Dafia, Product Designer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CASE STUDY DOSSIER VIEW (RICH DETAILS & LIVE CTA ENHANCEMENT)
───────────────────────────────────────────── */
const CaseStudy = ({ 
  id, 
  setCurrentView,
  lang
}: { 
  id: CaseStudyId, 
  setCurrentView: any,
  lang: 'en' | 'fr'
}) => {
  const data = caseStudiesData[lang][id] || caseStudiesData['fr']['asset-iq'];
  const config = PROJECT_CONFIGS[id] || { title: data.title, color: '#1D4ED8', categoryLabel: 'Design Dossier', year: '2026' };
  const liveUrl = data.externalLink || config.externalLink || 'https://www.truvox.studio/';

  const allKeys = Object.keys(PROJECT_CONFIGS) as CaseStudyId[];
  const currentIndex = allKeys.indexOf(id);
  const nextId = allKeys[(currentIndex + 1) % allKeys.length];
  const nextConfig = PROJECT_CONFIGS[nextId];

  return (
    <div className="mosby-dossier-view">
      {/* Huge White Title (Mosby's Files Header) */}
      <h1 className="mosby-dossier-giant-title">{data.title}</h1>

      {/* Main Folder Backdrop Container */}
      <div className="mosby-dossier-folder-container">
        <div className="mosby-folder-backdrop" style={{ backgroundColor: config.color }}>
          {/* White Paper Sheet Overlay */}
          <div className="mosby-paper-sheet">
            <BinderHoles />

            {/* Top Grid: Portrait Photo with Paperclip + Drop-Cap Brief */}
            <div className="mosby-paper-grid">
              <div className="mosby-portrait-pin-box">
                <PaperclipSVG style={{ top: '-14px', right: '20px' }} />
                <img src={data.contextImg || data.bgImage || "/imgs/hero_image.png"} alt={data.title} className="mosby-portrait-img" />
                
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '12px', color: '#666' }}>
                  FILE REGISTRATION: SD-{id.toUpperCase()} <br />
                  YEAR: {config.year} • {data.label}
                </div>

                {/* Direct CTA Button to Live Project */}
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mosby-live-cta-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ExternalLink size={16} />
                  <span>{lang === 'fr' ? 'VISITER LE PROJET LIVE ↗' : 'VISIT LIVE PROJECT ↗'}</span>
                </a>
              </div>

              <div>
                <p className="mosby-dropcap-text">
                  {data.context}
                </p>
                <p className="mosby-dropcap-text" style={{ marginTop: '16px' }}>
                  {data.challenge}
                </p>

                {/* Technical Specs Metadata Grid */}
                <div className="mosby-specs-metadata-grid">
                  <div>
                    <div className="mosby-spec-item-title">DESIGNER ROLE</div>
                    <div className="mosby-spec-item-val">Lead Product Designer</div>
                  </div>
                  <div>
                    <div className="mosby-spec-item-title">PROJECT SCOPE</div>
                    <div className="mosby-spec-item-val">{data.label}</div>
                  </div>
                  <div>
                    <div className="mosby-spec-item-title">DELIVERABLES</div>
                    <div className="mosby-spec-item-val">PRD, Workflows &amp; UI System</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Physical Artifacts (Pink, Yellow, Blue Cards with Paperclips) */}
            <div className="mosby-artifacts-container">
              {/* Pink Index Card */}
              <div className="mosby-artifact-card mosby-card-pink">
                <PaperclipSVG style={{ top: '-14px', left: '16px' }} />
                <div className="mosby-artifact-title">01. DISCOVERY &amp; INSIGHT</div>
                <div className="mosby-artifact-text">"{data.insight}"</div>
                {data.challengeImg && <img src={data.challengeImg} alt="Discovery Artifact" className="mosby-artifact-img" />}
              </div>

              {/* Yellow Sticky Note */}
              <div className="mosby-artifact-card mosby-card-yellow">
                <PaperclipSVG style={{ top: '-14px', right: '16px' }} />
                <div className="mosby-artifact-title">02. SYSTEM SOLUTION</div>
                <div className="mosby-artifact-text">{data.solution || data.uxSolutions}</div>
                {data.dashboardImg && <img src={data.dashboardImg} alt="Solution Artifact" className="mosby-artifact-img" />}
              </div>

              {/* Blue Note */}
              {data.interfaceImg && (
                <div className="mosby-artifact-card mosby-card-blue">
                  <PaperclipSVG style={{ top: '-14px', left: '40%' }} />
                  <div className="mosby-artifact-title">03. POLISHED PRODUCT UI</div>
                  <div className="mosby-artifact-text">{data.conclusion}</div>
                  <img src={data.interfaceImg} alt="Interface Showcase" className="mosby-artifact-img" />
                </div>
              )}
            </div>

            {/* Detailed System Features Section */}
            {data.features && data.features.length > 0 && (
              <div style={{ marginTop: '50px', borderTop: '1px solid #DDD', paddingTop: '30px' }}>
                <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.8rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={22} color={config.color} />
                  <span>SYSTEMIC FEATURES &amp; CAPABILITIES</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {data.features.map((feat, idx) => (
                    <div key={idx} style={{ padding: '18px', background: '#FFFFFF', borderLeft: `4px solid ${config.color}`, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                      <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.2rem', marginBottom: '4px' }}>{feat.title}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555' }}>{feat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategic Design Decisions */}
            {data.decisions && data.decisions.length > 0 && (
              <div style={{ marginTop: '40px', borderTop: '1px solid #DDD', paddingTop: '30px' }}>
                <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.8rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={22} color={config.color} />
                  <span>ARCHITECTURAL &amp; UX DECISIONS</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {data.decisions.map((dec, idx) => (
                    <div key={idx} style={{ padding: '20px', background: '#FEF08A', color: '#121212', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.25rem', marginBottom: '6px' }}>{dec.title}</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', marginBottom: '8px' }}>{dec.desc}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#444', borderTop: '1px solid rgba(0,0,0,0.15)', paddingTop: '6px' }}>
                        <strong>WHY:</strong> {dec.why}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Outcomes List */}
            <div style={{ marginTop: '40px', borderTop: '1px solid #DDD', paddingTop: '30px' }}>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.6rem', marginBottom: '16px' }}>MEASURABLE OUTCOMES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {data.impact.map((imp, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} color={config.color} />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Edge Vertical Folder Tabs */}
        <div className="mosby-vertical-tabs-col">
          {allKeys.slice(0, 5).map(k => {
            const cfg = PROJECT_CONFIGS[k];
            return (
              <div 
                key={k} 
                className="mosby-vertical-tab" 
                style={{ backgroundColor: cfg.color }}
                onClick={() => setCurrentView(k)}
              >
                {cfg.title}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Project Folder Bar Peeking at Bottom */}
      <div 
        className="mosby-next-folder-bar" 
        style={{ backgroundColor: nextConfig.color }}
        onClick={() => setCurrentView(nextId)}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#FFF', opacity: 0.8, textTransform: 'uppercase' }}>NEXT FILE IN ARCHIVE →</div>
          <div className="mosby-next-folder-title">{nextConfig.title}</div>
        </div>
        <ArrowRight size={32} color="#FFF" />
      </div>

      {/* Floating Scroll Pill Button */}
      <div className="mosby-floating-scroll-badge" onClick={() => setCurrentView(nextId)}>
        Scroll for next file ↓
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   EXPERIENCES DOSSIER VIEW
───────────────────────────────────────────── */
const ExperiencesView = ({ setCurrentView }: { setCurrentView: any }) => {
  return (
    <div className="mosby-dossier-view" style={{ paddingTop: '40px' }}>
      <div className="container">
        <button onClick={() => setCurrentView('home')} style={{ color: '#999', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> <span>RETURN TO ARCHIVE HOME</span>
        </button>

        <h1 className="mosby-dossier-giant-title" style={{ padding: '0 0 20px 0' }}>EXPERIENCES &amp; FIELD LOGS</h1>

        <div className="mosby-paper-sheet" style={{ maxWidth: '1050px' }}>
          <BinderHoles />

          <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.2rem', marginBottom: '24px' }}>
            CHRONOLOGICAL FIELD REPORTS (2022 - 2026)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ padding: '24px', background: '#FFF', borderLeft: '6px solid #1D4ED8', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#1D4ED8', fontWeight: 'bold' }}>2024 - 2025 • BEANS (SAAS B2B CUSTOMER ENGAGEMENT)</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.4rem', margin: '6px 0' }}>Chef de Projet Intégrations &amp; Lead Product Designer</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#444' }}>
                Rédaction des PRD, élaboration des spécifications d'intégration Shopify &amp; POS, conception des tunnels UX sans friction, supervision des équipes d'ingénierie dev et QA testing.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#FFF', borderLeft: '6px solid #DC2626', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#DC2626', fontWeight: 'bold' }}>2025 - 2026 • eHADJ (ORCHESTRATION LOGISTIQUE NATIONALE)</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.4rem', margin: '6px 0' }}>Lead Product Designer</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#444' }}>
                Digitalisation globale du workflow de pèlerinage au Bénin. Unification multi-acteurs (Ministère de la Santé, Banques, Ministère des Affaires Étrangères, AGLO).
              </p>
            </div>

            <div style={{ padding: '24px', background: '#FFF', borderLeft: '6px solid #059669', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#059669', fontWeight: 'bold' }}>2025 - 2026 • ASSET IQ (GOUVERNANCE D'ACTIFS MULTI-SITES)</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.4rem', margin: '6px 0' }}>Product &amp; UX Strategist</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#444' }}>
                Système intelligent de suivi et gouvernance opérationnelle de ressources physiques multi-sites par QR Code et télémétrie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SERVICES DOSSIER VIEW
───────────────────────────────────────────── */
const ServicesView = ({ setCurrentView }: { setCurrentView: any }) => {
  return (
    <div className="mosby-dossier-view" style={{ paddingTop: '40px' }}>
      <div className="container">
        <button onClick={() => setCurrentView('home')} style={{ color: '#999', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> <span>RETURN TO ARCHIVE HOME</span>
        </button>

        <h1 className="mosby-dossier-giant-title" style={{ padding: '0 0 20px 0' }}>CAPABILITIES &amp; SERVICES SPECS</h1>

        <div className="mosby-paper-sheet" style={{ maxWidth: '1050px' }}>
          <BinderHoles />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', background: '#FFF', border: '1px solid #DDD', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#DC2626' }}>SPEC 01</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem', margin: '8px 0' }}>Product &amp; UX Strategy</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#444' }}>
                Architecture d'information, tunnels d'activation sans friction, audit d'utilisabilité et stratégie SaaS B2B.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#FFF', border: '1px solid #DDD', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#1D4ED8' }}>SPEC 02</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem', margin: '8px 0' }}>PRDs &amp; Dev Lead</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#444' }}>
                Rédaction de cahiers des charges, spécifications API/POS, coordination des équipes d'ingénierie et Quality Assurance (QA).
              </p>
            </div>

            <div style={{ padding: '24px', background: '#FFF', border: '1px solid #DDD', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#059669' }}>SPEC 03</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem', margin: '8px 0' }}>Design Systems &amp; Web</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#444' }}>
                Systèmes de composants modulaires Figma/React, sites vitrines haut de gamme et expériences e-commerce immersives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ARCHIVAL FOOTER SYSTEM (DIRECT MOSBY'S FILES REPRODUCTION)
───────────────────────────────────────────── */
const MosbyFooter = ({ setCurrentView, setIsAboutModalOpen, lang }: { setCurrentView: any; setIsAboutModalOpen: any; lang: 'en' | 'fr' }) => {
  return (
    <footer className="mosby-footer">
      {/* Row of Architectural & Design Diagram Symbols (Mosby's Files Style) */}
      <div className="mosby-footer-diagrams-row">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <circle cx="20" cy="20" r="16" />
          <path d="M20 4 L20 36 M4 20 L36 20" strokeDasharray="2 2" />
          <text x="20" y="10" fill="#FFF" fontSize="8" textAnchor="middle" fontFamily="monospace">N</text>
        </svg>

        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <rect x="6" y="6" width="28" height="28" />
          <path d="M6 6 L34 34 M34 6 L6 34" strokeOpacity="0.4" />
        </svg>

        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <polygon points="20,4 36,36 4,36" />
          <line x1="20" y1="4" x2="20" y2="36" />
        </svg>

        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <circle cx="20" cy="20" r="14" />
          <circle cx="20" cy="20" r="6" strokeDasharray="1 2" />
        </svg>

        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <path d="M10 30 L30 10 M30 10 H16 M30 10 V24" />
        </svg>
      </div>

      {/* Useful Links & Contact Grid */}
      <div className="mosby-footer-grid">
        {/* Col 1: Direct Contact */}
        <div>
          <div className="mosby-footer-col-title">01. DIRECT CONTACT</div>
          <div className="mosby-footer-links-list">
            <a href="mailto:dafiashalom@gmail.com" className="mosby-footer-link">
              <Mail size={14} /> dafiashalom@gmail.com
            </a>
            <a href="tel:+2290160359022" className="mosby-footer-link">
              <Phone size={14} /> +229 01 60 35 90 22
            </a>
            <a 
              href="https://assets.calendly.com" 
              onClick={(e) => {
                e.preventDefault();
                if ((window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                } else {
                  window.open('https://calendly.com/dafiashalom/30min', '_blank');
                }
              }} 
              className="mosby-footer-link"
              style={{ color: '#FEF08A' }}
            >
              <Calendar size={14} /> {lang === 'fr' ? 'Réserver un Appel (Calendly)' : 'Book Strategy Call (Calendly)'}
            </a>
          </div>
        </div>

        {/* Col 2: Social & Archives */}
        <div>
          <div className="mosby-footer-col-title">02. SOCIAL ARCHIVES</div>
          <div className="mosby-footer-links-list">
            <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer" className="mosby-footer-link">
              <Linkedin size={14} /> LinkedIn (@dafia-s)
            </a>
            <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer" className="mosby-footer-link">
              <ExternalLink size={14} /> Behance (@shalomsacca)
            </a>
            <a href="https://github.com/shalomtalesman" target="_blank" rel="noopener noreferrer" className="mosby-footer-link">
              <ExternalLink size={14} /> GitHub (@shalomtalesman)
            </a>
          </div>
        </div>

        {/* Col 3: Core Dossiers */}
        <div>
          <div className="mosby-footer-col-title">03. CORE DOSSIERS</div>
          <div className="mosby-footer-links-list">
            <span className="mosby-footer-link" onClick={() => setIsAboutModalOpen(true)} style={{ cursor: 'pointer' }}>
              <FileText size={14} /> Personnel File (About Sacca)
            </span>
            <span className="mosby-footer-link" onClick={() => setCurrentView('experiences')} style={{ cursor: 'pointer' }}>
              <FileText size={14} /> Experiences Field Logs
            </span>
            <span className="mosby-footer-link" onClick={() => setCurrentView('services')} style={{ cursor: 'pointer' }}>
              <FileText size={14} /> Capabilities &amp; Specs
            </span>
            <a 
              href="https://drive.google.com/file/d/14q3ARxXM3rk82VKS6dKYmyGJCk9UWruu/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mosby-footer-link"
            >
              <Download size={14} /> Download CV (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Technical Metadata Bar */}
      <div className="mosby-footer-bottom-bar">
        <div className="mosby-footer-scale-key">
          <span style={{ height: '2px', width: '40px', background: '#FFF', display: 'inline-block' }} />
          <span>0 4 8 16 32 • PRODUCT DESIGN &amp; UX STRATEGY</span>
        </div>

        <div>© 2026 SACCA DAFIA — ALL RIGHTS RESERVED</div>

        <div className="mosby-footer-credit">
          <span>CRAFTED WITH ♥ BY</span>
          <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-anton)', fontSize: '0.9rem', color: '#FFF' }}>SACCA DAFIA</span>
          <svg width="18" height="18" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.8333 16.6667C20.8333 7.46192 28.2953 0 37.5 0C46.7047 0 54.1667 7.46192 54.1667 16.6667V20.8333H58.3333C67.5381 20.8333 75 28.2953 75 37.5C75 46.7047 67.5381 54.1667 58.3333 54.1667H54.1667V58.3333C54.1667 67.5381 46.7047 75 37.5 75C28.2953 75 20.8333 67.5381 20.8333 58.3333V54.1667H16.6667C7.46192 54.1667 0 46.7047 0 37.5C0 28.2953 7.46192 20.8333 16.6667 20.8333H20.8333V16.6667ZM19.7917 38.0208C26.5306 39.6159 35.509 49.3697 37.5 57.2917C39.491 49.3697 48.4694 39.6159 55.2083 38.0208C48.4694 36.4257 39.491 26.6719 37.5 18.75C35.509 26.6719 26.5306 36.4257 19.7917 38.0208Z" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────
   MAIN HOMEPAGE (DIRECT MOSBY'S FILES SCREENSHOT 1 REPRODUCTION WITH ADAPTED LOGO & FOOTER)
───────────────────────────────────────────── */
export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cv' | 'experiences' | 'services' | CaseStudyId>(() => getViewFromHash());
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [activeExpandedFolderRow, setActiveExpandedFolderRow] = useState<number | null>(3);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targetHash = currentView === 'home' ? '' : `#${currentView}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState({ view: currentView }, '', targetHash || window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => setCurrentView(getViewFromHash());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {/* Mosby's Files Centered Header with Adapted Sacca Dafia Brand Logo */}
      <header className="mosby-header">
        <div style={{ width: '60px' }} />
        <div className="mosby-header-logo-container" onClick={() => setCurrentView('home')}>
          <svg width="28" height="28" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="mosby-logo-svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.8333 16.6667C20.8333 7.46192 28.2953 0 37.5 0C46.7047 0 54.1667 7.46192 54.1667 16.6667V20.8333H58.3333C67.5381 20.8333 75 28.2953 75 37.5C75 46.7047 67.5381 54.1667 58.3333 54.1667H54.1667V58.3333C54.1667 67.5381 46.7047 75 37.5 75C28.2953 75 20.8333 67.5381 20.8333 58.3333V54.1667H16.6667C7.46192 54.1667 0 46.7047 0 37.5C0 28.2953 7.46192 20.8333 16.6667 20.8333H20.8333V16.6667ZM19.7917 38.0208C26.5306 39.6159 35.509 49.3697 37.5 57.2917C39.491 49.3697 48.4694 39.6159 55.2083 38.0208C48.4694 36.4257 39.491 26.6719 37.5 18.75C35.509 26.6719 26.5306 36.4257 19.7917 38.0208Z" fill="#FFFFFF"/>
          </svg>
          <span className="mosby-logo-text">SACCA DAFIA</span>
          <span className="mosby-logo-tag">FILES</span>
        </div>
        <div className="mosby-header-nav">
          <span className="mosby-nav-link" onClick={() => setIsAboutModalOpen(true)}>About</span>
          <button className="mosby-lang-toggle" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
            {lang.toUpperCase()}
          </button>
        </div>
      </header>

      {/* About Sheet Modal (Screenshot 3 Direct Reproduction) */}
      <AboutSheetModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} lang={lang} />

      {/* Render Active View */}
      {currentView === 'experiences' && <ExperiencesView setCurrentView={setCurrentView} />}
      {currentView === 'services' && <ServicesView setCurrentView={setCurrentView} />}
      {currentView !== 'home' && currentView !== 'experiences' && currentView !== 'services' && (
        <CaseStudy id={currentView as CaseStudyId} setCurrentView={setCurrentView} lang={lang} />
      )}

      {/* Main Mosby's Files Homepage */}
      {currentView === 'home' && (
        <main>
          {/* Hero Section */}
          <section className="mosby-hero container">
            <h1 className="mosby-hero-title">SACCA DAFIA</h1>
            <p className="mosby-hero-subtitle">
              {lang === 'fr'
                ? 'Un archive de produits numériques, de plateformes SaaS B2B et de design systems conçus au cours de plus de 4 ans de conception produit.'
                : 'A project exploring intuitive digital products, B2B SaaS platforms, and software design systems crafted over 4+ years of product design engineering.'}
            </p>
          </section>

          {/* Interactive Stacked Filing Cabinet (Exact Mosby's Files Screenshot 1 Reproduction) */}
          <section className="mosby-filing-cabinet">
            {/* ROW 1: Blue Folder (#1D4ED8) — PROJECTS & CASE STUDIES */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-blue" onClick={() => setCurrentView('asset-iq')}>
                  Asset IQ
                </div>
                <div className="mosby-tab mosby-tab-red" onClick={() => setCurrentView('ehadj')}>
                  eHadj
                </div>
                <div className="mosby-tab mosby-tab-green" onClick={() => setCurrentView('beans')}>
                  Beans
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#1D4ED8' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 0 ? null : 0)}
              >
                <div className="mosby-folder-category-label">
                  B2B SaaS &amp; Process Orchestration &lt;
                </div>
              </div>

              {activeExpandedFolderRow === 0 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#1D4ED8' }}>
                  <div className="mosby-expanded-grid">
                    <div>
                      <p className="mosby-expanded-desc">
                        Systemic digital products for operational resource governance, national-scale multi-organization logistics orchestration, and Shopify/Klaviyo integration hubs.
                      </p>

                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('asset-iq')}>
                          <span>OPEN FILE: ASSET IQ →</span>
                        </button>
                        <a 
                          href="https://www.assetiQ.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="mosby-expanded-open-btn"
                          style={{ background: 'var(--mosby-yellow)', color: '#000' }}
                        >
                          <ExternalLink size={14} /> <span>VISITER LE SITE LIVE ↗</span>
                        </a>
                      </div>
                    </div>
                    <div className="mosby-expanded-preview-frame">
                      <img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 2: Green Folder (#059669) — DESIGN SYSTEMS & IMMERSIVE WEB */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-purple" onClick={() => setCurrentView('sagana')}>
                  Sagana
                </div>
                <div className="mosby-tab mosby-tab-yellow" onClick={() => setCurrentView('vortex')}>
                  Vortex Gallery
                </div>
                <div className="mosby-tab mosby-tab-black" onClick={() => setCurrentView('sport-advisor')}>
                  Sport Advisor
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#059669' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 1 ? null : 1)}
              >
                <div className="mosby-folder-category-label">
                  Modular Design Systems &amp; Immersive Web &lt;
                </div>
              </div>

              {activeExpandedFolderRow === 1 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#059669' }}>
                  <div className="mosby-expanded-grid">
                    <div>
                      <p className="mosby-expanded-desc">
                        High-performance modular design systems, digital agency showcase sites, Web3 interactive art galleries, and athletic coaching mobile apps.
                      </p>
                      <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('sagana')}>
                        <span>OPEN FILE: SAGANA →</span>
                      </button>
                    </div>
                    <div className="mosby-expanded-preview-frame">
                      <img src="/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png" alt="Sagana" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 3: Purple Folder (#7C3AED) — SHOWCASE & E-COMMERCE */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-red" onClick={() => setCurrentView('truvox')}>
                  Truvox Studio
                </div>
                <div className="mosby-tab mosby-tab-blue" onClick={() => setCurrentView('dolce-riviera')}>
                  Dolce Riviera
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#7C3AED' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 2 ? null : 2)}
              >
                <div className="mosby-folder-category-label">
                  Digital Studio Showcase &amp; Luxury E-Commerce &lt;
                </div>
              </div>

              {activeExpandedFolderRow === 2 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#7C3AED' }}>
                  <div className="mosby-expanded-grid">
                    <div>
                      <p className="mosby-expanded-desc">
                        Crafting high-end luxury e-commerce brand experiences, landing page concepts, and digital product studio showcase portals.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('truvox')}>
                          <span>OPEN FILE: TRUVOX STUDIO →</span>
                        </button>
                        <a 
                          href="https://www.truvox.studio/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="mosby-expanded-open-btn"
                          style={{ background: 'var(--mosby-yellow)', color: '#000' }}
                        >
                          <ExternalLink size={14} /> <span>VISITER LE SITE LIVE ↗</span>
                        </a>
                      </div>
                    </div>
                    <div className="mosby-expanded-preview-frame">
                      <img src="/imgs/truvox_cover.png" alt="Truvox Studio" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 4: Red Folder (#DC2626 - DESIGNER PROFILE & CAREER) */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-yellow" onClick={() => setIsAboutModalOpen(true)}>
                  About Sacca
                </div>
                <div className="mosby-tab mosby-tab-blue" onClick={() => setCurrentView('experiences')}>
                  Experiences Log
                </div>
                <div className="mosby-tab mosby-tab-green" onClick={() => setCurrentView('services')}>
                  Services Specs
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#DC2626' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 3 ? null : 3)}
              >
                <div className="mosby-folder-category-label">
                  Personnel File &amp; Designer Profile <ChevronDown size={14} style={{ marginLeft: '4px' }} />
                </div>
              </div>

              {activeExpandedFolderRow === 3 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#DC2626' }}>
                  <div className="mosby-expanded-grid">
                    <div>
                      <p className="mosby-expanded-desc">
                        Sacca Dafia — Product &amp; Solution Designer (+4 yrs exp). Explore detailed background, career experience logs, and core capability specifications.
                      </p>
                      <button className="mosby-expanded-open-btn" onClick={() => setIsAboutModalOpen(true)}>
                        <span>OPEN ABOUT DOSSIER →</span>
                      </button>
                    </div>
                    <div className="mosby-expanded-preview-frame">
                      <img src="/imgs/hero_image.png" alt="Sacca Dafia Profile" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Mosby's Files Archival Footer System */}
          <MosbyFooter setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
        </main>
      )}
    </>
  );
}
'''

with open('src/App.tsx', 'w') as f:
    f.write(app_content)

print("Updated App.tsx with rich project details, live CTA buttons, and wider cabinet layout.")
