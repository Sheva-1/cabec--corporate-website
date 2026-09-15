export type Language = 'fr' | 'en';

export type ServicePillarId = 
  | 'conseil-strategie'
  | 'solutions-digitales'
  | 'gestion-projets'
  | 'formations'
  | 'immobilier';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  targetAudience: string;
  iconName: string;
}

export interface ServicePillar {
  id: ServicePillarId;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  badge: string;
  services: ServiceItem[];
}

export interface MethodStep {
  step: string;
  title: string;
  timeframe: string;
  desc: string;
  deliverable: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientCategory: string;
  location: string;
  context: string;
  challenge: string;
  solution: string;
  results: string[];
  pillarId: ServicePillarId;
  technologiesOrMethods: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationFormData {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  pillar: ServicePillarId | '';
  description: string;
  budgetRange?: string;
  timeframe: string;
  consent: boolean;
}
