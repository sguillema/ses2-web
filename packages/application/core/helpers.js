import Vue from 'vue'
import moment from 'moment'

export const requiredRule = value => value =>
  !!value || Vue.prototype.$messages.Required

export const getExpiryOptions = shouldRemember => {
  const oneHour = moment()
    .add(1, 'hours')
    .toDate()

  let options = {}
  if (!shouldRemember) {
    options.expires = oneHour
  }
  return options
}
