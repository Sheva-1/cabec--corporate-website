import { ServicePillar, MethodStep, CaseStudy, FAQItem, Language } from '../types';

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    // Top Bar
    'topbar.headquarters': 'Siège :',
    'topbar.rccm': 'RCCM :',
    'topbar.taxId': 'N° Contribuable :',
    'topbar.whatsapp': 'WhatsApp Direct',
    'topbar.lang': 'Langue',

    // Navigation
    'nav.home': 'Accueil',
    'nav.expertises': 'Expertises',
    'nav.methodology': 'Méthodologie',
    'nav.caseStudies': 'Réalisations',
    'nav.diagnostic': 'Diagnostic',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.consultationBtn': 'Demander une consultation',
    'nav.quoteBtn': 'Devis',
    'nav.menuAria': 'Ouvrir le menu',
    'nav.dropdownTitle': "Les 5 Pôles d'intervention CABECS",

    // Hero Section
    'hero.badge': 'CABINET BELKAL CONSULTING SARLU • Douala, Cameroun',
    'hero.titlePre': 'Conseil en Stratégie, ',
    'hero.titleHighlight1': 'Solutions Digitales',
    'hero.titleMid': ' & ',
    'hero.titleHighlight2': 'Innovation',
    'hero.titlePost': ' en Afrique Centrale',
    'hero.description': 'CABECS accompagne les entreprises, institutions publiques, investisseurs et porteurs de projets dans leur développement à fort impact. Nous transformons les défis de gestion et de technologie en leviers de croissance pérennes.',
    'hero.taxPayer': 'Contribuable :',
    'hero.location': 'Implantation :',
    'hero.locationVal': 'Yassa, Douala',
    'hero.ctaConsultation': 'Demander un cadrage de projet',
    'hero.ctaWhatsApp': 'Échanger sur WhatsApp',
    'hero.guarantee1': 'Diagnostics opérationnels réels',
    'hero.guarantee2': 'Code souverain & sécurisé',
    'hero.guarantee3': 'Conformité juridique OHADA',
    'hero.cardHeader': 'Cabinet d’Études & d’Ingénierie Agréé',
    'hero.cardStatus': 'Enregistré & Actif',
    'hero.cardPillarsTitle': '5 Pôles d’Excellence Opérationnelle',
    'hero.cardCta': 'Planifier un audit d’orientation',

    // Pillars Section
    'pillars.badge': 'Compétences & Métiers',
    'pillars.title': 'Une Offre Structurée en 5 Pôles d’Excellence',
    'pillars.subtitle': 'Pour répondre aux défis spécifiques des décideurs au Cameroun et en Afrique centrale, CABECS organise ses expertises en divisions claires et complémentaires.',
    'pillars.deliverablesTitle': 'Livrables concrets remis :',
    'pillars.targetTitle': 'Cible prioritaire :',
    'pillars.requestQuote': 'Demander un cadrage pour cette expertise',
    'pillars.scheduleConsultation': 'Planifier un échange technique',

    // Diagnostic Wizard
    'diagnostic.badge': 'Outil Interactif & Simulateur',
    'diagnostic.title': 'Évaluez & Cadrez Votre Projet en 3 Minutes',
    'diagnostic.subtitle': 'Précisez la nature de votre structure et vos priorités. Recevez une estimation méthodologique personnalisée et un retour de nos consultants sous 24h ouvrées.',
    'diagnostic.step1Title': '1. Votre Organisation',
    'diagnostic.step2Title': '2. Besoin Prioritaire',
    'diagnostic.step3Title': '3. Coordonnées & Cadrage',
    'diagnostic.orgQuestion': 'Quelle est la typologie de votre structure ?',
    'diagnostic.pillarQuestion': 'Quel domaine d’intervention prioritaire ciblez-vous ?',
    'diagnostic.timeframeQuestion': 'Quel est votre horizon de démarrage souhaité ?',
    'diagnostic.btnNext': 'Étape suivante',
    'diagnostic.btnPrev': 'Retour',
    'diagnostic.btnSubmit': 'Recevoir mon cadrage préliminaire',
    'diagnostic.btnSubmitting': 'Traitement en cours...',
    'diagnostic.fullName': 'Nom complet & Fonction',
    'diagnostic.organization': 'Organisation / Entreprise',
    'diagnostic.email': 'Adresse email professionnelle',
    'diagnostic.phone': 'Téléphone (avec indicatif WhatsApp)',
    'diagnostic.description': 'Description succincte du projet ou des objectifs (optionnel)',
    'diagnostic.consent': 'J’accepte que CABECS traite ces informations dans le cadre strict et confidentiel de ma demande (Loi N° 2010/012 & OHADA).',
    'diagnostic.successTitle': 'Demande de Cadrage Enregistrée !',
    'diagnostic.successDesc': 'Votre simulation a bien été transmise à notre comité de direction. Un consultant senior CABECS prendra attache avec vous sous 24h ouvrées.',
    'diagnostic.directWhatsAppCta': 'Accélérer l’échange sur WhatsApp',
    'diagnostic.reset': 'Effectuer une nouvelle simulation',

    // Methodology Section
    'method.badge': 'Rigueur & Engagement',
    'method.title': 'Notre Méthode d’Intervention en 4 Jalons',
    'method.subtitle': 'Chaque projet est gouverné par un protocole précis, garantissant la tenue des délais, la transparence budgétaire et l’adoption par vos équipes.',
    'method.deliverableLabel': 'Livrable contractuel :',
    'method.ctaTitle': 'Vous souhaitez formaliser une feuille de route pour votre organisation ?',
    'method.ctaButton': 'Initier un cadrage méthodologique',

    // Case Studies Section
    'case.badge': 'Retours d’Expérience',
    'case.title': 'Réalisations & Modèles d’Intervention',
    'case.subtitle': 'Exemples concrets de défis résolus par les consultants et ingénieurs de CABECS pour des organisations au Cameroun.',
    'case.all': 'Tous les domaines',
    'case.challenge': 'Défi rencontré :',
    'case.solution': 'Intervention CABECS :',
    'case.resultsTitle': 'Impact & Résultats quantifiés :',
    'case.techTitle': 'Méthodologies & Technologies :',
    'case.disclaimer': 'Avis de transparence : Les études de cas ci-après représentent des modèles d’interventions types et méthodologies éprouvées par nos consultants au Cameroun. Les indicateurs sont communiqués à titre indicatif et ne constituent pas une garantie contractuelle systématique pour les projets futurs.',
    'case.cta': 'Étudier un cas similaire pour mon entreprise',

    // Why CABECS Section
    'why.badge': 'L’Identité CABECS',
    'why.title': 'La Métaphore de l’Arbre : Stabilité, Croissance & Avenir',
    'why.subtitle': 'Notre emblème officiel associe l’arbre de vie, les montagnes et le fleuve : des racines profondément ancrées dans la rigueur pour une ramure tournée vers l’innovation durable.',
    'why.treeName': 'L’Arbre Vert',
    'why.treeDesc': 'Symbolise la croissance durable, l’expansion ordonnée et la transmission du savoir au sein des organisations.',
    'why.waterName': 'L’Eau & Le Fleuve',
    'why.waterDesc': 'Évoque la fluidité des flux opérationnels, la transformation numérique agile et l’ancrage portuaire de Douala.',
    'why.mountainName': 'Les Montagnes',
    'why.mountainDesc': 'Représentent la solidité des fondations managériales, la vision à long terme et l’altitude stratégique.',
    'why.emblemProtected': 'Emblème Déposé & Marque Protégée',

    // FAQ Section
    'faq.badge': 'Transparence & Process',
    'faq.title': 'Questions Fréquentes & Modalités',
    'faq.subtitle': 'Tout ce que vous devez savoir avant d’engager une mission de conseil ou un projet digital avec CABECS.',
    'faq.needHelp': 'Vous avez une question spécifique ou un cahier des charges ?',
    'faq.consultantDirect': 'Discutez en direct avec un consultant senior CABECS sans attente.',

    // Contact & Map
    'contact.badge': 'Siège & Coordonnées',
    'contact.title': 'Contactez le Cabinet Belkal Consulting SARLU',
    'contact.subtitle': 'Nos équipes vous accueillent à notre siège de Douala (Yassa) ou organisent des séances de travail en visioconférence sécurisée.',
    'contact.addressTitle': 'Adresse du Siège Social',
    'contact.phoneTitle': 'Lignes Directes',
    'contact.hoursTitle': 'Horaires d’Ouverture',
    'contact.directMsgTitle': 'Transmettre une Demande Formelle',
    'contact.directMsgDesc': 'Remplissez ce formulaire pour recevoir un devis ou convenir d’une entrevue avec un directeur de mission.',
    'contact.submitBtn': 'Envoyer ma demande',
    'contact.submitting': 'Envoi en cours...',
    'contact.success': 'Votre message a été transmis avec succès. Notre secrétariat vous répondra sous 24h ouvrées.',

    // Footer
    'footer.description': 'Cabinet d’études, de conseil en management, d’ingénierie logicielle et de gestion de projets. Immatriculé au RCCM de Douala et intervenant dans l’espace CEMAC.',
    'footer.quickLinks': 'Navigation Rapide',
    'footer.legalTitle': 'Conformité & Juridique',
    'footer.contactTitle': 'Siège & Contact',
    'footer.cgv': 'Conditions Générales (CGV/CGP)',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.refund': 'Politique d’Annulation & Recette',
    'footer.cookies': 'Gestion des Traceurs & Cookies',
    'footer.mentions': 'Mentions Légales & RCCM',
    'footer.rights': 'Tous droits réservés.',
    'footer.developedFor': 'Cabinet d’Études et Conseil Belkal SARLU (CABECS). Immatriculation RCCM N° 2026-B13-00621.',

    // Consultation Modal
    'modal.title': 'Demande de Consultation & Cadrage Préalable',
    'modal.subtitle': 'Entretien d’orientation gratuit de 30 minutes avec un consultant senior de CABECS.',
    'modal.pillarLabel': 'Expertise ciblée',
    'modal.budgetLabel': 'Enveloppe budgétaire estimée (optionnel)',
    'modal.cancel': 'Fermer',
    'modal.submit': 'Valider ma demande de consultation',

    // Mobile CTA
    'mobile.quote': 'Devis & Cadrage',
    'mobile.call': 'Appeler',
    'mobile.whatsapp': 'WhatsApp',

    // Thank you page
    'thankyou.title': 'Merci, votre demande a bien été enregistrée !',
    'thankyou.subtitle': 'Votre dossier a été transmis à la direction des opérations de CABECS.',
    'thankyou.refLabel': 'Numéro de référence de votre dossier :',
    'thankyou.homeBtn': 'Retourner à l’accueil',
    'thankyou.whatsappBtn': 'Échanger immédiatement sur WhatsApp',

    // 404
    'notFound.title': 'Page non trouvée (Erreur 404)',
    'notFound.desc': 'La page que vous recherchez n’existe pas ou a été déplacée.',
    'notFound.btn': 'Retourner au site CABECS',

    // Cookie Banner
    'cookie.title': 'Respect de votre vie privée & Zéro traçage publicitaire',
    'cookie.desc': 'Le site de CABECS n’utilise aucun cookie publicitaire tiers ni pixel espion. Seuls des témoins techniques indispensables à votre confort de navigation sont employés.',
    'cookie.accept': 'Compris & Continuer',
    'cookie.learnMore': 'En savoir plus'
  },
  en: {
    // Top Bar
    'topbar.headquarters': 'Headquarters:',
    'topbar.rccm': 'Trade Register (RCCM):',
    'topbar.taxId': 'Tax ID:',
    'topbar.whatsapp': 'WhatsApp Direct',
    'topbar.lang': 'Language',

    // Navigation
    'nav.home': 'Home',
    'nav.expertises': 'Expertise',
    'nav.methodology': 'Methodology',
    'nav.caseStudies': 'Case Studies',
    'nav.diagnostic': 'Diagnostic',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.consultationBtn': 'Request a Consultation',
    'nav.quoteBtn': 'Quote',
    'nav.menuAria': 'Open menu',
    'nav.dropdownTitle': 'CABECS 5 Core Divisions',

    // Hero Section
    'hero.badge': 'CABINET BELKAL CONSULTING SARLU • Douala, Cameroon',
    'hero.titlePre': 'Strategy Advisory, ',
    'hero.titleHighlight1': 'Digital Solutions',
    'hero.titleMid': ' & ',
    'hero.titleHighlight2': 'Innovation',
    'hero.titlePost': ' in Central Africa',
    'hero.description': 'CABECS advises corporations, public institutions, investors, and project leaders across Central Africa. We transform management and technology challenges into lasting growth levers.',
    'hero.taxPayer': 'Tax ID:',
    'hero.location': 'Headquarters:',
    'hero.locationVal': 'Yassa, Douala',
    'hero.ctaConsultation': 'Request a Project Scoping',
    'hero.ctaWhatsApp': 'Chat on WhatsApp',
    'hero.guarantee1': 'Actionable, real-world diagnostics',
    'hero.guarantee2': 'Sovereign & secure codebases',
    'hero.guarantee3': 'Strict OHADA legal compliance',
    'hero.cardHeader': 'Certified Advisory & Engineering Firm',
    'hero.cardStatus': 'Registered & Active',
    'hero.cardPillarsTitle': '5 Core Areas of Operational Excellence',
    'hero.cardCta': 'Schedule an Orientation Audit',

    // Pillars Section
    'pillars.badge': 'Core Competencies',
    'pillars.title': 'A Comprehensive Portfolio across 5 Pillars',
    'pillars.subtitle': 'Tailored to the unique operating realities of decision-makers in Cameroon and the CEMAC zone, CABECS structures its capabilities into complementary divisions.',
    'pillars.deliverablesTitle': 'Key Deliverables Provided:',
    'pillars.targetTitle': 'Primary Audience:',
    'pillars.requestQuote': 'Request scoping for this expertise',
    'pillars.scheduleConsultation': 'Schedule technical briefing',

    // Diagnostic Wizard
    'diagnostic.badge': 'Interactive Assessment Tool',
    'diagnostic.title': 'Assess & Scope Your Project in 3 Minutes',
    'diagnostic.subtitle': 'Specify your organization profile and strategic priorities. Receive an executive scoping estimation and consultant feedback within 24 business hours.',
    'diagnostic.step1Title': '1. Organization Profile',
    'diagnostic.step2Title': '2. Priority Requirement',
    'diagnostic.step3Title': '3. Contact & Scoping',
    'diagnostic.orgQuestion': 'What type of organization do you represent?',
    'diagnostic.pillarQuestion': 'Which priority operational area are you addressing?',
    'diagnostic.timeframeQuestion': 'What is your target kick-off timeframe?',
    'diagnostic.btnNext': 'Next Step',
    'diagnostic.btnPrev': 'Back',
    'diagnostic.btnSubmit': 'Get My Scoping Assessment',
    'diagnostic.btnSubmitting': 'Processing...',
    'diagnostic.fullName': 'Full Name & Title',
    'diagnostic.organization': 'Organization / Company Name',
    'diagnostic.email': 'Corporate Email Address',
    'diagnostic.phone': 'Phone Number (with WhatsApp country code)',
    'diagnostic.description': 'Brief overview of objectives or scope (optional)',
    'diagnostic.consent': 'I agree that CABECS will process this confidential information strictly for my request under Cameroon Law N° 2010/012 and OHADA norms.',
    'diagnostic.successTitle': 'Project Scoping Request Received!',
    'diagnostic.successDesc': 'Your assessment request has been successfully routed to our executive team. A senior CABECS consultant will connect with you within 24 business hours.',
    'diagnostic.directWhatsAppCta': 'Connect instantly on WhatsApp',
    'diagnostic.reset': 'Start a new assessment',

    // Methodology Section
    'method.badge': 'Rigor & Accountability',
    'method.title': 'Our 4-Stage Execution Methodology',
    'method.subtitle': 'Every engagement is governed by a rigorous roadmap, ensuring budget predictability, punctual delivery, and team adoption.',
    'method.deliverableLabel': 'Contractual Deliverable:',
    'method.ctaTitle': 'Ready to establish a clear roadmap for your organization?',
    'method.ctaButton': 'Initiate a Methodological Scoping',

    // Case Studies Section
    'case.badge': 'Field Track Record',
    'case.title': 'Case Studies & Engagement Models',
    'case.subtitle': 'Concrete examples of challenges solved by CABECS consultants and engineers for organizations in Cameroon.',
    'case.all': 'All Domains',
    'case.challenge': 'Challenge Faced:',
    'case.solution': 'CABECS Intervention:',
    'case.resultsTitle': 'Quantified Results & Impact:',
    'case.techTitle': 'Frameworks & Technologies:',
    'case.disclaimer': 'Transparency Notice: The following case studies represent typical intervention models and methodologies field-proven by our consultants in Cameroon. Indicators are shared for guidance and do not constitute a blanket contractual guarantee for future engagements.',
    'case.cta': 'Discuss a similar case for my enterprise',

    // Why CABECS Section
    'why.badge': 'The CABECS Identity',
    'why.title': 'The Metaphor of the Tree: Stability, Growth & Future',
    'why.subtitle': 'Our corporate emblem unites the tree of life, mountains, and flowing river: deeply rooted in procedural rigor for a canopy reaching toward sustainable innovation.',
    'why.treeName': 'The Green Tree',
    'why.treeDesc': 'Symbolizes sustainable growth, structured expansion, and long-term knowledge transfer within organizations.',
    'why.waterName': 'The Water & River',
    'why.waterDesc': 'Evokes streamlined operational workflows, agile digital solutions, and the strategic maritime hub of Douala.',
    'why.mountainName': 'The Mountains',
    'why.mountainDesc': 'Represents enduring management foundations, strategic elevation, and visionary perspective.',
    'why.emblemProtected': 'Registered Emblem & Protected Trademark',

    // FAQ Section
    'faq.badge': 'Transparency & Process',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know before initiating an advisory mission or digital engineering project with CABECS.',
    'faq.needHelp': 'Have a specific request or request for proposals (RFP)?',
    'faq.consultantDirect': 'Chat directly with a senior CABECS consultant with zero delay.',

    // Contact & Map
    'contact.badge': 'Headquarters & Coordinates',
    'contact.title': 'Get in Touch with Cabinet Belkal Consulting SARLU',
    'contact.subtitle': 'Our teams welcome you at our Douala headquarters (Yassa) or organize secure videoconference working sessions across the CEMAC region.',
    'contact.addressTitle': 'Headquarters Address',
    'contact.phoneTitle': 'Direct Lines',
    'contact.hoursTitle': 'Operating Hours',
    'contact.directMsgTitle': 'Submit a Formal Inquiry',
    'contact.directMsgDesc': 'Complete this brief form to receive technical pricing or schedule a meeting with a project director.',
    'contact.submitBtn': 'Submit Inquiry',
    'contact.submitting': 'Sending...',
    'contact.success': 'Your message has been sent successfully. Our office will reply within 24 business hours.',

    // Footer
    'footer.description': 'Advisory, management consulting, software engineering, and project management firm. Registered with Douala RCCM and operating across the CEMAC region.',
    'footer.quickLinks': 'Quick Links',
    'footer.legalTitle': 'Compliance & Legal',
    'footer.contactTitle': 'Headquarters & Contact',
    'footer.cgv': 'General Terms & Conditions (GTC/GTS)',
    'footer.privacy': 'Privacy Policy',
    'footer.refund': 'Cancellation & Acceptance Policy',
    'footer.cookies': 'Cookie Management',
    'footer.mentions': 'Legal Mentions & Trade Registry',
    'footer.rights': 'All rights reserved.',
    'footer.developedFor': 'Cabinet d’Études et Conseil Belkal SARLU (CABECS). Trade Registry RCCM N° 2026-B13-00621.',

    // Consultation Modal
    'modal.title': 'Request Consultation & Preliminary Scoping',
    'modal.subtitle': 'Complimentary 30-minute orientation session with a senior CABECS director.',
    'modal.pillarLabel': 'Targeted Expertise',
    'modal.budgetLabel': 'Estimated Budget Envelope (optional)',
    'modal.cancel': 'Close',
    'modal.submit': 'Confirm My Consultation Request',

    // Mobile CTA
    'mobile.quote': 'Scoping & Quote',
    'mobile.call': 'Call Us',
    'mobile.whatsapp': 'WhatsApp',

    // Thank you page
    'thankyou.title': 'Thank you, your request has been logged!',
    'thankyou.subtitle': 'Your file has been routed to the CABECS operations directorate.',
    'thankyou.refLabel': 'File reference code:',
    'thankyou.homeBtn': 'Return to Homepage',
    'thankyou.whatsappBtn': 'Follow up immediately on WhatsApp',

    // 404
    'notFound.title': 'Page Not Found (Error 404)',
    'notFound.desc': 'The page you are looking for does not exist or has been moved.',
    'notFound.btn': 'Return to CABECS Homepage',

    // Cookie Banner
    'cookie.title': 'Privacy First & Zero Cross-Site Ad Tracking',
    'cookie.desc': 'The CABECS website does not use third-party advertising cookies or tracking pixels. Only strictly necessary operational cookies are used.',
    'cookie.accept': 'Understood & Continue',
    'cookie.learnMore': 'Learn More'
  }
};

