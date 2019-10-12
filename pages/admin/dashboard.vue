<template>
  <div id="page-authenticated">
    <section class="container">
      <div class="section-container">
        <div>Hello this is an authenticated route :) with type {{ type }}</div>
        <v-btn @click="onClick">Logout</v-btn>
      </div>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'
import { authModule, TYPE, LOGOUT } from '~/store/auth/methods'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      ConsultationApi: []
    }
  },

  methods: {
    onClick() {
      this.$store.dispatch(authModule(LOGOUT))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
