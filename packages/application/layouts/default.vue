<template>
  <v-app>
    <Header />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: { Header, Footer },
  data() {
    return {
      dummy: ''
    }
  },
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
