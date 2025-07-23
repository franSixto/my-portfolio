// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Project } from '@/types/project';

export async function GET(request: Request) {
  try {
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
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ projects: [] });
  }
}
