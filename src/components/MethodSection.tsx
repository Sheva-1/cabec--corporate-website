import React from 'react';
import { METHOD_STEPS } from '../data/cabecData';
import { Layers, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface MethodSectionProps {
  onOpenConsultation: () => void;
}

export const MethodSection: React.FC<MethodSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="methode" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066B3] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Processus & Rigueur d'Intervention</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Une Méthodologie Éprouvée en 4 Jalons
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Chaque mission CABEC suit un cycle de vie rigoureux pour garantir le respect strict des délais, des budgets et l'appropriation durable par vos équipes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {METHOD_STEPS.map((step, index) => (
            <div 
              key={step.step}
              className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 hover:border-[#0066B3]/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Step Index & Timeframe */}
                <div className="flex items-center justify-between">
                  <span className="font-['Outfit',sans-serif] text-3xl font-black text-[#0066B3]/40 group-hover:text-[#0066B3] transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200 text-slate-600 shadow-2xs">
                    {step.timeframe}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 group-hover:text-[#0066B3] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Deliverable Badge */}
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#4F8B50]" />
                  <span>Livrable contractuel</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200/70 shadow-2xs">
                  {step.deliverable}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Assurance Banner */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-600/20 text-[#38BDF8] shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold text-white">
                Engagement de Gouvernance & Accord de Confidentialité (NDA)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Toutes nos interventions font l'objet d'accords contractuels stricts protégeant votre savoir-faire et vos données métier.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shrink-0 transition-all active:scale-95"
          >
            <span>Démarrer un cadrage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
