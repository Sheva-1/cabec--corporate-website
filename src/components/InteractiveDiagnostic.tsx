import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  Briefcase, 
  Clock, 
  ShieldCheck,
  RefreshCw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface InteractiveDiagnosticProps {
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'refund' | 'cookies' | 'mentions') => void;
  onSubmittedLead?: (lead: {
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    pillarTitle: string;
  }) => void;
}

export const InteractiveDiagnostic: React.FC<InteractiveDiagnosticProps> = ({ onOpenLegal, onSubmittedLead }) => {
  const { t, currentPillars, companyInfo, language } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [organizationType, setOrganizationType] = useState<string>(
    language === 'fr' ? 'PME / Entreprise locale' : 'SME / Local Business'
  );
  const [selectedPillar, setSelectedPillar] = useState<string>('solutions-digitales');
  const [timeframe, setTimeframe] = useState<string>(
    language === 'fr' ? 'Immédiat / Urgent (< 1 mois)' : 'Immediate / Urgent (< 1 month)'
  );
  
  // Step 3 fields
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const organizationTypes = language === 'fr' ? [
    { label: 'PME / Entreprise locale', icon: Building, desc: 'Optimisation de la gestion, logiciel & développement' },
    { label: 'Grande Entreprise / Filiale', icon: Briefcase, desc: 'Transformation digitale, audit & formation des cadres' },
    { label: 'Administration ou ONG', icon: ShieldCheck, desc: 'Suivi-évaluation de projets, conformité & gouvernance' },
    { label: 'Investisseur / Diaspora', icon: Clock, desc: 'Opportunités immobilières & vérification de titres fonciers' },
  ] : [
    { label: 'SME / Local Business', icon: Building, desc: 'Management optimization, software & business development' },
    { label: 'Large Enterprise / Subsidiary', icon: Briefcase, desc: 'Digital transformation, audit & executive training' },
    { label: 'Public Institution or NGO', icon: ShieldCheck, desc: 'Project M&E, regulatory compliance & governance' },
    { label: 'Investor / Diaspora', icon: Clock, desc: 'Commercial real estate & land title verification' },
  ];

  const timeframes = language === 'fr' ? [
    'Immédiat / Urgent (< 1 mois)',
    'Court terme (1 à 3 mois)',
    'Moyen terme (3 à 6 mois)',
    'Étude prospective / Audit préalable'
  ] : [
    'Immediate / Urgent (< 1 month)',
    'Short term (1 to 3 months)',
    'Medium term (3 to 6 months)',
    'Prospective Study / Preliminary Audit'
  ];

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = language === 'fr' ? 'Le nom complet est obligatoire.' : 'Full name is required.';
    }
    if (!organization.trim()) {
      errs.organization = language === 'fr' ? "L'organisation est obligatoire." : 'Organization is required.';
    }
    
    const cleanPhone = phone.replace(/[\s+-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = language === 'fr' ? 'Numéro de téléphone invalide (min. 8 chiffres).' : 'Invalid phone number (min. 8 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = language === 'fr' ? 'Adresse email professionnelle valide requise.' : 'Valid business email required.';
    }

    if (!consent) {
      errs.consent = language === 'fr' ? 'Veuillez accepter le traitement confidentiel pour continuer.' : 'Please accept confidential data handling to proceed.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) {
      trackEvent('Diagnostic', 'validation_failed');
      return;
    }

    setStatus('loading');
    trackEvent('Diagnostic', 'submission_started', selectedPillar);

    setTimeout(() => {
      setStatus('submitted');
      trackEvent('Diagnostic', 'submitted_success', selectedPillar);
      const pillarTitle = currentPillars.find(p => p.id === selectedPillar)?.title || selectedPillar;
      onSubmittedLead?.({
        fullName,
        organization,
        email,
        phone,
        pillarTitle
      });
    }, 600);
  };

  const getWhatsAppSummaryMessage = () => {
    const pillarName = currentPillars.find(p => p.id === selectedPillar)?.title || selectedPillar;
    const msg = `*${language === 'fr' ? 'Demande de Diagnostic CABECS' : 'CABECS Scoping Diagnostic Request'}*\n` +
      `• *${language === 'fr' ? 'Nom' : 'Name'}*: ${fullName || (language === 'fr' ? 'Client' : 'Client')}\n` +
      `• *${language === 'fr' ? 'Structure' : 'Organization'}*: ${organization || (language === 'fr' ? 'Non précisée' : 'Unspecified')} (${organizationType})\n` +
      `• *${language === 'fr' ? 'Pôle sollicité' : 'Selected Pillar'}*: ${pillarName}\n` +
      `• *${language === 'fr' ? 'Délai souhaité' : 'Desired Timeline'}*: ${timeframe}\n` +
      `• *Contact*: ${phone || (language === 'fr' ? 'À préciser' : 'TBD')} | ${email || (language === 'fr' ? 'À préciser' : 'TBD')}\n` +
      (description ? `• *${language === 'fr' ? 'Besoin' : 'Need'}*: ${description}` : '');
    return companyInfo.whatsappDirectUrl(msg);
  };

  return (
    <section id="diagnostic" className="py-16 md:py-24 bg-[#F5F8FA] border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#4F8B50] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('diag.badge')}</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('diag.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t('diag.subtitle')}
          </p>
        </motion.div>

        {/* Diagnostic Wizard Container */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          
          {/* Wizard Progress Steps Bar */}
          <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${step >= 1 ? 'bg-[#0066B3] text-white' : 'bg-slate-800 text-slate-400'}`}>
                1
              </span>
              <span className={step === 1 ? 'text-white font-bold' : 'text-slate-400 hidden sm:inline'}>
                {t('diag.step1Title')}
              </span>
              <span className="text-slate-600">→</span>

              <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${step >= 2 ? 'bg-[#0066B3] text-white' : 'bg-slate-800 text-slate-400'}`}>
                2
              </span>
              <span className={step === 2 ? 'text-white font-bold' : 'text-slate-400 hidden sm:inline'}>
                {t('diag.step2Title')}
              </span>
              <span className="text-slate-600">→</span>

              <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${step >= 3 ? 'bg-[#0066B3] text-white' : 'bg-slate-800 text-slate-400'}`}>
                3
              </span>
              <span className={step === 3 ? 'text-white font-bold' : 'text-slate-400 hidden sm:inline'}>
                {t('diag.step3Title')}
              </span>
            </div>

            <span className="text-xs text-slate-400 font-medium hidden md:block">
              {language === 'fr' ? `Étape ${step} sur 3` : `Step ${step} of 3`}
            </span>
          </div>

          {/* Form Content with AnimatePresence Step Transitions */}
          <div className="p-6 sm:p-8">
            {status !== 'submitted' ? (
              <AnimatePresence mode="wait">
                {/* Step 1: Organization Profile */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 mb-1">
                        1. {t('diag.step1Header')}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {t('diag.step1Desc')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {organizationTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = organizationType === type.label;
                        return (
                          <motion.div
                            key={type.label}
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => setOrganizationType(type.label)}
                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                              isSelected
                                ? 'border-[#0066B3] bg-blue-50/50 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#0066B3] text-white' : 'bg-slate-100 text-slate-600'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-900">{type.label}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{type.desc}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer"
                      >
                        <span>{t('diag.continueBtn')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Pillar & Timeframe */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 mb-1">
                        2. {t('diag.step2Header')}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {t('diag.step2Desc')}
                      </p>
                    </div>

                    {/* Pillar Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentPillars.map((p) => (
                        <motion.div
                          key={p.id}
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          onClick={() => setSelectedPillar(p.id)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPillar === p.id
                              ? 'border-[#0066B3] bg-blue-50/60 font-semibold'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-sm font-bold text-slate-800">{p.title}</div>
                          <div className="text-xs text-slate-500 mt-1 line-clamp-1">{p.subtitle}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Timeframe Selection */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {t('diag.timeframeLabel')}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {timeframes.map((tf) => (
                          <motion.label
                            key={tf}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setTimeframe(tf)}
                            className={`flex items-center gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                              timeframe === tf
                                ? 'border-[#4F8B50] bg-emerald-50 text-emerald-900 font-semibold'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="timeframe"
                              checked={timeframe === tf}
                              onChange={() => setTimeframe(tf)}
                              className="text-[#4F8B50] focus:ring-[#4F8B50]"
                            />
                            <span>{tf}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2 cursor-pointer"
                      >
                        ← {t('diag.backBtn')}
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer"
                      >
                        <span>{t('diag.lastStepBtn')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact & Send */}
                {step === 3 && (
                  <motion.form
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 mb-1">
                        3. {t('diag.step3Header')}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {t('diag.step3Desc')}
                      </p>
                    </div>

                    {Object.keys(errors).length > 0 && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>{language === 'fr' ? 'Veuillez corriger les informations requises avant de valider.' : 'Please correct the required fields before submitting.'}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="diag-fullname" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('diag.nameLabel')} *
                        </label>
                        <input
                          id="diag-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                          }}
                          placeholder="Ex: Jean-Paul Mba"
                          className={`w-full text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.fullName ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label htmlFor="diag-org" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('diag.orgLabel')} *
                        </label>
                        <input
                          id="diag-org"
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => {
                            setOrganization(e.target.value);
                            if (errors.organization) setErrors(prev => ({ ...prev, organization: '' }));
                          }}
                          placeholder={language === 'fr' ? "Ex: Société Camerounaise de..." : "Ex: Acme Corporation Ltd."}
                          className={`w-full text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.organization ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.organization && <p className="text-[11px] text-rose-600 mt-1">{errors.organization}</p>}
                      </div>

                      <div>
                        <label htmlFor="diag-phone" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('diag.phoneLabel')} *
                        </label>
                        <input
                          id="diag-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                          }}
                          placeholder="+237 6XX XX XX XX"
                          className={`w-full text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.phone ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="diag-email" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('diag.emailLabel')} *
                        </label>
                        <input
                          id="diag-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                          }}
                          placeholder="contact@votre-entreprise.cm"
                          className={`w-full text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.email ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="diag-desc" className="block text-xs font-semibold text-slate-800 mb-1">
                        {t('diag.descLabel')}
                      </label>
                      <textarea
                        id="diag-desc"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('diag.descPlaceholder')}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      />
                    </div>

                    {/* Consent checkbox */}
                    <div className={`p-3 rounded-xl border transition-colors ${
                      errors.consent ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-snug">
                        <input
                          id="diag-consent"
                          type="checkbox"
                          required
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            if (errors.consent) setErrors(prev => ({ ...prev, consent: '' }));
                          }}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0066B3] focus:ring-[#0066B3] cursor-pointer shrink-0"
                        />
                        <span>
                          {language === 'fr' ? (
                            <>
                              J'accepte que les données saisies soient traitées par <strong>{companyInfo.legalName}</strong> conformément à sa{' '}
                              <button
                                type="button"
                                onClick={() => onOpenLegal?.('privacy')}
                                className="underline text-[#0066B3] hover:text-[#005291] font-semibold cursor-pointer"
                              >
                                {t('diag.privacyLink')}
                              </button>
                              . Aucune revente de données ni prospection abusive.
                            </>
                          ) : (
                            <>
                              I agree that the entered data will be processed by <strong>{companyInfo.legalName}</strong> in accordance with its{' '}
                              <button
                                type="button"
                                onClick={() => onOpenLegal?.('privacy')}
                                className="underline text-[#0066B3] hover:text-[#005291] font-semibold cursor-pointer"
                              >
                                {t('diag.privacyLink')}
                              </button>
                              . No data resale or spam.
                            </>
                          )}
                        </span>
                      </label>
                      {errors.consent && <p className="text-[11px] text-rose-600 mt-1.5 pl-6">{errors.consent}</p>}
                    </div>

                    {/* Recap Summary Box */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-semibold text-slate-900">{t('diag.recapLabel')}</span> {organizationType} • {currentPillars.find(p => p.id === selectedPillar)?.title} • {timeframe}
                      </div>
                      <span className="text-emerald-800 font-bold">{t('diag.confidential')}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-slate-700 hover:text-slate-900 text-sm font-semibold px-4 py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 rounded-lg"
                      >
                        ← {t('diag.backBtn')}
                      </button>

                      <div className="flex items-center gap-3">
                        {/* Dual Option: WhatsApp direct or Email Submission */}
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={getWhatsAppSummaryMessage()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-[#25D366]"
                          aria-label="Transmettre directement les détails du cadrage sur WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" aria-hidden="true" />
                          <span>{t('diag.sendWhatsApp')}</span>
                        </motion.a>

                        <motion.button
                          whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                          whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                          type="submit"
                          disabled={status === 'loading'}
                          className={`inline-flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0066B3] ${
                            status === 'loading'
                              ? 'bg-slate-400 text-white cursor-wait'
                              : 'bg-[#0066B3] hover:bg-[#005291] text-white'
                          }`}
                          aria-label="Valider et transmettre la demande de diagnostic gratuit"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>{t('diag.submitting')}</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" aria-hidden="true" />
                              <span>{t('diag.submitBtn')}</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            ) : (
              /* Success Confirmation View */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="text-center py-8 space-y-4"
              >
                <div className="flex items-center justify-center gap-3 mx-auto mb-1">
                  <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs">
                    <img
                      src="/cabec-logo.png"
                      alt="Cabinet Belkal Consulting SARLU - Douala"
                      referrerPolicy="no-referrer"
                      className="h-12 sm:h-14 w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="w-14 h-14 bg-emerald-100 text-[#4F8B50] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h3 className="font-['Outfit',sans-serif] text-2xl font-extrabold text-slate-900">
                  {t('diag.successTitle')}
                </h3>

                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  {language === 'fr' ? (
                    <>
                      Merci, <strong className="text-slate-900">{fullName || 'Cher Partenaire'}</strong>. Votre demande pour le compte de <strong className="text-slate-900">{organization || 'votre organisation'}</strong> a été transmise à notre équipe de consultants à Yassa, Douala.
                    </>
                  ) : (
                    <>
                      Thank you, <strong className="text-slate-900">{fullName || 'Valued Partner'}</strong>. Your request on behalf of <strong className="text-slate-900">{organization || 'your organization'}</strong> has been sent to our consulting team in Yassa, Douala.
                    </>
                  )}
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-xs text-slate-600 text-left space-y-1">
                  <div><strong>{language === 'fr' ? 'Email de confirmation :' : 'Confirmation email:'}</strong> {email || companyInfo.email}</div>
                  <div><strong>{language === 'fr' ? 'Téléphone de suivi :' : 'Follow-up phone:'}</strong> {phone || companyInfo.phone1}</div>
                  <div><strong>{language === 'fr' ? 'Engagement CABECS :' : 'CABECS Commitment:'}</strong> {language === 'fr' ? 'Retour sous 24h ouvrées avec fiche de cadrage.' : 'Response within 24 business hours with scoping brief.'}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={getWhatsAppSummaryMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-3 rounded-xl text-sm shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('diag.accelerateWhatsApp')}</span>
                  </motion.a>

                  <button
                    onClick={() => {
                      setStatus('idle');
                      setErrors({});
                      setStep(1);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 p-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t('diag.newDiag')}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
};
