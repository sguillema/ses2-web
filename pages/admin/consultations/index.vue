<template>
  <div id="page-consultations">
    <section class="container">
      <div class="column-left">
        <v-sheet class="filter-container" elevation="3">
          <v-switch
            v-model="calendarToggle"
            class="calendar-toggle"
            label="Select by day"
            color="red"
            dark
            hide-details
            flat
          />
          <v-date-picker
            v-model="value"
            class="calendar"
            :min="calendarMinDate"
            :max="calendarMaxDate"
            header-color="black"
            color="red"
            width="290"
            :type="calendarType"
          />
        </v-sheet>
      </div>
      <div class="column-right">
        <Sheet header="Upcoming Consultations">
          <div class="section-header">
            <v-text-field
              v-model="search"
              class="input-spacing"
              append-icon="search"
              label="Search"
              placeholder="Search"
              single-line
              hide-details
            />
            <v-btn
              class="header-button"
              depressed
              color="primary"
              @click="addStudent"
            >
              Create Consultation Session
            </v-btn>
          </div>
          <v-data-table
            class="table-wrapper"
            :headers="headers"
            :items="sessions"
          >
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td>{{ getSessionDate(props.item.date) }}</td>
              <td>
                {{ getSessionPeriod(props.item.startTime, props.item.endTime) }}
              </td>
              <td>{{ props.item.room }}</td>
              <td>{{ props.item.createdByName }}</td>
              <td>
                <router-link
                  :to="`/students/${props.item.bookedBookings[0].studentId}`"
                >
                  {{ props.item.bookedBookings[0].studentId }}
                </router-link>
              </td>
              <td>
                <router-link :to="`/consultations/${props.item.id}`">
                  View
                </router-link>
              </td>
            </template>
          </v-data-table>
        </Sheet>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      advisorsInput: '',
      roomsInput: '',
      calendarToggle: false,
      today: moment().format('YYYY-MM-DD'),
      value: moment().format('YYYY-MM'),
      selected: moment().format('YYYY-MM-DD'),
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time', sortable: false },
        { text: 'Room', value: 'room', sortable: false },
        { text: 'Advisor', value: 'advisor', sortable: false },
        { text: 'Booked By', value: 'studentId', sortable: false },
        { text: '', value: '', sortable: false }
      ],
      sessions: [],
      sessionsLoading: false
    }
  },
  computed: {
    calendarMinDate() {
      return moment(this.today)
        .subtract(1, 'year')
        .toISOString()
    },
    calendarMaxDate() {
      return moment(this.today)
        .add(1, 'year')
        .toISOString()
    },
    calendarType() {
      if (this.calendarToggle) {
        return 'date'
      } else {
        return 'month'
      }
    }
  },
  async mounted() {
    // await this.$store.dispatch()
    this.loading = true
    this.sessions = await this.$axios.$get(
      'http://localhost:4000/sessions?type=0'
    )
    this.loading = false
  },
  methods: {
    getSessionDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getSessionPeriod(start, end) {
      return `${moment(start).format('kk:mm')} - ${moment(end).format('kk:mm')}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-consultations {
  .container {
    display: flex;
    .column-left {
      min-width: 290px;
      width: 290px;
      margin-right: 27px;
      .filter-container {
        position: relative;
        .calendar-toggle {
          position: absolute;
          right: 0;
          color: white;
          z-index: 1;
          margin-top: 7px;
          transform: scale(0.8);
        }
        .filters {
          padding: 14px;
        }
        .calendar {
          box-shadow: none;
        }
      }
    }
    .column-right {
      width: 100%;
      .input-spacing {
        @include input-spacing();
        max-width: 300px;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        .header-button {
          margin-right: 30px;
        }
      }
      .table-wrapper {
        a {
          color: #0f4beb;
          padding-right: 25px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
