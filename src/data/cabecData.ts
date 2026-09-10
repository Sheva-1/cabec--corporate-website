import { ServicePillar, CaseStudy, FAQItem } from '../types';

export const COMPANY_INFO = {
  legalName: 'CABINET BELKAL CONSULTING SARLU',
  brandName: 'CABEC',
  slogan: 'Conseil • Solutions digitales • Innovation',
  englishSlogan: 'Advisory • Digital Solutions • Innovation',
  address: 'Yassa, Douala, Cameroun',
  city: 'Douala',
  region: 'Littoral',
  country: 'Cameroun',
  phone1: '+237 697 367 801',
  phone1Raw: '237697367801',
  phone2: '+237 620 125 490',
  phone2Raw: '237620125490',
  email: 'info@cabecs.com',
  taxId: 'M072618899069X',
  rccm: '2026-B13-00621',
  workingHours: 'Lundi - Vendredi : 08h00 - 18h00 | Samedi : Sur rendez-vous',
  whatsappDirectUrl: (message?: string) => {
    const text = encodeURIComponent(
      message || 'Bonjour CABEC, je souhaite obtenir un échange avec vos consultants concernant un projet.'
    );
    return `https://wa.me/237697367801?text=${text}`;
  }
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'conseil-strategie',
    title: 'Conseil & Stratégie',
    subtitle: 'Pilotage & Performance Institutionnelle',
    description: 'Accompagnement de haut niveau des directions générales, PME et institutions publiques dans l’élaboration de stratégies d’expansion et l’optimisation des processus opérationnels.',
    accentColor: '#0066B3',
    badge: 'Direction & Gouvernance',
    services: [
      {
        id: 'strat-management',
        title: 'Conseil en management et stratégie',
        shortDesc: 'Définition de plans stratégiques quinquennaux, restructuration et gouvernance d’entreprise.',
        fullDesc: 'Nous aidons les comités de direction à clarifier leur feuille de route, arbitrer leurs investissements prioritaires et instaurer des systèmes de gouvernance fiables conformes aux normes OHADA.',
        deliverables: ['Plan d’Orientation Stratégique (POS)', 'Matrice d’arbitrage décisionnel', 'Tableaux de bord prospectifs (Balanced Scorecard)'],
        targetAudience: 'Directeurs Généraux, Conseils d’administration, Fonds d’investissement',
        iconName: 'Compass'
      },
      {
        id: 'strat-orga',
        title: 'Organisation et développement organisationnel',
        shortDesc: 'Revue des processus métier, organigrammes cibles et optimisation des coûts opérationnels.',
        fullDesc: 'Élimination des goulots d’étranglement, rationalisation des flux d’information et redéfinition des fiches de postes pour stimuler l’agilité opérationnelle.',
        deliverables: ['Cartographie des processus (BPMN)', 'Manuel des procédures administratives et financières', 'Plan de rationalisation des effectifs'],
        targetAudience: 'DRH, Directeurs des Opérations, Secrétariats Généraux',
        iconName: 'Building2'
      },
      {
        id: 'strat-ingenierie',
        title: 'Études, ingénierie et diagnostic préalable',
        shortDesc: 'Études de faisabilité technico-économique et modélisations de rentabilité de projets.',
        fullDesc: 'Analyses de marché rigoureuses en Afrique centrale, calculs de VAN/TRI et scénarios de sensibilité pour sécuriser les décisions de lancement.',
        deliverables: ['Dossier d’analyse de rentabilité', 'Business plan bancable', 'Évaluation des risques réglementaires et fiscaux'],
        targetAudience: 'Porteurs de projets, Investisseurs, Banques de développement',
        iconName: 'LineChart'
      },
      {
        id: 'strat-commercial',
        title: 'Accompagnement commercial et pénétration de marché',
        shortDesc: 'Stratégie go-to-market, structuration de la force de vente et partenariats B2B.',
        fullDesc: 'Positionnement concurrentiel ciblé pour capter des parts de marché durables au Cameroun et dans l’espace CEMAC.',
        deliverables: ['Playbook commercial B2B', 'Grille tarifaire dynamique', 'Accords-cadres de sous-traitance'],
        targetAudience: 'Directions Commerciales, Filiales de multinationales',
        iconName: 'TrendingUp'
      }
    ]
  },
  {
    id: 'solutions-digitales',
    title: 'Solutions Digitales & Systèmes',
    subtitle: 'Ingénierie Logicielle & Transformation Numérique',
    description: 'Conception, ingénierie logicielle robuste et déploiement de plateformes numériques sécurisées pour automatiser les métiers et valoriser vos données.',
    accentColor: '#1686C7',
    badge: 'Ingénierie & Tech',
    services: [
      {
        id: 'dig-software',
        title: 'Développement de logiciels sur-mesure & ERP',
        shortDesc: 'Applications métier taillées pour les réalités opérationnelles africaines.',
        fullDesc: 'Création d’applications de gestion (ERP légers, facturation, suivi de stocks, portails B2B) fonctionnant de façon résiliente avec ou sans connectivité permanente.',
        deliverables: ['Code source documenté', 'Architecture cloud scalable', 'API REST/GraphQL intégrées'],
        targetAudience: 'Entreprises en croissance, Distributeurs, Établissements de crédit',
        iconName: 'Code2'
      },
      {
        id: 'dig-mobile-web',
        title: 'Applications web et mobiles haute performance',
        shortDesc: 'Interfaces réactives iOS/Android et applications web progressives (PWA).',
        fullDesc: 'Développement d’expériences utilisateurs fluides intégrant les passerelles de paiement locales (Mobile Money MTN/Orange, cartes bancaires) et notifications push.',
        deliverables: ['App mobile Android / iOS', 'Portail web sécurisé', 'Console d’administration temps réel'],
        targetAudience: 'Startups, Services financiers, Entreprises de services',
        iconName: 'Smartphone'
      },
      {
        id: 'dig-automation',
        title: 'Automatisation des processus & Intégration de flux',
        shortDesc: 'Suppression des saisies manuelles redondantes et interconnexion de logiciels.',
        fullDesc: 'Automatisation des flux administratifs, validation de factures et reporting automatisé par e-mail et WhatsApp Business API.',
        deliverables: ['Pipelines d’automatisation', 'Interfaçage API logiciels tiers', 'Audit de sécurité des flux'],
        targetAudience: 'Directions financières, Pôles logistiques',
        iconName: 'Cpu'
      },
      {
        id: 'dig-maintenance',
        title: 'Maintenance informatique, infogérance et support',
        shortDesc: 'Maintien en conditions opérationnelles, sauvegardes chiffrées et surveillance 24/7.',
        fullDesc: 'Contrats de support technique avec SLA garanti, audit d’infrastructure réseau et prévention des cyber-menaces.',
        deliverables: ['Contrat d’assistance SLA garanti', 'Sauvegardes multi-sites hors-ligne', 'Rapport mensuel de monitoring'],
        targetAudience: 'PME sans DSI interne, Institutions bancaires',
        iconName: 'ShieldCheck'
      }
    ]
  },
  {
    id: 'gestion-projets',
    title: 'Gestion de Projets & Suivi-Évaluation',
    subtitle: 'Rigueur Méthodologique & Mesure d’Impact',
    description: 'Pilotage opérationnel de programmes complexes, audit de conformité et systèmes de suivi-évaluation aux standards des bailleurs de fonds internationaux.',
    accentColor: '#4F8B50',
    badge: 'Projets & Programmes',
    services: [
      {
        id: 'proj-pm',
        title: 'Direction et gestion de projets complexes',
        shortDesc: 'Coordination pluridisciplinaire, respect strict des jalons et du budget alloué.',
        fullDesc: 'Application des méthodologies PMI/Prince2 et agiles adaptées au contexte local pour livrer vos chantiers stratégiques sans dérapage budgétaire.',
        deliverables: ['Matrice des risques projet', 'Planning de GANTT consolidé', 'Rapports d’avancement hebdomadaires'],
        targetAudience: 'Bailleurs, Multinationales, Agences gouvernementales',
        iconName: 'Kanban'
      },
      {
        id: 'proj-eval',
        title: 'Suivi et évaluation de projets et programmes (S&E)',
        shortDesc: 'Indicateurs de performance mesurables, évaluations à mi-parcours et ex-post.',
        fullDesc: 'Mise en place de bases de données de collecte mobile (KoboToolbox/ODK) et calcul rigoureux de l’impact socio-économique réel.',
        deliverables: ['Cadre logique consolidé', 'Plateforme de collecte de données terrain', 'Rapport d’évaluation d’impact certifié'],
        targetAudience: 'ONG internationales, Organismes de développement, Ministères',
        iconName: 'CheckCircle2'
      }
    ]
  },
  {
    id: 'formations',
    title: 'Formation & Renforcement des Capacités',
    subtitle: 'Capital Humain & Montée en Compétences',
    description: 'Programmes de perfectionnement pour cadres, dirigeants et équipes opérationnelles dans les domaines du management, des outils numériques et de la gestion de projets.',
    accentColor: '#0066B3',
    badge: 'Académie CABEC',
    services: [
      {
        id: 'form-catalogue',
        title: 'Catalogue certifiant inter-entreprises',
        shortDesc: 'Formations pratiques intensives animées par des praticiens seniors.',
        fullDesc: 'Cursus ciblés sur le leadership managérial, l’analyse de données (Excel avancé/PowerBI), la gestion de projets et la cyber-hygiène.',
        deliverables: ['Supports de formation numériques', 'Études de cas réelles contextualisées', 'Certificat officiel d’aptitude professionnelle'],
        targetAudience: 'Cadres intermédiaires, Chefs de projets, Contrôleurs de gestion',
        iconName: 'GraduationCap'
      },
      {
        id: 'form-custom',
        title: 'Formations sur-mesure intra-entreprise',
        shortDesc: 'Ingénierie pédagogique adaptée aux défis et outils spécifiques de votre structure.',
        fullDesc: 'Diagnostic préalable des lacunes de compétences, conception de modules propriétaires et suivi post-formation pour ancrer les acquis.',
        deliverables: ['Audit des besoins en compétences', 'Module de formation customisé', 'Évaluation à 60 jours du transfert en situation de travail'],
        targetAudience: 'Directions des Ressources Humaines, Comités exécutifs',
        iconName: 'Users'
      }
    ]
  },
  {
    id: 'immobilier',
    title: 'Immobilier d’Entreprise & Investissement',
    subtitle: 'Sécurisation Foncière & Valorisation d’Actifs',
    description: 'Conseil patrimonial et accompagnement des investisseurs institutionnels et de la diaspora dans la sélection, la gestion et la valorisation de biens immobiliers à Douala.',
    accentColor: '#4F8B50',
    badge: 'Patrimoine & Actifs',
    services: [
      {
        id: 'immo-conseil',
        title: 'Conseil aux investisseurs & Études foncières',
        shortDesc: 'Vérification de titres fonciers, analyses de rentabilité locative et assistance notariale.',
        fullDesc: 'Élimination des risques d’insécurité foncière grâce à des audits juridiques rigoureux auprès des conservations foncières du Wouri et du Littoral.',
        deliverables: ['Rapport de conformité foncière', 'Modèle financier de rendement locatif', 'Assistance à la transaction sécurisée'],
        targetAudience: 'Investisseurs de la diaspora, Sociétés civiles immobilières, Promoteurs',
        iconName: 'Home'
      },
      {
        id: 'immo-gestion',
        title: 'Gestion et intermédiation d’actifs professionnels',
        shortDesc: 'Recherche d’implantations d’entreprises, gestion locative et valorisation de parcs.',
        fullDesc: 'Accompagnement des entreprises pour trouver leurs sièges sociaux, entrepôts logistiques à Yassa/Douala Port et gestion rigoureuse des baux.',
        deliverables: ['Mandat de recherche ciblée', 'Bail commercial conforme OHADA', 'Gestion des flux locatifs et recouvrement'],
        targetAudience: 'Entreprises cherchant des locaux, Propriétaires d’immeubles professionnels',
        iconName: 'Key'
      }
    ]
  }
];

