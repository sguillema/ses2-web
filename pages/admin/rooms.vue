<template>
  <div id="page-rooms">
    <section class="container">
      <div class="column-right">
        <Sheet class="sheet" header="Rooms Available" alt>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              class="input-spacing"
              append-icon="search"
              placeholder="Search for Room"
            />
            <v-spacer />
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="rooms"
            :search="search"
            item-key="name"
          >
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.maxCapacity }}</td>
              <td>{{ props.item.status }}</td>
            </template>
          </v-data-table>
        </Sheet>
      </div>
    </section>
  </div>
</template>

<script>
// import { authModule, TYPE, LOGOUT } from '~/store/auth/methods'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'
import { roomsModule, REQUEST, ROOMS } from '../../store/rooms/methods'
import Sheet from '../../components/Sheet/Sheet'

const emptyRoomForm = () => ({
  room: '',
  type: '',
  maxCapacity: '',
  status: ''
})

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Room', value: 'id' },
        { text: 'Type', value: 'type' },
        { text: 'Max Capacity', value: 'maxCapacity' },
        { text: 'Status', value: 'status' }
      ],
      newRoom: emptyRoomForm()
    }
  },
  computed: {
    rooms: {
      get() {
        return this.$store.getters[roomsModule(ROOMS)]
      }
    }
  },
  async mounted() {
    this.$store.dispatch(roomsModule(REQUEST))
  },
  methods: {
    required(value) {
      return !!value || 'Required.'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-rooms {
  .container {
    display: flex;
    > .column-left {
      min-width: 60px;
      width: 60px;
      margin-right: 60px;
      .header-button {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;
        margin-top: 15px;
        width: 100%;
        height: 60px;
        font-size: $font-reee;
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
    > .column-right {
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
          &.book-link {
            color: $color-primary;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
.dialog {
  .dialog-title {
    margin-left: 14px;
    margin-right: 40px;
  }
  .step-content {
    padding: 0 20px;
    .step-subcontainer {
      &.form {
        margin-top: 30px;
      }
    }
  }
  .step-buttons {
    display: flex;
    justify-content: center;
  }
  .stepForm2 {
    display: flex;
    flex-direction: column;
    > div {
      flex: 1;
      display: flex;
    }
    .input {
      width: 340px;
    }
  }
  .step-review {
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 40px;
    > div {
      display: flex;
    }
  }
  .createRoomDialog {
    .step2 {
      display: flex;
      .column-left {
        display: flex;
        flex-direction: column;
        min-width: 230px;
        max-width: 230px;
        padding-right: 30px;
        margin-right: 30px;
        border-right: 1px solid $color-darkgray;
        .selected-times {
          margin-top: 24px;
          max-height: 430px;
          overflow: scroll;
          /deep/ .v-list__tile {
            padding: 0 !important;
          }
          .time-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: $font-regular;
          }
        }
        .step-buttons {
          margin-top: auto;
        }
      }
      .column-right {
        width: 100%;
        .calendar-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 37px;
          margin-left: 43px;
          > div:first-child {
            flex: calc(1 / 3);
            .button {
              margin: 0;
              min-width: 0;
              width: 200px;
            }
          }
          .calendar-navigation {
            display: flex;
            flex: calc(1 / 3);
            .calendar-selection {
              display: flex;
              align-items: center;
              justify-content: center;
              color: $color-darkgray;
              background: $color-graydarker;
              height: 100%;
              width: 245px;
            }
            .calendar-back,
            .calendar-forward {
              margin: 0;
              min-width: 0;
              max-width: 40px;
            }
            .calendar-back {
              .icon {
                padding-left: 10px;
              }
            }
          }
          .calendar-type {
            display: flex;
            justify-content: flex-end;
            flex: calc(1 / 3);
            .button {
              margin: 0;
              min-width: 0;
              width: 100px;
            }
          }
        }
        .calendar {
          max-height: 480px;
          /deep/ .v-calendar-daily__day {
            cursor: pointer;
          }
          /deep/ .v-past {
            cursor: not-allowed;
          }
          .calendar-session {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-radius: 2px;
            background-color: $color-graydarker;
            color: #ffffff;
            border: 1px solid $color-graydarker;
            font-size: 12px;
            padding: 3px;
            cursor: default;
            margin-bottom: 1px;
            left: 4px;
            margin-right: 8px;
            position: relative;
            position: absolute;
            right: 4px;
            margin-right: 0px;
            &.selected {
              background-color: $color-red2;
              border-color: $color-red2;
              cursor: pointer;
            }
          }
        }
      }
    }
    .step3 {
      .step-subcontainer {
        display: flex;
        justify-content: space-between;
        .column-left {
          display: flex;
          flex-direction: column;
          flex: 0.5;
          border-right: 1px solid $color-darkgray;
        }
        .column-right {
          display: flex;
          flex-direction: column;
          flex: 0.5;
          align-items: center;
          .selected-times {
            margin-top: 12px;
            max-height: 430px;
            overflow: scroll;
            /deep/ .v-list__tile {
              padding: 0 !important;
            }
            width: 250px;
            .time-item {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: $font-regular;
            }
          }
        }
      }
    }
  }
  .bookingDialog {
    .step2 {
      .form {
        h3 {
          margin-top: 20px;
        }
        > div {
          display: flex;
          > * {
            flex: 0.5;
          }
        }
      }
    }
  }
}
</style>
