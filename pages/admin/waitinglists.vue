<template>
  <div id="page-waitinglists">
    <section class="container">
      <div class="section-container">
        <div>waiting lists is under construction</div>
      </div>
      <adminWaitlingList :session-id="sessionId" />
    </section>
  </div>
</template>

<script>
// import { authModule, TYPE, LOGOUT } from '~/store/auth/methods'
import adminWaitlingList from '../../components/AdminWaitList/AdminWaitList'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  components: { adminWaitlingList },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      sessionId: '1'
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
