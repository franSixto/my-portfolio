// src/hooks/useProjects.ts
"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Project } from '@/types/project';

export function useProjects() {
  const { locale } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects?locale=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [locale]); // Re-fetch when locale changes

  return { projects, loading, error };
}

export function useProject(slug: string) {
  const { projects, loading, error } = useProjects();
  const project = projects.find(p => p.slug === slug);
  
  return { project, loading, error };
}
