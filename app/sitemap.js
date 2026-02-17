import { getAllPosts } from '../src/lib/sanity'

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'

  // Dynamic blog post pages
  let posts = []
  try {
    posts = await getAllPosts()
  } catch (error) {
    // If Sanity is unreachable, still generate sitemap with static pages
    console.warn('Could not fetch blog posts for sitemap:', error.message)
  }

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
    url: `${siteUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
