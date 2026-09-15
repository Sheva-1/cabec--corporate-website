import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'refund' | 'cookies' | 'mentions') => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenLegal }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cabec_cookie_consent');
    if (!consent) {
      // Delay display slightly to not obstruct immediate first paint
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cabec_cookie_consent', 'accepted_all');
    setIsVisible(false);
  };

  const handleRefuseNonEssential = () => {
    localStorage.setItem('cabec_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-40 bg-white border-2 border-slate-200 shadow-2xl rounded-2xl p-5 font-['Plus_Jakarta_Sans',sans-serif]"
          role="region"
          aria-label={language === 'fr' ? "Gestion des cookies et respect de la vie privée" : "Cookie management and privacy"}
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066B3] shrink-0">
              <Cookie className="w-5 h-5" aria-hidden="true" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-['Outfit',sans-serif] text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{language === 'fr' ? "Respect de votre vie privée" : "Privacy & Data Protection"}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                    <span>{language === 'fr' ? "Zéro Pistage Publicitaire" : "Zero Ad Tracking"}</span>
                  </span>
                </h3>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {language === 'fr'
                  ? "CABECS utilise exclusivement des traceurs techniques indispensables au bon fonctionnement de la plateforme et à la mémorisation de vos préférences de consultation. Aucun cookie publicitaire tiers n'est utilisé."
                  : "CABECS exclusively uses strictly necessary technical cookies to ensure site functionality and save your preferences. No third-party advertising cookies are used."
                }
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex items-center gap-1.5 bg-[#0066B3] hover:bg-[#005291] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0066B3]"
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{language === 'fr' ? "Tout Accepter" : "Accept All"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRefuseNonEssential}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors cursor-pointer border border-slate-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{language === 'fr' ? "Essentiels Uniquement" : "Essential Only"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenLegal?.('cookies')}
                  className="text-xs font-semibold text-[#0066B3] hover:text-[#005291] underline px-2 py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0066B3]"
                >
                  {language === 'fr' ? "En savoir plus" : "Learn more"}
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
