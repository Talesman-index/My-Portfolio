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
  Lock,
  TrendingUp,
  Quote,
  ShieldCheck,
  Sparkles,
  Workflow,
  LayoutGrid,
  Maximize2
} from 'lucide-react';
import './App.css';
import { caseStudiesData, CaseStudyId } from './caseStudiesData';
import PageTurnOverlay from './components/PageTurnOverlay';
import GlassMonogram from './components/GlassMonogram';
import HeroSignature from './components/HeroSignature';
import { GlassServiceVisual } from './components/ServiceGlassVisuals';
import { FuturisticPreloader } from './components/FuturisticPreloader';
import { CreativeTimelineExperience, TimelineExperienceItem } from './components/CreativeTimelineExperience';
import { SymbolWatermark, SymbolGlyphIcon, SymbolLaserDivider } from './components/SymbolIllustrations';
import { TextReveal, WordByWordReveal } from './components/TextReveal';
import { ScrollToTopButton } from './components/ScrollToTopButton';






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
  setCurrentView('home', 'reverse');
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
                  <strong style={{ color: '#FFFFFF' }}>EXECUTIVE DOSSIER</strong> <br />
                  Sacca Dafia · Talesman
                </div>
              </div>

              {/* Photo 2: Warm Ambient Workspace */}
              <div style={{ background: 'rgba(5, 8, 16, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', overflow: 'hidden' }}>
                <img src="/imgs/vibe_coding_setup.jpg" alt="Vibe Coding Setup" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#38BDF8', marginTop: '10px', lineHeight: 1.4 }}>
                  <strong style={{ color: '#FFFFFF' }}>VIBE CODING</strong> <br />
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
   CASE STUDY DOSSIER VIEW (V2 DARK ARCHITECTURAL SHOWCASE)
