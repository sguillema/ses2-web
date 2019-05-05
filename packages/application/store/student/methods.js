import { storeModule } from '../../core/helpers'

const MODULE = 'student'

// mapped fields
export const STUDENT = 'student'
export const CAF_COMPLETED = 'student.CAFcompleted'
export const BEST_CONTACT_NO = 'student.bestContactNo'
export const COUNTRY_OF_ORIGIN = 'student.countryOfOrigin'
export const COURSE = 'student.course'
export const DEGREE_TYPE = 'student.degreeType'
export const EDUCATIONAL_BACKGROUND = 'student.educationalBackground'
export const EMAIL = 'student.email'
export const FACULTY = 'student.faculty'
export const FIRST_LANGUAGE = 'student.firstLanguage'
export const GENDER = 'student.gender'
export const HOME_PHONE = 'student.homePhone'
export const ID = 'student.id'
export const DOB = 'student.DOB'
export const MOBILE_NUMBER = 'student.mobileNumber'
export const NAME = 'student.name'
export const PREFERRED_NAME = 'student.preferredName'
export const SPECIAL_NEEDS = 'student.specialNeeds'
export const STATUS = 'student.status'
export const ENROLMENT_YEAR = 'student.enrolmentYear'
export const ALLOW_SUBMISSIONS = 'student.allowSubmissions'

export const REQUEST = 'request'
export const SUBMIT = 'submit'
export const SUCCESS = 'success'
export const ERROR = 'error'

export const ADD_BACKGROUND = 'addBackground'
export const REMOVE_BACKGROUND = 'removeBackground'

export const studentModule = method => storeModule(MODULE, method)
