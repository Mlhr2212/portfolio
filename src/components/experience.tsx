import { experience } from "../../content/experience";
import { stripFill } from "@/lib/content";
import { Tag } from "@/components/tag";
import { HighlightTarget } from "@/components/highlight-target";

// Only the two periods below are unambiguous machine-readable ranges; the
// datetime attribute holds the parsed value while the visible text stays
// human-written. Anything else would fall back to plain text (none does).
function ExperiencePeriod({ period }: { period: string }) {
  if (period === "June 2026 – Present") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2026-06">June 2026</time> – Present
      </p>
    );
  }
  if (period === "June–Aug 2025") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2025-06">June</time>–<time dateTime="2025-08">Aug 2025</time>
      </p>
    );
  }
  return <p className="font-mono text-xs text-text-secondary">{period}</p>;
}

export function Experience() {
  return (
    <section id="experience" className="py-16">
      <h2 className="font-mono text-sm uppercase tracking-wide text-accent">
        Experience
      </h2>

      <div className="mt-10 flex flex-col gap-8">
        {experience.map((entry) => {
          const context = entry.context ? stripFill(entry.context) : "";
          const bullets = entry.bullets.map(stripFill).filter(Boolean);

          return (
            <HighlightTarget key={entry.company + entry.role} tags={entry.tags}>
              <article className="fade-in-up rounded-lg border border-border bg-surface p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {entry.role} · {entry.company}
                  </h3>
                  <ExperiencePeriod period={entry.period} />
                </div>
                <p className="mt-1 text-sm text-text-secondary">{entry.location}</p>
                <p className="mt-4 text-base text-text-secondary">{entry.intro}</p>
                {context && <p className="mt-2 text-base text-text-secondary">{context}</p>}
                {bullets.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm text-text-secondary">
                        <span aria-hidden="true" className="text-accent">
                          –
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
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
