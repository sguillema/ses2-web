<template>
  <Sheet class="sheet">
    <h2>Your Bookings</h2>
    <v-data-table
      class="bookings-data-table"
      :headers="headers"
      :items="bookingsWithData"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ getMomentDateFormat(props.item.session.startTime) }}</td>
        <td>{{ getMomentTimeFormat(props.item.session.startTime) }}</td>
        <td>{{ getMomentTimeFormat(props.item.session.endTime) }}</td>
        <td>{{ props.item.session.type }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.session.room }}</td>
        <td>{{ props.item.session.createdBy }}</td>
        <td>
          <i
            v-if="props.item.booking.attended"
            class="material-icons green--text"
          >
            school
          </i>
          <i
            v-else-if="
              !props.item.booking.attended && isSessionOpen(props.item.session)
            "
            class="material-icons grey--text available"
            @click="openDialog(props.item.booking.id)"
          >
            school
          </i>
          <i
            v-else-if="
              !props.item.booking.attended &&
                isSessionPassed(props.item.session)
            "
            class="material-icons primary--text"
          >
            school
          </i>
        </td>
      </template>
    </v-data-table>
    <ViewBookingsVerifyAttendance
      :dialog="dialog"
      :booking-id="activeBookingId"
      @toggle-dialog="closeDialog()"
    />
  </Sheet>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import {
  BookingApi,
  SessionApi,
  WorkshopApi,
  BookingDetailsApi
} from '../../core/Api'
import Sheet from '../../components/Sheet/Sheet'
import ViewBookingsVerifyAttendance from '../ViewBookings/ViewBookingsVerifyAttendance'
import { authModule, TYPE, USER } from '~/store/auth/methods'

export default {
  components: { Sheet, ViewBookingsVerifyAttendance },
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
      dialog: false,
      activeBookingId: ''
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
    const bookingsWithData = await Promise.all(promises)
    this.bookingsWithData = _.sortBy(
      bookingsWithData,
      bookingWithData => bookingWithData.session.startTime
    )
  },
  methods: {
    getMomentDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getMomentTimeFormat(date) {
      return moment(date).format('h:mm a')
    },
    isSessionOpen(session) {
      const expirationDate = moment(session.endTime)
        .add(30, 'minutes')
        .format()
      const startDate = session.startTime
      if (moment().isBetween(startDate, expirationDate)) {
        return true
      }
      return false
    },
    isSessionPassed(session) {
      const endDate = moment(session.endTime).format()
      if (moment().isAfter(endDate)) {
        return true
      }
      return false
    },
    openDialog(bookingId) {
      this.activeBookingId = bookingId
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
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

i.available {
  cursor: pointer;
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
