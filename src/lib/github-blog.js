import { randomUUID } from 'node:crypto'
import { BlogError, validRepository, validateSlug, validateDocument, applyEdit, imageType, validateMediaName, mediaReferenced, publicPost, MAX_IMAGE_BYTES } from './blog-model.js'

export function createGitHubStore({ repo, branch = 'main', token }, fetchImpl = fetch) {
  if (!validRepository(repo) || !token || !branch) throw new BlogError('Private blog storage is not configured.', 503)
  const base = 'https://api.github.com/repos/' + repo
  let privateCheck
  async function request(path, options = {}, missingAllowed = false) {
    let response
    try {
      response = await fetchImpl(base + path, {
        ...options, cache: 'no-store', signal: AbortSignal.timeout(15000),
        headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + token, 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json', ...options.headers },
      })
    } catch { throw new BlogError('Blog storage is temporarily unavailable. Please try again.', 503) }
    if (response.status === 404 && missingAllowed) return null
    if (response.status === 409 || response.status === 422) throw new BlogError('This article changed or the repository requires a pull request. Reload before saving again; your text is still here.', 409)
    if (!response.ok) throw new BlogError('Blog storage is temporarily unavailable. Check repository access and try again.', 503)
    return response
  }
  async function ensurePrivate() {
    if (!privateCheck) privateCheck = (async () => {
      const data = await (await request('')).json()
      if (data.private !== true) throw new BlogError('Blog storage must be a private GitHub repository.', 503)
    })().catch(error => { privateCheck = null; throw error })
    return privateCheck
  }
  const contentPath = path => '/contents/' + path + '?ref=' + encodeURIComponent(branch)
  async function getPost(slug) {
    validateSlug(slug)
    await ensurePrivate()
    const response = await request(contentPath('posts/' + slug + '.json'), {}, true)
    if (!response) return null
    try {
      const file = await response.json()
      if (file.encoding !== 'base64' || typeof file.content !== 'string' || file.content.length > 1400000 || !/^[a-f0-9]{40}$/.test(file.sha)) throw new Error()
      const document = validateDocument(JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')))
      if (document.slug !== slug) throw new Error()
      return { document, sha: file.sha }
    } catch { throw new BlogError('This article has an invalid stored format.', 503) }
  }
  async function listPosts() {
    await ensurePrivate()
    const response = await request(contentPath('posts'), {}, true)
    if (!response) return []
    const files = await response.json()
    if (!Array.isArray(files) || files.length >= 1000) throw new BlogError('The blog directory cannot be read completely.', 503)
    return Promise.all(files.filter(file => file.type === 'file' && /^[a-z0-9]+(?:-[a-z0-9]+)*\.json$/.test(file.name)).map(file => getPost(file.name.slice(0,-5))))
      .then(posts => posts.filter(Boolean).sort((a,b) => Date.parse(b.document.updatedAt) - Date.parse(a.document.updatedAt)))
  }
  async function write(path, bytes, message, sha) {
    await ensurePrivate()
    const response = await request('/contents/' + path, { method: 'PUT', body: JSON.stringify({ message, content: Buffer.from(bytes).toString('base64'), branch, ...(sha ? { sha } : {}) }) })
    const result = await response.json()
    if (!/^[a-f0-9]{40}$/.test(result.content?.sha)) throw new BlogError('GitHub did not confirm the save. Reload before trying again.', 503)
    return result.content.sha
  }
  async function savePost(slug, input) {
    validateSlug(slug)
    if (!input || Object.keys(input).some(key => !['draft','action','sha'].includes(key)) || !(input.sha === null || /^[a-f0-9]{40}$/.test(input.sha))) throw new BlogError('Invalid save request.')
    const existing = await getPost(slug)
    if ((existing?.sha || null) !== input.sha) throw new BlogError('This article has changed since you opened it, or its URL already exists. Your text has not been overwritten.', 409)
    const document = applyEdit(existing?.document || null, input.draft, input.action, new Date().toISOString(), slug)
    const message = (input.action === 'publish' ? 'Publish ' : input.action === 'unpublish' ? 'Unpublish ' : 'Save draft for ') + slug
    const newSha = await write('posts/' + slug + '.json', JSON.stringify(document, null, 2) + '\n', message, existing?.sha)
    return { document, sha: newSha }
  }
  async function uploadImage(slug, bytes, mime) {
    if (!await getPost(slug)) throw new BlogError('Save the article as a draft before uploading images.', 404)
    const type = imageType(bytes, mime)
    const filename = randomUUID() + '.' + type.extension
    await write('media/' + slug + '/' + filename, bytes, 'Add image for ' + slug)
    return { src: '/blog/media/' + slug + '/' + filename, filename }
  }
  async function getMedia(slug, filename, admin = false) {
    validateSlug(slug); validateMediaName(filename)
    const post = await getPost(slug)
    if (!post) return null
    const src = '/blog/media/' + slug + '/' + filename
    if (!admin) {
      // shortcut: scan this small blog for reused images; index references if its content directory grows.
      const records = await listPosts()
      if (!records.some(record => mediaReferenced(publicPost(record.document), src))) return null
    }
    const response = await request(contentPath('media/' + slug + '/' + filename), { headers: { Accept: 'application/vnd.github.raw+json' } }, true)
    if (!response) return null
    if (Number(response.headers.get('content-length')) > MAX_IMAGE_BYTES) throw new BlogError('Stored image exceeds the supported size.', 503)
    const bytes = new Uint8Array(await response.arrayBuffer())
    const type = imageType(bytes)
    if (filename.split('.').pop() !== type.extension) throw new BlogError('Stored image format does not match its filename.', 503)
    return { bytes, mime: type.mime }
  }
  async function importPost(input) {
    const document=validateDocument(input)
    const existing=await getPost(document.slug)
    if(existing)return existing
    const sha=await write('posts/'+document.slug+'.json',JSON.stringify(document,null,2)+'\n','Import '+document.slug)
    return {document,sha}
  }
  return { getPost, listPosts, savePost, uploadImage, getMedia, importPost, ensurePrivate }
}
