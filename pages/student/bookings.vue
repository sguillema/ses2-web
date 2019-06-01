<template>
  <div id="page-dataTable">
    <section class="container">
      <v-layout style="float:right">
        <v-btn color="primary" @click.stop="dialog = true">
          Register Skillset
        </v-btn>

        <v-dialog v-model="dialog" max-width="1100" max-height="406">
          <v-card>
            <v-stepper v-model="e1">
              <v-stepper-header>
                <h1 class="dialog-title">HELPS Workshop Booking</h1>
                <v-stepper-step :complete="e1 > 1" step="1">
                  Step 1
                </v-stepper-step>

                <v-divider />

                <v-stepper-step :complete="e1 > 2" step="2">
                  Step 2
                </v-stepper-step>

                <v-divider />

                <v-stepper-step step="3">Step 3</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1" class="step-container">
                  <v-btn color="primary" @click="e1 = 2">Next</v-btn>

                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-5" color="grey lighten-1" height="200px" />

                  <v-btn color="primary" style="float:left" @click="e1 = 3">
                    Next
                  </v-btn>

                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card class="mb-5" color="grey lighten-1" height="200px" />

                  <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <v-card-actions>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
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
          <td class="text-xs-left">{{ props.item.type }}</td>
          <td class="text-xs-left">{{ props.item.time }}</td>
          <td class="text-xs-left">{{ props.item.room }}</td>
          <td class="text-xs-left">{{ props.item.advisor }}</td>
          <td class="text-xs-left">{{ props.item.type2 }}</td>
          <td class="text-xs-left">{{ props.item.icon }}</td>
          <td>
            <v-checkbox v-model="props.selected" />
          </td>
          <td>
            <i class="fa fa-angle-down" style="font-size:20px"></i>
          </td>
        </template>
      </v-data-table>
    </section>
    <section class="container">
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
          <td class="text-xs-left">{{ props.item.type }}</td>
          <td class="text-xs-left">{{ props.item.time }}</td>
          <td class="text-xs-left">{{ props.item.room }}</td>
          <td class="text-xs-left">{{ props.item.advisor }}</td>
          <td class="text-xs-left">{{ props.item.type2 }}</td>
          <td class="text-xs-left">{{ props.item.icon }}</td>
          <td>
            <v-checkbox v-model="props.selected" />
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
import moment from 'moment'
import { authModule, TYPE } from '~/store/auth/methods'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: studentAuthenticated,
  layout: 'student',
  data() {
    return {
      dialog: false,
      e1: 0,

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
  },
  methods: {
    stepOne() {
      alert('Sent!')
      this.dialog = false
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
