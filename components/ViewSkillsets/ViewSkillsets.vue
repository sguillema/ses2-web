<template>
  <div id="page-authenticated">
    <section class="container">
      <h1>HELPS Workshop Booking</h1>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          To start the booking process, please click the skill-set that you want
          to improve:
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <!-- <v-list-tile
          v-for="(item, index) in testItems"
          :key="index"
          :class="[selectedItemIndex === index && 'selected']"
          @click="setSelected(index)"
        >
          <v-list-tile-content>
            {{ item.title }} - {{ index }}
          </v-list-tile-content>
        </v-list-tile>-->
        <v-stepper v-model="stepCount">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Step 1</v-stepper-step>

            <v-divider />

            <v-stepper-step :complete="e1 > 2" step="2">Step 2</v-stepper-step>

            <v-divider />

            <v-stepper-step step="3">Step 3</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-stepper-content step="1" class="step-container">
                <div class="step-content">
                  <p>Test Data</p>
                  <v-form
                    ref="stepForm1"
                    v-model="step1Valid"
                    lazy-validation
                  />
                </div>
              </v-stepper-content>
              <!-- <v-card class="mb-5" color="grey lighten-1" height="200px" /> -->

              <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-5" color="grey lighten-1" height="200px" />

              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-5" color="grey lighten-1" height="200px" />

              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-list>
    </section>
  </div>
</template>

<script>
import { authModule, TYPE } from '~/store/auth/methods'

export default {
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      stepCount: 0
      //    selectedItemIndex: null,
      //       testItems: [{ title: 'test1' }, { title: 'test2' }, { title: 'test3' }],
      //       setSelected(index) {
      //       this.selectedItemIndex = index
      //       console.log(this.selectedItemIndex)
      //       }
    }
  }
}
</script>
<style lang="scss">
@import '~assets/styles/variables';
.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
