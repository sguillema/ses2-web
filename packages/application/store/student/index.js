import { getField, updateField } from 'vuex-map-fields'
import { StudentApi } from '../../core/Api'
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
  student: {
    id: '',
    name: '',
    preferredName: '',
    gender: '',
    DOB: '',
    countryOfOrigin: '',
    firstLanguage: '',
    email: '',
    homePhone: '',
    mobileNumber: '',
    bestContactNo: '',
    CAFcompleted: '',
    specialNeeds: '',
    degreeType: '',
    course: '',
    faculty: '',
    enrolmentYear: '',
    status: '',
    educationalBackground: [],
    allowSubmissions: ''
  }
})

export const state = () => emptyState()

export const getters = {
  getField
}

export const mutations = {
  updateField,

  [EDUCATIONAL_BACKGROUND]: (state, value) => {
    state.student.educationalBackground = value
  },

  [REQUEST]: state => {
    state = emptyState()
    state.status = 'loading'
  },
  [SUCCESS]: (state, student) => {
    state.status = 'success'
    state.student = student
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
        const response = await StudentApi.getStudent(id)
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
        const response = await StudentApi.updateStudent(state.student)
        commit(SUCCESS)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [ADD_BACKGROUND]: ({ commit, state }, { education }) => {
    const shallowCopy = [...state.student.educationalBackground]
    shallowCopy.push(education)
    commit(EDUCATIONAL_BACKGROUND, shallowCopy)
  },

  [REMOVE_BACKGROUND]: ({ commit, state }, { education }) => {
    const shallowCopy = [...state.student.educationalBackground]
    shallowCopy.splice(shallowCopy.indexOf(education), 1)
    commit(EDUCATIONAL_BACKGROUND, shallowCopy)
  }
}
