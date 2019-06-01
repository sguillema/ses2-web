import { SkillsetApi } from '../../core/Api.js'
import { REQUEST, SUCCESS, ERROR, SKILLSETS, CLEAR, DELETE } from './methods'

const emptyState = () => ({
  status: '',
  skillsets: []
})

export const state = () => emptyState()

export const getters = {
  [SKILLSETS]: state => state.skillsets
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { skillsets }) => {
    state.status = 'success'
    state.skillsets = skillsets
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
        const response = await SkillsetApi.getSkillsets()
        commit(SUCCESS, { skillsets: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [DELETE]: ({ commit, state }) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await SkillsetApi.deleteSkillset(state.skillsets)
        commit(SUCCESS, { skillsets: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
