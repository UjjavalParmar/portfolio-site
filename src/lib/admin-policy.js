import { BlogError, validRepository } from './blog-model.js'

export const AUTH_FIELDS = ['NEXTAUTH_URL','NEXTAUTH_SECRET','GITHUB_CLIENT_ID','GITHUB_CLIENT_SECRET','BLOG_ADMIN_GITHUB_ID']
export function missingAdminConfig(env) {
  const missing=new Set([...AUTH_FIELDS,'BLOG_GITHUB_REPO','BLOG_GITHUB_TOKEN'].filter(name=>!env[name]?.trim()))
  try {
    const url=new URL(env.NEXTAUTH_URL)
    const local=['localhost','127.0.0.1','[::1]'].includes(url.hostname)
    if((url.protocol!=='https:'&&!(local&&url.protocol==='http:'))||url.username||url.password||url.pathname!=='/'||url.search||url.hash)missing.add('NEXTAUTH_URL')
  } catch { missing.add('NEXTAUTH_URL') }
  if((env.NEXTAUTH_SECRET||'').length<32)missing.add('NEXTAUTH_SECRET')
  if(!/^\d+$/.test(env.BLOG_ADMIN_GITHUB_ID||''))missing.add('BLOG_ADMIN_GITHUB_ID')
  if(!validRepository(env.BLOG_GITHUB_REPO))missing.add('BLOG_GITHUB_REPO')
  return [...missing]
}

export function isOwner(session, ownerId) {
  return typeof ownerId === 'string' && /^\d+$/.test(ownerId) && session?.user?.githubId === ownerId
}

export function checkMutation(request, configuredUrl, contentType = 'application/json') {
  let origin
  try { origin = new URL(configuredUrl).origin } catch { throw new BlogError('The editor origin is not configured.', 503) }
  if (request.headers.get('origin') !== origin) throw new BlogError('This request did not come from the editor.', 403)
  const type = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (type !== contentType) throw new BlogError('Unsupported request format.', 415)
}

export async function readBody(request, maxBytes) {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new BlogError('The request is too large.', 413)
  const reader = request.body?.getReader()
  if (!reader) throw new BlogError('The request body is missing.')
  let size = 0
  const chunks = []
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) { await reader.cancel(); throw new BlogError('The request is too large.', 413) }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  return bytes
}

export async function readJsonBody(request) {
  const bytes = await readBody(request, 350000)
  try { return JSON.parse(new TextDecoder().decode(bytes)) }
  catch { throw new BlogError('The request does not contain valid JSON.') }
}
