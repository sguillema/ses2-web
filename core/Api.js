import querystring from 'querystring'
import axios from 'axios'
// useful: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
const ENDPOINT = 'http://localhost:4000'

const AUTHORIZATION = 'Authorization'
const AUTH_ENDPOINT = `${ENDPOINT}/users/auth`
const STUDENT_ENDPOINT = `${ENDPOINT}/students`
const BOOKINGS_ENDPOINT = `${ENDPOINT}/bookings`
const SKILLSETS_ENDPOINT = `${ENDPOINT}/skillsets`
const PROGRAMS_ENDPOINT = `${ENDPOINT}/programs`
const WORKSHOPS_ENDPOINT = `${ENDPOINT}/workshops`
const STAFF_ENDPOINT = `${ENDPOINT}/staff`
const SESSIONS_ENDPOINT = `${ENDPOINT}/sessions`
const BOOKINGDETAIL_ENDPOINT = `${ENDPOINT}/booking-details`
const ROOMS_ENDPOINT = `${ENDPOINT}/rooms`
const EMAILS_ENDPOINT = `${ENDPOINT}/emails`
const EMAILPLACEHOLDERS_ENDPOINT = `${ENDPOINT}/email-placeholders`
const MESSAGES_ENDPOINT = `${ENDPOINT}/messages`

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
  static async getBooking(bookingId) {
    return await axios({
      method: 'get',
      url: `${BOOKINGS_ENDPOINT}/${bookingId}`
    })
  }

  static async getBookings(params) {
    const query = querystring.stringify(params)
    return await axios({
      method: 'get',
      url: `${BOOKINGS_ENDPOINT}?${query}`
    })
  }

  static async getBookingsBySessionId(sessionId) {
    return await this.getBookings({
      sessionId
    })
  }

  static async addBooking(booking) {
    return await axios({
      method: 'post',
      url: `${BOOKINGS_ENDPOINT}`,
      data: booking
    })
  }

  static async deleteBooking(body) {
    return await axios({
      method: 'delete',
      url: `${BOOKINGS_ENDPOINT}/${body}`
    })
  }
}
//Booking details API
export class BookingDetailsApi {
  static async getBookingDetail(bookingDetailsId) {
    return await axios({
      method: 'get',
      url: `${BOOKINGDETAIL_ENDPOINT}/${bookingDetailsId}`
    })
  }

  static async getBookingDetailByBookingId(bookingId) {
    return await axios({
      method: 'get',
      url: `${BOOKINGDETAIL_ENDPOINT}?bookingId=${bookingId}`
    })
  }

  static async addBookingDetails(bookingDetails) {
    return await axios({
      method: 'post',
      url: `${BOOKINGDETAIL_ENDPOINT}`,
      data: bookingDetails
    })
  }
}
//Session API
export class SessionApi {
  static async getSessions(params) {
    const query = querystring.stringify(params)
    return await axios({
      method: 'get',
      url: `${SESSIONS_ENDPOINT}?${query}`
    })
  }

  static async getSessionsByWorkshopId(workshopId) {
    return await this.getSessions({
      workshopId
    })
  }

  static async getConsultationSessions() {
    const params = {
      type: 'consultation'
    }
    return await this.getSessions(params)
  }

  static async getSession(sessionId) {
    return await axios({
      method: 'get',
      url: `${SESSIONS_ENDPOINT}/${sessionId}`
    })
  }
  static async addSession(data) {
    return await axios({
      method: 'post',
      url: `${SESSIONS_ENDPOINT}`,
      data: data
    })
  }
}

//Skillset API
export class SkillsetApi {
  static async getSkillsets() {
    return await axios({
      method: 'get',
      url: SKILLSETS_ENDPOINT
    })
  }

  static async getSkillset(id) {
    return await axios({
      method: 'get',
      url: `${SKILLSETS_ENDPOINT}/${id}`
    })
  }

  static async updateSkillset(skillsetId, body) {
    return await axios({
      method: 'patch',
      url: `${SKILLSETS_ENDPOINT}/${skillsetId}`,
      data: body
    })
  }

  static async deleteSkillset(id) {
    return await axios({
      method: 'delete',
      url: `${SKILLSETS_ENDPOINT}/${id}`
    })
  }

  static async addSkillset(data) {
    return await axios({
      method: 'post',
      url: `${SKILLSETS_ENDPOINT}`,
      data: data
    })
  }

  static async getActiveSkillsets() {
    return await axios({
      method: 'get',
      url: `${SKILLSETS_ENDPOINT}?type=active`
    })
  }

  static async getArchiveSkillsets() {
    return await axios({
      method: 'get',
      url: `${SKILLSETS_ENDPOINT}?type=archived`
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

  static async getProgramsBySkillsetId(skillsetId) {
    return await axios({
      method: 'get',
      url: `${PROGRAMS_ENDPOINT}?skillsetId=${skillsetId}`
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

  static async getWorkshopsByProgramId(programId) {
    return await axios({
      method: 'get',
      url: `${WORKSHOPS_ENDPOINT}?programId=${programId}`
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
      url: WORKSHOPS_ENDPOINT,
      data: data
    })
  }

  static async updateWorkshop(data) {
    return await axios({
      method: 'patch',
      url: `${WORKSHOPS_ENDPOINT}/${data.id}`
    })
  }

  static async deleteWorkshop(id) {
    return await axios({
      method: 'delete',
      url: `${WORKSHOPS_ENDPOINT}/${id}`
    })
  }

  static async getSessionsByWorkshopId(id) {
    return await SessionApi.getSessionsByWorkshopId(id)
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

//Rooms API
export class RoomApi {
  static async getRooms() {
    return await axios({
      method: 'get',
      url: ROOMS_ENDPOINT
    })
  }

  static async getRoom(id) {
    return await axios({
      method: 'get',
      url: `${ROOMS_ENDPOINT}/${id}`
    })
  }

  static async updateRoom(room) {
    return await axios({
      method: 'patch',
      url: `${ROOMS_ENDPOINT}/${room.id}`
    })
  }
}

// Emails Api
export class EmailsApi {
  static async getEmails() {
    return await axios({
      method: 'get',
      url: `${EMAILS_ENDPOINT}`
    })
  }

  static async updateEmailTemplate(email) {
    const { id, template } = email
    const data = { template }
    return await axios({
      method: 'patch',
      url: `${EMAILS_ENDPOINT}/${id}`,
      data
    })
  }

  static async publishEmail(emailId) {
    return await axios({
      method: 'post',
      url: `${EMAILS_ENDPOINT}/${emailId}/publish`
    })
  }

  static async getEmailPlaceholders(type) {
    return await axios({
      method: 'get',
      url: `${EMAILPLACEHOLDERS_ENDPOINT}?type=${type}`
    })
  }
}

export class MessagesApi {
  static async getMessages() {
    return await axios({
      method: 'get',
      url: `${MESSAGES_ENDPOINT}`
    })
  }

  static async getMessage(id) {
    return await axios({
      method: 'get',
      url: `${MESSAGES_ENDPOINT}/${id}`
    })
  }

  static async updateMessageTemplate(message) {
    const { id, template } = message
    const data = { template }
    return await axios({
      method: 'patch',
      url: `${MESSAGES_ENDPOINT}/${id}`,
      data
    })
  }

  static async publishMessage(id) {
    return await axios({
      method: 'post',
      url: `${MESSAGES_ENDPOINT}/${id}/publish`
    })
  }
}
