"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadCommonTranslations, getTranslation, type Locale, type TranslationData } from '@/lib/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Idiomas que se leen de derecha a izquierda
const RTL_LANGUAGES: Locale[] = ['ar'];

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

  // Cargar idioma desde localStorage al iniciar
  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-language') as Locale;
    const initialLocale = (savedLocale && ['en', 'es', 'zh', 'ja', 'hi', 'pt', 'ar'].includes(savedLocale)) 
      ? savedLocale 
      : 'en';
    
    setLocaleState(initialLocale);
    // Configurar dirección inicial
    const isRTL = RTL_LANGUAGES.includes(initialLocale);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = initialLocale;
    
    // Cargar traducciones
    loadTranslations(initialLocale);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('preferred-language', newLocale);
    
    // Actualizar el atributo lang del html
    document.documentElement.lang = newLocale;
    // Actualizar la dirección del texto
    const isRTL = RTL_LANGUAGES.includes(newLocale);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Cargar nuevas traducciones
    loadTranslations(newLocale);
  };

  const t = (key: string): string => {
    return getTranslation(translations, key);
  };

  const isRTL = RTL_LANGUAGES.includes(locale);
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL, direction, loading }}>
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
  const { t, locale, isRTL, direction, loading } = useLanguage();
  
  const translate = (key: string, variables?: Record<string, string | number>) => {
    let translation = t(key);
    
    if (variables) {
      Object.keys(variables).forEach(variable => {
        translation = translation.replace(`{{${variable}}}`, String(variables[variable]));
      });
    }
    
    return translation;
  };

  return { t: translate, locale, isRTL, direction, loading };
}
