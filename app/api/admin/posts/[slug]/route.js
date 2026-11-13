import { requireAdmin } from '../../../../../src/lib/admin-auth'
import { getBlogStore, invalidateBlog } from '../../../../../src/lib/blog-store.server'
import { readJsonBody } from '../../../../../src/lib/admin-policy'
import { BlogError } from '../../../../../src/lib/blog-model'
import { apiJson, apiError } from '../../../../../src/lib/blog-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function GET(request, {params}) {
  try {
    await requireAdmin(request)
    const record = await getBlogStore().getPost((await params).slug)
    if (!record) throw new BlogError('Article not found.',404)
    return apiJson(record)
  } catch (error) { return apiError(error) }
}
export async function PUT(request, {params}) {
  try {
    await requireAdmin(request, true)
    const input = await readJsonBody(request)
    const record = await getBlogStore().savePost((await params).slug, input)
    invalidateBlog((await params).slug)
    return apiJson(record)
  } catch (error) { return apiError(error) }
}
