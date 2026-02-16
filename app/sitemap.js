import { getAllPosts } from '../src/lib/sanity'

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic blog post pages
  let blogPages = []
  try {
    const posts = await getAllPosts()
    blogPages = (posts || []).map((post) => ({
      url: `${siteUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch (error) {
    // If Sanity is unreachable, still generate sitemap with static pages
    console.warn('Could not fetch blog posts for sitemap:', error.message)
  }

  return [...staticPages, ...blogPages]
}
