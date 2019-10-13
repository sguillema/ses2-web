import { BookingApi } from '../../core/Api.js'
import {
  REQUEST,
  BOOKINGS,
  CLEAR_STUDENT,
  ERROR,
  SUCCESS,
  ADD_STUDENT,
  REMOVE_STUDENT,
  BOOKINGS_LENGTH
} from './methods'

const emptyState = () => ({
  status: '',
  bookings: [],
  bookingsLength: ''
})

export const state = () => emptyState()

export const getters = {
  [BOOKINGS]: state => state.bookings,
  [BOOKINGS_LENGTH]: state => state.bookingsLength
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [ADD_STUDENT]: state => {
    state.status = 'adding student'
  },
  [REMOVE_STUDENT]: state => {
    state.status = 'deleting student'
  },

  [SUCCESS]: (state, { bookings }) => {
    state.status = 'success'
    state.bookings = bookings
    state.bookingsLength = Object.keys(bookings.waitlist).length
  },

  [ERROR]: state => {
    state.status = 'error'
  },

  [CLEAR_STUDENT]: state => {
    state = emptyState()
  }
}

export const actions = {
  [REQUEST]: ({ commit }, { sessionId }) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        let response = await BookingApi.getBookings(sessionId)
        commit(SUCCESS, { bookings: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [ADD_STUDENT]: ({ commit, dispatch }, { studentId }) =>
    new Promise(async (resolve, reject) => {
      commit(ADD_STUDENT)
      try {
        await BookingApi.addBooking(studentId)
        console.log(studentId.sessionId)
        dispatch(REQUEST, { sessionId: 'sessionId=' + studentId.sessionId })
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [REMOVE_STUDENT]: ({ commit, dispatch }, { body }) =>
    new Promise(async (resolve, reject) => {
      commit(REMOVE_STUDENT)
      try {
        await BookingApi.deleteBooking(body.bookingId)
      } catch (e) {
        dispatch(REQUEST, { sessionId: 'sessionId=' + body.sessionId })
        commit(ERROR)
        reject(e)
      }
    })
}
