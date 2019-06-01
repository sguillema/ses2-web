import { storeModule } from '../../core/helpers'

const MODULE = 'programs'

// fetching states
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`

// hello andre
export const PROGRAMS = 'programs'
export const CLEAR = 'clear'

export const programModule = method => storeModule(MODULE, method)
