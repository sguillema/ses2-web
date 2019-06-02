<template>
  <div id="page-consultations">
    <section class="container">
      <div class="column-left">
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
        <Sheet header="Upcoming Consultations">
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
            <div>
              <v-dialog v-model="dialog" width="800">
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="header-button"
                    depressed
                    color="primary"
                    v-on="on"
                  >
                    Create Consultation Session
                  </v-btn>
                </template>
                <v-card class="dialog">
                  <v-stepper v-model="stepCount">
                    <v-stepper-header>
                      <h1 class="dialog-title">Consultation Form Details</h1>
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
                      <v-stepper-content step="1" class="step-container">
                        <div class="step-content">
                          <p>
                            To add sessions, please enter their details below
                            and click
                            <b>“Add”</b>
                            . If you do not wish to add a session that you have
                            selected date & time, please click
                            <b>“Clear”</b>
                            next to that session before adding.
                          </p>
                          <p>
                            <b>Please note:</b>
                            all the fields are compulsory, otherwise that
                            session will not be added.
                          </p>
                          <v-form
                            ref="stepForm1"
                            v-model="step1Valid"
                            lazy-validation
                          >
                            <v-text-field
                              v-model="stepOne.topic"
                              :rules="stepOne.topicRules"
                              label="Topic"
                              placeholder="Topic Title"
                              outline
                              required
                            />
                            <v-text-field
                              v-model="stepOne.description"
                              :rules="stepOne.descriptionRules"
                              label="Description"
                              placeholder="Consultation Description"
                              outline
                              required
                            />
                            <v-text-field
                              v-model="stepOne.studentId"
                              :rules="stepOne.studentIdRules"
                              label="Student ID"
                              placeholder="Enter Student ID"
                              outline
                              required
                            />
                          </v-form>
                        </div>
                        <div class="step-buttons">
                          <v-btn color="primary" @click="validateStep(2)">
                            Continue
                          </v-btn>
                          <v-btn text @click="cancelConsultationSession">
                            Cancel
                          </v-btn>
                        </div>
                      </v-stepper-content>
                      <v-stepper-content step="2" class="step-container">
                        <div class="step-content">
                          <p>
                            To add sessions, please enter their details below
                            and click
                            <b>“Add”</b>
                            . If you do not wish to add a session that you have
                            selected date & time, please click
                            <b>“Clear”</b>
                            next to that session before adding.
                          </p>
                          <p>
                            <b>Please note:</b>
                            all the fields are compulsory, otherwise that
                            session will not be added.
                          </p>
                          <v-form
                            ref="stepForm2"
                            v-model="step2Valid"
                            lazy-validation
                            class="stepForm2"
                          >
                            <div>
                              <v-menu
                                v-model="stepTwo.datePickerVisible"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="computedForm2Date"
                                    class="input"
                                    :rules="stepTwo.dateRules"
                                    label="Date"
                                    placeholder="DD/MM/YYYY"
                                    outline
                                    required
                                    readonly
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  v-model="stepTwo.date"
                                  :min="today"
                                  :max="calendarMaxDate"
                                  @input="stepTwo.datePickerVisible = false"
                                />
                              </v-menu>
                              <v-autocomplete
                                v-model="stepTwo.room"
                                class="input"
                                :items="rooms"
                                :loading="isLoading"
                                label="Room"
                                placeholder="Select Room Location"
                                outline
                                required
                              />
                            </div>
                            <div>
                              <v-text-field
                                v-model="stepTwo.startTime"
                                class="input"
                                :rules="stepTwo.startTimeRules"
                                label="Start Time"
                                placeholder="00:00"
                                outline
                                required
                                mask="time"
                                return-masked-value
                              />
                              <v-text-field
                                v-model="stepTwo.endTime"
                                class="input"
                                :rules="stepTwo.endTimeRules"
                                label="End Time"
                                placeholder="00:00"
                                outline
                                required
                                mask="time"
                                return-masked-value
                              />
                            </div>
                          </v-form>
                        </div>
                        <div class="step-buttons">
                          <v-btn color="primary" @click="validateStep(3)">
                            Continue
                          </v-btn>
                          <v-btn text @click="stepCount = 1">Back</v-btn>
                        </div>
                      </v-stepper-content>
                      <v-stepper-content step="3" class="step-container">
                        <div class="step-content">
                          <div class="step-review">
                            <v-text-field
                              v-model="stepOne.topic"
                              label="Topic"
                              disabled
                            />
                            <v-text-field
                              v-model="stepOne.description"
                              label="Description"
                              disabled
                            />
                            <v-text-field
                              v-model="stepOne.studentId"
                              label="Student ID"
                              disabled
                            />
                            <div>
                              <v-text-field
                                v-model="stepTwo.date"
                                label="Date"
                                disabled
                              />
                              <v-text-field
                                v-model="stepTwo.room"
                                label="Room"
                                disabled
                              />
                            </div>
                            <div>
                              <v-text-field
                                v-model="stepTwo.startTime"
                                label="Start Time"
                                disabled
                              />
                              <v-text-field
                                v-model="stepTwo.endTime"
                                label="End Time"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="step-buttons">
                          <v-btn
                            color="primary"
                            @click="submitConsultationSession"
                          >
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
              <td>{{ props.item.createdByName }}</td>
              <td>
                <router-link
                  :to="`/students/${props.item.bookedBookings[0].studentId}`"
                >
                  {{ props.item.bookedBookings[0].studentId }}
                </router-link>
              </td>
              <td>
                <router-link :to="`/consultations/${props.item.id}`">
                  View
                </router-link>
              </td>
            </template>
          </v-data-table>
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
        { text: 'Advisor', value: 'createdByName', sortable: false },
        {
          text: 'Booked By',
          value: 'bookedBookings[0].studentId',
          sortable: false
        },
        { text: '', value: '', sortable: false }
      ],
      rooms: ['cb11.05.400', 'cb11.09.104'],
      sessions: [],
      sessionsLoading: false,
      dialog: false,
      stepCount: 0,
      step1Valid: true,
      step2Valid: true,
      step3Valid: true,
      stepOne: {
        topic: '',
        description: '',
        studentId: '',
        topicRules: [v => !!v || 'Topic is required'],
        descriptionRules: [v => !!v || 'Description is required'],
        studentIdRules: [v => !!v || 'StudentID is required']
      },
      stepTwo: {
        datePickerVisible: false,
        date: moment().format('YYYY-MM-DD'),
        room: '',
        startTime: '',
        endTime: '',
        dateRules: [v => !!v || 'Date is required'],
        roomRules: [v => !!v || 'Room is required'],
        startTimeRules: [v => !!v || 'Start Time is required'],
        endTimeRules: [v => !!v || 'End Time is required']
      }
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
    computedForm2Date() {
      return moment(this.stepTwo.date).format('DD/MM/YYYY')
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
    validateStep(nextStep) {
      if (this.$refs[`stepForm${nextStep - 1}`].validate()) {
        this.stepCount = nextStep
      }
    },
    cancelConsultationSession() {
      this.dialog = false
      this.stepOne.topic = ''
      this.stepOne.description = ''
      this.stepOne.studentId = ''
      this.stepTwo.date = moment().format('YYYY-MM-DD')
      this.stepTwo.room = ''
      this.stepTwo.startTime = ''
      this.stepTwo.endTime = ''
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
      alert('Sent!')
      this.dialog = false
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
        .header-button {
          margin-right: 30px;
        }
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
</style>
