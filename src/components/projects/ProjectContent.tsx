"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { TitleH1Project } from "@/components/common/TitleH1Project";
import ProjectLogoBanner from "@/components/projects/ProjectLogoBanner";
import LiveProjectButton from "@/components/projects/LiveProjectButton";
import { loadProject, type Project as ProjectType, type Locale } from '@/lib/translations';

interface ProjectContentProps {
  slug: string;
}

export default function ProjectContent({ slug }: ProjectContentProps) {
  const { locale, t } = useLanguage();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const foundProject = await loadProject(slug, locale as Locale);
        setProject(foundProject);
      } catch (error) {
        console.error('Error loading project:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, locale]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center dark:bg-gray-950">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('common.loading') || 'Loading...'}
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-12 text-center dark:bg-gray-950">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('pages.projects.projectNotFound') || 'Project not found'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('pages.projects.projectNotFoundDescription') || 'The project you are looking for does not exist or has been removed.'}
        </p>
      </div>
    );
  }

  const {
    title = "Untitled Project",
    description = "No description available.",
    longDescription = "",
    imageUrl = "/default-image.png",
    imageAlt = "Project image",
    logoUrl = "/default-logo.png",
    logoAlt = "Project logo",
    liveUrl,
  } = project;

  return (
    <article className="dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
        <TitleH1Project title={title} description={description} />
        {logoUrl && logoUrl !== "/default-logo.png" && (
          <ProjectLogoBanner logoUrl={logoUrl} logoAlt={logoAlt} />
        )}
        {imageUrl && imageUrl !== "/default-image.png" && (
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
          {longDescription && typeof longDescription === 'string' ? (
            <ReactMarkdown
              components={{
                p: (props) => <p className="mb-5 leading-relaxed text-gray-700 dark:text-gray-200" {...props} />,
                h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
                h2: (props) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />,
                h3: (props) => <h3 className="text-xl font-medium mt-5 mb-2 text-gray-900 dark:text-white" {...props} />,
                ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2" {...props} />,
                ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2" {...props} />,
                li: (props) => <li className="text-gray-700 dark:text-gray-200" {...props} />,
                strong: (props) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
                em: (props) => <em className="italic" {...props} />,
                code: (props) => <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono" {...props} />,
                pre: (props) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-5" {...props} />,
                blockquote: (props) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-5" {...props} />,
                a: (props) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
                hr: (props) => <hr className="border-gray-300 dark:border-gray-600 my-8" {...props} />,
              }}
            >
              {longDescription}
            </ReactMarkdown>
          ) : longDescription && Array.isArray(longDescription) ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Complex content structure not yet implemented.
              </p>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              {t('pages.projects.noDetailedContent') || 'No detailed content available.'}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
