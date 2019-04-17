import Vue from 'vue'
import * as strings from './resources/storeStrings'
// const strings = require('~/plugins/resources/strings')

// let poo = {
//   AUTH: 'auth',
//   REQUEST: `request`,
//   SUCCESS: `success`,
//   ERROR: `error`,
//   LOGOUT: `logout`,
//   VALIDATE_COOKIE: `validateCookie`,
//   IS_VALIDATED: `isValidated`,
//   AUTH_STATUS: `authStatus`
// }

Vue.prototype.$storeStrings = strings

export default ({ app }, inject) => {
  // const strings = require('~/plugins/resources/strings')
  // inject('storeStrings', poo)
  // inject('storeStrings', poo)
  app.$storeStrings = strings
}
