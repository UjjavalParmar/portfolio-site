export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    host: siteUrl,
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/blog/rss.xml`],
  }
}
