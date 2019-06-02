<template>
  <div id="page-authenticated">
    <section class="container">
      <h1>Welcome to UTS:HELPS Bookeing System</h1>
      <v-toolbar flat color="white">
        <v-toolbar-title>Your Bookings</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="bookingsWithData"
        class="elevation-1"
        item-key="name"
      >
        <template v-slot:items="props">
          <td>{{ props.item.session.startTime }}</td>
          <td class="text-xs-right">{{ props.item.session.type }}</td>
          <td class="text-xs-right">{{ props.item.session.room }}</td>
          <td class="text-xs-right">{{ props.item.session.createdBy }}</td>
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td>
            <i class="material-icons">school</i>
          </td>
          <td>
            <i class="fa fa-angle-down" style="font-size:20px"></i>
          </td>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
import { authModule, TYPE, USER } from '~/store/auth/methods'
import {
  BookingApi,
  SessionApi,
  WorkshopApi,
  BookingDetailsApi
} from '../../core/Api'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import { type } from 'os'
import { async } from 'q'

export default {
  middleware: studentAuthenticated,
  layout: 'student',

  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      user: this.$store.getters[authModule(USER)],
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Room', value: 'room', sortable: false },
        { text: 'Advisor', value: 'advisor', sortable: false },
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Attended', value: 'attended', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      sessions: [],
      bookings: [],
      workshops: [],
      bookingDetails: [],
      bookingsWithData: []
    }
  },
  async mounted() {
    const response = await BookingApi.getBookings(this.user.id)
    this.bookings = response.data
    const promises = this.bookings.map(async booking => {
      let title
      const session = (await SessionApi.getSession(booking.sessionId)).data
      if (session.type === 'consultation') {
        const bookingDetails = (await BookingDetailsApi.getBookingDetailByBookingId(
          booking.id
        )).data
        title = bookingDetails.appointmentFor
      } else {
        const result = await WorkshopApi.getWorkshop(session.workshopId)
        title = result.data.title
      }
      return {
        booking,
        session,
        title
      }
    })
    this.bookingsWithData = await Promise.all(promises)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.table-wrapper {
  border-bottom: 2px solid $color-divider;
  margin-bottom: 12px;

  thead {
    background: black;
    tr {
      &:first-child {
        border-bottom: 2px solid $color-divider;
      }
    }
  }
}
h1 {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  margin: 70px 0px 60px;
}
.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
