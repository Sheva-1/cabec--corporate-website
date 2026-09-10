import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/cabecData';
import { 
  Award, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Filter
} from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenConsultation: (pillarId?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenConsultation }) => {
  const [filterPillar, setFilterPillar] = useState<string>('all');

  const filteredCases = filterPillar === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.pillarId === filterPillar);

  return (
    <section id="realisations" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#4F8B50] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Études de Cas & Résultats Mesurables</span>
            </div>
            <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Des Réalisations Concrètes sur le Terrain
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Découvrez comment nos interventions transforment la performance de nos clients au Cameroun et dans l'espace CEMAC.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrer :</span>
            </span>
            {[
              { id: 'all', label: 'Toutes les missions' },
              { id: 'solutions-digitales', label: 'Digital & Logiciels' },
              { id: 'gestion-projets', label: 'Suivi-Évaluation' },
              { id: 'conseil-strategie', label: 'Stratégie & Orga' },
              { id: 'immobilier', label: 'Immobilier d’Entreprise' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterPillar(f.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterPillar === f.id
                    ? 'bg-[#0066B3] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCases.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-[#0066B3] uppercase tracking-wider">
                    {study.clientCategory}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{study.location}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900 leading-snug">
                  {study.title}
                </h3>

                {/* Context & Challenge */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <p>
                    <strong className="text-slate-800 font-semibold">Contexte :</strong> {study.context}
                  </p>
                  <p>
                    <strong className="text-slate-800 font-semibold">Défi rencontré :</strong> {study.challenge}
                  </p>
                  <p>
                    <strong className="text-slate-800 font-semibold">Intervention CABEC :</strong> {study.solution}
                  </p>
                </div>

                {/* Results List */}
                <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Résultats chiffrés obtenus
                  </div>
                  <ul className="space-y-1.5">
                    {study.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-emerald-950">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4F8B50] shrink-0 mt-0.5" />
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
                      className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Étude de cas vérifiée</span>
                <button
                  onClick={() => onOpenConsultation(study.pillarId)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066B3] hover:underline"
                >
                  <span>Projet similaire ? Parlons-en</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
