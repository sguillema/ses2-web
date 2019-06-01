import { ProgramsApi } from '../../core/Api.js'
import { REQUEST, SUCCESS, ERROR, PROGRAMS, CLEAR } from './methods'

const emptyState = () => ({
  status: '',
  programs: []
})

export const state = () => emptyState()

export const getters = {
  [PROGRAMS]: state => state.program
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { programs }) => {
    state.status = 'success'
    state.programs = programs
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
        const response = await ProgramsApi.getProgram(1)
        commit(SUCCESS, { programs: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
