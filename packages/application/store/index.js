import { authModule, VALIDATE_COOKIE } from './auth/methods'

export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    const cookie = req.headers.cookie
    if (cookie) {
      authModule
      dispatch(authModule(VALIDATE_COOKIE), { cookie })
    }
  }
}

export const getters = {}
