import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllPostSlugs, sanityImageUrl } from '../../../src/lib/sanity'
import PortableTextRenderer from '../../../src/components/PortableTextRenderer'
import Nav from '../../../src/components/Nav'
import Footer from '../../../src/components/Footer'

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devopslife.space'
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

  const metaRow = [
    post.author,
    formatDate(post.publishedAt),
    `${readingTime} min read`,
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Nav />

      <main id="main">
        <article className="shell section">
          <div className="article-shell">
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

            <h1 className="h1" style={{ margin: '0 0 28px' }}>
              {post.title}
            </h1>

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
                priority
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 760px"
              />
            </div>
          )}

          <div className="article-body" style={{ marginTop: '40px' }}>
            {post.content && <PortableTextRenderer value={post.content} />}
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
          </div>
          </div>
        </article>
      </main>

      <Footer bare />
    </>
  )
}
