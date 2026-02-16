import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Post Not Found</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The blog post you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/blog"
          className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  )
}
