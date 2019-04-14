import axios from 'axios'

// useful: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

const AUTHORIZATION = 'Authorization'

const ENDPOINT = 'http://localhost:4001'

export default class AuthApi {
  static setAuthorizationHeader(token) {
    axios.defaults.headers.common[AUTHORIZATION] = token
  }

  static removeAuthorizationHeader() {
    delete axios.defaults.headers.common[AUTHORIZATION]
  }

  static async authenticateUser(loginData) {
    return await axios({
      method: 'post',
      url: `${ENDPOINT}/users/auth`,
      data: loginData
    })
  }
}
