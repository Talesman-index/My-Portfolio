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
                  Web &amp; Product Designer (+4 ans exp)
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
                ? "En tant que Web Designer & Product Designer, je façonne des produits numériques à la fois beaux, intuitifs et hautement fonctionnels. En complément, ma maîtrise du Vibe Coding me permet de proposer des MVPs rapides et interactifs, offrant ainsi aux clients une meilleure validation terrain et un test utilisateur réel dès les premières phases du projet."
                : "As a Web Designer & Product Designer, I craft digital products that are elegant, intuitive, and highly functional. As a value-added skill, my Vibe Coding capabilities allow me to quickly deliver interactive MVPs to clients for faster user validation and real-world testing."}
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
              <div className="mosby-signature-text">Sacca Dafia</div>
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

        <div>© 2026 SACCA DAFIA — ALL RIGHTS RESERVED</div>
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
  const [lang, setLang] = useState<'en' | 'fr'>('fr');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAllProjectsModalOpen, setIsAllProjectsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    const handlePopState = () => setCurrentView(getViewFromHash());
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <>
      {/* Header for Detail & Sub-Pages */}
      {currentView !== 'home' && (
        <header className="mosby-header">
          <div className="mosby-header-logo-container" onClick={() => navigateToHome(setCurrentView)}>
            <span className="mosby-logo-text">SACCA DAFIA</span>
            <span className="mosby-logo-tag">
              {currentView === 'experiences' ? 'CAREER' : currentView === 'services' ? 'SERVICES' : currentView === 'all-projects' ? 'ALL PROJECTS' : 'CASE STUDY'}
            </span>
          </div>

          <div className="mosby-header-nav">
            <span className="mosby-nav-link" onClick={() => setIsAboutModalOpen(true)}>About</span>
            <button className="mosby-lang-toggle" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
              {lang.toUpperCase()}
            </button>
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
        </header>
      )}

      {/* About Sheet Modal & All Projects Archive Modal */}
      <AboutSheetModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} lang={lang} />
      <AllProjectsModal isOpen={isAllProjectsModalOpen} onClose={() => setIsAllProjectsModalOpen(false)} setCurrentView={setCurrentView} lang={lang} />

      {/* Render Active View */}
      {currentView === 'experiences' && <ExperiencesView setCurrentView={setCurrentView} />}
      {currentView === 'services' && <ServicesView setCurrentView={setCurrentView} />}
      {currentView === 'all-projects' && <AllProjectsView setCurrentView={setCurrentView} lang={lang} />}
      {currentView !== 'home' && currentView !== 'experiences' && currentView !== 'services' && currentView !== 'all-projects' && (
        <CaseStudy id={currentView as CaseStudyId} setCurrentView={setCurrentView} lang={lang} />
      )}

      {/* Main Robin / Mosby Notebook Paper Portfolio Homepage */}
      {currentView === 'home' && (
        <div className="robin-notebook-outer">
          {/* Scroll Progress Bar */}
          <div className="robin-scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

          <main className="robin-notebook-page">
            {/* TOP FLOATING NAVIGATION BAR */}
            <nav className="robin-floating-nav">
              {/* Mobile Brand Name */}
              <div className="robin-nav-brand" onClick={() => setCurrentView('home')}>
                SACCA DAFIA
              </div>

              {/* Desktop Nav Items */}
              <div className="robin-nav-desktop-container">
                <div className="robin-nav-items">
                  <span className={`robin-nav-pill ${currentView === 'home' ? 'is-active' : ''}`} onClick={() => setCurrentView('home')}>
                    HOME
                  </span>
                  <span className="robin-nav-pill" onClick={() => setIsAboutModalOpen(true)}>
                    ABOUT
                  </span>
                  <span className="robin-nav-pill" onClick={() => {
                    const elem = document.getElementById('products-saas');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    PRODUCTS &amp; SAAS
                  </span>
                  <span className="robin-nav-pill" onClick={() => {
                    const elem = document.getElementById('featured-works');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    FEATURED WORKS
                  </span>
                  <span className="robin-nav-pill" onClick={() => setCurrentView('services')}>
                    SERVICES
                  </span>
                  <span className="robin-nav-pill" onClick={() => setCurrentView('experiences')}>
                    CAREER
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button className="robin-nav-pill" style={{ border: '1.5px solid #121212', background: '#FFFFFF', fontWeight: 'bold' }} onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
                    {lang.toUpperCase()}
                  </button>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="robin-nav-pill" style={{ padding: '4px 10px' }}>
                    <Linkedin size={15} />
                  </a>
                  <a href="mailto:dafiashalom@gmail.com" className="robin-nav-pill" style={{ padding: '4px 10px' }} title="dafiashalom@gmail.com">
                    <Mail size={15} />
                  </a>
                  <button className="robin-nav-contact-btn" onClick={() => {
                    if ((window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                    } else {
                      window.open('https://calendly.com/dafiashalom/30min', '_blank');
                    }
                  }}>
                    CONTACT
                  </button>
                </div>
              </div>

              {/* Mobile Hamburger Toggle Button */}
              <button 
                className="robin-mobile-hamburger-btn" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                <span>MENU</span>
              </button>
            </nav>

            {/* Mobile Slide-out Notebook Paper Drawer Menu */}
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
                        onClick={() => { 
                          setIsMobileMenuOpen(false);
                          const elem = document.getElementById('products-saas');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        PRODUCTS &amp; SAAS
                      </span>
                      <span 
                        className="robin-mobile-nav-link" 
                        onClick={() => { 
                          setIsMobileMenuOpen(false);
                          const elem = document.getElementById('featured-works');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
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
                    <button className="robin-nav-pill" style={{ border: '1.5px solid #121212', background: '#FFFFFF', fontWeight: 'bold', width: '100%', marginBottom: '12px' }} onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
                      LANGUE: {lang.toUpperCase()}
                    </button>

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

            {/* SECTION 1: HERO & POSITIONING */}
            <section className="robin-hero-section scroll-reveal">
              <span className="robin-handwritten-lead">my name is</span>

              <div className="robin-hero-box-container">
                {/* Big Outlined Boxed Name */}
                <div className="robin-hero-boxed-name">
                  SACCA DAFIA
                </div>

                {/* Floating Pills around Name Box */}
                <div className="robin-hero-badges-wrapper">
                  <span className="robin-badge-floating badge-green badge-pos-top-left">MADE THINGS</span>
                  <span className="robin-badge-floating badge-yellow badge-pos-top-right">SWEAT THE DETAILS</span>
                  <span className="robin-badge-floating badge-yellow badge-pos-bottom-left">Product Designer</span>
                  <span className="robin-badge-floating badge-white badge-pos-bottom-mid">
                    <span className="hero-status-dot" style={{ display: 'inline-block', marginRight: '6px' }} />
                    OPEN TO NEW WORK AND GOOD PROBLEMS
                  </span>
                  <span className="robin-badge-floating badge-green badge-pos-bottom-right">Cotonou, BJ</span>
                </div>
              </div>

              {/* Tagline with Circular Avatars */}
              <div className="robin-hero-tagline-wrapper">
                <img src="/imgs/sacca_headshot.jpg" alt="Sacca Dafia Avatar" className="robin-avatar-circle" />
                <h1 className="robin-hero-tagline">
                  {lang === 'fr'
                    ? "Je conçois des produits numériques qui s'effacent pour laisser place à l'évidence."
                    : "I design software that gets out of your way."}
                </h1>
                <img src="/imgs/hero_image.png" alt="Sacca Avatar 2" className="robin-avatar-circle" />
              </div>

              <div>
                <button className="robin-cta-black-btn" onClick={() => {
                  if ((window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
                  } else {
                    window.open('https://calendly.com/dafiashalom/30min', '_blank');
                  }
                }}>
                  <span>{lang === 'fr' ? 'ME CONTACTER' : 'CONTACT ME'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Hand-Drawn Pencil Sketch Scroll Down Indicator */}
              <div 
                className="robin-pencil-scroll-container" 
                onClick={() => {
                  const elem = document.querySelector('.robin-about-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="robin-pencil-scroll-text">
                  {lang === 'fr' ? 'défiler vers le bas' : 'scroll down'}
                </span>
                <svg 
                  className="robin-pencil-scroll-svg" 
                  width="30" 
                  height="46" 
                  viewBox="0 0 30 46" 
                  fill="none" 
                  stroke="#121212" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M15 4 C14.2 14 15.8 24 15 35" strokeDasharray="5 3 2 2" />
                  <path d="M7 27 C10 32 13 36 15 39 C17 36 20 32 23 27" strokeWidth="2.4" />
                  <path d="M11 41 C13 43 17 43 19 41" strokeWidth="1.6" strokeOpacity="0.7" />
                </svg>
              </div>
            </section>

            {/* SECTION 2: ABOUT ("about me!" & "what's up") */}
            <section className="robin-about-section scroll-reveal">
              <span className="robin-handwritten-lead">about me!</span>
              <div className="robin-stamped-title">what's up</div>

              <div className="robin-about-grid">
                {/* Left Taped Polaroid Card */}
                <div className="robin-polaroid-card robin-polaroid-card-left scroll-reveal delay-1">
                  <div className="robin-washi-tape" />
                  <img src="/imgs/hero_image.png" alt="Sacca Dafia Polaroid 1" />
                  <div className="robin-polaroid-caption">2026 dossier</div>
                </div>

                {/* Center Handwritten Body Text */}
                <div className="scroll-reveal delay-2">
                  <p className="robin-about-body-text">
                    {lang === 'fr'
                      ? "Je suis un product designer passionné par la simplification des systèmes complexes. Je porte un soin obsessionnel aux détails, aux cas d'usage oubliés et à la création d'interfaces qui facilitent vraiment la vie de leurs utilisateurs."
                      : "I'm a product designer who gets a little too excited about making complicated things feel simple. I care about the small details, the edge cases everyone forgets, and shipping work that genuinely makes someone's day easier."}
                  </p>

                  <div className="robin-stamp-pills-row">
                    <span className="robin-stamp-pill badge-yellow">Product Design</span>
                    <span className="robin-stamp-pill badge-green">Vibe Coding</span>
                    <span className="robin-stamp-pill badge-pink">UX Strategy</span>
                    <span className="robin-stamp-pill badge-blue">Design Systems</span>
                  </div>
                </div>

                {/* Right Taped Polaroid Card */}
                <div className="robin-polaroid-card robin-polaroid-card-right scroll-reveal delay-3">
                  <div className="robin-washi-tape" style={{ left: 'auto', right: '20px', background: 'rgba(147, 197, 253, 0.85)' }} />
                  <img src="/imgs/vibe_coding_setup.jpg" alt="Sacca Workspace Polaroid 2" />
                  <div className="robin-polaroid-caption">by @misterthobis</div>
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
