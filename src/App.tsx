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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   ILLUSTRATION SVG COMPONENTS (inline, animated)
   Icon.svg  → 8-point star
   shape.svg → flower/petal bloom
   svgexport-5.svg → organic cross/orb
───────────────────────────────────────────── */
const IlluStar = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 116 116" xmlns="http://www.w3.org/2000/svg" fill="none" className={`illu-svg ${className}`}>
    <path fill="currentColor" d="m58 0 1.865 53.499 39.147-36.511-36.51 39.148L116 58l-53.499 1.865 36.511 39.147-39.147-36.51L58 116l-1.864-53.499-39.148 36.511 36.51-39.147L0 58l53.499-1.864-36.511-39.148 39.148 36.51L58 0Z"/>
  </svg>
);

const IlluShape = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" fill="none" className={`illu-svg ${className}`}>
    <path fill="currentColor" d="M75 0c2.546 40.32 34.68 72.454 75 75-40.32 2.546-72.454 34.68-75 75-2.546-40.32-34.68-72.454-75-75 40.32-2.546 72.454-34.68 75-75Z"/>
  </svg>
);

const IlluOrb = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" fill="none" className={`illu-svg ${className}`}>
    <path fill="currentColor" d="M29 58C28.16 30.526 27.474 29.844 0 29 27.474 28.16 28.156 27.474 29 0c.84 27.474 1.526 28.156 29 29-28.474.84-29.156 1.526-29 29Z"/>
  </svg>
);

// Custom Geometric SVG Icons for the Services Expanding columns
const ServiceIcon01 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="25" y="10" width="50" height="80" rx="4" />
    <line x1="25" y1="20" x2="75" y2="20" />
    <circle cx="50" cy="15" r="2" />
    <circle cx="50" cy="82" r="3" />
    <rect x="33" y="28" width="34" height="20" />
    <circle cx="50" cy="38" r="4" />
    <line x1="33" y1="56" x2="67" y2="56" />
    <line x1="33" y1="64" x2="57" y2="64" />
    <line x1="33" y1="72" x2="47" y2="72" />
  </svg>
);

const ServiceIcon02 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="30" cy="30" r="5" />
    <circle cx="70" cy="35" r="5" />
    <circle cx="45" cy="70" r="5" />
    <line x1="34" y1="31" x2="66" y2="34" />
    <line x1="42" y1="66" x2="32" y2="34" />
    <line x1="68" y1="38" x2="48" y2="67" />
    <circle cx="60" cy="55" r="16" stroke="var(--pentos-lime)" strokeWidth="1.8" />
    <line x1="71" y1="66" x2="88" y2="83" stroke="var(--pentos-lime)" strokeWidth="1.8" />
  </svg>
);

const ServiceIcon03 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M50 15 L85 35 L85 75 L50 95 L15 75 L15 35 Z" />
    <line x1="50" y1="15" x2="50" y2="95" />
    <line x1="15" y1="35" x2="50" y2="55" />
    <line x1="85" y1="35" x2="50" y2="55" />
    <circle cx="50" cy="55" r="3" fill="var(--pentos-lime)" />
    <path d="M25 60 L45 75 L75 45" stroke="var(--pentos-lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="75,45 67,46 73,53" fill="var(--pentos-lime)" />
  </svg>
);

const ServiceIcon04 = () => (
  <svg viewBox="0 0 100 100" className="service-svg-illustration" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M30 35 L12 50 L30 65" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M70 35 L88 50 L70 65" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="55" y1="30" x2="45" y2="70" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="20" cy="20" r="2" fill="var(--pentos-lime)" />
    <circle cx="80" cy="80" r="2" fill="var(--pentos-lime)" />
    <circle cx="85" cy="25" r="2.5" />
    <circle cx="15" cy="75" r="2.5" />
  </svg>
);

const serviceIcons = [ServiceIcon01, ServiceIcon02, ServiceIcon03, ServiceIcon04];

interface CaseStudyData {
  title: string;
  subtitle: string;
  label: string;
  color: string;
  bgImage: string;
  context: string;
  contextTitle?: string;
  contextImg?: string;
  problem?: string;
  problemTitle?: string;
  challenge: string;
  challengeTitle?: string;
  challengeImg: string;
  decisions?: Array<{ title: string; desc: string; why: string }>;
  solution: string;
  solutionTitle?: string;
  uxSolutions?: string;
  dashboardImg: string;
  features: Array<{ title: string; desc: string }>;
  insight: string;
  impact: string[];
  conclusion: string;
  externalLink?: string;
}

