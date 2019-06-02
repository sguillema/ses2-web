import { storeModule } from '../../core/helpers'

const MODULE = 'advisors'

//state
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`
export const CLEAR = 'clear'

//method
export const CREATE = `create`
//export const REMOVE = `remove`

export const ADVISORS = 'users'
export const ADVISOR = `user`

export const advisorsModule = method => storeModule(MODULE, method)
