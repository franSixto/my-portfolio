"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';
import type { Locale } from '@/lib/translations';

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const { mainColor } = useColorContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  if (!mounted) {
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
        onClick={toggle}
        className={`w-[45px] h-[45px] flex justify-center items-center rounded-full ${COLOR_CLASS_MAP[mainColor]} backdrop-blur-sm transition-colors duration-300 cursor-pointer`}
        aria-label={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
        title={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
      </motion.button>
    </div>
  );
}
