import React, { useState } from 'react';
import { COMPANY_INFO, SERVICE_PILLARS } from '../data/cabecData';
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
  RefreshCw
} from 'lucide-react';

export const InteractiveDiagnostic: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [organizationType, setOrganizationType] = useState<string>('PME en croissance');
  const [selectedPillar, setSelectedPillar] = useState<string>('solutions-digitales');
  const [timeframe, setTimeframe] = useState<string>('Urgent (< 1 mois)');
  
  // Step 3 fields
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const organizationTypes = [
    { label: 'PME / Entreprise locale', icon: Building, desc: 'Optimisation de la gestion, logiciel & développement' },
    { label: 'Grande Entreprise / Filiale', icon: Briefcase, desc: 'Transformation digitale, audit & formation des cadres' },
    { label: 'Administration ou ONG', icon: ShieldCheck, desc: 'Suivi-évaluation de projets, conformité & gouvernance' },
    { label: 'Investisseur / Diaspora', icon: Clock, desc: 'Opportunités immobilières & vérification de titres fonciers' },
  ];

  const timeframes = [
    'Immédiat / Urgent (< 1 mois)',
    'Court terme (1 à 3 mois)',
    'Moyen terme (3 à 6 mois)',
    'Étude prospective / Audit préalable'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppSummaryMessage = () => {
    const pillarName = SERVICE_PILLARS.find(p => p.id === selectedPillar)?.title || selectedPillar;
    const msg = `*Demande de Diagnostic CABEC*\n` +
      `• *Nom*: ${fullName || 'Client'}\n` +
      `• *Structure*: ${organization || 'Non précisée'} (${organizationType})\n` +
      `• *Pôle sollicité*: ${pillarName}\n` +
      `• *Délai souhaité*: ${timeframe}\n` +
      `• *Contact*: ${phone || 'À préciser'} | ${email || 'À préciser'}\n` +
      (description ? `• *Besoin*: ${description}` : '');
    return COMPANY_INFO.whatsappDirectUrl(msg);
  };

  return (
    <section id="diagnostic" className="py-16 md:py-24 bg-[#F5F8FA] border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#4F8B50] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulateur & Diagnostic de Cadrage</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-extrabold text-slate-900">
            Cadrez Votre Projet en 3 Minutes
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Précisez vos besoins pour recevoir une pré-évaluation méthodologique et un contact personnalisé par nos experts à Douala.
          </p>
        </div>

        {/* Diagnostic Wizard Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Wizard Progress Steps Bar */}
          <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#0066B3] text-white' : 'bg-slate-800 text-slate-400'}`}>
                1
              </span>
              <span className={step === 1 ? 'text-white font-bold' : 'text-slate-400 hidden sm:inline'}>
                Profil & Contexte
              </span>
              <span className="text-slate-600">→</span>

              <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#0066B3] text-white' : 'bg-slate-800 text-slate-400'}`}>
                2
              </span>
              <span className={step === 2 ? 'text-white font-bold' : 'text-slate-400 hidden sm:inline'}>
                Pôle & Calendrier
              </span>
              <span className="text-slate-600">→</span>

              <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#0066B3] text-white' : 'bg-slate-800 text-slate-400'}`}>
                3
              </span>
              <span className={step === 3 ? 'text-white font-bold' : 'text-slate-400 hidden sm:inline'}>
                Validation & Envoi
              </span>
            </div>

            <span className="text-xs text-slate-400 font-medium hidden md:block">
              Étape {step} sur 3
            </span>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {!submitted ? (
              <div>
                {/* Step 1: Organization Profile */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 mb-1">
                        1. Quel est votre profil institutionnel ?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Sélectionnez la catégorie qui décrit le mieux votre organisation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {organizationTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = organizationType === type.label;
                        return (
                          <div
                            key={type.label}
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
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                      >
                        <span>Continuer vers le besoin</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Pillar & Timeframe */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 mb-1">
                        2. Quel pôle d'expertise souhaitez-vous mobiliser ?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Vous pourrez combiner plusieurs services lors des échanges avec nos consultants.
                      </p>
                    </div>

                    {/* Pillar Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_PILLARS.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedPillar(p.id)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPillar === p.id
                              ? 'border-[#0066B3] bg-blue-50/60 font-semibold'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-sm font-bold text-slate-800">{p.title}</div>
                          <div className="text-xs text-slate-500 mt-1 line-clamp-1">{p.subtitle}</div>
                        </div>
                      ))}
                    </div>

                    {/* Timeframe Selection */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Horizon souhaité de démarrage
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {timeframes.map((tf) => (
                          <label
                            key={tf}
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
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2"
                      >
                        ← Retour
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                      >
                        <span>Dernière étape</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact & Send */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 mb-1">
                        3. Vos coordonnées pour la restitution du cadrage
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Nos directeurs de mission vous répondront sous 24 heures ouvrées.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ex: Jean-Paul Mba"
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Organisation / Entreprise *
                        </label>
                        <input
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="Ex: Société Camerounaise de..."
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Numéro WhatsApp / Téléphone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+237 6XX XX XX XX"
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Adresse E-mail professionnelle *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contact@votre-entreprise.cm"
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Description succincte du projet ou des enjeux
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Précisez brièvement vos objectifs, défis actuels ou délais envisagés..."
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      />
                    </div>

                    {/* Recap Summary Box */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-semibold text-slate-800">Récapitulatif :</span> {organizationType} • {SERVICE_PILLARS.find(p => p.id === selectedPillar)?.title} • {timeframe}
                      </div>
                      <span className="text-emerald-700 font-medium">Confidentialité garantie</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2"
                      >
                        ← Retour
                      </button>

                      <div className="flex items-center gap-3">
                        {/* Dual Option: WhatsApp direct or Email Submission */}
                        <a
                          href={getWhatsAppSummaryMessage()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Transmettre via WhatsApp</span>
                        </a>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all"
                        >
                          <Send className="w-4 h-4" />
                          <span>Valider la demande</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Success Confirmation View */
              <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-[#4F8B50] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="font-['Outfit',sans-serif] text-2xl font-extrabold text-slate-900">
                  Demande de Cadrage Enregistrée
                </h3>

                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Merci, <strong className="text-slate-900">{fullName || 'Cher Partenaire'}</strong>. Votre demande pour le compte de <strong className="text-slate-900">{organization || 'votre organisation'}</strong> a été transmise à notre équipe de consultants à Yassa, Douala.
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-xs text-slate-600 text-left space-y-1">
                  <div><strong>Email de confirmation :</strong> {email || 'info@cabecs.com'}</div>
                  <div><strong>Téléphone de suivi :</strong> {phone || '+237 697 367 801'}</div>
                  <div><strong>Engagement CABEC :</strong> Retour sous 24h ouvrées avec fiche de cadrage.</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <a
                    href={getWhatsAppSummaryMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-3 rounded-xl text-sm shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Accélérer la réponse sur WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 p-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Nouveau diagnostic</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
