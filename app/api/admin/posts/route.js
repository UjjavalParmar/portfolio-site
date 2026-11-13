import { requireAdmin } from '../../../../src/lib/admin-auth'
import { getBlogStore } from '../../../../src/lib/blog-store.server'
import { apiJson, apiError } from '../../../../src/lib/blog-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function GET(request) {
  try {
    await requireAdmin(request)
    return apiJson(await getBlogStore().listPosts())
  } catch (error) { return apiError(error) }
}
