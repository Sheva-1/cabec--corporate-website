import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { LegalTab } from './LegalModal';
import { 
  ShieldCheck, 
  FileText, 
  RefreshCw, 
  Cookie, 
  Building2, 
  Printer, 
  ArrowLeft,
  Lock,
  Phone,
  MessageSquare
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface LegalPageViewProps {
  initialTab?: LegalTab;
  onNavigateHome: () => void;
  onOpenConsultation?: () => void;
}

export const LegalPageView: React.FC<LegalPageViewProps> = ({
  initialTab = 'terms',
  onNavigateHome,
  onOpenConsultation
}) => {
  const { language, companyInfo } = useLanguage();
  const COMPANY_INFO = companyInfo;
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  const tabs = [
    { id: 'terms' as LegalTab, label: language === 'fr' ? 'Conditions Générales (CGV/CGP)' : 'Terms of Service (ToS)', icon: FileText },
    { id: 'privacy' as LegalTab, label: language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy', icon: ShieldCheck },
    { id: 'refund' as LegalTab, label: language === 'fr' ? 'Garanties & Remboursement' : 'Warranties & Refunds', icon: RefreshCw },
    { id: 'cookies' as LegalTab, label: language === 'fr' ? 'Gestion des Cookies' : 'Cookie Policy', icon: Cookie },
    { id: 'mentions' as LegalTab, label: language === 'fr' ? 'Mentions Légales' : 'Legal Notices & Corporate Info', icon: Building2 },
  ];

  const handlePrint = () => {
    trackEvent('Legal', 'print_legal_page', activeTab);
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <button
          onClick={onNavigateHome}
          className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066B3] rounded-xl"
          aria-label={language === 'fr' ? "Retour au site CABECS" : "Back to CABECS website"}
        >
          <Logo size="md" variant="full" />
        </button>
        <div className="flex items-center gap-3">
          <LanguageSelector variant="navbar" />
          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 text-[#0066B3]" />
            <span>{language === 'fr' ? "Imprimer" : "Print"}</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0066B3] bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'fr' ? "Retour à l'accueil" : "Back to home"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto w-full my-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm sticky top-6 space-y-2">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066B3]">
              {language === 'fr' ? "Cadre Juridique & Conformité" : "Legal Framework & Compliance"}
            </span>
            <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900 mt-0.5">
              {language === 'fr' ? "Documents Officiels CABECS" : "CABECS Official Documents"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'fr' 
                ? "Régis par l'Acte Uniforme OHADA et la législation camerounaise en vigueur." 
                : "Governed under OHADA Uniform Acts and current Cameroonian corporate legislation."}
            </p>
          </div>

          <nav className="space-y-1 pt-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    trackEvent('Legal', 'switch_tab', tab.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#0066B3] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
            <div className="text-xs font-semibold text-slate-700">
              {language === 'fr' ? "Besoin d'un éclaircissement ?" : "Need clarification?"}
            </div>
            <a
              href={companyInfo.whatsappDirectUrl(
                language === 'fr'
                  ? "Bonjour Me/Consultant CABECS, j'ai une question juridique sur vos contrats de prestation."
                  : "Hello CABECS legal consultant, I have a question regarding your contractual terms."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-2.5 rounded-xl shadow-2xs transition-transform"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'fr' ? "Support Juridique WhatsApp" : "Legal WhatsApp Support"}</span>
            </a>
          </div>
        </aside>

        {/* Right Content Area */}
        <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* TAB 1: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066B3]">Droit Commercial OHADA</span>
                <h1 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Conditions Générales de Vente et de Prestations de Services (CGV / CGP)
                </h1>
                <p className="text-xs text-slate-500 mt-1">Date d'effet : 10 Janvier 2026 | Réf: CGP-CABECS-2026-V1</p>
              </div>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">Article 1 : Champ d'Application & Opposabilité</h2>
                <p>
                  Les présentes Conditions Générales de Vente et de Prestations de Services s'appliquent de plein droit à l'ensemble des missions conclues par <strong>CABINET BELKAL CONSULTING SARLU</strong> (dénommé commercialement « CABECS »), immatriculé au RCCM de Douala sous le N° <strong>{COMPANY_INFO.rccm}</strong> et titulaire du Numéro d'Identifiant Unique (NIU) <strong>{COMPANY_INFO.taxId}</strong>.
                </p>
                <p>
                  Elles régissent les prestations de conseil en management, développement logiciel et solutions numériques, gestion et suivi-évaluation de projets, formations professionnelles et conseil en investissement immobilier d'entreprise.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">Article 2 : Devis, Cadrage & Formation du Contrat</h2>
                <p>
                  Chaque engagement fait l'objet d'une proposition technique et financière (devis ou contrat de mission) détaillant le périmètre d'intervention, les livrables attendus, le calendrier d'exécution et le coût des prestations.
                </p>
                <p>
                  Le contrat est réputé définitivement conclu dès réception par CABECS du devis ou de la convention dûment revêtu de la signature du représentant légal du Client, accompagné de la mention manuscrite « Bon pour accord » et du versement de l'acompte conventionnel d'usage (généralement 40% à la commande).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">Article 3 : Modalités Financières & Règlement</h2>
                <p>
                  Les prix sont libellés en Francs CFA (XAF) et s'entendent hors taxes ou toutes taxes comprises selon le régime d'assujettissement fiscal applicable. Les factures sont payables par virement bancaire sur le compte corporate de CABECS, par chèque de banque certifié ou par moyen de paiement électronique agréé CEMAC.
                </p>
                <p>
                  Tout retard de règlement entraîne de plein droit l'exigibilité d'intérêts moratoires calculés au taux légal en vigueur, sans qu'un rappel ou une mise en demeure préalable ne soit requis, conformément aux dispositions de l'Acte Uniforme OHADA portant Droit Commercial Général.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">Article 4 : Propriété Intellectuelle & Souveraineté du Client</h2>
                <p>
                  CABECS garantit à ses clients la pleine jouissance et la propriété exclusive des livrables finaux expressément conçus pour leur compte (rapports stratégiques, architectures applicatives, codes sources personnalisés, plans d'ingénierie), sous réserve de l'acquittement intégral des factures afférentes.
                </p>
                <p>
                  CABECS conserve la propriété de ses méthodologies propriétaires antérieures, gabarits, bibliothèques logicielles réutilisables et savoir-faire générique.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">Article 5 : Droit Applicable & Juridiction Compétente</h2>
                <p>
                  Les présentes CGV sont soumises au droit matériel de la République du Cameroun et aux Actes Uniformes du Traité OHADA. En cas de différend relatif à la validité, l'interprétation ou l'exécution du contrat, les parties s'engagent à privilégier une conciliation amiable préalable sous 30 jours calendaires. À défaut d'accord, attribution expresse de juridiction est faite aux <strong>Tribunaux compétents du ressort de Douala</strong>.
                </p>
              </section>
            </motion.div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F8B50]">Protection des Données Personnelles</span>
                <h1 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Politique de Confidentialité & Traitement des Données
                </h1>
                <p className="text-xs text-slate-500 mt-1">Conforme à la Loi camerounaise N° 2010/012 relative à la cybersécurité et à la cybercriminalité</p>
              </div>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">1. Responsable du Traitement</h2>
                <p>
                  Le responsable de la collecte et du traitement des données à caractère personnel est la société <strong>CABINET BELKAL CONSULTING SARLU</strong>, sise à Yassa, Douala, Cameroun. Pour toute requête relative à vos données : <strong>info@cabecs.com</strong>.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">2. Finalité des Données Collectées</h2>
                <p>
                  Les informations recueillies via nos formulaires de contact, simulateur de diagnostic et demandes de devis (nom, fonction, dénomination sociale, téléphone professionnel, adresse électronique) sont strictement réservées aux fins suivantes :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Établissement des diagnostics et propositions commerciales personnalisées.</li>
                  <li>Exécution des obligations contractuelles, comptables et administratives de CABECS.</li>
                  <li>Suivi de la relation client et échanges relatifs aux jalons de projets.</li>
                </ul>
                <p className="font-semibold text-slate-800">
                  CABECS applique une politique stricte de non-commercialisation : aucune donnée n'est cédée, louée ou transmise à des tiers à des fins publicitaires.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">3. Durée de Conservation & Sécurité</h2>
                <p>
                  Les données de prospection non converties sont conservées pendant une durée maximale de 24 mois. Les données relatives aux contrats conclus sont archivées pendant la durée légale requise par le droit comptable OHADA (10 ans).
                </p>
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles rigoureuses (chiffrement SSL/TLS, restriction d'accès aux seuls collaborateurs habilités) pour prévenir tout accès non autorisé ou altération de vos données.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">4. Vos Droits d'Accès, Rectification & Suppression</h2>
                <p>
                  Conformément à la réglementation, vous disposez d'un droit d'accès permanent, de rectification, de mise à jour et d'effacement de vos données personnelles. Vous pouvez exercer ce droit à tout instant en adressant un e-mail à <strong>info@cabecs.com</strong> ou par courrier au siège social à Yassa, Douala.
                </p>
              </section>
            </motion.div>
          )}

          {/* TAB 3: REFUND & GUARANTEES */}
          {activeTab === 'refund' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066B3]">Assurance Qualité & Engagements</span>
                <h1 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Politique de Garantie, Recette & Modalités de Remboursement
                </h1>
                <p className="text-xs text-slate-500 mt-1">Garantie contractuelle de conformité des livrables</p>
              </div>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">1. Nature B2B & Prestations Intellectuelles</h2>
                <p>
                  Les prestations fournies par CABECS constituent des prestations de services intellectuels, de conseil stratégique et de développement technologique sur mesure à destination exclusive de professionnels et d'organisations. À ce titre, le droit légal de rétractation réservé aux consommateurs particuliers ne s'applique pas.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">2. Garantie de Conformité & Période de Recette</h2>
                <p>
                  Chaque jalon ou livraison d'application fait l'objet d'une période de recette contradictoire de 14 jours calendaires. Durant ce délai, le Client peut notifier toute non-conformité par rapport au cahier des charges validé. CABECS s'engage à corriger toute anomalie constatée sans frais additionnels dans les plus brefs délais.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">3. Modalités d'Interruption & Indemnisation</h2>
                <p>
                  En cas d'interruption unilatérale d'une mission à l'initiative du Client, les travaux déjà réalisés et les dépenses engagées par CABECS restent intégralement dus. Dans l'éventualité où CABECS serait dans l'incapacité majeure et avérée d'exécuter un jalon contractuel convenu, les sommes perçues au titre du jalon non délivré seront remboursées sous 30 jours ouvrés.
                </p>
              </section>
            </motion.div>
          )}

          {/* TAB 4: COOKIES POLICY */}
          {activeTab === 'cookies' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Transparence & Vie Privée</span>
                <h1 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Politique Relative aux Cookies & Témoins de Connexion
                </h1>
                <p className="text-xs text-slate-500 mt-1">Architecture respectueuse de la vie privée — Zéro pistage intrusif</p>
              </div>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">1. Approche Zéro Traçage Publicitaire</h2>
                <p>
                  Le site institutionnel de CABECS ne dépose aucun cookie publicitaire tiers, pixel de reciblage ou traceur intrusif. Nous n'exploitons aucun profilage commercial de vos comportements de navigation.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">2. Cookies Techniques Strictement Nécessaires</h2>
                <p>
                  Seuls les témoins techniques essentiels au fonctionnement de la session (mémorisation de vos choix de consentement, maintien de vos sélections dans le simulateur de projet) sont conservés temporairement dans le stockage local de votre navigateur.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">3. Contrôle & Suppression</h2>
                <p>
                  Vous pouvez à tout moment configurer votre navigateur Internet pour bloquer ou supprimer ces cookies techniques. Vous pouvez également réinitialiser vos préférences via notre bannière de gestion située en bas de page.
                </p>
              </section>
            </motion.div>
          )}

          {/* TAB 5: LEGAL MENTIONS */}
          {activeTab === 'mentions' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066B3]">Identification Légale & Réglementaire</span>
                <h1 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Mentions Légales & Renseignements d'Immatriculation
                </h1>
                <p className="text-xs text-slate-500 mt-1">République du Cameroun • Région du Littoral</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[11px]">Raison Sociale</span>
                    <strong className="text-slate-900">{COMPANY_INFO.legalName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[11px]">Forme Juridique</span>
                    <span className="text-slate-900 font-medium">SARL Unipersonnelle (SARLU)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[11px]">Registre du Commerce (RCCM)</span>
                    <strong className="text-[#0066B3] font-mono">{COMPANY_INFO.rccm}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[11px]">N° Identifiant Unique (NIU)</span>
                    <strong className="text-slate-900 font-mono">{COMPANY_INFO.taxId}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 font-bold block uppercase text-[11px]">Siège Social & Bureaux</span>
                    <span className="text-slate-900 font-medium">{COMPANY_INFO.address}, Littoral, Cameroun</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[11px]">Lignes Téléphoniques</span>
                    <span className="text-slate-900 font-medium">{COMPANY_INFO.phone1} / {COMPANY_INFO.phone2}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[11px]">Courrier Électronique</span>
                    <span className="text-[#0066B3] font-medium">{COMPANY_INFO.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </article>
      </main>

      {/* Footer info */}
      <footer className="max-w-6xl mx-auto w-full text-center pt-8 border-t border-slate-200 text-xs text-slate-500">
        <p>{COMPANY_INFO.legalName} • Douala Yassa • Tous droits réservés.</p>
      </footer>
    </div>
  );
};
