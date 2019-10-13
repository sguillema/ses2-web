import { storeModule } from '../../core/helpers'

const MODULE = 'emails'
export const EMAILS = 'emails'
export const REQUEST = 'request'
export const SUCCESS = 'success'
export const ERROR = 'error'
export const UPDATE = 'update'
export const PUBLISH = 'publish'

export const emailsModule = method => storeModule(MODULE, method)
