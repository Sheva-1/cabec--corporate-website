import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Home, Compass, Calculator, Phone, MessageSquare } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onOpenConsultation?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ 
  onNavigateHome,
  onOpenConsultation 
}) => {
  const { language, companyInfo } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[#0B1E33] to-slate-950 text-white flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-8 border-b border-slate-800">
        <button 
          onClick={onNavigateHome}
          className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl"
          aria-label={language === 'fr' ? "Retour à l'accueil CABECS" : "Return to CABECS Home"}
        >
          <Logo variant="white" size="md" />
        </button>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-4 py-2 rounded-xl transition-colors cursor-pointer border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'fr' ? "Retour au site" : "Back to website"}</span>
        </button>
      </header>

      {/* Center 404 Hero */}
      <main className="max-w-3xl mx-auto w-full text-center my-auto py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <span>{language === 'fr' ? "Erreur 404 • Page Non Trouvée" : "Error 404 • Page Not Found"}</span>
          </div>

          <h1 className="font-['Outfit',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            {language === 'fr' ? "Cap sur l'Essentiel" : "Focus on What Matters"}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === 'fr' ? (
              <>L'URL que vous recherchez n'existe pas ou a été déplacée. Les consultants de <strong>{companyInfo.legalName} (CABECS)</strong> restent à votre disposition pour orienter vos projets.</>
            ) : (
              <>The URL you requested does not exist or has been relocated. Consultants at <strong>{companyInfo.legalName} (CABECS)</strong> remain available to steer your initiatives.</>
            )}
          </p>
        </motion.div>

        {/* Quick Orientation Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
        >
          <button
            onClick={() => {
              trackEvent('Navigation', '404_click_home');
              onNavigateHome();
            }}
            className="p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-[#0066B3] transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="font-['Outfit',sans-serif] font-bold text-white text-base">
              {language === 'fr' ? "Page d'Accueil" : "Homepage"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fr' ? "Rejoindre la présentation institutionnelle de CABECS." : "Explore CABECS corporate credentials and overview."}
            </p>
          </button>

          <button
            onClick={() => {
              trackEvent('Navigation', '404_click_poles');
              onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('poles');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-[#0066B3] transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-['Outfit',sans-serif] font-bold text-white text-base">
              {language === 'fr' ? "5 Pôles Métiers" : "5 Core Divisions"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fr' ? "Conseil, digital, projets, formations & immobilier." : "Strategy, software, projects, training & real estate."}
            </p>
          </button>

          <button
            onClick={() => {
              trackEvent('Navigation', '404_click_diagnostic');
              onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('diagnostic');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-[#0066B3] transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-['Outfit',sans-serif] font-bold text-white text-base">
              {language === 'fr' ? "Diagnostic Rapide" : "Quick Estimator"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fr' ? "Évaluez vos besoins d'intervention en 4 étapes." : "Estimate your scope and timeline in 4 simple steps."}
            </p>
          </button>
        </motion.div>

        {/* Direct WhatsApp / Phone Assistance */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href={companyInfo.whatsappDirectUrl(
              language === 'fr'
                ? "Bonjour CABECS, je naviguais sur votre site et j'ai une question sur vos prestations."
                : "Hello CABECS, I was browsing your website and have a question about your services."
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('WhatsApp', '404_whatsapp_click')}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-3 rounded-xl text-sm shadow-md transition-transform hover:scale-102"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'fr' ? "Assistance directe WhatsApp" : "Direct WhatsApp Assistance"}</span>
          </a>

          <a
            href={`tel:${companyInfo.phone1Raw}`}
            onClick={() => trackEvent('CTA', '404_call_click')}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 transition-colors"
          >
            <Phone className="w-4 h-4 text-sky-400" />
            <span>{language === 'fr' ? `Appeler le ${companyInfo.phone1}` : `Call ${companyInfo.phone1}`}</span>
          </a>
        </div>
      </main>

      {/* Footer info */}
      <footer className="max-w-7xl mx-auto w-full text-center pt-8 border-t border-slate-800 text-xs text-slate-400">
        <p>{companyInfo.legalName} • RCCM : {companyInfo.rccm} • NIU : {companyInfo.taxId} • Yassa, Douala</p>
      </footer>
    </div>
  );
};
