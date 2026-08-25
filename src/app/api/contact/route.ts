import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  isHoneypotFilled,
  isTooFast,
  validateContact,
} from "@/lib/contact";
import { profile } from "../../../../content/profile";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

// ponytail: in-memory Map — see checkRateLimit in src/lib/contact.ts for the
// tradeoff and upgrade path.
const rateLimitStore = new Map<string, number[]>();

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  honeypot?: unknown;
  renderedAt?: unknown;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();

  const existing = rateLimitStore.get(ip) ?? [];
  const rate = checkRateLimit(existing, now, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX);
  rateLimitStore.set(ip, rate.timestamps);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill every field, including this hidden one. Fake a
  // success so they don't learn to leave it blank; nothing is sent.
  if (isHoneypotFilled(asString(payload.honeypot))) {
    return NextResponse.json({ ok: true });
  }

  const renderedAt = payload.renderedAt;
  if (typeof renderedAt !== "number" || isTooFast(renderedAt, now)) {
    return NextResponse.json(
      { error: "Please take a moment before submitting." },
      { status: 400 },
    );
  }

  const fields = {
    name: asString(payload.name),
    email: asString(payload.email),
    message: asString(payload.message),
  };
  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form isn't configured yet — email me directly instead." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: fields.email.trim(),
        subject: `Portfolio contact from ${fields.name.trim()}`,
        text: fields.message.trim(),
      }),
    });

    if (!resendResponse.ok) {
      return NextResponse.json(
        { error: "Failed to send message — email me directly instead." },
        { status: 500 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to send message — email me directly instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