───────────────────────────────────────────── */
const CaseStudy = ({ 
  id, 
  setCurrentView, 
  setIsAboutModalOpen,
  lang 
}: { 
  id: CaseStudyId; 
  setCurrentView: any; 
  setIsAboutModalOpen: any; 
  lang: 'en' | 'fr'; 
}) => {
  const data = caseStudiesData[lang][id] || caseStudiesData['fr']['asset-iq'];
  const config = PROJECT_CONFIGS[id] || { title: data.title, color: '#1D4ED8', categoryLabel: 'Design Dossier', year: '2026' };
  const liveUrl = data.externalLink || config.externalLink || 'https://www.truvox.studio/';

  const allKeys = Object.keys(PROJECT_CONFIGS) as CaseStudyId[];
  const currentIndex = allKeys.indexOf(id);
  const nextId = allKeys[(currentIndex + 1) % allKeys.length];
  const nextConfig = PROJECT_CONFIGS[nextId];

  // Primary showcase visual
  const showcaseImage = data.interfaceImg || data.dashboardImg || data.contextImg || data.bgImage || "/imgs/hero_image.png";

  return (
    <div className="v2-subpage-wrapper">
      <div className="v2-subpage-ambient-glow" style={{ background: `radial-gradient(circle, ${config.color}28 0%, rgba(56, 189, 248, 0.08) 45%, transparent 70%)` }} />

      {/* Architectural Blueprint Glass Symbol Watermark in Background */}
      <SymbolWatermark size={760} color="cyan" opacity={0.08} className="v2-watermark-ambient watermark-pos-right" />

      <div className="v2-subpage-container v2-cs-layout">
        {/* Top Floating Control Bar */}
        <div className="v2-cs-top-bar">
          <button 
            onClick={() => navigateToHome(setCurrentView)} 
            className="v2-subpage-back-btn"
          >
            <ArrowLeft size={16} /> <span>{lang === 'fr' ? 'RETOUR AU PORTFOLIO' : 'BACK TO PORTFOLIO'}</span>
          </button>

          <div className="v2-cs-top-actions">
            <span className="v2-cs-reg-badge">
              REG // SD-{id.toUpperCase()}-{config.year}
            </span>
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="v2-cs-live-pill"
              >
                <span className="v2-cs-live-dot" />
                <span>{lang === 'fr' ? 'VOIR LE PROJET LIVE' : 'LIVE EXPERIENCE'}</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Cinematic Project Header */}
        <header className="v2-cs-header">
          <div className="v2-cs-eyebrow-wrap">
            <span className="v2-cs-eyebrow" style={{ color: config.color, borderColor: `${config.color}50` }}>
              <span className="v2-cs-eyebrow-dot" style={{ background: config.color }} />
              {config.categoryLabel.toUpperCase()}
            </span>
            <span className="v2-cs-year-tag">{config.year}</span>
          </div>

          <h1 className="v2-cs-main-title">
            {data.title}
          </h1>

          {data.subtitle && (
            <p className="v2-cs-main-subtitle">
              {data.subtitle}
            </p>
          )}

          {/* Floating Specs Ribbon / Dock */}
          <div className="v2-cs-specs-ribbon">
            <div className="v2-cs-spec-cell">
              <span className="v2-cs-spec-kicker">ROLE</span>
              <span className="v2-cs-spec-value">Web &amp; Product Designer</span>
            </div>
            <div className="v2-cs-spec-cell">
              <span className="v2-cs-spec-kicker">SCOPE</span>
              <span className="v2-cs-spec-value">{data.label}</span>
            </div>
            <div className="v2-cs-spec-cell">
              <span className="v2-cs-spec-kicker">TIMELINE</span>
              <span className="v2-cs-spec-value">{config.year} · Production</span>
            </div>
            <div className="v2-cs-spec-cell">
              <span className="v2-cs-spec-kicker">DELIVERABLES</span>
              <span className="v2-cs-spec-value">UI/UX, Tokens &amp; System Specs</span>
            </div>
          </div>
        </header>

        {/* Monumental Showcase Canvas with macOS Window Chrome */}
        <div className="v2-cs-canvas-wrap">
          <div className="v2-cs-canvas-window">
            <div className="v2-cs-window-bar">
              <div className="v2-cs-window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="v2-cs-window-url">
                <Lock size={12} className="v2-cs-lock-icon" />
                <span>https://app.{id}.io/production-release</span>
              </div>
              <div className="v2-cs-window-badge">
                <Sparkles size={13} color="#38BDF8" />
                <span>{lang === 'fr' ? 'Interface Live' : 'Live System'}</span>
              </div>
            </div>

            <div className="v2-cs-window-body">
              <img src={showcaseImage} alt={data.title} className="v2-cs-window-img" />
              <div className="v2-cs-window-overlay" />
            </div>
          </div>
        </div>

        {/* Narrative Deep Dive (Editorial 2-Column Grid) */}
        <section className="v2-cs-narrative-section">
          <div className="v2-cs-narrative-grid">
            {/* Left Column: Context & Friction */}
            <div className="v2-cs-narrative-card context-card">
              <div className="v2-cs-card-num-tag" style={{ color: config.color }}>
                01 / {lang === 'fr' ? 'CONTEXTE & ENJEUX' : 'CONTEXT & CHALLENGE'}
              </div>
              <h2 className="v2-cs-narrative-heading">
                {data.contextTitle || (lang === 'fr' ? 'La complexité opérationnelle' : 'The Operational Friction')}
              </h2>
              <p className="v2-cs-narrative-lead">
                {data.context}
              </p>
              <div className="v2-cs-divider-line" />
              <div className="v2-cs-problem-box">
                <span className="v2-cs-mini-label">{lang === 'fr' ? 'LE DÉFI CRITIQUE' : 'THE CORE CHALLENGE'}</span>
                <p>{data.problem || data.challenge}</p>
              </div>
            </div>

            {/* Right Column: Architectural Solution & Insight */}
            <div className="v2-cs-narrative-card solution-card">
              <div className="v2-cs-card-num-tag" style={{ color: '#38BDF8' }}>
                02 / {lang === 'fr' ? 'APPROCHE & ARCHITECTURE UX' : 'SYSTEM ARCHITECTURE & UX'}
              </div>
              <h2 className="v2-cs-narrative-heading">
                {data.solutionTitle || (lang === 'fr' ? 'Orchestration procédurale & interface unifiée' : 'Unified Procedural Orchestration')}
              </h2>
              <p className="v2-cs-narrative-lead">
                {data.solution || data.uxSolutions || data.challenge}
              </p>
              
              {/* Insight Quote Callout */}
              <div className="v2-cs-insight-quote-box">
                <Quote size={26} className="v2-cs-quote-icon" />
                <div>
                  <span className="v2-cs-mini-label" style={{ color: '#38BDF8' }}>
                    KEY DESIGN INSIGHT
                  </span>
                  <p className="v2-cs-quote-text">"{data.insight}"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architectural Decisions Flow (if available) */}
        {data.decisions && data.decisions.length > 0 && (
          <section className="v2-cs-decisions-section">
            <div className="v2-cs-section-header">
              <div className="v2-cs-header-pill">
                <Workflow size={15} color="#38BDF8" />
                <span>{lang === 'fr' ? 'DÉCISIONS D\'ARCHITECTURE UX' : 'ARCHITECTURAL UX DECISIONS'}</span>
              </div>
              <h2 className="v2-cs-section-title">
                {lang === 'fr' ? 'Arbitrages clés & Logique de conception' : 'Key Trade-offs & Strategic Logic'}
              </h2>
            </div>

            <div className="v2-cs-decisions-grid">
              {data.decisions.map((dec, idx) => (
                <div key={idx} className="v2-cs-decision-card">
                  <div className="v2-cs-decision-top">
                    <span className="v2-cs-step-badge">0{idx + 1}</span>
                    <h3 className="v2-cs-decision-title">{dec.title}</h3>
                  </div>
                  <p className="v2-cs-decision-desc">{dec.desc}</p>
                  <div className="v2-cs-decision-why">
                    <span className="why-label">{lang === 'fr' ? 'POURQUOI CET ARBITRAGE :' : 'RATIONALE :'}</span>
                    <span>{dec.why}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Asymmetric Bento Showcase: Artifacts, Research & Interface */}
        <section className="v2-cs-bento-section">
          <div className="v2-cs-section-header">
            <div className="v2-cs-header-pill">
              <Layers size={15} color="#C084FC" />
              <span>{lang === 'fr' ? 'ARTEFACTS & PREUVES DE CONCEPTION' : 'DESIGN ARTIFACTS & EVIDENCE'}</span>
            </div>
            <h2 className="v2-cs-section-title">
              {lang === 'fr' ? 'De l\'analyse terrain à la production' : 'From Field Research to Final Production'}
            </h2>
          </div>

          <div className="v2-cs-bento-grid">
            {/* Card A: Research / Context Photo */}
            {(data.challengeImg || data.contextImg) && (
              <div className="v2-cs-bento-card bento-discovery">
                <div className="v2-cs-bento-media">
                  <img src={data.challengeImg || data.contextImg} alt="Discovery Artifact" />
                  <div className="v2-cs-bento-badge">{lang === 'fr' ? '01 / RÉALITÉ TERRAIN & AUDIT' : '01 / FIELD AUDIT'}</div>
                </div>
                <div className="v2-cs-bento-content">
                  <h3 className="v2-cs-bento-title">{lang === 'fr' ? 'Immersion & Découverte' : 'Discovery & Field Reality'}</h3>
                  <p className="v2-cs-bento-desc">"{data.insight}"</p>
                </div>
              </div>
            )}

            {/* Card B: System Logic / Flow */}
            {(data.dashboardImg || data.bgImage) && (
              <div className="v2-cs-bento-card bento-system">
                <div className="v2-cs-bento-media">
                  <img src={data.dashboardImg || data.bgImage} alt="System Architecture" />
                  <div className="v2-cs-bento-badge" style={{ color: '#C084FC' }}>{lang === 'fr' ? '02 / ARCHITECTURE SYSTÈME' : '02 / SYSTEM LOGIC'}</div>
                </div>
                <div className="v2-cs-bento-content">
                  <h3 className="v2-cs-bento-title">{lang === 'fr' ? 'Modélisation des Flux' : 'Workflow Orchestration'}</h3>
                  <p className="v2-cs-bento-desc">{data.uxSolutions || data.solution}</p>
                </div>
              </div>
            )}

            {/* Card C: Polished Interface (Wide) */}
            {data.interfaceImg && (
              <div className="v2-cs-bento-card bento-interface-wide">
                <div className="v2-cs-bento-media wide-media">
                  <img src={data.interfaceImg} alt="Interface Showcase" />
                  <div className="v2-cs-bento-badge" style={{ color: '#34D399' }}>{lang === 'fr' ? '03 / INTERFACE FINALE LIVRÉE' : '03 / POLISHED PRODUCTION INTERFACE'}</div>
                </div>
                <div className="v2-cs-bento-content">
                  <h3 className="v2-cs-bento-title">{lang === 'fr' ? 'Expérience Utilisateur Finale' : 'Final User Experience'}</h3>
                  <p className="v2-cs-bento-desc">{data.conclusion}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Systemic Capabilities & Feature Modules */}
        {data.features && data.features.length > 0 && (
          <section className="v2-cs-features-section">
            <div className="v2-cs-section-header">
              <div className="v2-cs-header-pill">
                <ShieldCheck size={15} color={config.color} />
                <span>{lang === 'fr' ? 'CAPACITÉS & MODULES' : 'SYSTEMIC CAPABILITIES'}</span>
              </div>
              <h2 className="v2-cs-section-title">
                {lang === 'fr' ? 'Fonctionnalités & Spécifications Clés' : 'Core Features & Structural Modules'}
              </h2>
            </div>

            <div className="v2-cs-features-grid">
              {data.features.map((feat, idx) => (
                <div key={idx} className="v2-cs-feature-card" style={{ borderTopColor: config.color }}>
                  <div className="v2-cs-feature-num">0{idx + 1}</div>
                  <h3 className="v2-cs-feature-title">{feat.title}</h3>
                  <p className="v2-cs-feature-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Measurable Outcomes & Business Impact */}
        {data.impact && data.impact.length > 0 && (
          <section className="v2-cs-impact-section">
            <div className="v2-cs-section-header">
              <div className="v2-cs-header-pill">
                <TrendingUp size={15} color="#38BDF8" />
                <span>{lang === 'fr' ? 'RÉSULTATS & IMPACT' : 'MEASURABLE IMPACT'}</span>
              </div>
              <h2 className="v2-cs-section-title">
                {lang === 'fr' ? 'Impact mesurable & valeur métier créée' : 'Quantified Outcomes & Business Value'}
              </h2>
            </div>

            <div className="v2-cs-impact-grid">
              {data.impact.map((imp, idx) => (
                <div key={idx} className="v2-cs-impact-card">
                  <div className="v2-cs-impact-icon-wrap">
                    <CheckCircle2 size={18} color="#38BDF8" />
                  </div>
                  <div className="v2-cs-impact-text">{imp}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Project Footer Bar */}
        <div 
          className="v2-cs-next-banner" 
          onClick={() => {
            setCurrentView(nextId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="v2-cs-next-info">
            <span className="v2-cs-next-eyebrow">
              {lang === 'fr' ? 'ÉTUDE DE CAS SUIVANTE' : 'NEXT CASE STUDY'}
            </span>
            <h3 className="v2-cs-next-name">{nextConfig.title}</h3>
            <span className="v2-cs-next-cat" style={{ color: nextConfig.color }}>
              {nextConfig.categoryLabel}
            </span>
          </div>
          <div className="v2-cs-next-action">
            <span className="v2-cs-next-cue">{lang === 'fr' ? 'Explorer' : 'Explore'}</span>
            <div className="v2-cs-next-arrow-circle">
              <ArrowRight size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Laser Divider & Global Monumental Connect Footer */}
      <SymbolLaserDivider color="cyan" />
      <ConnectAndFooterSection setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   SHARED TIMELINE EXPERIENCE DATA
───────────────────────────────────────────── */
const getTimelineExperiences = (lang: 'fr' | 'en' = 'fr'): TimelineExperienceItem[] => [
  {
    id: 'cactuce',
    company: 'CACTUCE',
    monogram: 'CT',
    role: 'Product Designer',
    period: lang === 'fr' ? 'Octobre 2025 — Mai 2026' : 'OCT 2025 — MAY 2026',
    yearBadge: '2025 — 2026',
    statusBadge: lang === 'fr' ? 'eHadj & Asset IQ · GovTech & SaaS' : 'eHadj & Asset IQ · GovTech & SaaS',
    tagline: lang === 'fr' ? 'ORCHESTRATION LOGISTIQUE NATIONALE & TÉLÉMÉTRIE INDUSTRIELLE' : 'NATIONAL LOGISTICS ORCHESTRATION & INDUSTRIAL TELEMETRY',
    description:
      lang === 'fr'
        ? "Lead Product Designer sur les deux plateformes phares : eHadj (dématérialisation et sécurisation du pèlerinage national pour plus de 30 ministères et agences agréées) et Asset IQ (gouvernance et télémétrie de flotte d'équipements industriels). Conception des flux NPI, du Design System multi-thème et suivi de la recette technique."
        : "Lead Product Designer on two flagship enterprise platforms: eHadj (national pilgrim orchestration across 30+ government ministries and private travel agencies) and Asset IQ (industrial fleet governance and equipment telemetry). Designed identity-first NPI flows, established scalable Figma tokens, and supervised engineering QA.",
    accentColor: 'cyan',
    tags: ['eHadj (GovTech)', 'Asset IQ (IoT)', 'Figma Tokens', 'Parcours NPI', 'Recette QA', 'Architecture SaaS'],
    highlights: lang === 'fr' ? [
      'eHadj : Parcours NPI, validation Santé ➔ Banques ➔ Visas',
      'Asset IQ : Inventaire QR code & télémétrie de flotte en 3 étapes',
      'Design System : Tokens sémantiques Figma & recette QA avec les devs'
    ] : [
      'eHadj: NPI identity flow & Health ➔ Bank ➔ Visa sequential workflow',
      'Asset IQ: 3-step field equipment QR capture & real-time telemetry',
      'Design System: Semantic Figma tokens & zero-regression dev QA'
    ]
  },
  {
    id: 'trellix',
    company: 'TRELLIX',
    monogram: 'TX',
    role: lang === 'fr' ? 'Chef de Projet Intégrations & Product Designer' : 'Integration PM & Product Designer',
    period: lang === 'fr' ? 'Février 2024 — Septembre 2025' : 'FEB 2024 — SEP 2025',
    yearBadge: '2024 — 2025',
    statusBadge: lang === 'fr' ? 'Beans · SaaS B2B & Écosystème' : 'Beans · B2B SaaS & Ecosystem',
    tagline: lang === 'fr' ? 'PLATEFORME BEANS (TRYBEANS.COM) : HUB D\'INTÉGRATIONS & ENGAGEMENT' : 'BEANS PLATFORM (TRYBEANS.COM): INTEGRATION HUB & ENGAGEMENT',
    description:
      lang === 'fr'
        ? "Chef de Projet Intégrations & Product Designer sur la plateforme SaaS Beans (trybeans.com). Pilotage de A à Z du hub de connecteurs tiers : rédaction des PRDs et spécifications API, design des flux d'activation en 2 clics et direction visuelle des Feature Images. Supervision des sprints dev et recette QA sur 10 intégrations majeures (Shopify, Klaviyo, Instagram, POS, WooCommerce...)."
        : "Integration Project Manager & Product Designer on Beans (trybeans.com), an enterprise customer loyalty SaaS. Led the third-party connector hub from audit to rollout: authored comprehensive PRDs & API specs, designed 2-click activation UX, created app store feature images, and supervised dev sprints with QA for 10 major integrations (Shopify, Klaviyo, Instagram, POS, WooCommerce...).",
    accentColor: 'blue',
    tags: ['Beans (trybeans.com)', 'Hub d\'Intégrations', 'Cadrage PRD & APIs', 'Connecteurs Shopify & POS', 'Supervision Dev & QA', 'SaaS Loyalty'],
    highlights: lang === 'fr' ? [
      'Beans : 10 connecteurs tiers majeurs livrés (Shopify, Klaviyo, POS, Instagram)',
      'Rédaction des PRDs & spécifications API réduisant les temps de dev de 50%',
      'UX Plug & Play en 2 clics, visuels Feature Images & recette QA sans bogue'
    ] : [
      'Beans: 10 major third-party connectors shipped (Shopify, Klaviyo, POS, Instagram)',
      'Comprehensive PRDs & API specs cutting engineering development cycles by 50%',
      'Plug & Play 2-click activation UX, app store feature images & zero-bug QA'
    ]
  },
  {
    id: 'creafix',
    company: 'CREAFIX',
    monogram: 'CF',
    role: lang === 'fr' ? 'Web Designer & DA' : 'Web Designer & Art Director',
    period: lang === 'fr' ? 'Août 2022 — Février 2024' : 'AUG 2022 — FEB 2024',
    yearBadge: '2022 — 2024',
    statusBadge: lang === 'fr' ? 'Resthy & Terroir Bénin · E-Commerce' : 'Resthy & Terroir Bénin · E-Commerce',
    tagline: lang === 'fr' ? 'DIRECTION ARTISTIQUE WEB, E-COMMERCE & EXPÉRIENCES DE MARQUE' : 'WEB ART DIRECTION, E-COMMERCE & BRAND EXPERIENCES',
    description:
      lang === 'fr'
        ? "Web Designer & Directeur Artistique en charge de la conception d'expériences digitales immersives et de boutiques e-commerce pour des marques phares telles que Resthy Pâtisseries et Terroir Bénin. Création d'identités visuelles soignées, structuration de catalogues de produits, micro-interactions 60fps et optimisation continue des tunnels de conversion (CRO)."
        : "Web Designer & Art Director responsible for crafting immersive digital showcases and custom e-commerce experiences for prominent brands including Resthy Pâtisseries and Terroir Bénin. Led brand art direction, catalog UX structuring, 60fps responsive micro-interactions, and conversion-optimized checkout funnels.",
    accentColor: 'green',
    tags: ['Resthy Pâtisseries', 'Terroir Bénin', 'Direction Artistique Web', 'E-Commerce Sur-Mesure', 'Micro-Animations 60fps', 'Optimisation CRO'],
    highlights: lang === 'fr' ? [
      'Resthy Pâtisseries : Boutique en ligne sur mesure & mise en valeur gourmande',
      'Terroir Bénin : Expérience e-commerce de produits locaux & tunnel d\'achat fluide',
      'Direction artistique web soignée, micro-animations 60fps & optimisation CRO'
    ] : [
      'Resthy Pâtisseries: Custom online boutique & high-end appetizing showcase',
      'Terroir Bénin: Authentic local goods e-commerce & friction-free checkout',
      'Refined web art direction, 60fps micro-interactions & CRO optimization'
    ]
  }
];

/* ─────────────────────────────────────────────
   EXPERIENCES DOSSIER VIEW (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const ExperiencesView = ({ 
  setCurrentView, 
  setIsAboutModalOpen,
  lang = 'fr' 
}: { 
  setCurrentView: any; 
  setIsAboutModalOpen: any;
  lang?: 'en' | 'fr'; 
}) => {
  return (
    <div className="v2-subpage-wrapper">
      <div className="v2-subpage-ambient-glow" />

      {/* Architectural Blueprint Glass Symbol Watermark in Background */}
      <SymbolWatermark size={680} color="emerald" opacity={0.09} className="v2-watermark-ambient watermark-pos-left" />

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
              {lang === 'fr' ? 'PARCOURS PROFESSIONNEL & EXPÉRIENCES' : 'CAREER TRACK & EXPERIENCE LOGS'}
            </span>
            <h1 className="v2-subpage-title">
              {lang === 'fr' ? 'REGISTRE DES EXPÉRIENCES' : 'EXPERIENCE DOSSIER'}
            </h1>
          </div>
        </div>

        {/* Dynamic Creative Interactive Timeline */}
        <CreativeTimelineExperience items={getTimelineExperiences(lang)} lang={lang} />
      </div>

      {/* Laser Divider & Monumental Connect Footer */}
      <SymbolLaserDivider color="emerald" />
      <ConnectAndFooterSection setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   SERVICES DOSSIER VIEW (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const ServicesView = ({ 
  setCurrentView, 
  setIsAboutModalOpen,
  lang = 'fr' 
}: { 
  setCurrentView: any; 
  setIsAboutModalOpen: any;
  lang?: 'en' | 'fr'; 
}) => {
  return (
    <div className="v2-subpage-wrapper">
      <div className="v2-subpage-ambient-glow" />

      {/* Architectural Blueprint Glass Symbol Watermark in Background */}
      <SymbolWatermark size={680} color="cyan" opacity={0.09} className="v2-watermark-ambient watermark-pos-right" />

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
              <div className="v2-service-index-wrap">
                <span className="v2-service-category-label">SaaS &amp; Product</span>
              </div>
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
              <span className="v2-service-tag">Figma Tokens</span>
              <span className="v2-service-tag">User Flows</span>
              <span className="v2-service-tag">Telemetry</span>
              <span className="v2-service-tag">Data Viz</span>
            </div>
          </div>

          {/* CARD 02: ART DIRECTION & WEB DESIGN */}
          <div className="v2-service-card card-glow-yellow">
            <div className="v2-service-card-top">
              <div className="v2-service-index-wrap">
                <span className="v2-service-category-label">Web Craft &amp; Art</span>
              </div>
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
              <span className="v2-service-tag">Art Direction</span>
              <span className="v2-service-tag">Spatial Motion</span>
              <span className="v2-service-tag">Editorial Type</span>
              <span className="v2-service-tag">CRO Strategy</span>
            </div>
          </div>

          {/* CARD 03: VIBE CODING & RAPID MVP */}
          <div className="v2-service-card card-glow-green">
            <div className="v2-service-card-top">
              <div className="v2-service-index-wrap">
                <span className="v2-service-category-label">Rapid MVP &amp; AI</span>
              </div>
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
              <span className="v2-service-tag">React &amp; TypeScript</span>
              <span className="v2-service-tag">Google AI Studio</span>
              <span className="v2-service-tag">Rapid MVP</span>
              <span className="v2-service-tag">Live Deploys</span>
            </div>
          </div>

          {/* CARD 04: DESIGN SYSTEMS & DEV HANDOFF */}
          <div className="v2-service-card card-glow-purple">
            <div className="v2-service-card-top">
              <div className="v2-service-index-wrap">
                <span className="v2-service-category-label">Systems &amp; Dev</span>
              </div>
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
              <span className="v2-service-tag">Token Engine</span>
              <span className="v2-service-tag">WCAG AAA</span>
              <span className="v2-service-tag">Storybook</span>
              <span className="v2-service-tag">Zero Drift</span>
            </div>
          </div>
        </div>
      </div>

      {/* Laser Divider & Monumental Connect Footer */}
      <SymbolLaserDivider color="cyan" />
      <ConnectAndFooterSection setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   ALL PROJECTS DOSSIER VIEW (V2 DARK GLASSMORPHISM)
───────────────────────────────────────────── */
const AllProjectsView = ({ 
  setCurrentView, 
  setIsAboutModalOpen: _setIsAboutModalOpen,
  setSelectedGraphic,
  lang 
}: { 
  setCurrentView: any; 
  setIsAboutModalOpen: any;
  setSelectedGraphic?: any;
  lang: 'en' | 'fr'; 
}) => {
  const [activeSection, setActiveSection] = useState<string>('all');

  const categories = [
    {
      id: 'saas',
      label: lang === 'fr' ? 'SaaS & B2B' : 'SaaS & B2B',
      desc: lang === 'fr'
        ? "Produits SaaS enterprise-grade, architectures UX multi-acteurs et systèmes de design Figma tokens pour des clients B2B exigeants."
        : "Enterprise-grade SaaS products, multi-actor UX architectures and Figma token design systems for demanding B2B clients.",
      projects: [
        { id: 'asset-iq', title: 'Asset IQ', tag: 'Product Design & SaaS', date: '2026', img: '/imgs/assetiQ/cover_Asset.jpg', color: '#1D4ED8' },
        { id: 'ehadj', title: 'eHadj', tag: 'National Logistics SaaS', date: '2026', img: '/imgs/ehadj/cover_Ehadj.jpg', color: '#EAB308' },
        { id: 'beans', title: 'Beans', tag: 'B2B SaaS Engagement', date: '2025', img: '/imgs/beans_cover.png', color: '#059669' },
      ]
    },
    {
      id: 'mobile',
      label: 'Mobile UX',
      desc: lang === 'fr'
        ? "Applications mobiles à haute performance, UI d'achat frictionless et data visualization pour plateformes iOS & Android."
        : "High-performance mobile apps, frictionless purchasing UI and data visualization for iOS & Android platforms.",
      projects: [
        { id: 'vortex', title: 'Vortex', tag: 'Mobile UX & Fuel Wallet', date: '2026', img: '/imgs/vortex.webp', color: '#D97706' },
        { id: 'sport-advisor', title: 'Sport Advisor', tag: 'AI & Data Visualization', date: '2025', img: '/imgs/advisor.webp', color: '#00FA9A' },
      ]
    },
    {
      id: 'web',
      label: lang === 'fr' ? 'Web & Branding' : 'Web & Branding',
      desc: lang === 'fr'
        ? "Sites vitrine haut de gamme, direction artistique éditoriale, identités de marque et landing pages de conversion."
        : "Premium showcase sites, editorial art direction, brand identities and high-converting landing pages.",
      projects: [
        { id: 'dolce-riviera', title: 'Dolce Riviera', tag: 'Luxury Hospitality UI/UX', date: '2025', img: '/imgs/dolce_cover.png', color: '#C5A059' },
        { id: 'strategy-arena', title: 'Strategy Arena', tag: 'Branding & Web Strategy', date: '2026', img: '/imgs/Strategy-Arena.png', color: '#EAB308' },
        { id: 'truvox', title: 'Truvox Studio', tag: 'Web Design & Studio', date: '2025', img: '/imgs/truvox_cover.png', color: '#10B981' },
        { id: 'sagana', title: 'Sagana Agency', tag: 'Web Art Direction', date: '2025', img: '/imgs/sagana.png', color: '#F59E0B' },
        { id: 'tavares', title: 'Tavares & Visuals', tag: 'Creative Art Direction', date: '2025', img: '/imgs/tavares.png', color: '#DC2626' },
        { id: 'the-refuge', title: 'The Refuge', tag: 'Humanitarian Portal', date: '2025', img: '/imgs/refuge.png', color: '#0d3479' },
      ]
    },
    {
      id: 'graphic',
      label: 'Graphic Design',
      desc: lang === 'fr'
        ? "Directions artistiques singulières, affiches éditoriales et campagnes événementielles grand format."
        : "Distinctive art direction, editorial posters, and high-impact large-format brand campaigns.",
      projects: [
        {
          id: 'graphic-posters',
          title: lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints',
          tag: 'Editorial & Print 300dpi',
          date: '2025',
          img: '/imgs/graphics/graphic_2souza_barman.jpg',
          color: '#8B5CF6',
          isGraphic: true,
          graphicData: {
            src: '/imgs/graphics/graphic_2souza_barman.jpg',
            title: '2SOUZA Barman — Direction Artistique & Affiche Mixologie',
            category: lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints',
            slides: [
              '/imgs/graphics/graphic_2souza_barman.jpg',
              '/imgs/graphics/graphic_strategie_arena_red.jpg',
              '/imgs/graphics/graphic_aidarag_tennis.jpg'
            ],
            currentSlideIndex: 0
          }
        },
        {
          id: 'graphic-carrousels',
          title: lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels',
          tag: 'Storytelling & Growth',
          date: '2026',
          img: '/imgs/graphics/carrousels/c2/cover.png',
          color: '#EC4899',
          isGraphic: true,
          graphicData: {
            src: '/imgs/graphics/carrousels/c2/cover.png',
            title: 'Strategy Arena — "Entre une idée brillante et une entreprise rentable"',
            category: lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels',
            slides: [
              '/imgs/graphics/carrousels/c2/cover.png',
              '/imgs/graphics/carrousels/c2/1.png',
              '/imgs/graphics/carrousels/c2/2.png',
              '/imgs/graphics/carrousels/c2/3.png',
              '/imgs/graphics/carrousels/c2/4.png',
              '/imgs/graphics/carrousels/c2/5.png',
              '/imgs/graphics/carrousels/c2/6.png',
              '/imgs/graphics/carrousels/c2/7.png',
              '/imgs/graphics/carrousels/c4/1.png',
              '/imgs/graphics/carrousels/c4/2.png',
              '/imgs/graphics/carrousels/c4/3.png',
              '/imgs/graphics/carrousels/c4/4.png',
              '/imgs/graphics/carrousels/c4/5.png',
              '/imgs/graphics/carrousels/c4/6.png',
              '/imgs/graphics/carrousels/c4/7.png'
            ],
            currentSlideIndex: 0
          }
        },
        {
          id: 'graphic-billboards',
          title: lang === 'fr' ? 'Campagnes & Billboards' : 'Campaigns & Billboards',
          tag: 'Brand Identity & Visuals',
          date: '2025',
          img: '/imgs/graphics/graphic_dada_billboard.jpg',
          color: '#F59E0B',
          isGraphic: true,
          graphicData: {
            src: '/imgs/graphics/graphic_dada_billboard.jpg',
            title: 'DADA Management — Affiche Billboard Challenge 30 Jours',
            category: lang === 'fr' ? 'Campagnes & Billboards' : 'Billboards & Campaigns',
            slides: [
              '/imgs/graphics/graphic_dada_billboard.jpg',
              '/imgs/graphics/graphic_dada_collab_fistbump.jpg'
            ],
            currentSlideIndex: 0
          }
        },
      ]
    },
  ];

  const allCount = categories.reduce((acc, c) => acc + c.projects.length, 0);

  const visibleCategories = activeSection === 'all' ? categories : categories.filter(c => c.id === activeSection);

  return (
    <div className="v2-apv-shell">

      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="v2-apv-sidebar">
        <button onClick={() => navigateToHome(setCurrentView)} className="v2-apv-back">
          <ArrowLeft size={14} />
          <span>{lang === 'fr' ? 'Portfolio' : 'Portfolio'}</span>
        </button>

        <div className="v2-apv-sidebar-title">
          {lang === 'fr' ? 'Portfolio' : 'Portfolio'}
        </div>

        <nav className="v2-apv-nav">
          <button
            className={`v2-apv-nav-item ${activeSection === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('all')}
          >
            {lang === 'fr' ? `Tous les projets (${allCount})` : `All Projects (${allCount})`}
          </button>

          <div className="v2-apv-nav-section-label">
            {lang === 'fr' ? 'Catégories' : 'Categories'}
          </div>

          <button
            className={`v2-apv-nav-item ${activeSection === 'saas' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('saas')}
          >
            SaaS & B2B
          </button>
          <div className="v2-apv-nav-sub">
            <span onClick={() => setCurrentView('asset-iq')}>Asset IQ</span>
            <span onClick={() => setCurrentView('ehadj')}>eHadj</span>
            <span onClick={() => setCurrentView('beans')}>Beans</span>
          </div>

          <button
            className={`v2-apv-nav-item ${activeSection === 'mobile' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('mobile')}
          >
            Mobile UX
          </button>
          <div className="v2-apv-nav-sub">
            <span onClick={() => setCurrentView('vortex')}>Vortex</span>
            <span onClick={() => setCurrentView('sport-advisor')}>Sport Advisor</span>
          </div>

          <button
            className={`v2-apv-nav-item ${activeSection === 'web' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('web')}
          >
            Web & Branding
          </button>
          <div className="v2-apv-nav-sub">
            <span onClick={() => setCurrentView('dolce-riviera')}>Dolce Riviera</span>
            <span onClick={() => setCurrentView('strategy-arena')}>Strategy Arena</span>
            <span onClick={() => setCurrentView('truvox')}>Truvox Studio</span>
            <span onClick={() => setCurrentView('sagana')}>Sagana Agency</span>
            <span onClick={() => setCurrentView('tavares')}>Tavares & Visuals</span>
            <span onClick={() => setCurrentView('the-refuge')}>The Refuge</span>
          </div>

          <button
            className={`v2-apv-nav-item ${activeSection === 'graphic' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('graphic')}
          >
            Graphic Design
          </button>
          <div className="v2-apv-nav-sub">
            <span onClick={() => {
              setActiveSection('graphic');
              if (setSelectedGraphic) {
                setSelectedGraphic({
                  src: '/imgs/graphics/graphic_2souza_barman.jpg',
                  title: '2SOUZA Barman — Direction Artistique & Affiche Mixologie',
                  category: lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints',
                  slides: [
                    '/imgs/graphics/graphic_2souza_barman.jpg',
                    '/imgs/graphics/graphic_strategie_arena_red.jpg',
                    '/imgs/graphics/graphic_aidarag_tennis.jpg'
                  ],
                  currentSlideIndex: 0
                });
              }
            }}>
              {lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints'}
            </span>
            <span onClick={() => {
              setActiveSection('graphic');
              if (setSelectedGraphic) {
                setSelectedGraphic({
                  src: '/imgs/graphics/carrousels/c2/cover.png',
                  title: 'Strategy Arena — "Entre une idée brillante et une entreprise rentable"',
                  category: lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels',
                  slides: [
                    '/imgs/graphics/carrousels/c2/cover.png',
                    '/imgs/graphics/carrousels/c2/1.png',
                    '/imgs/graphics/carrousels/c2/2.png',
                    '/imgs/graphics/carrousels/c2/3.png',
                    '/imgs/graphics/carrousels/c2/4.png',
                    '/imgs/graphics/carrousels/c2/5.png',
                    '/imgs/graphics/carrousels/c2/6.png',
                    '/imgs/graphics/carrousels/c2/7.png',
                    '/imgs/graphics/carrousels/c4/1.png',
                    '/imgs/graphics/carrousels/c4/2.png',
                    '/imgs/graphics/carrousels/c4/3.png',
                    '/imgs/graphics/carrousels/c4/4.png',
                    '/imgs/graphics/carrousels/c4/5.png',
                    '/imgs/graphics/carrousels/c4/6.png',
                    '/imgs/graphics/carrousels/c4/7.png'
                  ],
                  currentSlideIndex: 0
                });
              }
            }}>
              {lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels'}
            </span>
            <span onClick={() => {
              setActiveSection('graphic');
              if (setSelectedGraphic) {
                setSelectedGraphic({
                  src: '/imgs/graphics/graphic_dada_billboard.jpg',
                  title: 'DADA Management — Affiche Billboard Challenge 30 Jours',
                  category: lang === 'fr' ? 'Campagnes & Billboards' : 'Billboards & Campaigns',
                  slides: [
                    '/imgs/graphics/graphic_dada_billboard.jpg',
                    '/imgs/graphics/graphic_dada_collab_fistbump.jpg'
                  ],
                  currentSlideIndex: 0
                });
              }
            }}>
              {lang === 'fr' ? 'Campagnes & Billboards' : 'Campaigns & Billboards'}
            </span>
          </div>
        </nav>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="v2-apv-main">
        {/* Page intro */}
        <div className="v2-apv-intro">
          <h1 className="v2-apv-page-title">{lang === 'fr' ? 'Portfolio' : 'Portfolio'}</h1>
          <p className="v2-apv-page-desc">
            {lang === 'fr'
              ? `Une sélection de ${allCount} projets — SaaS enterprise, applications mobiles, directions artistiques web, affiches et carrousels. Chaque projet reflète une approche centrée sur l'utilisateur, des décisions d'architecture rigoureuses et une exécution visuelle premium.`
              : `A curated selection of ${allCount} projects — enterprise SaaS, mobile apps, web art direction, posters and carousels. Each project reflects a user-first approach, rigorous architecture decisions and premium visual execution.`}
          </p>
        </div>

        {/* Category sections */}
        {visibleCategories.map((cat) => (
          <section key={cat.id} className="v2-apv-section" id={`section-${cat.id}`}>
            <div className="v2-apv-section-header">
              <h2 className="v2-apv-section-title">{cat.label}</h2>
              <p className="v2-apv-section-desc">{cat.desc}</p>
            </div>

            <div className="v2-apv-grid">
              {cat.projects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="v2-apv-card"
                  onClick={() => {
                    if (proj.isGraphic && proj.graphicData && setSelectedGraphic) {
                      setSelectedGraphic(proj.graphicData);
                    } else {
                      setCurrentView(proj.id);
                    }
                  }}
                >
                  <div className="v2-apv-card-media">
                    <img src={proj.img} alt={proj.title} />
                    <span className="v2-apv-card-year">{proj.date}</span>
                    <div className="v2-apv-card-hover-overlay">
                      <span>{proj.isGraphic ? (lang === 'fr' ? 'Voir visuels →' : 'View visuals →') : (lang === 'fr' ? 'Voir le projet →' : 'View project →')}</span>
                    </div>
                  </div>
                  <div className="v2-apv-card-body">
                    <div className="v2-apv-card-top">
                      <h3 className="v2-apv-card-title">{proj.title}</h3>
                    </div>
                    <div className="v2-apv-card-meta">
                      <span className="v2-apv-card-tag" style={{ color: proj.color }}>{proj.tag}</span>
                      <button
                        className="v2-apv-card-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (proj.isGraphic && proj.graphicData && setSelectedGraphic) {
                            setSelectedGraphic(proj.graphicData);
                          } else {
                            setCurrentView(proj.id);
                          }
                        }}
                      >
                        <ExternalLink size={12} />
                        <span>{proj.isGraphic ? (lang === 'fr' ? 'Galerie' : 'Gallery') : (lang === 'fr' ? 'Étude de cas' : 'Case Study')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

    </div>
  );
};

/* ─────────────────────────────────────────────
   CONNECT & FOOTER SYSTEM (REFERENCE STYLE)
───────────────────────────────────────────── */
const ConnectAndFooterSection = ({ 
  setCurrentView, 
  setIsAboutModalOpen: _setIsAboutModalOpen, 
  lang,
  scrollToSection
}: { 
  setCurrentView: any; 
  setIsAboutModalOpen: any; 
  lang: 'en' | 'fr'; 
  scrollToSection?: (sectionId: string) => void;
}) => {
  const handleNavClick = (sectionId: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        const navOffset = 80;
        const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, elementPosition - navOffset), behavior: 'smooth' });
      } else {
        setCurrentView('home');
        setTimeout(() => {
          if (sectionId === 'hero' || sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(sectionId);
            if (el) {
              const navOffset = 80;
              const elementPosition = el.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: Math.max(0, elementPosition - navOffset), behavior: 'smooth' });
            }
          }
        }, 350);
      }
    }
  };

  return (
    <footer id="contact" className="v2-connect-reference-section scroll-reveal">
      {/* Background ambient glow */}
      <div className="v2-footer-ambient-glow" aria-hidden="true" />

      {/* Top Footer Columns */}
      <div className="v2-reference-footer-wrap">
        <div className="v2-reference-footer-grid">
          {/* Logo / Monogram Col */}
          <div className="v2-ref-footer-brand">
            <div className="v2-ref-monogram" onClick={() => handleNavClick('hero')}>
              <svg width="40" height="40" viewBox="0 0 280 290" fill="none">
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
              <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
                {lang === 'fr' ? 'Accueil' : 'Home'}
              </a>
              <a href="#about-me" onClick={(e) => { e.preventDefault(); handleNavClick('about-me'); }}>
                {lang === 'fr' ? 'À propos' : 'About Me'}
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
                Services
              </a>
              <a href="#webdesign" onClick={(e) => { e.preventDefault(); handleNavClick('webdesign'); }}>
                {lang === 'fr' ? 'Projets' : 'Projects'}
              </a>
              <a href="#graphic-design" onClick={(e) => { e.preventDefault(); handleNavClick('graphic-design'); }}>
                {lang === 'fr' ? 'Graphisme' : 'Graphic Design'}
              </a>
              <a href="#career" onClick={(e) => { e.preventDefault(); handleNavClick('career'); }}>
                {lang === 'fr' ? 'Parcours' : 'Career'}
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
                Contact
              </a>
            </div>
          </div>

          {/* Portfolio Column */}
          <div className="v2-ref-footer-col">
            <span className="v2-ref-col-title">Portfolio</span>
            <div className="v2-ref-col-links">
              <span onClick={() => setCurrentView('asset-iq')}>
                {lang === 'fr' ? 'Sites Web & SaaS' : 'Websites & SaaS'}
              </span>
              <a href="#graphic-design">
                {lang === 'fr' ? 'Direction Artistique' : 'Art Direction'}
              </a>
              <span onClick={() => setCurrentView('vortex')}>Mobile &amp; MVPs</span>
              <span onClick={() => setCurrentView('sport-advisor')}>AI &amp; Data Viz</span>
            </div>
          </div>

          {/* Contact Column */}
          <div className="v2-ref-footer-col">
            <span className="v2-ref-col-title">Contact &amp; Bookings</span>
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

        {/* ─── MONUMENTAL "LET'S CONNECT" BIG BANNER ─── */}
        <div className="v2-footer-monumental-container">
          <a 
            href="mailto:dafiashalom@gmail.com" 
            className="v2-footer-monumental-link"
            aria-label="Let's Connect - Send an Email"
          >
            <div className="v2-footer-monumental-text">
              LET'S CONNECT
            </div>
            
            {/* Interactive hover indicator */}
            <div className="v2-footer-hover-pill">
              <span>{lang === 'fr' ? 'DÉMARRER UN PROJET' : 'START A PROJECT'}</span>
              <ArrowRight size={14} className="v2-hover-pill-arrow" />
            </div>
          </a>
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
   CARROUSEL SLIDE COLLECTIONS & VISUAL CONSTANTS
───────────────────────────────────────────── */
const CARROUSEL_4_SLIDES = [
  '/imgs/graphics/carrousels/c4/1.png',
  '/imgs/graphics/carrousels/c4/2.png',
  '/imgs/graphics/carrousels/c4/3.png',
  '/imgs/graphics/carrousels/c4/4.png',
  '/imgs/graphics/carrousels/c4/5.png',
  '/imgs/graphics/carrousels/c4/6.png',
  '/imgs/graphics/carrousels/c4/7.png'
];

const CARROUSEL_2_SLIDES = [
  '/imgs/graphics/carrousels/c2/cover.png',
  '/imgs/graphics/carrousels/c2/1.png',
  '/imgs/graphics/carrousels/c2/2.png',
  '/imgs/graphics/carrousels/c2/3.png',
  '/imgs/graphics/carrousels/c2/4.png',
  '/imgs/graphics/carrousels/c2/5.png',
  '/imgs/graphics/carrousels/c2/6.png',
  '/imgs/graphics/carrousels/c2/7.png'
];

const ALL_CARROUSEL_SLIDES = [...CARROUSEL_2_SLIDES, ...CARROUSEL_4_SLIDES];

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
    isOverview?: boolean;
  } | null>(null);
  const [isLightboxOverview, setIsLightboxOverview] = useState(false);
  const [cardCarrouselSeries, setCardCarrouselSeries] = useState<2 | 4 | 'all'>(2);
  const [cardCarrouselCover, setCardCarrouselCover] = useState<string>('/imgs/graphics/carrousels/c2/cover.png');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNavSection, setActiveNavSection] = useState<'home' | 'about' | 'services' | 'projects' | 'graphic' | 'career' | 'contact'>('home');

  // Smooth scroll to section with support for transitioning from sub-pages
  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'projects' ? 'webdesign' : sectionId;
    if (currentView !== 'home') {
      handleViewSwitch('home');
      setTimeout(() => {
        if (targetId === 'home' || targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveNavSection('home');
        } else {
          const elem = document.getElementById(targetId);
          if (elem) {
            const navOffset = 80;
            const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: Math.max(0, elementPosition - navOffset), behavior: 'smooth' });
          }
        }
      }, 350);
    } else {
      if (targetId === 'home' || targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveNavSection('home');
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          const navOffset = 80;
          const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: Math.max(0, elementPosition - navOffset), behavior: 'smooth' });
        }
      }
    }
  };

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
        const p = (window.scrollY / totalHeight) * 100;
        setScrollProgress(p);
        document.documentElement.style.setProperty('--scroll-percent', `${p.toFixed(2)}%`);
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      }

      // Dynamic Active Section Scroll-spy for Menus
      if (currentView === 'home') {
        const scrollY = window.scrollY;
        if (scrollY < 200) {
          setActiveNavSection('home');
          return;
        }

        // Bottom of page detection (Contact section)
        if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 120) {
          setActiveNavSection('contact');
          return;
        }

        const sectionMap: { id: string; key: 'contact' | 'career' | 'graphic' | 'projects' | 'services' | 'about' }[] = [
          { id: 'contact', key: 'contact' },
          { id: 'career', key: 'career' },
          { id: 'graphic-design', key: 'graphic' },
          { id: 'product-design', key: 'projects' },
          { id: 'webdesign', key: 'projects' },
          { id: 'services', key: 'services' },
          { id: 'about-me', key: 'about' },
        ];

        for (const item of sectionMap) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              setActiveNavSection(item.key);
              return;
            }
          }
        }
        setActiveNavSection('home');
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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const revealElems = document.querySelectorAll('.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right');
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
      {/* 3D Blueprint Glass Preloader with Brand Symbol */}
      <FuturisticPreloader />

      {/* Futuristic Cyber-Glass Portal View Transition */}
      <PageTurnOverlay
        isTurning={isPageTurning}
        direction={pageTurnDirection}
        targetLabel={
          pendingView === 'home' 
            ? (lang === 'fr' ? 'RETOUR AU PORTFOLIO' : 'RETURN TO PORTFOLIO') 
            : pendingView 
              ? (lang === 'fr' ? `ACCÈS DOSSIER // ${String(pendingView).toUpperCase()}` : `ACCESSING // ${String(pendingView).toUpperCase()}`)
              : undefined
        }
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
            <span className="v2-nav-link" onClick={() => scrollToSection('hero')}>
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </span>
            <span className="v2-nav-link" onClick={() => scrollToSection('about-me')}>
              {lang === 'fr' ? 'À propos' : 'About'}
            </span>
            <span 
              className={`v2-nav-link ${currentView === 'services' ? 'is-active' : ''}`} 
              onClick={() => {
                if (currentView !== 'services') handleViewSwitch('services');
              }}
            >
              Services
            </span>
            <span 
              className={`v2-nav-link ${currentView === 'all-projects' ? 'is-active' : ''}`} 
              onClick={() => {
                if (currentView !== 'all-projects') handleViewSwitch('all-projects');
              }}
            >
              {lang === 'fr' ? 'Projets' : 'Projects'}
            </span>
            <span className="v2-nav-link" onClick={() => scrollToSection('graphic-design')}>
              {lang === 'fr' ? 'Graphisme' : 'Graphics'}
            </span>
            <span 
              className={`v2-nav-link ${currentView === 'experiences' ? 'is-active' : ''}`} 
              onClick={() => {
                if (currentView !== 'experiences') handleViewSwitch('experiences');
              }}
            >
              {lang === 'fr' ? 'Parcours' : 'Career'}
            </span>
            <span className="v2-nav-link" onClick={() => scrollToSection('contact')}>
              Contact
            </span>
          </div>

          <div className="v2-nav-actions">
            <LangSwitchControl lang={lang} onToggle={handleLangSwitch} />
            <button 
              className="v2-nav-connect-btn v2-desktop-only" 
              onClick={() => {
                if ((window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                } else {
                  window.open('https://calendly.com/dafiashalom/30min', '_blank');
                }
              }}
            >
              {lang === 'fr' ? 'Prendre RDV' : "Let's Connect"}
            </button>
            <button 
              className="v2-mobile-hamburger-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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
              maxWidth: isLightboxOverview ? '980px' : '740px', 
              textAlign: 'center',
              padding: '24px 22px 28px',
              position: 'relative',
              transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '0.78rem', 
                fontWeight: 500, 
                letterSpacing: '0.06em', 
                textTransform: 'uppercase', 
                color: 'rgba(255, 255, 255, 0.45)' 
              }}>
                {selectedGraphic.category}
              </span>
              {selectedGraphic.slides && selectedGraphic.slides.length > 1 && (
                <>
                  <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '0.7rem' }}>•</span>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.75rem', 
                    color: 'rgba(255, 255, 255, 0.45)', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    padding: '2px 8px', 
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontWeight: 500
                  }}>
                    {isLightboxOverview 
                      ? (lang === 'fr' ? `${selectedGraphic.slides.length} visuels` : `${selectedGraphic.slides.length} visuals`) 
                      : `${(selectedGraphic.currentSlideIndex || 0) + 1} / ${selectedGraphic.slides.length}`}
                  </span>
                </>
              )}
            </div>

            <h3 style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '1.05rem', 
              fontWeight: 500, 
              color: '#F1F5F9', 
              marginBottom: '12px', 
              lineHeight: 1.45,
              letterSpacing: '-0.01em'
            }}>
              {selectedGraphic.title}
            </h3>

            {/* View Mode Switcher: Diaporama vs Vue d'ensemble (Overview) */}
            {selectedGraphic.slides && selectedGraphic.slides.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                <button
                  className={`v2-modal-tab-btn ${!isLightboxOverview ? 'active' : ''}`}
                  onClick={() => setIsLightboxOverview(false)}
                >
                  <Maximize2 size={12} />
                  <span>{lang === 'fr' ? 'Diaporama' : 'Slide View'}</span>
                </button>
                <button
                  className={`v2-modal-tab-btn ${isLightboxOverview ? 'active' : ''}`}
                  onClick={() => setIsLightboxOverview(true)}
                >
                  <LayoutGrid size={12} />
                  <span>{lang === 'fr' ? `Vue d'ensemble (${selectedGraphic.slides.length})` : `Overview (${selectedGraphic.slides.length})`}</span>
                </button>
              </div>
            )}

            {/* OVERVIEW MODE: High-Res Visuals Grid */}
            {isLightboxOverview && selectedGraphic.slides ? (
              <div className="v2-lightbox-overview-grid">
                {selectedGraphic.slides.map((slideUrl, idx) => {
                  const isCarrousel = selectedGraphic.category.toLowerCase().includes('carrousel');
                  const isCover = slideUrl.includes('cover.png');
                  const isC2 = slideUrl.includes('/c2/');
                  let seriesBadge = '';
                  let slideNum = '';

                  if (isCarrousel) {
                    seriesBadge = isC2
                      ? (lang === 'fr' ? 'SÉRIE 02' : 'SERIES 02')
                      : (lang === 'fr' ? 'SÉRIE 04' : 'SERIES 04');
                    if (isCover) {
                      slideNum = 'COVER';
                    } else if (isC2) {
                      const c2Idx = CARROUSEL_2_SLIDES.indexOf(slideUrl);
                      slideNum = `0${c2Idx > 0 ? c2Idx : idx + 1}`;
                    } else {
                      const c4Idx = CARROUSEL_4_SLIDES.indexOf(slideUrl);
                      slideNum = `0${c4Idx >= 0 ? c4Idx + 1 : idx + 1}`;
                    }
                  } else {
                    seriesBadge = lang === 'fr' ? `VISUEL 0${idx + 1}` : `VISUAL 0${idx + 1}`;
                    slideNum = `0${idx + 1}`;
                  }

                  return (
                    <div
                      key={idx}
                      className="v2-lightbox-grid-card"
                      onClick={() => {
                        setSelectedGraphic({
                          ...selectedGraphic,
                          currentSlideIndex: idx,
                          src: slideUrl
                        });
                        setIsLightboxOverview(false);
                      }}
                      title={isCover ? `${seriesBadge} — Mockup Capture (Couverture)` : `${seriesBadge} — Slide ${slideNum}`}
                    >
                      <img src={slideUrl} alt={`Visuel ${idx + 1}`} loading="lazy" />
                      <span className="v2-lightbox-grid-badge">
                        {isCarrousel ? `${seriesBadge} · ${slideNum}` : `0${idx + 1}`}
                      </span>
                      <div className="v2-lightbox-grid-zoom-hint">
                        <span className="v2-lightbox-grid-zoom-pill">
                          <Maximize2 size={12} />
                          <span>{lang === 'fr' ? 'Agrandir' : 'Expand'}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* DIAPORAMA MODE: Full-Width Stage with Nav + Interactive Filmstrip */
              <>
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
                      maxHeight: '62vh', 
                      objectFit: 'contain', 
                      display: 'block',
                      margin: '0 auto' 
                    }} 
                  />
                </div>

                {/* Interactive Filmstrip Strip of all slides */}
                {selectedGraphic.slides && selectedGraphic.slides.length > 1 && (
                  <div className="v2-lightbox-filmstrip">
                    {selectedGraphic.slides.map((slideUrl, idx) => (
                      <div
                        key={idx}
                        className={`v2-lightbox-filmstrip-thumb ${idx === (selectedGraphic.currentSlideIndex || 0) ? 'active' : ''}`}
                        onClick={() => setSelectedGraphic({
                          ...selectedGraphic,
                          currentSlideIndex: idx,
                          src: slideUrl
                        })}
                        title={`Slide ${idx + 1}`}
                      >
                        <img src={slideUrl} alt={`Slide ${idx + 1}`} />
                        <span className="v2-filmstrip-idx">
                          {slideUrl.includes('cover.png') ? 'COVER' : `0${idx + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Futuristic 3D Glass Mobile Drawer (Global) */}
      {isMobileMenuOpen && (
        <div className="v2-glass-mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="v2-glass-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Top Header of Drawer */}
            <div className="v2-mobile-drawer-header">
              <div className="v2-nav-profile" onClick={() => { handleViewSwitch('home'); setIsMobileMenuOpen(false); }}>
                <img 
                  src="/imgs/sacca_headshot.jpg" 
                  alt="Talesman Avatar" 
                  className="v2-nav-avatar" 
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="v2-nav-name">Talesman</span>
                  <span className="v2-mobile-status-tag">SYSTEM_ONLINE</span>
                </div>
              </div>
              <button 
                className="v2-glass-close-btn" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="v2-mobile-nav-links">
              <div 
                className={`v2-mobile-nav-item ${currentView === 'home' && activeNavSection === 'home' ? 'is-active' : ''}`}
                onClick={() => { scrollToSection('hero'); setIsMobileMenuOpen(false); }}
              >
                <span className="v2-nav-item-num">01</span>
                <span className="v2-nav-item-title">{lang === 'fr' ? 'ACCUEIL' : 'HOME'}</span>
                <ArrowRight size={14} className="v2-nav-item-arrow" />
              </div>

              <div 
                className={`v2-mobile-nav-item ${currentView === 'home' && activeNavSection === 'about' ? 'is-active' : ''}`}
                onClick={() => { scrollToSection('about-me'); setIsMobileMenuOpen(false); }}
              >
                <span className="v2-nav-item-num">02</span>
                <span className="v2-nav-item-title">{lang === 'fr' ? 'À PROPOS' : 'ABOUT ME'}</span>
                <ArrowRight size={14} className="v2-nav-item-arrow" />
              </div>

              <div 
                className={`v2-mobile-nav-item ${(currentView === 'home' && activeNavSection === 'services') || currentView === 'services' ? 'is-active' : ''}`}
                onClick={() => { scrollToSection('services'); setIsMobileMenuOpen(false); }}
              >
                <span className="v2-nav-item-num">03</span>
                <span className="v2-nav-item-title">SERVICES &amp; SOLUTIONS</span>
                <ArrowRight size={14} className="v2-nav-item-arrow" />
              </div>

              <div 
                className={`v2-mobile-nav-item ${(currentView === 'home' && activeNavSection === 'projects') || currentView === 'all-projects' ? 'is-active' : ''}`}
                onClick={() => { scrollToSection('webdesign'); setIsMobileMenuOpen(false); }}
              >
                <span className="v2-nav-item-num">04</span>
                <span className="v2-nav-item-title">{lang === 'fr' ? 'PROJETS & ÉTUDES DE CAS' : 'PROJECTS & CASE STUDIES'}</span>
                <ArrowRight size={14} className="v2-nav-item-arrow" />
              </div>

              <div 
                className={`v2-mobile-nav-item ${currentView === 'home' && activeNavSection === 'graphic' ? 'is-active' : ''}`}
                onClick={() => { scrollToSection('graphic-design'); setIsMobileMenuOpen(false); }}
              >
                <span className="v2-nav-item-num">05</span>
                <span className="v2-nav-item-title">{lang === 'fr' ? 'GRAPHISME & IDENTITÉS' : 'GRAPHIC DESIGN & BRANDING'}</span>
                <ArrowRight size={14} className="v2-nav-item-arrow" />
              </div>

              <div 
                className={`v2-mobile-nav-item ${(currentView === 'home' && activeNavSection === 'career') || currentView === 'experiences' ? 'is-active' : ''}`}
                onClick={() => { scrollToSection('career'); setIsMobileMenuOpen(false); }}
              >
                <span className="v2-nav-item-num">06</span>
                <span className="v2-nav-item-title">{lang === 'fr' ? 'PARCOURS & EXPÉRIENCES' : 'CAREER & TIMELINE'}</span>
                <ArrowRight size={14} className="v2-nav-item-arrow" />
              </div>

              <div 
                className={`v2-mobile-nav-item ${currentView === 'home' && activeNavSection === 'contact' ? 'is-active' : ''}`}
                onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }}
              >
                <span className="v2-nav-item-num">07</span>
                <span className="v2-nav-item-title">{lang === 'fr' ? 'CONTACT & COLLABORATION' : 'CONTACT & GET IN TOUCH'}</span>
                <ArrowRight size={14} className="v2-nav-item-arrow" />
              </div>
            </div>

            {/* Drawer Footer Actions (All Header Elements) */}
            <div className="v2-mobile-drawer-footer">
              {/* Language Switcher */}
              <div className="v2-mobile-lang-wrap">
                <span className="v2-mobile-section-label">LANGUAGE</span>
                <LangSwitchControl lang={lang} onToggle={handleLangSwitch} isMobile />
              </div>

              {/* Primary Contact CTA */}
              <button 
                className="v2-nav-connect-btn v2-mobile-connect-btn" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if ((window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                  } else {
                    window.open('https://calendly.com/dafiashalom/30min', '_blank');
                  }
                }}
              >
                <span>{lang === 'fr' ? "Réserver un appel (30 min)" : "Book a 30-min Call"}</span>
                <ArrowRight size={16} />
              </button>

              {/* Social / Direct Channels */}
              <div className="v2-mobile-socials-row">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="v2-mobile-social-pill"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a 
                  href="mailto:dafiashalom@gmail.com" 
                  className="v2-mobile-social-pill"
                >
                  <Mail size={15} /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Active View */}
      {currentView === 'experiences' && <ExperiencesView setCurrentView={handleViewSwitch} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />}
      {currentView === 'services' && <ServicesView setCurrentView={handleViewSwitch} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />}
      {currentView === 'all-projects' && <AllProjectsView setCurrentView={handleViewSwitch} setIsAboutModalOpen={setIsAboutModalOpen} setSelectedGraphic={setSelectedGraphic} lang={lang} />}
      {currentView !== 'home' && currentView !== 'experiences' && currentView !== 'services' && currentView !== 'all-projects' && (
        <CaseStudy id={currentView as CaseStudyId} setCurrentView={handleViewSwitch} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
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
                <span 
                  className={`v2-nav-link ${activeNavSection === 'home' ? 'is-active' : ''}`} 
                  onClick={() => scrollToSection('hero')}
                >
                  {lang === 'fr' ? 'Accueil' : 'Home'}
                </span>
                <span 
                  className={`v2-nav-link ${activeNavSection === 'about' ? 'is-active' : ''}`} 
                  onClick={() => scrollToSection('about-me')}
                >
                  {lang === 'fr' ? 'À propos' : 'About'}
                </span>
                <span 
                  className={`v2-nav-link ${activeNavSection === 'services' ? 'is-active' : ''}`} 
                  onClick={() => scrollToSection('services')}
                >
                  Services
                </span>
                <span 
                  className={`v2-nav-link ${activeNavSection === 'projects' ? 'is-active' : ''}`} 
                  onClick={() => scrollToSection('webdesign')}
                >
                  {lang === 'fr' ? 'Projets' : 'Projects'}
                </span>
                <span 
                  className={`v2-nav-link ${activeNavSection === 'graphic' ? 'is-active' : ''}`} 
                  onClick={() => scrollToSection('graphic-design')}
                >
                  {lang === 'fr' ? 'Graphisme' : 'Graphics'}
                </span>
                <span 
                  className={`v2-nav-link ${activeNavSection === 'career' ? 'is-active' : ''}`} 
                  onClick={() => scrollToSection('career')}
                >
                  {lang === 'fr' ? 'Parcours' : 'Career'}
                </span>
                <span 
                  className={`v2-nav-link ${activeNavSection === 'contact' ? 'is-active' : ''}`} 
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </span>
              </div>

              {/* Right Side: Lang Switch & Connect Button / Mobile Hamburger */}
              <div className="v2-nav-actions">
                <LangSwitchControl lang={lang} onToggle={handleLangSwitch} />
                <button 
                  className="v2-nav-connect-btn v2-desktop-only" 
                  onClick={() => {
                    if ((window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                    } else {
                      window.open('https://calendly.com/dafiashalom/30min', '_blank');
                    }
                  }}
                >
                  {lang === 'fr' ? 'Prendre RDV' : "Let's Connect"}
                </button>
                <button 
                  className="v2-mobile-hamburger-btn" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </nav>

            {/* SECTION 1: HERO (EXACT REFERENCE DESIGN) */}
            <section id="hero" className="v2-hero-section">
              {/* Radial Ambient Glow Background Light */}
              <div className="v2-hero-ambient-glow" aria-hidden="true" />

              {/* Eyebrow Tagline */}
              <div className="v2-hero-eyebrow">
                {lang === 'fr' 
                  ? "Résoudre des problèmes complexes par un design clair et percutant" 
                  : "Solving complex problems through clear, high-impact design"}
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

            {/* Laser Divider 1 */}
            <SymbolLaserDivider color="cyan" />

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

              {/* Center Content Card (Concise, Clean & Refined with Text Reveal Effects) */}
              <div className="v2-about-content-card">
                <TextReveal delay={100}>
                  <span className="v2-about-eyebrow">
                    <SymbolGlyphIcon size={14} color="cyan" />
                    <span>{lang === 'fr' ? 'À PROPOS' : 'ABOUT ME'}</span>
                  </span>
                </TextReveal>

                <TextReveal delay={200}>
                  <h2 className="v2-about-title">
                    {lang === 'fr' ? 'Bonjour !' : 'Hi There!'}
                  </h2>
                </TextReveal>
                
                {/* Scroll-Driven Dynamic Word-by-Word Text Reveal */}
                <WordByWordReveal
                  className="v2-about-description-concise"
                  text={
                    lang === 'fr'
                      ? "Je suis Sacca Dafia (alias Talesman), Product & Web Designer passionné par la simplification des systèmes complexes. Depuis plus de 4 ans, je façonne des plateformes B2B SaaS scalables et des interfaces numériques à fort impact, de l'architecture de Design Systems au prototypage rapide en Vibe Coding."
                      : "I'm Sacca Dafia (alias Talesman), a Product & Web Designer focused on turning complex systems into effortless digital software. For over 4 years, I've crafted high-performing B2B SaaS platforms and conversion-driven web experiences, from scalable Design Systems to rapid Vibe Coding."
                  }
                  highlightWords={['Sacca', 'Dafia', 'Talesman', 'Product', 'Web', 'Designer', 'B2B', 'SaaS', 'Design', 'Systems', 'Vibe', 'Coding']}
                />

                {/* Refined Minimalist Badges (Monochrome & Cyan) */}
                <TextReveal delay={350}>
                  <div className="v2-about-minimal-pills">
                    <span className="v2-minimal-pill"><span className="pill-dot" /> 4+ Years Experience</span>
                    <span className="v2-minimal-pill"><span className="pill-dot" /> B2B SaaS &amp; Products</span>
                    <span className="v2-minimal-pill"><span className="pill-dot" /> Vibe Coding &amp; Prototypes</span>
                    <span className="v2-minimal-pill"><span className="pill-dot" /> Design Systems</span>
                  </div>
                </TextReveal>

                {/* Sub-actions Footer */}
                <TextReveal delay={450}>
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
                        onClick={() => scrollToSection('career')}
                      >
                        {lang === 'fr' ? 'Mon Parcours & Expériences' : 'Career & Experience'}
                      </button>
                      <button 
                        className="v2-about-secondary-link" 
                        onClick={() => handleViewSwitch('cv')}
                      >
                        CV / Resume
                      </button>
                    </div>
                  </div>
                </TextReveal>
              </div>
            </section>

            {/* Laser Divider 2 */}
            <SymbolLaserDivider color="cyan" />

            {/* SECTION: SERVICES & CAPABILITIES (EXACT DARK GLASS AESTHETIC) */}
            <section id="services" className="v2-services-section scroll-reveal">
              {/* Atmospheric background glow */}
              <div className="v2-services-glow" aria-hidden="true" />

              {/* Architectural Blueprint Glass Symbol Watermark in Background */}
              <SymbolWatermark size={580} color="cyan" opacity={0.12} className="v2-watermark-ambient watermark-pos-right" />

              <div className="v2-services-header">
                <span className="v2-services-eyebrow">
                  <SymbolGlyphIcon size={14} color="cyan" />
                  <span>{lang === 'fr' ? 'Mes Services' : 'Services & Solutions'}</span>
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
                    <div className="v2-service-index-wrap">
                      <span className="v2-service-category-label">SaaS &amp; Product</span>
                    </div>
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
                    <span className="v2-service-tag">Figma Tokens</span>
                    <span className="v2-service-tag">User Flows</span>
                    <span className="v2-service-tag">Telemetry</span>
                    <span className="v2-service-tag">Data Viz</span>
                  </div>
                </div>

                {/* CARD 02: ART DIRECTION & WEB DESIGN */}
                <div className="v2-service-card card-glow-yellow">
                  <div className="v2-service-card-top">
                    <div className="v2-service-index-wrap">
                      <span className="v2-service-category-label">Web Craft &amp; Art</span>
                    </div>
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
                    <span className="v2-service-tag">Art Direction</span>
                    <span className="v2-service-tag">Spatial Motion</span>
                    <span className="v2-service-tag">Editorial Type</span>
                    <span className="v2-service-tag">CRO Strategy</span>
                  </div>
                </div>

                {/* CARD 03: VIBE CODING & RAPID MVP */}
                <div className="v2-service-card card-glow-green">
                  <div className="v2-service-card-top">
                    <div className="v2-service-index-wrap">
                      <span className="v2-service-category-label">Rapid MVP &amp; AI</span>
                    </div>
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
                    <span className="v2-service-tag">React &amp; TypeScript</span>
                    <span className="v2-service-tag">Google AI Studio</span>
                    <span className="v2-service-tag">Rapid MVP</span>
                    <span className="v2-service-tag">Live Deploys</span>
                  </div>
                </div>

                {/* CARD 04: DESIGN SYSTEMS & DEV HANDOFF */}
                <div className="v2-service-card card-glow-purple">
                  <div className="v2-service-card-top">
                    <div className="v2-service-index-wrap">
                      <span className="v2-service-category-label">Systems &amp; Dev</span>
                    </div>
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
                    <span className="v2-service-tag">Token Engine</span>
                    <span className="v2-service-tag">WCAG AAA</span>
                    <span className="v2-service-tag">Storybook</span>
                    <span className="v2-service-tag">Zero Drift</span>
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

            {/* Laser Divider 3 */}
            <SymbolLaserDivider color="blue" />

            {/* SECTION: WEBSITE DESIGN & TOOLS BENTO GRID (MAGNIFIED & REFINED) */}
            <section id="webdesign" className="v2-webdesign-section scroll-reveal">
              {/* Violet & Cyan Atmospheric Glow */}
              <div className="v2-webdesign-glow" aria-hidden="true" />
              <div className="v2-webdesign-glow-secondary" aria-hidden="true" />

              {/* Architectural Blueprint Glass Symbol Watermark in Background */}
              <SymbolWatermark size={560} color="blue" opacity={0.11} className="v2-watermark-ambient watermark-pos-left" />

              {/* Section Header */}
              <div className="v2-webdesign-header">
                <span className="v2-webdesign-eyebrow">
                  <SymbolGlyphIcon size={14} color="cyan" />
                  <span>{lang === 'fr' ? 'Conception Web & Sites' : 'Website Design'}</span>
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

            {/* Laser Divider 4 */}
            <SymbolLaserDivider color="blue" />

            {/* SECTION: PRODUCT DESIGN & B2B SAAS (EHADJ, ASSET IQ, BEANS) */}
            <section id="product-design" className="v2-showcase-section scroll-reveal">
              <div className="v2-section-ambient-glow glow-blue" aria-hidden="true" />
              
              <div className="v2-section-header">
                <span className="v2-section-eyebrow eyebrow-blue">
                  <SymbolGlyphIcon size={14} color="blue" />
                  <span>{lang === 'fr' ? 'Product Design & B2B SaaS' : 'Product Design & B2B SaaS'}</span>
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

            {/* Laser Divider 5 */}
            <SymbolLaserDivider color="purple" />

            {/* SECTION: UI/UX DESIGN & DIGITAL EXPERIENCES (DOLCE RIVIERA, VORTEX, SPORT ADVISOR) */}
            <section id="uiux-design" className="v2-showcase-section scroll-reveal">
              <div className="v2-section-ambient-glow glow-purple" aria-hidden="true" />
              
              {/* Architectural Blueprint Glass Symbol Watermark in Background */}
              <SymbolWatermark size={520} color="purple" opacity={0.1} className="v2-watermark-ambient watermark-pos-right" />

              <div className="v2-section-header">
                <span className="v2-section-eyebrow eyebrow-purple">
                  <SymbolGlyphIcon size={14} color="purple" />
                  <span>{lang === 'fr' ? 'UI/UX Design & Expériences' : 'UI/UX Design & Experiences'}</span>
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
                  <SymbolGlyphIcon size={14} color="purple" />
                  <span>{lang === 'fr' ? 'GRAPHIC DESIGN & CRÉATION' : 'GRAPHIC DESIGN & BRANDING'}</span>
                </span>
                <h2 className="v2-section-title">
                  {lang === 'fr' ? 'Direction Artistique, Posters & Carrousels.' : 'Visual Direction, Posters & Carousels.'}
                </h2>
                <p className="v2-section-subtitle">
                  {lang === 'fr'
                    ? "Affiches éditoriales haute définition, séries de carrousels narratifs et campagnes d'affichage grand format."
                    : "High-impact editorial posters, strategic storytelling carousels, and large-format brand campaigns."}
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
                      '/imgs/graphics/graphic_aidarag_tennis.jpg'
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

                  {/* Thumbnail strip showing ALL visuals of this collection */}
                  <div className="v2-card-visuals-strip">
                    {[
                      { src: '/imgs/graphics/graphic_2souza_barman.jpg', label: '2SOUZA Barman' },
                      { src: '/imgs/graphics/graphic_strategie_arena_red.jpg', label: 'Strategy Arena' },
                      { src: '/imgs/graphics/graphic_aidarag_tennis.jpg', label: 'Aïdarag Tennis' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="v2-card-visual-thumb" 
                        title={item.label}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGraphic({
                            src: item.src,
                            title: '2SOUZA Barman — Direction Artistique & Affiche Mixologie',
                            category: lang === 'fr' ? 'Posters & Affiches' : 'Posters & Art Prints',
                            slides: [
                              '/imgs/graphics/graphic_2souza_barman.jpg',
                              '/imgs/graphics/graphic_strategie_arena_red.jpg',
                              '/imgs/graphics/graphic_aidarag_tennis.jpg'
                            ],
                            currentSlideIndex: idx
                          });
                        }}
                      >
                        <img src={item.src} alt={item.label} />
                        <span className="v2-thumb-index">0{idx + 1}</span>
                      </div>
                    ))}
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
                              '/imgs/graphics/graphic_aidarag_tennis.jpg'
                            ],
                            currentSlideIndex: 0
                          });
                        }}
                      >
                        <span>{lang === 'fr' ? 'Galerie (3)' : 'Gallery (3)'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Directions artistiques singulières, affiches de mixologie, événements culturels et compositions typographiques haute définition."
                        : "Art direction, editorial collage, mixology posters, and high-impact typographic layouts crafted for cultural events."}
                    </p>
                    <div className="v2-project-tags-row">
                      <span>Art Direction</span>
                      <span>Photoshop</span>
                      <span>Typographie</span>
                      <span>Print & Web</span>
                    </div>
                  </div>
                </div>

                {/* CARD 02: CARROUSELS & STORYTELLING (CARROUSELS 2 & 4) */}
                <div 
                  className="v2-project-card-large" 
                  onClick={() => {
                    const activeIdx = ALL_CARROUSEL_SLIDES.indexOf(cardCarrouselCover);
                    const isC2 = cardCarrouselCover.includes('/c2/');
                    setSelectedGraphic({
                      src: cardCarrouselCover,
                      title: isC2 
                        ? 'Strategy Arena — "Entre une idée brillante et une entreprise rentable"' 
                        : 'Strategy Arena — "Votre client n\'achète pas votre produit"',
                      category: lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels',
                      slides: ALL_CARROUSEL_SLIDES,
                      currentSlideIndex: activeIdx >= 0 ? activeIdx : 0,
                      isOverview: false
                    });
                    setIsLightboxOverview(false);
                  }}
                >
                  <div className="v2-card-preview-container">
                    <img src={cardCarrouselCover} alt="Carrousels & Storytelling" />
                    <span className="v2-project-year-badge">2026</span>
                    <div className="v2-preview-glass-tag">
                      <span>{lang === 'fr' ? 'Carrousels Réseaux' : 'Social Carousels'}</span>
                    </div>
                  </div>

                  {/* Series Navigation Tabs to overview both carrousels */}
                  <div className="v2-card-series-tabs" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className={`v2-card-series-tab ${cardCarrouselSeries === 2 ? 'active' : ''}`}
                      onClick={() => {
                        setCardCarrouselSeries(2);
                        setCardCarrouselCover(CARROUSEL_2_SLIDES[0]);
                      }}
                    >
                      {lang === 'fr' ? 'Série 02 (8)' : 'Series 02 (8)'}
                    </button>
                    <button
                      type="button"
                      className={`v2-card-series-tab ${cardCarrouselSeries === 4 ? 'active' : ''}`}
                      onClick={() => {
                        setCardCarrouselSeries(4);
                        setCardCarrouselCover(CARROUSEL_4_SLIDES[0]);
                      }}
                    >
                      {lang === 'fr' ? 'Série 04 (7)' : 'Series 04 (7)'}
                    </button>
                    <button
                      type="button"
                      className={`v2-card-series-tab ${cardCarrouselSeries === 'all' ? 'active' : ''}`}
                      onClick={() => setCardCarrouselSeries('all')}
                    >
                      {lang === 'fr' ? 'Tous (15)' : 'All (15)'}
                    </button>
                  </div>

                  {/* Overview Strip showing all visuals of the active series or all 15 slides */}
                  <div className="v2-card-visuals-strip-scroll" onClick={(e) => e.stopPropagation()}>
                    {(cardCarrouselSeries === 2 ? CARROUSEL_2_SLIDES : cardCarrouselSeries === 4 ? CARROUSEL_4_SLIDES : ALL_CARROUSEL_SLIDES).map((slideUrl, idx) => {
                      const globalIdx = ALL_CARROUSEL_SLIDES.indexOf(slideUrl);
                      const isCover = slideUrl.includes('cover.png');
                      const isC2 = slideUrl.includes('/c2/');
                      
                      let displayNum = '';
                      if (isCover) {
                        displayNum = 'COVER';
                      } else if (cardCarrouselSeries === 2) {
                        displayNum = `0${CARROUSEL_2_SLIDES.indexOf(slideUrl)}`;
                      } else if (cardCarrouselSeries === 4) {
                        displayNum = `0${CARROUSEL_4_SLIDES.indexOf(slideUrl) + 1}`;
                      } else {
                        displayNum = isC2 ? `2·${isCover ? 'C' : CARROUSEL_2_SLIDES.indexOf(slideUrl)}` : `4·${CARROUSEL_4_SLIDES.indexOf(slideUrl) + 1}`;
                      }

                      return (
                        <div 
                          key={idx} 
                          className={`v2-card-visual-thumb ${cardCarrouselCover === slideUrl ? 'is-active-thumb' : ''}`}
                          title={isCover ? (lang === 'fr' ? 'Capture Mockup — Couverture' : 'Mockup Capture — Cover') : `Slide ${displayNum} — Cliquer pour agrandir`}
                          onMouseEnter={() => setCardCarrouselCover(slideUrl)}
                          onClick={() => {
                            setCardCarrouselCover(slideUrl);
                            setSelectedGraphic({
                              src: slideUrl,
                              title: isC2 
                                ? 'Strategy Arena — "Entre une idée brillante et une entreprise rentable"' 
                                : 'Strategy Arena — "Votre client n\'achète pas votre produit"',
                              category: lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels',
                              slides: ALL_CARROUSEL_SLIDES,
                              currentSlideIndex: globalIdx >= 0 ? globalIdx : idx,
                              isOverview: false
                            });
                            setIsLightboxOverview(false);
                          }}
                        >
                          <img src={slideUrl} alt={isCover ? 'Mockup Couverture' : `Slide ${displayNum}`} loading="lazy" />
                          <span className="v2-thumb-index">{displayNum}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="v2-card-content-block">
                    <div className="v2-card-title-row">
                      <h3 className="v2-project-title">
                        {lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels'}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button 
                          className="v2-project-explore-btn" 
                          title={lang === 'fr' ? 'Vue d\'ensemble de tous les visuels' : 'Overview of all visuals'}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedGraphic({
                              src: ALL_CARROUSEL_SLIDES[0],
                              title: 'Strategy Arena — Séries Carrousels Narratifs (02 & 04)',
                              category: lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels',
                              slides: ALL_CARROUSEL_SLIDES,
                              currentSlideIndex: 0,
                              isOverview: true
                            });
                            setIsLightboxOverview(true);
                          }}
                        >
                          <LayoutGrid size={13} />
                          <span>{lang === 'fr' ? 'Overview (15)' : 'Overview (15)'}</span>
                        </button>
                        <button 
                          className="v2-project-explore-btn" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            const activeIdx = ALL_CARROUSEL_SLIDES.indexOf(cardCarrouselCover);
                            const isC2 = cardCarrouselCover.includes('/c2/');
                            setSelectedGraphic({
                              src: cardCarrouselCover,
                              title: isC2 
                                ? 'Strategy Arena — "Entre une idée brillante et une entreprise rentable"' 
                                : 'Strategy Arena — "Votre client n\'achète pas votre produit"',
                              category: lang === 'fr' ? 'Carrousels Narratifs' : 'Social Carousels',
                              slides: ALL_CARROUSEL_SLIDES,
                              currentSlideIndex: activeIdx >= 0 ? activeIdx : 0,
                              isOverview: false
                            });
                            setIsLightboxOverview(false);
                          }}
                        >
                          <span>{lang === 'fr' ? 'Feuilleter' : 'Browse'}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Structures narratives percutantes, collages éditoriaux et carrousels stratégiques conçus pour captiver et générer de l'engagement."
                        : "Editorial collage storytelling and strategic carousels engineered for deep engagement and brand resonance."}
                    </p>
                    <div className="v2-project-tags-row">
                      <span>Storytelling</span>
                      <span>Direction Artistique</span>
                      <span>Social Media</span>
                      <span>Stratégie</span>
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
                      '/imgs/graphics/graphic_dada_collab_fistbump.jpg'
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

                  {/* Thumbnail strip showing ALL visuals of this collection */}
                  <div className="v2-card-visuals-strip">
                    {[
                      { src: '/imgs/graphics/graphic_dada_billboard.jpg', label: 'Billboard 30 Jours' },
                      { src: '/imgs/graphics/graphic_dada_collab_fistbump.jpg', label: 'Collab & Partenariats' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="v2-card-visual-thumb" 
                        title={item.label}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGraphic({
                            src: item.src,
                            title: 'DADA Management — Affiche Billboard Challenge 30 Jours',
                            category: lang === 'fr' ? 'Campagnes & Billboards' : 'Billboards & Campaigns',
                            slides: [
                              '/imgs/graphics/graphic_dada_billboard.jpg',
                              '/imgs/graphics/graphic_dada_collab_fistbump.jpg'
                            ],
                            currentSlideIndex: idx
                          });
                        }}
                      >
                        <img src={item.src} alt={item.label} />
                        <span className="v2-thumb-index">0{idx + 1}</span>
                      </div>
                    ))}
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
                              '/imgs/graphics/graphic_dada_collab_fistbump.jpg'
                            ],
                            currentSlideIndex: 0
                          });
                        }}
                      >
                        <span>{lang === 'fr' ? 'Voir visuels (2)' : 'View Visuals (2)'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p className="v2-project-summary">
                      {lang === 'fr'
                        ? "Affichage grand format, visuels de lancement de partenariats stratégiques et directions créatives 360° percutantes."
                        : "Urban billboard displays, strategic partnership launch assets, and high-impact 360° creative campaigns."}
                    </p>
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

            {/* Laser Divider 6 */}
            <SymbolLaserDivider color="emerald" />

            {/* SECTION 6: CAREER LOGS & DETAILED TIMELINE (V2 DARK GLASS) */}
            <section id="career" className="v2-experience-section scroll-reveal">
              <div className="v2-experience-glow" aria-hidden="true" />

              {/* Architectural Blueprint Glass Symbol Watermark in Background */}
              <SymbolWatermark size={560} color="emerald" opacity={0.11} className="v2-watermark-ambient watermark-pos-left" />

              <div className="v2-section-header">
                <span className="v2-section-eyebrow eyebrow-blue">
                  <SymbolGlyphIcon size={14} color="emerald" />
                  <span>{lang === 'fr' ? 'Parcours & Expériences' : 'Career & Field Logs'}</span>
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

              {/* Dynamic Creative Interactive Timeline */}
              <CreativeTimelineExperience items={getTimelineExperiences(lang)} lang={lang} />
            </section>

            {/* Laser Divider 7 */}
            <SymbolLaserDivider color="cyan" />

            {/* SECTION 6: REFERENCE DUAL-PANEL CONNECT & FOOTER */}
            <ConnectAndFooterSection setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} scrollToSection={scrollToSection} />
          </main>
        </div>
      )}

      {/* Premium Floating Back to Top Button with Dynamic Circular Scroll Meter */}
      <ScrollToTopButton scrollProgress={scrollProgress} lang={lang} />
    </>
  );
}

