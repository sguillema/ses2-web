<template>
  <v-dialog
    v-model="dialog"
    max-width="1100px"
    @input="v => v || cancelRegistration()"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="primary" depressed v-on="on">Book Workshop</v-btn>
    </template>
    <v-card class="dialog" persistent>
      <v-stepper v-model="stepCount">
        <v-stepper-header>
          <h2 class="dialog-title">HELPS Workshop Booking</h2>
          <v-stepper-step :complete="stepCount > 1" :step="1">
            Information
          </v-stepper-step>
          <v-stepper-step
            :complete="stepCount > 2"
            :editable="stepCount > 2"
            :step="2"
          >
            Skillsets
          </v-stepper-step>
          <v-divider />
          <v-stepper-step
            :complete="stepCount > 3"
            :editable="stepCount > 3"
            :step="3"
          >
            Programs
          </v-stepper-step>
          <v-divider />
          <v-stepper-step
            :complete="stepCount > 4"
            :editable="stepCount > 4"
            :step="4"
          >
            Workshops
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :step="5">Confirm</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content :step="1" class="step-container">
            <div class="step-content">
              <h3>Important Information:</h3>
              <ul>
                <li>
                  <b>Follow</b>
                  each site complete your booking.
                </li>
                <li>
                  <b>Check</b>
                  the time to ensure that there is no timetable clash.
                </li>
                <li>
                  <b>Check your email</b>
                  (UTS email address) for the booking confirmation.
                  <br />
                </li>
                <li>
                  <b>Cancel,</b>
                  if no longer available,
                  <b>24 hours before</b>
                  the scheduled session by clicking on
                  <b>'My Booking'</b>
                  tab and then the
                  <b>'detail'</b>
                  link.
                </li>
                <li>
                  Please know that failing to turn up for your registered
                  workshop is not fair to those on the waiting list. Repeat
                  offenders (2 no-shows) may be barred from registering for
                  workshop.
                </li>
              </ul>
              <br />
              <p>
                <b>Registration is now open for 2019 Autumn workshops!</b>
                <br />
                <b>
                  At this stage, we only open registration for March and April
                  workshops. For the remaining workshops, registration will be
                  open in week 5.
                </b>
              </p>
            </div>
            <div class="step-buttons">
              <v-btn color="primary" depressed @click="validateStep">
                Continue
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content :step="2" class="step-container">
            <div class="step-content">
              <p>
                <b>
                  To start the booking process, please click the skill-set that
                  you want to improve:
                </b>
              </p>
              <SelectableList
                :items="skillsets"
                :select="setSelectedSkillet"
                :selected-index="selectedSkillsetIndex"
              />
            </div>
            <div class="step-buttons">
              <v-btn
                color="primary"
                :disabled="selectedSkillsetIndex === null"
                depressed
                @click="validateStep()"
              >
                Next
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content :step="3" class="step-container">
            <div class="step-content">
              <p>
                <b>
                  To avoid a timetable clash, please check the date, time and
                  location of each session carefully For additional session
                  information and click on the session to register.
                </b>
              </p>
              <v-data-table
                class="selectable-table"
                :headers="programsHeaders"
                :items="programs"
                item-key="id"
                hide-actions
              >
                <template v-slot:items="props">
                  <tr
                    class="table-row"
                    :class="[
                      selectedProgramIndex === props.index && 'selected'
                    ]"
                    @click="setSelectedProgram(props.index)"
                  >
                    <td>{{ props.item.title }}</td>
                    <td>
                      {{ selectedSkillset && selectedSkillset.title }}
                    </td>
                    <td>{{ getTargetGroup(props.item.targetGroup) }}</td>
                    <td>{{ props.item.description }}</td>
                  </tr>
                </template>
              </v-data-table>
            </div>
            <div class="step-buttons">
              <v-btn
                color="primary"
                depressed
                :disabled="
                  selectedProgramIndex === null ||
                    selectedProgramIndex >= programs.length
                "
                @click="validateStep"
              >
                Next
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content :step="4" class="step-container">
            <div class="step-content">
              <p>
                <b>
                  To avoid a timetable clash, please check the date, time and
                  location of each session carefully For additional session
                  information and click on the session to register.
                </b>
              </p>
              <v-data-table
                class="selectable-table"
                :headers="workshopsHeaders"
                :items="workshops"
                item-key="id"
                hide-actions
              >
                <template v-slot:items="props">
                  <tr
                    class="table-row"
                    :class="[
                      selectedWorkshopIndex === props.index && 'selected'
                    ]"
                    @click="setSelectedWorkshop(props.index)"
                  >
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>{{ getSessionsStartDate(props.item.sessions) }}</td>
                    <td>{{ getSessionsFinishDate(props.item.sessions) }}</td>
                    <td>
                      {{ props.item.sessions && props.item.sessions.length }}
                    </td>
                    <td>{{ getSessionsSize(props.item.sessions) }}</td>
                  </tr>
                </template>
              </v-data-table>
            </div>
            <div class="step-buttons">
              <v-btn
                color="primary"
                :disabled="
                  selectedWorkshopIndex === null ||
                    selectedWorkshopIndex >= workshops.length
                "
                depressed
                @click="validateStep"
              >
                Next
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content :step="5" class="step-container">
            <h3>Confirmation of your booking.</h3>
            <div
              v-if="!!selectedWorkshop && !!selectedProgram"
              class="confirm-workshop-details"
            >
              <label>Program</label>
              <div>{{ selectedProgram.title }}</div>
              <label>Workshop</label>
              <div>{{ selectedWorkshop.title }}</div>
              <label>Description</label>
              <div>{{ selectedWorkshop.description }}</div>
              <label>Date Start</label>
              <div>{{ getSessionsStartDate(selectedSessions) }}</div>
              <label>Date End</label>
              <div>{{ getSessionsFinishDate(selectedSessions) }}</div>
              <label>No. Sessions</label>
              <div>{{ selectedSessions.length }}</div>
              <label>Places Available</label>
              <div>{{ getSessionsSize(selectedSessions) }}</div>
            </div>
            <v-data-table
              class="selectable-table"
              :headers="sessionsHeaders"
              :items="selectedSessions"
              item-key="id"
              hide-actions
            >
              <template v-slot:items="props">
                <tr class="table-row">
                  <td>{{ getMomentDateFormat(props.item.startTime) }}</td>
                  <td>{{ getMomentTimeFormat(props.item.startTime) }}</td>
                  <td>{{ getMomentTimeFormat(props.item.endTime) }}</td>
                  <td>{{ props.item.room }}</td>
                </tr>
              </template>
            </v-data-table>
            <div class="step-buttons">
              <v-btn color="primary" depressed @click="validateStep">
                Book Workshop
              </v-btn>
            </div>
            <v-alert :value="!!successMessage" outline type="success">
              {{ successMessage }}
            </v-alert>
            <v-alert :value="!!errorMessage" outline type="error">
              {{ errorMessage }}
            </v-alert>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import SelectableList from '../SelectableList/SelectableList'
