// Utility functions for loading translations and projects from the new structure
import { Project } from '@/types/project';

export type Locale = 'en' | 'es' | 'zh' | 'ja' | 'hi' | 'pt' | 'ar';
export type { Project };

type TranslationValue = string | number | boolean | Record<string, unknown> | unknown[];
export type TranslationData = Record<string, TranslationValue>;

// Cache for loaded data
const cache = new Map<string, TranslationData | Project[]>();

export async function loadCommonTranslations(locale: Locale): Promise<TranslationData> {
  const cacheKey = `common-${locale}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as TranslationData;
  }

  try {
    const response = await fetch(`/locales/${locale}/common.json`);
    if (!response.ok) {
      throw new Error(`Failed to load common translations for ${locale}`);
    }
    const data = await response.json() as TranslationData;
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error loading common translations for ${locale}:`, error);
    // Fallback to Spanish if available
    if (locale !== 'es') {
      return loadCommonTranslations('es');
    }
    return {};
  }
}

export async function loadProjects(locale: Locale): Promise<Project[]> {
  const cacheKey = `projects-${locale}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as Project[];
  }

  try {
    const response = await fetch(`/locales/${locale}/projects.json`);
    if (!response.ok) {
      throw new Error(`Failed to load projects for ${locale}`);
    }
    const data = await response.json() as Project[];
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error loading projects for ${locale}:`, error);
    // Fallback to Spanish if available
    if (locale !== 'es') {
      return loadProjects('es');
    }
    return [];
  }
}

export async function loadProject(slug: string, locale: Locale): Promise<Project | null> {
  const projects = await loadProjects(locale);
  return projects.find((p: Project) => p.slug === slug || p.id === slug) || null;
}

// Helper function to get a translation value using dot notation
export function getTranslation(translations: TranslationData, key: string, fallback?: string): string {
  const keys = key.split('.');
  let value: TranslationValue = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && !Array.isArray(value) && k in value) {
      value = (value as Record<string, TranslationValue>)[k];
    } else {
      return fallback || key;
    }
  }
  
  return typeof value === 'string' ? value : fallback || key;
}
