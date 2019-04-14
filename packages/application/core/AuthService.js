import AuthApi from './Api/AuthApi'
import CookieService from './CookieService'

export default class AuthService {
  static async authenticateUser({ commit }, loginData) {
    const response = await AuthApi.authenticateUser(loginData)
    this.updateAuthState(commit, response.data)
    CookieService.updateAuthCookies(response.data)
  }

  static async updateAuthState(commit, { user, token }) {
    commit('updateToken', token)
    if (user) {
      commit('updateUserId', user.id)
    }
  }

  static async removeAuthState(commit) {
    commit('updateToken', null)
    commit('updateUserId', null)
  }

  static async endSession({ commit }) {
    this.removeAuthState(commit)
    CookieService.removeAuthCookies()
    window.location.href = '/'
  }
}
