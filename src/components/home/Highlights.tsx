'use client';

import { motion } from 'framer-motion';
import { JSX } from 'react/jsx-runtime';
import { useTranslation } from '@/contexts/LanguageContext';
import { TitleH2 } from '@/components/common/TitleH2';
import { useInView } from "react-intersection-observer";

import {
    // Diseño
    SiFigma,
    SiAdobexd,
    SiAdobeillustrator,
    SiAdobephotoshop,
    SiSketch,
    SiInvision,
  
    // Frontend
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiBootstrap,
    SiHtml5,
    SiCss3,
    SiJavascript,
  
    // DevOps / Infra
    SiGit,
    SiGithub,
    SiVercel,
    SiDotnet,
    SiAmazon,
    SiMongodb,
    SiFirebase,
    SiMysql,
    SiPostgresql,
    SiLinux,
    SiUbuntu,
    SiRedhat,
  
    // Colaboración
    SiJira,
    SiSlack,
    SiNotion,
    SiConfluence,
    SiMiro,
    SiTrello,
  
    // Herramientas
    SiNpm,
    SiYarn,
    SiPostman,
    SiGooglechrome,
  } from 'react-icons/si';
  
  import {
    FaLightbulb,
    FaRunning,
    FaTools,
    FaSyncAlt,
    FaCode,
  } from 'react-icons/fa';
  
  type Tool = {
    name: string;
    icon: JSX.Element;
    category: string;
  };
  
  export const tools: Tool[] = [
    // 🧩 Diseño & Prototipado
    { name: 'Figma', icon: <SiFigma className="text-pink-500" />, category: 'Design' },
    { name: 'Adobe XD', icon: <SiAdobexd className="text-purple-500" />, category: 'Design' },
    { name: 'Illustrator', icon: <SiAdobeillustrator className="text-orange-500" />, category: 'Design' },
    { name: 'Photoshop', icon: <SiAdobephotoshop className="text-blue-600" />, category: 'Design' },
    { name: 'Sketch', icon: <SiSketch className="text-yellow-400" />, category: 'Design' },
    { name: 'InVision', icon: <SiInvision className="text-rose-400" />, category: 'Design' },
  
    // 💻 Frontend
    { name: 'React', icon: <SiReact className="text-cyan-400" />, category: 'Frontend' },
    { name: 'Next.js', icon: <SiNextdotjs className="dark:invert" />, category: 'Frontend' },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" />, category: 'Frontend' },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, category: 'Frontend' },
    { name: 'HTML5', icon: <SiHtml5 className="text-orange-500" />, category: 'Frontend' },
    { name: 'CSS3', icon: <SiCss3 className="text-blue-500" />, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" />, category: 'Frontend' },
    { name: 'Bootstrap', icon: <SiBootstrap className="text-violet-600" />, category: 'Frontend' },
  
    // ⚙️ DevOps & Infra
    { name: 'Git', icon: <SiGit className="text-orange-600" />, category: 'DevOps' },
    { name: 'GitHub', icon: <SiGithub className="dark:invert" />, category: 'DevOps' },
    { name: 'Vercel', icon: <SiVercel className="dark:invert" />, category: 'DevOps' },
    { name: '.NET', icon: <SiDotnet className="text-purple-600" />, category: 'DevOps' },
    { name: 'AWS', icon: <SiAmazon className="text-orange-400" />, category: 'DevOps' },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500" />, category: 'DevOps' },
    { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" />, category: 'DevOps' },
    { name: 'MySQL', icon: <SiMysql className="text-blue-600" />, category: 'DevOps' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-500" />, category: 'DevOps' },
    { name: 'Linux', icon: <SiLinux className="dark:invert" />, category: 'DevOps' },
    { name: 'Ubuntu', icon: <SiUbuntu className="text-orange-500" />, category: 'DevOps' },
    { name: 'Red Hat', icon: <SiRedhat className="text-red-600" />, category: 'DevOps' },
  
    // 🤝 Colaboración
    { name: 'Jira', icon: <SiJira className="text-blue-600" />, category: 'Collaboration' },
    { name: 'Slack', icon: <SiSlack className="text-purple-500" />, category: 'Collaboration' },
    { name: 'Notion', icon: <SiNotion className="dark:invert" />, category: 'Collaboration' },
    { name: 'Confluence', icon: <SiConfluence className="text-blue-500" />, category: 'Collaboration' },
    { name: 'Miro', icon: <SiMiro className="text-yellow-400" />, category: 'Collaboration' },
    { name: 'Trello', icon: <SiTrello className="text-blue-500" />, category: 'Collaboration' },
  
    // 🔧 Herramientas
    { name: 'VSCode', icon: <FaCode className="text-blue-500" />, category: 'Tools' },
    { name: 'NPM', icon: <SiNpm className="text-red-600" />, category: 'Tools' },
    { name: 'Yarn', icon: <SiYarn className="text-blue-500" />, category: 'Tools' },
    { name: 'Postman', icon: <SiPostman className="text-orange-500" />, category: 'Tools' },
    { name: 'Chrome DevTools', icon: <SiGooglechrome className="text-yellow-600" />, category: 'Tools' },
  
    // 📚 Metodologías (conceptuales, sin ícono oficial)
    { name: 'Agile', icon: <FaRunning className="text-emerald-500" />, category: 'Methodology' },
    { name: 'Scrum', icon: <FaSyncAlt className="text-indigo-500" />, category: 'Methodology' },
    { name: 'Design Thinking', icon: <FaLightbulb className="text-yellow-400" />, category: 'Methodology' },
    { name: 'CI/CD', icon: <FaTools className="text-gray-500 dark:text-gray-300" />, category: 'Methodology' },
  ];
  
function calculateDelay(tool: Tool): number {
    const categories = ['Design', 'Frontend', 'DevOps', 'Collaboration', 'Tools', 'Methodology'];
    const categoryIndex = categories.indexOf(tool.category);
    const baseDelay = 0.1; // Base delay in seconds
    return categoryIndex >= 0 ? categoryIndex * baseDelay : 0;
}

const Highlights = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 mx-auto rounded-4xl">
      <div className="container mx-auto px-6">
        <TitleH2
          title={t('home.highlights.title')}
          description={t('home.highlights.description')}
        />
        
        {/* Diseño tipo pills/badges más compacto */}
        <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              ref={ref}
              key={tool.name}
              whileInView={inView ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: calculateDelay(tool) + (index % 12) * 0.03,
                ease: "easeOut"
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-lg group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
