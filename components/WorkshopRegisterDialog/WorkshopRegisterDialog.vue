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
          <v-stepper-step :step="4">Step 3</v-stepper-step>
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
              <v-data-table
                id="program-table"
                :headers="programsHeaders"
                :items="programs"
                item-key="id"
                hide-actions
                class="program-table"
              >
                <template v-slot:items="props">
                  <tr
                    class="program-row"
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
              Test
            </div>
            <div class="step-buttons">
              <v-btn color="primary" depressed @click="bookWorkshop">
                Book Workshop
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import SelectableList from '../SelectableList/SelectableList'
import {
  skillsetsModule,
  REQUEST,
  SKILLSETS
} from '../../store/skillsets/methods'

import { programsModule, PROGRAMS } from '../../store/programs/methods'

export default {
  components: { SelectableList },
  data() {
    return {
      stepCount: 1,
      dialog: false,
      selectedSkillsetIndex: null,
      selectedSkillset: null,
      selectedProgramIndex: null,
      selectedProgram: null,
      programsHeaders: [
        { text: 'Programs', value: 'program', sortable: false },
        { text: 'Skillset', value: 'skillset', sortable: false },
        { text: 'Target Group', value: 'targetGroup', sortable: false },
        { text: 'Description', value: 'description', sortable: false }
      ]
    }
  },
  computed: {
    skillsets() {
      return this.$store.getters[skillsetsModule(SKILLSETS)]
    },
    programs() {
      return this.$store.getters[programsModule(PROGRAMS)]
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
      console.log(this.selectedProgram)
      // this.$store.dispatch(programsModule(REQUEST), { programId })
      this.nextStep()
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
    cancelRegistration() {
      this.dialog = false
      this.stepCount = 1
      this.selectedSkillsetIndex = null
      this.selectedSkillset = null
      this.selectedProgramIndex = null
      this.selectedProgram = null
    },
    bookWorkshop() {
      console.log('hey you made it')
    },
    getTargetGroup(targetGroup) {
      if (targetGroup === 'all') return 'All Students'
      if (targetGroup === 'undergraduate') return 'Undergraduate Students'
      if (targetGroup === 'postgraduate') return 'Postgraduate Students'
      return targetGroup
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

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
#program-table {
  .v-table {
    background-color: $color-divider;
  }
  tr {
    border-bottom: none;
  }
  .program-row {
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
        background-color: $color-primary;
      }
    }
  }
}
</style>
