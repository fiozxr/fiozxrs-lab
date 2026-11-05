import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const xml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection("articles", ({ data }) => !data.draft);
  const origin = site ?? new URL("https://fiozxr.github.io");
  const base = import.meta.env.BASE_URL.replace(/^\//, "");
  const items = articles
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((entry) => {
      const url = new URL(`${base}articles/${entry.slug}/`, origin).href;
      return `<item><title>${xml(entry.data.title)}</title><description>${xml(entry.data.description)}</description><link>${xml(url)}</link><guid>${xml(url)}</guid><pubDate>${entry.data.pubDate.toUTCString()}</pubDate></item>`;
    }).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>FIOZXR'S LAB</title><description>An independent technical publication.</description><link>${xml(origin.href)}</link>${items}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
