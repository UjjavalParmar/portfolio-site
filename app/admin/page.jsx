import { getAdminSetup, ownerSession } from '../../src/lib/admin-auth'
import { getBlogStore } from '../../src/lib/blog-store.server'
import BlogAdmin from '../../src/components/admin/BlogAdmin'
import { BlogError } from '../../src/lib/blog-model'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export default async function AdminPage({searchParams}) {
  const missing=getAdminSetup(), session=await ownerSession()
  let posts=[], error=''
  if(session && !missing.length) {
    try { posts=await getBlogStore().listPosts() }
    catch(e) { error=e instanceof BlogError?e.message:'The writing desk could not load. Please try again.' }
  }
  return <BlogAdmin authenticated={Boolean(session)&&!missing.length} missing={missing} initialPosts={posts} initialError={error} authError={(await searchParams).error || ''} />
}
