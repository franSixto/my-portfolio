// Service for handling projects - now uses the new file structure
import { loadProjects, loadProject, type Project, type Locale } from '@/lib/translations';

export type { Project };

// Fetch all projects for a given locale
export const fetchProjects = async (locale: string = 'es'): Promise<{ projects: Project[] }> => {
  const projects = await loadProjects(locale as Locale);
  return { projects };
};

// Fetch a single project by slug for a given locale
export const fetchProjectBySlug = async (slug: string, locale: string = 'es'): Promise<Project | null> => {
  return await loadProject(slug, locale as Locale);
};