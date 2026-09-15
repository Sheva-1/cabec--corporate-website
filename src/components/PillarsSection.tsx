import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ServicePillarId } from '../types';
import { 
  TrendingUp, 
  Code2, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Package, 
  Users, 
  Check
} from 'lucide-react';

interface PillarsSectionProps {
  onSelectService: (pillarId: string, serviceTitle?: string) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onSelectService }) => {
  const { t, currentPillars } = useLanguage();
  const [activePillarId, setActivePillarId] = useState<ServicePillarId>('conseil-strategie');

  const activePillar = currentPillars.find(p => p.id === activePillarId) || currentPillars[0];

  const getPillarIcon = (id: ServicePillarId) => {
    switch (id) {
      case 'conseil-strategie': return TrendingUp;
      case 'solutions-digitales': return Code2;
      case 'gestion-projets': return CheckCircle2;
      case 'formations': return GraduationCap;
      case 'immobilier': return Building2;
      default: return TrendingUp;
    }
  };

  return (
    <section id="poles" className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0066B3] text-xs font-bold tracking-wide uppercase">
            {t('pillars.badge')}
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('pillars.title')}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t('pillars.subtitle')}
          </p>
        </motion.div>

        {/* Tab Controls (Scrollable on mobile with smooth pill micro-interactions) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar mb-8">
          {currentPillars.map((pillar) => {
            const Icon = getPillarIcon(pillar.id);
            const isActive = pillar.id === activePillarId;

            return (
              <motion.button
                key={pillar.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePillarId(pillar.id)}
                className={`inline-flex items-center gap-2.5 px-4.5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0066B3] text-white shadow-md'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{pillar.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Pillar Card Header with Animated Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-slate-900 via-[#0B1E33] to-[#004A80] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-3 py-1 rounded-md border border-sky-800/50">
                    {activePillar.badge}
                  </span>
                  <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-extrabold text-white">
                    {activePillar.title} — {activePillar.subtitle}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {activePillar.description}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectService(activePillar.id)}
                  className="inline-flex items-center gap-2 bg-[#4F8B50] hover:bg-[#3f7240] text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md transition-all self-start md:self-auto shrink-0 cursor-pointer"
                >
                  <span>{t('pillars.consultPillarBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Detailed Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activePillar.services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#0066B3]/40"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 group-hover:text-[#0066B3] transition-colors">
                        {service.title}
                      </h4>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Target Audience Pill */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <Users className="w-3.5 h-3.5 text-[#0066B3] shrink-0" />
                      <span className="font-medium text-slate-700">{t('pillars.targetAudience')}:</span>
                      <span className="truncate">{service.targetAudience}</span>
                    </div>

                    {/* Concrete Deliverables */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <Package className="w-3.5 h-3.5 text-[#4F8B50]" />
                        <span>{t('pillars.deliverables')}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {service.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-[#4F8B50] shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Service Action Button */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{t('pillars.quoteTag')}</span>
                    <motion.button
                      whileHover={{ x: 2 }}
                      onClick={() => onSelectService(activePillar.id, service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066B3] hover:text-[#004A80] transition-colors group-hover:underline cursor-pointer"
                    >
                      <span>{t('pillars.requestQuote')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
