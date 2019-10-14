<template>
  <div id="page-workshops">
    <section class="container">
      <div class="column-left">
        <v-dialog v-model="dialog" width="800">
          <template v-slot:activator="{ on }">
            <v-btn class="header-button" color="primary" depressed v-on="on">
              <v-icon class="header-button-icon">add</v-icon>
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
          </v-toolbar>
          <v-data-table
            class="table-wrapper"
            :headers="headers"
            :items="workshops"
            :search="search"
            :expand="expand"
            :items-per-page="-1"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.staffId }}</td>
                <td>{{ getProgramTitle(props.item.programId) }}</td>
                <td>{{ props.item.description }}</td>
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
                      <td>
                        <router-link :to="`/admin/workshops/${props.item.id}`">
                          {{ props.item.id }}
                        </router-link>
                      </td>
                      <td style="padding:22px">
                        {{ getMomentDateFormat(props.item.startTime) }}
                      </td>
                      <td>{{ getMomentTimeFormat(props.item.startTime) }}</td>
                      <td>{{ getMomentTimeFormat(props.item.endTime) }}</td>
                      <td>{{ props.item.room }}</td>
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
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import {
  workshopsModule,
  REQUEST,
  WORKSHOPS,
  CREATE
} from '../../../store/workshops/methods'
import Sheet from '../../../components/Sheet/Sheet'

const emptyWorkshopForm = () => ({
  title: '',
  staffId: null,
  programId: null,
  description: ''
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
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Start Time', value: 'startTime', sortable: false },
        { text: 'Finish Time', value: 'finishTime', sortable: false },
        { text: 'Room', value: 'room', sortable: false }
      ],
      sessions: [],
      workshopsLoading: false,
      dialog: false,
      programs: [],
      staff: [],
      newWorkshop: emptyWorkshopForm(),
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
      await this.$store.dispatch(workshopsModule(CREATE), this.newWorkshop)
      this.dialog = false
      this.newWorkshop = emptyWorkshopForm()
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

.calendar-button,
.header-button {
  min-width: unset;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 15px;
  margin-top: 0;
  width: 100%;
  height: 80px;
  color: $color-white;
  .calendar-button-icon {
    font-size: 60px;
  }
}
.header-button {
  background: $color-red2;
  .header-button-icon {
    font-size: 60px;
  }
}
.calendar-button {
  background: $color-black;
}

.container {
  display: flex;
  .column-left {
    width: 80px;
    min-width: 80px;
    margin-right: 27px;
  }
  .column-right {
    width: 100%;
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
    background: #ff1818;
    height: 70px;
  }
  .dialog-title-card2 {
    background: #ffffff;
    height: 70px;
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
