import React, { useState } from 'react';
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

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<string | undefined>(undefined);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E2933]">
      {/* 1. Top Header & Corporate Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* 2. Main Hero Presentation & Immediate Value Proposition */}
      <main className="flex-1">
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* 4. Les 5 Pôles d'Excellence (Interactive Division Navigator) */}
        <PillarsSection onSelectService={handleOpenConsultation} />

        {/* 5. Interactive Diagnostic & Project Estimator Wizard */}
        <InteractiveDiagnostic />

        {/* 6. Proven 4-Step Methodology */}
        <MethodSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 7. Verified Field Case Studies (Réalisations) */}
        <CaseStudiesSection onOpenConsultation={handleOpenConsultation} />

        {/* 8. The Tree Symbolism, Corporate Trust & Legal Certification */}
        <WhyCabecSection />

        {/* 9. High-Value SEO FAQ Accordion */}
        <FAQSection />

        {/* 10. Official Headquarters Contact & Yassa Douala Interactive Map */}
        <ContactAndMapSection preselectedPillar={selectedPillar} />
      </main>

      {/* 11. Official Footer & Floating WhatsApp Connect */}
      <Footer />

      {/* 12. Universal Consultation & Diagnostic Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        preselectedPillar={selectedPillar}
        preselectedServiceTitle={selectedServiceTitle}
      />
    </div>
  );
}
