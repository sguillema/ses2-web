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
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import { authModule, TYPE } from '~/store/auth/methods'
export default {
  middleware: studentAuthenticated,
  layout: 'student',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)]
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
