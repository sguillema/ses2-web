<template>
  <div id="page-authenticated">
    <section class="container">
      <h1>Welcome to UTS:HELPS Booking System</h1>
      <ViewCurrentBookings />
    </section>
  </div>
</template>

<script>
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import ViewCurrentBookings from '../../components/ViewCurrentBookings/ViewCurrentBookings'

export default {
  components: { ViewCurrentBookings },
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
