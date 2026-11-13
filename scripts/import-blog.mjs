import { readFile } from 'node:fs/promises'
import { createGitHubStore } from '../src/lib/github-blog.js'

try {
  const document=JSON.parse(await readFile(new URL('../src/data/posts/bitbucket-ssh-migration.json',import.meta.url),'utf8'))
  const store=createGitHubStore({repo:process.env.BLOG_GITHUB_REPO,branch:process.env.BLOG_GITHUB_BRANCH||'main',token:process.env.BLOG_GITHUB_TOKEN})
  const result=await store.importPost(document)
  console.log('Article ready in private storage: '+result.document.slug)
} catch(error) {
  console.error(error.status?error.message:'The import could not complete. Check your private repository settings.')
  process.exitCode=1
}
