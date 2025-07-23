// src/app/api/projects/[slug]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Project } from '@/types/project';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    
    // Obtener proyectos desde los nuevos archivos modulares
    let projects: Project[] = [];
    
    try {
      const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'projects.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      // Los archivos JSON contienen directamente el array, no necesitan .projectsData
      projects = Array.isArray(data) ? data : data.projectsData || [];
    } catch (fileError) {
      console.error(`Error loading projects for locale ${locale}:`, fileError);
      // Fallback a español si el archivo no existe
      try {
        const fallbackPath = path.join(process.cwd(), 'public', 'locales', 'es', 'projects.json');
        const fallbackContents = fs.readFileSync(fallbackPath, 'utf8');
        const fallbackData = JSON.parse(fallbackContents);
        projects = Array.isArray(fallbackData) ? fallbackData : fallbackData.projectsData || [];
      } catch (fallbackError) {
        console.error('Error loading fallback projects:', fallbackError);
        projects = [];
      }
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
