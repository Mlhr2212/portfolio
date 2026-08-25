import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Container } from "@/components/container";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Leadership } from "@/components/leadership";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { SkillFilterProvider } from "@/components/skill-filter-context";
import { Skills } from "@/components/skills";
import { profile } from "../../content/profile";
import { siteUrl } from "@/lib/site";

// JSON-LD Person. Only the fields the brief allows: name, jobTitle, alumniOf,
// sameAs, url. No phone, no street address.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "DevOps Intern",
  url: siteUrl,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "San Francisco State University",
  },
  sameAs: profile.socials.map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Nav />
      <main className="flex-1">
        <Container className="flex flex-col">
          <Hero />
          <About />
          <Journey />
          <SkillFilterProvider>
            <Experience />
            <Projects />
            <Skills />
          </SkillFilterProvider>
          <Leadership />
          <Education />
          <Contact />
        </Container>
      </main>
      <Footer />
    </>
  );
}
