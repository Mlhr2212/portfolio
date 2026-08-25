// Technical work experience. Populated by content-architect in Phase 1.
// `tags` must reuse the same skill labels that appear in skills.ts and projects.ts.

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  intro: string;
  context?: string;
  bullets: string[];
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "DevOps Intern",
    company: "Aavgo",
    location: "San Mateo, CA (Hybrid)",
    period: "June 2026 – Present",
    intro:
      "Infrastructure for a hospitality platform's backend microservices, across staging and production.",
    context:
      "When I joined, new AWS resources were still being created by hand in the console, and releases went out as manual pushes about once a week. Most of my work has been moving that into code and into CI.",
    bullets: [
      "Provision core AWS infrastructure (EC2, S3, ALB, CloudFront, Lambda) supporting backend hospitality microservices across staging and production",
      "Write modular Terraform templates for multi-region provisioning, replacing manual console setup for new resources",
      "Define IAM policies, VPC networking, and security groups as code, so access control changes are reviewable in version control instead of invisible",
      "Add build and test checks with GitHub Actions and Docker, moving releases from weekly manual pushes toward automated daily deployments",
      "Chased down a deploy that looked like it never shipped: the change was live, but CloudFront kept serving a cached object because nothing was invalidating it",
    ],
    tags: ["AWS", "Terraform", "Docker", "GitHub Actions", "IAM", "VPC"],
  },
  {
    role: "Software Engineering Intern",
    company: "Naranlala Pvt Ltd",
    location: "Remote / India",
    period: "June–Aug 2025",
    intro:
      "Backend work on internal Node.js tooling: my first time in a codebase I didn't write.",
    context:
      "The tooling was an internal admin dashboard the operations team used to manage orders and inventory, plus a reporting service that generated exports for the accounts team.",
    bullets: [
      "Debugged and resolved 35+ backend defects, adding Jest coverage around the regressions that kept coming back",
      "Built and integrated 12+ REST endpoints in Express, standardizing response envelopes so clients stopped special-casing each route",
      "Filed reproducible bug reports through Git and Jira: a clear repro turned out to be half the fix",
    ],
    tags: ["Node.js", "Express", "Jest", "REST", "Git", "Jira"],
  },
];
