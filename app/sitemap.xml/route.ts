// app/sitemap.xml/route.ts
import { GUIDES } from "@/lib/guides";

export async function GET() {
  const base = "https://yourdomain.com";
  const staticUrls = ["/", "/guides", "/privacy", "/terms", "/contact"];
  const guideUrls = (GUIDES || []).map(g => `/guides/${g.slug}`);

  const urls = [...staticUrls, ...guideUrls]
    .map(p => `<url><loc>${base}${p}</loc></url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
