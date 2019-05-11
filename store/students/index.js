import { StudentApi } from '../../core/Api'
import { REQUEST, SUCCESS, ERROR, STUDENTS, CLEAR } from './methods'

const emptyState = () => ({
  status: '',
  students: []
})

export const state = () => emptyState()

export const getters = {
  [STUDENTS]: state => state.students
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { students }) => {
    state.status = 'success'
    state.students = students
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
        const response = await StudentApi.getStudents()
        commit(SUCCESS, { students: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
