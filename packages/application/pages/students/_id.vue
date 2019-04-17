<template>
  <div id="page-student">
    <section class="section-container">
      <div>
        hello this is student with a specific id of {{ this.$route.params.id }}
      </div>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,

  created() {
    console.log(this.$route)
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
