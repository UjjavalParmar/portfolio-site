# Ujjaval's Portfolio

> Because even DevOps engineers need a place to `kubectl describe` themselves.

**Live:** [ujjavaldeploys.in](https://ujjavaldeploys.in)

---

## What's This?

My personal portfolio - a production-grade website where I showcase my DevOps journey, projects, and the chaos I've automated away.

## Tech Stack

```yaml
apiVersion: portfolio/v1
kind: Website
spec:
  framework: Next.js 14
  styling: Tailwind CSS
  animations: Framer Motion
  cms: Sanity
  deployment: Vercel
  uptime: 99.9% (hopefully)
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
├── app/          # Next.js app router
├── src/
│   ├── components/   # UI components
│   └── lib/          # Utilities & Sanity client
├── public/       # Static assets
└── sanity/       # CMS config
```

## Environment Variables

```bash
# Create .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

---

**Built with coffee, Kubernetes knowledge, and zero downtime deployments.**

*— Ujjaval Parmar | DevOps Engineer*
