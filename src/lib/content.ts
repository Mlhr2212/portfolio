// Strips literal `[FILL: ...]` placeholder markers left by content-architect.
// Never render an un-stripped string — callers must check for "" after.
export function stripFill(s: string): string {
  return s.replace(/\s*\[FILL[^\]]*\]/g, "").trim();
}
