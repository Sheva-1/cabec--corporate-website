import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Award, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Info 
} from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenConsultation: (pillarId?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenConsultation }) => {
  const { t, currentCaseStudies, language } = useLanguage();
  const [filterPillar, setFilterPillar] = useState<string>('all');

  const filteredCases = filterPillar === 'all'
    ? currentCaseStudies
    : currentCaseStudies.filter(c => c.pillarId === filterPillar);

  const filterOptions = [
    { id: 'all', label: t('cases.filterAll') },
    { id: 'solutions-digitales', label: language === 'fr' ? 'Digital & Logiciels' : 'Digital & Software' },
    { id: 'gestion-projets', label: language === 'fr' ? 'Suivi-Évaluation' : 'M&E Projects' },
    { id: 'conseil-strategie', label: language === 'fr' ? 'Stratégie & Orga' : 'Strategy & Org' },
    { id: 'immobilier', label: language === 'fr' ? 'Immobilier d’Entreprise' : 'Corporate Real Estate' },
  ];

  return (
    <section id="realisations" className="py-16 md:py-24 bg-[#F8FAFC]" aria-labelledby="cases-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <Award className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>{t('cases.badge')}</span>
            </div>
            <h2 id="cases-heading" className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              {t('cases.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              {t('cases.subtitle')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold" role="toolbar" aria-label="Filtrer les études de cas par pôle">
            <span className="text-slate-700 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('cases.filterLabel')}</span>
            </span>
            {filterOptions.map((f) => (
              <motion.button
                key={f.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilterPillar(f.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0066B3] ${
                  filterPillar === f.id
                    ? 'bg-[#0066B3] text-white shadow-xs font-bold'
                    : 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
                aria-pressed={filterPillar === f.id}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Legal Transparency Notice Banner */}
        <div className="mb-10 bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 text-xs text-slate-700">
          <Info className="w-4 h-4 text-[#0066B3] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="text-slate-900 font-semibold">{t('cases.disclaimer')}</strong>{' '}
            {language === 'fr' 
              ? "Aucun faux témoignage ni avis client fictif n'est publié sur ce site." 
              : "No fake reviews or fictional testimonials are published on this website."}
          </p>
        </div>

        {/* Case Studies Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredCases.map((study) => (
              <motion.article
                layout
                key={study.id}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Header Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-[#0066B3] uppercase tracking-wider">
                      {study.clientCategory}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                      <span>{study.location}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900 leading-snug group-hover:text-[#0066B3] transition-colors">
                    {study.title}
                  </h3>

                  {/* Context & Challenge */}
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <p>
                      <strong className="text-slate-900 font-semibold">{t('cases.contextLabel')}:</strong> {study.context}
                    </p>
                    <p>
                      <strong className="text-slate-900 font-semibold">{t('cases.challengeLabel')}:</strong> {study.challenge}
                    </p>
                    <p>
                      <strong className="text-slate-900 font-semibold">{t('cases.solutionLabel')}:</strong> {study.solution}
                    </p>
                  </div>

                  {/* Results List */}
                  <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                      {t('cases.resultsTag')}
                    </div>
                    <ul className="space-y-1.5">
                      {study.results.map((res, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-semibold text-emerald-950">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4F8B50] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies / Methodologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {study.technologiesOrMethods.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-semibold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">{t('cases.documentedTag')}</span>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(study.pillarId)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066B3] hover:text-[#005291] underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0066B3]"
                    aria-label={`Échanger sur un projet similaire à ${study.title}`}
                  >
                    <span>{t('cases.ctaSimilar')}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
