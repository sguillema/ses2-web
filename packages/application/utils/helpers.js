import Vue from 'vue'

export const requiredRule = value => value =>
  !!value || Vue.prototype.$messages.Required
