import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllPostSlugs, sanityImageUrl } from '../../../src/lib/sanity'
import PortableTextRenderer from '../../../src/components/PortableTextRenderer'
import Navbar from '../../../src/components/Navbar'

// ─── ISR: revalidate every 60 seconds ────────────────────────────────────────
export const revalidate = 60

// ─── SSG: pre-render all known slugs at build time ───────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return (slugs || []).map((slug) => ({ slug }))
}

// ─── Dynamic Metadata (SEO) ──────────────────────────────────────────────────
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Page Component ──────────────────────────────────────────────────────────

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
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Shared Navbar */}
        <Navbar isHomePage={false} />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
          >
            &larr; Back to all posts
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-8 pb-8 border-b border-border">
            <span className="font-medium text-white">{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-text-secondary" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="w-1 h-1 rounded-full bg-text-secondary" />
            <span>{readingTime} min read</span>
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 bg-surface border border-border">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                fill
                priority
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-text-secondary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-primary prose-blockquote:text-text-secondary prose-img:rounded-xl">
            {post.content && <PortableTextRenderer value={post.content} />}
          </div>
        </article>

        {/* Footer */}
        <footer className="border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Ujjaval Parmar
          </div>
        </footer>
      </div>
    </>
  )
}
