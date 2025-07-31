"use client";

import ProjectsHeaderSkeleton from "./ProjectsHeaderSkeleton";
import ProjectListSkeleton from "./ProjectListSkeleton";

interface ProjectsPageSkeletonProps {
  projectCount?: number;
}

export default function ProjectsPageSkeleton({ projectCount = 6 }: ProjectsPageSkeletonProps) {
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
      <ProjectsHeaderSkeleton />
      <ProjectListSkeleton count={projectCount} />
    </div>
  );
}
