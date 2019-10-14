<template>
  <div id="page-workshops">
    <section class="container">
      <div class="column-left">
        <v-dialog v-model="dialog" width="800">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">
              +
            </v-btn>
          </template>
          <v-card class="dialog">
            <v-card-title class="dialog-title-card">
              <h1 class="dialog-title">Create Workshop Information</h1>
            </v-card-title>
            <v-card-title class="dialog-title-card2">
              <h1 class="dialog-title2">Workshop Details Form</h1>
            </v-card-title>
            <v-divider />
            <v-card-text class="form">
              <v-form>
                <div>
                  <v-text-field
                    id="workshopTitle"
                    v-model="newWorkshop.title"
                    class="input"
                    label="Title"
                    outline
                    :rules="[required]"
                  />
                  <v-select
                    v-model="newWorkshop.programId"
                    label="Program"
                    :items="programs"
                    item-value="id"
                    item-text="title"
                    outline
                    :rules="[required]"
                  />
                  <v-select
                    v-model="newWorkshop.staffId"
                    :items="staff"
                    item-value="id"
                    item-text="id"
                    label="Staff ID"
                    outline
                    :rules="[required]"
                  />
                  <v-textarea
                    id="workshopDescription"
                    v-model="newWorkshop.description"
                    class="input"
                    label="Description"
                    outline
                    rows="1"
                    auto-grow
                    box
                    :rules="[required]"
                  />
                </div>
                <div class="step-buttons">
                  <v-btn color="primary" @click="addWorkshop">
                    Create Workshop
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div class="column-right">
        <Sheet class="sheet" header="Upcoming Workshops" alt>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              class="input-spacing"
              append-icon="search"
              placeholder="Search for Workshops"
            />
            <v-spacer />
          </v-toolbar>
          <v-data-table
            class="table-wrapper"
            :headers="headers"
            :items="workshops"
            :search="search"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.staffId }}</td>
                <td>{{ getProgramTitle(props.item.programId) }}</td>
                <td>{{ props.item.description }}</td>
                <td>
                  <v-dialog width="800">
                    <template v-slot:activator="{ on }">
                      <v-btn depressed v-on="on">
                        Add
                      </v-btn>
                    </template>
                    <v-card class="dialog">
                      <v-card-title class="dialog-title-card">
                        <span class="headline">
                          Add Consultation Form
                        </span>
                      </v-card-title>
                      <v-card-title class="dialog-title-card2">
                        <span class="headline2">
                          Consultation Session Form
                        </span>
                      </v-card-title>
                      <v-divider class="divider" />
                      <v-card-text>
                        <b>Please Note:</b>
                        When changing the session form credentials you must
                        notify the advisor and/or student through email of the
                        change at least 24hr prior to the start time.
                      </v-card-text>

                      <v-card-text>
                        <v-container>
                          <v-layout>
                            <v-flex sm12 md6>
                              <v-text-field
                                v-model="newSession.date"
                                label="Date"
                                placeholder="Today's Date"
                                outline
                              />
                            </v-flex>
                            <v-flex sm12 md6>
                              <v-select
                                v-model="newSession.room"
                                :items="rooms"
                                label="Room"
                                outline
                              />
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex sm12 md6>
                              <v-text-field
                                v-model="newSession.startTime"
                                label="Start Time"
                                placeholder="Start Time"
                                outline
                              />
                            </v-flex>
                            <v-flex sm12 md6>
                              <v-text-field
                                v-model="newSession.endTime"
                                label="End Time"
                                placeholder="End Time"
                                outline
                              />
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-flex sm12 md6>
                              <v-checkbox
                                v-model="newSession.emailStudent"
                                class="studentEmail"
                                label="Email Student Consultation Update"
                              />
                            </v-flex>
                            <v-flex sm12 md6>
                              <v-checkbox
                                v-model="newSession.emailAdvisor"
                                class="advisorEmail"
                                label="Email Advisor Consultation Update"
                              />
                            </v-flex>
                          </v-layout>
                          <v-layout>
                            <v-btn
                              depressed
                              color="primary"
                              @click="addSession(props.item)"
                            >
                              Add Session
                            </v-btn>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat>
                <v-data-table
                  :headers="sessionsHeaders"
                  :items="props.item.sessions"
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <!-- <td>{{ props.item.room }}</td> -->
                      <td style="padding:22px">
                        {{ getMomentDateFormat(props.item.startTime) }}
                      </td>
                      <td>{{ getMomentTimeFormat(props.item.startTime) }}</td>
                      <td>{{ getMomentTimeFormat(props.item.endTime) }}</td>
                      <td>{{ props.item.room }}</td>
                      <td>
                        <router-link
                          :to="`/admin/consultations/${props.item.id}`"
                        >
                          View
                        </router-link>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <!-- <v-btn depressed class="primary">Add Session</v-btn> -->
              </v-card>
            </template>
          </v-data-table>
        </Sheet>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'
