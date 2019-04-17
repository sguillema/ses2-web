import CookieService from '../core/CookieService'
import AuthApi from '../core/api/AuthApi'
const {
  REQUEST,
  SUCCESS,
  ERROR,
  LOGOUT,
  VALIDATE_COOKIE,
  IS_VALIDATED,
  AUTH_STATUS
} = require('~/plugins/resources/storeStrings')

export const state = () => ({
  token: null,
  user: {},
  status: ''
})

export const getters = {
  [IS_VALIDATED]: state => !!state.token,
  [AUTH_STATUS]: state => state.status
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { token, user }) => {
    state.status = 'success'
    state.token = token
    state.user = user
  },

  [ERROR]: state => {
    state.status = 'error'
  },

  [LOGOUT]: state => {
    state.status = ''
    state.token = ''
    state.user = ''
  }
}

export const actions = {
  [REQUEST]: ({ commit, dispatch }, loginData) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await AuthApi.authenticateUser(loginData)
        const shouldRemember = loginData.shouldRemember
        const { token, user } = response.data
        dispatch(SUCCESS, { token, user, shouldRemember }).then(
          resolve(response)
        )
      } catch (e) {
        commit(ERROR)
        // auth cookies are invalid (if any got saved)
        CookieService.removeAuthCookies()
        reject(e)
      }
    }),

  [SUCCESS]: ({ commit }, { token, user, shouldExpire }) =>
    new Promise(resolve => {
      commit(SUCCESS, { token, user })
      AuthApi.setAuthorizationHeader(token)
      CookieService.updateAuthCookies({ token, user, shouldExpire })
      resolve()
    }),

  [LOGOUT]: ({ commit }) =>
    new Promise(resolve => {
      commit(LOGOUT)
      AuthApi.removeAuthorizationHeader()
      CookieService.removeAuthCookies()
      resolve()
    }),

  [VALIDATE_COOKIE]: ({ commit, dispatch }, { cookie }) =>
    new Promise(resolve => {
      commit(REQUEST)
      const parsed = CookieService.getParsedCookie(cookie)
      const token = parsed.token
      let user
      // Try catch block because JSON.parse throws an error if non-json type is passed -- this is pretty much the same as an 'if' statement checking if parsed.user is not null
      try {
        user = JSON.parse(parsed.user)
      } catch {
        user = null
      }
      if (token && user) {
        dispatch(SUCCESS, { token, user })
      } else {
        // auth cookies are invalid, logout immediately
        dispatch(LOGOUT)
      }
      resolve()
    })
}
