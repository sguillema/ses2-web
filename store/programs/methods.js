import { storeModule } from '../../core/helpers'

const MODULE = 'programs'
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`
export const PROGRAMS = 'users'
export const CLEAR = 'clear'
export const CREATE = 'create'

export const programsModule = method => storeModule(MODULE, method)
