<template>
  <div id="page-authenticated">
    <div>Hello this is an authenticated route :) with type {{ type }}</div>
    <section class="container">
      <div class="column-left">
        <p>
          hidari
        </p>
        <div class="section-heading">
          Your Shortcuts
          <i aria-hidden="true" class="v-icon material icons theme--light">
            add
          </i>
        </div>
        <v-btn class="header-button" depressed v-on="on">
          Create Booking
        </v-btn>
        <!---<button type="button" class="v-btn v-btn-- di" --->
      </div>
      <div class="section-heading">
        Your Shortcuts
      </div>
      <div class="section-heading">
        Your Shortcuts
      </div>
      <div class="column-right">
        <p>
          migi
        </p>
      </div>
    </section>
    <v-btn @click="onClick">Logout</v-btn>
  </div>
</template>

<script>
import { authModule, TYPE, LOGOUT } from '~/store/auth/methods'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],
      ConsultationApi: [],
      dialogCreateSession: {
        active: false,
        // active: true, // change to false when done
        width: 800
        // width: 1200, // change to 800 when done
      }
    }
  },

  methods: {
    onClick() {
      this.$store.dispatch(authModule(LOGOUT))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-authenticated {
  .container {
    //height: inherit;
    display: flex;
    > .column-left {
      min-width: 290px;
      width: 290px;
      margin-right: 27px;
      //justify-content: center;
      //align-items: center;
      .header-button {
        width: 100%;
        //This is for a solid colour
        //background: $color-red2;
        background-image: linear-gradient($color-red2, $color-darkred);
        color: $color-white;
        //Standard button height is going to be 80px
        height: 80px;
        font-size: $font-subheading;
      }
    }
    > .column-right {
      width: 100%;
      max-width: 970px;
    }
    .section-heading {
      font-size: 18px;
      color: #707070;
      font-weight: 500;
      margin-left: 20px;
    }
  }
}
</style>
