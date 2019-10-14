<template>
  <div id="page-authenticated">
    <section class="container">
      <h1>Welcome to UTS:HELPS Booking System</h1>
      <div class="advertisement">
        <template>
          <v-carousel cycle height="218" hide-delimiters show-arrows-on-hover>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            />
          </v-carousel>
        </template>
        <h1></h1>
      </div>
      <v-spacer />
      <ViewActiveBookings />
    </section>
  </div>
</template>

<script>
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import ViewActiveBookings from '../../components/ViewBookings/ViewActiveBookings'

export default {
  components: { ViewActiveBookings },
  data() {
    return {
      items: [
        {
          src:
            'https://cdn.discordapp.com/attachments/573024870145851395/632976150221553710/summer.png'
        },
        {
          src:
            'https://cdn.discordapp.com/attachments/573024870145851395/632976150716743703/autumn.png'
        },
        {
          src:
            'https://cdn.discordapp.com/attachments/573024870145851395/632976149269708811/winter.png'
        },
        {
          src:
            'https://cdn.discordapp.com/attachments/573024870145851395/632976149944860692/spring.png'
        }
      ]
    }
  },
  middleware: studentAuthenticated,
  layout: 'student'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
h1 {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  margin: 70px 0px 60px;
}
advertisement {
  // background: white;
  // background-image: linear-gradient($color-blue, $color-darkblue);
  // color: white;
  display: flex;
  margin-bottom: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-top: 3px;
  height: 218px;
  .display-custom {
    display: flex;
    font-size: 2vw;
    font-weight: 400;
    font-family: Roboto, sans-serif !important;
    align-items: center;
    justify-content: center;
    height: inherit;
  }
}
</style>
