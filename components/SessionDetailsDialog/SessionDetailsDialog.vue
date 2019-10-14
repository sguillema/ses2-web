<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">
        Edit Session
      </v-btn>
    </template>
    <v-card class="dialog">
      <v-row>
        <v-card-title class="dialog-title-card">
          <h1 class="dialog-title">Edit Consultation Information</h1>
        </v-card-title>
      </v-row>
      <v-row>
        <v-card-title class="dialog-title-card2">
          <h1 class="dialog-title2">Consultation Booking Form</h1>
        </v-card-title>
      </v-row>
      <v-divider />
      <v-card-text class="form">
        <v-form>
          <div>
            <v-text-field
              v-model="date"
              class="input"
              label="Date"
              outline
              :rules="[required]"
            />
            <v-text-field
              v-model="time"
              class="input"
              label="Time"
              outline
              :rules="[required]"
            />
            <v-text-field
              v-model="room"
              class="input"
              label="Room"
              outline
              :rules="[required]"
            />
          </div>
          <v-divider dark />
          <div class="step-buttons">
            <v-btn color="primary" @click="handleUpdate">
              Update
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'
export default {
  middleware: adminAuthenticated,
  props: {
    sessionid: { type: String, required: true }
  },
  data() {
    return {
      date: '',
      time: '',
      room: ''
    }
  },
  async mounted() {
    await console.log('Session Details Dialog component has loaded.')
  },
  methods: {
    async handleUpdate() {
      if (this.date == '' || this.time == '' || this.room == '') {
        return false
      }
      console.log('Session details updated.')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
.dialog-title-card {
  background-color: $color-primary;
  color: $color-white;
  padding: 15px 35px;
  .dialog-title {
    font-size: 20px !important;
    font-weight: 500;
    line-height: 1 !important;
    letter-spacing: 0.02em !important;
    font-family: Roboto, sans-serif !important;
  }
}
.dialog-title-card2 {
  padding: 15px 35px;
  .dialog-title2 {
    font-size: 20px !important;
    font-weight: 500;
    line-height: 1 !important;
    letter-spacing: 0.02em !important;
    font-family: Roboto, sans-serif !important;
  }
}
.help-text {
  margin-top: 16px;
  padding: 0 30px;
  font-weight: 500;
  font-size: 120%;
}
.step-buttons {
  text-align: center;
}
.form {
  padding: 15px 60px;
}
.v-input--selection-controls {
  margin: 0;
  padding: 0 30px;
}
.v-input__slot {
  margin-bottom: 0;
  padding-bottom: 0;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0;
}
</style>
