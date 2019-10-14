<template>
  <div id="page-dataTable">
    <section class="container">
      <h1>
        My Bookings
        <v-spacer />
        <WorkshopRegisterDialog />
      </h1>
      <ViewFutureBookings />
      <h1></h1>
      <ViewPastBookings />
    </section>
  </div>
</template>

<script>
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import WorkshopRegisterDialog from '../../components/WorkshopRegisterDialog/WorkshopRegisterDialog'
import ViewFutureBookings from '../../components/ViewBookings/ViewFutureBookings'
import ViewPastBookings from '../../components/ViewBookings/ViewPastBookings'
import { authModule, TYPE } from '~/store/auth/methods'

export default {
  components: { WorkshopRegisterDialog, ViewFutureBookings, ViewPastBookings },
  middleware: studentAuthenticated,
  layout: 'student',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],

      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Time', value: 'time' },
        { text: 'Room', value: 'room' },
        { text: 'Advisor', value: 'advisor' },
        { text: 'Type', value: 'type2' }
      ],
      selected: [],
      bookings: []
    }
  },
  async mounted() {
    this.bookings = await this.$axios.$get('http://localhost:4000/bookings')
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

ul {
  margin: 10px;
}
h1 {
  display: flex;
  align-items: center;
}
p {
  margin: 5px;
}
</style>
