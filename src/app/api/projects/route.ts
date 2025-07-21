// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    
    // Obtener proyectos desde los archivos de traducción principales
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
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ projects: [] });
  }
}
