// src/hooks/useProjects.ts
"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

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

export type Project = {
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
