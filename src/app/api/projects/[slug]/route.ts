// src/app/api/projects/[slug]/route.ts
import { NextResponse } from 'next/server';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import zhTranslations from '@/locales/zh.json';
import jaTranslations from '@/locales/ja.json';
import hiTranslations from '@/locales/hi.json';
import ptTranslations from '@/locales/pt.json';
import arTranslations from '@/locales/ar.json';
import type { Project } from '../route';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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
    
    const project = projects.find((p) => p.slug === slug || p.id === slug);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error loading project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
