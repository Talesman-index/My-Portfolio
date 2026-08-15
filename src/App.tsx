import { useState, useEffect } from 'react';
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
  Sparkles,
  Home,
  Building2,
  Briefcase
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
  'dolce-riviera': { title: 'Dolce Riviera', color: '#1D4ED8', categoryLabel: 'Luxury E-Commerce & Editorial UI', year: '2025', externalLink: 'https://talesmanwebcraft.vercel.app/#dolce-riviera' },
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
          <ArrowLeft size={16} /> <span>← RETURN TO ARCHIVE HOME</span>
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#FFF', opacity: 0.8, textTransform: 'uppercase' }}>NEXT FILE IN ARCHIVE →</div>
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
        ← RETURN HOME
      </div>

      {/* Floating Scroll Pill Button */}
      <div className="mosby-floating-scroll-badge" onClick={() => setCurrentView(nextId)}>
        Scroll for next file ↓
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   EXPERIENCES DOSSIER VIEW (CREAFIX, TRELLIX, CACTUCE)
───────────────────────────────────────────── */
const ExperiencesView = ({ setCurrentView }: { setCurrentView: any }) => {
  return (
    <div className="mosby-dossier-view" style={{ paddingTop: '40px' }}>
      <div className="container">
        <button 
          onClick={() => navigateToHome(setCurrentView)} 
          className="mosby-back-btn"
        >
          <ArrowLeft size={16} /> <span>← RETURN TO ARCHIVE HOME</span>
        </button>

        <h1 className="mosby-dossier-giant-title" style={{ padding: '0 0 20px 0' }}>CAREER &amp; COMPANY LOGS</h1>

        <div className="mosby-paper-sheet" style={{ maxWidth: '1050px' }}>
          <BinderHoles />

          <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.2rem', marginBottom: '28px', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={26} color="#DC2626" />
            <span>EXPÉRIENCE EN ENTREPRISE (CREAFIX, TRELLIX, CACTUCE)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* COMPANY 01: CREAFIX */}
            <div style={{ padding: '28px', background: '#FFF', borderLeft: '6px solid #DC2626', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: '#DC2626', color: '#FFF', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                    ENTREPRISE / AGENCE
                  </span>
                  <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.1rem', margin: '8px 0 2px 0', color: '#121212' }}>
                    CREAFIX
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#DC2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={14} /> Lead Product &amp; Web Designer
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#666', background: '#F5F5F5', padding: '6px 12px', border: '1px solid #DDD' }}>
                  2024 - Présent
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#222', marginTop: '16px', lineHeight: '1.6' }}>
                Direction complète du design produit et web au sein de CreaFix. Conception des architectures d'information, création des interfaces interactives et élaboration des design systems pour les produits digitaux et plateformes web.
              </p>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #EEE' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold', color: '#444', marginBottom: '8px' }}>
                  RESPONSABILITÉS &amp; RÉALISATIONS AU SEIN DE L'ENTREPRISE :
                </div>
                <ul style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#555', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Supervision de la direction artistique et alignement avec les équipes de développement frontend/backend.</li>
                  <li>Rédaction des cahiers des charges fonctionnels (PRDs), wireframing et prototypage interactif rapide.</li>
                  <li>Mise en place de composants de design modulaires assurant cohérence et scalabilité.</li>
                </ul>
              </div>
            </div>

            {/* COMPANY 02: TRELLIX */}
            <div style={{ padding: '28px', background: '#FFF', borderLeft: '6px solid #1D4ED8', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: '#1D4ED8', color: '#FFF', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                    ENTREPRISE TECH &amp; SAAS
                  </span>
                  <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.1rem', margin: '8px 0 2px 0', color: '#121212' }}>
                    TRELLIX
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#1D4ED8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={14} /> Product Designer &amp; UX Strategist
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#666', background: '#F5F5F5', padding: '6px 12px', border: '1px solid #DDD' }}>
                  2023 - 2024
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#222', marginTop: '16px', lineHeight: '1.6' }}>
                Product Design au sein de Trellix pour la conception de solutions SaaS B2B complexes, tableaux de bord de gestion et tunnels d'activation sans friction.
              </p>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #EEE' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold', color: '#444', marginBottom: '8px' }}>
                  RESPONSABILITÉS &amp; RÉALISATIONS AU SEIN DE L'ENTREPRISE :
                </div>
                <ul style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#555', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Optimisation des workflows utilisateurs et réduction des taux d'abandon lors des parcours d'onboarding.</li>
                  <li>Création de tableaux de bord de données analytiques et télémétrie complexes avec une UX épurée.</li>
                  <li>Conduite des tests d'usabilité et itérations produit en collaboration avec les Product Managers.</li>
                </ul>
              </div>
            </div>

            {/* COMPANY 03: CACTUCE */}
            <div style={{ padding: '28px', background: '#FFF', borderLeft: '6px solid #059669', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: '#059669', color: '#FFF', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                    ENTREPRISE &amp; STUDIO CREATIF
                  </span>
                  <div style={{ fontFamily: 'var(--font-anton)', fontSize: '2.1rem', margin: '8px 0 2px 0', color: '#121212' }}>
                    CACTUCE
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={14} /> UI/UX Designer &amp; Art Director
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#666', background: '#F5F5F5', padding: '6px 12px', border: '1px solid #DDD' }}>
                  2022 - 2023
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#222', marginTop: '16px', lineHeight: '1.6' }}>
                Élaboration des chartes graphiques, direction artistique web et conception des interfaces digitales pour Cactuce.
              </p>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #EEE' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold', color: '#444', marginBottom: '8px' }}>
                  RESPONSABILITÉS &amp; RÉALISATIONS AU SEIN DE L'ENTREPRISE :
                </div>
                <ul style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#555', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Création de sites vitrines d'exception et interfaces web sur mesure axées sur la conversion.</li>
                  <li>Création et gouvernance de la librairie de composants UI Figma.</li>
                  <li>Accompagnement de l'équipe créative sur les micro-interactions et l'expérience de marque.</li>
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
          <ArrowLeft size={16} /> <span>← RETURN TO ARCHIVE HOME</span>
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
                Prototypage interactif fonctionnel permettant aux clients de tester rapidement leurs concepts et valider leur produit auprès d'utilisateurs réels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ARCHIVAL FOOTER SYSTEM
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
            <a href="https://github.com/shalomtalesman" target="_blank" rel="noopener noreferrer" className="mosby-footer-link">
              <ExternalLink size={14} /> GitHub
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
   MAIN HOMEPAGE
───────────────────────────────────────────── */
export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cv' | 'experiences' | 'services' | CaseStudyId>(() => getViewFromHash());
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [activeExpandedFolderRow, setActiveExpandedFolderRow] = useState<number | null>(0);

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
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <>
      {/* Header with Pure Minimal TALESMAN FILES Typography Logo */}
      <header className="mosby-header">
        <div style={{ width: '60px' }} />
        <div className="mosby-header-logo-container" onClick={() => navigateToHome(setCurrentView)}>
          <span className="mosby-logo-text">TALESMAN</span>
          <span className="mosby-logo-tag">FILES</span>
        </div>
        <div className="mosby-header-nav">
          <span className="mosby-nav-link" onClick={() => setIsAboutModalOpen(true)}>About</span>
          <button className="mosby-lang-toggle" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
            {lang.toUpperCase()}
          </button>
        </div>
      </header>

      {/* About Sheet Modal */}
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
                ? 'Un archive de projets Web Design & Product Design : plateformes SaaS B2B complexes, expériences e-commerce sur mesure et design systems conçus sur +4 ans.'
                : 'An archive of Web Design & Product Design projects: complex B2B SaaS platforms, custom e-commerce experiences, and design systems crafted over 4+ years.'}
            </p>
          </section>

          {/* FILING CABINET WITH ANIMATED DRAWER COLLAPSE & EXPAND */}
          <section className="mosby-filing-cabinet">
            {/* ROW 1: BLUE FOLDER (#1D4ED8) — CATEGORY 01: B2B SAAS PLATFORMS & LOGISTICS */}
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
                  01. B2B SAAS &amp; ENTERPRISE PLATFORMS &lt;
                </div>
              </div>

              <div className={`mosby-folder-expanded ${activeExpandedFolderRow === 0 ? 'is-open' : ''}`} style={{ backgroundColor: '#1D4ED8' }}>
                <div className="mosby-expanded-grid">
                  <div>
                    <p className="mosby-expanded-desc">
                      Product Design &amp; Architecture SaaS B2B : Gouvernance d'actifs industriels multi-sites par QR code (Asset IQ), digitalisation et orchestration logistique nationale du pèlerinage (eHadj), et plateforme SaaS de fidélisation e-commerce avec intégrations POS/Shopify (Beans).
                    </p>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('asset-iq')}>
                        <span>DOSSIER COMPLET: ASSET IQ →</span>
                      </button>
                      <a 
                        href="https://www.assetiQ.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mosby-expanded-open-btn"
                        style={{ background: 'var(--mosby-yellow)', color: '#000' }}
                      >
                        <ExternalLink size={14} /> <span>DEMO LIVE ↗</span>
                      </a>
                    </div>
                  </div>
                  <div className="mosby-expanded-preview-frame">
                    <img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ SaaS B2B" />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: GREEN FOLDER (#059669) — CATEGORY 02: WEB DESIGN & CINEMATIC SHOWCASE (FEATURING TAVARES) */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-red" onClick={() => setCurrentView('tavares')} style={{ background: '#E50914', color: '#FFF', fontWeight: 'bold' }}>
                  ★ Tavares
                </div>
                <div className="mosby-tab mosby-tab-green" onClick={() => setCurrentView('truvox')}>
                  Truvox Studio
                </div>
                <div className="mosby-tab mosby-tab-blue" onClick={() => setCurrentView('dolce-riviera')}>
                  Dolce Riviera
                </div>
                <div className="mosby-tab mosby-tab-purple" onClick={() => setCurrentView('sagana')}>
                  Sagana
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#059669' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 1 ? null : 1)}
              >
                <div className="mosby-folder-category-label">
                  02. WEB DESIGN &amp; CINEMATIC EXPERIENCES (TAVARES &amp; TRUVOX) &lt;
                </div>
              </div>

              <div className={`mosby-folder-expanded ${activeExpandedFolderRow === 1 ? 'is-open' : ''}`} style={{ backgroundColor: '#059669' }}>
                <div className="mosby-expanded-grid">
                  <div>
                    <p className="mosby-expanded-desc">
                      Web Design &amp; Direction Artistique Épurée : Portfolio cinématographique interactif et immersif pour réalisateur (Tavares), vitrine d'agence digitale haut de gamme (Truvox Studio), et e-commerce éditorial de luxe (Dolce Riviera).
                    </p>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('tavares')} style={{ background: '#E50914', color: '#FFF' }}>
                        <span>DOSSIER COMPLET: TAVARES →</span>
                      </button>
                      <a 
                        href="https://portfolio-tavares.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mosby-expanded-open-btn"
                        style={{ background: 'var(--mosby-yellow)', color: '#000' }}
                      >
                        <ExternalLink size={14} /> <span>VISITER TAVARES LIVE ↗</span>
                      </a>
                    </div>
                  </div>
                  <div className="mosby-expanded-preview-frame">
                    <img src="/imgs/tavares.png" alt="Tavares Cinema Web Design" />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: PURPLE FOLDER (#7C3AED) — CATEGORY 03: STRATEGY CONSULTING & INTERACTIVE PRODUCTS (FEATURING STRATEGY ARENA) */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-blue" onClick={() => setCurrentView('strategy-arena')} style={{ background: '#1E3A8A', color: '#FFF', fontWeight: 'bold' }}>
                  ★ Strategy Arena
                </div>
                <div className="mosby-tab mosby-tab-yellow" onClick={() => setCurrentView('vortex')}>
                  Vortex Gallery
                </div>
                <div className="mosby-tab mosby-tab-black" onClick={() => setCurrentView('sport-advisor')}>
                  Sport Advisor
                </div>
                <div className="mosby-tab mosby-tab-green" onClick={() => setCurrentView('the-refuge')}>
                  The Refuge
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#7C3AED' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 2 ? null : 2)}
              >
                <div className="mosby-folder-category-label">
                  03. STRATEGIC CONSULTING &amp; INTERACTIVE PRODUCTS (STRATEGY ARENA) &lt;
                </div>
              </div>

              <div className={`mosby-folder-expanded ${activeExpandedFolderRow === 2 ? 'is-open' : ''}`} style={{ backgroundColor: '#7C3AED' }}>
                <div className="mosby-expanded-grid">
                  <div>
                    <p className="mosby-expanded-desc">
                      Stratégie &amp; Produits Numériques : Cabinet de conseil en stratégie, organisation et transformation digitale pour PME (Strategy Arena), exposition d'art virtuelle Web3 (Vortex Gallery), et application mobile de coaching sportif (Sport Advisor).
                    </p>
                    
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('strategy-arena')} style={{ background: '#1E3A8A', color: '#FFF' }}>
                        <span>DOSSIER COMPLET: STRATEGY ARENA →</span>
                      </button>
                      <a 
                        href="https://talesmanwebcraft.vercel.app/#strategy-arena" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mosby-expanded-open-btn"
                        style={{ background: 'var(--mosby-yellow)', color: '#000' }}
                      >
                        <ExternalLink size={14} /> <span>DEMO LIVE ↗</span>
                      </a>
                    </div>
                  </div>
                  <div className="mosby-expanded-preview-frame">
                    <img src="/imgs/strategy_cover.png" alt="Strategy Arena Consulting" />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 4: RED FOLDER (#DC2626) — CATEGORY 04: DESIGNER PROFILE & CAREER LOGS */}
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
                  04. PERSONNEL FILE &amp; CAREER LOGS <ChevronDown size={14} style={{ marginLeft: '4px' }} />
                </div>
              </div>

              <div className={`mosby-folder-expanded ${activeExpandedFolderRow === 3 ? 'is-open' : ''}`} style={{ backgroundColor: '#DC2626' }}>
                <div className="mosby-expanded-grid">
                  <div>
                    <p className="mosby-expanded-desc">
                      Dossier Personnel de Sacca Dafia (Web Designer &amp; Product Designer, +4 ans d'exp). Consultez le profil complet, le registre chronologique des missions et les spécifications d'offres.
                    </p>
                    <button className="mosby-expanded-open-btn" onClick={() => setIsAboutModalOpen(true)}>
                      <span>OUVRIR LE DOSSIER PERSONNEL →</span>
                    </button>
                  </div>
                  <div className="mosby-expanded-preview-frame">
                    <img src="/imgs/vibe_coding_setup.jpg" alt="Sacca Dafia Prototyping Workspace" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Archival Footer System */}
          <MosbyFooter setCurrentView={setCurrentView} setIsAboutModalOpen={setIsAboutModalOpen} lang={lang} />
        </main>
      )}
    </>
  );
}
