import axios from 'axios'

// useful: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
const ENDPOINT = 'http://localhost:4000'

const AUTHORIZATION = 'Authorization'
const AUTH_ENDPOINT = `${ENDPOINT}/users/auth`
const STUDENT_ENDPOINT = `${ENDPOINT}/students`
const BOOKINGS_ENDPOINT = `${ENDPOINT}/bookings`
const CONSULTATIONS_ENDPOINT = `${ENDPOINT}/consultations`
const SKILLSET_ENDPOINT = `${ENDPOINT}/skillsets`
const PROGRAMS_ENDPOINT = `${ENDPOINT}/programs`
const WORKSHOPS_ENDPOINT = `${ENDPOINT}/workshops`
const STAFF_ENDPOINT = `${ENDPOINT}/staff`

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

//Student API
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

  static async createStudent(student) {
    return await axios({
      method: 'post',
      url: `${STUDENT_ENDPOINT}`,
      data: student
    })
  }
}

//Booking API
export class BookingApi {
  static async getBookings(studentId) {
    return await axios({
      method: 'get',
      url: `${BOOKINGS_ENDPOINT}?studentId=${studentId}`
    })
  }
}

//Booking API
export class ConsultationApi {
  static async getConsultations(studentId) {
    return await axios({
      method: 'get',
      url: `${CONSULTATIONS_ENDPOINT}?studentId=${studentId}`
    })
  }
}

//Skillset API
export class SkillsetApi {
  static async getSkillsets() {
    return await axios({
      method: 'get',
      url: SKILLSET_ENDPOINT
    })
  }

  static async getSkillset(id) {
    return await axios({
      method: 'get',
      url: `${SKILLSET_ENDPOINT}/${id}`
    })
  }

  static async updateSkillset(skillset) {
    return await axios({
      method: 'delete',
      url: `${SKILLSET_ENDPOINT}/${skillset.id}`,
      data: skillset
    })
  }

  static async deleteSkillset(id) {
    return await axios({
      method: 'delete',
      url: `${SKILLSET_ENDPOINT}/${id}`
    })
  }

  static async addSkillset(data) {
    return await axios({
      method: 'post',
      url: `${SKILLSET_ENDPOINT}`,
      data: data
    })
  }
}

export class ProgramApi {
  static async getPrograms() {
    return await axios({
      method: 'get',
      url: PROGRAMS_ENDPOINT
    })
  }

  static async getProgram(id) {
    return await axios({
      method: 'get',
      url: `${PROGRAMS_ENDPOINT}/${id}`
    })
  }

  static async createProgram(data) {
    return await axios({
      method: 'post',
      url: PROGRAMS_ENDPOINT,
      data: data
    })
  }

  static async updateProgram(data) {
    return await axios({
      method: 'patch',
      url: `${PROGRAMS_ENDPOINT}/${data.id}`,
      data: data
    })
  }

  static async deleteProgram(id) {
    return await axios({
      method: 'delete',
      url: `${PROGRAMS_ENDPOINT}/${id}`
    })
  }
}

export class WorkshopApi {
  static async getWorkshops() {
    return await axios({
      method: 'get',
      url: WORKSHOPS_ENDPOINT
    })
  }

  static async getWorkshop(id) {
    return await axios({
      method: 'get',
      url: `${WORKSHOPS_ENDPOINT}/${id}`
    })
  }

  static async createWorkshop(data) {
    return await axios({
      method: 'post',
      url: WORKSHOPS_ENDPOINT
    })
  }

  static async updateWorkshop(data) {
    return await axios({
      method: 'patch',
      url: `${WORKSHOPS_ENDPOINT}/${data.id}`
    })
  }

  static async deleteProgram(id) {
    return await axios({
      method: 'delete',
      url: `${PROGRAMS_ENDPOINT}/${id}`
    })
  }
}

//Advisors API
export class AdvisorApi {
  static async getAdvisors() {
    return await axios({
      method: 'get',
      url: STAFF_ENDPOINT
    })
  }

  static async getAdvisor(id) {
    return await axios({
      method: 'get',
      url: `${STAFF_ENDPOINT}/${id}`
    })
  }

  static async createAdvisor(data) {
    return await axios({
      method: 'post',
      url: `${STAFF_ENDPOINT}`,
      data: data
    })
  }
  static async updateAdvisor(data) {
    return await axios({
      method: 'patch',
      url: `${STAFF_ENDPOINT}/${data.id}`,
      data: data
    })
  }
  static async deleteAdvisor(id) {
    return await axios({
      method: 'delete',
      url: `${STAFF_ENDPOINT}/${id}`
    })
  }
}
