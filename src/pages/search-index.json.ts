import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const [articles, projects] = await Promise.all([
    getCollection("articles", ({ data }) => !data.draft),
    getCollection("projects", ({ data }) => !data.draft)
  ]);

  const records = [
    ...articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      category: entry.data.category,
      tags: entry.data.tags,
      kind: "ARTICLE",
      url: `/articles/${entry.slug}/`
    })),
    ...projects.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      category: entry.data.category,
      tags: entry.data.tags,
      kind: "PROJECT",
      url: `/projects/${entry.slug}/`
    }))
  ];

  return new Response(JSON.stringify(records), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
};
