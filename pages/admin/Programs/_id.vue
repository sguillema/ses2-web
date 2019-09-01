<template>
  <div id="page-program">
    <section class="container">
      <h1>Student {{ this.$route.params.id }}</h1>
      <UpdateStudentForm :id="this.$route.params.id" />
    </section>
  </div>
</template>

<script>
import UpdateProgramForm from '../../../components/UpdateProgramForm/UpdateProgramForm'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'

export default {
  components: { UpdateProgramForm },
  middleware: adminAuthenticated,
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
