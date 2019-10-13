<template>
  <Sheet class="sheet" header="Waiting List">
    <div class="sheet-content">
      <strong>Add students to the Waiting List</strong>
    </div>
    <v-text-field
      v-model="addStudentId"
      style="padding:10px"
      label="Student ID/Name"
      placeholder="Enter Student ID/Name"
      outline
    />
    <v-btn depressed @click="addStudent()">Add</v-btn>
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
        <td>{{ props.item.createdAt }}</td>
      </template>
    </v-data-table>
    <div>
      <v-btn depressed @click="nukeOneThing()">Remove</v-btn>
      <v-btn depressed @click="nukeEverything()">Clear</v-btn>
    </div>
  </Sheet>
</template>

<script>
import Sheet from '../../components/Sheet/Sheet'
import {
  waitListModule,
  REQUEST,
  BOOKINGS,
  BOOKINGS_LENGTH,
  ADD_STUDENT,
  REMOVE_STUDENT
} from '../../store/waitlist/methods'

export default {
  components: { Sheet },
  props: {
    sessionId: { type: String, required: true }
  },
  data() {
    return {
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
  mounted() {
    this.$store.dispatch(waitListModule(REQUEST), {
      sessionId: 'sessionId=' + this.sessionId
    })
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
    }
  }
}
</script>

<style></style>
