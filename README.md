# FIOZXR'S LAB

An independent technical publication documenting systems, software, AI, security, hardware and engineering experiments.

## Stack

- Astro for static site generation and routing
- Markdown content collections for articles and projects
- Tailwind CSS 4 tooling, with a custom editorial design system
- GitHub Actions and GitHub Pages for deployment
- Adaptive light/dark theme, client-side search and RSS feed

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Add an article

Create a Markdown file in `src/content/articles/`, for example `my-first-article.md`:

```md
---
title: "A clear, specific title"
description: "A short summary of what the reader will learn."
pubDate: 2026-11-05
category: "Systems & Linux"
tags: ["Linux", "Guide"]
featured: false
draft: true
---

## Start here

Write the article in Markdown.
```

Set `draft: false` when the article is ready to publish.

## Add a project

Create a Markdown file in `src/content/projects/` using the same frontmatter fields. Optional fields include `status` and `repo`.

## GitHub Pages

The current configuration assumes the project URL:

`https://fiozxr.github.io/fiozxrs-lab/`

The deployment workflow is in `.github/workflows/deploy.yml`.

After the first push:
1. Open the repository's **Settings → Pages**.
2. Set the source to **GitHub Actions**.
3. Open the **Actions** tab and wait for the deployment workflow to finish.

For a custom subdomain, add the exact domain to the repository's Pages settings and create a `CNAME` file containing that hostname. Then change `SITE_URL` and `SITE_BASE` in the build configuration to the custom domain and `/` respectively. Do not add a guessed domain.

## Content rules

- Only publish work that has been checked.
- Distinguish tested results from assumptions.
- Credit external sources.
- Keep drafts out of the public site.
