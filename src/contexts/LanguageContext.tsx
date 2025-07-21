"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import zh from '@/locales/zh.json';
import ja from '@/locales/ja.json';
import hi from '@/locales/hi.json';
import pt from '@/locales/pt.json';
import ar from '@/locales/ar.json';

type Locale = 'en' | 'es' | 'zh' | 'ja' | 'hi' | 'pt' | 'ar';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { en, es, zh, ja, hi, pt, ar };

// Idiomas que se leen de derecha a izquierda
const RTL_LANGUAGES: Locale[] = ['ar'];

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
    if (savedLocale && ['en', 'es', 'zh', 'ja', 'hi', 'pt', 'ar'].includes(savedLocale)) {
      setLocaleState(savedLocale);
      // Configurar dirección inicial
      const isRTL = RTL_LANGUAGES.includes(savedLocale);
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLocale;
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.startsWith('es') ? 'es' : 
                         navigator.language.startsWith('zh') ? 'zh' :
                         navigator.language.startsWith('ja') ? 'ja' :
                         navigator.language.startsWith('hi') ? 'hi' :
                         navigator.language.startsWith('pt') ? 'pt' :
                         navigator.language.startsWith('ar') ? 'ar' : 'en';
      setLocaleState(browserLang);
      // Configurar dirección inicial
      const isRTL = RTL_LANGUAGES.includes(browserLang);
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = browserLang;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('preferred-language', newLocale);
    // Actualizar el atributo lang del html
    document.documentElement.lang = newLocale;
    // Actualizar la dirección del texto
    const isRTL = RTL_LANGUAGES.includes(newLocale);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return getNestedProperty(translations[locale], key);
  };

  const isRTL = RTL_LANGUAGES.includes(locale);
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL, direction }}>
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
  const { t, locale, isRTL, direction } = useLanguage();
  
  const translate = (key: string, variables?: Record<string, string | number>) => {
    let translation = t(key);
    
    if (variables) {
      Object.keys(variables).forEach(variable => {
        translation = translation.replace(`{{${variable}}}`, String(variables[variable]));
      });
    }
    
    return translation;
  };

  return { t: translate, locale, isRTL, direction };
}
