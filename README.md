# Ujjaval Parmar — Portfolio

This is the source for my portfolio at [devopslife.space](https://www.devopslife.space).

I use the site to share my DevOps experience and walk through some of my work with
AWS, Kubernetes, Terraform, Jenkins, Argo CD, and Helm. Each project page explains
the problem, what I implemented, and how the pieces fit together.

## Built with

- Next.js 14 and React 18
- CSS custom properties and Tailwind CSS
- Sanity for blog content
- Vercel for hosting and Speed Insights

The site has dark and light themes, a mobile menu, and a downloadable résumé.
The architecture diagrams are simplified views of the projects.

## Run locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm run start
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the site's public URL.

To connect the blog, add `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET`. Without a Sanity project ID, the site runs with an
empty blog. The available settings are listed in `.env.example`.

## Where things live

- `app/` — pages, project routes, metadata, sitemap, and RSS feed
- `src/components/` — navigation, homepage sections, and shared components
- `src/data/site.js` — profile, experience, projects, and tools
- `src/index.css` — colours, typography, layout, and responsive styles
- `src/lib/` — Sanity queries and image helpers
- `public/` — portrait, icons, and résumé downloads
- `sanity/` — blog schema and CMS configuration
- `docs/resume.md` — a text copy of the current résumé

## Checks

```bash
node tests/portfolio.test.mjs
npm run build
```

The tests check project links, résumé availability, and the claims used in the
portfolio copy.
