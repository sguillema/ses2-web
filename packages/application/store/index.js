import { AUTH_VALIDATE_COOKIE } from './auth'

export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    const cookie = req.headers.cookie
    if (cookie) {
      dispatch(AUTH_VALIDATE_COOKIE, { cookie })
    }
  }
}

export const getters = {}
