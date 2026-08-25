import { Container } from "@/components/container";
import { profile } from "../../content/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-2 py-10 text-sm text-text-secondary">
        <p className="text-text-primary">{profile.name}</p>
        <p>{profile.location}</p>
        <a
          href={`mailto:${profile.email}`}
          className="w-fit transition-motion hover:text-accent"
        >
          {profile.email}
        </a>
        {profile.socials.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit transition-motion hover:text-accent"
          >
            {social.label}
          </a>
        ))}
        <p className="mt-4 text-xs">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
