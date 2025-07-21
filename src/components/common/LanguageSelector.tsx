"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const { mainColor } = useColorContext();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const toggleLanguage = (langCode: 'en' | 'es') => {
    setLocale(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${COLOR_CLASS_MAP[mainColor]} transition-colors duration-300`}
        aria-label="Select language"
        title="Select language"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[140px] z-50"
        >
          {languages.map((language) => (
            <motion.button
              key={language.code}
              whileHover={{ backgroundColor: 'rgba(156, 163, 175, 0.1)' }}
              onClick={() => toggleLanguage(language.code as 'en' | 'es')}
              className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors duration-200 ${
                locale === language.code
                  ? `text-${mainColor}-500 font-medium`
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
              {locale === language.code && (
                <span className={`ml-auto text-${mainColor}-500 text-xs`}>✓</span>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Overlay para cerrar el dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
