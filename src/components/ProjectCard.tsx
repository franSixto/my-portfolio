import Image from 'next/image';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, projectUrl }) => {
    return (
        <div className="shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
            <Image src={imageUrl} alt={title} width={500} height={200} className="w-full h-48 object-cover" />
            <div className="p-6 bg-white dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
            <p className="text-gray-600 mb-5">{description}</p>
            <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
                View Project
            </a>
            </div>
        </div>
    );
};

export default ProjectCard;