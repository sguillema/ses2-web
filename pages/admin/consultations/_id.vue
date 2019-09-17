<template>
  <div id="page-viewconsultation">
    <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Session Details">
            <label>Student ID:</label>
            <div></div>

            <label>Date:</label>
            <div></div>

            <label>Time:</label>
            <div></div>

            <label>Room:</label>
            <div></div>
          </Sheet>
        </div>
      </v-sheet>
    </section>
    <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Booking Details">
            <label>Topic:</label>
            <div></div>

            <label>Subject Name:</label>
            <div></div>

            <label>Is a group assignment:</label>
            <div></div>

            <label>Need Help with:</label>
            <div></div>

            <label>Others/Notes:</label>
            <div></div>
          </Sheet>
        </div>
      </v-sheet>
    </section>
    <section class="container">
      <div class="column-left">
        <div>
          <Sheet header="Student List" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'

import Sheet from '../../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      session: {}
    }
  },
  async asyncData({ params, $axios }) {
    // try {
    //   let result = await $axios.$get(`http://localhost:4000/sessions/test`)
    //   return { result }
    // } catch (e) {
    //   console.log(`We have an error`)
    // }
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
      .header-button {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 15px;
        margin-top: 0;
        width: 100%;
        height: 60px;
        font-size: $font-subheading;
        color: $color-white;
        background: $color-red2;
      }
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
      }
      .table-wrapper {
        a {
          color: $color-secondary;
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