const CaseStudy = ({ 
  id, 
  mousePos, 
  setCurrentView 
}: { 
  id: 'asset-iq' | 'ehadj' | 'sagana' | 'vortex' | 'sport-advisor' | 'forum-grandes-ecoles' | 'tavares', 
  mousePos: { x: number, y: number }, 
  setCurrentView: any 
}) => {
  const caseStudiesData: Record<typeof id, CaseStudyData> = {
    'asset-iq': {
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
    },
    'ehadj': {
      title: "eHadj",
      subtitle: "Orchestration digitale du pèlerinage au Bénin",
      label: "Product Design & Strategy",
      color: "#C9F31D", // Lime green
      bgImage: "/imgs/ehadj_cs.jpg",
      context: "L'eHadj est piloté par l'Agence pour la Gestion de la Logistique des Officiels (AGLO). Avant eHadj, le système reposait sur des processus manuels et fragmentés, entraînant des erreurs de quotas et de visas.",
      problem: "Le système reposait sur des processus manuels. Les erreurs de saisie sur 2300 dossiers créaient des doublons et des blocages de visas critiques au niveau national.",
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
      contextImg: "/imgs/ehadj/hadj2.png",
      challengeImg: "/imgs/ehadj/hadj.png",
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
    },
    'sagana': {
      title: "Sagana",
      subtitle: "Identité et performance web pour une agence digitale premium",
      label: "Creative Direction & Web Development",
      color: "#DFFF00",
      bgImage: "/imgs/sagana.png",
      context: "Sagana est une agence digitale premium qui avait besoin d'un site web à la hauteur de son positionnement haut de gamme. Le site existant manquait de fluidité, d'impact visuel et de conversion.",
      contextTitle: "Le positionnement d'une marque haut de gamme.",
      challenge: "Créer une expérience de marque immersive avec des animations sophistiquées sans sacrifier les performances de chargement et le référencement naturel (SEO).",
      challengeTitle: "Allier esthétique premium et performance pure.",
      challengeImg: "/imgs/sagana.png",
      decisions: [
        {
          title: "Micro-animations fluides",
          desc: "Intégration d'animations interactives sur les survols de cartes et les transitions de pages.",
          why: "Renforce le sentiment de qualité premium et de maîtrise technique."
        },
        {
          title: "Dark Mode par défaut",
          desc: "Palette sombre accentuée par des touches néon pour un style moderne et technologique.",
          why: "Donne une impression de modernité immédiate et réduit la fatigue oculaire."
        }
      ],
      solution: "Une architecture basée sur React et Framer Motion, optimisant chaque transition. Le site utilise des techniques de chargement progressif pour offrir une fluidité absolue.",
      solutionTitle: "Optimisation de bout en bout et Framer Motion.",
      dashboardImg: "/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png",
      features: [
        { title: "Animations 60fps", desc: "Transitions fluides basées sur Framer Motion et CSS transitions." },
        { title: "Performance brute", desc: "Score Lighthouse de 95+ grâce à l'optimisation des images et du code." },
        { title: "SEO Structuré", desc: "Balisage sémantique rigoureux pour maximiser la visibilité organique." },
        { title: "Responsive Adaptatif", desc: "Mise en page fluide adaptée à tous les types d'écrans." }
      ],
      insight: "La performance est un élément de design. Un site esthétique mais lent perd ses visiteurs avant même qu'ils ne voient les visuels.",
      impact: [
        "Augmentation de 40% du temps passé sur le site",
        "Hausse de 25% des demandes de contact qualifiées",
        "Une image de marque renforcée et alignée avec le positionnement premium"
      ],
      conclusion: "Sagana dispose désormais d'un site vitrine d'excellence qui fait écho à la qualité de ses services et attire des clients haut de gamme.",
      externalLink: "https://www.sagana-agency.com/"
    },
    'vortex': {
      title: "Vortex",
      subtitle: "Application mobile d'achat de carburant et de gestion de portefeuille",
      label: "Product Design & UX Research",
      color: "#FFD700",
      bgImage: "/imgs/vortex.webp",
      context: "L'approvisionnement en carburant pour les flottes et particuliers en mobilité manque de fluidité. L'attente en station et la gestion de la facturation papier génèrent des frictions importantes.",
      contextTitle: "Les frictions logistiques de l'approvisionnement en carburant.",
      challenge: "Simplifier le parcours d'achat de carburant en le réduisant à quelques clics directement depuis le volant, tout en intégrant un portefeuille numérique sécurisé.",
      challengeTitle: "Concevoir pour un usage rapide en situation de mobilité.",
      challengeImg: "/vortex_preview.png",
      decisions: [
        {
          title: "Boutons d'action agrandis",
          desc: "Agrandissement des cibles de clic de 30% par rapport aux standards mobiles.",
          why: "Évite les erreurs de saisie lorsque l'utilisateur est pressé ou en extérieur."
        },
        {
          title: "Mode Haute Clarté",
          desc: "Sélection de couleurs à haut contraste avec un fond sombre optimisé pour l'extérieur.",
          why: "Garantit la lisibilité de l'écran même en plein soleil en station-service."
        }
      ],
      solution: "Vortex propose une interface épurée avec un onboarding rapide et une intégration de wallet. Le design met l'accent sur les contrastes élevés et de grands boutons d'action adaptés.",
      solutionTitle: "Interface mobile contrastée et accès en un clic.",
      dashboardImg: "/imgs/vortex.webp",
      features: [
        { title: "Paiement en 1-Clic", desc: "Achat instantané de carburant via le wallet sécurisé intégré." },
        { title: "QR Code Station", desc: "Génération de codes de validation rapides pour les terminaux de pompes." },
        { title: "Reçus Automatiques", desc: "Génération et envoi automatique des factures dématérialisées." },
        { title: "Suivi Consommation", desc: "Historique clair des dépenses et analyses des volumes consommés." }
      ],
      insight: "En situation de mobilité (conduite, station-service), l'attention de l'utilisateur est divisée. L'interface doit être conçue pour être lue et actionnée en moins de 3 secondes.",
      impact: [
        "Temps de transaction divisé par 3 en station",
        "Taux d'onboarding réussi de 92% dès la première tentative",
        "Adoption massive par les gestionnaires de flottes de véhicules"
      ],
      conclusion: "Vortex transforme la corvée de la station-service en un parcours digital fluide, sécurisé et extrêmement rapide.",
      externalLink: "https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel"
    },
    'sport-advisor': {
      title: "Sport Advisor",
      subtitle: "Plateforme d'analyse et de pronostics sportifs basés sur l'IA",
      label: "Product Design & Visual Strategy",
      color: "#00FA9A",
      bgImage: "/imgs/advisor.webp",
      context: "Les plateformes d'analyses sportives souffrent d'une surcharge d'informations. La profusion de statistiques brutes, de graphiques complexes et de cotes rend la prise de décision confuse et intimidante.",
      contextTitle: "La surcharge cognitive dans la visualisation de données sportives.",
      challenge: "Organiser une quantité massive de données statistiques temps réel dans une hiérarchie visuelle intuitive, et concevoir un storytelling montrant la valeur des analyses IA.",
      challengeTitle: "Simplifier des statistiques complexes pour tous.",
      challengeImg: "/sport_advisor_preview.png",
      decisions: [
        {
          title: "Visualisation par jauge",
          desc: "Remplacement des tableaux de chiffres bruts par des jauges de probabilité colorées.",
          why: "Permet une lecture instantanée de la tendance d'un match."
        },
        {
          title: "Filtres Contextuels",
          desc: "Système de filtres par pertinence, sport, et fiabilité des pronostics.",
          why: "Aide les utilisateurs à trouver rapidement les opportunités clés."
        }
      ],
      solution: "Une interface structurée sous forme de tableaux clairs, avec des indicateurs de confiance basés sur l'IA (en pourcentages) et des graphiques épurés facilitant la comparaison.",
      solutionTitle: "Storytelling visuel et indicateurs de confiance IA.",
      dashboardImg: "/imgs/advisor.webp",
      features: [
        { title: "Moteur de Prédiction", desc: "Recommandations quotidiennes générées par des modèles de deep learning." },
        { title: "Comparateur de Cotes", desc: "Intégration en temps réel des meilleures cotes du marché." },
        { title: "Alertes de Confiance", desc: "Notifications push lorsque des anomalies de cotes sont détectées par l'IA." },
        { title: "Stats Comparatives", desc: "Historique des face-à-face et formes des équipes visualisés simplement." }
      ],
      insight: "L'IA ne doit pas juste donner une réponse, elle doit expliquer son raisonnement de manière visuelle et transparente pour créer de la confiance.",
      impact: [
        "Augmentation de 50% du taux d'engagement des utilisateurs",
        "Une lisibilité des données saluée par les bêta-testeurs",
        "Une conversion d'abonnés Premium en hausse de 35%"
      ],
      conclusion: "Sport Advisor simplifie la donnée sportive complexe en la rendant accessible, interactive et actionnable grâce au design.",
      externalLink: "https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive"
    },
    'forum-grandes-ecoles': {
      title: "Forum Grandes Écoles",
      subtitle: "Plateforme d'orientation académique et d'inscription événementielle",
      label: "Fullstack Development & UX",
      color: "#E63946",
      bgImage: "/imgs/forum.png",
      context: "L'organisation d'un forum étudiant physique implique une logistique complexe : gestion des stands, plannings des conférences, inscriptions et transmission des données de contact.",
      contextTitle: "La logistique des événements étudiants à grande échelle.",
      challenge: "Créer une plateforme numérique capable de gérer l'inscription de milliers d'étudiants, de centraliser le calendrier des présentations et de faciliter la collecte de CV.",
      challengeTitle: "Garantir la stabilité sous charge et simplifier les flux.",
      challengeImg: "/imgs/forum.png",
      decisions: [
        {
          title: "Agenda Personnalisé",
          desc: "Permettre à l'étudiant de composer son propre programme de conférences.",
          why: "Évite les conflits d'horaires et maximise la participation aux événements."
        },
        {
          title: "Badges QR Code",
          desc: "Génération d'un pass étudiant avec QR code pour un scan rapide à l'entrée.",
          why: "Réduit le temps d'attente à l'entrée du forum physique de 80%."
        }
      ],
      solution: "Développement d'une application web sous Next.js avec un système d'authentification robuste, un agenda dynamique et interactif, et un module d'exportation de CV pour les écoles.",
      solutionTitle: "Application Next.js avec base de données relationnelle et QR code.",
      dashboardImg: "/imgs/forum.png",
      features: [
        { title: "Inscription Simplifiée", desc: "Flow d'inscription en moins d'une minute avec intégration de profil." },
        { title: "Calendrier Dynamique", desc: "Suivi en temps réel des horaires et des places disponibles en conférences." },
        { title: "Espace Écoles", desc: "Dashboard dédié aux écoles pour collecter les candidatures et CV." },
        { title: "Notifications SMS", desc: "Rappels automatiques avant le début des sessions réservées." }
      ],
      insight: "L'expérience événementielle se prépare avant, se vit pendant et se prolonge après. La plateforme doit accompagner l'utilisateur à chaque étape de ce cycle.",
      impact: [
        "Plus de 5000 inscriptions d'étudiants gérées sans bug",
        "Temps d'attente à l'entrée réduit à moins de 5 secondes par personne",
        "Une fluidité d'échange de contacts saluée par 100% des écoles"
      ],
      conclusion: "La plateforme a modernisé l'expérience du forum, facilitant l'accès à l'information et sécurisant les inscriptions à grande échelle.",
      externalLink: "https://forum-grandes-ecoles.vercel.app/"
    },
    'tavares': {
      title: "Tavares",
      subtitle: "Portfolio cinématographique interactif pour réalisateur",
      label: "Creative Web Design & Development",
      color: "#E50914",
      bgImage: "/imgs/tavares.png",
      context: "Le réalisateur Tavares recherchait un portfolio numérique unique, capable de refléter son univers cinématographique. Les portfolios traditionnels surchargent l'interface, détournant l'attention des vidéos.",
      contextTitle: "Sublimer le travail cinématographique sans distraction.",
      challenge: "Créer un site web ultra-minimaliste et moderne, servant d'écrin esthétique et fluide, où l'interface s'efface pour laisser les projets et les vidéos être le point focal unique.",
      challengeTitle: "Concevoir une interface invisible au service de l'image.",
      challengeImg: "/imgs/tavares.png",
      decisions: [
        {
          title: "Lecteur plein écran",
          desc: "Ouverture des vidéos en immersion totale (light box) au clic.",
          why: "Permet d'apprécier la qualité cinématographique sans distraction."
        },
        {
          title: "Transitions fluides",
          desc: "Micro-animations basées sur le défilement et le survol.",
          why: "Crée un rythme visuel rappelant le montage de films."
        }
      ],
      solution: "Un site web épuré avec des transitions fluides, un chargement vidéo optimisé, et un lecteur vidéo immersif intégré. L'identité graphique repose sur une typographie forte et un design noir absolu.",
      solutionTitle: "Espace immersif, streaming optimisé et contrastes intenses.",
      dashboardImg: "/imgs/tavares.png",
      features: [
        { title: "Showreel Immersif", desc: "Bande-démo jouée en arrière-plan avec contrôle du son discret." },
        { title: "Galerie de projets", desc: "Mise en page asymétrique mettant en valeur les affiches de films." },
        { title: "Optimisation vidéo", desc: "Streaming vidéo fluide adapté aux connexions mobiles." },
        { title: "Contact direct", desc: "Formulaire de contact épuré pour la production et les collaborations." }
      ],
      insight: "Dans le domaine créatif, l'interface doit servir le contenu et non l'inverse. L'invisibilité du design est sa plus grande force.",
      impact: [
        "Engagement accru des producteurs sur le portfolio",
        "Temps de lecture moyen de la bande-démo supérieur à 70%",
        "Une identité numérique forte qui se démarque dans le milieu du cinéma"
      ],
      conclusion: "Le site de Tavares allie avec succès minimalisme, esthétique premium et performance technique pour sublimer son art cinématographique.",
      externalLink: "https://portfolio-tavares.vercel.app/"
    }
  };

  const data = caseStudiesData[id];

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
            {data.externalLink && data.externalLink !== '#' && (
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
                <h3>{data.contextTitle || "La fragmentation des données opérationnelles."}</h3>
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
                  <h3>{data.problemTitle || "Processus manuels et erreurs critiques."}</h3>
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
                <h3>{data.challengeTitle || "Sécuriser le parcours de 2300 utilisateurs."}</h3>
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
                <h3>{data.solutionTitle || "Intégrité par le design et validation stricte."}</h3>
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
  const [currentView, setCurrentView] = useState<'home' | 'asset-iq' | 'ehadj' | 'sagana' | 'vortex' | 'sport-advisor' | 'forum-grandes-ecoles' | 'tavares' | 'cv'>('home');
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const mousePos = { x: 50, y: 50 };
  const [activeSection, setActiveSection] = useState('home');
  const [time, setTime] = useState(new Date());

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || loading) return;

    // Scroll progress bar indicator
    gsap.to('.scroll-progress-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      }
    });

    // Magnetic effect for buttons and CTAs
    const magneticElements = document.querySelectorAll('.magnetic-button');
    magneticElements.forEach((el) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      };
      
      el.addEventListener('mousemove', handleMouseMove as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    // Reveal headers scroll triggers
    const revealTitles = document.querySelectorAll('.gsap-reveal-title');
    revealTitles.forEach((title) => {
      const parent = title.parentElement;
      if (parent) {
        parent.style.overflow = 'hidden';
      }
      
      gsap.fromTo(title, 
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }, [loading]);

  useEffect(() => {
    // Select all sections that have an id
    const sectionElements = Array.from(document.querySelectorAll('section')).filter(s => s.id);

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
        title: <>Building scalable<br /><span className="highlight">digital products.</span></>,
        subtitle: 'CLEAR. USEFUL. SUSTAINABLE.',
        viewProjects: 'VIEW MY PROJECTS',
        contactMe: 'CONTACT ME',
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
            color: '#C9F31D'
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
            title: 'Design & Development',
            subtitle: 'Design Systems & Front-End',
            desc: 'Bridging the gap between design and code by building reusable component libraries and clean, interactive React/Next.js interfaces.',
            tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
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
            color: '#C9F31D'
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
      },
      projects: {
        label: '06 / Projects',
        title: <>Selected <span className="highlight">Works.</span></>,
        viewCaseStudy: 'View Case Study',
        visitSite: 'Visit Site',
        viewProject: 'View Project',
        items: [
          {
            id: 'tavares',
            title: 'Tavares',
            role: 'Web Designer & Developer',
            category: 'Cinematic Portfolio',
            image: '/imgs/tavares.png',
            description: "Modern website for director Tavares, designed as a minimalist showcase for his cinematic work, putting his projects front and center.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://portfolio-tavares.vercel.app/',
            color: '#E50914',
            linkType: 'site',
          },
          {
            id: 'sagana',
            title: 'Sagana',
            role: 'Web Designer & Developer',
            category: 'Digital Agency',
            image: '/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png',
            description: "Full design and development of Sagana's website. A modern platform combining premium design and performance to support businesses in their digital growth.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://www.sagana-agency.com/',
            color: '#DFFF00',
            linkType: 'site',
          },
          {
            id: 'vortex',
            title: 'Vortex',
            role: 'Product Designer',
            category: 'Mobile App',
            image: '/imgs/vortex.webp',
            description: "Mobile app for fuel purchase and wallet management. Optimized transactional flows designed for mobility with smooth onboarding and integrated wallet.",
            techs: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
            link: 'https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel',
            color: '#FFD700',
            linkType: 'behance',
          },
          {
            id: 'sport-advisor',
            title: 'Sport Advisor',
            role: 'Product Designer',
            category: 'AI & Analytics',
            image: '/imgs/advisor.webp',
            description: "Landing page for an AI-powered sports analytics platform. Dense information hierarchy made readable at first glance with strong visual storytelling.",
            techs: ['Figma', 'UX Strategy', 'Visual Design', 'Motion'],
            link: 'https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive',
            color: '#00FA9A',
            linkType: 'behance',
          },
          {
            id: 'forum-grandes-ecoles',
            title: 'Forum Grandes Écoles',
            role: 'Fullstack Developer',
            category: 'Education Platform',
            image: '/imgs/forum.png',
            description: "Event platform for academic orientation and student success. Complex agenda management, online registrations, and direct matchmaking between students and top schools.",
            techs: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
            link: 'https://forum-grandes-ecoles.vercel.app/',
            color: '#E63946',
            linkType: 'site',
          },
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
        title: <>Concevoir des produits<br /><span className="highlight">numériques évolutifs.</span></>,
        subtitle: 'CLAIRS. UTILES. DURABLES.',
        viewProjects: 'VOIR MES PROJETS',
        contactMe: 'ME CONTACTER',
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
            color: '#C9F31D'
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
            title: 'Design & Développement',
            subtitle: 'Design Systems & Front-End',
            desc: 'Faire le pont entre le design et le code en concevant des systèmes de composants réutilisables et des interfaces React/Next.js propres, interactives et performantes.',
            tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
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
            color: '#C9F31D'
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
      },
      projects: {
        label: '06 / Projets',
        title: <>Projets <span className="highlight">Sélectionnés.</span></>,
        viewCaseStudy: "Voir l'étude de cas",
        visitSite: 'Visiter le site',
        viewProject: 'Visualiser le projet',
        items: [
          {
            id: 'tavares',
            title: 'Tavares',
            role: 'Web Designer & Développeur',
            category: 'Portfolio Cinématographique',
            image: '/imgs/tavares.png',
            description: "Site web moderne pour le réalisateur Tavares, conçu comme un écrin minimaliste pour ses œuvres cinématographiques afin de mettre ses projets au premier plan.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://portfolio-tavares.vercel.app/',
            color: '#E50914',
            linkType: 'site',
          },
          {
            id: 'sagana',
            title: 'Sagana',
            role: 'Web Designer & Développeur',
            category: 'Agence Digitale',
            image: '/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png',
            description: "Conception et développement intégral du site web de Sagana. Une plateforme moderne alliant design premium et performance pour accompagner les entreprises dans leur croissance digitale.",
            techs: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
            link: 'https://www.sagana-agency.com/',
            color: '#DFFF00',
            linkType: 'site',
          },
          {
            id: 'vortex',
            title: 'Vortex',
            role: 'Product Designer',
            category: 'Application Mobile',
            image: '/imgs/vortex.webp',
            description: "Application mobile d'achat de carburant et de gestion de portefeuille. Parcours transactionnels optimisés pour la mobilité avec onboarding fluide et gestion de wallet intégrée.",
            techs: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
            link: 'https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel',
            color: '#FFD700',
            linkType: 'behance',
          },
          {
            id: 'sport-advisor',
            title: 'Sport Advisor',
            role: 'Product Designer',
            category: 'IA & Analytics',
            image: '/imgs/advisor.webp',
            description: "Landing page pour une plateforme d'analyse sportive basée sur l'IA. Hiérarchie d'information dense rendue lisible au premier coup d'œil avec un storytelling visuel fort.",
            techs: ['Figma', 'UX Strategy', 'Visual Design', 'Motion'],
            link: 'https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive',
            color: '#00FA9A',
            linkType: 'behance',
          },
          {
            id: 'forum-grandes-ecoles',
            title: 'Forum Grandes Écoles',
            role: 'Développeur Fullstack',
            category: 'Plateforme Éducative',
            image: '/imgs/forum.png',
            description: "Plateforme événementielle dédiée à l'orientation et à la réussite académique. Gestion d'agendas complexes, inscriptions en ligne et mise en relation directe entre étudiants et grandes écoles.",
            techs: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
            link: 'https://forum-grandes-ecoles.vercel.app/',
            color: '#E63946',
            linkType: 'site',
          },
        ]
      }
    }
  };

  const t = translations[lang];



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

  const projects: any[] = t.projects.items;


  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar"></div>

      {/* Intro Preloader */}
      {(loading || progress < 100) && (
        <div className={`preloader-overlay ${!loading ? 'hide' : ''}`}>
          <div className="preloader-content">
            <div className="preloader-title">Sacca Dafia // Portfolio</div>
            <div className="preloader-percentage">{Math.min(progress, 100)}%</div>
            <div className="preloader-bar-outer">
              <div className="preloader-bar-inner" style={{ width: `${Math.min(progress, 100)}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'cv' && <CVView setCurrentView={setCurrentView} />}
      {currentView !== 'home' && currentView !== 'cv' && (
        <CaseStudy id={currentView as any} mousePos={mousePos} setCurrentView={setCurrentView} />
      )}
      {currentView === 'home' && (
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
            <button onClick={openCalendly} className="nav-contact-cta-pentos hide-mobile magnetic-button">
              {t.nav.contact} ↗
            </button>
            <button className={`menu-icon-btn hide-desktop ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>



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

            {/* CTA button – Book a call */}
            <div className="mobile-nav-cta">
              <button
                className="mobile-nav-cta-btn"
                onClick={(e) => { setIsMenuOpen(false); openCalendly(e); }}
              >
                {t.nav.contact} <ArrowRight size={14} style={{ transform: 'rotate(-45deg)' }} />
              </button>
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
      <section id="home" className="hero-pentos" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        {/* Background layers */}
        <div className="hero-gradient-pentos" />
        <div className="hero-pentos-scan" />
        <div className="hero-pentos-noise" />
        <div className="hero-pentos-rings" />
        <div className="hero-pentos-accent" />

        {/* Illustration decorations – Hero */}
        <IlluStar className="illu-hero-star1" />
        <IlluShape className="illu-hero-shape1" />
        <IlluOrb className="illu-hero-orb1" />
        <IlluStar className="illu-hero-star2" />
        
        <div className="container hero-container-pentos">
          <div className="hero-content-pentos">


            <motion.h1 
              className="hero-title-pentos"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="hero-title-line-1">
                {lang === 'en' ? 'Building scalable' : 'Concevoir des produits'}
              </span>
              <span className="hero-title-line-2">
                <span className="highlight">
                  {lang === 'en' ? 'digital products.' : 'numériques évolutifs.'}
                </span>
              </span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle-pentos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div 
              className="hero-actions-pentos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#projects" className="btn-primary-pentos magnetic-button">{t.hero.viewProjects}</a>
              <button onClick={openCalendly} className="btn-secondary-pentos magnetic-button">{t.hero.contactMe}</button>
            </motion.div>
          </div>

          <div className="hero-sculpture-container">
            <motion.img 
              src="/imgs/hero.svg" 
              alt="Pentos Halftone Sculpture" 
              className="hero-sculpture-pentos"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.85, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-pentos">
        {/* Illustration decorations – About */}
        <IlluOrb className="illu-about-orb" />
        <div className="container about-container-pentos">
          <div className="about-header-pentos">
            <div className="about-header-left">

              <motion.h2 
                className="about-title-pentos gsap-reveal-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t.about.title}
              </motion.h2>
            </div>
            
            <div className="about-chevron-wrapper">
              <svg viewBox="0 0 100 100" className="about-chevron-icon" fill="var(--pentos-lime)">
                <polygon points="20,20 70,20 90,40 40,40" />
                <polygon points="10,50 60,50 80,70 30,70" />
              </svg>
            </div>
          </div>
          
          <div className="about-layout-pentos">
            <div className="about-profile-frame">
              <img 
                src="/imgs/cv-profile.jpg" 
                alt="Sacca Dafia Profile" 
                className="about-profile-img" 
              />
            </div>
            
            <div className="about-right-pentos">
              <motion.p 
                className="about-bio-pentos"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t.about.bio}
              </motion.p>
              
              <motion.p 
                className="about-approach-pentos"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t.about.approach}
              </motion.p>
              
              <div className="about-stats-pentos">
                <div className="about-stat-item">
                  <span className="about-stat-num">+3</span>
                  <span className="about-stat-label">
                    {lang === 'en' ? 'Years of Experience' : "Ans d'expérience"}
                  </span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-num">50+</span>
                  <span className="about-stat-label">
                    {lang === 'en' ? 'Projects Delivered' : 'Projets livrés'}
                  </span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-num">100%</span>
                  <span className="about-stat-label">
                    {lang === 'en' ? 'Satisfaction Rate' : 'Satisfaction client'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section-new">
        {/* Illustration decorations – Services */}
        <IlluStar className="illu-services-star" />
        <IlluOrb className="illu-services-orb" />
        <div className="container">
          <div className="services-header-new">

            <motion.h2 
              className="gsap-reveal-title"
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
          
          <div className="services-deck-new">
            {t.services.items.map((service : any, index : number) => (
              <motion.div 
                key={service.id}
                className="service-column-new"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="column-header-new">
                  <span className="column-index-new">{service.id}</span>
                  <div className="column-dot-new" style={{ backgroundColor: service.color }}></div>
                </div>
                <div className="column-illustration-wrapper">
                  {(() => {
                    const Icon = serviceIcons[index];
                    return <Icon />;
                  })()}
                </div>
                <div className="column-body-new">
                  <h3>{service.title}</h3>
                  <p className="column-subtitle-new">{service.subtitle}</p>
                  <p className="column-desc-new">{service.desc}</p>
                </div>
                <div className="column-footer-new">
                  <div className="column-tags-new">
                    {service.tags.map((tag: string) => (
                      <span key={tag} className="column-tag-pill-new">{tag}</span>
                    ))}
                  </div>
                </div>
                {index === 0 && <div className="column-glow-new" style={{ '--glow-color': service.color } as any}></div>}
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
        {/* Illustration decorations – Experience */}
        <IlluShape className="illu-exp-shape" />
        <IlluStar className="illu-exp-star" />
        <div className="container experience-container-new">
          <div className="experience-header-new">

            <motion.h2 
              className="gsap-reveal-title"
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
        {/* Illustration decorations – SaaS */}
        <IlluOrb className="illu-saas-orb" />
        <IlluStar className="illu-saas-star" />
        <div className="saas-container-new">

          {/* Top header bar */}
          <div className="saas-top-bar">
            <span className="saas-eyebrow">05 / Focus</span>
            <motion.h2 
              className="saas-section-title gsap-reveal-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Produits &amp; <span className="highlight">SaaS.</span>
            </motion.h2>
            <p className="saas-section-sub">
              {lang === 'en'
                ? 'Complex B2B platforms designed from strategy to final delivery.'
                : 'Des plateformes B2B complexes conçues de la stratégie jusqu\'à la livraison finale.'}
            </p>
          </div>

          {/* Editorial rows */}
          <div className="saas-rows">
            {[
              {
                id: 'ehadj',
                index: '01',
                label: 'Process Orchestration',
                title: 'eHadj',
                year: '2024',
                tags: ['UX Design', 'Product Strategy', 'B2B SaaS'],
                desc: lang === 'en'
                  ? 'Digitalisation of pilgrimage organisation: registrations, logistics, transport and centralised financial flows.'
                  : 'Digitalisation de l\'organisation du pèlerinage : inscriptions, logistique, transports et flux financiers centralisés.',
                image: '/imgs/ehadj_cs.jpg',
                color: '#C9F31D',
                view: 'ehadj'
              },
              {
                id: 'asset-iq',
                index: '02',
                label: 'Product Design & Strategy',
                title: 'Asset IQ',
                year: '2025',
                tags: ['Product Design', 'UX Strategy', 'Dashboard'],
                desc: lang === 'en'
                  ? 'Intelligent system for tracking and operational governance of physical resources across multi-site infrastructures.'
                  : 'Système intelligent de suivi et de gouvernance opérationnelle des ressources physiques.',
                image: '/imgs/assetiQ_cs.jpg',
                color: '#A855F7',
                view: 'asset-iq'
              }
            ].map((product, index) => (
              <motion.div
                key={product.id}
                className="saas-row-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setCurrentView(product.view as any)}
              >
                {/* Background image revealed on hover */}
                <div
                  className="saas-row-bg"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="saas-row-bg-overlay" />

                {/* Left: giant index */}
                <div className="saas-row-left">
                  <span className="saas-row-index">{product.index}</span>
                </div>

                {/* Center: content */}
                <div className="saas-row-center">
                  <span className="saas-row-label">{product.label}</span>
                  <h3 className="saas-row-title">{product.title}</h3>
                  <p className="saas-row-desc">{product.desc}</p>
                  <div className="saas-row-tags">
                    {product.tags.map(tag => (
                      <span key={tag} className="saas-row-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA + year */}
                <div className="saas-row-right">
                  <span className="saas-row-year">{product.year}</span>
                  <div className="saas-row-cta">
                    <span className="saas-row-cta-label">
                      {lang === 'en' ? 'View Case Study' : "Voir l'étude"}
                    </span>
                    <div className="saas-row-arrow">
                      <ArrowRight size={18} style={{ transform: 'rotate(-45deg)' }} />
                    </div>
                  </div>
                </div>

                {/* Accent line that fills on hover */}
                <div className="saas-row-line" style={{ '--accent': product.color } as any} />
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

            <motion.h2 
              className="gsap-reveal-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t.projects.title}
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
                {projects[activeProject].techs.map((tech: string, i: number) => (
                  <span key={i} className="tech-pill-new">{tech}</span>
                ))}
              </div>
              <div className="proj-actions-new" style={{ display: 'flex', gap: '16px', marginTop: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  onClick={() => setCurrentView(projects[activeProject].id as any)}
                  className="btn-primary-new magnetic-button"
                  style={{ padding: '12px 24px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.projects.viewCaseStudy}
                </motion.button>
                {projects[activeProject].link && projects[activeProject].link !== '#' && (
                  <motion.a
                    href={projects[activeProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-new magnetic-button"
                    style={{ padding: '12px 24px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {projects[activeProject].linkType === 'behance' ? t.projects.viewProject : t.projects.visitSite} <ExternalLink size={16} />
                  </motion.a>
                )}
              </div>
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
        {/* Illustration decorations – Process */}
        <IlluShape className="illu-process-shape" />
        <IlluOrb className="illu-process-orb" />
        <IlluStar className="illu-process-star" />
        <div className="container methodology-container-new">
          <div className="methodology-header-new">

            <motion.h2 
              className="gsap-reveal-title"
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
        {/* Illustration decorations – Contact */}
        <IlluStar className="illu-contact-star" />
        <IlluShape className="illu-contact-shape" />
        <div className="container contact-container-new">
          <div className="contact-header-new">

            <motion.h2 
              className="contact-title-large gsap-reveal-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.contact.title}
            </motion.h2>
          </div>
          
          <div className="contact-grid-new">
            <div className="book-card-premium magnetic-button" onClick={openCalendly}>
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
      )}
    </>
  );
}

export default App;
