import Vue from 'vue'
import * as strings from './resources/strings'

Vue.prototype.$messages = strings

export default ({ app }, inject) => {
  app.$messages = strings
}
