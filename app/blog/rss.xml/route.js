import { getAllPosts } from '../../../src/lib/sanity'

function escapeXml(unsafe = '') {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'
  const posts = await getAllPosts()

  const itemsXml = (posts || [])
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug.current}`
      const title = escapeXml(post.title || '')
      const description = escapeXml(post.metaDescription || '')
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()

      return `\n    <item>\n      <title>${title}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <description>${description}</description>\n      <pubDate>${pubDate}</pubDate>\n    </item>`
    })
    .join('')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ujjaval Parmar Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Insights on DevOps, cloud infrastructure, Kubernetes, CI/CD, and modern software engineering.</description>
    <language>en-us</language>${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
