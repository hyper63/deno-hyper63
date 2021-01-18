import { assertEquals, SearchPort } from './deps_test.js'
import { minisearch } from './mod.js'

const { test } = Deno
  
const service = SearchPort(x => x.cata(
  minisearch({dir: './data'}).link({dir: './data'})({})
))

test('create index success', () => {
  
  service.createIndex('foo', { fields: ['title']})
    .fork(
      e => assertEquals(false, true),
      r => assertEquals(r.ok, true)
    )
})


test('create index fail', () => {
  
  service.createIndex('foo', { field: ['title']})
    .fork(
      e => {
        console.log(e.message)
        assertEquals(true, true)
      },
      r => {
        console.log(r)
        assertEquals(false, true)
      }
    )
})


