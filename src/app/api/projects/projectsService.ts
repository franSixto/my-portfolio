// src/app/api/projects/projectsService.ts
// Ahora lee los proyectos desde un archivo local JSON en vez de Strapi
import fs from 'fs/promises';
import path from 'path';

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
  logoUrl?: string;
  projectUrl?: string;
  slug?: string;
  longDescription?: Array<{ type: string; children: Child[]; level?: number; format?: string }>;
};

// Lee el archivo local de proyectos
const getProjectsData = async (): Promise<Project[]> => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'projects.json');
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
};

export const fetchProjects = async (): Promise<{ projects: Project[] }> => {
  const projects = await getProjectsData();
  return { projects };
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  const projects = await getProjectsData();
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
};