import { StudentApi } from '../../core/Api'
import { SUCCESS, ERROR } from '../auth/methods'
import {
  ID,
  STUDENT,
  CAF_COMPLETED,
  SPECIAL_NEEDS,
  PREFERRED_NAME,
  NAME,
  EMAIL,
  BEST_CONTACT_NO,
  HOME_PHONE,
  MOBILE_NUMBER,
  GENDER,
  COUNTRY_OF_ORIGIN,
  DOB,
  FIRST_LANGUAGE,
  DEGREE_TYPE,
  COURSE,
  FACULTY,
  ENROLMENT_YEAR,
  STATUS,
  EDUCATIONAL_BACKGROUND,
  ALLOW_SUBMISSIONS,
  REQUEST,
  SUBMIT
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
  [STUDENT]: state => state.student,
  [ID]: state => state.student.id,
  [NAME]: state => state.student.name,
  [PREFERRED_NAME]: state => state.student.preferredName,
  [GENDER]: state => state.student.gender,
  [DOB]: state => state.student.DOB,
  [COUNTRY_OF_ORIGIN]: state => state.student.countryOfOrigin,
  [FIRST_LANGUAGE]: state => state.student.firstLanguage,
  [EMAIL]: state => state.student.email,
  [HOME_PHONE]: state => state.student.homePhone,
  [MOBILE_NUMBER]: state => state.student.mobileNumber,
  [BEST_CONTACT_NO]: state => state.student.bestContactNo,
  [CAF_COMPLETED]: state => state.student.CAFcompleted,
  [SPECIAL_NEEDS]: state => state.student.specialNeeds,
  [DEGREE_TYPE]: state => state.student.degreeType,
  [COURSE]: state => state.student.course,
  [FACULTY]: state => state.student.faculty,
  [ENROLMENT_YEAR]: state => state.student.enrolmentYear,
  [STATUS]: state => state.student.status,
  [EDUCATIONAL_BACKGROUND]: state => state.student.educationalBackground,
  [ALLOW_SUBMISSIONS]: state => state.student.allowSubmissions
}

export const mutations = {
  [NAME]: (state, value) => {
    state.student.name = value
  },
  [PREFERRED_NAME]: (state, value) => {
    state.student.preferredName = value
  },
  [GENDER]: (state, value) => {
    state.student.gender = value
  },
  [DOB]: (state, value) => {
    state.student.DOB = value
  },
  [COUNTRY_OF_ORIGIN]: (state, value) => {
    state.student.countryOfOrigin = value
  },
  [FIRST_LANGUAGE]: (state, value) => {
    state.student.firstLanguage = value
  },
  [EMAIL]: (state, value) => {
    state.student.email = value
  },
  [HOME_PHONE]: (state, value) => {
    state.student.homePhone = value
  },
  [MOBILE_NUMBER]: (state, value) => {
    state.student.mobileNumber = value
  },
  [BEST_CONTACT_NO]: (state, value) => {
    state.student.bestContactNo = value
  },
  [CAF_COMPLETED]: (state, value) => {
    state.student.CAFcompleted = value
  },
  [SPECIAL_NEEDS]: (state, value) => {
    state.student.specialNeeds = value
  },
  [DEGREE_TYPE]: (state, value) => {
    state.student.degreeType = value
  },
  [COURSE]: (state, value) => {
    state.student.course = value
  },
  [FACULTY]: (state, value) => {
    state.student.faculty = value
  },
  [ENROLMENT_YEAR]: (state, value) => {
    state.student.enrolmentYear = value
  },
  [STATUS]: (state, value) => {
    state.student.status = value
  },
  [EDUCATIONAL_BACKGROUND]: (state, value) => {
    state.student.educationalBackground = value
  },
  [ALLOW_SUBMISSIONS]: (state, value) => {
    state.student.allowSubmissions = value
  },

  [REQUEST]: state => {
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
    })
}
