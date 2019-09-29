import { storeModule } from '../../core/helpers'

const MODULE = 'program'

export const ID = 'program.id'
export const SKILLSETID = 'program.skillsetId'
export const TITLE = 'program.title'
export const TRAGETGROUP = 'program.targetGroup'
export const DESCRIPTION = 'program.description'

export const REQUEST = 'request'
export const SUBMIT = 'submit'
export const SUCCESS = 'success'
export const ERROR = 'error'

export const ADD_BACKGROUND = 'addBackground'
export const REMOVE_BACKGROUND = 'removeBackground'

export const programModule = method => storeModule(MODULE, method)
