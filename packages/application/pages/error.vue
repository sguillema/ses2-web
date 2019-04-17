<template>
  <div id="page-aunauthorised">
    <section class="section-container">
      <div>Sorry, the requested page cannot be found</div>
      <a @click="$router.back()">Back to Previous Page</a>
    </section>
  </div>
</template>

<script>
import { unauthenticated } from '../middleware/authenticatedRoutes'

export default {
  middleware: unauthenticated,
  layout: 'splash'
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
