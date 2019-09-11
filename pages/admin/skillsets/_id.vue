<template>
  <div id="page-skillset">
    <section class="container">
      <!-- <h1>Archived Skillsets</h1> -->
      <ViewArchive />
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import ViewArchive from '../../../components/ViewArchive/ViewArchive'
export default {
  components: { ViewArchive },

  middleware: adminAuthenticated,
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
