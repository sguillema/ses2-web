<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">
        Edit Booking
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
              v-model="topic"
              class="input"
              label="Topic"
              outline
              :rules="[required]"
            />
            <v-select
              v-model="subjectName"
              label="Subject Name"
              item-value="id"
              item-text="title"
              outline
              :rules="[required]"
            />
            <v-select
              v-model="assignmentType"
              item-value="id"
              item-text="id"
              label="Assignment Type"
              outline
              :rules="[required]"
            />
            <v-checkbox
              v-model="isAGroupAssignment"
              label="Is this a group assignment?"
            />
          </div>
          <v-divider dark />
          <div>
            <p class="help-text">Need help with...</p>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-checkbox
                  v-model="addressingAssignmentQuestion"
                  label="Addressing the assignment question"
                />
                <v-checkbox
                  v-model="addressingMarkingCriteria"
                  label="Addressing the marking criteria"
                />
                <v-checkbox v-model="structure" label="Structure" />
              </v-flex>
              <v-flex xs12 sm6>
                <v-checkbox
                  v-model="paragraphDevelopment"
                  label="Paragraph Development"
                />
                <v-checkbox v-model="referencing" label="Referencing" />
                <v-checkbox v-model="grammar" label="Grammar" />
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="others"
              class="input"
              label="Others, please specify below"
              outline
            />
          </div>
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
    bookingid: { type: String, required: true }
  },
  data() {
    return {
      topic: '',
      subjectName: {},
      assignmentType: {},
      isAGroupAssignment: false,
      addressingAssignmentQuestion: false,
      addressingMarkingCriteria: false,
      structure: false,
      paragraphDevelopment: false,
      referencing: false,
      grammar: false,
      others: ''
    }
  },

  async mounted() {
    await console.log('Booking Details Dialog component has loaded.')
  },

  methods: {
    async handleUpdate() {
      if (
        this.topic == '' ||
        this.subjectName == {} ||
        this.assignmentType == {}
      ) {
        return false
      }
      console.log('Booking details updated.')
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
