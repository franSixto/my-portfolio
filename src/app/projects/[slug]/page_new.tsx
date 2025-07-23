import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProjectContent from "@/components/projects/ProjectContent";
import esTranslations from '@/locales/es.json';

type Project = {
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
  longDescription?: string;
};

// Función helper para obtener un proyecto por slug para metadata
const getProjectBySlug = (slug: string): Project | null => {
  try {
    const projects = (esTranslations as { projectsData?: Project[] }).projectsData || [];
    const project = projects.find((p) => p.slug === slug || p.id === slug);
    return project || null;
  } catch (error) {
    console.error('Error loading project:', error);
    return null;
  }
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project not found",
      description: "The project you are looking for does not exist or has been removed.",
      openGraph: {
        title: "Project not found",
        description: "The project you are looking for does not exist or has been removed.",
        url: `https://www.fransixto.com.ar/projects/${slug}`,
        siteName: "Francisco Sixto Portfolio",
        locale: "en_US",
        type: "article",
        images: [
          {
            url: "/meta-image.jpg",
            width: 1200,
            height: 630,
            alt: "Francisco Sixto Portfolio"
          }
        ]
      },
      alternates: {
        canonical: `https://www.fransixto.com.ar/projects/${slug}`
      }
    };
  }
  return {
    title: project.title || "Untitled Project",
    description: project.description || "No description available.",
    openGraph: {
      title: project.title || "Untitled Project",
      description: project.description || "No description available.",
      url: `https://www.fransixto.com.ar/projects/${slug}`,
      siteName: "Francisco Sixto Portfolio",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: "/meta-image.jpg",
          width: 1200,
          height: 630,
          alt: "Francisco Sixto Portfolio"
        }
      ]
    },
    alternates: {
      canonical: `https://www.fransixto.com.ar/projects/${slug}`
    }
  };
}

// Generar rutas estáticas para todos los proyectos
export async function generateStaticParams() {
  const projects = (esTranslations as { projectsData?: Project[] }).projectsData || [];
  
  return projects.map((project) => ({
    slug: project.slug || project.id,
  }));
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  
  return (
    <div className="dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
      </div>
      <ProjectContent slug={slug} />
    </div>
  );
}
