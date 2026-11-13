import 'server-only'
import { getServerSession } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { BlogError } from './blog-model.js'
import { checkMutation, isOwner, missingAdminConfig, AUTH_FIELDS } from './admin-policy.js'

const GitHub = GitHubProvider.default || GitHubProvider

export function getAdminSetup() {
  return missingAdminConfig(process.env)
}

export function authConfigured() {
  return !getAdminSetup().some(name=>AUTH_FIELDS.includes(name))
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [GitHub({ clientId: process.env.GITHUB_CLIENT_ID || '', clientSecret: process.env.GITHUB_CLIENT_SECRET || '' })],
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: { signIn: '/admin', error: '/admin' },
  callbacks: {
    async signIn({ account, profile }) {
      return authConfigured() && account?.provider === 'github' && String(profile?.id) === process.env.BLOG_ADMIN_GITHUB_ID
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === 'github') token.githubId = String(profile?.id || '')
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.githubId = token.githubId
      return session
    },
  },
}

export async function ownerSession() {
  if (!authConfigured()) return null
  const session = await getServerSession(authOptions)
  return isOwner(session, process.env.BLOG_ADMIN_GITHUB_ID) ? session : null
}

export async function requireAdmin(request, mutation = false, contentType) {
  if (!authConfigured()) throw new BlogError('The editor sign-in is not configured.', 503)
  const session = await ownerSession()
  if (!session) throw new BlogError('Sign in with the owner GitHub account to continue.', 401)
  if (mutation) checkMutation(request, process.env.NEXTAUTH_URL, contentType)
  return session
}
