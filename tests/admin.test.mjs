import assert from 'node:assert/strict'
import test from 'node:test'
import { isOwner, checkMutation, readJsonBody, missingAdminConfig } from '../src/lib/admin-policy.js'

test('owner checks require a configured immutable GitHub ID', () => {
  assert.equal(isOwner({user:{githubId:'123'}},'123'),true)
  for (const [session,id] of [[null,'123'],[{user:{githubId:'456'}},'123'],[{user:{githubId:'123'}},''],[{user:{githubId:''}},'']]) assert.equal(isOwner(session,id),false)
})

test('mutations require the exact configured origin and expected type', () => {
  const make = (origin,type='application/json') => new Request('https://site.example/api/admin/posts', {method:'POST',headers:{origin,'content-type':type},body:'{}'})
  assert.doesNotThrow(()=>checkMutation(make('https://site.example'),'https://site.example'))
  assert.throws(()=>checkMutation(make('https://evil.example'),'https://site.example'),e=>e.status===403)
  assert.throws(()=>checkMutation(make('null'),'https://site.example'),e=>e.status===403)
  assert.throws(()=>checkMutation(make('https://site.example','text/plain'),'https://site.example'),e=>e.status===415)
  assert.throws(()=>checkMutation(make('https://site.example'),''),e=>e.status===503)
})

test('JSON payloads are bounded even without a Content-Length header', async () => {
  const make = body => new Request('https://site.example',{method:'POST',body})
  assert.deepEqual(await readJsonBody(make('{"action":"save"}')), {action:'save'})
  await assert.rejects(readJsonBody(make('bad json')),e=>e.status===400)
  await assert.rejects(readJsonBody(make('x'.repeat(350001))),e=>e.status===413)
})

test('invalid production origins, weak session secrets, and nonnumeric owners fail setup', () => {
  const env={NEXTAUTH_URL:'https://site.example',NEXTAUTH_SECRET:'x'.repeat(32),GITHUB_CLIENT_ID:'client',GITHUB_CLIENT_SECRET:'secret',BLOG_ADMIN_GITHUB_ID:'123',BLOG_GITHUB_REPO:'owner/private-content',BLOG_GITHUB_TOKEN:'test'}
  assert.deepEqual(missingAdminConfig(env),[])
  for(const [key,value]of [['NEXTAUTH_URL','http://site.example'],['NEXTAUTH_SECRET','short'],['BLOG_ADMIN_GITHUB_ID','username'],['BLOG_GITHUB_REPO','../private']])assert.ok(missingAdminConfig({...env,[key]:value}).includes(key))
  assert.deepEqual(missingAdminConfig({...env,NEXTAUTH_URL:'http://localhost:3317'}),[])
})
