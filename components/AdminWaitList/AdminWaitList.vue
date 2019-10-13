<template>
  <Sheet class="sheet" header="Waiting List">
    <div class="sheet-content">
      <strong>Add students to the Waiting List</strong>
    </div>
    <v-text-field
      v-model="addStudentIdValue"
      style="padding:10px"
      label="Student ID/Name"
      placeholder="Enter Student ID/Name"
      outline
    />
    <v-btn depressed>Add</v-btn>
    <p>There are {{ studentAmount }} students on the waiting list</p>
    <v-data-table
      :headers="headers"
      :items="bookingDetails.waitlist"
      :items-per-page="5"
      show-select="true"
    >
      <template v-slot:items="props">
        <td>{{ props.item.studentId }}</td>
        <td>{{ props.item.createdAt }}</td>
      </template>
    </v-data-table>
    <div>
      <v-btn depressed>Remove</v-btn>
      <v-btn depressed>Clear</v-btn>
    </div>
  </Sheet>
</template>

<script>
import Sheet from '../../components/Sheet/Sheet'
import {
  waitListModule,
  REQUEST,
  BOOKINGS,
  BOOKINGS_LENGTH
} from '../../store/waitlist/methods'

export default {
  components: { Sheet },
  data() {
    return {
      headers: [
        {
          text: 'Student ID',
          value: 'studentId'
        },
        {
          text: 'Booked Date',
          value: 'createdAt'
        }
      ],
      addStudentIdValue: '',
      sessionId: ''
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
    //sessionId value needs to be injected somehow
    this.$store.dispatch(waitListModule(REQUEST), {
      sessionId: this.sessionId
    })
  },
  methods: {
    // async addStudent() {
    //   ada
    // }
  }
}
</script>

<style></style>
