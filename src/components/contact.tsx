"use client";

import { useState } from "react";
import { validateContact, type ContactErrors } from "@/lib/contact";
import { profile } from "../../content/profile";

type Status = "idle" | "submitting" | "success" | "error";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const inputStyles =
  `mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text-primary transition-motion placeholder:text-text-secondary ${focusRing}`;

const linkedIn = profile.socials.find((social) => social.label === "LinkedIn");

// No native <form> submit on purpose (spec: onClick handler only) — avoids a
// default GET navigation on Enter and keeps every state transition explicit.
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Stamped once on mount — sent back to the server so it can reject
  // submissions that arrive suspiciously fast (see src/lib/contact.ts).
  // Lazy useState initializer (not a bare Date.now() in the render body) so
  // the impure call only ever runs once, on mount.
  const [renderedAt] = useState(() => Date.now());

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    "Portfolio contact",
  )}&body=${encodeURIComponent(message ? `${message}\n\n— ${name}` : "")}`;

  async function handleSubmit() {
    const fields = { name, email, message };
    const fieldErrors = validateContact(fields);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("submitting");
    setErrorMessage("");

    // Guard against a fetch that never resolves — the button must never
    // spin forever.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          honeypot,
          renderedAt,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <section id="contact" className="py-16">
      <h2 className="font-mono text-sm uppercase tracking-wide text-accent">Contact</h2>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_260px]">
        <div className="fade-in-up">
          {status === "success" ? (
            <p
              role="status"
              className="rounded-lg border border-border bg-surface p-6 text-text-primary"
            >
              Thanks — I&apos;ll reply to the email you gave, usually within a few days.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-text-primary">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={inputStyles}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-xs text-accent-warm">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={inputStyles}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-xs text-accent-warm">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-text-primary">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={inputStyles}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1 text-xs text-accent-warm">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot — offscreen (not display:none, so bots that only
                  check computed visibility still fill it), aria-hidden and
                  unreachable by keyboard for real users. */}
              <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  className="rounded-md border border-accent-warm bg-accent-warm/10 p-4 text-sm text-text-primary"
                >
                  <p>{errorMessage}</p>
                  <p className="mt-2">
                    You can also email me directly:{" "}
                    <a href={mailtoHref} className={`underline hover:text-accent ${focusRing}`}>
                      {profile.email}
                    </a>
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "submitting"}
                className={`w-fit rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-motion hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </div>
          )}
        </div>

        <aside className="flex h-fit flex-col gap-3 rounded-lg border border-border bg-surface p-6 text-sm">
          <p className="font-mono text-sm uppercase tracking-wide text-accent">Direct</p>
          <a
            href={`mailto:${profile.email}`}
            className={`w-fit text-text-secondary transition-motion hover:text-accent ${focusRing}`}
          >
            {profile.email}
          </a>
          {linkedIn && (
            <a
              href={linkedIn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-fit text-text-secondary transition-motion hover:text-accent ${focusRing}`}
            >
              {linkedIn.label}
            </a>
          )}
        </aside>
      </div>
    </section>
  );
}
