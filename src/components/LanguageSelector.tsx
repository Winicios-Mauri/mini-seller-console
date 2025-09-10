import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useTranslation();

  const languages = [
    { value: 'pt-BR', flag: '🇧🇷', label: 'Português' },
    { value: 'en-US', flag: '🇺🇸', label: 'English' }
  ];

  const currentLanguageData = languages.find(lang => lang.value === currentLanguage);

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="w-16 h-8 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-transparent"
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value} className="text-gray-900">
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <span className="text-lg">{currentLanguageData?.flag}</span>
      </div>
    </div>
  );
};

export default LanguageSelector;
