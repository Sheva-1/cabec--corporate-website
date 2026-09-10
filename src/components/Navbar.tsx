import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/cabecData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: (preselectedPillar?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '#hero' },
    { 
      label: 'Expertises', 
      href: '#poles',
      hasDropdown: true
    },
    { label: 'Méthodologie', href: '#methode' },
    { label: 'Réalisations', href: '#realisations' },
    { label: 'Diagnostic', href: '#diagnostic' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const pillarsSubmenu = [
    { id: 'conseil-strategie', title: 'Conseil & Stratégie', desc: 'Management, organisation & gouvernance' },
    { id: 'solutions-digitales', title: 'Solutions Digitales & Systèmes', desc: 'Logiciels, applications mobiles & web' },
    { id: 'gestion-projets', title: 'Gestion de Projets & S&E', desc: 'Suivi-évaluation & pilotage de programmes' },
    { id: 'formations', title: 'Formation Professionnelle', desc: 'Académie CABEC & perfectionnement cadres' },
    { id: 'immobilier', title: 'Immobilier d’Entreprise', desc: 'Investissement & sécurisation foncière' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Corporate Legal & Contact Bar */}
      <div className="bg-[#0B1E33] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Location & Legal */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="font-medium text-white">Siège :</span> {COMPANY_INFO.address}
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400 border-l border-slate-700 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              RCCM : <span className="text-slate-200">{COMPANY_INFO.rccm}</span>
            </span>
          </div>

          {/* Quick Direct Communication */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href={`tel:${COMPANY_INFO.phone1Raw}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#38BDF8]" />
              <span className="font-semibold text-slate-100">{COMPANY_INFO.phone1}</span>
            </a>

            <a 
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden lg:inline-flex items-center gap-1.5 hover:text-white transition-colors border-l border-slate-700 pl-4"
            >
              <Mail className="w-3 h-3 text-[#38BDF8]" />
              <span>{COMPANY_INFO.email}</span>
            </a>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={COMPANY_INFO.whatsappDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#4ADE80] px-2.5 py-0.5 rounded-full font-medium transition-all"
            >
              <MessageSquare className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp Direct</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5' 
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <Logo size="md" variant="full" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 py-2 text-slate-700 hover:text-[#0066B3] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#0066B3]' : 'text-slate-400'}`} />
                  </a>

                  {/* Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 mb-1">
                        Les 5 Pôles d'intervention CABEC
                      </div>
                      {pillarsSubmenu.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#poles`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="block px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover/item:text-[#0066B3]">
                            {sub.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {sub.desc}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-2 text-slate-700 hover:text-[#0066B3] transition-colors"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-2 bg-[#0066B3] hover:bg-[#005291] text-white text-sm font-semibold px-4.5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98]"
            >
              <span>Demander une consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenConsultation()}
              className="bg-[#0066B3] text-white text-xs font-semibold px-3 py-2 rounded-md"
            >
              Devis
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0066B3] rounded-lg hover:bg-slate-100"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-50 hover:text-[#0066B3]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0066B3] text-white font-semibold py-3 rounded-lg text-sm"
            >
              <span>Demander une consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={COMPANY_INFO.whatsappDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact direct WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
