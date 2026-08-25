import { projects } from "../../content/projects";
import { stripFill } from "@/lib/content";
import { Tag } from "@/components/tag";
import { HighlightTarget } from "@/components/highlight-target";

export function Projects() {
  return (
    <section id="projects" className="py-16">
      <h2 className="font-mono text-sm uppercase tracking-wide text-accent">
        {projects.heading}
      </h2>

      <div className="mt-10 flex flex-col gap-8">
        {projects.items.map((project) => {
          const limitation = project.limitation ? stripFill(project.limitation) : "";

          return (
            <HighlightTarget key={project.name} tags={project.tags}>
              <article className="fade-in-up rounded-lg border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-text-primary">{project.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{project.tagline}</p>

                <div className="mt-4 flex flex-col gap-3 text-base text-text-secondary">
                  <p>
                    <span className="font-semibold text-text-primary">The problem: </span>
                    {project.problem}
                  </p>
                  <p>
                    <span className="font-semibold text-text-primary">What I built: </span>
                    {project.built}
                  </p>
                  {limitation && (
                    <p>
                      <span className="font-semibold text-text-primary">Limitation: </span>
                      {limitation}
                    </p>
                  )}
                </div>

                {project.links.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-motion rounded-md border border-border px-3 py-1.5 text-sm text-text-primary hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </HighlightTarget>
          );
        })}
      </div>
    </section>
  );
}
