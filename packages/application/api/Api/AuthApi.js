import axios from 'axios'

// useful: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

export default class AuthApi {
  static endpoint = 'http://localhost:4001'

  static async authenticateUser(loginData) {
    return await axios({
      method: 'post',
      url: this.endpoint + '/users/auth',
      data: loginData
    })
  }
}
