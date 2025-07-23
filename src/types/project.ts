// Shared types for projects across the application

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

export interface Project {
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
}
