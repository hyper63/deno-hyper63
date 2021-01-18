import { R } from '../deps.js'

const { over, lensProp, map, reduce } = R

const loadenv = env => map(fn => fn(env))
const combineLinks = reduce((target, fn) => fn(target), {})

const Id = x =>
({
  x,
  map: fn => Id(fn(x)),
  extract: fn => fn(x)
})

export const applyAdapters = 
  over(lensProp('adapters'),
    map(
      over(lensProp('adapter'),
        adapter => 
          Id(adapter.link)
            .map(loadenv(adapter.load({})))
            .map(combineLinks)
            .extract(v => v)
      )
    )
  )
