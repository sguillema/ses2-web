<template>
  <div id="page-consultations">
    <section class="container">
      <div class="column-left">
        <v-sheet class="calendar-container" elevation="3">
          <div class="calendar-header">
            <span class="calendar-year">Year</span>
            <span class="calendar-date">Date</span>
            <div class="calendar-controls">
              <span class="calendar-back">
                <v-icon @click="$refs.calendar.prev()">
                  arrow_back_ios
                </v-icon>
              </span>
              <span class="calendar-selection">May 2019</span>
              <span class="calendar-forward">
                <v-icon @click="$refs.calendar.next()">
                  arrow_forward_ios
                </v-icon>
              </span>
            </div>
          </div>
          <v-calendar
            ref="calendar"
            v-model="start"
            :type="type"
            :now="today"
            color="primary"
          />
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
      start: moment(),
      today: moment()
    }
  }
}
</script>

<style lang="scss" scoped>
#page-consultations {
  .container {
    display: flex;
    .column-left {
      min-width: 290px;
      width: 290px;
      margin-right: 27px;
      .calendar-container {
        margin-bottom: 27px;
      }
    }
    .column-right {
      width: 100%;
    }
  }
}
</style>
