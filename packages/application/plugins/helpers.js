import Vue from 'vue'
import * as helpers from './resources/helpers'

Vue.prototype.$helpers = helpers

export default ({ app }, inject) => {
  app.$helpers = helpers
}
