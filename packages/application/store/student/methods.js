import { storeModule } from '../../core/helpers'

const MODULE = 'auth'

export const STUDENT = 'student'
export const CAF_COMPLETED = 'CAFcompleted'
export const BEST_CONTACT_NO = 'bestContactNo'
export const COUNTRY_OF_ORIGIN = 'countryOfOrigin'
export const COURSE = 'course'
export const DEGREE_TYPE = 'degreeType'
export const EDUCATIONAL_BACKGROUND = 'educationalBackground'
export const EMAIL = 'email'
export const FACULTY = 'faculty'
export const FIRST_LANGUAGE = 'firstLanguage'
export const GENDER = 'gender'
export const HOME_PHONE = 'homePhone'
export const ID = 'id'
export const DOB = 'dob'
export const MOBILE_NUMBER = 'mobileNumber'
export const NAME = 'name'
export const PREFERRED_NAME = 'preferredName'
export const SPECIAL_NEEDS = 'specialNeeds'
export const STATUS = 'status'
export const ENROLMENT_YEAR = 'enrolmentYear'
export const ALLOW_SUBMISSIONS = 'allowSubmissions'

export const REQUEST = 'fetch'
export const SUBMIT = 'submit'
export const SUCCESS = 'success'
export const ERROR = 'error'

export const studentModules = method => storeModule(MODULE, method)