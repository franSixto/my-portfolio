import React from 'react';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, projectUrl }) => {
    return (
        <div className="project-card border rounded-lg shadow-lg overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    View Project
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;