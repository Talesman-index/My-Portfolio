import { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Mail,
  Calendar,
  Linkedin,
  ExternalLink,
  Layers,
  Menu,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import './App.css';
import { caseStudiesData, CaseStudyId } from './caseStudiesData';
import PageTurnOverlay from './components/PageTurnOverlay';
import GlassMonogram from './components/GlassMonogram';
import HeroSignature from './components/HeroSignature';
import { GlassServiceVisual } from './components/ServiceGlassVisuals';





const LangSwitchControl = ({ lang, onToggle, isMobile }: { lang: 'en' | 'fr'; onToggle: () => void; isMobile?: boolean }) => (
  <button 
    className="lang-segmented-switch" 
    onClick={onToggle}
    type="button"
    aria-label="Switch Language FR / EN"
    style={isMobile ? { width: '100%', marginBottom: '12px', justifyContent: 'center' } : undefined}
  >
    <span className={`lang-segmented-option ${lang === 'fr' ? 'is-active' : ''}`}>FR</span>
    <span className="lang-segmented-divider">/</span>
    <span className={`lang-segmented-option ${lang === 'en' ? 'is-active' : ''}`}>EN</span>
  </button>
);

const VALID_PROJECT_IDS: CaseStudyId[] = ['asset-iq', 'ehadj', 'beans', 'sagana', 'vortex', 'sport-advisor', 'truvox', 'tavares', 'the-refuge', 'strategy-arena', 'dolce-riviera'];

function getViewFromHash(): 'home' | 'cv' | 'experiences' | 'services' | 'all-projects' | CaseStudyId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  if (hash === 'cv') return 'cv';
  if (hash === 'experiences') return 'experiences';
  if (hash === 'services') return 'services';
  if (hash === 'all-projects' || hash === 'projects') return 'all-projects';
  if (VALID_PROJECT_IDS.includes(hash as CaseStudyId)) return hash as CaseStudyId;
  return 'home';
}

const navigateToHome = (setCurrentView: any) => {
  setCurrentView('home');
  if (typeof window !== 'undefined') {
    window.history.pushState({ view: 'home' }, '', window.location.pathname);
    window.scrollTo(0, 0);
  }
};

