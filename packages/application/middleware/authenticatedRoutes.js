import { AUTH_IS_VALIDATED } from '../store/auth'

const ROOT_PATH = '/'
const DASHBOARD = '/dashboard'

export const authenticated = ({ store, redirect }) => {
  // if not authenticated, redirect to root
  if (!store.getters[AUTH_IS_VALIDATED]) {
    return redirect(ROOT_PATH)
  }
}

export const unauthenticated = ({ store, redirect, route }) => {
  // if authenticated, redirect to root
  if (store.getters[AUTH_IS_VALIDATED] && route.path === ROOT_PATH) {
    return redirect(DASHBOARD)
  }
}
