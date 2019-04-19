<template>
  <div id="page-unauthorised">
    <section class="section-container">
      <div>Sorry, the requested page cannot be found</div>
      <a @click="$router.back()">Back to Previous Page</a>
    </section>
  </div>
</template>

<script>
import { unauthenticated } from '../middleware/authenticatedRoutes'

export default {
  middleware: unauthenticated
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-unauthorised {
  height: 100%;
}

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
