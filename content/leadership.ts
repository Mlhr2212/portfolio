// Leadership and campus operations roles. Populated by content-architect in
// Phase 1. Kept separate from experience.ts: prose bodies, no skill tags.

export interface LeadershipEntry {
  role: string;
  org: string;
  period: string;
  note?: string;
  body: string;
}

export interface Leadership {
  intro: string;
  entries: LeadershipEntry[];
}

export const leadership: Leadership = {
  intro:
    "Three years of campus roles where I was the person on call. Different domain, same instincts: own the system, respond to the incident, write down what happened.",
  entries: [
    {
      role: "Resident Assistant",
      org: "Residential Life, SFSU",
      period: "Aug 2026 – Present",
      body: "Live-in student leader for a residence hall floor, responsible for a floor of about 50 residents: move-in, roommate mediation, and the day-to-day work of keeping a community functioning. Hold on-call duty rotations, responding to after-hours incidents and escalating safety and facilities concerns to professional staff.",
    },
    {
      role: "Building Supervisor",
      org: "Campus Recreation, SFSU",
      period: "Oct 2025 – Present",
      note: "Promoted from Operations Specialist, Jan 2025 – Oct 2025",
      body: "Primary on-site authority for the Mashouf Wellness Center during my shifts, a facility that sees around 300 patrons a day. Manage daily operations against safety and operational standards, enforce building policy, and lead first response for emergencies and facility incidents, including the documentation and staff coordination afterward. Main point of contact for patron issues and professional staff communication, resolved in real time.",
    },
    {
      role: "Director of Facilities & Operations",
      org: "Associated Students, SFSU",
      period: "June 2025 – May 2026",
      body: "Elected student representative for fee-funded campus facilities. Oversaw program evaluations and assessments to keep facilities aligned with student needs, managed budgets and resource allocation for events and upgrades, and contributed to strategic decisions as a member of the UCorp Board of Directors and Advisory Council. Also served as Vice Chair of the Internal Affairs Committee.",
    },
    {
      role: "Undergraduate Teaching Assistant",
      org: "Dept. of Mathematics, SFSU",
      period: "Aug–Dec 2024",
      body: "Graded assignments and exams for Calculus I & II and held office hours, working through limits, derivatives, and integrals with students who were stuck. Supported instructors with review sessions and reported performance trends back to faculty.",
    },
    {
      role: "Outreach Officer",
      org: "ACM at SFSU",
      period: "May 2024 – Apr 2025",
      body: "Organized 10+ coding meetups, workshops, and tech talks, coordinating with student clubs and AI communities across the Bay Area.",
    },
    {
      role: "Vice President",
      org: "Cricket Club at SFSU",
      period: "Spring 2024 – Present",
      body: "Vice President of the campus cricket club since Spring 2024, outside of coursework and the rest of the on-call work.",
    },
  ],
};
