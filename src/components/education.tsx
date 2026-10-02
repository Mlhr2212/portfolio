import { education } from "../../content/education";
import { Tag } from "@/components/tag";

function EducationPeriod({ period }: { period: string }) {
  if (period === "Aug 2023 – May 2027 (expected)") {
    return (
      <p className="font-mono text-xs text-text-secondary">
        <time dateTime="2023-08">Aug 2023</time> – <time dateTime="2027-05">May 2027</time>{" "}
        (expected)
      </p>
    );
  }
  return <p className="font-mono text-xs text-text-secondary">{period}</p>;
}

export function Education() {
  return (
    <section id="education" className="section-rule py-20 sm:py-24">
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Education</h2>

      <div className="mt-10 flex flex-col gap-8">
        {education.map((entry) => {
          // "gpa" is an all-or-nothing field: a [FILL] number would render
          // literally, so the whole line is omitted until it's a real number.
          const gpa = entry.gpa && !entry.gpa.includes("[FILL") ? entry.gpa : "";

          return (
            <article
              key={entry.school + entry.degree}
              className="card-lift fade-in-up rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold text-text-primary">{entry.school}</h3>
                <EducationPeriod period={entry.period} />
              </div>
              <p className="mt-1 text-sm text-text-secondary">{entry.degree}</p>
              {gpa && <p className="mt-2 text-sm text-text-secondary">GPA: {gpa}</p>}
              {entry.deansList && entry.deansList.length > 0 && (
                <p className="mt-2 text-sm text-text-secondary">
                  {"Dean's List: "}
                  {entry.deansList.join(", ")}
                </p>
              )}
              {entry.coursework && entry.coursework.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.coursework.map((course) => (
                    <li key={course}>
                      <Tag>{course}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
