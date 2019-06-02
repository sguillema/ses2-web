// import { stat } from 'fs'
import { SkillsetApi } from '../../core/Api.js'
import {
  REQUEST,
  SUCCESS,
  ERROR,
  SKILLSETS,
  CLEAR,
  DELETE,
  ADD_SKILLSET
} from './methods'

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

  [ADD_SKILLSET]: state => {
    state.status = 'adding skillset'
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
    }),

  [ADD_SKILLSET]: ({ commit, dispatch }, skillset) =>
    new Promise(async (resolve, reject) => {
      commit(ADD_SKILLSET)
      try {
        const response = await SkillsetApi.addSkillset(skillset)
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
