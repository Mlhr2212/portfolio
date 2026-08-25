"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Server/pre-hydration default is "not desktop" so nothing that fetches a
// PDF (an <object> embed) ever enters the DOM until the client confirms a
// >=768px viewport. Same external-store pattern as theme-toggle.tsx, used
// here instead of matchMedia + useEffect because useSyncExternalStore
// reconciles the real value before paint, no listener-setup flash.
function getServerSnapshot() {
  return false;
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
