export class BlogError extends Error {
  constructor(message, status = 400) { super(message); this.status = status }
}

export function validRepository(value) {
  return typeof value==='string' && /^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}\/(?!\.{1,2}$)[a-zA-Z0-9_.-]{1,100}$/.test(value)
}

export function validateSlug(value) {
  if (typeof value !== 'string' || value.length > 96 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) throw new BlogError('Use a URL slug of lowercase words separated by hyphens.')
  return value
}

export function safeImageSrc(src) {
  if (typeof src !== 'string') return null
  if (/^\/blog\/(?!media\/)[a-z0-9/_-]+\.(?:webp|png|jpe?g|svg)$/i.test(src)) return src
  if (/^\/blog\/media\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-f0-9-]{36}\.(?:png|jpe?g|webp)$/.test(src)) return src
  return null
}

function object(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !keys.includes(key))) throw new BlogError('Unexpected content fields.')
}

function text(value, label, max, required = true) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new BlogError(label + ' is required and must be at most ' + max + ' characters.')
  return value
}

function timestamp(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT/.test(value) || !Number.isFinite(Date.parse(value))) throw new BlogError('Invalid article timestamp.')
  return value
}

export function validateSnapshot(value, published = false) {
  object(value, ['title', 'author', 'metaDescription', 'tags', 'body', 'featuredImage', ...(published ? ['publishedAt', 'updatedAt'] : [])])
  const result = {
    title: text(value.title, 'Title', 120), author: text(value.author, 'Author', 100),
    metaDescription: text(value.metaDescription, 'Description', 160, published),
    body: text(value.body, 'Article body', 64000, published), tags: value.tags, featuredImage: null,
  }
  if (!Array.isArray(value.tags) || value.tags.length > 10 || value.tags.some(tag => typeof tag !== 'string' || !tag.trim() || tag.length > 40) || new Set(value.tags).size !== value.tags.length) throw new BlogError('Use up to 10 unique topics, each under 40 characters.')
  result.tags = [...value.tags]
  if (value.featuredImage !== null) {
    const image = value.featuredImage
    object(image, ['src', 'alt', 'width', 'height'])
    if (!safeImageSrc(image.src)) throw new BlogError('Choose an uploaded blog image.')
    result.featuredImage = { src: image.src, alt: text(image.alt, 'Image alt text', 500) }
    if (image.width !== undefined || image.height !== undefined) {
      if (![image.width, image.height].every(n => Number.isInteger(n) && n > 0 && n <= 20000)) throw new BlogError('Invalid image dimensions.')
      Object.assign(result.featuredImage, { width: image.width, height: image.height })
    }
  }
  if (published) Object.assign(result, { publishedAt: timestamp(value.publishedAt), updatedAt: timestamp(value.updatedAt) })
  return result
}

export function validateDocument(value) {
  object(value, ['version', 'slug', 'updatedAt', 'firstPublishedAt', 'draft', 'published'])
  if (value.version !== 1) throw new BlogError('Unsupported article format.')
  const firstPublishedAt = value.firstPublishedAt ?? value.published?.publishedAt ?? null
  return {
    version: 1, slug: validateSlug(value.slug), updatedAt: timestamp(value.updatedAt),
    firstPublishedAt: firstPublishedAt === null ? null : timestamp(firstPublishedAt),
    draft: validateSnapshot(value.draft),
    published: value.published === null ? null : validateSnapshot(value.published, true),
  }
}

export function publicPost(document) {
  const value = validateDocument(document)
  return value.published ? { slug: value.slug, ...value.published } : null
}

export function applyEdit(current, draft, action, now, slug) {
  validateSlug(slug)
  if (!['save', 'publish', 'unpublish'].includes(action)) throw new BlogError('Unknown publishing action.')
  const content = validateSnapshot(draft)
  if (current && current.slug !== slug) throw new BlogError('An existing article URL cannot be changed.')
  let published = current?.published || null
  const firstPublishedAt = current?.firstPublishedAt || published?.publishedAt || (action === 'publish' ? now : null)
  if (action === 'publish') published = validateSnapshot({ ...content, publishedAt: firstPublishedAt, updatedAt: now }, true)
  if (action === 'unpublish') published = null
  return validateDocument({ version: 1, slug, updatedAt: now, firstPublishedAt, draft: content, published })
}

export function mediaReferenced(snapshot, src) {
  return Boolean(snapshot && (snapshot.featuredImage?.src === src || snapshot.body?.includes(src)))
}

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024
export function imageType(bytes, declaredType) {
  if (!(bytes instanceof Uint8Array) || !bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new BlogError('Images must be under 2 MB.')
  const is = values => values.every((value, index) => bytes[index] === value)
  const ascii = (start, end) => String.fromCharCode(...bytes.subarray(start, end))
  let type
  if (is([137,80,78,71,13,10,26,10])) type = { mime: 'image/png', extension: 'png' }
  else if (is([255,216,255])) type = { mime: 'image/jpeg', extension: 'jpg' }
  else if (bytes.length >= 12 && ascii(0,4) === 'RIFF' && ascii(8,12) === 'WEBP') type = { mime: 'image/webp', extension: 'webp' }
  if (!type || (declaredType && declaredType !== type.mime)) throw new BlogError('Choose a valid PNG, JPEG, or WebP image.')
  return type
}

export function validateMediaName(filename) {
  if (typeof filename !== 'string' || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\.(?:png|jpg|webp)$/.test(filename)) throw new BlogError('Image not found.', 404)
  return filename
}
