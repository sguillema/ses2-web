import { EmailsApi } from '../../core/Api'
import { EMAILS, REQUEST, SUCCESS, ERROR, UPDATE, PUBLISH } from './methods'

const emptyState = () => ({
  status: '',
  emails: []
})

export const state = () => emptyState()

export const getters = {
  [EMAILS]: state => state.emails
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [UPDATE]: state => {
    state.status = 'updating'
  },

  [SUCCESS]: (state, { emails }) => {
    state.status = 'success'
    state.emails = emails
  },

  [ERROR]: state => {
    state.status = 'error'
  }
}

export const actions = {
  [REQUEST]: ({ commit }) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await EmailsApi.getEmails()
        commit(SUCCESS, { emails: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [UPDATE]: ({ commit, dispatch }, email) =>
    new Promise(async (resolve, reject) => {
      commit(UPDATE)
      try {
        // ONLY UPDATE THE EMAIL TEMPLATE
        const data = {
          id: email.id,
          template: email.template
        }
        const response = await EmailsApi.updateEmailTemplate(data)
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [PUBLISH]: ({ commit, dispatch }, { emailId }) =>
    new Promise(async (resolve, reject) => {
      commit(UPDATE)
      try {
        const response = await EmailsApi.publishEmail(emailId)
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
