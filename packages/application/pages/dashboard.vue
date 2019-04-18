<template>
  <div id="page-authenticated">
    <section class="section-container">
      <div>Hello this is an authenticated route :)</div>
    </section>
  </div>
</template>

<script>
import { authenticated } from '../middleware/authenticatedRoutes'

export default {
  middleware: authenticated,
  layout: 'application'
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
