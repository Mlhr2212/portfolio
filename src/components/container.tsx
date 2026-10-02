import type { ReactNode } from "react";

// Shared horizontal rhythm for header/main/footer so later sections dropped
// into <main> automatically line up with the nav and footer.
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-6xl px-6 sm:px-8 ${className}`}>{children}</div>;
}
