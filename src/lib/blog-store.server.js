import 'server-only'
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache'
import bundled from '../data/posts/bitbucket-ssh-migration.json'
import { publicPost } from './blog-model.js'
import { createGitHubStore } from './github-blog.js'

export function blogConfigured() {
  return Boolean(process.env.BLOG_GITHUB_REPO || process.env.BLOG_GITHUB_TOKEN)
}

export function getBlogStore() {
  return createGitHubStore({ repo: process.env.BLOG_GITHUB_REPO, token: process.env.BLOG_GITHUB_TOKEN, branch: process.env.BLOG_GITHUB_BRANCH || 'main' })
}

export async function getAllPosts() {
  if (!blogConfigured()) return [publicPost(bundled)]
  const read = unstable_cache(async () => {
    const records = await getBlogStore().listPosts()
    return records.map(record => publicPost(record.document)).filter(Boolean)
      .sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
  }, ['published-blog', process.env.BLOG_GITHUB_REPO || '', process.env.BLOG_GITHUB_BRANCH || 'main'], { revalidate: 60, tags: ['blog-content'] })
  return read()
}

export async function getPostBySlug(slug) { return (await getAllPosts()).find(post => post.slug === slug) || null }
export async function getAllPostSlugs() { return (await getAllPosts()).map(post => post.slug) }

export function invalidateBlog(slug) {
  revalidateTag('blog-content')
  for (const path of ['/blog', '/blog/' + slug, '/blog/rss.xml', '/sitemap.xml']) revalidatePath(path)
}
