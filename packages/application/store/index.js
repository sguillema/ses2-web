// Need to find a better cookie parser method
import cookieparser from 'cookieparser'

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
    let token = null
    let userId = null
    let userType = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      token = parsed.token
      userId = parsed.user ? parsed.user.id : null
      userType = parsed.type
    }
    commit('updateToken', token)
    commit('updateUserId', userId)
    commit('updateUserType', userType)
  }
}
