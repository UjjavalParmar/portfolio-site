import { getBlogStore } from '../../../../../src/lib/blog-store.server'
import { apiError, imageResponse } from '../../../../../src/lib/blog-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function GET(_request,{params}) {
  try { return imageResponse(await getBlogStore().getMedia((await params).slug,(await params).filename)) }
  catch (error) { return apiError(error) }
}
