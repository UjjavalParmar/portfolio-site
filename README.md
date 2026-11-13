# Ujjaval Parmar — Portfolio

This is the source for my portfolio at [devopslife.space](https://www.devopslife.space).

I use the site to share my DevOps experience and walk through my work with AWS,
Kubernetes, Terraform, Jenkins, Argo CD, and Helm. Each project page explains the
problem, what I implemented, and how the pieces fit together.

## Built with

- Next.js 15 and React 19
- CSS custom properties and Tailwind CSS
- GitHub for private blog storage and sign-in
- Vercel for hosting and Speed Insights

The site has dark and light themes, a mobile menu, and a downloadable résumé.
The architecture diagrams are simplified views of the projects.

## Run locally

Use a current Node.js LTS release; Node 24 works on Vercel too.

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). The bundled Bitbucket article works
without any blog credentials. For a production build:

```bash
npm run build
npm run start
```

## Set up the writing desk

The editor lives at `/admin`. It uses GitHub sign-in and accepts only the account
whose numeric ID is configured. Drafts and published copies are stored separately
in a private repository. Saving a draft leaves the live article alone.

1. Create a **private** GitHub repository for content, such as
   `UjjavalParmar/portfolio-content`. Include a README so its `main` branch exists.
   Keep this separate from the public portfolio repository.
2. Create a fine-grained GitHub token restricted to that repository, with
   **Contents: read and write**. The editor needs no workflow or administration
   permissions.
3. Register a GitHub **OAuth App** under Settings → Developer settings.
   Set its homepage to your site URL and its callback to
   `https://www.devopslife.space/api/auth/callback/github`.
4. Copy `.env.example` to `.env.local` and fill in the values. Generate the session
   secret with `openssl rand -base64 32`. To find your numeric GitHub ID, run
   `gh api users/UjjavalParmar --jq .id`.
5. Import the existing article before switching production to the private store:

   ```bash
   npm run blog:import
   ```

   This creates a content commit and preserves the original publication date.
   Running it again keeps any existing article and edits.
6. In Vercel → Project Settings → Environment Variables, add the values from
   `.env.local` for **Production**, then redeploy. Keep OAuth secrets and the
   content token as server variables; do not add a `NEXT_PUBLIC_` prefix to them.
   Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the same production origin.
7. Open `/admin` and sign in. If the content repository is empty, the dashboard
   also offers an import button for the Bitbucket article.

For local sign-in, register a separate OAuth app with callback
`http://localhost:3000/api/auth/callback/github` and set `NEXTAUTH_URL` accordingly.
Preview deployments need an OAuth callback registered for their own origin; a
production callback will not sign in on an arbitrary Vercel preview hostname.

The editor writes through the GitHub API, so it does not depend on Vercel's
temporary filesystem. Publish and Unpublish clear the blog caches; public changes
can take up to a minute to appear. After the private store is configured, it is
the source of truth. A storage outage never restores a local copy of an
unpublished article.

## Writing

Use Markdown for headings, lists, links, quotes, and fenced code examples. A code
fence can include a filename after its language. Raw HTML is not rendered.

Save a new draft before uploading images. PNG, JPEG, and WebP uploads are limited
to 2 MB and require alt text. Draft media stays private until a published article
references it. Existing illustrations remain in `public/blog/`.

If another tab changes the same article, the editor rejects the stale save and
keeps your text. Copy any edits you want to keep before reloading the saved
version. Slugs cannot be changed after creation, so existing links stay stable.

## Where things live

- `app/` — pages, admin routes, metadata, sitemap, and RSS feed
- `src/components/` — navigation, homepage sections, and shared components
- `src/components/admin/` — writing desk and article editor
- `src/data/site.js` — profile, experience, projects, and tools
- `src/data/posts/` — the original published article for local preview and import
- `src/index.css` — public site colours, typography, and responsive styles
- `src/lib/` — blog validation, GitHub storage, and authentication
- `public/` — portrait, illustrations, icons, and résumé downloads
- `docs/resume.md` — a text copy of the current résumé

## Checks

```bash
npm test
npm run build
```

Tests cover portfolio links, draft isolation, publication, private repository
checks, edit conflicts, input limits, and image signatures. GitHub writes in
tests use a mocked transport, not a live repository.
