"use client";

import { skills } from "../../content/skills";
import { experience } from "../../content/experience";
import { projects } from "../../content/projects";
import { Tag } from "@/components/tag";
import { useSkillFilter } from "@/components/skill-filter-context";

// Skills used as a tag on at least one experience or project entry. A chip
// only becomes an interactive filter button if clicking it can highlight
// something — everything else (EC2, S3, Java, ...) stays a plain label.
const usedTags = new Set([
  ...experience.flatMap((entry) => entry.tags),
  ...projects.items.flatMap((project) => project.tags),
]);

export function Skills() {
  const { activeSkill, toggleSkill } = useSkillFilter();

  return (
    <section id="skills" className="section-rule py-20 sm:py-24">
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Skills</h2>

      <div className="mt-10 flex flex-col gap-6">
        {skills.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-text-secondary">
              {group.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  {usedTags.has(skill) ? (
                    <Tag active={activeSkill === skill} onClick={() => toggleSkill(skill)}>
                      {skill}
                    </Tag>
                  ) : (
                    <Tag>{skill}</Tag>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
