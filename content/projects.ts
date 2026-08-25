// Case-study projects. Populated by content-architect in Phase 1.
// Links are optional: omit a link entirely rather than shipping a placeholder URL.

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  tagline: string;
  tags: string[];
  problem: string;
  built: string;
  limitation?: string;
  links: ProjectLink[];
}

export interface Projects {
  heading: string;
  items: Project[];
}

export const projects: Projects = {
  heading: "Things I built to find out how they break",
  items: [
    {
      name: "PlumbLine",
      tagline: "Infrastructure Drift Detection",
      tags: ["Terraform", "Python", "AWS Lambda", "GitHub Actions"],
      problem:
        "Infrastructure as code only tells the truth if nobody touches the console. In practice someone always does (a security group opened for a quick test, an IAM policy widened during an incident) and the repo silently stops describing reality.",
      built:
        "A scheduled GitHub Actions pipeline that runs `terraform plan` against multi-region AWS accounts and flags anything that has drifted from committed state. A Python parser walks the plan JSON to isolate out-of-band changes, and escalates security group and IAM edits down a separate path from everything else, because those are the changes that actually hurt. Lambda handlers auto-remediate low-risk drift; anything above that threshold opens a pull request reconciling live state back to the repo, so a human reviews the diff instead of a script deciding for them.",
      limitation:
        "The parser reads Terraform's plan JSON, and that schema can change between versions. A Terraform upgrade could quietly break how it classifies changes without anyone noticing until a drift check misfires.",
      // Repo and architecture diagram links pending — see docs/TODO-LEDGER.md.
      links: [],
    },
    {
      name: "EKS Failure Testing Lab",
      tagline: "Chaos testing for a Kubernetes deployment",
      tags: ["AWS EKS", "Helm", "Chaos Mesh"],
      problem:
        "A Kubernetes deployment that has never failed isn't proven resilient: it just hasn't been tested. I wanted to find my own failure modes before something else found them for me.",
      built:
        "Deployed a multi-replica microservice stack to an AWS EKS cluster via Helm, then broke it on purpose with Chaos Mesh: killing pods, saturating CPU, and cutting the network between services. Each run exposed something: readiness probes that reported healthy too early, replica counts that couldn't absorb a single node loss, resource limits that turned a slow pod into a dead one. I tuned each of those and re-ran the same experiments until failover behaved the way I expected.",
      limitation:
        "[FILL: the one failure that surprised you most — an interviewer will ask you to expand on this.]",
      // Repo and architecture diagram links pending — see docs/TODO-LEDGER.md.
      links: [],
    },
    {
      name: "Vatavaran",
      tagline: "San Francisco Context Engine",
      tags: ["Next.js 14", "Supabase", "Vercel", "React-Leaflet"],
      problem:
        "Deciding where to live or spend time in San Francisco means checking weather, transit, terrain, and city records separately, then holding it all in your head. The city's data exists; it just doesn't talk to itself.",
      built:
        'A full-stack dashboard aggregating weather, transit, terrain, and DataSF registry data into a neighborhood-level "Vibe Score." The interesting constraint was reliability: each upstream API (OpenWeatherMap, 511.org, Google Elevation) fails over independently to cached data, so one dead source degrades the score instead of blanking the dashboard. On top of that, crowdsourced reporting with a karma tier on Supabase Postgres and a React-Leaflet map.',
      limitation:
        "[FILL: optional — how the Vibe Score is weighted and what you'd change.]",
      // Repo and live demo links pending — see docs/TODO-LEDGER.md.
      links: [],
    },
  ],
};
