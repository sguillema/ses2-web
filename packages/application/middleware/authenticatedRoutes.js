import userTypes from '../core/userTypes'
import { authModule, TYPE, IS_VALIDATED } from '~/store/auth/methods'

const ROOT_PATH = '/'
const DASHBOARD = '/dashboard'
const NOT_FOUND = '/notfound'

export const adminAuthenticated = ({ store, redirect }) => {
  const baseAuthResult = authenticated({ store, redirect })
  if (baseAuthResult) return baseAuthResult

  if (store.getters[authModule(TYPE)] !== userTypes.ADMIN) {
    return redirect(NOT_FOUND)
  }

  return null
}

export const authenticated = ({ store, redirect }) => {
  // if not authenticated, redirect to root
  if (!store.getters[authModule(IS_VALIDATED)]) {
    return redirect(ROOT_PATH)
  }

  return null
}

export const unauthenticated = ({ store, redirect, route }) => {
  // if authenticated, redirect to root
  if (store.getters[authModule(IS_VALIDATED)] && route.path === ROOT_PATH) {
    return redirect(DASHBOARD)
  }

  return null
}
