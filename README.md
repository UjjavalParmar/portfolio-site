# Ujjaval's Portfolio

> Because even DevOps engineers need a place to `kubectl describe` themselves.

**Live:** [devopslife.space](https://www.devopslife.space)

---

## What's This?

My personal portfolio - a production-grade website where I showcase my DevOps journey, projects, and the chaos I've automated away.

## Tech Stack

```yaml
apiVersion: portfolio/v1
kind: Website
spec:
  framework: Next.js 14 (App Router)
  styling: CSS custom properties + Tailwind
  fonts: Anton / Public Sans / IBM Plex Mono (self-hosted by next/font)
  themes: dark + light, persisted to localStorage
  cms: Sanity
  deployment: Vercel
  monitoring: Vercel Speed Insights
```

## Quick Start

```bash
# Clone it
git clone https://github.com/UjjavalParmar/portfolio-site.git
cd portfolio-site

# Install dependencies (no YAML hell here)
npm install

# Run locally
npm run dev

# Build for prod
npm run build
```

## Project Structure

```
.
├── app/                    # Routes, metadata, sitemap, robots, RSS
├── src/
│   ├── components/
│   │   ├── home/           # Homepage sections
│   │   ├── Nav.jsx         # Sticky nav, theme toggle, mobile menu
│   │   └── Footer.jsx
│   ├── data/site.js        # Projects, steps, stack, profile — content as data
│   ├── index.css           # Design tokens + the whole design system
│   └── lib/                # Sanity client
├── public/                 # Static assets
└── sanity/                 # CMS config
```

## Design System

Every colour, type role and spacing decision lives in `src/index.css`. The two
themes are token sets on `:root` and `[data-theme="light"]`; an inline script in
the document head resolves the stored choice before first paint, so there is no
flash of the wrong theme. Content for the homepage sections is data in
`src/data/site.js`, not hand-written markup.

The visual direction pairs black and lime with oversized condensed headings,
a fine grid, asymmetric project placement, and off-white experience panels.
Original SVG infrastructure illustrations live in `InfrastructureArt.jsx`;
the project walkthroughs retain semantic architecture flows. Illustrations are
conceptual views, not production screenshots. The short entrance animation
respects reduced-motion settings. Both themes, keyboard controls, and the
mobile navigation remain supported.

## Environment Variables

```bash
# Create .env.local
NEXT_PUBLIC_SITE_URL=https://www.devopslife.space
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

---

**Built with chai and Kubernetes knowledge.**

Portfolio content and project walkthroughs live in `src/data/site.js`. Project
pages at `/work/[slug]` include responsive conceptual architecture diagrams.
The resume downloads are in `public/`, with editable copy in `docs/resume.md`.
Research sources and methodology are in `docs/portfolio-research.md`.

Run `node --test tests/portfolio.test.mjs` to check project destinations, resume
availability, and the removal of unsupported performance claims.

*— Ujjaval Parmar | DevOps Engineer*
