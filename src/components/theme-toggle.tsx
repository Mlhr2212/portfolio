"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

// Session-only dark mode toggle. No localStorage/sessionStorage: state lives
// only in the `dark` class on <html> (set pre-paint by the inline script in
// layout.tsx) and resets to prefers-color-scheme on the next full reload.
// Reads that class as external state so it stays correct even though the
// class is set outside React (the no-flash script), avoiding a
// setState-in-effect hydration mismatch.
export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    document.documentElement.classList.toggle("dark", !isDark);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="transition-motion rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-primary hover:text-accent"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
