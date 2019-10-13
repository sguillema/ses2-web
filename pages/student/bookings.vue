<template>
  <div id="page-dataTable">
    <section class="container">
      <h1>
        My Bookings
        <v-spacer />
        <WorkshopRegisterDialog />
      </h1>
      <ViewCurrentBookings />
      <h1></h1>
      <ViewPastBookings />
    </section>
  </div>
</template>

<script>
import { authModule, TYPE } from '~/store/auth/methods'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import WorkshopRegisterDialog from '../../components/WorkshopRegisterDialog/WorkshopRegisterDialog'
import ViewCurrentBookings from '../../components/ViewCurrentBookings/ViewCurrentBookings'
import ViewPastBookings from '../../components/ViewPastBookings/ViewPastBookings'

export default {
  components: { WorkshopRegisterDialog, ViewCurrentBookings, ViewPastBookings },
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
