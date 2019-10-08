import { SessionApi } from '../../core/Api'
import { REQUEST, SUCCESS, ERROR, SESSIONS, CLEAR, CREATE } from './methods'

const emptyState = () => ({
  status: '',
  sessions: []
})

export const state = () => emptyState()

export const getters = {
  [SESSIONS]: state => state.sessions
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [CREATE]: state => {
    state.status = 'creating sessions'
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
  [REQUEST]: ({ commit }) =>
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
}
