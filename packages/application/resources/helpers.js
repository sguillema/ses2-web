export default ({ app }, inject) => {
  class Helpers {
    constructor() {}

    // Methods
    /**
     * storeModule
     * @param {*} module
     * @param {*} method
     */
    storeModule(module, method) {
      return `${module}/${method}`
    }
  }

  let helpers = new Helpers()
  inject('helpers', helpers)
}
