import { MessagesApi } from '../../core/Api'
import { MESSAGES, REQUEST, SUCCESS, ERROR, UPDATE, PUBLISH } from './methods'

const emptyState = () => ({
  status: '',
  messages: []
})

export const state = () => emptyState()

export const getters = {
  [MESSAGES]: state => state.messages
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [UPDATE]: state => {
    state.status = 'updating'
  },

  [SUCCESS]: (state, { messages }) => {
    state.status = 'success'
    state.messages = messages
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
        const response = await MessagesApi.getMessages()
        commit(SUCCESS, { messages: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [UPDATE]: ({ commit, dispatch }, message) =>
    new Promise(async (resolve, reject) => {
      commit(UPDATE)
      try {
        // ONLY UPDATE THE Message TEMPLATE
        const data = {
          id: message.id,
          template: message.template
        }
        const response = await MessagesApi.updateMessageTemplate(data)
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [PUBLISH]: ({ commit, dispatch }, messageId) =>
    new Promise(async (resolve, reject) => {
      commit(UPDATE)
      try {
        const response = await MessagesApi.publishMessage(messageId)
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
