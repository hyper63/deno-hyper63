const Index = (name, mappings) => 
({
  name: name,
  mappings: mappings
})

export const search = ({search, hooks}) => 
({
  createIndex: (name, mappings) => 
    Task.of(Index(name, mappings))
      //.map(validate)
      //.chain(hooks.start('search:createIndex')
      .chain(search.createIndex)
      //.chain(hooks.stop('search:createIndex')),
  destroyIndex: (name) => 
    Task.of(name)
      //.chain(hooks.start('search:destroyIndex'))
      .chain(search.destroyIndex)
      //.chain(hooks.stop('search:destroyIndex')),
  indexDoc: (index, doc) => 
    Task.of({index, doc})
        // .map(validate)
        // .chain(hooks.start('search:indexDoc'))
        .chain(search.indexDoc)
        // .chain(hooks.stop('search:indexDoc'))
      ,
  getDoc: (index, id) =>
    Task.of({index, id})
      .chain(search.getDoc),
  updateDoc: (index, id, doc) => 
    Task.of({index, id, doc})
      .chain(search.updateDoc),
  deleteDoc: (index, id) =>
    Task.of({index, id})
      .chain(search.deleteDoc),
  query: (index, query) => 
    Task.of({index, query})
      .chain(search.query)



})
