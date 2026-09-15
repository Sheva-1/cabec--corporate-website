import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, MessageSquare, Phone, ArrowLeft, Download, ShieldCheck, Clock, FileText } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ThankYouPageProps {
  leadDetails?: {
    fullName?: string;
    organization?: string;
    email?: string;
    phone?: string;
    pillarTitle?: string;
    referenceCode?: string;
  };
  onNavigateHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  leadDetails,
  onNavigateHome,
}) => {
  const { language, companyInfo } = useLanguage();
  const refCode = leadDetails?.referenceCode || `CABECS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    trackEvent('Consultation', 'print_thank_you_receipt', refCode);
    window.print();
  };

  const whatsAppMsg = language === 'fr'
    ? `*Suivi Demande CABECS (${refCode})*\n` +
      `• *Nom*: ${leadDetails?.fullName || 'Client'}\n` +
      `• *Structure*: ${leadDetails?.organization || 'Partenaire'}\n` +
      (leadDetails?.pillarTitle ? `• *Pôle*: ${leadDetails.pillarTitle}\n` : '') +
      `• *Ref*: ${refCode}\n` +
      `Je souhaite échanger directement avec un consultant.`
    : `*CABECS Request Follow-up (${refCode})*\n` +
      `• *Name*: ${leadDetails?.fullName || 'Client'}\n` +
      `• *Organization*: ${leadDetails?.organization || 'Partner'}\n` +
      (leadDetails?.pillarTitle ? `• *Pillar*: ${leadDetails.pillarTitle}\n` : '') +
      `• *Ref*: ${refCode}\n` +
      `I would like to discuss directly with a consultant.`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <button
          onClick={onNavigateHome}
          className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066B3] rounded-xl"
          aria-label={language === 'fr' ? "Retour au site CABECS" : "Back to CABECS website"}
        >
          <Logo size="md" variant="full" />
        </button>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0066B3] bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'fr' ? "Retour à l'accueil" : "Back to home"}</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto w-full my-auto py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 space-y-8"
        >
          {/* Top Success Badge */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-[#4F8B50] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              <FileText className="w-3.5 h-3.5 text-[#0066B3]" />
              <span>{language === 'fr' ? `RÉFÉRENCE DOSSIER : ${refCode}` : `FILE REFERENCE: ${refCode}`}</span>
            </div>

            <h1 className="font-['Outfit',sans-serif] text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'fr' ? "Demande Prise en Compte avec Succès" : "Request Successfully Received"}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              {language === 'fr' ? (
                <>Merci, <strong className="text-slate-900">{leadDetails?.fullName || 'Cher Partenaire'}</strong>. Votre dossier pour le compte de <strong className="text-slate-900">{leadDetails?.organization || 'votre organisation'}</strong> a été transmis directement au pôle d'ingénierie CABECS à Yassa, Douala.</>
              ) : (
                <>Thank you, <strong className="text-slate-900">{leadDetails?.fullName || 'Valued Partner'}</strong>. Your file on behalf of <strong className="text-slate-900">{leadDetails?.organization || 'your organization'}</strong> has been submitted directly to CABECS consulting teams in Yassa, Douala.</>
              )}
            </p>
          </div>

          {/* 3 Step Commitment Process */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0066B3] flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{language === 'fr' ? "Protocole d'Intervention & Délais Contractuels" : "Intervention Protocol & SLA Commitments"}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-[#0066B3]">{language === 'fr' ? "1. Analyse Préalable" : "1. Preliminary Scoping"}</span>
                <p className="text-xs text-slate-600">{language === 'fr' ? "Qualification confidentielle des objectifs et cadrage technique sous 24h ouvrées." : "Confidential qualification of objectives and technical scope within 24 business hours."}</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-[#4F8B50]">{language === 'fr' ? "2. Échange Visio ou Yassa" : "2. Video or In-Person Meeting"}</span>
                <p className="text-xs text-slate-600">{language === 'fr' ? "Entretien avec nos directeurs de mission pour valider le périmètre et les livrables." : "Consultation with mission directors to define scope boundaries and deliverables."}</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">{language === 'fr' ? "3. Devis & Fiche Projet" : "3. Quotation & Scope Spec"}</span>
                <p className="text-xs text-slate-600">{language === 'fr' ? "Transmission de la proposition méthodologique chiffrée en FCFA (conforme OHADA)." : "Delivery of costed methodological proposal in XAF / EUR (OHADA compliant)."}</p>
              </div>
            </div>
          </div>

          {/* Contact coordinates summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs text-slate-700 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066B3] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{language === 'fr' ? "Engagement de Confidentialité Absolue" : "Strict Non-Disclosure Commitment"}</div>
                <div className="text-slate-600">{language === 'fr' ? "Vos documents et données métier sont protégés par le secret professionnel CABECS." : "All proprietary records and data are guarded under CABECS confidentiality covenants."}</div>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#0066B3]" />
              <span>{language === 'fr' ? "Imprimer le reçu" : "Print receipt"}</span>
            </button>
          </div>

          {/* Action Hand-offs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={companyInfo.whatsappDirectUrl(whatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('WhatsApp', 'thank_you_whatsapp_direct', refCode)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-transform hover:scale-102"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'fr' ? "Échanger immédiatement sur WhatsApp" : "Chat on WhatsApp now"}</span>
            </a>

            <a
              href={`tel:${companyInfo.phone1Raw}`}
              onClick={() => trackEvent('CTA', 'thank_you_call_direct', refCode)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>{language === 'fr' ? `Ligne directe : ${companyInfo.phone1}` : `Direct phone: ${companyInfo.phone1}`}</span>
            </a>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-500 hover:text-[#0066B3] font-medium underline cursor-pointer"
            >
              {language === 'fr' ? "← Retourner au site officiel" : "← Return to official website"}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-1">
        <div>{companyInfo.legalName} • RCCM : {companyInfo.rccm} • NIU : {companyInfo.taxId}</div>
        <div>{language === 'fr' ? "Siège Social : Yassa, Douala, Littoral, Cameroun • info@cabecs.com" : "Headquarters: Yassa, Douala, Littoral, Cameroon • info@cabecs.com"}</div>
      </footer>
    </div>
  );
};
