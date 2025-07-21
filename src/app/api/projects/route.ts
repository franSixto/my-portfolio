// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

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
    const projects: Project[] = locale === 'en' 
      ? (enTranslations as { projectsData?: Project[] }).projectsData || []
      : (esTranslations as { projectsData?: Project[] }).projectsData || [];
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ projects: [] });
  }
}
