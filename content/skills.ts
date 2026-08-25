// Grouped skill chips. Populated by content-architect in Phase 1.
// Presentation rules (Section C.8) are binding: no bars, ratings, or percentages.
// Chip labels must match the `tags` used in experience.ts and projects.ts so the
// skills-filter interaction can highlight related entries.

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Java", "Python", "JavaScript", "SQL", "C++", "HTML/CSS"],
  },
  {
    label: "Frameworks",
    skills: [
      "Spring Boot",
      "Node.js",
      "Express",
      "Next.js",
      "React",
      "FastAPI",
      "Flask",
    ],
  },
  {
    label: "Data",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "SQLite"],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      "AWS",
      "EC2",
      "S3",
      "ALB",
      "CloudFront",
      "AWS Lambda",
      "AWS EKS",
      "ECS/Fargate",
      "IAM",
      "VPC",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Helm",
      "GitHub Actions",
      "CI/CD",
      "REST",
    ],
  },
];
