import { SearchPort, Either } from './deps.js'
import { composePlugins } from './lib/compose-plugins.js'
import { applyAdapters } from './lib/apply-adapters.js'
import { R } from './deps.js'

const { compose, lensProp, over, prop, map, fromPairs } = R

export const hyper63 = config =>
  Either.of(config)
   //.map(validate) // todo: validate config
   //.map(checkAdapters) // need to verify each adapter is connected to the right port
   .map(composePlugins) // compose each plugin for each adapter into the adapter for the port
   .map(applyAdapters) // apply the adapter to each port as an interpreter 
   //.map(composeCore) // takes services and wraps them with core modules
   //.map(attachToApp) // Todo: deal with app
   .map(compose(
     fromPairs,
     map(o => [o.port, o.adapter]),
     prop('adapters')
   ))
   .map(over(lensProp('search'), adapter => SearchPort(x => x.cata(adapter))))
   .fold(
     e => {
       console.log(e)
       return noop 
     },
     r => r
   )


function noop() {
  return null
}
