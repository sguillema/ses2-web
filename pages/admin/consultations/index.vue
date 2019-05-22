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
          <v-divider />
          <div class="filters">
            <h2>Filters</h2>
            <v-autocomplete
              v-model="advisorsInput"
              :items="advisors"
              :loading="isLoading"
              label="Advisor"
            />
            <v-autocomplete
              v-model="roomsInput"
              :items="rooms"
              :loading="isLoading"
              label="Room"
            />
          </div>
        </v-sheet>
      </div>
      <div class="column-right">
        <Sheet header="Upcoming Consultations">
          <div>123234</div>
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
      dummy: '',
      calendarToggle: false,
      today: moment().format('YYYY-MM-DD'),
      value: moment().format('YYYY-MM'),
      selected: moment().format('YYYY-MM-DD'),
      advisors: [
        'blyue',
        'seb',
        'asdsda',
        'and',
        'hayden',
        'sheng',
        'abd',
        'andre'
      ]
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
  methods: {}
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
    }
  }
}
</style>
