import React, { useState } from 'react';
import { COMPANY_INFO, SERVICE_PILLARS } from '../data/cabecData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  Navigation
} from 'lucide-react';

interface ContactAndMapSectionProps {
  preselectedPillar?: string;
}

export const ContactAndMapSection: React.FC<ContactAndMapSectionProps> = ({ preselectedPillar }) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Douala, Cameroun');
  const [selectedService, setSelectedService] = useState(preselectedPillar || 'conseil-strategie');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('À définir lors du cadrage');
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitted');
  };

  const getWhatsAppMessage = () => {
    const serviceName = SERVICE_PILLARS.find(p => p.id === selectedService)?.title || selectedService;
    const msg = `*Prise de Contact Directe - CABEC*\n` +
      `• *Nom*: ${fullName || 'Client'}\n` +
      `• *Organisation*: ${organization || 'Non spécifiée'} (${role || 'Responsable'})\n` +
      `• *Localisation*: ${location}\n` +
      `• *Pôle concerné*: ${serviceName}\n` +
      `• *Téléphone*: ${phone || 'À préciser'}\n` +
      `• *Email*: ${email || 'À préciser'}\n` +
      `• *Budget*: ${budgetRange}\n` +
      (description ? `• *Description*: ${description}` : '');
    return COMPANY_INFO.whatsappDirectUrl(msg);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066B3] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Échangeons sur Vos Enjeux</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Contactez le Cabinet Belkal Consulting
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Prenez rendez-vous dans nos bureaux à Yassa (Douala) ou planifiez une session de travail visio avec nos directeurs de mission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact Coordinates & Map preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Coordinates Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Siège Social & Bureaux
                </span>
                <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-white mt-1">
                  {COMPANY_INFO.legalName}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Marque commerciale : <strong className="text-white">CABEC</strong>
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">Adresse physique</div>
                    <div className="text-white font-medium">{COMPANY_INFO.address}</div>
                    <div className="text-slate-400 text-xs mt-0.5">Axe lourd Douala-Yaoundé, Littoral</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">Lignes directes</div>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <a href={`tel:${COMPANY_INFO.phone1Raw}`} className="text-white hover:text-sky-300 font-medium">
                        {COMPANY_INFO.phone1} (Principal)
                      </a>
                      <a href={`tel:${COMPANY_INFO.phone2Raw}`} className="text-slate-300 hover:text-sky-300 font-medium">
                        {COMPANY_INFO.phone2} (Support)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">E-mail officiel</div>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-sky-300 font-medium">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-[#38BDF8] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px] uppercase font-bold">Horaires d'ouverture</div>
                    <div className="text-slate-200">{COMPANY_INFO.workingHours}</div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={COMPANY_INFO.whatsappDirectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Démarrer un échange WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Simulated Interactive Map & Route Guidance Card */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Navigation className="w-4 h-4 text-[#0066B3]" />
                  <span>Localisation GPS & Accès</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 font-semibold px-2 py-0.5 rounded">
                  Douala Est
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
                    CABEC • Yassa, Douala
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Proximité échangeur Yassa & Hôpital Général
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                Accessible via le boulevard urbain est et l'axe Douala-Edéa. Parking sécurisé sur place pour nos clients institutionnels.
              </div>
            </div>

          </div>

          {/* Right Column: Full Official Consultation & Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              
              {!status ? null : status === 'submitted' ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-[#4F8B50] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-['Outfit',sans-serif] text-2xl font-bold text-slate-900">
                    Message et Demande Transmis !
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Merci {fullName}. Votre demande de consultation a été reçue par le secrétariat de CABEC. Un consultant prendra contact sous 24h ouvrées.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirmer immédiatement sur WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 py-2"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                </div>
              ) : null}

              {status === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3 mb-2">
                    <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                      Formulaire Officiel de Demande de Consultation
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Conforme aux exigences du périmètre fonctionnel (Section 10 de la Charte).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nom et Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Mireille Ngono"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
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
                        placeholder="Ex: Société Industrielle du Littoral"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Fonction / Rôle dans la structure
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Ex: Directeur Général / DSI / DRH"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ville et Pays *
                      </label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ex: Douala, Cameroun"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Numéro de Téléphone (WhatsApp conseillé) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+237 6XX XX XX XX"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Adresse E-mail Professionnelle *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="direction@entreprise.cm"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service recherché *
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      >
                        {SERVICE_PILLARS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Budget indicatif (facultatif)
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                      >
                        <option value="À définir lors du cadrage">À définir lors du cadrage</option>
                        <option value="Moins de 2 000 000 FCFA">Moins de 2 000 000 FCFA</option>
                        <option value="2 000 000 à 5 000 000 FCFA">2 000 000 à 5 000 000 FCFA</option>
                        <option value="5 000 000 à 15 000 000 FCFA">5 000 000 à 15 000 000 FCFA</option>
                        <option value="Plus de 15 000 000 FCFA">Plus de 15 000 000 FCFA</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Description du besoin et contexte *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Expliquez brièvement les enjeux, les livrables attendus ou les blocages rencontrés..."
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                    />
                  </div>

                  {/* Consent checkbox required by page 10 of charter */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consentCheck"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-1 text-[#0066B3] focus:ring-[#0066B3] rounded"
                    />
                    <label htmlFor="consentCheck" className="text-[11px] text-slate-500 leading-tight">
                      J'accepte que les informations saisies soient traitées par CABINET BELKAL CONSULTING SARLU dans le cadre de ma demande commerciale, conformément à la politique de confidentialité.
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                    <a
                      href={getWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xs transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Transmettre aussi sur WhatsApp</span>
                    </a>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer la demande officielle</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
