import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ExternalLink,
  Calendar,
  Linkedin,
  Download,
  X
} from 'lucide-react';
import './App.css';
import ShootingStarsBackground from './components/ShootingStarsBackground';

const CaseStudy = ({ id, mousePos, setCurrentView }: { id: 'asset-iq' | 'ehadj', mousePos: { x: number, y: number }, setCurrentView: any }) => {
    const data = id === 'asset-iq' ? {
      title: "Asset IQ",
      subtitle: "Gouvernance et pilotage opérationnel des actifs physiques",
      label: "Product Design & Strategy",
      color: "#10B981", // Emerald
      bgImage: "/imgs/assetiQ_cs.jpg",
      context: "Dans l'industrie, la dispersion géographique des équipements génère des pertes massives et une absence totale de traçabilité. Le problème n'est pas le manque de données, mais leur fragmentation.",
      challenge: "Transformer un inventaire passif en un outil d'aide à la décision. Le défi UX : permettre à des opérateurs terrain de capter de l'information fiable sans friction.",
      solution: "AssetIQ centralise le cycle de vie complet de l'actif. Chaque équipement possède une identité digitale unique (QR Code), fusionnant l'inventaire physique et le carnet de maintenance actif.",
      insight: "La data n'est utile que si elle est saisie par ceux qui sont sur le terrain. Nous avons réduit le flow de saisie à 3 actions critiques pour garantir l'adoption.",
      contextImg: "/imgs/assetiQ/tech2.jpg",
      challengeImg: "/imgs/assetiQ/military2.jpg",
      solutionImg: "/imgs/assetiQ/tech3.jpg",
      dashboardImg: "/imgs/assetiQ/Dashboard_asset.png",
      features: [
        { title: "Traçabilité Native", desc: "Identification par QR code pour un accès immédiat à l'historique complet." },
        { title: "Maintenance Préventive", desc: "Planification automatisée pour allonger la durée de vie des actifs." },
        { title: "Hiérarchie Multi-Sites", desc: "Structure organisationnelle flexible (Sites > Départements > Individus)." },
        { title: "Analytics Décisionnels", desc: "Rapports de dépréciation et de ROI basés sur l'usage réel." }
      ],
      impact: [
        "Réduction de 30% des pertes d'équipements",
        "Optimisation massive des coûts opérationnels",
        "Traçabilité juridique et responsabilité individuelle",
        "Prise de décision basée sur des données de terrain fiables"
      ],
      conclusion: "AssetIQ redéfinit la gestion matérielle en passant d'un simple listing à une véritable gouvernance opérationnelle structurée.",
      externalLink: "https://www.assetiQ.com"
    } : {
      title: "eHadj",
      subtitle: "Orchestration digitale du pèlerinage au Bénin",
      label: "Product Design & Strategy",
      color: "#3B82F6", // Blue
      bgImage: "/imgs/ehadj_cs.jpg",
      context: "L'eHadj est piloté par l'Agence pour la Gestion de la Logistique des Officiels (AGLO). Avant eHadj, le système reposait sur des processus manuels et fragmentés, entraînant des erreurs de quotas et de visas.",
      problem: "Le système reposait sur des processus manuels. Les erreurs de saisie sur 2300 dossiers créaient des doublons et des blocages de visas critiques au niveau national.",
      stakeholders: [
        { name: "Pèlerins", constraint: "Souvent âgés, faible aisance numérique, besoin de certitude absolue." },
        { name: "Agences", constraint: "Gérer les inscriptions sous pression de quotas limités." },
        { name: "AGLO (Hadj Unit)", constraint: "Supervision globale, paramétrage des sociétés, suivi des quotas." }
      ],
      challenge: "Éliminer les erreurs de saisie sur 2300 dossiers dès le point d'entrée et gérer en temps réel la répartition dynamique des places entre les agences.",
      decisions: [
        { 
          title: "ID-First Onboarding", 
          desc: "Imposer la saisie du numéro NPI (Identifiant National) comme première étape.",
          why: "Auto-remplit les données certifiées et élimine les doublons instantanément."
        },
        { 
          title: "Health-Check View", 
          desc: "Une vue pilotée par les statuts plutôt que par des listes de noms.",
          why: "Permet d'identifier les goulots d'étranglement opérationnels en un coup d'œil."
        }
      ],
      solution: "Un workflow linéaire où chaque étape (Santé, Paiement, Visa) fait office de 'gatekeeper' strict pour assurer l'intégrité du processus.",
      uxSolutions: "Logic de validation séquentielle : impossible de générer un reçu de paiement sans le feu vert du médecin certificateur.",
      keyFlow: {
        title: "Validation Médicale",
        desc: "Interface médecin contextuelle : affiche uniquement les indicateurs d'aptitude sans exposer les données complexes."
      },
      tradeoffs: "Sacrifice de la liberté de saisie manuelle au profit d'un système de recherche par ID National pour garantir la qualité de la donnée.",
      contextImg: "/imgs/ehadj/hadj2.png",
      challengeImg: "/imgs/ehadj/hadj.png",
      solutionImg: "/imgs/ehadj/hadj3.png",
      dashboardImg: "/imgs/ehadj/Dashboard_ehadj.png",
      features: [
        { title: "Paramétrage Métier", desc: "Configuration granulaire des sociétés agréées et des catégories gérées." },
        { title: "Monitoring Quotas", desc: "Suivi en temps réel de la consommation des places et gestion des reports." },
        { title: "Paiements Intégrés", desc: "Consolidation des flux financiers agences-pèlerins haute-sécurité." },
        { title: "Contrôle Global", desc: "Tableau de bord décisionnel interactif pour le pilotage de la saison Hadj." }
      ],
      impact: [
        "Élimination totale des erreurs de double-inscription",
        "Réduction de 90% des dossiers rejetés pour erreur matérielle",
        "Transparence totale sur la consommation du quota national",
        "Fluidité majeure dans la coordination entre les 30+ agences"
      ],
      insight: "L’intégrité de la donnée n’est pas une option, c’est le moteur du système. L'onboarding basé sur le NPI a été la clé de voûte de la réussite.",
      conclusion: "eHadj a transformé une logistique complexe en un processus industriel fiable, sécurisant le voyage sacré de milliers de Béninois.",
      externalLink: "https://ehadj.aglo.bj/"
    };

    return (
      <div className="cs-view-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="cs-gradient-overlay" style={{ '--glow-color': data.color } as any}></div>
        
        <nav className="cs-nav-new">
          <div className="container cs-nav-flex">
            <button onClick={() => setCurrentView('home')} className="cs-back-btn">
              <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
              <span>RETOUR</span>
            </button>
            <div className="cs-nav-label">{data.title} — {data.label}</div>
          </div>
        </nav>

        <header className="cs-hero-new">
          <div className="container">
            <div className="cs-hero-content">
              <span className="cs-hero-tag">{data.label}</span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {data.title}.
              </motion.h1>
              <p className="cs-hero-subtitle">{data.subtitle}</p>
              {data.externalLink && (
                <motion.a 
                  href={data.externalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cs-external-cta"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VOIR LE PRODUIT <ExternalLink size={16} />
                </motion.a>
              )}
            </div>
            
          </div>
        </header>

        <section className="cs-body-new">
          <div className="container">
            <div className="cs-layout-new">
              <div className="cs-main-content">
                <motion.div 
                  className="cs-section-new"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <label className="cs-section-label">01 / CONTEXTE</label>
                  <h3>La fragmentation des données opérationnelles.</h3>
                  <p>{data.context}</p>
                  {data.contextImg && (
                    <div className="cs-inline-mockup">
                      <img src={data.contextImg} alt="Context" />
                    </div>
                  )}
                </motion.div>

                {data.problem && (
                  <motion.div 
                    className="cs-section-new"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <label className="cs-section-label">02 / LE PROBLÈME</label>
                    <h3>Processus manuels et erreurs critiques.</h3>
                    <p>{data.problem}</p>
                  </motion.div>
                )}

                <motion.div 
                  className="cs-section-new highlighted-section"
                  style={{ borderLeftColor: data.color }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <label className="cs-section-label">03 / CHALLENGE</label>
                  <h3>Sécuriser le parcours de 2300 utilisateurs.</h3>
                  <p>{data.challenge}</p>
                  <div className="cs-inline-mockup">
                    <img src={data.challengeImg} alt="Challenge" />
                  </div>
                </motion.div>

                {data.decisions && (
                  <div className="cs-section-new">
                    <label className="cs-section-label">04 / DÉCISIONS PRODUIT</label>
                    <div className="cs-decisions-grid-new">
                      {data.decisions.map((d: any, i: number) => (
                        <div key={i} className="cs-decision-card-new">
                          <h4>{d.title}</h4>
                          <p>{d.desc}</p>
                          <div className="cs-why-pill" style={{ color: data.color }}>{d.why}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="cs-section-new">
                  <label className="cs-section-label">05 / SOLUTION UX</label>
                  <h3>Intégrité par le design et validation stricte.</h3>
                  <p>{data.solution}</p>
                  {data.uxSolutions && <div className="cs-pull-quote">{data.uxSolutions}</div>}
                  <div className="cs-dashboard-frame-new">
                    <div className="mockup-frame-new">
                      <div className="mockup-header-new">
                        <span className="mockup-dot" />
                        <span className="mockup-dot" />
                        <span className="mockup-dot" />
                      </div>
                      <div className="mockup-screen-new">
                        <img src={data.dashboardImg} alt="Dashboard" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cs-features-grid-new">
                  {data.features.map((f, i) => (
                    <div key={i} className="cs-feature-box-new">
                      <span className="feature-num-new">0{i+1}</span>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="cs-sidebar-new">
                <div className="cs-sidebar-sticky">
                  <div className="cs-sidebar-block">
                    <label>INSIGHT PRODUIT</label>
                    <p>{data.insight}</p>
                  </div>
                  
                  <div className="cs-sidebar-block">
                    <label>IMPACT CLÉ</label>
                    <ul className="cs-impact-list">
                      {data.impact.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <button onClick={() => setCurrentView('home')} className="cs-final-back-btn">
                    RETOUR AU PORTFOLIO
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <footer className="cs-footer-new">
          <div className="container">
            <div className="cs-footer-content">
              <h2>{data.conclusion}</h2>
              <p>© 2026 sacca dafia. all rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  };

const CVView = ({ setCurrentView }: { setCurrentView: any }) => {
    return (
      <div className="cv-view-new anim-fade-in">
        <nav className="cv-nav-new no-print">
          <div className="container cv-nav-flex">
            <button onClick={() => setCurrentView('home')} className="cv-back-btn">
              <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
              <span>RETOUR</span>
            </button>
            <div className="cv-nav-actions">
              <motion.a 
                href="/sacca_dafia-cv.pdf" 
                download 
                className="cv-download-pill"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={14} /> <span>PDF</span>
              </motion.a>
            </div>
          </div>
        </nav>

        <div className="container cv-main-container">
          {/* Print Layout - Hidden on Web */}
          <div className="cv-print-only no-web">
            <div className="print-header">
              <h1>SACCA DAFIA</h1>
              <p>PRODUCT DESIGNER / WEB DESIGNER</p>
            </div>
            <div className="print-contact">
              <span>Cotonou, Bénin</span> • <span>+229 01 60 35 90 22</span> • <span>dafiashalom@gmail.com</span>
            </div>
            {/* Simple content for print */}
          </div>

          {/* Web Editorial Narrative */}
          <div className="cv-narrative-flow no-print">
            <header className="cv-hero-editorial">
              <motion.div 
                className="cv-hero-meta"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                PRODUCT DESIGNER / 2026
              </motion.div>
              <motion.h1 
                className="cv-massive-name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                SACCA DAFIA.
              </motion.h1>
              <motion.div 
                className="cv-hero-bio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p>Ambition créative. Rigueur produit. Je transforme les problématiques complexes en solutions digitales fluides, alliant vision stratégique et excellence visuelle.</p>
              </motion.div>
            </header>

            <section className="cv-experience-narrative">
              <div className="cv-section-label-new">01 / EXPÉRIENCES</div>
              
              <div className="cv-experience-grid">
                {[
                  {
                    company: "CACTUCE",
                    role: "Product Designer",
                    date: "OCT. 25 — PRÉSENT",
                    desc: "Orchestration des parcours utilisateurs pour des produits SaaS complexes tels que eHadj et Asset IQ.",
                    points: [
                      "Optimisation UX/UI et identification des frictions.",
                      "Définition de la logique produit et parcours critiques.",
                      "Supervision QA et accompagnement technique."
                    ],
                    active: true
                  },
                  {
                    company: "TRELLIX",
                    role: "Product Designer Lead",
                    date: "FÉV. 24 — SEP. 25",
                    desc: "Pilotage du programme de fidélité Beans. Coordination entre design, technique et produit.",
                    points: [
                      "Rédaction de PRDs et spécifications fonctionnelles.",
                      "Conception de systèmes de fidélisation innovants.",
                      "Leadership de projet et coordination d’équipe."
                    ]
                  },
                  {
                    company: "CREAFIX",
                    role: "Web Designer",
                    date: "AOÛT 22 — FÉV. 24",
                    desc: "Focus sur l’identité visuelle et la hiérarchie de l’information pour des interfaces orientées conversion."
                  }
                ].map((exp, i) => (
                  <motion.div 
                    key={exp.company}
                    className={`cv-exp-block ${exp.active ? 'active' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="exp-header">
                      <h3>{exp.company}</h3>
                      <span className="exp-date">{exp.date}</span>
                    </div>
                    <div className="exp-content">
                      <div className="exp-role">{exp.role}</div>
                      <p>{exp.desc}</p>
                      {exp.points && (
                        <ul className="exp-points-new">
                          {exp.points.map((p, pi) => <li key={pi}>{p}</li>)}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="cv-footer-blocks">
              <section className="cv-block-mini">
                <div className="cv-section-label-new">02 / ÉDUCATION</div>
                <div className="cv-edu-list">
                  <div className="edu-item-new">
                    <strong>UX Design Certificate</strong>
                    <span>Google (2025)</span>
                  </div>
                  <div className="edu-item-new">
                    <strong>Web Designer Certifié</strong>
                    <span>EIGB (2023)</span>
                  </div>
                </div>
              </section>

              <section className="cv-block-mini">
                <div className="cv-section-label-new">03 / SKILLS</div>
                <div className="cv-skills-pills">
                  {['Figma', 'Illustrator', 'Notion', 'Product Logic', 'UX Audit', 'QA Strategy'].map(skill => (
                    <span key={skill} className="skill-pill-new">{skill}</span>
                  ))}
                </div>
              </section>
            </div>

            <footer className="cv-final-actions">
              <div className="footer-line-accent"></div>
              <div className="cv-contact-row">
                <a href="mailto:dafiashalom@gmail.com" className="cv-email-link">dafiashalom@gmail.com</a>
                <motion.a 
                  href="/sacca_dafia-cv.pdf" 
                  download 
                  className="cv-cta-premium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  TÉLÉCHARGER LE CV
                </motion.a>
              </div>
            </footer>
          </div>
        </div>
        
        <footer className="cv-minimal-footer">
          <p>© 2026 Portfolio — Sacca Dafia</p>
        </footer>
      </div>
    );
  };
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'asset-iq' | 'ehadj' | 'cv'>('home');
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeSection, setActiveSection] = useState('home');
  const [domSections, setDomSections] = useState<string[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Select all sections that have an id
    const sectionElements = Array.from(document.querySelectorAll('section')).filter(s => s.id);
    const sectionIds = sectionElements.map(s => s.id);
    setDomSections(sectionIds);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionElements.forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentView]); // Re-run whenever view resets

  const translations = {
    en: {
      nav: { home: 'Home', about: 'About', services: 'Services', experience: 'Experience', focus: 'Focus', projects: 'Projects', process: 'Process', contact: 'Contact' },
      process: {
        label: '07 / Process',
        title: <>My <span className="highlight">Methodology.</span></>,
        items: [
          { num: '01', title: 'Discovery', desc: 'I start by understanding the product, its users, and the real business constraints. Before touching Figma.' },
          { num: '02', title: 'UX Audit', desc: "On an existing product, I identify friction, flow inconsistencies, and interfaces that create confusion." },
          { num: '03', title: 'Product Thinking', desc: "I structure user journeys and define the product logic: what should happen first, why, and for whom." },
          { num: '04', title: 'Design & Delivery', desc: "I design high-fidelity interfaces, write specs if necessary, and follow implementation through to final QA." }
        ]
      },
      contact: {
        label: '08 / Contact',
        title: <>Ready to create<br /><span className="highlight">together?</span></>,
        subtitle: '30 minutes to discuss your project, your needs, and see how I can help.',
        bookCall: 'Book a call',
        availability: 'Available for new projects',
        emailText: 'Let\'s turn your idea into reality.',
        rights: 'All rights reserved.'
      },
      hero: {
        label: '00 / Home',
        title: <>Your product deserves<br /><span className="highlight">better design decisions.</span></>,
        subtitle: 'CLEAR. USEFUL. SCALABLE.',
        viewProjects: 'View my projects',
        contactMe: 'Contact me',
      },
      services: {
        label: '03 / Services',
        title: 'My Services',
        subtitle: 'Comprehensive solutions for your digital projects.',
        items: [
          {
            id: '01',
            title: 'Product Design',
            subtitle: 'Interfaces & Experience',
            desc: 'Creating seamless user journeys and high-fidelity interfaces that prioritize clarity and user engagement.',
            tags: ['Figma', 'UX Research', 'Prototyping'],
            color: '#3B82F6'
          },
          {
            id: '02',
            title: 'UX Audit',
            subtitle: 'Optimization & Analysis',
            desc: 'Identifying friction points and usability bottlenecks to improve conversion rates and overall user satisfaction.',
            tags: ['Heuristic Eval', 'User Testing', 'Analytics'],
            color: '#A855F7'
          },
          {
            id: '03',
            title: 'Product Strategy',
            subtitle: 'Vision & Roadmapping',
            desc: 'Bridging the gap between business goals and user needs by defining MVPs and scalable product architectures.',
            tags: ['Roadmap', 'User Personas', 'MVP'],
            color: '#F97316'
          },
          {
            id: '04',
            title: 'Design System',
            subtitle: 'Consistency & Scale',
            desc: 'Building robust, reusable component libraries that ensure visual consistency and speed up development cycles.',
            tags: ['React', 'Storybook', 'Documentation'],
            color: '#10B981'
          }
        ]
      },
      about: {
        title: <>What I <br/><span className="highlight">really do.</span></>,
        bio: 'Product Designer with +3 years of experience. I design B2B SaaS, mobile apps & complex platforms, from UX strategy to final delivery.',
        approach: 'My approach: combining product vision with technical rigor to ensure interfaces are not just aesthetic, but primarily usable, performant, and truly ready to ship.',
        label: '02 / About'
      },
      experience: {
        title: 'Experience',
        label: '04 / EXPERIENCE',
        items: [
          {
            id: '01',
            role: 'Product Designer',
            company: 'CACTUCE',
            date: 'OCTOBER 2025 — PRESENT',
            desc: 'Working on the structuring and optimization of complex products like eHadj and Asset IQ. Identifying friction points, defining user journeys, and overseeing QA to ensure execution matches the product vision.',
            skills: ['Interfaces Logic', 'UX Analysis', 'Hi-Fi Design', 'QA Oversight'],
            color: '#A855F7'
          },
          {
            id: '02',
            role: 'Product Designer',
            company: 'TRELLIX',
            date: 'FEBRUARY 2024 — SEPTEMBER 2025',
            desc: 'Evolved from a design-focused to a product-focused approach, working on integrations for the Beans loyalty program. Defined features, structured user journeys, and ensured global product consistency.',
            skills: ['PRD & Specs', 'Beans Journey', 'Dev Coordination', 'QA Validation'],
            color: '#3B82F6'
          },
          {
            id: '03',
            role: 'Web Designer',
            company: 'CREAFIX',
            date: 'AUGUST 2022 — FEBRUARY 2024',
            desc: 'Started in digital design with a focus on creating web interfaces and visual execution. Developed visual hierarchy, readability, and graphic coherence for various client websites.',
            skills: ['Visual Design', 'Info Hierarchy', 'Web Layouts', 'Project Delivery'],
            color: '#F97316'
          }
        ]
      }
    },
    fr: {
      nav: { home: 'Accueil', about: 'À propos', services: 'Services', experience: 'Expérience', focus: 'Focus', projects: 'Projets', process: 'Process', contact: 'Contact' },
      process: {
        label: '07 / Process',
        title: <>Ma <span className="highlight">Méthodologie.</span></>,
        items: [
          { num: '01', title: 'Discovery', desc: 'Je commence par comprendre le produit, ses utilisateurs et les vraies contraintes business. Avant de toucher à Figma.' },
          { num: '02', title: 'UX Audit', desc: "Sur un produit existant, j'identifie les frictions, les incohérences de flow et les interfaces qui créent de la confusion." },
          { num: '03', title: 'Product Thinking', desc: "Je structure les parcours et définis la logique produit : qu'est-ce qui doit arriver en premier, pourquoi, et pour qui." },
          { num: '04', title: 'Design & Delivery', desc: "Je conçois les interfaces haute-fidélité, rédige les specs si nécessaire et suis l'implémentation jusqu'au QA final." }
        ]
      },
      contact: {
        label: '08 / Contact',
        title: <>Prêt à créer<br /><span className="highlight">ensemble ?</span></>,
        subtitle: '30 minutes pour discuter de votre projet, de vos besoins et voir comment je peux vous aider.',
        bookCall: 'Réserver un appel',
        availability: 'Disponible pour de nouveaux projets',
        emailText: 'Transformons votre idée en réalité.',
        rights: 'Tous droits réservés.'
      },
      hero: {
        label: '00 / Accueil',
        title: <>Votre produit mérite<br /><span className="highlight">de meilleures décisions design.</span></>,
        subtitle: 'CLAIR. UTILE. SCALABLE.',
        viewProjects: 'Voir mes projets',
        contactMe: 'Me contacter',
      },
      services: {
        label: '03 / Services',
        title: 'Mes Services',
        subtitle: 'Des solutions complètes pour vos projets digitaux.',
        items: [
          {
            id: '01',
            title: 'Product Design',
            subtitle: 'Interfaces & Expérience',
            desc: 'Création de parcours fluides et d\'interfaces haute fidélité privilégiant la clarté et l\'engagement.',
            tags: ['Figma', 'UX Research', 'Prototypage'],
            color: '#3B82F6'
          },
          {
            id: '02',
            title: 'Audit UX',
            subtitle: 'Optimisation & Analyse',
            desc: 'Identification des points de friction pour améliorer les taux de conversion et la satisfaction globale.',
            tags: ['Éval Heuristique', 'Tests Utilisateurs', 'Analytics'],
            color: '#A855F7'
          },
          {
            id: '03',
            title: 'Stratégie Produit',
            subtitle: 'Vision & Roadmap',
            desc: 'Réconciliation des objectifs business et besoins utilisateurs via la définition de MVPs évolutifs.',
            tags: ['Roadmap', 'Personas', 'MVP'],
            color: '#F97316'
          },
          {
            id: '04',
            title: 'Design System',
            subtitle: 'Cohérence & Échelle',
            desc: 'Construction de bibliothèques de composants robustes garantissant une cohérence visuelle totale.',
            tags: ['React', 'Storybook', 'Documentation'],
            color: '#10B981'
          }
        ]
      },
      about: {
        title: <>Ce que je fais <br/><span className="highlight">vraiment.</span></>,
        bio: 'Product Designer avec +3 ans d\'expérience. Je conçois des SaaS B2B, applications mobiles et plateformes complexes, de la stratégie UX à la livraison finale.',
        approach: 'Mon approche : allier vision produit et rigueur technique pour garantir des interfaces non seulement esthétiques, mais surtout utilisables, performantes et réellement prêtes à être livrées.',
        label: '02 / À propos'
      },
      experience: {
        title: 'Expérience',
        label: '04 / EXPÉRIENCE',
        items: [
          {
            id: '01',
            role: 'Product Designer',
            company: 'CACTUCE',
            date: 'OCTOBRE 2025 — PRÉSENT',
            desc: 'Intervention sur la structuration et l\'optimisation de produits complexes comme eHadj et Asset IQ. Identification des points de friction et supervision de la phase de QA.',
            skills: ['Logique d\'interfaces', 'Analyse UX', 'Design Haute-fidélité', 'Supervision QA'],
            color: '#A855F7'
          },
          {
            id: '02',
            role: 'Product Designer',
            company: 'TRELLIX',
            date: 'FÉVRIER 2024 — SEPTEMBRE 2025',
            desc: 'Évolution vers une approche produit structurée sur le programme Beans. Définition des fonctionnalités et coordination avec l\'équipe dev.',
            skills: ['PRD & Specs', 'Parcours Beans', 'Coordination Dev', 'Validation QA'],
            color: '#3B82F6'
          },
          {
            id: '03',
            role: 'Web Designer',
            company: 'CREAFIX',
            date: 'AOÛT 2022 — FÉVRIER 2024',
            desc: 'Création d\'interfaces web et exécution visuelle. Travail sur la hiérarchie visuelle, la lisibilité et la cohérence graphique.',
            skills: ['Visual Design', 'Hiérarchie Info', 'Web Layouts', 'Livraison Projet'],
            color: '#F97316'
          }
        ]
      }
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  // Calendly Integration
  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/dafiashalom/30min' });
    }
  };

  const projects = [
    {
      title: 'Sagana',
      role: 'Web Designer & Developer',
      category: 'Digital Agency',
      image: '/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png',
      description: "Conception et développement intégral du site web de Sagana. Une plateforme moderne alliant design premium et performance pour accompagner les entreprises dans leur croissance digitale.",
      techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
      link: 'https://www.sagana-agency.com/',
      color: '#DFFF00',
    },
    {
      title: 'Vortex',
      role: 'Product Designer',
      category: 'Mobile App',
      image: '/imgs/vortex.webp',
      description: "Application mobile d'achat de carburant et de gestion de portefeuille. Parcours transactionnels optimis\u00e9s pour la mobilit\u00e9 avec onboarding fluide et gestion de wallet int\u00e9gr\u00e9e.",
      techs: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
      link: 'https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel',
      color: '#FFD700',
    },
    {
      title: 'Sport Advisor',
      role: 'Product Designer',
      category: 'AI & Analytics',
      image: '/imgs/advisor.webp',
      description: "Landing page pour une plateforme d'analyse sportive bas\u00e9e sur l'IA. Hi\u00e9rarchie d'information dense rendue lisible au premier coup d'\u0153il avec un storytelling visuel fort.",
      techs: ['Figma', 'UX Strategy', 'Visual Design', 'Motion'],
      link: 'https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive',
      color: '#00FA9A',
    },
  ];


  if (currentView === 'cv') {
    return <CVView setCurrentView={setCurrentView} />;
  }

  if (currentView !== 'home') {
    return <CaseStudy id={currentView as 'asset-iq' | 'ehadj'} mousePos={mousePos} setCurrentView={setCurrentView} />;
  }

  return (
    <div className="app anim-fade-in">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container-new">
          <div className="logo-new" onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/imgs/Logo.png" alt="Logo" className="logo-img-new" />
          </div>
          
          <div className="nav-center-links hide-mobile">
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>{t.nav.about}</a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''}>{t.nav.services}</a>
            <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>{t.nav.experience}</a>
            <a href="#saas" className={activeSection === 'saas' ? 'active' : ''}>{t.nav.focus}</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>{t.nav.projects}</a>
            <a href="#process" className={activeSection === 'process' ? 'active' : ''}>{t.nav.process}</a>
            <a href="#contact" onClick={openCalendly}>{t.nav.contact}</a>
          </div>

          <div className="nav-right-new">
            <div className="lang-switch hide-mobile">
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
                onClick={() => setLang('en')}
              >
                <img src="https://flagcdn.com/w20/gb.png" alt="EN" /> EN
              </button>
              <span className="lang-sep">|</span>
              <button 
                className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} 
                onClick={() => setLang('fr')}
              >
                <img src="https://flagcdn.com/w20/fr.png" alt="FR" /> FR
              </button>
            </div>
            <button className={`menu-icon-btn hide-desktop ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dynamic Side Indicator */}
      <div className="side-indicator no-print">
        {domSections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`dot ${activeSection === id ? 'active' : ''}`}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-noise"></div>
        <div className="mobile-nav-bg-vignette"></div>
        <div className="mobile-nav-bg"></div>
        
        <div className="container mobile-nav-container">
          <div className="mobile-nav-header">
            <div className="mobile-brand">SACCA DAFIA.</div>
            <div className="mobile-nav-right">
              <div className="mobile-nav-lang">
                <button className={`lang-pill ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
                <button className={`lang-pill ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>FR</button>
              </div>
              <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
          </div>

          <div className="mobile-nav-meta-top hide-mobile-small">
            <div className="meta-item-new">
              <span className="meta-label-new">LOCATION</span>
              <span className="meta-value-new">COTONOU, BENIN</span>
            </div>
            <div className="meta-item-new">
              <span className="meta-label-new">LOCAL TIME</span>
              <span className="meta-value-new">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>
          
          <div className="mobile-nav-content">
            <div className="mobile-nav-links">
              {[
                { id: 'about', label: t.nav.about },
                { id: 'services', label: t.nav.services },
                { id: 'experience', label: t.nav.experience },
                { id: 'saas', label: t.nav.focus },
                { id: 'projects', label: t.nav.projects },
                { id: 'process', label: t.nav.process }
              ].map((link, i) => (
                <motion.div 
                  key={link.id}
                  className="mobile-link-wrapper"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <a
                    href={`#${link.id}`}
                    className={`mobile-link-item ${activeSection === link.id ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mobile-link-num">0{i+1}</span>
                    <span className="mobile-link-text">{link.label}</span>
                    <div className="mobile-link-line"></div>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mobile-nav-aside hide-mobile">
              <div className="aside-box">
                <span className="aside-label">READY TO SHIP?</span>
                <button 
                  className="aside-cta"
                  onClick={(e) => { setIsMenuOpen(false); openCalendly(e); }}
                >
                  {t.nav.contact}
                  <ArrowRight size={20} style={{ transform: 'rotate(-45deg)' }} />
                </button>
              </div>
            </div>
          </div>

          <div className="mobile-nav-footer-new">
            <div className="mobile-socials-new">
              <span className="meta-label-new">SOCIALS</span>
              <div className="social-links-row">
                <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer">BEHANCE</a>
              </div>
            </div>
            <div className="mobile-copyright-new">
              <p>© 2026 SACCA DAFIA. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-new left-aligned" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <ShootingStarsBackground />
        <div className="hero-gradient-overlay"></div>
        <div className="container hero-container-new">
          <div className="hero-content-new">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              className="hero-subtitle-new"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div 
              className="hero-actions-new"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#projects" className="btn-primary-new">{t.hero.viewProjects}</a>
              <button onClick={openCalendly} className="btn-secondary-new">{t.hero.contactMe}</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="about-gradient-overlay"></div>
        <div className="container about-container-new">
          <div className="about-header-new">
            <span className="about-label-new">{t.about.label}</span>
            <motion.h2 
              className="about-title-large"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.about.title}
            </motion.h2>
          </div>
          
          <div className="about-content-refined">
            <div className="about-text-narrative">
              <motion.p 
                className="about-bio-massive"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t.about.bio}
              </motion.p>
              <motion.p 
                className="about-approach-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t.about.approach}
              </motion.p>
            </div>
            <div className="about-stats-mini hide-mobile">
              <div className="stat-item">
                <span className="stat-num">+3</span>
                <span className="stat-label">Years of<br/>Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">50+ Projects</span>
                <span className="stat-label">Delivered with<br/>Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section-new">
        <div className="container">
          <div className="services-header-new">
            <span className="services-label-new">{t.services.label}</span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t.services.title}
            </motion.h2>
            <motion.p 
              className="services-subtitle-new"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t.services.subtitle}
            </motion.p>
          </div>
          
          <div className="services-grid-new">
            {t.services.items.map((service : any, index : number) => (
              <motion.div 
                key={service.id}
                className="service-card-new"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card-header-new">
                  <span className="card-index-new">{service.id}</span>
                  <div className="card-dot-new" style={{ backgroundColor: service.color }}></div>
                </div>
                <div className="card-body-new">
                  <h3>{service.title}</h3>
                  <p className="card-subtitle-new">{service.subtitle}</p>
                  <p className="card-desc-new">{service.desc}</p>
                </div>
                <div className="card-footer-new">
                  <div className="card-tags-new">
                    {service.tags.map((tag: string) => (
                      <span key={tag} className="tag-pill-new">{tag}</span>
                    ))}
                  </div>
                </div>
                {index === 0 && <div className="card-glow-new" style={{ '--glow-color': service.color } as any}></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="experience-gradient-overlay"></div>
        <div className="container experience-container-new">
          <div className="experience-header-new">
            <span className="experience-label-new">{t.experience.label}</span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t.experience.title}
            </motion.h2>
          </div>
          
          <div className="experience-list-new">
            {t.experience.items.map((exp: any, index: number) => (
              <motion.div 
                key={index} 
                className="experience-item-new"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="exp-left-new">
                  <span className="exp-date-new">{exp.date}</span>
                  <div className="exp-connector-new">
                    <div className="exp-dot-new" style={{ backgroundColor: exp.color }}></div>
                    <div className="exp-line-new"></div>
                  </div>
                </div>
                <div className="exp-right-new">
                  <div className="exp-info-new">
                    <h3>{exp.role}</h3>
                    <span className="exp-company-new">{exp.company}</span>
                  </div>
                  <p className="exp-desc-new">{exp.desc}</p>
                  <div className="exp-skills-new">
                    {exp.skills.map((skill: string) => (
                      <span key={skill} className="skill-tag-new">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits & SaaS Section */}
      <section id="saas" className="saas-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="saas-gradient-overlay"></div>
        <div className="container saas-container-new">
          <div className="saas-header-new">
            <span className="saas-label-new">05 / Focus</span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Produits & <span className="highlight">SaaS.</span>
            </motion.h2>
          </div>
          
          <div className="saas-grid-new">
            {[
              {
                id: 'ehadj',
                label: 'Process Orchestration',
                title: 'eHadj',
                desc: 'Digitalisation de l\'organisation du pèlerinage : inscriptions, logistique, transports et flux financiers centralisés.',
                view: 'ehadj',
                color: '#10B981'
              },
              {
                id: 'asset-iq',
                label: 'Product Design & Strategy',
                title: 'Asset IQ',
                desc: 'Système intelligent de suivi et de gouvernance opérationnelle des ressources physiques.',
                view: 'asset-iq',
                color: '#34D399'
              }
            ].map((product, index) => (
              <motion.div 
                key={product.id}
                className="saas-card-new"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentView(product.view as any)}
              >
                <div className="saas-card-content">
                  <span className="saas-card-label">{product.label}</span>
                  <h3>{product.title}</h3>
                  <p>{product.desc}</p>
                  <div className="saas-card-footer">
                    <span className="saas-cta-text">VOIR L'ÉTUDE DE CAS</span>
                    <div className="saas-cta-circle">
                      <ArrowRight size={20} style={{ transform: 'rotate(-45deg)' }} />
                    </div>
                  </div>
                </div>
                <div className="saas-card-glow" style={{ backgroundColor: product.color }}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="projects-gradient-overlay"></div>
        <div className="container">
          <div className="projects-header-new">
            <span className="projects-label-new">06 / Projets</span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Selected <span className="highlight">Works.</span>
            </motion.h2>
          </div>

          <div className="proj-showcase-new">
            <div className="proj-left-new">
              <div className="proj-meta-new">
                <span className="proj-index-new">{String(activeProject + 1).padStart(2, '0')}</span>
                <span className="proj-role-new">{projects[activeProject].role.toUpperCase()}</span>
              </div>
              <h3 className="proj-title-new">{projects[activeProject].title}</h3>
              <p className="proj-desc-new">{projects[activeProject].description}</p>
              <div className="proj-techs-new">
                {projects[activeProject].techs.map((t, i) => (
                  <span key={i} className="tech-pill-new">{t}</span>
                ))}
              </div>
              <motion.a
                href={projects[activeProject].link}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-cta-new"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight size={24} style={{ transform: 'rotate(-45deg)' }} />
              </motion.a>
            </div>

            <div className="proj-right-new">
              <div className="mockup-frame-new">
                <div className="mockup-header-new">
                  <span className="mockup-dot" />
                  <span className="mockup-dot" />
                  <span className="mockup-dot" />
                </div>
                <div className="mockup-screen-new">
                  <motion.img
                    key={activeProject}
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
              
              <div className="proj-nav-new">
                <button
                  className="proj-nav-btn-new"
                  onClick={() => setActiveProject(p => (p - 1 + projects.length) % projects.length)}
                >
                  <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button
                  className="proj-nav-btn-new"
                  onClick={() => setActiveProject(p => (p + 1) % projects.length)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="methodology-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="methodology-gradient-overlay"></div>
        <div className="container methodology-container-new">
          <div className="methodology-header-new">
            <span className="methodology-label-new">{t.process.label}</span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t.process.title}
            </motion.h2>
          </div>

          <div className="methodology-list-new">
            {t.process.items.map((step, i) => (
              <motion.div 
                key={i} 
                className="methodology-item-new"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="methodology-num-new">{step.num}</div>
                <div className="methodology-content-new">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <div className="methodology-arrow-new">
                  <ArrowRight size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* Contact Section */}
      <section id="contact" className="contact-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="contact-gradient-overlay"></div>
        <div className="container contact-container-new">
          <div className="contact-header-new">
            <span className="contact-label-new">{t.contact.label}</span>
            <motion.h2 
              className="contact-title-large"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.contact.title}
            </motion.h2>
          </div>
          
          <div className="contact-grid-new">
            <div className="book-card-premium" onClick={openCalendly}>
              <div className="book-card-left">
                <div className="book-icon-wrapper">
                  <Calendar size={24} />
                </div>
                <h3>{t.contact.bookCall}</h3>
                <p>{t.contact.subtitle}</p>
              </div>
              <div className="book-card-right">
                <div className="book-cta-circle">
                  <ArrowRight size={40} style={{ transform: 'rotate(-45deg)' }} />
                </div>
              </div>
            </div>

            <div className="contact-info-new">
              <div className="availability-row">
                <span className="dot"></span>
                <span className="availability-text">{t.contact.availability}</span>
              </div>
              <div className="email-wrapper-new">
                <p>{t.contact.emailText}</p>
                <a href="mailto:dafiashalom@gmail.com" className="email-link-huge">
                  dafiashalom@gmail.com 
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-bottom-left">
              <span className="footer-brand-logo">SACCA DAFIA.</span>
              <div className="social-simple-links">
                <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.011.022 3.038-2.998.05-3.016z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-bottom-right">
              <nav className="footer-nav-simple">
                <a href="#projects" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.projects}</a>
                <a href="#experience" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.experience}</a>
                <a href="#about" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.about}</a>
              </nav>
              <span className="copyright">© 2026 Sacca Dafia. {t.contact.rights}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
