import { RoomApi } from '../../core/api'
import { REQUEST, SUCCESS, ERROR, ROOMS, CLEAR, CREATE } from './methods'

const emptyState = () => ({
  status: '',
  rooms: []
})

export const state = () => emptyState()

export const getters = {
  [ROOMS]: state => state.rooms
}

export const mutations = {
  [REQUEST]: state => {
    state.status = 'loading'
  },

  [SUCCESS]: (state, { rooms }) => {
    state.status = 'success'
    state.rooms = rooms
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
        const response = await RoomApi.getRooms()
        commit(SUCCESS, { rooms: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    }),

  [CREATE]: ({ commit }, data) =>
    new Promise(async (resolve, reject) => {
      commit(CREATE)
      try {
        const response = await RoomApi.createRoom(data)
        commit(SUCCESS, { room: response.data })
        resolve(response)
      } catch (e) {
        commit(ERROR)
        reject(e)
      }
    })
}
