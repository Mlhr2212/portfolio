// Absolute base URL for metadata, sitemap, robots, and JSON-LD. Set
// NEXT_PUBLIC_SITE_URL to your deployed origin (e.g. https://yourdomain.com).
// Falls back to the project's production domain (stable across deploys, unlike
// VERCEL_URL, which is per-deploy and breaks link previews), then localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
