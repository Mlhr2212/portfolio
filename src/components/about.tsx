import { profile } from "../../content/profile";

export function About() {
  return (
    <section id="about" className="section-rule py-20 sm:py-24">
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        About
      </h2>
      <p className="mt-6 max-w-3xl text-xl leading-9 tracking-[-0.01em] text-text-secondary">
        {profile.about}
      </p>
    </section>
  );
}
