// Static/interactive skill-tech chip. Plain <span> when no onClick is given
// (experience/project tag lists, and skills with no matching entry). When
// onClick is given (skills-filter chips) it renders a real <button> with
// aria-pressed so the click-to-filter interaction is keyboard accessible.
const base = "rounded-full border px-2.5 py-1 font-mono text-xs transition-motion";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

export function Tag({
  children,
  active = false,
  onClick,
}: {
  children: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const tone = active
    ? "border-accent bg-accent/10 text-accent"
    : "border-border text-text-secondary";

  if (onClick) {
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={`${base} ${tone} hover:border-accent hover:text-accent ${focusRing}`}
      >
        {children}
      </button>
    );
  }

  return <span className={`${base} ${tone}`}>{children}</span>;
}
