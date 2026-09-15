import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { InteractiveDiagnostic } from './components/InteractiveDiagnostic';
import { MethodSection } from './components/MethodSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { WhyCabecSection } from './components/WhyCabecSection';
import { FAQSection } from './components/FAQSection';
import { ContactAndMapSection } from './components/ContactAndMapSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalModal, LegalTab } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { NotFoundPage } from './components/NotFoundPage';
import { ThankYouPage } from './components/ThankYouPage';
import { LegalPageView } from './components/LegalPageView';

type AppView = 'home' | '404' | 'thank-you' | 'terms' | 'privacy' | 'refund' | 'cookies' | 'mentions';

interface LeadData {
  fullName?: string;
  organization?: string;
  email?: string;
  phone?: string;
  pillarTitle?: string;
  referenceCode?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [leadDetails, setLeadDetails] = useState<LeadData | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<string | undefined>(undefined);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  // Legal modal state (for modal overlay mode)
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState<LegalTab>('privacy');

  // URL routing synchronization (supports direct paths like /terms, /privacy, /404, /thank-you)
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/' || path === '') {
        setCurrentView('home');
      } else if (path === '/terms' || path === '/conditions' || path === '/cgv') {
        setCurrentView('terms');
      } else if (path === '/privacy' || path === '/politique-confidentialite' || path === '/confidentialite') {
        setCurrentView('privacy');
      } else if (path === '/thank-you' || path === '/merci') {
        setCurrentView('thank-you');
      } else if (path === '/404') {
        setCurrentView('404');
      } else {
        // Unknown route -> render custom 404
        setCurrentView('404');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const navigateTo = (view: AppView, newPath?: string) => {
    setCurrentView(view);
    const pathMap: Record<AppView, string> = {
      home: '/',
      '404': '/404',
      'thank-you': '/thank-you',
      terms: '/terms',
      privacy: '/privacy',
      refund: '/terms#refund',
      cookies: '/privacy#cookies',
      mentions: '/terms#mentions'
    };
    const targetPath = newPath || pathMap[view] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (pillarId?: string, serviceTitle?: string) => {
    setSelectedPillar(pillarId);
    setSelectedServiceTitle(serviceTitle);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPillar(undefined);
    setSelectedServiceTitle(undefined);
  };

  const handleOpenLegal = (tab: LegalTab = 'privacy', asFullPage = false) => {
    if (asFullPage) {
      if (tab === 'terms') navigateTo('terms');
      else if (tab === 'privacy') navigateTo('privacy');
      else navigateTo(tab as AppView);
      return;
    }
    setLegalInitialTab(tab);
    setLegalModalOpen(true);
  };

  const handleSubmittedLead = (lead: {
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    pillarTitle: string;
  }) => {
    const generatedRef = `CABECS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setLeadDetails({
      ...lead,
      referenceCode: generatedRef
    });
    // If modal is open, close it before redirecting
    if (modalOpen) {
      setModalOpen(false);
    }
    navigateTo('thank-you');
  };

  // 1. Custom 404 View
  if (currentView === '404') {
    return (
      <NotFoundPage 
        onNavigateHome={() => navigateTo('home')}
        onOpenConsultation={() => {
          navigateTo('home');
          setTimeout(() => handleOpenConsultation(), 150);
        }}
      />
    );
  }

  // 2. Thank You Page View
  if (currentView === 'thank-you') {
    return (
      <ThankYouPage 
        leadDetails={leadDetails}
        onNavigateHome={() => navigateTo('home')}
      />
    );
  }

  // 3. Dedicated Full Legal Pages (Terms, Privacy, etc.)
  if (['terms', 'privacy', 'refund', 'cookies', 'mentions'].includes(currentView)) {
    return (
      <LegalPageView 
        initialTab={currentView as LegalTab}
        onNavigateHome={() => navigateTo('home')}
        onOpenConsultation={() => {
          navigateTo('home');
          setTimeout(() => handleOpenConsultation(), 150);
        }}
      />
    );
  }

  // 4. Main Corporate Homepage
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E2933]">
      {/* 1. Top Header & Corporate Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* 2. Main Content */}
      <main className="flex-1">
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* 3. Les 5 Pôles d'Excellence (Interactive Division Navigator) */}
        <PillarsSection onSelectService={handleOpenConsultation} />

        {/* 4. Interactive Diagnostic & Project Estimator Wizard */}
        <InteractiveDiagnostic 
          onOpenLegal={handleOpenLegal} 
          onSubmittedLead={handleSubmittedLead}
        />

        {/* 5. Proven 4-Step Methodology */}
        <MethodSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 6. Verified Field Case Studies (Réalisations) with Legal Disclaimers */}
        <CaseStudiesSection onOpenConsultation={handleOpenConsultation} />

        {/* 7. The Tree Symbolism, Corporate Trust & Legal Certification */}
        <WhyCabecSection />

        {/* 8. High-Value FAQ Accordion with Transparent Realities */}
        <FAQSection />

        {/* 9. Official Headquarters Contact & Yassa Douala Coordinates */}
        <ContactAndMapSection 
          preselectedPillar={selectedPillar} 
          onOpenLegal={handleOpenLegal} 
          onSubmittedLead={handleSubmittedLead}
        />
      </main>

      {/* 10. Official Footer & Floating WhatsApp Connect */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* 11. Sticky Mobile CTA for high-conversion on mobile screens */}
      <StickyMobileCTA 
        onOpenConsultation={() => handleOpenConsultation()}
        hideWhenModalOpen={modalOpen || legalModalOpen}
      />

      {/* 12. Universal Consultation & Diagnostic Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        preselectedPillar={selectedPillar}
        preselectedServiceTitle={selectedServiceTitle}
        onOpenLegal={handleOpenLegal}
        onSubmittedLead={handleSubmittedLead}
      />

      {/* 13. Full Legal Documents Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalInitialTab}
      />

      {/* 14. Privacy-First Zero-Tracking Cookie Notice Banner */}
      <CookieBanner onOpenLegal={handleOpenLegal} />
    </div>
  );
}
