import Cookies from 'js-cookie'
// TODO: Need to find a better cookie parser method
import cookieparser from 'cookieparser'
import { getExpiryOptions } from './helpers'

const TOKEN = 'token'
const USER = 'user'

export default class CookieService {
  static getParsedCookie(cookie) {
    return cookieparser.parse(cookie)
  }

  static updateAuthCookies({ user, token, shouldRemember }) {
    let options = getExpiryOptions(shouldRemember)
    this.setTokenCookie(token, options)
    this.setUserCookie(user, options)
  }

  static removeAuthCookies() {
    this.removeTokenCookie()
    this.removeUserCookie()
  }

  static getTokenCookie() {
    Cookies.get(TOKEN)
  }

  static removeTokenCookie() {
    Cookies.remove(TOKEN)
  }

  static setTokenCookie(token, options) {
    Cookies.set(TOKEN, token, options)
  }

  static getUserCookie() {
    Cookies.get(USER)
  }

  static removeUserCookie() {
    Cookies.remove(USER)
  }

  static setUserCookie(user, options) {
    Cookies.set(USER, user, options)
  }
}
