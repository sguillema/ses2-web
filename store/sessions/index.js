import { SessionApi } from '../../core/api'
import { REQUEST, SUCCESS, ERROR, CLEAR, ADD_SESSION } from './methods'

const emptyState = () => ({
  status: '',
  sessions: []
})

export const state = () => emptyState()

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [ADD_SESSION]: state => {
    state.status = 'adding session'
  },

  [SUCCESS]: (state, { sessions }) => {
    state.status = 'success'
    state.sessions = sessions
  },

  [ERROR]: state => {
    state.status = 'error'
  },

  [CLEAR]: state => {
    state = emptyState()
  }
}

export const actions = {
  [REQUEST]: ({ commit }) => {
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await SessionApi.getSessions()
        commit(SUCCESS, { sessions: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
  },

  [ADD_SESSION]: ({ commit }, data) =>
    new Promise(async (resolve, reject) => {
      commit(ADD_SESSION)
      try {
        const response = await SessionApi.addSession(data)
        commit(SUCCESS, { session: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
