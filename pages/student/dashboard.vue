<template>
  <div id="page-authenticated">
    <section class="container">
      <p>{{ sessions }}</p>
      <h1>Welcome to UTS:HELPS Booking System</h1>
      <v-toolbar flat color="white">
        <v-toolbar-title>Your Bookings</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="sessions"
        class="elevation-1"
        item-key="name"
      >
        <template v-slot:items="props">
          <td>{{ props.item.startTime }}</td>
          <td class="text-xs-right">{{ props.item.type }}</td>
          <td class="text-xs-right">{{ props.item.room }}</td>
          <td class="text-xs-right">{{ props.item.createdBy }}</td>
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.icon }}</td>
          <td>
            <i class="material-icons">school</i>
          </td>
          <td>
            <i class="fa fa-angle-down" style="font-size:20px"></i>
          </td>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
import { authModule, TYPE, USER } from '~/store/auth/methods'
import { BookingApi, SessionApi } from '../../core/Api'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import { type } from 'os'

export default {
  middleware: studentAuthenticated,
  layout: 'student',

  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      user: this.$store.getters[authModule(USER)],
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Room', value: 'room', sortable: false },
        { text: 'Advisor', value: 'advisor', sortable: false },
        { text: 'Title', value: 'title', sortable: false }
      ],
      sessions: [],
      bookings: []
    }
  },
  async mounted() {
    const response = await BookingApi.getBookings(this.user.id)
    this.bookings = response.data
    const answer = await SessionApi.getSessions(this.bookings.id)
    this.sessions = answer.data
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.table-wrapper {
  border-bottom: 2px solid $color-divider;
  margin-bottom: 12px;

  thead {
    background: black;
    tr {
      &:first-child {
        border-bottom: 2px solid $color-divider;
      }
    }
  }
}
h1 {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  margin: 70px 0px 60px;
}
.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
