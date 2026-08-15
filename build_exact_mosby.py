import re

app_content = r'''import { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ArrowLeft,
  Download,
  CheckCircle2,
  ChevronDown
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

function getViewFromHash(): 'home' | 'cv' | CaseStudyId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  if (hash === 'cv') return 'cv';
  if (VALID_PROJECT_IDS.includes(hash as CaseStudyId)) return hash as CaseStudyId;
  return 'home';
}

const PROJECT_CONFIGS: Record<string, { title: string; color: string; tabColorClass: string; categoryLabel: string; year: string }> = {
  'asset-iq': { title: 'Asset IQ', color: '#1D4ED8', tabColorClass: 'mosby-tab-blue', categoryLabel: 'B2B SaaS & Resource Telemetry', year: '2026' },
  'ehadj': { title: 'eHadj', color: '#DC2626', tabColorClass: 'mosby-tab-red', categoryLabel: 'Logistics & Process Orchestration', year: '2026' },
  'beans': { title: 'Beans', color: '#059669', tabColorClass: 'mosby-tab-green', categoryLabel: 'Customer Engagement & Integrations', year: '2025' },
  'sagana': { title: 'Sagana', color: '#7C3AED', tabColorClass: 'mosby-tab-purple', categoryLabel: 'Modular Design Systems', year: '2025' },
  'vortex': { title: 'Vortex Gallery', color: '#EAB308', tabColorClass: 'mosby-tab-yellow', categoryLabel: 'Immersive Web3 Exhibition', year: '2024' },
  'sport-advisor': { title: 'Sport Advisor', color: '#000000', tabColorClass: 'mosby-tab-black', categoryLabel: 'Mobile App & Athletic Engine', year: '2024' },
  'truvox': { title: 'Truvox Studio', color: '#DC2626', tabColorClass: 'mosby-tab-red', categoryLabel: 'Digital Studio Web Experience', year: '2025' },
  'dolce-riviera': { title: 'Dolce Riviera', color: '#1D4ED8', tabColorClass: 'mosby-tab-blue', categoryLabel: 'Luxury E-Commerce & Editorial UI', year: '2025' }
};

/* ─────────────────────────────────────────────
   CASE STUDY DOSSIER VIEW (DIRECT MOSBY'S FILES SCREENSHOT 2 REPRODUCTION)
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
  const config = PROJECT_CONFIGS[id] || { title: data.title, color: '#1D4ED8', tabColorClass: 'mosby-tab-blue', categoryLabel: 'Design Dossier', year: '2026' };

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
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '8px', color: '#666' }}>
                  FILE REGISTRATION: SD-{id.toUpperCase()} <br />
                  YEAR: {config.year} • {data.label}
                </div>
              </div>

              <div>
                <p className="mosby-dropcap-text">
                  {data.context}
                </p>
                <p className="mosby-dropcap-text" style={{ marginTop: '16px' }}>
                  {data.challenge}
                </p>
              </div>
            </div>

            {/* Overlapping Physical Artifacts (Pink, Yellow, Blue Cards with Paperclips) */}
            <div className="mosby-artifacts-container">
              {/* Pink Index Card */}
              <div className="mosby-artifact-card mosby-card-pink">
                <PaperclipSVG style={{ top: '-14px', left: '16px' }} />
                <div className="mosby-artifact-title">01. DISCOVERY & INSIGHT</div>
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

            {/* Key Outcomes List */}
            <div style={{ marginTop: '50px', borderTop: '1px solid #DDD', paddingTop: '30px' }}>
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
   PERSONNEL FILE (CV VIEW)
───────────────────────────────────────────── */
const CVView = ({ setCurrentView }: { setCurrentView: any }) => {
  return (
    <div className="mosby-dossier-view" style={{ paddingTop: '40px' }}>
      <div className="container">
        <button onClick={() => setCurrentView('home')} style={{ color: '#999', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> <span>RETURN TO ARCHIVE HOME</span>
        </button>

        <h1 className="mosby-dossier-giant-title" style={{ padding: '0 0 20px 0' }}>PERSONNEL FILE: SACCA DAFIA</h1>

        <div className="mosby-paper-sheet" style={{ maxWidth: '1000px' }}>
          <BinderHoles />

          <div className="mosby-paper-grid">
            <div className="mosby-portrait-pin-box">
              <PaperclipSVG style={{ top: '-14px', right: '16px' }} />
              <img src="/imgs/hero_image.png" alt="Sacca Dafia" className="mosby-portrait-img" />
              <a 
                href="https://drive.google.com/file/d/14q3ARxXM3rk82VKS6dKYmyGJCk9UWruu/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', background: '#000', color: '#FFF', padding: '10px 16px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
              >
                <Download size={14} /> DOWNLOAD CV (PDF)
              </a>
            </div>

            <div>
              <p className="mosby-dropcap-text">
                Product & Experience Designer specialized in crafting complex B2B SaaS platforms, custom enterprise software solutions, and high-performance digital products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN HOMEPAGE (DIRECT MOSBY'S FILES SCREENSHOT 1 REPRODUCTION)
───────────────────────────────────────────── */
export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cv' | CaseStudyId>(() => getViewFromHash());
  const [lang, setLang] = useState<'en' | 'fr'>('en');
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
      {/* Mosby's Files Centered Header */}
      <header className="mosby-header">
        <div style={{ width: '100px' }} />
        <div className="mosby-header-logo" onClick={() => setCurrentView('home')}>
          MOSBY'S FILES
        </div>
        <div className="mosby-header-nav">
          <span className="mosby-nav-link" onClick={() => setCurrentView('cv')}>About</span>
          <button className="mosby-lang-toggle" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
            {lang.toUpperCase()}
          </button>
        </div>
      </header>

      {/* Render Active View */}
      {currentView === 'cv' && <CVView setCurrentView={setCurrentView} />}
      {currentView !== 'home' && currentView !== 'cv' && (
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
          <section className="mosby-filing-cabinet container">
            {/* ROW 1: Blue Folder (#1D4ED8) */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-blue" onClick={() => setCurrentView('asset-iq')}>
                  Asset IQ
                </div>
                <div className="mosby-tab mosby-tab-red" onClick={() => setCurrentView('ehadj')}>
                  eHadj
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#1D4ED8' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 0 ? null : 0)}
              >
                <div className="mosby-folder-category-label">
                  B2B SaaS & Process Orchestration &lt;
                </div>
              </div>

              {activeExpandedFolderRow === 0 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#1D4ED8' }}>
                  <div className="mosby-expanded-grid">
                    <div>
                      <p className="mosby-expanded-desc">
                        Systemic digital products for operational resource governance and national-scale multi-organization logistics orchestration.
                      </p>
                      <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('asset-iq')}>
                        <span>OPEN FILE: ASSET IQ →</span>
                      </button>
                    </div>
                    <div className="mosby-expanded-preview-frame">
                      <img src="/imgs/assetiQ/cover_Asset.jpg" alt="Asset IQ" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 2: Green Folder (#059669) */}
            <div className="mosby-folder-group">
              <div className="mosby-tabs-bar">
                <div className="mosby-tab mosby-tab-green" onClick={() => setCurrentView('beans')}>
                  Beans
                </div>
              </div>

              <div 
                className="mosby-folder-bar" 
                style={{ backgroundColor: '#059669' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 1 ? null : 1)}
              >
                <div className="mosby-folder-category-label">
                  Customer Engagement & Integrations &lt;
                </div>
              </div>

              {activeExpandedFolderRow === 1 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#059669' }}>
                  <div className="mosby-expanded-grid">
                    <div>
                      <p className="mosby-expanded-desc">
                        End-to-end customer loyalty B2B SaaS platform, PRD specs writing, integration hubs (Shopify, Klaviyo, POS), and engineering team supervision.
                      </p>
                      <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('beans')}>
                        <span>OPEN FILE: BEANS →</span>
                      </button>
                    </div>
                    <div className="mosby-expanded-preview-frame">
                      <img src="/imgs/beans_cover.png" alt="Beans" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 3: Purple Folder (#7C3AED) */}
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
                style={{ backgroundColor: '#7C3AED' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 2 ? null : 2)}
              >
                <div className="mosby-folder-category-label">
                  Modular Design Systems & Immersive Web &lt;
                </div>
              </div>

              {activeExpandedFolderRow === 2 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#7C3AED' }}>
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

            {/* ROW 4: Red Folder (#DC2626 - Active / Expanded by Default) */}
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
                style={{ backgroundColor: '#DC2626' }}
                onClick={() => setActiveExpandedFolderRow(activeExpandedFolderRow === 3 ? null : 3)}
              >
                <div className="mosby-folder-category-label">
                  E-Commerce & Digital Showcase <ChevronDown size={14} style={{ marginLeft: '4px' }} />
                </div>
              </div>

              {activeExpandedFolderRow === 3 && (
                <div className="mosby-folder-expanded" style={{ backgroundColor: '#DC2626' }}>
                  <div className="mosby-expanded-grid">
                    <div>
                      <p className="mosby-expanded-desc">
                        Crafting high-end luxury e-commerce brand experiences, landing page concepts, and digital product studio showcase portals with high-contrast art direction, clear information architecture, and seamless user conversion flows.
                      </p>
                      <button className="mosby-expanded-open-btn" onClick={() => setCurrentView('truvox')}>
                        <span>OPEN FILE: TRUVOX STUDIO →</span>
                      </button>
                    </div>
                    <div className="mosby-expanded-preview-frame">
                      <img src="/imgs/truvox_cover.png" alt="Truvox Studio" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
}
'''

with open('src/App.tsx', 'w') as f:
    f.write(app_content)

print("Cleaned App.tsx for exact Mosby's Files reproduction successfully.")
