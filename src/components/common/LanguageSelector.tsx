"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';
import { alternatePath, otherLocale, type Locale } from '@/i18n/routes';

const languages: Record<Locale, { name: string; flag: string; switchLabel: string }> = {
  en: { name: 'English', flag: '🇺🇸', switchLabel: 'Switch to English' },
  es: { name: 'Español', flag: '🇪🇸', switchLabel: 'Cambiar a Español' },
};

// A plain link to the equivalent URL in the other language (no client-side swap).
export default function LanguageSelector() {
  const { locale } = useLanguage();
  const { mainColor } = useColorContext();
  const pathname = usePathname();

  const target = otherLocale(locale);
  const href = alternatePath(pathname, target);

  return (
    <div className="relative">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          href={href}
          hrefLang={target}
          lang={target}
          className={`w-[45px] h-[45px] flex justify-center items-center rounded-full ${COLOR_CLASS_MAP[mainColor]} backdrop-blur-sm transition-colors duration-300 cursor-pointer`}
          aria-label={languages[target].switchLabel}
          title={languages[target].switchLabel}
        >
          <span className="text-xl">{languages[locale].flag}</span>
        </Link>
      </motion.div>
    </div>
  );
}
