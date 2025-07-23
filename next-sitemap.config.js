import fs from 'fs/promises';
import path from 'path';

const config = {
  siteUrl: 'https://fransixto.com.ar',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin', '/404'],
  additionalPaths: async () => {
    try {
      // Leer proyectos desde la nueva estructura modular
      const projectsPath = path.join(process.cwd(), 'public', 'locales', 'es', 'projects.json');
      const projectsRaw = await fs.readFile(projectsPath, 'utf8');
      const projects = JSON.parse(projectsRaw);
      
      // Los archivos JSON contienen directamente el array de proyectos
      const projectsArray = Array.isArray(projects) ? projects : projects.projectsData || [];
      
      return projectsArray.map((project) => ({
        loc: `/projects/${project.slug}`,
        lastmod: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error reading projects for sitemap:', error);
      return [];
    }
  },
};

export default config;
