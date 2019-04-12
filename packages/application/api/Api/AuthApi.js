import axios from 'axios'

// useful: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

let endpoint = 'http://localhost:4001'
export default class AuthApi {
  static async authenticateUser(loginData) {
    return await axios({
      method: 'post',
      url: endpoint + '/users/auth',
      data: loginData
    })
  }
}
