# Portfolio — Malhar Kansara

Personal portfolio site. Next.js (App Router) + TypeScript (strict) + Tailwind
CSS v4, deployed on Vercel. Content is data-driven: every fact lives in a typed
file under `content/`, so updating the site is editing an array, not JSX.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (also runs the type check)
npm run lint         # eslint
```

The self-checks for the small pure helpers run under Node's native TS stripping,
no test framework:

```bash
node --experimental-strip-types src/lib/content.test.ts
node --experimental-strip-types src/lib/tabs.test.ts
node --experimental-strip-types src/lib/contact.test.ts
```

## Editing content

All copy and data are typed exports under `content/`:

| File | What it holds |
| ---- | ------------- |
| `profile.ts` | name, location, email, socials, hero + about copy |
| `journey.ts` | the timeline milestones |
| `experience.ts` | technical roles (with skill `tags`) |
| `projects.ts` | case-study projects (with `tags` and `links`) |
| `skills.ts` | grouped skill chips |
| `leadership.ts` | campus / operations roles |
| `education.ts` | schools, honors, coursework |

Add a job or project by appending one object to the relevant array. Skill
`tags` on experience/projects must match the labels in `skills.ts` — matching
labels drive the click-to-filter highlight. Outstanding facts to supply are
tracked in `docs/TODO-LEDGER.md`; anything still marked `[FILL]` is hidden at
render, so the site never ships a placeholder.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. `.env*` is
gitignored (except `.env.example`); never commit real keys.

| Var | Purpose | Default if unset |
| --- | ------- | ---------------- |
| `RESEND_API_KEY` | Sends contact-form mail via [Resend](https://resend.com). | none — route returns 500, form falls back to a mailto link |
| `CONTACT_TO_EMAIL` | Inbox that receives messages. | `profile.email` |
| `CONTACT_FROM_EMAIL` | Verified sender address. | `onboarding@resend.dev` (Resend test sender) |
| `NEXT_PUBLIC_SITE_URL` | Deployed origin for canonical URLs, OG cards, sitemap, robots, JSON-LD. | Vercel per-deploy URL, then `http://localhost:3000` |

The contact form works without `RESEND_API_KEY` — it just degrades to a
prefilled mailto link instead of sending. To actually send mail, add the key
and (for a custom `from`) verify a domain in Resend.

## Swapping a résumé PDF

The `/resume` page serves two PDFs from `public/resume/`:

- `public/resume/technical.pdf` — the "Technical" tab
- `public/resume/campus-leadership.pdf` — the "Campus & Leadership" tab

Drop replacement files at those exact paths. No code change needed. Until a file
exists the tab shows a download card with a short "not uploaded yet" message
instead of a blank frame.

**Before adding a PDF, strip the phone number from it.** The site must not
publish a phone number anywhere, including inside the committed PDFs.

To rename or add résumé tabs, edit the résumé array in
`src/app/resume/page.tsx`.

## Deploying (Vercel)

1. Push the repo to GitHub and import it in Vercel (framework preset: Next.js —
   detected automatically).
2. Set the environment variables above in the Vercel project settings. At
   minimum set `NEXT_PUBLIC_SITE_URL` to your production domain so OG cards,
   sitemap, and canonical URLs are correct.
3. Deploy. `sitemap.xml` and `robots.txt` are generated automatically at
   `/sitemap.xml` and `/robots.txt`.

Do not commit `.env` / `.env.local`. Ship only `.env.example`.
