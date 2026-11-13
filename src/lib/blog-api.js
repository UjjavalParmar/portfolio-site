import { BlogError } from './blog-model.js'

export function apiJson(value, status = 200) {
  return Response.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })
}

export function apiError(error) {
  return apiJson({ error: error instanceof BlogError ? error.message : 'The request could not be completed. Please try again.' }, error instanceof BlogError ? error.status : 503)
}

export function imageResponse(image) {
  if (!image) return new Response(null, {status:404,headers:{'Cache-Control':'no-store'}})
  return new Response(image.bytes, { headers: { 'Content-Type': image.mime, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'; sandbox" } })
}