export const SERVICE_PILLARS_EN: ServicePillar[] = [
  {
    id: 'conseil-strategie',
    title: 'Advisory & Strategy',
    subtitle: 'Executive Leadership & Institutional Performance',
    description: 'High-level guidance for executive boards, SMEs, and public institutions in designing expansion strategies and optimizing operational processes.',
    accentColor: '#0066B3',
    badge: 'Executive & Governance',
    services: [
      {
        id: 'strat-management',
        title: 'Management & Strategy Advisory',
        shortDesc: 'Five-year strategic masterplans, restructuring, and institutional corporate governance.',
        fullDesc: 'We assist executive committees in clarifying their roadmaps, prioritizing high-yield capital investments, and instilling resilient governance frameworks fully aligned with OHADA standards.',
        deliverables: ['Strategic Direction Plan (SDP)', 'Executive Decision Matrix', 'Balanced Scorecard Dashboards'],
        targetAudience: 'Chief Executive Officers, Boards of Directors, Private Equity Funds',
        iconName: 'Compass'
      },
      {
        id: 'strat-orga',
        title: 'Organizational Design & Process Optimization',
        shortDesc: 'Business process re-engineering, target organizational charts, and operational cost containment.',
        fullDesc: 'Eliminating bottlenecks, streamlining cross-functional information flows, and refining job descriptions to foster operational agility and delegation.',
        deliverables: ['BPMN Process Mapping', 'Administrative & Financial Procedures Manual', 'Headcount & Skills Rationalization Plan'],
        targetAudience: 'Chief Operating Officers, HR Directors, Secretaries General',
        iconName: 'Building2'
      },
      {
        id: 'strat-ingenierie',
        title: 'Feasibility Studies & Prior Diagnostics',
        shortDesc: 'Techno-economic viability assessments, sensitivity modeling, and project bankability.',
        fullDesc: 'Rigorous market dynamics analysis in Central Africa, NPV/IRR financial models, and regulatory risk assessments to de-risk capital deployment.',
        deliverables: ['Bankable Business Plan', 'Financial Viability Model', 'Regulatory & Tax Risk Assessment'],
        targetAudience: 'Project Sponsors, Institutional Investors, Development Banks',
        iconName: 'LineChart'
      },
      {
        id: 'strat-commercial',
        title: 'Commercial Advisory & Market Penetration',
        shortDesc: 'Go-to-market strategies, sales pipeline structuring, and B2B corporate partnerships.',
        fullDesc: 'Targeted competitive positioning to capture defensible market share in Cameroon and the wider CEMAC sub-region.',
        deliverables: ['B2B Commercial Playbook', 'Dynamic Pricing Matrix', 'Subcontracting & Partnership Agreements'],
        targetAudience: 'Commercial Directors, Regional Subsidiaries, Growth Startups',
        iconName: 'TrendingUp'
      }
    ]
  },
  {
    id: 'solutions-digitales',
    title: 'Digital Solutions & Systems',
    subtitle: 'Software Engineering & Digital Transformation',
    description: 'Design, robust software engineering, and deployment of secure digital platforms to automate business operations and unlock data value.',
    accentColor: '#1686C7',
    badge: 'Engineering & Tech',
    services: [
      {
        id: 'dig-software',
        title: 'Bespoke Software Development & ERP',
        shortDesc: 'Custom enterprise software built specifically for African operating realities.',
        fullDesc: 'Building resilient management platforms (lightweight ERP, billing, inventory, B2B portals) operating seamlessly with or without continuous broadband connectivity.',
        deliverables: ['Documented Source Code', 'Scalable Cloud Architecture', 'Integrated REST/GraphQL APIs'],
        targetAudience: 'Growing Corporations, Distributors, Financial Institutions',
        iconName: 'Code2'
      },
      {
        id: 'dig-mobile-web',
        title: 'High-Performance Web & Mobile Apps',
        shortDesc: 'Responsive iOS/Android applications and Progressive Web Apps (PWA).',
        fullDesc: 'Fluid user experiences integrating local mobile payment rails (MTN/Orange Mobile Money, regional bank cards) and real-time push alerts.',
        deliverables: ['Android & iOS Mobile Apps', 'Secure Web Portal', 'Real-Time Admin Dashboard'],
        targetAudience: 'Fintechs, Logistics Operators, Service Enterprises',
        iconName: 'Smartphone'
      },
      {
        id: 'dig-automation',
        title: 'Workflow Automation & Systems Integration',
        shortDesc: 'Elimination of redundant manual data entries and cross-platform interconnectivity.',
        fullDesc: 'Automating administrative workflows, invoice approvals, and automated reporting via Email and WhatsApp Business API.',
        deliverables: ['Automation Pipelines', 'Third-Party Software API Bridges', 'Data Security Audit'],
        targetAudience: 'Financial Departments, Supply Chain Hubs',
        iconName: 'Cpu'
      },
      {
        id: 'dig-maintenance',
        title: 'IT Infrastructure, Managed Services & Support',
        shortDesc: 'Operational continuity, encrypted backups, and 24/7 infrastructure monitoring.',
        fullDesc: 'Guaranteed SLA support agreements, corporate network audits, and cyber-threat mitigation.',
        deliverables: ['Guaranteed SLA Contract', 'Off-site Encrypted Backups', 'Monthly Security Monitoring Report'],
        targetAudience: 'SMEs without in-house IT, Financial Services',
        iconName: 'ShieldCheck'
      }
    ]
  },
  {
    id: 'gestion-projets',
    title: 'Project Management & M&E',
    subtitle: 'Methodological Rigor & Impact Measurement',
    description: 'Operational management of complex programs, compliance audits, and monitoring & evaluation systems adhering to international donor standards.',
    accentColor: '#4F8B50',
    badge: 'Projects & Programs',
    services: [
      {
        id: 'proj-pm',
        title: 'Complex Project Governance & Delivery',
        shortDesc: 'Cross-functional coordination, strict milestone tracking, and budget adherence.',
        fullDesc: 'Applying PMI/Prince2 and agile methodologies calibrated for local constraints to deliver strategic projects without budget overruns.',
        deliverables: ['Project Risk Matrix', 'Consolidated GANTT Timeline', 'Weekly Executive Status Reports'],
        targetAudience: 'Multilateral Donors, Multinationals, Government Agencies',
        iconName: 'Kanban'
      },
      {
        id: 'proj-eval',
        title: 'Monitoring & Evaluation of Programs (M&E)',
        shortDesc: 'Quantifiable indicators, mid-term reviews, and post-implementation impact evaluations.',
        fullDesc: 'Field data collection infrastructure (KoboToolbox/ODK) and rigorous calculation of socio-economic impact metrics.',
        deliverables: ['Harmonized Logical Framework', 'Field Data Collection Platform', 'Certified Impact Evaluation Report'],
        targetAudience: 'International NGOs, Development Agencies, Ministries',
        iconName: 'CheckCircle2'
      }
    ]
  },
  {
    id: 'formations',
    title: 'Training & Capacity Building',
    subtitle: 'Human Capital & Executive Skill Upgrading',
    description: 'Advanced training programs for executives, managers, and operational teams in management, digital tools, and project management.',
    accentColor: '#0066B3',
    badge: 'CABECS Academy',
    services: [
      {
        id: 'form-catalogue',
        title: 'Certified Inter-Company Curriculum',
        shortDesc: 'Intensive practical workshops led by senior industry practitioners.',
        fullDesc: 'High-impact courses in executive leadership, advanced data analytics (Excel/PowerBI), agile project delivery, and cyber hygiene.',
        deliverables: ['Digital Course Materials', 'Real-world Contextual Case Studies', 'Official Certificate of Competence'],
        targetAudience: 'Middle Managers, Project Officers, Financial Controllers',
        iconName: 'GraduationCap'
      },
      {
        id: 'form-custom',
        title: 'Customized In-House Corporate Training',
        shortDesc: 'Tailored pedagogical engineering aligned with your corporate tools and strategic priorities.',
        fullDesc: 'Prior competency gap analysis, proprietary module design, and 60-day post-training implementation follow-up.',
        deliverables: ['Skills Needs Assessment', 'Custom Courseware', '60-Day On-the-Job Transfer Audit'],
        targetAudience: 'Human Resources Directors, Executive Committees',
        iconName: 'Users'
      }
    ]
  },
  {
    id: 'immobilier',
    title: 'Corporate Real Estate & Investment',
    subtitle: 'Land Due Diligence & Asset Valuation',
    description: 'Wealth advisory and support for institutional and Diaspora investors in selecting, managing, and securing real estate assets in Douala.',
    accentColor: '#4F8B50',
    badge: 'Assets & Capital',
    services: [
      {
        id: 'immo-conseil',
        title: 'Investor Advisory & Land Title Audits',
        shortDesc: 'Verification of land titles, rental yield modeling, and notary facilitation.',
        fullDesc: 'De-risking land acquisition through thorough legal audits with the land conservancies of Wouri and Littoral.',
        deliverables: ['Land Compliance Audit Report', 'Rental Yield Financial Model', 'Secure Transaction Coordination'],
        targetAudience: 'Diaspora Investors, Real Estate Holdings, Developers',
        iconName: 'Home'
      },
      {
        id: 'immo-gestion',
        title: 'Commercial Asset Management & Intermediation',
        shortDesc: 'Corporate premises scouting, commercial leasing, and facility management.',
        fullDesc: 'Assisting companies in securing headquarters, logistics warehouses in Yassa/Douala Port, and rigorous lease management.',
        deliverables: ['Targeted Property Search Mandate', 'OHADA Commercial Lease', 'Rental Flow Management & Collection'],
        targetAudience: 'Corporates Seeking Premises, Commercial Property Owners',
        iconName: 'Key'
      }
    ]
  }
];

