// import { stat } from 'fs'
import { SkillsetApi } from '../../core/Api.js'
import {
  REQUEST,
  SUCCESS,
  ERROR,
  SKILLSETS,
  CLEAR,
  DELETE,
  ADD_SKILLSET,
  REMOVE_SKILLSET,
  ARCHIVE,
  EDIT_SKILLSETS,
  UNARCHIVE
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
  [REMOVE_SKILLSET]: state => {
    state.status = 'deleting skillset'
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
  },
  [DELETE]: state => {
    state.status = 'deleted'
  }
}

export const actions = {
  [REQUEST]: ({ commit }, { hideArchived, showArchive }) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        let response
        if (hideArchived) response = await SkillsetApi.getActiveSkillsets()
        else response = await SkillsetApi.getSkillsets()
        if (showArchive) response = await SkillsetApi.getArchiveSkillsets()
        commit(SUCCESS, { skillsets: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [REMOVE_SKILLSET]: ({ commit, dispatch }, { skillsetId, active }) =>
    new Promise(async (resolve, reject) => {
      commit(REMOVE_SKILLSET)
      try {
        const response = await SkillsetApi.updateSkillset(skillsetId, {
          active
        })
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [ARCHIVE]: ({ commit, dispatch }, skillsetId) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await SkillsetApi.updateSkillset(skillsetId, {
          active: false
        })
        dispatch(REQUEST, { hideArchived: true })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),
  [UNARCHIVE]: ({ commit, dispatch }, skillsetId) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await SkillsetApi.updateSkillset(skillsetId, {
          active: true
        })
        dispatch(REQUEST, { showArchive: true })
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
        dispatch(REQUEST, { hideArchived: true })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),
  [EDIT_SKILLSETS]: ({ commit, dispatch }, editNew) =>
    new Promise(async (resolve, reject) => {
      commit(EDIT_SKILLSETS)
      try {
        const response = await SkillsetApi.updateSkillset(
          editNew.skillsetId,
          editNew
        )
        dispatch(REQUEST, { hideArchived: true })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
