import { assertEquals } from '../deps_test.js'
import { composePlugins } from './compose-plugins.js'
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
  const env = res.adapters[0].adapter.load({})
  const link = reduce((target, fn) => fn(target), {}, map(fn => fn(env), res.adapters[0].adapter.link)) 
  assertEquals(link.ok, true)
  assertEquals(link.dir, './data')

})
