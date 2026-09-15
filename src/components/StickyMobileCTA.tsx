import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MessageSquare, Phone } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface StickyMobileCTAProps {
  onOpenConsultation: () => void;
  hideWhenModalOpen?: boolean;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  onOpenConsultation,
  hideWhenModalOpen = false,
}) => {
  const { t, companyInfo, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show when scrolled past hero (e.g. > 350px)
      // Hide if near the very bottom (last 450px where footer/contact is already reachable)
      const isPastHero = scrollY > 350;
      const isNearBottom = scrollY + windowHeight > documentHeight - 450;

      setIsVisible(isPastHero && !isNearBottom && !hideWhenModalOpen);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideWhenModalOpen]);

  const whatsappPrompt = language === 'fr'
    ? "Bonjour Cabinet Belkal Consulting, je souhaite des informations sur vos services."
    : "Hello Cabinet Belkal Consulting, I would like more information on your services.";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3.5 py-2.5 shadow-2xl safe-area-bottom font-['Plus_Jakarta_Sans',sans-serif]"
          role="region"
          aria-label={t('sticky.ariaLabel')}
        >
          <div className="max-w-md mx-auto flex items-center gap-2">
            {/* Direct WhatsApp Action */}
            <a
              href={companyInfo.whatsappDirectUrl(whatsappPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('WhatsApp', 'sticky_mobile_whatsapp_click')}
              className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-3 py-2.5 rounded-xl shadow-xs shrink-0 active:scale-95 transition-transform"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>

            {/* Direct Phone Call Action */}
            <a
              href={`tel:${companyInfo.phone1Raw}`}
              onClick={() => trackEvent('CTA', 'sticky_mobile_call_click')}
              className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl shrink-0 active:scale-95 transition-transform"
              aria-label={`Call ${companyInfo.phone1}`}
            >
              <Phone className="w-4 h-4 text-[#0066B3]" />
            </a>

            {/* Main Consultation CTA */}
            <button
              onClick={() => {
                trackEvent('CTA', 'sticky_mobile_consultation_click');
                onOpenConsultation();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('sticky.quoteBtn')}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
