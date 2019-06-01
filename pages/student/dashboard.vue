<template>
  <div id="page-authenticated">
    <section class="container">
      <!-- <Sheet header="Registered Students">
        <v-text-field
          v-model="search"
          class="input-spacing"
          append-icon="search"
          placeholder="Search"
        />
        <v-data-table
          class="table-wrapper"
          :headers="headers"
          :items="students"
          :search="search"
        />
      </Sheet> -->
      <ViewSkillsets />
      <div class="section-container">
        <div>Hello this is an authenticated route :) with type {{ type }}</div>
      </div>
    </section>
    <!--  -->
    <!-- <section class="section-container">
      <div>
        Hello this is an authenticated route :) with user id of {{ user.id }}
        {{ bookings }}
        testttttttt <Sheet header="Registered Students"></Sheet> -->
    <!-- create table useing bookings -->
    <!-- </div> -->
    <!-- </section> -->

    <!-- header nuxt content -->
  </div>
</template>

<script>
import { authModule, TYPE, USER } from '~/store/auth/methods'
import { BookingApi } from '../../core/Api'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import ViewSkillsets from '../../components/ViewSkillsets/ViewSkillsets'

export default {
  components: { ViewSkillsets },
  middleware: studentAuthenticated,
  layout: 'student',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      user: this.$store.getters[authModule(USER)],
      bookings: []
    }
  },
  async mounted() {
    const response = await BookingApi.getBookings(this.user.id)
    this.bookings = response.data
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

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
.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
