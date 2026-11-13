import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

test('the actual GitHub auth configuration loads and allowlists only the owner', () => {
  const code = [
    "import assert from 'node:assert/strict'",
    "const {authOptions}=await import('./src/lib/admin-auth.js')",
    "assert.equal(authOptions.providers[0].id,'github')",
    "assert.equal(await authOptions.callbacks.signIn({account:{provider:'github'},profile:{id:123}}),true)",
    "assert.equal(await authOptions.callbacks.signIn({account:{provider:'github'},profile:{id:456}}),false)",
    "assert.equal(await authOptions.callbacks.signIn({account:{provider:'other'},profile:{id:123}}),false)",
    "const token=await authOptions.callbacks.jwt({token:{},account:{provider:'github'},profile:{id:123}})",
    "assert.equal(token.githubId,'123')",
    "const session=await authOptions.callbacks.session({session:{user:{}},token})",
    "assert.equal(session.user.githubId,'123')",
  ].join('\n')
  const result=spawnSync(process.execPath,['--conditions=react-server','--input-type=module','-e',code],{cwd:new URL('..',import.meta.url),encoding:'utf8',env:{...process.env,NEXTAUTH_URL:'http://localhost:3317',NEXTAUTH_SECRET:'x'.repeat(32),GITHUB_CLIENT_ID:'test',GITHUB_CLIENT_SECRET:'test',BLOG_ADMIN_GITHUB_ID:'123'}})
  assert.equal(result.status,0,result.stderr)
})
