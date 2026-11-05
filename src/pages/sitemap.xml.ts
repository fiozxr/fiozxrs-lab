import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("https://fiozxr.github.io");
  const base = import.meta.env.BASE_URL.replace(/^\//, "");
  const [articles, projects] = await Promise.all([
    getCollection("articles", ({ data }) => !data.draft),
    getCollection("projects", ({ data }) => !data.draft)
  ]);
  const paths = ["", "articles/", "projects/", "tutorials/", "about/", ...articles.map((entry) => `articles/${entry.slug}/`), ...projects.map((entry) => `projects/${entry.slug}/`)];
  const urls = paths.map((path) => `<url><loc>${escapeXml(new URL(`${base}${path}`, origin).href)}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
