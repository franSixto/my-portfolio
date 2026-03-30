"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadCommonTranslations, getTranslation, type Locale, type TranslationData } from '@/lib/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [translations, setTranslations] = useState<TranslationData>({});
  const [loading, setLoading] = useState(true);

  // Función para cargar traducciones
  const loadTranslations = async (newLocale: Locale) => {
    setLoading(true);
    try {
      const commonTranslations = await loadCommonTranslations(newLocale);
      setTranslations(commonTranslations);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Detectar idioma: localStorage > API (IP/Accept-Language) > 'en'
  useEffect(() => {
    const detectLocale = async () => {
      const saved = localStorage.getItem('preferred-language') as Locale | null;
      if (saved && (saved === 'en' || saved === 'es')) {
        setLocaleState(saved);
        document.documentElement.lang = saved;
        loadTranslations(saved);
        return;
      }

      try {
        const res = await fetch('/api/locale');
        if (res.ok) {
          const { locale: detected } = await res.json();
          const validLocale: Locale = detected === 'es' ? 'es' : 'en';
          setLocaleState(validLocale);
          localStorage.setItem('preferred-language', validLocale);
          document.documentElement.lang = validLocale;
          loadTranslations(validLocale);
          return;
        }
      } catch {
        // Si falla la detección, usamos inglés como fallback
      }

      setLocaleState('en');
      document.documentElement.lang = 'en';
      loadTranslations('en');
    };

    detectLocale();
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('preferred-language', newLocale);
    document.documentElement.lang = newLocale;
    loadTranslations(newLocale);
  };

  const t = (key: string): string => {
    return getTranslation(translations, key);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook personalizado para traducir con interpolación
export function useTranslation() {
  const { t, locale, loading } = useLanguage();
  
  const translate = (key: string, variables?: Record<string, string | number>) => {
    let translation = t(key);
    
    if (variables) {
      Object.keys(variables).forEach(variable => {
        translation = translation.replace(`{{${variable}}}`, String(variables[variable]));
      });
    }
    
    return translation;
  };

  return { t: translate, locale, loading };
}
