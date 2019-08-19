<template>
  <div id="page-rooms">
    <section class="container">
      <div class="column-right">
        <Sheet class="sheet" header=" Rooms">
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              class="input-spacing"
              append-icon="search"
              placeholder="Search for Room"
            />
            <v-spacer />
            <v-dialog v-model="dialog" width="800">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">
                  Create Room
                </v-btn>
              </template>
              <v-card class="dialog">
                <v-card-title class="dialog-title-card">
                  <h1 class="dialog-title">Create Room Information</h1>
                </v-card-title>
                <v-card-title class="dialog-title-card2">
                  <h1 class="dialog-title2">Room Details Form</h1>
                </v-card-title>
                <v-divider />
                <v-card-text class="form">
                  <v-form>
                    <div>
                      <v-text-field
                        v-model="newRoom.room"
                        class="input"
                        label="Room"
                        outline
                        :rules="[required]"
                      />
                      <v-select
                        v-model="newRoom.type"
                        label="Type"
                        :items="['Small Room', 'Classroom']"
                        outline
                        :rules="[required]"
                      />
                      <v-text-field
                        v-model="newRoom.maxCapacity"
                        class="input"
                        label="Max Capacity"
                        outline
                        :rules="[required]"
                      />
                    </div>
                    <div class="step-buttons">
                      <v-btn color="primary" @click="addRoom">
                        Create Room
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="rooms"
            :search="search"
            hide-actions
            :expand="expand"
          >
            <template v-slot:items="props">
              <td>{{ props.item.room }}</td>
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
import { roomsModule, REQUEST, ROOMS, CREATE } from '../../store/rooms/methods'
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
    },
    async addRoom() {
      if (
        this.newRoom.room === '' ||
        this.newRoom.type === '' ||
        this.newRoom.maxCapacity === '' ||
        this.newRoom.status === ''
      ) {
        return false
      }
      console.log(this.newRoom)
      await this.$store.dispatch(roomsModule(CREATE), this.newRoom)
      this.dialog = false
      this.newRoom = emptyRoomForm()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-rooms {
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
.form {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 25px;
}
.dialog {
  .dialog-title {
    margin: 0;
    padding-left: 25px;
    color: #ffffff;
    font-size: 20px;
  }
  .dialog-title2 {
    margin: 0;
    padding-left: 25px;
    font-size: 20px;
  }
  .dialog-title-card {
    background: #ff1818;
    height: 70px;
  }
  .dialog-title-card2 {
    background: #ffffff;
    height: 70px;
  }
  .step-content {
    padding: 0 20px;
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
      margin-left: 20px;
      margin-right: 20px;
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
}
</style>
