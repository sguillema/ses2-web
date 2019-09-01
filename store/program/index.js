import { getField, updateField } from 'vuex-map-fields'
import { ProgramApi } from '../../core/Api' //need StudentApi
import {
  SUCCESS,
  ERROR,
  REQUEST,
  SUBMIT //,
} from './methods'

const emptyState = () => ({
  status: '',
  program: {
    id: '',
    skillsetId: '',
    title: '',
    targetGroup: '',
    description: ''
  }
})

export const state = () => emptyState()

export const getters = {
  getField
}

export const mutations = {
  updateField,

  [REQUEST]: state => {
    state = emptyState()
    state.status = 'loading'
  },
  [SUCCESS]: (state, program) => {
    state.status = 'success'
    state.program = program
  },
  [ERROR]: state => {
    state.status = 'error'
  },
  [SUBMIT]: state => {
    state.status = 'submitting'
  }
}

export const actions = {
  [REQUEST]: ({ commit }, { id }) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await ProgramApi.getProgram(id)
        commit(SUCCESS, response.data)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [SUBMIT]: ({ commit, state }) =>
    new Promise(async (resolve, reject) => {
      commit(SUBMIT)
      try {
        const response = await ProgramApi.updateProgram(state.program)
        commit(SUCCESS, state.program)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }) //,
}
