import { StudentApi } from '../../core/Api'
import { REQUEST, SUCCESS, ERROR, STUDENTS, CLEAR, CREATE } from './methods'

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

  [CREATE]: (state, student) => {
    state.status = 'create'
    state.students.push = student
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
    }),

  [CREATE]: ({ commit }, data) =>
    new Promise(async (resolve, reject) => {
      commit(CREATE)
      try {
        const response = await StudentApi.createStudent(data)
        commit(SUCCESS, { student: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