export const METHOD_STEPS = [
  {
    step: '01',
    title: 'Diagnostic & Immersion',
    timeframe: 'Semaine 1',
    desc: 'Audit approfondi de vos processus existants, entretiens avec les parties prenantes et formalisation précise du besoin et des contraintes.',
    deliverable: 'Rapport de cadrage & Feuille de route validée'
  },
  {
    step: '02',
    title: 'Conception & Architecture',
    timeframe: 'Semaine 2 - 3',
    desc: 'Élaboration de la stratégie d’intervention, design des solutions techniques ou des processus organisationnels avec modélisation financière.',
    deliverable: 'Dossier d’ingénierie & Prototype interactif'
  },
  {
    step: '03',
    title: 'Déploiement & Conduite du Changement',
    timeframe: 'Semaine 4 - 6',
    desc: 'Mise en œuvre agile par itérations contrôlées, intégration continue et formation des équipes terrain pour une adoption rapide.',
    deliverable: 'Livrables opérationnels & Ateliers de formation'
  },
  {
    step: '04',
    title: 'Mesure d’Impact & Pérennisation',
    timeframe: 'Suivi continu',
    desc: 'Vérification des indicateurs clés de performance (KPI), ajustements correctifs et mise en place d’une gouvernance autonome.',
    deliverable: 'Bilan d’évaluation & Transfert de compétences'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-distrib-douala',
    title: 'Digitalisation des tournées commerciales & suivi logistique',
    clientCategory: 'Société de Distribution de Produits de Grande Consommation',
    location: 'Douala (Zone Industrielle de Bassa)',
    pillarId: 'solutions-digitales',
    context: 'Entreprise de 85 salariés enregistrant des retards de facturation et des pertes d’information lors des livraisons terrain.',
    challenge: 'Les bons de livraison papier étaient perdus ou traités avec 5 jours de décalage, créant des tensions de trésorerie.',
    solution: 'Déploiement d’une application mobile Android offline-first pour les livreurs et chauffeurs couplée à un portail web d’administration en temps réel.',
    results: [
      '-82% d’erreurs et de litiges de livraison',
      'Facturation ramenée de 5 jours à 4 heures',
      'Visibilité GPS temps réel sur 24 véhicules de livraison'
    ],
    technologiesOrMethods: ['React Native', 'Node.js', 'PostgreSQL', 'Intégration Mobile Money']
  },
  {
    id: 'case-ong-eval',
    title: 'Audit organisationnel & système de suivi-évaluation pour programme éducatif',
    clientCategory: 'Consortium d’ONG Internationales',
    location: 'Yaoundé & Région de l’Est Cameroun',
    pillarId: 'gestion-projets',
    context: 'Programme pluriannuel financé par un bailleur multilatéral touchant 42 centres de formation ruraux.',
    challenge: 'Absence d’indicateurs harmonisés et difficultés à mesurer l’insertion professionnelle réelle des jeunes apprenants.',
    solution: 'Restructuration du cadre logique, formation de 30 coordinateurs de terrain et mise en place d’une plateforme cloud de collecte sécurisée.',
    results: [
      '100% de données collectées conformes aux exigences du bailleur',
      'Tableau de bord de gouvernance en temps réel pour le comité de pilotage',
      'Reconduction du financement pour une phase 2 de 3 ans'
    ],
    technologiesOrMethods: ['Cadre Logique Harmonisé', 'KoboToolbox', 'PowerBI', 'Formation terrain']
  },
  {
    id: 'case-pme-restructuration',
    title: 'Restructuration managériale & optimisation des coûts d’exploitation',
    clientCategory: 'PME Agro-industrielle en forte croissance',
    location: 'Littoral & Sud-Ouest',
    pillarId: 'conseil-strategie',
    context: 'Entreprise familiale passant de 15 à 60 collaborateurs avec une perte de productivité et des tensions managériales.',
    challenge: 'Confusion des rôles, surcharge de la direction générale et marges opérationnelles en baisse de 14%.',
    solution: 'Diagnostic organisationnel complet, refonte de l’organigramme avec fiches de délégation de pouvoir et manuel de procédures internes.',
    results: [
      '+18% de rentabilité nette en 9 mois',
      'Délégation effective de 70% des décisions opérationnelles',
      'Zéro litige prud’homal grâce aux contrats réalignés OHADA'
    ],
    technologiesOrMethods: ['Audit organisationnel 360°', 'Manuel de procédures OHADA', 'Balanced Scorecard']
  },
  {
    id: 'case-immo-logistique',
    title: 'Sécurisation foncière & implantation d’une plateforme logistique',
    clientCategory: 'Groupe d’Investisseurs de la Diaspora Camerounaise',
    location: 'Yassa / Axe Lourd Douala-Yaoundé',
    pillarId: 'immobilier',
    context: 'Acquisition d’une parcelle de 4 500 m² pour la construction d’entrepôts frigorifiques et bureaux administratifs.',
    challenge: 'Historique foncier complexe avec multiplicité de revendications coutumières nécessitant une sécurisation juridique totale.',
    solution: 'Audit juridique des titres, coordination avec le cadastre et le notariat, et montage du dossier de permis de construire.',
    results: [
      'Titre foncier individuel net et purgé de tout privilège obtenu',
      'Gain de 3 mois sur le calendrier initial de transaction',
      'Économie de 15% sur les frais d’acquisition négociés'
    ],
    technologiesOrMethods: ['Audit Titre Foncier', 'Expertise notariale', 'Due diligence juridique']
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Général',
    question: 'Quelle est la valeur ajoutée de CABEC par rapport à d’autres cabinets ?',
    answer: 'CABEC (Cabinet Belkal Consulting SARLU) combine une triple expertise rare : le conseil stratégique de direction, l’ingénierie logicielle concrète et l’ancrage territorial fort à Douala. Contrairement aux cabinets généralistes qui ne produisent que des rapports théoriques, nous développons nous-mêmes les outils technologiques et formons vos équipes pour garantir des résultats chiffrés.'
  },
  {
    category: 'Intervention',
    question: 'Intervenez-vous uniquement à Douala ou sur l’ensemble de la sous-région ?',
    answer: 'Notre siège social est implanté à Yassa, Douala, mais nos équipes et consultants interviennent sur l’ensemble du Cameroun (Yaoundé, Kribi, Bafoussam, Garoua), dans la zone CEMAC (Tchad, Gabon, Congo, Guinée Équatoriale, RCA) ainsi qu’à distance pour des partenaires internationaux.'
  },
  {
    category: 'Solutions Digitales',
    question: 'Comment garantissez-vous la sécurité et la pérennité de vos développements logiciels ?',
    answer: 'Tous nos logiciels sont développés selon des standards industriels stricts (code versionné, sauvegardes automatisées, chiffrement des données de bout en bout, tests unitaires). Vous restez propriétaire exclusif de votre code source et de vos bases de données, avec un contrat de maintenance et de transfert de compétences.'
  },
  {
    category: 'Tarifs & Contrats',
    question: 'Comment sont établis vos devis et conditions de paiement ?',
    answer: 'Chaque mission fait l’objet d’un cadrage préalable gratuit aboutissant à une proposition technique et financière détaillée (au forfait avec livrables datés ou en régie assistée). Nous proposons des facilités d’échelonnement selon les jalons de validation, et acceptons les virements bancaires conformes CEMAC ainsi que les paiements sécurisés.'
  },
  {
    category: 'Formation',
    question: 'Les formations de l’Académie CABEC sont-elles éligibles au plan de formation des entreprises ?',
    answer: 'Oui. En tant que cabinet régulièrement enregistré au RCCM (2026-B13-00621) et disposant d’un numéro fiscal (M072618899069X), nos factures de formation professionnelle sont fiscalement déductibles dans le cadre de la politique de renforcement des compétences de votre entreprise.'
  }
];
