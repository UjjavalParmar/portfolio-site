import { requireAdmin } from '../../../../../../src/lib/admin-auth'
import { getBlogStore } from '../../../../../../src/lib/blog-store.server'
import { readBody } from '../../../../../../src/lib/admin-policy'
import { BlogError, MAX_IMAGE_BYTES } from '../../../../../../src/lib/blog-model'
import { apiJson, apiError, imageResponse } from '../../../../../../src/lib/blog-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function POST(request, {params}) {
  try {
    await requireAdmin(request,true,'multipart/form-data')
    const bytes = await readBody(request,MAX_IMAGE_BYTES + 8192)
    let form
    try { form = await new Response(bytes,{headers:{'Content-Type':request.headers.get('content-type')}}).formData() }
    catch { throw new BlogError('Choose an image file.') }
    const file = form.get('image')
    if (!file || typeof file.arrayBuffer !== 'function') throw new BlogError('Choose an image file.')
    return apiJson(await getBlogStore().uploadImage((await params).slug,new Uint8Array(await file.arrayBuffer()),file.type),201)
  } catch (error) { return apiError(error) }
}
export async function GET(request,{params}) {
  try {
    await requireAdmin(request)
    return imageResponse(await getBlogStore().getMedia((await params).slug,new URL(request.url).searchParams.get('filename'),true))
  } catch (error) { return apiError(error) }
}
