import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { experience, metrics, navLinks, profile, projects, skillGroups, steps } from '../src/data/site.js'

test('project and capability links resolve to complete, unique walkthroughs', () => {
  const paths = projects.map(({ slug }) => `/work/${slug}`)
  assert.equal(new Set(paths).size, projects.length)
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(project.problem && project.outcome && project.considerations)
    assert.ok(project.contribution.length && project.flow.length > 1)
    assert.equal(new Set(project.flow.map(({ title }) => title)).size, project.flow.length)
  }
  for (const { href } of skillGroups) {
    if (href) assert.ok(paths.includes(href), `Missing project: ${href}`)
  }
  assert.ok(existsSync(new URL('../app/work/[slug]/page.jsx', import.meta.url)))
  assert.ok(existsSync(new URL(`../public${profile.resume}`, import.meta.url)))
})

test('published copy preserves confirmed scope without unsupported performance claims', () => {
  const copy = JSON.stringify({ experience, metrics, projects, skillGroups, steps })
  assert.match(copy, /10\+/)
  assert.match(copy, /five environments/)
  assert.doesNotMatch(copy, /50%|40%|99\.99|zero[ -]downtime|days to hours|in an afternoon/i)
  for (const file of ['Hero', 'Metrics', 'Work', 'Experience', 'Stack', 'ContactBlock']) {
    const component = readFileSync(new URL(`../src/components/home/${file}.jsx`, import.meta.url), 'utf8')
    assert.doesNotMatch(component, /50%|40%|99\.99|five microservices|0\.00s/)
  }
  assert.deepEqual(navLinks.filter(({ route }) => !route).map(({ href }) => href), ['#work', '#experience', '#stack'])
})
