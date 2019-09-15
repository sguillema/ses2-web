<template>
  <div id="page-authenticated">
    <div>Hello this is an authenticated route :) with type {{ type }}</div>
    <section class="container">
      <div class="column-left">
        <p>
          hidari これはひだりです。
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
        <div class="section-heading">
          Your Statistics
          <i aria-hidden="true" class="v-icon material icons theme--light">
            add
          </i>
        </div>
        <div class="box">
          <p>5</p>
          <p>No. Sessions this week</p>
          <div class="sub-box">
            <div class="column">
              <p>Consultations</p>
              <p>Workshops</p>
            </div>
          </div>
        </div>
        <div class="section-heading">
          Annoucements
          <i aria-hidden="true" class="v-icon material icons theme--light">
            add
          </i>
        </div>
        <div class="box">
          <p>
            Occaecat labore excepteur magna exercitation sint ipsum nisi ex eu
            eiusmod nostrud.
          </p>
        </div>
      </div>
      <div class="column-right">
        migiこれはみぎです。
        <div class="section-heading">
          Your HELPS News
          <i aria-hidden="true" class="v-icon material icons theme--light">
            add
          </i>
        </div>
        <div class="advertisement">
          hello
        </div>
        <div class="section-heading">
          Your Schedule
          <i aria-hidden="true" class="v-icon material icons theme--light">
            add
          </i>
        </div>
        <!--- Below this is the Consultation Form -->
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
      min-width: 80px;
      width: 290px;
      margin-right: 25px;
      //justify-content: center;
      //align-items: center;
      .header-button {
        width: 100%;
        background-image: linear-gradient($color-red2, $color-darkred);
        color: $color-white;
        height: 80px;
        font-size: $font-subheading;
        margin-bottom: 25px;
      }
      .box {
        background: #ffffff;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 25px;
      }
      .sub-box {
        display: flex;
        background-image: linear-gradient($color-red2, $color-darkred);
        color: #ffffff;
        font-size: 12px;
        margin-left: -20px;
        margin-right: -20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 5px;
        .column {
          display: flex;
        }
      }
    }
    > .column-right {
      width: 100%;
      max-width: 970px;
      .advertisement {
        background: white;
        background-image: linear-gradient($color-blue, $color-darkblue);
        height: 180px;
        color: white;
        padding: 20px;
        margin-bottom: 25px;
      }
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
