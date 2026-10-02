import { journey } from "../../content/journey";
import { stripFill } from "@/lib/content";

// Milestones whose period is a genuine single point in time get a real
// <time> with a machine-readable datetime. Vague labels ("Before 2023",
// a bare year, a season, a multi-year span) stay plain text — no
// fabricated datetime attribute.
const periodDatetime: Record<string, string> = {
  "August 2023": "2023-08",
  "October 2025": "2025-10",
  "June 2026": "2026-06",
  "August 2026": "2026-08",
};

export function Journey() {
  return (
    <section id="journey" className="section-rule py-20 sm:py-24">
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {journey.heading}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary">
        {journey.subhead}
      </p>

      <ol className="relative mt-10 flex flex-col gap-10">
        <div
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-1 w-px -translate-x-1/2 bg-gradient-to-b from-accent-warm to-accent"
        />
        {journey.milestones.map((milestone) => {
          const body = stripFill(milestone.body);
          const datetime = periodDatetime[milestone.period];

          return (
            <li key={milestone.period + milestone.title} className="fade-in-up relative pl-8">
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-1 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
              />
              {datetime ? (
                <time dateTime={datetime} className="font-mono text-xs text-text-secondary">
                  {milestone.period}
                </time>
              ) : (
                <span className="font-mono text-xs text-text-secondary">
                  {milestone.period}
                </span>
              )}
              <h3 className="mt-1 text-xl font-semibold text-text-primary">
                {milestone.title}
              </h3>
              {body && <p className="mt-2 max-w-2xl text-base text-text-secondary">{body}</p>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
