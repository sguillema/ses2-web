import { storeModule } from '../../core/helpers'

const MODULE = 'sessions'
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`
export const CLEAR = 'clear'
export const CREATE = `create`
export const SESSIONS = 'sessions'
export const SESSION = `session`

export const sessionsModule = method => storeModule(MODULE, method)
