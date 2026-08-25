// Contact-form validation, spam checks, and rate-limit logic. Pure and
// framework-free so both the client component and the API route import the
// same rules (never trust the client alone) and so it's testable without
// spinning up Next.

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 5000;

export const MIN_TIME_ON_FORM_MS = 3000;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();

  if (!name) errors.name = "Name is required.";
  else if (name.length > NAME_MAX) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (email.length > EMAIL_MAX) errors.email = "Email is too long.";

  if (!message) errors.message = "Message is required.";
  else if (message.length > MESSAGE_MAX) errors.message = "Message is too long.";

  return errors;
}

export function isContactValid(fields: ContactFields): boolean {
  return Object.keys(validateContact(fields)).length === 0;
}

// Honeypot: a field real users never see or fill (offscreen, aria-hidden,
// tabindex=-1 in the UI). Any non-empty value means it was a bot.
export function isHoneypotFilled(honeypot: string): boolean {
  return honeypot.trim().length > 0;
}

// Min time-on-form: the client stamps its render time and sends it back;
// bots that submit within a couple seconds of loading the page get rejected.
export function isTooFast(
  renderedAt: number,
  submittedAt: number,
  minMs: number = MIN_TIME_ON_FORM_MS,
): boolean {
  return submittedAt - renderedAt < minMs;
}

// ponytail: in-memory per-IP rate limit — resets on cold start and isn't
// shared across serverless instances, so it's a soft limit at best. Fine for
// a personal site's traffic; swap for a durable store (e.g. Upstash Redis)
// if abuse ever becomes real.
export function checkRateLimit(
  timestamps: number[],
  now: number,
  windowMs: number,
  max: number,
): { allowed: boolean; timestamps: number[] } {
  const recent = timestamps.filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    return { allowed: false, timestamps: recent };
  }
  recent.push(now);
  return { allowed: true, timestamps: recent };
}
