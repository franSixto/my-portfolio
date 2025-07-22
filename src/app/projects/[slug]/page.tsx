import { Metadata } from "next";
import Image from "next/image";
import type { Child } from "@/app/api/projects/route";
import ReactMarkdown from "react-markdown";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { TitleH1Project } from "@/components/common/TitleH1Project";
import ProjectLogoBanner from "@/components/projects/ProjectLogoBanner";
import LiveProjectButton from "@/components/projects/LiveProjectButton";
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import zhTranslations from '@/locales/zh.json';
import jaTranslations from '@/locales/ja.json';
import hiTranslations from '@/locales/hi.json';
import ptTranslations from '@/locales/pt.json';
import arTranslations from '@/locales/ar.json';

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
  longDescription?: Array<{ type: string; children: Child[]; level?: number; format?: string }> | string;
};

// Función helper para obtener un proyecto por slug directamente desde los archivos de traducción
const getProjectBySlug = (slug: string, locale: string = 'es'): Project | null => {
  try {
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
    return project || null;
  } catch (error) {
    console.error('Error loading project:', error);
    return null;
  }
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug, 'es'); // Por defecto en español
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
  const project = getProjectBySlug(slug, 'es'); // Por defecto en español
  if (!project) {
    return (
      <div className="container mx-auto px-6 py-12 text-center dark:bg-gray-950">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project not found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The project you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }
  const {
    title = "Untitled Project",
    description = "No description available.",
    longDescription = "",
    imageUrl = "/default-image.png",
    imageAlt = "Imagen del proyecto",
    logoUrl = "/default-logo.png",
    logoAlt = "Logo del proyecto",
    liveUrl,
  } = project;
  return (
    <article className="dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
        <TitleH1Project title={title} description={description} />
        {logoUrl && (
          <ProjectLogoBanner logoUrl={logoUrl} logoAlt={logoAlt} />
        )}
        {imageUrl && (
          <div className="relative max-w-2xl mx-auto mb-16">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1366}
              height={792}
              className="rounded-2xl object-cover bg-gray-100 dark:bg-gray-900"
            />
          </div>
        )}
        {liveUrl && (
          <LiveProjectButton liveUrl={liveUrl} />
        )}
        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {Array.isArray(longDescription) ? (
            longDescription.length > 0 ? (
              longDescription.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={index} className="text-gray-600 dark:text-gray-300 mb-5">
                      {block.children.map((child: Child) => child.text)}
                    </p>
                  );
                }
                return null;
              })
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No hay contenido detallado disponible.</p>
            )
          ) : (
            longDescription ? (
              <ReactMarkdown
                components={{
                  p: (props) => <p className="mb-5 leading-relaxed text-gray-700 dark:text-gray-200" {...props} />,
                  h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
                  h2: (props) => <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white" {...props} />,
                  h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white" {...props} />,
                  ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2" {...props} />,
                  ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                  a: (props) => <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  strong: (props) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
                  em: (props) => <em className="italic text-gray-700 dark:text-gray-200" {...props} />,
                  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
                  blockquote: (props) => <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6" {...props} />,
                  code: (props) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono" {...props} />,
                }}
              >{longDescription}</ReactMarkdown>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No hay contenido detallado disponible.</p>
            )
          )}
        </div>
      </div>
    </article>
  );
}