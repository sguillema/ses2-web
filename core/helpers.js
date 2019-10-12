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

/**
 * storeModule
 * @param {*} module
 * @param {*} method
 */
export const storeModule = (moduleName, method) => {
  return `${moduleName}/${method}`
}

export const helpWithTypes = [
  'Addressing the assignment question',
  'Addressing the marking criteria',
  'Structure',
  'Paragraph development',
  'Referencing',
  'Grammar'
]

export const getHelpWithType = helpStr => {
  const index = parseInt(helpStr)
  if (isNaN(index)) return helpStr
  return helpWithTypes[index]
}
