import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'refund' | 'cookies' | 'mentions') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t, currentPillars, companyInfo, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const floatingWhatsAppPrompt = language === 'fr'
    ? 'Bonjour CABECS, je souhaite être recontacté rapidement.'
    : 'Hello CABECS, I would like to be contacted promptly.';

  return (
    <footer className="bg-[#0B1E33] text-slate-300 font-['Plus_Jakarta_Sans',sans-serif] border-t border-slate-800">
      
      {/* Upper Pre-Footer Callout */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-white">
              {t('footer.readyTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {t('footer.readySub')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={companyInfo.whatsappDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('footer.chatWhatsApp')}</span>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#diagnostic"
              className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-md transition-all"
            >
              <span>{t('footer.launchSimulator')}</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Coordinates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="white" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-white">{companyInfo.legalName} (CABECS)</strong> {t('footer.tagline')}
            </p>
            
            <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div>RCCM : <span className="text-slate-200">{companyInfo.rccm}</span></div>
              <div>{language === 'fr' ? 'N° Contribuable :' : 'Tax ID :'} <span className="text-slate-200">{companyInfo.taxId}</span></div>
              <div className="text-emerald-400 font-sans font-medium flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{t('footer.lawMention')}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Les 5 Pôles d'intervention (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-['Outfit',sans-serif]">
              {t('footer.expertisesTitle')}
            </div>
            <ul className="space-y-2 text-xs">
              {currentPillars.map((p) => (
                <li key={p.id}>
                  <a
                    href="#poles"
                    className="hover:text-white transition-colors block py-0.5 text-slate-300"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation Institutionnelle (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-['Outfit',sans-serif]">
              {t('footer.navTitle')}
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#poles" className="hover:text-white transition-colors">{t('nav.pillars')}</a></li>
              <li><a href="#methode" className="hover:text-white transition-colors">{t('nav.method')}</a></li>
              <li><a href="#realisations" className="hover:text-white transition-colors">{t('nav.cases')}</a></li>
              <li><a href="#diagnostic" className="hover:text-white transition-colors">{t('nav.diagnostic')}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t('nav.faq')}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Direct & Horaires (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-['Outfit',sans-serif]">
              {t('footer.coordsTitle')}
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${companyInfo.phone1Raw}`} className="block hover:text-white">
                    {companyInfo.phone1}
                  </a>
                  <a href={`tel:${companyInfo.phone2Raw}`} className="block hover:text-white text-slate-400">
                    {companyInfo.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-400">{companyInfo.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with full legal compliance links */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200">{companyInfo.legalName}</strong> (CABECS). {t('footer.rights')}
          </div>
          <nav aria-label="Liens juridiques et conformité" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <button
              type="button"
              onClick={() => onOpenLegal?.('mentions')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
            >
              {t('footer.legalMentions')}
            </button>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
            >
              {t('footer.privacyPolicy')}
            </button>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
            >
              {t('footer.terms')}
            </button>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('refund')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
            >
              {t('footer.refunds')}
            </button>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('cookies')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
            >
              {t('footer.cookies')}
            </button>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Retourner en haut de page"
              className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </nav>
        </div>

      </div>

      {/* Persistent Floating WhatsApp Quick Button for Mobile/Desktop */}
      <aside aria-label="Action rapide WhatsApp">
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={companyInfo.whatsappDirectUrl(floatingWhatsAppPrompt)}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-shadow group cursor-pointer"
          title={t('footer.chatWhatsApp')}
        >
          <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Direct</span>
        </motion.a>
      </aside>
    </footer>
  );
};
