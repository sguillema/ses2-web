import { AdvisorApi } from '../../core/Api'
import { REQUEST, SUCCESS, ERROR, ADVISORS, CLEAR, CREATE } from './methods'

const emptyState = () => ({
  status: '',
  advisors: []
})

export const state = () => emptyState()

export const getters = {
  [ADVISORS]: state => state.advisors
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [CREATE]: (state, advisor) => {
    state.status = 'create'
    state.advisors.push = advisor
  },

  [SUCCESS]: (state, { advisors }) => {
    state.status = 'success'
    state.advisors = advisors
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
        const response = await AdvisorApi.getAdvisors()
        commit(SUCCESS, { advisors: response.data })
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
        const response = await AdvisorApi.createAdvisor(data)
        commit(SUCCESS, { advisor: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
