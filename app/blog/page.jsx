import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, sanityImageUrl } from '../../src/lib/sanity'
import Navbar from '../../src/components/Navbar'

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata = {
  title: 'Blog',
  description:
    'Insights on DevOps, cloud infrastructure, Kubernetes, CI/CD, and modern software engineering by Ujjaval Parmar.',
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
  openGraph: {
    title: 'Blog | Ujjaval Parmar',
    description:
      'Insights on DevOps, cloud infrastructure, Kubernetes, CI/CD, and modern software engineering.',
    url: '/blog',
  },
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Ujjaval Parmar Blog',
    url: `${siteUrl}/blog`,
    description:
      'Insights on DevOps, cloud infrastructure, Kubernetes, CI/CD, and modern software engineering.',
    ...(posts?.length
      ? {
          blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: `${siteUrl}/blog/${post.slug.current}`,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author,
            },
          })),
        }
      : {}),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      {/* Shared Navbar */}
      <Navbar isHomePage={false} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Thoughts &amp; <span className="text-gradient">Insights</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            Writing about DevOps, cloud infrastructure, and lessons learned building production
            systems.
          </p>
        </div>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => {
              const imageUrl = sanityImageUrl(post.featuredImage)

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group"
                >
                  <article className="h-full rounded-2xl bg-surface/50 border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    {/* Featured Image */}
                    {imageUrl && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={post.featuredImage?.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Description */}
                      {post.metaDescription && (
                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                          {post.metaDescription}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-text-secondary">
                        <span>{post.author}</span>
                        <span className="w-1 h-1 rounded-full bg-text-secondary" />
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No posts yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  )
}
