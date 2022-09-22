// iife/cjs usage extends esm default export - so import it all
import entry, * as components from './entry.esm'

// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)
type NamedExports = Exclude<typeof components, 'default'>
type ExtendedPlugin = typeof entry & NamedExports
const plugin = entry as ExtendedPlugin

Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== 'default') {
    const key = componentName as Exclude<keyof NamedExports, 'default'>
    const val = component as Exclude<ExtendedPlugin, typeof entry>
    plugin[key] = val
  }
})

export default entry
