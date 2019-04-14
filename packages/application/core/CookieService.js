import Cookies from 'js-cookie'
// TODO: Need to find a better cookie parser method
import cookieparser from 'cookieparser'
import moment from 'moment'

const oneHour = moment()
  .add(1, 'hours')
  .toDate()

export default class CookieService {
  static getParsedCookie(cookie) {
    return cookieparser.parse(cookie)
  }

  static updateAuthCookies({ user, token }) {
    this.setTokenCookie(token)
    this.setUserCookie(user)
  }

  static removeAuthCookies() {
    this.removeTokenCookie()
    this.removeUserCookie()
  }

  static getTokenCookie() {
    Cookies.get('token')
  }

  static removeTokenCookie() {
    Cookies.remove('token')
  }

  static setTokenCookie(token) {
    Cookies.set('token', token, { expires: oneHour })
  }

  static getUserCookie() {
    Cookies.get('user')
  }

  static removeUserCookie() {
    Cookies.remove('user')
  }

  static setUserCookie(user) {
    Cookies.set('user', user, { expires: oneHour })
  }
}
