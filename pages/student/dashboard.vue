<template>
  <div id="page-authenticated">
    <section class="container">
      <h1>Welcome to UTS:HELPS Booking System</h1>
      <ViewBookings />
    </section>
  </div>
</template>

<script>
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import ViewBookings from '../../components/ViewBookings/ViewBookings'

export default {
  components: { ViewBookings },
  middleware: studentAuthenticated,
  layout: 'student'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
h1 {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  margin: 70px 0px 60px;
}
</style>
