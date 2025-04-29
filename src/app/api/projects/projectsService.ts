// src/app/api/projects/projectsService.ts
// Definimos un tipo más específico para los elementos de children
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
    LongDescription?: Array<{ type: string; children: Child[]; level?: number; format?: string }>;
};

// Definimos un tipo para la paginación
interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// Definimos un tipo para los metadatos
interface Meta {
    pagination: Pagination;
}

// Función para obtener todos los proyectos con soporte de paginación
export const fetchProjects = async (page = 1, pageSize = 12): Promise<{ projects: Project[]; meta: Meta }> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    const data = await res.json();
    return { projects: data.data, meta: data.meta };
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