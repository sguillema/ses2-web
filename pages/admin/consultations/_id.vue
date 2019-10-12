<template>
  <section id="page-viewconsultation">
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
          <v-btn class="ma-2" depressed>
            Cancel
          </v-btn>
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
  </section>
</template>

<script>
import moment from 'moment'
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
  components: { Sheet },
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
    const res = await SessionApi.getSession(this.$route.params.id)
    this.session = res.data

    const res1 = await BookingApi.getBookingsBySessionId(this.$route.params.id)
    const { bookings, waitlist } = res1.data
    if (bookings.length > 0) {
      this.bookedBooking = bookings[0]

      const res2 = await BookingDetailsApi.getBookingDetailByBookingId(
        this.bookedBooking.id
      )
      const bookingDetails = res2.data
      this.bookingDetails = res2.data
    }
  },
  methods: {
    getMomentDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getMomentTimeFormat(date) {
      return moment(date).format('h:mm a')
    },
    getHelpWithType
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

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

#page-consultations {
  .container {
    display: flex;
    .column-left {
      min-width: 290px;
      width: 290px;
      margin-right: 27px;
      .header-button {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 15px;
        margin-top: 0;
        width: 100%;
        height: 60px;
        font-size: $font-subheading;
        color: $color-white;
        background: $color-red2;
      }
      .filter-container {
        position: relative;
        .calendar-toggle {
          position: absolute;
          right: 0;
          color: white;
          z-index: 1;
          margin-top: 7px;
          transform: scale(0.8);
        }
        .filters {
          padding: 14px;
        }
        .calendar {
          box-shadow: none;
        }
      }
    }
    .column-right {
      width: 100%;
      .input-spacing {
        @include input-spacing();
        max-width: 300px;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
      }
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
    }
  }
}
</style>
