"use client";

import type { ReactNode } from "react";
import { useSkillFilter } from "@/components/skill-filter-context";

// Wraps one experience entry or project card (server-rendered, passed as
// children). Ring/opacity only — no border-width or size change, so
// toggling the filter never shifts layout.
export function HighlightTarget({ tags, children }: { tags: string[]; children: ReactNode }) {
  const { activeSkill } = useSkillFilter();
  const isMatch = activeSkill !== null && tags.includes(activeSkill);
  const isDimmed = activeSkill !== null && !isMatch;

  const state = isMatch ? "ring-2 ring-accent" : isDimmed ? "opacity-50" : "";

  return <div className={`transition-motion rounded-lg ${state}`}>{children}</div>;
}
