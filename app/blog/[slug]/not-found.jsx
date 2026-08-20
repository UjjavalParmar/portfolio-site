import Link from 'next/link'
import Nav from '../../../src/components/Nav'
import Footer from '../../../src/components/Footer'

export const metadata = {
  title: 'Post not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Nav />

      <main id="main">
        <section className="shell section" style={{ paddingBottom: '80px' }}>
          <p className="eyebrow" style={{ marginBottom: '18px' }}>
            [ 404 ]
          </p>
          <h1 className="h2 h2--lg" style={{ margin: '0 0 16px', maxWidth: '20ch' }}>
            This post does not exist.
          </h1>
          <p className="body-intro" style={{ margin: '0 0 32px', maxWidth: '48ch' }}>
            The article you are looking for was moved, renamed, or never
            published. Everything still online is listed on the blog index.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/blog" className="btn btn--primary">
              Browse all posts
            </Link>
            <Link href="/" className="btn btn--ghost">
              Back to home
            </Link>
          </div>
        </section>
      </main>

      <Footer bare />
    </>
  )
}
