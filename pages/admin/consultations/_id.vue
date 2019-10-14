<template>
  <section id="page-consultation">
    <section class="left">
      <div class="container">
        <Sheet v-if="!!session" header="Consultation Session Details">
          <div class="row">
            <label>Date</label>
            <div class="field">
              {{ getMomentDateFormat(session.startTime) }}
            </div>
          </div>
          <div class="row">
            <label>Time</label>
            <div class="field">
              {{ getMomentTimeFormat(session.startTime) }} -
              {{ getMomentTimeFormat(session.endTime) }}
            </div>
          </div>
          <div class="row">
            <label>Room</label>
            <div class="field">{{ session.room }}</div>
          </div>
          <div class="action row">
            <v-btn color="primary" dark depressed>
              Edit Session
            </v-btn>
            <router-link to="/admin/consultations">
              <v-btn class="ma-2" depressed>
                Cancel
              </v-btn>
            </router-link>
          </div>
        </Sheet>
      </div>
      <div class="container">
        <Sheet
          v-if="!!bookingDetails && !!bookedBooking"
          header="Consultation Booking Details"
        >
          <div class="row">
            <label>Student ID</label>
            <div class="field">{{ bookedBooking.studentId }}</div>
          </div>
          <div class="row">
            <label>Topic</label>
            <div class="field">{{ bookingDetails.appointmentFor }}</div>
          </div>
          <div class="row">
            <label>Subject Name</label>
            <div class="field">{{ bookingDetails.subjectName }}</div>
          </div>
          <div class="row">
            <label>Assignment Type</label>
            <div class="field">{{ bookingDetails.assignmentType }}</div>
          </div>
          <div class="row">
            <label>Is a group assignment?</label>
            <div class="field">
              {{ bookingDetails.isGroupAssignment ? 'Yes' : 'No' }}
            </div>
          </div>
          <div class="row">
            <label>Need help with</label>
            <div class="field">
              <ul>
                <li
                  v-for="(helpItem, index) in bookingDetails.helpWith"
                  :key="index"
                >
                  {{ getHelpWithType(helpItem) }}
                </li>
              </ul>
            </div>
          </div>
          <div class="action row">
            <v-btn color="primary" dark depressed>
              Edit Booking
            </v-btn>
          </div>
        </Sheet>
      </div>
      <div class="container">
        <Sheet header="Consultation Attatchments">
          <div class="table">
            <v-data-table
              class="table-wrapper"
              :headers="fileHeaders"
              :items="files"
              hide-actions
            >
              <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td>{{ getMomentDateFormat(props.item.createdAt) }}</td>
              </template>
            </v-data-table>
          </div>
          <div class="action row" align="center">
            <v-btn color="primary" dark depressed>
              Download
            </v-btn>
          </div>
        </Sheet>
      </div>
    </section>
    <section class="right">
      <div class="container">
        <attendance-key-generator :session-id="$route.params.id" />
      </div>
      <div class="container"><WaitList :session-id="$route.params.id" /></div>
    </section>
  </section>
</template>

<script>
import moment from 'moment'
import AttendanceKeyGenerator from '../../../components/AttedanceKeyGenerator/AttendanceKeyGenerator'
import WaitList from '../../../components/WaitList/WaitList'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'
import {
  SessionApi,
  BookingApi,
  BookingDetailsApi,
  WorkshopApi
} from '../../../core/Api'
import ViewConsultation from '../../../components/ViewConsultation/ViewConsultation'
import { getHelpWithType } from '../../../core/helpers'

export default {
  components: { Sheet, AttendanceKeyGenerator, WaitList },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      session: null,
      bookedBooking: null,
      waitlist: [],
      bookingDetails: null,
      headers: [
        { text: 'Attendance', value: 'att' },
        { text: 'StudentID', value: 'id' },
        { text: 'Booked Date', value: 'bDate' },
        { text: 'Last Name', value: 'lName' },
        { text: 'First Name', value: 'fName' },
        { text: '', value: '' }
      ],
      fileHeaders: [
        { text: 'Title', value: 'title' },
        { text: 'Sent Date', value: 'createdAt' }
      ],
      files: [
        {
          title: 'form1.docx',
          path: '/files/form1.docx',
          createdAt: '2019-10-24T15:00:00+10:00'
        },
        {
          title: 'form2.docx',
          path: '/files/form1.docx',
          createdAt: '2019-10-24T15:00:00+10:00'
        },
        {
          title: 'form3.docx',
          path: '/files/form1.docx',
          createdAt: '2019-10-24T15:00:00+10:00'
        }
      ],
      addNew: {
        attendance: '',
        id: '',
        bookeddate: '',
        lastname: '',
        firstname: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    }
  },

  async mounted() {
    await this.fetchAndSetSession(this.$route.params.id)
    await this.fetchAndSetBookingsAndWaitlist(this.$route.params.id)
    await this.fetchAndSetBookingDetails()
  },
  methods: {
    getHelpWithType,
    getMomentDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getMomentTimeFormat(date) {
      return moment(date).format('h:mm a')
    },
    async fetchAndSetSession() {
      const res = await SessionApi.getSession(this.$route.params.id)
      this.session = res.data
    },
    async fetchAndSetBookingsAndWaitlist() {
      const res = await BookingApi.getBookingsBySessionId(this.$route.params.id)
      const { bookings, waitlist } = res.data
      this.bookedBooking = bookings.length > 0 ? bookings[0] : null
      this.waitlist = waitlist
    },
    async fetchAndSetBookingDetails() {
      if (this.bookedBooking !== null) {
        const res = await BookingDetailsApi.getBookingDetailByBookingId(
          this.bookedBooking.id
        )
        this.bookingDetails = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-consultation {
  display: flex;
}

.left {
  flex: 1 1 auto;
}

.right {
  width: 388px;
}

.row {
  margin-bottom: 12px;
  display: flex;
  &.action {
    margin-left: 196px;
    margin-bottom: 0;
  }
}

label {
  width: 200px;
  text-align: right;
  color: $color-darkgray;
  font-weight: $fontweight-bold;
  &:after {
    content: ':';
    margin-right: 24px;
  }
}

.field {
}
</style>
