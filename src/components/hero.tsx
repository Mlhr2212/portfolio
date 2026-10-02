import Link from "next/link";
import { profile } from "../../content/profile";

// Inline SVG (no icon library). Icons keyed by social label; an unknown label
// falls back to its text rather than a guessed icon.
const socialIcons: Record<string, string> = {
  LinkedIn:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  GitHub:
    "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z",
};

function SocialIcon({ label }: { label: string }) {
  const path = socialIcons[label];
  if (!path) return <>{label}</>;
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

export function Hero() {
  return (
    <section className="grid gap-12 border-b border-border py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-20">
      <div>
        <p className="fade-in-up mb-6 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          Cloud infrastructure · reliability · automation
        </p>
        <h1 className="fade-in-up max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-text-primary sm:text-7xl">
          {profile.heroHeadline}
        </h1>
        <p className="fade-in-up mt-7 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
          {profile.heroSubline}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
        <Link
          href="/resume"
          className={`rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-motion hover:opacity-90 ${focusRing}`}
        >
          View résumé
        </Link>
        <a
          href="#contact"
          className={`rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-motion hover:border-accent hover:text-accent ${focusRing}`}
        >
          Get in touch
        </a>
        </div>
        <ul className="mt-8 flex items-center gap-4">
        {profile.socials.map((social) => (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`text-text-secondary transition-motion hover:text-accent ${focusRing}`}
            >
              <SocialIcon label={social.label} />
            </a>
          </li>
        ))}
        </ul>
      </div>

      <aside className="fade-in-up relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-5 shadow-sm">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-accent/10 blur-2xl" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">
            <span>System profile</span>
            <span className="text-accent">v2026</span>
          </div>
          <dl className="mt-5 space-y-5 text-sm">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">Focus</dt>
              <dd className="mt-1 font-medium text-text-primary">Backend & cloud engineering</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">Location</dt>
              <dd className="mt-1 font-medium text-text-primary">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">Current role</dt>
              <dd className="mt-1 font-medium text-text-primary">DevOps Intern · Aavgo</dd>
            </div>
          </dl>
          <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 font-mono text-[11px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Building systems that recover
          </div>
        </div>
      </aside>
    </section>
  );
}
