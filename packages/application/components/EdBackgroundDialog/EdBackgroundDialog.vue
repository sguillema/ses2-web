<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn class="activatorButton" depressed v-on="on">Add</v-btn>
    </template>
    <v-card>
      <v-card-title class="header">
        <h2>Educational Background</h2>
      </v-card-title>
      <v-card-text class="body">
        <v-select
          v-model="background.type"
          :items="educationBackgrounds"
          label="Type"
          outline
        />
        <v-text-field
          v-if="background.type === 'Other'"
          v-model="background.otherType"
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
  type: '',
  otherType: '',
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
      let { type, otherType, mark } = this.background
      if (type === 'Other') type = otherType
      this.add({ type, mark })
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
  background: $color-primary;
  color: $color-white;
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
