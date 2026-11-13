import NextAuth from 'next-auth'
import { authOptions, authConfigured } from '../../../../src/lib/admin-auth'
import { apiJson } from '../../../../src/lib/blog-api'

const handler = (NextAuth.default || NextAuth)(authOptions)
async function auth(request, context) {
  if (!authConfigured()) return apiJson({error:'The editor sign-in is not configured.'},503)
  return handler(request,context)
}
export { auth as GET, auth as POST }
export const runtime = 'nodejs'
