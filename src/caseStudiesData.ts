export interface CaseStudyData {
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
  challengeImg?: string;
  decisions?: Array<{ title: string; desc: string; why: string }>;
  solution?: string;
  solutionTitle?: string;
  uxSolutions?: string;
  dashboardImg?: string;
  interfaceImg?: string;
  features: Array<{ title: string; desc: string }>;
  insight: string;
  impact: string[];
  conclusion: string;
  externalLink?: string;
  ctaLabel?: string;
}

export type CaseStudyId = 'asset-iq' | 'ehadj' | 'beans' | 'sagana' | 'vortex' | 'sport-advisor' | 'truvox' | 'tavares' | 'the-refuge' | 'strategy-arena' | 'dolce-riviera';

export const caseStudiesData: Record<'en' | 'fr', Record<CaseStudyId, CaseStudyData>> = {
  fr: {
    'asset-iq': {
      title: "Asset IQ",
      subtitle: "Gouvernance et pilotage opérationnel des actifs physiques",
      label: "Product Design & Strategy",
      color: "#10B981",
      bgImage: "/imgs/assetiQ/cover_Asset.jpg",
      context: "Dans l'industrie, la dispersion géographique des équipements génère des pertes massives et une absence totale de traçabilité. Le problème n'est pas le manque de données, mais leur fragmentation.",
      challenge: "Transformer un inventaire passif en un outil d'aide à la décision. Le défi UX : permettre à des opérateurs terrain de capter de l'information fiable sans friction.",
      solution: "AssetIQ centralise le cycle de vie complet de l'actif. Chaque équipement possède une identité digitale unique (QR Code), fusionnant l'inventaire physique et le carnet de maintenance actif.",
      insight: "La data n'est utile que si elle est saisie par ceux qui sont sur le terrain. Nous avons réduit le flow de saisie à 3 actions critiques pour garantir l'adoption.",
      contextImg: "/imgs/assetiQ/tech2.jpg",
      challengeImg: "/imgs/assetiQ/military2.jpg",
      interfaceImg: "/imgs/assetiQ/Dashboard_asset.png",
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
      color: "#0d3479",
      bgImage: "/imgs/ehadj/cover_Ehadj.jpg",
      context: "Le projet eHadj fait intervenir de multiples entités publiques et privées dans le traitement des dossiers de pèlerins : le Ministère de la Santé (bilan médical), les banques (aspect financier), les sociétés agréées (enregistrement des pèlerins), le Ministère des Affaires Étrangères (attribution des visas) et l'AGLO (superviseur général). Auparavant, ces acteurs opéraient de manière cloisonnée et manuelle, générant des goulots d'étranglement critiques.",
      contextTitle: "La complexité d'un écosystème multi-acteurs.",
      problem: "Le manque de connectivité entre les différentes entités empêchait tout suivi réel. Les banques pouvaient valider des paiements pour des pèlerins inaptes médicalement, et les visas étaient demandés sur la base de données erronées. Cette fragmentation créait des doublons, des fraudes d'identité et des pertes de quotas critiques au niveau national.",
      problemTitle: "Le défi de la décentralisation sans connexion.",
      challenge: "Mettre en place un flux UX connecté et procédural qui unifie toutes ces entités au sein d'une plateforme unique. L'objectif était de centraliser tout le processus pour assurer un suivi clair, instantané et réel, tout en garantissant une visibilité totale sur l'identité et le statut de chaque dossier de pèlerin.",
      challengeTitle: "Centraliser et fluidifier un workflow inter-organisationnel.",
      decisions: [
        { 
          title: "ID-First Onboarding", 
          desc: "Imposer la saisie du numéro NPI (Identifiant National) comme première étape d'inscription.",
          why: "Auto-remplit les données d'identité certifiées et élimine instantanément tout risque de doublons."
        },
        { 
          title: "Connected Workflow", 
          desc: "Concevoir un tunnel séquentiel strict reliant la Santé, les banques et le Ministère des Affaires Étrangères.",
          why: "Assure le respect absolu de la procédure : impossible de payer ou de demander un visa sans validation médicale."
        },
        { 
          title: "Real-Time Identity Tracker", 
          desc: "Créer un tableau de bord partagé avec des droits d'accès granulaires pour chaque organisation.",
          why: "Donne à l'AGLO et aux agences une vue claire et en direct de la progression de chaque dossier."
        }
      ],
      solution: "Une plateforme d'orchestration unifiée où chaque acteur intervient de manière connectée et procédurale. Le dossier d'un pèlerin progresse automatiquement : le feu vert médical débloque l'étape de paiement, qui débloque ensuite l'attribution du visa, sous le contrôle global de l'AGLO.",
      solutionTitle: "Orchestration unifiée et validation procédurale.",
      uxSolutions: "Validation procédurale connectée : impossible de générer un reçu de paiement ou d'émettre un visa sans le feu vert du médecin certificateur.",
      contextImg: "/imgs/ehadj/hadj2.png",
      challengeImg: "/imgs/ehadj/hadj.png",
      interfaceImg: "/imgs/ehadj/Dashboard_ehadj.png",
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
      dashboardImg: "/imgs/vortex_image.jpeg",
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
      externalLink: "https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel",
      ctaLabel: "VOIR LE PROJET"
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
      dashboardImg: "/imgs/assetiQ/advisor_image.png",
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
      externalLink: "https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive",
      ctaLabel: "VOIR LE PROJET"
    },
    'beans': {
      title: "Beans",
      subtitle: "Plateforme SaaS de fidélisation client & Customer Engagement",
      label: "Lead Product Designer · SaaS B2B",
      color: "#10B981",
      bgImage: "/imgs/beans_cover.png",
      context: "Dans un environnement e-commerce et retail où l'acquisition client devient de plus en plus coûteuse, les marques cherchent à construire des relations durables avec leurs consommateurs. Beans est une plateforme SaaS de fidélisation permettant de déployer des programmes de récompenses sur-mesure intégrés à l'écosystème marchand (Shopify, WooCommerce, Klaviyo, POS).",
      contextTitle: "Transformer chaque transaction en relation durable.",
      problem: "Les programmes de fidélité impliquent de nombreux paramètres complexes : règles d'accumulation de points, conditions de récompenses, segmentation client, intégrations tierces et suivi des performances. Sans outil intuitif, la configuration devient un goulot d'étranglement pour les marchands.",
      problemTitle: "Concevoir une expérience SaaS simple pour un système complexe.",
      challenge: "Créer une expérience d'administration fluide permettant aux e-commerçants de configurer leurs règles de fidélité, de connecter leurs outils quotidiens et d'optimiser leur stratégie de rétention sans complexité technique.",
      challengeTitle: "Simplifier l'administration tout en maximisant la rétention client.",
      decisions: [
        {
          title: "No-Code Program Builder",
          desc: "Un tunnel séquentiel intuitif pour paramétrer règles d'accumulation, péremption de points et paliers VIP.",
          why: "Permet aux marchands de déployer un programme complet et opérationnel en moins de 15 minutes."
        },
        {
          title: "Connected Ecosystem Hub",
          desc: "Hub d'intégrations clé en main avec Shopify, WooCommerce, Klaviyo, POS et outils marketing.",
          why: "Centralise la synchronisation des données d'achat et d'engagement sans nécessiter de développeur."
        },
        {
          title: "Analytics & Customer Insights",
          desc: "Tableau de bord axé sur la valeur générée et l'évolution des achats récurrents.",
          why: "Transforme la donnée de fidélité en décisions stratégiques directement lisibles par le marchand."
        }
      ],
      solution: "Une plateforme SaaS B2B complète qui centralise la gestion des récompenses, les programmes VIP, le parrainage, les intégrations e-commerce et l'analyse comportementale client.",
      solutionTitle: "Expérience SaaS unifiée de fidélisation et d'engagement client.",
      interfaceImg: "/imgs/beans_cover.png",
      features: [
        { title: "Loyalty Program", desc: "Création de systèmes de points sur-mesure avec règles d'éligibilité et d'expiration." },
        { title: "VIP Tiers", desc: "Paliers VIP et avantages exclusifs pour valoriser les clients les plus engagés." },
        { title: "Analytics & Insights", desc: "Suivi des performances et impact direct des récompenses sur le panier moyen." },
        { title: "Seamless Integrations", desc: "Connectivité native avec Shopify, Klaviyo, POS et l'écosystème e-commerce." }
      ],
      insight: "Un produit SaaS B2B performant doit équilibrer trois dimensions : le Business (générer de la rétention), l'Utilisateur (simplifier le complexe) et la Technologie (construire du scalable).",
      impact: [
        "Augmentation significative de la rétention et des achats récurrents pour les marchands",
        "Réduction du churn grâce à des programmes VIP et de parrainage ciblés",
        "Configuration rapide sans compétences techniques ou développement sur-mesure",
        "Interface scalable prête pour l'intégration de nouvelles fonctionnalités marketing"
      ],
      conclusion: "Beans redéfinit l'expérience de fidélisation marchande en transformant un paramétrage technique complexe en un levier de croissance fluide et mesurable.",
      externalLink: "https://www.trybeans.com"
    },
    'truvox': {
      title: "Truvox Studio",
      subtitle: "Expériences numériques d'exception : Stratégie, Design & Développement",
      label: "Web Design & Brand Experience",
      color: "#10B981",
      bgImage: "/imgs/truvox_cover.png",
      context: "Truvox est un studio de création digitale qui conçoit des expériences numériques d'exception conçues pour apporter de la clarté, renforce la confiance et soutient la croissance des entreprises (Stratégie, Design, Développement).",
      contextTitle: "Allier clarté stratégique et excellence visuelle.",
      challenge: "Créer un univers de marque moderne et un site studio épuré, interactif et hautement performant qui reflète la précision et le savoir-faire de l'équipe Truvox.",
      challengeTitle: "Incarner la qualité créative et technique.",
      decisions: [
        {
          title: "Direction Artistique Épurée",
          desc: "Typographies affirmées, contrastes profonds et animations minimalistes.",
          why: "Valorise immédiatement le savoir-faire design du studio dès les premières secondes."
        },
        {
          title: "Structure Orientée Conversion",
          desc: "Tunnel clair entre vision stratégique, réalisations (See Our Work) et demande de devis (Request a Quote).",
          why: "Facilite la prise de contact pour les prospects qualifiés."
        }
      ],
      solution: "Un site studio moderne avec une identité visuelle forte, combinant direction artistique haut de gamme et développement web réactif.",
      solutionTitle: "Vitrine digitale haut de gamme pour Truvox Studio.",
      features: [
        { title: "Stratégie & Positioning", desc: "Clarté du message de marque et alignement avec les objectifs business." },
        { title: "Design d'Expérience", desc: "Interfaces modernes et interactives pensées pour l'engagement." },
        { title: "Développement & Performance", desc: "Intégration web fluide, réactive et optimisée pour tous les écrans." }
      ],
      insight: "La vitrine d'un studio créatif doit être la première preuve de son excellence d'exécution.",
      impact: [
        "Identité de marque forte et mémorable",
        "Navigation fluide et expérience utilisateur haut de gamme",
        "Génération de contacts qualifiés et demandes de devis"
      ],
      conclusion: "Truvox Studio illustre l'alliance entre vision créative, rigueur stratégique et performance web.",
      externalLink: "https://www.truvox.studio/"
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
    },
    'the-refuge': {
      title: "The Refuge",
      subtitle: "Portail chrétien humanitaire et suivi d'impact en temps réel à Cotonou",
      label: "Web Design & Development",
      color: "#0d3479",
      bgImage: "/imgs/your-refuge.jpg",
      context: "Située à Cotonou au Bénin, The Refuge est une organisation chrétienne humanitaire dédiée à apporter une aide matérielle (dons de vêtements et kits d'hygiène menstruelle pour les femmes démunies), un accompagnement spirituel et de la dignité aux personnes les plus vulnérables de la rue. Afin d'amplifier son impact, l'organisation nécessitait un portail en ligne moderne capable de fédérer donateurs et bénévoles autour d'actions de terrain concrètes, fidèles et quotidiennes.",
      contextTitle: "Une aide d'urgence et un accompagnement à Cotonou.",
      challenge: "Traduire la compassion et l'engagement de terrain en une interface digitale captivante et digne de confiance. Le défi principal consistait à éliminer le scepticisme lié aux dons en ligne en intégrant un suivi transparent et en temps réel des indicateurs clés (vêtements distribués, kits d'hygiène menstruelle offerts aux femmes sans moyens, personnes réinsérées) ainsi que des récits de maraudes inspirants.",
      challengeTitle: "Fédérer les dons et structurer l'action bénévole.",
      solution: "Nous avons conçu et développé une application web responsive dotée de jauges de financement en direct, d'un module d'inscription simplifié pour les bénévoles et d'un tunnel de don sécurisé optimisé pour le contexte ouest-africain (Mobile Money et cartes de crédit). L'identité visuelle est rehaussée de doodles manuscrits apportant une touche humaine unique au design.",
      solutionTitle: "Un portail d'impact moderne, transparent et humain.",
      insight: "La transparence absolue génère la confiance. Rendre visibles les statistiques réelles et les besoins de financement précis a permis de doubler le taux de fidélisation des donateurs et de mobiliser des dizaines de nouveaux bénévoles locaux.",
      contextImg: "/imgs/your-refuge.jpg",
      challengeImg: "/imgs/your-refuge.jpg",
      dashboardImg: "/imgs/your-refuge.jpg",
      features: [
        { title: "Suivi d'Impact en Direct", desc: "Affichage transparent des vêtements distribués (1 240+ vêtements), des kits d'hygiène menstruelle offerts, et des réinsertions actives sous forme de jauges dynamiques." },
        { title: "Formulaire de Don en FCFA", desc: "Tunnel de paiement sécurisé adapté aux donateurs locaux et internationaux, supportant Mobile Money (MTN, Moov) et cartes bancaires." },
        { title: "Espace d'Engagement Bénévoles", desc: "Processus d'onboarding fluide pour les maraudes de distribution de vêtements/kits et les ateliers d'écoute psychologique." },
        { title: "Récits de Maraudes & News", desc: "Publication simplifiée de témoignages vécus sur le terrain (comme le parcours de Marie ou Luc 3:11) pour maintenir un lien humain fort." }
      ],
      impact: [
        "1 240+ vêtements de première nécessité distribués et suivis avec une transparence financière totale",
        "850+ kits d'hygiène menstruelle offerts aux femmes sans ressources à Cotonou pour préserver leur dignité",
        "12+ personnes vulnérables réinsérées professionnellement grâce aux programmes de formation",
        "Augmentation de 60% des dons réguliers suite à la mise en ligne du système de suivi d'impact"
      ],
      conclusion: "Le nouveau portail de The Refuge prouve que le design numérique peut être un vecteur puissant d'action sociale. En alliant transparence de l'impact et simplicité d'interaction, le site comble avec succès le fossé entre la génélovisité en ligne et les vies restaurées dans les rues de Cotonou.",
      externalLink: "https://your-refuge.vercel.app/"
    },
    'strategy-arena': {
      title: "Strategy Arena",
      subtitle: "Cabinet de conseil en stratégie, organisation et transformation digitale pour PME",
      label: "Branding, Design & Développement Web",
      color: "#F4E723",
      bgImage: "/imgs/Strategy-Arena.png",
      context: "Strategy Arena est un cabinet de conseil en stratégie et organisation basé à Cotonou, au Bénin. Face à la digitalisation rapide et aux besoins de structuration des PME en Afrique de l'Ouest, le cabinet propose des audits opérationnels et des accompagnements pragmatiques. Pour affirmer sa crédibilité et attirer des PME en phase de croissance, Strategy Arena nécessitait une identité de marque forte et une présence en ligne premium à la hauteur de son expertise.",
      contextTitle: "Un diagnostic juste, avant toute solution.",
      challenge: "Le défi majeur consistait à concevoir un branding moderne et minimaliste rompant avec les codes traditionnels et ternes du conseil. Il fallait créer un site vitrine ultra-performant, fluide et hautement interactif, reflétant la rigueur méthodologique du cabinet tout en offrant une expérience utilisateur (UX) irréprochable sur mobile et desktop.",
      challengeTitle: "Allier branding moderne, fluidité et performance.",
      solution: "Nous avons élaboré une identité visuelle complète (logo, typographies, palette chromatique jaune canari et noir absolu) et développé un site vitrine moderne et asymétrique. L'interface intègre des micro-animations interactives fluides, un préchargeur dynamique, et des pages de services détaillées structurées pour maximiser la conversion des PME.",
      solutionTitle: "Branding distinctif, micro-animations et conversion.",
      insight: "Le design haut de gamme et la fluidité technique sont des gages de confiance immédiats dans le secteur du conseil. Un site rapide et esthétique convertit les prospects qualifiés bien avant le premier rendez-vous.",
      dashboardImg: "/imgs/Strategy-Arena.png",
      features: [
        { title: "Identité de Marque Unique", desc: "Logo moderne et palette de couleurs contrastée jaune canari/noir." },
        { title: "Préchargeur Interactif", desc: "Une animation d'accueil fluide optimisant le chargement initial." },
        { title: "Services Structurés", desc: "Présentation des quatre offres clés (Diagnostic, Structure, Transformation, Croissance)." },
        { title: "Résultats Opérationnels", desc: "Présentation des études de cas concrètes pour Bénin Distribution, Sahel Foods et Atlantique Logistique." }
      ],
      impact: [
        "Une image de marque haut de gamme immédiatement reconnaissable",
        "Taux d'engagement et temps de visite en hausse sur le site",
        "Génération de leads simplifiée grâce à un tunnel de contact fluide",
        "Vitrine technologique validant l'expertise en transformation digitale"
      ],
      conclusion: "Le nouveau site de Strategy Arena positionne le cabinet comme un partenaire moderne et incontournable pour la digitalisation et la restructuration des PME en Afrique de l'Ouest.",
      externalLink: "https://strategie-arena.com/"
    },
    'dolce-riviera': {
      title: "Dolce Riviera",
      subtitle: "Concept de landing page premium pour l'hôtellerie de luxe sur la Riviera",
      label: "Product Design & UI Design",
      color: "#C5A059",
      bgImage: "/imgs/dolce_cover.png",
      context: "Dolce Riviera est un concept de landing page conçu pour une marque de luxe inspirée par l'élégance intemporelle de la Riviera méditerranéenne. L'objectif était de créer une expérience immersive qui met en avant le raffinement, l'exclusivité et l'art de vivre à travers une interface moderne et minimaliste.",
      contextTitle: "L'élégance intemporelle de la Riviera.",
      challenge: "Structurer une hiérarchie visuelle claire orientée vers la conversion tout en préservant une direction artistique premium et épurée. L'interface devait allier narration visuelle immersive et expérience utilisateur fluide sur tous les supports.",
      challengeTitle: "Équilibre entre esthétique haut de gamme et conversion.",
      decisions: [
        {
          title: "Direction Artistique Sobre",
          desc: "Utilisation d'une palette chromatique sobre accentuée par des tons or chaud et sable.",
          why: "Évoque le prestige discret de la côte d'Azur tout en renforçant la crédibilité de la marque."
        },
        {
          title: "Espaces et Respiration",
          desc: "Intégration d'espacements généreux et d'une typographie à fort contraste.",
          why: "Laisse respirer les visuels immersifs et structure l'information sans surcharger l'utilisateur."
        },
        {
          title: "Parcours de Réservation Simplifié",
          desc: "Conception d'un tunnel de réservation direct et intuitif accessible en continu.",
          why: "Maximise les opportunités de conversion sans perturber la narration visuelle."
        }
      ],
      solution: "Une interface minimaliste et élégante mettant l'accent sur le storytelling visuel et la fluidité des parcours de réservation. La mise en page asymétrique et la gestion rigoureuse de la typographie guident naturellement l'utilisateur vers la découverte et la conversion.",
      solutionTitle: "Narration visuelle et parcours de conversion intégrés.",
      uxSolutions: "Hiérarchie de l'information : chaque section est conçue comme un chapitre d'une expérience exclusive, incitant à l'action par des micro-interactions soignées.",
      dashboardImg: "/imgs/dolce_cover.png",
      features: [
        { title: "Hiérarchie Visuelle Claire", desc: "Mise en page optimisée pour structurer le contenu et guider l'utilisateur vers les actions clés." },
        { title: "Direction Artistique Premium", desc: "Palette sobre, typographie soignée et visuels haute qualité évoquant le prestige." },
        { title: "UX Fluide & Responsive", desc: "Expérience utilisateur optimisée assurant un confort de navigation idéal sur desktop et mobile." },
        { title: "Narration Visuelle", desc: "Mise en valeur soignée des espaces, des services exclusifs et des offres de la marque." }
      ],
      insight: "Dans le design de luxe, la simplicité est le raffinement suprême. L'équilibre visuel et la sobriété des animations créent un sentiment de calme et d'exclusivité.",
      impact: [
        "Identité de marque forte et crédibilité renforcée par le design",
        "Hiérarchie visuelle fluide optimisant les flux de réservation",
        "Expérience immersive incitant à la découverte des offres exclusives"
      ],
      conclusion: "Dolce Riviera réconcilie les impératifs de conversion et la sobriété du design haut de gamme à travers un parcours utilisateur élégant et efficace.",
      externalLink: "https://www.behance.net/gallery/252335895/Dolce-Riviera-Luxury-Hospitality-Landing-Page-Concept",
      ctaLabel: "VOIR LE PROJET"
    }
  },
  en: {
    'asset-iq': {
      title: "Asset IQ",
      subtitle: "Governance and operational monitoring of physical assets",
      label: "Product Design & Strategy",
      color: "#10B981",
      bgImage: "/imgs/assetiQ/cover_Asset.jpg",
      context: "In heavy industry, the geographical dispersion of equipment generates massive losses and a complete lack of traceability. The problem is not the lack of data, but its fragmentation.",
      contextTitle: "Operational data fragmentation.",
      challenge: "Transform a passive inventory into an active decision-making tool. The UX challenge: allow field operators to capture reliable information without friction.",
      challengeTitle: "Designing for friction-free data input.",
      challengeImg: "/imgs/assetiQ/military2.jpg",
      solution: "AssetIQ centralizes the full lifecycle of assets. Each piece of equipment gets a unique digital identity (QR Code), merging physical inventory with an active maintenance log.",
      solutionTitle: "End-to-end asset tracking and QR code integration.",
      interfaceImg: "/imgs/assetiQ/Dashboard_asset.png",
      features: [
        { title: "Native Traceability", desc: "QR code identification for immediate access to full maintenance history." },
        { title: "Preventive Maintenance", desc: "Automated scheduling to extend equipment lifespan." },
        { title: "Multi-Site Hierarchy", desc: "Flexible organizational structure (Sites > Departments > Individuals)." },
        { title: "Decision Analytics", desc: "Depreciation and ROI reports based on actual usage." }
      ],
      insight: "Data is only useful if it is captured by those in the field. We reduced the input flow to 3 critical actions to guarantee adoption.",
      impact: [
        "30% reduction in equipment loss",
        "Massive optimization of operational costs",
        "Legal traceability and individual accountability",
        "Decision-making based on reliable field data"
      ],
      conclusion: "AssetIQ redefines asset management by moving from a simple list to structured operational governance.",
      externalLink: "https://www.assetiQ.com"
    },
    'ehadj': {
      title: "eHadj",
      subtitle: "Digital orchestration of the pilgrimage in Benin",
      label: "Product Design & Strategy",
      color: "#0d3479",
      bgImage: "/imgs/ehadj/cover_Ehadj.jpg",
      context: "The eHadj project involves multiple public and private entities in processing pilgrim records: the Ministry of Health (medical assessment), banks (financial transactions), certified travel agencies (pilgrim registrations), the Ministry of Foreign Affairs (visa issuance), and AGLO (global supervisor). Previously, these stakeholders worked in disconnected silos, resulting in massive operational friction.",
      contextTitle: "The complexity of a multi-stakeholder ecosystem.",
      problem: "The complete lack of connectivity between organizations prevented real-time status tracking. Financial payments were processed for medically unfit pilgrims, and visas were requested based on faulty manual data. This fragmentation led to identity duplication, errors in quotas, and critical visa blocks at the national level.",
      problemTitle: "The challenge of disconnected decentralization.",
      challenge: "Design a highly procedural, connected UX flow that unifies all distinct entities within a single platform. The goal was to centralize the entire process to ensure transparent, real-time tracking, while guaranteeing absolute visibility over pilgrim identities and status.",
      challengeTitle: "Orchestrating a connected inter-organizational workflow.",
      decisions: [
        { 
          title: "ID-First Onboarding", 
          desc: "Requiring NPI (National Identifier) input as the first onboarding step.",
          why: "Auto-populates verified identity data and instantly eliminates duplicates and identity fraud."
        },
        { 
          title: "Connected Workflow", 
          desc: "Designing a strict sequential pipeline between the Ministry of Health, banks, and Foreign Affairs.",
          why: "Ensures absolute procedural integrity: impossible to make payments or request a visa without medical clearance."
        },
        { 
          title: "Real-Time Identity Tracker", 
          desc: "Creating a shared, permission-based tracking interface with granular roles for each organization.",
          why: "Provides AGLO and agencies with real-time, transparent progress metrics and clear identity auditing."
        }
      ],
      solution: "A unified orchestration platform where stakeholders interact sequentially. A pilgrim's record progresses automatically: medical approval unlocks the payment gateway, which then unlocks visa submission, all under the global supervision of AGLO.",
      solutionTitle: "Unified orchestration and procedural validation.",
      uxSolutions: "Connected validation rules: a pilgrim's record status transitions dynamically across health check, banking, and visa checkpoints without manual intervention.",
      contextImg: "/imgs/ehadj/hadj2.png",
      challengeImg: "/imgs/ehadj/hadj.png",
      interfaceImg: "/imgs/ehadj/Dashboard_ehadj.png",
      features: [
        { title: "Business Setup", desc: "Granular configuration of certified agencies and pilgrim categories." },
        { title: "Quota Tracking", desc: "Real-time monitoring of seat consumption and rollover options." },
        { title: "Integrated Payments", desc: "High-security consolidation of agency-pilgrim financial flows." },
        { title: "Global Control Dashboard", desc: "Decision-making panel for managing the entire Hadj season." }
      ],
      impact: [
        "Complete elimination of double-registration errors",
        "90% reduction in dossiers rejected due to material errors",
        "Total transparency over national quota consumption",
        "Major coordination improvements across 30+ travel agencies"
      ],
      insight: "Data integrity is not an option; it is the core engine of the system. The NPI-based onboarding was the key to this success.",
      conclusion: "eHadj transformed a complex logistics operation into a reliable industrial process, securing the sacred journey of thousands of Beninese pilgrims.",
      externalLink: "https://ehadj.aglo.bj/"
    },
    'sagana': {
      title: "Sagana",
      subtitle: "Identity and web performance for a premium digital agency",
      label: "Creative Direction & Web Development",
      color: "#DFFF00",
      bgImage: "/imgs/sagana.png",
      context: "Sagana is a premium digital agency that required a website reflecting its high-end positioning. The previous site lacked smooth animations, visual impact, and conversion power.",
      contextTitle: "Brand positioning for premium agencies.",
      challenge: "Create an immersive brand experience with sophisticated animations without sacrificing loading speeds and search engine optimization (SEO).",
      challengeTitle: "Blending premium aesthetics with pure performance.",
      challengeImg: "/imgs/sagana.png",
      decisions: [
        {
          title: "Fluid Micro-Animations",
          desc: "Integrating interactive hover states on cards and smooth page transitions.",
          why: "Reinforces the feeling of premium quality and technical expertise."
        },
        {
          title: "Dark Mode Default",
          desc: "Dark color scheme accented by neon touches for a modern, tech-focused style.",
          why: "Creates immediate visual impact and reduces eye strain."
        }
      ],
      solution: "An architecture based on React and Framer Motion, optimizing every transition. The site uses progressive loading techniques to achieve absolute smoothness.",
      solutionTitle: "End-to-end asset optimization and Framer Motion.",
      dashboardImg: "/imgs/SAGANA-—-Agence-Digitale-Premium-04-26-2026_10_55_AM.png",
      features: [
        { title: "60fps Animations", desc: "Fluid transitions based on Framer Motion and CSS transitions." },
        { title: "Raw Performance", desc: "95+ Lighthouse score achieved through image and code optimization." },
        { title: "SEO Structuré", desc: "Rigorous semantic markup to maximize organic search visibility." },
        { title: "Responsive Design", desc: "Fluid layouts adapted to all screen resolutions." }
      ],
      insight: "Performance is a design element. A beautiful but slow site loses its visitors before they can even appreciate the visuals.",
      impact: [
        "40% increase in average session duration",
        "25% rise in qualified contact inquiries",
        "A strengthened brand identity aligned with high-end market positioning"
      ],
      conclusion: "Sagana now boasts a state-of-the-art showcase website that matches the premium quality of its services and attracts high-end clients.",
      externalLink: "https://www.sagana-agency.com/"
    },
    'vortex': {
      title: "Vortex",
      subtitle: "Mobile fuel purchasing and digital wallet management app",
      label: "Product Design & UX Research",
      color: "#FFD700",
      bgImage: "/imgs/vortex.webp",
      context: "Fuel procurement for fleets and on-the-go individuals lacks fluidity. Waiting in stations and managing paper invoicing generate significant friction.",
      contextTitle: "Logistical friction in fuel retail.",
      challenge: "Simplify the fuel purchase journey by reducing it to a few taps directly from the driver's seat, while integrating a secure digital wallet.",
      challengeTitle: "Designing for rapid use in mobile situations.",
      challengeImg: "/vortex_preview.png",
      decisions: [
        {
          title: "Enlarged Action Buttons",
          desc: "Increasing click target sizes by 30% compared to typical mobile standards.",
          why: "Prevents typing errors when users are hurried or outdoors."
        },
        {
          title: "High-Clarity Mode",
          desc: "High-contrast color selections with a dark background optimized for outdoor visibility.",
          why: "Ensures screen readability even in direct sunlight at the gas pump."
        }
      ],
      solution: "Vortex provides an ultra-clean interface with rapid onboarding and secure wallet integration. The design emphasizes high contrasts and large tap targets.",
      solutionTitle: "High-contrast mobile UI and one-tap access.",
      dashboardImg: "/imgs/vortex_image.jpeg",
      features: [
        { title: "1-Tap Payment", desc: "Instant fuel purchases via the integrated secure digital wallet." },
        { title: "QR Code Station", desc: "Rapid generation of verification codes for pump terminal scanners." },
        { title: "Automated Receipts", desc: "Automatic generation and email delivery of digital invoices." },
        { title: "Consumption Tracking", desc: "Clear expense history and analytical dashboards of fuel volumes." }
      ],
      insight: "In on-the-go contexts (driving, gas stations), user attention is highly divided. The interface must be readable and actionable in under 3 seconds.",
      impact: [
        "Transaction times divided by 3 at the pump",
        "92% successful onboarding rate on the first attempt",
        "Massive adoption among vehicle fleet managers"
      ],
      conclusion: "Vortex transforms the chore of refueling into a fluid, secure, and incredibly fast digital journey.",
      externalLink: "https://www.behance.net/gallery/218017715/Mobile-App-to-buy-fuel",
      ctaLabel: "VIEW PROJECT"
    },
    'sport-advisor': {
      title: "Sport Advisor",
      subtitle: "Sports analysis and predictions platform powered by AI",
      label: "Product Design & Visual Strategy",
      color: "#00FA9A",
      bgImage: "/imgs/advisor.webp",
      context: "Sports analytics platforms suffer from information overload. A flood of raw statistics, complex charts, and odds makes decision-making confusing and intimidating.",
      contextTitle: "Cognitive overload in sports data visualization.",
      challenge: "Organize massive real-time statistical data into an intuitive visual hierarchy, and design a storytelling experience that highlights AI prediction value.",
      challengeTitle: "Simplifying complex sports statistics for everyone.",
      challengeImg: "/sport_advisor_preview.png",
      decisions: [
        {
          title: "Gauge-Based Visuals",
          desc: "Replacing raw numeric tables with colorful probability gauges.",
          why: "Allows instant reading of match trends and likelihoods."
        },
        {
          title: "Contextual Filters",
          desc: "A filtering system based on relevance, sport category, and prediction reliability.",
          why: "Helps users isolate key betting opportunities quickly."
        }
      ],
      solution: "A structured interface using clear lists, AI-powered confidence percentages, and minimal graphs facilitating direct comparisons.",
      solutionTitle: "Visual storytelling and AI confidence indicators.",
      dashboardImg: "/imgs/assetiQ/advisor_image.png",
      features: [
        { title: "Prediction Engine", desc: "Daily sports tips generated by advanced deep learning models." },
        { title: "Odds Comparison", desc: "Real-time integration of the highest market betting odds." },
        { title: "Confidence Alerts", desc: "Push notifications when the AI detects significant odd anomalies." },
        { title: "Comparative Stats", desc: "Head-to-head match histories and team form simplified visually." }
      ],
      insight: "AI shouldn't just give an answer; it must explain its reasoning in a visual and transparent way to establish trust.",
      impact: [
        "50% increase in user engagement metrics",
        "Highly praised data readability from beta testers",
        "35% increase in Premium subscription conversions"
      ],
      conclusion: "Sport Advisor simplifies complex sports data, making it accessible, interactive and actionable through intentional design.",
      externalLink: "https://www.behance.net/gallery/232665713/Sport-Advisor-IA-dAnalyse-Sportive",
      ctaLabel: "VIEW PROJECT"
    },
    'beans': {
      title: "Beans",
      subtitle: "Customer Loyalty & Engagement SaaS Platform",
      label: "Lead Product Designer · B2B SaaS",
      color: "#10B981",
      bgImage: "/imgs/beans_cover.png",
      context: "In an e-commerce landscape where customer acquisition is increasingly costly, brands need to build lasting relationships with consumers. Beans is a customer loyalty SaaS platform empowering e-commerce and retail brands to launch custom reward programs integrated into their existing stack (Shopify, WooCommerce, Klaviyo, POS).",
      contextTitle: "Turning every transaction into a lasting relationship.",
      problem: "Loyalty programs involve complex variables: point earning rules, reward conditions, customer tiers, third-party integrations, and performance tracking. Without an intuitive tool, merchant setup becomes a technical bottleneck.",
      problemTitle: "Designing a simple SaaS experience for a complex system.",
      challenge: "Create a seamless admin dashboard enabling merchants to configure loyalty rules, connect daily marketing tools, and optimize retention strategy without technical friction.",
      challengeTitle: "Simplifying management while maximizing customer retention.",
      decisions: [
        {
          title: "No-Code Program Builder",
          desc: "An intuitive step-by-step workflow to set point earning rules, expiration dates, and VIP tiers.",
          why: "Enables merchants to deploy a complete loyalty program in under 15 minutes."
        },
        {
          title: "Connected Ecosystem Hub",
          desc: "Plug-and-play integration hub for Shopify, WooCommerce, Klaviyo, POS, and marketing tools.",
          why: "Centralizes purchasing and engagement data sync without developer overhead."
        },
        {
          title: "Analytics & Customer Insights",
          desc: "Actionable dashboard focusing on generated revenue and repeat purchase evolution.",
          why: "Transforms loyalty data into clear, strategic merchant decisions."
        }
      ],
      solution: "A comprehensive B2B SaaS platform centralizing rewards management, VIP tiers, referral programs, e-commerce integrations, and customer behavior analytics.",
      solutionTitle: "Unified SaaS experience for customer loyalty & engagement.",
      interfaceImg: "/imgs/beans_cover.png",
      features: [
        { title: "Loyalty Program", desc: "Custom point systems with eligibility rules and point expiration schedules." },
        { title: "VIP Tiers", desc: "Exclusive VIP levels and perks to reward highest-value customers." },
        { title: "Analytics & Insights", desc: "Real-time performance tracking and reward impact on average order value." },
        { title: "Seamless Integrations", desc: "Native connectivity with Shopify, Klaviyo, POS, and marketing tools." }
      ],
      insight: "A successful B2B SaaS product must balance three dimensions: Business (drive retention & value), User (simplify the complex), and Technology (build for scalability).",
      impact: [
        "Measurable increase in repeat purchases and customer retention for merchants",
        "Churn reduction through targeted VIP tiers and referral campaigns",
        "Rapid deployment with zero technical overhead or custom dev required",
        "Scalable design architecture prepared for future marketing feature rollouts"
      ],
      conclusion: "Beans redefines merchant loyalty management by turning complex technical rules into a seamless, high-converting growth engine.",
      externalLink: "https://www.trybeans.com"
    },
    'truvox': {
      title: "Truvox Studio",
      subtitle: "Digital experiences that bring clarity, build trust, and support business growth",
      label: "Web Design & Brand Experience",
      color: "#10B981",
      bgImage: "/imgs/truvox_cover.png",
      context: "Truvox is a digital design studio crafting exceptional digital experiences that bring clarity, build trust, and support business growth through Strategy, Design, and Development.",
      contextTitle: "Combining strategic clarity with visual excellence.",
      challenge: "Design a modern brand identity and sleek, interactive studio website reflecting Truvox's commitment to quality craftsmanship and technical precision.",
      challengeTitle: "Embodying creative and technical excellence.",
      decisions: [
        {
          title: "Sleek Art Direction",
          desc: "Bold typography, deep dark contrast, and minimalist motion design.",
          why: "Instantly showcases the studio's design mastery within seconds."
        },
        {
          title: "Conversion-Oriented Flow",
          desc: "Clear path connecting strategic positioning, work portfolio, and quote requests.",
          why: "Streamlines lead generation for high-intent clients."
        }
      ],
      solution: "A modern studio website featuring a striking visual identity, combining high-end art direction with responsive, performant web development.",
      solutionTitle: "High-end digital showcase for Truvox Studio.",
      features: [
        { title: "Strategy & Positioning", desc: "Clear brand messaging aligned with business growth goals." },
        { title: "Experience Design", desc: "Modern interactive interfaces crafted for user engagement." },
        { title: "Development & Motion", desc: "Smooth, responsive, and performance-optimized web build." }
      ],
      insight: "A creative studio's digital presence must serve as the primary proof of its execution quality.",
      impact: [
        "Memorable and distinct brand identity",
        "Fluid navigation and premium user experience",
        "Increased inbound client leads and quote requests"
      ],
      conclusion: "Truvox Studio demonstrates the harmony between creative vision, strategic rigor, and web performance.",
      externalLink: "https://www.truvox.studio/"
    },
    'tavares': {
      title: "Tavares",
      subtitle: "Interactive cinematic portfolio for a film director",
      label: "Creative Web Design & Development",
      color: "#E50914",
      bgImage: "/imgs/tavares.png",
      context: "Film director Tavares sought a unique digital portfolio that reflected his cinematic universe. Traditional portfolios clutter the interface, distracting from the videos.",
      contextTitle: "Sublimating cinematic work without visual clutter.",
      challenge: "Create an ultra-minimalist, modern website serving as a fluid visual frame where the interface disappears to make the videos the focal point.",
      challengeTitle: "Designing an invisible interface to highlight motion picture.",
      challengeImg: "/imgs/tavares.png",
      decisions: [
        {
          title: "Full-Screen Player",
          desc: "Opening videos in a deeply immersive lightbox overlay upon click.",
          why: "Allows appreciation of film quality without browser clutter."
        },
        {
          title: "Fluid Transitions",
          desc: "Micro-animations driven by scroll triggers and hover states.",
          why: "Creates a visual pace resembling film montage editing."
        }
      ],
      solution: "A refined website with fluid transitions, optimized video streaming, and a built-in immersive video player. The design relies on strong typography and deep black tones.",
      solutionTitle: "Immersive space, optimized streaming, and high contrast.",
      dashboardImg: "/imgs/tavares.png",
      features: [
        { title: "Immersive Showreel", desc: "Demo reel playing in the background with subtle mute controls." },
        { title: "Asymmetrical Gallery", desc: "Creative grid layout showing off poster art and film stills." },
        { title: "Video Optimization", desc: "Smooth video streaming tailored for mobile network connections." },
        { title: "Direct Contact", desc: "Clean email form for production inquiries and collaborations." }
      ],
      insight: "In creative fields, the interface must serve the content, not the other way around. Design invisibility is its greatest strength.",
      impact: [
        "Increased engagement from production companies",
        "Average showreel play duration exceeding 70%",
        "A strong digital presence that stands out in the film industry"
      ],
      conclusion: "Tavares' website successfully combines minimalism, premium aesthetics, and technical performance to elevate his cinematic art.",
      externalLink: "https://portfolio-tavares.vercel.app/"
    },
    'the-refuge': {
      title: "The Refuge",
      subtitle: "Christian humanitarian portal & live impact tracker in Cotonou",
      label: "Web Design & Development",
      color: "#0d3479",
      bgImage: "/imgs/your-refuge.jpg",
      context: "Based in Cotonou, Benin, The Refuge is a Christian humanitarian organization dedicated to providing clothing, menstrual hygiene kits for underprivileged women, spiritual support, and dignity to vulnerable street populations. To expand its reach, the association needed a modern digital platform to connect donors and volunteers with concrete, daily field operations.",
      contextTitle: "Emergency humanitarian aid and counseling in Cotonou.",
      challenge: "Translate real field compassion and social impact into a reliable, engaging web application. The core UX challenge was to address donation skepticism by displaying real-time impact metrics (clothing items distributed, menstrual hygiene kits provided, active reinsertions) alongside transparent stories.",
      challengeTitle: "Fostering trust and coordinating volunteer efforts.",
      solution: "We designed and developed a responsive web application featuring live impact progress gauges, a simplified volunteer onboarding portal, and a secure checkout flow tailored for West African Mobile Money and cards. The visual design is accented by custom hand-drawn doodles to bring a warm, human touch.",
      solutionTitle: "A modern, transparent, and human-centric portal.",
      insight: "Absolute transparency drives donor retention. Showing real-time field progress and specific budget goals doubled donor repeat rates and successfully mobilized dozens of local volunteers.",
      contextImg: "/imgs/your-refuge.jpg",
      challengeImg: "/imgs/your-refuge.jpg",
      dashboardImg: "/imgs/your-refuge.jpg",
      features: [
        { title: "Live Impact Gauges", desc: "Visual progress tracking for clothing distributed (1,240+ clothing items), menstrual hygiene kits provided to women in need, and professional reinsertions." },
        { title: "Local Currency Donations", desc: "Secure, seamless donation form supporting West African Mobile Money (MTN, Moov) and international credit cards." },
        { title: "Volunteer Coordination", desc: "Streamlined sign-up forms for local weekend distribution outreaches (clothing & hygiene kits) and active listening rooms." },
        { title: "Stories from the Field", desc: "A clean blog section showcasing true stories from Cotonou (like Marie's journey or reflections on Luke 3:11) to highlight the human impact." }
      ],
      impact: [
        "1,240+ clothing items tracked and distributed with total financial transparency",
        "850+ menstrual hygiene kits provided to underprivileged women to restore dignity",
        "12+ street beneficiaries professionally trained and reinserted into society",
        "60% increase in recurring donations due to transparent impact tracking"
      ],
      conclusion: "The new web portal for The Refuge demonstrates how digital design and transparent data tracking can empower social causes, successfully bridging the gap between online donors and lives transformed on the streets of Cotonou.",
      externalLink: "https://your-refuge.vercel.app/"
    },
    'strategy-arena': {
      title: "Strategy Arena",
      subtitle: "Strategy, organization, and digital transformation consulting for SMEs in West Africa",
      label: "Branding, Web Design & Development",
      color: "#F4E723",
      bgImage: "/imgs/Strategy-Arena.png",
      context: "Strategy Arena is a strategy and organization consulting firm based in Cotonou, Benin. With the rapid digitization and structural needs of West African SMEs, the firm provides operational audits and pragmatic support. To establish its credibility and attract growing SMEs, Strategy Arena required a strong brand identity and a premium online presence matching its expertise.",
      contextTitle: "A precise diagnosis, before any solution.",
      challenge: "The main challenge was to design a modern, minimalist branding that breaks away from traditional, dull consulting codes. We needed to create a high-performance, smooth, and highly interactive showcase website that reflects the firm's methodological rigor while delivering a flawless user experience (UX) on both mobile and desktop.",
      challengeTitle: "Blending modern branding, smoothness, and performance.",
      solution: "We crafted a complete visual identity (logo, typography, canary yellow and absolute black color palette) and developed a modern, asymmetrical showcase website. The interface features smooth interactive micro-animations, a dynamic preloader, and detailed service pages structured to maximize conversions.",
      solutionTitle: "Distinctive branding, micro-animations, and conversion.",
      insight: "High-end design and technical smoothness are immediate trust signals in the consulting sector. A fast, aesthetic website converts qualified prospects long before the first meeting.",
      dashboardImg: "/imgs/Strategy-Arena.png",
      features: [
        { title: "Unique Brand Identity", desc: "Modern logo and high-contrast canary yellow/black color palette." },
        { title: "Interactive Preloader", desc: "A smooth intro animation optimizing initial loading times." },
        { title: "Structured Services", desc: "Clear display of the four core offerings (Diagnosis, Structure, Transformation, Growth)." },
        { title: "Operational Results", desc: "Concrete results showcased for Benin Distribution, Sahel Foods, and Atlantique Logistique." }
      ],
      impact: [
        "Immediately recognizable high-end brand identity",
        "Increased user engagement and session duration on the website",
        "Simplified lead generation through a seamless contact funnel",
        "A digital showcase validating the firm's digital transformation expertise"
      ],
      conclusion: "Strategy Arena's new website positions the firm as a modern and essential partner for the digitization and restructuring of SMEs in West Africa.",
      externalLink: "https://strategie-arena.com/"
    },
    'dolce-riviera': {
      title: "Dolce Riviera",
      subtitle: "Premium landing page concept for luxury hospitality on the Riviera",
      label: "Product Design & UI Design",
      color: "#C5A059",
      bgImage: "/imgs/dolce_cover.png",
      context: "Dolce Riviera is a landing page concept designed for a luxury brand inspired by the timeless elegance of the Mediterranean Riviera. The goal was to create an immersive experience showcasing refinement, exclusivity, and art de vivre through a modern and minimalist interface.",
      contextTitle: "The timeless elegance of the Riviera.",
      challenge: "Structuring a clear visual hierarchy oriented towards conversion while preserving a premium and clean art direction. The interface had to balance immersive visual storytelling and smooth user experience across desktop and mobile devices.",
      challengeTitle: "Balancing high-end aesthetics with conversion goals.",
      decisions: [
        {
          title: "Sober Art Direction",
          desc: "Using a refined color palette accented with warm gold and sand tones.",
          why: "Evokes the understated prestige of the French Riviera while reinforcing brand credibility."
        },
        {
          title: "Whitespace Integration",
          desc: "Implementing generous spacing and high-contrast typography.",
          why: "Allows immersive visuals to breathe and structures information without overloading the user."
        },
        {
          title: "Simplified Booking Flow",
          desc: "Designing a direct and intuitive booking path accessible at all times.",
          why: "Maximizes conversion opportunities without disrupting the visual narrative."
        }
      ],
      solution: "A minimalist and elegant interface focusing on visual storytelling and fluid booking paths. The asymmetrical layout and careful typography guide the user naturally from discovery to action.",
      solutionTitle: "Immersive visual storytelling and integrated booking paths.",
      uxSolutions: "Information hierarchy: each section acts as a chapter of an exclusive experience, prompting action through detailed micro-interactions.",
      dashboardImg: "/imgs/dolce_cover.png",
      features: [
        { title: "Clear Visual Hierarchy", desc: "Optimized layout designed to structure content and guide users to key actions." },
        { title: "Premium Art Direction", desc: "Sober palette, curated typography, and high-quality visuals evoking prestige." },
        { title: "Fluid Responsive UX", desc: "Optimized user experience ensuring seamless navigation on both desktop and mobile." },
        { title: "Visual Storytelling", desc: "Careful presentation of spaces, premium services, and exclusive lifestyle offers." }
      ],
      insight: "In luxury design, simplicity is the ultimate sophistication. Visual balance and understated animations create a sense of calm and exclusivity.",
      impact: [
        "Strong brand identity and elevated credibility through design",
        "Seamless visual hierarchy optimizing booking flows",
        "Immersive experience inviting users to discover exclusive offers"
      ],
      conclusion: "Dolce Riviera harmonizes high-end aesthetics with transactional conversion goals through a refined and effective user journey.",
      externalLink: "https://www.behance.net/gallery/252335895/Dolce-Riviera-Luxury-Hospitality-Landing-Page-Concept",
      ctaLabel: "VIEW PROJECT"
    }
  }
};
