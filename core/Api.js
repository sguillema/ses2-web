import axios from 'axios'

// useful: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
const ENDPOINT = 'http://localhost:4000'

const AUTHORIZATION = 'Authorization'
const AUTH_ENDPOINT = `${ENDPOINT}/users/auth`
const STUDENT_ENDPOINT = `${ENDPOINT}/students`
const BOOKINGS_ENDPOINT = `${ENDPOINT}/bookings`
const CONSULTATIONS_ENDPOINT = `${ENDPOINT}/consultations`
const SKILLSETS_ENDPOINT = `${ENDPOINT}/skillsets`

export class AuthApi {
  static setAuthorizationHeader(token) {
    axios.defaults.headers.common[AUTHORIZATION] = `Bearer ${token}`
  }

  static removeAuthorizationHeader() {
    delete axios.defaults.headers.common[AUTHORIZATION]
  }

  static async authenticateUser(loginData) {
    return await axios({
      method: 'post',
      url: AUTH_ENDPOINT,
      data: loginData
    })
  }
}

export class StudentApi {
  static async getStudents() {
    return await axios({
      method: 'get',
      url: STUDENT_ENDPOINT
    })
  }

  static async getStudent(id) {
    return await axios({
      method: 'get',
      url: `${STUDENT_ENDPOINT}/${id}`
    })
  }

  static async updateStudent(student) {
    return await axios({
      method: 'patch',
      url: `${STUDENT_ENDPOINT}/${student.id}`,
      data: student
    })
  }
}

export class BookingApi {
  static async getBookings(studentId) {
    return await axios({
      method: 'get',
      url: `${BOOKINGS_ENDPOINT}?studentId=${studentId}`
    })
  }
}
export class SkillsetsApi {
  static async getSkillsets() {
    return await axios({
      method: 'get',
      url: SKILLSETS_ENDPOINT
    })
  }
}

export class ConsultationApi {
  static async getConsultations(studentId) {
    return await axios({
      method: 'get',
      url: `${CONSULTATIONS_ENDPOINT}?studentId=${studentId}`
    })
  }
}
