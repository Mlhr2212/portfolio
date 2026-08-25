// Roving-tabindex arrow key math for a horizontal tab list (WAI-ARIA APG
// "manual activation" tab pattern: arrows move focus, Enter/Space on the
// focused tab activates it via the native <button> click). Pure so it runs
// outside React and is trivially testable.
export type TabKey = "ArrowLeft" | "ArrowRight" | "Home" | "End";

const TAB_KEYS: readonly TabKey[] = ["ArrowLeft", "ArrowRight", "Home", "End"];

export function isTabKey(key: string): key is TabKey {
  return (TAB_KEYS as readonly string[]).includes(key);
}

export function nextTabIndex(key: TabKey, current: number, count: number): number {
  switch (key) {
    case "ArrowRight":
      return (current + 1) % count;
    case "ArrowLeft":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
  }
}
