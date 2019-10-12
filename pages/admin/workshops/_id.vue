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
        <div align="center">
          <v-btn color="primary" depressed:disabled>
            Edit
          </v-btn>
          <v-btn text depressed @click="stepCount = 1">
            Cancel
          </v-btn>
        </div>
      </Sheet>
    </section>
    <section class="container">
      <Sheet class="sheet" header="Student list">
        <v-container>
          <h2 align="center">Add Student to the Attendence List</h2>
        </v-container>
        <br />
        <v-text-field
          v-model="studentList"
          label="Enter Student ID/Name"
          type="number"
          outline
        />

        <v-btn block color="primary" depressed:disabled>
          Add
        </v-btn>
        <br />
        <v-data-table
          :headers="headers"
          :items="sessionItems"
          :search="search"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.att }}</td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.bDate }}</td>
            <td>{{ props.item.lName }}</td>
            <td>{{ props.item.fName }}</td>
            <td>
              <v-btn block color="primary">
                delete
              </v-btn>
            </td>
          </template>
        </v-data-table>
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
  ProgramApi
} from '../../../core/Api'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  components: { Sheet },

  data() {
    return {
      search: '',
      isLoading: true,
      session: null,
      workshop: null,
      program: null,
      bookings: [],
      headers: [
        { text: 'Attendence', value: 'att' },
        { text: 'StudentID', value: 'id' },
        { text: 'Booked Date', value: 'bDate' },
        { text: 'Last Name', value: 'lName' },
        { text: 'First Name', value: 'fName' }
      ]
    }
  },

  async asyncData({ params, $axios }) {},
  async mounted() {
    // GET SESSION BY ID

    const res = await SessionApi.getSession(this.$route.params.id)
    this.session = res.data

    // GET BOOKINGS AND WAITLIST
    const params = {
      sessionId: this.$route.params.id
    }
    const res1 = await BookingApi.getBookings(params)
    this.bookings = res1.data.bookings

    const res2 = await WorkshopApi.getWorkshop(this.session.workshopId)
    this.workshop = res2.data

    const res3 = await ProgramApi.getProgram(this.workshop.programId)
    this.program = res3.data

    this.isLoading = false
  },
  methods: {
    getDateRangeString(startDate, endDate) {
      const momentStart = moment(startDate)
      const momentEnd = moment(endDate)
      const formattedStart = momentStart.format('ddd D MMM hh:mm A')
      const formattedEnd = momentEnd.format('hh:mm A')
      return `${formattedStart} - ${formattedEnd}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import ')~assets/styles/variables';
</style>
