/**
 * Helpers is defined here, then injected as a plugin in the "plugins" folder so helpers can be used by non-nuxt js files, i.e. vuex store modules
 */

// Methods
/**
 * storeModule
 * @param {*} module
 * @param {*} method
 */
function storeModule(module, method) {
  return `${module}/${method}`
}

module.exports = {
  storeModule: storeModule
}
