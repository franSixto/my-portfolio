import fs from 'fs/promises';
import path from 'path';

const config = {
  siteUrl: 'https://fransixto.com.ar',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin', '/404'],
  additionalPaths: async () => {
    try {
      // Leer proyectos desde el archivo de localización español
      const localesPath = path.join(process.cwd(), 'src', 'locales', 'es.json');
      const localesRaw = await fs.readFile(localesPath, 'utf8');
      const locales = JSON.parse(localesRaw);
      const projects = locales.projectsData || [];
      
      return projects.map((project) => ({
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
