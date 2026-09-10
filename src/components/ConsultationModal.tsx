import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, SERVICE_PILLARS } from '../data/cabecData';
import { X, Send, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPillar?: string;
  preselectedServiceTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedPillar,
  preselectedServiceTitle
}) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pillar, setPillar] = useState(preselectedPillar || 'conseil-strategie');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedPillar) {
      setPillar(preselectedPillar);
    }
    if (preselectedServiceTitle) {
      setDescription(`Demande concernant le service : ${preselectedServiceTitle}`);
    }
  }, [preselectedPillar, preselectedServiceTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppMsg = () => {
    const pName = SERVICE_PILLARS.find(p => p.id === pillar)?.title || pillar;
    const text = `*Demande de Consultation CABEC*\n` +
      `• *Nom*: ${fullName || 'Client'}\n` +
      `• *Organisation*: ${organization || 'Non spécifiée'}\n` +
      `• *Pôle*: ${pName}\n` +
      `• *Contact*: ${phone || 'À préciser'} | ${email || 'À préciser'}\n` +
      (description ? `• *Projet*: ${description}` : '');
    return COMPANY_INFO.whatsappDirectUrl(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1E33] text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
              CABINET BELKAL CONSULTING
            </div>
            <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white">
              Demande de Cadrage & Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-[#4F8B50] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                Demande Enregistrée avec Succès
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Nos équipes de Douala ont bien reçu vos informations. Vous recevrez une fiche de cadrage sous 24h ouvrées.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <a
                  href={getWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-2.5 rounded-xl text-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Transmettre également sur WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Entreprise / Structure *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Nom de la société"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@entreprise.cm"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pôle d'expertise concerné
                </label>
                <select
                  value={pillar}
                  onChange={(e) => setPillar(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
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
                  Résumé des objectifs ou contraintes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez en quelques lignes votre besoin..."
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066B3]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <a
                  href={getWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Envoyer via WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-[#0066B3] hover:bg-[#005291] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer la demande</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
