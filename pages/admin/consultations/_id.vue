<template>
  <div id="page-viewconsultation">
    <section class="container">
      <v-sheet class="column-left" elevation="3">
        <div>
          <Sheet header="Consultation Session Details">
            <label>
              Student ID
              <div></div>
            </label>

            <label>
              Date
              <div>
                {{ getMomentDateFormat(session.startTime) }}
              </div>
            </label>

            <label>
              Time
              <div>
                {{ getMomentTimeFormat(session.startTime) }}
              </div>
            </label>

            <label>
              Room
              <div>
                {{ getRoom(session.room) }}
              </div>
            </label>

            <label>
              Title
              <div></div>
            </label>

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
            <label>
              Topic
              <div></div>
            </label>

            <label>
              Subject Name
              <div>
                {{ getSubjectName(bookingDetails.subjectName) }}
              </div>
            </label>

            <label>
              Is a group assignment?
              <div>
                {{ getGroupAssignment(bookingDetails.isGroupAssignment) }}
              </div>
            </label>

            <label>
              Need help with:
              <div>
                {{ getHelpWith(bookingDetails.helpWith) }}
              </div>
            </label>

            <label>
              Other/Notes
              <div></div>
            </label>
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
import {
  SessionApi,
  BookingApi,
  BookingDetailsApi,
  WorkshopApi
} from '../../../core/Api'
import ViewConsultation from '../../../components/ViewConsultation/ViewConsultation'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      session: [],
      bookings: [],
      bookingDetails: [],
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
    //this.bookings = res1.data

    const { bookings, waitlist } = res1.data
    const bookingDetailsId = bookings[0].bookingDetailsId

    const res2 = await BookingDetailsApi.getBookingDetail(bookingDetailsId)
    const bookingDetails = res2.data
    //this.bookings = res2.data
    /*
    console.log(res2.data)
    const { bookingsD } = res2.data
    console.log(bookingsD[0].bookingId)
    */
  },
  methods: {
    getMomentDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getMomentTimeFormat(date) {
      return moment(date).format('h:mm a')
    },
    getRoom(room) {
      return room
    },
    getTitle(title) {
      return title
    },
    getSubjectName(subjectName) {
      return subjectName
    },
    getGroupAssignment(isGroupAssignment) {
      return isGroupAssignment
    },
    getHelpWith(helpWith) {
      return helpWith
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
