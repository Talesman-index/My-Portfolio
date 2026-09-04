import { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Mail,
  Phone,
  Calendar,
  Linkedin,
  ExternalLink,
  FileText,
  Download,
  Layers,
  Sparkles,
  Home,
  Building2,
  Briefcase,
  Menu
} from 'lucide-react';
import './App.css';
import { caseStudiesData, CaseStudyId } from './caseStudiesData';
import PageTurnOverlay from './components/PageTurnOverlay';
import GlassMonogram from './components/GlassMonogram';

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
   ABOUT SHEET MODAL
───────────────────────────────────────────── */
const AboutSheetModal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: 'en' | 'fr' }) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  };

  return (
    <div className={`mosby-modal-overlay ${isClosing ? 'is-closing' : ''}`} onClick={handleClose}>
      <div className={`mosby-about-sheet ${isClosing ? 'is-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="mosby-modal-close-btn" onClick={handleClose} aria-label="Fermer">
          <X size={20} />
        </button>

        <div className="mosby-about-grid">
          {/* Left Column: Big Bold Quote + Dual Photo Cards */}
          <div>
            <h2 className="mosby-about-quote-title">
              {lang === 'fr' 
                ? "LE DESIGN NUMÉRIQUE EST L'ALLIANCE DE LA RIGUEUR PRODUIT ET DE L'ÉLÉGANCE WEB."
                : "DIGITAL DESIGN IS THE FUSION OF PRODUCT RIGOR AND WEB ELEGANCE."}
            </h2>

            <div className="mosby-about-photo-grid">
              {/* Photo 1: B&W Executive Office */}
              <div className="mosby-about-photo-card" style={{ transform: 'rotate(-1deg)' }}>
                <PaperclipSVG style={{ top: '-14px', right: '14px' }} />
                <img src="/imgs/hero_image.png" alt="Sacca Dafia Executive" className="mosby-about-photo-img" style={{ filter: 'grayscale(100%) contrast(110%)' }} />
                <div className="mosby-about-caption">
                  <strong>01. EXECUTIVE DOSSIER</strong> <br />
                  Sacca Dafia <span style={{ opacity: 0.75 }}>· aka Talesman</span> (Web &amp; Product Designer)
                </div>
              </div>

              {/* Photo 2: Warm Ambient Workspace */}
              <div className="mosby-about-photo-card" style={{ transform: 'rotate(1.5deg)' }}>
                <PaperclipSVG style={{ top: '-14px', left: '14px' }} />
                <span className="mosby-about-vibe-badge">RAPID MVP &amp; VIBE CODING</span>
                <img src="/imgs/vibe_coding_setup.jpg" alt="Vibe Coding Setup" className="mosby-about-photo-img" />
                <div className="mosby-about-caption">
                  <strong>02. PROTOTYPING WORKSPACE</strong> <br />
                  Vibe Coding &amp; Rapid MVP Prototyping
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text + Core Skills + Signature */}
          <div>
            <p className="mosby-about-serif-text">
              {lang === 'fr'
                ? "En tant que Web Designer & Product Designer (connu sous le pseudo Talesman), je façonne des produits numériques à la fois beaux, intuitifs et hautement fonctionnels. En complément, ma maîtrise du Vibe Coding me permet de proposer des MVPs rapides et interactifs, offrant ainsi aux clients une meilleure validation terrain et un test utilisateur réel dès les premières phases du projet."
                : "As a Web Designer & Product Designer (known by the pseudonym Talesman), I craft digital products that are elegant, intuitive, and highly functional. As a value-added skill, my Vibe Coding capabilities allow me to quickly deliver interactive MVPs to clients for faster user validation and real-world testing."}
            </p>

            <ul className="mosby-about-bullets">
              <li>
                {lang === 'fr' 
                  ? "Product Design : Plateformes SaaS B2B complexes, architecture d'information et rédaction de PRDs."
                  : "Product Design: Complex B2B SaaS platforms, information architecture, and PRD specifications."}
              </li>
              <li>
                {lang === 'fr'
                  ? "Web Design : Direction artistique haut de gamme, vitrines d'exception et e-commerce sur mesure."
                  : "Web Design: High-end art direction, luxury showcase sites, and custom e-commerce experiences."}
              </li>
              <li>
                {lang === 'fr' 
                  ? "Vibe Coding & MVPs Rapides : Prototypage interactif fonctionnel pour permettre aux clients de tester rapidement leurs concepts auprès d'utilisateurs réels."
                  : "Vibe Coding & Rapid MVPs: Functional interactive prototyping allowing clients to quickly validate concepts with real users."}
              </li>
              <li>
                {lang === 'fr'
                  ? "Design Systems & Leadership : Composants modulaires Figma/React et supervision technique dev."
                  : "Design Systems & Leadership: Modular Figma/React UI systems and dev team supervision."}
              </li>
            </ul>

            <p className="mosby-about-serif-text" style={{ marginTop: '20px' }}>
              {lang === 'fr' 
                ? "Explorez l'archive de projets ci-dessous."
                : "Explore the archive of projects below."}
            </p>

            <div className="mosby-signature-block">
              <div className="mosby-signature-text">
                Sacca Dafia <span style={{ fontSize: '0.62em', opacity: 0.7, fontFamily: 'monospace', fontWeight: 600 }}>(alias Talesman)</span>
              </div>
              <div className="mosby-signature-sub">Web Designer &amp; Product Designer · Rapid MVP Prototyping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CASE STUDY DOSSIER VIEW
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
      {/* Top Navigation Bar with Back Button */}
      <div className="container" style={{ paddingTop: '30px' }}>
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="mosby-back-btn"
        >
          <ArrowLeft size={16} /> <span>{lang === 'fr' ? 'RETOUR À L\'ACCUEIL DES ARCHIVES' : 'RETURN TO ARCHIVE HOME'}</span>
        </button>
      </div>

      {/* Huge White Title (Mosby's Files Header) */}
      <h1 className="mosby-dossier-giant-title" style={{ paddingTop: '10px' }}>{data.title}</h1>

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
                    <div className="mosby-spec-item-val">Web &amp; Product Designer</div>
                  </div>
                  <div>
                    <div className="mosby-spec-item-title">PROJECT SCOPE</div>
                    <div className="mosby-spec-item-val">{data.label}</div>
                  </div>
                  <div>
                    <div className="mosby-spec-item-title">DELIVERABLES</div>
                    <div className="mosby-spec-item-val">Art Direction, UI/UX &amp; Specs</div>
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
          {allKeys.slice(0, 6).map(k => {
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#FFF', opacity: 0.8, textTransform: 'uppercase' }}>{lang === 'fr' ? 'PROCHAIN DOSSIER →' : 'NEXT FILE IN ARCHIVE →'}</div>
          <div className="mosby-next-folder-title">{nextConfig.title}</div>
        </div>
        <ArrowRight size={32} color="#FFF" />
      </div>

      {/* Floating Back to Home Badge */}
      <div 
        className="mosby-floating-scroll-badge" 
        onClick={() => navigateToHome(setCurrentView)}
        style={{ right: 'auto', left: '24px', background: '#FFFFFF', color: '#000000' }}
      >
        ← {lang === 'fr' ? 'RETOUR À L\'ACCUEIL' : 'RETURN HOME'}
      </div>

      {/* Floating Scroll Pill Button */}
      <div className="mosby-floating-scroll-badge" onClick={() => setCurrentView(nextId)}>
        {lang === 'fr' ? 'Faire défiler pour le dossier suivant ↓' : 'Scroll for next file ↓'}
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
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="mosby-back-btn"
        >
          <ArrowLeft size={16} /> <span>RETOUR À L'ACCUEIL DES ARCHIVES</span>
        </button>

        <h1 className="mosby-dossier-giant-title" style={{ padding: '0 0 20px 0' }}>REGISTRE DES EXPÉRIENCES</h1>

        <div className="mosby-paper-sheet" style={{ maxWidth: '1050px' }}>
          <BinderHoles />

          <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.2rem', marginBottom: '28px', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={26} color="#DC2626" />
            <span>EXPÉRIENCES EN ENTREPRISE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* 01. CACTUCE */}
            <div style={{ padding: '28px', background: '#FFF', borderLeft: '6px solid #DC2626', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: '#DC2626', color: '#FFF', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                    01. ENTREPRISE
                  </span>
                  <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.2rem', margin: '8px 0 2px 0', color: '#121212' }}>
                    CACTUCE
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#DC2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={15} /> Product Designer
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#333', background: '#F5F5F5', padding: '6px 14px', border: '1px solid #DDD', fontWeight: 'bold' }}>
                  Octobre 2025 - Mai 2026
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #EEE' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold', color: '#444', marginBottom: '10px', textTransform: 'uppercase' }}>
                  RESPONSABILITÉS ET RÉALISATIONS :
                </div>
                <ul style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#222', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5' }}>
                  <li>Chargé de l'optimisation des produits <strong>eHadj</strong> et <strong>Asset IQ</strong>.</li>
                  <li>Identification et correction des frictions dans l'expérience utilisateur.</li>
                  <li>Définition précise des parcours utilisateurs et supervision complète du processus d'assurance qualité (QA).</li>
                </ul>
              </div>
            </div>

            {/* 02. TRELLIX */}
            <div style={{ padding: '28px', background: '#FFF', borderLeft: '6px solid #1D4ED8', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: '#1D4ED8', color: '#FFF', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                    02. ENTREPRISE
                  </span>
                  <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.2rem', margin: '8px 0 2px 0', color: '#121212' }}>
                    TRELLIX
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#1D4ED8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={15} /> Lead Product Designer
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#333', background: '#F5F5F5', padding: '6px 14px', border: '1px solid #DDD', fontWeight: 'bold' }}>
                  Février 2024 - Septembre 2025
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #EEE' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold', color: '#444', marginBottom: '10px', textTransform: 'uppercase' }}>
                  RESPONSABILITÉS ET RÉALISATIONS :
                </div>
                <ul style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#222', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5' }}>
                  <li>Direction et leadership d'équipe pour concevoir et développer des solutions axées sur l'utilisateur.</li>
                  <li>Prise en charge de la recherche de produits (Product research).</li>
                  <li>Gestion intégrale des projets de design.</li>
                </ul>
              </div>
            </div>

            {/* 03. CREAFIX */}
            <div style={{ padding: '28px', background: '#FFF', borderLeft: '6px solid #059669', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: '#059669', color: '#FFF', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                    03. ENTREPRISE
                  </span>
                  <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.2rem', margin: '8px 0 2px 0', color: '#121212' }}>
                    CREAFIX
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={15} /> Web Designer
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#333', background: '#F5F5F5', padding: '6px 14px', border: '1px solid #DDD', fontWeight: 'bold' }}>
                  Août 2022 - Février 2024
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #EEE' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold', color: '#444', marginBottom: '10px', textTransform: 'uppercase' }}>
                  RESPONSABILITÉS ET RÉALISATIONS :
                </div>
                <ul style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#222', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5' }}>
                  <li>Conception d'interfaces web modernes intégrant rigoureusement les principes UX/UI.</li>
                  <li>Optimisation des interfaces pour un affichage multi-supports (responsive design).</li>
                  <li>Participation et contribution active aux campagnes de marketing digital de l'entreprise.</li>
                </ul>
              </div>
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
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="mosby-back-btn"
        >
          <ArrowLeft size={16} /> <span>RETOUR À L'ACCUEIL DES ARCHIVES</span>
        </button>

        <h1 className="mosby-dossier-giant-title" style={{ padding: '0 0 20px 0' }}>CAPABILITIES &amp; SERVICES SPECS</h1>

        <div className="mosby-paper-sheet" style={{ maxWidth: '1050px' }}>
          <BinderHoles />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', background: '#FFF', border: '1px solid #DDD', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#DC2626' }}>SPEC 01</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem', margin: '8px 0' }}>Web &amp; Art Direction</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#444' }}>
                Direction artistique Web Design d'exception, sites vitrines haut de gamme, e-commerce sur mesure et typographie éditoriale.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#FFF', border: '1px solid #DDD', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#1D4ED8' }}>SPEC 02</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem', margin: '8px 0' }}>Product &amp; SaaS B2B Strategy</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#444' }}>
                Architecture d'information, rédaction de PRDs, tunnels d'activation sans friction et supervision d'ingénierie dev.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#FFF', border: '1px solid #DDD', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#059669' }}>SPEC 03</div>
              <div style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem', margin: '8px 0' }}>Vibe Coding &amp; Rapid MVP</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#444' }}>
                Prototypage interactif fonctionnel permettant aux clients de tester rapidement leurs concepts et de valider leur produit auprès d'utilisateurs réels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ALL PROJECTS DOSSIER VIEW
───────────────────────────────────────────── */
const AllProjectsView = ({ 
  setCurrentView, 
  lang 
}: { 
  setCurrentView: any; 
  lang: 'en' | 'fr' 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'saas' | 'mobile' | 'web'>('all');

  const allProjects = [
    { id: 'asset-iq', title: 'Asset IQ', category: 'saas', tag: 'Product Design & SaaS', date: 'MAR 2026', img: '/imgs/assetiQ/cover_Asset.jpg', color: '#1D4ED8', desc: lang === 'fr' ? 'Gouvernance et télémétrie des actifs physiques industriels multi-sites par QR code.' : 'Multi-site industrial physical asset telemetry via QR codes.', deliverables: ['QR Code Telemetry', 'Figma Tokens', 'Asset Governance'] },
    { id: 'ehadj', title: 'eHadj', category: 'saas', tag: 'National Logistics SaaS', date: 'JAN 2026', img: '/imgs/ehadj/cover_Ehadj.jpg', color: '#EAB308', desc: lang === 'fr' ? 'Orchestration digitale du pèlerinage au Bénin pour +30 agences et ministères.' : 'Digital orchestration of national pilgrimage logistics in Benin.', deliverables: ['Multi-agency Workflows', 'NPI Onboarding', 'Quota Tracking'] },
    { id: 'beans', title: 'Beans', category: 'saas', tag: 'B2B SaaS Engagement', date: 'DEC 2025', img: '/imgs/beans_cover.png', color: '#059669', desc: lang === 'fr' ? 'Plateforme SaaS B2B de fidélisation client & hub de 10 connecteurs e-commerce.' : 'B2B SaaS customer engagement platform & integration hub.', deliverables: ['10 Connector Hub', 'Shopify & Klaviyo', 'PRD Specs & QA'] },
    { id: 'vortex', title: 'Vortex', category: 'mobile', tag: 'Mobile UX & Fuel Wallet', date: 'MAR 2026', img: '/imgs/vortex.webp', color: '#D97706', desc: lang === 'fr' ? 'Application mobile d\'achat de carburant et de gestion de portefeuille numérique.' : 'Mobile fuel purchasing & digital wallet management app.', deliverables: ['1-Click Purchasing', 'QR Station Code', 'High Contrast UI'] },
    { id: 'strategy-arena', title: 'Strategy Arena', category: 'web', tag: 'Branding & Web Strategy', date: 'JAN 2026', img: '/imgs/Strategy-Arena.png', color: '#EAB308', desc: lang === 'fr' ? 'Cabinet de conseil en stratégie, organisation & transformation digitale pour PME.' : 'Strategy & digital transformation consulting agency platform.', deliverables: ['Canary Yellow Brand', 'Preloader Animation', 'CRO Tunnel'] },
    { id: 'tavares', title: 'Tavares & Visuals', category: 'web', tag: 'Creative Art Direction', date: 'NOV 2025', img: '/imgs/tavares.png', color: '#DC2626', desc: lang === 'fr' ? 'Direction artistique web d\'exception, vitrines cinématographiques et e-commerce.' : 'Curated collection of cinematic showcase sites, editorial e-commerce & galleries.', deliverables: ['Showreel Player', 'Black Theme', 'Micro-animations'] },
    { id: 'truvox', title: 'Truvox Studio', category: 'web', tag: 'Web Design & Studio', date: 'OCT 2025', img: '/imgs/truvox_cover.png', color: '#10B981', desc: lang === 'fr' ? 'Expériences numériques d\'exception, stratégie de marque & développement.' : 'High-end studio brand experience, web design & development.', deliverables: ['Brand Strategy', 'Quote Tunnel', 'Performance Web'] },
    { id: 'sport-advisor', title: 'Sport Advisor', category: 'mobile', tag: 'AI & Data Visualization', date: 'SEP 2025', img: '/imgs/assetiQ/advisor_image.png', color: '#00FA9A', desc: lang === 'fr' ? 'Plateforme d\'analyse et de pronostics sportifs basés sur l\'intelligence artificielle.' : 'AI-driven sports analysis & data visualization platform.', deliverables: ['AI Prediction Engine', 'Odds Comparer', 'Confidence Gauges'] },
    { id: 'sagana', title: 'Sagana Agency', category: 'web', tag: 'Web Art Direction', date: 'AUG 2025', img: '/imgs/sagana_cover.png', color: '#F59E0B', desc: lang === 'fr' ? 'Site vitrine d\'excellence pour agence de conseil stratégique haut de gamme.' : 'High-end showcase site for elite advisory agency.', deliverables: ['Editorial Layout', 'High-end Branding', 'Micro-interactions'] },
    { id: 'dolce-riviera', title: 'Dolce Riviera', category: 'web', tag: 'Luxury Hospitality UI/UX Interface', date: 'JUL 2025', img: '/imgs/dolce_cover.png', color: '#C5A059', desc: lang === 'fr' ? 'Interface UI/UX d\'exception & landing page pour un hôtel de luxe sur la Riviera.' : 'Luxury hospitality UI/UX interface concept & booking funnel.', deliverables: ['UI/UX Design System', 'Booking Funnel UI', 'Fluid Luxury Typography'] },
    { id: 'the-refuge', title: 'The Refuge', category: 'web', tag: 'Humanitarian Portal', date: 'JUN 2025', img: '/imgs/your-refuge.jpg', color: '#0d3479', desc: lang === 'fr' ? 'Portail humanitaire & suivi d\'impact en temps réel pour l\'ONG The Refuge.' : 'Humanitarian portal & real-time impact tracker in Cotonou.', deliverables: ['Real-time Tracker', 'Mobile Money FCFA', 'Human Touch Doodles'] }
  ];

  const filteredProjects = allProjects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="mosby-dossier-view" style={{ paddingTop: '40px' }}>
      <div className="container">
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="mosby-back-btn"
        >
          <ArrowLeft size={16} /> <span>RETOUR À L'ACCUEIL DES ARCHIVES</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', paddingBottom: '24px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              INDEX DES ARCHIVES COMPLÈTES ({allProjects.length} DOSSIERS)
            </span>
            <h1 className="mosby-dossier-giant-title" style={{ padding: '8px 0 0 0' }}>
              ALL PROJECTS &amp; DOSSIERS
            </h1>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              className={`robin-nav-pill ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {lang === 'fr' ? 'TOUS (11)' : 'ALL (11)'}
            </button>
            <button 
              className={`robin-nav-pill ${activeFilter === 'saas' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('saas')}
            >
              SAAS &amp; B2B
            </button>
            <button 
              className={`robin-nav-pill ${activeFilter === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('mobile')}
            >
              MOBILE UX
            </button>
            <button 
              className={`robin-nav-pill ${activeFilter === 'web' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              WEB &amp; BRANDING
            </button>
          </div>
        </div>

        {/* Projects Grid — Wide, Spacious Editorial Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '40px', marginTop: '36px' }}>
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="robin-service-card"
              style={{ padding: '36px', cursor: 'pointer', background: '#FFFFFF', borderRadius: '8px', border: '2.5px solid #121212', boxShadow: '8px 8px 0px #121212', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => setCurrentView(proj.id)}
            >
              <div>
                <div style={{ position: 'relative', height: '260px', marginBottom: '24px', borderRadius: '6px', overflow: 'hidden', background: '#121212', border: '1.5px solid #121212' }}>
                  <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                  <span style={{ position: 'absolute', top: '14px', left: '14px', background: proj.color, color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 'bold', padding: '5px 12px', borderRadius: '4px', boxShadow: '3px 3px 0px #121212' }}>
                    {proj.date}
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {proj.tag}
                </div>

                <h3 style={{ fontFamily: 'var(--font-anton)', fontSize: '2.5rem', color: '#121212', margin: '0 0 14px 0', lineHeight: 1.05 }}>
                  {proj.title}
                </h3>

                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.08rem', color: '#333', margin: '0 0 22px 0', lineHeight: 1.55 }}>
                  {proj.desc}
                </p>

                <ul className="robin-service-deliverables" style={{ paddingLeft: '16px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {proj.deliverables.map((item, idx) => (
                    <li key={idx} style={{ fontSize: '0.88rem' }}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="robin-service-footer" style={{ borderTop: '1.5px dashed #E5E7EB', paddingTop: '20px', marginTop: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: '#666' }}>DOSSIER #{proj.id.toUpperCase()}</span>
                <button className="robin-service-cta-btn" style={{ background: '#121212', borderColor: '#121212', padding: '10px 20px', fontSize: '0.85rem' }}>
                  <span>{lang === 'fr' ? 'DÉCOUVRIR LE PROJET' : 'EXPLORE CASE STUDY'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ARCHIVAL FOOTER SYSTEM
───────────────────────────────────────────── */
const MosbyFooter = ({ setCurrentView, setIsAboutModalOpen, lang }: { setCurrentView: any; setIsAboutModalOpen: any; lang: 'en' | 'fr' }) => {
  const [activeDiagram, setActiveDiagram] = useState<number | null>(null);
  const [compassAngle, setCompassAngle] = useState(0);
  const [boxFlipped, setBoxFlipped] = useState(false);
  const [pyramidPushed, setPyramidPushed] = useState(false);
  const [dialSpinning, setDialSpinning] = useState(false);
  const [tooltipText, setTooltipText] = useState<string | null>(null);

  const handleDiagramClick = (index: number) => {
    setActiveDiagram(index);
    if (index === 0) {
      setCompassAngle(prev => prev + 360);
      setTooltipText("COMPASS: COTONOU, BJ (6.369° N, 2.418° E)");
    } else if (index === 1) {
      setBoxFlipped(prev => !prev);
      setTooltipText(boxFlipped ? "BLUEPRINT: DEFAULT" : "BLUEPRINT: 12-COL GRID ACTIVE");
    } else if (index === 2) {
      setPyramidPushed(true);
      setTimeout(() => setPyramidPushed(false), 500);
      setTooltipText("PRISM: FIGMA DESIGN SYSTEM TOKENS");
    } else if (index === 3) {
      setDialSpinning(prev => !prev);
      setTooltipText(dialSpinning ? "RADAR DIAL: PAUSED" : "RADAR DIAL: ROTATING");
    } else if (index === 4) {
      setTooltipText("SCROLLING TO TOP ↗");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mosby-footer">
      {/* Row of Architectural & Design Diagram Symbols (Interactive Widgets) */}
      <div className="mosby-footer-diagrams-row">
        {/* Widget 1: Compass Radar */}
        <button 
          className={`mosby-diagram-icon-btn ${activeDiagram === 0 ? 'is-active' : ''}`}
          onClick={() => handleDiagramClick(0)}
          onMouseEnter={() => setTooltipText("COMPASS RADAR")}
          onMouseLeave={() => setTooltipText(null)}
          aria-label="Compass radar widget"
        >
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 40 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8"
            style={{ transform: `rotate(${compassAngle}deg)`, transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            <circle cx="20" cy="20" r="16" />
            <path d="M20 4 L20 36 M4 20 L36 20" strokeDasharray="2 2" />
            <text x="20" y="11" fill="currentColor" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">N</text>
          </svg>
          {tooltipText && (
            <span className="mosby-diagram-tooltip">{tooltipText}</span>
          )}
        </button>

        {/* Widget 2: Blueprint Box */}
        <button 
          className={`mosby-diagram-icon-btn ${activeDiagram === 1 ? 'is-active' : ''}`}
          onClick={() => handleDiagramClick(1)}
          onMouseEnter={() => setTooltipText("BLUEPRINT GRID")}
          onMouseLeave={() => setTooltipText(null)}
          aria-label="Blueprint box widget"
        >
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 40 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8"
            style={{ transform: boxFlipped ? 'rotateY(180deg) scale(1.1)' : 'none', transition: 'transform 0.4s ease' }}
          >
            <rect x="6" y="6" width="28" height="28" strokeWidth="2" />
            <path d="M6 6 L34 34 M34 6 L6 34" strokeOpacity={boxFlipped ? "1" : "0.5"} stroke={boxFlipped ? "var(--mosby-yellow)" : "currentColor"} />
          </svg>
        </button>

        {/* Widget 3: Prism Pyramid */}
        <button 
          className={`mosby-diagram-icon-btn ${activeDiagram === 2 ? 'is-active' : ''}`}
          onClick={() => handleDiagramClick(2)}
          onMouseEnter={() => setTooltipText("DESIGN PRISM")}
          onMouseLeave={() => setTooltipText(null)}
          aria-label="Design prism widget"
        >
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 40 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8"
            style={{ transform: pyramidPushed ? 'translateY(-8px) scale(1.2)' : 'none', transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            <polygon points="20,4 36,36 4,36" strokeWidth="2" />
            <line x1="20" y1="4" x2="20" y2="36" />
          </svg>
        </button>

        {/* Widget 4: Dial Radar Circle */}
        <button 
          className={`mosby-diagram-icon-btn ${activeDiagram === 3 ? 'is-active' : ''}`}
          onClick={() => handleDiagramClick(3)}
          onMouseEnter={() => setTooltipText("DIAL RADAR")}
          onMouseLeave={() => setTooltipText(null)}
          aria-label="Dial radar widget"
        >
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 40 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8"
            style={{ animation: dialSpinning ? 'spin 3s linear infinite' : 'none' }}
          >
            <circle cx="20" cy="20" r="14" />
            <circle cx="20" cy="20" r="6" strokeDasharray="2 3" strokeWidth="2" />
          </svg>
        </button>

        {/* Widget 5: Arrow Top-Right Scroll Back ↗ */}
        <button 
          className={`mosby-diagram-icon-btn ${activeDiagram === 4 ? 'is-active' : ''}`}
          onClick={() => handleDiagramClick(4)}
          onMouseEnter={() => setTooltipText("RETURN TO TOP ↗")}
          onMouseLeave={() => setTooltipText(null)}
          aria-label="Scroll to top widget"
        >
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 40 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 30 L30 10 M30 10 H16 M30 10 V24" />
          </svg>
        </button>
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
            <a href="tel:+2290154921801" className="mosby-footer-link">
              <Phone size={14} /> +229 01 54 92 18 01
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
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer" className="mosby-footer-link">
              <ExternalLink size={14} /> Behance
            </a>
            <a href="mailto:dafiashalom@gmail.com" className="mosby-footer-link">
              <Mail size={14} /> Mail
            </a>
          </div>
        </div>

        {/* Col 3: Core Dossiers */}
        <div>
          <div className="mosby-footer-col-title">03. CORE DOSSIERS</div>
          <div className="mosby-footer-links-list">
            <span className="mosby-footer-link" onClick={() => navigateToHome(setCurrentView)} style={{ cursor: 'pointer', color: '#FEF08A' }}>
              <Home size={14} /> ← Return to Archive Home
            </span>
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
          <span>0 4 8 16 32 • WEB &amp; PRODUCT DESIGN STRATEGY</span>
        </div>

        <div>© 2026 SACCA DAFIA (ALIAS TALESMAN) — ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────
   ALL PROJECTS ARCHIVE SHEET MODAL
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
  lang: 'en' | 'fr' 
}) => {
  if (!isOpen) return null;

  const allProjects = [
    { id: 'asset-iq', title: 'Asset IQ', tag: 'Product Design & SaaS', date: 'MAR 2026', img: '/imgs/assetiQ/cover_Asset.jpg', color: '#1D4ED8', desc: lang === 'fr' ? 'Gouvernance et télémétrie des actifs physiques industriels par QR code.' : 'Multi-site industrial physical asset telemetry via QR codes.' },
    { id: 'ehadj', title: 'eHadj', tag: 'National Logistics SaaS', date: 'JAN 2026', img: '/imgs/ehadj/cover_Ehadj.jpg', color: '#EAB308', desc: lang === 'fr' ? 'Orchestration digitale du pèlerinage au Bénin pour +30 ministères.' : 'Digital orchestration of national pilgrimage logistics in Benin.' },
    { id: 'beans', title: 'Beans', tag: 'B2B SaaS Engagement', date: 'DEC 2025', img: '/imgs/beans_cover.png', color: '#059669', desc: lang === 'fr' ? 'Plateforme SaaS de fidélisation & hub de 10 connecteurs e-commerce.' : 'B2B SaaS customer engagement platform & integration hub.' },
    { id: 'vortex', title: 'Vortex', tag: 'Mobile UX & Wallet', date: 'MAR 2026', img: '/imgs/vortex.webp', color: '#D97706', desc: lang === 'fr' ? 'Application mobile d\'achat de carburant et gestion de portefeuille.' : 'Mobile fuel purchasing & digital wallet management app.' },
    { id: 'strategy-arena', title: 'Strategy Arena', tag: 'Branding & Web Strategy', date: 'JAN 2026', img: '/imgs/Strategy-Arena.png', color: '#EAB308', desc: lang === 'fr' ? 'Cabinet de conseil en stratégie & transformation digitale pour PME.' : 'Strategy & digital transformation consulting agency platform.' },
    { id: 'tavares', title: 'Tavares & Visuals', tag: 'Creative Art Direction', date: 'NOV 2025', img: '/imgs/tavares.png', color: '#DC2626', desc: lang === 'fr' ? 'Direction artistique web, vitrines cinématographiques & e-commerce.' : 'Cinematic showcase sites, editorial e-commerce & galleries.' },
    { id: 'truvox', title: 'Truvox Studio', tag: 'Web Design & Studio', date: 'OCT 2025', img: '/imgs/truvox_cover.png', color: '#10B981', desc: lang === 'fr' ? 'Expériences numériques d\'exception & identité digitale de studio.' : 'High-end studio brand experience & digital showcase.' },
    { id: 'sport-advisor', title: 'Sport Advisor', tag: 'AI & Data Visualization', date: 'SEP 2025', img: '/imgs/assetiQ/advisor_image.png', color: '#00FA9A', desc: lang === 'fr' ? 'Plateforme d\'analyse et de pronostics sportifs basés sur l\'IA.' : 'AI-driven sports analysis & data visualization platform.' },
    { id: 'sagana', title: 'Sagana', tag: 'Web Art Direction', date: 'AUG 2025', img: '/imgs/sagana_cover.png', color: '#F59E0B', desc: lang === 'fr' ? 'Vitrine d\'excellence pour agence de conseil haut de gamme.' : 'High-end showcase site for elite advisory agency.' },
    { id: 'dolce-riviera', title: 'Dolce Riviera', tag: 'Luxury Hospitality UI/UX Interface', date: 'JUL 2025', img: '/imgs/dolce_cover.png', color: '#C5A059', desc: lang === 'fr' ? 'Interface UI/UX d\'exception pour l\'hôtellerie de luxe sur la Riviera.' : 'Luxury hospitality UI/UX interface concept for Riviera resort.' },
    { id: 'the-refuge', title: 'The Refuge', tag: 'Humanitarian Portal', date: 'JUN 2025', img: '/imgs/your-refuge.jpg', color: '#0d3479', desc: lang === 'fr' ? 'Portail humanitaire & suivi d\'impact en temps réel à Cotonou.' : 'Humanitarian portal & real-time impact tracker in Cotonou.' }
  ];

  return (
    <div className="robin-modal-overlay" onClick={onClose}>
      <div className="robin-modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1050px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '2px solid #121212', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>ARCHIVE COMPLÈTE ({allProjects.length} DOSSIERS)</span>
            <h2 style={{ fontFamily: 'var(--font-anton)', fontSize: '2.4rem', color: '#121212', margin: '4px 0 0 0', lineHeight: 1 }}>
              {lang === 'fr' ? 'INDEX TOUS LES PROJETS' : 'ALL PROJECTS ARCHIVE'}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: '#121212', color: '#FFF', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {allProjects.map((proj) => (
            <div 
              key={proj.id}
              className="robin-service-card"
              style={{ padding: '20px', cursor: 'pointer' }}
              onClick={() => {
                onClose();
                setCurrentView(proj.id);
              }}
            >
              <div style={{ position: 'relative', height: '160px', marginBottom: '14px', borderRadius: '4px', overflow: 'hidden', background: '#121212' }}>
                <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '10px', left: '10px', background: proj.color, color: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 'bold', padding: '3px 8px', borderRadius: '3px' }}>
                  {proj.date}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', marginBottom: '4px' }}>
                {proj.tag}
              </div>
              <h3 style={{ fontFamily: 'var(--font-anton)', fontSize: '1.6rem', color: '#121212', margin: '0 0 8px 0', lineHeight: 1 }}>
                {proj.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: '#444', margin: '0 0 14px 0', lineHeight: 1.4 }}>
                {proj.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px dashed #DDD', paddingTop: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 'bold', color: '#121212', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  VOIR LE PROJET <ArrowRight size={14} />
                </span>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

      {/* Header for Detail & Sub-Pages */}
      {currentView !== 'home' && (
        <header className="mosby-header">
          <div className="mosby-header-logo-container" onClick={() => handleViewSwitch('home')}>
            <span className="mosby-logo-text">SACCA DAFIA</span>
            <span className="mosby-logo-tag">
              {currentView === 'experiences' ? 'CAREER' : currentView === 'services' ? 'SERVICES' : currentView === 'all-projects' ? 'ALL PROJECTS' : 'CASE STUDY'}
            </span>
          </div>

          <div className="mosby-header-nav">
            <span className="mosby-nav-link" onClick={() => setIsAboutModalOpen(true)}>About</span>
            <LangSwitchControl lang={lang} onToggle={handleLangSwitch} />
            <button 
              className="robin-nav-contact-btn" 
              style={{ background: 'var(--mosby-yellow)', border: '1.5px solid #121212' }}
              onClick={() => {
                if ((window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                } else {
                  window.open('https://calendly.com/dafiashalom/30min', '_blank');
                }
              }}
            >
              CONTACT
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button for Detail Pages */}
          <button 
            className="robin-mobile-hamburger-btn mosby-header-mobile-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>MENU</span>
          </button>
        </header>
      )}

      {/* About Sheet Modal & All Projects Archive Modal */}
      <AboutSheetModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} lang={lang} />
      <AllProjectsModal isOpen={isAllProjectsModalOpen} onClose={() => setIsAllProjectsModalOpen(false)} setCurrentView={setCurrentView} lang={lang} />

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
                  onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}
                >
                  HOME
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { setIsAboutModalOpen(true); setIsMobileMenuOpen(false); }}
                >
                  ABOUT
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { setCurrentView('all-projects'); setIsMobileMenuOpen(false); }}
                >
                  ALL PROJECTS
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { 
                    setIsMobileMenuOpen(false);
                    if (currentView !== 'home') {
                      setCurrentView('home');
                      setTimeout(() => {
                        const elem = document.getElementById('products-saas');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const elem = document.getElementById('products-saas');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  PRODUCTS &amp; SAAS
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { 
                    setIsMobileMenuOpen(false);
                    if (currentView !== 'home') {
                      setCurrentView('home');
                      setTimeout(() => {
                        const elem = document.getElementById('featured-works');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const elem = document.getElementById('featured-works');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  FEATURED WORKS
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { setCurrentView('services'); setIsMobileMenuOpen(false); }}
                >
                  SERVICES
                </span>
                <span 
                  className="robin-mobile-nav-link" 
                  onClick={() => { setCurrentView('experiences'); setIsMobileMenuOpen(false); }}
                >
                  CAREER
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
      {currentView === 'services' && <ServicesView setCurrentView={handleViewSwitch} />}
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
              <div className="v2-nav-links">
                <span className={`v2-nav-link ${currentView === 'home' ? 'is-active' : ''}`} onClick={() => handleViewSwitch('home')}>
                  Home
                </span>
                <span className="v2-nav-link" onClick={() => setIsAboutModalOpen(true)}>
                  About Me
                </span>
                <span className="v2-nav-link" onClick={() => {
                  const elem = document.getElementById('featured-works');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Portfolio
                </span>
                <span className="v2-nav-link" onClick={() => {
                  const elem = document.getElementById('products-saas');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Designs
                </span>
                <span className="v2-nav-link" onClick={() => {
                  const elem = document.getElementById('services');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  else handleViewSwitch('services');
                }}>
                  Services
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

                {/* Yellow Handwritten Glow Signature */}
                <div className="v2-hero-signature">
                  <span className="v2-signature-text">Talesman</span>
                  <svg 
                    className="v2-signature-stroke" 
                    viewBox="0 0 160 32" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M 6 22 Q 65 6 128 18 Q 142 21 152 14" 
                      stroke="#FBBF24" 
                      strokeWidth="2.8" 
                      strokeLinecap="round" 
                    />
                    <circle cx="152" cy="7" r="3.2" fill="#FBBF24" />
                  </svg>
                </div>
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
                    <span className="v2-service-num">01</span>
                    <span className="v2-service-badge badge-cyan">SaaS &amp; Product</span>
                  </div>
                  <h3 className="v2-service-card-title">
                    {lang === 'fr' ? 'UI/UX & Design Produit (B2B SaaS)' : 'UI/UX & Product Design (B2B SaaS)'}
                  </h3>
                  <p className="v2-service-card-desc">
                    {lang === 'fr'
                      ? "Architecture de l'information complexe, tunnels d'activation sans friction, tableaux de bord de télémétrie et design systems Figma prêts pour l'ingénierie."
                      : "Complex information architecture, frictionless onboarding funnels, telemetry dashboards, and scalable Figma design systems ready for engineering."}
                  </p>
                  <div className="v2-service-tags">
                    <span className="v2-service-tag">Figma Tokens</span>
                    <span className="v2-service-tag">User Flows</span>
                    <span className="v2-service-tag">PRD Specs</span>
                    <span className="v2-service-tag">Data Viz</span>
                  </div>
                </div>

                {/* CARD 02: ART DIRECTION & WEB DESIGN */}
                <div className="v2-service-card card-glow-yellow">
                  <div className="v2-service-card-top">
                    <span className="v2-service-num">02</span>
                    <span className="v2-service-badge badge-yellow">Web Craft</span>
                  </div>
                  <h3 className="v2-service-card-title">
                    {lang === 'fr' ? 'Direction Artistique & Web Design' : 'Art Direction & Web Design'}
                  </h3>
                  <p className="v2-service-card-desc">
                    {lang === 'fr'
                      ? "Vitrines de marque immersives, typographie éditoriale sur mesure, animations de storytelling fluides et interfaces e-commerce à fort taux de conversion."
                      : "Immersive brand showcase websites, custom editorial typography, fluid storytelling animations, and conversion-focused digital experiences."}
                  </p>
                  <div className="v2-service-tags">
                    <span className="v2-service-tag">Art Direction</span>
                    <span className="v2-service-tag">Motion Design</span>
                    <span className="v2-service-tag">CRO Funnels</span>
                    <span className="v2-service-tag">Responsive UI</span>
                  </div>
                </div>

                {/* CARD 03: VIBE CODING & RAPID MVP */}
                <div className="v2-service-card card-glow-green">
                  <div className="v2-service-card-top">
                    <span className="v2-service-num">03</span>
                    <span className="v2-service-badge badge-green">Rapid MVP</span>
                  </div>
                  <h3 className="v2-service-card-title">
                    {lang === 'fr' ? 'Vibe Coding & Prototypage Rapide' : 'Vibe Coding & Rapid MVP Prototyping'}
                  </h3>
                  <p className="v2-service-card-desc">
                    {lang === 'fr'
                      ? "Prototypage fonctionnel ultra-rapide (React, TypeScript, Vite/Next) pour tester concrètement vos idées, valider l'UX auprès d'utilisateurs réels et convaincre vos investisseurs."
                      : "Ultra-fast functional software prototyping (React, TypeScript, Next/Vite) to validate UX with real users, pitch investors, and bridge the gap between design and production."}
                  </p>
                  <div className="v2-service-tags">
                    <span className="v2-service-tag">React / TypeScript</span>
                    <span className="v2-service-tag">Live Prototypes</span>
                    <span className="v2-service-tag">Fast Iteration</span>
                    <span className="v2-service-tag">Production-Ready</span>
                  </div>
                </div>

                {/* CARD 04: DESIGN SYSTEMS & DEV HANDOFF */}
                <div className="v2-service-card card-glow-purple">
                  <div className="v2-service-card-top">
                    <span className="v2-service-num">04</span>
                    <span className="v2-service-badge badge-purple">Systems &amp; Dev</span>
                  </div>
                  <h3 className="v2-service-card-title">
                    {lang === 'fr' ? 'Design Systems & Handoff Ingénieur' : 'Design Systems & Engineering Hand-off'}
                  </h3>
                  <p className="v2-service-card-desc">
                    {lang === 'fr'
                      ? "Bibliothèques de composants UI réutilisables, gouvernance de tokens, accessibilité WCAG et alignement designer-développeur pour éliminer toute friction d'intégration."
                      : "Reusable UI component libraries, design token governance, WCAG accessibility, and airtight designer-developer alignment to eliminate hand-off friction."}
                  </p>
                  <div className="v2-service-tags">
                    <span className="v2-service-tag">Design Tokens</span>
                    <span className="v2-service-tag">Accessibility</span>
                    <span className="v2-service-tag">Storybook / UI Kits</span>
                    <span className="v2-service-tag">Dev Handoff</span>
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action Card */}
              <div className="v2-services-cta-banner">
                <div className="v2-services-cta-text">
                  <h4>{lang === 'fr' ? 'Un projet ambitieux à concevoir ?' : 'Have an ambitious project in mind?'}</h4>
                  <p>{lang === 'fr' ? 'Discutons ensemble de vos défis produit et créatifs.' : "Let's discuss how we can turn your vision into high-impact software."}</p>
                </div>
                <button 
                  className="v2-services-cta-btn"
                  onClick={() => {
                    if ((window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                    } else {
                      window.open('https://calendly.com/dafiashalom/30min', '_blank');
                    }
                  }}
                >
                  <span>{lang === 'fr' ? 'Réserver un appel' : 'Book a 30-min Call'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>

            {/* SECTION: WEBSITE DESIGN & TOOLS BENTO GRID (EXACT REFERENCE DESIGN) */}
            <section id="webdesign" className="v2-webdesign-section scroll-reveal">
              {/* Violet Atmospheric Glow */}
              <div className="v2-webdesign-glow" aria-hidden="true" />

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
                    ? "Je conçois des sites web réactifs et des expériences numériques immersives avec des technologies modernes comme React, Antigravity, Figma, Next.js et TypeScript—idéals pour les marques, le SaaS et le e-commerce."
                    : "I design responsive websites and high-impact digital experiences using modern frameworks and tools like React, Antigravity, Figma, Next.js, and TypeScript—built for brand impact and conversion."}
                </p>
              </div>

              {/* Sub-header Bar */}
              <div className="v2-webdesign-subbar">
                <h3 className="v2-webdesign-subbar-title">
                  {lang === 'fr' ? 'Sites Web Phares' : 'Featured Websites'}
                </h3>
                <button 
                  className="v2-webdesign-all-btn"
                  onClick={() => handleViewSwitch('all-projects')}
                >
                  <span>{lang === 'fr' ? 'Tous les sites' : 'All Sites'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* 4-Card Website Showcase Row */}
              <div className="v2-webdesign-showcase-grid">
                {/* SITE 01: STRATEGY ARENA */}
                <div className="v2-website-card" onClick={() => handleViewSwitch('strategy-arena')}>
                  <div className="v2-website-card-meta">
                    <span className="v2-website-year">2026</span>
                    <h4 className="v2-website-name">Strategy Arena</h4>
                  </div>
                  <div className="v2-website-preview">
                    <img src="/imgs/Strategy-Arena.png" alt="Strategy Arena" />
                  </div>
                  <div className="v2-website-card-footer">
                    <span className="v2-website-category">Corporate / Consulting</span>
                    <a 
                      href="https://talesmanwebcraft.vercel.app/#strategy-arena" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="v2-website-live-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* SITE 02: DOLCE RIVIERA */}
                <div className="v2-website-card" onClick={() => handleViewSwitch('dolce-riviera')}>
                  <div className="v2-website-card-meta">
                    <span className="v2-website-year">2025</span>
                    <h4 className="v2-website-name">Dolce Riviera</h4>
                  </div>
                  <div className="v2-website-preview">
                    <img src="/imgs/dolce_cover.png" alt="Dolce Riviera" />
                  </div>
                  <div className="v2-website-card-footer">
                    <span className="v2-website-category">Luxury Hospitality</span>
                    <a 
                      href="https://talesmanwebcraft.vercel.app/#dolce-riviera" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="v2-website-live-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* SITE 03: SAGANA AGENCY */}
                <div className="v2-website-card" onClick={() => handleViewSwitch('sagana')}>
                  <div className="v2-website-card-meta">
                    <span className="v2-website-year">2025</span>
                    <h4 className="v2-website-name">Sagana Agency</h4>
                  </div>
                  <div className="v2-website-preview">
                    <img src="/imgs/sagana.png" alt="Sagana Agency" />
                  </div>
                  <div className="v2-website-card-footer">
                    <span className="v2-website-category">Advisory &amp; Branding</span>
                    <a 
                      href="https://www.sagana-agency.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="v2-website-live-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* SITE 04: TAVARES & VISUALS */}
                <div className="v2-website-card" onClick={() => handleViewSwitch('tavares')}>
                  <div className="v2-website-card-meta">
                    <span className="v2-website-year">2025</span>
                    <h4 className="v2-website-name">Tavares &amp; Visuals</h4>
                  </div>
                  <div className="v2-website-preview">
                    <img src="/imgs/tavares.png" alt="Tavares" />
                  </div>
                  <div className="v2-website-card-footer">
                    <span className="v2-website-category">Creative Art Direction</span>
                    <a 
                      href="https://portfolio-tavares.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="v2-website-live-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bento Grid: Tools + Collaborate + Navigation */}
              <div className="v2-bento-grid">
                {/* BENTO BLOCK 1: TOOLS 2x4 GRID (REACT, ANTIGRAVITY, FIGMA, ETC) */}
                <div className="v2-bento-card v2-bento-tools">
                  {/* Floating Vibe Coding Sticker */}
                  <div className="v2-bento-sticker">
                    <span>VIBE CODING ✦</span>
                  </div>

                  <div className="v2-tools-grid">
                    {/* Tool 1: React */}
                    <div className="v2-tool-item" title="React.js">
                      <svg viewBox="-11.5 -10.23174 23 20.46348" width="34" height="34">
                        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
                        <g stroke="#61DAFB" strokeWidth="1" fill="none">
                          <ellipse rx="11" ry="4.2"/>
                          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                        </g>
                      </svg>
                      <span className="v2-tool-label">React</span>
                    </div>

                    {/* Tool 2: Antigravity */}
                    <div className="v2-tool-item" title="Antigravity">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      <span className="v2-tool-label">Antigravity</span>
                    </div>

                    {/* Tool 3: Figma */}
                    <div className="v2-tool-item" title="Figma">
                      <svg viewBox="0 0 38 57" width="24" height="34" fill="none">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                      <span className="v2-tool-label">Figma</span>
                    </div>

                    {/* Tool 4: TypeScript */}
                    <div className="v2-tool-item" title="TypeScript">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="#3178C6">
                        <rect width="24" height="24" rx="4" fill="#3178C6" />
                        <path d="M11.5 11.5H8.5V20H6.5V11.5H3.5V9.5H11.5V11.5ZM19.5 13.2C19.5 12.3 18.8 11.6 17.5 11.3L16.2 11C15.2 10.8 14.8 10.4 14.8 9.8C14.8 9.1 15.4 8.6 16.3 8.6C17.3 8.6 17.9 9.1 18 9.9H20C19.9 8 18.4 6.8 16.3 6.8C14.2 6.8 12.7 8 12.7 9.9C12.7 11.6 13.7 12.4 15.2 12.7L16.5 13C17.6 13.2 18 13.7 18 14.3C18 15.1 17.3 15.6 16.2 15.6C15.1 15.6 14.3 15 14.2 14H12.1C12.2 16.1 13.9 17.4 16.2 17.4C18.5 17.4 20.1 16.1 20.1 14.2L19.5 13.2Z" fill="#FFFFFF"/>
                      </svg>
                      <span className="v2-tool-label">TypeScript</span>
                    </div>

                    {/* Tool 5: Next.js */}
                    <div className="v2-tool-item" title="Next.js">
                      <svg viewBox="0 0 180 180" width="32" height="32" fill="none">
                        <circle cx="90" cy="90" r="88" fill="#000" stroke="#FFF" strokeWidth="6" />
                        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z" fill="white" />
                        <rect x="115" y="54" width="12" height="72" fill="white" />
                      </svg>
                      <span className="v2-tool-label">Next.js</span>
                    </div>

                    {/* Tool 6: Tailwind CSS */}
                    <div className="v2-tool-item" title="Tailwind CSS">
                      <svg viewBox="0 0 24 24" width="34" height="34" fill="#38BDF8">
                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
                      </svg>
                      <span className="v2-tool-label">Tailwind</span>
                    </div>

                    {/* Tool 7: Vite */}
                    <div className="v2-tool-item" title="Vite">
                      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                        <path d="M29.5 5.5L16.5 28.5L3 5.5L16.5 12.5L29.5 5.5Z" fill="#BD34FE" stroke="#747BFF" strokeWidth="1.2"/>
                        <path d="M17.5 3L11.5 16H16.5L14.5 25L22.5 13H17.5L19.5 3H17.5Z" fill="#FFD026"/>
                      </svg>
                      <span className="v2-tool-label">Vite</span>
                    </div>

                    {/* Tool 8: Framer */}
                    <div className="v2-tool-item" title="Framer Motion">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFFFFF">
                        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
                      </svg>
                      <span className="v2-tool-label">Framer</span>
                    </div>
                  </div>
                </div>

                {/* BENTO BLOCK 2: COLLABORATE */}
                <div className="v2-bento-card v2-bento-collab">
                  <div className="v2-bento-collab-text">
                    <h4>Collaborate</h4>
                    <p>
                      {lang === 'fr' 
                        ? "Concevoir des espaces où les idées se rencontrent et où la collaboration s'épanouit." 
                        : "Designing spaces where ideas meet and collaboration thrives."}
                    </p>
                  </div>

                  {/* Designer Pointer Cursor Badge */}
                  <div className="v2-bento-collab-visual">
                    <div className="v2-collab-cursor-pill">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#A855F7" className="v2-cursor-arrow">
                        <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" />
                      </svg>
                      <span className="v2-cursor-badge-tag">Talesman</span>
                    </div>
                  </div>
                </div>

                {/* BENTO BLOCK 3: NAVIGATION */}
                <div className="v2-bento-card v2-bento-nav">
                  <div className="v2-bento-nav-text">
                    <h4>Navigation</h4>
                    <p>
                      {lang === 'fr'
                        ? "Structurez visuellement vos pages et reliez-les en quelques clics."
                        : "Visually structure your pages and link to them with a few clicks."}
                    </p>
                  </div>

                  {/* Mockup Drawer Card Preview */}
                  <div className="v2-bento-nav-drawer-mockup">
                    <div className="v2-nav-mockup-header">
                      <span className="v2-nav-mockup-close">✕</span>
                    </div>
                    <div className="v2-nav-mockup-links">
                      <span className="is-active">Home</span>
                      <span>About Me</span>
                      <span>Portfolio</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: PRODUCTS & B2B SAAS (ASSET IQ, EHADJ, BEANS) */}
            <section id="products-saas" className="robin-featured-section scroll-reveal">
              <h2 className="robin-pixel-title">PRODUCTS &amp; B2B SAAS</h2>

              <div className="robin-folder-stack">
                {/* FOLDER 01: ASSET IQ (BLUE TAB) */}
                <div className="robin-folder-drawer scroll-reveal delay-1">
                  <div className="robin-folder-tab" style={{ background: '#1D4ED8' }}>
                    ◆ PRODUCT 01
                  </div>
                  <div className="robin-folder-body">
                    <div>
                      <div className="robin-folder-date">• MAR 2, 2026</div>
                      <h3 className="robin-folder-title">Asset IQ</h3>
                      <p className="robin-folder-desc">
                        {lang === 'fr'
                          ? "Gouvernance et télémétrie des actifs physiques industriels multi-sites par QR code."
                          : "Multi-site industrial physical asset governance and telemetry via QR codes."}
                      </p>
                      <button className="robin-cta-black-btn" onClick={() => setCurrentView('asset-iq')} style={{ background: '#1D4ED8', borderColor: '#1D4ED8' }}>
                        <span>VIEW PRODUCT ↗</span>
                      </button>
                    </div>

                    <div className="robin-folder-media" onClick={() => setCurrentView('asset-iq')} style={{ cursor: 'pointer' }}>
                      <div className="robin-washi-tape" />
                      <img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ Preview" />
                    </div>
                  </div>
                </div>

                {/* FOLDER 02: EHADJ (YELLOW TAB) */}
                <div className="robin-folder-drawer scroll-reveal delay-2">
                  <div className="robin-folder-tab" style={{ background: '#EAB308', color: '#121212' }}>
                    ◆ PRODUCT 02
                  </div>
                  <div className="robin-folder-body">
                    <div>
                      <div className="robin-folder-date">• JAN 2, 2026</div>
                      <h3 className="robin-folder-title">eHadj</h3>
                      <p className="robin-folder-desc">
                        {lang === 'fr'
                          ? "Orchestration digitale du pèlerinage au Bénin pour +30 agences et ministères."
                          : "Digital orchestration of national pilgrimage logistics in Benin for 30+ agencies and ministries."}
                      </p>
                      <button className="robin-cta-black-btn" onClick={() => setCurrentView('ehadj')} style={{ background: '#DC2626', borderColor: '#DC2626' }}>
                        <span>VIEW PRODUCT ↗</span>
                      </button>
                    </div>

                    <div className="robin-folder-media" onClick={() => setCurrentView('ehadj')} style={{ cursor: 'pointer', transform: 'rotate(-1.5deg)' }}>
                      <div className="robin-washi-tape" style={{ background: 'rgba(244, 114, 182, 0.85)' }} />
                      <img src="/imgs/ehadj/cover_Ehadj.jpg" alt="eHadj Preview" />
                    </div>
                  </div>
                </div>

                {/* FOLDER 03: BEANS (GREEN TAB) */}
                <div className="robin-folder-drawer scroll-reveal delay-3">
                  <div className="robin-folder-tab" style={{ background: '#059669' }}>
                    ◆ PRODUCT 03
                  </div>
                  <div className="robin-folder-body">
                    <div>
                      <div className="robin-folder-date">• DEC 15, 2025</div>
                      <h3 className="robin-folder-title">Beans</h3>
                      <p className="robin-folder-desc">
                        {lang === 'fr'
                          ? "Plateforme SaaS B2B de fidélisation client & hub de 10 connecteurs e-commerce et sociaux."
                          : "B2B SaaS customer engagement platform & integration hub powering 10 major connectors."}
                      </p>
                      <button className="robin-cta-black-btn" onClick={() => setCurrentView('beans')} style={{ background: '#059669', borderColor: '#059669' }}>
                        <span>VIEW PRODUCT ↗</span>
                      </button>
                    </div>

                    <div className="robin-folder-media" onClick={() => setCurrentView('beans')} style={{ cursor: 'pointer', transform: 'rotate(1deg)' }}>
                      <div className="robin-washi-tape" style={{ background: 'rgba(167, 243, 208, 0.85)' }} />
                      <img src="/imgs/beans_cover.png" alt="Beans Preview" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: FEATURED WORKS (3-COLUMN EDITORIAL CARDS: VORTEX, STRATEGY ARENA, TAVARES) */}
            <section id="featured-works" className="robin-featured-section scroll-reveal">
              <h2 className="robin-pixel-title">FEATURED WORKS</h2>

              <div className="robin-featured-grid">
                {/* CARD 01: VORTEX */}
                <div className="robin-featured-card scroll-reveal delay-1" onClick={() => setCurrentView('vortex')}>
                  <div className="robin-washi-tape" style={{ top: '-10px', left: '20px', background: 'rgba(254, 240, 138, 0.9)', zIndex: 20 }} />
                  <div className="robin-featured-card-header">
                    <span className="robin-featured-card-stamp badge-yellow">SHOWCASE 01</span>
                    <img src="/imgs/vortex.webp" alt="Vortex Mobile App" className="robin-featured-card-image" />
                  </div>

                  <div className="robin-featured-card-content">
                    <div>
                      <div className="robin-featured-card-date">• MAR 2026</div>
                      <h3 className="robin-featured-card-title">Vortex</h3>
                      <p className="robin-featured-card-desc">
                        {lang === 'fr'
                          ? "Application mobile d'achat de carburant & gestion de portefeuille numérique ultra-rapide."
                          : "Mobile fuel purchasing & digital wallet management app designed for speed."}
                      </p>
                    </div>

                    <div className="robin-featured-card-footer">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#666' }}>MOBILE UX</span>
                      <button className="robin-featured-cta-btn" style={{ background: '#D97706', borderColor: '#D97706' }}>
                        <span>EXPLORE</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* CARD 02: STRATEGY ARENA */}
                <div className="robin-featured-card scroll-reveal delay-2" onClick={() => setCurrentView('strategy-arena')}>
                  <div className="robin-washi-tape" style={{ top: '-10px', right: '20px', left: 'auto', background: 'rgba(147, 197, 253, 0.9)', zIndex: 20 }} />
                  <div className="robin-featured-card-header">
                    <span className="robin-featured-card-stamp badge-blue">SHOWCASE 02</span>
                    <img src="/imgs/Strategy-Arena.png" alt="Strategy Arena Platform" className="robin-featured-card-image" />
                  </div>

                  <div className="robin-featured-card-content">
                    <div>
                      <div className="robin-featured-card-date">• JAN 2026</div>
                      <h3 className="robin-featured-card-title">Strategy Arena</h3>
                      <p className="robin-featured-card-desc">
                        {lang === 'fr'
                          ? "Cabinet de conseil en stratégie, organisation & transformation digitale pour PME."
                          : "Strategy & digital transformation consulting agency platform for growing SMEs."}
                      </p>
                    </div>

                    <div className="robin-featured-card-footer">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#666' }}>BRANDING &amp; WEB</span>
                      <button className="robin-featured-cta-btn" style={{ background: '#1D4ED8', borderColor: '#1D4ED8' }}>
                        <span>EXPLORE</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* CARD 03: TAVARES & VISUALS */}
                <div className="robin-featured-card scroll-reveal delay-3" onClick={() => setCurrentView('tavares')}>
                  <div className="robin-washi-tape" style={{ top: '-10px', left: '30px', background: 'rgba(244, 114, 182, 0.9)', zIndex: 20 }} />
                  <div className="robin-featured-card-header">
                    <span className="robin-featured-card-stamp badge-pink">SHOWCASE 03</span>
                    <img src="/imgs/tavares.png" alt="Tavares Showcase" className="robin-featured-card-image" />
                  </div>

                  <div className="robin-featured-card-content">
                    <div>
                      <div className="robin-featured-card-date">• NOV 2025</div>
                      <h3 className="robin-featured-card-title">Tavares &amp; Visuals</h3>
                      <p className="robin-featured-card-desc">
                        {lang === 'fr'
                          ? "Direction artistique web d'exception, vitrines cinématographiques et e-commerce éditorial."
                          : "Curated collection of cinematic showcase sites, editorial e-commerce, and immersive galleries."}
                      </p>
                    </div>

                    <div className="robin-featured-card-footer">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#666' }}>ART DIRECTION</span>
                      <button className="robin-featured-cta-btn" style={{ background: '#DC2626', borderColor: '#DC2626' }}>
                        <span>EXPLORE</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEE ALL PROJECTS CTA BUTTON */}
              <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button 
                  className="robin-cta-black-btn" 
                  style={{ padding: '16px 36px', fontSize: '0.95rem' }}
                  onClick={() => setCurrentView('all-projects')}
                >
                  <span>{lang === 'fr' ? 'VOIR TOUS LES PROJETS' : 'VIEW ALL PROJECTS'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </section>

            {/* SECTION 4: SERVICES & CAPABILITIES — EDITORIAL CARDS */}
            <section className="robin-services-section scroll-reveal">
              <h2 className="robin-pixel-title">SERVICES &amp; OFFERS</h2>

              <div className="robin-services-grid">
                {/* OFFER 01 */}
                <div className="robin-service-card scroll-reveal delay-1" onClick={() => setCurrentView('services')}>
                  <div className="robin-washi-tape" style={{ top: '-10px', left: '20px' }} />
                  <div>
                    <div className="robin-service-card-header">
                      <span className="robin-service-stamp-num badge-yellow">01</span>
                      <span className="robin-service-tag">B2B &amp; ENTERPRISE SAAS</span>
                    </div>

                    <h3 className="robin-service-title">SaaS &amp; Platform Design</h3>

                    <p className="robin-service-body">
                      {lang === 'fr'
                        ? "Architectures d'interfaces complexes, tableaux de bord de données et design systems Figma modulaires."
                        : "Complex web application architectures, data-dense dashboards, and modular Figma Design Systems."}
                    </p>

                    <ul className="robin-service-deliverables">
                      <li>• {lang === 'fr' ? 'Parcours utilisateurs multi-acteurs' : 'Multi-tenant user journeys'}</li>
                      <li>• {lang === 'fr' ? 'Design Systems Figma avec Tokens' : 'Figma Design System with Tokens'}</li>
                      <li>• {lang === 'fr' ? 'Spécifications de composants UI' : 'UI Component Specs & States'}</li>
                    </ul>
                  </div>

                  <div className="robin-service-footer">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666' }}>DOSSIER #01</span>
                    <button className="robin-service-cta-btn">
                      <span>{lang === 'fr' ? 'DÉCOUVRIR' : 'EXPLORE'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* OFFER 02 */}
                <div className="robin-service-card scroll-reveal delay-2" onClick={() => setCurrentView('services')}>
                  <div className="robin-washi-tape" style={{ top: '-10px', right: '20px', left: 'auto', background: 'rgba(147, 197, 253, 0.85)' }} />
                  <div>
                    <div className="robin-service-card-header">
                      <span className="robin-service-stamp-num badge-blue">02</span>
                      <span className="robin-service-tag">PRODUCT AUDIT &amp; CRO</span>
                    </div>

                    <h3 className="robin-service-title">UX Audit &amp; Conversion</h3>

                    <p className="robin-service-body">
                      {lang === 'fr'
                        ? "Analyse heuristique poussée, cartographie des goulots d'étranglement et plan d'action d'optimisation du taux de conversion."
                        : "Deep heuristic evaluation, friction point mapping, and prioritized quick-win conversion optimization roadmap."}
                    </p>

                    <ul className="robin-service-deliverables">
                      <li>• {lang === 'fr' ? 'Audit heuristique complet' : 'Full Heuristic UX Review'}</li>
                      <li>• {lang === 'fr' ? 'Cartographie des goulots d\'étranglement' : 'Friction & Bottleneck Mapping'}</li>
                      <li>• {lang === 'fr' ? 'Plan d\'action rapide CRO' : 'Prioritized CRO Action Plan'}</li>
                    </ul>
                  </div>

                  <div className="robin-service-footer">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666' }}>DOSSIER #02</span>
                    <button className="robin-service-cta-btn" style={{ background: '#1D4ED8', borderColor: '#1D4ED8' }}>
                      <span>{lang === 'fr' ? 'DÉCOUVRIR' : 'EXPLORE'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* OFFER 03 */}
                <div className="robin-service-card scroll-reveal delay-3" onClick={() => setCurrentView('services')}>
                  <div className="robin-washi-tape" style={{ top: '-10px', left: '30px', background: 'rgba(244, 114, 182, 0.85)' }} />
                  <div>
                    <div className="robin-service-card-header">
                      <span className="robin-service-stamp-num badge-pink">03</span>
                      <span className="robin-service-tag">PRODUCT SPECIFICATIONS</span>
                    </div>

                    <h3 className="robin-service-title">Product Strategy &amp; PRDs</h3>

                    <p className="robin-service-body">
                      {lang === 'fr'
                        ? "Cadrage stratégique des besoins, rédaction de PRDs complets, spécifications d'API et supervision de la recette QA."
                        : "Strategic requirement scoping, detailed PRD authoring, functional API specs, and complete QA supervision."}
                    </p>

                    <ul className="robin-service-deliverables">
                      <li>• {lang === 'fr' ? 'Rédaction de PRDs complets' : 'Complete PRD Documentation'}</li>
                      <li>• {lang === 'fr' ? 'Spécifications fonctionnelles API' : 'Functional & API Specifications'}</li>
                      <li>• {lang === 'fr' ? 'Grille de recette Assurance Qualité (QA)' : 'QA Recipe & Validation Checklist'}</li>
                    </ul>
                  </div>

                  <div className="robin-service-footer">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666' }}>DOSSIER #03</span>
                    <button className="robin-service-cta-btn" style={{ background: '#DC2626', borderColor: '#DC2626' }}>
                      <span>{lang === 'fr' ? 'DÉCOUVRIR' : 'EXPLORE'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* OFFER 04 */}
                <div className="robin-service-card scroll-reveal delay-4" onClick={() => setCurrentView('services')}>
                  <div className="robin-washi-tape" style={{ top: '-10px', right: '30px', left: 'auto', background: 'rgba(167, 243, 208, 0.85)' }} />
                  <div>
                    <div className="robin-service-card-header">
                      <span className="robin-service-stamp-num badge-green">04</span>
                      <span className="robin-service-tag">ART DIRECTION &amp; CODE</span>
                    </div>

                    <h3 className="robin-service-title">Design &amp; Vibe Coding</h3>

                    <p className="robin-service-body">
                      {lang === 'fr'
                        ? "Direction artistique web d'exception, vitrines cinématographiques et prototypage rapide React/Vite 60fps."
                        : "High-end web art direction, editorial showcase sites, and rapid production-ready React/Vite prototyping."}
                    </p>

                    <ul className="robin-service-deliverables">
                      <li>• {lang === 'fr' ? 'Direction artistique web d\'exception' : 'Web Art Direction & Micro-animations'}</li>
                      <li>• {lang === 'fr' ? 'Prototypage interactif React / Vite' : 'Production-grade React/Vite Prototypes'}</li>
                      <li>• {lang === 'fr' ? 'Refonte de marque & Vitrines' : 'Brand Identity & Showcase Sites'}</li>
                    </ul>
                  </div>

                  <div className="robin-service-footer">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666' }}>DOSSIER #04</span>
                    <button className="robin-service-cta-btn" style={{ background: '#059669', borderColor: '#059669' }}>
                      <span>{lang === 'fr' ? 'DÉCOUVRIR' : 'EXPLORE'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: CAREER LOGS & DETAILED TIMELINE */}
            <section className="robin-experience-section scroll-reveal">
              <h2 className="robin-pixel-title">CAREER LOGS</h2>

              <div className="robin-timeline-container">
                {/* ROLE 01: CACTUCE */}
                <div className="robin-timeline-card scroll-reveal delay-1">
                  <div className="robin-timeline-node">
                    <div className="robin-timeline-node-inner" />
                  </div>

                  <div className="robin-timeline-header">
                    <div>
                      <span className="robin-timeline-company">CACTUCE</span>
                      <span className="robin-timeline-role-badge" style={{ marginLeft: '12px' }}>Product Designer</span>
                    </div>
                    <span className="robin-timeline-date">OCT 2025 — MAY 2026</span>
                  </div>

                  <div className="robin-timeline-tagline">
                    B2B SAAS ARCHITECTURE &amp; PROCESS OPTIMIZATION
                  </div>

                  <ul className="robin-timeline-bullets">
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

                  <div className="robin-timeline-impact-pill">
                    {lang === 'fr' ? 'RÉSULTAT : 90% d\'erreurs en moins & zéro doublon de dossier' : 'IMPACT: 90% reduction in dossier errors & zero duplicate records'}
                  </div>

                  <div className="robin-timeline-tools-row">
                    <span className="robin-timeline-tool-tag">Product Design</span>
                    <span className="robin-timeline-tool-tag">Figma Tokens</span>
                    <span className="robin-timeline-tool-tag">QA Recipe</span>
                    <span className="robin-timeline-tool-tag">eHadj &amp; Asset IQ</span>
                    <span className="robin-timeline-tool-tag">User Flows</span>
                  </div>
                </div>

                {/* ROLE 02: TRELLIX */}
                <div className="robin-timeline-card scroll-reveal delay-2">
                  <div className="robin-timeline-node">
                    <div className="robin-timeline-node-inner" style={{ background: '#1D4ED8' }} />
                  </div>

                  <div className="robin-timeline-header">
                    <div>
                      <span className="robin-timeline-company">TRELLIX</span>
                      <span className="robin-timeline-role-badge" style={{ background: '#93C5FD', color: '#121212', marginLeft: '12px' }}>
                        Lead Product Designer
                      </span>
                    </div>
                    <span className="robin-timeline-date">FEB 2024 — SEP 2025</span>
                  </div>

                  <div className="robin-timeline-tagline" style={{ color: '#1D4ED8' }}>
                    ENTERPRISE SAAS &amp; PRODUCT STRATEGY LEADERSHIP
                  </div>

                  <ul className="robin-timeline-bullets">
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

                  <div className="robin-timeline-impact-pill" style={{ background: 'rgba(29, 78, 216, 0.1)', color: '#1D4ED8', borderColor: 'rgba(29, 78, 216, 0.3)' }}>
                    {lang === 'fr' ? 'RÉSULTAT : +50% de vélocité de dev via PRDs & specs' : 'IMPACT: +50% dev velocity via PRDs & clear functional specs'}
                  </div>

                  <div className="robin-timeline-tools-row">
                    <span className="robin-timeline-tool-tag">PRD Writing</span>
                    <span className="robin-timeline-tool-tag">Team Leadership</span>
                    <span className="robin-timeline-tool-tag">User Research</span>
                    <span className="robin-timeline-tool-tag">B2B SaaS</span>
                    <span className="robin-timeline-tool-tag">Dev Handoff</span>
                  </div>
                </div>

                {/* ROLE 03: CREAFIX */}
                <div className="robin-timeline-card scroll-reveal delay-3">
                  <div className="robin-timeline-node">
                    <div className="robin-timeline-node-inner" style={{ background: '#059669' }} />
                  </div>

                  <div className="robin-timeline-header">
                    <div>
                      <span className="robin-timeline-company">CREAFIX</span>
                      <span className="robin-timeline-role-badge" style={{ background: '#A7F3D0', color: '#121212', marginLeft: '12px' }}>
                        Web Designer
                      </span>
                    </div>
                    <span className="robin-timeline-date">AUG 2022 — FEB 2024</span>
                  </div>

                  <div className="robin-timeline-tagline" style={{ color: '#059669' }}>
                    WEB ART DIRECTION &amp; BRAND EXPERIENCE
                  </div>

                  <ul className="robin-timeline-bullets">
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

                  <div className="robin-timeline-impact-pill" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669', borderColor: 'rgba(5, 150, 105, 0.3)' }}>
                    {lang === 'fr' ? 'RÉSULTAT : +15 vitrines web & e-commerce d\'exception livrées' : 'IMPACT: 15+ luxury showcase & e-commerce sites delivered'}
                  </div>

                  <div className="robin-timeline-tools-row">
                    <span className="robin-timeline-tool-tag">Web Art Direction</span>
                    <span className="robin-timeline-tool-tag">Responsive UI</span>
                    <span className="robin-timeline-tool-tag">E-Commerce</span>
                    <span className="robin-timeline-tool-tag">Micro-Animations</span>
                    <span className="robin-timeline-tool-tag">CRO</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: CONTACT STICKY NOTE ("LET'S TALK") */}
            <section className="robin-contact-section scroll-reveal">
              <h2 className="robin-pixel-title">LET'S TALK</h2>

              <div className="robin-sticky-note-box scroll-reveal delay-1">
                <div className="robin-washi-tape" style={{ top: '-14px', left: '30px' }} />
                <div className="robin-washi-tape" style={{ top: '-14px', right: '30px', left: 'auto' }} />

                <p>
                  {lang === 'fr'
                    ? '"Vous avez un projet, un problème complexe ou souhaitez échanger ? Discutons-en directement lors d\'un appel."'
                    : '"Got a project, a complex problem, or want to explore working together? Let\'s discuss it directly on a call."'}
                </p>

                <button className="robin-cta-black-btn" onClick={() => {
                  if ((window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                  } else {
                    window.open('https://calendly.com/dafiashalom/30min', '_blank');
                  }
                }}>
                  <span>{lang === 'fr' ? 'RÉSERVER UN APPEL' : 'BOOK A CALL'}</span>
                  <Calendar size={16} />
                </button>
              </div>

              {/* Archival Footer */}
              <MosbyFooter setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
