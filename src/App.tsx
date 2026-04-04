import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  X, 
  Search,
  Zap,
  CheckCircle,
  Globe,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Linkedin,
  Download
} from 'lucide-react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'asset-iq' | 'ehadj' | 'cv'>('home');

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
    {
      title: 'Art du B\u00e9nin',
      role: 'Product Designer',
      category: 'Cultural Heritage',
      image: '/imgs/case study.webp',
      description: "Application Android de m\u00e9diation culturelle autour du patrimoine artistique b\u00e9ninois. Con\u00e7ue pour guider les visiteurs dans la d\u00e9couverte des \u0153uvres sans remplacer l'exp\u00e9rience physique.",
      techs: ['Figma', 'User Research', 'Android UX', 'Content Design'],
      link: 'https://www.behance.net/gallery/229060431/Case-Study-Mobile-Apk-for-the-Art-of-Benin',
      color: '#A020F0',
    },
  ];

  const CaseStudy = ({ id }: { id: 'asset-iq' | 'ehadj' }) => {
    const data = id === 'asset-iq' ? {
      title: "AssetIQ",
      subtitle: "Gouvernance et pilotage opérationnel des actifs physiques",
      label: "Product Design & Strategy",
      color: "var(--accent-yellow)",
      image: "/imgs/assetiQ_cs.jpg",
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
      color: "var(--accent-blue)",
      image: "/imgs/ehadj_cs.jpg",
      context: "L'eHadj est piloté par l'Agence pour la Gestion de la Logistique des Officiels (AGLO), institution publique dont la mission est d'optimiser les ressources de l'État liées aux déplacements officiels. Via son Unité de Gestion du Hadj, l'AGLO supervise l'organisation complète du pèlerinage à la Mecque.",
      problem: "Avant eHadj, le système reposait sur des processus manuels et fragmentés. Les agences utilisaient des outils disparates, entraînant des erreurs fatales : double-inscriptions de pèlerins dans plusieurs agences, fautes d'orthographe sur les passeports bloquant les visas, et une impossibilité pour le gouvernement de suivre la consommation réelle des quotas nationaux.",
      stakeholders: [
        { name: "Pèlerins", constraint: "Souvent âgés, faible aisance numérique, besoin de certitude absolue." },
        { name: "Agences", constraint: "Gérer les inscriptions sous pression de quotas limités." },
        { name: "AGLO (Hadj Unit)", constraint: "Supervision globale, paramétrage des sociétés, suivi des quotas et contrôle de la saison." }
      ],
      challenge: "Éliminer les erreurs de saisie sur 2300 dossiers dès le point d'entrée et gérer en temps réel la répartition dynamique des 2300 places entre les agences agréées.",
      decisions: [
        { 
          title: "L'ID-First Onboarding", 
          desc: "Imposer la saisie du numéro NPI (Identifiant National) comme première étape.",
          why: "Auto-remplit les données certifiées, élimine les doublons et vérifie l'âge instantanément."
        },
        { 
          title: "Dashboard 'Health-Check'", 
          desc: "Une vue pilotée par les statuts plutôt que par des listes de noms.",
          why: "Permet aux décideurs d'identifier et de résoudre les goulots d'étranglement opérationnels."
        }
      ],
      solution: "Un workflow linéaire où chaque étape (Santé, Paiement, Visa) fait office de 'gatekeeper' strict pour assurer l'intégrité du processus.",
      uxSolutions: "Logic de validation séquentielle : impossible de générer un reçu de paiement sans le feu vert du médecin certificateur.",
      keyFlow: {
        title: "Validation Médicale",
        desc: "Interface médecin contextuelle : affiche uniquement les indicateurs d'aptitude sans exposer les données financières complexes."
      },
      tradeoffs: "Nous avons sacrifié la liberté de saisie manuelle au profit d'un système de recherche par ID National. Cela garantit la qualité de la donnée mais impose une dépendance totale à la base de données source.",
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
        "Transparence totale sur la consommation du quota national à J+0",
        "Fluidité majeure dans la coordination entre les 30+ agences"
      ],
      insight: "L’intégrité de la donnée n’est pas une option, c’est le moteur du système. En imposant un onboarding basé sur l'identité certifiée (NPI), nous avons sécurisé le parcours de 2300 pèlerins contre toute erreur humaine.",
      conclusion: "eHadj a transformé une logistique complexe en un processus industriel fiable, sécurisant le voyage sacré de milliers de Béninois.",
      externalLink: "https://ehadj.aglo.bj/"
    };

    return (
      <div className="case-study-view anim-fade-in">
        <nav className="cs-nav">
          <div className="container cs-nav-container">
            <button onClick={() => setCurrentView('home')} className="back-button">
              <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> Retour
            </button>
            <div className="cs-nav-title">{data.title}</div>
          </div>
        </nav>

        <header className="cs-header" style={{ borderBottomColor: data.color }}>
          <div className="container">
            <span className="cs-label" style={{ backgroundColor: data.color }}>{data.label}</span>
            <h1>{data.title}</h1>
            <p className="cs-subtitle">{data.subtitle}</p>
            {data.externalLink && (
              <a href={data.externalLink} target="_blank" rel="noopener noreferrer" className="pill-button primary" style={{ marginTop: '20px', marginBottom: '20px' }}>
                Voir le produit <ExternalLink size={18} style={{ marginLeft: '10px' }} />
              </a>
            )}
            <div className="cs-hero-image-container">
              <img src={data.image} alt={data.title} className="cs-hero-image" />
            </div>
          </div>
        </header>

        <section className="cs-content">
          <div className="container">
            <div className="cs-grid">
              <div className="cs-main">
                <div className="cs-section">
                  <div className="cs-section-head">
                    <Globe size={20} color={data.color} strokeWidth={2.5} />
                    <h3>Contexte</h3>
                  </div>
                  <p>{data.context}</p>
                  {data.contextImg && <img src={data.contextImg} alt="Contexte" className="cs-inline-image" />}
                </div>

                {data.problem && (
                  <div className="cs-section">
                    <div className="cs-section-head">
                      <Search size={20} color={data.color} strokeWidth={2.5} />
                      <h3>Le Problème Réel</h3>
                    </div>
                    <p>{data.problem}</p>
                  </div>
                )}

                {data.stakeholders && (
                  <div className="cs-section">
                    <div className="cs-section-head">
                      <ArrowRight size={20} color={data.color} strokeWidth={2.5} />
                      <h3>Parties Prenantes</h3>
                    </div>
                    <div className="cs-stakeholder-list">
                      {data.stakeholders.map((s: any, i: number) => (
                        <div key={i} className="cs-stakeholder-card">
                          <strong>{s.name}</strong>
                          <p>{s.constraint}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="cs-section" style={{ borderLeft: `4px solid ${data.color}`, paddingLeft: '30px', margin: '40px 0' }}>
                  <div className="cs-section-head">
                    <Zap size={20} color={data.color} strokeWidth={2.5} />
                    <h3>Challenge Opérationnel</h3>
                  </div>
                  <p>{data.challenge}</p>
                  {data.challengeImg && <img src={data.challengeImg} alt="Challenge" className="cs-inline-image" />}
                </div>

                {data.decisions && (
                  <div className="cs-section">
                    <div className="cs-section-head">
                      <Zap size={20} color={data.color} strokeWidth={2.5} />
                      <h3>Décisions Produit</h3>
                    </div>
                    <div className="cs-decision-grid">
                      {data.decisions.map((d: any, i: number) => (
                        <div key={i} className="cs-decision-block">
                          <h4>{d.title}</h4>
                          <p>{d.desc}</p>
                          <div className="cs-why-tag" style={{ color: data.color }}>{d.why}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="cs-section">
                  <div className="cs-section-head">
                    <CheckCircle size={20} color={data.color} strokeWidth={2.5} />
                    <h3>Solution UX</h3>
                  </div>
                  <p>{data.solution}</p>
                  {data.uxSolutions && <p className="cs-logic-text">{data.uxSolutions}</p>}
                  {data.solutionImg && <img src={data.solutionImg} alt="Solution" className="cs-inline-image" />}
                </div>

                {data.keyFlow && (
                  <div className="cs-section cs-flow-block">
                    <div className="cs-section-head">
                      <ArrowRight size={20} color={data.color} strokeWidth={2.5} />
                      <h3>Zoom sur un Flux : {data.keyFlow.title}</h3>
                    </div>
                    <p>{data.keyFlow.desc}</p>
                  </div>
                )}

                {data.tradeoffs && (
                  <div className="cs-section cs-tradeoff-block">
                    <div className="cs-section-head">
                      <Search size={20} color="#FF9500" strokeWidth={2.5} />
                      <h3>Arbitrages & Limites</h3>
                    </div>
                    <p>{data.tradeoffs}</p>
                  </div>
                )}

                <div className="cs-features">
                  {data.features.map((f, i) => (
                    <div key={i} className="cs-feature-card">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cs-sidebar">
                {data.insight && (
                  <div className="cs-card insight-card">
                    <div className="cs-section-head">
                      <Search size={24} color={data.color} />
                      <h3>Insight Produit</h3>
                    </div>
                    <p>{data.insight}</p>
                  </div>
                )}

                {data.impact && (
                  <div className="cs-card impact-card">
                    <div className="cs-section-head">
                      <ArrowRight size={24} color={data.color} />
                      <h3>Impact</h3>
                    </div>
                    <ul>
                      {data.impact.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="cs-divider">
              <div className="cs-dot" style={{ backgroundColor: data.color }}></div>
              <div className="cs-dot" style={{ backgroundColor: data.color }}></div>
              <div className="cs-dot" style={{ backgroundColor: data.color }}></div>
            </div>

            <div className="cs-footer">
              {data.dashboardImg && (
                <div className="cs-dashboard-preview">
                  <img src={data.dashboardImg} alt={`Dashboard ${data.title}`} className="cs-dashboard-img" />
                </div>
              )}
              <div className="cs-conclusion">
                <p>{data.conclusion}</p>
              </div>
              <button onClick={() => setCurrentView('home')} className="pill-button" style={{ backgroundColor: data.color, color: '#000' }}>
                Retour au portfolio
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const CVView = () => {
    return (
      <div className="cv-view anim-fade-in">
        <nav className="cv-nav no-print">
          <div className="container cv-nav-container">
            <button onClick={() => setCurrentView('home')} className="back-button">
              <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> Retour
            </button>
            <div className="cv-nav-actions">
              <motion.a 
                href="/sacca_dafia-cv.pdf" 
                download 
                className="nav-download-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={14} /> PDF
              </motion.a>
            </div>
          </div>
        </nav>

        <div className="container cv-container">
          {/* Print Layout (Hidden on Web) */}
          <div className="sw-header no-web">
            <div className="sw-header-left">
              <h1 className="sw-name">
                <span className="sw-firstname">SACCA</span>
                <span className="sw-lastname">DAFIA</span>
              </h1>
              <div className="sw-tagline">PRODUCT DESIGNER / WEB DESIGNER</div>
            </div>
            <div className="sw-header-right">
              <div className="sw-photo-circle">
                <img src="/imgs/cv-profile.jpg" alt="Sacca Dafia" />
              </div>
            </div>
          </div>

          <div className="sw-layout no-web">
            <aside className="sw-sidebar">
              <div className="sw-section no-web">
                <h2 className="sw-label">CONTACT</h2>
                <ul className="sw-contact-list">
                  <li><MapPin size={16} /> Cotonou, Bénin</li>
                  <li><Phone size={16} /> +229 0160359022</li>
                  <li><Mail size={16} /> dafiashalom@gmail.com</li>
                  <li><Globe size={16} /> portfolio.dafia.me</li>
                </ul>
              </div>
              <div className="sw-section">
                <h2 className="sw-label">SKILLS</h2>
                <ul className="sw-bullet-list-small">
                  <li>Design Research</li>
                  <li>Interaction Design</li>
                  <li>Wireframing</li>
                </ul>
              </div>
              <div className="sw-section">
                <h2 className="sw-label">EDUCATION</h2>
                <div className="sw-edu-item">
                  <span className="sw-date">2025</span>
                  <div className="sw-edu-info">
                    <strong>UX Design Professional</strong>
                    <span>Google & Coursera</span>
                  </div>
                </div>
              </div>
            </aside>
            <main className="sw-main">
              <div className="sw-section">
                <h2 className="sw-label">PROFILE</h2>
                <p className="sw-profile-text">Product Designer alliant ambition créative et rigueur produit.</p>
              </div>
            </main>
          </div>



          {/* Editorial Web Narrative */}
          <div className="cv-editorial-flow no-print">
            
            {/* HER0 - Massive Name & Intro */}
            <motion.header 
              className="cv-editorial-hero"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="hero-text-wrap">
                <h1 className="hero-massive-name">SACCA DAFIA</h1>
                <motion.div 
                  className="hero-tag-accent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  PRODUCT DESIGNER / 2026
                </motion.div>
              </div>
              <motion.div 
                className="hero-floating-photo"
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src="/imgs/cv-profile.jpg" alt="Sacca Dafia" />
              </motion.div>
            </motion.header>

            <motion.section 
              className="cv-editorial-bio"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <p className="bio-lead">
                Product Designer alliant ambition créative et rigueur produit. Je transforme les problématiques complexes en solutions digitales fluides, en alliant vision stratégique et excellence visuelle.
              </p>
              <div className="bio-meta">Basé à Cotonou — Disponible partout</div>
            </motion.section>

            {/* EXPERIENCE NARRATIVE */}
            <div className="cv-experiences-narrative">
              
              {/* Experiences with Scroll focus */}
              {[
                {
                  id: 'cactuce',
                  year: '25',
                  company: 'Cactuce',
                  dates: 'OCT. 25 — PRÉSENT',
                  chip: 'LATEST POSITION',
                  role: 'Product Designer',
                  desc: 'Orchestration des parcours utilisateurs pour des produits SaaS complexes tels que eHadj et Asset IQ.',
                  points: [
                    'Identification des points de frictions et optimisation UX/UI.',
                    'Définition de la logique produit et des parcours critiques.',
                    'Accompagnement technique et supervision QA.'
                  ]
                },
                {
                  id: 'trellix',
                  year: '24',
                  company: 'Trellix',
                  dates: 'FÉV. 24 — SEP. 25',
                  role: 'Product Designer Lead',
                  desc: 'Pilotage du programme de fidélité Beans. Coordination entre design, technique et produit.',
                  points: [
                    'Rédaction de PRDs et spécifications fonctionnelles.',
                    'Conception de systèmes de fidélisation innovants.',
                    'Leadership de projet et coordination d’équipe.'
                  ]
                },
                {
                  id: 'creafix',
                  year: '22',
                  company: 'Creafix',
                  dates: 'AOÛT 22 — FÉV. 24',
                  role: 'Web Designer',
                  desc: 'Focus sur l’identité visuelle et la hiérarchie de l’information pour des interfaces orientées conversion.'
                }
              ].map((exp) => (
                <motion.section 
                  key={exp.id}
                  className="narrative-block"
                  initial={{ opacity: 0.3, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ amount: 0.6, margin: "-100px 0px -100px 0px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="sticky-header">
                    <motion.div 
                      className="ghost-year"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {exp.year}
                    </motion.div>
                    <motion.h2 
                      className="company-name"
                      whileHover={{ x: 10, color: '#C5EBAB' }}
                    >
                      {exp.company}
                    </motion.h2>
                    <span className="dates">{exp.dates}</span>
                  </div>
                  
                  <div className="narrative-content">
                    {exp.chip && <div className="role-chip">{exp.chip}</div>}
                    <h3 className="role-title">{exp.role}</h3>
                    <p className="description">{exp.desc}</p>
                    {exp.points && (
                      <motion.ul 
                        className="narrative-points"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          visible: { transition: { staggerChildren: 0.1 } }
                        }}
                      >
                        {exp.points.map((p, i) => (
                          <motion.li 
                            key={i}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              visible: { opacity: 1, x: 0 }
                            }}
                          >
                            {p}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                </motion.section>
              ))}

            </div>

            {/* EDUCATION & SKILLS - Staggered Grid */}
            <motion.div 
              className="editorial-footer-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
            >
              <div className="edu-block">
                <h2 className="section-label-editorial">Éducation</h2>
                <ul className="edu-list-editorial">
                  <li><strong>UX Design Certificate</strong> — Google (2025)</li>
                  <li><strong>Design Thinking</strong> — Sèmè City (2024)</li>
                  <li><strong>Web Designer Certifié</strong> — EIGB (2023)</li>
                </ul>
              </div>
              
              <div className="skills-block-editorial">
                <h2 className="section-label-editorial">Skills & Tools</h2>
                <div className="skill-pills-narrative">
                  {['Figma', 'Illustrator', 'Notion', 'Miro', 'Linear', 'Product Logic', 'UX Audit', 'QA Strategy'].map(skill => (
                    <motion.span 
                      key={skill} 
                      className="skill-pill-editorial"
                      whileHover={{ scale: 1.1, backgroundColor: '#C5EBAB', color: '#000' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <footer className="editorial-final-footer">
              <motion.div 
                className="footer-line-accent"
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
              ></motion.div>
              <div className="final-actions">
                <a href="mailto:dafiashalom@gmail.com" className="email-link-narrative">dafiashalom@gmail.com</a>
                <motion.a 
                  href="/sacca_dafia-cv.pdf" 
                  download 
                  className="download-cta-narrative featured-cta"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(197, 235, 171, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} style={{ marginRight: '10px' }} />
                  Télécharger le CV (PDF)
                </motion.a>
              </div>
            </footer>

          </div>
        </div>
        
        <footer className="cv-minimal-footer no-print">
          <div className="container">
            <p>&copy; 2026 PortfoliO — SACCA DAFIA</p>
          </div>
        </footer>
      </div>
    );
  };

  if (currentView === 'cv') {
    return <CVView />;
  }

  if (currentView !== 'home') {
    return <CaseStudy id={currentView as 'asset-iq' | 'ehadj'} />;
  }

  return (
    <div className="app anim-fade-in">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo" onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer' }}>
            <img src="/imgs/Logo.png" alt="SACCA Dafia Logo" className="logo-img" />
          </div>
          
          <div className="nav-right">
            <div className="desktop-links hide-mobile">
              <a href="#about">À PROPOS</a>
              <a href="#services">SERVICES</a>
              <a href="#experience">EXPÉRIENCE</a>
              <a href="#projects">PROJETS</a>
              <a href="#saas">SAAS</a>
              <a href="#process">PROCESS</a>
            </div>
            <button onClick={openCalendly} className="pill-button outline hide-mobile" style={{ marginLeft: '15px' }}>ME CONTACTER</button>
            <button className="menu-icon hide-desktop" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
        <div className="mobile-links">
          <a href="#about" onClick={() => setIsMenuOpen(false)}>À propos</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)}>Expérience</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projets</a>
          <a href="#saas" onClick={() => setIsMenuOpen(false)}>SaaS</a>
          <a href="#process" onClick={() => setIsMenuOpen(false)}>Process</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <button 
            className="mobile-menu-cta" 
            onClick={(e) => { setIsMenuOpen(false); openCalendly(e); }} 
            style={{ marginTop: '20px', width: '100%', cursor: 'pointer' }}
          >
            Me contacter
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-main">
              <h1>
                <span className="hero-line">Je conçois des </span>
                <span className="hero-line">interfaces <span className="highlight">qui résolvent </span></span>
                <span className="hero-line highlight">de vrais problèmes</span>
              </h1>
              <p className="hero-subtitle">
                Product Designer spécialisé en UX, structuration produit et logique produit. Je structure les parcours, clarifie les interfaces et m&apos;assure que le design est aligné avec les objectifs business.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="pill-button primary">VOIR MES PROJETS</a>
                <button onClick={() => setCurrentView('cv')} className="pill-button outline">VOIR MON CV</button>
              </div>
            </div>
            <div className="hero-side">
              <p>
                J’aide à transformer des idées ou des produits existants en expériences simples, cohérentes et efficaces, alignées avec les objectifs business.
              </p>
            </div>
          </div>
        </div>
        <div className="hero-bg-glow"></div>
      </section>

      {/* About Section */}
      <section id="about" className="section light about">
        <div className="container">
          <div className="content-grid-2">
            <div className="content-left">
              <span className="section-number">01 / À propos</span>
              <h2>Ce que je fais vraiment</h2>
            </div>
            <div className="content-text">
              <p>
                Product Designer avec +3 ans d'expérience. Je conçois des SaaS B2B, applications mobiles et plateformes complexes, de la stratégie UX à la livraison finale. 
              </p>
              <p>
                Mon approche : allier vision produit et rigueur technique pour garantir des interfaces non seulement esthétiques, mais surtout utilisables, performantes et réellement prêtes à être livrées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section light services-section no-border-top">
        <div className="container">
          <div className="section-header">
            <span className="section-number">02 / Services</span>
            <h2>Mes Services</h2>
            <p className="section-subtitle">Une approche holistique du Product Design.</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><Zap size={32} /></div>
              <h3>Product Design (UX/UI)</h3>
              <p>Je conçois des interfaces qui guident l&apos;utilisateur sans effort : parcours clairs, hiérarchie lisible, interactions cohérentes avec la logique produit.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon"><Search size={32} /></div>
              <h3>Audit UX</h3>
              <p>J&apos;identifie les frictions dans un produit existant : points d&apos;abandon, incohérences de flow, interfaces qui créent de la confusion plutôt que de la clarté.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon"><Globe size={32} /></div>
              <h3>Stratégie Produit</h3>
              <p>Je traduis des besoins business en décisions de design : structuration du MVP, priorisation des fonctionnalités, alignement entre ce qu&apos;on construit et ce dont les utilisateurs ont besoin.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon"><CheckCircle size={32} /></div>
              <h3>Design System</h3>
              <p>Je crée des systèmes de composants cohérents qui permettent aux équipes de scaler le produit sans recréer les mêmes éléments à chaque sprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section dark experience-section">
        <div className="container">
          <div className="section-head-flex">
            <span className="section-index">03/</span>
            <span className="section-label">/ EXPÉRIENCE</span>
          </div>
          <div className="experience-header">
            <h2>Expérience</h2>
          </div>
          
          <div className="experience-list">
            <div className="experience-item">
              <div className="exp-time">
                <span className="exp-date">OCTOBRE 2025 — PRÉSENT</span>
                <div className="exp-dot purple"></div>
              </div>
              <div className="exp-content">
                <div className="exp-header-info">
                  <h3>Product Designer</h3>
                  <span className="exp-company">CACTUCE</span>
                </div>
                <div className="exp-main">
                  <div className="exp-description">
                    <p>Product Designer chez Cactuce, j’interviens sur la structuration et l’optimisation de produits complexes comme <strong>eHadj</strong> et <strong>Asset IQ</strong>. J’identifie les points de friction, définis la logique des parcours et supervise la phase de QA pour garantir une exécution fidèle à la vision produit.</p>
                  </div>
                  <div className="exp-footer">
                    <span className="exp-tag-label">POINTS CLÉS</span>
                    <div className="exp-tags">
                      <span className="exp-skill">Logique d'interfaces</span>
                      <span className="exp-skill">Analyse UX</span>
                      <span className="exp-skill">Design Haute-fidélité</span>
                      <span className="exp-skill">Supervision QA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-time">
                <span className="exp-date">FÉVRIER 2024 — SEPTEMBRE 2025</span>
                <div className="exp-dot blue"></div>
              </div>
              <div className="exp-content">
                <div className="exp-header-info">
                  <h3>Product Designer</h3>
                  <span className="exp-company">TRELLIX</span>
                </div>
                <div className="exp-main">
                  <div className="exp-description">
                    <p>Chez Trellix, j’ai évolué d’une approche design vers une approche produit plus structurée, en travaillant sur les intégrations du programme de fidélité <strong>Beans</strong>.</p>
                    <p>Mon rôle ne se limitait pas à l’interface : j’intervenais sur la définition des fonctionnalités, la structuration des parcours utilisateurs et la cohérence globale du produit.</p>
                  </div>
                  <div className="exp-footer">
                    <span className="exp-tag-label">POINTS CLÉS</span>
                    <div className="exp-tags">
                      <span className="exp-skill">PRD & Specs</span>
                      <span className="exp-skill">Parcours Beans</span>
                      <span className="exp-skill">Coordination Dev</span>
                      <span className="exp-skill">Validation QA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-time">
                <span className="exp-date">AOÛT 2022 — FÉVRIER 2024</span>
                <div className="exp-dot yellow"></div>
              </div>
              <div className="exp-content">
                <div className="exp-header-info">
                  <h3>Web Designer</h3>
                  <span className="exp-company">CREAFIX</span>
                </div>
                <div className="exp-main">
                  <div className="exp-description">
                    <p>Mon parcours a débuté chez Creafix dans la conception digitale, avec un focus sur la création d’interfaces web et l’exécution visuelle.</p>
                    <p>J’ai travaillé sur la conception de sites web et d’interfaces en développant une attention particulière à la hiérarchie visuelle, à la lisibilité et à la cohérence graphique.</p>
                  </div>
                  <div className="exp-footer">
                    <span className="exp-tag-label">POINTS CLÉS</span>
                    <div className="exp-tags">
                      <span className="exp-skill">Visual Design</span>
                      <span className="exp-skill">Info Hierarchy</span>
                      <span className="exp-skill">Web Layouts</span>
                      <span className="exp-skill">Project Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section dark projects-section">
        <div className="container">
          <div className="section-header project-header">
            <span className="section-number">04 / Projets</span>
            <div className="title-with-badge">
              <h2>Projets sélectionnés</h2>
            </div>
            <p className="section-subtitle" style={{ marginTop: '16px', fontSize: '18px' }}>
              Une sélection de mes projets récents en design & développement.
            </p>
          </div>

          {/* Editorial Split Layout */}
          <div className="proj-showcase">
            {/* Left Panel */}
            <div className="proj-left">
              <div className="proj-counter">
                {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </div>
              <div className="proj-tags">
                <span className="proj-tag-pill">{projects[activeProject].role.toUpperCase()}</span>
                <span className="proj-tag-dot">—</span>
                <span className="proj-tag-accent" style={{ color: projects[activeProject].color }}>
                  {projects[activeProject].category.toUpperCase()}
                </span>
              </div>
              <h2 className="proj-title">{projects[activeProject].title}</h2>
              <p className="proj-desc">{projects[activeProject].description}</p>
              <div className="proj-techs">
                {projects[activeProject].techs.map((t, i) => (
                  <span key={i} className="proj-tech-pill">{t}</span>
                ))}
              </div>
              <a
                href={projects[activeProject].link}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-cta-circle"
              >
                <ArrowRight size={22} style={{ transform: 'rotate(-45deg)' }} />
              </a>
            </div>

            {/* Right Panel — Preview */}
            <div className="proj-right">
              <div className="proj-browser-frame">
                <div className="proj-browser-bar">
                  <span className="proj-browser-dot" />
                  <span className="proj-browser-dot" />
                  <span className="proj-browser-dot" />
                </div>
                <div className="proj-browser-screen">
                  <img
                    key={activeProject}
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    className="proj-screen-img"
                  />
                  <div className="proj-screen-index">
                    {String(activeProject + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Side counter */}
              <div className="proj-side-counter">
                {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="proj-nav">
              <button
                className="proj-nav-btn"
                onClick={() => setActiveProject(p => (p - 1 + projects.length) % projects.length)}
                aria-label="Projet précédent"
              >
                <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button
                className="proj-nav-btn"
                onClick={() => setActiveProject(p => (p + 1) % projects.length)}
                aria-label="Projet suivant"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="proj-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`proj-dot ${i === activeProject ? 'active' : ''}`}
                onClick={() => setActiveProject(i)}
                aria-label={`Voir projet ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Produits & SaaS Section */}
      <section id="saas" className="section light saas-section">
        <div className="container">
          <div className="section-header">
            <span className="section-number">05 / Focus</span>
            <h2>Produits & SaaS</h2>
          </div>
          
          <div className="saas-grid">
            <div className="saas-card ehadj" onClick={() => setCurrentView('ehadj')} style={{ cursor: 'pointer' }}>
              <div className="saas-content">
                <span className="saas-label">Process Orchestration</span>
                <h3>eHadj</h3>
                <p>Digitalisation de l&apos;organisation du pèlerinage : inscriptions, logistique, transports et flux financiers centralisés sur une seule plateforme.</p>
                <motion.div 
                  className="saas-btn featured-case-study"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VOIR L'ÉTUDE DE CAS <ExternalLink size={16} />
                </motion.div>
              </div>
            </div>

            <div className="saas-card advisor" onClick={() => setCurrentView('asset-iq')} style={{ cursor: 'pointer' }}>
              <div className="saas-content">
                <span className="saas-label">Product Design & Strategy</span>
                <h3>Asset IQ</h3>
                <p>Système intelligent de suivi et de gouvernance opérationnelle des ressources physiques.</p>
                <motion.div 
                  className="saas-btn featured-case-study"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VOIR L'ÉTUDE DE CAS <ExternalLink size={16} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process section light">
        <div className="container">
          <div className="section-header">
            <span className="section-number">06 / Process</span>
            <h2>Ma Méthodologie</h2>
          </div>
          <div className="process-list">
            {[
              { num: '01', title: 'Discovery', desc: 'Je commence par comprendre le produit, ses utilisateurs et les vraies contraintes business. Avant de toucher à Figma.' },
              { num: '02', title: 'UX Audit', desc: "Sur un produit existant, j'identifie les frictions, les incohérences de flow et les interfaces qui créent de la confusion." },
              { num: '03', title: 'Product Thinking', desc: "Je structure les parcours et définis la logique produit : qu'est-ce qui doit arriver en premier, pourquoi, et pour qui." },
              { num: '04', title: 'Design & Delivery', desc: "Je conçois les interfaces haute-fidélité, rédige les specs si nécessaire et suis l'implémentation jusqu'au QA final." }
            ].map((step, i) => (
              <div key={i} className="process-row">
                <div className="process-num-large">{step.num}</div>
                <div className="process-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <div className="process-arrow">
                  <ArrowRight size={32} strokeWidth={1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Call Section */}
      <section className="book-call-section section dark">
        <div className="container">
          <div className="book-call-header">
            <h2>Prêt à créer <span>ensemble ?</span></h2>
          </div>
          
          <div className="book-card-premium">
            <div className="book-card-left">
              <div className="book-icon-wrapper">
                <Calendar size={24} />
              </div>
              <span className="book-label">RÉSERVER UN APPEL</span>
              <h3>Réserver un appel</h3>
              <p>30 minutes pour discuter de votre projet, de vos besoins et voir comment je peux vous aider.</p>
            </div>
            
            <div className="book-card-right">
              <button 
                className="book-cta-circle" 
                onClick={openCalendly}
                title="Ouvrir Calendly"
              >
                <ArrowRight size={40} />
              </button>
            </div>
            
            <div className="book-card-footer">
              <div className="availability">
                <span className="dot"></span>
                Disponible pour de nouveaux projets
              </div>
              <span className="calendly-label">CALENDLY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Footer Section */}
      <footer className="final-footer section dark">
        <div className="container">
          <div className="footer-top-row">
            <div className="footer-huge-title">
              <h2>Un projet ? <br /><span>Parlons-en</span> ensemble.</h2>
            </div>
            <div className="footer-contact-info">
              <p>Transformons votre idée en réalité.</p>
              <a href="mailto:dafiashalom@gmail.com" className="footer-email-link">
                dafiashalom@gmail.com <ArrowRight size={20} />
              </a>
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
                <a href="#projects">Projets</a>
                <a href="#experience">Expérience</a>
                <a href="#about">À propos</a>
                <a href="#contact">Contact</a>
              </nav>
              <span className="copyright">© 2026 Sacca Dafia. Tous droits réservés.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
