// Toolkit shown on the home page, grouped under the existing translated
// category keys (home.highlights.categories.*).
export const TOOL_GROUPS: { categoryKey: "design" | "frontend" | "backend" | "tools"; tools: string[] }[] = [
  {
    categoryKey: "design",
    tools: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Sketch", "InVision"],
  },
  {
    categoryKey: "frontend",
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
  },
  {
    categoryKey: "backend",
    tools: [
      "Git",
      "GitHub",
      "Vercel",
      ".NET",
      "AWS",
      "MongoDB",
      "Firebase",
      "MySQL",
      "PostgreSQL",
      "Linux",
      "Ubuntu",
      "Red Hat",
    ],
  },
  {
    categoryKey: "tools",
    tools: [
      "Jira",
      "Slack",
      "Notion",
      "Confluence",
      "Miro",
      "Trello",
      "VSCode",
      "NPM",
      "Yarn",
      "Postman",
      "Chrome DevTools",
      "Agile",
      "Scrum",
      "Design Thinking",
      "CI/CD",
    ],
  },
];
