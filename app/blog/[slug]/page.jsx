import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllPostSlugs } from '../../../src/lib/blog-store.server'
import { safeImageSrc } from '../../../src/lib/blog-model'
import { estimateReadingTime } from '../../../src/lib/blog'
import BlogContent from '../../../src/components/BlogContent'
import Nav from '../../../src/components/Nav'
import Footer from '../../../src/components/Footer'
import ArrowIcon from '../../../src/components/ArrowIcon'

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devopslife.space'
  const imageUrl = safeImageSrc(post.featuredImage?.src)
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`

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
            width: post.featuredImage?.width || 1200,
            height: post.featuredImage?.height || 630,
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
    timeZone: 'Asia/Kolkata',
  })
}

// Page Component
export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devopslife.space'
  const imageUrl = safeImageSrc(post.featuredImage?.src)
  const readingTime = estimateReadingTime(post.body)

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
    dateModified: post.updatedAt,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
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

  const metaRow = [
    post.author,
    formatDate(post.publishedAt),
    `${readingTime} min read`,
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <Nav />

      <main id="main">
        <article className="shell section">
          <div className="article-shell" style={{ marginInline: 'auto' }}>
          <Link href="/blog" className="link-mono">
            ← Back to all posts
          </Link>

          <header style={{ marginTop: '40px' }}>
            {post.tags?.length > 0 && (
              <ul
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '24px',
                  listStyle: 'none',
                }}
              >
                {post.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <h1 className="h1" style={{ margin: '0 0 28px', fontSize: 'clamp(40px, 5vw, 72px)' }}>
              {post.title}
            </h1>
            {post.metaDescription && <p className="lead" style={{ marginBottom: '24px' }}>{post.metaDescription}</p>}

            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                listStyle: 'none',
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
                padding: '14px 0',
              }}
            >
              {metaRow.map((item, i) => (
                <li key={item} className="meta">
                  {i === 1 ? (
                    <time dateTime={post.publishedAt}>{item}</time>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </header>

          {imageUrl && (
            <div
              style={{
                position: 'relative',
                aspectRatio: '16 / 9',
                border: '1px solid var(--line)',
                overflow: 'hidden',
                margin: '40px 0',
              }}
            >
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                fill
                          unoptimized
                priority
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 760px"
              />
            </div>
          )}

          <div className="article-body" style={{ marginTop: '40px' }}>
            {post.body && <BlogContent body={post.body} />}
          </div>

          <div
            style={{
              marginTop: '64px',
              borderTop: '1px solid var(--line)',
              paddingTop: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {post.tags?.length > 0 && (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}
              >
                <span className="meta">TOPICS</span>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', listStyle: 'none' }}>
                  {post.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href="/blog" className="btn btn--primary">
              Read more articles
            </Link>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on LinkedIn <ArrowIcon />
            </a>
          </div>
          </div>
        </article>
      </main>

      <Footer bare />
    </>
  )
}
