import { leadership } from "../../content/leadership";
import { stripFill } from "@/lib/content";

// Every period below is an unambiguous single point or two-ended range, so
// each gets a real <time> — unlike Experience/Journey, no vague labels here.
function LeadershipPeriod({ period }: { period: string }) {
  if (period === "Aug 2026 – Present") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2026-08">Aug 2026</time> – Present
      </p>
    );
  }
  if (period === "Oct 2025 – Present") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2025-10">Oct 2025</time> – Present
      </p>
    );
  }
  if (period === "June 2025 – May 2026") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2025-06">June 2025</time> – <time dateTime="2026-05">May 2026</time>
      </p>
    );
  }
  if (period === "Aug–Dec 2024") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2024-08">Aug</time>–<time dateTime="2024-12">Dec 2024</time>
      </p>
    );
  }
  if (period === "May 2024 – Apr 2025") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2024-05">May 2024</time> – <time dateTime="2025-04">Apr 2025</time>
      </p>
    );
  }
  return <p className="font-mono text-xs text-text-secondary">{period}</p>;
}

export function Leadership() {
  return (
    <section id="leadership" className="py-16">
      <h2 className="font-mono text-sm uppercase tracking-wide text-accent">Leadership</h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary">{leadership.intro}</p>

      <div className="mt-10 flex flex-col gap-8">
        {leadership.entries.map((entry) => {
          // "note" is an all-or-nothing adornment: a mid-string [FILL] would
          // leave a dangling fragment, so the whole field is omitted until filled.
          const note = entry.note && !entry.note.includes("[FILL") ? entry.note : "";
          const body = stripFill(entry.body);

          return (
            <article
              key={entry.role + entry.org}
              className="fade-in-up rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold text-text-primary">
                  {entry.role} · {entry.org}
                </h3>
                <LeadershipPeriod period={entry.period} />
              </div>
              {note && <p className="mt-1 text-sm text-text-secondary">{note}</p>}
              {body && <p className="mt-4 text-base text-text-secondary">{body}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
