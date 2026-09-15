import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/analytics';
import { 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Code2,
  Building2,
  GraduationCap
} from 'lucide-react';

interface HeroProps {
  onOpenConsultation: (pillarId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { t, currentPillars, companyInfo } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Map icons and styles to the dynamically translated currentPillars
  const pillarIconsMap: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
    'conseil-strategie': { icon: TrendingUp, color: 'text-[#0066B3]', bg: 'bg-blue-50' },
    'solutions-digitales': { icon: Code2, color: 'text-[#1686C7]', bg: 'bg-sky-50' },
    'gestion-projets': { icon: CheckCircle2, color: 'text-[#4F8B50]', bg: 'bg-emerald-50' },
    'formations': { icon: GraduationCap, color: 'text-[#0066B3]', bg: 'bg-indigo-50' },
    'immobilier': { icon: Building2, color: 'text-[#4F8B50]', bg: 'bg-teal-50' },
  };

  const pillarsList = currentPillars.map(p => ({
    id: p.id,
    name: p.title,
    desc: p.subtitle,
    icon: pillarIconsMap[p.id]?.icon || TrendingUp,
    color: pillarIconsMap[p.id]?.color || 'text-[#0066B3]',
    bg: pillarIconsMap[p.id]?.bg || 'bg-blue-50'
  }));

  return (
    <section id="hero" className="relative bg-gradient-to-b from-[#F0F6FA] via-[#F8FAFC] to-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066b308_1px,transparent_1px),linear-gradient(to_bottom,#0066b308_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Decorative gradient glow with soft motion */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-[#0066B3]/6 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-[#4F8B50]/6 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Positioning & Value Proposition */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Tagline Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 bg-white/95 border border-[#0066B3]/20 shadow-2xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0066B3]">
              <img
                src="/cabec-symbol.png"
                alt="Emblème officiel de Cabinet Belkal Consulting SARLU"
                referrerPolicy="no-referrer"
                className="w-4 h-4 object-contain shrink-0"
              />
              <span>{t('hero.badge')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-['Outfit',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E2933] leading-[1.15] tracking-tight"
            >
              {t('hero.titlePre')}
              <span className="text-[#0066B3]">{t('hero.titleHighlight1')}</span>
              {t('hero.titleMid')}
              <span className="text-[#4F8B50]">{t('hero.titleHighlight2')}</span>
              {t('hero.titlePost')}
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl"
            >
              {t('hero.description')}
            </motion.p>

            {/* Trust Badges Bar */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-600 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80 shadow-xs"
            >
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#4F8B50]" />
                <span>{t('topbar.rccm')} {companyInfo.rccm}</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div className="text-slate-700">
                {t('hero.taxPayer')} <span className="font-mono text-slate-900">{companyInfo.taxId}</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div className="text-slate-600">
                {t('hero.location')} <span className="text-slate-900 font-medium">{t('hero.locationVal')}</span>
              </div>
            </motion.div>

            {/* Call to Actions with Motion micro-interactions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackEvent('CTA', 'hero_consultation_click');
                  onOpenConsultation();
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-[#0066B3] hover:bg-[#005291] text-white text-base font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>{t('hero.ctaConsultation')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={companyInfo.whatsappDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('WhatsApp', 'hero_whatsapp_click')}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-base font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-all"
              >
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
                <span>{t('hero.ctaWhatsApp')}</span>
              </motion.a>
            </motion.div>

            {/* Key Value Guarantees */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8B50] shrink-0" />
                <span>{t('hero.guarantee1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8B50] shrink-0" />
                <span>{t('hero.guarantee2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8B50] shrink-0" />
                <span>{t('hero.guarantee3')}</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Institutional Overview Card & Pillars Navigator */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-slate-200/90 space-y-5">
              
              {/* Card Header with Official CABECS Emblem */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                    <img
                      src="/cabec-symbol.png"
                      alt="CABECS Emblème Officiel - Symbole Arbre et Fleuve"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066B3]">
                      Cabinet Belkal Consulting
                    </span>
                    <h3 className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold text-slate-900">
                      {t('hero.cardPillarsTitle')}
                    </h3>
                  </div>
                </div>
                <div className="hidden sm:flex px-2.5 py-1 rounded-md bg-emerald-50 text-[#4F8B50] text-xs font-bold items-center gap-1 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('hero.cardStatus')}</span>
                </div>
              </div>

              {/* Quick Interactive Pillars Stack with smooth motion hover */}
              <div className="space-y-2.5">
                {pillarsList.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.08, duration: 0.35 }}
                    whileHover={{ scale: 1.015, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => onOpenConsultation(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenConsultation(item.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Pillar: ${item.name}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#0066B3]/40 hover:bg-slate-50/80 transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066B3]"
                  >
                    <div className={`p-2 rounded-lg ${item.bg} ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 group-hover:text-[#0066B3] transition-colors truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066B3] group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                  </motion.div>
                ))}
              </div>

              {/* Bottom Quick Callout */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>{t('hero.cardCta')}</span>
                <button
                  type="button"
                  onClick={() => onOpenConsultation()}
                  className="font-bold text-[#0066B3] hover:text-[#005291] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0066B3] rounded-xs"
                >
                  {t('hero.ctaConsultation')} →
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
