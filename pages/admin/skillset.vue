<template>
  <div id="page-authenticated">
    <section class="container">
      <div class="section-container">
        <div>Hello this is an authenticated route :) with type {{ type }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { authModule, TYPE, LOGOUT } from '~/store/auth/methods'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)]
    }
  },
  methods: {
    onClick() {
      this.$store.dispatch(authModule(LOGOUT))
    }
  }
}
</script>
