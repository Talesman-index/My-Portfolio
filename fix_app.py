import re

app_content = r'''import { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Calendar,
  Linkedin,
  Mail,
  Download,
  Layers,
  Code,
  Target,
  Award,
  Compass,
  LayoutDashboard,
  FileText,
  Folder,
  FolderOpen,
  CheckCircle2,
  Clock
} from 'lucide-react';
import './App.css';
import { caseStudiesData, CaseStudyId } from './caseStudiesData';

/* ─────────────────────────────────────────────
   MOSBY'S FILES ARCHIVAL HELPER COMPONENTS
───────────────────────────────────────────── */
const DossierBarcode = () => (
  <svg viewBox="0 0 160 30" width="160" height="30" fill="currentColor" opacity="0.75" className="dossier-barcode-svg">
    <rect x="0" y="0" width="4" height="30" />
    <rect x="6" y="0" width="2" height="30" />
    <rect x="10" y="0" width="6" height="30" />
    <rect x="18" y="0" width="2" height="30" />
    <rect x="22" y="0" width="8" height="30" />
    <rect x="32" y="0" width="4" height="30" />
    <rect x="38" y="0" width="2" height="30" />
    <rect x="42" y="0" width="10" height="30" />
    <rect x="54" y="0" width="4" height="30" />
    <rect x="60" y="0" width="2" height="30" />
    <rect x="64" y="0" width="6" height="30" />
    <rect x="72" y="0" width="8" height="30" />
    <rect x="82" y="0" width="2" height="30" />
    <rect x="86" y="0" width="6" height="30" />
    <rect x="94" y="0" width="4" height="30" />
    <rect x="100" y="0" width="2" height="30" />
    <rect x="104" y="0" width="8" height="30" />
    <rect x="114" y="0" width="4" height="30" />
    <rect x="120" y="0" width="6" height="30" />
    <rect x="128" y="0" width="2" height="30" />
    <rect x="132" y="0" width="10" height="30" />
    <rect x="144" y="0" width="4" height="30" />
    <rect x="150" y="0" width="2" height="30" />
    <rect x="154" y="0" width="6" height="30" />
  </svg>
);

/* Helper to map hash route to currentView state */
const VALID_PROJECT_IDS: CaseStudyId[] = ['asset-iq', 'ehadj', 'beans', 'sagana', 'vortex', 'sport-advisor', 'truvox', 'tavares', 'the-refuge', 'strategy-arena', 'dolce-riviera'];

function getViewFromHash(): 'home' | 'projects' | 'cv' | CaseStudyId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  if (hash === 'cv') return 'cv';
  if (hash === 'projects') return 'projects';
  if (VALID_PROJECT_IDS.includes(hash as CaseStudyId)) return hash as CaseStudyId;
  return 'home';
}

/* ─────────────────────────────────────────────
   PROJECT ACCENT MAPPING
───────────────────────────────────────────── */
const PROJECT_ACCENTS: Record<string, { num: string; color: string; categoryTag: string }> = {
  'asset-iq': { num: 'FILE 001', color: '#EF4444', categoryTag: 'SAAS & B2B' },
  'ehadj': { num: 'FILE 002', color: '#2563EB', categoryTag: 'LOGISTICS' },
  'beans': { num: 'FILE 003', color: '#F59E0B', categoryTag: 'SAAS & B2B' },
  'sagana': { num: 'FILE 004', color: '#10B981', categoryTag: 'BRANDING' },
  'vortex': { num: 'FILE 005', color: '#8B5CF6', categoryTag: 'BRANDING' },
  'sport-advisor': { num: 'FILE 006', color: '#EC4899', categoryTag: 'MOBILE APP' },
  'truvox': { num: 'FILE 007', color: '#06B6D4', categoryTag: 'BRANDING' },
  'dolce-riviera': { num: 'FILE 008', color: '#F97316', categoryTag: 'E-COMMERCE' },
  'strategy-arena': { num: 'FILE 009', color: '#D97706', categoryTag: 'BRANDING' },
  'the-refuge': { num: 'FILE 010', color: '#059669', categoryTag: 'LOGISTICS' }
};

/* ─────────────────────────────────────────────
   CASE STUDY DOSSIER VIEW
───────────────────────────────────────────── */
const CaseStudy = ({ 
  id, 
  setCurrentView,
  onBack,
  lang
}: { 
  id: CaseStudyId, 
  setCurrentView: any,
  onBack?: () => void,
  lang: 'en' | 'fr'
}) => {
  const data = caseStudiesData[lang][id] || caseStudiesData['fr']['asset-iq'];
  const meta = PROJECT_ACCENTS[id] || { num: 'FILE 000', color: '#EF4444', categoryTag: 'DOSSIER' };

  // Calculate prev and next project IDs
  const allIds = Object.keys(PROJECT_ACCENTS) as CaseStudyId[];
  const currentIndex = allIds.indexOf(id);
  const prevId = allIds[(currentIndex - 1 + allIds.length) % allIds.length];
  const nextId = allIds[(currentIndex + 1) % allIds.length];

  return (
    <div className="dossier-view-container container">
      {/* Top Back & Stamps Bar */}
      <div className="dossier-back-bar">
        <button onClick={onBack || (() => setCurrentView('home'))} className="back-to-archive-btn">
          <ArrowLeft size={16} />
          <span>{lang === 'fr' ? '← RETOUR À L\'ARCHIVE' : '← BACK TO ARCHIVE'}</span>
        </button>
        <div className="dossier-file-stamps">
          <span className="stamp-badge stamp-red">CONFIDENTIAL</span>
          <span className="stamp-badge stamp-blue">STATUS: VERIFIED</span>
        </div>
      </div>

      {/* Dossier Cover Header Box */}
      <div className="dossier-cover-card" style={{ '--dossier-accent': meta.color } as any}>
        <div className="dossier-cover-top">
          <div>
            <span className="dossier-file-id-badge">{meta.num}</span>
            <span className="mono-label" style={{ marginLeft: '12px' }}>CATEGORY: {meta.categoryTag}</span>
          </div>
          <DossierBarcode />
        </div>

        <h1 className="dossier-title-main">{data.title}</h1>
        <p className="dossier-subtitle-serif">{data.subtitle}</p>

        <div className="dossier-meta-table">
          <div className="dossier-meta-cell">
            <span className="meta-cell-label">{lang === 'fr' ? 'RÔLE' : 'ROLE'}</span>
            <span className="meta-cell-value">{data.label}</span>
          </div>
          <div className="dossier-meta-cell">
            <span className="meta-cell-label">YEAR</span>
            <span className="meta-cell-value">2024 - 2026</span>
          </div>
          <div className="dossier-meta-cell">
            <span className="meta-cell-label">FILE REGISTRATION</span>
            <span className="meta-cell-value">REF: SD-{id.toUpperCase()}</span>
          </div>
          {data.externalLink && data.externalLink !== '#' && (
            <div className="dossier-meta-cell">
              <span className="meta-cell-label">LIVE DEPLOYMENT</span>
              <a href={data.externalLink} target="_blank" rel="noopener noreferrer" className="meta-cell-value" style={{ color: meta.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>VISIT PROOF</span> <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Structured Visual Storytelling: BRIEF -> DISCOVERY -> RESEARCH -> PROCESS -> DESIGN SYSTEM -> FINAL PRODUCT -> OUTCOME */}
      
      {/* 01. THE BRIEF */}
      <div className="dossier-story-section" style={{ '--dossier-accent': meta.color } as any}>
        <div className="dossier-section-tag">
          <FileText size={16} />
          <span>01. THE BRIEF & CONTEXT</span>
        </div>
        <h2 className="dossier-section-heading">{data.contextTitle || (lang === 'fr' ? 'Le Défi Métier' : 'The Business Challenge')}</h2>
        <p className="dossier-narrative-serif">{data.context}</p>

        {/* Sticky Note Annotation */}
        <div className="sticky-note sticky-note-yellow" style={{ maxWidth: '500px', margin: '20px 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4px' }}>KEY INSIGHT TAKEOUT</div>
          "{data.insight}"
        </div>
      </div>

      {/* 02. DISCOVERY & PROBLEM */}
      <div className="dossier-story-section" style={{ '--dossier-accent': meta.color } as any}>
        <div className="dossier-section-tag">
          <Target size={16} />
          <span>02. DISCOVERY & PROBLEM ANALYSIS</span>
        </div>
        <h2 className="dossier-section-heading">{data.problemTitle || (lang === 'fr' ? 'Problématique Majeure' : 'Core Operational Bottleneck')}</h2>
        <p className="dossier-narrative-serif">{data.problem || data.challenge}</p>

        {data.contextImg && (
          <div className="archival-artifact-card" style={{ marginTop: '20px' }}>
            <img src={data.contextImg} alt="Discovery Artifact" />
            <div className="artifact-caption">
              <span>DISCOVERY ARTIFACT — FIELD RESEARCH / SYSTEM DIAGRAM</span>
              <span className="stamp-badge stamp-amber">LOG 02-B</span>
            </div>
          </div>
        )}
      </div>

      {/* 03. RESEARCH & DECISIONS */}
      {data.decisions && data.decisions.length > 0 && (
        <div className="dossier-story-section" style={{ '--dossier-accent': meta.color } as any}>
          <div className="dossier-section-tag">
            <Compass size={16} />
            <span>03. RESEARCH & ARCHITECTURAL DECISIONS</span>
          </div>
          <h2 className="dossier-section-heading">{lang === 'fr' ? 'Décisions Design Clés' : 'Key Architectural Decisions'}</h2>
          
          <div className="dossier-features-grid">
            {data.decisions.map((dec, idx) => (
              <div key={idx} className="dossier-feature-card">
                <h3 className="feature-title">{dec.title}</h3>
                <p className="feature-desc"><strong>What:</strong> {dec.desc}</p>
                <p className="feature-desc" style={{ marginTop: '8px', color: meta.color }}><strong>Why:</strong> {dec.why}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 04. PROCESS & EXPERIMENTS */}
      <div className="dossier-story-section" style={{ '--dossier-accent': meta.color } as any}>
        <div className="dossier-section-tag">
          <Layers size={16} />
          <span>04. PROCESS & INTERACTION DESIGN</span>
        </div>
        <h2 className="dossier-section-heading">{data.solutionTitle || (lang === 'fr' ? 'Spécifications & Flow UX' : 'UX & Process Architecture')}</h2>
        <p className="dossier-narrative-serif">{data.uxSolutions || data.solution}</p>

        {data.challengeImg && (
          <div className="archival-artifact-card" style={{ marginTop: '20px' }}>
            <img src={data.challengeImg} alt="Process Wireframes" />
            <div className="artifact-caption">
              <span>TACTILE WORKFLOW & INTERACTION SCHEMATIC</span>
              <span className="stamp-badge stamp-blue">SCHEMATIC v2</span>
            </div>
          </div>
        )}
      </div>

      {/* 05. DESIGN SYSTEM & FEATURES */}
      <div className="dossier-story-section" style={{ '--dossier-accent': meta.color } as any}>
        <div className="dossier-section-tag">
          <Code size={16} />
          <span>05. DESIGN SYSTEM & SYSTEMIC CAPABILITIES</span>
        </div>
        <h2 className="dossier-section-heading">{lang === 'fr' ? 'Fonctionnalités Clés & Composants' : 'Core Modular Features'}</h2>

        <div className="dossier-features-grid">
          {data.features.map((feat, idx) => (
            <div key={idx} className="dossier-feature-card">
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 06. FINAL PRODUCT SCREEN SHOWCASE */}
      {data.interfaceImg && (
        <div className="dossier-story-section" style={{ '--dossier-accent': meta.color } as any}>
          <div className="dossier-section-tag">
            <LayoutDashboard size={16} />
            <span>06. FINAL PRODUCT SHOWCASE</span>
          </div>
          <h2 className="dossier-section-heading">{lang === 'fr' ? 'Interface Produit Polie' : 'Polished Product Interface'}</h2>

          <div className="archival-artifact-card" style={{ padding: '24px', background: '#000' }}>
            <img src={data.interfaceImg} alt="Final Product Showcase" style={{ border: '1px solid rgba(255,255,255,0.2)' }} />
            <div className="artifact-caption" style={{ marginTop: '16px' }}>
              <span>HIGH RESOLUTION FINAL PRODUCTION SCREENSHOT</span>
              <span className="stamp-badge stamp-green">VERIFIED PRODUCTION</span>
            </div>
          </div>
        </div>
      )}

      {/* 07. OUTCOME & IMPACT */}
      <div className="dossier-story-section" style={{ '--dossier-accent': meta.color } as any}>
        <div className="dossier-section-tag">
          <Award size={16} />
          <span>07. OUTCOME & MEASURABLE IMPACT</span>
        </div>
        <h2 className="dossier-section-heading">{lang === 'fr' ? 'Impact & Résultats Métriques' : 'Impact & Measurable Metrics'}</h2>
        <p className="dossier-narrative-serif">{data.conclusion}</p>

        <div className="dossier-impact-list">
          {data.impact.map((imp, idx) => (
            <div key={idx} className="dossier-impact-item">
              <CheckCircle2 size={18} />
              <span>{imp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study File Box Pagination Nav */}
      <div className="dossier-pagination-bar">
        <button onClick={() => setCurrentView(prevId)} className="dossier-nav-btn">
          <ArrowLeft size={16} />
          <span>PREVIOUS FILE ({prevId.toUpperCase()})</span>
        </button>
        <button onClick={() => setCurrentView(nextId)} className="dossier-nav-btn">
          <span>NEXT FILE ({nextId.toUpperCase()})</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PERSONNEL DOSSIER (CV VIEW)
───────────────────────────────────────────── */
const CVView = ({ setCurrentView }: { setCurrentView: any }) => {
  return (
    <div className="personnel-dossier-page container">
      {/* Back button */}
      <div style={{ marginBottom: '30px' }}>
        <button onClick={() => setCurrentView('home')} className="back-to-archive-btn">
          <ArrowLeft size={16} />
          <span>← RETOUR À L'ARCHIVE</span>
        </button>
      </div>

      {/* Header Box */}
      <div className="personnel-header-box">
        <div className="personnel-photo-wrapper">
          <img src="/imgs/hero_image.png" alt="Sacca Dafia Personnel Portrait" />
        </div>
        <div className="personnel-bio-content">
          <div className="stamp-badge stamp-red" style={{ width: 'fit-content', marginBottom: '12px' }}>
            DOSSIER FILE: PERSONNEL 001
          </div>
          <h1 className="personnel-name">SACCA DAFIA</h1>
          <p className="personnel-role-title">DIGITAL PRODUCT & SOLUTION DESIGNER (+4 YRS EXP)</p>
          <p className="personnel-summary-serif">
            "Spécialisé dans la conception de solutions digitales sur mesure, de plateformes SaaS B2B complexes, et d'expériences web haute performance."
          </p>

          <div className="personnel-actions">
            <a 
              href="https://drive.google.com/file/d/14q3ARxXM3rk82VKS6dKYmyGJCk9UWruu/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="download-cv-btn"
            >
              <Download size={16} />
              <span>TÉLÉCHARGER CV OFFICIAL (PDF)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Experience Timeline Field Logs */}
      <div className="dossier-story-section">
        <div className="dossier-section-tag">
          <Clock size={16} />
          <span>CHRONOLOGICAL EXPERIENCES LOG</span>
        </div>
        <h2 className="dossier-section-heading">PARCOURS PROFESSIONNEL</h2>

        <div className="timeline-log-container">
          <div className="timeline-log-item">
            <div className="log-item-header">
              <div>
                <h3 className="log-role-name">Chef de Projet Intégrations & Lead Designer</h3>
                <span className="log-company-name">BEANS — SAAS B2B CUSTOMER ENGAGEMENT</span>
              </div>
              <span className="log-date-badge">2024 - 2025</span>
            </div>
            <p className="feature-desc">
              Rédaction des PRD, élaboration des spécifications d'intégration Shopify & POS, conception des parcours UX sans friction, supervision des équipes d'ingénierie et QA testing.
            </p>
          </div>

          <div className="timeline-log-item">
            <div className="log-item-header">
              <div>
                <h3 className="log-role-name">Lead Product Designer</h3>
                <span className="log-company-name">eHadj — SAAS ORCHESTRATION LOGISTIQUE</span>
              </div>
              <span className="log-date-badge">2025 - 2026</span>
            </div>
            <p className="feature-desc">
              Digitalisation complète du workflow de pèlerinage au Bénin. Unification multi-acteurs (Ministère de la Santé, Banques, Affaires Étrangères, AGLO).
            </p>
          </div>

          <div className="timeline-log-item">
            <div className="log-item-header">
              <div>
                <h3 className="log-role-name">Product & UX Strategist</h3>
                <span className="log-company-name">ASSET IQ — GOUVERNANCE D'ACTIFS MULTI-SITES</span>
              </div>
              <span className="log-date-badge">2025 - 2026</span>
            </div>
            <p className="feature-desc">
              Plateforme SaaS B2B de traçabilité d'équipements industriels par QR Code et télémétrie en temps réel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROJECTS FULL CATALOG VIEW
───────────────────────────────────────────── */
const ProjectsView = ({ projects, setCurrentView }: any) => {
  return (
    <div className="dossier-view-container container">
      <div style={{ marginBottom: '30px' }}>
        <button onClick={() => setCurrentView('home')} className="back-to-archive-btn">
          <ArrowLeft size={16} />
          <span>← RETOUR À L'ARCHIVE HOTE</span>
        </button>
      </div>

      <h1 className="dossier-title-main" style={{ marginBottom: '40px' }}>
        ALL DOSSIERS CATALOG ({projects.length})
      </h1>

      <div className="filing-cabinet-stack">
        {projects.map((item: any, idx: number) => {
          const meta = PROJECT_ACCENTS[item.id] || { num: `FILE 00${idx + 1}`, color: '#EF4444', categoryTag: 'PROJECT' };
          return (
            <div key={item.id} className="folder-file-item" style={{ '--folder-accent': meta.color } as any}>
              <div className="folder-tab-bar" onClick={() => setCurrentView(item.id)}>
                <div className="folder-tab-left">
                  <span className="folder-file-num">{meta.num}</span>
                  <h3 className="folder-project-title">{item.title}</h3>
                  <span className="folder-category-badge">{item.category}</span>
                </div>
                <div className="folder-tab-right">
                  <span className="folder-year-label">{item.role}</span>
                  <button className="open-dossier-btn" style={{ padding: '6px 16px', fontSize: '0.75rem' }}>
                    OPEN FILE →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN APPLICATION COMPONENT
───────────────────────────────────────────── */
export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'projects' | CaseStudyId | 'cv'>(() => getViewFromHash());
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>('asset-iq');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync hash routing
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

  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
    }
  };

  // Full Archive Files List
  const archiveFilesList = [
    {
      id: 'asset-iq',
      num: 'FILE 001',
      title: 'Asset IQ',
      category: 'SAAS & B2B',
      year: '2026',
      role: lang === 'en' ? 'Product & UX Strategist' : 'Stratégiste Produit & UX',
      color: '#EF4444',
      summary: lang === 'en' 
        ? 'Intelligent multi-site physical resource tracking and operational governance platform.' 
        : 'Système intelligent de suivi et gouvernance opérationnelle des ressources physiques multi-sites.',
      insightNote: '3 actions maximum pour garantir la saisie terrain par les opérateurs.',
      tags: ['Product Strategy', 'UX/UI Design', 'B2B SaaS', 'Telemetry'],
      image: '/imgs/assetiQ/cover_Asset.jpg'
    },
    {
      id: 'ehadj',
      num: 'FILE 002',
      title: 'eHadj',
      category: 'LOGISTICS',
      year: '2026',
      role: lang === 'en' ? 'Lead Product Designer' : 'Lead Product Designer',
      color: '#2563EB',
      summary: lang === 'en'
        ? 'Digitalization and process orchestration for national pilgrimage logistics.'
        : 'Digitalisation et orchestration logistique globale du pèlerinage au Bénin.',
      insightNote: "ID-First onboarding pour éliminer 100% des doublons d'identité.",
      tags: ['Process Orchestration', 'Multi-Tenant UX', 'GovTech'],
      image: '/imgs/ehadj/cover_Ehadj.jpg'
    },
    {
      id: 'beans',
      num: 'FILE 003',
      title: 'Beans',
      category: 'SAAS & B2B',
      year: '2024 - 2025',
      role: lang === 'en' ? 'Integration Lead & Product Designer' : 'Chef de Projet Intégrations & Lead Designer',
      color: '#F59E0B',
      summary: lang === 'en'
        ? 'Customer loyalty B2B SaaS platform and Shopify/Klaviyo/POS integration hub.'
        : "Plateforme SaaS B2B de fidélisation client et pôle d'intégrations e-commerce.",
      insightNote: "Tunnels d'activation sans friction conçus pour 2 clics.",
      tags: ['Shopify Apps', 'PRD Specs', 'Integration UX', 'Feature Images'],
      image: '/imgs/beans_cover.png'
    },
    {
      id: 'sagana',
      num: 'FILE 004',
      title: 'Sagana',
      category: 'BRANDING',
      year: '2025',
      role: lang === 'en' ? 'Web Designer & Developer' : 'Web Designer & Développeur',
      color: '#10B981',
      summary: lang === 'en'
        ? 'Digital agency showcase platform and modular design system.'
        : 'Plateforme web et design system modulable pour agence digitale.',
      insightNote: 'Performance et hiérarchie typographique haut de gamme.',
      tags: ['Design System', 'React', 'Framer Motion', 'Web Design'],
      image: '/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png'
    },
    {
      id: 'vortex',
      num: 'FILE 005',
      title: 'Vortex Gallery',
      category: 'BRANDING',
      year: '2024',
      role: lang === 'en' ? 'Lead Designer' : 'Lead Designer',
      color: '#8B5CF6',
      summary: lang === 'en'
        ? 'Interactive Web3 digital art gallery and immersive exhibition showcase.'
        : "Galerie d'art numérique interactive et expérience immersive Web3.",
      insightNote: 'Direction artistique expérimentale et transitions fluides.',
      tags: ['Web3', 'Immersive UX', 'Digital Art', 'Art Direction'],
      image: '/imgs/vortex_cover.png'
    },
    {
      id: 'sport-advisor',
      num: 'FILE 006',
      title: 'Sport Advisor',
      category: 'MOBILE APP',
      year: '2024',
      role: lang === 'en' ? 'UX/UI Designer' : 'UX/UI Designer',
      color: '#EC4899',
      summary: lang === 'en'
        ? 'Personalized athletic recommendation mobile app and coaching platform.'
        : 'Application mobile de recommandation et coaching sportif personnalisé.',
      insightNote: "Parcours de recommandation fondé sur des algorithmes d'habitudes.",
      tags: ['Mobile UX', 'iOS/Android', 'Coaching', 'Prototyping'],
      image: '/imgs/sport_advisor_cover.png'
    },
    {
      id: 'truvox',
      num: 'FILE 007',
      title: 'Truvox Studio',
      category: 'BRANDING',
      year: '2025',
      role: lang === 'en' ? 'Product & Web Designer' : 'Product & Web Designer',
      color: '#06B6D4',
      summary: lang === 'en'
        ? 'Digital product studio brand experience and high-conversion web presence.'
        : "Studio d'expériences numériques apportant clarté et croissance.",
      insightNote: 'Design minimaliste axé sur la valeur ajoutée entreprise.',
      tags: ['Brand Identity', 'Web Experience', 'Art Direction'],
      image: '/imgs/truvox_cover.png'
    },
    {
      id: 'dolce-riviera',
      num: 'FILE 008',
      title: 'Dolce Riviera',
      category: 'E-COMMERCE',
      year: '2025',
      role: lang === 'en' ? 'Product Designer (UX/UI)' : 'Product Designer (UX/UI)',
      color: '#F97316',
      summary: lang === 'en'
        ? 'High-end luxury brand experience and immersive e-commerce concept.'
        : "Expérience de marque haut de gamme et boutique e-commerce immersive.",
      insightNote: "Valorisation de l'exclusivité de marque par l'éditorial.",
      tags: ['Luxury E-Commerce', 'Editorial UI', 'Art Direction'],
      image: '/imgs/dolce_cover.png'
    }
  ];

  const filteredFiles = activeFilter === 'ALL' 
    ? archiveFilesList 
    : archiveFilesList.filter(f => f.category === activeFilter);

  return (
    <>
      {/* Suspended Archive Header Bar */}
      <header className="archive-header">
        <div className="archive-nav-bar">
          <div className="header-brand" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
            <div className="archive-seal-badge">SD</div>
            <div className="brand-title-group">
              <span className="brand-name">SACCA DAFIA</span>
              <span className="brand-subtitle">[ DOSSIER ARCHIVE v4.2 ]</span>
            </div>
          </div>

          <div className="header-nav-links">
            <button 
              className={`nav-dossier-tab ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              <Folder size={14} />
              <span>01. DOSSIER ARCHIVE</span>
            </button>
            <button 
              className={`nav-dossier-tab ${currentView === 'cv' ? 'active' : ''}`}
              onClick={() => setCurrentView('cv')}
            >
              <FileText size={14} />
              <span>02. PERSONNEL FILE (CV)</span>
            </button>
          </div>

          <div className="header-actions">
            <button className="lang-switch-btn" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
              <span className={lang === 'en' ? 'active-lang' : ''}>EN</span> / <span className={lang === 'fr' ? 'active-lang' : ''}>FR</span>
            </button>
            <button onClick={openCalendly} className="book-dossier-btn">
              <Calendar size={14} />
              <span>INITIATE DISPATCH</span>
            </button>
          </div>
        </div>
      </header>

      {/* Render Specific Active Views */}
      {currentView === 'cv' && <CVView setCurrentView={setCurrentView} />}
      {currentView === 'projects' && (
        <ProjectsView 
          projects={archiveFilesList} 
          setCurrentView={setCurrentView} 
          t={{}} 
          lang={lang} 
        />
      )}
      {currentView !== 'home' && currentView !== 'cv' && currentView !== 'projects' && (
        <CaseStudy 
          id={currentView as CaseStudyId} 
          setCurrentView={setCurrentView} 
          onBack={() => setCurrentView('home')} 
          lang={lang}
        />
      )}

      {/* Main Archive Homepage View */}
      {currentView === 'home' && (
        <main id="main-content">
          {/* Hero Section — Archival Minimalist Impact */}
          <section className="archive-hero container">
            <div className="hero-meta-topbar">
              <div className="meta-status-pill">
                <span className="status-dot-pulse" />
                <span>SYSTEM STATUS: ONLINE</span>
              </div>
              <div>LOCATION: COTONOU, BENIN / REMOTE</div>
              <div>SYSTEM TIME: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
              <div>TOTAL ARCHIVED FILES: 08</div>
            </div>

            <h1 className="hero-giant-heading">
              SACCA DAFIA <br />
              <span className="accent-outline">DESIGN</span> <span className="accent-color">DOSSIER</span>
            </h1>

            <div className="hero-intro-grid">
              <p className="hero-serif-desc">
                {lang === 'fr'
                  ? "Designer de Solutions & Produits Numériques spécialisé dans la création de logiciels sur mesure, plateformes SaaS B2B et systèmes d'information complexes."
                  : 'Digital Solution & Product Designer specialized in crafting custom web software, B2B SaaS platforms, and complex digital ecosystems.'}
              </p>

              <div className="hero-stats-row">
                <div className="hero-stat-card">
                  <div className="stat-number">+04</div>
                  <div className="stat-label">{lang === 'fr' ? "Ans d'Expérience" : 'Years Experience'}</div>
                </div>
                <div className="hero-stat-card">
                  <div className="stat-number">+10</div>
                  <div className="stat-label">{lang === 'fr' ? 'SaaS & Projets Livrés' : 'Dossiers Delivered'}</div>
                </div>
                <div className="hero-stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">{lang === 'fr' ? 'Gouvernance UX' : 'Systemic Rigor'}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Filing Cabinet Section (Mosby's Files Inspiration) */}
          <section className="archive-filing-section container">
            <div className="filing-section-header">
              <div className="filing-section-title">
                <FolderOpen size={36} color="var(--accent-red)" />
                <h2 className="filing-title-text">DESIGN FILES CABINET</h2>
              </div>

              <div className="archive-filter-bar">
                {['ALL', 'SAAS & B2B', 'LOGISTICS', 'BRANDING', 'MOBILE APP', 'E-COMMERCE'].map(cat => (
                  <button 
                    key={cat} 
                    className={`archive-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    [ {cat} ]
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Stacked Folder Files */}
            <div className="filing-cabinet-stack">
              {filteredFiles.map((file) => {
                const isExpanded = expandedFolderId === file.id;
                return (
                  <div 
                    key={file.id} 
                    className={`folder-file-item ${isExpanded ? 'is-expanded' : ''}`}
                    style={{ '--folder-accent': file.color } as any}
                  >
                    {/* Top Folder Tab Header */}
                    <div 
                      className="folder-tab-bar"
                      onClick={() => setExpandedFolderId(isExpanded ? null : file.id)}
                    >
                      <div className="folder-tab-left">
                        <span className="folder-file-num">{file.num}</span>
                        <h3 className="folder-project-title">{file.title}</h3>
                        <span className="folder-category-badge">{file.category}</span>
                      </div>

                      <div className="folder-tab-right">
                        <span className="folder-year-label">{file.year} • {file.role}</span>
                        <div className="folder-expand-trigger">
                          <span>↓</span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Folder Preview Body */}
                    {isExpanded && (
                      <div className="folder-expanded-content">
                        <div className="folder-detail-left">
                          <h4 className="folder-subtitle">{file.title} — Case Study Brief</h4>
                          <p className="folder-editorial-summary">"{file.summary}"</p>

                          <div className="sticky-note sticky-note-yellow" style={{ marginTop: '12px' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '2px' }}>FIELD OBSERVATION</div>
                            "{file.insightNote}"
                          </div>

                          <div className="folder-meta-tags-list">
                            {file.tags.map(t => (
                              <span key={t} className="folder-tag-pill">#{t}</span>
                            ))}
                          </div>

                          <div className="folder-action-row">
                            <button 
                              className="open-dossier-btn"
                              onClick={() => setCurrentView(file.id as CaseStudyId)}
                            >
                              <span>OPEN DOSSIER ({file.num})</span>
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="folder-preview-image-box">
                          <img src={file.image} alt={`${file.title} Dossier Preview`} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Contact Dispatch Terminal */}
          <section className="contact-terminal-section container">
            <div className="terminal-card">
              <div className="terminal-grid">
                <div>
                  <div className="stamp-badge stamp-red" style={{ marginBottom: '16px' }}>DISPATCH TERMINAL</div>
                  <h2 className="terminal-title">INITIATE A NEW DESIGN DOSSIER.</h2>
                  <p className="terminal-desc-serif">
                    {lang === 'fr'
                      ? 'Vous avez un projet SaaS B2B, une application web complexe ou un produit numérique à concevoir ? Transmettez vos exigences.'
                      : 'Looking to build a complex B2B SaaS, custom web software, or digital product? Initiate a dossier request.'}
                  </p>
                </div>

                <div className="terminal-contact-links">
                  <a href="mailto:dafiashalom@gmail.com" className="terminal-link-item">
                    <Mail size={18} />
                    <span>EMAIL: dafiashalom@gmail.com</span>
                  </a>
                  <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer" className="terminal-link-item">
                    <Linkedin size={18} />
                    <span>LINKEDIN: linkedin.com/in/dafia-s</span>
                  </a>
                  <button onClick={openCalendly} className="terminal-link-item" style={{ background: 'var(--accent-red)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    <Calendar size={18} />
                    <span>SCHEDULE 30-MIN DISPATCH CALL ↗</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Archival Footer */}
          <footer className="archive-footer container">
            <div>© 2026 SACCA DAFIA — DESIGN DOSSIER & ARCHIVE SYSTEM. ALL RIGHTS RESERVED.</div>
            <div>STATUS: CONFIDENTIAL / AUTHORIZED PERSONNEL ONLY</div>
          </footer>
        </main>
      )}
    </>
  );
}
'''

with open('src/App.tsx', 'w') as f:
    f.write(app_content)

print("Cleaned App.tsx successfully.")
