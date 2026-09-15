import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building,
  Navigation,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ContactAndMapSectionProps {
  preselectedPillar?: string;
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'refund' | 'cookies' | 'mentions') => void;
  onSubmittedLead?: (lead: {
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    pillarTitle: string;
  }) => void;
}

export const ContactAndMapSection: React.FC<ContactAndMapSectionProps> = ({ 
  preselectedPillar, 
  onOpenLegal,
  onSubmittedLead 
}) => {
  const { t, currentPillars, companyInfo, language } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(language === 'fr' ? 'Douala, Cameroun' : 'Douala, Cameroon');
  const [selectedService, setSelectedService] = useState(preselectedPillar || 'conseil-strategie');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState(language === 'fr' ? 'À définir lors du cadrage' : 'To be defined during scoping');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedPillar) {
      setSelectedService(preselectedPillar);
    }
  }, [preselectedPillar]);

  const budgetOptions = language === 'fr' ? [
    'À définir lors du cadrage',
    'Moins de 2 000 000 FCFA',
    '2 000 000 à 5 000 000 FCFA',
    '5 000 000 à 15 000 000 FCFA',
    'Plus de 15 000 000 FCFA'
  ] : [
    'To be defined during scoping',
    'Under 2,000,000 XAF',
    '2,000,000 to 5,000,000 XAF',
    '5,000,000 to 15,000,000 XAF',
    'Over 15,000,000 XAF'
  ];

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = language === 'fr' ? 'Veuillez renseigner votre nom et prénom.' : 'Please enter your full name.';
    if (!organization.trim()) errs.organization = language === 'fr' ? 'Veuillez préciser votre organisation ou entreprise.' : 'Please specify your organization or company.';
    if (!location.trim()) errs.location = language === 'fr' ? 'Veuillez préciser votre ville et pays.' : 'Please specify your city and country.';
    
    // Phone validation
    const cleanPhone = phone.replace(/[\s+-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = language === 'fr' ? 'Veuillez renseigner un numéro de téléphone valide (min. 8 chiffres).' : 'Please enter a valid phone number (min. 8 digits).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = language === 'fr' ? 'Veuillez renseigner une adresse email professionnelle valide.' : 'Please enter a valid business email address.';
    }

    if (!description.trim() || description.length < 10) {
      errs.description = language === 'fr' ? 'Veuillez décrire brièvement votre besoin (au moins 10 caractères).' : 'Please briefly describe your needs (at least 10 characters).';
    }

    if (!consent) {
      errs.consent = language === 'fr' ? 'Vous devez accepter le traitement de vos données pour soumettre.' : 'You must accept data processing to submit.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      trackEvent('Consultation', 'form_validation_failed');
      return;
    }

    setStatus('loading');
    trackEvent('Consultation', 'form_submission_started', selectedService);

    setTimeout(() => {
      setStatus('submitted');
      trackEvent('Consultation', 'form_submitted_success', selectedService);
      const pillarTitle = currentPillars.find(p => p.id === selectedService)?.title || selectedService;
      onSubmittedLead?.({
        fullName,
        organization,
        email,
        phone,
        pillarTitle
      });
    }, 600);
  };

  const getWhatsAppMessage = () => {
    const serviceName = currentPillars.find(p => p.id === selectedService)?.title || selectedService;
    const msg = `*${language === 'fr' ? 'Prise de Contact Directe - CABECS' : 'Direct Contact - CABECS'}*\n` +
      `• *${language === 'fr' ? 'Nom' : 'Name'}*: ${fullName || (language === 'fr' ? 'Client' : 'Client')}\n` +
      `• *${language === 'fr' ? 'Organisation' : 'Organization'}*: ${organization || (language === 'fr' ? 'Non spécifiée' : 'Unspecified')} (${role || (language === 'fr' ? 'Responsable' : 'Manager')})\n` +
      `• *${language === 'fr' ? 'Localisation' : 'Location'}*: ${location}\n` +
      `• *${language === 'fr' ? 'Pôle concerné' : 'Selected Pillar'}*: ${serviceName}\n` +
      `• *${language === 'fr' ? 'Téléphone' : 'Phone'}*: ${phone || (language === 'fr' ? 'À préciser' : 'TBD')}\n` +
      `• *Email*: ${email || (language === 'fr' ? 'À préciser' : 'TBD')}\n` +
      `• *Budget*: ${budgetRange}\n` +
      (description ? `• *Description*: ${description}` : '');
    return companyInfo.whatsappDirectUrl(msg);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0066B3] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact Coordinates & Map preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Direct Coordinates Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
                <div className="bg-white/95 p-2 rounded-xl border border-white/20 shadow-xs shrink-0">
                  <img
                    src="/cabec-symbol.png"
                    alt="Emblème officiel de Cabinet Belkal Consulting SARLU"
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    {t('contact.headquarters')}
                  </span>
                  <h3 className="font-['Outfit',sans-serif] text-lg sm:text-xl font-bold text-white mt-0.5">
                    {companyInfo.legalName}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {t('contact.tagline')}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">{t('contact.physicalAddress')}</div>
                    <div className="text-white font-medium">{companyInfo.address}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{language === 'fr' ? 'Axe lourd Douala-Yaoundé, Littoral' : 'Douala-Yaoundé Highway, Littoral Region'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">{t('contact.directLines')}</div>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <a href={`tel:${companyInfo.phone1Raw}`} className="text-white hover:text-sky-300 font-medium">
                        {companyInfo.phone1} ({t('contact.primaryPhone')})
                      </a>
                      <a href={`tel:${companyInfo.phone2Raw}`} className="text-slate-300 hover:text-sky-300 font-medium">
                        {companyInfo.phone2} ({t('contact.supportPhone')})
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">{t('contact.officialEmail')}</div>
                    <a href={`mailto:${companyInfo.email}`} className="text-white hover:text-sky-300 font-medium">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">{t('contact.openingHours')}</div>
                    <div className="text-slate-200">{companyInfo.workingHours}</div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <div className="pt-4 border-t border-slate-800">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={companyInfo.whatsappDirectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('contact.startWhatsApp')}</span>
                </motion.a>
              </div>
            </div>

            {/* Simulated Interactive Map & Route Guidance Card */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Navigation className="w-4 h-4 text-[#0066B3]" />
                  <span>{t('contact.gpsMap')}</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 font-semibold px-2 py-0.5 rounded">
                  {language === 'fr' ? 'Douala Est' : 'East Douala'}
                </span>
              </div>

              {/* Map representation */}
              <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#0066b315_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual road & pin simulation */}
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#0066B3] text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
                    CABECS • Yassa, Douala
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'fr' ? 'Proximité échangeur Yassa & Hôpital Général' : 'Near Yassa Interchange & General Hospital'}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                {language === 'fr' 
                  ? "Accessible via le boulevard urbain est et l'axe Douala-Edéa. Parking sécurisé sur place pour nos clients institutionnels."
                  : "Accessible via East Urban Boulevard and the Douala-Edéa corridor. Secure on-site parking for corporate and institutional clients."}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Full Official Consultation & Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              
              <AnimatePresence mode="wait">
                {status === 'submitted' ? (
                  <motion.div 
                    key="submitted-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-[#4F8B50] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-2xl font-bold text-slate-900">
                      {t('contact.msgTransmitted')}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      {language === 'fr' 
                        ? `Merci ${fullName}. Votre demande de consultation a été reçue par le secrétariat de CABECS. Un consultant prendra contact sous 24h ouvrées.`
                        : `Thank you ${fullName}. Your consultation request has been received by CABECS. A consultant will contact you within 24 business hours.`}
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={getWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{t('contact.confirmWhatsApp')}</span>
                      </motion.a>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 cursor-pointer"
                      >
                        {t('contact.sendAnother')}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="idle-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
                    <div className="border-b border-slate-200 pb-3 mb-2">
                      <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                        {t('contact.formTitle')}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {t('contact.formSub')}
                      </p>
                      {Object.keys(errors).length > 0 && (
                        <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                          <span>{language === 'fr' ? 'Veuillez corriger les champs marqués en rouge ci-dessous.' : 'Please correct the fields highlighted in red below.'}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-fullname" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.nameLabel')} *
                        </label>
                        <input
                          id="contact-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                          }}
                          placeholder="Ex: Mireille Ngono"
                          className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.fullName ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-org" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.orgLabel')} *
                        </label>
                        <input
                          id="contact-org"
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => {
                            setOrganization(e.target.value);
                            if (errors.organization) setErrors(prev => ({ ...prev, organization: '' }));
                          }}
                          placeholder={language === 'fr' ? "Ex: Société Industrielle du Littoral" : "Ex: Littoral Industrial Co."}
                          className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.organization ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.organization && <p className="text-[11px] text-rose-600 mt-1">{errors.organization}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-role" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.roleLabel')}
                        </label>
                        <input
                          id="contact-role"
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder={language === 'fr' ? "Ex: Directeur Général / DSI / DRH" : "Ex: Managing Director / CIO / HRD"}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-loc" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.locLabel')} *
                        </label>
                        <input
                          id="contact-loc"
                          type="text"
                          required
                          value={location}
                          onChange={(e) => {
                            setLocation(e.target.value);
                            if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                          }}
                          placeholder={language === 'fr' ? "Ex: Douala, Cameroun" : "Ex: Douala, Cameroon"}
                          className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.location ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.location && <p className="text-[11px] text-rose-600 mt-1">{errors.location}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.phoneLabel')} *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                          }}
                          placeholder="+237 6XX XX XX XX"
                          className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.phone ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.emailLabel')} *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                          }}
                          placeholder="direction@entreprise.cm"
                          className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.email ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.serviceLabel')} *
                        </label>
                        <select
                          id="contact-service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
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
                        <label htmlFor="contact-budget" className="block text-xs font-semibold text-slate-800 mb-1">
                          {t('contact.budgetLabel')}
                        </label>
                        <select
                          id="contact-budget"
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                        >
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-desc" className="block text-xs font-semibold text-slate-800 mb-1">
                        {t('contact.descLabel')} *
                      </label>
                      <textarea
                        id="contact-desc"
                        required
                        rows={3}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                        }}
                        placeholder={t('contact.descPlaceholder')}
                        className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.description ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-[#0066B3]'
                        }`}
                      />
                      {errors.description && <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>}
                    </div>

                    {/* Mandatory explicit consent */}
                    <div className={`p-3.5 rounded-xl border transition-colors ${
                      errors.consent ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-snug">
                        <input
                          type="checkbox"
                          id="consentCheck"
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            if (errors.consent) setErrors(prev => ({ ...prev, consent: '' }));
                          }}
                          required
                          className="mt-0.5 text-[#0066B3] focus:ring-[#0066B3] rounded w-4 h-4 shrink-0 cursor-pointer"
                        />
                        <span>
                          {language === 'fr' ? (
                            <>
                              J'accepte que les informations saisies soient traitées par <strong>{companyInfo.legalName}</strong> dans le cadre exclusif de ma demande professionnelle, conformément à sa{' '}
                              <button
                                type="button"
                                onClick={() => onOpenLegal?.('privacy')}
                                className="underline text-[#0066B3] hover:text-[#005291] font-semibold cursor-pointer"
                              >
                                {t('diag.privacyLink')}
                              </button>
                              . Aucune commercialisation de données.
                            </>
                          ) : (
                            <>
                              I agree that the submitted information will be processed by <strong>{companyInfo.legalName}</strong> strictly for my business request, according to its{' '}
                              <button
                                type="button"
                                onClick={() => onOpenLegal?.('privacy')}
                                className="underline text-[#0066B3] hover:text-[#005291] font-semibold cursor-pointer"
                              >
                                {t('diag.privacyLink')}
                              </button>
                              . No commercial data resale.
                            </>
                          )}
                        </span>
                      </label>
                      {errors.consent && <p className="text-[11px] text-rose-600 mt-1.5 pl-6">{errors.consent}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={getWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-[#25D366]"
                        aria-label="Transmettre directement les détails de votre demande sur WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" aria-hidden="true" />
                        <span>{t('contact.sendAlsoWhatsApp')}</span>
                      </motion.a>

                      <motion.button
                        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all focus-visible:ring-2 focus-visible:ring-[#0066B3] ${
                          status === 'loading'
                            ? 'bg-slate-400 text-white cursor-wait'
                            : 'bg-[#0066B3] hover:bg-[#005291] text-white cursor-pointer'
                        }`}
                        aria-label="Envoyer la demande officielle de consultation"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{t('contact.transmitting')}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            <span>{t('contact.sendBtn')}</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
