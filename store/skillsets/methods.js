import { storeModule } from '../../core/helpers'

const MODULE = 'skillsets'

// fetching states
export const REQUEST = `request`
export const SUCCESS = `success`
export const ERROR = `error`

// hello sheng
export const SKILLSETS = 'skillsets'
export const CLEAR = 'clear'

export const skillsetsModule = method => storeModule(MODULE, method)
