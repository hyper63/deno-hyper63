import { R } from '../deps.js'

const { append, assoc, compose, identity, lens, lensProp, map, over, prop, reduce } = R

const buildAdapter = lens(prop('plugins'), assoc('adapter'))

const reducer = (adapter, plugin) => {
  adapter.load = compose(plugin.load, adapter.load)
  adapter.link = append(plugin.link, adapter.link) 
  return adapter
}

const initialValue = { load: identity, link: [] }

/**
 * composePlugins
 *
 * this module takes a hyper63 config object and for each adapter, it takes the link prop of the plugin prop and 
 * composes them into one function called link on the adapter object.
 *
 */
export const composePlugins = over(lensProp('adapters'), 
  map(over(buildAdapter, reduce(reducer, initialValue))))
     

