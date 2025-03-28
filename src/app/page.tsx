import Hero from "@/components/Hero";
import HomeTitle from "@/components/HomeTitle";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 matrix:bg-red-500 w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <HomeTitle/>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Here are some of my recent projects that showcase my skills and
            creativity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {/* Add your project cards here */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Project Title
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Brief description of the project goes here. It should be
                concise and informative.
              </p>
              <a
                href="#"
                className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                View Project
              </a>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Project Title
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Brief description of the project goes here. It should be
                concise and informative.
              </p>
              <a
                href="#"
                className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                View Project
              </a>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Project Title
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Brief description of the project goes here. It should be
                concise and informative.
              </p>
              <a
                href="#"
                className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I would love to hear from you! Whether you have a question or just
            want to say hi, feel free to reach out.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block px-6 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Contact Me
          </a>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Follow Me
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Stay updated with my latest projects and adventures. Follow me on
            social media!
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition duration-300 ease-in-out"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition duration-300 ease-in-out"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition duration-300 ease-in-out"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition duration-300 ease-in-out"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Subscribe to My Newsletter
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Stay updated with my latest projects and insights. Subscribe to my
            newsletter for exclusive content and updates.
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Skills
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I have experience in various technologies and frameworks. Here are
            some of my skills:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Tailwind CSS</li>
            <li>Git</li>
            <li>GitHub</li>
            <li>REST APIs</li>
            <li>GraphQL</li>
            <li>Responsive Design</li>
            <li>Agile Methodologies</li>
            <li>UI/UX Design</li>
            <li>Accessibility (a11y)</li>
            <li>Testing (Jest, React Testing Library)</li>
            <li>Deployment (Vercel, Netlify)</li>
            <li>CI/CD</li>
            <li>Cloud Services (AWS, Firebase)</li>
            <li>DevOps</li>
            <li>Containerization (Docker)</li>
            <li>Microservices</li>
            <li>Progressive Web Apps (PWAs)</li>
            <li>Cross-Browser Compatibility</li>
            <li>Performance Optimization</li>
            <li>SEO Best Practices</li>
            <li>Version Control (Git)</li>
            <li>Code Review</li>
            <li>Documentation</li>
            <li>Collaboration Tools (Slack, Trello, Jira)</li>
            <li>Agile/Scrum Methodologies</li>
            <li>Problem Solving</li>
            <li>Critical Thinking</li>
            <li>Time Management</li>
            <li>Communication Skills</li>
            <li>Teamwork</li>
            <li>Adaptability</li>
            <li>Continuous Learning</li>
            <li>Attention to Detail</li>
            <li>Creativity</li>
            <li>Project Management</li>
            <li>Customer Service</li>
            <li>Public Speaking</li>
            <li>Mentoring</li>
            <li>Networking</li>
            </ul>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I am always eager to learn new technologies and improve my skills.
            If you have any suggestions or resources, feel free to share them
            with me!
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Hobbies
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            In my free time, I enjoy exploring new technologies, reading books,
            and spending time with my family and friends. I also love to travel
            and experience different cultures. Here are some of my hobbies:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Traveling</li>
            <li>Photography</li>
            <li>Cooking</li>
            <li>Hiking</li>
            <li>Reading</li>
            <li>Gaming</li>
            <li>Music</li>
            <li>Art</li>
            <li>Writing</li>
            <li>Volunteering</li>
            <li>Fitness</li>
            <li>Gardening</li>
            <li>Learning Languages</li>
            <li>Watching Movies</li>
            <li>Listening to Podcasts</li>
            <li>Playing Musical Instruments</li>
            </ul>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I believe that having hobbies outside of work helps me stay
            creative and balanced. If you share any of these interests, let's
            connect and chat about them!
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Blog
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I enjoy writing about my experiences and sharing my knowledge with
            others. Check out my blog for articles on web development, coding
            tips, and more!
          </p>
          <a
            href="/blog"
            className="mt-4 inline-block px-6 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Visit My Blog
          </a>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Achievements
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I am proud of my achievements and milestones in my career. Here are
            some of the highlights:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Completed a full-stack web development bootcamp</li>
            <li>Contributed to open-source projects</li>
            <li>Participated in hackathons and coding competitions</li>
            <li>Published articles on web development topics</li>
            <li>Received certifications in various technologies</li>
            </ul>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I believe that continuous learning and growth are essential in the
            tech industry. I am always looking for new challenges and
            opportunities to expand my knowledge and skills.
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Future Goals
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I have big dreams and aspirations for my future. Here are some of
            my goals:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Become a senior developer or team lead</li>
            <li>Contribute to impactful projects and initiatives</li>
            <li>Mentor and support aspiring developers</li>
            <li>Continue learning and growing in my field</li>
            <li>Travel to new places and experience different cultures</li>
          </ul>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I believe that setting goals helps me stay focused and motivated. I
            am excited about the future and the opportunities that lie ahead.
            If you have any advice or insights to share, I would love to hear
            from you!
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Values
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I believe in the importance of values and principles in both
            personal and professional life. Here are some of my core values:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Integrity</li>
            <li>Respect</li>
            <li>Collaboration</li>
            <li>Innovation</li>
            <li>Continuous Improvement</li>
            <li>Empathy</li>
            <li>Diversity and Inclusion</li>
            <li>Accountability</li>
            <li>Transparency</li>
            <li>Community Engagement</li>
            <li>Work-Life Balance</li>
          </ul>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I believe that living by these values helps me build meaningful
            relationships and contribute positively to my community. If you
            share similar values, let's connect and collaborate!
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Inspirations
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I draw inspiration from various sources, including people,
            experiences, and ideas. Here are some of my inspirations:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Innovative thinkers and leaders in the tech industry</li>
            <li>Books and articles on personal development and technology</li>
            <li>Traveling and experiencing different cultures</li>
            <li>Nature and the environment</li>
            <li>Art and creativity</li>
            <li>Community and social impact initiatives</li>
          </ul>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            I believe that inspiration can come from anywhere, and I am always
            looking for new ideas and perspectives. If you have any
            recommendations or insights to share, I would love to hear from
            you!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;