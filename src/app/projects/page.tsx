// app/projects/page.tsx
"use client";

import ProjectList from "@/components/projects/ProjectList";
import ProjectsPageSkeleton from "@/components/projects/ProjectsPageSkeleton";
import { TitleH1 } from "@/components/common/TitleH1";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useTranslation } from '@/contexts/LanguageContext';
import { useProjects } from '@/hooks/useProjects';

function Projects() {
  const { t } = useTranslation();
  const { projects, loading, error } = useProjects();

  if (loading) {
    return <ProjectsPageSkeleton projectCount={6} />;
  }

  if (error) {
    return (
      <div className="dark:bg-gray-950 pt-15 px-6 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{t('common.error')}: {error}</div>
      </div>
    );
  }
  return (
    
    
    <div
      className="dark:bg-gray-950 pt-15 px-6"
      style={{
        backgroundImage: 'url("/fondo.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        
      }}
    >
      <div className="relative overflow-hidden flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
        <TitleH1
          title={t('pages.projects.title')}
          description={t('pages.projects.description')}
        />
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}

export default Projects;