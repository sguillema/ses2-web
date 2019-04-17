import Vue from 'vue'
import * as strings from './resources/storeStrings'

Vue.prototype.$storeStrings = strings

export default ({ app }, inject) => {
  app.$storeStrings = strings
}
