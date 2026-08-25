// The India -> US timeline. Populated by content-architect in Phase 1.
// Every entry must carry a fact (year, role, system, shipped thing).

export interface JourneyMilestone {
  period: string;
  title: string;
  body: string;
}

export interface Journey {
  heading: string;
  subhead: string;
  milestones: JourneyMilestone[];
}

export const journey: Journey = {
  heading: "How I got here",
  subhead: "India to San Francisco, one system at a time.",
  milestones: [
    {
      period: "Before 2023",
      title: "India",
      body: "Grew up taking things apart to find out how they worked, and got interested in computers for the reason a lot of people do: they were the most complicated thing in the house. The first language I wrote was MS Logo, and it got me curious about how programming actually works.",
    },
    {
      period: "August 2023",
      title: "San Francisco",
      body: "Moved to the United States and started a B.S. in Computer Science at San Francisco State University. New country, new city, first semester: Dean's List that fall.",
    },
    {
      period: "2024",
      title: "Learning by teaching, and by working",
      body: "Graded and held office hours for Calculus I & II as an Undergraduate Teaching Assistant, and joined ACM at SFSU as Outreach Officer. Explaining derivatives to a room of people who were stuck taught me more about clear communication than any class did.",
    },
    {
      period: "Summer 2025",
      title: "First engineering job",
      body: "Software Engineering Intern at Naranlala Pvt Ltd: 35+ backend defects closed across internal Node.js tooling, 12+ REST endpoints shipped in Express, and my first real experience of a codebase I hadn't written.",
    },
    {
      period: "October 2025",
      title: "Running the building",
      body: "Promoted to Building Supervisor at the Mashouf Wellness Center, taking over first response for facility incidents and emergencies. First time I was the person other people escalated to.",
    },
    {
      period: "2025–2026",
      title: "Going deep on infrastructure",
      body: "Taught myself Terraform, AWS, and Kubernetes outside of coursework, then built things to prove it: a chaos-testing lab on EKS and an infrastructure drift detector that opens its own pull requests.",
    },
    {
      period: "June 2026",
      title: "Aavgo",
      body: "Started as a DevOps Intern in San Mateo, writing the Terraform and CI pipelines behind production hospitality microservices. The self-taught stack became the day job.",
    },
    {
      period: "August 2026",
      title: "On call, again",
      body: "Became a Resident Assistant in SFSU Residential Life, living on the floor I'm responsible for. The duty rotations and after-hours incidents draw on the same escalation instincts as engineering work.",
    },
  ],
};
