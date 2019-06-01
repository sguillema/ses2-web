<template>
  <div id="page-dataTable">
    <section class="container">
      <v-btn color="error" style="float:right;">Add Session</v-btn>
      <h1>My Bookings</h1>
      <v-toolbar flat color="white">
        <v-toolbar-title>Your Bookings</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="bookings"
        class="elevation-1"
        item-key="name"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.type }}</td>
          <td class="text-xs-right">{{ props.item.time }}</td>
          <td class="text-xs-right">{{ props.item.room }}</td>
          <td class="text-xs-right">{{ props.item.advisor }}</td>
          <td class="text-xs-right">{{ props.item.type2 }}</td>
          <td class="text-xs-right">{{ props.item.icon }}</td>
          <td><v-checkbox v-model="props.selected" /></td>
          <td><i class="fa fa-angle-down" style="font-size:20px"></i></td>
        </template>
      </v-data-table>
    </section>
    <section class="container">
      <v-btn color="error" style="float:right;">Add Session</v-btn>
      <v-toolbar flat color="white">
        <v-toolbar-title>Past Bookings</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="bookings"
        class="elevation-1"
        item-key="name"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.type }}</td>
          <td class="text-xs-right">{{ props.item.time }}</td>
          <td class="text-xs-right">{{ props.item.room }}</td>
          <td class="text-xs-right">{{ props.item.advisor }}</td>
          <td class="text-xs-right">{{ props.item.type2 }}</td>
          <td class="text-xs-right">{{ props.item.icon }}</td>
          <td><v-checkbox v-model="props.selected" /></td>
          <td><i class="fa fa-angle-down" style="font-size:20px"></i></td>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
import { authModule, TYPE } from '~/store/auth/methods'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: studentAuthenticated,
  layout: 'student',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],

      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Time', value: 'time' },
        { text: 'Room', value: 'room' },
        { text: 'Advisor', value: 'advisor' },
        { text: 'Type', value: 'type2' }
      ],
      selected: [],
      bookings: [
        {
          name: '15/05/2019',
          type: 'Consultation',
          time: '10:00 AM - 1:30 PM',
          room: 'CB11.03.301',
          advisor: 'John Smith',
          type2: 'How to write a Report'
        },
        {
          name: '15/05/2019',
          type: 'Program 1',
          time: '11:00 AM - 12:30 PM',
          room: 'TBA',
          advisor: 'Andrew Smith',
          type2: 'Part 1 of Program Name'
        },
        {
          name: '12/05/2019',
          type: 'Program 2',
          time: '10:00 AM - 1:30 PM',
          room: 'CB05.03.301',
          advisor: 'John Wick',
          type2: 'How to Draw with a Pencil'
        },
        {
          name: '18/05/2019',
          type: 'Workshop',
          time: '11:30 AM - 12:30 PM',
          room: 'CB11.00.201',
          advisor: 'Graham Smith',
          type2: 'Part 2 of Program Name'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
