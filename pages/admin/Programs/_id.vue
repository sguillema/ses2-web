<template>
  <div id="page-program">
    <section class="container">
      <h1>Program {{ this.$route.params.id }}</h1>
      <UpdateProgramForm :id="this.$route.params.id" />
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import UpdateProgramForm from '../../../components/UpdateProgramForm/UpdateProgramForm'

export default {
  components: { UpdateProgramForm },
  middleware: adminAuthenticated,
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