export const METHOD_STEPS_EN: MethodStep[] = [
  {
    step: '01',
    title: 'Diagnosis & Immersion',
    timeframe: 'Week 1',
    desc: 'In-depth audit of existing operational processes, executive interviews, and precise identification of constraints and requirements.',
    deliverable: 'Scoping Assessment & Validated Roadmap'
  },
  {
    step: '02',
    title: 'Design & Architecture',
    timeframe: 'Weeks 2 - 3',
    desc: 'Formulation of intervention strategy, technical software design, or organizational workflows with financial sensitivity modeling.',
    deliverable: 'Engineering Dossier & Interactive Prototype'
  },
  {
    step: '03',
    title: 'Deployment & Change Management',
    timeframe: 'Weeks 4 - 6',
    desc: 'Agile execution through controlled iterations, continuous integration, and field team workshops for rapid organizational adoption.',
    deliverable: 'Operational Deliverables & Training Sessions'
  },
  {
    step: '04',
    title: 'Impact Measurement & Sustainability',
    timeframe: 'Continuous Follow-Up',
    desc: 'Verification of strategic key performance indicators (KPIs), corrective adjustments, and handover for autonomous internal governance.',
    deliverable: 'Impact Evaluation Report & Skills Transfer'
  }
];

export const CASE_STUDIES_EN: CaseStudy[] = [
  {
    id: 'case-distrib-douala',
    title: 'Sales Route Digitalization & Real-Time Logistics Tracking',
    clientCategory: 'Fast-Moving Consumer Goods (FMCG) Distributor',
    location: 'Douala (Bassa Industrial Zone)',
    pillarId: 'solutions-digitales',
    context: 'Enterprise with 85 employees suffering from delayed invoicing and paper slip losses during field retail deliveries.',
    challenge: 'Paper delivery receipts were frequently lost or processed with a 5-day delay, generating cash-flow bottlenecks.',
    solution: 'Deployment of an offline-first Android application for field drivers synchronized with a real-time web administration dashboard.',
    results: [
      'Documented sharp reduction in delivery dispute rates and inventory discrepancies',
      'Average order-to-invoice processing time reduced from 5 days to 4 hours',
      'Full GPS fleet visibility across Douala metropolitan delivery zones'
    ],
    technologiesOrMethods: ['React Native', 'Node.js', 'PostgreSQL', 'Mobile Money Integration']
  },
  {
    id: 'case-ong-eval',
    title: 'Organizational Audit & M&E Framework for Educational Program',
    clientCategory: 'International NGO Consortium',
    location: 'Yaoundé & Eastern Region, Cameroon',
    pillarId: 'gestion-projets',
    context: 'Multi-year education program funded by a multilateral donor covering 42 rural training centers.',
    challenge: 'Lack of standardized indicators and difficulty tracking long-term vocational placement of youth graduates.',
    solution: 'Restructuring of the logical framework, capacity building for 30 field coordinators, and deployment of a secure cloud data collection platform.',
    results: [
      'Standardized indicators fully aligned with international donor accountability standards',
      'Executive governance dashboard deployed for the joint steering committee',
      'Positive external evaluation unlocking multi-year funding renewal'
    ],
    technologiesOrMethods: ['Harmonized Logical Framework', 'KoboToolbox', 'PowerBI', 'Field Capacity Building']
  },
  {
    id: 'case-pme-restructuration',
    title: 'Management Restructuring & Operational Cost Optimization',
    clientCategory: 'Fast-Growing Agro-Industrial SME',
    location: 'Littoral & South-West Regions',
    pillarId: 'conseil-strategie',
    context: 'Family-owned enterprise expanding rapidly from 15 to 60 staff with organizational friction and declining margins.',
    challenge: 'Role confusion, executive bottleneck at CEO level, and a 14% drop in operational margins.',
    solution: 'Comprehensive 360° organizational audit, restructuring organizational hierarchy with clear delegation matrices and OHADA-compliant internal manuals.',
    results: [
      'Quantified rationalization of operating costs and restored gross margins',
      'Formal delegation of day-to-day decisions to middle management team',
      'Full contractual and statutory alignment with OHADA labor standards'
    ],
    technologiesOrMethods: ['360° Organizational Audit', 'OHADA Procedures Manual', 'Balanced Scorecard']
  },
  {
    id: 'case-immo-logistique',
    title: 'Land Due Diligence & Logistics Platform Acquisition',
    clientCategory: 'Cameroonian Diaspora Investment Syndicate',
    location: 'Yassa / Douala-Yaoundé Highway Corridor',
    pillarId: 'immobilier',
    context: 'Acquisition of 4,500 m² commercial land for cold-storage warehouses and administrative headquarters.',
    challenge: 'Complex land history with overlapping customary claims requiring comprehensive legal de-risking.',
    solution: 'Comprehensive land registry title audit, coordination with the land registry and notary, and building permit documentation.',
    results: [
      'Secured individual land title purged of all encumbrances and liens',
      'Timely completion of notarial due diligence with zero legal disputes',
      'Optimized transaction conditions and acquisition fees for investors'
    ],
    technologiesOrMethods: ['Land Title Audit', 'Notarial Coordination', 'Legal Due Diligence']
  }
];

