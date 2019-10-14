<template>
  <Sheet class="sheet" header="Student list">
    <!-- <h3 align="center">Add Student to the Workshop Attendance List</h3>
    <v-text-field
      v-model="studentNumber"
      label="Enter Student ID/Name"
      type="number"
      outline
    />
    <v-btn block color="primary" depressed @click="bookStudentIntoWorkshop">
      Add
    </v-btn> -->
    <v-data-table
      :headers="headers"
      :items="studentBookings"
      :search="search"
      item-key="name"
    >
      <template v-slot:items="props">
        <td>{{ props.item.booking.attended ? 'Yes' : 'No' }}</td>
        <td>{{ props.item.booking.studentId }}</td>
        <td>{{ getMomentDateFormat(props.item.booking.createdAt) }}</td>
        <td>{{ props.item.student.name.split(' ')[0] }}</td>
        <td>{{ props.item.student.name.split(' ')[1] }}</td>
      </template>
    </v-data-table>
  </Sheet>
</template>

<script>
import moment from 'moment'
import { BookingApi, StudentApi, SessionApi } from '../core/Api'
import Sheet from './Sheet/Sheet'

export default {
  components: { Sheet },
  props: {
    sessionId: { type: String, required: true }
  },
  data() {
    return {
      errorMessage: '',
      studentNumber: '',
      search: '',
      headers: [
        { text: 'Attendence', value: 'booking.attended' },
        { text: 'StudentID', value: 'booking.studentId' },
        { text: 'Booked Date', value: 'booking.createdAt' },
        { text: 'Last Name', value: 'student.name' },
        { text: 'First Name', value: 'student.name' }
      ],
      studentBookings: []
    }
  },
  async mounted() {
    const res = await BookingApi.getBookingsBySessionId(this.sessionId)
    const bookings = res.data.bookings
    let promises = bookings.map(async booking => {
      let newBooking = {}
      const res1 = await StudentApi.getStudent(booking.studentId)
      newBooking.booking = booking
      newBooking.student = res1.data
      return newBooking
    })
    this.studentBookings = await Promise.all(promises)
  },
  methods: {
    getMomentDateFormat(date) {
      return moment(date).format('L')
    },
    async bookStudentIntoWorkshop() {
      const res = await SessionApi.getSession(this.sessionId)
      const session = res.data
      const res2 = await SessionApi.getSessionsByWorkshopId(session.workshopId)
      const workshopSessions = res2.data

      const studentId = this.studentNumber
      const booked = true
      const attended = false

      const promises = workshopSessions.map(async session => {
        return await BookingApi.addBooking({
          studentId,
          booked,
          attended,
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
