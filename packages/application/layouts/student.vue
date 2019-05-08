<template>
  <v-app>
    <Header />
    <v-content>
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/StudentDashboard/Header/Header'
import Footer from '~/components/Footer/Footer'

export default {
  components: { Header, Footer },
  mounted() {
    if (process.browser) {
      screen.orientation.lock('portrait')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/global.scss';
</style>
