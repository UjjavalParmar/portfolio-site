import assert from 'node:assert/strict'
import test from 'node:test'
import { validateSlug, validateSnapshot, publicPost, applyEdit, imageType, mediaReferenced } from '../src/lib/blog-model.js'
import { createGitHubStore } from '../src/lib/github-blog.js'

const snapshot = { title: 'A useful note', author: 'Ujjaval Parmar', metaDescription: 'How to fix it.', tags: ['SSH'], body: '## Working config\n\nOriginal live body.', featuredImage: null }
const config = { repo: 'owner/private-content', branch: 'main', token: 'test-token' }
const sha = 'a'.repeat(40)
const now = '2026-11-13T00:00:00.000Z'
const doc = applyEdit(null, snapshot, 'publish', now, 'useful-note')

test('saving a draft preserves the live snapshot, and unpublish retains the draft', () => {
  const edited = applyEdit(doc, { ...snapshot, title: 'PRIVATE DRAFT', body: 'PRIVATE BODY' }, 'save', now, doc.slug)
  assert.equal(publicPost(edited).title, snapshot.title)
  assert.equal(publicPost(edited).body, snapshot.body)
  assert.doesNotMatch(JSON.stringify(publicPost(edited)), /PRIVATE/)
  const published = applyEdit(edited, edited.draft, 'publish', now, doc.slug)
  assert.equal(publicPost(published).title, 'PRIVATE DRAFT')
  const unpublished = applyEdit(published, published.draft, 'unpublish', now, doc.slug)
  assert.equal(publicPost(unpublished), null)
  assert.equal(unpublished.draft.body, 'PRIVATE BODY')
})

test('validation rejects traversal, extra fields, executable image URLs and oversized input', () => {
  for (const slug of ['../private', 'a/b', '', '-foo', 'A', 'a'.repeat(97)]) assert.throws(() => validateSlug(slug))
  assert.equal(validateSlug('working-note-1'), 'working-note-1')
  assert.throws(() => validateSnapshot({ ...snapshot, extra: true }))
  assert.throws(() => validateSnapshot({ ...snapshot, body: 'x'.repeat(64001) }))
  assert.throws(() => validateSnapshot({ ...snapshot, tags: ['x'.repeat(41)] }))
  assert.throws(() => validateSnapshot({ ...snapshot, featuredImage: { src: '//evil.test/x.png', alt: 'x' } }))
  assert.throws(() => applyEdit(null, { ...snapshot, body: '' }, 'publish', now, 'a'))
  assert.throws(() => applyEdit(doc, snapshot, 'delete', now, doc.slug))
})

test('draft media is not referenced by the public snapshot', () => {
  const src = '/blog/media/useful-note/12345678-1234-1234-1234-123456789abc.webp'
  const edited = applyEdit(doc, { ...snapshot, featuredImage: {src,alt:'Private image'} }, 'save', now, doc.slug)
  assert.equal(mediaReferenced(publicPost(edited), src), false)
  assert.equal(mediaReferenced(edited.draft, src), true)
})

test('uploads accept expected file signatures and reject content/type mismatch and size', () => {
  const png = Buffer.from([137,80,78,71,13,10,26,10,0,0,0,0])
  assert.equal(imageType(png, 'image/png').extension, 'png')
  assert.throws(() => imageType(png, 'image/jpeg'))
  assert.throws(() => imageType(Buffer.from('<svg onload="alert(1)">'), 'image/svg+xml'))
  assert.throws(() => imageType(Buffer.alloc(2097153), 'image/png'))
})

function transport({ privateRepo = true, initial = doc, fail = false } = {}) {
  let current = initial, currentSha = sha, writes = 0
  return {
    get document() { return current }, get writes() { return writes },
    fetch: async (url, options = {}) => {
      const path = new URL(url).pathname
      if (fail) return Response.json({ message: 'secret upstream detail' }, {status:503})
      if (path === '/repos/owner/private-content') return Response.json({private:privateRepo})
      if (path.endsWith('/contents/posts')) return Response.json(current ? [{type:'file',name:'useful-note.json'}] : [])
      if (path.endsWith('/contents/posts/useful-note.json')) {
        if (options.method === 'PUT') {
          const input = JSON.parse(options.body)
          if (input.sha && input.sha !== currentSha) return Response.json({}, {status:409})
          current = JSON.parse(Buffer.from(input.content,'base64').toString())
          currentSha = 'b'.repeat(40); writes++
          return Response.json({content:{sha:currentSha}}, {status:201})
        }
        return current ? Response.json({sha:currentSha,encoding:'base64',content:Buffer.from(JSON.stringify(current)).toString('base64')}) : Response.json({}, {status:404})
      }
      return Response.json({}, {status:404})
    }
  }
}

