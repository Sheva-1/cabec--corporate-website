import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  RefreshCw, 
  Cookie, 
  Building2, 
  Lock, 
  CheckCircle2, 
  ExternalLink,
  Printer
} from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'refund' | 'cookies' | 'mentions';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const { language, companyInfo, t } = useLanguage();
  const COMPANY_INFO = companyInfo;
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const tabs: { id: LegalTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'privacy', label: language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy', icon: Lock },
    { id: 'terms', label: language === 'fr' ? 'Conditions Générales (CGU/CGV)' : 'Terms of Service', icon: FileText },
    { id: 'refund', label: language === 'fr' ? 'Politique de Remboursement' : 'Refund Policy', icon: RefreshCw },
    { id: 'cookies', label: language === 'fr' ? 'Politique des Cookies' : 'Cookie Policy', icon: Cookie },
    { id: 'mentions', label: language === 'fr' ? 'Mentions Légales' : 'Legal Notice', icon: Building2 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.12 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0B1E33] text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/30 text-sky-400 border border-blue-500/30">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                    {language === 'fr' ? 'Cadre Juridique & Conformité Réglementaire' : 'Legal Framework & Regulatory Compliance'}
                  </div>
                  <h2 id="legal-modal-title" className="font-['Outfit',sans-serif] text-lg sm:text-xl font-bold text-white">
                    {language === 'fr' ? 'Documents Juridiques Officiels — CABECS' : 'Official Legal Documents — CABECS'}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
                  title={language === 'fr' ? "Imprimer ce document" : "Print this document"}
                  aria-label="Print legal document"
                >
                  <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{language === 'fr' ? 'Imprimer' : 'Print'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label={language === 'fr' ? "Fermer la fenêtre des documents légaux" : "Close legal documents modal"}
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-6 py-2 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-thin">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#0066B3] shadow-xs border border-slate-200 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0066B3]' : 'text-slate-500'}`} aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body Content (Scrollable) */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-slate-700 text-sm leading-relaxed space-y-6 focus:outline-none">
              
              {/* ========================================================================= */}
              {/* TAB 1: POLITIQUE DE CONFIDENTIALITÉ                                       */}
              {/* ========================================================================= */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-[#005291] text-xs font-bold uppercase mb-2">
                      Conforme à la Loi Camerounaise N° 2010/012 & Normes Internationales
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-slate-900">
                      Politique de Protection des Données à Caractère Personnel
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Dernière mise à jour : 10 septembre 2026 • Entrée en vigueur immédiate
                    </p>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      1. Identité du Responsable de Traitement
                    </h4>
                    <p>
                      Les données à caractère personnel collectées sur le présent site internet sont traitées par la société :
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div><strong>Dénomination :</strong> {COMPANY_INFO.legalName} ({COMPANY_INFO.brandName})</div>
                      <div><strong>Forme juridique :</strong> Société à Responsabilité Limitée Unipersonnelle (SARLU) régie par le droit camerounais et l'Acte Uniforme OHADA</div>
                      <div><strong>Siège social :</strong> {COMPANY_INFO.address}</div>
                      <div><strong>Registre du Commerce (RCCM) :</strong> {COMPANY_INFO.rccm}</div>
                      <div><strong>Numéro d'Identifiant Unique (NIU) :</strong> {COMPANY_INFO.taxId}</div>
                      <div><strong>Contact Délégué / Référent Données :</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0066B3] underline">{COMPANY_INFO.email}</a></div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      2. Principe de Minimisation & Données Collectées
                    </h4>
                    <p>
                      Conformément au principe de minimisation des données, <strong>CABECS collecte strictement les données professionnelles nécessaires</strong> à la qualification et au traitement de vos demandes d'intervention, de diagnostic ou d'évaluation de projet B2B :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
                      <li><strong>Identité civile et professionnelle :</strong> Nom, prénom, fonction ou rôle dans l'organisation.</li>
                      <li><strong>Coordonnées professionnelles :</strong> Adresse électronique professionnelle, numéro de téléphone / WhatsApp professionnel, localisation géographique (ville, pays).</li>
                      <li><strong>Données relatives au projet :</strong> Pôle d'intervention sollicité, description succincte du contexte, calendrier souhaité et fourchette budgétaire indicative.</li>
                    </ul>
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <strong>Engagement de non-collecte de données sensibles :</strong> CABECS ne sollicite ni ne traite aucune donnée bancaire en ligne, aucune donnée relative à la santé, aux origines ou aux opinions politiques ou religieuses.
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      3. Finalités et Bases Légales du Traitement
                    </h4>
                    <p>
                      Les traitements mis en œuvre répondent à des finalités professionnelles légitimes et transparentes :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <strong className="text-slate-900 font-semibold">Exécution de mesures précontractuelles</strong>
                        <p className="text-slate-600">Établissement d'estimations, devis, propositions techniques et cadrage méthodologique de vos projets.</p>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <strong className="text-slate-900 font-semibold">Consentement éclairé</strong>
                        <p className="text-slate-600">Réponse directe à vos sollicitations transmises via le formulaire officiel de contact ou le simulateur.</p>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <strong className="text-slate-900 font-semibold">Obligations légales et comptables</strong>
                        <p className="text-slate-600">Conservation des justificatifs contractuels selon le droit commercial OHADA applicable au Cameroun.</p>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <strong className="text-slate-900 font-semibold">Intérêt légitime de sécurité</strong>
                        <p className="text-slate-600">Prévention des fraudes, cyberattaques et abus de soumission de formulaires automatisés.</p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      4. Durée de Conservation des Données
                    </h4>
                    <p>
                      Vos données sont conservées pour une durée strictement proportionnée aux finalités poursuivies :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
                      <li><strong>Données de prospection / demandes de devis non concrétisées :</strong> 3 ans maximum à compter du dernier contact émanant de votre initiative.</li>
                      <li><strong>Dossiers clients et pièces comptables d'interventions :</strong> 10 ans conformément aux dispositions de l'Acte Uniforme OHADA relatif au droit commercial général.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      5. Non-Cession & Destinataires des Données
                    </h4>
                    <p>
                      <strong>CABECS ne commercialise, ne loue, ne cède et ne transfère jamais vos données personnelles à des tiers à des fins publicitaires.</strong> Les données sont exclusivement accessibles aux directeurs de mission et consultants internes de CABECS soumis à une stricte obligation de confidentialité.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      6. Vos Droits & Modalités d'Exercice
                    </h4>
                    <p>
                      En vertu de la législation camerounaise (Loi N° 2010/012) et des standards internationaux, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
                      <li><strong>Droit d'accès et d'information :</strong> Obtenir confirmation que des données vous concernant sont traitées.</li>
                      <li><strong>Droit de rectification :</strong> Mettre à jour des informations inexactes ou incomplètes.</li>
                      <li><strong>Droit à l'effacement :</strong> Demander la suppression définitive de vos données personnelles.</li>
                      <li><strong>Droit d'opposition et de retrait du consentement :</strong> Vous opposer à tout moment à la réception d'échanges de cadrage.</li>
                    </ul>
                    <p className="text-xs text-slate-600">
                      Pour exercer ces droits, adressez votre demande accompagnée d'une preuve de votre identité professionnelle à : <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0066B3] underline font-medium">{COMPANY_INFO.email}</a> ou par courrier postal à : <em>{COMPANY_INFO.legalName}, Yassa, Douala, Cameroun</em>.
                    </p>
                  </section>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 2: CONDITIONS GÉNÉRALES D'UTILISATION & PRESTATIONS                   */}
              {/* ========================================================================= */}
              {activeTab === 'terms' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-[#005291] text-xs font-bold uppercase mb-2">
                      Régies par le Droit Camerounais & l'Acte Uniforme OHADA
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-slate-900">
                      Conditions Générales d'Utilisation & de Prestations (CGU / CGV)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Applicables à toute consultation du site et aux relations contractuelles préliminaires
                    </p>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      1. Objet du Site et Caractère Informatif
                    </h4>
                    <p>
                      Le site officiel de <strong>{COMPANY_INFO.legalName} (CABECS)</strong> a pour objet exclusif de présenter l'offre d'accompagnement du cabinet dans ses 5 pôles d'excellence :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                      <li>Conseil en management et stratégie d'entreprise ;</li>
                      <li>Solutions digitales, ingénierie logicielle et intégration de flux ;</li>
                      <li>Gestion de projets et suivi-évaluation de programmes ;</li>
                      <li>Formations professionnelles certifiantes et renforcement des capacités ;</li>
                      <li>Conseil aux investisseurs et immobilier d'entreprise à Douala.</li>
                    </ul>
                    <p className="text-xs text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
                      <strong>Avertissement contractuel :</strong> Les simulations, estimations tarifaires ou fiches descriptives présentées sur le site constituent des informations d'ordre indicatif. Elles n'emportent aucun engagement synallagmatique avant la conclusion formelle d'un contrat de prestation ou devis validé, signé par les représentants habilités des parties.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      2. Propriété Intellectuelle & Droits d'Auteur
                    </h4>
                    <p>
                      L'ensemble des éléments constituant le présent site (marques, sigle commercial CABECS, logos, graphismes, textes descriptifs, méthodologies en 4 étapes, architecture visuelle, typographies et code source) est la propriété exclusive de {COMPANY_INFO.legalName} ou fait l'objet d'une licence régulière.
                    </p>
                    <p className="text-xs text-slate-600">
                      Toute reproduction, représentation, modification, publication ou adaptation totale ou partielle de ces éléments, quel que soit le moyen ou le procédé utilisé, est formellement interdite sans l'autorisation écrite préalable de {COMPANY_INFO.legalName}, sous peine de poursuites civiles et pénales au titre de la contrefaçon (conformément à l'Accord de Bangui révisé instituant l'OAPI).
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      3. Modalités d'Intervention & Obligation de Moyens
                    </h4>
                    <p>
                      Dans le cadre de ses prestations de conseil en stratégie, organisation et développement informatique, {COMPANY_INFO.legalName} s'engage à exécuter ses missions avec toute la diligence, l'expertise et les règles de l'art requises par la profession.
                    </p>
                    <p>
                      En matière de conseil et d'ingénierie intellectuelle, <strong>l'obligation de CABECS est une obligation de moyens renforcée</strong>, sauf stipulation contraire expresse contenue dans un cahier des charges validé précisant des livrables de résultat quantifiés.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      4. Limitation de Responsabilité
                    </h4>
                    <p>
                      CABECS met tout en œuvre pour assurer l'exactitude et la mise à jour régulière des informations publiées. Toutefois, le cabinet ne saurait être tenu responsable :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                      <li>Des interruptions de service temporaires liées à des opérations de maintenance ou à des défaillances des réseaux de télécommunication tiers ;</li>
                      <li>Des conséquences directes ou indirectes résultant d'une interprétation unilatérale erronée des informations d'ordre général figurant sur le site ;</li>
                      <li>Des cas de force majeure au sens de la jurisprudence OHADA (coupures généralisées de connectivité internet, sinistres climatiques, décisions administratives impératives).</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      5. Droit Applicable & Résolution des Différends
                    </h4>
                    <p>
                      Les présentes conditions sont régies et interprétées conformément au <strong>droit de la République du Cameroun</strong> et aux dispositions des <strong>Actes Uniformes de l'OHADA</strong>.
                    </p>
                    <p>
                      En cas de contestation relative à la validité, l'interprétation ou l'exécution des présentes conditions, les parties s'engagent à privilégier une conciliation amiable. À défaut d'accord amiable intervenu dans un délai de trente (30) jours ouvrés, le litige sera soumis à la <strong>compétence exclusive des tribunaux compétents de Douala (Cameroun)</strong>.
                    </p>
                  </section>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 3: POLITIQUE DE REMBOURSEMENT & CONDITIONS D'ANNULATION               */}
              {/* ========================================================================= */}
              {activeTab === 'refund' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-[#005291] text-xs font-bold uppercase mb-2">
                      Régime des Prestations Intellectuelles & B2B
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-slate-900">
                      Politique de Remboursement & Modalités d'Annulation
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Règles claires encadrant les phases d'études, d'ingénierie et de formation professionnelle
                    </p>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      1. Demandes Préalables & Diagnostic en Ligne
                    </h4>
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                      <strong>Gratuité absolue du cadrage initial :</strong> L'utilisation du simulateur de cadrage, l'envoi de formulaires de contact et le premier entretien d'orientation diagnostique avec un consultant de CABECS sont <strong>100% gratuits et sans engagement financier</strong>. Aucun débit ou facturation n'est opéré avant l'accord contractuel formel.
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      2. Missions de Conseil en Management & Ingénierie Logicielle
                    </h4>
                    <p>
                      Pour les missions régies par un contrat de prestation, les modalités d'annulation et de règlement s'articulent selon les jalons de réalisation convenus :
                    </p>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <strong className="text-slate-900 font-semibold">Acompte initial de démarrage :</strong>
                        <p className="text-slate-600 mt-0.5">
                          L'acompte versé à la signature rémunère l'affectation dédiée des experts, la revue documentaire et le cadrage méthodologique initial. En cas d'annulation notifiée par le client avant toute intervention terrain ou étude préparatoire, l'acompte est remboursé sous déduction d'un forfait administratif de 10% dans un délai de 30 jours calendaires.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <strong className="text-slate-900 font-semibold">Missions en cours d'exécution (par jalons validés) :</strong>
                        <p className="text-slate-600 mt-0.5">
                          Dès lors qu'une phase ou un jalon a débuté (ex: Jalon 1 - Diagnostic & Immersion), les honoraires correspondant aux livrables entamés ou remis restent définitivement acquis à CABECS au prorata du travail réalisé et ne sont pas remboursables. Les jalons ultérieurs non engagés sont immédiatement annulés sans pénalité pour le client.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <strong className="text-slate-900 font-semibold">Garantie de conformité des logiciels :</strong>
                        <p className="text-slate-600 mt-0.5">
                          Pour les applications et développements logiciels sur-mesure, CABECS accorde une période de garantie corrective de quatorze (14) jours ouvrés suivant la recette provisoire, durant laquelle toute non-conformité au cahier des charges validé fait l'objet d'une correction prioritaire sans surcoût.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      3. Formations Professionnelles (Académie CABECS)
                    </h4>
                    <p>
                      Pour les inscriptions aux sessions de formation inter ou intra-entreprises :
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                      <li><strong>Annulation notifiée plus de 10 jours ouvrés avant la session :</strong> Remboursement intégral des frais d'inscription ou report sans frais sur une session ultérieure.</li>
                      <li><strong>Annulation notifiée entre 5 et 10 jours ouvrés avant la session :</strong> Remboursement à hauteur de 50% ou report intégral sur une session ultérieure dans un délai de 6 mois.</li>
                      <li><strong>Annulation notifiée moins de 5 jours ouvrés ou absence le jour J :</strong> Les frais engagés restent acquis à titre d'indemnité de réservation de place, avec délivrance des supports pédagogiques complets.</li>
                      <li><strong>Annulation du fait de CABECS (cas de force majeure ou quorum insuffisant) :</strong> Proposition prioritaire de report ou remboursement intégral sous 15 jours calendaires.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      4. Modalités Pratiques de Demande de Remboursement
                    </h4>
                    <p className="text-xs text-slate-600">
                      Toute demande de remboursement ou d'exercice de clause de résiliation doit être formalisée par écrit par lettre recommandée avec accusé de réception ou par courriel avec accusé de lecture adressé à : <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0066B3] underline font-medium">{COMPANY_INFO.email}</a>, avec mention du numéro de contrat ou de facture de référence.
                    </p>
                  </section>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 4: POLITIQUE RELATIVE AUX COOKIES                                     */}
              {/* ========================================================================= */}
              {activeTab === 'cookies' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-[#005291] text-xs font-bold uppercase mb-2">
                      Transparence Numérique & Respect de la Vie Privée
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-slate-900">
                      Politique Relative aux Cookies & Traceurs
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Zéro traceur publicitaire invasif • Respect absolu de votre navigation
                    </p>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      1. Qu'est-ce qu'un Cookie ou Stockage Local ?
                    </h4>
                    <p>
                      Un cookie ou élément de stockage local (Local Storage) est un petit fichier texte ou valeur d'enregistrement déposé sur votre terminal lors de la consultation d'un service en ligne.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      2. Notre Engagement : Aucun Traceur Publicitaire Tiers
                    </h4>
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-emerald-900">
                        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
                        <span>Site Conçu Sans Pistage Publicitaire Cross-Site</span>
                      </div>
                      <p>
                        Le site officiel de CABECS n'intègre aucun pixel espion publicitaire (ex: pixel Meta/Facebook, pixel LinkedIn ou régies publicitaires tierces). Nous ne revendons aucune donnée de navigation.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      3. Typologie des Outils Utilisés sur ce Site
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                        <thead className="bg-slate-100 text-slate-900 font-bold">
                          <tr>
                            <th className="p-3 border-b border-slate-200">Nom de l'élément</th>
                            <th className="p-3 border-b border-slate-200">Finalité</th>
                            <th className="p-3 border-b border-slate-200">Durée</th>
                            <th className="p-3 border-b border-slate-200">Nécessité</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          <tr>
                            <td className="p-3 font-mono font-medium text-slate-900">cabec_cookie_consent</td>
                            <td className="p-3">Mémorise votre choix relatif à la présente bannière de consentement.</td>
                            <td className="p-3">6 mois</td>
                            <td className="p-3 text-emerald-700 font-semibold">Strictement Nécessaire</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono font-medium text-slate-900">cabec_pref_pillar</td>
                            <td className="p-3">Retient le dernier pôle sélectionné dans l'interface pour votre confort de navigation.</td>
                            <td className="p-3">Session</td>
                            <td className="p-3 text-slate-600">Fonctionnel</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      4. Gestion et Révocation de Vos Préférences
                    </h4>
                    <p>
                      Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies ou supprimer le stockage local de votre navigateur. Vous pouvez également réinitialiser vos préférences de consentement via le lien permanent disponible dans le pied de page du site.
                    </p>
                  </section>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 5: MENTIONS LÉGALES                                                   */}
              {/* ========================================================================= */}
              {activeTab === 'mentions' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-[#005291] text-xs font-bold uppercase mb-2">
                      Identification Officielle selon la Loi Camerounaise
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-slate-900">
                      Mentions Légales Obligatoires
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Publication conforme aux exigences de transparence commerciale et numérique
                    </p>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      1. Éditeur de la Plateforme
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5">
                      <div><strong>Raison sociale :</strong> {COMPANY_INFO.legalName}</div>
                      <div><strong>Sigle & Nom d'usage :</strong> {COMPANY_INFO.brandName}</div>
                      <div><strong>Forme sociale :</strong> Société à Responsabilité Limitée Unipersonnelle (SARLU)</div>
                      <div><strong>Siège social :</strong> {COMPANY_INFO.address} (Axe Lourd Douala-Yaoundé)</div>
                      <div><strong>Registre du Commerce et du Crédit Mobilier (RCCM) :</strong> {COMPANY_INFO.rccm} (Greffe du Tribunal de Première Instance de Douala)</div>
                      <div><strong>Numéro d'Identifiant Unique (NIU / Tax ID) :</strong> {COMPANY_INFO.taxId}</div>
                      <div><strong>Directeur de la publication :</strong> Direction Générale de CABINET BELKAL CONSULTING SARLU</div>
                      <div><strong>Courriel officiel :</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0066B3] underline font-medium">{COMPANY_INFO.email}</a></div>
                      <div><strong>Téléphones professionnels :</strong> {COMPANY_INFO.phone1} / {COMPANY_INFO.phone2}</div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      2. Hébergement de l'Application
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1">
                      <div><strong>Prestataire d'hébergement :</strong> Google Cloud Platform (Google LLC)</div>
                      <div><strong>Infrastructure :</strong> Environnement d'exécution Cloud sécurisé avec protocoles TLS/HTTPS obligatoires et pare-feu d'isolation d'applications.</div>
                      <div><strong>Adresse de l'hébergeur :</strong> 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                      3. Réglementation Professionnelle & Droit Applicable
                    </h4>
                    <p>
                      {COMPANY_INFO.legalName} exerce son activité en stricte conformité avec le droit des affaires de la République du Cameroun et les Actes Uniformes de l'OHADA.
                    </p>
                    <p className="text-xs text-slate-600">
                      Tout litige relatif à l'existence, la validité ou l'exécution des présentes mentions légales relève de la juridiction exclusive des tribunaux civils et commerciaux de Douala (Littoral, Cameroun).
                    </p>
                  </section>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                {language === 'fr' ? (
                  <>Document opposable émis par <strong>{companyInfo.legalName}</strong> • Douala, Cameroun.</>
                ) : (
                  <>Legally binding document issued by <strong>{companyInfo.legalName}</strong> • Douala, Cameroon.</>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>{language === 'fr' ? 'Fermer cette fenêtre' : 'Close window'}</span>
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
