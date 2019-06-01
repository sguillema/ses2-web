/* eslint-disable prettier/prettier */
<template>
  <div id="page-dataTable">
    <section class="container">
      <v-layout style="float:right">
        <v-btn
          color="primary"
          style="float:right"
          @click.stop="dialog = true"
          @click="e1 = 0"
        >
          Register Skillset
        </v-btn>
        <v-dialog v-model="dialog" max-width="1100" max-height="300">
          <v-card>
            <section class="container">
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <h1>HELPS Workshop Booking</h1>
                  <!-- <v-stepper-step step="0" /> -->

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
                <section class="container"></section>

                <v-stepper-content step="0" class="step-container">
                  <div class="firstPage-content">
                    <p>
                      <b>Important Information:</b>
                    </p>

                    <ul>
                      <li>
                        <b>Follow</b>
                        each site complete your booking.
                      </li>
                      <li>
                        <b>Check</b>
                        the time to ensure that there is no timetable clash.
                      </li>
                      <li>
                        <b>Check your email</b>
                        (UTS email address) for the booking confirmation.
                        <br />
                      </li>

                      <li>
                        <b>Cancel,</b>
                        if no longer available,
                        <b>24 hours before</b>
                        the scheduled session by clicking on
                        <b>'My Booking'</b>
                        tab and then the
                        <b>'detail'</b>
                        link.
                      </li>
                      <li>
                        Please know that failing to turn up for your registered
                        workshop is not fair to those on the waiting list.
                        Repeat offenders (2 no-shows) may be barred from
                        registering for workshop.
                      </li>
                    </ul>

                    <br />
                    <p>
                      <b>
                        Registration is now open for 2019 Autumn workshops!
                      </b>
                      <br />
                      <b>
                        At this stage, we only open registration for March and
                        April workshops. For the remaining workshops,
                        registration will be open in week 5.
                      </b>
                    </p>
                  </div>
                  <v-btn color="primary" @click="e1 = 1">Next</v-btn>
                </v-stepper-content>

                <v-stepper-items>
                  <v-stepper-content step="1" class="step-container">
                    <div class="secondPage-content">
                      <div style="margin-left:-5px; ">
                        <p>
                          <b>
                            To start the booking process, please click the
                            skill-set that you want to improve:
                          </b>
                        </p>
                      </div>
                    </div>

                    <v-btn color="primary" @click="e1 = 2">Next</v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <!-- <v-card
                      class="mb-5"
                      color="grey lighten-1"
                      height="200px"
                    />-->
                    <v-stepper-items>
                      <div class="step-content">
                        <p>
                          <b>Important Information:</b>
                        </p>
                      </div>
                    </v-stepper-items>

                    <v-btn color="primary" style="float:left" @click="e1 = 3">
                      Next
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card
                      class="mb-5"
                      color="grey lighten-1"
                      height="200px"
                    />

                    <v-btn color="primary" @click="e1 = 0">Continue</v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>

              <v-card-actions>
                <v-spacer />
              </v-card-actions>
            </section>
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
          name: '20/05/2019',
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
ul {
  margin: 10px;
}
h1 {
  margin: 30px;
}
p {
  margin: 5px;
}
</style>
