// Identity, hero, and about copy. Populated by content-architect in Phase 1.
// No invented facts: empty strings are stubs, not claims.

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  location: string;
  email: string;
  socials: SocialLink[];
  heroHeadline: string;
  heroSubline: string;
  about: string;
}

export const profile: Profile = {
  name: "Malhar Kansara",
  location: "San Francisco, California",
  email: "kansaramalhar22@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/malharkansara" },
    { label: "GitHub", href: "https://github.com/Mlhr2212" },
  ],
  heroHeadline: "I build and automate cloud infrastructure.",
  heroSubline:
    "DevOps Intern at Aavgo. CS at San Francisco State, class of 2027. Moved from India in 2023; been building ever since.",
  about:
    "I'm a Computer Science student at San Francisco State University, graduating in May 2027. I work as a DevOps Intern at Aavgo in San Mateo, where I provision AWS infrastructure and write the Terraform that replaces manual console setup. Most of what I know about infrastructure I learned by building things that were allowed to break: a Kubernetes cluster I attacked on purpose, a drift detector I wrote because configuration quietly stops matching the code. Alongside that, I've spent three years running campus facilities and residence halls at SFSU. It turns out to be the same job in a different uniform: you own the system, and when it breaks, you're the one on call to document what happened and fix it. I'm aiming at backend and cloud engineering roles, with Java as my language of choice.",
};
