import { storeModule } from '../../core/helpers'

const MODULE = 'skillsets'

// fetching states
export const REQUEST = 'request'
export const SUBMIT = 'submit'
export const SUCCESS = 'success'
export const ERROR = 'error'
export const CLEAR = 'clear'
export const DELETE = 'delete'

// mapped fields
export const ACTIVESKILLSETS = 'activeSkillsets'
export const SKILLSETS = 'skillsets'
export const SKILLSET = 'skillset'
// export const TITLE = 'skillset.title'
// export const SHORT_TITLE = 'skillset.shortTitle'
// export const NO_OF_WORKSHOPS = 'skillset.noOfWorkshops'

// methods
export const ADD_SKILLSET = 'addSkillset'
export const REMOVE_SKILLSET = 'removeSkillset'
export const ARCHIVE = 'archive'

export const skillsetsModule = method => storeModule(MODULE, method)
