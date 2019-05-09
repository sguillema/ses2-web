import {
  authModule,
  IS_ADMIN,
  IS_STUDENT,
  IS_VALIDATED
} from '~/store/auth/methods'

const ROOT_PATH = '/'
const ADMIN_DASHBOARD = '/admin/dashboard'
const STUDENT_DASHBOARD = '/student/dashboard'

export const adminAuthenticated = ({ store, redirect }) => {
  if (!store.getters[authModule(IS_ADMIN)]) {
    return redirectToDashboard({ store, redirect })
  }
}

export const studentAuthenticated = ({ store, redirect }) => {
  if (!store.getters[authModule(IS_STUDENT)]) {
    return redirectToDashboard({ store, redirect })
  }
}

export const authenticated = ({ store, redirect }) => {
  // if not authenticated, redirect to root
  if (!store.getters[authModule(IS_VALIDATED)]) {
    return redirect(ROOT_PATH)
  }
}

export const unauthenticated = ({ store, redirect }) => {
  // if authenticated, redirect to dashboard
  if (store.getters[authModule(IS_VALIDATED)]) {
    return redirectToDashboard({ store, redirect })
  }
}

export const redirectToDashboard = ({ store, redirect }) => {
  // redirect to dashboard of specific type, else just redirect to root
  if (store.getters[authModule(IS_STUDENT)]) return redirect(STUDENT_DASHBOARD)
  if (store.getters[authModule(IS_ADMIN)]) return redirect(ADMIN_DASHBOARD)
  else return redirect(ROOT_PATH)
}
