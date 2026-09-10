import React from 'react';
import { COMPANY_INFO } from '../data/cabecData';
import { 
  ShieldCheck, 
  Trees, 
  MapPin, 
  Cpu, 
  Award, 
  CheckCircle2, 
  HeartHandshake
} from 'lucide-react';

export const WhyCabecSection: React.FC = () => {
  const pillars = [
    {
      title: 'Racines Solides & Ancrage Local',
      subtitle: 'Compréhension intime du tissu économique',
      desc: 'Implanté à Yassa (Douala), CABEC maîtrise les spécificités réglementaires camerounaises (fiscalité, droit OHADA, pratiques bancaires CEMAC et réalités du terrain).',
      icon: MapPin,
      color: 'text-[#0066B3]',
      bg: 'bg-blue-50'
    },
    {
      title: 'Double Compétence Stratégie & Tech',
      subtitle: 'Du conseil exécutif au déploiement de code',
      desc: 'Nous refusons les recommandations théoriques sans suite. Nos consultants conçoivent la stratégie et nos ingénieurs développent vos solutions logicielles.',
      icon: Cpu,
      color: 'text-[#4F8B50]',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Conformité & Transparence Totale',
      subtitle: 'Structure légale irréprochable',
      desc: `Enregistré au RCCM sous le numéro ${COMPANY_INFO.rccm} et titulaire du N° Contribuable ${COMPANY_INFO.taxId}, nous garantissons des facturations fiscalement déductibles.`,
      icon: ShieldCheck,
      color: 'text-[#1686C7]',
      bg: 'bg-sky-50'
    },
    {
      title: 'Pérennité & Souveraineté des Données',
      subtitle: 'Propriété exclusive de vos actifs',
      desc: 'Vous conservez 100% de la propriété intellectuelle sur vos codes, données métier et documents. Nous formons vos équipes pour votre autonomie totale.',
      icon: HeartHandshake,
      color: 'text-[#0066B3]',
      bg: 'bg-indigo-50'
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#4F8B50] text-xs font-bold uppercase tracking-wider">
            <Trees className="w-3.5 h-3.5" />
            <span>L’Identité CABEC</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            La Métaphore de l'Arbre : Stabilité, Croissance & Avenir
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Notre emblème associe l’arbre, les montagnes et le fleuve : des racines profondément ancrées dans la rigueur pour une ramure tournée vers l’innovation durable.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 hover:border-[#0066B3]/40 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#0066B3] mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Certification Card */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0B1E33] to-[#004A80] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-sky-400">Dénomination Légale</span>
              <div className="font-['Outfit',sans-serif] text-lg font-bold text-white">
                {COMPANY_INFO.legalName}
              </div>
              <p className="text-xs text-slate-300">
                Société à Responsabilité Limitée Unipersonnelle (SARLU)
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6 space-y-1">
              <span className="text-xs uppercase font-bold text-emerald-400">Enregistrements Officiels</span>
              <div className="text-xs sm:text-sm text-slate-200 font-mono space-y-1">
                <div>RCCM : <strong className="text-white">{COMPANY_INFO.rccm}</strong></div>
                <div>N° Contribuable : <strong className="text-white">{COMPANY_INFO.taxId}</strong></div>
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6 space-y-1">
              <span className="text-xs uppercase font-bold text-sky-400">Zone d'Intervention</span>
              <div className="text-sm font-bold text-white">
                Cameroun • CEMAC • International
              </div>
              <p className="text-xs text-slate-300">
                Intervention sur site à Douala et Yaoundé, déploiement sous-régional.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
