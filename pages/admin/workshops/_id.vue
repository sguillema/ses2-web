// NOTE: ID = SESSIONID, NOT WORKSHOPIDs

<template>
  <div v-if="isLoading" id="page-sessions">
    Loading
  </div>
  <div v-else id="page-sessions">
    <section class="container">
      <h1>sessions {{ this.$route.params.id }}</h1>
      <Sheet class="sheet" header="Workshop Session Details">
        <div>
          <label>Topic: {{ workshop.title }}</label>
        </div>
        <div>
          <label>Target Audience: {{ program.targetGroup }}</label>
        </div>
        <div>
          <label>Description: {{ workshop.description }}</label>
        </div>
        <div>
          <label>Cut-off: {{ session.cutoff }}</label>
        </div>
        <div>
          <label>Maximum: {{ session.size }}</label>
        </div>
        <div>
          <label>
            When: {{ getDateRangeString(session.startTime, session.endTime) }}
          </label>
        </div>
        <div>
          <label>Room: {{ session.room }}</label>
        </div>
        <v-dialog v-model="dialog" width="800">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" depressed v-on="on">
              Edit
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
                      //dropdown for staffID//
                      <!-- <v-select
                        v-model="advisors.staffId"
                        label="Saff"
                        :items="staffId"
                        item-value="id"
                        item-text="id"
                        outline
                      /> -->
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
                    <v-btn color="primary" @click="validateStep(2)">
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
                    <v-btn color="primary" @click="validateStep(3)">
                      Continue
                    </v-btn>
                  </div>
                </v-stepper-content>
                <v-stepper-content step="3" class="step-container">
                  <h2>Confirmation of Workshop</h2>

                  <div class="step-content">
                    <div class="step-review step-subcontainer">
                      //display the staffId//
                      <!-- <v-text-field
                        v-model="advisors.staffId"
                        label="Staff ID"
                        disabled
                      /> -->
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
        <div>
          <v-btn text depressed>
            Cancel
          </v-btn>
        </div>
      </Sheet>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'
import {
  WorkshopApi,
  SessionApi,
  BookingApi,
  ProgramApi,
  RoomApi
} from '../../../core/Api'
//import { advisorsModule, REQUEST } from '../../store/advisors/methods'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  components: { Sheet },

  data() {
    return {
      dialog: false,
      dialog1: false,
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
      },

      search: '',
      isLoading: true,
      session: null,
      workshop: null,
      program: null,
      bookings: [],
      rooms: [],
      advisors: [],
      headers: [
        { text: 'Attendence', value: 'att' },
        { text: 'StudentID', value: 'id' },
        { text: 'Booked Date', value: 'bDate' },
        { text: 'Last Name', value: 'lName' },
        { text: 'First Name', value: 'fName' }
      ]
    }
  },
  // computed: {
  //   advisors: {
  //     get() {
  //       return this.$store.getters[advisorsModule(REQUEST)]
  //     }

  // },
  //   ({
  //   title: '',
  //   staffId: null,
  //   programId: null,
  //   description: ''
  // }

  async asyncData({ params, $axios }) {},
  async mounted() {
    // this.$store.getters[advisorsModule(REQUEST)]

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
      console.log(this.workshop)
      await this.$axios.$patch(
        `http://localhost:4000/workshops/${this.workshop.id}`,
        this.workshop
      )
      await this.$axios.$patch(
        `http://localhost:4000/sessions/${this.session.id}`,
        this.session
      )
      this.dialog = false
      this.stepCount = 0
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

      // Get advisors and set to this.advisors

      this.isLoading = false
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
