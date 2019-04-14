import CookieService from '../core/CookieService'
import AuthService from '../core/AuthService'

export const state = () => ({
  token: null,
  userId: null,
  userType: null,
  userPreferredName: null
})

export const mutations = {
  updateToken(state, data) {
    state.token = data
  },
  updateUserId(state, data) {
    state.userId = data
  },
  updateUserType(state, data) {
    state.userType = data
  },
  updateUserPreferredName(state, data) {
    state.userPreferredName = data
  },
  clearToken(state) {
    state.token = null
  },
  clearUser(state) {
    state.userId = null
    state.userType = null
    state.userPreferredName = null
  },
  clearAppState(state) {
    Object.keys(state).forEach(key => {
      state[key] = null
    })
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const cookie = req.headers.cookie
    if (cookie) {
      const parsed = CookieService.getParsedCookie(cookie)
      AuthService.updateAuthState(commit, parsed)
    }
  }
}

export const getters = {}
