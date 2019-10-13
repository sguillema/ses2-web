<template>
  <Sheet class="sheet">
    <h2>Your Current Bookings</h2>
    <v-data-table
      class="bookings-data-table"
      :headers="headers"
      :items="currentBookings"
      hide-actions
      :expand="expand"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ getMomentDateFormat(props.item.session.startTime) }}</td>
          <td>{{ getMomentTimeFormat(props.item.session.startTime) }}</td>
          <td>{{ getMomentTimeFormat(props.item.session.endTime) }}</td>
          <td>{{ props.item.session.type }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.session.room }}</td>
          <td>{{ props.item.session.createdBy }}</td>
          <td>
            <i class="material-icons" color="red">school</i>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="bookingsWithData.sessions"
            hide-actions
          >
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.name }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-data-table>
  </Sheet>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { authModule, TYPE, USER } from '~/store/auth/methods'
import {
  BookingApi,
  SessionApi,
  WorkshopApi,
  BookingDetailsApi
} from '../../core/Api'

import Sheet from '../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      user: this.$store.getters[authModule(USER)],
      headers: [
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Start Time', value: 'startTime', sortable: false },
        { text: 'Finish Time', value: 'finishTime', sortable: false },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Room', value: 'room', sortable: false },
        { text: 'Advisor', value: 'advisor', sortable: false },
        { text: 'Attended', value: 'attended', sortable: false }
      ],
      sessions: [],
      bookings: [],
      workshops: [],
      bookingDetails: [],
      bookingsWithData: [],
      currentBookings: [],
      expand: false
    }
  },
  async mounted() {
    const response = await BookingApi.getBookings({
      studentId: this.user.id,
      booked: true
    })
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
        title = result.data.description
      }
      return {
        booking,
        session,
        title
      }
    })
    let bookingsWithData = await Promise.all(promises)

    const currentBookings = []
    for (let i = 0; i < bookingsWithData.length; i++) {
      const bookingWithData = bookingsWithData[i]
      if (moment().isBefore(bookingWithData.session.startTime)) {
        currentBookings.push(bookingWithData)
      }
    }

    this.currentBookings = currentBookings
  },
  methods: {
    getMomentDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getMomentTimeFormat(date) {
      return moment(date).format('h:mm a')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
.sheet {
  padding: 24px;
}
h2 {
  margin-left: 24px;
  margin-bottom: 20px;
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

<style lang="scss">
@import '~assets/styles/variables';
.bookings-data-table {
  thead {
    background: $color-divider;
    tr {
      border-bottom: none !important;
    }
  }
}
</style>
