import { storeModule } from '../../core/helpers'

const MODULE = 'advisors'

//state
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`
export const ADVISORS = 'users'
export const CLEAR = 'clear'

//method
export const CREATE = `create`
//export const REMOVE = `remove`

export const advisorsModule = method => storeModule(MODULE, method)
