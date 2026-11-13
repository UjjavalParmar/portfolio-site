import bundled from '../../../../src/data/posts/bitbucket-ssh-migration.json'
import { requireAdmin } from '../../../../src/lib/admin-auth'
import { readJsonBody } from '../../../../src/lib/admin-policy'
import { getBlogStore, invalidateBlog } from '../../../../src/lib/blog-store.server'
import { BlogError } from '../../../../src/lib/blog-model'
import { apiJson, apiError } from '../../../../src/lib/blog-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function POST(request) {
  try {
    await requireAdmin(request,true)
    const input=await readJsonBody(request)
    if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length)throw new BlogError('Invalid import request.')
    const result=await getBlogStore().importPost(bundled)
    invalidateBlog(bundled.slug)
    return apiJson(result)
  } catch(error){return apiError(error)}
}
