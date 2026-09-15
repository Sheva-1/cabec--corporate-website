import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Trees, 
  MapPin, 
  Cpu, 
  HeartHandshake
} from 'lucide-react';

export const WhyCabecSection: React.FC = () => {
  const { t, companyInfo, language } = useLanguage();

  const pillars = [
    {
      title: t('why.p1Title'),
      subtitle: t('why.p1Sub'),
      desc: t('why.p1Desc'),
      icon: MapPin,
      color: 'text-[#0066B3]',
      bg: 'bg-blue-50'
    },
    {
      title: t('why.p2Title'),
      subtitle: t('why.p2Sub'),
      desc: t('why.p2Desc'),
      icon: Cpu,
      color: 'text-[#4F8B50]',
      bg: 'bg-emerald-50'
    },
    {
      title: t('why.p3Title'),
      subtitle: t('why.p3Sub'),
      desc: language === 'fr' 
        ? `Enregistré au RCCM sous le numéro ${companyInfo.rccm} et titulaire du N° Contribuable ${companyInfo.taxId}, nous garantissons des facturations fiscalement déductibles.`
        : `Registered with RCCM under number ${companyInfo.rccm} and Tax ID ${companyInfo.taxId}, ensuring fully tax-deductible compliant billing.`,
      icon: ShieldCheck,
      color: 'text-[#1686C7]',
      bg: 'bg-sky-50'
    },
    {
      title: t('why.p4Title'),
      subtitle: t('why.p4Sub'),
      desc: t('why.p4Desc'),
      icon: HeartHandshake,
      color: 'text-[#0066B3]',
      bg: 'bg-indigo-50'
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#4F8B50] text-xs font-bold uppercase tracking-wider">
            <Trees className="w-3.5 h-3.5" />
            <span>{t('why.badge')}</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            {t('why.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('why.subtitle')}
          </p>
        </motion.div>

        {/* Official Brand Emblem & Metaphor Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 bg-gradient-to-r from-blue-50/70 via-slate-50 to-emerald-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: The Official Logo with transparent background */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <img
                src="/cabecs-logo.png"
                alt="CABECS - Cabinet Belkal Consulting SARLU - Logo Officiel"
                referrerPolicy="no-referrer"
                className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0066B3]"></span>
                <span>{t('why.emblemTag')}</span>
              </div>
            </div>

            {/* Right: The 3 Metaphorical Foundations of the Logo */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/95 p-4 rounded-xl border border-slate-200/70 space-y-1.5 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#4F8B50] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4F8B50]"></span>
                  {t('why.treeTitle')}
                </div>
                <div className="text-sm font-bold text-slate-900">{t('why.treeSub')}</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('why.treeDesc')}
                </p>
              </div>

              <div className="bg-white/95 p-4 rounded-xl border border-slate-200/70 space-y-1.5 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  {t('why.mountainTitle')}
                </div>
                <div className="text-sm font-bold text-slate-900">{t('why.mountainSub')}</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('why.mountainDesc')}
                </p>
              </div>

              <div className="bg-white/95 p-4 rounded-xl border border-slate-200/70 space-y-1.5 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0066B3] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0066B3]"></span>
                  {t('why.riverTitle')}
                </div>
                <div className="text-sm font-bold text-slate-900">{t('why.riverSub')}</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('why.riverDesc')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
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
              </motion.div>
            );
          })}
        </div>

        {/* Legal Certification Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-900 via-[#0B1E33] to-[#004A80] text-white rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-sky-400">{t('why.legalNameTag')}</span>
              <div className="font-['Outfit',sans-serif] text-lg font-bold text-white">
                {companyInfo.legalName}
              </div>
              <p className="text-xs text-slate-300">
                {t('why.legalStatus')}
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6 space-y-1">
              <span className="text-xs uppercase font-bold text-emerald-400">{t('why.officialRegTag')}</span>
              <div className="text-xs sm:text-sm text-slate-200 font-mono space-y-1">
                <div>RCCM : <strong className="text-white">{companyInfo.rccm}</strong></div>
                <div>{t('hero.taxPayer')} : <strong className="text-white">{companyInfo.taxId}</strong></div>
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6 space-y-1">
              <span className="text-xs uppercase font-bold text-sky-400">{t('why.zoneTag')}</span>
              <div className="text-sm font-bold text-white">
                {t('why.zoneCountries')}
              </div>
              <p className="text-xs text-slate-300">
                {t('why.zoneDetails')}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
