<template>
  <div id="page-authenticated">
    <section class="table">
      <div class="section-table">
        <Sheet header="Registered Students">
          <v-text-field
            v-model="search"
            class="input-spacing"
            append-icon="search"
            placeholder="Search"
          />
        </Sheet>
        <div>biutest tsdtdfouyfuf</div>
        <div>
          <v-layout row wrap>
            <v-flex xs12 sm3>
              <v-checkbox v-model="landscape" hide-details label="Landscape" />
            </v-flex>
            <v-flex xs12 sm3>
              <v-checkbox v-model="reactive" hide-details label="Reactive" />
            </v-flex>
          </v-layout>

          <v-date-picker
            v-model="picker"
            :landscape="landscape"
            :reactive="reactive"
          />
        </div>
      </div>
    </section>
  </div>

  <!-- <div>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-checkbox
          v-model="landscape"
          hide-details
          label="Landscape"
        ></v-checkbox>
      </v-flex>
      <v-flex xs12 sm3>
        <v-checkbox
          v-model="reactive"
          hide-details
          label="Reactive"
        ></v-checkbox>
      </v-flex>
    </v-layout>

    <v-date-picker
      v-model="picker"
      :landscape="landscape"
      :reactive="reactive"
    ></v-date-picker>
  </div>-->
</template>

<script>
import { authModule, TYPE } from '~/store/auth/methods'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
