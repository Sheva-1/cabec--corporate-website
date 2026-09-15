import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, ServicePillar, MethodStep, CaseStudy, FAQItem } from '../types';
import { 
  UI_TRANSLATIONS, 
  SERVICE_PILLARS_EN, 
  METHOD_STEPS_EN, 
  CASE_STUDIES_EN, 
  FAQ_ITEMS_EN 
} from '../data/translations';
import { 
  SERVICE_PILLARS as SERVICE_PILLARS_FR, 
  METHOD_STEPS as METHOD_STEPS_FR, 
  CASE_STUDIES as CASE_STUDIES_FR, 
  FAQ_ITEMS as FAQ_ITEMS_FR,
  COMPANY_INFO
} from '../data/cabecData';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  currentPillars: ServicePillar[];
  currentMethodSteps: MethodStep[];
  currentCaseStudies: CaseStudy[];
  currentFaqItems: FAQItem[];
  currentFaqs: FAQItem[];
  companyInfo: typeof COMPANY_INFO;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cabecs_language') as Language;
      if (saved === 'fr' || saved === 'en') return saved;
      // Auto-detect browser language
      const browserLang = navigator.language?.toLowerCase();
      if (browserLang && browserLang.startsWith('en')) return 'en';
    }
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cabecs_language', lang);
      document.documentElement.lang = lang;
      
      // Update page title and description appropriately
      if (lang === 'en') {
        document.title = 'CABECS | Strategy Advisory, Digital Solutions & Project Management Douala';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Cabinet Belkal Consulting SARLU (CABECS): High-level strategy advisory, custom software engineering, M&E project management, and corporate training in Douala, Cameroon.'
          );
        }
      } else {
        document.title = 'CABECS | Conseil en Stratégie, Solutions Digitales & Gestion de Projets Douala';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Cabinet Belkal Consulting SARLU (CABECS) : Conseil en stratégie, développement logiciel sur-mesure, gestion et suivi-évaluation de projets à Douala, Cameroun.'
          );
        }
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const langDict = UI_TRANSLATIONS[language];
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    // Fallback to French if missing in current language
    if (UI_TRANSLATIONS.fr[key] !== undefined) {
      return UI_TRANSLATIONS.fr[key];
    }
    return fallback || key;
  };

  const currentPillars = useMemo(() => {
    return language === 'en' ? SERVICE_PILLARS_EN : SERVICE_PILLARS_FR;
  }, [language]);

  const currentMethodSteps = useMemo(() => {
    return language === 'en' ? METHOD_STEPS_EN : METHOD_STEPS_FR;
  }, [language]);

  const currentCaseStudies = useMemo(() => {
    return language === 'en' ? CASE_STUDIES_EN : CASE_STUDIES_FR;
  }, [language]);

  const currentFaqItems = useMemo(() => {
    return language === 'en' ? FAQ_ITEMS_EN : FAQ_ITEMS_FR;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        currentPillars,
        currentMethodSteps,
        currentCaseStudies,
        currentFaqItems,
        currentFaqs: currentFaqItems,
        companyInfo: COMPANY_INFO
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
