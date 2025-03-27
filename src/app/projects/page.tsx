import ProjectCard from '../../components/ProjectCard';

const Projects = () => {
  const projectList = [
    {
      title: "Project 1",
      description: "This is a description for Project 1.",
      imageUrl: "/file.svg",
      projectUrl: "https://example.com/project1",
    },
    {
      title: "Project 2",
      description: "This is a description for Project 2.",
      imageUrl: "/xenomorphBackground.webp",
      projectUrl: "https://example.com/project2",
    },
    {
      title: "Project 3",
      description: "This is a description for Project 3.",
      imageUrl: "/xenomorphBackground.webp",
      projectUrl: "https://example.com/project3",
    },
    {
      title: "Project 4",
      description: "This is a description for Project 4.",
      imageUrl: "/xenomorphBackground.webp",
      projectUrl: "https://example.com/project4",
    },
  ];

  return (
    <div className='container mx-auto px-6 py-8'>
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectList.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            projectUrl={project.projectUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;