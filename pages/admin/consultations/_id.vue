<template>
  <div id="page-viewconsultation">
    <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Session Details">
            <v-text-field value="Test" label="Student ID" readonly />
            <v-text-field value="Test" label="Date" readonly />
            <v-text-field value="Test" label="Time" readonly />
            <v-text-field value="Test" label="Room" readonly />

            <div align="center">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                Edit Session
              </v-btn>

              <v-btn class="ma-2" align="center" tile>
                Cancel
              </v-btn>
            </div>
          </Sheet>
        </div>
      </v-sheet>
    </section>
    <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Booking Details">
            <v-text-field value="Test" label="Topic" readonly />

            <v-text-field value="Test" label="Subject Name" readonly />

            <v-text-field
              value="Test"
              label="Is a group assignment?"
              readonly
            />

            <v-text-field value="Test" label="Need help with:" readonly />

            <v-text-field value="Test" label="Other/Notes" readonly />

            <div align="center">
              <v-btn align="center" color="primary" dark class="mb-2" v-on="on">
                Edit Booking
              </v-btn>
            </div>
          </Sheet>
        </div>
      </v-sheet>
    </section>
    <section class="container">
      <div class="column-left">
        <div>
          <Sheet header="Student List">
            <h3 align="center">Add student to the Attendance list</h3>
            <div class="section-header">
              <v-text-field
                v-model="search"
                class="input-spacing"
                label="Student ID/Name"
                placeholder="Enter Student ID/Name"
                outline
              />
              <div align="center">
                <v-btn depressed large disabled>Add</v-btn>
              </div>
              <div>
                <v-data-table
                  class="table-wrapper"
                  :headers="headers"
                  :items="advisors"
                  :search="search"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.attendance }}</td>
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.bookeddate }}</td>
                    <td>{{ props.item.lastname }}</td>
                    <td>{{ props.item.firstname }}</td>
                    <!-- <td>
                      <router-link :to="`/admin/advisors/${props.item.id}`">
                        Edit
                      </router-link>
                      <router-link
                        :to="`/admin/advisors/${props.item.id}/history`"
                      >
                        View History
                      </router-link>
                    </td> -->
                  </template>
                </v-data-table>
              </div>
            </div>
          </Sheet>
        </div>
      </div>
    </section>

    <!--Currently don't need the attachment bit 
      <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Attachments">
            <label>Topic:</label>
          </Sheet>
        </div>
      </v-sheet>
    </section> -->
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'
import ViewConsultation from '../../../components/ViewConsultation/ViewConsultation'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      advisorsInput: '',
      roomsInput: '',
      headers: [
        { text: 'Attendance', value: 'attendance' },
        { text: 'StudentID', value: 'id' },
        { text: 'Booked Date', value: 'bookeddate' },
        { text: 'Last Name', value: 'lastname' },
        { text: 'First Name', value: 'firstname' },
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
      },

      session: {}
    }
  },

  async asyncData({ params, $axios }) {
    // try {
    //   let result = await $axios.$get(`http://localhost:4000/sessions/test`)
    //   return { result }
    // } catch (e) {
    //   console.log(`We have an error`)
    // }
  },

  async mounted() {
    // await this.$store.dispatch()
    this.getSessions()
  },
  methods: {
    async getSessions() {
      this.sessionsLoading = true
      let sessions = await this.$axios.$get(
        'http://localhost:4000/sessions?type=consultation'
      )
      let newSessions = []
      sessions.forEach(async session => {
        let newSession = session
        let bookings = await this.$axios.$get(
          `http://localhost:4000/bookings?sessionId=${session.id}`
        )
        newSession.bookings = bookings.bookings
        newSession.waitlist = bookings.waitlist
        newSessions.push(newSession)
      })
      this.sessions = newSessions
      this.sessionsLoading = false
    },
    getArrayLength(array) {
      return array.length
    },
    getSessionDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getFormattedSessionTime(start) {
      return moment(start).format('kk:mm')
    },
    getSessionPeriod(start, end) {
      return `${this.getFormattedSessionTime(
        start
      )} - ${this.getFormattedSessionTime(end)}`
    },
    getSessionDuration(start, end) {
      return moment(end).diff(moment(start), 'minutes')
    },
    getFormattedDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    validateStep(nextStep, form) {
      if (!form || this.$refs[form].validate()) {
        this.stepCount = nextStep
      }
    },
    createSessionCalendarSelectTime({ date, time }) {
      let timeFull = moment(`${date} ${time}`, 'YYYY-MM-DD kk:mm').format()
      let timePadded = moment(timeFull)
        .add(30, 'minutes')
        .format()
      let timeMin = moment(timeFull)
        .startOf('hour')
        .format()
      let timeMax = moment(timeFull)
        .endOf('hour')
        .format()
      let timeMid = moment(timeMin)
        .add(30, 'minutes')
        .format()
      let session = {
        startTime: '',
        endTime: ''
      }
      if (moment(timePadded).isBefore(timeMax)) {
        session.startTime = timeMin
        session.endTime = moment(timeMin)
          .add(30, 'minutes')
          .format()
      } else {
        session.startTime = timeMid
        session.endTime = moment(timeMid)
          .add(30, 'minutes')
          .format()
      }

      if (moment(session.startTime).isAfter(moment())) {
        let alreadyExists = undefined // equiv to false for our case
        this.dialogCreateSession.stepTwo.selectedTimes.find(
          (selectedTime, i) => {
            if (
              selectedTime.startTime == session.startTime &&
              selectedTime.endTime == session.endTime
            ) {
              alreadyExists = i
            }
          }
        )
        if (alreadyExists != undefined) {
          this.dialogCreateSession.stepTwo.selectedTimes.splice(
            alreadyExists,
            1
          )
        } else if (alreadyExists == undefined) {
          alreadyExists = this.sessions.find(storedSession => {
            return (
              storedSession.startTime == session.startTime ||
              storedSession.endTime == session.endTime
            )
          })
          if (alreadyExists == undefined) {
            this.dialogCreateSession.stepTwo.selectedTimes.push(session)
          }
        }
      } else {
        this.snackbar.active = true
        this.snackbar.message =
          'You cannot create a session before the current time.'
      }
    },
    createSessionCalendarChangePeriod(direction) {
      let date = this.dialogCreateSession.stepTwo.valueDate
      switch (direction) {
        case -1: {
          // Go back
          if (this.dialogCreateSession.stepTwo.calendarType == 'week') {
            this.dialogCreateSession.stepTwo.valueDate = moment(date)
              .subtract(1, 'week')
              .format('YYYY-MM-DD')
          } else if (this.dialogCreateSession.stepTwo.calendarType == 'day') {
            this.dialogCreateSession.stepTwo.valueDate = moment(date)
              .subtract(1, 'day')
              .format('YYYY-MM-DD')
          }
          break
        }
        case 1: {
          // Go forward
          if (this.dialogCreateSession.stepTwo.calendarType == 'week') {
            this.dialogCreateSession.stepTwo.valueDate = moment(date)
              .add(1, 'week')
              .format('YYYY-MM-DD')
          } else if (this.dialogCreateSession.stepTwo.calendarType == 'day') {
            this.dialogCreateSession.stepTwo.valueDate = moment(date)
              .add(1, 'day')
              .format('YYYY-MM-DD')
          }
        }
      }
    },
    clearSessionCreation() {
      this.stepCount = 1
      this.dialogCreateSession.active = false
      this.dialogCreateSession.width = 800
      this.dialogCreateSession.stepOne.advisor = ''
      this.dialogCreateSession.stepTwo.valueDate = moment().format('YYYY-MM-DD')
      this.dialogCreateSession.stepTwo.calendarType = 'week'
      this.dialogCreateSession.stepTwo.selectedTimes = []
    },
    clearConsultationBooking() {
      this.stepCount = 1
      this.dialogBooking.active = false
      this.dialogBooking.session = {}
      this.dialogBooking.stepOne.studentIdName = ''
      this.dialogBooking.stepTwo.topic = ''
      this.dialogBooking.stepTwo.subjectName = ''
      this.dialogBooking.stepTwo.assignmentType = ''
      this.dialogBooking.stepTwo.help0 = false
      this.dialogBooking.stepTwo.help1 = false
      this.dialogBooking.stepTwo.help2 = false
      this.dialogBooking.stepTwo.help3 = false
      this.dialogBooking.stepTwo.help4 = false
      this.dialogBooking.stepTwo.help5 = false
      this.dialogBooking.stepTwo.helpOther = ''
    },
    async submitConsultationSession() {
      this.dialogCreateSession.stepTwo.selectedTimes.forEach(async session => {
        await this.$axios.$post('http://localhost:4000/sessions', {
          workshopId: null,
          startTime: session.startTime,
          endTime: session.endTime,
          size: '1',
          room: 'CB11.00.201',
          type: 'consultation',
          createdBy: this.dialogCreateSession.stepOne.advisor,
          cutoff: '24'
        })
      })
      this.getSessions() // We just call for the new sessions
      this.snackbar.active = true
      this.snackbar.message = 'Session(s) Created!'
      this.dialogCreateSession.active = false
      this.clearSessionCreation()
    },
    async submitConsultationBooking() {
      // Ideally this should be done in one call.
      await this.$axios.$post('http://localhost:4000/bookings', {
        studentId: this.dialogBooking.stepOne.studentIdName,
        sessionId: this.dialogBooking.session.id,
        bookingDetailsId: '123', // not real
        booked: true,
        attended: false
      })
      // No point in making this call. The id of the created booking is needed. It is not returned from the post. Should be done serverside.
      // await this.$axios.$post('http://localhost:4000/booking-details', {
      //   studentId: this.dialogBooking.stepOne.studentIdName,
      //   sessionId: this.session.sessionId,
      //   booked: true,
      //   attended: false
      // })
      this.getSessions() // We just call for the new sessions
      this.snackbar.active = true
      this.snackbar.message = 'Booking Created!'
      this.dialogBooking.active = false
      this.clearConsultationBooking()
    },
    activateBookingDialog(session) {
      this.dialogBooking.active = true
      this.dialogBooking.session = session
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

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
