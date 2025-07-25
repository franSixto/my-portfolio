"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';

export default function LanguageSelector() {
  const { locale, setLocale, isRTL } = useLanguage();
  const { mainColor } = useColorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const toggleLanguage = (langCode: 'en' | 'es' | 'zh' | 'ja' | 'hi' | 'pt' | 'ar') => {
    setLocale(langCode);
    setIsOpen(false);
  };

  if (!mounted) {
    // Reservar espacio mientras se monta para evitar Layout Shift
    return (
      <div className="relative">
        <div className={`w-[45px] h-[45px] flex justify-center items-center rounded-full ${COLOR_CLASS_MAP[mainColor]} backdrop-blur-sm transition-colors duration-300`}>
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[45px] h-[45px] flex justify-center items-center rounded-full ${COLOR_CLASS_MAP[mainColor]} backdrop-blur-sm transition-colors duration-300 cursor-pointer`}
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
          className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[140px] z-50`}
        >
          {languages.map((language) => (
            <motion.button
              key={language.code}
              whileHover={{ backgroundColor: 'rgba(156, 163, 175, 0.1)' }}
              onClick={() => toggleLanguage(language.code as 'en' | 'es' | 'zh' | 'ja' | 'hi' | 'pt' | 'ar')}
              className={`w-full px-4 py-2 ${isRTL ? 'text-right' : 'text-left'} flex items-center gap-3 transition-colors duration-200 cursor-pointer ${locale === language.code
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
