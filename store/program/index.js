import { getField, updateField } from 'vuex-map-fields'
import { ProgramApi } from '../../core/Api' //need StudentApi
import {
  SUCCESS,
  ERROR,
  REQUEST,
  SUBMIT,
  ADD_BACKGROUND,
  EDUCATIONAL_BACKGROUND,
  REMOVE_BACKGROUND
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

  [EDUCATIONAL_BACKGROUND]: (state, value) => {
    state.program.educationalBackground = value
  },

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
    }),

  [ADD_BACKGROUND]: ({ commit, state }, { education }) => {
    const shallowCopy = [...state.program.educationalBackground] //student
    shallowCopy.push(education)
    commit(EDUCATIONAL_BACKGROUND, shallowCopy)
  },

  [REMOVE_BACKGROUND]: ({ commit, state }, { education }) => {
    const shallowCopy = [...state.program.educationalBackground] //student
    shallowCopy.splice(shallowCopy.indexOf(education), 1)
    commit(EDUCATIONAL_BACKGROUND, shallowCopy)
  }
}
