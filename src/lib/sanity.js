import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

/**
 * Sanity client instance.
 * Returns null if projectId is not configured (allows build to succeed
 * before Sanity is set up).
 */
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null

/**
 * Build a Sanity image URL from an image reference.
 */
export function sanityImageUrl(imageRef) {
  if (!imageRef?.asset?._ref || !projectId) return null

  const [, id, dimensions, format] = imageRef.asset._ref.split('-')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}

// ─── GROQ Queries ────────────────────────────────────────────────────────────

/** Get all published blog posts (listing) */
export const allPostsQuery = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    metaDescription,
    author,
    publishedAt,
    featuredImage,
    tags
  }
`

/** Get a single blog post by slug */
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    metaDescription,
    author,
    publishedAt,
    featuredImage,
    tags,
    content
  }
`

/** Get all slugs for static generation */
export const allPostSlugsQuery = `
  *[_type == "post" && !(_id in path("drafts.**"))].slug.current
`

// ─── Data-fetching helpers ───────────────────────────────────────────────────

export async function getAllPosts() {
  if (!sanityClient) return []
  return sanityClient.fetch(allPostsQuery)
}

export async function getPostBySlug(slug) {
  if (!sanityClient) return null
  return sanityClient.fetch(postBySlugQuery, { slug })
}

export async function getAllPostSlugs() {
  if (!sanityClient) return []
  return sanityClient.fetch(allPostSlugsQuery)
}
