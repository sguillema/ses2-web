import { authModule, VALIDATE_COOKIE } from './auth/methods'
import { ADMIN_SIDEBAR_OPEN } from './methods'

export const state = () => ({
  adminSidebarOpen: true
})

export const getters = {
  [ADMIN_SIDEBAR_OPEN]: state => state.adminSidebarOpen
}

export const mutations = {
  [ADMIN_SIDEBAR_OPEN]: (state, adminSidebarOpen) => {
    state.adminSidebarOpen = adminSidebarOpen
  }
}

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    const cookie = req.headers.cookie
    if (cookie) {
      authModule
      dispatch(authModule(VALIDATE_COOKIE), { cookie })
    }
  }
}
