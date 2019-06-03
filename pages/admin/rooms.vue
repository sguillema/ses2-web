<template>
  <div id="page-rooms">
    <section class="container">
      <div class="section-container">
        <div>rooms is under construction</div>
      </div>
    </section>
  </div>
</template>

<script>
// import { authModule, TYPE, LOGOUT } from '~/store/auth/methods'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      //   type: this.$store.getters[authModule(TYPE)],
      //   ConsultationApi: []
    }
  },

  methods: {
    onClick() {
      //   this.$store.dispatch(authModule(LOGOUT))
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
