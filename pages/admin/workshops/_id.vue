// NOTE: ID = SESSIONID, NOT WORKSHOPIDs

<template>
  <div v-if="isLoading" id="page-sessions">
    Loading
  </div>
  <div v-else id="page-sessions">
    <section class="left">
      <div class="container">
        <Sheet class="sheet" header="Workshop Session Details">
          <div class="row">
            <label>Topic</label>
            <div class="field">
              {{ workshop.title }}
            </div>
          </div>
          <div class="row">
            <label>Target Audience</label>
            <div class="field">
              {{ program.targetGroup }}
            </div>
          </div>
          <div class="row">
            <label>Description</label>
            <div class="field">
              {{ workshop.description }}
            </div>
          </div>
          <div class="row">
            <label>Cut-off</label>
            <div class="field">
              {{ session.cutoff }}
            </div>
          </div>
          <div class="row">
            <label>Maximum</label>
            <div class="field">
              {{ session.size }}
            </div>
          </div>
          <div class="row">
            <label>When</label>
            <div class="field">
              {{ getDateRangeString(session.startTime, session.endTime) }}
            </div>
          </div>
          <div class="row">
            <label>Room</label>
            <div class="field">
              {{ session.room }}
            </div>
          </div>
          <div class="action row">
            <v-dialog
              v-model="dialog"
              width="800"
              @input="v => v || cancelRegistration()"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="primary" depressed v-on="on">
                  Edit Session
                </v-btn>
              </template>
              <v-card class="dialog">
                <v-stepper v-model="stepCount">
                  <v-stepper-header>
                    <h1 class="dialog-title">Edit Workshop Information</h1>
                    <v-stepper-step :complete="stepCount > 1" step="1">
                      Page 1
                    </v-stepper-step>
                    <v-divider />
                    <v-stepper-step :complete="stepCount > 2" step="2">
                      Page 2
                    </v-stepper-step>
                    <v-divider />
                    <v-stepper-step step="3">
                      Page3
                    </v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-stepper-content step="1" class="step-container">
                      <h2>Workshop Form Details</h2>
                      <div class="step-content">
                        <v-form
                          ref="stepForm1"
                          v-model="step1Valid"
                          lazy-validation
                        >
                          <v-select
                            v-model="workshop.staffId"
                            label="Saff"
                            :items="advisors"
                            item-value="id"
                            item-text="name"
                            outline
                          />
                          <v-text-field
                            v-model="workshop.title"
                            label="Topic"
                            outline
                          />

                          <v-text-field
                            v-model="workshop.description"
                            label="Description"
                            outline
                          />
                        </v-form>
                      </div>
                      <div class="step-buttons">
                        <v-btn
                          color="primary"
                          depressed
                          @click="validateStep(2)"
                        >
                          Continue
                        </v-btn>
                      </div>
                    </v-stepper-content>
                    <v-stepper-content step="2" class="step-container">
                      <h2>Session Form Details</h2>
                      <div class="step-content step2">
                        <v-form
                          ref="stepForm2"
                          v-model="step2Valid"
                          lazy-validation
                        >
                          <v-select
                            v-model="session.room"
                            :items="rooms"
                            item-text="id"
                            item-value="id"
                            label="Room"
                            outline
                          />

                          <v-text-field
                            v-model="session.startTime"
                            label="Start Time"
                            outline
                          />
                          <v-text-field
                            v-model="session.endTime"
                            label="End Time"
                            outline
                          />
                          <v-text-field
                            v-model="session.startTime"
                            label="Date"
                            outline
                          />
                        </v-form>
                      </div>
                      <div class="step-buttons">
                        <v-btn
                          color="primary"
                          depressed
                          @click="validateStep(3)"
                        >
                          Continue
                        </v-btn>
                      </div>
                    </v-stepper-content>
                    <v-stepper-content step="3" class="step-container">
                      <h2>Confirmation of Workshop</h2>

                      <div class="step-content">
                        <div class="step-review step-subcontainer">
                          <v-text-field
                            v-model="workshop.staffId"
                            label="Staff ID"
                            disabled
                          />
                          <v-text-field
                            v-model="workshop.title"
                            label="Topic"
                            disabled
                          />
                          <v-text-field
                            v-model="workshop.description"
                            label="Description"
                            disabled
                          />
                          <v-text-field
                            v-model="session.startTime"
                            label="Start Time"
                            disabled
                          />
                          <v-text-field
                            v-model="session.endTime"
                            label="End Time"
                            disabled
                          />
                          <v-text-field
                            v-model="session.startTime"
                            label="Date"
                            disabled
                          />
                          <v-text-field
                            v-model="session.room"
                            label="Room"
                            disabled
                          />
                        </div>
                        <div class="step-buttons">
                          <v-btn
                            v-model="dialog1"
                            color="primary"
                            depressed
                            @click="submitEditedWorkshop"
                          >
                            Confirm
                          </v-btn>
                        </div>
                      </div>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card>
            </v-dialog>
            <router-link to="/admin/workshops">
              <v-btn class="ma-2" depressed>
                Cancel
              </v-btn>
            </router-link>
          </div>
        </Sheet>
      </div>
      <div class="container">
        <BookedStudentList :session-id="session.id" />
      </div>
    </section>
    <section class="right">
      <div class="container">
        <attendance-key-generator :session-id="$route.params.id" />
      </div>
      <div class="container">
        <WaitList :session-id="session.id" />
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import WaitList from '../../../components/WaitList/WaitList'
import AttendanceKeyGenerator from '../../../components/AttedanceKeyGenerator/AttendanceKeyGenerator'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'
import {
  WorkshopApi,
  SessionApi,
  BookingApi,
  ProgramApi,
  RoomApi,
  AdvisorApi
} from '../../../core/Api'
import BookedStudentList from '../../../components/BookedStudentList'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  components: { Sheet, BookedStudentList, WaitList, AttendanceKeyGenerator },

  data() {
    return {
      search: '',
      dialog: false,
      isLoading: true,
      session: null,
      workshop: null,
      program: null,
      headers: [
        { text: 'Attendence', value: 'att' },
        { text: 'StudentID', value: 'id' },
        { text: 'Booked Date', value: 'bDate' },
        { text: 'Last Name', value: 'lName' },
        { text: 'First Name', value: 'fName' }
      ],
      stepCount: 0,
      step1Valid: true,
      step2Valid: true,
      step3Valid: true,
      stepOne: {
        typeOfWorshop: '',
        topic: '',
        description: '',
        Skillset: '',
        targetGroup: ''
      },
      stepTwo: {
        date: moment().format('YYYY/MM/DD'),
        startTime: '',
        endTime: '',
        room: ''
      }
    }
  },

  async asyncData({ params, $axios }) {},
  async mounted() {
    // GET SESSION BY ID

    this.fetchAndSetData()
  },
  methods: {
    getDateRangeString(startDate, endDate) {
      const momentStart = moment(startDate)
      const momentEnd = moment(endDate)
      const formattedStart = momentStart.format('ddd D MMM hh:mm A')
      const formattedEnd = momentEnd.format('hh:mm A')
      return `${formattedStart} - ${formattedEnd}`
    },
    validateStep(nextStep) {
      if (this.$refs[`stepForm${nextStep - 1}`].validate()) {
        this.stepCount = nextStep
      }
    },
    async submitEditedWorkshop() {
      await this.$axios.$patch(
        `http://localhost:4000/workshops/${this.workshop.id}`,
        this.workshop
      )
      await this.$axios.$patch(
        `http://localhost:4000/sessions/${this.session.id}`,
        this.session
      )
      this.cancelRegistration()
      this.fetchAndSetData()
    },
    async fetchAndSetData() {
      this.isLoading = true
      const sessionRes = await SessionApi.getSession(this.$route.params.id)
      this.session = sessionRes.data

      // GET BOOKINGS AND WAITLIST
      const params = {
        sessionId: this.$route.params.id
      }
      const bookingsRes = await BookingApi.getBookings(params)
      this.bookings = bookingsRes.data.bookings

      const workshopRes = await WorkshopApi.getWorkshop(this.session.workshopId)
      this.workshop = workshopRes.data

      const programRes = await ProgramApi.getProgram(this.workshop.programId)
      this.program = programRes.data

      const roomRes = await RoomApi.getRooms()
      this.rooms = roomRes.data

      const advisorRes = await AdvisorApi.getAdvisors()
      this.advisors = advisorRes.data

      this.isLoading = false
    },
    cancelRegistration() {
      this.stepCount = 1
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-sessions {
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
