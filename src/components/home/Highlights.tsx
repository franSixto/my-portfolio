'use client';

import { motion } from 'framer-motion';
import { JSX } from 'react/jsx-runtime';
import { TitleH2 } from '@/components/common/TitleH2';

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
    SiWordpress,
    SiDocker,
  
    // Gestión y colaboración
    SiTrello,
    SiJirasoftware,
    SiSlack,
    SiZoom,
    SiMiro,
    SiGooglemeet,
  
    // Otras herramientas
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
    { name: 'Next.js', icon: <SiNextdotjs />, category: 'Frontend' },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" />, category: 'Frontend' },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, category: 'Frontend' },
    { name: 'HTML5', icon: <SiHtml5 className="text-orange-500" />, category: 'Frontend' },
    { name: 'CSS3', icon: <SiCss3 className="text-blue-500" />, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" />, category: 'Frontend' },
    { name: 'Bootstrap', icon: <SiBootstrap className="text-violet-600" />, category: 'Frontend' },
  
    // ⚙️ DevOps / Infra
    { name: 'Git', icon: <SiGit className="text-orange-600" />, category: 'DevOps' },
    { name: 'GitHub', icon: <SiGithub />, category: 'DevOps' },
    { name: 'Vercel', icon: <SiVercel />, category: 'DevOps' },
    { name: '.NET Core', icon: <SiDotnet className="text-purple-600" />, category: 'DevOps' },
    { name: 'WordPress', icon: <SiWordpress className="text-indigo-700" />, category: 'DevOps' },
    { name: 'Docker', icon: <SiDocker className="text-blue-500" />, category: 'DevOps' },
  
    // 📋 Gestión y colaboración
    { name: 'Trello', icon: <SiTrello className="text-blue-500" />, category: 'Collaboration' },
    { name: 'Jira', icon: <SiJirasoftware className="text-blue-500" />, category: 'Collaboration' },
    { name: 'Slack', icon: <SiSlack className="text-fuchsia-600" />, category: 'Collaboration' },
    { name: 'Zoom', icon: <SiZoom className="text-blue-400" />, category: 'Collaboration' },
    { name: 'Google Meet', icon: <SiGooglemeet className="text-green-500" />, category: 'Collaboration' },
    { name: 'Miro', icon: <SiMiro className="text-yellow-400" />, category: 'Collaboration' },
  
    // 🛠️ Otras herramientas
    { name: 'NPM', icon: <SiNpm className="text-red-600" />, category: 'Tools' },
    { name: 'Yarn', icon: <SiYarn className="text-blue-500" />, category: 'Tools' },
    { name: 'Postman', icon: <SiPostman className="text-orange-500" />, category: 'Tools' },
    { name: 'Chrome DevTools', icon: <SiGooglechrome className="text-yellow-600" />, category: 'Tools' },
  
    // 📚 Metodologías (conceptuales, sin ícono oficial)
    { name: 'Agile', icon: <FaRunning className="text-emerald-500" />, category: 'Methodology' },
    { name: 'Scrum', icon: <FaSyncAlt className="text-indigo-500" />, category: 'Methodology' },
    { name: 'Design Thinking', icon: <FaLightbulb className="text-yellow-400" />, category: 'Methodology' },
    { name: 'CI/CD', icon: <FaTools className="text-gray-500" />, category: 'Methodology' },
  ];
  
function calculateDelay(tool: Tool): number {
    const categories = ['Design', 'Frontend', 'DevOps', 'Collaboration', 'Tools', 'Methodology'];
    const categoryIndex = categories.indexOf(tool.category);
    const baseDelay = 0.1; // Base delay in seconds
    return categoryIndex >= 0 ? categoryIndex * baseDelay : 0;
}

export default function Highlights() {
  return (
    <section
      className="container mx-auto px-6 my-12"
    >
        <TitleH2
            title="Tools & Technologies"
            description="A curated collection of the tools I use to bring ideas to life."
        />
      <ul className="flex flex-wrap gap-4">
        {tools.map((tool) => (
          <motion.li
            key={tool.name}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-neutral-100 dark:bg-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow text-md"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: calculateDelay(tool) }}
          >
            {tool.icon}
            {tool.name}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
