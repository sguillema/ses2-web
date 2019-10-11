K
<template>
  <div id="page-authenticated">
    <!-- <div>Hello this is an authenticated route :) with type {{ type }}</div> -->
    <section class="container">
      <div class="column-left">
        <div class="section-heading">
          Your Shortcuts
          <span class="right">
            <!-- <v-icon @click="editItem(props.item)">
              add
            </v-icon> -->
          </span>
        </div>
        <template>
          <v-dialog v-model="dialog" persistent width="800">
            <template v-slot:activator="{ on }">
              <div class="header-button">
                <v-btn class="text-btn" depressed v-on="on">
                  Quick Booking
                </v-btn>
                <v-btn class="icon-btn">
                  Add
                </v-btn>
              </div>
            </template>
            <v-card class="dialog">
              <v-card-title class="dialog-title-card">
                <h1 class="dialog-title">
                  Quick Booking
                </h1>
              </v-card-title>
            </v-card>
            <template>
              <v-stepper v-model="stepCount">
                <v-stepper-header>
                  <v-stepper-step :complete="stepCount > 1" step="1">
                    Select Booking Type
                  </v-stepper-step>
                  <v-divider />
                  <v-stepper-step :complete="stepCount > 2" step="2">
                    Select Session
                  </v-stepper-step>
                  <v-divider />
                  <v-stepper-step :complete="stepCount > 3" step="3">
                    Complete Form
                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content class="step1" step="1">
                    <div class="step-content" align="center" justify="center">
                      <v-btn-toggle v-model="toggle_one" mandatory>
                        <v-btn depressed @change="bookingType = 'consultation'">
                          Student Consultation
                        </v-btn>
                        <v-btn depressed @change="bookingType = 'workshop'">
                          Workshop Enrollment
                        </v-btn>
                      </v-btn-toggle>
                    </div>
                    <div align="center" justify="center">
                      <v-btn
                        depressed
                        color="primary"
                        @click="getBookingType(bookingType, stepCount)"
                      >
                        Continue
                      </v-btn>
                      <v-btn depressed text @click="dialog = false">
                        Cancel
                      </v-btn>
                    </div>
                  </v-stepper-content>
                  <!-- Start of Student Consultation -->
                  <v-stepper-content step="2">
                    <div class="step-content step2a">
                      <h2>Student Consultation</h2>
                      <h3>Select Available Session</h3>
                      <p>This is step 2 (path a)</p>
                      <v-form
                        ref="BookingConsultationStepForm2A"
                        v-model="step1Valid"
                        lazy-validation
                        class="step-subcontainer form"
                      >
                        <v-autocomplete
                          v-model="
                            dialogBookConsultation.stepTwoA.consultationSessions
                          "
                          :items="activeSessions"
                          :rules="
                            dialogBookConsultation.stepTwoA
                              .consultationSessionRules
                          "
                          label="Consultation Session"
                          placeholder="Select available session"
                          outline
                          required
                          class="input"
                        />
                      </v-form>
                    </div>
                    <!-- TODO: Get Available Sessions and Validate Continue Button -->
                    <v-btn depressed @click="clearConsultationBooking()">
                      Back
                    </v-btn>
                    <v-btn
                      color="primary"
                      depressed
                      @click="validateStep(3, 'BookingConsultationStepForm2A')"
                    >
                      Continue
                    </v-btn>
                    <v-btn depressed text @click="dialog = false">Cancel</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="3">
                    <div class="step-content step3a">
                      <h2>Student Consultation</h2>
                      <h3>Select Student</h3>
                      <p>This is step 3 (path a)</p>
                      <v-form
                        ref="BookingConsultationStepForm3A"
                        v-model="step1Valid"
                        lazy-validation
                        class="step-subcontainer form"
                      >
                        <v-text-field
                          v-model="
                            dialogBookConsultation.stepTwoA.consultationSessions
                          "
                          label="Consultation Session"
                          disabled
                        />
                        <v-text-field
                          v-model="dialogBookConsultation.stepThreeA.studentID"
                          class="input"
                          label="Student ID"
                          outline
                          :rules="[
                            dialogBookConsultation.stepThreeA.rules.required
                          ]"
                        />
                        <v-text-field
                          v-model="dialogBookConsultation.stepThreeA.date"
                          class="input"
                          label="Date"
                          outline
                          :rules="[
                            dialogBookConsultation.stepThreeA.rules.required
                          ]"
                        />
                        <v-text-field
                          v-model="dialogBookConsultation.stepThreeA.time"
                          class="input"
                          label="Time"
                          outline
                          :rules="[
                            dialogBookConsultation.stepThreeA.rules.required
                          ]"
                        />
                        <v-text-field
                          v-model="dialogBookConsultation.stepThreeA.advisor"
                          class="input"
                          label="Advisor Name"
                          outline
                          :rules="[
                            dialogBookConsultation.stepThreeA.rules.required
                          ]"
                        />
                      </v-form>
                    </div>
                    <v-btn depressed @click="stepCount = 2">
                      Back
                    </v-btn>
                    <v-btn
                      depressed
                      color="primary"
                      @click="validateStep(4, 'BookingConsultationStepForm3A')"
                    >
                      Complete
                    </v-btn>
                    <v-btn depressed text @click="dialog = false">Cancel</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="4">
                    <div class="step-content step4a">
                      <h2>Student Consultation</h2>
                      <h3>Confirmation</h3>
                      <p>This is step 4 (path a)</p>
                      <v-text-field
                        v-model="
                          dialogBookConsultation.stepThreeA.consultationSessions
                        "
                        label="Consultation Session"
                        disabled
                      />
                      <v-text-field
                        v-model="dialogBookConsultation.stepThreeA.studentID"
                        label="Student ID"
                        disabled
                      />
                      <v-text-field
                        v-model="dialogBookConsultation.stepThreeA.date"
                        label="Date"
                        disabled
                      />
                      <v-text-field
                        v-model="dialogBookConsultation.stepThreeA.time"
                        label="Time"
                        disabled
                      />
                      <v-text-field
                        v-model="dialogBookConsultation.stepThreeA.advisor"
                        label="Advisor"
                        disabled
                      />
                      <!-- Butts -->
                      <v-btn depressed @click="stepCount = 3">
                        Back
                      </v-btn>
                      <v-btn depressed color="primary" @click="stepCount = 1">
                        Confirm
                      </v-btn>
                      <v-btn depressed text @click="dialog = false">
                        Cancel
                      </v-btn>
                    </div>
                  </v-stepper-content>
                  <!-- End of Student Consultation -->
                  <!-- Start of Worskhop Enrollment -->
                  <v-stepper-content step="5">
                    <v-card class="mb-12" height="100%">
                      <h2 class="dialog-title">
                        Workshop Enrollment
                      </h2>
                      <h3>Select Session</h3>
                      <p>This is step 2 (path b)</p>
                      <v-form
                        ref="BookingWorkshopStepForm2B"
                        v-model="step2Valid"
                        lazy-validation
                        class="step-subcontainer form"
                      >
                        <v-autocomplete
                          v-model="dialogBookWorkshop.stepTwoB.workshopSessions"
                          :items="workshops"
                          :rules="
                            dialogBookWorkshop.stepTwoB.workshopSessionRules
                          "
                          label="Workshop Session"
                          placeholder="Select available session"
                          outline
                          required
                          class="input"
                        />
                      </v-form>
                      <v-btn depressed @click="clearWorkshopBooking()">
                        Back
                      </v-btn>
                      <v-btn depressed color="primary" @click="stepCount = 6">
                        Next
                      </v-btn>
                      <v-btn depressed @click="stepCount = 1">
                        Reset
                      </v-btn>
                      <v-btn text depressed @click="dialog = false">
                        Cancel
                      </v-btn>
                    </v-card>
                  </v-stepper-content>
                  <v-stepper-content step="6">
                    <v-card class="mb-12" height="100%">
                      <h2 class="dialog-title">
                        Workshop Enrollment
                      </h2>
                      <h3>Complete Form</h3>
                      <p>This is step 3 (path b)</p>
                      <v-form
                        ref="BookingWorkshopStepForm3B"
                        v-model="step1Valid"
                        lazy-validation
                        class="step-subcontainer form"
                      >
                        <v-autocomplete
                          v-model="
                            dialogBookWorkshop.stepThreeB.workshopSessions
                          "
                          :items="workshops"
                          :rules="
                            dialogBookWorkshop.stepThreeB.workshopSessionRules
                          "
                          label="Workshop Session"
                          placeholder="Select available session"
                          outline
                          class="input"
                        />
                        <v-text-field
                          v-model="dialogBookWorkshop.stepThreeB.studentID"
                          class="input"
                          label="Student ID"
                          placeholder="Enter Student ID/Name"
                          outline
                          :rules="[
                            dialogBookWorkshop.stepThreeB.rules.required
                          ]"
                        />
                        <v-text-field
                          v-model="dialogBookWorkshop.stepThreeB.date"
                          class="input"
                          label="Date"
                          outline
                          :rules="[
                            dialogBookWorkshop.stepThreeB.rules.required
                          ]"
                        />
                        <v-text-field
                          v-model="dialogBookWorkshop.stepThreeB.time"
                          class="input"
                          label="Time"
                          outline
                          :rules="[
                            dialogBookWorkshop.stepThreeB.rules.required
                          ]"
                        />
                        <v-text-field
                          v-model="dialogBookWorkshop.stepThreeB.advisor"
                          class="input"
                          label="Advisor Name"
                          outline
                          :rules="[
                            dialogBookWorkshop.stepThreeB.rules.required
                          ]"
                        />
                      </v-form>
                      <v-btn depressed @click="stepCount = 5">
                        Back
                      </v-btn>
                      <v-btn depressed color="primary" @click="stepCount = 1">
                        Complete
                      </v-btn>
                      <v-btn depressed @click="stepCount = 1">
                        Reset
                      </v-btn>
                      <v-btn text depressed @click="dialog = false">
                        Cancel
                      </v-btn>
                    </v-card>
                  </v-stepper-content>
                  <!-- End of Workshop Enrollment -->
                </v-stepper-items>
              </v-stepper>
            </template>
            <!-- <v-card>
                <div>
                  
                </div>
              </v-card-text>
              <v-divider :inset="inset" />
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  class="v-btn v-btn--flat v-btn--text theme--light v-size--default green--text text--darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
              <v-card-title>
                <h1 class="dialog-title">Book a Student Consultation</h1>
              </v-card-title>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog3" max-width="500px">
            <v-card>
              <v-card-title>
                <h1 class="dialog-title">Workshop Enrollment</h1>
              </v-card-title>
            </v-card> -->
          </v-dialog>
        </template>
        <div class="section-heading">
          Your Statistics
          <span class="right">
            <!-- <v-icon @click="editItem(props.item)">
              add
            </v-icon> -->
          </span>
        </div>
        <div class="box">
          <div class="sub-box">
            <div class="super-heading">7</div>
            <div class="center">
              <p>
                No.
                <span>Sessions</span>
                <span>this week</span>
              </p>
            </div>
          </div>
          <div class="sub-box2">
            <div class="column">
              <div class="statistic-subheading">
                <p>5</p>
                Consultations
              </div>
              <div class="statistic-subheading">
                <p>2</p>
                Workshops
              </div>
            </div>
          </div>
        </div>
        <div class="section-heading">
          Maintenence Board
          <span class="right">
            <!-- <v-icon @click="editItem(props.item)">
              add
            </v-icon> -->
          </span>
        </div>
        <div class="annoucement">
          Occaecat labore excepteur magna exercitation sint ipsum nisi ex eu
          eiusmod nostrud.
        </div>
      </div>
      <div class="column-right">
        <div class="section-heading">
          Your HELPS News
        </div>
        <div class="advertisement">
          <template>
            <v-carousel cycle height="300" hide-delimiters show-arrows-on-hover>
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet :color="colors[i]" height="100%">
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="display-custom">{{ slide }} owo</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </template>
        </div>
        <div class="section-heading">
          Your Schedule
        </div>
        <div class="form">
          <Sheet :header="sheetHeader" alt>
            <div class="header">
              Upcoming All Sessions
            </div>
            <div>
              <v-toolbar flat color="white">
                <v-text-field
                  v-model="search"
                  class="input-spacing"
                  append-icon="search"
                  placeholder="Search for Sessions"
                />
              </v-toolbar>
            </div>
            <div>
              <div class="calendar-toolbar">
                <div class="right">
                  <v-btn-toggle v-model="toggle_one" mandatory>
                    <v-btn depressed text>
                      <v-icon>view_headline</v-icon>
                    </v-btn>
                    <v-btn depressed text>
                      <v-icon>view_week</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </div>
                <div class="middle">
                  <v-btn depressed text>
                    <v-icon>arrow_back_ios</v-icon>
                  </v-btn>
                  <!-- <v-btn
                    fab
                    outlined
                    small
                    absolute
                    left
                    color="primary"
                    @click="$refs.calendar.prev()"
                  >
                    <v-icon dark>mdi-chevron-left</v-icon>
                  </v-btn> -->
                  <div class="date">
                    <!-- <v-col cols="12" sm="6" md="4"> -->
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="computedDateFormattedMomentjs"
                          label="Date"
                          prepend-icon="event"
                          class="calendar"
                          show-current="showCurrent"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker v-model="date" @input="menu2 = false" />
                    </v-menu>
                    <!-- </v-col> -->
                  </div>
                  <v-btn depressed text>
                    <v-icon>
                      arrow_forward_ios
                    </v-icon>
                  </v-btn>
                </div>
                <div class="right">
                  <v-btn-toggle v-model="toggle_one_calendar" mandatory>
                    <v-btn text depressed @change="view = 'all'">
                      <div class="display">
                        All
                      </div>
                    </v-btn>
                    <v-btn text depressed @change="view = 'monthly'">
                      <div class="display">
                        Monthly
                      </div>
                    </v-btn>
                    <v-btn text depressed @change="view = 'weekly'">
                      <div class="display">
                        Weekly
                      </div>
                    </v-btn>
                    <v-btn text depressed @change="view = 'daily'">
                      <div class="display">
                        Daily
                      </div>
                    </v-btn>
                  </v-btn-toggle>
                </div>
              </div>
            </div>
            <div>
              <v-data-table
                :headers="headers"
                :search="search"
                :items="activeSessions"
                class="table-wrapper"
                :loading="sessionsloading"
              >
                <template v-if="!sessionsLoading" v-slot:items="props">
                  <td>
                    {{ getSessionDate(props.item.startTime) }}
                  </td>
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.type }}</td>
                  <td>
                    {{
                      getSessionPeriod(props.item.startTime, props.item.endTime)
                    }}
                  </td>
                  <td>{{ props.item.room }}</td>
                  <td>{{ props.item.topic }}</td>
                  <td>
                    <router-link
                      v-if="getArrayLength(props.item.bookings) > 0"
                      :to="
                        `/admin/students/${props.item.bookings[0].studentId}`
                      "
                    >
                      {{ props.item.bookings[0].studentId }}
                    </router-link>
                    <a
                      v-else
                      class="book-link"
                      @click="activateBookingDialog(props.item)"
                    >
                      Book now
                    </a>
                  </td>
                </template>
              </v-data-table>
            </div>
          </Sheet>
        </div>
      </div>
    </section>
    <!-- <v-btn @click="onClick">Logout</v-btn> -->
  </div>
