"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

type Locale = 'en' | 'es';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { en, es };

// Función helper para acceder a propiedades anidadas usando punto notation
function getNestedProperty(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce((current: Record<string, unknown> | unknown, key) => 
    (current as Record<string, unknown>)?.[key], obj) as string || path;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Cargar idioma desde localStorage al iniciar
  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-language') as Locale;
    if (savedLocale && ['en', 'es'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
      setLocaleState(browserLang);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('preferred-language', newLocale);
    // Actualizar el atributo lang del html
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    return getNestedProperty(translations[locale], key);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
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
  const { t, locale } = useLanguage();
  
  const translate = (key: string, variables?: Record<string, string | number>) => {
    let translation = t(key);
    
    if (variables) {
      Object.keys(variables).forEach(variable => {
        translation = translation.replace(`{{${variable}}}`, String(variables[variable]));
      });
    }
    
    return translation;
  };

  return { t: translate, locale };
}
