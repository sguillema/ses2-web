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
            <v-btn color="primary" dark depressed>
              Edit Session
            </v-btn>
            <v-btn class="ma-2" depressed>
              Cancel
            </v-btn>
          </div>
        </Sheet>
      </div>
      <div class="container">
        <BookedStudentList :session-id="session.id" />
      </div>
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
import BookedStudentList from '../../../components/BookedStudentList'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  components: { Sheet, BookedStudentList },

  data() {
    return {
      search: '',
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
      ]
    }
  },

  async asyncData({ params, $axios }) {},
  async mounted() {
    // GET SESSION BY ID

    const res = await SessionApi.getSession(this.$route.params.id)
    this.session = res.data

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
</style>
