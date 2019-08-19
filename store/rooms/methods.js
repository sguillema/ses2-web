import { storeModule } from '../../core/helpers'

const MODULE = 'rooms'
export const REQUEST = 'request'
export const SUCCESS = 'success'
export const ERROR = 'error'
export const ROOMS = 'users'
export const CLEAR = 'clear'
export const CREATE = 'create'

export const roomsModule = method => storeModule(MODULE, method)
