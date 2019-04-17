import userTypes from '../core/userTypes'
const { storeModule } = require('~/plugins/resources/helpers')
const { AUTH, IS_VALIDATED } = require('~/plugins/resources/storeStrings')

const ROOT_PATH = '/'
const DASHBOARD = '/dashboard'
const NOT_FOUND = '/notfound'

export const adminAuthenticated = ({ store, redirect }) => {
  const baseAuthResult = authenticated({ store, redirect })
  if (baseAuthResult) return baseAuthResult

  if (store.getters[storeModule(AUTH, IS_VALIDATED)] !== userTypes.ADMIN) {
    return redirect(NOT_FOUND)
  }

  return null
}

export const authenticated = ({ store, redirect }) => {
  // if not authenticated, redirect to root
  if (!store.getters[storeModule(AUTH, IS_VALIDATED)]) {
    return redirect(ROOT_PATH)
  }

  return null
}

export const unauthenticated = ({ store, redirect, route }) => {
  // if authenticated, redirect to root
  if (
    store.getters[storeModule(AUTH, IS_VALIDATED)] &&
    route.path === ROOT_PATH
  ) {
    return redirect(DASHBOARD)
  }
}
