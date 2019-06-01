import { storeModule } from '../../core/helpers'

const MODULE = 'students'
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`
export const STUDENTS = 'users'
export const CLEAR = 'clear'
export const CREATE = 'create'

export const studentsModule = method => storeModule(MODULE, method)
