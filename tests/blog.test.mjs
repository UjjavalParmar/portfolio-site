import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { estimateReadingTime } from '../src/lib/blog.js'
import { publicPost, safeImageSrc, validateDocument } from '../src/lib/blog-model.js'

const bundled = JSON.parse(readFileSync(new URL('../src/data/posts/bitbucket-ssh-migration.json', import.meta.url)))
const post = publicPost(bundled)

test('the published Markdown article preserves its URL, technical examples and official sources', () => {
  assert.equal(validateDocument(bundled).version,1)
  assert.equal(post.slug,'bitbucket-ssh-migration-config')
  assert.equal(post.title,'Bitbucket changed its SSH address. Your Git remotes can stay.')
  assert.match(post.body,/November 12/)
  assert.match(post.body,/December 10, 2026/)
  for(const example of ['Host bitbucket.org ssh.bitbucket.org','HostName ssh.bitbucket.org','HostName altssh.bitbucket.org','Port 443','git ls-remote origin','ssh -G git@bitbucket.org']) assert.ok(post.body.includes(example))
  for(const url of ['https://man.openbsd.org/ssh_config','https://support.atlassian.com/bitbucket-cloud/docs/configure-ssh-and-two-step-verification/','https://community.atlassian.com/forums/discussion/3234032/']) assert.ok(post.body.includes(url))
  assert.ok(existsSync(new URL('../public'+post.featuredImage.src,import.meta.url)))
  assert.ok(existsSync(new URL('../public/blog/bitbucket-ssh-alias.svg',import.meta.url)))
  assert.match(post.body,/!\[.+\]\(\/blog\/bitbucket-ssh-alias\.svg/)
})

test('only safe local blog media sources resolve', () => {
  assert.equal(safeImageSrc('/blog/bitbucket-ssh-alias.svg'),'/blog/bitbucket-ssh-alias.svg')
  for(const src of ['//example.com/image.png','https://example.com/x.png','/blog/../private/image.png','/api/admin/posts','javascript:alert(1)',null]) assert.equal(safeImageSrc(src),null)
})

test('reading time counts the article and code rather than the description', () => {
  assert.equal(estimateReadingTime(),1)
  assert.equal(estimateReadingTime('word '.repeat(201)),2)
  assert.ok(estimateReadingTime(post.body)>3)
})
