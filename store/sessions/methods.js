import { storeModule } from '../../core/helpers'

const MODULE = 'sessions'

export const REQUEST = 'request'
export const SUBMIT = 'submit'
export const SUCCESS = 'success'
export const ERROR = 'error'
export const CLEAR = 'clear'

export const SESSIONS = 'sessions'

export const ADD_SESSION = 'addSession'

export const sessionsModule = method => storeModule(MODULE, method)
