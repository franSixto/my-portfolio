// src/app/api/projects/projectsService.ts
// Ahora lee los proyectos desde los archivos de localización
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import zhTranslations from '@/locales/zh.json';
import jaTranslations from '@/locales/ja.json';
import hiTranslations from '@/locales/hi.json';
import ptTranslations from '@/locales/pt.json';
import arTranslations from '@/locales/ar.json';

export interface Child {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  type?: string;
  text: string;
  url?: string;
  children?: Child[];
}

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  logoUrl?: string;
  logoAlt?: string;
  projectUrl?: string;
  liveUrl?: string;
  slug?: string;
  longDescription?: Array<{ type: string; children: Child[]; level?: number; format?: string }> | string;
};

// Lee los proyectos desde los archivos de localización
const getProjectsData = async (locale: string = 'es'): Promise<Project[]> => {
  let projects: Project[] = [];
  
  switch (locale) {
    case 'en':
      projects = (enTranslations as { projectsData?: Project[] }).projectsData || [];
      break;
    case 'zh':
      projects = (zhTranslations as { projectsData?: Project[] }).projectsData || [];
      break;
    case 'ja':
      projects = (jaTranslations as { projectsData?: Project[] }).projectsData || [];
      break;
    case 'hi':
      projects = (hiTranslations as { projectsData?: Project[] }).projectsData || [];
      break;
    case 'pt':
      projects = (ptTranslations as { projectsData?: Project[] }).projectsData || [];
      break;
    case 'ar':
      projects = (arTranslations as { projectsData?: Project[] }).projectsData || [];
      break;
    default:
      projects = (esTranslations as { projectsData?: Project[] }).projectsData || [];
  }
  
  return projects;
};

export const fetchProjects = async (locale: string = 'es'): Promise<{ projects: Project[] }> => {
  const projects = await getProjectsData(locale);
  return { projects };
};

export const fetchProjectBySlug = async (slug: string, locale: string = 'es'): Promise<Project | null> => {
  const projects = await getProjectsData(locale);
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
};