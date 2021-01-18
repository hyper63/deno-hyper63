import { Minisearch, Task, Either } from './deps.js'

let indexes = new Map()

const { tryCatch } = Either
const eitherToTask = e => e.fold(Task.rejected, Task.of)
const createMinisearch = mappings => tryCatch(() => new Minisearch(mappings))
const isOk = () => ({ok: true})
const setSearch = (indexes, name) => s => indexes.set(name, s)


const adapter = env => a => Object.assign({}, a, {
  CreateIndex: (name, mappings) => Task.of(mappings)
    .map(createMinisearch)
    .chain(eitherToTask)
    .map(setSearch(indexes, name))
    .map(isOk),
  DestroyIndex: (name) => Task.of({ok: true}),
  IndexDoc: (index, doc) => Task.of({ok: true}),
  GetDoc: (index, id) => Task.of({ok: true}),
  UpdateDoc: (index, id, doc) => Task.of({ok: true}),
  DeleteDoc: (index, id) => Task.of({ok: true}),
  Query: (index, query) => Task.of({ok: true}) 
})



export const minisearch = config =>
({
  name: 'minisearch',
  port: 'search',
  load: env => Object.assign({}, env, config),
  link: adapter
})

