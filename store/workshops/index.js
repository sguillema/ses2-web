import { WorkshopApi, SessionApi } from '../../core/Api'
import {
  REQUEST,
  SUCCESS,
  ERROR,
  WORKSHOPS,
  CLEAR,
  CREATE,
  SESSIONS,
  REQUEST_SESSIONS,
  EDIT_SESSIONS
} from './methods'

const emptyState = () => ({
  status: '',
  workshops: []
})

export const state = () => emptyState()

export const getters = {
  [WORKSHOPS]: state => state.workshops,
  [SESSIONS]: state => state.sessions
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { workshops }) => {
    state.status = 'success'
    state.workshops = workshops
  },
  [SESSIONS]: (state, { sessions }) => {
    state.status = 'success sessions '
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
  [REQUEST]: ({ commit }, filters) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        let response
        if (filters) {
          const { programId } = filters
          if (programId)
            response = await WorkshopApi.getWorkshopsByProgramId(programId)
        } else {
          response = await WorkshopApi.getWorkshops()
        }
        commit(SUCCESS, { workshops: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),
  [REQUEST_SESSIONS]: ({ commit }, id) =>
    new Promise(async (resolve, reject) => {
      commit(REQUEST)
      try {
        const response = await WorkshopApi.getSessionsByWorkshopId(id)
        commit(SESSIONS, { sessions: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),
  [EDIT_SESSIONS]: ({ commit, dispatch }, editNew) =>
    new Promise(async (resolve, reject) => {
      commit(EDIT_SESSIONS)
      try {
        const response = await SessionApi.updateSessionBySessionId(
          editNew.sessionId,
          editNew
        )
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),
  [CREATE]: ({ commit, dispatch }, data) =>
    new Promise(async (resolve, reject) => {
      commit(CREATE)
      try {
        const response = await WorkshopApi.createWorkshop(data)
        dispatch(REQUEST)
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
