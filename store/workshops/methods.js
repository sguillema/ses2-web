import { storeModule } from '../../core/helpers'

const MODULE = 'workshops'
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`
export const WORKSHOPS = 'users'
export const CLEAR = 'clear'
export const CREATE = 'create'

export const workshopsModule = method => storeModule(MODULE, method)
