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
  Mail
} from 'lucide-react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const projects = [
    { 
      title: 'Vortex', 
      type: 'Mobile App — Fuel Purchase',
      image: '/imgs/vortex.webp',
      description: "Application mobile d'achat de carburant et de gestion de portefeuille.",
      impact: 'Simplifier un acte transactionnel répété, souvent effectué en mobilité et sous contrainte de temps.',
      context: "Le contexte d'usage impose des parcours courts et des retours immédiats. Chaque étape superflue crée de l'abandon.",
      contribution: 'Architecture des flows utilisateurs, hiérarchisation des actions clés, réduction des étapes critiques.',
      cta: 'Voir le projet',
      link: 'https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel',
      color: '#FFD700'
    },
    { 
      title: 'Sport Advisor', 
      type: 'AI Sports Analysis Landing Page',
      image: '/imgs/advisor.webp',
      description: "Landing page pour une plateforme d'analyse sportive basée sur l'IA.",
      impact: "Rendre des données complexes (probabilités, statistiques) lisibles au premier coup d'œil.",
      context: "Le produit s'adresse à des parieurs et analysts qui ont besoin d'une lecture rapide et fiable de l'information.",
      contribution: "Structuration de la hiérarchie d'information, storytelling visuel, conception de l'interface de consultation.",
      cta: 'Voir le projet',
      link: 'https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive',
      color: '#00FA9A'
    },
    { 
      title: "Art du Bénin", 
      type: 'Mobile APK — Cultural Heritage',
      image: '/imgs/case study.webp',
      description: "Application Android de médiation culturelle autour du patrimoine artistique béninois.",
      impact: "Rendre un contenu culturel dense accessible et engageant pour un public non spécialiste.",
      context: "Conçue pour une exposition, l'app devait guider les visiteurs dans la découverte des œuvres sans remplacer l'expérience physique.",
      contribution: "Conception des parcours de découverte, design de l'interface de médiation, structure des contenus.",
      cta: 'Voir le projet',
      link: 'https://www.behance.net/gallery/229060431/Case-Study-Mobile-Apk-for-the-Art-of-Benin',
      color: '#A020F0'
    },
  ];

  const CaseStudy = ({ id }: { id: 'asset-iq' | 'ehadj' }) => {
    const data = id === 'asset-iq' ? {
      title: "AssetIQ",
      subtitle: "Gouvernance et pilotage intelligent des actifs physiques",
      label: "Product Design & Strategy",
      color: "var(--accent-yellow)",
      image: "/imgs/assetiQ_cs.jpg",
      context: "Dans un environnement industriel et corporate, la gestion des milliers d'équipements (IT, flottes, machines) souffre d'un manque de centralisation. Cette fragmentation génère des pertes d'actifs, des ruptures de service et un manque total de visibilité sur l'état réel des ressources.",
      challenge: "L'enjeu majeur était de transformer un inventaire passif en un outil de pilotage actif. Il fallait concevoir un système capable de suivre le cycle de vie complet d'un objet, tout en restant assez simple pour être adopté par des équipes terrain peu habituées aux outils complexes.",
      solution: "AssetIQ centralise chaque équipement dans un écosystème intelligent. Grâce à l'identification par QR Code et un tableau de bord analytique, les décideurs disposent d'une vision en temps réel : localisation, maintenance préventive, et historique d'assignation.",
      insight: "La réussite du projet n'est pas technologique, elle est ergonomique. En simplifiant la saisie de donnée sur le terrain, on garantit la fiabilité de la data pour la direction.",
      contextImg: "/imgs/assetiQ/tech2.jpg",
      challengeImg: "/imgs/assetiQ/military2.jpg",
      solutionImg: "/imgs/assetiQ/tech3.jpg",
      features: [
        { title: "Gouvernance à 360°", desc: "Suivi exhaustif de l'acquisition au déclassement définitif." },
        { title: "Identité Digitale", desc: "Génération de QR codes uniques pour un accès instantané aux fiches techniques." },
        { title: "Maintenance Pilotée", desc: "Planification des interventions et historique des réparations pour chaque actif." },
        { title: "Analyses & ROI", desc: "Rapports détaillés sur l'utilisation et la dépréciation du parc matériel." }
      ],
      impact: [
        "Réduction de 30% des pertes d'équipements",
        "Optimisation massive des coûts de maintenance",
        "Traçabilité totale des responsabilités individuelles",
        "Prise de décision basée sur des données de terrain fiables"
      ],
      conclusion: "AssetIQ redéfinit la gestion matérielle en passant d'un simple listing à une véritable gouvernance opérationnelle structurée.",
      externalLink: "https://www.assetiQ.com"
    } : {
      title: "eHadj",
      subtitle: "Orchestration digitale du parcours pèlerin",
      label: "Process Orchestration",
      color: "var(--accent-blue)",
      image: "/imgs/ehadj_cs.jpg",
      context: "L'organisation du pèlerinage est une entreprise logistique colossale impliquant des dizaines d'acteurs (agences, transporteurs, hébergeurs). Le manque de synchronisation entre ces entités génère traditionnellement une expérience complexe et opaque pour le pèlerin.",
      challenge: "Il fallait concevoir un système capable d'unifier des processus hétérogènes. Le défi était de créer une interface capable de gérer des flux de données massifs tout en offrant une simplicité d'usage pour des opérationnels multi-profils.",
      solution: "eHadj agit comme une couche d'orchestration globale. La plateforme centralise les inscriptions, la gestion des logements, les transports et les flux financiers, offrant une visibilité en temps réel sur chaque pèlerin et chaque groupe.",
      insight: "La digitalisation n'est utile que si elle simplifie l'humain. eHadj transforme une logistique subie en un parcours fluide et serein.",
      contextImg: "/imgs/ehadj/hadj2.png",
      challengeImg: "/imgs/ehadj/hadj.png",
      solutionImg: "/imgs/ehadj/hadj3.png",
      features: [
        { title: "Flux Unifié", desc: "Standardisation des processus d'inscription et de validation administrative." },
        { title: "Logistique Temps Réel", desc: "Allocation dynamique des ressources (bus, tentes) et suivi des cohortes." },
        { title: "Transparence Financière", desc: "Système de paiement intégré et suivi des transactions agences-pèlerins." },
        { title: "Support Opérationnel", desc: "Tableaux de bord dédiés pour les coordinateurs de terrain et les autorités." }
      ],
      impact: [
        "Élimination totale des doublons et des erreurs d'inscription",
        "Fluidité majeure dans la coordination multi-acteurs",
        "Expérience pèlerin sécurisée et sans friction",
        "Réduction drastique des temps de traitement administratif"
      ],
      conclusion: "eHadj n'est pas une simple application, c'est le moteur technologique d'un événement sacré à grande échelle.",
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

                <div className="cs-section" style={{ borderLeft: `4px solid ${data.color}`, paddingLeft: '30px', margin: '40px 0' }}>
                  <div className="cs-section-head">
                    <Zap size={20} color={data.color} strokeWidth={2.5} />
                    <h3>Challenge</h3>
                  </div>
                  <p>{data.challenge}</p>
                  {data.challengeImg && <img src={data.challengeImg} alt="Challenge" className="cs-inline-image" />}
                </div>

                <div className="cs-section">
                  <div className="cs-section-head">
                    <CheckCircle size={20} color={data.color} strokeWidth={2.5} />
                    <h3>Solution</h3>
                  </div>
                  <p>{data.solution}</p>
                  {data.solutionImg && <img src={data.solutionImg} alt="Solution" className="cs-inline-image" />}
                </div>

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
                <div className="cs-card insight-card">
                  <div className="cs-section-head">
                    <Search size={24} color={data.color} />
                    <h3>Insight Produit</h3>
                  </div>
                  <p>{data.insight}</p>
                </div>

                <div className="cs-card impact-card">
                  <div className="cs-section-head">
                    <ArrowRight size={24} color={data.color} />
                    <h3>Impact</h3>
                  </div>
                  <ul>
                    {data.impact.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="cs-divider">
              <div className="cs-dot" style={{ backgroundColor: data.color }}></div>
              <div className="cs-dot" style={{ backgroundColor: data.color }}></div>
              <div className="cs-dot" style={{ backgroundColor: data.color }}></div>
            </div>

            <div className="cs-footer">
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
              <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> Retour au portfolio
            </button>
            <div className="cv-nav-logo" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>Sacca Dafia</div>
          </div>
        </nav>

        <div className="container cv-container">
          {/* Smith Williams Style Header (Print Only) */}
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
                <div className="sw-skills-group">
                  <h3 className="sw-sub-label">PROFESSIONAL</h3>
                  <ul className="sw-bullet-list-small">
                    <li>Design Research</li>
                    <li>Interaction Design</li>
                    <li>Wireframing</li>
                    <li>User testing</li>
                    <li>Quality Assurance</li>
                  </ul>
                </div>
                <div className="sw-skills-group" style={{ marginTop: '20px' }}>
                  <h3 className="sw-sub-label">TOOLS</h3>
                  <ul className="sw-bullet-list-small">
                    <li>Figma</li>
                    <li>Illustrator</li>
                    <li>Notion</li>
                    <li>Miro</li>
                    <li>Linear</li>
                  </ul>
                </div>
              </div>

              <div className="sw-section">
                <h2 className="sw-label">EDUCATION</h2>
                <div className="sw-edu-item">
                  <span className="sw-date">2025</span>
                  <div className="sw-edu-info">
                    <div className="sw-title-sm">UX Design Professional</div>
                    <div className="sw-subtitle-sm">Google & Coursera</div>
                  </div>
                </div>
                <div className="sw-edu-item">
                  <span className="sw-date">2024</span>
                  <div className="sw-edu-info">
                    <div className="sw-title-sm">Design Thinking</div>
                    <div className="sw-subtitle-sm">Sèmè City (Cotonou)</div>
                  </div>
                </div>
                <div className="sw-edu-item">
                  <span className="sw-date">2023</span>
                  <div className="sw-edu-info">
                    <div className="sw-title-sm">Web Designer Certifié</div>
                    <div className="sw-subtitle-sm">EIGB (Cotonou)</div>
                  </div>
                </div>
              </div>
            </aside>

            <main className="sw-main">
              <div className="sw-section">
                <h2 className="sw-label">PROFILE</h2>
                <p className="sw-profile-text">
                  Product Designer alliant ambition créative et rigueur produit. Je transforme les problématiques complexes en solutions digitales fluides, en alliant vision stratégique et excellence visuelle. Ma méthodologie repose sur une compréhension profonde des besoins utilisateurs et une exécution minutieuse, de la recherche à la mise en production.
                </p>
              </div>

              <div className="sw-section">
                <h2 className="sw-label">EXPERIENCE</h2>
                <div className="sw-exp-timeline">
                  <div className="sw-exp-item">
                    <div className="sw-exp-header">
                      <h3 className="sw-exp-title">Product Designer</h3>
                      <span className="sw-exp-meta">Octobre 2025 — Présent | Cactuce — Cotonou, BÉNIN</span>
                    </div>
                    <ul className="sw-exp-bullets">
                      <li>Lead Product Designer sur **Asset IQ** (Gestion d'actifs physiques) et **eHadj** (Digitalisation du pèlerinage).</li>
                      <li>Accompagnement stratégique des start-ups dans la définition de leur MVP et l'optimisation de l'expérience utilisateur.</li>
                      <li>Mise en place de workflows de design itératif pour accélérer le "time-to-market".</li>
                    </ul>
                  </div>

                  <div className="sw-exp-item">
                    <div className="sw-exp-header">
                      <h3 className="sw-exp-title">Product Designer</h3>
                      <span className="sw-exp-meta">Février 2024 — Septembre 2025 | Trellix — Cotonou, BÉNIN</span>
                    </div>
                    <ul className="sw-exp-bullets">
                      <li>Leadership design sur le programme de fidélité Beans.</li>
                      <li>Rédaction de PRD, coordination technique et pilotage de la QA.</li>
                      <li>Transition stratégique du pure design vers des responsabilités de Product Management.</li>
                    </ul>
                  </div>

                  <div className="sw-exp-item">
                    <div className="sw-exp-header">
                      <h3 className="sw-exp-title">Web Designer</h3>
                      <span className="sw-exp-meta">Août 2022 — Février 2024 | Creafix — Cotonou, BÉNIN</span>
                    </div>
                    <ul className="sw-exp-bullets">
                      <li>Conception d'identités visuelles et d'interfaces web ergonomiques.</li>
                      <li>Garant de la cohérence graphique et de la hiérarchie informationnelle.</li>
                      <li>Optimisation des parcours conversion-centric pour divers clients.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Web Hero Header (Hidden in Print) */}
          <header className={`cv-hero no-print ${currentView === 'cv' ? 'anim-fade-in' : ''}`}>
            <div className="cv-profile-side">
              <div className="cv-photo-container">
                <img src="/imgs/cv-profile.jpg" alt="Sacca Dafia" className="cv-profile-img" />
              </div>
            </div>
            <div className="cv-info-side anim-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="cv-intro-badge">PRODUCT DESIGNER / WEB DESIGNER</span>
              <h1 className="cv-name">SACCA Dafia</h1>
              <div className="cv-contact-top no-print">
                <span>Cotonou, Bénin</span>
                <span>•</span>
                <a href="mailto:dafiashalom@gmail.com">dafiashalom@gmail.com</a>
                <span>•</span>
                <a href="tel:+2290160359022">+229 0160359022</a>
              </div>
              <p className="cv-bio">
                Product Designer alliant ambition créative et rigueur produit. Je transforme les problématiques complexes en solutions digitales fluides, en alliant vision stratégique et excellence visuelle.
              </p>
              <div className="cv-header-actions no-print">
                <a href="mailto:dafiashalom@gmail.com" className="pill-button primary">Me contacter</a>
                <a 
                  href="/sacca_dafia-cv.pdf" 
                  download="SACCA_Dafia_CV.pdf"
                  className="pill-button outline"
                >
                  Télécharger CV (PDF)
                </a>
              </div>
            </div>
          </header>

          <main className="cv-content-layout no-print anim-fade-up" style={{ animationDelay: '0.4s' }}>
            {/* Experience Section */}
            <section className="cv-main-section">
              <h2 className="section-label">Professional experiences</h2>
              <div className="cv-experience-timeline">
                <div className="cv-exp-card">
                  <div className="cv-exp-node">
                    <div className="cv-node-dot active"></div>
                  </div>
                  <div className="cv-exp-details">
                    <div className="cv-exp-header">
                      <h3>Product Designer</h3>
                      <span className="cv-company">Cactuce — Cotonou, BÉNIN</span>
                      <span className="cv-date">Octobre 2025 — Présent</span>
                    </div>
                    <ul className="cv-bullet-list">
                      <li>Lead Product Designer sur **Asset IQ** (Gestion d'actifs physiques) et **eHadj** (Digitalisation du pèlerinage).</li>
                      <li>Accompagnement stratégique des start-ups dans la définition de leur MVP et l'optimisation de l'expérience utilisateur.</li>
                      <li>Mise en place de workflows de design itératif pour accélérer le "time-to-market".</li>
                    </ul>
                  </div>
                </div>

                <div className="cv-exp-card no-break">
                  <div className="cv-exp-node">
                    <div className="cv-node-dot"></div>
                  </div>
                  <div className="cv-exp-details">
                    <div className="cv-exp-header">
                      <h3>Product Designer</h3>
                      <span className="cv-company">Trellix — Cotonou, BÉNIN</span>
                      <span className="cv-date">Février 2024 — Septembre 2025</span>
                    </div>
                    <ul className="cv-bullet-list">
                      <li>Leadership design sur le programme de fidélité Beans.</li>
                      <li>Rédaction de PRD, coordination technique et pilotage de la QA.</li>
                      <li>Transition stratégique du pure design vers des responsabilités de Product Management.</li>
                    </ul>
                  </div>
                </div>

                <div className="cv-exp-card no-break">
                  <div className="cv-exp-node">
                    <div className="cv-node-dot"></div>
                  </div>
                  <div className="cv-exp-details">
                    <div className="cv-exp-header">
                      <h3>Web Designer</h3>
                      <span className="cv-company">Creafix — Cotonou, BÉNIN</span>
                      <span className="cv-date">Août 2022 — Février 2024</span>
                    </div>
                    <ul className="cv-bullet-list">
                      <li>Conception d'identités visuelles et d'interfaces web ergonomiques.</li>
                      <li>Garant de la cohérence graphique et de la hiérarchie informationnelle.</li>
                      <li>Optimisation des parcours conversion-centric pour divers clients.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Education & Skills Grid */}
            <div className="cv-grid-layout anim-fade-up" style={{ animationDelay: '0.6s' }}>
              <div className="cv-grid-col">
                <section className="cv-sub-section">
                  <h2 className="section-label">Education</h2>
                  <div className="cv-edu-timeline">
                    <div className="cv-edu-item">
                      <div className="cv-edu-node"></div>
                      <div className="cv-edu-content">
                        <strong>UX Design Professional Certificate</strong>
                        <span>Google & Coursera</span>
                        <span className="cv-badge">2025</span>
                      </div>
                    </div>
                    <div className="cv-edu-item">
                      <div className="cv-edu-node"></div>
                      <div className="cv-edu-content">
                        <strong>Design Thinking Attestation</strong>
                        <span>Sèmè City (Cotonou)</span>
                        <span className="cv-badge">2024</span>
                      </div>
                    </div>
                    <div className="cv-edu-item">
                      <div className="cv-edu-node"></div>
                      <div className="cv-edu-content">
                        <strong>Web Designer Certifié</strong>
                        <span>École Int. de Graphisme du Bénin</span>
                        <span className="cv-badge">Mai 2023</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="cv-grid-col">
                <section className="cv-sub-section">
                  <h2 className="section-label">Skills</h2>
                  <div className="cv-pills-container">
                    {['Design Research', 'Product research', 'Interaction Design', 'Competition analysis', 'Wireframing', 'Quality assurance'].map(skill => (
                      <span key={skill} className="cv-pill">{skill}</span>
                    ))}
                  </div>
                </section>

                <section className="cv-sub-section">
                  <h2 className="section-label">Tools</h2>
                  <div className="cv-pills-container">
                    {['Figma', 'Illustrator', 'Notion', 'Miro', 'Linear'].map(tool => (
                      <span key={tool} className="cv-pill tool">{tool}</span>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Quote Banner */}
            <section className="cv-quote-banner anim-fade-up" style={{ animationDelay: '0.8s' }}>
              <div className="cv-quote-card">
                <p className="cv-quote-text">
                  "L'excellence du design ne réside pas seulement dans l'esthétique, mais dans sa capacité à résoudre des problèmes réels de manière invisible et efficace."
                </p>
                <span className="cv-quote-author">— Sacca Dafia, Product Designer</span>
              </div>
            </section>

            {/* Contact Section */}
            <section className="cv-footer-contact no-print" id="contact">
              <h2 className="section-label">Contact me</h2>
              <div className="cv-contact-links">
                <div className="cv-contact-card">
                  <span className="contact-label">Email</span>
                  <a href="mailto:dafiashalom@gmail.com">dafiashalom@gmail.com</a>
                </div>
                <div className="cv-contact-card">
                  <span className="contact-label">Téléphone</span>
                  <a href="tel:+2290160359022">+229 0160359022</a>
                </div>
                <div className="cv-contact-card">
                  <span className="contact-label">Social</span>
                  <div className="cv-social-links">
                    <a href="https://linkedin.com">In</a>
                    <a href="https://behance.net">Be</a>
                  </div>
                </div>
              </div>
            </section>
          </main>
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
              <a href="#about">À propos</a>
              <a href="#services">Services</a>
              <a href="#experience">Expérience</a>
              <a href="#projects">Projets</a>
              <a href="#saas">SaaS</a>
              <a href="#process">Process</a>
            </div>
            <a href="mailto:dafiashalom@gmail.com" className="pill-button outline hide-mobile" style={{ marginLeft: '15px' }}>Me contacter</a>
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
          <a href="mailto:dafiashalom@gmail.com" className="pill-button primary mobile-menu-cta" onClick={() => setIsMenuOpen(false)} style={{ marginTop: '30px', width: '100%', textAlign: 'center' }}>
            Me contacter
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-main">
              <h1>
                Je conçois des interfaces <span className="highlight">qui résolvent de vrais problèmes</span>
              </h1>
              <p className="hero-subtitle">
                Product Designer spécialisé en UX, structuration produit et logique produit. Je structure les parcours, clarifie les interfaces et m&apos;assure que le design est aligné avec les objectifs business.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="pill-button primary">Voir mes projets</a>
                <button onClick={() => setCurrentView('cv')} className="pill-button outline">Voir mon CV</button>
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
          <div className="section-header">
            <span className="section-number">01 / À propos</span>
          </div>
          <div className="content-grid-2">
            <h2>Ce que je fais vraiment</h2>
            <div className="content-text">
              <p>
                Je suis Product Designer avec plus de 5 ans d'expérience sur des produits réels : SaaS B2B, applications mobiles, plateformes de gestion. Mon travail va de la définition du flow à la livraison finale, en passant par la rédaction de specs et le suivi QA.
              </p>
              <p>
                J’interviens sur des produits à différents stades : conception de MVP, amélioration d’interfaces existantes et optimisation des parcours utilisateurs.
              </p>
              <p>
                Ce qui me distingue : je lis un produit comme un Product Manager. Je ne fais pas que le rendre beau. Je m'assure qu'il est compréhensible, utilisable et aligné sur ce que l'équipe peut livrer.
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
            <span className="section-label">/ Expérience</span>
          </div>
          <div className="experience-header">
            <h2>Expérience</h2>
          </div>
          
          <div className="experience-list">
            <div className="experience-item">
              <div className="exp-left">
                <div className="exp-dot purple"></div>
                <div className="exp-role">
                  <h3>Product Designer</h3>
                  <span className="exp-company">Cactuce</span>
                </div>
              </div>
              <div className="exp-right">
                <div className="exp-narrative">
                  <p>Chez Cactuce, j’approfondis mon rôle de Product Designer avec une approche orientée système et impact produit. J’interviens sur des produits comme <strong>eHadj</strong> et <strong>Asset IQ</strong>, avec un focus sur la structuration des expériences et l’amélioration de produits existants.</p>
                  <p>Mon rôle consiste à analyser les produits pour identifier les points de friction, structurer les parcours utilisateurs et la logique produit, tout en concevant des interfaces claires et cohérentes. J’accompagne les équipes jusqu’à la phase de QA pour garantir une exécution fidèle à la vision produit.</p>
                </div>
                <div className="exp-points">
                  <span className="exp-tag">Points clés :</span>
                  <ul className="exp-ul">
                    <li>Définition des flows et de la logique des interfaces</li>
                    <li>Analyse UX et identification des frictions utilisateurs</li>
                    <li>Conception haute-fidélité sur Figma</li>
                    <li>Suivi d'implémentation et QA avec les équipes dev</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-left">
                <div className="exp-dot blue"></div>
                <div className="exp-role">
                  <h3>Product Designer</h3>
                  <span className="exp-company">Trellix</span>
                </div>
              </div>
              <div className="exp-right">
                <div className="exp-narrative">
                  <p>Chez Trellix, j’ai évolué d’une approche design vers une approche produit plus structurée, en travaillant sur les intégrations du programme de fidélité <strong>Beans</strong>.</p>
                  <p>Mon rôle ne se limitait pas à l’interface : j’intervenais sur la définition des fonctionnalités, la structuration des parcours utilisateurs et la cohérence globale du produit.</p>
                  <p>J’ai également participé à la rédaction de PRD, à la coordination avec les équipes techniques et à la supervision des phases de QA afin d’assurer une implémentation fidèle aux intentions produit.</p>
                </div>
                <div className="exp-points">
                  <span className="exp-tag">Points clés :</span>
                  <ul className="exp-ul">
                    <li>Définition des fonctionnalités et rédaction de PRD</li>
                    <li>Conception des parcours et interfaces du programme Beans</li>
                    <li>Coordination technique et alignement équipe dev/design</li>
                    <li>Supervision QA et validation de l'implémentation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-left">
                <div className="exp-dot yellow"></div>
                <div className="exp-role">
                  <h3>Web Designer</h3>
                  <span className="exp-company">Creafix</span>
                </div>
              </div>
              <div className="exp-right">
                <div className="exp-narrative">
                  <p>Mon parcours a débuté chez Creafix dans la conception digitale, avec un focus sur la création d’interfaces web et l’exécution visuelle.</p>
                  <p>J’ai travaillé sur la conception de sites web et d’interfaces en développant une attention particulière à la hiérarchie visuelle, à la lisibilité et à la cohérence graphique. Cette expérience m’a permis de poser des bases solides du design : compréhension des layouts, gestion des contenus et importance de la clarté dans l’interface.</p>
                </div>
                <div className="exp-points">
                  <span className="exp-tag">Acquis :</span>
                  <ul className="exp-ul">
                    <li>Fondamentaux du design visuel et de la mise en page</li>
                    <li>Hiérarchie de l'information et structuration des contenus</li>
                    <li>Lisibilité, cohérence graphique et respect des contraintes client</li>
                    <li>Première exposition à la livraison de projets réels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section dark projects-section">
        <div className="container">
          <div className="section-head-flex">
            <span className="section-index">04/</span>
            <span className="section-label">/ Projets</span>
          </div>
          <div className="content-grid-2">
            <h2>Projets sélectionnés</h2>
            <div className="content-side-cta">
               <div className="rotating-badge">
                  <svg viewBox="0 0 100 100">
                    <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" id="badge-circle" fill="transparent" />
                    <text>
                      <textPath xlinkHref="#badge-circle">
                         SACCA DAFIA — PRODUCT DESIGNER — 
                      </textPath>
                    </text>
                  </svg>
                </div>
            </div>
          </div>

          <div className="horizontal-scroll-container">
            {projects.map((project, index) => (
              <div key={index} className="work-card">
                <div className="work-img-wrapper">
                  <img src={project.image} alt={project.title} />
                  <div className="work-hover-overlay">
                    <button 
                      onClick={() => {
                        if (project.link) {
                          window.open(project.link, '_blank');
                        } else if (project.cta === 'Voir le case study') {
                          setCurrentView('asset-iq');
                        }
                      }}
                      className="pill-button light sm"
                    >
                      {project.cta}
                    </button>
                  </div>
                </div>
                <div className="work-info">
                  <div className="work-header">
                    <span className="work-type" style={{ color: project.color }}>{project.type}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="work-details">
                    <p className="work-desc">{project.description}</p>
                    <p className="work-impact-phrase">“{project.impact}”</p>
                    <div className="work-points">
                      <p><strong>Contexte :</strong> {project.context}</p>
                      <p><strong>Contribution :</strong> {project.contribution}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (project.link) {
                          window.open(project.link, '_blank');
                        } else if (project.cta === 'Voir le case study') {
                          setCurrentView('asset-iq');
                        }
                      }}
                      className="pill-button primary sm"
                      style={{ marginTop: '30px', width: 'fit-content' }}
                    >
                      {project.cta}
                    </button>
                  </div>
                </div>
              </div>
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
                <div className="saas-btn">
                  Voir le Case Study <ExternalLink size={16} />
                </div>
              </div>
            </div>

            <div className="saas-card advisor" onClick={() => setCurrentView('asset-iq')} style={{ cursor: 'pointer' }}>
              <div className="saas-content">
                <span className="saas-label">Product Design & Strategy</span>
                <h3>Asset IQ</h3>
                <p>Système intelligent de suivi et de gouvernance opérationnelle des ressources physiques.</p>
                <div className="saas-btn">
                  Découvrir le Case Study <ExternalLink size={16} />
                </div>
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
                  <ArrowRight size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer-framer">
        <div className="container" id="contact">
          <div className="footer-top">
            <div className="footer-contact-info">
              <span className="footer-label">Parlons de votre projet</span>
              <a href="mailto:dafiashalom@gmail.com" className="footer-email">dafiashalom@gmail.com</a>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <span className="col-label">Social</span>
                <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer">Behance</a>
              </div>
              <div className="footer-col">
                <span className="col-label">Navigation</span>
                <a href="#about">À propos</a>
                <a href="#services">Services</a>
                <a href="#experience">Expérience</a>
                <a href="#projects">Projets</a>
                <a href="#saas">SaaS</a>
                <a href="#process">Process</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-logo-wrapper">
              <img src="/imgs/Logo-footer.png" alt="SACCA DAFIA Logo" className="footer-big-logo-img" />
            </div>
            <div className="footer-meta">
              <div className="meta-left">
                <p>&copy; 2026 PORTFOLIO — PRODUCT DESIGNER</p>
              </div>
              <div className="meta-right">
                <p>DESIGN & CODE BY SACCA DAFIA</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
