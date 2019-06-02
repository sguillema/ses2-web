<template>
  <div id="page-consultations">
    <section class="container">
      <v-snackbar v-model="snackbar.active" :timeout="3000" top>
        {{ snackbar.message }}
        <v-btn color="primary" flat @click="snackbar.active = false">
          Close
        </v-btn>
      </v-snackbar>
      <div class="column-left">
        <div>
          <v-dialog
            v-model="dialogCreateSession.active"
            :width="dialogCreateSession.width"
            @input="v => v || cancelSessionCreation()"
          >
            <template v-slot:activator="{ on }">
              <v-btn class="header-button" depressed v-on="on">
                Create Session
              </v-btn>
            </template>
            <v-card class="dialog">
              <v-stepper v-model="stepCount">
                <v-stepper-header>
                  <h1 class="dialog-title">Consultation Session Form</h1>
                  <v-stepper-step :complete="stepCount > 1" step="1">
                    Step 1
                  </v-stepper-step>
                  <v-divider />
                  <v-stepper-step :complete="stepCount > 2" step="2">
                    Step 2
                  </v-stepper-step>
                  <v-divider />
                  <v-stepper-step step="3">Step 3</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content
                    step="1"
                    class="createSessionDialog step-container"
                  >
                    <div class="step-content step1">
                      <p>
                        To add sessions, please select an advisor below and
                        select their availabilities. Each timeslot represents a
                        single session.
                      </p>
                      <p>
                        <b>Please note:</b>
                        all the fields are compulsory, otherwise that session
                        will not be added.
                      </p>
                      <v-form
                        ref="SessionCreateStepForm1"
                        v-model="step1Valid"
                        lazy-validation
                        class="step-subcontainer form"
                      >
                        <v-autocomplete
                          v-model="dialogCreateSession.stepOne.advisor"
                          :items="advisors"
                          :rules="dialogCreateSession.stepOne.advisorRules"
                          label="Advisor"
                          placeholder="Select an Advisor"
                          outline
                          required
                          class="input"
                        />
                      </v-form>
                    </div>
                    <div class="step-buttons">
                      <v-btn
                        color="primary"
                        @click="
                          validateStep(2, 'SessionCreateStepForm1')
                          dialogCreateSession.width = 1200
                        "
                      >
                        Continue
                      </v-btn>
                      <v-btn text @click="cancelSessionCreation">
                        Cancel
                      </v-btn>
                    </div>
                  </v-stepper-content>
                  <v-stepper-content
                    step="2"
                    class="createSessionDialog step-container"
                  >
                    <div class="step-content step2">
                      <div class="column-left">
                        <h4>Selected Sessions</h4>
                        <div class="step-buttons">
                          <v-btn text @click="stepCount = 1">Back</v-btn>
                          <v-btn color="primary" @click="validateStep(3)">
                            Continue
                          </v-btn>
                        </div>
                      </div>
                      <div class="column-right">
                        <div class="calendar-header">
                          <div>
                            <v-btn class="button" outline disabled>
                              {{ createSessionCalendarSemester }}
                            </v-btn>
                          </div>
                          <div class="calendar-navigation">
                            <v-btn
                              outline
                              class="calendar-back"
                              color="accent"
                              @click="createSessionCalendarChangeWeek(1)"
                            >
                              <v-icon class="icon">
                                arrow_back_ios
                              </v-icon>
                            </v-btn>
                            <span class="calendar-selection">
                              {{ createSessionCalendarNavigationDate }}
                            </span>
                            <v-btn
                              outline
                              class="calendar-forward"
                              color="accent"
                              @click="createSessionCalendarChangeWeek(1)"
                            >
                              <v-icon class="icon">
                                arrow_forward_ios
                              </v-icon>
                            </v-btn>
                          </div>
                          <div class="calendar-type">
                            <v-btn
                              outline
                              :disabled="
                                dialogCreateSession.stepTwo.calendarType ==
                                  'week'
                              "
                              color="accent"
                              class="button"
                              @click="
                                dialogCreateSession.stepTwo.calendarType =
                                  'week'
                              "
                            >
                              Weekly
                            </v-btn>
                            <v-btn
                              outline
                              :disabled="
                                dialogCreateSession.stepTwo.calendarType ==
                                  'day'
                              "
                              color="accent"
                              class="button"
                              @click="
                                dialogCreateSession.stepTwo.calendarType = 'day'
                              "
                            >
                              Daily
                            </v-btn>
                          </div>
                        </div>
                        <v-calendar
                          ref="calendar"
                          v-model="dialogCreateSession.stepTwo.valueDate"
                          :now="today"
                          :value="today"
                          color="primary"
                          class="calendar"
                          :type="dialogCreateSession.stepTwo.calendarType"
                          interval-minutes="30"
                          first-interval="16"
                          intervals="18"
                        />
                      </div>
                    </div>
                  </v-stepper-content>
                  <v-stepper-content
                    step="3"
                    class="createSessionDialog step-container"
                  >
                    <div class="step-content step3">
                      a
                    </div>
                    <div class="step-buttons">
                      <v-btn color="primary" @click="submitConsultationSession">
                        Create Consultation Session
                      </v-btn>
                      <v-btn text @click="stepCount = 2">Back</v-btn>
                    </div>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
              <v-divider />
            </v-card>
          </v-dialog>
        </div>
        <v-sheet class="filter-container" elevation="3">
          <v-switch
            v-model="calendarToggle"
            class="calendar-toggle"
            label="Select by day"
            color="red"
            dark
            hide-details
            flat
          />
          <v-date-picker
            v-model="value"
            class="calendar"
            :min="calendarMinDate"
            :max="calendarMaxDate"
            header-color="black"
            color="red"
            width="290"
            :type="calendarType"
          />
        </v-sheet>
      </div>
      <div class="column-right">
        <Sheet :header="sheetHeader" alt>
          <div class="section-header">
            <v-text-field
              v-model="search"
              class="input-spacing"
              append-icon="search"
              label="Search"
              placeholder="Search"
              single-line
              hide-details
            />
          </div>
          <v-data-table
            class="table-wrapper"
            :headers="headers"
            :items="sessions"
            :search="search"
          >
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td>{{ getSessionDate(props.item.date) }}</td>
              <td>
                {{ getSessionPeriod(props.item.startTime, props.item.endTime) }}
              </td>
              <td>{{ props.item.room }}</td>
              <td>
                <router-link
                  v-if="props.item.bookedBookings[0].studentId != ''"
                  :to="`/students/${props.item.bookedBookings[0].studentId}`"
                >
                  {{ props.item.bookedBookings[0].studentId }}
                </router-link>
                <a @click="activateBookingDialog(props.item)">Book now</a>
              </td>
              <td>xx</td>
              <td>
                <router-link :to="`/consultations/${props.item.id}`">
                  View
                </router-link>
              </td>
            </template>
          </v-data-table>
          <v-dialog
            v-model="dialogBooking.active"
            width="800"
            @input="v => v || cancelConsultationBooking()"
          >
            <v-card class="dialog">
              <v-stepper v-model="stepCount">
                <v-stepper-header>
                  <h1 class="dialog-title">Consultation Booking Form</h1>
                  <v-stepper-step :complete="stepCount > 1" step="1">
                    Step 1
                  </v-stepper-step>
                  <v-divider />
                  <v-stepper-step :complete="stepCount > 2" step="2">
                    Step 2
                  </v-stepper-step>
                  <v-divider />
                  <v-stepper-step step="3">Step 3</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content
                    step="1"
                    class="bookingDialog step-container"
                  >
                    <div class="step-content step1">
                      <p>
                        To create a student booking, please enter the student’s
                        name or ID below. A student is only allowed a maximum of
                        one session per week, and have up to 3 waiting lists
                        bookings at one time.
                      </p>
                      <p>
                        <b>Please note:</b>
                        If you cannot find the student, advise the student to
                        login into UTS:HELPS to register.
                      </p>
                      <v-form
                        ref="BookingStepForm1"
                        v-model="step1Valid"
                        lazy-validation
                        class="step-subcontainer form"
                      >
                        <v-text-field
                          v-model="computedSelectedSession"
                          label="Session selected"
                          outline
                          required
                          readonly
                          class="input"
                        />
                        <v-text-field
                          v-model="dialogBooking.stepOne.studentIdName"
                          :rules="dialogBooking.stepOne.studentIdNameRules"
                          label="Student ID/Name"
                          placeholder="Enter StudentID/Name"
                          outline
                          required
                          class="input"
                        />
                      </v-form>
                    </div>
                    <div class="step-buttons">
                      <v-btn
                        color="primary"
                        @click="validateStep(2, 'BookingStepForm1')"
                      >
                        Continue
                      </v-btn>
                      <v-btn text @click="cancelConsultationBooking">
                        Cancel
                      </v-btn>
                    </div>
                  </v-stepper-content>
                  <v-stepper-content
                    step="2"
                    class="bookingDialog step-container"
                  >
                    <div class="step-content step2">
                      <v-form
                        ref="BookingStepForm2"
                        v-model="step2Valid"
                        lazy-validation
                        class="step-subcontainer form"
                      >
                        <v-text-field
                          v-model="dialogBooking.stepTwo.topic"
                          :rules="dialogBooking.stepTwo.topicRules"
                          label="Topic"
                          placeholder="Enter a consultation reason"
                          outline
                          required
                          class="input"
                        />
                        <v-text-field
                          v-model="dialogBooking.stepTwo.subjectName"
                          :rules="dialogBooking.stepTwo.subjectNameRules"
                          label="Subject Name"
                          placeholder="Enter the name of the subject"
                          outline
                          required
                          class="input"
                        />
                        <v-text-field
                          v-model="dialogBooking.stepTwo.assignmentType"
                          :rules="dialogBooking.stepTwo.assignmentTypeRules"
                          label="Assignment Type"
                          placeholder="Enter an assignment type"
                          outline
                          required
                          class="input"
                        />
                        <v-checkbox
                          v-model="dialogBooking.stepTwo.groupAssignment"
                          :label="`Is this a group assignment?`"
                        />
                        <v-divider />
                        <h3>Need help with...</h3>
                        <div>
                          <div>
                            <v-checkbox
                              v-model="dialogBooking.stepTwo.help0"
                              :label="`Addressing the assignment question`"
                            />
                            <v-checkbox
                              v-model="dialogBooking.stepTwo.help1"
                              :label="`Addressing the marking criteria`"
                            />
                            <v-checkbox
                              v-model="dialogBooking.stepTwo.help2"
                              :label="`Structure`"
                            />
                          </div>
                          <div>
                            <v-checkbox
                              v-model="dialogBooking.stepTwo.help3"
                              :label="`Paragraph development`"
                            />
                            <v-checkbox
                              v-model="dialogBooking.stepTwo.help4"
                              :label="`Referencing`"
                            />
                            <v-checkbox
                              v-model="dialogBooking.stepTwo.help5"
                              :label="`Grammar`"
                            />
                          </div>
                        </div>
                        <v-text-field
                          v-model="dialogBooking.stepTwo.helpOther"
                          label="Others, please specify below"
                          placeholder="Enter other details here"
                          outline
                          class="input"
                        />
                      </v-form>
                    </div>
                    <div class="step-buttons">
                      <v-btn
                        color="primary"
                        @click="validateStep(3, 'BookingStepForm2')"
                      >
                        Continue
                      </v-btn>
                      <v-btn text @click="stepCount = 1">Back</v-btn>
                    </div>
                  </v-stepper-content>
                  <v-stepper-content
                    step="3"
                    class="bookingDialog step-container"
                  >
                    <div class="step-content">
                      <div class="step-review step-subcontainer">
                        <v-text-field
                          v-model="dialogBooking.stepOne.studentIdName"
                          label="Student ID"
                          disabled
                        />
                        <v-text-field
                          v-model="dialogBooking.stepTwo.topic"
                          label="Description"
                          disabled
                        />
                        <v-text-field
                          v-model="computedBookingDialogDate"
                          label="Date"
                          disabled
                        />
                        <v-text-field
                          v-model="computedBookingDialogTime"
                          label="Time"
                          disabled
                        />
                        <v-text-field
                          v-model="dialogBooking.session.room"
                          label="Room"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="step-buttons">
                      <v-btn color="primary" @click="submitConsultationBooking">
                        Submit Consultation Booking
                      </v-btn>
                      <v-btn text @click="stepCount = 2">Back</v-btn>
                    </div>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
              <v-divider />
            </v-card>
          </v-dialog>
        </Sheet>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      snackbar: {
        active: false,
        message: ''
      },
      search: '',
      advisorsInput: '',
      roomsInput: '',
      calendarToggle: false,
      today: moment().format('YYYY-MM-DD'),
      value: moment().format('YYYY-MM'),
      selected: moment().format('YYYY-MM-DD'),
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time', sortable: false },
        { text: 'Room', value: 'room', sortable: false },
        {
          text: 'Booked By',
          value: 'bookedBookings[0].studentId',
          sortable: false
        },
        { text: 'No. Waiting', value: '', sortable: false },
        { text: '', value: '', sortable: false }
      ],
      rooms: ['cb11.05.400', 'cb11.09.104'],
      advisors: ['John Smith', 'Jane Doe'],
      sessions: [],
      sessionsLoading: false,
      dialogCreateSession: {
        active: true, // change to false when done
        width: 1200, // change to 800 when done
        stepOne: {
          advisor: '',
          advisorRules: [v => !!v || 'Advisor is required']
        },
        stepTwo: {
          datePickerVisible: false,
          date: moment().format('YYYY-MM-DD'),
          valueDate: moment().format('YYYY-MM-DD'),
          calendarType: 'week',
          room: '',
          startTime: '',
          endTime: '',
          dateRules: [v => !!v || 'Date is required'],
          roomRules: [v => !!v || 'Room is required'],
          startTimeRules: [v => !!v || 'Start Time is required'],
          endTimeRules: [v => !!v || 'End Time is required']
        }
      },
      dialogBooking: {
        active: false,
        session: {},
        stepOne: {
          studentIdName: '',
          studentIdNameRules: [v => !!v || 'Student ID/Name is required']
        },
        stepTwo: {
          topic: '',
          subjectName: '',
          assignmentType: '',
          groupAssignment: false,
          help0: false,
          help1: false,
          help2: false,
          help3: false,
          help4: false,
          help5: false,
          helpOther: '',
          topicRules: [v => !!v || 'Topic is required'],
          subjectNameRules: [v => !!v || 'Subject Name is required'],
          assignmentTypeRules: [v => !!v || 'Assignment Type is required']
        }
      },
      stepCount: 2, // change to 1 when done
      step1Valid: true,
      step2Valid: true,
      step3Valid: true
    }
  },
  computed: {
    calendarMinDate() {
      return moment(this.today)
        .subtract(1, 'year')
        .toISOString()
    },
    calendarMaxDate() {
      return moment(this.today)
        .add(1, 'year')
        .toISOString()
    },
    calendarType() {
      if (this.calendarToggle) {
        return 'date'
      } else {
        return 'month'
      }
    },
    sheetHeader() {
      if (this.calendarToggle) {
        return 'Upcoming Consultations'
      } else {
        return 'Upcoming Consultations (monthly)'
      }
    },
    createSessionCalendarNavigationDate() {
      return moment(this.dialogCreateSession.stepTwo.valueDate).format(
        'D MMMM YYYY'
      )
    },
    createSessionCalendarSemester() {
      return 'Autumn'
    },
    computedForm2Date() {
      return moment(this.stepTwo.date).format('DD/MM/YYYY')
    },
    computedSelectedSession() {
      return this.dialogBooking.session.startTime
    },
    computedBookingDialogDate() {
      return moment(this.dialogBooking.session.startTime).format('DD/MM/YYYY')
    },
    computedBookingDialogTime() {
      return `${moment(this.dialogBooking.session.startTime).format(
        'HH:mm A'
      )} - ${moment(this.dialogBooking.session.endTime).format('HH:mm A')}`
    }
  },
  async mounted() {
    // await this.$store.dispatch()
    this.loading = true
    this.sessions = await this.$axios.$get(
      'http://localhost:4000/sessions?type=0'
    )
    this.loading = false
  },
  methods: {
    getSessionDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getSessionPeriod(start, end) {
      return `${moment(start).format('kk:mm')} - ${moment(end).format('kk:mm')}`
    },
    validateStep(nextStep, form) {
      if (this.$refs[form].validate() || !form) {
        this.stepCount = nextStep
      }
    },
    createSessionCalendarChangeWeek(direction) {
      let date = this.dialogCreateSession.stepTwo.valueDate
      switch (direction) {
        case -1: {
          // Go back
          this.dialogCreateSession.stepTwo.valueDate = moment(date)
            .subtract(1, 'week')
            .format('YYYY-MM-DD')
          break
        }
        case 1: {
          // Go forward
          this.dialogCreateSession.stepTwo.valueDate = moment(date)
            .add(1, 'week')
            .format('YYYY-MM-DD')
        }
      }
    },
    cancelSessionCreation() {
      this.stepCount = 1
      this.dialogCreateSession.active = false
      this.dialogCreateSession.width = 800
      this.dialogCreateSession.stepOne.advisor = ''
      // this.stepOne.topic = ''
      // this.stepOne.description = ''
      // this.stepOne.studentId = ''
      // this.stepTwo.date = moment().format('YYYY-MM-DD')
      // this.stepTwo.room = ''
      // this.stepTwo.startTisme = ''
      // this.stepTwo.endTime = ''
    },
    cancelConsultationBooking() {
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
    submitConsultationSession() {
      // this.$axios.$post('http://localhost:4000/sessions', {
      //   id: sessionId,
      //   startTime: req.body.startTime,
      //   endTime: req.body.endTime,
      //   sessionSize: req.body.sessionSize,
      //   room: req.body.room,
      //   type: req.body.type,
      //   createdBy: req.body.createdBy
      // })
      // alert('Sent!')
      this.snackbar.active = true
      this.snackbar.message = 'Session Created!'
      this.dialog = false
    },
    submitConsultationBooking() {
      // alert('Sent!')
      this.snackbar.active = true
      this.snackbar.message = 'Booking Created!'
      this.dialogBooking.active = false
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
    > .column-left {
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
    > .column-right {
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
        a {
          color: $color-secondary;
          padding-right: 25px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
.dialog {
  .dialog-title {
    margin-left: 14px;
    margin-right: 40px;
  }
  .step-content {
    padding: 0 20px;
    .step-subcontainer {
      &.form {
        margin-top: 30px;
      }
    }
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
  .createSessionDialog {
    .step2 {
      display: flex;
      .column-left {
        display: flex;
        flex-direction: column;
        min-width: 230px;
        max-width: 230px;
        .step-buttons {
          margin-top: auto;
        }
      }
      .column-right {
        width: 100%;
        .calendar-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 37px;
          > div:first-child {
            flex: calc(1 / 3);
            .button {
              margin: 0;
              min-width: 0;
              width: 200px;
            }
          }
          .calendar-navigation {
            display: flex;
            flex: calc(1 / 3);
            .calendar-selection {
              display: flex;
              align-items: center;
              justify-content: center;
              color: $color-darkgray;
              background: $color-graydarker;
              height: 100%;
              width: 245px;
            }
            .calendar-back,
            .calendar-forward {
              margin: 0;
              min-width: 0;
              max-width: 40px;
            }
            .calendar-back {
              .icon {
                padding-left: 10px;
              }
            }
          }
          .calendar-type {
            display: flex;
            justify-content: flex-end;
            flex: calc(1 / 3);
            .button {
              margin: 0;
              min-width: 0;
              width: 100px;
            }
          }
        }
        .calendar {
          max-height: 480px;
        }
      }
    }
  }
  .bookingDialog {
    .step2 {
      .form {
        h3 {
          margin-top: 20px;
        }
        > div {
          display: flex;
          > * {
            flex: 0.5;
          }
        }
      }
    }
  }
}
</style>
