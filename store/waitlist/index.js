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
    state.bookingsLength = bookings.length
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
    })

  //   [REMOVE_SKILLSET]: ({ commit, dispatch }, { skillsetId, active }) =>
  //     new Promise(async (resolve, reject) => {
  //       commit(REMOVE_SKILLSET)
  //       try {
  //         const response = await SkillsetApi.updateSkillset(skillsetId, {
  //           active
  //         })
  //         dispatch(REQUEST)
  //         resolve(response)
  //       } catch (e) {
  //         commit(ERROR)
  //         reject(e)
  //       }
  //     }),

  //   [ARCHIVE]: ({ commit, dispatch }, skillsetId) =>
  //     new Promise(async (resolve, reject) => {
  //       commit(REQUEST)
  //       try {
  //         const response = await SkillsetApi.updateSkillset(skillsetId, {
  //           active: false
  //         })
  //         dispatch(REQUEST, { hideArchived: true })
  //         resolve(response)
  //       } catch (e) {
  //         commit(ERROR)
  //         reject(e)
  //       }
  //     }),

  //   [ADD_SKILLSET]: ({ commit, dispatch }, skillset) =>
  //     new Promise(async (resolve, reject) => {
  //       commit(ADD_SKILLSET)
  //       try {
  //         const response = await SkillsetApi.addSkillset(skillset)
  //         dispatch(REQUEST, { hideArchived: true })
  //         resolve(response)
  //       } catch (e) {
  //         commit(ERROR)
  //         reject(e)
  //       }
  //     })
}
