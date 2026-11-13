import { getAllPosts } from '../src/lib/blog-store.server'
import { projects } from '../src/data/site'

export const revalidate = 60

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devopslife.space'

  const posts = await getAllPosts()

  const latestPostDate = posts?.[0]?.publishedAt ? new Date(posts[0].publishedAt) : new Date()

  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const blogPages = (posts || []).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const projectPages = projects.map(({ slug }) => ({
    url: `${siteUrl}/work/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}
