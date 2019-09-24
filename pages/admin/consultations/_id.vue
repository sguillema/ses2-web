<template>
  <div id="page-viewconsultation">
    <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Session Details">
            <v-text-field value="Test" label="Student ID" readonly />
            <v-text-field value="Test" label="Date" readonly />
            <v-text-field value="Test" label="Time" readonly />
            <v-text-field value="Test" label="Room" readonly />

            <div align="center">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                Edit Session
              </v-btn>

              <v-btn class="ma-2" align="center" tile>
                Cancel
              </v-btn>
            </div>
          </Sheet>
        </div>
      </v-sheet>
    </section>
    <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Booking Details">
            <v-text-field value="Test" label="Topic" readonly />

            <v-text-field value="Test" label="Subject Name" readonly />

            <v-text-field
              value="Test"
              label="Is a group assignment?"
              readonly
            />

            <v-text-field value="Test" label="Need help with:" readonly />

            <v-text-field value="Test" label="Other/Notes" readonly />

            <div align="center">
              <v-btn align="center" color="primary" dark class="mb-2" v-on="on">
                Edit Booking
              </v-btn>
            </div>
          </Sheet>
        </div>
      </v-sheet>
    </section>
    <section class="container">
      <div class="column-left">
        <div>
          <Sheet header="Student List">
            <h3 align="center">Add student to the Attendance list</h3>
            <div class="section-header">
              <v-text-field
                v-model="search"
                class="input-spacing"
                label="Student ID/Name"
                placeholder="Enter Student ID/Name"
                outline
              />
              <div align="center">
                <v-btn depressed large disabled>Add</v-btn>
              </div>
              <div>
                <v-data-table
                  class="table-wrapper"
                  :headers="headers"
                  :items="sessionItems"
                  :search="search"
                  item-key="name"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.att }}</td>
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.bDate }}</td>
                    <td>{{ props.item.lName }}</td>
                    <td>{{ props.item.fName }}</td>
                    <!-- <td>
                      <router-link :to="`/admin/advisors/${props.item.id}`">
                        Edit
                      </router-link>
                      <router-link
                        :to="`/admin/advisors/${props.item.id}/history`"
                      >
                        View History
                      </router-link>
                    </td> -->
                  </template>
                </v-data-table>
              </div>
            </div>
          </Sheet>
        </div>
      </div>
    </section>

    <!--Currently don't need the attachment bit 
      <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Attachments">
            <label>Topic:</label>
          </Sheet>
        </div>
      </v-sheet>
    </section> -->
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'
import { SessionApi, BookingApi } from '../../../core/Api'
import ViewConsultation from '../../../components/ViewConsultation/ViewConsultation'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      session: null,
      headers: [
        { text: 'Attendance', value: 'att' },
        { text: 'StudentID', value: 'id' },
        { text: 'Booked Date', value: 'bDate' },
        { text: 'Last Name', value: 'lName' },
        { text: 'First Name', value: 'fName' },
        { text: '', value: '' }
      ],
      addNew: {
        attendance: '',
        id: '',
        bookeddate: '',
        lastname: '',
        firstname: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    }
  },

  async asyncData({ params, $axios }) {
    // try {
    //   let result = await $axios.$get(`http://localhost:4000/sessions/test`)
    //   return { result }
    // } catch (e) {
    //   console.log(`We have an error`)
    // }
  },

  async mounted() {
    // await this.$store.dispatch()
    //this.getSessions()

    const res = await SessionApi.getSession(this.$route.params.id)
    this.session = res.data

    //GET BOOKINGS AND WAITLIST

    const params = {
      sessionId: this.$route.params.id
    }

    const res1 = await BookingApi.getBookings(params)
    console.log(res1.data)
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
    }
  }
}
</style>
