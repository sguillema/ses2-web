import { storeModule } from '../../core/helpers'

const MODULE = 'messages'
export const MESSAGES = ' messages'
export const REQUEST = 'request'
export const SUCCESS = 'success'
export const ERROR = 'error'
export const UPDATE = 'update'
export const PUBLISH = 'publish'

export const messagesModule = method => storeModule(MODULE, method)
