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
          <span class="right">
            <i aria-hidden="true" class="v-icon material icons theme--light">
              add
            </i>
          </span>
        </div>
        <v-btn class="header-button" depressed v-on="on">
          Create Booking
        </v-btn>
        <div class="section-heading">
          Your Statistics
          <span class="right">
            <i aria-hidden="true" class="v-icon material icons theme--light">
              add
            </i>
          </span>
        </div>
        <div class="box">
          <div class="sub-box">
            <div class="super-heading">7</div>
            <div class="center">
              <p>
                No.
                <span>Sessions</span>
                <span>this week</span>
              </p>
            </div>
          </div>
          <div class="sub-box2">
            <div class="column">
              <p>5</p>
              <div class="statistic-subheading">
                Consultations
              </div>
              <p>2</p>
              <div class="statistic-subheading">
                Workshops
              </div>
            </div>
          </div>
        </div>
        <div class="section-heading">
          Annoucements
          <span class="right">
            <i aria-hidden="true" class="v-icon material icons theme--light">
              add
            </i>
          </span>
        </div>
        <div class="annoucement">
          <p>
            Occaecat labore excepteur magna exercitation sint ipsum nisi ex eu
            eiusmod nostrud.
          </p>
        </div>
      </div>
      <div class="column-right">
        <p>
          migiこれはみぎです。
        </p>
        <div class="section-heading">
          Your HELPS News
        </div>
        <div class="advertisement">
          hello
        </div>
        <div class="section-heading">
          Your Schedule
        </div>
        <div class="form">
          <div class="header">
            Upcoming All Sessions
          </div>
          helps me
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
  display: block;
  padding: 10px;
  .container {
    height: inherit;
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
        margin-left: -1px;
        margin-top: 4px;
      }
      .box {
        display: block;
        background: #ffffff;
        padding-left: 20px;
        padding-right: 20px;
        // padding-top: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 25px;
        margin-top: 5px;
        color: $color-red2;
        align-items: center;
        .sub-box {
          display: flex;
          max-width: 200px;
          margin-left: auto;
          margin-right: auto;
          // text-align: center;
          align-items: center;
          p {
            display: block;
            font-size: 18px;
            span {
              display: block;
            }
          }
          .super-heading {
            font-size: 100px;
            font-weight: 500;
            margin-right: 10px;
          }
          .center {
            display: inline-block;
            justify-content: right;
            margin: 0 auto;
            margin-bottom: -10px;
          }
        }
        .sub-box2 {
          display: flex;
          background-image: linear-gradient($color-red2, $color-darkred);
          color: #ffffff;
          font-size: 12px;
          margin-left: -20px;
          margin-right: -20px;
          //padding-left: 20px;
          //padding-right: 20px;
          .column {
            display: flex;
            align-items: center;
            margin-left: auto;
            margin-right: auto;
            .statistic-subheading {
              padding: 10px;
            }
            p {
              font-size: 50px;
              font-weight: 500;
              max-height: 60px;
              color: white;
            }
          }
        }
      }
      .annoucement {
        display: inline-block;
        padding: 25px;
        background: white;
        margin-top: 5px;
        text-align: center;
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
    .form {
      background: white;
      padding: 20px;
      height: 250px;
      max-height: 500px;
      margin-top: 25px;
      .header {
        background: black;
        color: white;
        padding-left: 20px;
        padding-top: 5px;
        margin-left: 5px;
        margin-right: 5px;
        height: 38px;
        margin-top: -40px;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
}
</style>
