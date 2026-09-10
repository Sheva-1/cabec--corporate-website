import React from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO, SERVICE_PILLARS } from '../data/cabecData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1E33] text-slate-300 font-['Plus_Jakarta_Sans',sans-serif] border-t border-slate-800">
      
      {/* Upper Pre-Footer Callout */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-white">
              Prêt à accélérer vos projets au Cameroun et en Afrique Centrale ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Nos équipes et directeurs de mission vous répondent sous 24 heures ouvrées.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={COMPANY_INFO.whatsappDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Échanger sur WhatsApp</span>
            </a>
            
            <a
              href="#diagnostic"
              className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              <span>Lancer le simulateur</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Coordinates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="white" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-white">CABINET BELKAL CONSULTING SARLU (CABEC)</strong> est un cabinet de conseil en management stratégique, ingénierie logicielle et développement des organisations basé à Yassa, Douala.
            </p>
            
            <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div>RCCM : <span className="text-slate-200">{COMPANY_INFO.rccm}</span></div>
              <div>N° Contribuable : <span className="text-slate-200">{COMPANY_INFO.taxId}</span></div>
              <div className="text-emerald-400 font-sans font-medium flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Société de droit camerounais (OHADA)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Les 5 Pôles d'intervention (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-['Outfit',sans-serif]">
              Expertises & Pôles
            </div>
            <ul className="space-y-2 text-xs">
              {SERVICE_PILLARS.map((p) => (
                <li key={p.id}>
                  <a
                    href="#poles"
                    className="hover:text-white transition-colors block py-0.5 text-slate-300"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation Institutionnelle (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-['Outfit',sans-serif]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#poles" className="hover:text-white transition-colors">Nos 5 Pôles</a></li>
              <li><a href="#methode" className="hover:text-white transition-colors">Méthodologie</a></li>
              <li><a href="#realisations" className="hover:text-white transition-colors">Études de cas</a></li>
              <li><a href="#diagnostic" className="hover:text-white transition-colors">Diagnostic projet</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Foire Aux Questions</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact officiel</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Direct & Horaires (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-['Outfit',sans-serif]">
              Coordonnées Officielles
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${COMPANY_INFO.phone1Raw}`} className="block hover:text-white">
                    {COMPANY_INFO.phone1}
                  </a>
                  <a href={`tel:${COMPANY_INFO.phone2Raw}`} className="block hover:text-white text-slate-400">
                    {COMPANY_INFO.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-400">{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName} (CABEC). Tous droits réservés.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#contact" className="hover:text-slate-200">Mentions légales</a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-200">Politique de confidentialité</a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-white transition-colors ml-2"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Persistent Floating WhatsApp Quick Button for Mobile/Desktop */}
      <aside aria-label="Action rapide WhatsApp">
        <a
          href={COMPANY_INFO.whatsappDirectUrl('Bonjour CABEC, je souhaite être recontacté rapidement.')}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group"
          title="Échanger en direct sur WhatsApp avec un consultant"
        >
          <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Direct</span>
        </a>
      </aside>
    </footer>
  );
};
