import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface LanguageSelectorProps {
  variant?: 'topbar' | 'navbar' | 'mobile' | 'footer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLang = (lang: 'fr' | 'en') => {
    trackEvent('Language', 'switch_language', lang);
    setLanguage(lang);
    setDropdownOpen(false);
  };

  // 1. Topbar Variant (Minimalist, dark-background friendly)
  if (variant === 'topbar') {
    return (
      <div className={`flex items-center gap-1.5 text-xs ${className}`}>
        <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
        <div className="inline-flex rounded-md p-0.5 bg-slate-800/80 border border-slate-700 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => handleSelectLang('fr')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              language === 'fr' 
                ? 'bg-[#0066B3] text-white shadow-xs' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Passer en Français"
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => handleSelectLang('en')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              language === 'en' 
                ? 'bg-[#0066B3] text-white shadow-xs' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to English"
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  // 2. Mobile Drawer Variant (Full width, easy touch)
  if (variant === 'mobile') {
    return (
      <div className={`p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#0066B3]" />
            <span>{language === 'fr' ? 'Langue d’affichage' : 'Display Language'}</span>
          </div>
          <span className="text-[10px] text-[#0066B3] uppercase font-bold tracking-wider">
            {language === 'fr' ? 'Bilingue FR/EN' : 'Bilingual EN/FR'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleSelectLang('fr')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
              language === 'fr'
                ? 'bg-[#0066B3] text-white border-[#0066B3] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🇫🇷</span>
            <span>Français</span>
            {language === 'fr' && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => handleSelectLang('en')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
              language === 'en'
                ? 'bg-[#0066B3] text-white border-[#0066B3] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🇬🇧</span>
            <span>English</span>
            {language === 'en' && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    );
  }

  // 3. Footer Variant
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Globe className="w-4 h-4 text-slate-300" />
          <span>{language === 'fr' ? 'Langue :' : 'Language:'}</span>
        </div>
        <div className="inline-flex rounded-lg p-0.5 bg-slate-800 border border-slate-700 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleSelectLang('fr')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              language === 'fr' 
                ? 'bg-[#0066B3] text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇫🇷</span>
            <span>FR</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectLang('en')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              language === 'en' 
                ? 'bg-[#0066B3] text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇬🇧</span>
            <span>EN</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. Navbar Standard Variant (Default Desktop: High precision toggle + dropdown)
  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <div className="inline-flex items-center rounded-xl p-1 bg-slate-100/90 border border-slate-200/90 text-xs font-semibold shadow-2xs">
        <button
          type="button"
          onClick={() => handleSelectLang('fr')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            language === 'fr'
              ? 'bg-white text-[#0066B3] shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Passer le site en Français"
        >
          <span className="text-sm">🇫🇷</span>
          <span>FR</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectLang('en')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-white text-[#0066B3] shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Translate site to English"
        >
          <span className="text-sm">🇬🇧</span>
          <span>EN</span>
        </button>

        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-1 py-1.5 text-slate-400 hover:text-slate-700 transition-colors ml-0.5 border-l border-slate-200/80 cursor-pointer"
          title={language === 'fr' ? 'Options de traduction' : 'Translation options'}
          aria-label="Options de langue"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180 text-[#0066B3]' : ''}`} />
        </button>
      </div>

      {/* Language details dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 z-50 text-xs font-medium"
          >
            <div className="px-2.5 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>{language === 'fr' ? 'Langue officielle' : 'Official Language'}</span>
              <span className="text-[#0066B3]">Cameroun Bilingue</span>
            </div>

            <div className="py-1 space-y-1">
              <button
                type="button"
                onClick={() => handleSelectLang('fr')}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  language === 'fr' ? 'bg-blue-50/80 text-[#0066B3] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🇫🇷</span>
                  <div>
                    <div className="font-semibold">Français</div>
                    <div className="text-[10px] text-slate-500">Langue par défaut (CEMAC)</div>
                  </div>
                </div>
                {language === 'fr' && <Check className="w-4 h-4 text-[#0066B3]" />}
              </button>

              <button
                type="button"
                onClick={() => handleSelectLang('en')}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-blue-50/80 text-[#0066B3] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🇬🇧</span>
                  <div>
                    <div className="font-semibold">English</div>
                    <div className="text-[10px] text-slate-500">Official bilingual & international</div>
                  </div>
                </div>
                {language === 'en' && <Check className="w-4 h-4 text-[#0066B3]" />}
              </button>
            </div>

            <div className="mt-1 pt-1.5 border-t border-slate-100 px-2 text-[10px] text-slate-500 leading-relaxed flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0066B3] shrink-0" />
              <span>{language === 'fr' ? 'Traduction instantanée sans rechargement.' : 'Instant zero-reload bilingual translation.'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
