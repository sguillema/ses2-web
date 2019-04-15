const ROOT_PATH = '/'
const DASHBOARD = '/dashboard'

export const authenticated = ({ store, redirect, app }) => {
  // if not authenticated, redirect to root
  if (
    !store.getters[
      app.$helpers.storeModule(
        app.$storeStrings.AUTH,
        app.$storeStrings.AUTH_IS_VALIDATED
      )
    ]
  ) {
    return redirect(ROOT_PATH)
  }
}

export const unauthenticated = ({ store, redirect, route, app }) => {
  // if authenticated, redirect to root
  if (
    store.getters[
      app.$helpers.storeModule(
        app.$storeStrings.AUTH,
        app.$storeStrings.AUTH_IS_VALIDATED
      )
    ] &&
    route.path === ROOT_PATH
  ) {
    return redirect(DASHBOARD)
  }
}
