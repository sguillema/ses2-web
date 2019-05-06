import { storeModule } from '../../core/helpers'

const MODULE = 'auth'
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`
export const LOGOUT = `logout`
export const VALIDATE_COOKIE = `validateCookie`
export const IS_VALIDATED = `isValidated`
export const AUTH_STATUS = `authStatus`
export const TYPE = 'userType'
export const IS_ADMIN = 'isAdmin'
export const IS_STUDENT = 'isStudent'
export const USER = 'user'
export const IS_REGISTERED = 'isRegistered'

export const authModule = method => storeModule(MODULE, method)
