import fs from 'fs/promises';
import path from 'path';

const config = {
  siteUrl: 'https://fransixto.com.ar',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin', '/404'],
  additionalPaths: async () => {
    const projectsPath = path.join(process.cwd(), 'public', 'data', 'projects.json');
    const projectsRaw = await fs.readFile(projectsPath, 'utf8');
    const projects = JSON.parse(projectsRaw);
    return projects.map((project) => ({
      loc: `/projects/${project.slug}`,
      lastmod: new Date().toISOString(),
    }));
  },
};

export default config;
