import React from 'react';
import { COMPANY_INFO } from '../data/cabecData';
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
  return (
    <section id="hero" className="relative bg-gradient-to-b from-[#F0F6FA] via-[#F8FAFC] to-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066b308_1px,transparent_1px),linear-gradient(to_bottom,#0066b308_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#0066B3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#4F8B50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Positioning & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[#0066B3]/20 shadow-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0066B3]">
              <span className="w-2 h-2 rounded-full bg-[#4F8B50] animate-pulse" />
              <span>{COMPANY_INFO.legalName} • Douala, Cameroun</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E2933] leading-[1.15] tracking-tight">
              Conseil en Stratégie,{' '}
              <span className="text-[#0066B3]">Solutions Digitales</span> &{' '}
              <span className="text-[#4F8B50]">Innovation</span> en Afrique Centrale
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              <strong className="text-slate-900 font-semibold">CABEC</strong> accompagne les entreprises, institutions publiques, investisseurs et porteurs de projets dans leur développement à fort impact. Nous transformons les défis de gestion et de technologie en leviers de croissance pérennes.
            </p>

            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#4F8B50]" />
                <span>RCCM : {COMPANY_INFO.rccm}</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div className="text-slate-700">
                Contribuable : <span className="font-mono text-slate-900">{COMPANY_INFO.taxId}</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div className="text-slate-600">
                Implantation : <span className="text-slate-900 font-medium">Yassa, Douala</span>
              </div>
            </div>

            {/* Call to Actions (Dual conversion funnel: High-touch Consultation + Fast WhatsApp) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center justify-center gap-2.5 bg-[#0066B3] hover:bg-[#005291] text-white text-base font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
              >
                <span>Demander un cadrage de projet</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={COMPANY_INFO.whatsappDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-base font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
                <span>Échanger sur WhatsApp</span>
              </a>
            </div>

            {/* Key Value Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8B50] shrink-0" />
                <span>Diagnostics opérationnels réels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8B50] shrink-0" />
                <span>Code souverain & sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F8B50] shrink-0" />
                <span>Conformité juridique OHADA</span>
              </div>
            </div>

          </div>

          {/* Right Column: Institutional Overview Card & Pillars Navigator */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-slate-200/90 space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066B3]">
                    Périmètre d'Excellence
                  </span>
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                    5 Pôles Métiers Structurés
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#4F8B50] text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Phase 1 Active</span>
                </div>
              </div>

              {/* Quick Interactive Pillars Stack */}
              <div className="space-y-2.5">
                {[
                  {
                    id: 'conseil-strategie',
                    name: 'Conseil en Management & Stratégie',
                    desc: 'Plans stratégiques, restructuration, fiches de postes & gouvernance',
                    icon: TrendingUp,
                    color: 'text-[#0066B3]',
                    bg: 'bg-blue-50'
                  },
                  {
                    id: 'solutions-digitales',
                    name: 'Solutions Digitales & Logiciels',
                    desc: 'Applications web, mobiles, ERP métier et automatisation de flux',
                    icon: Code2,
                    color: 'text-[#1686C7]',
                    bg: 'bg-sky-50'
                  },
                  {
                    id: 'gestion-projets',
                    name: 'Gestion de Projets & Suivi-Évaluation',
                    desc: 'Cadrage méthodologique, indicateurs bailleurs et audits d’impact',
                    icon: CheckCircle2,
                    color: 'text-[#4F8B50]',
                    bg: 'bg-emerald-50'
                  },
                  {
                    id: 'formations',
                    name: 'Académie & Renforcement de Capacités',
                    desc: 'Formations certifiantes de cadres, management & outils digitaux',
                    icon: GraduationCap,
                    color: 'text-[#0066B3]',
                    bg: 'bg-indigo-50'
                  },
                  {
                    id: 'immobilier',
                    name: 'Immobilier d’Entreprise & Investissement',
                    desc: 'Due diligence foncière, locaux pro & conseil aux investisseurs',
                    icon: Building2,
                    color: 'text-[#4F8B50]',
                    bg: 'bg-teal-50'
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenConsultation(item.id)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#0066B3]/40 hover:bg-slate-50/80 transition-all cursor-pointer group"
                  >
                    <div className={`p-2 rounded-lg ${item.bg} ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 group-hover:text-[#0066B3] transition-colors truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066B3] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>

              {/* Bottom Quick Callout */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Besoin d'un audit préliminaire ?</span>
                <button
                  onClick={() => onOpenConsultation()}
                  className="font-bold text-[#0066B3] hover:underline"
                >
                  Diagnostic gratuit →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
