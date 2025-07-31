"use client";

import ProjectCardSkeleton from "./ProjectCardSkeleton";

interface ProjectListSkeletonProps {
  count?: number;
}

export default function ProjectListSkeleton({ count = 6 }: ProjectListSkeletonProps) {
  // Crear variaciones en los anchos de título para mayor realismo
  const getTitleWidth = (index: number) => {
    const widths = ['w-3/4', 'w-2/3', 'w-4/5', 'w-5/6', 'w-3/5', 'w-4/6'];
    return widths[index % widths.length];
  };

  return (
    <div className="container mx-auto px-4 py-12 z-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }, (_, index) => (
          <ProjectCardSkeleton 
            key={`skeleton-${index}`} 
            titleWidth={getTitleWidth(index)}
          />
        ))}
      </div>
    </div>
  );
}
