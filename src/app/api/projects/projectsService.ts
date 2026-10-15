// Service for handling projects (server-side JSON data)
import { getProjects, getProject } from '@/i18n/dictionary';
import { isLocale, defaultLocale } from '@/i18n/routes';
import type { Project } from '@/types/project';

export type { Project };

// Fetch all projects for a given locale
export const fetchProjects = async (locale: string = defaultLocale): Promise<{ projects: Project[] }> => {
  return { projects: getProjects(isLocale(locale) ? locale : defaultLocale) };
};

// Fetch a single project by slug for a given locale
export const fetchProjectBySlug = async (slug: string, locale: string = defaultLocale): Promise<Project | null> => {
  return getProject(slug, isLocale(locale) ? locale : defaultLocale);
};
