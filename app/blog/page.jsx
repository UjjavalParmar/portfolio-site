import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, sanityImageUrl } from '../../src/lib/sanity'
import Nav from '../../src/components/Nav'
import Footer from '../../src/components/Footer'

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devopslife.space'

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      <Nav />

      <main id="main">
        <section className="shell section" aria-labelledby="blog-title">
          <p className="eyebrow" style={{ marginBottom: '18px' }}>
            [ writing ]
          </p>
          <h1
            id="blog-title"
            className="h2 h2--lg"
            style={{ margin: '0 0 16px', maxWidth: '20ch' }}
          >
            Thoughts &amp; Insights
          </h1>
          <p className="body-intro" style={{ margin: 0, maxWidth: '54ch' }}>
            Writing about DevOps, cloud infrastructure, Kubernetes, and lessons
            learned building production systems at scale.
          </p>

          {posts?.length > 0 && (
            <p className="meta" style={{ marginTop: '28px' }}>
              {posts.length} {posts.length === 1 ? 'ARTICLE' : 'ARTICLES'} ·
              DEVOPS &amp; CLOUD
            </p>
          )}
        </section>

        <section className="shell" style={{ paddingTop: '40px' }}>
          {posts?.length > 0 ? (
            <div className="rule-grid grid-2">
              {posts.map((post) => {
                const imageUrl = sanityImageUrl(post.featuredImage)
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="work-card"
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    {imageUrl && (
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: '16 / 10',
                          borderBottom: '1px solid var(--line)',
                          background: 'var(--panel)',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={imageUrl}
                          alt={post.featuredImage?.alt || post.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 760px) 100vw, 50vw"
                        />
                      </div>
                    )}

                    <article
                      style={{
                        padding: '30px 32px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: '16px',
                        }}
                      >
                        <time className="meta" dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <span
                          className="meta meta--strong"
                          style={{ color: 'var(--accent)', letterSpacing: '.06em' }}
                        >
                          {estimateReadingTime(post.metaDescription)} read
                        </span>
                      </div>

                      <h2 className="h3-card" style={{ margin: 0, maxWidth: '22ch' }}>
                        {post.title}
                      </h2>

                      {post.metaDescription && (
                        <p className="body-card" style={{ margin: 0, maxWidth: '46ch' }}>
                          {post.metaDescription}
                        </p>
                      )}

                      {post.tags?.length > 0 && (
                        <ul
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            marginTop: '4px',
                            listStyle: 'none',
                          }}
                        >
                          {post.tags.slice(0, 4).map((tag) => (
                            <li key={tag} className="chip">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}

                      <span
                        style={{
                          font: '600 14px/1 var(--font-sans), sans-serif',
                          color: 'var(--accent)',
                          marginTop: 'auto',
                          paddingTop: '6px',
                        }}
                      >
                        Read the post →
                      </span>
                    </article>
                  </Link>
                )
              })}
              {posts.length % 2 === 1 && <div data-filler aria-hidden="true" />}
            </div>
          ) : (
            <div
              style={{
                border: '1px solid var(--line)',
                padding: '60px 32px',
                textAlign: 'center',
              }}
            >
              <p className="meta" style={{ marginBottom: '12px' }}>
                NO POSTS YET
              </p>
              <p className="body-card" style={{ margin: 0 }}>
                Check back soon for new writing on DevOps and infrastructure.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer bare />
    </>
  )
}
