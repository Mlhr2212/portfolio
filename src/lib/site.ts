// Absolute base URL for metadata, sitemap, robots, and JSON-LD. Set
// NEXT_PUBLIC_SITE_URL to your deployed origin (e.g. https://yourdomain.com).
// Falls back to Vercel's per-deploy URL, then localhost for `npm run dev`.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
