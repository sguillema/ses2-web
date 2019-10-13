<template>
  <div id="page-dataTable">
    <section class="container">
      <h1>
        My Bookings
        <v-spacer />
        <WorkshopRegisterDialog />
      </h1>
      <ViewBookings />
    </section>
  </div>
</template>

<script>
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import WorkshopRegisterDialog from '../../components/WorkshopRegisterDialog/WorkshopRegisterDialog'
import ViewBookings from '../../components/ViewBookings/ViewBookings'
import { authModule, TYPE } from '~/store/auth/methods'

export default {
  components: { WorkshopRegisterDialog, ViewBookings },
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
      bookings: [
        {
          name: '20/05/2019',
          type: 'Consultation',
          time: '10:00 AM - 1:30 PM',
          room: 'CB11.03.301',
          advisor: 'John Smith',
          type2: 'How to write a Report'
        },
        {
          name: '15/05/2019',
          type: 'Program 1',
          time: '11:00 AM - 12:30 PM',
          room: 'TBA',
          advisor: 'Andrew Smith',
          type2: 'Part 1 of Program Name'
        },
        {
          name: '12/05/2019',
          type: 'Program 2',
          time: '10:00 AM - 1:30 PM',
          room: 'CB05.03.301',
          advisor: 'John Wick',
          type2: 'How to Draw with a Pencil'
        },
        {
          name: '18/05/2019',
          type: 'Workshop',
          time: '11:30 AM - 12:30 PM',
          room: 'CB11.00.201',
          advisor: 'Graham Smith',
          type2: 'Part 2 of Program Name'
        }
      ]
    }
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
