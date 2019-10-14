<template>
  <Sheet class="sheet" align="center" header="Waiting List">
    <div class="sheet-content">
      <h3 align="center">Add students to the Waiting List</h3>
    </div>
    <v-autocomplete
      v-model="addStudentId"
      :items="students"
      item-text="id"
      item-value="id"
      style="padding-top:10px"
      label="Student ID"
      outline
    />
    <div class="action row" align="center">
      <v-btn color="primary" dark depressed @click="addStudent()">Add</v-btn>
    </div>
    <p>There are {{ studentAmount }} students on the waiting list</p>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="bookingDetails.waitlist"
      :items-per-page="5"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details />
        </td>
        <td>
          {{ props.item.studentId }}
        </td>
        <td>{{ formatDate(props.item.createdAt) }}</td>
      </template>
    </v-data-table>
    <div class="action row" align="center">
      <v-btn color="primary" dark depressed @click="nukeOneThing()">
        Remove
      </v-btn>
      <v-btn color="primary" dark depressed @click="nukeEverything()">
        Clear
      </v-btn>
    </div>
  </Sheet>
</template>

<script>
import moment from 'moment'
import Sheet from '../../components/Sheet/Sheet'
import {
  waitListModule,
  REQUEST,
  BOOKINGS,
  BOOKINGS_LENGTH,
  ADD_STUDENT,
  REMOVE_STUDENT
} from '../../store/waitlist/methods'
import { StudentApi } from '../../core/Api'
export default {
  components: { Sheet },
  props: {
    sessionId: { type: String, required: true }
  },
  data() {
    return {
      students: [],
      singleSelect: false,
      headers: [
        {},
        {
          text: 'Student ID',
          value: 'studentId'
        },
        {
          text: 'Booked Date',
          value: 'createdAt'
        }
      ],
      addStudentValue: {
        studentId: '',
        sessionId: '',
        bookingDetails: 'mockData',
        booked: true,
        attended: false
      },
      addStudentId: '',
      selected: []
    }
  },
  computed: {
    bookingDetails() {
      return this.$store.getters[waitListModule(BOOKINGS)]
    },
    studentAmount() {
      return this.$store.getters[waitListModule(BOOKINGS_LENGTH)]
    }
  },
  async mounted() {
    this.$store.dispatch(waitListModule(REQUEST), {
      sessionId: this.sessionId
    })
    this.students = (await StudentApi.getStudents()).data
  },
  methods: {
    async addStudent() {
      this.addStudentValue.studentId = this.addStudentId
      this.addStudentValue.sessionId = this.sessionId
      this.$store.dispatch(waitListModule(ADD_STUDENT), {
        studentId: this.addStudentValue
      })
      this.addStudentId = ''
    },
    async nukeEverything() {
      this.selected = []
    },
    async nukeOneThing() {
      let body = { bookingId: this.selected[0].id, sessionId: this.sessionId }
      this.selected = []
      this.$store.dispatch(waitListModule(REMOVE_STUDENT), {
        body: body
      })
    },
    formatDate(yeww) {
      return moment(yeww).format('DD/MM/YYYY')
    }
  }
}
</script>

<style></style>
