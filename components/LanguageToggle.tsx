import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm p-0.5 sm:p-1 rounded-full border border-white/30">
        <button
          onClick={() => onToggle('en')}
          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
            currentLang === 'en' 
              ? 'bg-white text-primary-700 shadow-md' 
              : 'text-white hover:bg-white/10'
          }`}
        >
          English
        </button>
        <button
          onClick={() => onToggle('ar')}
          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
            currentLang === 'ar' 
              ? 'bg-white text-primary-700 shadow-md' 
              : 'text-white hover:bg-white/10'
          }`}
        >
          العربية
        </button>
        <Globe className="text-white w-3 h-3 sm:w-4 sm:h-4 mx-0.5 sm:mx-1" />
    </div>
  );
};