import {
  workshopsModule,
  REQUEST,
  WORKSHOPS,
  CREATE
} from '../../store/workshops/methods'
import { sessionsModule, ADD_SESSION } from '../../store/sessions/methods'
import Sheet from '../../components/Sheet/Sheet'
import { SessionApi } from '../../core/Api'

const emptyWorkshopForm = () => ({
  title: '',
  staffId: null,
  programId: null,
  description: ''
})

const emptySessionForm = () => ({
  id: null,
  date: '',
  startTime: '',
  endTime: '',
  emailStudent: false,
  emailAdvisor: false
})

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Staff ID', value: 'skillsetId' },
        { text: 'Program', value: 'programId' },
        { text: 'Description', value: 'description', sortable: false }
      ],
      sessionsHeaders: [
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Start Time', value: 'startTime', sortable: false },
        { text: 'Finish Time', value: 'finishTime', sortable: false },
        { text: 'Room', value: 'room', sortable: false }
      ],
      sessions: [],
      workshopsLoading: false,
      dialog: false,
      sessionDialog: false,
      programs: [],
      staff: [],
      rooms: ['CB05B.04.036', 'CB05B.04.037'],
      newWorkshop: emptyWorkshopForm(),
      newSession: emptySessionForm(),
      expand: false,
      workshopId: 1
    }
  },
  computed: {
    workshops: {
      get() {
        return this.$store.getters[workshopsModule(WORKSHOPS)]
      }
    }
  },
  async mounted() {
    this.$store.dispatch(workshopsModule(REQUEST))
    this.programs = await this.$axios.$get('http://localhost:4000/programs')
    this.staff = await this.$axios.$get('http://localhost:4000/staff')
  },
  methods: {
    required(value) {
      return !!value || 'Required.'
    },
    getProgramTitle(programId) {
      let result
      this.programs.forEach(program => {
        if (program.id === programId) {
          result = program.title
        }
      })
      return result
    },
    async addWorkshop() {
      if (
        this.newWorkshop.title === '' ||
        this.newWorkshop.programId === null ||
        this.newWorkshop.staffId === '' ||
        this.newWorkshop.description === ''
      ) {
        return false
      }
      console.log(this.newWorkshop)
      await this.$store.dispatch(workshopsModule(CREATE), this.newWorkshop)
      this.dialog = false
      this.newWorkshop = emptyWorkshopForm()
    },
    async addSession(workshop) {
      const newSession = {
        workshopId: workshop.id,
        createdBy: workshop.staffId, // TODO: get current user's id
        startTime: this.getDateTime(
          this.newSession.date,
          this.newSession.startTime
        ),
        endTime: this.getDateTime(
          this.newSession.date,
          this.newSession.endTime
        ),
        size: '30',
        cutoff: '24',
        type: 'Workshop'
      }

      await SessionApi.addSession(newSession)
      this.newSession = emptySessionForm()
    },
    getMomentDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getMomentTimeFormat(date) {
      return moment(date).format('h:mm a')
    },
    getDateTime(dayDate, time) {
      // TODO: fix me
      return time
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
.form {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 25px;
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
    background-color: #ff1818;
    height: 70px;
  }
  .dialog-title-card2 {
    background: #ffffff;
    height: 70px;
  }
  .headline {
    color: #ffffff;
  }
  .headline2 {
    font-size: 20px;
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
      margin-left: 20px;
      margin-right: 20px;
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