import {
  skillsetsModule,
  REQUEST,
  SKILLSETS
} from '../../store/skillsets/methods'
import { programsModule, PROGRAMS } from '../../store/programs/methods'
import { workshopsModule, WORKSHOPS } from '../../store/workshops/methods'
import { authModule, USER } from '../../store/auth/methods'
import { BookingApi } from '../../core/Api'

export default {
  components: { SelectableList },
  data() {
    return {
      user: this.$store.getters[authModule(USER)],
      stepCount: 1,
      dialog: false,
      selectedSkillsetIndex: null,
      selectedSkillset: null,
      selectedProgramIndex: null,
      selectedProgram: null,
      selectedWorkshopIndex: null,
      selectedWorkshop: null,
      selectedSessions: [],
      successMessage: '',
      errorMessage: '',
      programsHeaders: [
        { text: 'Programs', value: 'program', sortable: false },
        { text: 'Skillset', value: 'skillset', sortable: false },
        { text: 'Target Group', value: 'targetGroup', sortable: false },
        { text: 'Description', value: 'description', sortable: false }
      ],
      workshopsHeaders: [
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Start Date', value: 'startdate', sortable: false },
        { text: 'Finish Date', value: 'finishdate', sortable: false },
        { text: 'No. Sessions', value: 'size', sortable: false },
        { text: 'Places Available', value: 'size', sortable: false }
      ],
      sessionsHeaders: [
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Start Time', value: 'startTime', sortable: false },
        { text: 'Finish Time', value: 'finishTime', sortable: false },
        { text: 'Room', value: 'room', sortable: false }
      ]
    }
  },
  computed: {
    skillsets() {
      return this.$store.getters[skillsetsModule(SKILLSETS)]
    },
    programs() {
      return this.$store.getters[programsModule(PROGRAMS)]
    },
    workshops() {
      return this.$store.getters[workshopsModule(WORKSHOPS)]
    }
  },
  methods: {
    validateStep() {
      switch (this.stepCount) {
        case 1:
          this.validateInitialStep()
          break
        case 2:
          this.validateSkillsetsStep()
          break
        case 3:
          this.validateProgramStep()
          break
        case 4:
          this.validateWorkshopStep()
          break
        case 5:
          this.validateConfirmStep()
          break
        default:
          break
      }
    },
    validateInitialStep() {
      this.$store.dispatch(skillsetsModule(REQUEST), { hideArchived: true })
      this.nextStep()
    },
    validateSkillsetsStep() {
      this.selectedSkillset = this.skillsets[this.selectedSkillsetIndex]
      const skillsetId = this.selectedSkillset.id
      this.$store.dispatch(programsModule(REQUEST), { skillsetId })
      this.nextStep()
    },
    validateProgramStep() {
      this.selectedProgram = this.programs[this.selectedProgramIndex]
      const programId = this.selectedProgram.id
      this.$store.dispatch(workshopsModule(REQUEST), { programId })
      this.nextStep()
    },
    validateWorkshopStep() {
      this.selectedWorkshop = this.workshops[this.selectedWorkshopIndex]
      this.selectedSessions = this.selectedWorkshop.sessions
      this.nextStep()
    },
    async validateConfirmStep() {
      await this.bookWorkshop()
    },
    nextStep() {
      this.stepCount = this.stepCount + 1
    },
    setSelectedSkillet(index) {
      this.selectedSkillsetIndex = index
    },
    setSelectedProgram(index) {
      this.selectedProgramIndex = index
    },
    setSelectedWorkshop(index) {
      this.selectedWorkshopIndex = index
    },
    cancelRegistration() {
      this.dialog = false
      this.resetRegistrationData()
    },
    resetRegistrationData() {
      this.stepCount = 1
      this.selectedSkillsetIndex = null
      this.selectedSkillset = null
      this.selectedProgramIndex = null
      this.selectedProgram = null
      this.selectedWorkshopIndex = null
      this.selectedWorkshop = null
      this.selectedSessions = []
      this.successMessage = ''
      this.errorMessage = ''
    },
    async bookWorkshop() {
      const studentId = this.user.id
      const booked = true
      const attended = false
      const bookingDetailsId = null

      const promises = this.selectedSessions.map(async session => {
        return await BookingApi.addBooking({
          studentId,
          booked,
          attended,
          bookingDetailsId,
          sessionId: session.id
        })
      })
      let flag = false
      const responses = await Promise.all(promises)
      responses.forEach(response => {
        if (!flag && response.status !== 200) flag = true
      })
      if (flag)
        this.errorMessage =
          'An error occured. Please try again in a short while'
      else this.successMessage = 'Registered Successfully!'
    },
    getTargetGroup(targetGroup) {
      if (targetGroup === 'all') return 'All Students'
      if (targetGroup === 'undergraduate') return 'Undergraduate Students'
      if (targetGroup === 'postgraduate') return 'Postgraduate Students'
      return targetGroup
    },
    getSessionsSize(sessions) {
      return sessions ? sessions[0].size : 0
    },
    getSessionsStartDate(sessions) {
      const dates = this.getDatesArray(sessions)
      return this.getMomentDateFormat(moment.min(dates))
    },
    getSessionsFinishDate(sessions) {
      const dates = this.getDatesArray(sessions)
      return this.getMomentDateFormat(moment.max(dates))
    },
    getDatesArray(sessions) {
      return sessions ? sessions.map(session => moment(session.startTime)) : []
    },
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

label {
  font-weight: $fontweight-bold;
}

.confirm-workshop-details {
  border: 1px solid;
  padding: 15px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  div {
    margin-bottom: 10px;
  }
}

.dialog {
  .dialog-title {
    line-height: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 14px;
    margin-right: 40px;
  }
  h3 {
    margin-bottom: 10px;
  }
  .program-table {
    margin-bottom: 10px;
  }

  .step-buttons {
    display: flex;
  }
}

.activatorButton {
  margin: 0;
}

.actions {
  padding: 0px 0 20px;
}

.center-button {
  margin: 0 auto;
}
</style>

<style lang="scss">
@import '~assets/styles/variables';
.selectable-table {
  .v-table {
    background-color: $color-divider;
  }
  tr {
    border-bottom: none !important;
  }
  .table-row {
    cursor: pointer;
    background-color: $color-gray;
    margin: 2px;
    color: $color-darkgray;
    font-size: $font-regular;
    td {
      font-weight: $fontweight-bold;
    }
    &.selected {
      background-color: $color-primary;
      color: $color-white;
      &:hover {
        background-color: $color-primary !important;
      }
    }
  }
}
</style>
