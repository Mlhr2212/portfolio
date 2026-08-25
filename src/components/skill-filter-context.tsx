"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SkillFilterValue {
  activeSkill: string | null;
  toggleSkill: (skill: string) => void;
}

const SkillFilterContext = createContext<SkillFilterValue | null>(null);

// Wraps Experience + Projects + Skills. One skill can be "active" at a time;
// clicking its chip again, or pressing Escape, clears it. State only —
// no route change, no persistence (no localStorage per Section G.3).
export function SkillFilterProvider({ children }: { children: ReactNode }) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const toggleSkill = useCallback((skill: string) => {
    setActiveSkill((current) => (current === skill ? null : skill));
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveSkill(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SkillFilterContext.Provider value={{ activeSkill, toggleSkill }}>
      {children}
    </SkillFilterContext.Provider>
  );
}

export function useSkillFilter(): SkillFilterValue {
  const context = useContext(SkillFilterContext);
  if (!context) {
    throw new Error("useSkillFilter must be used within a SkillFilterProvider");
  }
  return context;
}
