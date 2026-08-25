import { profile } from "../../content/profile";

export function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="font-mono text-sm uppercase tracking-wide text-accent">
        About
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
        {profile.about}
      </p>
    </section>
  );
}