test('GitHub writes refuse public repositories and stale versions without overwriting', async () => {
  const remote = transport()
  const store = createGitHubStore(config, remote.fetch)
  await assert.rejects(store.savePost('useful-note',{draft:snapshot,action:'save',sha:'c'.repeat(40)}), e=>e.status===409)
  assert.equal(remote.writes, 0)
  const saved = await store.savePost('useful-note',{draft:{...snapshot,body:'Private new draft'},action:'save',sha})
  assert.equal(saved.document.draft.body, 'Private new draft')
  assert.equal(publicPost(saved.document).body, snapshot.body)
  assert.equal(remote.writes, 1)
  const publicRemote = transport({privateRepo:false})
  await assert.rejects(createGitHubStore(config, publicRemote.fetch).savePost('useful-note',{draft:snapshot,action:'save',sha}),e=>e.status===503)
  assert.equal(publicRemote.writes, 0)
})

test('GitHub create collisions and remote failures do not silently use local data', async () => {
  const remote = transport()
  await assert.rejects(createGitHubStore(config,remote.fetch).savePost('useful-note',{draft:snapshot,action:'save',sha:null}),e=>e.status===409)
  const empty = transport({initial:null})
  const store = createGitHubStore(config,empty.fetch)
  assert.equal(await store.getPost('useful-note'), null)
  const created = await store.savePost('useful-note',{draft:snapshot,action:'save',sha:null})
  assert.equal(created.document.published, null)
  assert.equal((await store.listPosts()).length, 1)
  await assert.rejects(createGitHubStore(config,transport({fail:true}).fetch).listPosts(),e=>e.status===503&&!e.message.includes('secret'))
})

test('import preserves the original publication time and never replaces existing edits', async () => {
  const remote=transport({initial:null})
  const store=createGitHubStore(config,remote.fetch)
  const imported=await store.importPost(doc)
  assert.equal(publicPost(imported.document).publishedAt,now)
  await store.importPost({...doc,draft:{...snapshot,title:'Must not overwrite'}})
  assert.equal(remote.writes,1)
  assert.equal(remote.document.draft.title,snapshot.title)
})

test('unpublish and republish retain the first publication date', () => {
  const hidden=applyEdit(doc,snapshot,'unpublish','2026-11-14T00:00:00.000Z',doc.slug)
  const restored=applyEdit(hidden,snapshot,'publish','2026-11-15T00:00:00.000Z',doc.slug)
  assert.equal(publicPost(restored).publishedAt,now)
  assert.equal(publicPost(restored).updatedAt,'2026-11-15T00:00:00.000Z')
})

test('a reused image stays public only while some published article references it', async () => {
  const filename='12345678-1234-1234-1234-123456789abc.png'
  const src='/blog/media/useful-note/'+filename
  const source=applyEdit(doc,snapshot,'unpublish',now,doc.slug)
  const other=applyEdit(null,{...snapshot,body:'![Illustration]('+src+')'},'publish',now,'reader-note')
  const remote=transport({initial:source})
  const png=Buffer.from([137,80,78,71,13,10,26,10,0,0,0,0])
  let published=true
  const fetch=async(url,options={})=>{
    const path=new URL(url).pathname
    if(path.endsWith('/contents/posts'))return Response.json([{type:'file',name:'useful-note.json'},{type:'file',name:'reader-note.json'}])
    if(path.endsWith('/contents/posts/reader-note.json')){
      const document=published?other:applyEdit(other,other.draft,'unpublish',now,'reader-note')
      return Response.json({sha,encoding:'base64',content:Buffer.from(JSON.stringify(document)).toString('base64')})
    }
    if(path.endsWith('/contents/media/useful-note/'+filename))return new Response(png)
    return remote.fetch(url,options)
  }
  const store=createGitHubStore(config,fetch)
  const image=await store.getMedia('useful-note',filename)
  assert.ok(image,'A published referencing article must retain access to its illustration')
  assert.equal(image.mime,'image/png')
  published=false
  assert.equal(await store.getMedia('useful-note',filename),null)
})
