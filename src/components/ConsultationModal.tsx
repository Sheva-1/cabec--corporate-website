import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, MessageSquare, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPillar?: string;
  preselectedServiceTitle?: string;
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'refund' | 'cookies' | 'mentions') => void;
  onSubmittedLead?: (lead: {
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    pillarTitle: string;
  }) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedPillar,
  preselectedServiceTitle,
  onOpenLegal,
  onSubmittedLead
}) => {
  const { t, currentPillars, companyInfo, language } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pillar, setPillar] = useState(preselectedPillar || 'conseil-strategie');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedPillar) {
      setPillar(preselectedPillar);
    }
    if (preselectedServiceTitle) {
      setDescription(
        language === 'fr' 
          ? `Demande concernant le service : ${preselectedServiceTitle}`
          : `Inquiry regarding service: ${preselectedServiceTitle}`
      );
    }
  }, [preselectedPillar, preselectedServiceTitle, language]);

  // Reset errors and status when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrors({});
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = language === 'fr' ? 'Le nom complet est obligatoire.' : 'Full name is required.';
    if (!organization.trim()) errs.organization = language === 'fr' ? "L'entreprise ou structure est obligatoire." : 'Company or organization is required.';
    
    const cleanPhone = phone.replace(/[\s+-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = language === 'fr' ? 'Numéro de téléphone invalide (min. 8 chiffres).' : 'Invalid phone number (min. 8 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = language === 'fr' ? 'Adresse email professionnelle invalide.' : 'Invalid business email address.';
    }

    if (!consent) {
      errs.consent = language === 'fr' ? 'Veuillez accepter le traitement confidentiel de vos données.' : 'Please accept confidential data processing.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      trackEvent('Consultation', 'modal_form_validation_failed');
      return;
    }

    setStatus('loading');
    trackEvent('Consultation', 'modal_submission_started', pillar);

    setTimeout(() => {
      setStatus('submitted');
      trackEvent('Consultation', 'modal_submitted_success', pillar);
      const pillarTitle = currentPillars.find(p => p.id === pillar)?.title || pillar;
      onSubmittedLead?.({
        fullName,
        organization,
        email,
        phone,
        pillarTitle
      });
    }, 600);
  };

  const getWhatsAppMsg = () => {
    const pName = currentPillars.find(p => p.id === pillar)?.title || pillar;
    const text = `*${language === 'fr' ? 'Demande de Consultation CABECS' : 'CABECS Consultation Request'}*\n` +
      `• *${language === 'fr' ? 'Nom' : 'Name'}*: ${fullName || (language === 'fr' ? 'Client' : 'Client')}\n` +
      `• *${language === 'fr' ? 'Organisation' : 'Organization'}*: ${organization || (language === 'fr' ? 'Non spécifiée' : 'Unspecified')}\n` +
      `• *${language === 'fr' ? 'Pôle' : 'Pillar'}*: ${pName}\n` +
      `• *Contact*: ${phone || (language === 'fr' ? 'À préciser' : 'TBD')} | ${email || (language === 'fr' ? 'À préciser' : 'TBD')}\n` +
      (description ? `• *${language === 'fr' ? 'Projet' : 'Project'}*: ${description}` : '');
    return companyInfo.whatsappDirectUrl(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-consultation-title"
          >
            {/* Header */}
            <div className="bg-[#0B1E33] text-white p-5 flex items-center justify-between sticky top-0 z-10 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-white/95 p-1.5 rounded-lg border border-white/20 shrink-0">
                  <img
                    src="/cabec-symbol.png"
                    alt="Emblème officiel de Cabinet Belkal Consulting SARLU"
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    {companyInfo.legalName}
                  </div>
                  <h3 id="modal-consultation-title" className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold text-white">
                    {t('modal.title')}
                  </h3>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={onClose}
                aria-label={t('modal.cancel')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              {status === 'submitted' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#4F8B50]" aria-hidden="true" />
                  </div>
                  <h4 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                    {t('modal.successTitle')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto">
                    {t('modal.successSub')}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={getWhatsAppMsg()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs focus-visible:ring-2 focus-visible:ring-[#25D366]"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      <span>{t('modal.sendAlsoWhatsApp')}</span>
                    </motion.a>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 rounded-lg"
                    >
                      {t('modal.close')}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {Object.keys(errors).length > 0 && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{language === 'fr' ? 'Veuillez renseigner correctement tous les champs obligatoires.' : 'Please fill in all mandatory fields.'}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="consult-fullname" className="block text-xs font-semibold text-slate-800 mb-1">
                        {t('modal.fullName')} *
                      </label>
                      <input
                        id="consult-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        placeholder={language === 'fr' ? "Votre nom complet" : "Your full name"}
                        className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.fullName ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="consult-org" className="block text-xs font-semibold text-slate-800 mb-1">
                        {t('modal.org')} *
                      </label>
                      <input
                        id="consult-org"
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => {
                          setOrganization(e.target.value);
                          if (errors.organization) setErrors(prev => ({ ...prev, organization: '' }));
                        }}
                        placeholder={language === 'fr' ? "Nom de la société" : "Company name"}
                        className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.organization ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                        }`}
                      />
                      {errors.organization && <p className="text-[11px] text-rose-600 mt-1">{errors.organization}</p>}
                    </div>

                    <div>
                      <label htmlFor="consult-phone" className="block text-xs font-semibold text-slate-800 mb-1">
                        {t('modal.phone')} *
                      </label>
                      <input
                        id="consult-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="+237 6XX XX XX XX"
                        className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.phone ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="consult-email" className="block text-xs font-semibold text-slate-800 mb-1">
                        {t('modal.email')} *
                      </label>
                      <input
                        id="consult-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="nom@entreprise.cm"
                        className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.email ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-pillar" className="block text-xs font-semibold text-slate-800 mb-1">
                      {t('modal.pillar')}
                    </label>
                    <select
                      id="consult-pillar"
                      value={pillar}
                      onChange={(e) => setPillar(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                    >
                      {currentPillars.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="consult-desc" className="block text-xs font-semibold text-slate-800 mb-1">
                      {t('modal.desc')}
                    </label>
                    <textarea
                      id="consult-desc"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={language === 'fr' ? "Décrivez en quelques lignes votre besoin..." : "Briefly describe your objectives or challenges..."}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                    />
                  </div>

                  {/* Mandatory explicit consent */}
                  <div className={`p-3 rounded-xl border transition-colors ${
                    errors.consent ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-snug">
                      <input
                        id="consult-consent"
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
                            J'accepte que mes données soient traitées par <strong>{companyInfo.legalName}</strong> conformément à sa{' '}
                            <button
                              type="button"
                              onClick={() => onOpenLegal?.('privacy')}
                              className="underline text-[#0066B3] hover:text-[#005291] font-semibold cursor-pointer"
                            >
                              {t('diag.privacyLink')}
                            </button>
                            . Aucun démarchage abusif.
                          </>
                        ) : (
                          <>
                            I agree that my data will be handled by <strong>{companyInfo.legalName}</strong> according to its{' '}
                            <button
                              type="button"
                              onClick={() => onOpenLegal?.('privacy')}
                              className="underline text-[#0066B3] hover:text-[#005291] font-semibold cursor-pointer"
                            >
                              {t('diag.privacyLink')}
                            </button>
                            . No spam or commercial resale.
                          </>
                        )}
                      </span>
                    </label>
                    {errors.consent && <p className="text-[11px] text-rose-600 mt-1.5 pl-6">{errors.consent}</p>}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <a
                      href={getWhatsAppMsg()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-md"
                    >
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t('modal.sendViaWhatsApp')}</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 rounded-lg"
                      >
                        {t('modal.cancel')}
                      </button>
                      <motion.button
                        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                        type="submit"
                        disabled={status === 'loading'}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#0066B3] ${
                          status === 'loading'
                            ? 'bg-slate-400 text-white cursor-wait'
                            : 'bg-[#0066B3] hover:bg-[#005291] text-white cursor-pointer'
                        }`}
                        aria-label="Envoyer la demande de cadrage"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{t('modal.sending')}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{t('modal.send')}</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
