import CookieService from '../core/CookieService'
import AuthApi from '../core/api/AuthApi'

const AUTH = 'auth'
const REQUEST = 'request'
const SUCCESS = 'success'
const ERROR = 'error'
const LOGOUT = 'logout'
const VALIDATE_COOKIE = 'validateCookie'
const IS_VALIDATED = 'isValidated'
const AUTH_STATUS = 'authStatus'

export const AUTH_REQUEST = `${AUTH}/${REQUEST}`
export const AUTH_SUCCESS = `${AUTH}/${SUCCESS}`
export const AUTH_ERROR = `${AUTH}/${ERROR}`
export const AUTH_LOGOUT = `${AUTH}/${LOGOUT}`
export const AUTH_VALIDATE_COOKIE = `${AUTH}/${VALIDATE_COOKIE}`
export const AUTH_IS_VALIDATED = `${AUTH}/${IS_VALIDATED}`
export const AUTH_AUTH_STATUS = `${AUTH}/${AUTH_STATUS}`

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
      const user = JSON.parse(parsed.user)
      if (token && user) {
        commit(SUCCESS, { token, user })
      } else {
        // auth cookies are invalid, logout immediately
        dispatch(LOGOUT)
      }
      resolve()
    })
}
