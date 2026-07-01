export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Technology", items: ["AWS", "Microservices"] },
  { label: "Databases", items: ["Postgres", "MySQL", "MongoDB"] },
  {
    label: "Languages",
    items: ["HTML/CSS", "JavaScript", "TypeScript", "Java"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "Tailwind", "Spring Boot"],
  },
  {
    label: "Tools",
    items: ["Git", "Render", "GitHub Actions", "Netlify", "Vercel"],
  },
];
