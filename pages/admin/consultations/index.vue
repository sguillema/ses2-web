<template>
  <div id="page-consultations">
    <section class="container">
      <div class="column-left">
        <v-sheet class="calendar-container" elevation="3">
          <div class="calendar-header">
            <div class="calendar-header-container">
              <span class="calendar-year">{{ calendarHeaderYear }}</span>
              <span class="calendar-date">{{ calendarHeaderDate }}</span>
            </div>
            <div class="calendar-controls">
              <span class="calendar-back">
                <v-icon @click="prevMonth">
                  arrow_back_ios
                </v-icon>
              </span>
              <span class="calendar-selection">{{ calendarMenuDate }}</span>
              <span class="calendar-forward">
                <v-icon @click="nextMonth">
                  arrow_forward_ios
                </v-icon>
              </span>
            </div>
          </div>
          <v-calendar
            ref="calendar"
            v-model="value"
            :type="type"
            :now="today"
            color="primary"
            @click:date="setSelectedDate"
          >
            <!-- <template v-slot:day="date">
              fuuk
            </template> -->
            <!-- <template v-slot:day="{ date }" @click="console.log(date)">
              asssa
            </template> -->
          </v-calendar>
        </v-sheet>
        <Sheet>
          Filter Sessions
        </Sheet>
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
      type: 'month',
      start: moment().format('YYYY-MM-DD'),
      today: moment().format('YYYY-MM-DD'),
      value: moment().format('YYYY-MM-DD'),
      selected: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    calendarMenuDate() {
      return moment(this.value).format('MMMM YYYY')
    },
    calendarHeaderDate() {
      return moment(this.selected).format('ddd, MMM DD')
    },
    calendarHeaderYear() {
      return moment(this.selected).format('YYYY')
    }
  },
  methods: {
    nextMonth() {
      this.value = moment(this.value)
        .add(1, 'month')
        .format('YYYY-MM-DD')
    },
    prevMonth() {
      console.log(123412)
      this.value = moment(this.value)
        .subtract(1, 'month')
        .format('YYYY-MM-DD')
      console.log(
        moment(this.value)
          .subtract(1, 'month')
          .format('YYYY-MM-DD')
      )
    },
    setSelectedDate(date) {
      console.log(date)
      this.selected = date
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
      .calendar-container {
        margin-bottom: 27px;
        user-select: none;
        .calendar-header {
          background: $color-black;
          min-height: 132px;
          height: 132px;
          display: flex;
          flex-direction: column;
          .calendar-header-container {
            padding: 15px 22px;
            display: flex;
            flex-direction: column;
            .calendar-year,
            .calendar-date {
              color: $color-white;
            }
            .calendar-year {
              font-size: $font-regular;
              margin-bottom: 5px;
            }
            .calendar-date {
              font-size: 34px;
              font-weight: 500;
              line-height: 34px;
            }
          }
          .calendar-controls {
            margin-top: auto;
            height: 44px;
            min-height: 44px;
            background: $color-white;
            color: $color-darkgray;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
          }
        }
      }
    }
    .column-right {
      width: 100%;
    }
  }
}
</style>
