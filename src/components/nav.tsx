import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "../../content/profile";

// Root-relative fragments (`/#x`, not `#x`) so the nav works from subpages like
// /resume too — on the home page these still scroll to the section.
const sections = [
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const linkStyles =
  "text-text-secondary transition-motion hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/95 backdrop-blur-sm">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-semibold text-text-primary transition-motion hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]" aria-hidden="true" />
          {profile.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.href}>
                <a href={section.href} className={linkStyles}>
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