</template>

<script>
import moment from 'moment'
import { authModule, LOGOUT } from '~/store/auth/methods'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      view: 'all',
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      bookingType: 'consultation',
      ConsultationApi: [],
      // Loading the sessions in the quickbooking
      // consultations: [],
      // sessions: [],
      // -> End
      dialog: false,
      stepCount: 0,
      sessions: ['yeet'],
      sessionsLoading: true,
      // consultations: ['Test1', 'Test2'],
      dialogBookConsultation: {
        active: false,
        width: 800,
        stepTwoA: {
          consultationSessions: '',
          consultationSessionRules: [v => !!v || 'Session is required']
        },
        stepThreeA: {
          studentID: '',
          time: '',
          date: '',
          advisor: '',
          rules: {
            required: value => !!value || 'Required'
          }
        }
      },
      dialogBookWorkshop: {
        active: false,
        width: 800,
        stepTwoB: {
          workshopSessions: '',
          workshopSessionRules: [v => !!v || 'Session is required']
        },
        stepThreeB: {
          workshopSessions: '',
          workshopSessionRules: [v => !!v || 'Session is required'],
          studentID: '',
          time: '',
          date: '',
          advior: '',
          rules: {
            required: value => !!value || 'Required'
          }
        }
      },
      search: '',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'ID', value: 'id' },
        { text: 'Type', value: 'type' },
        { text: 'Time', value: 'time' },
        { text: 'Room', value: 'room' },
        { text: 'Topic', value: 'topic' },
        { text: 'Booking By', value: 'bokings[0].studentID' }
      ],
      colors: ['red', 'blue', 'green', 'yellow', 'purple'],
      slides: ['monkaS', 'pepega', 'commit', 'progfund', 'bouldering']
    }
  },
  computed: {
    activeSessions() {
      return this.sessions
    },
    filteredSessions() {
      let filteredSessions = this.sessions.filter(session => {
        switch (this.calendarType) {
          case 'date': {
            if (moment(session.startTime).isSame(this.value, 'day')) {
              return true
            } else {
              return false
            }
          }
          case 'month': {
            if (moment(session.startTime).isSame(this.value, 'month')) {
              return true
            } else {
              return false
            }
          }
          case 'weekly': {
            if (moment(session.startTime).isSame(this.value, 'weekly')) {
              return true
            } else {
              return false
            }
          }
          case 'all': {
            if (moment(session.startTime).isSame(this.value, 'all')) {
              return true
            } else {
              return false
            }
          }
        }
      })
      return filteredSessions
    },
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    // Mimics the computerSelectedSession() in index consultation
    computedAvailableSessions() {
      return this.dialogBooking.session.startTime
    }
    // TODO: Display sessions according to calendar filter
    // sheetHeader() {
    //   if (this.calendarToggle) {
    //     return 'Upcoming Consultations'
    //   } else {
    //     return 'Upcoming Consultations (monthly)'
    //   }
    // }
  },

  async mounted() {
    this.getSessions()
  },

  methods: {
    async getSessions() {
      this.sessionsLoading = true
      let sessions = await this.$axios.$get(
        'http://localhost:4000/sessions?type=all'
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
    // onClick() {
    //   this.$store.dispatch(authModule(LOGOUT))
    // },
    // From vuetify.js
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    // -> END
    getFormattedDate(date) {
      return moment(date).format('YYYY-MM-DD')
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
    validateStep(nextStep, form) {
      if (!form || this.$refs[form].validate()) {
        this.stepCount = nextStep
      }
    },
    getBookingType(bookingType, stepCount) {
      // console.log(bookingType)
      // console.log(stepCount)
      if (bookingType == 'consultation') {
        this.stepCount = 2
      }
      if (bookingType == 'workshop') {
        this.stepCount = 5
      }
    },
    // getAvailableSession() {
    //   console.log()
    // },
    clearConsultationBooking() {
      this.stepCount = 1
      // this.dialogConsultationBooking.active = false
      this.dialogBookConsultation.stepTwoA.consultationSessions = ''
      // this.dialogConsultationBooking.stepTwoA.studentID = ''
      // this.dialogConsultationBooking.stepThreeA.topic = ''
      // this.dialogConsultationBooking.stepThreeA.subjectName = ''
      // this.dialogConsultationBooking.stepThreeA.assignmentType = ''
    },
    clearWorkshopBooking() {
      this.stepCount = 1
      this.bookingType = 'consultation'
      // this.dialogWorkshopBooking.active = false
      // this.dialogWorkshopBooking.session = {}
      // this.dialogWorkshopBooking.stepTwoA.studentID = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-authenticated {
  display: block;
  padding: 10px;
  .container {
    height: inherit;
    display: flex;
    justify-content: center;
    > .column-left {
      // min-width: 80px;
      width: 290px;
      margin-right: 25px;
      .section-heading {
        font-size: 18px;
        color: #707070;
        font-weight: 500;
        // margin-left: 20px;
      }
      .header-button {
        display: flex;
        width: 100%;
        background-image: linear-gradient($color-red2, $color-darkred);
        height: 80px;
        // margin-bottom: 25px;
        margin-left: -1px;
        margin-top: 4px;
        align-items: center;
        justify-content: center;
        .text-btn {
          color: $color-white;
          font-size: $font-subheading;
          background: none;
          height: inherit;
          width: inherit;
        }
        .icon-btn {
          display: none !important;
        }
      }
      .box {
        display: block;
        background: #ffffff;
        padding-left: 20px;
        padding-right: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 25px;
        margin-top: 5px;
        color: $color-red2;
        align-items: center;
        .sub-box {
          display: flex;
          flex-flow: row wrap;
          max-width: 200px;
          margin: 0 auto;
          align-items: center;
          justify-content: center;
          p {
            display: block;
            font-size: 18px;
            span {
              display: block;
            }
          }
          .super-heading {
            font-size: 100px;
            font-weight: 500;
            margin-right: 10px;
          }
          .center {
            display: inline-block;
            justify-content: right;
            margin-left: 10px;
            margin-bottom: -10px;
            p {
              // font-size: 1.5vw;
              font-size: 20px;
            }
          }
        }
        .sub-box2 {
          display: flex;
          // background-image: linear-gradient($color-red2, $color-darkred)
          background: white;
          border: solid;
          border-width: 1px;
          border-color: $color-red2;
          // color: #ffffff;
          color: $color-red2;
          font-size: 12px;
          margin-left: -20px;
          margin-right: -20px;
          .column {
            display: inline-flex;
            padding: 10px;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;
            width: 100%;
            .statistic-subheading {
              display: flex;
              flex-flow: row wrap;
              align-items: center;
              justify-content: center;
              margin: 0 auto;
            }
            p {
              font-size: 50px;
              font-weight: 500;
              max-height: 60px;
              // color: white;
              color: $color-red2;
              margin-right: 10px;
              margin-left: 10px;
            }
          }
        }
      }
      .annoucement {
        display: inline-flex;
        padding: 25px;
        background: white;
        margin-top: 5px;
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      }
    }
    > .column-right {
      width: 100%;
      max-width: 970px;
      .advertisement {
        // background: white;
        // background-image: linear-gradient($color-blue, $color-darkblue);
        // color: white;
        display: flex;
        margin-bottom: 25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin-top: 3px;
        height: 300px;
        .display-custom {
          display: flex;
          font-size: 2vw;
          font-weight: 400;
          font-family: Roboto, sans-serif !important;
          align-items: center;
          justify-content: center;
          height: inherit;
        }
      }
      .section-heading {
        font-size: 18px;
        color: #707070;
        font-weight: 500;
        // margin-left: 20px;
      }
      .table-wrapper {
        a {
          color: $color-secondary;
          padding-right: 25px;
          &.book-link {
            color: $color-primary;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .form {
        background: white;
        padding: 20px;
        margin-top: 25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        .header {
          background: black;
          color: white;
          padding-left: 20px;
          padding-top: 5px;
          margin-left: 5px;
          margin-right: 5px;
          height: 38px;
          margin-top: -40px;
          font-size: 18px;
          font-weight: 500;
        }
        .calendar-toolbar {
          display: flex;
          margin-bottom: 25px;
          .middle {
            display: inline-flex;
            margin: 0 auto;
            // border: solid;
            // border-width: 1px;
            // border-color: $color-border-gray;
            align-items: center;
            justify-content: center;
            .date {
              display: inline-flex;
              width: 300px;
              align-items: center;
              justify-content: center;
              font-size: 15px;
              font-weight: medium;
            }
            .icon {
              display: flex;
              position: middle;
              margin-right: 5px;
              // align-items: center;
              // justify-content: center;
            }
          }
          .right {
            display: flex;
            border: solid;
            align-items: center;
            justify-content: center;
            border-width: 1px;
            border-color: $color-border-gray;
            margin-top: 20px;
            margin-bottom: 20px;
            .display {
              display: inline-flex;
              width: 60px;
              padding: 5px;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
.dialog {
  .dialog-title {
    margin: 0;
    padding-left: 25px;
    color: #ffffff;
    font-size: 20px;
  }
  .dialog-title2 {
    margin: 0;
    padding-left: 25px;
    font-size: 20px;
  }
  .dialog-title-card {
    background: $color-red2;
    height: 70px;
  }
  .dialog-title-card2 {
    background: #ffffff;
    height: 70px;
  }
  .step-buttons {
    display: flex;
    justify-content: center;
  }
  .stepForm2 {
    display: flex;
    flex-direction: column;
    > div {
      flex: 1;
      display: flex;
    }
    .input {
      width: 340px;
    }
  }
  .step-review {
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 40px;
    > div {
      display: flex;
    }
  }
}
.step1 {
  .step-content {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1368px) {
  #page-authenticated {
    display: block;
    padding: 10px;
    .container {
      height: inherit;
      display: flex;
      justify-content: center;
      > .column-left {
        min-width: 80px;
        width: 80px;
        margin-right: 25px;
        .section-heading {
          font-size: 14px;
        }
        .header-button {
          .text-btn {
            display: none !important;
          }
          .icon-btn {
            display: block;
          }
        }
        .box {
          .sub-box {
            center {
              .p {
                font-size: 12px;
              }
              .span {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
