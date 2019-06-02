<template>
  <v-dialog v-model="dialog" max-width="1100px">
    <template v-slot:activator="{ on }">
      <v-btn class="activatorButton" depressed v-on="on">Book Workshop</v-btn>
    </template>
    <v-card>
      <v-card-title class="header">
        <h2>HELPS Workshop Booking</h2>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <h1>HELPS Workshop Booking</h1>
            <v-stepper-step :complete="e1 > 1" step="1">
              Step 1
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="e1 > 2" step="2">
              Step 2
            </v-stepper-step>
            <v-divider />
            <v-stepper-step step="3">Step 3</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-card-title>
      <v-card-text class="body">
        <v-select
          v-model="background.education"
          :items="educationBackgrounds"
          label="Type"
          outline
        />
        <v-text-field
          v-if="background.education === 'Other'"
          v-model="background.other"
          label="Other Type"
          outline
        />
        <v-text-field v-model="background.mark" label="Mark" outline />
      </v-card-text>
      <v-card-actions class="actions">
        <v-btn
          class="center-button"
          color="primary"
          depressed
          @click="addClick()"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import educationBackgrounds from '../../core/data/educationBackgrounds'

const initialBackground = {
  education: '',
  other: '',
  mark: ''
}

export default {
  props: {
    add: { type: Function, required: true }
  },

  data() {
    return {
      background: this.resetBackgroundData(),
      dialog: false,
      educationBackgrounds: educationBackgrounds
    }
  },

  methods: {
    addClick() {
      let { education, other, mark } = this.background
      if (education === 'Other') education = other
      this.add({ education, mark })
      this.background = this.resetBackgroundData()
      this.closeDialog()
    },

    resetBackgroundData() {
      return { ...initialBackground }
    },

    closeDialog() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.activatorButton {
  margin: 0;
}

.header {
  // background: $color-primary;
  // color: $color-white;
}

.body {
  padding: 40px 40px 0;
}

.actions {
  padding: 0px 0 20px;
}

.center-button {
  margin: 0 auto;
}
</style>
