<template>
  <div id="page-student">
    <section class="container">
      <h1>Student {{ this.$route.params.id }}</h1>
      <UpdateStudentForm :id="this.$route.params.id" />
    </section>
  </div>
</template>

<script>
import UpdateStudentForm from '../../../components/UpdateStudentForm/UpdateStudentForm'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'

export default {
  components: { UpdateStudentForm },
  middleware: adminAuthenticated,
  layout: 'application'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
