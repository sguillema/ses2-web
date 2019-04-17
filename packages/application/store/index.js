import { storeModule } from '~/plugins/resources/helpers'
const { AUTH, VALIDATE_COOKIE } = require('~/plugins/resources/storeStrings')

export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    const cookie = req.headers.cookie
    if (cookie) {
      dispatch(storeModule(AUTH, VALIDATE_COOKIE), { cookie })
    }
  }
}

export const getters = {}
