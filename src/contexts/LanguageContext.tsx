"use client";

import React, { createContext, useCallback, useContext, useMemo, ReactNode } from "react";
import {
  localizedPath,
  type Locale,
  type RouteKey,
  type RouteParams,
} from "@/i18n/routes";
import { translate, type TranslationData } from "@/i18n/translate";

interface LanguageContextType {
  locale: Locale;
  t: (key: string) => string;
  /** Localized href for a route key in the current locale. */
  localePath: (key: RouteKey, params?: RouteParams) => string;
  /** Always false: translations are rendered on the server. Kept for API compatibility. */
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  locale: Locale;
  translations: TranslationData;
}

export function LanguageProvider({ children, locale, translations }: LanguageProviderProps) {
  const t = useCallback((key: string) => translate(translations, key), [translations]);
  const localePath = useCallback(
    (key: RouteKey, params?: RouteParams) => localizedPath(key, locale, params),
    [locale]
  );
  const value = useMemo(
    () => ({ locale, t, localePath, loading: false }),
    [locale, t, localePath]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook to translate with interpolation
export function useTranslation() {
  const { t, locale, loading } = useLanguage();

  const translateWithVars = (key: string, variables?: Record<string, string | number>) => {
    let translation = t(key);

    if (variables) {
      Object.keys(variables).forEach((variable) => {
        translation = translation.replace(`{{${variable}}}`, String(variables[variable]));
      });
    }

    return translation;
  };

  return { t: translateWithVars, locale, loading };
}
