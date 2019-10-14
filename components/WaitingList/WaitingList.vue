<template>
  <Sheet header="Waiting List">
    <div class="centered-section">
      <v-form>
        <p class="waiting-list-heading">
          Add student to the Waiting List
        </p>
        <v-text-field label="Student ID/Name" outline />
        <v-btn class="add-button" depressed @click="handleAdd">Add</v-btn>
        <p class="waiting-list-text">
          There are {{ numStudentsData }} students on the waiting list.
        </p>
      </v-form>
    </div>
  </Sheet>
</template>

<script>
import Sheet from '~/components/Sheet/Sheet'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,
  components: { Sheet },
  props: {
    numberOfStudents: { type: Number, required: false, default: 0 }
  },
  data() {
    return {
      numStudentsData: this.numberOfStudents
    }
  },
  methods: {
    async handleAdd(e) {
      await console.log('Student added to waiting list.')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.waiting-list-heading {
  margin: 15px 0 10px 0;
  font-size: 120%;
  font-weight: 500;
}

.waiting-list-text {
  margin: 15px 0 10px 0;
  font-size: 105%;
  font-weight: 500;
}

.centered-section {
  text-align: center;
}

.add-button {
  margin: 0;
  padding: 0;
  color: $color-darkgray;
  background-color: $color-divider;
  width: 100%;
}
</style>
