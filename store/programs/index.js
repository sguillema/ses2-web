import { ProgramApi } from '../../core/Api'
import { REQUEST, SUCCESS, ERROR, PROGRAMS, CLEAR, CREATE } from './methods'

const emptyState = () => ({
  status: '',
  programs: []
})

export const state = () => emptyState()

export const getters = {
  [PROGRAMS]: state => state.programs
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { programs }) => {
    state.status = 'success'
    state.programs = programs
  },

  [ERROR]: state => {
    state.status = 'error'
  },

  [CLEAR]: state => {
    state = emptyState()
  }
}

export const actions = {
  [REQUEST]: ({ commit }, filters) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        let response
        if (filters) {
          const { skillsetId } = filters
          if (skillsetId)
            response = await ProgramApi.getProgramsBySkillsetId(skillsetId)
        } else {
          response = await ProgramApi.getPrograms()
        }
        commit(SUCCESS, { programs: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [CREATE]: ({ commit, dispatch }, data) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await ProgramApi.createProgram(data)
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