export const FAQ_ITEMS_EN: FAQItem[] = [
  {
    category: 'General',
    question: 'What is CABECS’ key competitive advantage over other advisory firms?',
    answer: 'CABECS (Cabinet Belkal Consulting SARLU) uniquely combines three pillars: executive strategy advisory, bespoke in-house software engineering, and deep regional presence in Douala. Unlike traditional consulting firms that only deliver theoretical PDF reports, we build the actual technological tools and train your teams to guarantee tangible operational results.'
  },
  {
    category: 'Intervention',
    question: 'Do you operate only in Douala or across Central Africa?',
    answer: 'Our headquarters are based in Yassa, Douala, but our consultants regularly operate across Cameroon (Yaoundé, Kribi, Bafoussam, Garoua), the wider CEMAC economic zone (Chad, Gabon, Congo, Equatorial Guinea, CAR), and remotely for international development partners.'
  },
  {
    category: 'Digital Solutions',
    question: 'How do you ensure data security and source code ownership for custom software?',
    answer: 'All software is engineered according to strict industrial standards (version-controlled source code, automated backups, end-to-end data encryption, and unit testing). You retain 100% sovereign ownership over your source code and corporate databases, backed by an ongoing maintenance agreement and comprehensive skills handover.'
  },
  {
    category: 'Pricing & Contracts',
    question: 'How are engagement fees and payment terms structured?',
    answer: 'Every engagement begins with a complimentary scoping session resulting in a transparent technical and financial proposal (either fixed-price by deliverable milestone or dedicated time & materials). We offer phased milestone payments and accept CEMAC-compliant corporate bank transfers as well as secure electronic payments.'
  },
  {
    category: 'Training',
    question: 'Are CABECS Academy corporate training invoices tax-deductible in Cameroon?',
    answer: 'Yes. As a duly incorporated firm registered with the Douala Trade Registry (RCCM: 2026-B13-00621) and possessing an official Tax ID (NIU: M072618899069X), our training invoices qualify as tax-deductible expenses under corporate continuing professional education programs.'
  }
];