const PROJECT_CONFIGS: Record<string, { title: string; color: string; categoryLabel: string; year: string; externalLink?: string }> = {
  'asset-iq': { title: 'Asset IQ', color: '#1D4ED8', categoryLabel: 'B2B SaaS & Resource Telemetry', year: '2026', externalLink: 'https://www.assetiQ.com' },
  'ehadj': { title: 'eHadj', color: '#DC2626', categoryLabel: 'Logistics & Process Orchestration', year: '2026', externalLink: 'https://ehadj.aglo.bj/' },
  'beans': { title: 'Beans', color: '#059669', categoryLabel: 'Customer Engagement & Integrations', year: '2025', externalLink: 'https://trybeans.com' },
  'truvox': { title: 'Truvox Studio', color: '#059669', categoryLabel: 'Digital Studio Web Experience', year: '2025', externalLink: 'https://www.truvox.studio/' },
  'tavares': { title: 'Tavares', color: '#E50914', categoryLabel: 'Cinematic Interactive Portfolio', year: '2025', externalLink: 'https://portfolio-tavares.vercel.app/' },
  'strategy-arena': { title: 'Strategy Arena', color: '#1E3A8A', categoryLabel: 'Strategic Consulting & Transformation', year: '2026', externalLink: 'https://talesmanwebcraft.vercel.app/#strategy-arena' },
  'dolce-riviera': { title: 'Dolce Riviera', color: '#C5A059', categoryLabel: 'Luxury Hospitality UI/UX Interface', year: '2025', externalLink: 'https://talesmanwebcraft.vercel.app/#dolce-riviera' },
  'sagana': { title: 'Sagana', color: '#7C3AED', categoryLabel: 'Modular Design Systems', year: '2025', externalLink: 'https://www.sagana-agency.com/' },
  'the-refuge': { title: 'The Refuge', color: '#0D3479', categoryLabel: 'Humanitarian Impact Portal', year: '2025', externalLink: 'https://your-refuge.vercel.app/' },
  'vortex': { title: 'Vortex Gallery', color: '#EAB308', categoryLabel: 'Immersive Web3 Exhibition', year: '2024', externalLink: 'https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel' },
  'sport-advisor': { title: 'Sport Advisor', color: '#000000', categoryLabel: 'Mobile App & Athletic Engine', year: '2024', externalLink: 'https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive' }
};
/* ─────────────────────────────────────────────
   ABOUT SHEET MODAL (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const AboutSheetModal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: 'en' | 'fr' }) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  return (
    <div className={`v2-modal-overlay ${isClosing ? 'is-closing' : ''}`} onClick={handleClose}>
      <div className={`v2-modal-sheet ${isClosing ? 'is-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="v2-modal-close-btn" onClick={handleClose} aria-label="Fermer">
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* Left Column: Big Bold Quote + Dual Photo Cards */}
          <div>
            <span className="v2-subpage-eyebrow">
              {lang === 'fr' ? 'DOSSIER PERSONNEL' : 'PERSONNEL DOSSIER'}
            </span>
            <h2 style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#FFFFFF', lineHeight: 1.1, margin: '8px 0 24px 0', letterSpacing: '0.02em' }}>
              {lang === 'fr' 
                ? "LE DESIGN NUMÉRIQUE EST L'ALLIANCE DE LA RIGUEUR PRODUIT ET DE L'ÉLÉGANCE WEB."
                : "DIGITAL DESIGN IS THE FUSION OF PRODUCT RIGOR AND WEB ELEGANCE."}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Photo 1: B&W Executive Office */}
              <div style={{ background: 'rgba(5, 8, 16, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', overflow: 'hidden' }}>
                <img src="/imgs/hero_image.png" alt="Sacca Dafia Executive" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', filter: 'grayscale(100%) contrast(110%)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94A3B8', marginTop: '10px', lineHeight: 1.4 }}>
                  <strong style={{ color: '#FFFFFF' }}>01. EXECUTIVE DOSSIER</strong> <br />
                  Sacca Dafia · Talesman
                </div>
              </div>

              {/* Photo 2: Warm Ambient Workspace */}
              <div style={{ background: 'rgba(5, 8, 16, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', overflow: 'hidden' }}>
                <img src="/imgs/vibe_coding_setup.jpg" alt="Vibe Coding Setup" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#38BDF8', marginTop: '10px', lineHeight: 1.4 }}>
                  <strong style={{ color: '#FFFFFF' }}>02. VIBE CODING</strong> <br />
                  Rapid MVP Prototyping
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text + Core Skills + Signature */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.02rem', lineHeight: 1.7, color: '#CBD5E1', marginBottom: '20px' }}>
              {lang === 'fr'
                ? "En tant que Web Designer & Product Designer (connu sous le pseudo Talesman), je façonne des produits numériques à la fois beaux, intuitifs et hautement fonctionnels. En complément, ma maîtrise du Vibe Coding me permet de proposer des MVPs rapides et interactifs, offrant ainsi aux clients une meilleure validation terrain et un test utilisateur réel dès les premières phases du projet."
                : "As a Web Designer & Product Designer (known by the pseudonym Talesman), I craft digital products that are elegant, intuitive, and highly functional. As a value-added skill, my Vibe Coding capabilities allow me to quickly deliver interactive MVPs to clients for faster user validation and real-world testing."}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.5 }}>
                <span style={{ color: '#38BDF8', fontWeight: 800 }}>▸</span>
                <span><strong style={{ color: '#FFFFFF' }}>Product Design :</strong> {lang === 'fr' ? "Plateformes SaaS B2B complexes, architecture d'information et rédaction de PRDs." : "Complex B2B SaaS platforms, information architecture, and PRD specifications."}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.5 }}>
                <span style={{ color: '#C084FC', fontWeight: 800 }}>▸</span>
                <span><strong style={{ color: '#FFFFFF' }}>Web Design :</strong> {lang === 'fr' ? "Direction artistique haut de gamme, vitrines d'exception et e-commerce sur mesure." : "High-end art direction, luxury showcase sites, and custom e-commerce experiences."}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.5 }}>
                <span style={{ color: '#34D399', fontWeight: 800 }}>▸</span>
                <span><strong style={{ color: '#FFFFFF' }}>Vibe Coding &amp; MVPs :</strong> {lang === 'fr' ? "Prototypage interactif fonctionnel pour tester rapidement les concepts auprès d'utilisateurs réels." : "Functional interactive prototyping allowing clients to quickly validate concepts with real users."}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.5 }}>
                <span style={{ color: '#F59E0B', fontWeight: 800 }}>▸</span>
                <span><strong style={{ color: '#FFFFFF' }}>Design Systems :</strong> {lang === 'fr' ? "Composants modulaires Figma/React et supervision technique dev." : "Modular Figma/React UI systems and dev team supervision."}</span>
              </li>
            </ul>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.4rem', color: '#FFFFFF', letterSpacing: '0.02em' }}>
                  Sacca Dafia <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#38BDF8', fontWeight: 'bold' }}>(Talesman)</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748B' }}>
                  Web &amp; Product Designer · Rapid MVP Prototyping
                </div>
              </div>

              <button 
                className="v2-contact-primary-btn"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                onClick={() => {
                  handleClose();
                  if ((window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                  } else {
                    window.open('https://calendly.com/dafiashalom/30min', '_blank');
                  }
                }}
              >
                <span>Let's Connect</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CASE STUDY DOSSIER VIEW (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const CaseStudy = ({ 
  id, 
  setCurrentView, 
  lang 
}: { 
  id: CaseStudyId; 
  setCurrentView: any; 
  lang: 'en' | 'fr'; 
}) => {
  const data = caseStudiesData[lang][id] || caseStudiesData['fr']['asset-iq'];
  const config = PROJECT_CONFIGS[id] || { title: data.title, color: '#1D4ED8', categoryLabel: 'Design Dossier', year: '2026' };
  const liveUrl = data.externalLink || config.externalLink || 'https://www.truvox.studio/';

  const allKeys = Object.keys(PROJECT_CONFIGS) as CaseStudyId[];
  const currentIndex = allKeys.indexOf(id);
  const nextId = allKeys[(currentIndex + 1) % allKeys.length];
  const nextConfig = PROJECT_CONFIGS[nextId];

  return (
    <div className="v2-subpage-wrapper">
      <div className="v2-subpage-ambient-glow" style={{ background: `radial-gradient(circle, ${config.color}25 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)` }} />

      <div className="v2-subpage-container">
        {/* Top Back Navigation Button */}
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="v2-subpage-back-btn"
        >
          <ArrowLeft size={16} /> <span>{lang === 'fr' ? 'RETOUR AU PORTFOLIO' : 'BACK TO PORTFOLIO'}</span>
        </button>

        {/* Hero Banner Card */}
        <div className="v2-dossier-hero">
          <div className="v2-dossier-grid-top">
            {/* Left Preview Box with Project Cover & Live CTA */}
            <div className="v2-dossier-portrait-box">
              <img src={data.contextImg || data.bgImage || "/imgs/hero_image.png"} alt={data.title} className="v2-dossier-portrait-img" />
              
              <div className="v2-dossier-meta-list">
                <div><strong>REGISTRATION:</strong> SD-{id.toUpperCase()}</div>
                <div><strong>TIMELINE:</strong> {config.year}</div>
                <div><strong>CATEGORY:</strong> {data.label}</div>
              </div>

              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="v2-dossier-live-btn"
              >
                <span>{lang === 'fr' ? 'VISITER LE PROJET LIVE' : 'VISIT LIVE PROJECT'}</span>
                <ExternalLink size={15} />
              </a>
            </div>

            {/* Right Details */}
            <div>
              <span className="v2-subpage-eyebrow" style={{ color: config.color }}>
                {config.categoryLabel}
              </span>
              <h1 className="v2-subpage-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', marginBottom: '20px' }}>
                {data.title}
              </h1>

              <p className="v2-dossier-brief-text">
                {data.context}
              </p>
              <p className="v2-dossier-brief-text" style={{ color: '#94A3B8', fontSize: '1.02rem' }}>
                {data.challenge}
              </p>

              {/* Technical Specs Grid */}
              <div className="v2-dossier-specs-grid">
                <div className="v2-dossier-spec-item">
                  <div className="spec-label">ROLE</div>
                  <div className="spec-val">Web &amp; Product Designer</div>
                </div>
                <div className="v2-dossier-spec-item">
                  <div className="spec-label">SCOPE</div>
                  <div className="spec-val">{data.label}</div>
                </div>
                <div className="v2-dossier-spec-item">
                  <div className="spec-label">DELIVERABLES</div>
                  <div className="spec-val">UI/UX, Design Tokens &amp; Specs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discovery, Solution & Interface Artifacts Grid */}
        <div className="v2-dossier-artifacts-grid">
          {/* Card 01: Discovery & Insight */}
          <div className="v2-dossier-artifact-card">
            <div className="v2-dossier-artifact-title" style={{ color: '#38BDF8' }}>
              01. DISCOVERY &amp; INSIGHT
            </div>
            <p className="v2-dossier-artifact-text">
              "{data.insight}"
            </p>
            {data.challengeImg && (
              <img src={data.challengeImg} alt="Discovery Artifact" className="v2-dossier-artifact-img" />
            )}
          </div>

          {/* Card 02: System Solution */}
          <div className="v2-dossier-artifact-card">
            <div className="v2-dossier-artifact-title" style={{ color: '#C084FC' }}>
              02. SYSTEM ARCHITECTURE
            </div>
            <p className="v2-dossier-artifact-text">
              {data.solution || data.uxSolutions}
            </p>
            {data.dashboardImg && (
              <img src={data.dashboardImg} alt="Solution Artifact" className="v2-dossier-artifact-img" />
            )}
          </div>

          {/* Card 03: Polished UI */}
          {data.interfaceImg && (
            <div className="v2-dossier-artifact-card">
              <div className="v2-dossier-artifact-title" style={{ color: '#34D399' }}>
                03. POLISHED INTERFACE
              </div>
              <p className="v2-dossier-artifact-text">
                {data.conclusion}
              </p>
              <img src={data.interfaceImg} alt="Interface Showcase" className="v2-dossier-artifact-img" />
            </div>
          )}
        </div>

        {/* Detailed System Features */}
        {data.features && data.features.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={22} color={config.color} />
              <span>SYSTEMIC FEATURES &amp; CAPABILITIES</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {data.features.map((feat, idx) => (
                <div key={idx} style={{ padding: '24px', background: 'rgba(10, 16, 28, 0.75)', borderLeft: `4px solid ${config.color}`, borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderRight: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '0 12px 12px 0' }}>
                  <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '6px' }}>{feat.title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.5 }}>{feat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Measurable Outcomes */}
        <div style={{ marginTop: '50px', background: 'rgba(10, 16, 28, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '36px' }}>
          <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '20px' }}>
            MEASURABLE IMPACT &amp; OUTCOMES
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {data.impact.map((imp, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#E2E8F0' }}>
                <CheckCircle2 size={18} color="#38BDF8" style={{ flexShrink: 0 }} />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div 
          className="v2-dossier-next-bar" 
          onClick={() => setCurrentView(nextId)}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>
              {lang === 'fr' ? 'DOSSIER SUIVANT →' : 'NEXT CASE STUDY →'}
            </div>
            <div className="v2-dossier-next-title">{nextConfig.title}</div>
          </div>
          <ArrowRight size={28} color="#38BDF8" />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   EXPERIENCES DOSSIER VIEW (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const ExperiencesView = ({ setCurrentView }: { setCurrentView: any }) => {
  return (
    <div className="v2-subpage-wrapper">
      <div className="v2-subpage-ambient-glow" />

      <div className="v2-subpage-container">
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="v2-subpage-back-btn"
        >
          <ArrowLeft size={16} /> <span>RETOUR AU PORTFOLIO</span>
        </button>

        <div className="v2-subpage-header">
          <div>
            <span className="v2-subpage-eyebrow">PARCOURS PROFESSIONNEL &amp; EXPÉRIENCES</span>
            <h1 className="v2-subpage-title">REGISTRE DES EXPÉRIENCES</h1>
          </div>
        </div>

        <div className="v2-timeline-container" style={{ margin: '30px auto 0 auto' }}>
          {/* 01. CACTUCE */}
          <div className="v2-timeline-card">
            <div className="v2-timeline-node node-red">
              <div className="v2-timeline-node-inner" />
            </div>
            <div className="v2-timeline-body">
              <div className="v2-timeline-header-row">
                <div className="v2-timeline-title-group">
                  <span className="v2-timeline-company">CACTUCE</span>
                  <span className="v2-timeline-role-badge">Product Designer</span>
                </div>
                <span className="v2-timeline-date">Octobre 2025 — Mai 2026</span>
              </div>
              <div className="v2-timeline-tagline">
                B2B SAAS ARCHITECTURE &amp; PROCESS OPTIMIZATION
              </div>
              <ul className="v2-timeline-bullets">
                <li>Lead Product Designer chargé de l'optimisation des produits <strong>eHadj</strong> (logistique nationale) et <strong>Asset IQ</strong> (télémétrie industrielle).</li>
                <li>Identification et élimination chirurgicale des frictions dans l'expérience utilisateur et les parcours multi-acteurs.</li>
                <li>Définition précise des parcours utilisateurs, création du Design System Figma Tokens et supervision complète du processus d'assurance qualité (QA).</li>
              </ul>
              <div className="v2-timeline-impact-pill">
                RÉSULTAT : 90% d'erreurs en moins &amp; zéro doublon de dossier
              </div>
              <div className="v2-timeline-tools-row">
                <span className="v2-timeline-tool-tag">Product Design</span>
                <span className="v2-timeline-tool-tag">Figma Tokens</span>
                <span className="v2-timeline-tool-tag">QA Recipe</span>
                <span className="v2-timeline-tool-tag">eHadj &amp; Asset IQ</span>
              </div>
            </div>
          </div>

          {/* 02. TRELLIX */}
          <div className="v2-timeline-card">
            <div className="v2-timeline-node node-blue">
              <div className="v2-timeline-node-inner" />
            </div>
            <div className="v2-timeline-body">
              <div className="v2-timeline-header-row">
                <div className="v2-timeline-title-group">
                  <span className="v2-timeline-company">TRELLIX</span>
                  <span className="v2-timeline-role-badge badge-blue">Lead Product Designer</span>
                </div>
                <span className="v2-timeline-date">Février 2024 — Septembre 2025</span>
              </div>
              <div className="v2-timeline-tagline" style={{ color: '#60A5FA' }}>
                ENTERPRISE SAAS &amp; PRODUCT STRATEGY LEADERSHIP
              </div>
              <ul className="v2-timeline-bullets">
                <li>Direction et leadership de l'équipe design pour façonner des solutions SaaS B2B complexes centrées sur l'utilisateur.</li>
                <li>Rédaction intégrale des Product Requirement Documents (PRDs), spécifications fonctionnelles &amp; API, et gestion des cycles de recherche utilisateur.</li>
                <li>Mise en place de standards de livraison dev-handoff ayant augmenté la vélocité de développement de +50%.</li>
              </ul>
              <div className="v2-timeline-impact-pill pill-blue">
                RÉSULTAT : +50% de vélocité de dev via PRDs &amp; specs fonctionnelles
              </div>
              <div className="v2-timeline-tools-row">
                <span className="v2-timeline-tool-tag">PRD Writing</span>
                <span className="v2-timeline-tool-tag">Team Leadership</span>
                <span className="v2-timeline-tool-tag">User Research</span>
                <span className="v2-timeline-tool-tag">B2B SaaS</span>
              </div>
            </div>
          </div>

          {/* 03. CREAFIX */}
          <div className="v2-timeline-card">
            <div className="v2-timeline-node node-green">
              <div className="v2-timeline-node-inner" />
            </div>
            <div className="v2-timeline-body">
              <div className="v2-timeline-header-row">
                <div className="v2-timeline-title-group">
                  <span className="v2-timeline-company">CREAFIX</span>
                  <span className="v2-timeline-role-badge badge-green">Web Designer</span>
                </div>
                <span className="v2-timeline-date">Août 2022 — Février 2024</span>
              </div>
              <div className="v2-timeline-tagline" style={{ color: '#34D399' }}>
                WEB ART DIRECTION &amp; BRAND EXPERIENCE
              </div>
              <ul className="v2-timeline-bullets">
                <li>Conception d'interfaces web d'exception et de vitrines interactives pour +15 clients et agences internationales.</li>
                <li>Direction artistique web, typographie éditoriale, animations 60fps et optimisation responsive multi-supports.</li>
                <li>Participation et contribution active aux campagnes de marketing digital et à l'optimisation des taux de conversion.</li>
              </ul>
              <div className="v2-timeline-impact-pill pill-green">
                RÉSULTAT : +15 vitrines web &amp; e-commerce livrées avec succès
              </div>
              <div className="v2-timeline-tools-row">
                <span className="v2-timeline-tool-tag">Web Art Direction</span>
                <span className="v2-timeline-tool-tag">Responsive UI</span>
                <span className="v2-timeline-tool-tag">E-Commerce</span>
                <span className="v2-timeline-tool-tag">Micro-Animations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SERVICES DOSSIER VIEW (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const ServicesView = ({ 
  setCurrentView, 
  lang = 'fr' 
}: { 
  setCurrentView: any; 
  lang?: 'en' | 'fr'; 
}) => {
  return (
    <div className="v2-subpage-wrapper">
      <div className="v2-subpage-ambient-glow" />

      <div className="v2-subpage-container">
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="v2-subpage-back-btn"
        >
          <ArrowLeft size={16} /> <span>{lang === 'fr' ? 'RETOUR AU PORTFOLIO' : 'BACK TO PORTFOLIO'}</span>
        </button>

        <div className="v2-subpage-header">
          <div>
            <span className="v2-subpage-eyebrow">CAPABILITIES &amp; EXPERTISES</span>
            <h1 className="v2-subpage-title">SERVICES &amp; SOLUTIONS</h1>
          </div>
        </div>

        <div className="v2-services-grid" style={{ marginTop: '20px' }}>
          {/* CARD 01: SAAS & PRODUCT DESIGN */}
          <div className="v2-service-card card-glow-cyan">
            <div className="v2-service-card-top">
              <div className="v2-service-header-spec">
                <span className="v2-service-idx">// 01</span>
                <span className="v2-service-category-tag">SAAS · PRODUCT SYSTEMS</span>
              </div>
              <div className="v2-service-status-node">
                <span className="v2-status-dot dot-cyan"></span>
                <span className="v2-status-label">ACTIVE_SPEC</span>
              </div>
            </div>

            <div className="v2-service-visual-stage">
              <GlassServiceVisual type="saas" />
            </div>
            
            <div className="v2-service-body">
              <h3 className="v2-service-card-title">
                {lang === 'fr' ? 'UI/UX & Design Produit (B2B SaaS)' : 'UI/UX & Product Design (B2B SaaS)'}
              </h3>

              <p className="v2-service-card-desc">
                {lang === 'fr'
                  ? "Architecture de l'information complexe, tunnels d'activation sans friction, tableaux de bord de télémétrie et design systems Figma prêts pour l'ingénierie."
                  : "Complex information architecture, frictionless onboarding funnels, telemetry dashboards, and scalable Figma design systems ready for engineering."}
              </p>
            </div>

            <div className="v2-service-tags">
              <span className="v2-service-tag">[FIGMA_VARIABLES]</span>
              <span className="v2-service-tag">[USER_FLOWS]</span>
              <span className="v2-service-tag">[TELEMETRY_DASH]</span>
              <span className="v2-service-tag">[DATA_VIZ]</span>
            </div>
          </div>

          {/* CARD 02: ART DIRECTION & WEB DESIGN */}
          <div className="v2-service-card card-glow-yellow">
            <div className="v2-service-card-top">
              <div className="v2-service-header-spec">
                <span className="v2-service-idx">// 02</span>
                <span className="v2-service-category-tag">WEB CRAFT · ART DIRECTION</span>
              </div>
              <div className="v2-service-status-node">
                <span className="v2-status-dot dot-yellow"></span>
                <span className="v2-status-label">ACTIVE_SPEC</span>
              </div>
            </div>

            <div className="v2-service-visual-stage">
              <GlassServiceVisual type="craft" />
            </div>

            <div className="v2-service-body">
              <h3 className="v2-service-card-title">
                {lang === 'fr' ? 'Direction Artistique & Web Design' : 'Art Direction & Web Design'}
              </h3>

              <p className="v2-service-card-desc">
                {lang === 'fr'
                  ? "Vitrines de marque immersives, typographie éditoriale sur mesure, animations de storytelling fluides et interfaces de conversion à fort impact visuel."
                  : "Immersive brand showcase websites, custom editorial typography, fluid storytelling animations, and conversion-focused digital experiences."}
              </p>
            </div>

            <div className="v2-service-tags">
              <span className="v2-service-tag">[ART_DIRECTION]</span>
              <span className="v2-service-tag">[3D_SPATIAL_MOTION]</span>
              <span className="v2-service-tag">[EDITORIAL_TYPE]</span>
              <span className="v2-service-tag">[HIGH_CONVERSION]</span>
            </div>
          </div>

          {/* CARD 03: VIBE CODING & RAPID MVP */}
          <div className="v2-service-card card-glow-green">
            <div className="v2-service-card-top">
              <div className="v2-service-header-spec">
                <span className="v2-service-idx">// 03</span>
                <span className="v2-service-category-tag">VIBE CODING · RAPID MVP</span>
              </div>
              <div className="v2-service-status-node">
                <span className="v2-status-dot dot-green"></span>
                <span className="v2-status-label">ACTIVE_SPEC</span>
              </div>
            </div>

            <div className="v2-service-visual-stage">
              <GlassServiceVisual type="code" />
            </div>

            <div className="v2-service-body">
              <h3 className="v2-service-card-title">
                {lang === 'fr' ? 'Vibe Coding & Prototypage Rapide' : 'Vibe Coding & Rapid MVP Prototyping'}
              </h3>

              <p className="v2-service-card-desc">
                {lang === 'fr'
                  ? "Prototypage fonctionnel ultra-rapide (React, TypeScript, Vite/Next) pour tester concrètement vos idées, valider l'UX auprès d'utilisateurs réels et convaincre vos investisseurs."
                  : "Ultra-fast functional software prototyping (React, TypeScript, Next/Vite) to validate UX with real users, pitch investors, and bridge the gap between design and production."}
              </p>
            </div>

            <div className="v2-service-tags">
              <span className="v2-service-tag">[REACT_19]</span>
              <span className="v2-service-tag">[GOOGLE_AI_STUDIO]</span>
              <span className="v2-service-tag">[RAPID_PROTOTYPE]</span>
              <span className="v2-service-tag">[EDGE_DEPLOY]</span>
            </div>
          </div>

          {/* CARD 04: DESIGN SYSTEMS & DEV HANDOFF */}
          <div className="v2-service-card card-glow-purple">
            <div className="v2-service-card-top">
              <div className="v2-service-header-spec">
                <span className="v2-service-idx">// 04</span>
                <span className="v2-service-category-tag">DESIGN SYSTEMS · HANDOFF</span>
              </div>
              <div className="v2-service-status-node">
                <span className="v2-status-dot dot-purple"></span>
                <span className="v2-status-label">ACTIVE_SPEC</span>
              </div>
            </div>

            <div className="v2-service-visual-stage">
              <GlassServiceVisual type="system" />
            </div>

            <div className="v2-service-body">
              <h3 className="v2-service-card-title">
                {lang === 'fr' ? 'Design Systems & Handoff Ingénieur' : 'Design Systems & Engineering Hand-off'}
              </h3>

              <p className="v2-service-card-desc">
                {lang === 'fr'
                  ? "Bibliothèques de composants UI réutilisables, gouvernance de tokens, accessibilité WCAG et alignement designer-développeur pour éliminer toute friction d'intégration."
                  : "Reusable UI component libraries, design token governance, WCAG accessibility, and airtight designer-developer alignment to eliminate hand-off friction."}
              </p>
            </div>

            <div className="v2-service-tags">
              <span className="v2-service-tag">[TOKEN_GOVERNANCE]</span>
              <span className="v2-service-tag">[WCAG_AAA]</span>
              <span className="v2-service-tag">[STORYBOOK]</span>
              <span className="v2-service-tag">[DEV_HANDOFF]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ALL PROJECTS DOSSIER VIEW (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const AllProjectsView = ({ 
  setCurrentView, 
  lang 
}: { 
  setCurrentView: any; 
  lang: 'en' | 'fr'; 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'saas' | 'mobile' | 'web'>('all');

  const allProjects = [
    { id: 'asset-iq', title: 'Asset IQ', category: 'saas', tag: 'Product Design & SaaS', date: '2026', img: '/imgs/assetiQ/cover_Asset.jpg', color: '#1D4ED8', desc: lang === 'fr' ? 'Gouvernance et télémétrie des actifs physiques industriels multi-sites par QR code.' : 'Multi-site industrial physical asset telemetry via QR codes.', deliverables: ['QR Code Telemetry', 'Figma Tokens', 'Asset Governance'] },
    { id: 'ehadj', title: 'eHadj', category: 'saas', tag: 'National Logistics SaaS', date: '2026', img: '/imgs/ehadj/cover_Ehadj.jpg', color: '#EAB308', desc: lang === 'fr' ? 'Orchestration digitale du pèlerinage au Bénin pour +30 agences et ministères.' : 'Digital orchestration of national pilgrimage logistics in Benin.', deliverables: ['Multi-agency Workflows', 'NPI Onboarding', 'Quota Tracking'] },
    { id: 'beans', title: 'Beans', category: 'saas', tag: 'B2B SaaS Engagement', date: '2025', img: '/imgs/beans_cover.png', color: '#059669', desc: lang === 'fr' ? 'Plateforme SaaS B2B de fidélisation client & hub de 10 connecteurs e-commerce.' : 'B2B SaaS customer engagement platform & integration hub.', deliverables: ['10 Connector Hub', 'Shopify & Klaviyo', 'PRD Specs & QA'] },
    { id: 'dolce-riviera', title: 'Dolce Riviera', category: 'web', tag: 'Luxury Hospitality UI/UX Interface', date: '2025', img: '/imgs/dolce_cover.png', color: '#C5A059', desc: lang === 'fr' ? 'Interface UI/UX d\'exception & landing page pour un hôtel de luxe sur la Riviera.' : 'Luxury hospitality UI/UX interface concept & booking funnel.', deliverables: ['UI/UX Design System', 'Booking Funnel UI', 'Fluid Luxury Typography'] },
    { id: 'vortex', title: 'Vortex', category: 'mobile', tag: 'Mobile UX & Fuel Wallet', date: '2026', img: '/imgs/vortex.webp', color: '#D97706', desc: lang === 'fr' ? 'Application mobile d\'achat de carburant et de gestion de portefeuille numérique.' : 'Mobile fuel purchasing & digital wallet management app.', deliverables: ['1-Click Purchasing', 'QR Station Code', 'High Contrast UI'] },
    { id: 'strategy-arena', title: 'Strategy Arena', category: 'web', tag: 'Branding & Web Strategy', date: '2026', img: '/imgs/Strategy-Arena.png', color: '#EAB308', desc: lang === 'fr' ? 'Cabinet de conseil en stratégie, organisation & transformation digitale pour PME.' : 'Strategy & digital transformation consulting agency platform.', deliverables: ['Canary Yellow Brand', 'Preloader Animation', 'CRO Tunnel'] },
    { id: 'truvox', title: 'Truvox Studio', category: 'web', tag: 'Web Design & Studio', date: '2025', img: '/imgs/truvox_cover.png', color: '#10B981', desc: lang === 'fr' ? 'Expériences numériques d\'exception, stratégie de marque & développement.' : 'High-end studio brand experience, web design & development.', deliverables: ['Brand Strategy', 'Quote Tunnel', 'Performance Web'] },
    { id: 'sport-advisor', title: 'Sport Advisor', category: 'mobile', tag: 'AI & Data Visualization', date: '2025', img: '/imgs/advisor.webp', color: '#00FA9A', desc: lang === 'fr' ? 'Plateforme d\'analyse et de pronostics sportifs basés sur l\'intelligence artificielle.' : 'AI-driven sports analysis & data visualization platform.', deliverables: ['AI Prediction Engine', 'Odds Comparer', 'Confidence Gauges'] },
    { id: 'sagana', title: 'Sagana Agency', category: 'web', tag: 'Web Art Direction', date: '2025', img: '/imgs/sagana.png', color: '#F59E0B', desc: lang === 'fr' ? 'Site vitrine d\'excellence pour agence de conseil stratégique haut de gamme.' : 'High-end showcase site for elite advisory agency.', deliverables: ['Editorial Layout', 'High-end Branding', 'Micro-interactions'] },
    { id: 'tavares', title: 'Tavares & Visuals', category: 'web', tag: 'Creative Art Direction', date: '2025', img: '/imgs/tavares.png', color: '#DC2626', desc: lang === 'fr' ? 'Direction artistique web d\'exception, vitrines cinématographiques et e-commerce.' : 'Curated collection of cinematic showcase sites, editorial e-commerce & galleries.', deliverables: ['Showreel Player', 'Black Theme', 'Micro-animations'] },
    { id: 'the-refuge', title: 'The Refuge', category: 'web', tag: 'Humanitarian Portal', date: '2025', img: '/imgs/refuge.png', color: '#0d3479', desc: lang === 'fr' ? 'Portail humanitaire & suivi d\'impact en temps réel pour l\'ONG The Refuge.' : 'Humanitarian portal & real-time impact tracker in Cotonou.', deliverables: ['Real-time Tracker', 'Mobile Money FCFA', 'Human Touch Doodles'] }
  ];

  const filteredProjects = allProjects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="v2-subpage-wrapper">
      <div className="v2-subpage-ambient-glow" />

      <div className="v2-subpage-container">
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="v2-subpage-back-btn"
        >
          <ArrowLeft size={16} /> <span>{lang === 'fr' ? 'RETOUR AU PORTFOLIO' : 'BACK TO PORTFOLIO'}</span>
        </button>

        <div className="v2-subpage-header">
          <div>
            <span className="v2-subpage-eyebrow">
              {lang === 'fr' ? `INDEX DES ARCHIVES (${allProjects.length} PROJETS)` : `FULL ARCHIVE INDEX (${allProjects.length} PROJECTS)`}
            </span>
            <h1 className="v2-subpage-title">
              {lang === 'fr' ? 'TOUS LES PROJETS' : 'ALL PROJECTS'}
            </h1>
          </div>

          {/* Filter Pills */}
          <div className="v2-filter-pills-row">
            <button 
              className={`v2-filter-pill-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {lang === 'fr' ? `TOUS (${allProjects.length})` : `ALL (${allProjects.length})`}
            </button>
            <button 
              className={`v2-filter-pill-btn ${activeFilter === 'saas' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('saas')}
            >
              SAAS &amp; B2B
            </button>
            <button 
              className={`v2-filter-pill-btn ${activeFilter === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('mobile')}
            >
              MOBILE UX
            </button>
            <button 
              className={`v2-filter-pill-btn ${activeFilter === 'web' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              WEB &amp; BRANDING
            </button>
          </div>
        </div>

        {/* Projects Showcase 3-Column Grid */}
        <div className="v2-showcase-grid-3">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="v2-project-card-large"
              onClick={() => setCurrentView(proj.id)}
            >
              <div className="v2-card-preview-container">
                <img src={proj.img} alt={proj.title} />
                <span className="v2-project-year-badge">{proj.date}</span>
                <div className="v2-preview-glass-tag">
                  <span>{proj.tag}</span>
                </div>
              </div>
              <div className="v2-card-content-block">
                <div className="v2-card-title-row">
                  <h3 className="v2-project-title">{proj.title}</h3>
                  <button className="v2-project-explore-btn" onClick={(e) => { e.stopPropagation(); setCurrentView(proj.id); }}>
                    <span>{lang === 'fr' ? 'Explorer' : 'Explore'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <p className="v2-project-summary">
                  {proj.desc}
                </p>
                <div className="v2-project-tags-row">
                  {proj.deliverables.map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CONNECT & FOOTER SYSTEM (REFERENCE STYLE)
───────────────────────────────────────────── */
const ConnectAndFooterSection = ({ 
  setCurrentView, 
  setIsAboutModalOpen, 
  lang 
}: { 
  setCurrentView: any; 
  setIsAboutModalOpen: any; 
  lang: 'en' | 'fr'; 
}) => {
  return (
    <footer id="contact" className="v2-connect-reference-section scroll-reveal">

      {/* Bottom Footer Structure matching Reference */}
      <div className="v2-reference-footer-wrap">
        <div className="v2-reference-footer-grid">
          {/* Logo / Monogram Col */}
          <div className="v2-ref-footer-brand">
            <div className="v2-ref-monogram" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <svg width="38" height="38" viewBox="0 0 280 290" fill="none">
                <path 
                  d="M 95 100 A 45 45 0 0 1 185 100 A 45 45 0 0 1 185 190 A 45 45 0 0 1 95 190 A 45 45 0 0 1 95 100 Z M 140 100 A 45 45 0 0 0 185 145 A 45 45 0 0 0 140 190 A 45 45 0 0 0 95 145 A 45 45 0 0 0 140 100 Z" 
                  fill="#FFFFFF" 
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="v2-ref-brand-meta">
              <span className="v2-ref-brand-name">SACCA DAFIA</span>
              <span className="v2-ref-brand-sub">Web &amp; Product Designer</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="v2-ref-footer-col">
            <span className="v2-ref-col-title">Navigation</span>
            <div className="v2-ref-col-links">
              <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                {lang === 'fr' ? 'Accueil' : 'Home'}
              </a>
              <span onClick={() => setIsAboutModalOpen(true)}>
                {lang === 'fr' ? 'À propos' : 'About Me'}
              </span>
              <a href="#graphic-design">
                {lang === 'fr' ? 'Créations' : 'Designs'}
              </a>
              <span onClick={() => setCurrentView('services')}>Services</span>
              <span onClick={() => setCurrentView('all-projects')}>Portfolio</span>
              <span onClick={() => setCurrentView('experiences')}>
                {lang === 'fr' ? 'Expériences' : 'Experiences'}
              </span>
            </div>
          </div>

          {/* Portfolio Column */}
          <div className="v2-ref-footer-col">
            <span className="v2-ref-col-title">Portfolio</span>
            <div className="v2-ref-col-links">
              <span onClick={() => setCurrentView('asset-iq')}>
                {lang === 'fr' ? 'Sites Web' : 'Websites'}
              </span>
              <a href="#graphic-design">
                {lang === 'fr' ? 'Graphisme' : 'Graphics'}
              </a>
              <span onClick={() => setCurrentView('vortex')}>Mobile &amp; MVPs</span>
              <span onClick={() => setCurrentView('sport-advisor')}>3D &amp; Motion</span>
            </div>
          </div>

          {/* Contact Column */}
          <div className="v2-ref-footer-col">
            <span className="v2-ref-col-title">Contact</span>
            <div className="v2-ref-col-links">
              <a href="mailto:dafiashalom@gmail.com" className="v2-ref-contact-link">
                <Mail size={13} />
                <span>dafiashalom@gmail.com</span>
              </a>
              <a 
                href="https://calendly.com/dafiashalom/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="v2-ref-contact-link"
              >
                <Calendar size={13} />
                <span>calendly.com/dafiashalom</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/dafia-s-860290218/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="v2-ref-contact-link"
              >
                <Linkedin size={13} />
                <span>LinkedIn Profile ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="v2-ref-footer-bottom">
          <span>© 2026 Sacca Dafia (Talesman). {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</span>
          <div className="v2-ref-footer-socials">
            <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={15} />
            </a>
            <a href="mailto:dafiashalom@gmail.com" aria-label="Email">
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────
   ALL PROJECTS ARCHIVE MODAL (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const AllProjectsModal = ({ 
  isOpen, 
  onClose, 
  setCurrentView, 
  lang 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  setCurrentView: (view: any) => void; 
  lang: 'en' | 'fr'; 
}) => {
  if (!isOpen) return null;

  const allProjects = [
    { id: 'asset-iq', title: 'Asset IQ', tag: 'Product Design & SaaS', date: '2026', img: '/imgs/assetiQ/cover_Asset.jpg', color: '#1D4ED8', desc: lang === 'fr' ? 'Gouvernance et télémétrie des actifs industriels par QR code.' : 'Industrial asset telemetry via QR codes.' },
    { id: 'ehadj', title: 'eHadj', tag: 'National Logistics SaaS', date: '2026', img: '/imgs/ehadj/cover_Ehadj.jpg', color: '#EAB308', desc: lang === 'fr' ? 'Orchestration digitale du pèlerinage pour +30 ministères.' : 'Digital orchestration of pilgrimage logistics.' },
    { id: 'beans', title: 'Beans', tag: 'B2B SaaS Engagement', date: '2025', img: '/imgs/beans_cover.png', color: '#059669', desc: lang === 'fr' ? 'Plateforme SaaS de fidélisation & 10 connecteurs e-commerce.' : 'B2B SaaS customer engagement platform.' },
    { id: 'dolce-riviera', title: 'Dolce Riviera', tag: 'Luxury Hospitality UI/UX Interface', date: '2025', img: '/imgs/dolce_cover.png', color: '#C5A059', desc: lang === 'fr' ? 'Interface UI/UX d\'exception & booking funnel pour resort de luxe.' : 'Luxury hospitality UI/UX interface concept.' },
    { id: 'vortex', title: 'Vortex', tag: 'Mobile UX & Wallet', date: '2026', img: '/imgs/vortex.webp', color: '#D97706', desc: lang === 'fr' ? 'App mobile d\'achat de carburant et gestion de portefeuille.' : 'Mobile fuel purchasing & digital wallet app.' },
    { id: 'strategy-arena', title: 'Strategy Arena', tag: 'Branding & Web Strategy', date: '2026', img: '/imgs/Strategy-Arena.png', color: '#EAB308', desc: lang === 'fr' ? 'Cabinet de conseil en stratégie & transformation digitale.' : 'Strategic consulting agency platform.' },
    { id: 'truvox', title: 'Truvox Studio', tag: 'Web Design & Studio', date: '2025', img: '/imgs/truvox_cover.png', color: '#10B981', desc: lang === 'fr' ? 'Expériences numériques d\'exception & vitrine digitale.' : 'High-end studio brand experience.' },
    { id: 'sport-advisor', title: 'Sport Advisor', tag: 'AI & Data Visualization', date: '2025', img: '/imgs/advisor.webp', color: '#00FA9A', desc: lang === 'fr' ? 'Plateforme d\'analyse et de pronostics sportifs par IA.' : 'AI sports analysis platform.' },
    { id: 'sagana', title: 'Sagana', tag: 'Web Art Direction', date: '2025', img: '/imgs/sagana.png', color: '#F59E0B', desc: lang === 'fr' ? 'Vitrine d\'excellence pour agence de conseil haut de gamme.' : 'High-end showcase site for advisory agency.' },
    { id: 'tavares', title: 'Tavares & Visuals', tag: 'Creative Art Direction', date: '2025', img: '/imgs/tavares.png', color: '#DC2626', desc: lang === 'fr' ? 'Direction artistique web & vitrines cinématographiques.' : 'Cinematic showcase sites & galleries.' },
    { id: 'the-refuge', title: 'The Refuge', tag: 'Humanitarian Portal', date: '2025', img: '/imgs/refuge.png', color: '#0d3479', desc: lang === 'fr' ? 'Portail humanitaire & suivi d\'impact en temps réel.' : 'Humanitarian portal & impact tracker.' }
  ];

  return (
    <div className="v2-modal-overlay" onClick={onClose}>
      <div className="v2-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '18px' }}>
          <div>
            <span className="v2-subpage-eyebrow">ARCHIVE COMPLÈTE ({allProjects.length} DOSSIERS)</span>
            <h2 style={{ fontFamily: 'var(--font-anton)', fontSize: '2.4rem', color: '#FFFFFF', margin: '4px 0 0 0', lineHeight: 1 }}>
              {lang === 'fr' ? 'INDEX TOUS LES PROJETS' : 'ALL PROJECTS ARCHIVE'}
            </h2>
          </div>
          <button onClick={onClose} className="v2-modal-close-btn" style={{ position: 'static' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {allProjects.map((proj) => (
            <div 
              key={proj.id}
              className="v2-project-card-large"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onClose();
                setCurrentView(proj.id);
              }}
            >
              <div className="v2-card-preview-container" style={{ height: '160px' }}>
                <img src={proj.img} alt={proj.title} />
                <span className="v2-project-year-badge">{proj.date}</span>
                <div className="v2-preview-glass-tag">
                  <span>{proj.tag}</span>
                </div>
              </div>
              <div className="v2-card-content-block" style={{ padding: '16px' }}>
                <h3 className="v2-project-title" style={{ fontSize: '1.4rem' }}>{proj.title}</h3>
                <p className="v2-project-summary" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>{proj.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 'bold', color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    VOIR LE PROJET <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN HOMEPAGE
───────────────────────────────────────────── */
export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cv' | 'experiences' | 'services' | 'all-projects' | CaseStudyId>(() => getViewFromHash());
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAllProjectsModalOpen, setIsAllProjectsModalOpen] = useState(false);
  const [selectedGraphic, setSelectedGraphic] = useState<{
    src: string;
    title: string;
    category: string;
    slides?: string[];
    currentSlideIndex?: number;
  } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Keyboard navigation for Lightbox Multi-Slide Carrousels
  useEffect(() => {
    if (!selectedGraphic) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGraphic(null);
      } else if (e.key === 'ArrowRight' && selectedGraphic.slides && selectedGraphic.slides.length > 1) {
        const nextIdx = ((selectedGraphic.currentSlideIndex || 0) + 1) % selectedGraphic.slides.length;
        setSelectedGraphic(prev => prev ? { ...prev, currentSlideIndex: nextIdx, src: prev.slides![nextIdx] } : null);
      } else if (e.key === 'ArrowLeft' && selectedGraphic.slides && selectedGraphic.slides.length > 1) {
        const prevIdx = ((selectedGraphic.currentSlideIndex || 0) - 1 + selectedGraphic.slides.length) % selectedGraphic.slides.length;
        setSelectedGraphic(prev => prev ? { ...prev, currentSlideIndex: prevIdx, src: prev.slides![prevIdx] } : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGraphic]);


  // Page Turn Animation States ("Effet Tournement de Page")
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [pageTurnDirection, setPageTurnDirection] = useState<'forward' | 'reverse'>('forward');
  const [pendingView, setPendingView] = useState<any>(null);

  const handleViewSwitch = (targetView: any, forceDirection?: 'forward' | 'reverse') => {
    if (targetView === currentView && !isPageTurning) return;
    const isReverse = forceDirection ? forceDirection === 'reverse' : targetView === 'home';
    setPageTurnDirection(isReverse ? 'reverse' : 'forward');
    setPendingView(targetView);
    setIsPageTurning(true);
  };

  const handleLangSwitch = () => {
    setPageTurnDirection('forward');
    setIsPageTurning(true);
    setTimeout(() => {
      setLang((prev) => (prev === 'en' ? 'fr' : 'en'));
    }, 240);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll Progress & IntersectionObserver Reveal System
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElems = document.querySelectorAll('.scroll-reveal');
    revealElems.forEach((elem) => observer.observe(elem));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElems.forEach((elem) => observer.unobserve(elem));
      observer.disconnect();
    };
  }, [currentView]);

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
    const handlePopState = () => handleViewSwitch(getViewFromHash());
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <>
      {/* 3D Page Turn Overlay Effect ("Effet Tournement de Page") */}
      <PageTurnOverlay
        isTurning={isPageTurning}
        direction={pageTurnDirection}
        onMidTurn={() => {
          if (pendingView) {
            setCurrentView(pendingView);
          }
        }}
        onTurnComplete={() => {
          setIsPageTurning(false);
          setPendingView(null);
        }}
      />

      {/* Floating Header for Detail & Sub-Pages */}
      {currentView !== 'home' && (
        <nav className="v2-floating-nav">
          <div className="v2-nav-profile" onClick={() => handleViewSwitch('home')}>
            <img 
              src="/imgs/sacca_headshot.jpg" 
              alt="Talesman Avatar" 
              className="v2-nav-avatar" 
            />
            <span className="v2-nav-name">Talesman</span>
          </div>

          <div className="v2-nav-links">
            <span className="v2-nav-link" onClick={() => handleViewSwitch('home')}>
              Home
            </span>
            <span className={`v2-nav-link ${currentView === 'all-projects' ? 'is-active' : ''}`} onClick={() => handleViewSwitch('all-projects')}>
              Projects
            </span>
            <span className={`v2-nav-link ${currentView === 'services' ? 'is-active' : ''}`} onClick={() => handleViewSwitch('services')}>
              Services
            </span>
            <span className={`v2-nav-link ${currentView === 'experiences' ? 'is-active' : ''}`} onClick={() => handleViewSwitch('experiences')}>
              Blog / Career
            </span>
          </div>

          <div className="v2-nav-actions">
            <LangSwitchControl lang={lang} onToggle={handleLangSwitch} />
            <button 
              className="v2-nav-connect-btn" 
              onClick={() => {
                if ((window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                } else {
                  window.open('https://calendly.com/dafiashalom/30min', '_blank');
                }
              }}
            >
              Let's Connect
            </button>
          </div>

          <button 
            className="robin-mobile-hamburger-btn v2-mobile-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      )}

      {/* About Sheet Modal & All Projects Archive Modal */}
      <AboutSheetModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} lang={lang} />
      <AllProjectsModal isOpen={isAllProjectsModalOpen} onClose={() => setIsAllProjectsModalOpen(false)} setCurrentView={setCurrentView} lang={lang} />

      {/* Graphic Design High-Res Lightbox Modal */}
      {selectedGraphic && (
        <div className="v2-modal-overlay" onClick={() => setSelectedGraphic(null)}>
          <div 
            className="v2-modal-sheet" 
            style={{ 
              maxWidth: '720px', 
              textAlign: 'center',
              padding: '28px 24px 30px',
              position: 'relative'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedGraphic(null)} 
              className="v2-modal-close-btn"
              aria-label="Fermer l'aperçu"
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="v2-subpage-eyebrow" style={{ color: '#10B981', display: 'inline-block' }}>
                {selectedGraphic.category}
              </span>
              {selectedGraphic.slides && selectedGraphic.slides.length > 1 && (
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.72rem', 
                  color: '#38BDF8', 
                  background: 'rgba(56, 189, 248, 0.12)', 
                  padding: '2px 8px', 
                  borderRadius: '9999px',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  fontWeight: 600
                }}>
                  Slide {(selectedGraphic.currentSlideIndex || 0) + 1} / {selectedGraphic.slides.length}
                </span>
              )}
            </div>

            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '18px', lineHeight: 1.4 }}>
              {selectedGraphic.title}
            </h3>

            <div style={{ 
              position: 'relative',
              borderRadius: '16px', 
              overflow: 'hidden', 
              border: '1px solid rgba(255, 255, 255, 0.12)', 
              background: '#000000',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
            }}>
              {selectedGraphic.slides && selectedGraphic.slides.length > 1 && (
                <>
                  <button 
                    className="v2-lightbox-nav-btn prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIdx = ((selectedGraphic.currentSlideIndex || 0) - 1 + selectedGraphic.slides!.length) % selectedGraphic.slides!.length;
                      setSelectedGraphic({ ...selectedGraphic, currentSlideIndex: prevIdx, src: selectedGraphic.slides![prevIdx] });
                    }}
                    aria-label="Slide précédente"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button 
                    className="v2-lightbox-nav-btn next"
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIdx = ((selectedGraphic.currentSlideIndex || 0) + 1) % selectedGraphic.slides!.length;
                      setSelectedGraphic({ ...selectedGraphic, currentSlideIndex: nextIdx, src: selectedGraphic.slides![nextIdx] });
                    }}
                    aria-label="Slide suivante"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              <img 
                src={selectedGraphic.src} 
                alt={selectedGraphic.title} 
                style={{ 
                  width: '100%', 
                  maxHeight: '70vh', 
                  objectFit: 'contain', 
                  display: 'block',
                  margin: '0 auto' 
                }} 
              />
            </div>

            {selectedGraphic.slides && selectedGraphic.slides.length > 1 && (
              <div className="v2-lightbox-dots-row">
                {selectedGraphic.slides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    className={`v2-lightbox-dot ${dotIdx === (selectedGraphic.currentSlideIndex || 0) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGraphic({
                        ...selectedGraphic,
                        currentSlideIndex: dotIdx,
                        src: selectedGraphic.slides![dotIdx]
                      });
                    }}
                    aria-label={`Aller au slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Slide-out Notebook Paper Drawer Menu (Global) */}
      {isMobileMenuOpen && (
        <div className="robin-mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="robin-mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="robin-mobile-menu-header">
                <span className="robin-mobile-menu-title">SACCA DAFIA</span>
                <button className="robin-mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <div className="robin-mobile-menu-links">
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { handleViewSwitch('home'); setIsMobileMenuOpen(false); }}
                >
                  HOME
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { handleViewSwitch('all-projects'); setIsMobileMenuOpen(false); }}
                >
                  PROJECTS
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const elem = document.getElementById('about-me');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    else setIsAboutModalOpen(true);
                  }}
                >
                  ABOUT
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const elem = document.getElementById('services');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    else handleViewSwitch('services');
                  }}
                >
                  SERVICES
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { handleViewSwitch('experiences'); setIsMobileMenuOpen(false); }}
                >
                  BLOG &amp; CAREER
                </span>
              </div>
            </div>

            <div className="robin-mobile-menu-footer">
              <LangSwitchControl lang={lang} onToggle={handleLangSwitch} isMobile />


              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="robin-nav-pill" style={{ padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px', flex: 1, justifyContent: 'center', border: '1.5px solid #121212' }}>
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href="mailto:dafiashalom@gmail.com" className="robin-nav-pill" style={{ padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px', flex: 1, justifyContent: 'center', border: '1.5px solid #121212' }}>
                  <Mail size={15} /> Mail
                </a>
              </div>

              <button 
                className="robin-cta-black-btn" 
                style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if ((window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                  } else {
                    window.open('https://calendly.com/dafiashalom/30min', '_blank');
                  }
                }}
              >
                <span>BOOK A CALL</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Active View */}
      {currentView === 'experiences' && <ExperiencesView setCurrentView={handleViewSwitch} />}
      {currentView === 'services' && <ServicesView setCurrentView={handleViewSwitch} lang={lang} />}
      {currentView === 'all-projects' && <AllProjectsView setCurrentView={handleViewSwitch} lang={lang} />}
      {currentView !== 'home' && currentView !== 'experiences' && currentView !== 'services' && currentView !== 'all-projects' && (
        <CaseStudy id={currentView as CaseStudyId} setCurrentView={handleViewSwitch} lang={lang} />
      )}

      {/* Main Robin / Mosby Notebook Paper Portfolio Homepage */}
      {currentView === 'home' && (
        <div className="robin-notebook-outer">
          {/* Scroll Progress Bar */}
          <div className="robin-scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

          <main className="robin-notebook-page">
            {/* TOP FLOATING NAVIGATION BAR */}
            {/* TOP FLOATING NAVIGATION BAR (EXACT REFERENCE DESIGN) */}
            <nav className="v2-floating-nav">
              {/* Left Profile Avatar & Name */}
              <div className="v2-nav-profile" onClick={() => handleViewSwitch('home')}>
                <img 
                  src="/imgs/sacca_headshot.jpg" 
                  alt="Talesman Avatar" 
                  className="v2-nav-avatar" 
                />
                <span className="v2-nav-name">Talesman</span>
              </div>

              {/* Desktop Nav Items */}
              {/* Center Menu Links with Smooth Scrolling to Sections */}
              <div className="v2-nav-links">
                <span className={`v2-nav-link ${currentView === 'home' ? 'is-active' : ''}`} onClick={() => handleViewSwitch('home')}>
                  Home
                </span>
                <span className="v2-nav-link" onClick={() => {
                  const elem = document.getElementById('about-me');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}>
                  About
                </span>
                <span className="v2-nav-link" onClick={() => {
                  const elem = document.getElementById('product-design');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Projects
                </span>
                <span className="v2-nav-link" onClick={() => {
                  const elem = document.getElementById('services');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  else handleViewSwitch('services');
                }}>
                  Services
                </span>
                <span className="v2-nav-link" onClick={() => {
                  const elem = document.getElementById('graphic-design');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Designs
                </span>
                <span className="v2-nav-link" onClick={() => handleViewSwitch('experiences')}>
                  Blog
                </span>
              </div>

              {/* Right Side: Lang Switch & Connect Button */}
              <div className="v2-nav-actions">
                <LangSwitchControl lang={lang} onToggle={handleLangSwitch} />
                <button 
                  className="v2-nav-connect-btn" 
                  onClick={() => {
                    if ((window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                    } else {
                      window.open('https://calendly.com/dafiashalom/30min', '_blank');
                    }
                  }}
                >
                  Let's Connect
                </button>
              </div>

              {/* Mobile Hamburger Toggle Button */}
              <button 
                className="robin-mobile-hamburger-btn v2-mobile-toggle" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </nav>

            {/* SECTION 1: HERO (EXACT REFERENCE DESIGN) */}
            <section className="v2-hero-section">
              {/* Radial Ambient Glow Background Light */}
              <div className="v2-hero-ambient-glow" aria-hidden="true" />

              {/* Eyebrow Tagline */}
              <div className="v2-hero-eyebrow">
                {lang === 'fr' ? 'Le Design dans les Détails' : 'Design in Details'}
              </div>

              {/* Giant Wordmark with Center 3D Glass Monogram & Signature */}
              <div className="v2-hero-title-wrapper">
                <h1 className="v2-hero-title">
                  PORTFOLIO
                </h1>

                {/* 3D Wireframe Glass Monogram Intertwined with PORTFOLIO */}
                <div className="v2-hero-glass-overlay">
                  <GlassMonogram />
                </div>

                {/* Yellow Handwritten Animated Glow Signature */}
                <HeroSignature />
              </div>
            </section>

            {/* SECTION 2: ABOUT (EXACT REFERENCE DESIGN) */}
            {/* SECTION 2: ABOUT (FULL-WIDTH DYNAMIC SCROLLING SHOWCASE & CONCISE COPY) */}
            <section id="about-me" className="v2-about-section-fullwidth scroll-reveal">
              {/* Full-width Dynamic Multi-Column Continuous Scrolling Background */}
              <div className="v2-about-fullwidth-scroller" aria-hidden="true">
                {/* Column 1 (Scrolls Up) */}
                <div className="v2-scroll-column col-up">
                  <div className="v2-scroller-track">
                    <div className="v2-scroller-item"><img src="/imgs/beans_cover.png" alt="Beans" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/Strategy-Arena.png" alt="Strategy Arena" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/dolce_cover.png" alt="Dolce Riviera" /></div>
                    {/* Repeated for seamless loop */}
                    <div className="v2-scroller-item"><img src="/imgs/beans_cover.png" alt="Beans" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/Strategy-Arena.png" alt="Strategy Arena" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/dolce_cover.png" alt="Dolce Riviera" /></div>
                  </div>
                </div>

                {/* Column 2 (Scrolls Down) */}
                <div className="v2-scroll-column col-down">
                  <div className="v2-scroller-track">
                    <div className="v2-scroller-item"><img src="/imgs/ehadj/cover_Ehadj.jpg" alt="eHadj" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/tavares.png" alt="Tavares" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/truvox_cover.png" alt="Truvox" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/sagana.png" alt="Sagana" /></div>
                    {/* Repeated for seamless loop */}
                    <div className="v2-scroller-item"><img src="/imgs/ehadj/cover_Ehadj.jpg" alt="eHadj" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/tavares.png" alt="Tavares" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/truvox_cover.png" alt="Truvox" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/sagana.png" alt="Sagana" /></div>
                  </div>
                </div>

                {/* Column 3 (Scrolls Up) */}
                <div className="v2-scroll-column col-up col-slow">
                  <div className="v2-scroller-track">
                    <div className="v2-scroller-item"><img src="/imgs/vortex.webp" alt="Vortex Gallery" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/advisor.webp" alt="Sport Advisor" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/refuge.png" alt="The Refuge" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/vibe_coding_setup.jpg" alt="Vibe Coding" /></div>
                    {/* Repeated for seamless loop */}
                    <div className="v2-scroller-item"><img src="/imgs/vortex.webp" alt="Vortex Gallery" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/advisor.webp" alt="Sport Advisor" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/refuge.png" alt="The Refuge" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/vibe_coding_setup.jpg" alt="Vibe Coding" /></div>
                  </div>
                </div>

                {/* Column 4 (Scrolls Down) */}
                <div className="v2-scroll-column col-down">
                  <div className="v2-scroller-track">
                    <div className="v2-scroller-item"><img src="/imgs/dolce_cover.png" alt="Dolce Riviera" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/beans_cover.png" alt="Beans" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/Strategy-Arena.png" alt="Strategy Arena" /></div>
                    {/* Repeated for seamless loop */}
                    <div className="v2-scroller-item"><img src="/imgs/dolce_cover.png" alt="Dolce Riviera" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/beans_cover.png" alt="Beans" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ" /></div>
                    <div className="v2-scroller-item"><img src="/imgs/Strategy-Arena.png" alt="Strategy Arena" /></div>
                  </div>
                </div>
              </div>

              {/* Edge-to-edge Dark Vignette & Center Spotlight */}
              <div className="v2-about-fullwidth-vignette" aria-hidden="true" />
              <div className="v2-about-fullwidth-spotlight" aria-hidden="true" />

              {/* Center Content Card (Concise, Clean & Refined) */}
              <div className="v2-about-content-card">
                <span className="v2-about-eyebrow">
                  {lang === 'fr' ? 'À PROPOS' : 'ABOUT ME'}
                </span>
                <h2 className="v2-about-title">
                  {lang === 'fr' ? 'Bonjour !' : 'Hi There!'}
                </h2>
                
                <p className="v2-about-description-concise">
                  {lang === 'fr' ? (
                    <>
                      Je suis <strong>Sacca Dafia</strong> (alias <strong>Talesman</strong>), Product &amp; Web Designer passionné par la simplification des systèmes complexes. Depuis plus de 4 ans, je façonne des plateformes <strong>B2B SaaS</strong> scalables et des interfaces numériques à fort impact—de l'architecture de <strong>Design Systems</strong> au prototypage rapide en <strong>Vibe Coding</strong>.
                    </>
                  ) : (
                    <>
                      I'm <strong>Sacca Dafia</strong> (alias <strong>Talesman</strong>), a Product &amp; Web Designer focused on turning complex systems into effortless digital software. For over 4 years, I've crafted high-performing <strong>B2B SaaS</strong> platforms and conversion-driven web experiences—from scalable <strong>Design Systems</strong> to rapid <strong>Vibe Coding</strong>.
                    </>
                  )}
                </p>

                {/* Refined Minimalist Badges (Monochrome & Cyan) */}
                <div className="v2-about-minimal-pills">
                  <span className="v2-minimal-pill"><span className="pill-dot" /> 4+ Years Experience</span>
                  <span className="v2-minimal-pill"><span className="pill-dot" /> B2B SaaS &amp; Products</span>
                  <span className="v2-minimal-pill"><span className="pill-dot" /> Vibe Coding &amp; Prototypes</span>
                  <span className="v2-minimal-pill"><span className="pill-dot" /> Design Systems</span>
                </div>

                {/* Sub-actions Footer */}
                <div className="v2-about-footer">
                  <span className="v2-about-footer-prompt">
                    {lang === 'fr' ? 'Envie d\'en savoir plus sur mon parcours ?' : 'Want to know more about me?'}
                  </span>
                  <div className="v2-about-footer-links">
                    <button 
                      className="v2-about-connect-btn" 
                      onClick={() => {
                        if ((window as any).Calendly) {
                          (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                        } else {
                          window.open('https://calendly.com/dafiashalom/30min', '_blank');
                        }
                      }}
                    >
                      <span>Let's Connect</span>
                      <ArrowRight size={14} />
                    </button>
                    <button 
                      className="v2-about-secondary-link" 
                      onClick={() => handleViewSwitch('experiences')}
                    >
                      {lang === 'fr' ? 'Mon Parcours & Blog' : 'Career & Blog'}
                    </button>
                    <button 
                      className="v2-about-secondary-link" 
                      onClick={() => handleViewSwitch('cv')}
                    >
                      CV / Resume
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: SERVICES & CAPABILITIES (EXACT DARK GLASS AESTHETIC) */}
            <section id="services" className="v2-services-section scroll-reveal">
              {/* Atmospheric background glow */}
              <div className="v2-services-glow" aria-hidden="true" />

              <div className="v2-services-header">
                <span className="v2-services-eyebrow">
                  {lang === 'fr' ? 'Mes Services' : 'Services & Solutions'}
                </span>
                <h2 className="v2-services-title">
                  {lang === 'fr' ? 'Expertises & Savoir-Faire' : 'Craft & Capabilities'}
                </h2>
                <p className="v2-services-subtitle">
                  {lang === 'fr'
                    ? "Conception de bout en bout et prototypage haute vitesse pour fondateurs SaaS exigeants et marques ambitieuses."
                    : "End-to-end digital craft and rapid functional prototyping for ambitious SaaS founders and forward-thinking brands."}
                </p>
              </div>

              {/* Services Cards Grid */}
              <div className="v2-services-grid">
                {/* CARD 01: SAAS & PRODUCT DESIGN */}
                <div className="v2-service-card card-glow-cyan">
                  <div className="v2-service-card-top">
                    <div className="v2-service-header-spec">
                      <span className="v2-service-idx">// 01</span>
                      <span className="v2-service-category-tag">SAAS · PRODUCT SYSTEMS</span>
                    </div>
                    <div className="v2-service-status-node">
                      <span className="v2-status-dot dot-cyan"></span>
                      <span className="v2-status-label">ACTIVE_SPEC</span>
                    </div>
                  </div>

                  <div className="v2-service-visual-stage">
                    <GlassServiceVisual type="saas" />
                  </div>
                  
                  <div className="v2-service-body">
                    <h3 className="v2-service-card-title">
                      {lang === 'fr' ? 'UI/UX & Design Produit (B2B SaaS)' : 'UI/UX & Product Design (B2B SaaS)'}
                    </h3>

                    <p className="v2-service-card-desc">
                      {lang === 'fr'
                        ? "Architecture de l'information complexe, tunnels d'activation sans friction, tableaux de bord de télémétrie et design systems Figma prêts pour l'ingénierie."
                        : "Complex information architecture, frictionless onboarding funnels, telemetry dashboards, and scalable Figma design systems ready for engineering."}
                    </p>
                  </div>

                  <div className="v2-service-tags">
                    <span className="v2-service-tag">[FIGMA_VARIABLES]</span>
                    <span className="v2-service-tag">[USER_FLOWS]</span>
                    <span className="v2-service-tag">[TELEMETRY_DASH]</span>
                    <span className="v2-service-tag">[DATA_VIZ]</span>
                  </div>
                </div>

                {/* CARD 02: ART DIRECTION & WEB DESIGN */}
                <div className="v2-service-card card-glow-yellow">
                  <div className="v2-service-card-top">
                    <div className="v2-service-header-spec">
                      <span className="v2-service-idx">// 02</span>
                      <span className="v2-service-category-tag">WEB CRAFT · ART DIRECTION</span>
                    </div>
                    <div className="v2-service-status-node">
                      <span className="v2-status-dot dot-yellow"></span>
                      <span className="v2-status-label">ACTIVE_SPEC</span>
                    </div>
                  </div>

                  <div className="v2-service-visual-stage">
                    <GlassServiceVisual type="craft" />
                  </div>

                  <div className="v2-service-body">
                    <h3 className="v2-service-card-title">
                      {lang === 'fr' ? 'Direction Artistique & Web Design' : 'Art Direction & Web Design'}
                    </h3>

                    <p className="v2-service-card-desc">
                      {lang === 'fr'
                        ? "Vitrines de marque immersives, typographie éditoriale sur mesure, animations de storytelling fluides et interfaces de conversion à fort impact visuel."
                        : "Immersive brand showcase websites, custom editorial typography, fluid storytelling animations, and conversion-focused digital experiences."}
                    </p>
                  </div>

                  <div className="v2-service-tags">
                    <span className="v2-service-tag">[ART_DIRECTION]</span>
                    <span className="v2-service-tag">[3D_SPATIAL_MOTION]</span>
                    <span className="v2-service-tag">[EDITORIAL_TYPE]</span>
                    <span className="v2-service-tag">[HIGH_CONVERSION]</span>
                  </div>
                </div>

                {/* CARD 03: VIBE CODING & RAPID MVP */}
                <div className="v2-service-card card-glow-green">
                  <div className="v2-service-card-top">
                    <div className="v2-service-header-spec">
                      <span className="v2-service-idx">// 03</span>
                      <span className="v2-service-category-tag">VIBE CODING · RAPID MVP</span>
                    </div>
                    <div className="v2-service-status-node">
                      <span className="v2-status-dot dot-green"></span>
                      <span className="v2-status-label">ACTIVE_SPEC</span>
                    </div>
                  </div>

                  <div className="v2-service-visual-stage">
                    <GlassServiceVisual type="code" />
                  </div>

                  <div className="v2-service-body">
                    <h3 className="v2-service-card-title">
                      {lang === 'fr' ? 'Vibe Coding & Prototypage Rapide' : 'Vibe Coding & Rapid MVP Prototyping'}
                    </h3>

                    <p className="v2-service-card-desc">
                      {lang === 'fr'
                        ? "Prototypage fonctionnel ultra-rapide (React, TypeScript, Vite/Next) pour tester concrètement vos idées, valider l'UX auprès d'utilisateurs réels et convaincre vos investisseurs."
                        : "Ultra-fast functional software prototyping (React, TypeScript, Next/Vite) to validate UX with real users, pitch investors, and bridge the gap between design and production."}
                    </p>
                  </div>

                  <div className="v2-service-tags">
                    <span className="v2-service-tag">[REACT_19]</span>
                    <span className="v2-service-tag">[GOOGLE_AI_STUDIO]</span>
                    <span className="v2-service-tag">[RAPID_PROTOTYPE]</span>
                    <span className="v2-service-tag">[EDGE_DEPLOY]</span>
                  </div>
                </div>

                {/* CARD 04: DESIGN SYSTEMS & DEV HANDOFF */}
                <div className="v2-service-card card-glow-purple">
                  <div className="v2-service-card-top">
                    <div className="v2-service-header-spec">
                      <span className="v2-service-idx">// 04</span>
                      <span className="v2-service-category-tag">DESIGN SYSTEMS · HANDOFF</span>
                    </div>
                    <div className="v2-service-status-node">
                      <span className="v2-status-dot dot-purple"></span>
                      <span className="v2-status-label">ACTIVE_SPEC</span>
                    </div>
                  </div>

                  <div className="v2-service-visual-stage">
                    <GlassServiceVisual type="system" />
                  </div>

                  <div className="v2-service-body">
                    <h3 className="v2-service-card-title">
                      {lang === 'fr' ? 'Design Systems & Handoff Ingénieur' : 'Design Systems & Engineering Hand-off'}
                    </h3>

                    <p className="v2-service-card-desc">
                      {lang === 'fr'
                        ? "Bibliothèques de composants UI réutilisables, gouvernance de tokens, accessibilité WCAG et alignement designer-développeur pour éliminer toute friction d'intégration."
                        : "Reusable UI component libraries, design token governance, WCAG accessibility, and airtight designer-developer alignment to eliminate hand-off friction."}
                    </p>
                  </div>

                  <div className="v2-service-tags">
                    <span className="v2-service-tag">[TOKEN_GOVERNANCE]</span>
                    <span className="v2-service-tag">[WCAG_AAA]</span>
                    <span className="v2-service-tag">[STORYBOOK]</span>
                    <span className="v2-service-tag">[DEV_HANDOFF]</span>
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action Card */}
              <div className="v2-services-cta-banner">
                <div className="v2-services-cta-left">
                  <span className="v2-services-cta-tag">
                    {lang === 'fr' ? 'COLLABORATION STRATÉGIQUE' : 'STRATEGIC COLLABORATION'}
                  </span>
                  <h4 className="v2-services-cta-heading">
                    {lang === 'fr' ? 'Un projet ambitieux à concevoir ?' : 'Have an ambitious project in mind?'}
                  </h4>
                  <p className="v2-services-cta-sub">
                    {lang === 'fr' ? 'Discutons ensemble de vos défis produit, de votre calendrier et de votre vision logicielle.' : "Let's discuss how we can turn your vision into high-impact, production-grade software."}</p>
                </div>
                <div className="v2-services-cta-right">
                  <button 
                    className="v2-services-cta-btn-lux"
                    onClick={() => {
                      if ((window as any).Calendly) {
                        (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                      } else {
                        window.open('https://calendly.com/dafiashalom/30min', '_blank');
                      }
                    }}
                  >
                    <span>{lang === 'fr' ? 'Réserver un appel (30 min)' : 'Book a 30-min Call'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION: WEBSITE DESIGN & TOOLS BENTO GRID (MAGNIFIED & REFINED) */}
            <section id="webdesign" className="v2-webdesign-section scroll-reveal">
              {/* Violet & Cyan Atmospheric Glow */}
              <div className="v2-webdesign-glow" aria-hidden="true" />
              <div className="v2-webdesign-glow-secondary" aria-hidden="true" />

              {/* Section Header */}
              <div className="v2-webdesign-header">
                <span className="v2-webdesign-eyebrow">
                  {lang === 'fr' ? 'Conception Web & Sites' : 'Website Design'}
                </span>
                <h2 className="v2-webdesign-title">
                  {lang === 'fr' ? 'Impressionner, Engager et Performer.' : 'Impress, Engage, and Perform.'}
                </h2>
                <p className="v2-webdesign-subtitle">
                  {lang === 'fr'
                    ? "Je conçois des sites web réactifs et des expériences numériques immersives avec des technologies modernes comme React, Antigravity, Figma, Next.js et TypeScript—pensés pour sublimer l'image de marque et maximiser les conversions."
                    : "I design responsive websites and high-impact digital experiences using modern frameworks and tools like React, Antigravity, Figma, Next.js, and TypeScript—built for brand impact and conversion."}
                </p>
              </div>

              {/* Sub-header Bar */}
              <div className="v2-webdesign-subbar">
                <div className="v2-subbar-left">
                  <h3 className="v2-webdesign-subbar-title">
                    {lang === 'fr' ? 'Sélection de Sites Web' : 'Featured Websites'}
                  </h3>
                  <span className="v2-webdesign-count">4 PROJETS PHARES</span>
                </div>
                <button 
                  className="v2-webdesign-all-btn"
                  onClick={() => handleViewSwitch('all-projects')}
                >
                  <span>{lang === 'fr' ? 'Voir toutes les archives' : 'View all archives'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Large 2x2 Website Showcase Grid */}
              <div className="v2-webdesign-showcase-grid-large">
                {/* SITE 01: STRATEGY ARENA */}
                <div className="v2-website-card-large" onClick={() => handleViewSwitch('strategy-arena')}>
                  <div className="v2-browser-mockup-bar">
                    <div className="v2-browser-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="v2-browser-url-pill">
                      <span className="v2-url-lock"><Lock size={10} /></span> strategy-arena.com
                    </div>
                    <span className="v2-browser-year-badge">2026</span>
                  </div>

                  <div className="v2-website-large-preview">
                    <img src="/imgs/Strategy-Arena.png" alt="Strategy Arena" />
                    <div className="v2-preview-overlay">
                      <span className="v2-overlay-badge">
                        {lang === 'fr' ? 'Explorer le projet' : 'Explore Case'}
                      </span>
                    </div>
                  </div>

                  <div className="v2-website-card-large-info">
                    <div className="v2-card-large-top">
                      <div>
                        <span className="v2-website-category-tag">Corporate &amp; Advisory</span>
                        <h4 className="v2-website-large-name">Strategy Arena</h4>
                      </div>
                      <a 
                        href="https://talesmanwebcraft.vercel.app/#strategy-arena" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="v2-website-large-live-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Live Site</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="v2-website-large-desc">
                      {lang === 'fr'
                        ? "Plateforme B2B de conseil stratégique et d'accélération d'entreprises, structurée pour la conversion."
                        : "B2B strategic consulting and business acceleration platform built for maximum executive engagement."}
                    </p>
                    <div className="v2-website-tech-tags">
                      <span>React</span>
                      <span>Antigravity</span>
                      <span>Tailwind CSS</span>
                      <span>Figma</span>
                    </div>
                  </div>
                </div>

                {/* SITE 02: TRUVOX STUDIO */}
                <div className="v2-website-card-large" onClick={() => handleViewSwitch('truvox')}>
                  <div className="v2-browser-mockup-bar">
                    <div className="v2-browser-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="v2-browser-url-pill">
                      <span className="v2-url-lock"><Lock size={10} /></span> truvox.studio
                    </div>
                    <span className="v2-browser-year-badge">2025</span>
                  </div>

                  <div className="v2-website-large-preview">
                    <img src="/imgs/truvox_cover.png" alt="Truvox Studio" />
                    <div className="v2-preview-overlay">
                      <span className="v2-overlay-badge">
                        {lang === 'fr' ? 'Explorer le projet' : 'Explore Case'}
                      </span>
                    </div>
                  </div>

                  <div className="v2-website-card-large-info">
                    <div className="v2-card-large-top">
                      <div>
                        <span className="v2-website-category-tag">Creative Production &amp; Studio</span>
                        <h4 className="v2-website-large-name">Truvox Studio</h4>
                      </div>
                      <a 
                        href="https://www.truvox.studio/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="v2-website-large-live-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Live Site</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="v2-website-large-desc">
                      {lang === 'fr'
                        ? "Site vitrine immersif pour un studio créatif et maison de production audiovisuelle internationale."
                        : "Immersive showcase website designed for an international creative studio and media production house."}
                    </p>
                    <div className="v2-website-tech-tags">
                      <span>React</span>
                      <span>Next.js</span>
                      <span>Art Direction</span>
                      <span>GSAP Motion</span>
                    </div>
                  </div>
                </div>

                {/* SITE 03: SAGANA AGENCY */}
                <div className="v2-website-card-large" onClick={() => handleViewSwitch('sagana')}>
                  <div className="v2-browser-mockup-bar">
                    <div className="v2-browser-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="v2-browser-url-pill">
                      <span className="v2-url-lock"><Lock size={10} /></span> sagana-agency.com
                    </div>
                    <span className="v2-browser-year-badge">2025</span>
                  </div>

                  <div className="v2-website-large-preview">
                    <img src="/imgs/sagana.png" alt="Sagana Agency" />
                    <div className="v2-preview-overlay">
                      <span className="v2-overlay-badge">
                        {lang === 'fr' ? 'Explorer le projet' : 'Explore Case'}
                      </span>
                    </div>
                  </div>

                  <div className="v2-website-card-large-info">
                    <div className="v2-card-large-top">
                      <div>
                        <span className="v2-website-category-tag">Strategic Consulting</span>
                        <h4 className="v2-website-large-name">Sagana Agency</h4>
                      </div>
                      <a 
                        href="https://www.sagana-agency.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="v2-website-large-live-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Live Site</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="v2-website-large-desc">
                      {lang === 'fr'
                        ? "Identité de marque et vitrine numérique d'agence de conseil en management & innovation."
                        : "Brand identity and digital showcase for a high-level management and innovation advisory firm."}
                    </p>
                    <div className="v2-website-tech-tags">
                      <span>React</span>
                      <span>TypeScript</span>
                      <span>Design System</span>
                      <span>Vite</span>
                    </div>
                  </div>
                </div>

                {/* SITE 04: TAVARES & VISUALS */}
                <div className="v2-website-card-large" onClick={() => handleViewSwitch('tavares')}>
                  <div className="v2-browser-mockup-bar">
                    <div className="v2-browser-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="v2-browser-url-pill">
                      <span className="v2-url-lock"><Lock size={10} /></span> portfolio-tavares.vercel.app
                    </div>
                    <span className="v2-browser-year-badge">2025</span>
                  </div>

                  <div className="v2-website-large-preview">
                    <img src="/imgs/tavares.png" alt="Tavares" />
                    <div className="v2-preview-overlay">
                      <span className="v2-overlay-badge">
                        {lang === 'fr' ? 'Explorer le projet' : 'Explore Case'}
                      </span>
                    </div>
                  </div>

                  <div className="v2-website-card-large-info">
                    <div className="v2-card-large-top">
                      <div>
                        <span className="v2-website-category-tag">Creative Direction</span>
                        <h4 className="v2-website-large-name">Tavares &amp; Visuals</h4>
                      </div>
                      <a 
                        href="https://portfolio-tavares.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="v2-website-large-live-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Live Site</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="v2-website-large-desc">
                      {lang === 'fr'
                        ? "Direction artistique percutante et portfolio interactif fluide avec Vibe Coding."
                        : "High-impact cinematic art direction and interactive showcase built with rapid Vibe Coding."}
                    </p>
                    <div className="v2-website-tech-tags">
                      <span>Vibe Coding</span>
                      <span>Framer</span>
                      <span>TypeScript</span>
                      <span>Art Direction</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upgraded Bento Grid: Tools + Collaborate + Architecture */}
              <div className="v2-bento-grid-upgraded">
                {/* BENTO BLOCK 1: TOOLS 2x4 GRID (REACT, ANTIGRAVITY, FIGMA, ETC) */}
                <div className="v2-bento-card v2-bento-tools-large">
                  <div className="v2-bento-card-header">
                    <div>
                      <span className="v2-bento-tag">STACK &amp; WORKFLOW</span>
                      <h4 className="v2-bento-card-title">
                        {lang === 'fr' ? 'Écosystème Technologique' : 'Tech Ecosystem & Tools'}
                      </h4>
                    </div>
                    {/* Glowing Vibe Coding Pill */}
                    <div className="v2-bento-sticker-animated">
                      <span>VIBE CODING &amp; RAPID MVP ✦</span>
                    </div>
                  </div>

                  <div className="v2-tools-grid-large">
                    {/* Tool 1: React */}
                    <div className="v2-tool-item-large" title="React.js">
                      <div className="v2-tool-icon-wrap">
                        <svg viewBox="-11.5 -10.23174 23 20.46348" width="36" height="36">
                          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
                          <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
                            <ellipse rx="11" ry="4.2"/>
                            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                          </g>
                        </svg>
                      </div>
                      <span className="v2-tool-label-large">React</span>
                    </div>

                    {/* Tool 2: Antigravity */}
                    <div className="v2-tool-item-large" title="Antigravity">
                      <div className="v2-tool-icon-wrap">
                        <img 
                          src="/imgs/antigravity_clean.png" 
                          alt="Antigravity" 
                          style={{ width: '38px', height: '38px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))' }} 
                        />
                      </div>
                      <span className="v2-tool-label-large">Antigravity</span>
                    </div>

                    {/* Tool 3: Figma */}
                    <div className="v2-tool-item-large" title="Figma">
                      <div className="v2-tool-icon-wrap">
                        <svg viewBox="0 0 38 57" width="26" height="36" fill="none">
                          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                        </svg>
                      </div>
                      <span className="v2-tool-label-large">Figma</span>
                    </div>

                    {/* Tool 4: Google AI Studio */}
                    <div className="v2-tool-item-large" title="Google AI Studio">
                      <div className="v2-tool-icon-wrap">
                        <img 
                          src="/imgs/google_ai_studio.png" 
                          alt="Google AI Studio" 
                          style={{ width: '38px', height: '38px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(66, 133, 244, 0.4))' }} 
                        />
                      </div>
                      <span className="v2-tool-label-large">Google AI Studio</span>
                    </div>

                    {/* Tool 5: Next.js */}
                    <div className="v2-tool-item-large" title="Next.js">
                      <div className="v2-tool-icon-wrap">
                        <svg viewBox="0 0 180 180" width="34" height="34" fill="none">
                          <circle cx="90" cy="90" r="88" fill="#000" stroke="#FFF" strokeWidth="6" />
                          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z" fill="white" />
                          <rect x="115" y="54" width="12" height="72" fill="white" />
                        </svg>
                      </div>
                      <span className="v2-tool-label-large">Next.js</span>
                    </div>

                    {/* Tool 6: Tailwind CSS */}
                    <div className="v2-tool-item-large" title="Tailwind CSS">
                      <div className="v2-tool-icon-wrap">
                        <svg viewBox="0 0 24 24" width="36" height="36" fill="#38BDF8">
                          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
                        </svg>
                      </div>
                      <span className="v2-tool-label-large">Tailwind</span>
                    </div>

                    {/* Tool 7: Vite */}
                    <div className="v2-tool-item-large" title="Vite">
                      <div className="v2-tool-icon-wrap">
                        <svg viewBox="0 0 32 32" width="34" height="34" fill="none">
                          <path d="M29.5 5.5L16.5 28.5L3 5.5L16.5 12.5L29.5 5.5Z" fill="#BD34FE" stroke="#747BFF" strokeWidth="1.2"/>
                          <path d="M17.5 3L11.5 16H16.5L14.5 25L22.5 13H17.5L19.5 3H17.5Z" fill="#FFD026"/>
                        </svg>
                      </div>
                      <span className="v2-tool-label-large">Vite</span>
                    </div>

                    {/* Tool 8: Framer Motion */}
                    <div className="v2-tool-item-large" title="Framer Motion">
                      <div className="v2-tool-icon-wrap">
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="#FFFFFF">
                          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
                        </svg>
                      </div>
                      <span className="v2-tool-label-large">Framer</span>
                    </div>
                  </div>
                </div>

                {/* BENTO BLOCK 2: COLLABORATE & LIVE PRESENCE */}
                <div className="v2-bento-card v2-bento-collab-large">
                  <div className="v2-bento-card-header">
                    <span className="v2-bento-tag">COLLABORATION</span>
                  </div>

                  <div className="v2-bento-collab-text-large">
                    <h4>{lang === 'fr' ? 'Synergie & Vitesse' : 'Live Collaboration'}</h4>
                    <p>
                      {lang === 'fr' 
                        ? "Des cycles de conception courts, des retours en temps réel sur Figma et des prototypes interactifs testables instantanément." 
                        : "Short design cycles, live feedback on Figma, and interactive MVPs ready for immediate user testing."}
                    </p>
                  </div>

                  {/* Dynamic Designer Presence Stage */}
                  <div className="v2-collab-interactive-stage">
                    <div className="v2-collab-canvas-grid" />
                    <div className="v2-collab-cursor-animated">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#A855F7" className="v2-cursor-svg">
                        <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" />
                      </svg>
                      <div className="v2-cursor-tag-large">
                        <span className="v2-cursor-avatar">T</span>
                        <span>Talesman (Lead Design)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BENTO BLOCK 3: ARCHITECTURE & DESIGN SYSTEMS */}
                <div className="v2-bento-card v2-bento-nav-large">
                  <div className="v2-bento-card-header">
                    <span className="v2-bento-tag">SYSTEMS &amp; TOKENS</span>
                  </div>

                  <div className="v2-bento-nav-text-large">
                    <h4>{lang === 'fr' ? 'Architecture Modulaire' : 'Modular Architecture'}</h4>
                    <p>
                      {lang === 'fr'
                        ? "Composants scalables, hiérarchie visuelle irréprochable et tokenisation claire."
                        : "Scalable components, bulletproof visual hierarchy, and token-driven design systems."}
                    </p>
                  </div>

                  {/* Interactive UI System Layer Visual */}
                  <div className="v2-system-mockup-wrap">
                    <div className="v2-system-mockup-item is-primary">
                      <span className="item-dot" />
                      <span>App Navigation / Header</span>
                      <span className="item-badge">Tokenized</span>
                    </div>
                    <div className="v2-system-mockup-item">
                      <span className="item-dot" />
                      <span>Hero Section / 3D Canvas</span>
                      <span className="item-badge">Interactive</span>
                    </div>
                    <div className="v2-system-mockup-item">
                      <span className="item-dot" />
                      <span>Product Showcase Grid</span>
                      <span className="item-badge">Responsive</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: PRODUCT DESIGN & B2B SAAS (EHADJ, ASSET IQ, BEANS) */}
            <section id="product-design" className="v2-showcase-section scroll-reveal">
              <div className="v2-section-ambient-glow glow-blue" aria-hidden="true" />
              
              <div className="v2-section-header">
                <span className="v2-section-eyebrow eyebrow-blue">
                  {lang === 'fr' ? 'Product Design & B2B SaaS' : 'Product Design & B2B SaaS'}
                </span>
                <h2 className="v2-section-title">
                  {lang === 'fr' ? 'Architecture Produit & Systèmes Complexes.' : 'Product Architecture & Complex Systems.'}
                </h2>
                <p className="v2-section-subtitle">
                  {lang === 'fr'
                    ? "Conception de plateformes denses, gouvernance d'actifs et digitalisation de flux opérationnels critiques où chaque détail compte."
                    : "Designing data-dense platforms, asset governance engines, and mission-critical workflows with zero friction."}
                </p>
              </div>

              <div className="v2-showcase-grid-3">
                {/* CARD 01: EHADJ */}
                <div className="v2-project-card-large" onClick={() => handleViewSwitch('ehadj')}>
                  <div className="v2-card-preview-container">
                    <img src="/imgs/ehadj/cover_Ehadj.jpg" alt="eHadj" />
                    <span className="v2-project-year-badge">2026</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'GovTech & Logistique' : 'GovTech & Logistics'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">eHadj</h3>
                      <button className="v2-project-explore-btn" onClick={(e) => { e.stopPropagation(); handleViewSwitch('ehadj'); }}>
                        <span>{lang === 'fr' ? 'Étude de cas' : 'Case Study'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Plateforme gouvernementale centralisant la logistique du pèlerinage national pour +30 agences et ministères."
                        : "Centralized governmental platform orchestrating national pilgrimage operations for 30+ agencies."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? 'Impact : +3 000 pèlerins & 30+ agences' : 'Impact: 3,000+ pilgrims & 30+ agencies'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>Product Design</span>
                      <span>Design System</span>
                      <span>Figma Tokens</span>
                      <span>PRD Specs</span>
                    </div>
                  </div>
                </div>

                {/* CARD 02: ASSET IQ */}
                <div className="v2-project-card-large" onClick={() => handleViewSwitch('asset-iq')}>
                  <div className="v2-card-preview-container">
                    <img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ" />
                    <span className="v2-project-year-badge">2026</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'IoT Industriel & Télémétrie' : 'Industrial IoT & Governance'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">Asset IQ</h3>
                      <button className="v2-project-explore-btn" onClick={(e) => { e.stopPropagation(); handleViewSwitch('asset-iq'); }}>
                        <span>{lang === 'fr' ? 'Étude de cas' : 'Case Study'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Gouvernance et télémétrie multi-sites d'actifs physiques industriels lourds par scan QR code instantané."
                        : "Multi-site physical asset telemetry and inventory governance powered by smart QR code telemetry."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? 'Télémétrie QR Code & Analytics Multi-Sites' : 'QR Telemetry & Multi-Site Analytics'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>B2B SaaS</span>
                      <span>Data Architecture</span>
                      <span>Enterprise UI</span>
                      <span>Telemetry</span>
                    </div>
                  </div>
                </div>

                {/* CARD 03: BEANS */}
                <div className="v2-project-card-large" onClick={() => handleViewSwitch('beans')}>
                  <div className="v2-card-preview-container">
                    <img src="/imgs/beans_cover.png" alt="Beans" />
                    <span className="v2-project-year-badge">2025</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'Plateforme SaaS & Fidélisation' : 'SaaS & Engagement Hub'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">Beans</h3>
                      <button className="v2-project-explore-btn" onClick={(e) => { e.stopPropagation(); handleViewSwitch('beans'); }}>
                        <span>{lang === 'fr' ? 'Étude de cas' : 'Case Study'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Plateforme SaaS B2B d'engagement client & hub centralisé orchestrant 10 connecteurs e-commerce."
                        : "B2B SaaS customer engagement platform & integration hub powering 10 major e-commerce connectors."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? 'Hub de 10 Connecteurs & Multi-Tenant' : '10 Connectors Hub & Multi-Tenant'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>SaaS Platform</span>
                      <span>Connectors</span>
                      <span>Dashboard</span>
                      <span>React UI</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: UI/UX DESIGN & DIGITAL EXPERIENCES (DOLCE RIVIERA, VORTEX, SPORT ADVISOR) */}
            <section id="uiux-design" className="v2-showcase-section scroll-reveal">
              <div className="v2-section-ambient-glow glow-purple" aria-hidden="true" />
              
              <div className="v2-section-header">
                <span className="v2-section-eyebrow eyebrow-purple">
                  {lang === 'fr' ? 'UI/UX Design & Expériences' : 'UI/UX Design & Experiences'}
                </span>
                <h2 className="v2-section-title">
                  {lang === 'fr' ? 'Interfaces Immersives, Fluides et Désirables.' : 'Immersive, Fluid & Engaging Interfaces.'}
                </h2>
                <p className="v2-section-subtitle">
                  {lang === 'fr'
                    ? "Du design d'applications mobiles haute vélocité aux univers de marque prestigieux : concevoir des interfaces mémorables."
                    : "From high-velocity mobile applications to prestigious luxury digital experiences crafted with obsessive care."}
                </p>
              </div>

              <div className="v2-showcase-grid-3">
                {/* CARD 01: DOLCE RIVIERA */}
                <div className="v2-project-card-large" onClick={() => handleViewSwitch('dolce-riviera')}>
                  <div className="v2-card-preview-container">
                    <img src="/imgs/dolce_cover.png" alt="Dolce Riviera" />
                    <span className="v2-project-year-badge">2025</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'Interface & Expérience Client' : 'Digital Interface & Guest UI'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">Dolce Riviera</h3>
                      <button className="v2-project-explore-btn" onClick={(e) => { e.stopPropagation(); handleViewSwitch('dolce-riviera'); }}>
                        <span>{lang === 'fr' ? 'Étude de cas' : 'Case Study'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Interface numérique interactive et expérience de réservation immersive pour un resort exclusif sur la Côte d'Azur."
                        : "Interactive digital guest interface and luxury reservation experience designed for an exclusive French Riviera resort."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? 'Interface Interactive & Micro-Animations 60fps' : 'Interactive UI & 60fps Micro-Animations'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>Interface UI/UX</span>
                      <span>Système Interactif</span>
                      <span>Figma Tokens</span>
                      <span>Next.js</span>
                    </div>
                  </div>
                </div>

                {/* CARD 02: VORTEX */}
                <div className="v2-project-card-large" onClick={() => handleViewSwitch('vortex')}>
                  <div className="v2-card-preview-container">
                    <img src="/imgs/vortex.webp" alt="Vortex Mobile App" />
                    <span className="v2-project-year-badge">2026</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'App Mobile Fintech & Énergie' : 'Mobile Fintech & Energy'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">Vortex</h3>
                      <button className="v2-project-explore-btn" onClick={(e) => { e.stopPropagation(); handleViewSwitch('vortex'); }}>
                        <span>{lang === 'fr' ? 'Étude de cas' : 'Case Study'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Application mobile d'achat de carburant et portefeuille numérique réduisant le temps de paiement à 3 secondes."
                        : "High-speed mobile fuel payment & wallet app engineered for instant 3-second pump authorization."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? 'Paiement sans friction en 3 secondes' : 'Frictionless 3-second mobile flow'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>Mobile App UX</span>
                      <span>iOS & Android</span>
                      <span>Fintech</span>
                      <span>QR Payment</span>
                    </div>
                  </div>
                </div>

                {/* CARD 03: SPORT ADVISOR */}
                <div className="v2-project-card-large" onClick={() => handleViewSwitch('sport-advisor')}>
                  <div className="v2-card-preview-container">
                    <img src="/imgs/advisor.webp" alt="Sport Advisor" />
                    <span className="v2-project-year-badge">2025</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'Data Analytics & Performance' : 'Sports Data & Performance'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">Sport Advisor</h3>
                      <button className="v2-project-explore-btn" onClick={(e) => { e.stopPropagation(); handleViewSwitch('sport-advisor'); }}>
                        <span>{lang === 'fr' ? 'Étude de cas' : 'Case Study'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Portail d'analyse prédictive et tableaux de bord de performance sportive pour entraîneurs et athlètes."
                        : "Predictive sports analytics and tactical decision-support dashboard portal for teams and coaches."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? 'Visualisation de Données & Tableaux Dynamiques' : 'Data Visualization & Dynamic Tables'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>Data Viz</span>
                      <span>Dashboard UI</span>
                      <span>Analytics</span>
                      <span>UX Research</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: GRAPHIC DESIGN & BRANDING */}
            <section id="graphic-design" className="v2-showcase-section scroll-reveal">
              <div className="v2-section-ambient-glow glow-purple" aria-hidden="true" />
              
              <div className="v2-section-header">
                <span className="v2-section-eyebrow eyebrow-purple">
                  {lang === 'fr' ? 'GRAPHIC DESIGN & CRÉATION' : 'GRAPHIC DESIGN & BRANDING'}
                </span>
                <h2 className="v2-section-title">
                  {lang === 'fr' ? 'Direction Artistique, Posters & Carrousels.' : 'Visual Direction, Posters & Carousels.'}
                </h2>
                <p className="v2-section-subtitle">
                  {lang === 'fr'
                    ? "Des affiches éditoriales et campagnes événementielles aux séries de carrousels captivants pensés pour marquer les esprits."
                    : "From high-impact cultural and event posters to immersive brand carousels crafted with obsessive care."}
                </p>
              </div>

              <div className="v2-showcase-grid-3">
                {/* CARD 01: POSTERS & AFFICHES D'ART */}
                <div 
                  className="v2-project-card-large" 
                  onClick={() => setSelectedGraphic({
                    src: '/imgs/graphics/graphic_2souza_barman.jpg',
                    title: '2SOUZA Barman — Direction Artistique & Affiche Mixologie',
                    category: lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints',
                    slides: [
                      '/imgs/graphics/graphic_2souza_barman.jpg',
                      '/imgs/graphics/graphic_strategie_arena_red.jpg',
                      '/imgs/graphics/graphic_dada_billboard.jpg',
                      '/imgs/graphics/graphic_aidarag_tennis.jpg',
                      '/imgs/graphics/graphic_dada_collab_fistbump.jpg'
                    ],
                    currentSlideIndex: 0
                  })}
                >
                  <div className="v2-card-preview-container">
                    <img src="/imgs/graphics/graphic_2souza_barman.jpg" alt="Posters & Affiches" />
                    <span className="v2-project-year-badge">2025</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">
                        {lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints'}
                      </h3>
                      <button 
                        className="v2-project-explore-btn" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setSelectedGraphic({
                            src: '/imgs/graphics/graphic_2souza_barman.jpg',
                            title: '2SOUZA Barman — Direction Artistique & Affiche Mixologie',
                            category: lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints',
                            slides: [
                              '/imgs/graphics/graphic_2souza_barman.jpg',
                              '/imgs/graphics/graphic_strategie_arena_red.jpg',
                              '/imgs/graphics/graphic_dada_billboard.jpg',
                              '/imgs/graphics/graphic_aidarag_tennis.jpg',
                              '/imgs/graphics/graphic_dada_collab_fistbump.jpg'
                            ],
                            currentSlideIndex: 0
                          });
                        }}
                      >
                        <span>{lang === 'fr' ? 'Galerie (5)' : 'Gallery (5)'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Directions artistiques singulières, affiches de mixologie, événements culturels et compositions typographiques haute définition."
                        : "Art direction, editorial collage, mixology posters, and high-impact typographic layouts crafted for cultural events."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? '5 Affiches Haute Définition & Print' : '5 High-Definition Event Posters'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>Art Direction</span>
                      <span>Photoshop</span>
                      <span>Typographie</span>
                      <span>Print & Web</span>
                    </div>
                  </div>
                </div>

                {/* CARD 02: CARROUSELS & STORYTELLING */}
                <div 
                  className="v2-project-card-large" 
                  onClick={() => setSelectedGraphic({
                    src: '/imgs/graphics/carrousels/c1/1.png',
                    title: 'Strategy Arena — "Pourquoi une stratégie est le premier investissement"',
                    category: lang === 'fr' ? 'Carrousels' : 'Social Carousels',
                    slides: [
                      '/imgs/graphics/carrousels/c1/1.png',
                      '/imgs/graphics/carrousels/c1/2.png',
                      '/imgs/graphics/carrousels/c1/3.png',
                      '/imgs/graphics/carrousels/c1/4.png',
                      '/imgs/graphics/carrousels/c1/5.png',
                      '/imgs/graphics/carrousels/c1/6.png',
                      '/imgs/graphics/carrousels/c1/7.png'
                    ],
                    currentSlideIndex: 0
                  })}
                >
                  <div className="v2-card-preview-container">
                    <img src="/imgs/graphics/carrousels/c1/1.png" alt="Carrousels & Storytelling" />
                    <span className="v2-project-year-badge">2026</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'Carrousels Réseaux' : 'Social Carousels'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">
                        {lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels'}
                      </h3>
                      <button 
                        className="v2-project-explore-btn" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setSelectedGraphic({
                            src: '/imgs/graphics/carrousels/c1/1.png',
                            title: 'Strategy Arena — "Pourquoi une stratégie est le premier investissement"',
                            category: lang === 'fr' ? 'Carrousels' : 'Social Carousels',
                            slides: [
                              '/imgs/graphics/carrousels/c1/1.png',
                              '/imgs/graphics/carrousels/c1/2.png',
                              '/imgs/graphics/carrousels/c1/3.png',
                              '/imgs/graphics/carrousels/c1/4.png',
                              '/imgs/graphics/carrousels/c1/5.png',
                              '/imgs/graphics/carrousels/c1/6.png',
                              '/imgs/graphics/carrousels/c1/7.png'
                            ],
                            currentSlideIndex: 0
                          });
                        }}
                      >
                        <span>{lang === 'fr' ? 'Feuilleter' : 'Browse'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Structures narratives et visuelles complètes conçues pour captiver l'attention et générer un fort engagement slide après slide."
                        : "Multi-slide narrative frameworks and educational storytelling series crafted for peak attention and social engagement."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? '3 Séries Complètes (21 Slides Multi-Formats)' : '3 Complete Multi-Slide Series (21 Visuals)'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>Carrousels</span>
                      <span>Storytelling</span>
                      <span>Social Media</span>
                      <span>Growth Design</span>
                    </div>
                  </div>
                </div>

                {/* CARD 03: CAMPAGNES BILLBOARDS & PARTENARIATS */}
                <div 
                  className="v2-project-card-large" 
                  onClick={() => setSelectedGraphic({
                    src: '/imgs/graphics/graphic_dada_billboard.jpg',
                    title: 'DADA Management — Affiche Billboard Challenge 30 Jours',
                    category: lang === 'fr' ? 'Campagnes & Billboards' : 'Billboards & Campaigns',
                    slides: [
                      '/imgs/graphics/graphic_dada_billboard.jpg',
                      '/imgs/graphics/graphic_dada_collab_fistbump.jpg',
                      '/imgs/graphics/graphic_strategie_arena_red.jpg'
                    ],
                    currentSlideIndex: 0
                  })}
                >
                  <div className="v2-card-preview-container">
                    <img src="/imgs/graphics/graphic_dada_billboard.jpg" alt="Campagnes Billboards" />
                    <span className="v2-project-year-badge">2025</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'Campagnes & Billboards' : 'Billboards & Campaigns'}</span>
                    </div>
                  </div>
                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">
                        {lang === 'fr' ? 'Campagnes & Billboards' : 'Billboards & Campaigns'}
                      </h3>
                      <button 
                        className="v2-project-explore-btn" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setSelectedGraphic({
                            src: '/imgs/graphics/graphic_dada_billboard.jpg',
                            title: 'DADA Management — Affiche Billboard Challenge 30 Jours',
                            category: lang === 'fr' ? 'Campagnes & Billboards' : 'Billboards & Campaigns',
                            slides: [
                              '/imgs/graphics/graphic_dada_billboard.jpg',
                              '/imgs/graphics/graphic_dada_collab_fistbump.jpg',
                              '/imgs/graphics/graphic_strategie_arena_red.jpg'
                            ],
                            currentSlideIndex: 0
                          });
                        }}
                      >
                        <span>{lang === 'fr' ? 'Voir visuels' : 'View Visuals'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Affichage grand format, visuels de lancement de partenariats stratégiques et directions créatives 360° percutantes."
                        : "Urban billboard displays, strategic partnership launch assets, and high-impact 360° creative campaigns."}
                    </p>
                    <div className="v2-project-metrics-pill">
                      <span className="metric-icon">◆</span>
                      <span>{lang === 'fr' ? 'Affichage Urbain & Campagnes de Lancement' : 'Urban Billboards & Launch Campaigns'}</span>
                    </div>
                    <div className="v2-project-tags-row">
                      <span>Billboard</span>
                      <span>Campagne 360°</span>
                      <span>Partenariats</span>
                      <span>Direction Créative</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: CAREER LOGS & DETAILED TIMELINE (V2 DARK GLASS) */}
            <section id="career" className="v2-experience-section scroll-reveal">
              <div className="v2-experience-glow" aria-hidden="true" />

              <div className="v2-section-header">
                <span className="v2-section-eyebrow eyebrow-blue">
                  {lang === 'fr' ? 'Parcours & Expériences' : 'Career & Field Logs'}
                </span>
                <h2 className="v2-section-title">
                  {lang === 'fr' ? 'Parcours Professionnel & Impact.' : 'Professional Journey & Impact.'}
                </h2>
                <p className="v2-section-subtitle">
                  {lang === 'fr'
                    ? "Plus de 4 années d'expertise en Product Design, SaaS B2B, Direction Artistique Web et Vibe Coding."
                    : "Over 4 years of proven product craft, B2B SaaS architecture, web art direction, and rapid MVP prototyping."}
                </p>
              </div>

              <div className="v2-timeline-container">
                {/* ROLE 01: CACTUCE */}
                <div className="v2-timeline-card scroll-reveal delay-1">
                  <div className="v2-timeline-node node-red">
                    <div className="v2-timeline-node-inner" />
                  </div>
                  <div className="v2-timeline-body">
                    <div className="v2-timeline-header-row">
                      <div className="v2-timeline-title-group">
                        <span className="v2-timeline-company">CACTUCE</span>
                        <span className="v2-timeline-role-badge">Product Designer</span>
                      </div>
                      <span className="v2-timeline-date">OCT 2025 — MAY 2026</span>
                    </div>

                    <div className="v2-timeline-tagline">
                      B2B SAAS ARCHITECTURE &amp; PROCESS OPTIMIZATION
                    </div>

                    <ul className="v2-timeline-bullets">
                      <li>
                        {lang === 'fr'
                          ? "Lead Product Designer chargé de l'optimisation et de la refonte UX des plateformes eHadj (logistique nationale) et Asset IQ (télémétrie industrielle)."
                          : "Lead Product Designer in charge of optimizing user journeys and eliminating operational friction for national logistics (eHadj) and asset telemetry (Asset IQ)."}
                      </li>
                      <li>
                        {lang === 'fr'
                          ? "Conception des flux multi-agences (+30 ministères et entités), création du Design System Figma Tokens et harmonisation des parcours."
                          : "Designed end-to-end user flows for 30+ government agencies and health/bank gateways, establishing Figma Tokens & modular UI architecture."}
                      </li>
                      <li>
                        {lang === 'fr'
                          ? "Supervision complète de l'assurance qualité (recette QA), des audits d'accessibilité et des tests terrain auprès des opérateurs."
                          : "Supervised complete QA recipe process, accessibility audits, and field usability testing on mobile devices."}
                      </li>
                    </ul>

                    <div className="v2-timeline-impact-pill">
                      {lang === 'fr' ? 'RÉSULTAT : 90% d\'erreurs en moins & zéro doublon de dossier' : 'IMPACT: 90% reduction in dossier errors & zero duplicate records'}
                    </div>

                    <div className="v2-timeline-tools-row">
                      <span className="v2-timeline-tool-tag">Product Design</span>
                      <span className="v2-timeline-tool-tag">Figma Tokens</span>
                      <span className="v2-timeline-tool-tag">QA Recipe</span>
                      <span className="v2-timeline-tool-tag">eHadj &amp; Asset IQ</span>
                      <span className="v2-timeline-tool-tag">User Flows</span>
                    </div>
                  </div>
                </div>

                {/* ROLE 02: TRELLIX */}
                <div className="v2-timeline-card scroll-reveal delay-2">
                  <div className="v2-timeline-node node-blue">
                    <div className="v2-timeline-node-inner" />
                  </div>
                  <div className="v2-timeline-body">
                    <div className="v2-timeline-header-row">
                      <div className="v2-timeline-title-group">
                        <span className="v2-timeline-company">TRELLIX</span>
                        <span className="v2-timeline-role-badge badge-blue">Lead Product Designer</span>
                      </div>
                      <span className="v2-timeline-date">FEB 2024 — SEP 2025</span>
                    </div>

                    <div className="v2-timeline-tagline" style={{ color: '#60A5FA' }}>
                      ENTERPRISE SAAS &amp; PRODUCT STRATEGY LEADERSHIP
                    </div>

                    <ul className="v2-timeline-bullets">
                      <li>
                        {lang === 'fr'
                          ? "Direction et leadership de l'équipe design pour façonner des solutions SaaS B2B complexes centrées sur l'utilisateur."
                          : "Led design operations and product strategy, translating business objectives into high-performing SaaS interfaces."}
                      </li>
                      <li>
                        {lang === 'fr'
                          ? "Rédaction intégrale des Product Requirement Documents (PRDs), spécifications fonctionnelles & API, et gestion des cycles de recherche utilisateur."
                          : "Authored complete PRDs, API functional specifications, and led comprehensive user research & heuristic evaluation sprints."}
                      </li>
                      <li>
                        {lang === 'fr'
                          ? "Mise en place de standards de livraison dev-handoff ayant augmenté la vélocité de développement de +50%."
                          : "Established rigorous dev-handoff protocols and design tokens, boosting engineering delivery speed by +50%."}
                      </li>
                    </ul>

                    <div className="v2-timeline-impact-pill pill-blue">
                      {lang === 'fr' ? 'RÉSULTAT : +50% de vélocité de dev via PRDs & specs' : 'IMPACT: +50% dev velocity via PRDs & clear functional specs'}
                    </div>

                    <div className="v2-timeline-tools-row">
                      <span className="v2-timeline-tool-tag">PRD Writing</span>
                      <span className="v2-timeline-tool-tag">Team Leadership</span>
                      <span className="v2-timeline-tool-tag">User Research</span>
                      <span className="v2-timeline-tool-tag">B2B SaaS</span>
                      <span className="v2-timeline-tool-tag">Dev Handoff</span>
                    </div>
                  </div>
                </div>

                {/* ROLE 03: CREAFIX */}
                <div className="v2-timeline-card scroll-reveal delay-3">
                  <div className="v2-timeline-node node-green">
                    <div className="v2-timeline-node-inner" />
                  </div>
                  <div className="v2-timeline-body">
                    <div className="v2-timeline-header-row">
                      <div className="v2-timeline-title-group">
                        <span className="v2-timeline-company">CREAFIX</span>
                        <span className="v2-timeline-role-badge badge-green">Web Designer</span>
                      </div>
                      <span className="v2-timeline-date">AUG 2022 — FEB 2024</span>
                    </div>

                    <div className="v2-timeline-tagline" style={{ color: '#34D399' }}>
                      WEB ART DIRECTION &amp; BRAND EXPERIENCE
                    </div>

                    <ul className="v2-timeline-bullets">
                      <li>
                        {lang === 'fr'
                          ? "Conception d'interfaces web d'exception et de vitrines interactives pour +15 clients et agences internationales."
                          : "Crafted high-end responsive websites, custom e-commerce experiences, and brand visual systems for 15+ clients."}
                      </li>
                      <li>
                        {lang === 'fr'
                          ? "Direction artistique web, typographie éditoriale, animations 60fps et optimisation responsive multi-supports."
                          : "Spearheaded web art direction, editorial typography, 60fps micro-animations, and multi-device responsive layouts."}
                      </li>
                      <li>
                        {lang === 'fr'
                          ? "Création d'actifs pour campagnes marketing digitales et optimisation du taux de conversion (CRO)."
                          : "Created marketing campaign assets, promotional landing pages, and optimized conversion funnels."}
                      </li>
                    </ul>

                    <div className="v2-timeline-impact-pill pill-green">
                      {lang === 'fr' ? 'RÉSULTAT : +15 vitrines web & e-commerce d\'exception livrées' : 'IMPACT: 15+ luxury showcase & e-commerce sites delivered'}
                    </div>

                    <div className="v2-timeline-tools-row">
                      <span className="v2-timeline-tool-tag">Web Art Direction</span>
                      <span className="v2-timeline-tool-tag">Responsive UI</span>
                      <span className="v2-timeline-tool-tag">E-Commerce</span>
                      <span className="v2-timeline-tool-tag">Micro-Animations</span>
                      <span className="v2-timeline-tool-tag">CRO</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: REFERENCE DUAL-PANEL CONNECT & FOOTER */}
            <ConnectAndFooterSection setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
          </main>
        </div>
      )}
    </>
  );
}

