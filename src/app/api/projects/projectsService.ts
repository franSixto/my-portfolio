// src/app/api/projects/projectsService.ts

// Tipo para los proyectos basado en el esquema proporcionado
type Project = {
    id: number;
    Title: string;
    Description: string;
    slug: string;
    Image: {
        url: string;
        alternativeText?: string;
    } | null;
    Logo: {
        url: string;
        alternativeText?: string;
    } | null;
    publishedAt: string;
    LongDescription?: Array<{ type: string; children: any[]; level?: number; format?: string }>;
};

// Función para obtener todos los proyectos
export const fetchProjects = async (): Promise<Project[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*`);
    const data = await res.json();
    return data.data;
};

// Función para obtener un proyecto por slug
export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`
    );
    const data = await res.json();
    return data.data[0] || null;
};

export type { Project };