import { assertEquals } from '../deps_test.js'
import { composePlugins } from './compose-plugins.js'
import { applyAdapters } from './apply-adapters.js'

import { R } from '../deps.js'

const { map, reduce } = R

const { test } = Deno

const config = {
  adapters: [
    { port: 'search', plugins: [
      {load: (v) => ({ dir: './data'}), link: (env) => (acc) => ({ boop: 'beep', ...env, ...acc}) },
      {load: (v) => v, link: (env) => (acc) => ({ok: true, ...env, ...acc}) }
    ]}
  ]
}

test('compose adapters', () => {
  const res = composePlugins(config)
  const res2 = applyAdapters(res)
  console.log(res2)
  assertEquals(true, true)

})
