import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, sanityImageUrl } from '../../src/lib/sanity'
import Navbar from '../../src/components/Navbar'
import Footer from '../../src/components/Footer'
import {
  BlogPageWrapper,
  BlogHeader,
  BlogGrid,
  BlogCard,
} from '../../src/components/BlogWrapper'
import { Calendar, Clock, ArrowRight, BookOpen, User } from 'lucide-react'

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
    month: 'short',
    day: 'numeric',
  })
}

function estimateReadingTime(description) {
  if (!description) return '3 min'
  const words = description.split(/\s+/).length
  return `${Math.max(2, Math.ceil(words / 50))} min`
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
    <BlogPageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      {/* Navbar */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Page Header */}
        <BlogHeader
          badge="Blog"
          title="Thoughts &"
          highlight="Insights"
          description="Writing about DevOps, cloud infrastructure, Kubernetes, and lessons learned building production systems at scale."
        />

        {/* Stats Bar */}
        {posts && posts.length > 0 && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border">
              <div className="flex items-center gap-2 text-text-secondary">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm">{posts.length} Articles</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="text-sm">DevOps & Cloud</span>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <BlogGrid>
            {posts.map((post, index) => {
              const imageUrl = sanityImageUrl(post.featuredImage)

              return (
                <BlogCard key={post._id} index={index}>
                  <Link href={`/blog/${post.slug.current}`} className="group block h-full">
                    <article className="h-full rounded-2xl bg-surface/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10">
                      {/* Featured Image */}
                      {imageUrl ? (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.featuredImage?.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                          
                          {/* Featured Badge */}
                          {index === 0 && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold shadow-lg">
                                Latest
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-primary/50" />
                          </div>
                          {index === 0 && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold shadow-lg">
                                Latest
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6">
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => {
                              // Different gradient styles for visual variety
                              const tagStyles = [
                                'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 hover:from-primary/30 hover:to-secondary/30',
                                'bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary border-secondary/30 hover:from-secondary/30 hover:to-accent/30',
                                'bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30 hover:from-accent/30 hover:to-primary/30',
                              ]
                              return (
                                <span
                                  key={tag}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide border backdrop-blur-sm transition-all duration-300 ${tagStyles[tagIndex % 3]}`}
                                >
                                  {tag}
                                </span>
                              )
                            })}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300 line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Description */}
                        {post.metaDescription && (
                          <p className="text-text-secondary text-sm mb-5 line-clamp-2 leading-relaxed">
                            {post.metaDescription}
                          </p>
                        )}

                        {/* Meta Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-4 text-xs text-text-secondary">
                            <div className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-primary/70" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-primary/70" />
                              <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                              </time>
                            </div>
                          </div>
                          
                          {/* Read More Arrow */}
                          <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs">Read</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </BlogCard>
              )
            })}
          </BlogGrid>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border mb-6">
              <BookOpen className="w-10 h-10 text-primary/50" />
            </div>
            <p className="text-text-secondary text-lg mb-2">No posts yet</p>
            <p className="text-text-secondary/70 text-sm">Check back soon for new content!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </BlogPageWrapper>
  )
}
