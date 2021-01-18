import { assertEquals } from './deps_test.js'
import { minisearch } from './tmp/mod.js'

import { hyper63 } from './mod.js'


const { test } = Deno

test('hello world', () => {
  const config = {
    //app: express,
    adapters: [
      { port: 'search', plugins: [minisearch({dir: './data'})] }
    ]
  }
  const services = hyper63(config)
  services.search.createIndex('foo', { fields: ['title']})
    .fork(
      console.log,
      console.log
    )
  console.log(services)
  assertEquals(true, true)
})

