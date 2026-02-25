import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllPostSlugs, sanityImageUrl } from '../../../src/lib/sanity'
import PortableTextRenderer from '../../../src/components/PortableTextRenderer'
import Navbar from '../../../src/components/Navbar'
import Footer from '../../../src/components/Footer'
import {
  BlogPageWrapper,
  BlogArticleWrapper,
  AnimatedElement,
  FeaturedImageWrapper,
  ContentWrapper,
} from '../../../src/components/BlogWrapper'
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookOpen } from 'lucide-react'

// ISR: revalidate every 60 seconds
export const revalidate = 60

// SSG: pre-render all known slugs at build time
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return (slugs || []).map((slug) => ({ slug }))
}

// Dynamic Metadata (SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'
  const imageUrl = sanityImageUrl(post.featuredImage)
  const canonicalUrl = `${siteUrl}/blog/${post.slug.current}`

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.featuredImage?.alt || post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      ...(imageUrl && { images: [imageUrl] }),
    },
  }
}

// Helpers
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function estimateReadingTime(blocks) {
  if (!blocks) return 1
  const text = blocks
    .filter((b) => b._type === 'block')
    .map((b) => b.children?.map((c) => c.text).join('') || '')
    .join(' ')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// Page Component
export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjavaldeploys.in'
  const imageUrl = sanityImageUrl(post.featuredImage)
  const readingTime = estimateReadingTime(post.content)

  // JSON-LD Structured Data (schema.org BlogPosting)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${siteUrl}/blog/${post.slug.current}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug.current}`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Ujjaval Parmar',
      url: siteUrl,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    ...(post.tags && { keywords: post.tags.join(', ') }),
  }

  return (
    <BlogPageWrapper>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <BlogArticleWrapper>
          {/* Back link */}
          <AnimatedElement>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-border text-sm text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to all posts
            </Link>
          </AnimatedElement>

          {/* Article Header */}
          <header className="mb-10">
            {/* Tags */}
            <AnimatedElement delay={0.1}>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, tagIndex) => {
                    const tagStyles = [
                      'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30',
                      'bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary border-secondary/30',
                      'bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30',
                    ]
                    return (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide border backdrop-blur-sm ${tagStyles[tagIndex % 3]}`}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    )
                  })}
                </div>
              )}
            </AnimatedElement>

            {/* Title */}
            <AnimatedElement delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                {post.title}
              </h1>
            </AnimatedElement>

            {/* Meta row */}
            <AnimatedElement delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-white">{post.author}</span>
                    <span className="block text-xs text-text-secondary">Author</span>
                  </div>
                </div>

                <div className="w-px h-10 bg-border hidden sm:block" />

                {/* Date */}
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar className="w-4 h-4 text-primary" />
                  <time dateTime={post.publishedAt} className="text-sm">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>

                <div className="w-px h-10 bg-border hidden sm:block" />

                {/* Reading Time */}
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">{readingTime} min read</span>
                </div>
              </div>
            </AnimatedElement>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <FeaturedImageWrapper>
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 bg-surface border border-border shadow-2xl shadow-black/20">
                <Image
                  src={imageUrl}
                  alt={post.featuredImage?.alt || post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </FeaturedImageWrapper>
          )}

          {/* Content */}
          <ContentWrapper>
            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
              prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-surface prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-border
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface/50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-text-secondary prose-blockquote:italic
              prose-img:rounded-xl prose-img:shadow-xl prose-img:border prose-img:border-border
              prose-ul:text-text-secondary prose-ol:text-text-secondary
              prose-li:marker:text-primary
              prose-hr:border-border prose-hr:my-12
              prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-lg"
            >
              {post.content && <PortableTextRenderer value={post.content} />}
            </div>
          </ContentWrapper>

          {/* Article Footer */}
          <AnimatedElement delay={0.5}>
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Tags Summary */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-text-secondary">Topics:</span>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => {
                        const tagStyles = [
                          'bg-gradient-to-r from-primary/15 to-secondary/15 text-primary/90 border-primary/20',
                          'bg-gradient-to-r from-secondary/15 to-accent/15 text-secondary/90 border-secondary/20',
                          'bg-gradient-to-r from-accent/15 to-primary/15 text-accent/90 border-accent/20',
                        ]
                        return (
                          <span
                            key={tag}
                            className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wide border backdrop-blur-sm ${tagStyles[tagIndex % 3]}`}
                          >
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Back to Blog */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                >
                  <BookOpen className="w-4 h-4" />
                  Read More Articles
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </BlogArticleWrapper>
      </article>

      {/* Footer */}
      <Footer />
    </BlogPageWrapper>
  )
}
