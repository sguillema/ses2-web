<template>
  <div id="page-myinformation">
    <section class="container">
      <h1>My Information</h1>
      <UpdateStudentForm :id="user.id" />
    </section>
  </div>
</template>

<script>
import UpdateStudentForm from '../../components/UpdateStudentForm/UpdateStudentForm'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import { authModule, USER } from '../../store/auth/methods'

export default {
  components: { UpdateStudentForm },
  middleware: studentAuthenticated,
  layout: 'application',
  data() {
    return {
      user: this.$store.getters[authModule(USER)]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
