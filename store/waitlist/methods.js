import { storeModule } from '../../core/helpers'

const MODULE = 'waitlist'

// fetching states
export const REQUEST = 'request'
export const SUCCESS = 'success'
export const ERROR = 'error'
export const DELETE = 'delete'

// mapped fields
export const BOOKINGS = 'bookings'
export const BOOKINGS_LENGTH = 'bookingsLength'

// methods
export const ADD_STUDENT = 'addStudent'
export const REMOVE_STUDENT = 'removeStudent'
export const CLEAR_STUDENT = 'clearStudent'

export const waitListModule = method => storeModule(MODULE, method)
