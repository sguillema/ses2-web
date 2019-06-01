<template>
  <div id="page-skillsets">
    <section class="container">
      <h1>Skillset {{ this.$route.params.id }}</h1>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
