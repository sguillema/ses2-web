import { WorkshopsApi } from '../../core/Api.js'
import { REQUEST, SUCCESS, ERROR, WORKSHOPS, CLEAR, CREATE } from './methods'

const emptyState = () => ({
  status: '',
  workshops: []
})

export const state = () => emptyState()

export const getters = {
  [WORKSHOPS]: state => state.workshop
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { workshops }) => {
    state.status = 'success'
    state.workshops = workshops
  },

  [ERROR]: state => {
    state.status = 'error'
  },

  [CLEAR]: state => {
    state = emptyState()
  }
}

export const actions = {
  [REQUEST]: ({ commit }) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await WorkshopsApi.getWorkshop(1)
        commit(SUCCESS, { programs: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [CREATE]: ({ commit }, data) =>
    new Promise(async (resolve, reject) => {
      commit(CREATE)
      try {
        const response = await WorkshopsApi.createWorkshop(data)
        commit(SUCCESS, { workshop: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
