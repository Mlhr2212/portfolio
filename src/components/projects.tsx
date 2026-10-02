import { projects } from "../../content/projects";
import { stripFill } from "@/lib/content";
import { Tag } from "@/components/tag";
import { HighlightTarget } from "@/components/highlight-target";

export function Projects() {
  return (
    <section id="projects" className="section-rule py-20 sm:py-24">
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {projects.heading}
      </h2>

      <div className="mt-10 flex flex-col gap-8">
        {projects.items.map((project, index) => {
          const limitation = project.limitation ? stripFill(project.limitation) : "";

          return (
            <HighlightTarget key={project.name} tags={project.tags}>
              <article className="card-lift fade-in-up rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">Case study 0{index + 1}</p>
                    <h3 className="text-2xl font-semibold tracking-tight text-text-primary">{project.name}</h3>
                  </div>
                  <span className="font-mono text-xs text-accent" aria-hidden="true">↗</span>
                </div>
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
